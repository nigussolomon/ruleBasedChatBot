import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import FuzzySet from "fuzzyset";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat messages when messages change
    chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Define rule-based responses
  const ruleBasedResponses = {
    "(hi|hello|hey)( there)?": "Hi there! How can I assist you today?",
    "(how are you|how's it going|what's up|sup)":
      "I'm just a bot, but thanks for asking!",
    "bye|goodbye|see you": "Goodbye! Have a great day!",
    "thanks|thank you": "You're welcome!",
    "(good )?(morning|afternoon|evening|night)": (match, timeOfDay) => {
      switch (timeOfDay) {
        case "morning":
          return "Good morning! How can I help you?";
        case "afternoon":
          return "Good afternoon! How can I assist you?";
        case "evening":
          return "Good evening! What can I do for you?";
        case "night":
          return "Good night! Sweet dreams!";
        default:
          return "Hello!";
      }
    },
    "how can I help you|what can I do for you|what do you do":
      "You can ask me anything!",
    "what's your name": "I'm a chatbot. You can call me ChatBot!",
    "tell me a joke":
      "Why don't scientists trust atoms? Because they make up everything!",
    "(college|university)":
      "College is a great opportunity to learn and grow academically and personally.",
    major:
      "Choosing a major can be a daunting task, but it's important to choose something you're passionate about.",
    "(study|studying) tips":
      "Staying organized, managing your time effectively, and seeking help when needed are key study tips for college success.",
    "(extracurricular|extra curricular) activities":
      "Participating in extracurricular activities can enhance your college experience and provide valuable skills outside of the classroom.",
    "(career|job) advice":
      "Start thinking about your career early on and explore internships, networking opportunities, and career services offered by your college.",
    "(help|need help|can you help me)":
      "Of course! What do you need help with?",
    "(how do I|how can I|what are the ways to) (improve|enhance|boost) (my|our|one's) (studies|study skills|learning)":
      "There are many ways to improve your study skills, such as...",
    "(what are the|what are some|can you suggest) (best|top|effective) (ways|methods|techniques) to (study|learn)":
      "Here are some effective study techniques:...",
    "I (need|want) (information|details) (about|regarding|on) (courses|programs|classes)":
      "Sure! What specific information are you looking for?",
    "(how do I|what is the best way to|can you recommend the best approach to) (choose|select|pick) (a|my) (major|field of study|course)":
      "When choosing a major, consider your interests, strengths, and career goals...",
    "I (am|feel) (lost|confused) (about|regarding|with) (my|choosing a) (major|course)":
      "It's normal to feel unsure about choosing a major. Consider exploring different options, talking to advisors, and seeking career counseling...",
    "(how do I|what are some ways to|can you suggest ways to) (prepare|get ready|plan) (for|ahead for) (college|university)":
      "To prepare for college, focus on...",
    "(what is|tell me about) (your|the) (purpose|goal|objective|function)":
      "The purpose of this chatbot is to provide assistance and information on various topics.",
    "(how (does it|do you) work)":
      "This chatbot works by analyzing your messages and providing predefined responses based on patterns and rules.",
    "(is this|are you) (a|an) (AI|artificial intelligence)":
      "Yes, I'm an AI-powered chatbot designed to help with your inquiries.",
    "what (can I|should I) (do|study) (to|for) (improve|enhance) (my|our) (skills|knowledge)":
      "Practicing regularly, seeking feedback, and learning from mistakes are effective ways to improve your skills.",
    "(where can I|how do I) find (scholarships|financial aid)":
      "You can find scholarships and financial aid opportunities through online databases, your school's financial aid office, and community organizations.",
    "I (am|feel) (stressed|overwhelmed) (with|about) (school|college)":
      "It's important to take breaks, prioritize tasks, and seek support from friends, family, or a counselor when feeling stressed or overwhelmed.",
    "(how do I|what's the best way to) (balance|manage) (school|college) and (work|other commitments)":
      "Creating a schedule, setting realistic goals, and practicing time management techniques can help you balance school and other commitments effectively.",
    "(what are|can you recommend) (some|good) (books|resources) (for|about) (subject|topic)":
      "Here are some recommended books/resources for that subject/topic:...",
    "(what are|can you suggest) (some|good) (study|learning) (apps|tools)":
      "Here are some recommended study/learning apps/tools:...",
    "(how do I|what's the best way to) (prepare|study) for (exams|tests)":
      "Creating a study schedule, reviewing notes regularly, and practicing with past exams/tests are effective ways to prepare for exams/tests.",
    "(what are|can you suggest) (some|good) (habits|habits for success) (for|in) (college|university)":
      "Here are some good habits for success in college/university:...",
    "(how do I|what's the best way to) (network|networking) (in|at) (college|university)":
      "Attending events, joining clubs/organizations, and connecting with professors/alumni are effective ways to network in college/university.",
    "(what are|can you suggest) (some|good) (time management|time management techniques)":
      "Here are some good time management techniques:...",
    "(how do I|what's the best way to) (overcome|deal with) (procrastination|procrastinating)":
      "Breaking tasks into smaller steps, setting deadlines, and eliminating distractions can help overcome procrastination.",
    "(how do I|what's the best way to) (stay motivated|motivate myself) (to study|in college)":
      "Setting goals, rewarding progress, and reminding yourself of the reasons for your efforts can help you stay motivated.",
    "(how do I|what's the best way to) (improve|enhance) (my|our) (writing|writing skills)":
      "Reading extensively, practicing writing regularly, and seeking feedback from others can help improve writing skills.",
    "(what are|can you suggest) (some|good) (ways|methods) to (relieve|reduce) (stress|stress levels)":
      "Here are some good ways to relieve/reduce stress levels:...",
    "(how do I|what's the best way to) (prepare|get ready) (for|to enter) (the job market|the workforce)":
      "Gaining relevant experience through internships, building a professional network, and refining your resume and interview skills can help prepare you for the job market.",
    "(what are|can you recommend) (some|good) (mental health|self-care) (practices|activities)":
      "Here are some good mental health/self-care practices/activities:...",
    "(how do I|what's the best way to) (develop|improve) (critical thinking|critical thinking skills)":
      "Engaging in debates/discussions, analyzing different perspectives, and practicing problem-solving activities can help develop/improve critical thinking skills.",
    "(what are|can you recommend) (some|good) (online courses|online learning platforms)":
      "Here are some good online courses/online learning platforms:...",
    "(how do I|what's the best way to) (choose|select) (a|the right) (career|career path)":
      "Exploring your interests, values, and strengths, and gaining experience through internships or volunteer work can help you choose/select the right career/career path.",
    "(what are|can you recommend) (some|good) (coding|programming) (languages|languages to learn)":
      "Here are some good coding/programming languages to learn:...",
    "(how do I|what's the best way to) (improve|enhance) (public speaking|presentation skills)":
      "Practicing regularly, seeking feedback, and observing skilled speakers can help improve/enhance public speaking/presentation skills.",
    "(what are|can you recommend) (some|good) (resources|websites) (for|about) (learning|education)":
      "Here are some good resources/websites for learning/education:...",
    "(how do I|what's the best way to) (develop|build) (leadership|leadership skills)":
      "Taking on leadership roles, seeking mentorship, and practicing effective communication can help develop/build leadership skills.",
    "(what are|can you suggest) (some|good) (podcasts|podcast series) (for|about) (personal development|self-improvement)":
      "Here are some good podcasts/podcast series for personal development/self-improvement:...",
    "(how do I|what's the best way to) (overcome|deal with) (imposter syndrome)":
      "Recognizing your accomplishments, reframing negative thoughts, and seeking support from others can help overcome/deal with imposter syndrome.",
    "(what are|can you suggest) (some|good) (study|learning) (techniques|strategies) for (visual|auditory|kinesthetic) learners":
      "Here are some good study/learning techniques/strategies for visual/auditory/kinesthetic learners:...",
    "(how do I|what's the best way to) (improve|enhance) (memory|memory retention)":
      "Practicing retrieval exercises, spacing out study sessions, and getting enough sleep can help improve/enhance memory/memory retention.",
    "(what are|can you suggest) (some|good) (methods|approaches) for (effective|efficient) (note-taking|note taking)":
      "Here are some good methods/approaches for effective/efficient note-taking/note taking:...",
    "(how do I|what's the best way to) (develop|build) (emotional intelligence|EQ)":
      "Practicing empathy, self-awareness, and effective communication can help develop/build emotional intelligence/EQ.",
    "(what are|can you suggest) (some|good) (mindfulness|mindfulness exercises)":
      "Here are some good mindfulness/mindfulness exercises:...",
    "(how do I|what's the best way to) (improve|enhance) (creativity|creative thinking)":
      "Engaging in creative activities, exposing yourself to new experiences, and challenging assumptions can help improve/enhance creativity/creative thinking.",
    "(what are|can you suggest) (some|good) (online communities|online forums) (for|about) (learning|education)":
      "Here are some good online communities/online forums for learning/education:...",
    "(how do I|what's the best way to) (build|develop) (resilience|resilience skills)":
      "Practicing self-care, maintaining a positive outlook, and seeking support from others can help build/develop resilience/resilience skills.",
    "(what are|can you suggest) (some|good) (study|learning) (environments|spaces)":
      "Here are some good study/learning environments/spaces:...",
    default: "I'm sorry, I didn't understand that. Can you please rephrase?",
  };

  // Create fuzzy set for rule-based responses
  const fuzzyRules = FuzzySet(Object.keys(ruleBasedResponses));

  // Function to get chatbot response based on input text
  const getChatbotResponse = (inputText) => {
    // Check for exact matches with the patterns
    for (const pattern in ruleBasedResponses) {
      const regex = new RegExp(pattern, "i"); // Case-insensitive match
      if (regex.test(inputText)) {
        // If there's a match, return corresponding response
        const response = ruleBasedResponses[pattern];
        if (typeof response === "function") {
          // If response is a function, execute it with matched groups as arguments
          const matchedGroups = inputText.match(regex).slice(1);
          return response(...matchedGroups);
        }
        return response; // Return response directly
      }
    }
    // If no match found, return default response
    return ruleBasedResponses["default"];
  };

  // Function to send a message
  const sendMessage = () => {
    if (!inputText) return;

    const userMessage = {
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleString(),
    };
    const chatbotResponse = {
      text: getChatbotResponse(inputText),
      sender: "chatbot",
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, userMessage, chatbotResponse]);
    setInputText(""); // Clear input field
  };

  // Function to handle key press (Enter key)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-title">CHAT BOT 😊</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className={`message-content ${message.sender}`}>
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          </div>
        ))}
        {/* Empty div used to scroll to bottom */}
        <div ref={chatBottomRef}></div>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>
          <SendIcon className="send-icon" />
        </button>
      </div>
      <style jsx>{`
        .chat-interface {
          background-color: #f5f5f5;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 97%;
          margin: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 95vh;
        }

        .chat-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
        }

        .chat-messages {
          overflow-y: auto;
          max-height: calc(100% - 150px);
        }

        .message {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .avatar {
          font-size: 20px;
          margin-right: 8px;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .message-text {
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 4px;
          color: white;
          word-wrap: break-word;
        }

        .message-timestamp {
          font-size: 12px;
          color: #888;
          align-self: flex-end;
        }

        .user {
          align-items: flex-end;
        }

        .user .message-text {
          background-color: #009688; /* User message background color */
        }

        .chatbot .message-text {
          background-color: #3f51b5; /* Bot message background color */
        }

        .input-container {
          display: flex;
          margin-top: 20px;
        }

        input {
          flex: 1;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          margin-right: 10px;
        }

        button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default App;
