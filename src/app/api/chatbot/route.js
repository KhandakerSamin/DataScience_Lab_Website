import { NextResponse } from "next/server"
import { knowledgeBase, topicKeywords } from "../../../data/chatbotKnowledge.js"

// Validate API key format
function isValidGoogleKey(key) {
  return key && key.length > 10
}

// Enhanced system prompt for general AI + specific knowledge
function createSystemPrompt() {
  return `You are ROBO, a helpful AI assistant for the Data Science Lab at Daffodil International University (DIU) in Bangladesh. 

You can answer BOTH general questions AND specific questions about DIU/Data Science Lab.

For GENERAL questions (like math, science, programming, life advice, etc.):
- Provide helpful, accurate answers
- Be conversational and friendly
- Use emojis appropriately
- Keep responses concise but informative

For DIU/DATA SCIENCE LAB specific questions, use this knowledge:

UNIVERSITY INFO:
- Daffodil International University (DIU) - Established 2002
- Location: Daffodil Smart City, Birulia, Savar-1341, Bangladesh
- 25,000+ students, 800+ faculty, 50+ programs

DATA SCIENCE LAB LEADERSHIP:
- Chief Advisor: Dr. Md. Sabur Khan (Founder & Chairman Daffodil Family)
- Advisor: Dr. Imran Mahamud (Associate Professor & Head, Software Engineering)
- Advisor: Prof. Dr. Touhid Bhuiyan (Professor & Head, Computer Science & Engineering)
- Lab In-Charge: Md. Shohel Arman (Assistant Professor)

PROGRAMS:
- BSc Data Science (4 years, 144 credits) - BDT 52,000/semester
- MSc Data Science (2 years, 36 credits) - BDT 65,000/semester
- Certificate programs available

RESEARCH AREAS:
- Machine Learning & AI, NLP (Bangla & English), Computer Vision
- Current projects: Bangla NLP, Medical AI, Smart City Analytics
- 75+ publications, industry partnerships

FACILITIES:
- 50+ workstations, NVIDIA RTX 4090 GPUs, computing cluster
- Software: Python, R, TensorFlow, PyTorch, Tableau, Power BI

CONTACT:
- Email: datasciencelab@daffodilvarsity.edu.bd
- Phone: +880-2-9138234-5
- Hours: Sun-Thu 9AM-5PM, Sat 10AM-2PM

CAREER OUTCOMES:
- 96% placement rate, Salary: BDT 45,000-300,000+

Always be helpful, friendly, and informative. For DIU-specific questions, provide detailed information. For general questions, give useful answers while maintaining your identity as ROBO from DIU.`
}

// Check if question is DIU/Lab related
function isDIURelated(message) {
  const lowerMessage = message.toLowerCase()
  const diuKeywords = [
    "diu",
    "daffodil",
    "university",
    "data science lab",
    "lab",
    "program",
    "admission",
    "research",
    "faculty",
    "sabur khan",
    "imran",
    "touhid",
    "shohel",
    "bangladesh",
    "savar",
    "birulia",
    "tuition",
    "fee",
    "course",
    "degree",
    "bachelor",
    "master",
    "certificate",
    "facility",
    "contact",
    "email",
    "phone",
  ]

  return diuKeywords.some((keyword) => lowerMessage.includes(keyword))
}

