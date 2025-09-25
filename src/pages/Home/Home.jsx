import React from 'react'
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
import './Home.css'

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const conceptCategories = [
    {
      title: "Technology",
      color: "var(--primary-purple)",
      icon: FaLaptop,
      concepts: [
        {
          id: "llm",
          title: "What is an LLM?",
          description: "Like a super-smart robot friend that reads lots of books!",
          icon: FaBrain,
          difficulty: "Easy",
          readTime: "3 min"
        },
        {
          id: "wifi",
          title: "How does WiFi work?",
          description: "Invisible highways for your messages and videos!",
          icon: FaWifi,
          difficulty: "Easy",
          readTime: "4 min"
        },
        {
          id: "whatsapp",
          title: "Sending a WhatsApp Message",
          description: "A magical journey your message takes around the world!",
          icon: FaMobile,
          difficulty: "Easy",
          readTime: "3 min"
        }
      ]
    },
    {
      title: "Money & Finance",
      color: "var(--secondary-orange)",
      icon: FaCoins,
      concepts: [
        {
          id: "credit-card",
          title: "How Credit Cards Work",
          description: "Like borrowing a toy from a friend, but you pay them back later!",
          icon: FaCreditCard,
          difficulty: "Easy",
          readTime: "4 min"
        },
        {
          id: "interest",
          title: "Why Banks Charge Interest",
          description: "Payment for using someone else's piggy bank money!",
          icon: FaMoneyBillWave,
          difficulty: "Medium",
          readTime: "5 min"
        },
        {
          id: "inflation",
          title: "What is Inflation?",
          description: "When your pocket money buys less candy than before!",
          icon: FaCoins,
          difficulty: "Medium",
          readTime: "4 min"
        }
      ]
    },
    {
      title: "Science & Health",
      color: "var(--accent-green)",
      icon: FaDna,
      concepts: [
        {
          id: "immune-system",
          title: "How Our Body Fights Germs",
          description: "Tiny superhero soldiers protecting your body castle!",
          icon: FaHeart,
          difficulty: "Easy",
          readTime: "5 min"
        },
        {
          id: "photosynthesis",
          title: "How Plants Make Food",
          description: "Plants are like tiny chefs cooking with sunlight!",
          icon: FaSeedling,
          difficulty: "Easy",
          readTime: "4 min"
        },
        {
          id: "sleep",
          title: "Why We Need Sleep",
          description: "Your brain's special cleaning and repair time!",
          icon: FaSmile,
          difficulty: "Easy",
          readTime: "3 min"
        }
      ]
    },
    {
      title: "Psychology & Life",
      color: "var(--accent-pink)",
      icon: FaPuzzlePiece,
      concepts: [
        {
          id: "confirmation-bias",
          title: "Confirmation Bias",
          description: "Why we only hear what we want to hear!",
          icon: FaBrain,
          difficulty: "Medium",
          readTime: "4 min"
        },
        {
          id: "exam-nerves",
          title: "Why We Feel Nervous",
          description: "Your body's alarm system trying to help you!",
          icon: FaHeart,
          difficulty: "Easy",
          readTime: "3 min"
        },
        {
          id: "procrastination",
          title: "Why People Procrastinate",
          description: "When your brain wants to play instead of work!",
          icon: FaPuzzlePiece,
          difficulty: "Medium",
          readTime: "5 min"
        }
      ]
    }
  ]

  return (
    <div className="home">
      <Hero />
      
      <section className="concepts-section">
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

export default Home