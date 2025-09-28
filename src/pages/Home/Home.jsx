import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaLaptop,
  FaCreditCard, 
  FaDna,
  FaBrain,
  FaWifi,
  FaCoins,
  FaHeart,
  FaPuzzlePiece,
  FaMobile,
  FaMoneyBillWave,
  FaSeedling,
  FaSmile,
  FaRocket,
  FaSearch
} from 'react-icons/fa'
import ConceptCard from '../../components/ConceptCard/ConceptCard'
import Hero from '../../components/Hero/Hero'
import { getAllConceptsByCategory } from '../../utils/conceptData'
import './Home.css'

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [conceptCategories, setConceptCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Category icons mapping
  const categoryIcons = {
    'Technology': FaLaptop,
    'Money & Finance': FaCoins, 
    'Science & Health': FaDna,
    'Psychology & Life': FaPuzzlePiece
  }

  useEffect(() => {
    // Load all concepts organized by category
    const loadConcepts = async () => {
      try {
        console.log('🏠 Loading concepts for home page...')
        const categories = getAllConceptsByCategory()
        
        // Add icons to categories
        const categoriesWithIcons = categories.map(category => ({
          ...category,
          icon: categoryIcons[category.title] || FaBrain
        }))
        
        setConceptCategories(categoriesWithIcons)
        console.log('✅ Successfully loaded all concept categories')
      } catch (error) {
        console.error('❌ Error loading concepts:', error)
        // Fallback to empty state or error message
        setConceptCategories([])
      } finally {
        setLoading(false)
      }
    }
    
    loadConcepts()
  }, [])

  if (loading) {
    return (
      <div className="home">
        <Hero />
        <section className="concepts-section">
          <div className="container">
            <div className="flex-center" style={{ minHeight: '200px', flexDirection: 'column', gap: '20px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: '3rem' }}
              >
                🧠
              </motion.div>
              <p>Loading awesome concepts...</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="home">
      <Hero />
      
      <section className="concepts-section" id="concepts">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header text-center"
          >
            <h2 className="section-title">
              Pick a Concept to Learn! 🎯
            </h2>
            <p className="section-subtitle">
              Choose something you're curious about and we'll explain it super simply!
            </p>
          </motion.div>

          {conceptCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <motion.div
                key={category.title}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="category-section"
              >
                <div className="category-header">
                  <div className="category-icon" style={{ color: category.color }}>
                    <CategoryIcon />
                  </div>
                  <h3 className="category-title" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                </div>
                
                <div className="concepts-grid">
                  {category.concepts.map((concept, conceptIndex) => (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: (categoryIndex * 0.2) + (conceptIndex * 0.1) 
                      }}
                    >
                      <ConceptCard concept={concept} categoryColor={category.color} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="cta-section text-center"
          >
            <h3 className="cta-title">
              Can't find what you're looking for? 🤔
            </h3>
            <p className="cta-subtitle mb-8">
              Ask us to explain anything and we'll break it down just for you!
            </p>
            <Link to="/explain" className="btn btn-primary">
              <FaSearch />
              Explain Anything
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
