import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaClock, FaGraduationCap } from 'react-icons/fa'
import './ConceptCard.css'

const ConceptCard = ({ concept, categoryColor }) => {
  const navigate = useNavigate();
  const Icon = concept.icon

  const handleLearnNow = (e) => {
    e.preventDefault();
    navigate(`/concept/${concept.id}`);
    window.scrollTo(0, 0); // Add this line to scroll to top
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'var(--accent-green)'
      case 'Medium':
        return 'var(--accent-yellow)'
      case 'Hard':
        return 'var(--secondary-orange)'
      default:
        return 'var(--accent-green)'
    }
  }

  return (
    <Link to={`/concept/${concept.id}`} className="concept-card-link" onClick={handleLearnNow}>
      <motion.div 
        className="concept-card"
        whileHover={{ 
          scale: 1.03,
          y: -8,
          rotateY: 5
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        {/* Card Header */}
        <div className="card-header">
          <motion.div 
            className="card-icon"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon />
          </motion.div>
          
          <div className="card-meta">
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(concept.difficulty) }}
            >
              <FaGraduationCap />
              {concept.difficulty}
            </span>
            <span className="read-time">
              <FaClock />
              {concept.readTime}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="card-content">
          <h3 className="card-title">{concept.title}</h3>
          <p className="card-description">{concept.description}</p>
        </div>

        {/* Card Footer */}
        <div className="card-footer">
          <motion.div 
            className="learn-button"
            style={{ background: categoryColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn Now! 🚀
          </motion.div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div 
          className="card-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ background: `linear-gradient(135deg, ${categoryColor}10, ${categoryColor}05)` }}
        />

        {/* Sparkle Effects */}
        <div className="sparkles">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle"
              style={{
                left: `${20 + i * 30}%`,
                top: `${15 + i * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Link>
  )
}

export default ConceptCard