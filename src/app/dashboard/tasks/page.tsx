import React from 'react';
import { ClipboardList, Search, Filter, MoreHorizontal, CheckCircle, Clock, RotateCcw, Play, Pause } from 'lucide-react';

export default function TasksPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Header */}
      <div className="flex-between">
        <div>
          <h1>Task Center</h1>
          <p className="text-sm">Global execution monitor for all active agents</p>
        </div>
        <div className="flex-items-center" style={{ gap: '12px' }}>
          <div className="flex-items-center" style={{ gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-main)', padding: '6px 12px', borderRadius: '6px', fontSize: '11px' }}>
             <Search size={13} style={{ color: 'var(--text-muted)' }} />
             <input type="text" placeholder="Filter tasks..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '150px' }} />
          </div>
          <button className="btn-secondary flex-items-center" style={{ gap: '8px' }}>
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* Task List Table */}
      <div className="stat-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-main)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between' }}>
           <h3 className="uppercase-label">Live Execution Stream</h3>
           <div className="flex-items-center" style={{ gap: '16px' }}>
              <span className="uppercase-label" style={{ color: '#3b82f6' }}>4 Running</span>
              <span className="uppercase-label">12 Completed</span>
           </div>
        </div>
        
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-main)' }}>
                <th style={{ padding: '14px 20px' }} className="uppercase-label">Task Name</th>
                <th style={{ padding: '14px 20px' }} className="uppercase-label">Agent</th>
                <th style={{ padding: '14px 20px' }} className="uppercase-label">Status</th>
                <th style={{ padding: '14px 20px' }} className="uppercase-label">Progress</th>
                <th style={{ padding: '14px 20px' }} className="uppercase-label">Duration</th>
                <th style={{ padding: '14px 20px' }} className="uppercase-label"></th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--text-main)', fontSize: '13px' }}>
              {[
                { name: 'Q1 VAT Reconciliation', agent: 'Financial Controller', status: 'Running', progress: 65, time: '14m 20s' },
                { name: 'Monthly Payroll Audit', agent: 'Financial Controller', status: 'Running', progress: 40, time: '08m 12s' },
                { name: 'Employee Contract Generation', agent: 'HR Onboarding', status: 'Completed', progress: 100, time: '02m 45s' },
                { name: 'Lead List Enrichment', agent: 'Growth Engineer', status: 'Paused', progress: 12, time: '01m 05s' },
                { name: 'Risk Assessment: Vendor A', agent: 'Legal Analyst', status: 'Completed', progress: 100, time: '05m 20s' },
              ].map((task, i) => (
                <tr key={i} style={{ borderBottom: i === 4 ? 'none' : '1px solid var(--border-main)' }} className="hover:bg-white/[0.02] transition-all">
                  <td style={{ padding: '16px 20px' }}>
                    <div className="flex-items-center" style={{ gap: '10px' }}>
                       <ClipboardList size={14} className="text-text-dim" />
                       <span style={{ fontWeight: '600' }}>{task.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: '12px' }}>{task.agent}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div className="flex-items-center" style={{ gap: '6px' }}>
                       <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: task.status === 'Running' ? '#3b82f6' : task.status === 'Completed' ? '#10b981' : '#f59e0b' }} />
                       <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>{task.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', width: '200px' }}>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                       <div style={{ width: `${task.progress}%`, height: '100%', background: task.status === 'Completed' ? '#10b981' : '#3b82f6' }} />
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-muted)', fontSize: '12px' }}>{task.time}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div className="flex-items-center" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                       {task.status === 'Running' ? <Pause size={14} className="text-text-dim cursor-pointer hover:text-white" /> : <Play size={14} className="text-text-dim cursor-pointer hover:text-white" />}
                       <RotateCcw size={14} className="text-text-dim cursor-pointer hover:text-white" />
                       <MoreHorizontal size={14} className="text-text-dim cursor-pointer hover:text-white" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
