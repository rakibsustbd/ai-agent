'use client';

import React, { useState } from 'react';
import { Search, Check, RefreshCcw, Link2, Globe, Lock, Loader2 } from 'lucide-react';

const initialApps = [
  { name: 'QuickBooks', cat: 'Accounting', status: 'Connected', desc: 'Sync ledger & VAT data' },
  { name: 'Slack', cat: 'Communication', status: 'Connected', desc: 'Agent notifications' },
  { name: 'Google Drive', cat: 'Productivity', status: 'Connected', desc: 'Document harvesting' },
  { name: 'Gmail', cat: 'Communication', status: 'Not Connected', desc: 'Email monitoring & drafting' },
  { name: 'Google Calendar', cat: 'Productivity', status: 'Not Connected', desc: 'Sync events & availability' },
  { name: 'Microsoft Outlook', cat: 'Productivity', status: 'Not Connected', desc: 'Sync corporate email' },
  { name: 'Xero', cat: 'Accounting', status: 'Not Connected', desc: 'Financial data sync' },
  { name: 'Microsoft Teams', cat: 'Communication', status: 'Not Connected', desc: 'Team collaboration' },
  { name: 'Dropbox', cat: 'Productivity', status: 'Not Connected', desc: 'Cloud file storage' },
  { name: 'Stripe', cat: 'Payments', status: 'Not Connected', desc: 'Transaction monitoring' },
  { name: 'Intercom', cat: 'CRM', status: 'Not Connected', desc: 'Customer intelligence' },
];

export default function IntegrationsPage() {
  const [apps, setApps] = useState(initialApps);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (appName: string) => {
    setConnecting(appName);
    setTimeout(() => {
      setApps(prev => prev.map(app => 
        app.name === appName ? { ...app, status: 'Connected' } : app
      ));
      setConnecting(null);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Header Section */}
      <div className="flex-between">
        <div>
          <h1>Integrations</h1>
          <p className="text-sm">Connect your business tools to AgentCore</p>
        </div>
        <div className="flex-items-center" style={{ gap: '12px' }}>
          <div className="flex-items-center" style={{ gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-main)', padding: '6px 12px', borderRadius: '6px', fontSize: '11px' }}>
             <Search size={13} style={{ color: 'var(--text-muted)' }} />
             <input type="text" placeholder="Search apps..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '180px' }} />
          </div>
          <button className="btn-secondary flex-items-center" style={{ gap: '8px' }}>
            <RefreshCcw size={14} /> Refresh Connections
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-items-center" style={{ gap: '8px' }}>
        {['All', 'Accounting', 'Communication', 'Productivity', 'Security'].map((cat, i) => (
          <button key={i} style={{ padding: '6px 14px', fontSize: '11px', fontWeight: '700', borderRadius: '6px', border: i === 0 ? '1px solid #2563EB' : '1px solid var(--border-main)', background: i === 0 ? 'rgba(37, 99, 235, 0.1)' : 'transparent', color: i === 0 ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {apps.map((app, i) => (
          <div key={i} className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            <div className="flex-between">
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={16} className="text-text-dim" />
              </div>
              {app.status === 'Connected' ? (
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Check size={10} color="white" />
                </div>
              ) : (
                <Link2 size={16} className="text-text-dim" />
              )}
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{app.name}</h3>
              <p className="uppercase-label" style={{ fontSize: '8px', opacity: 0.5 }}>{app.cat}</p>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{app.desc}</p>
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-main)' }}>
               <button 
                 onClick={() => app.status !== 'Connected' && handleConnect(app.name)}
                 className={app.status === 'Connected' ? 'btn-secondary' : 'btn-primary'} 
                 style={{ width: '100%', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', height: '32px' }}
               >
                 {connecting === app.name ? <Loader2 size={14} className="animate-spin" /> : (app.status === 'Connected' ? 'Configure' : 'Connect')}
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Banner */}
      <div className="stat-card" style={{ background: 'rgba(255,255,255,0.01)', borderStyle: 'dashed' }}>
         <div className="flex-items-center" style={{ gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Lock size={18} className="text-text-dim" />
            </div>
            <div>
               <h3 style={{ fontSize: '13px', fontWeight: '600' }}>Enterprise-Grade Security</h3>
               <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>All connections are encrypted with AES-256 and follow strict SOC2 compliance standards.</p>
            </div>
         </div>
      </div>

    </div>
  );
}

