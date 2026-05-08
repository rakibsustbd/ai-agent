'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080A0F] text-white selection:bg-primary/30">
      
      {/* Navigation */}
      <nav className="h-24 flex items-center justify-between px-10 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(76,110,245,0.4)]">
            <Zap size={18} fill="white" />
          </div>
          <span className="serif text-xl font-bold tracking-tighter">AgentCore</span>
        </Link>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-text-muted">
          <Link href="#agents" className="hover:text-white transition-colors">Agents</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/dashboard" className="glow-button">Launch Console</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-10 pt-20 pb-32">
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 glass rounded-full border-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
          >
            V2.0 is Now Live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl max-w-4xl tracking-tight leading-[0.95]"
          >
            Hire Your Next <span className="text-gradient">Virtual</span> Workforce.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-muted max-w-2xl font-medium leading-relaxed"
          >
            Stop managing software. Start managing agents. AgentCore provides SMEs with a specialized, audit-ready virtual workforce for Finance, HR, and Sales.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6 pt-4"
          >
            <Link href="/dashboard" className="glow-button text-lg px-10 py-4 flex items-center gap-3">
              Start Building <ArrowRight size={20} />
            </Link>
            <button className="px-10 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </motion.div>

          {/* Abstract App Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-6xl mt-20 p-4 glass rounded-[32px] border-white/5 shadow-2xl"
          >
            <div className="bg-[#0F1219] w-full rounded-[20px] aspect-[16/9] overflow-hidden flex items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] to-transparent opacity-60" />
               <div className="w-24 h-24 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
               <p className="text-text-muted text-sm font-mono uppercase tracking-[0.3em]">Agent Orchestration Console</p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Feature Grid */}
      <section id="agents" className="max-w-7xl mx-auto px-10 py-32 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: 'Audit-Ready Finance', desc: 'Auto-reconcile ledgers and generate VAT-ready reports in real-time.', icon: <ShieldCheck className="text-primary" /> },
          { title: 'Sales Pipeline Growth', desc: 'Autonomous agents that identify, qualify, and engage high-intent B2B leads.', icon: <TrendingUp className="text-secondary" /> },
          { title: 'Onboarding & HR', desc: 'End-to-end lifecycle management, from contract signing to asset procurement.', icon: <Users className="text-primary" /> },
        ].map((feat, i) => (
          <div key={i} className="glass p-10 space-y-6 glass-hover">
            <div className="w-12 h-12 bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center">
              {feat.icon}
            </div>
            <h3 className="text-2xl">{feat.title}</h3>
            <p className="text-text-muted font-medium leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 px-10 text-center">
        <p className="text-text-muted text-sm font-medium">© 2026 AgentCore AI Business OS. All rights reserved.</p>
      </footer>
    </div>
  );
}
