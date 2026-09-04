import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from './Icon';

export default function Navbar() {
  const { currentView, navigateTo, activeRole, setActiveRole, produceList, setInspectingBatch, auditLogs } = useApp();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles = [
    { id: 'farmer', label: 'Farmer / FPO', icon: 'agriculture', view: 'farmer' },
    { id: 'buyer', label: 'Buyer / Mandi', icon: 'storefront', view: 'buyer' },
    { id: 'transport', label: 'Transport Fleet', icon: 'local_shipping', view: 'fleet' },
    { id: 'admin', label: 'System Admin', icon: 'admin_panel_settings', view: 'admin' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = produceList.find(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      setInspectingBatch(match);
      setSearchQuery('');
    } else {
      navigateTo('buyer');
    }
  };

  const currentRoleObj = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
            <Icon name="eco" className="w-5 h-5 text-on-primary-container" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold text-primary tracking-tight block leading-tight">
              Annapurna
            </span>
            <span className="text-[9px] sm:text-[10px] text-secondary font-bold tracking-wider uppercase block">
              Agri-Supply Network
            </span>
          </div>
        </div>


        {/* Search Bar (Tablet / Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative flex-1 max-w-[200px] lg:max-w-[240px]">
          <Icon name="search" className="w-4 h-4 text-on-surface-variant absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, batch..."
            className="w-full bg-surface-container pl-9 pr-3 py-1.5 rounded-xl text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
          />
        </form>

        {/* Right Section: Trace Lot, Role Switcher, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Traceability Button */}
          <button
            onClick={() => setInspectingBatch(produceList[0])}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold border border-outline-variant/30 transition-all shadow-sm"
            title="Inspect Provenance Passport"
          >
            <Icon name="qr_code_2" className="w-4 h-4 text-primary" />
            <span className="hidden md:inline">Trace Lot</span>
          </button>

          {/* Active Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-primary-container/20 hover:bg-primary-container/30 border border-primary/20 text-primary transition-all text-xs font-bold shadow-sm"
            >
              <Icon name={currentRoleObj.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{currentRoleObj.label}</span>
              <Icon name="expand_more" className="w-3.5 h-3.5" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 py-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] text-on-surface-variant uppercase tracking-wider font-bold border-b border-surface-variant mb-1">
                  Switch Active Persona
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRole(r.id);
                      navigateTo(r.view, r.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors ${
                      activeRole === r.id ? 'bg-primary-container/20 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon name={r.icon} className="w-4 h-4" />
                    <span className="flex-1">{r.label}</span>
                    {activeRole === r.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    )}
                  </button>
                ))}
                <div className="border-t border-surface-variant mt-1 pt-1">
                  <button
                    onClick={() => {
                      navigateTo('login');
                      setShowRoleDropdown(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs text-secondary hover:bg-surface-container-high font-bold"
                  >
                    <Icon name="login" className="w-4 h-4" />
                    <span>Unified Login Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-colors"
              title="Notifications"
            >
              <Icon name="notifications" className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-surface-variant pb-2 mb-2">
                  <span className="text-xs font-bold text-on-surface">Live Event Stream</span>
                  <span className="text-[10px] text-secondary font-bold">Real-time</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {auditLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="p-2 rounded-lg bg-surface-container-low text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-on-surface">{log.title}</span>
                        <span className="text-[9px] text-on-surface-variant">{log.time}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant line-clamp-1">{log.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div
            onClick={() => navigateTo('login')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-on-primary flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
            title="Account & Auth"
          >
            <Icon name="person" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl hover:bg-surface-container lg:hidden text-on-surface-variant"
            aria-label="Toggle navigation menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "apps"} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-4 py-3 space-y-1.5 animate-fadeIn">
          <button
            onClick={() => { navigateTo('landing'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container"
          >
            <Icon name="public" className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => { navigateTo('buyer', 'buyer'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container"
          >
            <Icon name="storefront" className="w-4 h-4" />
            <span>Marketplace</span>
          </button>
          <button
            onClick={() => { navigateTo('farmer', 'farmer'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container"
          >
            <Icon name="agriculture" className="w-4 h-4" />
            <span>Farmer Hub</span>
          </button>
          <button
            onClick={() => { navigateTo('fleet', 'transport'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container"
          >
            <Icon name="local_shipping" className="w-4 h-4" />
            <span>Fleet Logistics</span>
          </button>
          <button
            onClick={() => { navigateTo('admin', 'admin'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container"
          >
            <Icon name="admin_panel_settings" className="w-4 h-4" />
            <span>Command Center</span>
          </button>
          <button
            onClick={() => { setInspectingBatch(produceList[0]); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-primary hover:bg-surface-container"
          >
            <Icon name="qr_code_2" className="w-4 h-4 text-primary" />
            <span>Traceability Passport</span>
          </button>
        </div>
      )}
    </header>
  );
}
