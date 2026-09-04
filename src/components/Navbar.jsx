import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from './Icon';

export default function Navbar() {
  const { navigateTo, auditLogs } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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


        {/* Right Section: Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

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
        </div>
      )}
    </header>
  );
}
