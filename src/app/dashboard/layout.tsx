'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, BookOpen, Layers, Bell, Search, 
  Settings, HelpCircle, Command, Plus, ClipboardList, Sparkles,
  Paperclip, Image as ImageIcon, FileText, X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="app-container">
      
      {/* 1. FIXED SIDEBAR */}
      <aside className="fixed-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', marginBottom: '32px' }}>
          <div style={{ width: '32px', height: '32px', background: '#2563EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
            <Command size={18} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.03em', color: 'white' }}>AgentCore</span>
        </div>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p className="uppercase-label" style={{ padding: '0 12px', marginBottom: '8px', opacity: 0.4, fontSize: '9px' }}>Main Menu</p>
          {[
            { label: 'Analytics', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
            { label: 'Copilot', href: '/dashboard/copilot', icon: <Sparkles size={18} /> },
            { label: 'Tasks', href: '/dashboard/tasks', icon: <ClipboardList size={18} /> },
            { label: 'Inbox', href: '/dashboard/inbox', icon: <Bell size={18} /> },
            { label: 'Agents', href: '/dashboard/agents', icon: <Users size={18} /> },
            { label: 'Knowledge', href: '/dashboard/knowledge', icon: <BookOpen size={18} /> },
            { label: 'Integrations', href: '/dashboard/integrations', icon: <Layers size={18} /> },
          ].map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={i} 
                href={item.href} 
                className={`nav-btn ${isActive ? 'active' : ''}`}
                style={{
                   display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px',
                   color: isActive ? '#3b82f6' : 'var(--text-muted)',
                   background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                   textDecoration: 'none', fontSize: '13px', fontWeight: '500'
                }}
              >
                {React.cloneElement(item.icon as React.ReactElement, { size: 18, strokeWidth: isActive ? 2.5 : 2 })}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-main)', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link href="#" className="nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px' }}>
            <Settings size={18} /> <span>Settings</span>
          </Link>
          <Link href="#" className="nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px' }}>
            <HelpCircle size={18} /> <span>Help Center</span>
          </Link>
          
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid var(--border-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#3b82f6' }}>
              AR
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'white', margin: 0 }}>Ahmed Rakib</p>
              <p className="uppercase-label" style={{ fontSize: '9px', opacity: 0.5, margin: 0 }}>Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. WORKSPACE */}
      <main className="workspace">
        <header className="header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-main)', padding: '8px 16px', borderRadius: '8px', width: '400px' }}>
            <Search size={16} style={{ color: 'var(--text-dim)' }} />
            <input type="text" placeholder="Search for agents, tasks or docs..." style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '13px', outline: 'none', width: '100%' }} />
            <div style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-main)', borderRadius: '4px', fontSize: '10px', color: 'var(--text-dim)', fontWeight: '700' }}>⌘K</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px' }}><Bell size={20} /></button>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-main)' }} />
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', background: '#2563EB', color: 'white', border: 'none', fontWeight: '600', fontSize: '13px' }}>
              <Plus size={18} /> <span>Create Task</span>
            </button>
          </div>
        </header>
        
        <div className="content-area">
          {children}
        </div>
      </main>

    </div>
  );
}
