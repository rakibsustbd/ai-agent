'use client';

import React, { useState } from 'react';
import { 
  Bell, Search, Filter, Mail, CheckCircle2, AlertCircle, 
  Clock, ArrowRight, User, Package, Calculator, ShieldCheck,
  Palette, TrendingUp, Zap, ChevronRight, MoreHorizontal
} from 'lucide-react';

const mockNotifications = [
  { 
    id: 1, 
    agent: 'Financial Controller', 
    agentId: 'financial-controller',
    type: 'Report', 
    title: 'Q2 Revenue Leak Detected', 
    desc: 'Unusual variance in OPEX vs historical average for April 2026.', 
    time: '12m ago', 
    priority: 'High',
    icon: <Calculator size={16} />,
    color: '#3b82f6'
  },
  { 
    id: 2, 
    agent: 'Creative Director', 
    agentId: 'creative-director',
    type: 'Action', 
    title: 'Social Assets Ready', 
    desc: 'Campaign package for "Summer Sale" has been drafted and requires review.', 
    time: '45m ago', 
    priority: 'Medium',
    icon: <Palette size={16} />,
    color: '#8b5cf6'
  },
  { 
    id: 3, 
    agent: 'Inventory Optimizer', 
    agentId: 'inventory-optimizer',
    type: 'Alert', 
    title: 'Stockout Predicted', 
    desc: 'SKU_992 (Blue Widget) predicted to run out in 3 days. PO drafted.', 
    time: '2h ago', 
    priority: 'Critical',
    icon: <Package size={16} />,
    color: '#10b981'
  },
  { 
    id: 4, 
    agent: 'HR Screening', 
    agentId: 'hr-screening',
    type: 'Update', 
    title: 'New Top-Tier Candidate', 
    desc: 'Senior Logistics Manager application matches 92% of JD criteria.', 
    time: '5h ago', 
    priority: 'Low',
    icon: <User size={16} />,
    color: '#f59e0b'
  },
  { 
    id: 5, 
    agent: 'Financial Sentry', 
    agentId: 'financial-sentry',
    type: 'Alert', 
    title: 'Policy Violation Flagged', 
    desc: 'Invoice #INV-442 exceeds single-payment limit policy ($500).', 
    time: '1d ago', 
    priority: 'High',
    icon: <ShieldCheck size={16} />,
    color: '#3b82f6'
  },
];

export default function InboxPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Reports', 'Action Items', 'Alerts'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div className="flex-between">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Central Intelligence Inbox</h1>
          <p className="text-sm" style={{ opacity: 0.6 }}>Consolidated reports and real-time alerts from your virtual workforce</p>
        </div>
        <div className="flex-items-center" style={{ gap: '12px' }}>
           <button className="btn-secondary flex-items-center" style={{ gap: '8px' }}>
              <CheckCircle2 size={16} /> Mark all as read
           </button>
           <button className="btn-primary">Clear Archive</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
              background: activeFilter === f ? 'rgba(37, 99, 235, 0.1)' : 'rgba(255,255,255,0.03)',
              color: activeFilter === f ? '#3b82f6' : 'var(--text-dim)',
              cursor: 'pointer', transition: 'all 0.2s',
              border: activeFilter === f ? '1px solid #3b82f6' : '1px solid var(--border-main)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="stat-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-main)', display: 'flex', gap: '16px', alignItems: 'center' }}>
           <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
              <input 
                placeholder="Search inbox..." 
                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-main)', borderRadius: '8px', padding: '10px 12px 10px 36px', fontSize: '13px', outline: 'none' }} 
              />
           </div>
           <button className="btn-secondary flex-items-center" style={{ gap: '8px', fontSize: '12px' }}>
              <Filter size={14} /> Sort by Time
           </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
           {mockNotifications.map((notif, i) => (
             <div key={notif.id} className="inbox-row" style={{ 
               padding: '24px', 
               borderBottom: i === mockNotifications.length - 1 ? 'none' : '1px solid var(--border-main)',
               display: 'grid',
               gridTemplateColumns: '48px 1fr 120px 40px',
               alignItems: 'start',
               gap: '24px',
               cursor: 'pointer',
               transition: 'background 0.2s'
             }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: `${notif.color}15`, border: `1px solid ${notif.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: notif.color
                }}>
                   {notif.icon}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="uppercase-label" style={{ fontSize: '9px', fontWeight: '800', color: notif.color }}>{notif.agent} • {notif.type}</span>
                      {notif.priority === 'Critical' && <div style={{ padding: '2px 6px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '8px', fontWeight: '800', borderRadius: '4px' }}>CRITICAL</div>}
                   </div>
                   <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{notif.title}</h3>
                   <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: '1.5' }}>{notif.desc}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                   <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '8px' }}>{notif.time}</p>
                   <button style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-main)', borderRadius: '6px', fontSize: '11px', color: 'white', cursor: 'pointer' }}>Action</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <MoreHorizontal size={18} style={{ color: 'var(--text-dim)' }} />
                </div>
             </div>
           ))}
        </div>
      </div>

      <style jsx>{`
        .inbox-row:hover {
          background: rgba(255,255,255,0.02);
        }
      `}</style>

    </div>
  );
}
