import React from 'react'
import { motion } from 'framer-motion'
import { FaBrain, FaHeart, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <motion.div 
                className="logo-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaBrain />
              </motion.div>
              <span className="logo-text">Simple Explainer</span>
            </div>
            <p className="footer-description">
              Making complex things super simple for curious minds everywhere! 🌟
            </p>
            <div className="social-links">
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/explain">Explain Anything</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="#concepts">Browse Concepts</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><a href="#technology">Technology 💻</a></li>
              <li><a href="#finance">Money & Finance 💰</a></li>
              <li><a href="#science">Science & Health 🧬</a></li>
              <li><a href="#psychology">Psychology 🧠</a></li>
            </ul>
          </div>

          {/* Fun Facts */}
          <div className="footer-section">
            <h4 className="footer-title">Fun Facts!</h4>
            <div className="fun-facts">
              <motion.div 
                className="fun-fact"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎯 Over 100 concepts explained!
              </motion.div>
              <motion.div 
                className="fun-fact"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              >
                🌟 Made for curious minds
              </motion.div>
              <motion.div 
                className="fun-fact"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
              >
                🚀 Learning made fun!
              </motion.div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            Made with <FaHeart className="heart-icon" /> for curious learners everywhere
          </p>
          <p className="footer-note">
            © 2025 Simple Explainer. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer