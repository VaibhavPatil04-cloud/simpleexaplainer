import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaArrowLeft, 
  FaClock, 
  FaGraduationCap, 
  FaHeart,
  FaShare,
  FaLightbulb,
  FaQuestionCircle
} from 'react-icons/fa'
import ComicPanel from '../../components/ComicPanel/ComicPanel'
import RelatedConcepts from '../../components/RelatedConcepts/RelatedConcepts'
import { getConceptData } from '../../utils/conceptData'
import './ConceptPage.css'

const ConceptPage = () => {
  const { conceptId } = useParams()
  const [concept, setConcept] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadConcept = async () => {
      setLoading(true)
      const conceptData = await getConceptData(conceptId)
      setConcept(conceptData)
      setLoading(false)
    }
    
    loadConcept()
  }, [conceptId])

  if (loading) {
    return (
      <div className="concept-page-loading">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          🧠
        </motion.div>
        <p>Loading your awesome explanation...</p>
      </div>
    )
  }

  if (!concept) {
    return (
      <div className="concept-not-found">
        <h2>Oops! We can't find that concept 😅</h2>
        <p>But don't worry, we have lots of other cool stuff to learn!</p>
        <Link to="/" className="btn btn-primary">
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    )
  }

  // Add default values for optional properties
  const {
    comicPanels = [],
    detailedExplanation = [],
    funFacts = []
  } = concept;

  return (
    <div className="concept-page">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="concept-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="back-link">
            <FaArrowLeft />
            Back to Home
          </Link>
          
          <div className="concept-meta">
            <div className="concept-icon" style={{ color: concept.categoryColor }}>
              <concept.icon />
            </div>
            <div className="concept-info">
              <h1 className="concept-title">{concept.title}</h1>
              <div className="concept-badges">
                <span className="difficulty-badge" style={{ backgroundColor: concept.difficultyColor }}>
                  <FaGraduationCap />
                  {concept.difficulty}
                </span>
                <span className="time-badge">
                  <FaClock />
                  {concept.readTime}
                </span>
              </div>
            </div>
          </div>

          <div className="concept-actions">
            <button className="action-btn">
              <FaHeart />
            </button>
            <button className="action-btn">
              <FaShare />
            </button>
          </div>
        </motion.div>

        {/* Simple Explanation */}
        <motion.section 
          className="simple-explanation"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="explanation-header">
            <FaLightbulb className="section-icon" />
            <h2>The Simple Answer</h2>
          </div>
          <div className="explanation-content">
            <p className="simple-answer">{concept.simpleExplanation}</p>
          </div>
        </motion.section>

        {/* Comic Story - Only show if comicPanels exist */}
        {comicPanels.length > 0 && (
          <motion.section 
            className="comic-story"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <h2>Let's Learn with a Story! 📚</h2>
              <p>Follow along with our fun comic story to understand better!</p>
            </div>
            
            <div className="comic-panels">
              {comicPanels.map((panel, index) => (
                <ComicPanel 
                  key={index}
                  panel={panel}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Deeper Explanation - Only show if detailedExplanation exists */}
        {detailedExplanation.length > 0 && (
          <motion.section 
            className="deeper-explanation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="explanation-header">
              <FaQuestionCircle className="section-icon" />
              <h2>Want to Know More?</h2>
            </div>
            
            <div className="explanation-content">
              {detailedExplanation.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  className="explanation-paragraph"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.section>
        )}

        {/* Fun Facts - Only show if funFacts exist */}
        {funFacts.length > 0 && (
          <motion.section 
            className="fun-facts"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2>Cool Fun Facts! 🤩</h2>
            <div className="facts-grid">
              {funFacts.map((fact, index) => (
                <motion.div 
                  key={index}
                  className="fact-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="fact-emoji">{fact.emoji}</div>
                  <p className="fact-text">{fact.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Related Concepts */}
        <RelatedConcepts currentConceptId={conceptId} />

        {/* Call to Action */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2>Ready for Another Adventure? 🚀</h2>
          <p>Keep exploring and learning new amazing things!</p>
          <div className="cta-buttons">
            <Link to="/" className="btn btn-primary">
              Learn More Concepts
            </Link>
            <Link to="/explain" className="btn btn-outline">
              Ask Your Own Question
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ConceptPage