// Smart knowledge-based response system (for DIU-specific questions)
function getKnowledgeBasedResponse(message) {
  const lowerMessage = message.toLowerCase()

  // Check for exact matches first
  for (const [question, answer] of Object.entries(knowledgeBase.exactMatches)) {
    if (lowerMessage.includes(question.toLowerCase())) {
      return answer
    }
  }

  // Check for specific people mentions
  if (lowerMessage.includes("sabur khan") || lowerMessage.includes("chairman") || lowerMessage.includes("founder")) {
    const chief = knowledgeBase.labLeadership.chiefAdvisor
    return `${chief.name} is our ${chief.position} and ${chief.title}. He is the visionary leader who established DIU as a leading institution in Bangladesh. You can reach him at ${chief.email} 👨‍💼`
  }

  if (lowerMessage.includes("imran") || lowerMessage.includes("software engineering")) {
    const advisor = knowledgeBase.labLeadership.advisors[0]
    return `${advisor.name} is our ${advisor.position} and ${advisor.title}. He specializes in ${advisor.specialization} and his research focuses on ${advisor.research}. Contact: ${advisor.email} 👨‍🏫`
  }

  if (lowerMessage.includes("touhid") || lowerMessage.includes("computer science")) {
    const advisor = knowledgeBase.labLeadership.advisors[1]
    return `${advisor.name} is our ${advisor.position} and ${advisor.title}. He specializes in ${advisor.specialization} and researches ${advisor.research}. Contact: ${advisor.email} 👨‍🎓`
  }

  if (
    lowerMessage.includes("shohel") ||
    lowerMessage.includes("lab in charge") ||
    lowerMessage.includes("lab in-charge")
  ) {
    const inCharge = knowledgeBase.labLeadership.labInCharge
    return `${inCharge.name} is our ${inCharge.position} and ${inCharge.title}. He specializes in ${inCharge.specialization} and handles ${inCharge.responsibilities}. His research focuses on ${inCharge.research}. Contact: ${inCharge.email} 👨‍💻`
  }

  // Check for topic-based responses
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return generateTopicResponse(topic, lowerMessage)
    }
  }

  return null // No specific DIU match found
}

function generateTopicResponse(topic, message) {
  const lowerMessage = message.toLowerCase()

  switch (topic) {
    case "university":
      const uni = knowledgeBase.university
      return `${uni.name} (${uni.shortName}) is a leading private university established in ${uni.established}. Located in ${uni.location}, we serve ${uni.students} with ${uni.programs} and ${uni.faculty}. Our vision is "${uni.vision}" 🏛️`

    case "leadership":
      return `Our Data Science Lab leadership includes:
👑 Chief Advisor: Dr. Md. Sabur Khan (Founder & Chairman)
👨‍🏫 Advisors: Dr. Imran Mahamud (Software Engineering) & Prof. Dr. Touhid Bhuiyan (CSE)
👨‍💻 Lab In-Charge: Md. Shohel Arman (Assistant Professor)
Contact datasciencelab@daffodilvarsity.edu.bd for more details!`

    case "programs":
      if (lowerMessage.includes("undergraduate") || lowerMessage.includes("bachelor")) {
        const prog = knowledgeBase.programs.undergraduate
        return `Our ${prog.name} is a ${prog.duration} program (${prog.credits}) covering ${prog.subjects.slice(0, 4).join(", ")} and more! 📚
💰 Tuition: ${prog.tuition}
📋 Admission: ${prog.admission}
🎓 Scholarships available up to 100%!`
      } else if (lowerMessage.includes("graduate") || lowerMessage.includes("master")) {
        const prog = knowledgeBase.programs.graduate
        return `Our ${prog.name} is a ${prog.duration} program (${prog.credits}) focusing on ${prog.subjects.slice(0, 3).join(", ")} and research! 🎓
💰 Tuition: ${prog.tuition}
📋 Admission: ${prog.admission}`
      }
      return `We offer Bachelor's and Master's programs in Data Science, plus certificate courses! 🎓 Our programs combine theory with hands-on practice. Contact datasciencelab@daffodilvarsity.edu.bd for details.`

    case "contact":
      const contact = knowledgeBase.contact
      return `Contact Information: 📞
📧 Email: ${contact.lab.email}
📱 Phone: ${contact.lab.phone}
📍 Address: ${contact.address.short}
🕒 Hours: ${contact.hours.weekdays}
Visit us at Daffodil Smart City! 🏢`

    default:
      return null
  }
}

