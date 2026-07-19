import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';

let msgId = 100;

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'assistant', 
      text: 'Hello! I am your FlowGen AI Assistant. How can I help optimize your productivity flow today?' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const promptSuggestions = [
    'Help me brainstorm project ideas',
    'Write a summary of my checklist',
    'Draft a professional apology letter',
    'Explain React Router layout paths'
  ];

  // Auto scroll to bottom when messages load
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle mock responses based on input queries
  const getMockResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('brainstorm') || q.includes('project')) {
      return "Here are three project ideas for productivity hubs:\n1. **ZenFocus**: A minimalist writing app with ambient noise controllers and task lists.\n2. **TimeBlocker**: A calendar-centered dashboard that auto-schedules deep work intervals.\n3. **PulseFlow**: Team-wide status board utilizing visual widgets to track blockages.";
    }
    if (q.includes('summary') || q.includes('checklist')) {
      return "Based on your checklist details: You have completed 2 out of 5 tasks. Outstanding items involve reviewing design specs and summarizing feedback from testers. Recommended action: Start by drafting the feedback emails first!";
    }
    if (q.includes('apology') || q.includes('letter') || q.includes('email')) {
      return "Sure, here is a quick draft outline:\n*Subject: Project Delay Acknowledgment*\n'Dear [Name], Please accept our sincere apologies for the timeline delay. We are actively polishing the collapsible sidebar configurations and will submit the final Vite routes within 24 hours.'";
    }
    if (q.includes('react') || q.includes('router') || q.includes('layout')) {
      return "React Router uses `<BrowserRouter>` at the app root. You specify your layout container as a parent `<Route>` element. Inside the layout, use the `<Outlet />` component from react-router-dom to swap child routes dynamically.";
    }
    return "I appreciate the insight! I am currently operating in mockup mode, but I've noted your prompt. Let me know if you would like me to rewrite or structure a quick outline for this topic.";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: ++msgId,
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing latency
    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage = {
        id: ++msgId,
        sender: 'assistant',
        text: getMockResponse(textToSend)
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="assistant-view">
      <div className="view-header" style={{ marginBottom: '16px' }}>
        <div className="view-meta">
          <h2 className="view-title">AI Brainstorming Assistant</h2>
          <p className="view-subtitle">Ask questions, generate draft concepts, or troubleshoot routing configurations.</p>
        </div>
      </div>

      <div className="chat-container">
        {/* Messages Body */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              <div className="bubble-avatar">
                {msg.sender === 'assistant' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className="bubble-content" style={{ whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble assistant">
              <div className="bubble-avatar">
                <Bot size={18} />
              </div>
              <div className="bubble-content" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Assistant is drafting thoughts...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion prompt deck */}
        <div className="chat-prompt-suggestions">
          {promptSuggestions.map((prompt, idx) => (
            <span 
              key={idx} 
              className="prompt-suggestion-card"
              onClick={() => handleSendMessage(prompt)}
            >
              ✨ {prompt}
            </span>
          ))}
        </div>

        {/* Chat input block */}
        <form onSubmit={handleSubmit} className="chat-input-area">
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              className="chat-text-input" 
              placeholder="Ask anything (e.g. Brainstorm ideas)..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={isTyping}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={!inputText.trim() || isTyping}
            style={{ borderRadius: 'var(--radius-full)', padding: '10px 18px' }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
