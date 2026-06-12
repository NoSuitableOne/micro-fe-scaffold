import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="micro-app micro-app--react">
      <span className="micro-app__badge">React 19</span>
      <h1>React 子应用</h1>
      <p>可独立运行，也可通过 bootstrap / mount / unmount 接入微前端基座。</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default App
