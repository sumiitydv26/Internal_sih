import React from 'react';
import { useApp } from '../context/AppContext';
import Icon from './Icon';

export default function Sidebar() {
  const { currentView, navigateTo, activeRole, setActiveRole, produceList, setInspectingBatch } = useApp();

  const navItems = [
    { id: 'farmer', label: 'Farmer Dashboard', icon: 'dashboard', role: 'farmer' },
    { id: 'buyer', label: 'Buyer Marketplace', icon: 'storefront', role: 'buyer' },
    { id: 'fleet', label: 'Logistics & Fleet', icon: 'local_shipping', role: 'transport' },
    { id: 'admin', label: 'Admin Command Center', icon: 'admin_panel_settings', role: 'admin' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-30 flex flex-col pt-6 pb-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20 hidden md:flex">
      {/* Brand Header */}
      <div 
        onClick={() => navigateTo('landing')}
        className="px-6 mb-6 flex items-center gap-3 cursor-pointer select-none"
      >
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm shrink-0">
          <Icon name="eco" className="w-6 h-6 text-on-primary-container" />
        </div>
        <div>
          <span className="text-xl font-extrabold text-primary block leading-tight">Annapurna</span>
          <span className="text-xs text-on-surface-variant block font-medium">Supply Network</span>
        </div>
      </div>

      {/* Active Role Selector */}
      <div className="px-6 mb-6">
        <label className="text-[11px] text-on-surface-variant block mb-1.5 uppercase font-bold tracking-wider">
          ACTIVE ROLE
        </label>
        <select
          value={activeRole}
          onChange={(e) => {
            const role = e.target.value;
            setActiveRole(role);
            if (role === 'farmer') navigateTo('farmer', 'farmer');
            if (role === 'buyer') navigateTo('buyer', 'buyer');
            if (role === 'transport') navigateTo('fleet', 'transport');
            if (role === 'admin') navigateTo('admin', 'admin');
          }}
          className="w-full bg-surface-container px-3 py-2 rounded-xl text-sm text-on-surface font-bold focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30 cursor-pointer shadow-sm"
        >
          <option value="farmer">Farmer / FPO</option>
          <option value="buyer">Buyer / Mandi</option>
          <option value="transport">Transport Provider</option>
          <option value="admin">System Admin</option>
        </select>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id, item.role)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-left text-sm ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-semibold'
              }`}
            >
              <Icon name={item.icon} className="mr-3 w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-surface-variant">
          <div className="px-3 pb-2 text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            Utilities
          </div>
          <button
            onClick={() => setInspectingBatch(produceList[0])}
            className="w-full flex items-center px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-xs font-semibold"
          >
            <Icon name="qr_code_2" className="mr-3 w-4 h-4 text-primary" />
            <span>Traceability Passport</span>
          </button>
          <button
            onClick={() => navigateTo('landing')}
            className="w-full flex items-center px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-xs font-semibold"
          >
            <Icon name="public" className="mr-3 w-4 h-4" />
            <span>Public Portal</span>
          </button>
        </div>
      </nav>

      {/* Bottom Session Card */}
      <div className="px-4">
        <div className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              SIH
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface block">SIH 2026 Live Demo</span>
              <span className="text-[10px] text-secondary font-medium">Synced with e-NAM</span>
            </div>
          </div>
          <button
            onClick={() => navigateTo('login')}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
            title="Switch User / Logout"
          >
            <Icon name="logout" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
