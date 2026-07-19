import { useLocation } from 'react-router-dom';
import { Search, Bell, Settings } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/task-planner':
        return 'AI Task Planner';
      case '/document-summarizer':
        return 'Document Summarizer';
      case '/email-generator':
        return 'Email Generator';
      case '/ai-assistant':
        return 'AI Assistant';
      default:
        return 'FlowGen AI';
    }
  };

  return (
    <header className="header">
      <div className="header-title-area">
        <h1 className="header-title" style={{ margin: 0, fontSize: '1.4rem' }}>
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="search-bar">
        <Search size={18} className="text-muted" />
        <input 
          type="text" 
          placeholder="Search tasks, documents, templates..." 
          className="search-input" 
        />
      </div>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="badge"></span>
        </button>
        <button className="icon-btn" aria-label="Settings">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
