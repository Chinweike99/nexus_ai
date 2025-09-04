import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('');
  const [sessions, setSessions] = useState([]); 
  const [activeIndex, setActiveIndex] = useState(null); // which session is open

  const getMessage = async () => {
    if (!text.trim()) return;

    const userPrompt = text;
    const preview = text.slice(0, 30); // sidebar title (only for first prompt)

    const options = {
      method: "POST",
      body: JSON.stringify({ message: userPrompt }),
      headers: { "Content-Type": "application/json" }
    };

    try {
      const response = await fetch('http://localhost:4000/completion', options);
      const result = await response.json();

      setSessions(prev => {
        const newSessions = [...prev];

        // if no active chat, create a new one
        if (activeIndex === null) {
          newSessions.push({
            title: preview, // only the first user message
            messages: [{ prompt: userPrompt, response: result.data }]
          });
          setActiveIndex(newSessions.length - 1); // open it
        } else {
          // add message to the current active session
          newSessions[activeIndex].messages.push({
            prompt: userPrompt,
            response: result.data
          });
        }

        return newSessions;
      });

      setText(''); // clear input
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = () => {
    setActiveIndex(null); // start fresh main feed, keep sidebar sessions
    setText('');
  };

  return (
    <div className='app'>
      {/* Sidebar */}
      <section className='sideBar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {sessions.map((session, i) => (
            <li
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{ cursor: 'pointer', fontWeight: i === activeIndex ? 'bold' : 'normal' }}
            >
              {session.title}
            </li>
          ))}
        </ul>
        <nav>
          <p>nexus_ai</p>
        </nav>
      </section>

      {/* Main conversation feed */}
      <section className='main'>
        <h1>NexusGPT</h1>
        <ul className='feed'>
          {activeIndex !== null &&
            sessions[activeIndex].messages.map((chat, i) => (
              <li key={i}>
                <span className='user'><strong>You:</strong> {chat.prompt}</span>
                < p className='assistant'><strong>NexusGPT:</strong> {chat.response}</p>
              </li>
            ))}
        </ul>

        {/* Input */}
        <div className='bottom-section'>
          <div className='input-container'>
            <input
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && getMessage()}
            />
            <div id='submit' onClick={getMessage}>✔️</div>
          </div>
      
          <p className='info'>
            The maximum number of total calls to built-in tools that can be processed in a response.
            This maximum number applies across all built-in tool calls, not per individual tool.
            Any further attempts to call a tool by the model will be ignored.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
