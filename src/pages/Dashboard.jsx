import { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb, 
  History, 
  ArrowRight, 
  Plus, 
  Calendar,
  FileText,
  Mail,
  MessageSquare
} from 'lucide-react';

export default function Dashboard() {
  // State for Today's Tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review FlowGen AI design specifications', completed: false, priority: 'high' },
    { id: 2, text: 'Draft newsletter email for new feature releases', completed: true, priority: 'medium' },
    { id: 3, text: 'Summarize feedback document from beta testers', completed: false, priority: 'high' },
    { id: 4, text: 'Schedule sync-up meeting with developers', completed: false, priority: 'low' },
    { id: 5, text: 'Optimize CSS stylesheets for premium theme', completed: true, priority: 'low' },
  ]);

  // State for new task input in dashboard
  const [newTaskText, setNewTaskText] = useState('');

  // Handle task completion toggle
  const toggleTask = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  // Add task directly from dashboard helper
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      priority: 'medium'
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  // Calculate completed task counts for productivity card
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const productivityPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // SVG stroke-dashoffset calculation for radial progress
  // Radius = 55, Circumference = 2 * PI * 55 = 345.5
  const circumference = 345.5;
  const strokeDashoffset = circumference - (productivityPercentage / 100) * circumference;

  return (
    <div className="dashboard-view">
      <div className="view-header">
        <div className="view-meta">
          <h2 className="view-title">Welcome back, creator</h2>
          <p className="view-subtitle">Here is what is happening with your productivity workspace today.</p>
        </div>
        <div className="view-actions">
          <span className="btn btn-outline" style={{ cursor: 'default' }}>
            <Calendar size={16} />
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* 1. Welcome Card (Banner gradient style) */}
        <div className="card card-welcome col-12">
          <div className="welcome-content">
            <h3 className="welcome-title">Empower Your Creativity with FlowGen AI!</h3>
            <p className="welcome-desc">
              Your intelligent hub is fully synchronized. Use the left menu to draft emails, summarize documents, plan tasks, or brainstorm with your AI Assistant instantly.
            </p>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-val">{completedCount}/{totalCount}</span>
                <span className="stat-lbl">Tasks Done</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">3.5 hrs</span>
                <span className="stat-lbl">Estimated Time Saved</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">{productivityPercentage}%</span>
                <span className="stat-lbl">Focus Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Productivity Score Card */}
        <div className="card col-4">
          <span className="card-title">
            <TrendingUp className="card-title-icon" size={20} />
            Productivity Score
          </span>
          <div className="productivity-score-box">
            <div className="score-radial">
              <svg className="radial-svg">
                <circle className="radial-bg" cx="60" cy="60" r="55"></circle>
                <circle 
                  className="radial-progress" 
                  cx="60" 
                  cy="60" 
                  r="55"
                  style={{ strokeDashoffset }}
                ></circle>
              </svg>
              <div className="score-value">
                <span className="score-num">{productivityPercentage}%</span>
                <span className="score-pct">efficiency</span>
              </div>
            </div>
            <div className="score-breakdown">
              <div className="breakdown-row">
                <span className="indicator-dot completed"></span>
                <span>{completedCount} Completed</span>
              </div>
              <div className="breakdown-row">
                <span className="indicator-dot remaining"></span>
                <span>{totalCount - completedCount} In Progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Today's Tasks Card */}
        <div className="card col-8">
          <span className="card-title">
            <CheckCircle2 className="card-title-icon" size={20} />
            Today's Checklist
          </span>
          
          <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder="Add a new task..." 
              className="form-input" 
              style={{ margin: 0 }}
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 14px' }}>
              <Plus size={18} />
            </button>
          </form>

          <div className="task-items-list">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="task-checkbox-wrapper">
                  <div className="task-checkbox">
                    {task.completed && <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>✓</span>}
                  </div>
                </div>
                <span className="task-label">{task.text}</span>
                <span className={`task-badge ${task.priority}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. AI Suggestions Card */}
        <div className="card col-6">
          <span className="card-title">
            <Lightbulb className="card-title-icon" size={20} />
            AI Suggestions
          </span>
          <div className="suggestion-list">
            <div className="suggestion-item">
              <div className="suggestion-icon">
                <Mail size={18} />
              </div>
              <div className="suggestion-content">
                <span className="suggestion-title">Draft Response Needed</span>
                <span className="suggestion-desc">You received feedback on the design. Click to draft a formal team acknowledgment.</span>
                <a href="/email-generator" className="suggestion-action">
                  Go to Email Gen <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <div className="suggestion-item" style={{ borderColor: 'var(--success)', backgroundColor: '#ecfdf5' }}>
              <div className="suggestion-icon" style={{ color: 'var(--success)' }}>
                <FileText size={18} />
              </div>
              <div className="suggestion-content">
                <span className="suggestion-title">Summarize Meeting Notes</span>
                <span className="suggestion-desc">A 5-page transcript from yesterday's product review is ready. Generate key bullets.</span>
                <a href="/document-summarizer" className="suggestion-action" style={{ color: 'var(--success)' }}>
                  Summarize Document <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Recent Activity Card */}
        <div className="card col-6">
          <span className="card-title">
            <History className="card-title-icon" size={20} />
            Recent Activity
          </span>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot">
                <Mail size={16} />
              </div>
              <div className="activity-body">
                <span className="activity-text">Drafted email <span>"Follow-up Client pitch"</span></span>
                <span className="activity-time">12 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot">
                <FileText size={16} />
              </div>
              <div className="activity-body">
                <span className="activity-text">Summarized <span>"ProductRequirements.pdf"</span></span>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot">
                <MessageSquare size={16} />
              </div>
              <div className="activity-body">
                <span className="activity-text">Brainstormed app ideas with <span>AI Assistant</span></span>
                <span className="activity-time">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
