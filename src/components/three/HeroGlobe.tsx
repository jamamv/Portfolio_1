import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT = '#34d399';
const RADIUS = 1.6;

// Evenly spread points on a sphere, with a little jitter so it looks organic.
function spherePoints(count: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 1 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.06;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS * jitter));
  }
  return pts;
}

// Connect each node to its nearest neighbours, without duplicate edges.
function buildEdges(pts: THREE.Vector3[], perNode: number) {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, perNode)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  return edges;
}

// Soft round sprite so points render as glowing dots instead of squares.
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.9)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

type NetworkProps = { nodes: number; pulses: number; animate: boolean };

function Network({ nodes, pulses, animate }: NetworkProps) {
  const group = useRef<THREE.Group>(null);
  const pulseGeom = useRef<THREE.BufferGeometry>(null);

  const { nodePositions, linePositions, points, edges } = useMemo(() => {
    const points = spherePoints(nodes);
    const edges = buildEdges(points, 3);
    const nodePositions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
    const linePositions = new Float32Array(edges.flatMap(([a, b]) => [points[a].x, points[a].y, points[a].z, points[b].x, points[b].y, points[b].z]));
    return { nodePositions, linePositions, points, edges };
  }, [nodes]);

  // Each pulse travels along one edge, then hops to a random new one.
  const pulseState = useMemo(
    () => Array.from({ length: pulses }, () => ({ edge: Math.floor(Math.random() * edges.length), t: Math.random(), speed: 0.4 + Math.random() * 0.6 })),
    [pulses, edges.length]
  );
  const pulsePositions = useMemo(() => new Float32Array(pulses * 3), [pulses]);
  const dot = useMemo(makeDotTexture, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !animate) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.08;
    // Lean toward the cursor.
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.35, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, state.pointer.x * 0.15, 0.04);

    const tmp = new THREE.Vector3();
    pulseState.forEach((p, i) => {
      p.t += dt * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[p.edge];
      tmp.lerpVectors(points[a], points[b], p.t);
      pulsePositions.set([tmp.x, tmp.y, tmp.z], i * 3);
    });
    const attr = pulseGeom.current?.getAttribute('position');
    if (attr) attr.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.1]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} size={0.07} color="#f2efe9" sizeAttenuation transparent opacity={0.9} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.18} />
      </lineSegments>
      <points>
        <bufferGeometry ref={pulseGeom}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} size={0.16} color={ACCENT} sizeAttenuation transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.55, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.98, 32, 32]} />
        <meshBasicMaterial color="#09090b" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

type HeroGlobeProps = { animate: boolean; interactive: boolean; light: boolean; visible: boolean };

export default function HeroGlobe({ animate, interactive, light, visible }: HeroGlobeProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 45 }}
      dpr={[1, light ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={animate && visible ? 'always' : 'demand'}
      aria-hidden="true"
    >
      <Network nodes={light ? 90 : 160} pulses={light ? 14 : 28} animate={animate} />
      {interactive && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />}
    </Canvas>
  );
}
