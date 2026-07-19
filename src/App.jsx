import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TaskPlanner from './pages/TaskPlanner';
import DocSummarizer from './pages/DocSummarizer';
import EmailGenerator from './pages/EmailGenerator';
import AIAssistant from './pages/AIAssistant';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BrowserRouter basename="/flowgen-ai">
      <div className="app-layout">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <div className="main-container">
          <Header />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task-planner" element={<TaskPlanner />} />
              <Route path="/document-summarizer" element={<DocSummarizer />} />
              <Route path="/email-generator" element={<EmailGenerator />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
