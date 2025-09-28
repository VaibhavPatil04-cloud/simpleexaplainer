import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaRocket, FaStar, FaHeart, FaBrain } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const floatingElements = [
    { icon: FaBrain, delay: 0, color: 'var(--primary-purple)' },
    { icon: FaHeart, delay: 0.5, color: 'var(--accent-pink)' },
    { icon: FaStar, delay: 1, color: 'var(--accent-yellow)' },
    { icon: FaRocket, delay: 1.5, color: 'var(--accent-blue)' }
  ]

  return (
    <section className="hero">
      <div className="hero-background">
        {floatingElements.map((element, index) => {
          const Icon = element.icon
          return (
            <motion.div
              key={index}
              className="floating-element"
              style={{ color: element.color }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [50, -20, -40, -60],
                x: [0, 20, -10, 30]
              }}
              transition={{
                duration: 4,
                delay: element.delay,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Icon />
            </motion.div>
          )
        })}
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Learn <span className="text-gradient">Anything</span><br />
              Explained Like You're 6! 🎈
            </h1>
            <p className="hero-subtitle">
              Complex stuff made super simple with fun stories, colorful pictures, 
              and easy words that anyone can understand!
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-buttons"
            >
              <Link to="#concepts" className="btn btn-primary hero-btn">
                <FaRocket />
                Start Learning!
              </Link>
              <Link to="/explain" className="btn btn-outline hero-btn">
                <FaBrain />
                Ask Me Anything
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="hero-illustration">
              <motion.div 
                className="illustration-circle main"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="circle-content">
                  <FaBrain className="brain-icon" />
                </div>
              </motion.div>
              
              <motion.div 
                className="illustration-circle small circle-1"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <FaHeart />
              </motion.div>
              
              <motion.div 
                className="illustration-circle small circle-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <FaStar />
              </motion.div>
              
              <motion.div 
                className="illustration-circle small circle-3"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <FaRocket />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="scroll-indicator"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-arrow"
        >
          ↓
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}

export default Hero

    