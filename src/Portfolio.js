import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { IconCloud } from "./components/ui/interactive-icon-cloud";
import { Globe as SpinningGlobe } from './Globe';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Zap, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Users,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Linkedin,
  Github,
  User,
  Layout,
  BarChart3,
  Download,
  ChevronDown,
  Settings,
  Cpu,
  Database,
  Activity,
  Layers,
  X,
  ChevronRightCircle,
  Sun,
  Moon,
  Menu
} from 'lucide-react';

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const CardCarousel = ({ project }) => {
    const images = project.images || [project.image];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const touchStartX = useRef(null);

    const nextImage = (e) => {
      if (e) e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
      if (e) e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextImage();
        else prevImage();
      }
      touchStartX.current = null;
    };

    return (
      <div 
        className="relative h-64 overflow-hidden group/carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={images[currentImageIndex]} 
              alt={`${project.title} - ${currentImageIndex + 1}`}
              className={`w-full h-full ${project.imageContain ? 'object-cover object-left-top' : 'object-cover'} transition-all duration-500 brightness-[0.8] group-hover:brightness-100`}
            />
            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/0 transition-colors" />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute inset-y-0 left-0 flex items-center px-3 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            >
              <ChevronLeft size={28} strokeWidth={3} className="text-black transition-colors" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute inset-y-0 right-0 flex items-center px-3 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            >
              <ChevronRight size={28} strokeWidth={3} className="text-black transition-colors" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-slate-800' : 'bg-slate-800/50 hover:bg-slate-800/80'}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const ProjectModal = ({ project, onClose, t, darkMode }) => {
    // Fix for "click inside, release outside" closing the modal
    const [isMouseDownOnOverlay, setIsMouseDownOnOverlay] = useState(false);

    const handleOverlayMouseDown = (e) => {
      if (e.target === e.currentTarget) {
        setIsMouseDownOnOverlay(true);
      }
    };

    const handleOverlayMouseUp = (e) => {
      if (isMouseDownOnOverlay && e.target === e.currentTarget) {
        onClose();
      }
      setIsMouseDownOnOverlay(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={handleOverlayMouseDown}
        onMouseUp={handleOverlayMouseUp}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${darkMode ? 'bg-slate-950/80' : 'bg-black/40'}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          className={`rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#D8DCE3]'}`}
        >
          <button 
            onClick={onClose}
            className={`absolute top-4 right-4 z-20 p-2 backdrop-blur-md rounded-full transition-colors border ${darkMode ? 'bg-slate-900/50 text-slate-400 hover:text-white border-slate-700/50' : 'bg-white/80 text-[#4A5568] hover:text-[#2F5FD7] border-[#D8DCE3]'}`}
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className={`w-full p-8 overflow-y-auto ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="mb-8">
              <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.title}</h3>
              {project.grade && (
                <p className={`font-semibold text-sm mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>Grade: {project.grade}</p>
              )}
              <p className={`font-medium text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-[#4A5568]'}`}>{project.desc}</p>
            </div>

            <div className="space-y-8">
              {project.role && (
                <div className={`relative pl-4 border-l-2 ${darkMode ? 'border-blue-500/30' : 'border-[#2F5FD7]'}`}>
                  <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${darkMode ? 'text-slate-400' : 'text-[#6B7280]'}`}>{t.sections.modal.role}</h4>
                  <p className={`text-sm font-semibold leading-relaxed ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}>{project.role}</p>
                </div>
              )}


              {project.outcome && (
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-[#F4F5F7] border-[#D8DCE3]'}`}>
                  <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${darkMode ? 'text-slate-400' : 'text-[#6B7280]'}`}>{t.sections.modal.outcome}</h4>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.outcome}</p>
                </div>
              )}

              {project.skillsUsed && (
                <div>
                  <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${darkMode ? 'text-slate-400' : 'text-[#6B7280]'}`}>{t.sections.modal.skills}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsUsed.map((skill, i) => (
                      <span 
                        key={i}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${darkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-[#EDEFF2] text-[#4A5568] border-[#D8DCE3]'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col gap-6">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-colors w-full justify-center md:w-auto text-sm ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#2F5FD7] hover:bg-[#2854b5]'}`}
                  >
                    {t.sections.modal.viewProject} <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

const Portfolio = () => {
  // const [language, setLanguage] = useState('en'); // Removed to strictly use English
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const [selectedProject, setSelectedProject] = useState(null);

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const uiText = {
    en: {
      nav: {
        projects: 'Projects',
        expertise: 'Expertise',
        skills: 'Skills',
        experience: 'Experience',
        education: 'Education',
        contact: 'Contact'
      },
      hero: {
        greeting: 'Hi, I am',
        tagline: 'Business Analyst',
        tagline2: 'Focused on operational efficiency and digital transformation',
        bio: 'I design and implement structured digital solutions that improve business processes, align systems, and create measurable impact through data and technology.',
        downloadCV: 'Download CV',
        contact: 'Contact'
      },
      sections: {
        featuredProjects: 'Projects',
        featuredProjectsDesc: 'A selection of projects that showcase my skills and expertise.',
        expertise: {
          title: 'My Expertise',
          subtitle: 'Where business, operations, and digital systems meet.',
          items: [
            {
              title: 'Information Systems',
              desc: 'Designing and analyzing enterprise systems to align business needs, data, and technology.'
            },
            {
              title: 'Process Optimization',
              desc: 'Analyzing and redesigning business processes to make them clearer, faster, and more effective.'
            },
            {
              title: 'Operational Efficiency',
              desc: 'Improving performance by reducing friction, waste, and inefficiencies in operations.'
            },
            {
              title: 'Digital Innovation',
              desc: 'Identifying and shaping digital and AI-enabled solutions that create real operational value.'
            }
          ]
        },
        modal: {
          role: 'My Role',
          context: 'Context',
          outcome: 'Outcome',
          skills: 'Skills',
          viewProject: 'View Project'
        },
        categories: {
          all: 'All',
          operations: 'Operations',
          academic: 'Academic'
        },
        experience: {
          title: 'Experience',
          subtitle: 'A brief overview of my professional journey.'
        },
        technical: 'Technical Skills',
        technicalExpertise: {
          title: 'Technical Skills',
          subtitle: 'My Skills',
          desc: 'With a strong foundation in both design and development, I bring a holistic approach to every project. My technical skills include:',
          skills: [
            'JavaScript / TypeScript',
            'React / Next.js',
            'Node.js / Express',
            'HTML / CSS',
            'Tailwind CSS',
            'UI/UX Design',
            'Figma / Adobe XD',
            'MongoDB / SQL',
            'Git / GitHub',
            'Responsive Design',
            'Performance Optimization',
            'SEO Best Practices'
          ]
        },
        interpersonal: 'Interpersonnel',
        education: 'Education'
      },
      footer: {
        languages: 'Languages',
        interests: 'Interests',
        touch: 'Get in touch'
      }
    }
  };

  const t = uiText.en;
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4 }
  };

  const cvData = {
    name: "Yannick",
    lastName: "Wild",
    title: "Business Analyst",
    projects: [
      {
        title: "SAP FSM Platform",
        desc: "Implemented SAP FSM to streamline and improve field service management operations globally.",
        role: "Product Owner",
        context: "Led the global implementation of the SAP Field Service Management (FSM) platform to harmonize customer service processes across multiple regions and ERP systems (Great Plains, SAP, iScala).",
        outcome: "Successfully streamlined field service operations, defined key performance indicators (KPIs), and configured advanced dashboards in SAP Analytics Cloud, facilitating cross-departmental collaboration and maximizing operational value.",
        skillsUsed: ["Product Management", "Agile", "Analytics"],
        category: "operations",
        tags: ["Product Management", "Agile", "Analytics"],
        imageContain: true,
        image: "/assets/SAP FSM 1.png",
        images: [
          "/assets/SAP FSM 1.png",
          "/assets/SAP FSM 2.png",
          "/assets/SAP FSM 3.png",

        ]
      },
      {
        title: "Workflow Design",
        desc: "Implemented a new operational structure and standardized workflows to improve productivity and eliminate bottlenecks.",
        role: "Business Analyst",
        context: "Led a project focused on optimizing operational processes, enhancing workflow productivity, and standardizing project management methodologies within a complex business environment.",
        outcome: "Designed and implemented a standardized project workflow that significantly reduced bottlenecks. Developed advanced Excel templates and VBA macros to streamline reporting and monitoring of multimillion-euro investment budgets.",
        skillsUsed: ["Workflow Design", "BPMN", "User Training"],
        category: "operations",
        tags: ["Workflow Design", "BPMN", "User Training"],
        image: "/assets/Operational Optimization Card 2.png",
        images: [
          "/assets/Operational Optimization Card 2.png",
        ]
      },
      {
        title: "Hotel Procurement",
        desc: "Managed luxury hotel fit-outs and renovations, coordinating end-to-end FF&E procurement and on-site installations.",
        role: "Project Manager",
        context: "Managed end-to-end delivery of high-profile luxury hotel projects (e.g., Six Senses Ibiza, Rosewood Villa Magna), overseeing contracts and supplier management for projects with budgets up to €15 million.",
        outcome: "Successfully coordinated procurement and logistics for up to 5,000 items from 100+ suppliers. Maintained strict on-time and on-budget execution through rigorous risk and quality controls, leading core teams to successful project delivery.",
        skillsUsed: ["Logistics", "Supply Chain", "Budget Control"],
        category: "operations",
        tags: ["Logistics", "Supply Chain", "Budget Control"],
        image: "/assets/Hotel Procurement 1.jpg",
        images: [
          "/assets/Hotel Procurement 1.jpg"
        ]
      },
      {
        title: "Applied Projects",
        desc: "Designed and implemented practical AI solutions to improve operations and decision-making.",
        role: "Consultant",
        context: "Delivered AI-driven prototypes and integrations, focusing on measurable business value, transparency, and user trust in professional workflows.",
        outcome: "Successfully built proof-of-concept assistants, defined AI-specific KPIs, and aligned stakeholders on integration roadmaps to move from experimentation to production environments.",
        skillsUsed: ["Workflow Analysis", "Roadmap", "ROI"],
        category: "academic",
        tags: ["Workflow Analysis", "Roadmap", "ROI"],
        image: "/assets/Applied Projects 1.jpg",
        images: [
          "/assets/Applied Projects 1.jpg"
        ]
      },
      {
        title: "HEC Master Thesis",
        desc: "Design Science Research exploring how interaction design affects user trust and sense of control in AI travel planning.",
        role: "Researcher",
        context: "This Master Thesis project investigates the impact of different interaction paradigms—specifically Chatbots versus Graphical User Interfaces (GUI)—on user trust and their sense of control when using AI-assisted travel planning tools.",
        outcome: "Using a Design Science Research methodology, I developed two prototypes to test user perceptions. The research provided key insights into how AI should communicate with users to foster trust while maintaining transparency and control through effective UI/UX design and qualitative testing.",
        skillsUsed: ["AI Design", "UX/UI", "Experiment"],
        grade: "6/6",
        category: "academic",
        tags: ["AI Design", "UX/UI", "Experiment"],
        image: "/assets/Master Thesis 1.png",
        images: [
          "/assets/Master Thesis 1.png",
          "/assets/Master Thesis 2.png",
        ]
      },
      {
        title: "EHL Bachelor Project",
        desc: "Designed a market entry and business development strategy for an IoT-based hospitality technology startup.",
        role: "Consultant",
        context: "Developed a comprehensive go-to-market strategy for ARVE Air, an IoT solution targeting the luxury hospitality sector city-by-city and the Americas.",
        outcome: "Designed a phased business development strategy focusing on strategic partnerships and integration with open-API architectures. The project successfully translated complex technical IoT solutions into clear business value propositions.",
        skillsUsed: ["Market Analysis", "IoT", "Strategy"],
        grade: "6/6",
        category: "academic",
        tags: ["Market Analysis", "IoT", "Strategy"],
        image: "/assets/Arve 1.png",
        images: [
          "/assets/Arve 1.png",
          "/assets/Arve 2.png",
          "/assets/Arve 3.png"
        ]
      }
    ],
    contact: {
      phone: "+41 79 910 10 84",
      email: "wildyannick1@gmail.com",
      location: "Switzerland",
      nationality: "Swiss"
    },
    languages: ["English", "French", "Spanish", "Italian"],
    summary: "Organised | Resourceful | Analytical Mindset | Solution Oriented",
    skills: {
      technical: ["SAP 001", "Python", "Pandas", "JavaScript", "Jira", "SQL", "HTML", "CSS", "Agile Methodologies", "Excel Advanced"],
      interpersonal: ["Strong communicator", "Problem solver", "Cross-functional collaboration"]
    },
    experience: [
      {
        company: "GF Machining Solutions",
        location: "Geneva",
        role: "Product Owner",
        period: "2021 - 2023",
        description: "Led the global implementation of the SAP FSM platform, harmonizing customer service processes across multiple regions and ERP systems while defining KPIs and advanced analytics dashboards."
      },
      {
        company: "Sunnyland Consulting",
        location: "Madrid",
        role: "Project Manager",
        period: "2019 - 2021",
        description: "Managed end-to-end delivery of luxury hotel fit-outs with budgets up to €15M, coordinating complex logistics and implementing operational structures to improve workflow productivity."
      },
      {
        company: "Beau-Rivage Palace (F&B), Hotel Bernerhof (Front Office), Grand Hôtel & Centre Thermal (Kitchen)",
        location: "",
        role: "Hospitality Operations Roles",
        period: "2014 – 2017",
        description: "Worked across front-of-house and back-of-house operations in luxury hospitality environments, gaining hands-on experience in service processes, coordination, and operational execution."
      }
    ],
    education: [
      {
        school: "HEC Lausanne",
        degree: "Master in Information Systems & Digital Innovation",
        period: "2024 - 2025"
      },
      {
        school: "EHL École Hôtelière de Lausanne",
        degree: "Bachelor in Hospitality Management",
        period: "2016 - 2020"
      }
    ],
    extra: ["Fitness", "Kitesurf", "Snowboard"]
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className={`min-h-screen selection:bg-blue-500/30 transition-colors duration-300 ${darkMode ? 'bg-[#0b1220] text-slate-300' : 'bg-[#F4F5F7] text-[#1F2933]'}`}>
      <nav className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${darkMode ? 'border-slate-800/80 bg-[#0b1220]/85' : 'border-[#D8DCE3] bg-[#F4F5F7]/90'}`}>
        <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6">
          <a href="#profil" className={`flex items-center gap-2 text-lg font-semibold tracking-wide transition-colors duration-300 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
            <Layers className={darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'} size={20} />
            Portfolio
          </a>
          
          <div className={`hidden items-center gap-8 text-base font-medium lg:flex transition-colors duration-300 ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>
            <a href="#projets" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-[#2F5FD7]'}`}>
              <Layout size={16} /> {t.nav.projects}
            </a>
            <a href="#expertise" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-[#2F5FD7]'}`}>
              <Settings size={16} /> {t.nav.expertise}
            </a>
            <a href="#Skills" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-[#2F5FD7]'}`}>
              <Zap size={16} /> {t.nav.skills}
            </a>
            <a href="#experience" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-[#2F5FD7]'}`}>
              <Briefcase size={16} /> {t.nav.experience}
            </a>
            <a href="#formation" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-[#2F5FD7]'}`}>
              <GraduationCap size={16} /> {t.nav.education}
            </a>
            <a href="#contact" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-[#2F5FD7]'}`}>
              <Mail size={16} /> {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center justify-center rounded-full border p-2 transition-colors duration-300 lg:hidden ${darkMode ? 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#4A5568] hover:bg-[#EDEFF2]'}`}
              title="Menu"
            >
              <Menu size={16} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center justify-center rounded-full border p-2 transition-colors duration-300 ${darkMode ? 'border-slate-700 bg-slate-800/40 text-yellow-400 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#4A5568] hover:bg-[#EDEFF2]'}`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <div className={`flex items-center gap-1 rounded-full border p-2 text-xs font-bold transition-colors duration-300 ${darkMode ? 'border-slate-700 bg-slate-800/40 text-blue-400' : 'border-[#D8DCE3] bg-white text-[#2F5FD7]'}`}>
              EN
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`lg:hidden border-t overflow-hidden ${darkMode ? 'border-slate-800 bg-[#0b1220]/95' : 'border-[#D8DCE3] bg-[#F4F5F7]/95'}`}
            >
              <div className={`flex flex-col gap-1 px-6 py-4 text-base font-medium ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>
                {[
                  { href: '#projets', icon: Layout, label: t.nav.projects },
                  { href: '#expertise', icon: Settings, label: t.nav.expertise },
                  { href: '#Skills', icon: Zap, label: t.nav.skills },
                  { href: '#experience', icon: Briefcase, label: t.nav.experience },
                  { href: '#formation', icon: GraduationCap, label: t.nav.education },
                  { href: '#contact', icon: Mail, label: t.nav.contact },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-[#EDEFF2] hover:text-[#2F5FD7]'}`}
                  >
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <header id="profil" className="relative min-h-screen scroll-mt-16 flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px] ${darkMode ? 'bg-blue-600/10' : 'bg-[#2F5FD7]/10'}`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[128px] ${darkMode ? 'bg-indigo-600/10' : 'bg-[#2F5FD7]/5'}`} />
        </div>
        
        <motion.div 
          className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center justify-between gap-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.p 
              variants={fadeIn}
              className={`font-medium mb-4 ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}
            >
              {t.hero.greeting}
            </motion.p>
            
            <motion.h1 
              variants={fadeIn}
              className={`text-4xl md:text-8xl font-bold tracking-tight mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {cvData.name} <span className={darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}>{cvData.lastName}</span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className={`text-lg md:text-2xl font-medium mb-2 ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p 
              variants={fadeIn}
              className={`text-lg md:text-xl font-medium mb-6 ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}
            >
              {t.hero.tagline2}
            </motion.p>

            <motion.p 
              variants={fadeIn}
              className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-slate-500' : 'text-[#6B7280]'}`}
            >
              {t.hero.bio}
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors text-sm md:text-base ${darkMode ? 'bg-blue-400 text-slate-900 hover:bg-blue-300' : 'bg-[#2F5FD7] text-white hover:bg-[#2854b5]'}`}>
                <Download size={20} /> {t.hero.downloadCV}
              </button>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/yannick-wild/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 p-3 border rounded-lg transition-colors font-medium ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#4A5568]'}`} title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/yanowild" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 p-3 border rounded-lg transition-colors font-medium ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#4A5568]'}`} title="GitHub">
                  <Github size={20} />
                </a>
                <a href="#contact" className={`flex items-center gap-2 px-6 py-3 border rounded-lg transition-colors font-medium ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#4A5568]'}`}>
                  <Mail size={20} /> {t.nav.contact}
                </a>
              </div>
            </motion.div>
          </div>

        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, 10, 0] 
          }}
          transition={{ 
            opacity: { delay: 1, duration: 1 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <a href="#projets" className={`p-3 border rounded-full flex items-center justify-center transition-colors ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-[#D8DCE3] hover:bg-[#EDEFF2]'}`}>
            <ChevronDown size={24} className={darkMode ? 'text-slate-400' : 'text-[#6B7280]'} />
          </a>
        </motion.div>
      </header>

      {/* Projects Section */}
      <section id="projets" className={`pt-16 pb-24 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.sections.featuredProjects}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`max-w-2xl text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}
            >
              {t.sections.featuredProjectsDesc}
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 mb-8"
          >
            {Object.entries(t.sections.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === key 
                    ? darkMode ? 'bg-white text-slate-900' : 'bg-[#2F5FD7] text-white'
                    : darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-[#4A5568] hover:bg-[#EDEFF2] border border-[#D8DCE3]'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div 
            key={activeFilter}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {cvData.projects
                .filter(project => activeFilter === 'all' || project.category === activeFilter)
                .map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeIn}
                    layout
                    onClick={() => setSelectedProject(project)}
                    className={`group rounded-2xl overflow-hidden transition-all cursor-pointer border ${darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-[#D8DCE3] hover:border-[#2F5FD7]/40 shadow-sm'}`}
                  >
                  <CardCarousel project={project} />
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-2xl font-bold transition-colors ${darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-[#2F5FD7]'} ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                        {project.title}
                      </h3>
                      <ExternalLink size={20} className={`transition-colors ${darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-[#2F5FD7]'} ${darkMode ? 'text-slate-500' : 'text-[#6B7280]'}`} />
                    </div>
                    {project.grade && (
                      <p className={`transition-colors font-semibold text-sm mb-4 ${darkMode ? 'text-slate-300 group-hover:text-blue-400' : 'text-[#1F2933] group-hover:text-[#2F5FD7]'}`}>Grade: {project.grade}</p>
                    )}
                    
                    <p className={`mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${darkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-[#F4F5F7] text-[#4A5568] border-[#D8DCE3]'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className={`py-16 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-[#0b1220] border-slate-800' : 'bg-[#F4F5F7] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              Expertise
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`max-w-2xl mx-auto text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}
            >
              {t.sections.expertise.subtitle}
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.sections.expertise.items.map((item, i) => {
              const icons = [Database, BarChart3, Settings, Cpu];
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`p-8 border rounded-2xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-[#D8DCE3] shadow-sm'}`}
                >
                  <div className="mb-2 p-3 w-fit transition-colors">
                    <Icon className={`${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`} size={28} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="Skills" className={`py-8 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-5xl font-bold mb-8 serif ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
              >
                {t.sections.technicalExpertise.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-lg leading-relaxed mb-10 ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}
              >
                {t.sections.technicalExpertise.desc}
              </motion.p>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8"
              >
                {t.sections.technicalExpertise.skills.map((skill, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeIn}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#2F5FD7]'}`} />
                    <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 relative flex items-center justify-center"
            >
              <div className="relative z-10 w-full max-w-lg">
                <IconCloud iconSlugs={[
                  "typescript",
                  "javascript",
                  "react",
                  "html5",
                  "css3",
                  "nodedotjs",
                  "express",
                  "nextdotjs",
                  "postgresql",
                  "firebase",
                  "vercel",
                  "jest",
                  "docker",
                  "git",
                  "github",
                  "figma",
                  "mongodb",
                  "tailwindcss",
                  "sap",
                  "slack",
                  "notion",
                  "jira",
                  "confluence",
                  "python",
                  "pandas",
                  "numpy"
                ]} />
              </div>
              <div className={`absolute -inset-4 blur-3xl rounded-full z-0 ${darkMode ? 'bg-blue-500/5' : 'bg-[#2F5FD7]/5'}`} />
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            t={t}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

      {/* Experience section */}
      <section id="experience" className={`py-8 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-[#0b1220] border-slate-800' : 'bg-[#F4F5F7] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.sections.experience.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`max-w-2xl mx-auto text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}
            >
              {t.sections.experience.subtitle}
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="md:max-w-[65%] relative ml-4 md:ml-0">
              {cvData.experience.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative pl-8 pb-12 last:pb-0 border-l ${darkMode ? 'border-slate-700' : 'border-[#D8DCE3]'}`}
                >
                  <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-[#2F5FD7]'}`} />
                  <div className="mb-4">
                    <span className={`font-mono text-sm block mb-1 ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}>{exp.period}</span>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{exp.role}</h3>
                    <p className={`font-medium ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>{exp.company}</p>
                  </div>
                  <p className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education section */}
      <section id="formation" className={`py-8 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-12 items-stretch max-w-4xl mx-auto">
            <div className="md:col-span-2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
              >
                {t.sections.education}
              </motion.h2>
              <div className="relative ml-4 md:ml-0">
                {cvData.education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative pl-8 pb-12 last:pb-0 border-l ${darkMode ? 'border-slate-700' : 'border-[#D8DCE3]'}`}
                  >
                    <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-[#2F5FD7]'}`} />
                    <div className="mb-4">
                      <span className={`font-mono text-sm block mb-1 ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}>{edu.period}</span>
                      {(() => {
                        const parts = edu.degree.split(/ in /i);
                        const diploma = parts[0];
                        const field = parts.length > 1 ? parts.slice(1).join(' in ') : null;
                        return (
                          <>
                            <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{diploma}</h3>
                            {field && (
                              <p className={`font-medium mt-1 ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>{field}</p>
                            )}
                            <p className={`font-medium ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>{edu.school}</p>
                          </>
                        );
                      })()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 flex flex-col md:h-full gap-8">
              <div className={`flex-1 rounded-xl border p-6 ${darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-[#D8DCE3] bg-white shadow-sm'}`}>
                <h4 className={`text-lg font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-[#6B7280]'}`}>{t.footer.languages}</h4>
                <div className="space-y-3">
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>🇬🇧 English: Native</p>
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>🇫🇷 French: Native</p>
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>🇪🇸 Spanish: Native</p>
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>🇮🇹 Italian: Fluent (B2)</p>
                </div>
              </div>

              <div className={`flex-1 rounded-xl border p-6 ${darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-[#D8DCE3] bg-white shadow-sm'}`}>
                <h4 className={`text-lg font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-[#6B7280]'}`}>{t.footer.interests}</h4>
                <div className="flex flex-wrap gap-2">
                  {cvData.extra.map((item, i) => (
                    <span key={i} className={`px-3 py-1 rounded-md text-sm ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#F4F5F7] text-[#4A5568] border border-[#D8DCE3]'}`}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className={`pt-8 pb-0 scroll-mt-16 transition-colors duration-300 ${darkMode ? 'bg-[#0b1220]' : 'bg-[#F4F5F7]'}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
          >
            Contact
          </motion.h2>
          <p className={`text-lg leading-relaxed mb-12 ${darkMode ? 'text-slate-400' : 'text-[#4A5568]'}`}>
            Interested in improving your operations or systems?
            <br />
            Let’s connect.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-full ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-[#2F5FD7] border border-[#D8DCE3]'}`}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>Email</h4>
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>{cvData.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-full ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-[#2F5FD7] border border-[#D8DCE3]'}`}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>Phone</h4>
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>{cvData.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-full ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-[#2F5FD7] border border-[#D8DCE3]'}`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>Location</h4>
                  <p className={darkMode ? 'text-slate-400' : 'text-[#4A5568]'}>{cvData.contact.location}</p>
                </div>
              </div>
              <div>
                <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>Socials</h4>
                <div className="flex gap-4">
                  <a href="#" className={`p-4 rounded-full hover:text-blue-400 transition-all ${darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-[#4A5568] hover:bg-[#EDEFF2] border border-[#D8DCE3]'}`}>
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className={`p-4 rounded-full hover:text-blue-400 transition-all ${darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-[#4A5568] hover:bg-[#EDEFF2] border border-[#D8DCE3]'}`}>
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative flex items-center justify-center"
            >
              <div className="relative z-10 w-full max-w-sm lg:max-w-lg -mt-12">
                <SpinningGlobe darkMode={darkMode} />
              </div>
            </motion.div>
          </div>

          <div className={`mt-8 pt-6 border-t text-center text-sm pb-2 ${darkMode ? 'border-slate-800 text-slate-600' : 'border-[#D8DCE3] text-[#6B7280]'}`}>
            © {new Date().getFullYear()} Yannick Wild. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  );
};

export default Portfolio;
