import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaSearch, 
  FaMagic, 
  FaRocket, 
  FaLightbulb,
  FaSpinner,
  FaQuestionCircle
} from 'react-icons/fa'
import { generateExplanation } from '../../utils/aiExplanation'
import './ExplainAnything.css'

const ExplainAnything = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [error, setError] = useState('')

  const popularQuestions = [
    "Why is the sky blue?",
    "How do airplanes fly?",
    "What makes ice cream cold?",
    "Why do we dream?",
    "How does a microwave work?",
    "What is gravity?",
    "Why do onions make us cry?",
    "How do phones work?"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError('')
    
    try {
      const result = await generateExplanation(query)
      if (!result.simpleAnswer) {
        throw new Error('Failed to generate explanation')
      }
      setExplanation(result)
    } catch (err) {
      setError('Sorry! I had trouble understanding that. Could you try asking in a different way?')
      console.error('Error generating explanation:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePopularQuestion = (question) => {
    setQuery(question)
    setExplanation(null)
    setError('')
  }

  const resetForm = () => {
    setQuery('')
    setExplanation(null)
    setError('')
  }

  return (
    <div className="explain-anything">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="page-header text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-icon">
            <FaMagic />
          </div>
          <h1 className="page-title">
            Ask Me <span className="text-gradient">Anything!</span> ✨
          </h1>
          <p className="page-subtitle">
            Type any question and I'll explain it like you're 6 years old!
          </p>
        </motion.div>

        {!explanation ? (
          <>
            {/* Search Form */}
            <motion.div 
              className="search-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-container">
                  <FaQuestionCircle className="search-icon" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What would you like to understand?"
                    className="search-input"
                    disabled={loading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="search-btn btn btn-primary"
                  disabled={loading || !query.trim()}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="loading-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      Explain It!
                    </>
                  )}
                </button>
              </form>
              
              {error && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {error}
                </motion.div>
              )}
            </motion.div>

            {/* Popular Questions */}
            <motion.section 
              className="popular-questions"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="section-title">
                <FaLightbulb className="section-icon" />
                Popular Questions
              </h2>
              <p className="section-subtitle">
                Or pick one of these curious questions to get started!
              </p>
              
              <div className="questions-grid">
                {popularQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    className="question-card"
                    onClick={() => handlePopularQuestion(question)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaQuestionCircle className="question-icon" />
                    <span>{question}</span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          </>
        ) : (
          /* Explanation Result */
          <motion.div 
            className="explanation-result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="result-header">
              <h2>Here's Your Simple Explanation! 🎉</h2>
              <button 
                onClick={resetForm}
                className="btn btn-outline"
              >
                Ask Another Question
              </button>
            </div>
            
            <div className="explanation-card">
              <div className="question-display">
                <FaQuestionCircle className="question-icon" />
                <h3>"{query}"</h3>
              </div>
              
              <div className="explanation-content">
                <div className="simple-answer">
                  <h4>The Simple Answer:</h4>
                  <p>{explanation.simpleAnswer}</p>
                </div>
                
                <div className="story-explanation">
                  <h4>Let me tell you a story:</h4>
                  <p>{explanation.storyExplanation}</p>
                </div>
                
                <div className="fun-fact">
                  <h4>Fun Fact! 🤩</h4>
                  <p>{explanation.funFact}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ExplainAnything