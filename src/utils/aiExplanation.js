export const generateExplanation = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Basic keyword matching example
  const queryLower = query.toLowerCase()
  let explanation = {
    simpleAnswer: '',
    storyExplanation: '',
    funFact: ''
  }
  
  if (queryLower.includes('sky') && queryLower.includes('blue')) {
    explanation = {
      simpleAnswer: "The sky looks blue because sunlight scatters across the atmosphere and blue light scatters the most.",
      storyExplanation: "Imagine sunlight is a box of crayons, blue crayons get thrown everywhere, so the sky looks blue!",
      funFact: "The sky is actually a different color on other planets!"
    }
  } else {
    explanation = {
      simpleAnswer: `Here's a simple answer to "${query}": It's like a puzzle all fitting together!`,
      storyExplanation: "Once I wondered about this too, and then I understood - learning is a big adventure!",
      funFact: "Learning new things makes your brain grow stronger every day!"
    }
  }

  return explanation
}
