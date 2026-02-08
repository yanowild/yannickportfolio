import React from 'react';
import { motion } from 'framer-motion';
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
  Github
} from 'lucide-react';

const Portfolio = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cvData = {
    name: "Yannick Wild",
    title: "IT Project Manager",
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
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        </div>
        
        <motion.div 
          className="container mx-auto px-6 z-10 text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeIn}
            className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
          >
            {cvData.name}
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="mt-6 text-xl md:text-2xl text-slate-400 font-light"
          >
            {cvData.title}
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="mt-10 flex flex-wrap justify-center gap-6"
          >
            <a href={`mailto:${cvData.contact.email}`} className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-200 transition-colors">
              <Mail size={18} /> Contact Me
            </a>
            <div className="flex items-center gap-4 px-6 py-3 border border-slate-700 rounded-full bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                <span>{cvData.contact.location}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-1 bg-blue-400 rounded-full"
            />
          </div>
        </motion.div>
      </header>

      {/* Summary / About */}
      <section className="py-24 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
              <Zap className="text-blue-400" /> Professional Persona
            </h2>
            <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed">
              {cvData.summary.split('|').map((item, i) => (
                <span key={i} className="inline-block mx-4 my-2">
                  {item.trim()}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-slate-900/50 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <Briefcase className="text-blue-400" /> Experience
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

      {/* Skills & Languages */}
      <section className="py-24 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                <Code className="text-blue-400" /> Technical Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {cvData.skills.technical.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:border-blue-500 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                <Users className="text-blue-400" /> Interpersonal
              </h2>
              <div className="grid gap-4">
                {cvData.skills.interpersonal.map((skill, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-800">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-24 bg-slate-900/50 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
            <GraduationCap className="text-blue-400" /> Education
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
      <footer className="py-24 bg-[#0a0f1d]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Languages</h4>
              <div className="space-y-3">
                <p className="text-slate-400">English: Native</p>
                <p className="text-slate-400">Spanish: Native</p>
                <p className="text-slate-400">French: Native</p>
                <p className="text-slate-400">Italian: Fluent (B2)</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.extra.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 rounded-md text-slate-400 text-sm">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Get in touch</h4>
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
