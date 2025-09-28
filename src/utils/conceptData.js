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
  FaPuzzlePiece,
  FaLaptop,
  FaDna,
  FaGraduationCap
} from 'react-icons/fa'
import { generateConceptExplanation } from './geminiConceptService'

// Icon mapping for concepts
const CONCEPT_ICONS = {
  // Technology
  'llm': FaBrain,
  'wifi': FaWifi,
  'whatsapp': FaMobile,
  'smartphone': FaMobile,
  'internet': FaLaptop,

  // Finance
  'credit-card': FaCreditCard,
  'interest': FaMoneyBillWave,
  'inflation': FaCoins,
  'banking': FaMoneyBillWave,
  'cryptocurrency': FaCoins,

  // Science & Health
  'immune-system': FaHeart,
  'photosynthesis': FaSeedling,
  'sleep': FaSmile,
  'dna': FaDna,
  'gravity': FaGraduationCap,

  // Psychology
  'confirmation-bias': FaBrain,
  'exam-nerves': FaHeart,
  'procrastination': FaPuzzlePiece,
  'memory': FaBrain,
  'dreams': FaSmile
}

// Category colors mapping
const CATEGORY_COLORS = {
  'Technology': 'var(--primary-purple)',
  'Money & Finance': 'var(--secondary-orange)',
  'Science & Health': 'var(--accent-green)',
  'Psychology & Life': 'var(--accent-pink)'
}

// Difficulty colors
const DIFFICULTY_COLORS = {
  'Easy': 'var(--accent-green)',
  'Medium': 'var(--accent-yellow)',
  'Hard': 'var(--secondary-orange)'
}

// Concept metadata - this defines all available concepts
export const CONCEPT_METADATA = {
  // Technology concepts
  'llm': {
    title: 'What is an LLM?',
    category: 'Technology',
    difficulty: 'Easy',
    readTime: '3 min',
    description: 'Like a super-smart robot friend that reads lots of books!'
  },
  'wifi': {
    title: 'How does WiFi work?',
    category: 'Technology',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'Invisible highways for your messages and videos!'
  },
  'whatsapp': {
    title: 'Sending a WhatsApp Message',
    category: 'Technology',
    difficulty: 'Easy',
    readTime: '3 min',
    description: 'A magical journey your message takes around the world!'
  },
  'smartphone': {
    title: 'How Smartphones Work',
    category: 'Technology',
    difficulty: 'Medium',
    readTime: '5 min',
    description: 'A tiny computer in your pocket!'
  },
  'internet': {
    title: 'What is the Internet?',
    category: 'Technology',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'The biggest library in the world!'
  },

  // Finance concepts
  'credit-card': {
    title: 'How Credit Cards Work',
    category: 'Money & Finance',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'Like borrowing a toy from a friend, but you pay them back later!'
  },
  'interest': {
    title: 'Why Banks Charge Interest',
    category: 'Money & Finance',
    difficulty: 'Medium',
    readTime: '5 min',
    description: 'Payment for using someone else\'s piggy bank money!'
  },
  'inflation': {
    title: 'What is Inflation?',
    category: 'Money & Finance',
    difficulty: 'Medium',
    readTime: '4 min',
    description: 'When your pocket money buys less candy than before!'
  },
  'banking': {
    title: 'How Banks Work',
    category: 'Money & Finance',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'Special places that keep your money safe!'
  },
  'cryptocurrency': {
    title: 'What is Cryptocurrency?',
    category: 'Money & Finance',
    difficulty: 'Hard',
    readTime: '6 min',
    description: 'Digital money that lives in computers!'
  },

  // Science & Health concepts
  'immune-system': {
    title: 'How Our Body Fights Germs',
    category: 'Science & Health',
    difficulty: 'Easy',
    readTime: '5 min',
    description: 'Tiny superhero soldiers protecting your body castle!'
  },
  'photosynthesis': {
    title: 'How Plants Make Food',
    category: 'Science & Health',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'Plants are like tiny chefs cooking with sunlight!'
  },
  'sleep': {
    title: 'Why We Need Sleep',
    category: 'Science & Health',
    difficulty: 'Easy',
    readTime: '3 min',
    description: 'Your brain\'s special cleaning and repair time!'
  },
  'dna': {
    title: 'What is DNA?',
    category: 'Science & Health',
    difficulty: 'Medium',
    readTime: '5 min',
    description: 'The instruction book inside every living thing!'
  },
  'gravity': {
    title: 'How Gravity Works',
    category: 'Science & Health',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'The invisible force that keeps us on Earth!'
  },

  // Psychology concepts
  'confirmation-bias': {
    title: 'Confirmation Bias',
    category: 'Psychology & Life',
    difficulty: 'Medium',
    readTime: '4 min',
    description: 'Why we only hear what we want to hear!'
  },
  'exam-nerves': {
    title: 'Why We Feel Nervous',
    category: 'Psychology & Life',
    difficulty: 'Easy',
    readTime: '3 min',
    description: 'Your body\'s alarm system trying to help you!'
  },
  'procrastination': {
    title: 'Why People Procrastinate',
    category: 'Psychology & Life',
    difficulty: 'Medium',
    readTime: '5 min',
    description: 'When your brain wants to play instead of work!'
  },
  'memory': {
    title: 'How Memory Works',
    category: 'Psychology & Life',
    difficulty: 'Medium',
    readTime: '4 min',
    description: 'Your brain\'s amazing storage system!'
  },
  'dreams': {
    title: 'Why Do We Dream?',
    category: 'Psychology & Life',
    difficulty: 'Easy',
    readTime: '4 min',
    description: 'Your brain\'s movie theater while you sleep!'
  }
}

