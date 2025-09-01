import OpenAI from 'openai';

// Initialize OpenAI client
console.log('OpenAI API Key loaded:', !!process.env.REACT_APP_OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Structured data from resume and profile
const aadivyaData = {
  personal: {
    name: 'Aadivya Raushan',
    education:
      'Computer Science student at University of Illinois Urbana-Champaign (UIUC)',
    graduation: 'Expected May 2029',
    contact: {
      email: 'aadivya.raushan@gmail.com',
      phone: '+971 56 106 6469',
      linkedin: 'linkedin.com/in/aadivya-raushan-245264240',
      github: 'github.com/aadivyaraushan',
    },
  },

  projects: [
    {
      name: 'LessonGPT',
      role: 'Founder & Lead Developer',
      period: 'May 2023 - Present',
      description:
        'AI platform that generated 1,300+ lesson plans, impacting 120+ educators, adopted school-wide',
      achievements: [
        'Featured by Gulf News',
        'GEMS Innovation Challenge finalist (top 8/300+ projects)',
        'Presented to 170,000+ at GITEX',
      ],
    },
    {
      name: 'AutoCorrect',
      role: 'Independent Researcher',
      period: 'April 2024 - Present',
      description:
        "AI algorithm leveraging OpenAI's GPTs to autonomously grade IB responses",
      achievements: [
        '100x faster grading',
        '60% accuracy on 60+ real IB questions',
      ],
    },
    {
      name: 'Project Streamline',
      role: 'Co-Founder & CTO',
      period: 'September 2023 - January 2024',
      description: 'Biometric authentication system for schools',
      achievements: [
        'Represented UAE at iCAN Global Summit (500+ participants, 39+ countries)',
        'Presented at GITEX Global',
        'Presented at Intersec Conference',
      ],
    },
    {
      name: 'SupplyBlock',
      role: 'Founder & Lead Developer',
      period: 'June 2022 - August 2022',
      description:
        'Blockchain-powered supply chain platform, 10,000 lines of code, full-stack deployment',
      achievements: ['Self-taught blockchain in one month'],
    },
  ],

  awards: [
    'Gulf News Featured Innovator (LessonGPT) 2023',
    'GEMS Global Innovation Cup Finalist (Top 8/350+) 2023',
    'iCAN Global Innovation Conference UAE Representative 2023',
    'Cambridge Center Spotlight Scholar & STEM Merit Scholar 2023',
    'ICSE Grade 10 World Topper Computer Science & Chemistry 2023',
    'STEMPedia Global AI Competition Finalist (Top 10/140+) 2021',
  ],

  skills: {
    programming: ['JavaScript', 'Python', 'HTML', 'CSS', 'Solidity'],
    frameworks: ['React.js', 'Tailwind CSS'],
    tools: [
      'Git',
      'AWS',
      'Docker',
      'Node.js',
      'Truffle',
      'Google Analytics',
      'Adobe Creative Suite',
    ],
  },

  academics: {
    sat: '1560 (780 English, 780 Math)',
    ib: {
      grade12: '41/45 (Top 10%)',
      grade11: '41/42 (Top 1-2%)',
    },
    icse: '98.4% average, World Topper in Computer Science & Chemistry',
  },

  research: [
    'Quantum Computation at Cambridge (Dr. Sergii Strelchuk)',
    'Gamification & Adolescent Productivity study published in International Journal (impact factor 8.76)',
    'AutoCorrect AI grading algorithm',
  ],
};

// Initialize (nothing to do now)
export async function initializeVectorRAG() {
  console.log('RAG initialized with structured data');
}

// No search needed - just return the full context
export async function retrieveRelevantChunks(query, topK = 5) {
  return [JSON.stringify(aadivyaData, null, 2)];
}

// Generate response using full context every time
export async function generateRAGResponse(query, retrievedChunks) {
  try {
    const fullContext = JSON.stringify(aadivyaData, null, 2);

    const prompt = `Answer the question about Aadivya Raushan using the complete information below. Be specific and factual.

Complete Profile Information:
"""
${fullContext}
"""

Question: ${query}`;

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that answers questions about Aadivya Raushan. Always extract specific facts from the provided data. Use simple formatting for better readability.

EXAMPLES:
Q: "Where does Aadivya study?"
A: "Aadivya studies Computer Science at the University of Illinois Urbana-Champaign (UIUC) and is expected to graduate in May 2029."

Q: "What recognition did his projects get?"
A: "His projects received significant recognition:
* LessonGPT: Featured by Gulf News, GEMS Innovation Challenge finalist (top 8/300+ projects), presented to 170,000+ at GITEX
* Project Streamline: Represented UAE at iCAN Global Summit (500+ participants, 39+ countries), presented at GITEX Global and Intersec Conference"

Always be specific, factual, and use * for bullet points when listing multiple items.`,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-5-mini',
      max_completion_tokens: 3000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI chat completion failed:', error);
    return 'Sorry, I encountered an error processing your question.';
  }
}
