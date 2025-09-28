import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/api';
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
} from 'react-icons/fa';


let genAI;

// Initialize Gemini
const initializeGemini = () => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  return genAI;
};

// Generate comprehensive concept explanation
export const generateConceptExplanation = async (conceptTitle, category) => {
  try {
    console.log(`🎯 Generating concept explanation for: ${conceptTitle}`);
    
    const ai = initializeGemini();
    
    // Try different models
    const modelNames = ['gemini-2.0-flash-exp', 'gemini-pro', 'models/gemini-pro'];
    let model = null;
    
    for (const modelName of modelNames) {
      try {
        model = ai.getGenerativeModel({ model: modelName });
        break;
      } catch (error) {
        continue;
      }
    }
    
    if (!model) {
      throw new Error('No available Gemini model found');
    }

    const conceptPrompt = `
You are creating educational content for children aged 6-12 about "${conceptTitle}" in the ${category} category.

Please generate a comprehensive explanation in this EXACT format:

SIMPLE_EXPLANATION:
[Write 2-3 sentences explaining the concept in very simple terms that a 6-year-old would understand]

DETAILED_EXPLANATION:
[Write 3 paragraphs (separated by ||| ) that explain the concept in more detail but still kid-friendly. Each paragraph should be 2-3 sentences.]

COMIC_PANELS:
Panel 1: Character=🤓 | Dialogue="Hi! Let's learn about ${conceptTitle}!" | Title="Introduction" | Description="Welcome to our learning adventure!"
Panel 2: Character=🔍 | Dialogue="[Create dialogue explaining a key concept]" | Title="[Create title]" | Description="[Create description]"  
Panel 3: Character=💡 | Dialogue="[Create dialogue with an example]" | Title="[Create title]" | Description="[Create description]"
Panel 4: Character=🎉 | Dialogue="Now you understand ${conceptTitle}!" | Title="Summary" | Description="Great job learning something new!"

FUN_FACTS:
Fact 1: Emoji=🤯 | Text=[Amazing fact about the concept]
Fact 2: Emoji=⚡ | Text=[Interesting detail or surprising information] 
Fact 3: Emoji=🌟 | Text=[Cool connection to everyday life]

Remember:
- Use simple, child-friendly language
- Make it engaging and fun
- Include relevant examples kids can relate to
- Keep explanations clear and concise
- Make the comic panels tell a story
    `;

    console.log('🔄 Sending request to Gemini...');
    
    const result = await Promise.race([
      model.generateContent(conceptPrompt),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 20000)
      )
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Raw response received, parsing...');
    
    // Parse the structured response
    const parsed = parseConceptResponse(text, conceptTitle);
    
    console.log('✅ Successfully generated concept explanation');
    return parsed;
    
  } catch (error) {
    console.error('❌ Error generating concept:', error);
    throw error;
  }
};

