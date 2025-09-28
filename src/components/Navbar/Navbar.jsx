import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaBrain, 
  FaHome, 
  FaLightbulb, 
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun
} from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.css'

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/explain', icon: FaLightbulb, label: 'Explain Anything' },
    { path: '/about', icon: FaQuestionCircle, label: 'About' }
  ]

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FaBrain />
          </motion.div>
          <span className="logo-text">Simple Explainer</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <motion.div
                  className="nav-link-content"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
          
          {/* Theme Toggle Button */}
          <motion.button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <FaSun className="theme-icon" style={{ color: 'var(--accent-yellow)' }} />
            ) : (
              <FaMoon className="theme-icon" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div 
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mobile-menu-content">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mobile-nav-icon" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar