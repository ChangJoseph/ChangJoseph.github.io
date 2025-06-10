<<<<<<< HEAD
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { FiChevronDown, FiExternalLink } from 'react-icons/fi';

//==============================================================================
// TYPE DEFINITIONS
//==============================================================================

type SocialLink = {
  name: string;
  url: string;
  icon: React.ComponentType<{ size: number }>;
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

type PublicationItem = {
  title: string;
  authors: string;
  journal: string;
  date: string;
  url?: string;
};

type Skill = string | { name: string; url: string };

type ResumeData = {
  main: {
    name: string;
    title: string;
    socials: SocialLink[];
    about: string;
    resumeUrl: string;
  };
  experience: Experience[];
  education: EducationItem[];
  publications: PublicationItem[];
  skills: Skill[];
};


//==============================================================================
// RESUME DATA
//==============================================================================

const resumeData: ResumeData = {
  main: {
    name: 'Joseph Chang',
    title: 'Data Sceintist | Software Developer | Full Stack Developer',
    about:
      'A passionate and creative frontend and backend developer with over 8 years of coding experience. Proven ability to develop projects from conception to deployment. Always eager to learn new technologies and frameworks.',
    resumeUrl: '/resume.pdf',
    socials: [
      { name: 'GitHub', url: 'https://github.com/ChangJoseph', icon: FaGithub },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/changjoseph/', icon: FaLinkedin },
      { name: 'Email', url: 'mailto:me@changjoseph.com', icon: FaEnvelope },
    ],
  },
  experience: [
    {
      company: 'Booz Allen Hamilton',
      title: 'Data Scientist',
      period: 'Jun 2022 - Present',
      location: 'McLean, VA',
      description: 'As a versatile Senior consultant, I specialized in translating complex data into clear, presentable narratives for clients. I engineered dynamic dashboards and reports using a range of visualization tools, while also leveraging my backend engineering skills in React and Plotly Dash to build robust, custom solutions.',
      projects: [
        { name: 'OEA Data Scientist', description: 'EV Carbon Free', achievements: ['', '', ''] },
        { name: 'Carbon Free Electricity Acquisition', description: '', achievements: ['', ''] },
      ],
    },
    {
      company: 'George Mason University',
      title: 'Research Assistant',
      period: 'Sep 2019 - Jun 2022',
      location: 'Fairfax, VA',
      description: '',
      projects: [{ name: '', description: '', achievements: ['', ''] }],
    },
  ],
  education: [
    { institution: 'George Mason University', degree: 'B.S. in Computer Science', period: '2022' },
  ],
  publications: [
    {
      title: 'Measuring Illicit Activity in DeFi: The Case of Ethereum',
      authors: 'Jiasun Li, Foteini Baldimtsi, Joao P. Brandao, Maurice Kugler, Rafeh Hulays, Eric Showers, Zain Ali, Joseph Chang',
      journal: 'Springer, Berlin, Heidelberg',
      date: '9/17/2021',
      url: 'https://doi.org/10.1007/978-3-662-63958-0_18',
    },
  ],
  skills: [
    'Python',
    'Java',
    'SQL (MySQL, Oracle, SQLite)',
    'C Language',
    'HTML/CSS',
    'VIM',
    'Javascript',
    'REST APIs',
    { name: 'Git & GitHub', url: 'https://github.com/' },
    'C#',
    'Geospatial',
    'Excel',
    'Tableau',
    'Qlik',
    'PowerBI',
  ],
};


//==============================================================================
// SUB-COMPONENTS
//==============================================================================

const Section: React.FC<{ title: string; children: React.ReactNode; id: string }> = ({ title, children, id }) => (
  <motion.section
    id={id}
    className="py-12 md:py-16"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-8 relative text-white">
      {title}
      <span className="absolute -bottom-2 left-0 w-16 h-1 bg-violet-500 rounded-full"></span>
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
        <h4 className="font-semibold text-lg text-violet-300">{project.name}</h4>
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
            transition={{ duration: 0.4, ease: 'easeInOut' }}
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

  const tagBaseClasses = "text-zinc-300 text-sm font-medium px-4 py-2 rounded-full border border-zinc-700 transition-colors duration-300";

  return (
    <div className="bg-black text-zinc-300 font-sans min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        
        <motion.header
          className="text-center py-12 md:py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">{resumeData.main.name}</h1>
          <h2 className="text-2xl mt-2 text-violet-400 font-medium">{resumeData.main.title}</h2>
          <p className="max-w-2xl mx-auto mt-6 text-zinc-400">{resumeData.main.about}</p>
          <div className="flex justify-center items-center gap-6 mt-8">
            {resumeData.main.socials.map(social => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-zinc-400 hover:text-violet-400 transition-all duration-300 transform hover:scale-110"
                >
                  <IconComponent size={28} />
                </a>
              );
            })}
            <a href={resumeData.main.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-violet-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-violet-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-500/30">
              <FaFileAlt />
              My Resume
            </a>
          </div>
        </motion.header>

        <main>
          <Section title="Work Experience" id="experience">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
                {resumeData.experience.map((exp, index) => (
                  <button
                    key={exp.company}
                    onClick={() => setActiveCompanyIndex(index)}
                    className={`text-left p-3 w-full whitespace-nowrap md:border-l-4 transition-all duration-300 ${
                      index === activeCompanyIndex
                        ? 'bg-violet-600/10 text-violet-300 border-violet-500'
                        : 'border-zinc-700 hover:bg-zinc-700/50 hover:border-zinc-500'
                    }`}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-3/4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCompanyIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-white">{activeExperience.title} <span className="text-xl text-violet-400">@ {activeExperience.company}</span></h3>
                    <p className="text-zinc-400 mt-1 mb-4">{activeExperience.period} | {activeExperience.location}</p>
                    <p className="text-zinc-300 mb-6">{activeExperience.description}</p>
                    <h4 className="text-xl font-semibold mb-4 text-white">Contracts & Projects</h4>
                    {activeExperience.projects.map((proj, i) => <ProjectAccordion key={i} project={proj} />)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Section>

          <Section title="Education" id="education">
            <div className="space-y-6">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="bg-zinc-800/60 p-6 rounded-lg border border-zinc-700/50">
                  <h3 className="text-xl font-semibold text-white">{edu.institution}</h3>
                  <p className="text-violet-400 mt-1">{edu.degree}</p>
                  <p className="text-zinc-400 text-sm mt-1">{edu.period}</p>
                </div>
              ))}
            </div>

            {resumeData.publications && resumeData.publications.length > 0 && (
              <>
                <h3 className="text-2xl font-bold mt-12 mb-6 relative text-white">Publications</h3>
                <div className="space-y-6">
                  {resumeData.publications.map((pub, i) => (
                    <div key={i} className="bg-zinc-800/60 p-6 rounded-lg border border-zinc-700/50">
                      <h4 className="text-lg font-semibold text-white">
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 group hover:text-violet-400 transition-colors duration-300"
                          >
                            <span>{pub.title}</span>
                            <FiExternalLink className="opacity-70 group-hover:opacity-100" size={16} />
                          </a>
                        ) : (
                          pub.title
                        )}
                      </h4>
                      <p className="text-zinc-400 mt-2">{pub.authors}</p>
                      <p className="text-zinc-300 italic mt-1">{pub.journal}, {pub.date}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Section>

          <Section title="Technical Skills" id="skills">
            <motion.div
              className="flex flex-wrap gap-x-3 gap-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {resumeData.skills.map(skill => (
                <motion.div key={typeof skill === 'string' ? skill : skill.name} variants={skillVariants}>
                  {typeof skill === 'object' ? (
                    <a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${tagBaseClasses} bg-zinc-700 hover:bg-violet-500/20 hover:text-violet-300 hover:border-violet-700/50`}
                    >
                      {skill.name}
                    </a>
                  ) : (
                    <span
                      className={`${tagBaseClasses} bg-zinc-800 cursor-default`}
                    >
                      {skill}
                    </span>
                  )}
                </motion.div>
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
=======
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Resume from './resume-page'

function App() {
  return (
    <div className="App">
      <div>
        <Resume />
      </div>
    </div>
  );
}

export default App;
>>>>>>> refs/remotes/origin/master
