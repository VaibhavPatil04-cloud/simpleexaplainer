import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import './RelatedConcepts.css'

const RelatedConcepts = ({ currentConceptId }) => {
  // Mock related concepts - in a real app, this would be dynamic
  const relatedConcepts = [
    {
      id: 'wifi',
      title: 'How WiFi Works',
      description: 'Invisible highways for your data!',
      emoji: '📡',
      difficulty: 'Easy'
    },
    {
      id: 'internet',
      title: 'What is the Internet?',
      description: 'The biggest library in the world!',
      emoji: '🌐',
      difficulty: 'Easy'
    },
    {
      id: 'smartphone',
      title: 'How Smartphones Work',
      description: 'A tiny computer in your pocket!',
      emoji: '📱',
      difficulty: 'Medium'
    }
  ].filter(concept => concept.id !== currentConceptId)

  return (
    <motion.section 
      className="related-concepts"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <h2>What Should We Learn Next? 🤔</h2>
      <p className="section-subtitle">
        Check out these related concepts that might interest you!
      </p>
      
      <div className="related-grid">
        {relatedConcepts.slice(0, 3).map((concept, index) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/concept/${concept.id}`} className="related-card">
              <div className="related-emoji">{concept.emoji}</div>
              <h4 className="related-title">{concept.title}</h4>
              <p className="related-description">{concept.description}</p>
              <div className="related-footer">
                <span className="related-difficulty">{concept.difficulty}</span>
                <FaArrowRight className="related-arrow" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default RelatedConcepts