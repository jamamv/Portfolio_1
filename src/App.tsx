import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  FolderOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Download,
  ExternalLink,
  MapPin,
  Phone,
  Send
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const skills = [
    { name: 'Java', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'SQL', level: 85 },
    { name: 'Oracle DB', level: 88 },
    { name: '', level: 82 },
    { name: '', level: 78 },
  ];

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'KBC Bank & Verzekering',
      period: '2024 - Present',
      description: 'Responsible for automating reports at KBC Bank using Java, Python, Oracle, SQL, Git, Jenkins and Bitbucket for version control, integrating with databases and calculation engines. I manage data pipelines, handle incident resolution, and optimize reporting systems in an Agile environment.',
      technologies: ['Java', 'Python', 'Oracle Database', 'SQL', 'Git', 'Cross-Functional Team Management', 'Agile Project Management', 'Computer Science']
    },
    {
      title: 'Technical Support Engineer',
      company: 'Technical Support Engineer',
      period: '2023 - 2024',
      description: 'Responsible for troubleshooting AWS logs, resolving front-end/back-end bugs, handling API requests via Postman/Insomnia, and managing SSO integrations. I collaborated with cross-functional teams, dashboarding data visualization, communicated with clients, and maintained technical documentation.',
      technologies: ['JSON', 'Databases', "REST API's", 'Data Analysis', 'Data Visualization', 'Embedded Software', 'AWS']
    },
    {
      title: 'Data Analyst - Hackathon',
      company: 'Emergent Leuven',
      period: '2023 - 2023',
      description: 'Best Data Visualization Award - Data 4 Good Challenge. Member of a team that developed a data visualization solution to address waste management issues using Data Science and AI, winning the Best Data Visualization award out of 160 participants. The project, judged by representatives from KBC Bank, McKinsey & Company, and Datacamp, demonstrated the power of data-driven decision-making and the clear presentation of complex datasets. We built our model using python as the main programming language.',
      technologies: ['Data Visualization', 'Data Analysis', 'JSON', 'Data Science']
    }
  ];

  const projects = [
    {
      title: 'Master Thesis',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#'
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Vue.js', 'Firebase', 'Socket.io', 'Tailwind'],
      github: '#',
      live: '#'
    },
    {
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
      github: '#',
      live: '#'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => nav.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-emerald-400">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeSection === item.href.slice(1)
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${activeSection === item.href.slice(1)
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <item.icon className="inline-block w-5 h-5 mr-2" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-black"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Hi, I'm </span>
            <span className="text-emerald-400">Jamila Musayeva</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Software Engineer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
              <Download className="mr-2" size={20} />
              Download Resume
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="border border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experienced software engineer with 4+ years of hands-on development in modern web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Professional Background</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a software engineer with over 4 years of experience building high-performance systems using Java and Python.
                My focus lies in algorithmic problem-solving, data engineering, and backend infrastructure. I enjoy working on complex
                systems where performance, scalability, and efficiency are critical.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My expertise includes data pipelines, distributed computing, and working with large-scale datasets. I’ve worked extensively
                with tools such as Apache Spark, Kafka, and Airflow, and I’m experienced in designing systems that support advanced data
                analysis, machine learning workflows, and automation. Outside of work, I stay sharp by solving algorithmic challenges,
                contributing to open-source tools, and continuously exploring advances in data architecture and cloud technologies.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-emerald-400">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-emerald-400 mr-3" size={20} />
                  <span className="text-gray-300">Belgium</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-emerald-400 mr-3" size={20} />
                  <span className="text-gray-300">example@example.com</span>
                </div>
                <div className="flex items-center">
                  <Code className="text-emerald-400 mr-3" size={20} />
                  <span className="text-gray-300">4+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="text-emerald-400 mr-3" size={20} />
                  <span className="text-gray-300"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="text-emerald-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-emerald-400">Technologies I Work With</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {['React', 'Vue.js', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'Figma', 'Tailwind'].map((tech, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-gray-300 font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey and key achievements
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-emerald-600"></div>

            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-gray-900"></div>

                <div className={`bg-gray-800 p-6 rounded-lg ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <p className="text-emerald-400 font-semibold">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.period}</p>
                  </div>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a href={project.github} className="bg-emerald-600 p-2 rounded-full hover:bg-emerald-700 transition-colors">
                        <Github size={20} />
                      </a>
                      <a href={project.live} className="bg-emerald-600 p-2 rounded-full hover:bg-emerald-700 transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to work together? Let's discuss your next project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Let's Connect</h3>
              <p className="text-gray-300 mb-8">
                I'm always interested in hearing about new opportunities and exciting projects.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-emerald-400 mr-4" size={24} />
                  <span className="text-gray-300">example@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-emerald-400 mr-4" size={24} />
                  <span className="text-gray-300">your number maybe?</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-emerald-400 mr-4" size={24} />
                  <span className="text-gray-300">Belgium, Leuven</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Jamila Musayeva. Built with React & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;