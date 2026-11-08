import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Project } from '../../data/portfolio';

const ACCENT = '#34d399';

function makeGeometry(kind: Project['icon']) {
  switch (kind) {
    case 'bot':
      return new THREE.IcosahedronGeometry(1, 0);
    case 'network':
      return new THREE.TorusKnotGeometry(0.62, 0.2, 90, 12, 2, 3);
    case 'search':
      return new THREE.OctahedronGeometry(1.05, 0);
    case 'graduation':
      return new THREE.DodecahedronGeometry(1, 0);
  }
}

function Shape({ kind, hovered, animate }: { kind: Project['icon']; hovered: boolean; animate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => makeGeometry(kind), [kind]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 20), [geometry]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || !animate) return;
    const speed = hovered ? 1.4 : 0.35;
    g.rotation.y += delta * speed;
    g.rotation.x += delta * speed * 0.4;
    g.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    const s = THREE.MathUtils.lerp(g.scale.x, hovered ? 1.12 : 1, 0.1);
    g.scale.setScalar(s);
  });

  return (
    <group ref={ref} rotation={[0.4, 0.6, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#26262c" metalness={0.6} roughness={0.35} flatShading />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
}

export default function ProjectShape({ kind, hovered, animate }: { kind: Project['icon']; hovered: boolean; animate: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={animate ? 'always' : 'demand'}
      aria-hidden="true"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 3, 4]} intensity={1.6} />
      <pointLight position={[-3, -2, 2]} intensity={12} color={ACCENT} />
      <Shape kind={kind} hovered={hovered} animate={animate} />
    </Canvas>
  );
}
