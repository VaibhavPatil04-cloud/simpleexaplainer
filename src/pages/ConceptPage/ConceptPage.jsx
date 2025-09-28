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
  FaQuestionCircle,
  FaExclamationTriangle
} from 'react-icons/fa'
import ComicPanel from '../../components/ComicPanel/ComicPanel'
import RelatedConcepts from '../../components/RelatedConcepts/RelatedConcepts'
import { getConceptData, CONCEPT_METADATA } from '../../utils/conceptData'
import './ConceptPage.css'

const ConceptPage = () => {
  const { conceptId } = useParams()
  const [concept, setConcept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

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
          setConcept(conceptData)
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

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  // Loading state
  if (loading) {
    return (
      <div className="concept-page">
        <div className="container">
          <div className="concept-page-loading">
            <motion.div 
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              🧠
            </motion.div>
            <p>Creating your awesome explanation...</p>
            <div style={{ fontSize: '0.9rem', color: 'var(--gray)', marginTop: '8px' }}>
              Using AI to generate the perfect explanation just for you!
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error states
  if (error === 'concept_not_found') {
    return (
      <div className="concept-page">
        <div className="container">
          <div className="concept-not-found">
            <h2>Oops! We can't find that concept 😅</h2>
            <p>But don't worry, we have lots of other cool stuff to learn!</p>
            <Link to="/" className="btn btn-primary">
              <FaArrowLeft />
              Browse All Concepts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error === 'failed_to_load') {
    return (
      <div className="concept-page">
        <div className="container">
          <div className="concept-not-found">
            <FaExclamationTriangle style={{ fontSize: '3rem', color: 'var(--secondary-orange)', marginBottom: '16px' }} />
            <h2>Oops! Something went wrong 😔</h2>
            <p>We're having trouble generating this explanation. Let's try again!</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={handleRetry} className="btn btn-primary">
                <FaArrowLeft />
                Try Again
              </button>
              <Link to="/" className="btn btn-outline">
                Browse Other Concepts
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!concept) {
    return (
      <div className="concept-page">
        <div className="container">
          <div className="concept-not-found">
            <h2>Something unexpected happened 🤔</h2>
            <Link to="/" className="btn btn-primary">
              <FaArrowLeft />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

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

        {/* Comic Story */}
        {concept.comicPanels && concept.comicPanels.length > 0 && (
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
              {concept.comicPanels.map((panel, index) => (
                <ComicPanel 
                  key={index}
                  panel={panel}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Deeper Explanation */}
        {concept.detailedExplanation && concept.detailedExplanation.length > 0 && (
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
              {concept.detailedExplanation.map((paragraph, index) => (
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

        {/* Fun Facts */}
        {concept.funFacts && concept.funFacts.length > 0 && (
          <motion.section 
            className="fun-facts"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2>Cool Fun Facts! 🤩</h2>
            <div className="facts-grid">
              {concept.funFacts.map((fact, index) => (
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

// IMPLEMENTATION STEPS:

// 1. Create src/utils/geminiConceptService.js
// (This contains the concept generation code from above)

// 2. Update src/utils/conceptData.js  
// (This contains the concept metadata and loading logic)

// 3. Update src/pages/Home/Home.jsx
// (This loads concepts dynamically)

// 4. Update src/components/RelatedConcepts/RelatedConcepts.jsx  
// (This shows related concepts dynamically)

// 5. Update src/pages/ConceptPage/ConceptPage.jsx
// (This handles loading states and errors better)

// FEATURES IMPLEMENTED:

// ✅ All concepts from home page are now accessible
// ✅ All concept pages use Gemini to generate content
// ✅ Related concepts section is fully dynamic
// ✅ Proper loading and error states
// ✅ Retry functionality if Gemini fails
// ✅ Fallback content for when API calls fail
// ✅ Better user experience with loading indicators
// ✅ 15+ different concepts across 4 categories
// ✅ Comic panels generated by AI
// ✅ Fun facts generated by AI  
// ✅ Detailed explanations generated by AI
// ✅ All content optimized for children

// CONCEPT CATEGORIES & TOPICS:

// 🔵 Technology (5 concepts):
// - What is an LLM? 
// - How does WiFi work?
// - Sending a WhatsApp Message
// - How Smartphones Work  
// - What is the Internet?

// 🟠 Money & Finance (5 concepts):
// - How Credit Cards Work
// - Why Banks Charge Interest
// - What is Inflation?
// - How Banks Work
// - What is Cryptocurrency?

// 🟢 Science & Health (5 concepts):
// - How Our Body Fights Germs
// - How Plants Make Food  
// - Why We Need Sleep
// - What is DNA?
// - How Gravity Works

// 🔴 Psychology & Life (5 concepts):
// - Confirmation Bias
// - Why We Feel Nervous
// - Why People Procrastinate  
// - How Memory Works
// - Why Do We Dream?

// HOW IT WORKS:

// 1. User clicks on any concept card from home page
// 2. ConceptPage loads with spinner showing "Creating explanation..."  
// 3. System calls Gemini API to generate:
//    - Simple explanation (2-3 sentences)
//    - Detailed explanation (3 paragraphs)  
//    - Comic story (4 panels with characters & dialogue)
//    - Fun facts (3 interesting facts)
// 4. Content is displayed in beautiful, animated sections
// 5. Related concepts section shows 3 relevant topics
// 6. If API fails, fallback content is shown with retry option

// NEXT STEPS TO IMPLEMENT:

// 1. Copy the geminiConceptService.js content to a new file
// 2. Replace your existing conceptData.js with the updated version
// 3. Replace your Home.jsx with the updated version  
// 4. Replace your RelatedConcepts.jsx with the updated version
// 5. Replace your ConceptPage.jsx with the updated version
// 6. Make sure your .env has VITE_GEMINI_API_KEY set correctly
// 7. Test by clicking on any concept from the home page!

export default ConceptPage