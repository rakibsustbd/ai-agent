import React from 'react';
import { Download, Calendar, Activity, CheckCircle, XCircle, Clock, Zap, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Title Section */}
      <div className="flex-between">
        <div>
          <h1>Analytics</h1>
          <p className="text-sm">Agent performance metrics and trends</p>
        </div>
        <div className="flex-items-center" style={{ gap: '8px' }}>
          <div className="flex-items-center" style={{ gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-main)', padding: '6px 12px', borderRadius: '6px', fontSize: '11px' }}>
             <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
             <span>April 4th, 2026 - May 4th, 2026</span>
          </div>
          <div className="flex-items-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-main)', padding: '4px', borderRadius: '6px', gap: '4px' }}>
            {['Last 3 months', 'Last 30 days', 'Last 7 days'].map((t, i) => (
              <button key={i} style={{ padding: '4px 10px', fontSize: '10px', fontWeight: '700', borderRadius: '4px', border: 'none', cursor: 'pointer', background: t === 'Last 30 days' ? '#1E293B' : 'transparent', color: t === 'Last 30 days' ? 'white' : 'var(--text-muted)' }}>
                {t}
              </button>
            ))}
          </div>
          <button className="btn-secondary" style={{ padding: '8px' }}><Download size={13} /></button>
        </div>
      </div>

      {/* Top 5 Stats Grid - High Density */}
      <div className="grid-5">
        {[
          { label: 'Tasks completed', val: '142', trend: '+12%', icon: <CheckCircle className="text-emerald-500" /> },
          { label: 'Tasks failed', val: '0', trend: '0%', icon: <XCircle className="text-text-dim" /> },
          { label: 'Tasks approval rate', val: '98%', trend: 'Stable', icon: <Activity className="text-blue-500" /> },
          { label: 'Avg. runtime duration', val: '12m', trend: '-2m', icon: <Clock className="text-text-dim" /> },
          { label: 'Total runtime duration', val: '28h', trend: '+4h', icon: <Zap className="text-amber-500" /> },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex-items-center" style={{ gap: '8px', opacity: 0.6 }}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 12 })}
              <p className="uppercase-label">{stat.label}</p>
            </div>
            <p className="stat-value">{stat.val}</p>
            <p className="stat-trend" style={{ color: stat.trend.startsWith('+') ? '#10b981' : 'var(--text-muted)' }}>
              {stat.trend} <span style={{ fontSize: '9px', opacity: 0.5 }}>prior period</span>
            </p>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid-2">
        <div className="stat-card" style={{ minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-between" style={{ marginBottom: '32px' }}>
            <h3 className="uppercase-label flex-items-center" style={{ gap: '8px' }}><CheckCircle size={12} /> Completion rate</h3>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             <svg style={{ width: '160px', height: '160px', transform: 'rotate(-90deg)' }}>
               <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
               <circle cx="80" cy="80" r="70" stroke="#2563EB" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset="44" strokeLinecap="round" />
             </svg>
             <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '28px', fontWeight: '700' }}>98%</span>
             </div>
          </div>
        </div>

        <div className="stat-card" style={{ minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-between" style={{ marginBottom: '32px' }}>
            <h3 className="uppercase-label flex-items-center" style={{ gap: '8px' }}><Activity size={12} /> Feedback score</h3>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>0%</div>
             <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '24px' }}>Positive feedback</p>
             <div className="flex-items-center" style={{ gap: '16px' }}>
                <div className="flex-items-center" style={{ gap: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}><span style={{ fontSize: '16px' }}>👍</span> 0</div>
                <div className="flex-items-center" style={{ gap: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}><span style={{ fontSize: '16px' }}>👎</span> 0</div>
             </div>
          </div>
        </div>
      </div>

      {/* Workforce Table */}
      <div className="stat-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <h3 className="uppercase-label">Active Agent Workforce</h3>
           <button style={{ fontSize: '10px', fontWeight: '700', color: '#2563EB', background: 'transparent', border: 'none', cursor: 'pointer' }}>Execution history</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
           {[
             { name: 'Financial Controller', status: 'Running', time: 'Started 12m ago' },
             { name: 'HR Onboarding Agent', status: 'Standby', time: 'Last active 2h ago' },
             { name: 'VAT Compliance Agent', status: 'Complete', time: 'Finished 4h ago' },
           ].map((agent, i) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: i === 2 ? 'none' : '1px solid var(--border-main)' }}>
                <div className="flex-items-center" style={{ gap: '12px' }}>
                   <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                      <Zap size={14} />
                   </div>
                   <div>
                      <p style={{ fontSize: '13px', fontWeight: '600' }}>{agent.name}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{agent.time}</p>
                   </div>
                </div>
                <div className="flex-items-center" style={{ gap: '40px' }}>
                   <div style={{ textAlign: 'right' }}>
                      <p className="uppercase-label" style={{ marginBottom: '4px', opacity: 0.5 }}>Status</p>
                      <div className="flex-items-center" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                         <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: agent.status === 'Running' ? '#3b82f6' : 'var(--text-dim)' }} />
                         <span style={{ fontSize: '12px', fontWeight: '500' }}>{agent.status}</span>
                      </div>
                   </div>
                   <button className="btn-secondary" style={{ padding: '6px' }}><ArrowUpRight size={14} style={{ color: 'var(--text-dim)' }} /></button>
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
}
