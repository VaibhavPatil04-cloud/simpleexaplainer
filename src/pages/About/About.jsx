import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaBrain, FaRocket, FaStar, FaUsers, FaGraduationCap } from 'react-icons/fa'
import './About.css'

const About = () => {
  const features = [
    {
      icon: FaBrain,
      title: "Super Simple",
      description: "We explain everything like you're 6 years old - no confusing words!"
    },
    {
      icon: FaRocket,
      title: "Fun Stories",
      description: "Learn through colorful comics and exciting adventures!"
    },
    {
      icon: FaHeart,
      title: "Made with Love",
      description: "Every explanation is crafted with care for curious minds!"
    },
    {
      icon: FaStar,
      title: "Always Learning",
      description: "We keep adding new concepts and improving our explanations!"
    }
  ]

  const stats = [
    { number: "100+", label: "Concepts Explained", icon: FaBrain },
    { number: "10K+", label: "Happy Learners", icon: FaUsers },
    { number: "50+", label: "Fun Comics", icon: FaRocket },
    { number: "100%", label: "Made for Kids", icon: FaGraduationCap }
  ]

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section 
          className="about-hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-content">
            <motion.div 
              className="hero-emoji"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎓
            </motion.div>
            <h1 className="hero-title">
              About <span className="text-gradient">Simple Explainer</span>
            </h1>
            <p className="hero-description">
              We believe that every complex idea can be explained simply. 
              Our mission is to make learning fun, accessible, and exciting for everyone!
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mission-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mission-content">
            <h2>Our Mission 🎯</h2>
            <p>
              Have you ever wondered how your phone works, or why the sky is blue, 
              but found the explanations too complicated? That's exactly why we created 
              Simple Explainer!
            </p>
            <p>
              We take the most complex concepts from technology, science, finance, 
              and psychology, and break them down into simple, fun stories that 
              anyone can understand. No jargon, no confusing terms - just pure, 
              simple explanations with lots of colorful pictures and fun characters!
            </p>
          </div>
          <motion.div 
            className="mission-visual"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="visual-circle">
              <FaBrain className="visual-icon" />
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="features-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title text-center">
            What Makes Us Special? ✨
          </h2>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="stats-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="section-title text-center">
            Our Amazing Journey! 📊
          </h2>
          
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="stat-icon" />
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="team-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="team-content">
            <h2>Our Team 👥</h2>
            <p>
              We're a team of educators, designers, and storytellers who are 
              passionate about making learning accessible to everyone. We believe 
              that curiosity is the key to understanding our world, and we're here 
              to nurture that curiosity in the most fun way possible!
            </p>
            
            <div className="team-values">
              <div className="value-item">
                <span className="value-emoji">🎨</span>
                <span>Creative Learning</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">🌈</span>
                <span>Inclusive Education</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">🚀</span>
                <span>Continuous Innovation</span>
              </div>
              <div className="value-item">
                <span className="value-emoji">❤️</span>
                <span>Passion for Teaching</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2>Ready to Start Learning? 🎉</h2>
          <p>
            Join thousands of curious learners who are discovering the world 
            through simple, fun explanations!
          </p>
          <div className="cta-buttons">
            <a href="/" className="btn btn-primary">
              <FaRocket />
              Start Exploring
            </a>
            <a href="/explain" className="btn btn-outline">
              <FaBrain />
              Ask a Question
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About