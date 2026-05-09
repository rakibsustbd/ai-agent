'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Users, ArrowRight, MousePointer2, Cpu, Globe, Database, Sparkles } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    if (user) {
      router.push('/dashboard');
      return;
    }
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="landing-grid" style={{ minHeight: '100vh', background: '#02040A', overflowX: 'hidden', overflowY: 'auto' }}>
      
      {/* 1. Navigation */}
      <nav style={{ 
        height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 40px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 100 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', height: '36px', background: '#2563EB', borderRadius: '10px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)'
          }}>
            <Zap size={20} fill="white" />
          </div>
          <span className="serif" style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.03em' }}>AgentCore</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="#agents" className="nav-btn" style={{ fontSize: '14px' }}>Agents</Link>
          <Link href="#pricing" className="nav-btn" style={{ fontSize: '14px' }}>Pricing</Link>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
          
          {user ? (
            <Link 
              href="/dashboard" 
              className="glow-button" 
              style={{ fontSize: '13px', padding: '10px 20px', textDecoration: 'none' }}
            >
              Go to Dashboard
            </Link>
          ) : (
            <button 
              onClick={() => openAuth('login')} 
              className="glow-button" 
              style={{ fontSize: '13px', padding: '10px 20px', cursor: 'pointer', border: 'none' }}
            >
              Launch Console
            </button>
          )}
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 40px', textAlign: 'center', position: 'relative' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', 
            background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', 
            borderRadius: '100px', marginBottom: '40px' 
          }}>
            <Sparkles size={14} color="#3B82F6" />
            <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', color: '#3B82F6', textTransform: 'uppercase' }}>V2.0 Is Now Live</span>
          </div>

          <h1 className="text-gradient" style={{ fontSize: '84px', fontWeight: '800', lineHeight: '0.95', marginBottom: '32px', letterSpacing: '-0.04em' }}>
            Hire Your Next <br /> Virtual Workforce.
          </h1>

          <p style={{ fontSize: '20px', color: '#7D8590', maxWidth: '700px', margin: '0 auto 48px', lineHeight: '1.6', fontWeight: '500' }}>
            Stop managing software. Start managing agents. AgentCore provides SMEs with a specialized, audit-ready virtual workforce for Finance, HR, and Sales.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            {user ? (
              <Link 
                href="/dashboard" 
                className="glow-button" 
                style={{ padding: '16px 40px', fontSize: '16px', textDecoration: 'none' }}
              >
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <button 
                onClick={() => openAuth('signup')} 
                className="glow-button" 
                style={{ padding: '16px 40px', fontSize: '16px', cursor: 'pointer', border: 'none' }}
              >
                Start Building <ArrowRight size={20} />
              </button>
            )}
            <button className="btn-secondary" style={{ padding: '16px 40px', fontSize: '16px', borderRadius: '12px' }}>
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Neural Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '80px', position: 'relative' }}
        >
          <div className="glass" style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
            <div style={{ 
              background: '#05070E', borderRadius: '16px', aspectRatio: '16/9', minHeight: '500px', 
              display: 'flex', flexDirection: 'column', overflow: 'hidden' 
            }}>
               <div style={{ height: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                  <div style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: '700' }}>agent.ahmedrakib.com.bd</div>
               </div>
               <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                  <Cpu size={48} style={{ opacity: 0.1 }} />
                  <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase' }}>Agent Orchestration Console</p>
               </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* 3. Feature Section */}
      <section id="agents" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 40px' }}>
        <div style={{ textAlign: 'left', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Audit-Ready Autonomy</h2>
          <p style={{ color: '#7D8590', maxWidth: '500px' }}>Our agents are pre-trained on industry-standard compliance and operational playbooks.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {[
            { 
              title: 'Finance & Audit', 
              desc: 'Auto-reconcile ledgers and generate VAT-ready reports in real-time.', 
              icon: <Database color="#3B82F6" />,
              color: 'rgba(59, 130, 246, 0.1)'
            },
            { 
              title: 'Sales Pipeline', 
              desc: 'Autonomous agents that identify, qualify, and engage high-intent B2B leads.', 
              icon: <TrendingUp color="#10B981" />,
              color: 'rgba(16, 185, 129, 0.1)'
            },
            { 
              title: 'Onboarding & HR', 
              desc: 'End-to-end lifecycle management, from contract signing to asset procurement.', 
              icon: <Users color="#8B5CF6" />,
              color: 'rgba(139, 92, 246, 0.1)'
            },
          ].map((item, i) => (
            <div key={i} className="glass glass-hover" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: '#7D8590', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Footer */}
      <footer style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <Zap size={18} color="#2563EB" />
          <span style={{ fontSize: '16px', fontWeight: '800' }}>AgentCore</span>
        </div>
        <p style={{ fontSize: '12px', color: '#484F58' }}>© 2026 AgentCore AI Business OS. All rights reserved.</p>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #FFF 0%, #3B82F6 50%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-button {
          background: #2563EB !important;
          color: white !important;
          border-radius: 12px !important;
          font-weight: 700 !important;
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.4) !important;
          transition: all 0.2s ease !important;
          border: none !important;
        }
        .glow-button:hover {
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.6) !important;
          transform: scale(1.02) !important;
        }
        .nav-btn {
          color: #7D8590;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-btn:hover {
          color: white;
        }
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
        }
        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
        }
        .landing-grid {
          background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
        body {
          margin: 0;
          padding: 0;
          background: #02040A;
        }
      `}</style>
    </div>
  );
}
