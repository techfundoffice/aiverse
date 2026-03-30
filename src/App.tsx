import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CopilotKit } from '@copilotkit/react-core'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import './index.css'

function App() {
  return (
    <CopilotKit
      runtimeUrl="https://nljefapiushyxdawfhgq.supabase.co/functions/v1/copilotkit-runtime"
      agent="aiverse-assistant"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Router>
    </CopilotKit>
  )
}

export default App