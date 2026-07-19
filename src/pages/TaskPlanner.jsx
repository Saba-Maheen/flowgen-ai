import { useState } from 'react';
import { Plus, Check, Play, RotateCcw } from 'lucide-react';

export default function TaskPlanner() {
  // Pre-configured mock planner tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up Vite + React project workspace', desc: 'Configure folder architecture, routers and index.css templates.', status: 'done', priority: 'high', date: 'Jul 18' },
    { id: 2, title: 'Integrate collapsable Left Sidebar UI', desc: 'Ensure smooth toggle transitions and active NavLink highlights.', status: 'in-progress', priority: 'high', date: 'Jul 19' },
    { id: 3, title: 'Implement Document Summarizer Mockup', desc: 'Create file drag and drop interface with mock summarization triggers.', status: 'todo', priority: 'medium', date: 'Jul 20' },
    { id: 4, title: 'Build Email Tone and Topic Generator', desc: 'Design select forms for tones and display generation output boxes.', status: 'todo', priority: 'low', date: 'Jul 21' },
    { id: 5, title: 'Connect local GPT-like chatbot interface', desc: 'Setup visual speech bubbles and pre-scripted suggestions.', status: 'todo', priority: 'medium', date: 'Jul 22' },
  ]);

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');

  // Move task status
  const moveTask = (id, newStatus) => {
    setTasks(prev => 
      prev.map(task => task.id === id ? { ...task, status: newStatus } : task)
    );
  };

  // Add new task
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      desc,
      status,
      priority,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDesc('');
    setStatus('todo');
    setPriority('medium');
    setShowAddForm(false);
  };

  // Filter tasks by columns
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const progressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="planner-view">
      <div className="view-header">
        <div className="view-meta">
          <h2 className="view-title">AI Task Planner</h2>
          <p className="view-subtitle">Manage project milestones and leverage AI suggestions for subtask breakdowns.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn btn-primary"
        >
          <Plus size={18} />
          {showAddForm ? 'Close Editor' : 'Create Task'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateTask} className="card col-12" style={{ marginBottom: '24px', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>New Board Task</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input 
                type="text" 
                className="form-input" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="e.g. Add unit tests" 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description / Subtasks</label>
            <textarea 
              className="form-textarea" 
              value={desc} 
              onChange={e => setDesc(e.target.value)} 
              placeholder="What needs to be done? List step-by-step..."
              style={{ minHeight: '80px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add to Board
            </button>
          </div>
        </form>
      )}

      <div className="planner-board">
        {/* TO DO COLUMN */}
        <div className="board-column">
          <div className="column-header">
            <div className="column-title-box">
              <span className="column-dot todo"></span>
              <span className="column-title">To Do</span>
            </div>
            <span className="column-count">{todoTasks.length}</span>
          </div>

          {todoTasks.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No tasks pending. Clean desk!
            </div>
          )}

          {todoTasks.map(task => (
            <div key={task.id} className="board-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="board-card-title">{task.title}</span>
                <span className={`task-badge ${task.priority}`}>{task.priority.toUpperCase()}</span>
              </div>
              {task.desc && <p className="board-card-desc">{task.desc}</p>}
              <div className="board-card-footer">
                <span className="card-meta">{task.date}</span>
                <button 
                  onClick={() => moveTask(task.id, 'in-progress')} 
                  className="btn btn-secondary" 
                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  title="Start task"
                >
                  <Play size={12} /> Start
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* IN PROGRESS COLUMN */}
        <div className="board-column">
          <div className="column-header">
            <div className="column-title-box">
              <span className="column-dot progress"></span>
              <span className="column-title">In Progress</span>
            </div>
            <span className="column-count">{progressTasks.length}</span>
          </div>

          {progressTasks.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Nothing currently in progress. Start something!
            </div>
          )}

          {progressTasks.map(task => (
            <div key={task.id} className="board-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="board-card-title">{task.title}</span>
                <span className={`task-badge ${task.priority}`}>{task.priority.toUpperCase()}</span>
              </div>
              {task.desc && <p className="board-card-desc">{task.desc}</p>}
              <div className="board-card-footer">
                <span className="card-meta">{task.date}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => moveTask(task.id, 'todo')} 
                    className="btn btn-outline" 
                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    title="Send back to To Do"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <button 
                    onClick={() => moveTask(task.id, 'done')} 
                    className="btn btn-primary" 
                    style={{ padding: '4px 8px', fontSize: '0.75rem', backgroundColor: 'var(--success)' }}
                    title="Mark Done"
                  >
                    <Check size={12} /> Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DONE COLUMN */}
        <div className="board-column">
          <div className="column-header">
            <div className="column-title-box">
              <span className="column-dot done"></span>
              <span className="column-title">Done</span>
            </div>
            <span className="column-count">{doneTasks.length}</span>
          </div>

          {doneTasks.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Complete some tasks to populate this board!
            </div>
          )}

          {doneTasks.map(task => (
            <div key={task.id} className="board-card" style={{ opacity: 0.85 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="board-card-title" style={{ textDecoration: 'line-through' }}>{task.title}</span>
                <span className="task-badge" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>DONE</span>
              </div>
              {task.desc && <p className="board-card-desc">{task.desc}</p>}
              <div className="board-card-footer">
                <span className="card-meta">{task.date}</span>
                <button 
                  onClick={() => moveTask(task.id, 'in-progress')} 
                  className="btn btn-outline" 
                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  title="Re-open task"
                >
                  Re-open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
