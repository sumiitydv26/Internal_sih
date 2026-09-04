import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function AdminLoginGate() {
  const { loginAdmin, navigateTo } = useApp();
  const [adminId, setAdminId] = useState('admin@annapurna.gov.in');
  const [passkey, setPasskey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      const success = loginAdmin(passkey);
      if (!success) {
        setErrorMsg('Access Denied: Invalid administrator security key. Please check your credentials.');
        setIsVerifying(false);
      }
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setPasskey('admin2026');
    setErrorMsg('');
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/30 flex flex-col relative overflow-hidden animate-fadeIn">
        {/* Top Decorative Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"></div>

        {/* Security Shield Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary-container/30 border border-primary/30 text-primary flex items-center justify-center mb-3 shadow-inner">
            <Icon name="admin_panel_settings" className="w-7 h-7 text-primary" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Icon name="lock" className="w-3.5 h-3.5 text-primary" />
            <span>Restricted Gateway</span>
          </div>
          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">Admin Authentication</h1>
          <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
            Enter your administrative master passkey to access network-wide telemetry, audits, and corridor controls.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-error-container/40 border border-error/30 text-error flex items-start gap-2.5 text-xs animate-shake">
            <Icon name="gpp_bad" className="w-4 h-4 text-error shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
              Administrator ID / Service Email
            </label>
            <div className="relative flex items-center">
              <Icon name="person" className="w-4 h-4 text-on-surface-variant absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                className="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="admin@annapurna.gov.in"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-on-surface-variant">
                Master Security Key
              </label>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] text-secondary hover:text-primary font-bold hover:underline cursor-pointer"
                title="Auto-fill default passkey for testing"
              >
                Auto-fill: <code className="font-mono bg-surface-container px-1 py-0.5 rounded">admin2026</code>
              </button>
            </div>
            <div className="relative flex items-center">
              <Icon name="lock" className="w-4 h-4 text-on-surface-variant absolute left-3 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={passkey}
                onChange={(e) => { setPasskey(e.target.value); setErrorMsg(''); }}
                required
                placeholder="Enter security key..."
                className="w-full bg-surface-container-low pl-9 pr-10 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-on-surface-variant hover:text-on-surface text-[11px] font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm active:scale-[0.99] disabled:opacity-75"
          >
            {isVerifying ? (
              <>
                <Icon name="refresh" className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <Icon name="verified_user" className="w-4 h-4 text-white" />
                <span>Verify & Unlock Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Return to Public Site */}
        <div className="mt-6 pt-4 border-t border-surface-variant/40 flex items-center justify-between text-xs">
          <button
            onClick={() => navigateTo('landing')}
            className="text-on-surface-variant hover:text-primary font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Icon name="arrow_forward" className="w-3.5 h-3.5 rotate-180" />
            <span>Return to Public Site</span>
          </button>
          <span className="text-[10px] text-on-surface-variant font-mono">
            SSL 256-Bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
