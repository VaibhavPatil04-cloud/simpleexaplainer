import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { getRelatedConcepts } from '../../utils/conceptData'
import './RelatedConcepts.css'

const RelatedConcepts = ({ currentConceptId }) => {
  // Get related concepts using the dynamic system
  const relatedConcepts = getRelatedConcepts(currentConceptId, 3)

  if (relatedConcepts.length === 0) {
    return (
      <motion.section 
        className="related-concepts"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h2>What Should We Learn Next? 🤔</h2>
        <p className="section-subtitle">
          Explore more amazing concepts!
        </p>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            Browse All Concepts
          </Link>
        </div>
      </motion.section>
    )
  }

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
        {relatedConcepts.map((concept, index) => (
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
      
      <div className="text-center" style={{ marginTop: '32px' }}>
        <Link to="/" className="btn btn-outline">
          See All Concepts
        </Link>
      </div>
    </motion.section>
  )
}
export default RelatedConcepts