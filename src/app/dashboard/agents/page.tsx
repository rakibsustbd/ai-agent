'use client';

import React from 'react';
import { 
  Users, Search, Plus, Zap, Activity, Shield, Clock, ArrowUpRight, Cpu, 
  TrendingUp, MapPin, Share2, Palette, DollarSign, Calendar, Calculator, 
  ShieldCheck, UserPlus, UserSearch, Package, FileText, Gavel, ChevronRight,
  Database, Briefcase, Globe, Heart
} from 'lucide-react';
import Link from 'next/link';

export default function AgentsPage() {
  const departments = [
    {
      name: 'Finance & Audit',
      icon: <Calculator size={18} />,
      color: '#3b82f6',
      agents: [
        { name: 'Financial Controller', role: 'Strategic Finance', id: 'financial-controller', icon: <Calculator size={16} /> },
        { name: 'Financial Sentry', role: 'Cash Leak Auditor', id: 'financial-sentry', icon: <ShieldCheck size={16} /> },
        { name: 'Debt Recovery', role: 'AR Automation', id: 'debt-recovery', icon: <DollarSign size={16} /> },
        { name: 'Tax Compliance', role: 'Regulatory Audit', id: 'tax-compliance', icon: <FileText size={16} /> },
      ]
    },
    {
      name: 'Operations & Supply',
      icon: <Package size={18} />,
      color: '#10b981',
      agents: [
        { name: 'Executive Assistant', role: 'Ops & Scheduling', id: 'executive-assistant', icon: <Calendar size={16} /> },
        { name: 'Inventory Optimizer', role: 'Supply Chain', id: 'inventory-optimizer', icon: <Package size={16} /> },
        { name: 'Retail Planner', role: 'Site Selection', id: 'retail-planner', icon: <MapPin size={16} /> },
      ]
    },
    {
      name: 'People Ops',
      icon: <UserPlus size={18} />,
      color: '#8b5cf6',
      agents: [
        { name: 'HR Lifecycle', role: 'Employee Success', id: 'hr-lifecycle', icon: <UserPlus size={16} /> },
        { name: 'HR Screening', role: 'Talent Acquisition', id: 'hr-screening', icon: <UserSearch size={16} /> },
      ]
    },
    {
      name: 'Growth & Strategy',
      icon: <Zap size={18} />,
      color: '#f59e0b',
      agents: [
        { name: 'Business Strategist', role: 'Expansion & Growth', id: 'business-strategist', icon: <TrendingUp size={16} /> },
        { name: 'Sales Growth', role: 'Revenue Generation', id: 'sales-growth', icon: <Zap size={16} /> },
        { name: 'Network Intelligence', role: 'Referral Mapping', id: 'network-intelligence', icon: <Share2 size={16} /> },
        { name: 'Creative Director', role: 'Brand & Content', id: 'creative-director', icon: <Palette size={16} /> },
      ]
    },
    {
      name: 'Legal & Risk',
      icon: <Gavel size={18} />,
      color: '#ef4444',
      agents: [
        { name: 'Legal Analyst', role: 'Contract Risk', id: 'legal-analyst', icon: <Gavel size={16} /> },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div className="flex-between">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Virtual Workforce</h1>
          <p className="text-sm" style={{ opacity: 0.6 }}>Manage 14 specialized agents across 5 departments</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> New Agent
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {departments.map((dept, i) => (
          <div key={i} className="stat-card" style={{ padding: '0', overflow: 'hidden' }}>
            
            {/* Dept Header */}
            <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <div className="flex-items-center" style={{ gap: '12px' }}>
                  <div style={{ color: dept.color }}>{dept.icon}</div>
                  <h2 style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.02em' }}>{dept.name}</h2>
               </div>
               <span className="uppercase-label" style={{ fontSize: '9px', opacity: 0.5 }}>{dept.agents.length} Agents Active</span>
            </div>

            {/* Agents List (Tree Format) */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               {dept.agents.map((agent, j) => (
                 <Link 
                   key={j} 
                   href={`/dashboard/agents/${agent.id}`}
                   style={{ textDecoration: 'none', display: 'block' }}
                 >
                   <div className="agent-row" style={{ 
                     display: 'flex', alignItems: 'center', padding: '12px 24px', 
                     borderBottom: j === dept.agents.length - 1 ? 'none' : '1px solid var(--border-main)',
                     transition: 'background 0.2s ease',
                     cursor: 'pointer'
                   }}>
                      <div className="flex-items-center" style={{ gap: '16px', flex: 1 }}>
                         <div style={{ color: 'var(--text-dim)' }}>{agent.icon}</div>
                         <div>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{agent.name}</p>
                            <p className="uppercase-label" style={{ fontSize: '9px', opacity: 0.4 }}>{agent.role}</p>
                         </div>
                      </div>
                      
                      <div className="flex-items-center" style={{ gap: '32px' }}>
                         <div className="flex-items-center" style={{ gap: '8px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }} />
                            <span className="uppercase-label" style={{ fontSize: '9px' }}>Online</span>
                         </div>
                         <div className="flex-items-center" style={{ gap: '8px', color: 'var(--text-dim)' }}>
                            <Database size={12} />
                            <span style={{ fontSize: '11px' }}>Linked</span>
                         </div>
                         <ChevronRight size={14} style={{ color: 'var(--text-dim)' }} />
                      </div>
                   </div>
                 </Link>
               ))}
            </div>

          </div>
        ))}
      </div>

      <style jsx>{`
        .agent-row:hover {
          background: rgba(255,255,255,0.03);
        }
      `}</style>

    </div>
  );
}
