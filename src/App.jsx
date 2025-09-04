import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className='app'>
      <section className='sideBar'>
        <button>+ New Chat</button>
        <ul className='history'></ul>
        <nav>
          <p>nexus_ai</p>
        </nav>
      </section>

      <section className='main'>
        <h1>NexusGPT</h1>
        <ul className='feed'>

        </ul>

        <div className='bottom-section'>
          <div className='input-container'>
            <input/>
            <div id='submit'> ✔️</div>
          </div>
      
          <p className='info'>
            The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
