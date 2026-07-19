import { useState } from 'react';
import { UploadCloud, FileText, Check, Copy, Trash2, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function DocSummarizer() {
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Summary sections state
  const [summaryData, setSummaryData] = useState(null);

  // File Uploader / FileReader logic
  const handleFileChange = (e) => {
    setErrorMessage('');
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      setErrorMessage('Only .txt text files are supported for local parsing.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target.result);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read the file contents.');
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      setErrorMessage('Only .txt text files are supported for local parsing.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target.result);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read the file contents.');
    };
    reader.readAsText(file);
  };

  // Client-side text processing logic (Summarizer algorithm)
  const summarizeTextLocal = (text) => {
    const cleanText = text.trim();
    
    // Split text into sentences
    const sentences = cleanText
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 5);

    if (sentences.length === 0) {
      return {
        shortSummary: cleanText,
        keyPoints: [cleanText],
        actionItems: ['Read the raw document.']
      };
    }

    // 1. Generate Short Summary
    // Pick the first 2 sentences (or fewer if total sentences is 1)
    const summarySentencesCount = Math.min(2, sentences.length);
    const shortSummary = sentences.slice(0, summarySentencesCount).join('. ') + '.';

    // 2. Extract Key Points
    // Search for sentences containing high-value informational keywords
    const keyKeywords = ['important', 'key', 'focus', 'need', 'develop', 'create', 'design', 'implement', 'goal', 'milestone', 'primary', 'essential', 'require', 'achieve', 'result'];
    let keyPoints = sentences.filter(s => 
      keyKeywords.some(keyword => s.toLowerCase().includes(keyword))
    );

    // Fallback: if no keyword matches, select the longest sentences
    if (keyPoints.length < 2) {
      const sortedByLength = [...sentences].sort((a, b) => b.length - a.length);
      keyPoints = sortedByLength.slice(0, Math.min(4, sortedByLength.length));
    } else {
      keyPoints = keyPoints.slice(0, 4);
    }

    // Format strings (capitalization and ending dot)
    keyPoints = keyPoints.map(p => {
      const clean = p.charAt(0).toUpperCase() + p.slice(1);
      return clean.endsWith('.') ? clean : clean + '.';
    });

    // 3. Extract Action Items
    // Search for action items / task directives
    const actionKeywords = ['should', 'must', 'will', 'todo', 'action', 'assign', 'schedule', 'create', 'draft', 'fix', 'update', 'implement', 'review', 'test', 'setup', 'check', 'gather', 'prepare'];
    let actionItems = sentences.filter(s => 
      actionKeywords.some(keyword => s.toLowerCase().includes(keyword))
    );

    // Fallback if none found
    if (actionItems.length === 0) {
      actionItems = [
        'Review the key points listed in this document.',
        'Circulate notes and summaries among project team members.',
        'Outline next steps and assign ownership to goals.'
      ];
    } else {
      actionItems = actionItems.slice(0, 4).map(a => {
        const clean = a.charAt(0).toUpperCase() + a.slice(1);
        return clean.endsWith('.') ? clean : clean + '.';
      });
    }

    return {
      shortSummary,
      keyPoints,
      actionItems
    };
  };

  const handleSummarize = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setSummaryData(null);
    setErrorMessage('');

    // Simulate network delay for a real AI feel
    setTimeout(() => {
      try {
        const results = summarizeTextLocal(inputText);
        setSummaryData(results);
      } catch {
        setErrorMessage('An error occurred during local summarization.');
      } finally {
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleClear = () => {
    setInputText('');
    setSelectedFile(null);
    setSummaryData(null);
    setErrorMessage('');
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = '';
  };

  const handleCopy = () => {
    if (!summaryData) return;

    const formattedMarkdown = `### Short Summary\n${summaryData.shortSummary}\n\n### Key Points\n${summaryData.keyPoints.map(p => `* ${p}`).join('\n')}\n\n### Action Items\n${summaryData.actionItems.map(a => `* ${a}`).join('\n')}`;

    navigator.clipboard.writeText(formattedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="doc-summarizer-view">
      <div className="view-header">
        <div className="view-meta">
          <h2 className="view-title">Document Summarizer</h2>
          <p className="view-subtitle">Upload text files or paste meeting notes to generate structured outlines and actions.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Side: Input Panel */}
        <div className="card col-6">
          <span className="card-title">
            <UploadCloud className="card-title-icon" size={20} />
            Source Document
          </span>

          {/* File Dropzone */}
          <div 
            className="file-dropzone" 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
            style={{ marginBottom: '16px' }}
          >
            <input 
              id="file-input" 
              type="file" 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              accept=".txt" 
            />
            <div className="dropzone-icon">
              <UploadCloud size={24} />
            </div>
            <span className="dropzone-title">
              {selectedFile ? `File: ${selectedFile.name}` : 'Drag & drop a .txt document or click to browse'}
            </span>
            <span className="dropzone-desc">Supports plain text (.txt) files</span>
          </div>

          {errorMessage && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: 'var(--danger-light)', 
              color: 'var(--danger)', 
              padding: '12px', 
              borderRadius: 'var(--radius-md)', 
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Large text area */}
          <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label className="form-label">Or Paste Document Notes</label>
            <textarea 
              className="form-textarea" 
              placeholder="Paste your meeting notes, brainstorming thoughts, emails, or project logs here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1, minHeight: '220px', resize: 'vertical' }}
            />
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button 
              type="button" 
              onClick={handleClear} 
              className="btn btn-outline" 
              disabled={isLoading || (!inputText && !selectedFile)}
            >
              <Trash2 size={16} />
              Clear
            </button>
            <button 
              type="button" 
              onClick={handleSummarize} 
              className="btn btn-primary"
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Summarize
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="card col-6" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="card-title" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText className="card-title-icon" size={20} />
              AI Summary Output
            </span>
            {summaryData && (
              <button 
                className="btn btn-secondary" 
                onClick={handleCopy} 
                style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
                title="Copy Summary to Clipboard"
              >
                {copied ? (
                  <>
                    <Check size={14} style={{ color: 'var(--success)' }} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy Summary
                  </>
                )}
              </button>
            )}
          </span>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {isLoading ? (
              <div 
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)', marginBottom: '12px' }} />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Processing Source Text
                </span>
                <span>Extracting short summary, key points, and action items...</span>
              </div>
            ) : summaryData ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                {/* 1. Short Summary */}
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    1. Short Summary
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {summaryData.shortSummary}
                  </p>
                </div>

                {/* 2. Key Points */}
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    2. Key Points
                  </h4>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {summaryData.keyPoints.map((point, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Action Items */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    3. Action Items
                  </h4>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {summaryData.actionItems.map((item, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div 
                style={{ 
                  flex: 1, 
                  border: '1px dashed var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <FileText size={32} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                <span>
                  Paste text or upload a plain text file, then click <strong>Summarize</strong> to see the results.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