// Google Gemini with enhanced prompts for general AI
async function getGeminiResponse(message) {
  try {
    if (!isValidGoogleKey(process.env.GOOGLE_API_KEY)) {
      throw new Error("Invalid Google API key format")
    }

    console.log("🤖 Sending request to Google Gemini...")

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${createSystemPrompt()}\n\nUser question: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 400,
            topP: 0.8,
            topK: 40,
          },
        }),
      },
    )

    console.log("📡 Gemini API Response Status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Gemini API Error:", errorText)
      throw new Error(`Gemini API failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log("📦 Gemini API Response received")

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      const responseText = data.candidates[0].content.parts[0].text.trim()
      console.log("✅ Successfully extracted response from Gemini")
      return responseText
    } else {
      console.error("❌ Invalid response structure from Gemini:", JSON.stringify(data, null, 2))
      throw new Error("Invalid response structure from Gemini API")
    }
  } catch (error) {
    console.error("❌ Gemini Error Details:", error.message)
    throw error
  }
}

// Enhanced fallback system
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase()

  // First try DIU-specific knowledge if it's related
  if (isDIURelated(message)) {
    const knowledgeResponse = getKnowledgeBasedResponse(message)
    if (knowledgeResponse) {
      return knowledgeResponse
    }
  }

  // More specific general responses
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage.includes("good morning") ||
    lowerMessage.includes("good afternoon")
  ) {
    return "Hello! I'm ROBO, your AI assistant! 🤖 I can help with questions about our Data Science Lab at DIU, or answer general questions too. What would you like to know? ✨"
  }

  if (lowerMessage.includes("how are you") || lowerMessage.includes("how do you do")) {
    return "I'm doing great, thank you for asking! 😊 I'm here and ready to help with any questions you have. How can I assist you today?"
  }

  if (lowerMessage.includes("what can you do") || lowerMessage.includes("what are your capabilities")) {
    return "I can help you with: 🤖\n• Information about DIU Data Science Lab\n• General questions on various topics\n• Programming and technical questions\n• Academic guidance\n• And much more! Just ask me anything!"
  }

  if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
    return "You're very welcome! 😊 I'm always here to help. Feel free to ask me anything else!"
  }

  // For programming questions
  if (lowerMessage.includes("python") || lowerMessage.includes("javascript") || lowerMessage.includes("programming")) {
    return "I'd love to help with programming questions! 💻 Could you be more specific about what you'd like to know? For example, syntax, concepts, debugging, or project ideas?"
  }

  // For math questions
  if (lowerMessage.includes("math") || lowerMessage.includes("calculate") || lowerMessage.includes("equation")) {
    return "I can help with math problems! 🔢 Please share the specific problem or concept you'd like help with."
  }

  // Default response - more encouraging
  return "I'm here to help! 😊 I can assist with both general questions and specific information about our Data Science Lab at DIU. What would you like to know more about?"
}

export async function POST(request) {
  try {
    const { message } = await request.json()

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("Received message:", message)

    let aiResponse = null
    let aiProvider = "fallback"

    // Check which API keys are available and valid
    const hasValidGoogle = process.env.GOOGLE_API_KEY && isValidGoogleKey(process.env.GOOGLE_API_KEY)

    console.log("API Key Status:", {
      google: hasValidGoogle ? "Valid" : "Invalid/Missing",
    })

    // ALWAYS try AI first for ALL questions
    if (hasValidGoogle) {
      try {
        console.log("Calling Google Gemini for AI response...")
        aiResponse = await getGeminiResponse(message)
        aiProvider = "Google Gemini AI"
        console.log("✅ AI Response received successfully")
      } catch (aiError) {
        console.error("❌ AI API Error:", aiError.message)
        // Only fall back to knowledge base if AI fails
        aiResponse = getKnowledgeBasedResponse(message) || getFallbackResponse(message)
        aiProvider = "Fallback (AI Failed)"
      }
    } else {
      console.log("❌ No valid Google API key, using fallback...")
      aiResponse = getKnowledgeBasedResponse(message) || getFallbackResponse(message)
      aiProvider = "Fallback (No API Key)"
    }

    // Ensure we always have a response
    if (!aiResponse || aiResponse.trim().length === 0) {
      console.log("Empty response, using emergency fallback...")
      aiResponse =
        "I'm here to help! 😊 Could you please rephrase your question or ask me something specific about our Data Science Lab at DIU?"
      aiProvider = "Emergency Fallback"
    }

    console.log(`✅ Final response from ${aiProvider}`)

    return NextResponse.json({
      response: aiResponse,
      provider: aiProvider,
    })
  } catch (error) {
    console.error("❌ Chatbot API Error:", error)

    const emergencyResponse =
      "Hi! I'm ROBO from DIU Data Science Lab! 🤖 I'm experiencing some technical difficulties, but I'm still here to help! Please try asking your question again, or contact us directly at datasciencelab@daffodilvarsity.edu.bd 📧"

    return NextResponse.json({
      response: emergencyResponse,
      provider: "emergency",
    })
  }
}
