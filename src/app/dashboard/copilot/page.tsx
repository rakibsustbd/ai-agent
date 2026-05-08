'use client';

import React from 'react';
import { Command, Send, Sparkles, Brain, History, Search, Zap, Shield, TrendingUp, Paperclip, Image as ImageIcon, FileText } from 'lucide-react';

export default function CopilotPage() {
  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
      
      {/* Main Chat Workspace */}
      <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'rgba(2, 4, 10, 0.4)' }}>
        
        {/* Chat Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-main)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div className="flex-items-center" style={{ gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: '#2563EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Sparkles size={18} color="white" />
              </div>
              <div>
                 <h2 style={{ fontSize: '16px', fontWeight: '700' }}>Platform Intelligence</h2>
                 <p className="uppercase-label" style={{ fontSize: '9px', opacity: 0.5 }}>Connected to all 14 agents</p>
              </div>
           </div>
           <div className="flex-items-center" style={{ gap: '16px' }}>
              <button className="btn-secondary" style={{ fontSize: '11px' }}>Export Session</button>
              <History size={18} className="text-text-dim cursor-pointer" />
           </div>
        </div>

        {/* Message Area */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ display: 'flex', gap: '16px', maxWidth: '80%' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', flexShrink: 0 }}>
                 <Brain size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-main)', borderRadius: '16px', borderTopLeftRadius: '4px', fontSize: '14px', lineHeight: '1.6' }}>
                    Hello Ahmed. I have access to all 14 agents across 5 departments. You can now upload documents (PDF, Image, Docs) for cross-departmental analysis.
                 </div>
              </div>
           </div>
        </div>

        {/* Input Area with Attachments */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-main)', background: 'rgba(2, 4, 10, 0.6)' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-main)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <textarea 
                placeholder="Ask anything or attach a document..." 
                style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', outline: 'none', resize: 'none', minHeight: '44px' }}
                rows={2}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="flex-items-center" style={{ gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '11px' }}>
                       <Paperclip size={16} /> Attach
                    </button>
                    <button className="flex-items-center" style={{ gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '11px' }}>
                       <ImageIcon size={16} /> Image
                    </button>
                    <button className="flex-items-center" style={{ gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '11px' }}>
                       <FileText size={16} /> PDF
                    </button>
                 </div>
                 <button style={{ background: '#2563EB', border: 'none', borderRadius: '8px', padding: '10px 18px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '13px' }}>
                    Send <Send size={14} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Side Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
         <div className="stat-card">
            <h3 className="uppercase-label" style={{ marginBottom: '16px' }}>Platform Grounding</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {['QuickBooks Online', 'Xero Accounting', 'Greenhouse HR', 'LinkedIn B2B'].map(src => (
                 <div key={src} className="flex-between">
                    <span style={{ fontSize: '12px' }}>{src}</span>
                    <span style={{ fontSize: '9px', fontWeight: '700', color: '#10b981' }}>LIVE</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
}
