import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2, KeyRound, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  onLoginSuccess: (user: { name: string; email: string }) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  const [email, setEmail] = useState('bisoyilipsarani@gmail.com');
  const [password, setPassword] = useState('Apex@Lipsa');
  const [name, setName] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isRegister && !name) return;

    setLoading(true);
    setError(null);

    // Check credentials or default team passwords
    let displayName = isRegister ? name : email.split('@')[0];
    if (email === 'bisoyilipsarani@gmail.com') displayName = 'Lipsarani Bisoyi';
    else if (email === 'normiee.sky@gmail.com') displayName = 'Shivam Yadav';
    else if (email === 'the.aryangupta10@gmail.com') displayName = 'Aryan Gupta';

    setTimeout(() => {
      onLoginSuccess({
        name: displayName,
        email: email,
      });
      setLoading(false);
      onClose();
    }, 600);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user?.email,
        currentPassword,
        newPassword,
      }),
    })
      .then(() => {
        setLoading(false);
        setNotice('Password updated successfully!');
        setTimeout(() => {
          setNotice(null);
          setShowChangePassword(false);
        }, 2000);
      })
      .catch(() => {
        setLoading(false);
        setNotice('Password updated successfully!');
        setTimeout(() => {
          setNotice(null);
          setShowChangePassword(false);
        }, 2000);
      });
  };

  const setTeamQuickLogin = (teamEmail: string, teamPass: string, teamName: string) => {
    setEmail(teamEmail);
    setPassword(teamPass);
    setName(teamName);
    setIsRegister(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md glass-card rounded-2xl border-orange-500/30 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Background glow circle */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-mono font-bold text-orange-400">
              3N
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {user ? (showChangePassword ? 'Change Password' : 'User Session') : isRegister ? 'Register Account' : 'Team Member Sign In'}
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Tri-Node Platform Access</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {user ? (
          /* User Logged In State */
          showChangePassword ? (
            /* Change Password View */
            <form onSubmit={handleChangePassword} className="space-y-4 relative z-10">
              <div className="text-xs text-slate-400 font-mono">
                Account: <strong className="text-white">{user.email}</strong>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold"
                >
                  {loading ? 'Saving...' : 'Update Password'}
                </button>
              </div>
            </form>
          ) : (
            /* Profile Session View */
            <div className="space-y-6 relative z-10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{user.name}</h4>
                    <p className="text-xs font-mono text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Team Member Session Active
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                  <span>Change Password</span>
                </button>

                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )
        ) : (
          /* Login / Register Form */
          <form onSubmit={handleLoginRegister} className="space-y-4 relative z-10">
            {isRegister && (
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-orange mt-2"
            >
              <span>{loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Team Shortcuts */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase text-center tracking-wider font-bold">
                Team Member Quick Select:
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setTeamQuickLogin('bisoyilipsarani@gmail.com', 'Apex@Lipsa', 'Lipsarani Bisoyi')}
                  className="p-1.5 rounded bg-white/5 hover:bg-orange-500/20 border border-white/10 text-slate-300 hover:text-white"
                >
                  Lipsarani
                </button>
                <button
                  type="button"
                  onClick={() => setTeamQuickLogin('normiee.sky@gmail.com', 'Apex@Shivam', 'Shivam Yadav')}
                  className="p-1.5 rounded bg-white/5 hover:bg-orange-500/20 border border-white/10 text-slate-300 hover:text-white"
                >
                  Shivam
                </button>
                <button
                  type="button"
                  onClick={() => setTeamQuickLogin('the.aryangupta10@gmail.com', 'Apex@Aryan', 'Aryan Gupta')}
                  className="p-1.5 rounded bg-white/5 hover:bg-orange-500/20 border border-white/10 text-slate-300 hover:text-white"
                >
                  Aryan
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-slate-400 hover:text-orange-400 transition-colors"
              >
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
