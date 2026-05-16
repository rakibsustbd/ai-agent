'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, ArrowRight, Code, Globe, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setSuccess('Check your email for the confirmation link!');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/reset-password`,
        });
        if (error) throw error;
        setSuccess('Password reset link sent to your email!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined,
          scopes: provider === 'google' 
            ? 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/spreadsheets email profile openid' 
            : undefined,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ 
          position: 'fixed', inset: 0, zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          padding: '24px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' 
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass"
            style={{ 
              width: '100%', maxWidth: '440px', padding: '40px', 
              position: 'relative', border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: '#7D8590', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ 
                width: '48px', height: '48px', background: '#2563EB', borderRadius: '12px', 
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                marginBottom: '20px', boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)'
              }}>
                <Zap size={24} fill="white" />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p style={{ fontSize: '14px', color: '#7D8590' }}>
                {mode === 'login' ? 'Enter your credentials to access the console' : 
                 mode === 'signup' ? 'Start building your virtual workforce today' : 
                 'We will send you a secure link to reset your password'}
              </p>
            </div>

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#484F58', marginBottom: '8px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#484F58' }} />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    style={{ 
                      width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', 
                      borderRadius: '12px', padding: '14px 14px 14px 44px', color: 'white', outline: 'none' 
                    }}
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#484F58' }}>Password</label>
                    {mode === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => setMode('forgot')}
                        style={{ background: 'transparent', border: 'none', color: '#3B82F6', fontSize: '11px', cursor: 'pointer', fontWeight: '600' }}
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#484F58' }} />
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ 
                        width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', 
                        borderRadius: '12px', padding: '14px 14px 14px 44px', color: 'white', outline: 'none' 
                      }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '13px', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '13px', textAlign: 'center' }}>
                  {success}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="glow-button" 
                style={{ padding: '14px', width: '100%', justifyContent: 'center' }}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : (
                  <>
                    {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {mode !== 'forgot' && (
              <>
                <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                  <span style={{ fontSize: '12px', color: '#484F58', fontWeight: '600' }}>OR CONTINUE WITH</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button 
                    type="button"
                    onClick={() => handleOAuth('github')}
                    className="btn-secondary" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <Code size={16} /> GitHub
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleOAuth('google')}
                    className="btn-secondary" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <Globe size={16} /> Google
                  </button>
                </div>
              </>
            )}

            <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#7D8590' }}>
              {mode === 'login' ? "Don't have an account?" : mode === 'signup' ? "Already have an account?" : "Remembered your password?"} {' '}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                style={{ background: 'transparent', border: 'none', color: '#3B82F6', fontWeight: '700', cursor: 'pointer' }}
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
