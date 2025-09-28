import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaClock, FaGraduationCap, FaHeart, FaShare, FaLightbulb, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'
import ComicPanel from '../../components/ComicPanel/ComicPanel'
import RelatedConcepts from '../../components/RelatedConcepts/RelatedConcepts'
import { getConceptData, CONCEPT_METADATA } from '../../utils/conceptData'
import { useTheme } from '../../context/ThemeContext'
import './ConceptPage.css'

const ConceptPage = () => {
  const { conceptId } = useParams()
  const { isDarkMode } = useTheme()
  const [concept, setConcept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  // Dark mode compatible colors for comic panels
  const getDarkModeCompatiblePanels = (panels) => {
    if (!isDarkMode || !panels) return panels

    const darkModeColors = [
      "linear-gradient(135deg, rgba(42, 42, 42, 0.9), rgba(26, 26, 26, 0.9))",
      "linear-gradient(135deg, rgba(45, 45, 45, 0.9), rgba(30, 30, 30, 0.9))",
      "linear-gradient(135deg, rgba(50, 50, 50, 0.9), rgba(35, 35, 35, 0.9))",
      "linear-gradient(135deg, rgba(55, 55, 55, 0.9), rgba(40, 40, 40, 0.9))",
      "linear-gradient(135deg, rgba(60, 60, 60, 0.9), rgba(45, 45, 45, 0.9))"
    ]

    return panels.map((panel, index) => ({
      ...panel,
      bgColor: darkModeColors[index % darkModeColors.length]
    }))
  }

  useEffect(() => {
    const loadConcept = async () => {
      console.log(`📖 Loading concept page for: ${conceptId}`)
      setLoading(true)
      setError(null)

      // Check if concept exists in metadata first
      if (!CONCEPT_METADATA[conceptId]) {
        setError('concept_not_found')
        setLoading(false)
        return
      }

      try {
        const conceptData = await getConceptData(conceptId)
        if (conceptData) {
          // Apply dark mode compatible colors to comic panels
          const updatedConcept = {
            ...conceptData,
            comicPanels: getDarkModeCompatiblePanels(conceptData.comicPanels)
          }
          setConcept(updatedConcept)
          console.log('✅ Successfully loaded concept page')
        } else {
          setError('failed_to_load')
        }
      } catch (err) {
        console.error('❌ Error loading concept:', err)
        setError('failed_to_load')
      } finally {
        setLoading(false)
      }
    }

    loadConcept()
  }, [conceptId, retryCount])

  // Re-apply dark mode colors when theme changes
  useEffect(() => {
    if (concept && concept.comicPanels) {
      const updatedConcept = {
        ...concept,
        comicPanels: getDarkModeCompatiblePanels(concept.comicPanels)
      }
      setConcept(updatedConcept)
    }
  }, [isDarkMode])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="concept-page">
        <div className="container">
          <motion.div 
            className="concept-page-loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="loading-spinner">🧠</div>
            <h2>Creating your awesome explanation...</h2>
            <p>This might take a moment while we generate the perfect explanation just for you!</p>
          </motion.div>
        </div>
      </div>
    )
  }

  // Error states
  if (error === 'concept_not_found') {
    return (
      <div className="concept-page">
        <div className="container">
          <motion.div 
            className="concept-not-found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="error-icon">😕</div>
            <h2>Oops! Concept Not Found</h2>
            <p>We couldn't find the concept you're looking for.</p>
            <p>But don't worry, we have lots of other cool stuff to learn!</p>
            <Link to="/" className="btn btn-primary">
              <FaArrowLeft /> Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  if (error === 'failed_to_load') {
    return (
      <div className="concept-page">
        <div className="container">
          <motion.div 
            className="concept-not-found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            <h2>Something went wrong!</h2>
            <p>We're having trouble generating this explanation. Let's try again!</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={handleRetry} className="btn btn-primary">
                Try Again
              </button>
              <Link to="/" className="btn btn-outline">
                <FaArrowLeft /> Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!concept) {
    return null
  }

  return (
    <div className="concept-page">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="concept-header"
          initial={{ opacity: 0, y: -20 }}
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
            <div>
              <h1 className="concept-title">{concept.title}</h1>
              <div className="concept-badges">
                <span 
                  className="difficulty-badge"
                  style={{ background: concept.difficultyColor }}
                >
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
            <button className="action-btn" title="Like this concept">
              <FaHeart />
            </button>
            <button className="action-btn" title="Share this concept">
              <FaShare />
            </button>
          </div>
        </motion.div>

        {/* Simple Explanation */}
        <motion.section 
          className="simple-explanation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="explanation-header">
            <FaLightbulb className="section-icon" />
            <h2>Simple Explanation</h2>
          </div>
          <div className="simple-answer">
            {concept.simpleExplanation}
          </div>
        </motion.section>

        {/* Comic Story */}
        <motion.section 
          className="comic-story"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="section-header">
            <h2>📚 Learn Through Story</h2>
            <p>Follow along with our fun comic story to understand better!</p>
          </div>
          <div className="comic-panels">
            {concept.comicPanels.map((panel, index) => (
              <ComicPanel 
                key={index}
                {...panel}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Deeper Explanation */}
        <motion.section 
          className="deeper-explanation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="explanation-header">
            <FaQuestionCircle className="section-icon" />
            <h2>Let's Dive Deeper</h2>
          </div>
          {concept.detailedExplanation.map((paragraph, index) => (
            <p key={index} className="explanation-paragraph">
              {paragraph}
            </p>
          ))}
        </motion.section>

        {/* Fun Facts */}
        <motion.section 
          className="fun-facts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="section-header">
            <h2>🤯 Amazing Fun Facts</h2>
            <p>Here are some super cool facts that will blow your mind!</p>
          </div>
          <div className="facts-grid">
            {concept.funFacts.map((fact, index) => (
              <div key={index} className="fact-card">
                <div className="fact-emoji">{fact.emoji}</div>
                <p className="fact-text">{fact.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2>🎉 Great Job Learning!</h2>
          <p>Keep exploring and learning new amazing things!</p>
          <div className="cta-buttons">
            <Link to="/" className="btn btn-outline">
              Learn More Concepts
            </Link>
            <Link to="/explain-anything" className="btn btn-outline">
              Ask Your Own Question
            </Link>
          </div>
        </motion.section>

        {/* Related Concepts */}
        <RelatedConcepts currentConceptId={concept.id} />
      </div>
    </div>
  )
}

export default ConceptPage