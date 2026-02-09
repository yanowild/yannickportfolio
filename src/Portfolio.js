import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ExternalLink,
  Linkedin,
  Github,
  User,
  Layout,
  BarChart3,
  Download,
  ChevronDown,
  Layers
} from 'lucide-react';

const Portfolio = () => {
  const [language, setLanguage] = useState('fr');
  const [activeFilter, setActiveFilter] = useState('all');

  const uiText = {
    fr: {
      nav: {
        profile: 'Profil',
        projects: 'Projets',
        skills: 'Compétences',
        experience: 'Expérience',
        education: 'Formation',
        contact: 'Contact'
      },
      hero: {
        greeting: 'Salut, je suis',
        tagline: 'Chef de projet IT, passionné par les nouvelles technologies, l\'innovation et la transformation numérique',
        bio: 'Passionné par l\'analyse de données, l\'optimisation des processus d\'affaires et la transformation numérique, je suis en dernière année de Master en Systèmes d\'Information tout en travaillant sur divers projets alliant technologie et stratégie.',
        downloadCV: 'Télécharger CV',
        contact: 'Me contacter'
      },
      sections: {
        featuredProjects: 'Projets en vedette',
        featuredProjectsDesc: 'Une sélection de projets qui mettent en avant mes compétences et mon expertise dans le développement web et le design. Chaque projet représente un défi et une solution uniques.',
        categories: {
          all: 'Tout',
          web: 'Développement Web',
          design: 'UI/UX Design',
          mobile: 'Mobile'
        },
        experience: 'Expérience',
        technical: 'Compétences techniques',
        interpersonal: 'Interpersonnel',
        education: 'Formation'
      },
      footer: {
        languages: 'Langues',
        interests: 'Intérêts',
        touch: 'Contact'
      }
    },
    en: {
      nav: {
        profile: 'Profile',
        projects: 'Projects',
        skills: 'Skills',
        experience: 'Experience',
        education: 'Education',
        contact: 'Contact'
      },
      hero: {
        greeting: 'Hi, I am',
        tagline: 'IT Project Manager, passionate about new technologies, innovation, and digital transformation',
        bio: 'Passionate about data analysis, business process optimization, and digital transformation, I am in my final year of a Master\'s degree in Information Systems while working on various projects specializing in digitalization and business strategy.',
        downloadCV: 'Download CV',
        contact: 'Contact'
      },
      sections: {
        featuredProjects: 'Featured Projects',
        featuredProjectsDesc: 'A curated selection of projects that showcase my skills and expertise in web development and design. Each project represents a unique challenge and solution.',
        categories: {
          all: 'All',
          web: 'Web Development',
          design: 'UI/UX Design',
          mobile: 'Mobile'
        },
        experience: 'Experience',
        technical: 'Technical Skills',
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

  const t = uiText[language];
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cvData = {
    name: "Yannick",
    lastName: "Wild",
    title: "IT Project Manager",
    projects: [
      {
        title: "Personal Portfolio",
        desc: "A minimalist portfolio website built with React and Tailwind CSS, showcasing my work and skills.",
        category: "web",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "E-commerce Platform",
        desc: "A modern e-commerce platform with a focus on user experience and performance optimization.",
        category: "web",
        tags: ["React", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Mobile Banking App",
        desc: "A clean and intuitive mobile banking application designed for ease of use and security.",
        category: "mobile",
        tags: ["React Native", "Redux", "Firebase"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Dashboard UI Kit",
        desc: "A comprehensive UI kit for building modern dashboard interfaces with a focus on usability.",
        category: "design",
        tags: ["Figma", "UI Design", "Design System"],
        image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Task Management App",
        desc: "A productivity application for managing tasks, projects, and team collaboration.",
        category: "web",
        tags: ["Vue.js", "Vuex", "Firebase"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Travel Blog Website",
        desc: "A responsive blog website for sharing travel stories and photography with a focus on readability.",
        category: "web",
        tags: ["WordPress", "PHP", "Custom Theme"],
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
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
        role: "IT Product Owner",
        period: "2021 - 2023",
        points: [
          "Implemented SAP FSM to streamline and improve field service management operations.",
          "Analysed and harmonised customer service processes across four regions using different ERP systems (Great Plains, SAP, iScala).",
          "Defined KPIs and configured dashboards in SAP Analytics Cloud for performance monitoring.",
          "Owned product vision, strategy, and roadmap, aligning development with company objectives.",
          "Facilitated cross-departmental collaboration to maximize product value on business operations.",
          "Conducted workshops with stakeholders to demonstrate product usability and workflow."
        ]
      },
      {
        company: "GF Machining Solutions",
        location: "Geneva",
        role: "Project Coordinator",
        period: "2021 - 2022",
        points: [
          "Designed a new SAP customer service process, improving data accuracy and reducing error rates.",
          "Standardized data input in SAP for main European sales companies to enhance consistency."
        ]
      },
      {
        company: "Sunnyland Consulting",
        location: "Madrid",
        role: "Project Manager",
        period: "2019 - 2021",
        points: [
          "Negotiated contracts and monitored investment budgets up to €15 million for high-profile projects (Six Senses Ibiza, Rosewood Villa Magna, Mandarin Oriental Paris).",
          "Coordinated installations for up to 5,000 items from 100 suppliers.",
          "Managed a team of three (Project Manager, Project Coordinator, Installation Manager).",
          "Implemented a new operational structure improving workflow productivity.",
          "Developed advanced Excel templates and VBA macros for streamlined reporting.",
          "Designed and implemented a standardized project workflow to eliminate bottlenecks."
        ]
      }
    ],
    education: [
      {
        school: "HEC Lausanne",
        degree: "Master of Science in Information Systems and Digital Innovation",
        period: "2024 - 2025"
      },
      {
        school: "EHL Hospitality Business School",
        degree: "Bachelor of Science in International Hospitality Management",
        period: "2016 - 2020"
      }
    ],
    extra: ["Fitness", "Kitesurf", "Snowboard", "Webapp projects"]
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-200 selection:bg-blue-500/30">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 bg-[#0b1220]/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6">
          <a href="#profil" className="flex items-center gap-2 text-lg font-semibold text-white tracking-wide">
            <Layers className="text-blue-400" size={20} />
            Portfolio
          </a>
          
          <div className="hidden items-center gap-8 text-base font-medium text-slate-400 lg:flex">
            <a href="#profil" className="flex items-center gap-2 transition-colors hover:text-white">
              <User size={16} /> {t.nav.profile}
            </a>
            <a href="#projets" className="flex items-center gap-2 transition-colors hover:text-white">
              <Layout size={16} /> {t.nav.projects}
            </a>
            <a href="#competences" className="flex items-center gap-2 transition-colors hover:text-white">
              <BarChart3 size={16} /> {t.nav.skills}
            </a>
            <a href="#experience" className="flex items-center gap-2 transition-colors hover:text-white">
              <Briefcase size={16} /> {t.nav.experience}
            </a>
            <a href="#formation" className="flex items-center gap-2 transition-colors hover:text-white">
              <GraduationCap size={16} /> {t.nav.education}
            </a>
            <a href="#contact" className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail size={16} /> {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/40 p-1 text-sm font-bold text-slate-300">
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={language === 'fr' ? 'text-white bg-blue-500 rounded-full px-3 py-1 transition-all' : 'transition-colors hover:text-white px-3 py-1'}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'text-white bg-blue-500 rounded-full px-3 py-1 transition-all' : 'transition-colors hover:text-white px-3 py-1'}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header id="profil" className="relative min-h-screen scroll-mt-24 flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
        </div>
        
        <motion.div 
          className="container mx-auto px-6 z-10 text-center max-w-5xl"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.p 
            variants={fadeIn}
            className="text-blue-400 font-medium mb-4"
          >
            {t.hero.greeting}
          </motion.p>
          
          <motion.h1 
            variants={fadeIn}
            className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-8"
          >
            {cvData.name} <span className="text-blue-400">{cvData.lastName}</span>
          </motion.h1>

          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-6"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.p 
            variants={fadeIn}
            className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {t.hero.bio}
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-400 text-slate-900 rounded-lg font-bold hover:bg-blue-300 transition-colors">
              <Download size={20} /> {t.hero.downloadCV}
            </button>
            <a href="#" className="flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors text-slate-200 font-medium">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors text-slate-200 font-medium">
              <Github size={20} /> GitHub
            </a>
            <a href="#contact" className="flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors text-slate-200 font-medium">
              <Mail size={20} /> {t.nav.contact}
            </a>
          </motion.div>
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#projets" className="p-3 border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
            <ChevronDown size={24} className="text-slate-400" />
          </a>
        </motion.div>
      </header>

      {/* Featured Projects */}
      <section id="projets" className="py-24 bg-slate-900/50 scroll-mt-24 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-white mb-6"
            >
              {t.sections.featuredProjects}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 max-w-2xl text-lg leading-relaxed"
            >
              {t.sections.featuredProjectsDesc}
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {Object.entries(t.sections.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === key 
                    ? 'bg-white text-slate-900' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
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
                    className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all"
                  >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-slate-800/80 text-slate-300 text-xs font-medium rounded-full border border-slate-700"
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

      {/* Experience */}
      <section id="experience" className="py-24 bg-[#0b1220] scroll-mt-16 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <Briefcase className="text-blue-400" /> {t.sections.experience}
          </h2>
          
          <div className="space-y-12">
            {cvData.experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative pl-8 border-l border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-blue-400 font-medium">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-slate-500 font-mono mt-1">{exp.period}</span>
                </div>
                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                      <ChevronRight size={18} className="text-slate-600 mt-1 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="formation" className="py-24 bg-slate-900/50 scroll-mt-24 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <GraduationCap className="text-blue-400" /> {t.sections.education}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {cvData.education.map((edu, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-slate-800/50 border border-slate-700 rounded-2xl"
              >
                <span className="text-blue-400 font-mono text-sm">{edu.period}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{edu.degree}</h3>
                <p className="text-slate-400 mt-2">{edu.school}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Languages & Extra */}
      <footer id="contact" className="py-24 scroll-mt-24 bg-[#0b1220]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">{t.footer.languages}</h4>
              <div className="space-y-3">
                <p className="text-slate-400">English: Native</p>
                <p className="text-slate-400">Spanish: Native</p>
                <p className="text-slate-400">French: Native</p>
                <p className="text-slate-400">Italian: Fluent (B2)</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">{t.footer.interests}</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.extra.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 rounded-md text-slate-400 text-sm">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">{t.footer.touch}</h4>
              <p className="text-slate-400 mb-4">{cvData.contact.email}</p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} Yannick Wild. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
