import { 
  FaBrain, 
  FaWifi, 
  FaMobile, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaCoins,
  FaHeart,
  FaSeedling,
  FaSmile,
  FaPuzzlePiece
} from 'react-icons/fa'

export const getConceptData = async (conceptId) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const concepts = {
    'llm': {
      title: 'What is an LLM?',
      icon: FaBrain,
      category: 'Technology',
      categoryColor: 'var(--purple)',
      difficulty: 'Easy',
      difficultyColor: 'var(--green)',
      readTime: '3 min',
      simpleExplanation: 'An LLM (Large Language Model) is like a super-smart robot friend that has read millions of books and can answer almost any question you have.',
      // Add more data as needed
    },
    'wifi': {
      title: 'How does WiFi work?',
      icon: FaWifi,
      category: 'Technology',
      categoryColor: 'var(--purple)',
      difficulty: 'Easy',
      difficultyColor: 'var(--green)',
      readTime: '4 min',
      simpleExplanation: 'WiFi is like invisible highways in the air that carry your messages, videos, and games!',
      // Add more data as needed
    },
    // Add more concepts here...
  }

  return concepts[conceptId] || null
}