// NEW FUNCTION: Get all concepts organized by category (MISSING FUNCTION)
export const getAllConceptsByCategory = () => {
  console.log('📚 Organizing all concepts by category...')

  // Create categories map
  const categoriesMap = {}

  // Group concepts by category
  Object.entries(CONCEPT_METADATA).forEach(([conceptId, concept]) => {
    if (!categoriesMap[concept.category]) {
      categoriesMap[concept.category] = {
        title: concept.category,
        color: CATEGORY_COLORS[concept.category],
        concepts: []
      }
    }

    categoriesMap[concept.category].concepts.push({
      id: conceptId,
      title: concept.title,
      description: concept.description,
      difficulty: concept.difficulty,
      readTime: concept.readTime,
      icon: CONCEPT_ICONS[conceptId] || FaBrain
    })
  })

  // Convert to array and sort concepts within each category
  const categories = Object.values(categoriesMap).map(category => ({
    ...category,
    concepts: category.concepts.sort((a, b) => a.title.localeCompare(b.title))
  }))

  console.log(`✅ Successfully organized ${categories.length} categories with ${Object.keys(CONCEPT_METADATA).length} total concepts`)

  return categories
}

// Get concept data with Gemini-generated content
export const getConceptData = async (conceptId) => {
  console.log(`📖 Loading concept: ${conceptId}`);

  // Check if concept exists in metadata
  const metadata = CONCEPT_METADATA[conceptId]
  if (!metadata) {
    console.error(`❌ Concept ${conceptId} not found in metadata`)
    return null
  }

  try {
    // Show loading state
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate content using Gemini
    console.log(`🤖 Generating content for: ${metadata.title}`)
    const generatedContent = await generateConceptExplanation(metadata.title, metadata.category)

    // Combine metadata with generated content
    const fullConcept = {
      id: conceptId,
      title: metadata.title,
      icon: CONCEPT_ICONS[conceptId] || FaBrain,
      category: metadata.category,
      categoryColor: CATEGORY_COLORS[metadata.category],
      difficulty: metadata.difficulty,
      difficultyColor: DIFFICULTY_COLORS[metadata.difficulty],
      readTime: metadata.readTime,
      description: metadata.description,
      // Generated content from Gemini
      simpleExplanation: generatedContent.simpleExplanation,
      detailedExplanation: generatedContent.detailedExplanation,
      comicPanels: generatedContent.comicPanels,
      funFacts: generatedContent.funFacts
    }

    console.log(`✅ Successfully loaded concept: ${metadata.title}`)
    return fullConcept

  } catch (error) {
    console.error(`❌ Error generating concept ${conceptId}:`, error)

    // Return fallback data if Gemini fails
    return {
      id: conceptId,
      title: metadata.title,
      icon: CONCEPT_ICONS[conceptId] || FaBrain,
      category: metadata.category,
      categoryColor: CATEGORY_COLORS[metadata.category],
      difficulty: metadata.difficulty,
      difficultyColor: DIFFICULTY_COLORS[metadata.difficulty],
      readTime: metadata.readTime,
      description: metadata.description,
      // Fallback content
      simpleExplanation: `${metadata.title} is a really interesting topic! Let me explain it in a simple way that's easy to understand.`,
      detailedExplanation: [
        "This is a fascinating concept that touches many parts of our daily lives.",
        "Understanding this helps us make sense of the world around us.",
        "There are many interesting aspects to explore about this topic."
      ],
      comicPanels: [
        {
          character: "🤔",
          dialogue: "Let me think about this...",
          title: "Getting Started",
          description: "Every great explanation starts with curiosity!",
          bgColor: "linear-gradient(135deg, #FFE4E1, #E6F3FF)",
          props: []
        }
      ],
      funFacts: [
        {
          emoji: "🤓",
          text: "This topic has many amazing facts waiting to be discovered!"
        },
        {
          emoji: "⭐",
          text: "Learning about this opens up a whole new world of understanding!"
        },
        {
          emoji: "🚀",
          text: "This concept connects to many other interesting ideas!"
        }
      ]
    }
  }
}

// Get related concepts for a given concept
export const getRelatedConcepts = (currentConceptId, count = 3) => {
  const currentConcept = CONCEPT_METADATA[currentConceptId]
  if (!currentConcept) return []

  // Get concepts from the same category first, then others
  const sameCategory = Object.entries(CONCEPT_METADATA)
    .filter(([id, concept]) => 
      id !== currentConceptId && 
      concept.category === currentConcept.category
    )
    .slice(0, 2)

  const otherCategories = Object.entries(CONCEPT_METADATA)
    .filter(([id, concept]) => 
      id !== currentConceptId && 
      concept.category !== currentConcept.category
    )
    .slice(0, count - sameCategory.length)

  const related = [...sameCategory, ...otherCategories]
    .slice(0, count)
    .map(([id, concept]) => ({
      id,
      title: concept.title,
      description: concept.description,
      emoji: getConceptEmoji(concept.category),
      difficulty: concept.difficulty
    }))

  return related
}

// Helper function to get emoji for category
const getConceptEmoji = (category) => {
  const categoryEmojis = {
    'Technology': '💻',
    'Money & Finance': '💰',
    'Science & Health': '🧬',
    'Psychology & Life': '🧠'
  }

  return categoryEmojis[category] || '🎓'
}
