import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Zap,
  Briefcase, 
  GraduationCap, 
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Linkedin,
  Github,
  User,
  Layout,
  Download,
  Settings,
  Database,
  Bot,
  Layers,
  X,
  Sun,
  Moon,
  Menu,
  ChevronDown
} from 'lucide-react';

const IconCloud = lazy(() => import("./components/ui/interactive-icon-cloud").then(m => ({ default: m.IconCloud })));
const SpinningGlobe = lazy(() => import('./Globe').then(m => ({ default: m.Globe })));

const ICON_CLOUD_SLUGS = [
  "claude",
  "copilot",
  "css3",
  "docker",
  "expo",
  "figma",
  "firebase",
  "git",
  "github",
  "html5",
  "hubspot",
  "intellijidea",
  "javascript",
  "jira",
  "kaggle",
  "lucid",
  "miro",
  "mysql",
  "numpy",
  "odoo",
  "pandas",
  "postman",
  "python",
  "react",
  "render",
  "sap",
  "slack",
  "springboot",
  "tailwindcss"
];

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const CardCarousel = React.memo(({ project, darkMode }) => {
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
        {images.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-300 ease-in-out"
            style={{ opacity: idx === currentImageIndex ? 1 : 0, pointerEvents: idx === currentImageIndex ? 'auto' : 'none' }}
          >
            <img 
              src={img} 
              alt={`${project.title} - ${idx + 1}`}
              loading="lazy"
              className={`w-full h-full ${project.imageContain ? 'object-cover object-left-top' : 'object-cover'} transition-[filter] duration-500 ${darkMode ? 'brightness-[0.8]' : 'brightness-[0.95]'} group-hover:brightness-100`}
            />
            <div className={`absolute inset-0 transition-colors group-hover:bg-transparent ${darkMode ? 'bg-slate-900/30' : 'bg-slate-900/5'}`} />
          </div>
        ))}

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
  });

  const ProjectModal = ({ project, onClose, t, darkMode }) => {
    // Fix for "click inside, release outside" closing the modal
    const [isMouseDownOnOverlay, setIsMouseDownOnOverlay] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }, []);

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
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${darkMode ? 'bg-slate-950/80' : 'bg-black/50'}`}
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
            className={`absolute top-4 right-4 z-20 p-2 backdrop-blur-md rounded-full transition-colors border ${darkMode ? 'bg-slate-900/50 text-slate-300 hover:text-blue-400 border-slate-700/50' : 'bg-white/80 text-[#1F2933] hover:text-[#2F5FD7] border-[#D8DCE3]'}`}
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className={`w-full p-8 overflow-y-auto ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="mb-8">
              <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.title}</h3>
              {project.grade && (
                <p className={`text-base font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>Grade: {project.grade}</p>
              )}
              <p className={`text-base mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.desc}</p>
            </div>

            <div className="space-y-8">
              {project.role && (
                <div className={`relative pl-4 border-l-2 ${darkMode ? 'border-blue-400/30' : 'border-[#2F5FD7]'}`}>
                  <h4 className={`text-base font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.projects.modal.role}</h4>
                  <p className={`text-base font-semibold leading-relaxed ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}>{project.role}</p>
                </div>
              )}


              {project.outcome && (
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-[#F4F5F7] border-[#D8DCE3]'}`}>
                  <h4 className={`text-base font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.projects.modal.outcome}</h4>
                  <p className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.outcome}</p>
                </div>
              )}

              {project.skillsUsed && (
                <div>
                  <h4 className={`text-base font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.projects.modal.skills}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsUsed.map((skill, i) => (
                      <span 
                        key={i}
                        className={`px-3 py-1 text-base rounded-full border ${darkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-[#EDEFF2] text-[#1F2933] border-[#D8DCE3]'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.projectLinks && project.projectLinks.length > 0 && (
                <div>
                  <h4 className={`text-base font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{project.projectLinksTitle || 'Projects Realized'}</h4>
                  <div className={`flex ${project.projectLinksInline ? 'flex-row' : 'flex-col'} gap-2`}>
                    {project.projectLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-base transition-colors w-fit ${darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-[#1F2933] hover:text-[#2F5FD7]'}`}
                      >
                        {link.label} <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };


const uiText = {
  en: {
    // Header
    nav: {
      projects: 'Projects',
      expertise: 'Expertise',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact'
    },
    // Hero
    hero: {
      name: 'Yannick Wild',
      tagline: 'Information Systems Engineer',
      bio: 'Complex systems deserve simple design. I improve business processes by aligning operations with effective information systems.',
      downloadCV: 'CV',
      cvLink: 'https://drive.google.com/file/d/14IVBZ4uwHJ2MXbbxYBxkrkFKKj6yXr07/view?usp=sharing',
      contact: 'Contact',
      linkedin: 'https://www.linkedin.com/in/yannick-wild/',
      github: 'https://github.com/yanowild',
      seeMore: 'See more'
    },
    // Projects
    projects: {
      title: 'Projects',
      modal: {
        role: 'My Role',
        outcome: 'Outcome',
        skills: 'Skills',
      },
      categories: {
        all: 'All',
        professional: 'Professional',
        academic: 'Academic',
        personal: 'Personal'
      },
      items: [
        {
          title: "SAP FSM Platform",
          subtitle: "Product Owner",
          desc: "Redesigned global field service operations by implementing SAP FSM (Europe, USA, China, APAC).",
          role: "Product Owner",
          outcome: "Successfully implemented SAP FSM, optimizing global service operations through standardized service processes and performance management.",
          skillsUsed: ["BPMN", "Agile", "Analytics"],
          projectLinks: [
            { label: "Company: GFMS", url: "https://www.gfms.com/com/en.html" },
            { label: "Platform: SAP FSM", url: "https://www.sap.com/swiss/products/scm/field-service-management.html" }
          ],
          projectLinksTitle: "Links",
          category: "professional",
          tags: ["BPMN", "Agile", "Analytics"],
          imageContain: true,
          image: "/assets/SAP FSM 1.webp",
          images: [
            "/assets/SAP FSM 1.webp",
            "/assets/SAP FSM 2.webp",
            "/assets/SAP FSM 3.webp",
          ]
        },
        {
          title: "Hotel Procurement",
          subtitle: "Project Manager",
          desc: "Managed end-to-end procurement services and on-site installations for luxury hotel openings.",
          role: "Project Manager",
          outcome: "Successfully managed budgeting, purchasing, deliveries, and installations of 5,000+ items across 100+ suppliers.",
          skillsUsed: ["Logistics", "Sourcing", "Team"],
          projectLinks: [
            { label: "Company: Sunnyland", url: "https://www.sunnylandconsulting.com" },
            { label: "Project: Six Senses Ibiza", url: "https://www.sixsenses.com/en/hotels-resorts/europe/spain/ibiza" },
            { label: "Project: Rosewood Villa Magna", url: "https://www.rosewoodhotels.com/en/villa-magna" }
          ],
          projectLinksTitle: "Links",
          category: "professional",
          tags: ["Logistics", "Sourcing", "Team"],
          image: "/assets/Hotel Procurement 1.webp",
          images: [
            "/assets/Hotel Procurement 1.webp",
            "/assets/Hotel Procurement 2.webp",
            "/assets/Hotel Procurement 3.webp",
          ]
        },
        {
          title: "HEC Master Thesis",
          subtitle: "Researcher (Grade: 6/6)",
          desc: "Research examining how interaction design influences user trust and sense of control in AI travel planning.",
          role: "Researcher",
          outcome: "Developed and user-tested two AI interfaces, a Chatbot and a Graphical User Interface. The study generated insights into how interaction modalities influence user trust and sense of control. Grade: 6/6.",
          skillsUsed: ["Interviews", "Experiment", "AI"],
          projectLinks: [
            { label: "University: HEC", url: "https://www.unil.ch/hec/en/home/menuinst/master/systemes-d-information.html" }
          ],
          projectLinksTitle: "Links",
          category: "academic",
          tags: ["Interviews", "Experiment", "AI"],
          image: "/assets/Master Thesis 1.webp",
          images: [
            "/assets/Master Thesis 1.webp",
            "/assets/Master Thesis 2.webp",
            "/assets/Master Thesis 3.webp",
          ]
        },
        {
          title: "EHL Bachelor Project",
          subtitle: "Consultant (Grade: 6/6)",
          desc: "Developed a business development strategy and market entry plan for an IoT air quality solutions company.",
          role: "Consultant",
          outcome: "Translated IoT solutions into business value by focusing on strategic partnerships and open-API integration. Grade 6/6.",
          skillsUsed: ["Strategy", "Data", "IoT"],
          projectLinks: [
            { label: "University: EHL", url: "https://www.ehl.edu" },
            { label: "Company: Arve", url: "https://www.arveair.com" }
          ],
          projectLinksTitle: "Links",
          category: "academic",
          tags: ["Strategy", "Data", "IoT"],
          image: "/assets/Arve 1.webp",
          images: [
            "/assets/Arve 1.webp",
            "/assets/Arve 2.webp",
            "/assets/Arve 3.webp"
          ]
        },
        {
          title: "Applied Projects",
          desc: "Projects developed in collaboration with industry professionals during my Master's at HEC Lausanne.",
          role: "Consultant",
          outcome: "SAP: Designed an AI-driven sales process for SAP partners.\nValtronic: Designed an AI-driven KPI cockpit.",
          skillsUsed: ["Architecture", "Roadmap", "AI"],
          projectLinks: [
            { label: "Company: SAP", url: "https://www.sap.com/index.html" },
            { label: "Company: Valtronic", url: "https://valtronic.com/" }
          ],
          projectLinksTitle: "Links",
          subtitle: "Consultant",
          category: "academic",
          tags: ["Architecture", "Roadmap", "AI"],
          image: "/assets/Applied Projects 1.webp",
          images: [
            "/assets/Applied Projects 1.webp",
            "/assets/Applied Projects 2.webp",
          ]
        },
        {
          title: "Travelpop",
          subtitle: "Full Stack Developer",
          desc: "Designing and developing an AI-powered travel app for web and mobile as a personal project.",
          role: "Full Stack Developer",
          outcome: "Users can: \n" +
              "Manage reservations, itineraries, travel documentation, and budgets.\n" +
              "Invite other users to edit or view a trip.\n" +
              "Interact with AI and Google maps directly in the app.",
          skillsUsed: ["Full-Stack", "UX/UI", "AI"],
          projectLinks: [
            { label: "Travelpop", url: "https://www.travelpop.app" },
          ],
          projectLinksTitle: "Links",
          category: "personal",
          tags: ["Full-Stack", "UX/UI", "AI"],
          image: "/assets/travelpop1.webp",
          images: [
            "/assets/travelpop1.webp",
          ]
        }
      ]
    },
    // Expertise
    expertise: {
      title: 'My Expertise',
      items: [
        {
          title: 'Information Systems',
          titleLine1: 'Information',
          titleLine2: 'Systems',
          desc: 'Working across systems architecture, data structures and software development.'
        },
        {
          title: 'Process Optimization',
          titleLine1: 'Process',
          titleLine2: 'Optimization',
          desc: 'Improving efficiency by implementing structured and scalable business processes.'
        },
        {
          title: 'Artificial Intelligence',
          titleLine1: 'Artificial',
          titleLine2: 'Intelligence',
          desc: 'Leveraging AI tools for development, automation, and workflow acceleration.'
        },
        {
          title: 'Interaction Design',
          titleLine1: 'Interaction',
          titleLine2: 'Design',
          desc: 'Focusing on user experience to design intuitive, engaging, and enjoyable interfaces.'
        }
      ]
    },
    // Skills
    skills: {
      title: 'Skills',
      engineering: 'Engineering',
      platforms: 'Platforms',
      interpersonal: 'Interpersonal',
      languages: 'Languages',
      engineeringSkills: [
        'Artificial Intelligence',
        'Java · Python · SQL',
        'HTML · CSS · JS',
        'Spring · Auth · API',
      ],
      platformsSkills: [
        'IntelliJ · Github',
        'Jira · Postman',
        'SAP · Odoo',
        'Archimate · BPMN',
      ],
      interpersonalSkills: [
        'Problem Solver',
        'Organized',
        'Resourceful',
        'Team Player'
      ],
      languagesSkills: [
        '🇫🇷 French: Native',
        '🇬🇧 English: Native',
        '🇪🇸 Spanish: Native',
        '🇮🇹 Italian: Fluent (B2)'
      ]
    },
    // Experience
    experience: {
      title: 'Experience',
      items: [
        {
          company: "Travelpop",
          location: "Personal Project",
          role: "Full Stack Dev",
          period: "2024 - Present",
          description: ["Building a travel app (web + mobile) where users can:", "Manage reservations, itineraries, travel documentation, and budgets."," Invite other users to edit or view a trip.", "Interact with AI and Google maps directly in the app."]
        },
        {
          company: "GF Machining Solutions",
          location: "Geneva",
          role: "Product Owner",
          period: "2021 - 2023",
          description: ["Led the implementation of SAP FSM to optimize global service operations.", "Analyzed service processes and ERP data in Europe, US, China, and APAC."," Designed standard service processes in SAP FSM.", "Defined KPIs and configured dashboards in SAP Analytics Cloud."]
        },
        {
          company: "Sunnyland Consulting",
          location: "Madrid",
          role: "Project Manager",
          period: "2019 - 2021",
          description: ["Managed a team to deliver end-to-end procurement services for luxury hotel openings.", "Procurement services included: budget control, purchasing, deliveries, and installations.", "Implemented a new operational structure to improve workflow productivity."]
        },
        {
          company: ["Beau-Rivage Palace", "Hotel Bernerhof", "Grand Hôtel & Centre Thermal"],
          location: ["Lausanne", "Grindelwald", "Yverdon"],
          role: "Hotel Ops",
          period: "2014 – 2017",
          description: "Operational experience in F&B (service & kitchen), and front office."
        }
      ]
    },
    // Education
    education: {
      title: 'Education',
      items: [
        {
          school: "HEC Lausanne",
          degree: "Master in Information Systems & Digital Innovation",
          period: "2024 - 2026"
        },
        {
          school: "EHL École Hôtelière de Lausanne",
          degree: "Bachelor in Hospitality Management",
          period: "2016 - 2020"
        }
      ]
    },
    // Contact
    contact: {
      title: 'Contact',
      interested: 'Interested in improving your systems?',
      letsConnect: "Let's connect.",
      socials: 'Socials',
      phone: "+41 79 910 10 84",
      email: "wildyannick1@gmail.com",
      location: "Switzerland",
      nationality: "Swiss"
    },
    // Footer
    footer: {
      extra: ["Fitness", "Kitesurf", "Snowboard"]
    }
  },
  fr: {
    // Header
    nav: {
      projects: 'Projets',
      expertise: 'Expertise',
      skills: 'Compétences',
      experience: 'Expérience',
      education: 'Formation',
      contact: 'Contact'
    },
    // Hero
    hero: {
      name: 'Yannick Wild',
      tagline: 'Ingénieur Systèmes d\'Information',
      bio: 'Les systèmes complexes méritent un design simple. J\'améliore les processus métier en alignant les opérations avec les systèmes d\'information.',
      downloadCV: 'CV',
      cvLink: 'https://drive.google.com/file/d/1xjdaQb2RPjO0fWjo-KNL8p_Sb8oXoiIX/view?usp=sharing',
      contact: 'Contact',
      linkedin: 'https://www.linkedin.com/in/yannick-wild/',
      github: 'https://github.com/yanowild',
      seeMore: 'Voir plus'
    },
    // Projects
    projects: {
      title: 'Projets',
      modal: {
        role: 'Mon Rôle',
        outcome: 'Résultat',
        skills: 'Compétences',
      },
      categories: {
        all: 'Tous',
        professional: 'Professionnel',
        academic: 'Académique',
        personal: 'Personnel'
      },
      items: [
        {
          title: "Plateforme SAP FSM",
          subtitle: "Product Owner",
          desc: "Implémentation de SAP FSM pour optimiser la gestion globale des services (Europe, États-Unis, Chine, APAC).",
          role: "Product Owner",
          outcome: "Implémentation réussie de SAP FSM, permettant la standardisation globale des processus de service client ainsi que l’amélioration du pilotage de la performance.",
          skillsUsed: ["BPMN", "Agile", "Analytique"],
          projectLinks: [
            { label: "Entreprise : GFMS", url: "https://www.gfms.com/com/en.html" },
            { label: "Plateforme : SAP FSM", url: "https://www.sap.com/swiss/products/scm/field-service-management.html" }
          ],
          projectLinksTitle: "Liens",
          category: "professional",
          tags: ["BPMN", "Agile", "Analytique"],
          imageContain: true,
          image: "/assets/SAP FSM 1.webp",
          images: [
            "/assets/SAP FSM 1.webp",
            "/assets/SAP FSM 2.webp",
            "/assets/SAP FSM 3.webp",
          ]
        },
        {
          title: "Projets Hôteliers",
          subtitle: "Chef de Projet",
          desc: "Pilotage des achats, contrôle budgétaire, livraisons et installations pour des projets de rénovation d’hôtels de luxe.",
          role: "Chef de Projet",
          outcome: "Gestion réussie du budget, des achats, des livraisons et des installations de plus de 5 000 articles auprès de plus de 100 fournisseurs.",
          skillsUsed: ["Achats", "Budget", "Logistique"],
          projectLinks: [
            { label: "Entreprise : Sunnyland", url: "https://www.sunnylandconsulting.com" },
            { label: "Projet : Six Senses Ibiza", url: "https://www.sixsenses.com/en/hotels-resorts/europe/spain/ibiza" },
            { label: "Projet : Rosewood Villa Magna", url: "https://www.rosewoodhotels.com/en/villa-magna" }
          ],
          projectLinksTitle: "Liens",
          category: "professional",
          tags: ["Achats", "Budget", "Logistique"],
          image: "/assets/Hotel Procurement 1.webp",
          images: [
            "/assets/Hotel Procurement 1.webp",
            "/assets/Hotel Procurement 2.webp",
            "/assets/Hotel Procurement 3.webp",
          ]
        },
        {
          title: "HEC - Mémoire Master",
          subtitle: "Chercheur (Note : 6/6)",
          desc: "Impact du design d’interaction sur la confiance et le sentiment de contrôle dans la planification de voyages assitée par l'IA.",
          role: "Chercheur",
          outcome: "Développement et test utilisateur de deux interfaces d'IA (Chatbot et Interface Graphique). L'étude a mis en évidence l'influence des modalités d'interaction sur la confiance et le sentiment de contrôle. Note : 6/6.",
          skillsUsed: ["Entretiens", "Expérience", "IA"],
          projectLinks: [
            { label: "Université : HEC", url: "https://www.unil.ch/hec/en/home/menuinst/master/systemes-d-information.html" }
          ],
          projectLinksTitle: "Liens",
          category: "academic",
          tags: ["Entretiens", "Expérience", "IA"],
          image: "/assets/Master Thesis 1.webp",
          images: [
            "/assets/Master Thesis 1.webp",
            "/assets/Master Thesis 2.webp",
            "/assets/Master Thesis 3.webp",
          ]
        },
        {
          title: "EHL - Projet Bachelor",
          subtitle: "Consultant (Note : 6/6)",
          desc: "Stratégie commerciale et plan d’entrée sur le marché pour une entreprise de solutions IoT en qualité de l’air.",
          role: "Consultant",
          outcome: "Élaboration d’une stratégie de création de valeur via des partenariats stratégiques et l’intégration d’API ouvertes. Note : 6/6.",
          skillsUsed: ["Stratégie", "Données", "IoT"],
          projectLinks: [
            { label: "Université : EHL", url: "https://www.ehl.edu" },
            { label: "Entreprise : Arve", url: "https://www.arveair.com" }
          ],
          projectLinksTitle: "Liens",
          category: "academic",
          tags: ["Stratégie", "Données", "IoT"],
          image: "/assets/Arve 1.webp",
          images: [
            "/assets/Arve 1.webp",
            "/assets/Arve 2.webp",
            "/assets/Arve 3.webp"
          ]
        },
        {
          title: "Projets Appliqués",
          desc: "Projets développés en collaboration avec des professionnels lors de mon Master à HEC Lausanne.",
          role: "Consultant",
          outcome: "SAP : Conception d'un processus de vente piloté par l'IA.\nValtronic : Conception d’un cockpit de pilotage des KPI basé sur l’IA.",
          skillsUsed: ["Architecture", "Roadmap", "IA"],
          projectLinks: [
            { label: "Entreprise : SAP", url: "https://www.sap.com/index.html" },
            { label: "Entreprise : Valtronic", url: "https://valtronic.com/" }
          ],
          projectLinksTitle: "Liens",
          subtitle: "Consultant",
          category: "academic",
          tags: ["Architecture", "Roadmap", "IA"],
          image: "/assets/Applied Projects 1.webp",
          images: [
            "/assets/Applied Projects 1.webp",
            "/assets/Applied Projects 2.webp",
          ]
        },
        {
          title: "Travelpop",
          subtitle: "Développeur Full Stack",
          desc: "Conception et développement d'une application de voyage intégrant des fonctionnalités d’IA (web + mobile).",
          role: "Développeur Full Stack",
          outcome: "Les utilisateurs peuvent :\n" +
              "Gérer les réservations, itinéraires, documents de voyage et budgets.\n" +
              "Inviter d'autres utilisateurs à modifier ou consulter un voyage.\n" +
              "Interagir avec l'IA et Google Maps directement dans l'application.",
          skillsUsed: ["Full-Stack", "UX/UI", "IA"],
          projectLinks: [
            { label: "Travelpop", url: "https://www.travelpop.app" },
          ],
          projectLinksTitle: "Liens",
          category: "personal",
          tags: ["Full-Stack", "UX/UI", "IA"],
          image: "/assets/travelpop1.webp",
          images: [
            "/assets/travelpop1.webp",
          ]
        }
      ]
    },
    // Expertise
    expertise: {
      title: 'Mon Expertise',
      items: [
        {
          title: 'Systèmes d\'Information',
          titleLine1: 'Systèmes',
          titleLine2: 'd\'Information',
          desc: 'Architecture de systèmes, modélisation de données et développement de logiciels.'
        },
        {
          title: 'Optimisation des Processus',
          titleLine1: 'Optimisation',
          titleLine2: 'des Processus',
          desc: 'Optimisation des processus métier pour améliorer la productivité et la scalabilité.'
        },
        {
          title: 'Intelligence Artificielle',
          titleLine1: 'Intelligence',
          titleLine2: 'Artificielle',
          desc: 'Intégration d\'outils d\'IA pour le développement et l\'accélération des workflows.'
        },
        {
          title: 'Design d\'Interaction',
          titleLine1: 'Design',
          titleLine2: 'd\'Interaction',
          desc: 'Conception d\'interfaces intuitives centrées sur l\'expérience utilisateur.'
        }
      ]
    },
    // Skills
    skills: {
      title: 'Compétences',
      engineering: 'Ingénierie',
      platforms: 'Plateformes',
      interpersonal: 'Interpersonnel',
      languages: 'Langues',
      engineeringSkills: [
        'Intelligence Artificielle',
        'Java · Python · SQL',
        'HTML · CSS · JS',
        'Spring · Auth · API',
      ],
      platformsSkills: [
        'IntelliJ · Github',
        'Jira · Postman',
        'SAP · Odoo',
        'ArchiMate · BPMN',
      ],
      interpersonalSkills: [
        'Résolution de problèmes',
        'Organisation',
        'Autonomie',
        'Esprit d\'équipe'
      ],
      languagesSkills: [
        '🇫🇷 Français : Natif',
        '🇬🇧 Anglais : Natif',
        '🇪🇸 Espagnol : Natif',
        '🇮🇹 Italien : Courant (B2)'
      ]
    },
    // Experience
    experience: {
      title: 'Expérience',
      items: [
        {
          company: "Travelpop",
          location: "Projet Personnel",
          role: "Full Stack Dev",
          period: "2024 - Présent",
          description: ["Développement d'une application de voyages (web + mobile) permettant aux utilisateurs de :", "Gérer les réservations, itinéraires, documents de voyage et budgets.", "Inviter d'autres utilisateurs à collaborer sur un voyage.", "Interagir avec l'IA et Google Maps directement dans l'application."]
        },
        {
          company: "GF Machining Solutions",
          location: "Genève",
          role: "Product Owner",
          period: "2021 - 2023",
          description: ["Pilotage de l’implémentation globale de SAP FSM pour optimiser la gestion des services et les flux de travail.", "Analyse des processus de service et des données ERP en Europe, États-Unis, Chine et APAC.", "Conception de processus de service standardisés dans SAP FSM.", "Définition de KPIs et configuration de tableaux de bord dans SAP Analytics Cloud."]
        },
        {
          company: "Sunnyland Consulting",
          location: "Madrid",
          role: "Chef de Projet",
          period: "2019 - 2021",
          description: ["Pilotage d’une équipe en charge de l’approvisionnement pour des projets de rénovation d’hôtels de luxe.", "Responsabilités : contrôle budgétaire, sourcing, achats, livraisons et installations.", "Déploiement d’une nouvelle structure opérationnelle afin d’optimiser les flux de travail et la productivité."]
        },
        {
          company: ["Beau-Rivage Palace", "Hotel Bernerhof", "Grand Hôtel & Centre Thermal"],
          location: ["Lausanne", "Grindelwald", "Yverdon"],
          role: "Hôtellerie",
          period: "2014 – 2017",
          description: "Expérience opérationnelle en F&B (service & cuisine) et réception."
        }
      ]
    },
    // Education
    education: {
      title: 'Formation',
      items: [
        {
          school: "HEC Lausanne",
          degree: "Master en Systèmes d'Information & Innovation Digitale",
          period: "2024 - 2026"
        },
        {
          school: "EHL École Hôtelière de Lausanne",
          degree: "Bachelor en Management Hôtelier",
          period: "2016 - 2020"
        }
      ]
    },
    // Contact
    contact: {
      title: 'Contact',
      interested: 'Vous souhaitez optimiser vos systèmes ?',
      letsConnect: 'Prenons contact.',
      socials: 'Réseaux',
      phone: "+41 79 910 10 84",
      email: "wildyannick1@gmail.com",
      location: "Suisse",
      nationality: "Suisse"
    },
    // Footer
    footer: {
      copyright: '© {year} Yannick Wild. Tous droits réservés.',
      extra: ["Fitness", "Kitesurf", "Snowboard"]
    }
  }
};
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3 }
};

const Portfolio = () => {
  const [language, setLanguage] = useState('en');
  const t = uiText[language];

  const switchLanguage = (newLang) => {
    if (newLang === language) return;

    const sectionIds = ['profil', 'projects', 'expertise', 'skills', 'experience', 'education', 'contact'];
    const scrollY = window.scrollY;
    const viewportTop = scrollY;

    // Find which section the TOP of the viewport is inside, and compute proportional progress
    let anchorId = null;
    let proportionalOffset = 0; // 0..1 how far through the section the viewport top is
    let pixelOffsetFromSectionTop = 0;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const elTop = el.getBoundingClientRect().top + scrollY;
        if (elTop <= viewportTop) {
          anchorId = sectionIds[i];
          const sectionHeight = el.offsetHeight;
          pixelOffsetFromSectionTop = viewportTop - elTop;
          proportionalOffset = sectionHeight > 0 ? pixelOffsetFromSectionTop / sectionHeight : 0;
          break;
        }
      }
    }
    if (!anchorId) {
      anchorId = sectionIds[0];
      proportionalOffset = 0;
    }

    // Fade out smoothly, then switch language & correct scroll while invisible
    const root = document.documentElement;
    const body = document.body;
    const bgColor = darkMode ? '#0b1220' : '#F4F5F7';
    root.style.backgroundColor = bgColor;
    body.style.transition = 'opacity 0.15s ease-out';
    body.style.opacity = '0';

    const onFadedOut = () => {
      body.removeEventListener('transitionend', onFadedOut);

      setLanguage(newLang);

      // Triple rAF to be absolutely sure React + browser layout is done
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const el = document.getElementById(anchorId);
            if (el) {
              const newElTop = el.getBoundingClientRect().top + window.scrollY;
              const newSectionHeight = el.offsetHeight;
              const targetScrollY = newElTop + (proportionalOffset * newSectionHeight);
              window.scrollTo({ top: targetScrollY, behavior: 'instant' });
            }

            // Fade back in
            body.style.transition = 'opacity 0.2s ease-in';
            body.style.opacity = '1';
            const onFadedIn = () => {
              body.removeEventListener('transitionend', onFadedIn);
              body.style.transition = '';
              body.style.opacity = '';
              root.style.backgroundColor = '';
            };
            body.addEventListener('transitionend', onFadedIn, { once: true });
          });
        });
      });
    };
    body.addEventListener('transitionend', onFadedOut, { once: true });
  };
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [activeFilter, setActiveFilter] = useState('all');

  const [selectedProject, setSelectedProject] = useState(null);

  React.useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.style.backgroundColor = darkMode ? '#0b1220' : '#F4F5F7';
  }, [darkMode]);

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


  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className={`min-h-screen selection:bg-blue-400/30 transition-colors duration-300 ${darkMode ? 'bg-[#0b1220] text-slate-300' : 'bg-[#F4F5F7] text-[#1F2933]'}`}>
      <nav className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${darkMode ? 'border-slate-800/80 bg-[#0b1220]/85' : 'border-[#D8DCE3] bg-[#F4F5F7]/90'}`}>
        <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6">
          <a href="#profil" className={`flex items-center gap-2 text-lg font-bold tracking-wide transition-colors duration-300 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
            <Layers className={darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'} size={20} />
            Portfolio
          </a>
          
          <div className={`hidden items-center gap-8 text-base lg:flex transition-colors duration-300 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
            <a href="#projects" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-[#2F5FD7]'}`}>
              <Layout size={16} /> {t.nav.projects}
            </a>
            <a href="#expertise" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-[#2F5FD7]'}`}>
              <Settings size={16} /> {t.nav.expertise}
            </a>
            <a href="#skills" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-[#2F5FD7]'}`}>
              <Zap size={16} /> {t.nav.skills}
            </a>
            <a href="#experience" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-[#2F5FD7]'}`}>
              <Briefcase size={16} /> {t.nav.experience}
            </a>
            <a href="#education" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-[#2F5FD7]'}`}>
              <GraduationCap size={16} /> {t.nav.education}
            </a>
            <a href="#contact" className={`flex items-center gap-2 transition-colors ${darkMode ? 'hover:text-blue-400' : 'hover:text-[#2F5FD7]'}`}>
              <Mail size={16} /> {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${darkMode ? 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#1F2933] hover:bg-[#EDEFF2]'}`}
              title="Menu"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${darkMode ? 'border-slate-700 bg-slate-800/40 text-yellow-400 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#1F2933] hover:text-[#2F5FD7]'}`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 cursor-pointer ${darkMode ? 'border-slate-700 bg-slate-800/40 text-blue-400 hover:bg-slate-700/60' : 'border-[#D8DCE3] bg-white text-[#1F2933] hover:text-[#2F5FD7]'}`}
                title={language === 'en' ? 'Change language' : 'Changer de langue'}
              >
                {language === 'en' ? 'EN' : 'FR'}
              </button>
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-36 rounded-lg border shadow-lg overflow-hidden ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-[#D8DCE3] bg-white'}`}
                  >
                    <button
                      onClick={() => { switchLanguage('en'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${language === 'en' ? (darkMode ? 'text-blue-400 bg-slate-700/50' : 'text-[#2F5FD7] bg-[#EDEFF2]') : (darkMode ? 'text-slate-300 hover:bg-slate-700/50 hover:text-blue-400' : 'text-[#1F2933] hover:bg-[#EDEFF2] hover:text-[#2F5FD7]')}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { switchLanguage('fr'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${language === 'fr' ? (darkMode ? 'text-blue-400 bg-slate-700/50' : 'text-[#2F5FD7] bg-[#EDEFF2]') : (darkMode ? 'text-slate-300 hover:bg-slate-700/50 hover:text-blue-400' : 'text-[#1F2933] hover:bg-[#EDEFF2] hover:text-[#2F5FD7]')}`}
                    >
                      Français
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <div className={`flex flex-col gap-1 px-6 py-4 text-base ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                {[
                  { href: '#projects', icon: Layout, label: t.nav.projects },
                  { href: '#expertise', icon: Settings, label: t.nav.expertise },
                  { href: '#skills', icon: Zap, label: t.nav.skills },
                  { href: '#experience', icon: Briefcase, label: t.nav.experience },
                  { href: '#education', icon: GraduationCap, label: t.nav.education },
                  { href: '#contact', icon: Mail, label: t.nav.contact },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 hover:text-blue-400' : 'hover:bg-[#EDEFF2] hover:text-[#2F5FD7]'}`}
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
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              variants={fadeIn}
              className={`text-4xl md:text-8xl font-bold tracking-tight mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.hero.name}
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className={`text-lg md:text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p 
              variants={fadeIn}
              className={`text-lg md:text-xl font-medium leading-relaxed mb-8 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.hero.bio.split('.').filter(Boolean).map((sentence, i, arr) => (
                <React.Fragment key={i}>
                  {sentence.trim()}.{i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 justify-center"
            >
              {t.hero.cvLink ? (
                <a href={t.hero.cvLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors text-sm md:text-base ${darkMode ? 'bg-blue-400 text-slate-900 hover:bg-blue-400/80' : 'bg-[#2F5FD7] text-white hover:bg-[#2854b5]'}`}>
                  <Download size={20} /> {t.hero.downloadCV}
                </a>
              ) : (
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors text-sm md:text-base ${darkMode ? 'bg-blue-400 text-slate-900 hover:bg-blue-400/80' : 'bg-[#2F5FD7] text-white hover:bg-[#2854b5]'}`}>
                  <Download size={20} /> {t.hero.downloadCV}
                </button>
              )}
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className={`flex items-center gap-2 p-3 border rounded-lg transition-colors font-medium ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-blue-400' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#1F2933] hover:text-[#2F5FD7]'}`} title="Contact">
                  <Mail size={20} />
                </a>
                <a href={t.hero.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 p-3 border rounded-lg transition-colors font-medium ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-blue-400' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#1F2933] hover:text-[#2F5FD7]'}`} title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={t.hero.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 p-3 border rounded-lg transition-colors font-medium ${darkMode ? 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 hover:text-blue-400' : 'border-[#D8DCE3] bg-white hover:bg-[#EDEFF2] text-[#1F2933] hover:text-[#2F5FD7]'}`} title="GitHub">
                  <Github size={20} />
                </a>
              </div>
            </motion.div>

            <motion.a
              variants={fadeIn}
              href="#projects"
              className={`inline-flex flex-col items-center gap-1 mt-8 transition-colors ${darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-[#1F2933] hover:text-[#2F5FD7]'}`}
            >
              <span className="text-sm md:text-base font-bold">{t.hero.seeMore}</span>
              <ChevronDown size={24} className="animate-bounce" />
            </motion.a>
          </div>

        </motion.div>
        
      </header>

      {/* Projects Section */}
      <section id="projects" className={`pt-16 pb-24 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.projects.title}
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            {Object.entries(t.projects.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-6 py-2 rounded-full text-base font-medium transition-colors border ${
                  activeFilter === key 
                    ? darkMode ? 'bg-blue-400 text-slate-900 border-transparent' : 'bg-[#2F5FD7] text-white border-transparent'
                    : darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-transparent' : 'bg-white text-[#1F2933] hover:bg-[#EDEFF2] border-[#D8DCE3]'
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
              {t.projects.items
                .filter(project => activeFilter === 'all' || project.category === activeFilter)
                .map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeIn}
                    onClick={() => setSelectedProject(project)}
                    className={`group rounded-2xl overflow-hidden transition-colors cursor-pointer border ${darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-[#D8DCE3] hover:border-[#2F5FD7]/40'}`}
                  >
                  <CardCarousel project={project} darkMode={darkMode} />
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-2xl font-bold transition-colors ${darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-[#2F5FD7]'} ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                        {project.title}
                      </h3>
                      <ExternalLink size={20} className={`transition-colors ${darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-[#2F5FD7]'} ${darkMode ? 'text-slate-300' : 'text-[#6B7280]'}`} />
                    </div>
                    {/* Project card grade/subtitle */}
                    {(project.grade || project.subtitle) && (
                      <div className={`transition-colors font-medium text-base mb-4 ${darkMode ? 'text-slate-300 group-hover:text-blue-400' : 'text-[#1F2933] group-hover:text-[#2F5FD7]'}`}>
                        {project.grade && <p>Grade: {project.grade}</p>}
                        {project.subtitle && <p>{project.subtitle}</p>}
                      </div>
                    )}
                    
                    <p className={`mb-6 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 text-base rounded-full border ${darkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-[#F4F5F7] text-[#1F2933] border-[#D8DCE3]'}`}
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
      </section>

      {/* Expertise Section */}
      <section id="expertise" className={`py-16 scroll-mt-16 transition-colors duration-300 ${darkMode ? 'bg-[#0b1220]' : 'bg-[#F4F5F7]'}`}>
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
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          >
            {t.expertise.items.map((item, i) => {
              const icons = [Database, Settings, Bot, User];
              const Icon = icons[i];
              
              // Responsive column helpers (0-based index):
              const isLast = i === t.expertise.items.length - 1;
              const isRightColMd = i % 2 === 1; // md:grid-cols-2 → right column items shouldn't draw a divider
              const isLastColLg = i % 4 === 3;   // lg:grid-cols-4 → last column shouldn't draw a divider

              // Classes to control the independent separator between items
              const mobileAfterToggle = isLast ? 'after:hidden' : 'after:block';
              const mdAfterToggle = isRightColMd ? 'md:after:hidden' : 'md:after:block';
              const lgAfterToggle = isLastColLg ? 'lg:after:hidden' : 'lg:after:block';

              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={[
                    "relative px-12 pt-5 pb-8 md:py-8",
                    // Independent separator: horizontal on mobile, vertical on md+
                    "after:absolute after:pointer-events-none",
                    // Mobile: horizontal line at bottom
                    "after:bottom-0 after:left-12 after:right-12 after:h-px after:w-auto",
                    // md+: vertical line at right
                    "md:after:top-8 md:after:bottom-8 md:after:right-0 md:after:left-auto md:after:w-px md:after:h-auto",
                    darkMode ? "after:bg-slate-700" : "after:bg-[#D8DCE3]",
                    mobileAfterToggle,
                    mdAfterToggle,
                    lgAfterToggle,
                  ].join(" ")}
                >
                  <div className="relative h-full flex flex-col items-center">
                    <div className="mb-2 p-3 w-fit mx-auto transition-colors">
                      <Icon className={`${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`} size={28} />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 text-center ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                      {item.titleLine1 ? (<>{item.titleLine1}<br />{item.titleLine2}</>) : item.title}
                    </h3>
                    <div className="flex justify-center flex-grow">
                      <p className={`text-base leading-relaxed text-center max-w-xs ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-8 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.skills.title}
            </motion.h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: 3 stacked cards */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              {/* Technical Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Engineering Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-6"
                >
                  <div className="flex flex-col items-center">
                    <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.engineering}</h4>
                    <div className="space-y-3 w-fit mx-auto">
                      {t.skills.engineeringSkills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#2F5FD7]'}`} />
                          <span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Platforms Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                  className="p-6"
                >
                  <div className="flex flex-col items-center">
                    <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.platforms}</h4>
                    <div className="space-y-3 w-fit mx-auto">
                      {t.skills.platformsSkills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#2F5FD7]'}`} />
                          <span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Interpersonal Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-6"
                >
                  <div className="flex flex-col items-center">
                    <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.interpersonal}</h4>
                    <div className="space-y-3 w-fit mx-auto">
                      {t.skills.interpersonalSkills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#2F5FD7]'}`} />
                          <span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Languages Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="p-6"
                >
                  <div className="flex flex-col items-center">
                    <h4 className={`text-lg font-bold mb-4 text-center w-full ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.skills.languages}</h4>
                    <div className="space-y-3 w-fit mx-auto">
                      {t.skills.languagesSkills.map((lang, i) => (
                        <div key={i} className="flex items-center gap-3"><span className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{lang}</span></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Icon Cloud */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 relative flex items-center justify-center"
            >
              <div className="relative z-10 w-full max-w-md">
                <Suspense fallback={<div className="w-full aspect-square" />}>
                <IconCloud iconSlugs={ICON_CLOUD_SLUGS} darkMode={darkMode} />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              {t.experience.title}
            </motion.h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className={`absolute left-0 top-[1rem] bottom-0 w-px ${darkMode ? 'bg-slate-700' : 'bg-[#D8DCE3]'}`} />
              {t.experience.items.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  <div className={`absolute -left-1.5 top-2.5 w-3 h-3 rounded-full z-10 ${darkMode ? 'bg-blue-400' : 'bg-[#2F5FD7]'}`} />
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{exp.role}</h3>
                      <span className={`text-base whitespace-nowrap ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}>{exp.period}</span>
                    </div>
                    {Array.isArray(exp.company) ? exp.company.map((c, i) => (
                      <p
                        key={i}
                        className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
                      >
                        {c}{Array.isArray(exp.location) && exp.location[i] ? `, ${exp.location[i]}` : exp.location ? `, ${exp.location}` : ''}
                      </p>
                    )) : (
                      <p className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    )}
                  </div>
                  <ul className={`text-base leading-relaxed space-y-1 ml-[5px] ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
                    {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((d, i) => (
                      <li key={i} className="flex gap-2"><span className="mt-[0.70em] min-w-[5px] w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" /><span>{d}</span></li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education section */}
      <section id="education" className={`py-8 scroll-mt-16 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-[#EDEFF2] border-[#D8DCE3]'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.education.title}
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className={`absolute left-0 top-[1rem] bottom-0 w-px ${darkMode ? 'bg-slate-700' : 'bg-[#D8DCE3]'}`} />
              {t.education.items.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  <div className={`absolute -left-1.5 top-2.5 w-3 h-3 rounded-full z-10 ${darkMode ? 'bg-blue-400' : 'bg-[#2F5FD7]'}`} />
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between gap-4">
                      {(() => {
                        const parts = edu.degree.split(language === 'fr' ? / en /i : / in /i);
                        const diploma = parts[0];
                        return <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{diploma}</h3>;
                      })()}
                      <span className={`text-base whitespace-nowrap ${darkMode ? 'text-blue-400' : 'text-[#2F5FD7]'}`}>{edu.period}</span>
                    </div>
                    {(() => {
                      const parts = edu.degree.split(language === 'fr' ? / en /i : / in /i);
                      const field = parts.length > 1 ? parts.slice(1).join(language === 'fr' ? ' en ' : ' in ') : null;
                      return (
                        <>
                          {field && (
                            <p className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{field}</p>
                          )}
                          <p className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{edu.school}</p>
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className={`pt-8 pb-0 scroll-mt-16 transition-colors duration-300 ${darkMode ? 'bg-[#0b1220]' : 'bg-[#F4F5F7]'}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold mb-6 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}
            >
              {t.contact.title || 'Contact'}
            </motion.h2>
          </div>
          <p className={`text-lg leading-relaxed mb-12 text-center ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>
            {t.contact.interested || 'Interested in improving your systems?'}
            <br />
            {t.contact.letsConnect || "Let's connect."}
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-full border ${darkMode ? 'bg-slate-800 text-blue-400 border-transparent' : 'bg-white text-[#2F5FD7] border-[#D8DCE3]'}`}>
                  <Mail size={24} />
                </div>
                <p className={`text-base font-semibold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.email}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-full border ${darkMode ? 'bg-slate-800 text-blue-400 border-transparent' : 'bg-white text-[#2F5FD7] border-[#D8DCE3]'}`}>
                  <Phone size={24} />
                </div>
                <p className={`text-base font-semibold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.phone}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-full border ${darkMode ? 'bg-slate-800 text-blue-400 border-transparent' : 'bg-white text-[#2F5FD7] border-[#D8DCE3]'}`}>
                  <MapPin size={24} />
                </div>
                <p className={`text-base font-semibold ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.location}</p>
              </div>
              <div>
                <h4 className={`text-base font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-[#1F2933]'}`}>{t.contact.socials || 'Socials'}</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/yannick-wild/" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-colors border ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-blue-400 border-transparent' : 'bg-white text-[#1F2933] hover:bg-[#EDEFF2] hover:text-[#2F5FD7] border-[#D8DCE3]'}`}>
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/yanowild" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full transition-colors border ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-blue-400 border-transparent' : 'bg-white text-[#1F2933] hover:bg-[#EDEFF2] hover:text-[#2F5FD7] border-[#D8DCE3]'}`}>
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
                <Suspense fallback={<div className="w-full aspect-square" />}>
                  <SpinningGlobe darkMode={darkMode} />
                </Suspense>
              </div>
            </motion.div>
          </div>

          <div className={`mt-8 pt-6 border-t text-center text-sm pb-6 ${darkMode ? 'border-slate-800 text-slate-300' : 'border-[#D8DCE3] text-[#1F2933]'}`}>
            © {new Date().getFullYear()} Yannick Wild. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  );
};

export default Portfolio;
