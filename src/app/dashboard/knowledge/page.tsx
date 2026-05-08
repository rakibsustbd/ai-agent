import React from 'react';
import { FileText, Search, Upload, MoreHorizontal, FileCode, Clock, Database, Globe, ShieldCheck } from 'lucide-react';

export default function KnowledgeBasePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Header Section */}
      <div className="flex-between">
        <div>
          <h1>Knowledge Base</h1>
          <p className="text-sm">Manage source data and cognitive grounding</p>
        </div>
        <div className="flex-items-center" style={{ gap: '12px' }}>
          <div className="flex-items-center" style={{ gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-main)', padding: '6px 12px', borderRadius: '6px', fontSize: '11px' }}>
             <Search size={13} style={{ color: 'var(--text-muted)' }} />
             <input type="text" placeholder="Search repository..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '180px' }} />
          </div>
          <button className="btn-primary flex-items-center" style={{ gap: '8px' }}>
            <Upload size={14} /> Ground New Data
          </button>
        </div>
      </div>

      {/* Main Grounding Grid */}
      <div className="grid-2">
        
        {/* Left: Document List */}
        <div className="stat-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="uppercase-label flex-items-center" style={{ gap: '8px' }}>
              <FileText size={12} className="text-blue-500" /> Grounded Source Documents
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { name: 'Financial_SOP_2026.pdf', cat: 'Finance', size: '1.2MB', date: '2h ago', status: 'Indexed' },
              { name: 'Hiring_Playbook.docx', cat: 'HR', size: '840KB', date: 'Yesterday', status: 'Indexed' },
              { name: 'VAT_Rules_Updated.pdf', cat: 'Tax', size: '3.1MB', date: 'May 1, 2026', status: 'Indexing' },
              { name: 'Compliance_Manual.pdf', cat: 'Legal', size: '2.4MB', date: 'Apr 28, 2026', status: 'Indexed' },
            ].map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: i === 3 ? 'none' : '1px solid var(--border-main)' }} className="hover:bg-white/[0.02] transition-all group">
                <div className="flex-items-center" style={{ gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }} className="group-hover:text-blue-500 transition-colors">
                    <FileCode size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>{doc.name}</p>
                    <p className="uppercase-label" style={{ opacity: 0.5, fontSize: '9px' }}>{doc.cat} • {doc.size}</p>
                  </div>
                </div>
                <div className="flex-items-center" style={{ gap: '40px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p className="uppercase-label" style={{ marginBottom: '4px', opacity: 0.5 }}>Status</p>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: doc.status === 'Indexing' ? '#fbbf24' : '#3b82f6' }}>{doc.status}</span>
                  </div>
                  <button className="btn-secondary" style={{ padding: '6px', border: 'none' }}><MoreHorizontal size={16} style={{ color: 'var(--text-dim)' }} /></button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-main)', background: 'rgba(255,255,255,0.01)' }}>
            <button style={{ width: '100%', padding: '10px', border: '1px dashed var(--border-main)', background: 'transparent', borderRadius: '8px', color: 'var(--text-dim)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', cursor: 'pointer' }}>
              Browse Intelligence Repository
            </button>
          </div>
        </div>

        {/* Right: Data Health & Connectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="stat-card">
            <h3 className="uppercase-label flex-items-center" style={{ gap: '8px', marginBottom: '20px' }}>
              <Database size={12} className="text-blue-500" /> Live Data Streams
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Google Workspace', status: 'Live', desc: 'Auto-harvesting Docs' },
                { name: 'QuickBooks Online', status: 'Live', desc: 'Real-time Ledgers' },
                { name: 'Internal Wiki', status: 'Syncing', desc: 'Knowledge Sync' },
              ].map((conn, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-main)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="flex-items-center" style={{ gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Globe size={12} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: '700' }}>{conn.name}</p>
                      <p style={{ fontSize: '9px', color: 'var(--text-dim)' }}>{conn.desc}</p>
                    </div>
                  </div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: conn.status === 'Live' ? '#3b82f6' : '#fbbf24' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card" style={{ background: 'rgba(37, 99, 235, 0.03)', borderColor: 'rgba(37, 99, 235, 0.2)' }}>
            <h3 className="uppercase-label flex-items-center" style={{ gap: '8px', marginBottom: '16px', color: '#3b82f6' }}>
              <ShieldCheck size={12} /> Neural Alignment
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div>
                  <div className="flex-between" style={{ marginBottom: '8px' }}>
                    <span className="uppercase-label" style={{ fontSize: '9px' }}>Grounding Accuracy</span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#3b82f6' }}>98.2%</span>
                  </div>
                  <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ width: '98.2%', height: '100%', background: '#3b82f6' }} />
                  </div>
               </div>
               <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                 Your workforce is synchronized with <span style={{ color: 'white' }}>48 verified SOPs</span>. Last cognitive validation completed at 16:42 UTC.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
