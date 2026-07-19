import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Mail, 
  Bot, 
  ChevronLeft, 
  ChevronRight,
  Zap
} from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'AI Task Planner', path: '/task-planner', icon: CheckSquare },
    { name: 'Document Summarizer', path: '/document-summarizer', icon: FileText },
    { name: 'Email Generator', path: '/email-generator', icon: Mail },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <Zap size={24} strokeWidth={2.5} />
          <span className="logo-text">FlowGen AI</span>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="nav-text">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">SM</div>
        <div className="user-info">
          <span className="user-name">Saba Maheen</span>
          <span className="user-role">Productivity Pro</span>
        </div>
      </div>
    </aside>
  );
}