// Parse the Gemini response into structured data
const parseConceptResponse = (text, conceptTitle) => {
  console.log('📝 Parsing Gemini response...');
  
  const sections = text.split(/\n\s*\n/).filter(section => section.trim());
  
  let simpleExplanation = '';
  let detailedExplanation = [];
  let comicPanels = [];
  let funFacts = [];
  
  sections.forEach(section => {
    const cleanSection = section.trim();
    
    if (cleanSection.includes('SIMPLE_EXPLANATION:')) {
      simpleExplanation = cleanSection
        .replace(/SIMPLE_EXPLANATION:\s*/i, '')
        .trim();
    }
    
    else if (cleanSection.includes('DETAILED_EXPLANATION:')) {
      const detailText = cleanSection
        .replace(/DETAILED_EXPLANATION:\s*/i, '')
        .trim();
      detailedExplanation = detailText
        .split('|||')
        .map(p => p.trim())
        .filter(p => p.length > 0);
    }
    
    else if (cleanSection.includes('COMIC_PANELS:')) {
      const panelText = cleanSection
        .replace(/COMIC_PANELS:\s*/i, '')
        .trim();
      
      const panelLines = panelText.split(/Panel \d+:/).filter(line => line.trim());
      
      panelLines.forEach((line, index) => {
        const parts = line.split(' | ');
        if (parts.length >= 4) {
          const character = parts[0]?.match(/Character=(.+)/)?.[1] || '🤓';
          const dialogue = parts[1]?.match(/Dialogue="(.+)"/)?.[1] || 'Let me explain...';
          const title = parts[2]?.match(/Title="(.+)"/)?.[1] || `Step ${index + 1}`;
          const description = parts[3]?.match(/Description="(.+)"/)?.[1] || 'Learning something new!';
          
          comicPanels.push({
            character,
            dialogue,
            title,
            description,
            bgColor: getRandomPanelColor(),
            props: getRandomProps()
          });
        }
      });
    }
    
    else if (cleanSection.includes('FUN_FACTS:')) {
      const factText = cleanSection
        .replace(/FUN_FACTS:\s*/i, '')
        .trim();
      
      const factLines = factText.split(/Fact \d+:/).filter(line => line.trim());
      
      factLines.forEach(line => {
        const parts = line.split(' | ');
        if (parts.length >= 2) {
          const emoji = parts[0]?.match(/Emoji=(.+)/)?.[1] || '🤓';
          const text = parts[1]?.match(/Text=(.+)/)?.[1] || 'This is fascinating!';
          
          funFacts.push({ emoji, text });
        }
      });
    }
  });
  
  // Fallback data if parsing fails
  if (!simpleExplanation) {
    simpleExplanation = `${conceptTitle} is a really interesting topic! Let me explain it in a way that's easy to understand.`;
  }
  
  if (detailedExplanation.length === 0) {
    detailedExplanation = [
      "This concept is all around us in daily life, and understanding it helps us make sense of many things we see and experience.",
      "There are several important parts to this topic, and each one connects to the others in interesting ways that we can explore together.",
      "By learning about this, we can better understand how our world works and maybe even discover some surprising connections to other things we know!"
    ];
  }
  
  if (comicPanels.length === 0) {
    comicPanels = [
      {
        character: "🤓",
        dialogue: `Let's learn about ${conceptTitle} together!`,
        title: "Welcome",
        description: "Starting our learning journey!",
        bgColor: "linear-gradient(135deg, #FFE4E1, #E6F3FF)",
        props: []
      },
      {
        character: "🔍",
        dialogue: "Here's how it works...",
        title: "Discovery",
        description: "Exploring the concept step by step!",
        bgColor: "linear-gradient(135deg, #E6F3FF, #F0FFF0)",
        props: []
      },
      {
        character: "💡",
        dialogue: "Now I understand!",
        title: "Understanding",
        description: "Everything is becoming clear!",
        bgColor: "linear-gradient(135deg, #F0FFF0, #FFF8DC)",
        props: []
      }
    ];
  }
  
  if (funFacts.length === 0) {
    funFacts = [
      { emoji: "🤯", text: "This concept has some truly amazing aspects that might surprise you!" },
      { emoji: "⚡", text: "There are fascinating details about this topic that connect to many other things!" },
      { emoji: "🌟", text: "Understanding this opens up a whole new way of seeing the world around us!" }
    ];
  }
  
  return {
    simpleExplanation,
    detailedExplanation,
    comicPanels,
    funFacts
  };
};

// Helper functions
const getRandomPanelColor = () => {
  const colors = [
    "linear-gradient(135deg, #FFE4E1, #E6F3FF)",
    "linear-gradient(135deg, #E6F3FF, #F0FFF0)", 
    "linear-gradient(135deg, #F0FFF0, #FFF8DC)",
    "linear-gradient(135deg, #FFF8DC, #F0E68C)",
    "linear-gradient(135deg, #E6E6FA, #FFE4E1)"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomProps = () => {
  const props = [
    { emoji: "⭐", x: "10%", y: "20%", size: "1.5rem" },
    { emoji: "✨", x: "80%", y: "15%", size: "1.2rem" },
    { emoji: "🌟", x: "15%", y: "70%", size: "1.3rem" },
    { emoji: "💫", x: "85%", y: "75%", size: "1.4rem" }
  ];
  
  // Return 0-2 random props
  const numProps = Math.floor(Math.random() * 3);
  const shuffled = props.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numProps);
};

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