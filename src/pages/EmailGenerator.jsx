import { useState } from 'react';
import { Mail, Sparkles, Copy, Check, Trash2, RefreshCw, Loader2 } from 'lucide-react';

export default function EmailGenerator() {
  const [recipient, setRecipient] = useState('');
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState('professional');
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Output email states
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const tones = [
    { id: 'professional', label: '💼 Professional' },
    { id: 'friendly', label: '😊 Friendly' },
    { id: 'formal', label: '👔 Formal' },
    { id: 'casual', label: '☕ Casual' }
  ];

  // Helper local email generation logic
  const generateEmailLocal = (recip, purp, selectedTone, inst) => {
    const cleanRecipient = recip.trim() || 'Team';
    const cleanPurpose = purp.trim() || 'project updates';
    const cleanInstructions = inst.trim();

    // 1. Construct Subject
    let subject;
    switch (selectedTone) {
      case 'professional':
        subject = `Regarding: ${cleanPurpose}`;
        break;
      case 'friendly':
        subject = `Quick update on ${cleanPurpose.toLowerCase()}! ✨`;
        break;
      case 'formal':
        subject = `Official Correspondence: ${cleanPurpose}`;
        break;
      case 'casual':
        subject = `hey, quick question about ${cleanPurpose.toLowerCase()}`;
        break;
      default:
        subject = cleanPurpose;
    }

    // 2. Greetings
    let greeting;
    switch (selectedTone) {
      case 'professional':
        greeting = `Dear ${cleanRecipient},`;
        break;
      case 'friendly':
        greeting = `Hi ${cleanRecipient},`;
        break;
      case 'formal':
        greeting = `Dear Mr./Ms. ${cleanRecipient},`;
        break;
      case 'casual':
        greeting = `Hey ${cleanRecipient},`;
        break;
      default:
        greeting = `Hello ${cleanRecipient},`;
    }

    // 3. Introductory sentences
    let intro;
    switch (selectedTone) {
      case 'professional':
        intro = `I am writing to communicate details regarding our objective to ${cleanPurpose.toLowerCase()}. I wanted to ensure we align on key milestones and next steps.`;
        break;
      case 'friendly':
        intro = `Hope you're having a great week! I wanted to check in about ${cleanPurpose.toLowerCase()} and see where things stand.`;
        break;
      case 'formal':
        intro = `This communication serves to formally address the matter of ${cleanPurpose.toLowerCase()}. Please review the details below.`;
        break;
      case 'casual':
        intro = `Just wanted to send a quick note about ${cleanPurpose.toLowerCase()}.`;
        break;
      default:
        intro = `Regarding ${cleanPurpose.toLowerCase()}: here are the details.`;
    }

    // 4. Instructions incorporation
    let instructionsParagraph;
    if (cleanInstructions) {
      instructionsParagraph = `Additionally, please take note of the following points:\n${cleanInstructions}`;
    } else {
      instructionsParagraph = `Let me know if there are any specific guidelines or feedback you have on this topic so we can coordinate our efforts accordingly.`;
    }

    // 5. Closings
    let closing;
    switch (selectedTone) {
      case 'professional':
        closing = `Best regards,\n\nSaba Maheen\nFlowGen AI Team`;
        break;
      case 'friendly':
        closing = `Thanks so much,\n\nSaba`;
        break;
      case 'formal':
        closing = `Sincerely yours,\n\nSaba Maheen\nFlowGen AI Platform`;
        break;
      case 'casual':
        closing = `Cheers,\n\nSaba`;
        break;
      default:
        closing = `Regards,\n\nSaba Maheen`;
    }

    const body = `${greeting}\n\n${intro}\n\n${instructionsParagraph}\n\n${closing}`;

    return {
      subject,
      body
    };
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    if (!purpose.trim()) return;

    setIsLoading(true);
    setEmailSubject('');
    setEmailBody('');

    setTimeout(() => {
      const result = generateEmailLocal(recipient, purpose, tone, instructions);
      setEmailSubject(result.subject);
      setEmailBody(result.body);
      setIsLoading(false);
    }, 1200);
  };

  const handleClear = () => {
    setRecipient('');
    setPurpose('');
    setTone('professional');
    setInstructions('');
    setEmailSubject('');
    setEmailBody('');
  };

  const handleCopy = () => {
    if (!emailBody) return;
    const fullText = `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="email-generator-view">
      <div className="view-header">
        <div className="view-meta">
          <h2 className="view-title">Email Generator</h2>
          <p className="view-subtitle">Draft professional client communications and templates with custom tone options.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Creator panel */}
        <div className="card col-6">
          <span className="card-title">
            <Mail className="card-title-icon" size={20} />
            Email Parameters
          </span>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Recipient Name / Role</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Sarah (Project lead)" 
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject / Purpose</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. requesting review of design specifications" 
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Tone</label>
              <div className="email-tone-selector">
                {tones.map(t => (
                  <span 
                    key={t.id} 
                    className={`tone-badge ${tone === t.id ? 'active' : ''}`}
                    onClick={() => setTone(t.id)}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label className="form-label">Additional Instructions / Key Points</label>
              <textarea 
                className="form-textarea" 
                placeholder="e.g. Include meeting notes attachment. Mention deadlines by Friday close of business. Ask to coordinate developer sync-ups."
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                style={{ flex: 1, minHeight: '140px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={handleClear} 
                className="btn btn-outline" 
                disabled={isLoading || (!recipient && !purpose && !instructions && !emailBody)}
              >
                <Trash2 size={16} />
                Clear
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={!purpose.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    Generating Email...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Output draft panel */}
        <div className="card col-6" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="card-title" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles className="card-title-icon" size={20} />
              AI Draft Preview
            </span>
            {emailBody && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={handleGenerate} 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
                  title="Regenerate Email"
                  disabled={isLoading}
                >
                  <RefreshCw size={14} />
                  Regenerate
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleCopy} 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
                  title="Copy Draft to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: 'var(--success)' }} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Email
                    </>
                  )}
                </button>
              </div>
            )}
          </span>

          <div className="email-preview-box" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                  Composing Draft
                </span>
                <span>Adjusting syntax metrics to match tone and instructions...</span>
              </div>
            ) : emailBody ? (
              <>
                <div className="email-preview-header">
                  <div className="preview-header-line">
                    <span className="preview-label">To:</span>
                    <span className="preview-val">{recipient || 'Client / Lead'}</span>
                  </div>
                  <div className="preview-header-line">
                    <span className="preview-label">Subject:</span>
                    <span className="preview-val" style={{ fontWeight: 600 }}>{emailSubject}</span>
                  </div>
                </div>
                <div className="email-preview-body" style={{ overflowY: 'auto' }}>
                  {emailBody}
                </div>
              </>
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
                <Mail size={32} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                <span>
                  Configure the parameters on the left and click <strong>Generate Email</strong> to see the preview.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
