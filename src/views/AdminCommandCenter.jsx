import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function AdminCommandCenter() {
  const { auditLogs, produceList, activeCluster, setActiveCluster, navigateTo } = useApp();
  const [liveVehiclePos, setLiveVehiclePos] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveVehiclePos(prev => (prev >= 92 ? 15 : prev + 1.5));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const totalInventoryTonnes = produceList.reduce((sum, p) => sum + (p.availableVolume || 0), 0);

  return (
    <div className="flex flex-col w-full pb-16 overflow-x-hidden">
      {/* Secret Admin Portal Access Banner */}
      <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <Icon name="admin_panel_settings" className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-primary flex items-center gap-1.5">
              <span>Restricted Administrative Access Portal</span>
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-semibold">Secret URL Link</span>
            </div>
            <p className="text-on-surface-variant text-[11px] mt-0.5">
              Hidden from public site navigation. Direct bookmark link: <code className="bg-surface px-1.5 py-0.5 rounded text-primary font-mono font-bold">#/admin</code>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => {
              const url = `${window.location.origin}${window.location.pathname}#admin`;
              navigator.clipboard?.writeText(url);
              alert(`Direct Admin URL copied to clipboard:\n${url}`);
            }}
            className="px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-container border border-outline-variant/30 text-on-surface font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Icon name="link" className="w-3.5 h-3.5 text-primary" />
            <span>Copy Link</span>
          </button>
          <button
            onClick={() => navigateTo('landing')}
            className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-semibold flex items-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Icon name="logout" className="w-3.5 h-3.5 text-white" />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>

      {/* Top Welcome & Greeting Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold">
              REGION:
            </span>
            <select
              value={activeCluster}
              onChange={(e) => setActiveCluster(e.target.value)}
              className="bg-surface-container px-2 py-0.5 rounded text-xs font-bold text-primary border border-outline-variant/30 cursor-pointer"
            >
              <option value="Nashik Cluster (MH-15)">NASHIK CLUSTER (MH-15)</option>
              <option value="Pune Hub (MH-12)">PUNE HUB (MH-12)</option>
              <option value="Mumbai Agro Corridor (MH-01)">MUMBAI AGRO CORRIDOR (MH-01)</option>
              <option value="Nagpur Central (MH-31)">NAGPUR CENTRAL (MH-31)</option>
            </select>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">Admin Command Center 🛡️</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Live oversight of network-wide supply chain, logistics fleet, and market clearing rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(`Cluster configuration for ${activeCluster} opened. Capacity limits: 500 MT per node.`)}
            className="bg-primary hover:bg-primary-container text-on-primary font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all text-xs sm:text-sm"
          >
            <Icon name="settings_suggest" className="w-4 h-4 text-on-primary" />
            <span>Manage Cluster</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Farmers</span>
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <Icon name="agriculture" className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">12,840</span>
            <span className="text-xs text-secondary flex items-center gap-1 mt-1 font-bold">
              <Icon name="trending_up" className="w-3.5 h-3.5 text-secondary" /> +5.4% this month
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-tertiary-container"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Buyers</span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 flex items-center justify-center text-tertiary shrink-0">
              <Icon name="storefront" className="w-5 h-5 text-tertiary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">1,284</span>
            <span className="text-xs text-on-surface-variant mt-1 block">Mandi & Retail Coops</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Inventory</span>
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <Icon name="inventory_2" className="w-5 h-5 text-on-secondary-container" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">{totalInventoryTonnes + 180} MT</span>
            <span className="text-xs text-secondary mt-1 block font-bold">Across 14 Warehouses</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-outline"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Warehouse Utilization</span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface shrink-0">
              <Icon name="warehouse" className="w-5 h-5 text-on-surface" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">72%</span>
            <span className="text-xs text-on-surface-variant mt-1 block">Optimal Cold Capacity</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Telemetry Map & Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Telemetry Map Card */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <h2 className="text-lg sm:text-xl text-on-surface font-bold">
                  Live Regional Map & Movement Tracking
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Tracking 642 active transport units across Western Agro Corridors.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary font-bold flex items-center gap-1.5 bg-secondary-container/40 px-2.5 py-1 rounded-full">
                  <Icon name="radar" className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  <span>Real-Time Telemetry</span>
                </span>
              </div>
            </div>

            {/* Visual Map Canvas */}
            <div className="w-full h-80 bg-surface-container-lowest rounded-2xl relative overflow-hidden border border-outline-variant/30 flex flex-col justify-between p-5 select-none">
              {/* Map background grid simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(#c1c9be_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              {/* Corridor Route Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 60 70 Q 200 120, 360 160 T 680 230"
                  fill="none"
                  stroke="#8bbd92"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 360 160 Q 480 220, 580 280"
                  fill="none"
                  stroke="#c1c9be"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Hub Node 1: Nashik */}
              <div className="absolute top-10 left-8 z-10 flex items-center gap-2">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-primary ring-4 ring-primary/20 flex items-center justify-center text-white text-[10px] font-bold">
                    1
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-primary/30 animate-ping"></div>
                </div>
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-outline-variant/30 text-left">
                  <span className="text-xs font-extrabold text-primary block">Nashik Central Hub</span>
                  <span className="text-[10px] text-on-surface-variant">32 Trucks Loading</span>
                </div>
              </div>

              {/* Hub Node 2: Igatpuri Checkpoint */}
              <div className="absolute top-32 left-[44%] z-10 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary ring-4 ring-secondary/20 flex items-center justify-center text-white text-[8px]">
                  2
                </div>
                <div className="bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg shadow-sm border border-outline-variant/30 text-left">
                  <span className="text-xs font-bold text-on-surface block">Kasara Checkpoint</span>
                  <span className="text-[10px] text-secondary font-bold">Avg 4.2°C Passed</span>
                </div>
              </div>

              {/* Hub Node 3: Mumbai Terminal */}
              <div className="absolute bottom-10 right-10 z-10 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container ring-4 ring-secondary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                  3
                </div>
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-outline-variant/30 text-left">
                  <span className="text-xs font-extrabold text-primary block">Mumbai APMC Vashi</span>
                  <span className="text-[10px] text-on-surface-variant">Unloading Gate Active</span>
                </div>
              </div>

              {/* Moving Truck on Route */}
              <div
                className="absolute z-20 transition-all duration-1000 ease-linear flex flex-col items-center pointer-events-none"
                style={{
                  left: `${liveVehiclePos}%`,
                  top: `${16 + (liveVehiclePos * 0.65)}%`
                }}
              >
                <div className="bg-primary text-white p-1.5 rounded-xl shadow-lg ring-2 ring-white flex items-center gap-1.5">
                  <Icon name="local_shipping" className="w-3.5 h-3.5 text-white" />
                  <span className="text-[9px] font-mono font-bold pr-1">MH-15-TC-7721</span>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
              </div>

              {/* Bottom Map Stats Overlay */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded-xl border border-outline-variant/20">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Corridor:</span>
                    <span className="font-bold text-primary">Nashik - Mumbai Express (NH-160)</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Distance:</span>
                    <span className="font-bold text-on-surface">166 km</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Avg Transit:</span>
                    <span className="font-bold text-secondary">3 hrs 45 mins</span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => alert("Satellite geofence view refreshed.")}
                    className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container rounded-lg text-xs font-bold text-primary"
                  >
                    Refresh Geofence
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Activity Feed */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-lg sm:text-xl text-on-surface font-bold">
                  Comprehensive Activity Feed & Audit Stream
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Live state events published across all user roles.
                </span>
              </div>
              <button
                onClick={() => alert("Full audit log exported as CSV.")}
                className="text-xs font-bold text-primary hover:underline"
              >
                Export Audit CSV
              </button>
            </div>

            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-surface-container-lowest p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/15 hover:border-outline-variant/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                      <Icon
                        name={log.type === 'transit' ? 'local_shipping' : log.type === 'payment' ? 'payments' : 'inventory_2'}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-on-surface">{log.title}</h4>
                      <p className="text-xs text-on-surface-variant">{log.detail}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mb-0.5 ${log.badgeClass}`}>
                      {log.badge}
                    </span>
                    <span className="text-[10px] text-on-surface-variant block">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Network Status, Fleet Utilization & Cold Storage Gauges */}
        <div className="space-y-6">
          {/* Status Box */}
          <div className="bg-primary text-on-primary p-5 sm:p-6 rounded-2xl shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider text-primary-fixed font-bold">
                COMMAND CENTER STATUS
              </span>
              <Icon name="admin_panel_settings" className="w-5 h-5 text-primary-fixed" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">Cluster Network Stable</h3>
            <p className="text-xs text-on-primary-container mb-4">
              All 14 regional collection centers and transport hubs operating normally.
            </p>
            <div className="bg-surface/10 backdrop-blur-md p-3.5 rounded-xl mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-on-primary-container">Active Fleet Units:</span>
                <span className="text-on-primary font-bold">642 Vehicles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary-container">System Latency:</span>
                <span className="text-on-primary font-bold">24ms (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary-container">Escrow Health:</span>
                <span className="text-secondary-fixed font-bold">100% Fully Collateralized</span>
              </div>
            </div>
            <button
              onClick={() => alert("Network Audit Report generated. Everything running at peak efficiency.")}
              className="w-full bg-surface text-on-surface hover:bg-surface-container-low font-bold py-2.5 px-4 rounded-xl transition-all text-xs"
            >
              Download Network Audit
            </button>
          </div>

          {/* Regional Transport Corridor Reliability */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg text-on-surface font-bold">Corridor Reliability</h3>
              <Icon name="local_shipping" className="w-4 h-4 text-on-surface-variant" />
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl">
                <div>
                  <span className="text-xs sm:text-sm text-on-surface font-bold block">Nashik - Mumbai Express</span>
                  <span className="text-[11px] text-secondary">142 Trucks Active</span>
                </div>
                <div className="text-right">
                  <span className="text-sm sm:text-base text-on-surface font-extrabold">98%</span>
                  <span className="text-[10px] text-secondary block font-bold">On-Time</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl">
                <div>
                  <span className="text-xs sm:text-sm text-on-surface font-bold block">Pune - Nagpur Corridor</span>
                  <span className="text-[11px] text-on-surface-variant">98 Trucks Active</span>
                </div>
                <div className="text-right">
                  <span className="text-sm sm:text-base text-on-surface font-extrabold">94%</span>
                  <span className="text-[10px] text-on-surface-variant block">Normal</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl">
                <div>
                  <span className="text-xs sm:text-sm text-on-surface font-bold block">Aurangabad Local Fleet</span>
                  <span className="text-[11px] text-on-surface-variant">84 Trucks Active</span>
                </div>
                <div className="text-right">
                  <span className="text-sm sm:text-base text-on-surface font-extrabold">99%</span>
                  <span className="text-[10px] text-secondary block font-bold">On-Time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cold Storage IoT Temperature Gauges */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg text-on-surface font-bold">Cold-Chain IoT Telemetry</h3>
              <Icon name="thermostat" className="w-4 h-4 text-secondary" />
            </div>
            <div className="p-3.5 bg-surface-container rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-on-surface">Nashik Hub Cold Room #1:</span>
                <span className="text-xs font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
                  4.2°C (Optimal)
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-semibold text-on-surface">Reefer Truck Reefer-04:</span>
                <span className="text-xs font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
                  3.8°C (En route)
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
