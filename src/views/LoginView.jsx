import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function LoginView() {
  const { navigateTo, setActiveRole } = useApp();
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [authMode, setAuthMode] = useState('otp'); // 'otp' | 'password'
  const [mobileNumber, setMobileNumber] = useState('9823456789');
  const [password, setPassword] = useState('agrichain2026');
  const [otp, setOtp] = useState(['4', '8', '9', '2']);

  const isAdminRoute = 
    window.location.hash.toLowerCase().includes('admin') || 
    window.location.search.toLowerCase().includes('admin');

  const baseRoles = [
    {
      id: 'farmer',
      title: 'Farmer / FPO',
      desc: 'Sell and manage agricultural produce directly to buyers.',
      icon: 'agriculture',
      portalTitle: 'Farmer / FPO Portal Authentication',
      targetView: 'farmer'
    },
    {
      id: 'buyer',
      title: 'Buyer',
      desc: 'Discover and purchase aggregated agricultural supply.',
      icon: 'storefront',
      portalTitle: 'Commercial Buyer Portal Authentication',
      targetView: 'buyer'
    },
    {
      id: 'transport',
      title: 'Transport Provider',
      desc: 'Provide regional transportation using your commercial vehicle.',
      icon: 'local_shipping',
      portalTitle: 'Fleet & Logistics Authentication',
      targetView: 'fleet'
    }
  ];

  const adminRole = {
    id: 'admin',
    title: 'Admin',
    desc: 'Manage regions, inventory, users, and logistics networks.',
    icon: 'admin_panel_settings',
    portalTitle: 'Command Center Administrative Access',
    targetView: 'admin'
  };

  const roles = isAdminRoute ? [...baseRoles, adminRole] : baseRoles;

  const currentRole = roles.find(r => r.id === selectedRole) || roles[0];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setActiveRole(selectedRole);
    navigateTo(currentRole.targetView, selectedRole);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-8 pt-20 sm:pt-24 pb-16 overflow-hidden">
      {/* Background Video of Farmer Sowing Seeds in Field */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.75] contrast-[1.05]"
        >
          <source src="./videos/farmer_sowing_seeds.mp4" type="video/mp4" />
          <source src="./videos/farmer_field_work.mp4" type="video/mp4" />
          <source src="./videos/tractor_field.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-primary/55 to-black/75 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          {/* Left Column: Role Selection & Dynamic Auth Form */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-surface-tint uppercase tracking-wider font-extrabold">
                NETWORK ACCESS
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface">Welcome back</h1>
              <p className="text-sm sm:text-base text-on-surface-variant">
                Choose how you use the agricultural network to access your tailored workspace.
              </p>
            </div>

            {/* Role Selector Cards Grid */}
            <div className={`grid grid-cols-1 ${roles.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`flex flex-col p-4 rounded-2xl text-left transition-all relative overflow-hidden group border ${
                      isSelected
                        ? 'bg-surface-container-low ring-2 ring-primary border-primary shadow-md'
                        : 'bg-surface-container-low border-outline-variant/20 hover:border-outline-variant hover:shadow-sm'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-3 shadow-sm shrink-0">
                      <Icon name={r.icon} className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1">{r.title}</h3>
                    <p className="text-xs text-on-surface-variant">{r.desc}</p>
                    {isSelected && (
                      <span className="absolute top-3 right-3 text-primary text-[10px] font-bold bg-primary-container/20 px-2.5 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Authentication Form Card */}
            <div className="flex flex-col p-5 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-xl space-y-4 border border-outline-variant/20">
              <div className="flex items-center justify-between border-b border-surface-variant pb-3 gap-2 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Icon name={currentRole.icon} className="w-5 h-5 text-surface-tint" />
                  <span className="text-xs sm:text-sm font-bold text-on-surface">{currentRole.portalTitle}</span>
                </div>
                <div className="flex space-x-1 bg-surface-container-low p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setAuthMode('otp')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'otp' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Mobile & OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('password')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'password' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Password
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4">
                {/* Mobile Number Input */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-on-surface">Registered Mobile Number</label>
                  <div className="flex items-center bg-surface-container-low rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary border border-outline-variant/30 transition-all">
                    <span className="text-sm text-on-surface-variant mr-2 font-bold">+91</span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      maxLength="10"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full bg-transparent outline-none text-sm text-on-surface font-semibold"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                {authMode === 'password' && (
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-on-surface">Network Password / PIN</label>
                    <div className="flex items-center bg-surface-container-low rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary border border-outline-variant/30 transition-all">
                      <Icon name="lock" className="w-4 h-4 text-on-surface-variant mr-2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-transparent outline-none text-sm text-on-surface"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* OTP Input */}
                {authMode === 'otp' && (
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-on-surface">Verification Code (OTP)</label>
                      <button type="button" className="text-xs text-secondary hover:underline font-bold">
                        Resend OTP in 28s
                      </button>
                    </div>
                    <div className="flex space-x-3 justify-between">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[idx] = e.target.value;
                            setOtp(newOtp);
                          }}
                          className="w-12 sm:w-14 h-12 sm:h-14 text-center bg-surface-container-low rounded-xl text-lg sm:text-xl font-bold text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 shadow-sm"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-secondary font-medium mt-1 flex items-center gap-1">
                      <Icon name="info" className="w-3.5 h-3.5 text-secondary" />
                      Demo OTP pre-filled. Press submit to log in immediately.
                    </span>
                  </div>
                )}

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary rounded" />
                    <span className="text-xs text-on-surface-variant">Remember this workstation</span>
                  </label>
                  <a href="#help" className="text-xs text-primary hover:underline font-medium">
                    Need help?
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                  >
                    <span>Access {currentRole.title} Workspace</span>
                    <Icon name="arrow_forward" className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('landing')}
                    className="px-4 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Platform Assurance & Trust Graphic */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-6">
            <div className="bg-primary text-on-primary p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-fixed text-xs font-bold mb-4">
                <Icon name="lock" className="w-3.5 h-3.5" />
                <span>e-NAM & UIDAI Integrated</span>
              </div>

              <h3 className="text-2xl font-bold mb-3 leading-snug">Enterprise Agricultural Trust Engine</h3>
              <p className="text-on-primary-container text-sm mb-6 leading-relaxed">
                By unifying farm aggregation, cold chain telematics, and automated escrow, Annapurna eliminates delayed farmer payouts and post-harvest produce loss.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="verified_user" className="w-5 h-5 text-secondary-fixed shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-white">Direct-to-Bank Escrow</h5>
                    <p className="text-xs text-on-primary-container">Funds held in RBI-regulated escrow until digital Mandi gate receipt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="thermostat" className="w-5 h-5 text-secondary-fixed shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-white">Cold Chain Traceability</h5>
                    <p className="text-xs text-on-primary-container">Continuous refrigerated vehicle temperature sensors & GPS geofencing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="diversity_3" className="w-5 h-5 text-secondary-fixed shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-white">FPO Fair Market Access</h5>
                    <p className="text-xs text-on-primary-container">Collective bargaining power for smallholders across 142 collection nodes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
