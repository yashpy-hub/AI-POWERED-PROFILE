import { useState, useEffect } from 'react'
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Github, 
  Linkedin, 
  ExternalLink,
  GraduationCap,
  Code,
  Database,
  Server,
  Smartphone,
  Globe,
  ChevronDown,
  Menu,
  X,
  Briefcase,
  Award,
  Star,
  Zap,
  Heart,
  Brain,
  Cpu,
  Shield,
  Camera,
  Microscope
} from 'lucide-react'
import profileImage from './assets/profile.jpg'
import { ContactForm } from './components/ContactForm.jsx'
import './App.css'
import { ThemeProvider } from "next-themes"
import { ModeToggle } from "./components/ThemeToggle.jsx"
import Chatbot from './components/Chatbot.jsx'

// Particle component for background animation
const Particle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 100 - 50]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
  />
)

// Floating elements for background
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    className="absolute opacity-10"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Download resume function
  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Yash_Pawar_Resume.pdf'
    link.download = 'Yash_Pawar_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'education', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const skills = {
    programming: [
      { name: 'Python', level: 95, description: 'AI/ML, IoT, Web Development, Data Analysis' },
      { name: 'C/C++', level: 90, description: 'ESP32 Arduino, System Programming, IoT' },
      { name: 'Java', level: 85, description: 'Backend Development, Enterprise Applications' },
      { name: 'JavaScript', level: 88, description: 'Frontend, React, Node.js, Interactive UIs' },
      { name: 'PHP', level: 80, description: 'Web Development, Database Integration' },
      { name: 'HTML/CSS', level: 92, description: 'Responsive Design, Bootstrap, Modern UI' }
    ],
    frameworks: [
      { name: 'Flask', icon: Server, description: 'Python Web Framework' },
      { name: 'FastAPI', icon: Zap, description: 'High-performance API' },
      { name: 'Firebase', icon: Database, description: 'Real-time Database' },
      { name: 'OpenCV', icon: Camera, description: 'Computer Vision' },
      { name: 'TensorFlow', icon: Brain, description: 'Machine Learning' },
      { name: 'Arduino', icon: Cpu, description: 'IoT Development' }
    ],
    technologies: [
      { name: 'AI & Machine Learning', description: 'TensorFlow, OpenCV, YOLO, Medical Imaging, Predictive Models', icon: Brain },
      { name: 'IoT & Embedded', description: 'ESP32, Arduino, Sensors, Real-time Monitoring, Smart Systems', icon: Cpu },
      { name: 'Web Development', description: 'Full-stack, RESTful APIs, Real-time Applications, Responsive Design', icon: Globe },
      { name: 'Database Systems', description: 'MySQL, MongoDB, Firebase, Data Analytics, Real-time DB', icon: Database }
    ]
  }

  const education = [
    {
      degree: 'Bachelor of Technology',
      field: 'Electronics and Telecommunication',
      institution: 'VIT Pune, SPPU',
      status: 'Currently Pursuing',
      year: 'Aug 2024 - Present',
      description: 'Coursework: Object Oriented Software Development, Artificial Intelligence and Machine Learning, Database Design, Applied Distributed Systems',
      gpa: 'Current Focus: AI/ML Integration with Electronics'
    },
    {
      degree: 'Diploma',
      field: 'Computer Engineering',
      institution: 'Government Polytechnic, MSBTE Mumbai',
      status: 'Completed',
      year: 'Aug 2020 - May 2023',
      description: 'Relevant Coursework: Data Structures, Computer Networking, Architecture and Operating Systems',
      gpa: 'Strong Foundation in Computer Engineering'
    }
  ]

  const workExperience = [
    {
      title: 'Researcher',
      company: 'X-ray Segmentation and Landmark Detection',
      period: 'Feb 2025 - Present',
      status: 'Ongoing',
      description: "Combined TotalSpineSeg's pretrained MRI-based segmentation approach with custom adaptations for X-rays. Introduced interactive coordinate extraction for surgery planning useful for robotic or IoT-assisted surgeries.",
      technologies: ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'Medical Imaging'],
      achievements: ['Real-time Visualization', 'Color-coded segmentation masks', 'Surgery planning integration']
    },
    {
      title: 'Database Coordinator',
      company: 'Vishwa Shauryam, VIT Pune',
      period: 'Oct 2024 - Present',
      status: 'Current',
      description: 'Managing event registrations and participant data while ensuring real-time updates and data accuracy through effective communication with multiple committees.',
      technologies: ['Database Management', 'Data Analytics', 'Stakeholder Management'],
      achievements: ['Large-scale event coordination', 'Real-time data management', 'Enhanced organizational skills']
    },
    {
      title: 'Researcher',
      company: 'IoT Smart Farming with AI&ML',
      period: 'May 2025',
      status: 'Completed',
      description: 'Developed an IoT-based Smart Farming system to optimize agricultural operations by integrating sensors and microcontrollers for real-time monitoring, automated irrigation, and anomaly detection.',
      technologies: ['IoT', 'AI/ML', 'ESP32', 'Sensors', 'Data Visualization'],
      achievements: ['Resource conservation', 'Crop yield optimization', 'Weather prediction models']
    },
    {
      title: 'Computer Technician',
      company: 'Grampanchayat Amdapur',
      period: 'June 2023 - 2024',
      status: 'Completed',
      description: 'Provided IT support and maintenance for rural governance systems, educated villagers on digital services, promoting rural digital empowerment.',
      technologies: ['IT Support', 'Digital Services', 'Community Outreach'],
      achievements: ['Rural digital empowerment', 'Community relations', 'Ground-level tech solutions']
    }
  ]

  const projects = [
    {
      title: 'X-ray Segmentation System',
      period: 'Jan 2025 - May 2025',
      description: 'AI-powered spine and bone region segmentation from X-ray images using deep learning and medical image processing techniques.',
      technologies: ['Python', 'YOLOV8', 'OpenCV', 'TotalSpineSeg', 'TensorFlow'],
      features: ['Medical image processing', 'Deep learning integration', 'Surgical procedure assistance'],
      category: 'AI/ML',
      icon: Microscope
    },
    {
      title: 'Heart Attack & Diabetes Prediction System',
      period: 'Feb 2025 - Mar 2025',
      description: 'Machine learning system for health risk prediction with interactive dashboard for real-time health data visualization.',
      technologies: ['Python', 'Flask', 'Random Forest', 'Decision Tree', 'Matplotlib'],
      features: ['Real-world health data collection', 'Interactive dashboard', 'Risk prediction models'],
      category: 'Healthcare AI',
      icon: Heart
    },
    {
      title: 'IoT Smart Farming System',
      period: 'Jan 2025 - May 2025',
      description: 'Comprehensive IoT solution for sustainable agriculture with AI-powered weather prediction and automated irrigation.',
      technologies: ['ESP32', 'Arduino', 'Python', 'Flask', 'Firebase', 'LoRa', 'ML'],
      features: ['Real-time monitoring', 'Automated irrigation', 'Weather prediction', 'Resource optimization'],
      category: 'IoT/Agriculture',
      icon: Cpu
    },
    {
      title: 'Freshcery Grocery Store Management',
      period: 'Jan 2025 - Jun 2025',
      description: 'Complete e-commerce platform with user authentication, dynamic cart system, and comprehensive admin panel.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML/CSS'],
      features: ['User authentication', 'Dynamic cart system', 'Admin panel', 'Inventory management'],
      category: 'Web Development',
      icon: Globe
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingElement delay={0}>
          <Code className="w-20 h-20 text-blue-300" style={{ top: '10%', left: '10%' }} />
        </FloatingElement>
        <FloatingElement delay={1}>
          <Database className="w-16 h-16 text-purple-300" style={{ top: '20%', right: '15%' }} />
        </FloatingElement>
        <FloatingElement delay={2}>
          <Brain className="w-18 h-18 text-green-300" style={{ bottom: '20%', left: '20%' }} />
        </FloatingElement>
        <FloatingElement delay={3}>
          <Cpu className="w-14 h-14 text-orange-300" style={{ bottom: '30%', right: '25%' }} />
        </FloatingElement>
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-6 h-6 bg-blue-400/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button 
              onClick={() => scrollToSection('home')}
              className="font-bold text-xl text-slate-900 dark:text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yash Pawar
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'experience', 'education', 'skills', 'projects', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item}
                </motion.button>
              ))}
              <ModeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <ModeToggle />
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-slate-300 ml-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'experience', 'education', 'skills', 'projects', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 capitalize text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <motion.div 
              className="mb-8"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img
                src={profileImage}
                alt="Yash Pawar"
                className="w-56 h-56 rounded-full mx-auto object-contain shadow-2xl border-4 border-white dark:border-slate-700"
              />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-300%"
              >
                Yash Pawar
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Electronics and Computer Student | AI/ML Researcher | IoT Developer
            </motion.p>
            
            <motion.p 
              className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Passionate about AI/ML, IoT, and Medical Imaging. Currently pursuing BTech at VIT Pune 
              with expertise in Python, Computer Vision, and Smart Systems Development.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={downloadResume}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-slate-600 dark:text-slate-300"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="mr-2 h-5 w-5" />
                <span>yashpawar.py@gmail.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="mr-2 h-5 w-5" />
                <span>+91 9657143027</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-slate-400" />
        </motion.div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Professional journey in research and development
            </p>
          </motion.div>

          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-4" />
                        <div>
                          <CardTitle className="text-xl text-slate-900 dark:text-white">
                            {exp.title}
                          </CardTitle>
                          <CardDescription className="text-lg font-medium text-slate-700 dark:text-slate-300">
                            {exp.company}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={exp.status === 'Ongoing' || exp.status === 'Current' ? 'default' : 'secondary'}>
                          {exp.status}
                        </Badge>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {exp.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Technologies & Skills:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Education
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Academic journey in engineering and technology
            </p>
          </motion.div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-4" />
                        <div>
                          <CardTitle className="text-xl text-slate-900 dark:text-white">
                            {edu.degree} in {edu.field}
                          </CardTitle>
                          <CardDescription className="text-lg font-medium text-slate-700 dark:text-slate-300">
                            {edu.institution}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={edu.status === 'Currently Pursuing' ? 'default' : 'secondary'}>
                          {edu.status}
                        </Badge>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                      {edu.description}
                    </p>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {edu.gpa}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Expertise across cutting-edge technologies
            </p>
          </motion.div>

          {/* Programming Languages */}
          <motion.div className="mb-16" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Programming Languages
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.programming.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {skill.name}
                        </h4>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3"
                      />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Tools */}
          <motion.div className="mb-16" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Frameworks & Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {skills.frameworks.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Card className="text-center p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                    <tool.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      {tool.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tool.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Areas */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Technology Areas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20">
                    <CardHeader className="text-center">
                      <tech.icon className="h-12 w-12 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                      <CardTitle className="text-lg text-slate-900 dark:text-white">
                        {tech.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-800">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Innovative solutions in AI, IoT, and Web Development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, rotateY: 2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <project.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center">
                      {project.title}
                      <ExternalLink className="ml-2 h-5 w-5 text-slate-400" />
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {project.period}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Key Features:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column: Contact Info */}
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, x: 5 }}>
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 flex items-start">
                  <div className="flex-shrink-0 w-12 text-center">
                    <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 inline-block" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Email</h3>
                    <p className="text-slate-600 dark:text-slate-300">yashpawar.py@gmail.com</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, x: 5 }}>
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 flex items-start">
                  <div className="flex-shrink-0 w-12 text-center">
                    <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400 inline-block" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-300">+91 9657143027</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, x: 5 }}>
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 flex items-start">
                  <div className="flex-shrink-0 w-12 text-center">
                    <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400 inline-block" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Location</h3>
                    <p className="text-slate-600 dark:text-slate-300">Pune, Maharashtra, India</p>
                  </div>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 flex justify-center space-x-6">
                  <motion.a href="https://github.com/yashpy-hub/" whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-white/50 dark:bg-slate-700/50">
                      <Github className="h-6 w-6" />
                    </Button>
                  </motion.a>
                  <motion.a href="https://www.linkedin.com/in/yash-pawarpy/" whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-white/50 dark:bg-slate-700/50">
                      <Linkedin className="h-6 w-6" />
                    </Button>
                  </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-xl transition-all duration-300 bg-transparent border-0">
                <CardHeader>
                  <CardTitle>Send me a message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p 
            className="text-slate-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            © 2025 Yash Pawar. All rights reserved. | 
          </motion.p>
        </div>
      </footer>
      
      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App