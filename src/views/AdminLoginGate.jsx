import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REGIONAL_ACCOUNTS } from '../data/regionalData';
import Icon from '../components/Icon';

export default function AdminLoginGate() {
  const { loginAdmin, navigateTo } = useApp();
  const [selectedProfile, setSelectedProfile] = useState('super_admin');
  const [adminId, setAdminId] = useState('admin@annapurna.gov.in');
  const [passkey, setPasskey] = useState('admin2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      const result = loginAdmin(adminId, passkey);
      if (!result.success) {
        setErrorMsg(result.message || 'Access Denied: Invalid credentials.');
        setIsVerifying(false);
      }
    }, 400);
  };

  const handleSelectAccount = (acc) => {
    setSelectedProfile(acc.id);
    setAdminId(acc.email);
    setPasskey(acc.passkey);
    setErrorMsg('');
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-12 overflow-hidden">
      {/* Background Video of Farmer Sowing Seeds in Field */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.78] contrast-[1.05]"
        >
          <source src="./videos/farmer_sowing_seeds.mp4" type="video/mp4" />
          <source src="./videos/farmer_field_work.mp4" type="video/mp4" />
          <source src="./videos/tractor_field.webm" type="video/webm" />
        </video>
        {/* Soft Vignette & Agricultural Dark Tint Overlay for Optimal Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-primary/50 to-black/75 backdrop-blur-[1px]"></div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
        <span>Empowering Indian Farmers & Precision Agriculture</span>
      </div>

      {/* Login Card on top of video */}
      <div className="relative z-10 w-full max-w-lg bg-surface/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/30 flex flex-col overflow-hidden animate-fadeIn">
        {/* Top Decorative Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"></div>

        {/* Security Shield Icon */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-primary-container/30 border border-primary/30 text-primary flex items-center justify-center mb-3 shadow-inner">
            <Icon name="admin_panel_settings" className="w-7 h-7 text-primary" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Icon name="lock" className="w-3.5 h-3.5 text-primary" />
            <span>Multi-Tier Regional & Admin Gateway</span>
          </div>
          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">Admin & Regional Authentication</h1>
          <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
            Regional data is strictly protected. Log in with specific Regional Officer credentials to access that territory, or with National Super Admin for full network oversight.
          </p>
        </div>

        {/* Quick Regional Credentials Selector */}
        <div className="mb-5 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/20">
          <div className="flex items-center justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
            <span>Select Credential Profile (1-Click Fill):</span>
            <span className="text-secondary font-mono">Demo Mode</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {REGIONAL_ACCOUNTS.map(acc => {
              const isSelected = selectedProfile === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  className={`p-2 rounded-xl text-left transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-primary-container/30 border-primary text-primary shadow-sm ring-1 ring-primary'
                      : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-outline'
                  }`}
                  onClick={() => handleSelectAccount(acc)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold truncate">{acc.badge}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>}
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-mono truncate block">{acc.passkey}</span>
                </button>
              );
            })}
          </div>
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
              Administrator ID / Regional Officer Email
            </label>
            <div className="relative flex items-center">
              <Icon name="person" className="w-4 h-4 text-on-surface-variant absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => { setAdminId(e.target.value); setSelectedProfile(''); }}
                required
                className="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="admin@annapurna.gov.in"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-on-surface-variant">
                Security Passkey
              </label>
              <span className="text-[10px] text-on-surface-variant">
                Authorized credentials only
              </span>
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
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm active:scale-[0.99] disabled:opacity-75 cursor-pointer"
          >
            {isVerifying ? (
              <>
                <Icon name="refresh" className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Clearance...</span>
              </>
            ) : (
              <>
                <Icon name="verified_user" className="w-4 h-4 text-white" />
                <span>Authorize & Enter Command Center</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Return to Public Site */}
        <div className="mt-6 pt-4 border-t border-surface-variant/40 flex items-center justify-between text-xs">
          <button
            onClick={() => navigateTo('landing')}
            className="text-on-surface-variant hover:text-primary font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Icon name="arrow_forward" className="w-3.5 h-3.5 rotate-180" />
            <span>Return to Public Site</span>
          </button>
          <span className="text-[10px] text-on-surface-variant font-mono">
            Encrypted RBAC Session
          </span>
        </div>
      </div>
    </div>
  );
}
