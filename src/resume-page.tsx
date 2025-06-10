import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

//==============================================================================
// TYPE DEFINITIONS
//==============================================================================

type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactElement;
};

type Project = {
  name: string;
  description: string;
  achievements: string[];
};

type Experience = {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  projects: Project[];
};

type EducationItem = {
  institution: string;
  degree: string;
  period: string;
};

type ResumeData = {
  main: {
    name: string;
    title: string;
    socials: SocialLink[];
    about: string;
    resumeUrl: string; // Direct link to PDF
  };
  experience: Experience[];
  education: EducationItem[];
  skills: string[];
};


//==============================================================================
// RESUME DATA - Customize all your information here
//==============================================================================

const resumeData: ResumeData = {
  main: {
    name: 'Alex Doe',
    title: 'Senior Frontend Developer & UI/UX Enthusiast',
    about:
      'A passionate and creative frontend developer with over 8 years of experience in building beautiful, responsive, and user-centric web applications. Proven ability to lead projects from conception to deployment. Always eager to learn new technologies and frameworks.',
    resumeUrl: '/alex-doe-resume.pdf', // Place your resume PDF in the `public` folder
    socials: [
      { name: 'GitHub', url: 'https://github.com/yourusername', icon: <FaGithub /> },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: <FaLinkedin /> },
      { name: 'Email', url: 'mailto:alex.doe@email.com', icon: <FaEnvelope /> },
    ],
  },
  experience: [
    {
      company: 'Tech Solutions Inc.',
      title: 'Senior Frontend Developer',
      period: 'Jan 2020 - Present',
      location: 'San Francisco, CA',
      description: 'Led the development of scalable, high-performance web applications using React, TypeScript, and modern JavaScript frameworks.',
      projects: [
        {
          name: 'Project Phoenix: Customer Dashboard Overhaul',
          description: 'A complete redesign of the main customer-facing dashboard, focusing on improving user experience and application performance.',
          achievements: [
            'Reduced page load times by 40% through code splitting, lazy loading, and performance profiling.',
            'Architected a new state management system using Redux Toolkit, decreasing boilerplate code by 60%.',
            'Mentored 3 junior developers, fostering a culture of knowledge sharing and best practices.',
          ],
        },
        {
          name: 'Internal Design System "Canvas"',
          description: 'Developed and maintained a company-wide component library to ensure brand consistency and accelerate development.',
          achievements: [
            'Increased development velocity by 25% by providing reusable, well-documented, and accessible components.',
            'Collaborated with UX/UI designers to translate Figma wireframes into pixel-perfect React components.',
          ],
        },
      ],
    },
    {
      company: 'Innovate Digital',
      title: 'Frontend Developer',
      period: 'Jun 2017 - Dec 2019',
      location: 'Austin, TX',
      description: 'Developed and maintained client websites and e-commerce solutions, focusing on performance and cross-browser compatibility.',
       projects: [
        {
          name: 'E-commerce Platform for "FashionForward"',
          description: 'Built a custom Shopify theme and integrated various third-party APIs for a major fashion retailer.',
          achievements: [
            'Increased conversion rates by 15% through A/B testing and checkout process optimization.',
            'Implemented a fully responsive design that passed all Google Mobile-Friendly tests with a 100% score.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      period: '2013 - 2017',
    },
     {
      institution: 'Code Academy Pro',
      degree: 'Full-Stack Web Development Certificate',
      period: '2017',
    },
  ],
  skills: [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'HTML5 & CSS3', 'Sass/SCSS', 'Tailwind CSS', 'Framer Motion', 'GraphQL (Apollo)', 'REST APIs', 'Git & GitHub', 'Webpack', 'Figma', 'Jest & RTL'
  ],
};


//==============================================================================
// SUB-COMPONENTS (Defined inside the main component for encapsulation)
//==============================================================================

const Section: React.FC<{ title: string; children: React.ReactNode; id: string }> = ({ title, children, id }) => (
  <motion.section 
    id={id}
    className="py-16 sm:py-20"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-12 relative">
      {title}
      <span className="absolute -bottom-2 left-0 w-16 h-1 bg-cyan-400 rounded-full"></span>
    </h2>
    {children}
  </motion.section>
);

const ProjectAccordion: React.FC<{ project: Project }> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-700/80 rounded-lg mb-4 overflow-hidden bg-zinc-800/50 shadow-md">
      <motion.button
        className="w-full text-left p-4 flex justify-between items-center bg-zinc-800 hover:bg-zinc-700/60 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-semibold text-lg text-cyan-300">{project.name}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FiChevronDown size={24} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-4 pb-4"
          >
            <div className="pt-4 border-t border-zinc-700">
              <p className="text-zinc-400 mb-4">{project.description}</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                {project.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


//==============================================================================
// MAIN REACTIVE RESUME COMPONENT
//==============================================================================

export default function ReactiveResumePage() {
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const activeExperience = resumeData.experience[activeCompanyIndex];

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-zinc-900 text-zinc-300 font-sans min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        
        {/* Header */}
        <motion.header 
          className="text-center py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">{resumeData.main.name}</h1>
          <h2 className="text-2xl mt-2 text-cyan-400 font-medium">{resumeData.main.title}</h2>
          <p className="max-w-2xl mx-auto mt-6 text-zinc-400">{resumeData.main.about}</p>
          <div className="flex justify-center items-center gap-6 mt-8">
            {resumeData.main.socials.map(social => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-zinc-400 hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1"
              >
                {React.cloneElement(social.icon, { size: 28 })}
              </a>
            ))}
            <a href={resumeData.main.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-cyan-500 text-zinc-900 font-bold py-2 px-5 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
              <FaFileAlt />
              My Resume
            </a>
          </div>
        </motion.header>

        <main>
          {/* Experience Section */}
          <Section title="Work Experience" id="experience">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Company Tabs */}
              <div className="w-full md:w-1/4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
                {resumeData.experience.map((exp, index) => (
                  <button
                    key={exp.company}
                    onClick={() => setActiveCompanyIndex(index)}
                    className={`text-left p-3 w-full whitespace-nowrap md:border-l-4 transition-all duration-300 ${
                      index === activeCompanyIndex
                        ? 'bg-cyan-400/10 text-cyan-300 border-cyan-400'
                        : 'border-zinc-700 hover:bg-zinc-800/80 hover:border-zinc-500'
                    }`}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>

              {/* Experience Details */}
              <div className="w-full md:w-3/4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCompanyIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-white">{activeExperience.title} <span className="text-cyan-400">@ {activeExperience.company}</span></h3>
                    <p className="text-zinc-400 mt-1 mb-4">{activeExperience.period} | {activeExperience.location}</p>
                    <p className="text-zinc-300 mb-6">{activeExperience.description}</p>
                    <h4 className="text-xl font-semibold mb-4 text-white">Key Projects & Achievements</h4>
                    {activeExperience.projects.map((proj, i) => <ProjectAccordion key={i} project={proj} />)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Section>

          {/* Education Section */}
          <Section title="Education" id="education">
            <div className="space-y-6">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="bg-zinc-800/60 p-6 rounded-lg border border-zinc-700/50 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                  <h3 className="text-xl font-semibold text-white">{edu.institution}</h3>
                  <p className="text-cyan-400 mt-1">{edu.degree}</p>
                  <p className="text-zinc-400 text-sm mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills Section */}
          <Section title="Technical Skills" id="skills">
            <motion.div 
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {resumeData.skills.map(skill => (
                <motion.span 
                  key={skill}
                  variants={skillVariants}
                  className="bg-zinc-800 text-zinc-300 text-sm font-medium px-4 py-2 rounded-full border border-zinc-700 cursor-default transition-colors duration-300 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </Section>
        </main>
        
        <footer className="text-center py-8 mt-16 border-t border-zinc-800">
            <p className="text-zinc-500">© {new Date().getFullYear()} {resumeData.main.name}. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}