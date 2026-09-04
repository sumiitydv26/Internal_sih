import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { REGIONS_DATA } from '../data/regionalData';
import Icon from '../components/Icon';

export default function AdminCommandCenter() {
  const {
    auditLogs,
    produceList,
    activeCluster,
    setActiveCluster,
    navigateTo,
    logoutAdmin,
    adminSession,
    unlockRegion
  } = useApp();

  const [liveVehiclePos, setLiveVehiclePos] = useState(42);
  const [challengeModal, setChallengeModal] = useState(null); // { targetRegion, passkeyInput: '', error: '' }

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveVehiclePos(prev => (prev >= 92 ? 15 : prev + 1.5));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const currentRegion = REGIONS_DATA[activeCluster] || REGIONS_DATA["Nashik Cluster (MH-15)"];
  const isSuperAdmin = adminSession?.scope === 'ALL';

  const isRegionUnlocked = (regionName) => {
    if (isSuperAdmin) return true;
    if (adminSession?.unlockedRegions?.includes(regionName)) return true;
    return false;
  };

  const handleRegionSelect = (e) => {
    const selected = e.target.value;
    if (isRegionUnlocked(selected)) {
      setActiveCluster(selected);
    } else {
      setChallengeModal({
        targetRegion: selected,
        passkeyInput: '',
        error: ''
      });
    }
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (!challengeModal) return;

    const result = unlockRegion(challengeModal.targetRegion, challengeModal.passkeyInput);
    if (result.success) {
      setChallengeModal(null);
    } else {
      setChallengeModal(prev => ({
        ...prev,
        error: result.message || 'Invalid security key for this region.'
      }));
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 overflow-x-hidden">
      {/* Secret Admin Portal Access Banner */}
      <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <Icon name="admin_panel_settings" className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-primary flex items-center gap-2 flex-wrap">
              <span>Restricted Administrative Access Portal</span>
              {isSuperAdmin ? (
                <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                  <span>★</span> Super Admin Clearance (All 4 Regions)
                </span>
              ) : (
                <span className="bg-secondary-container/80 text-secondary text-[10px] px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                  <span>📍</span> {adminSession?.badge || 'Regional Officer Clearance'}
                </span>
              )}
            </div>
            <p className="text-on-surface-variant text-[11px] mt-0.5">
              Authenticated Operator: <strong className="text-on-surface">{adminSession?.name || 'Authorized Personnel'}</strong> ({adminSession?.email || 'admin@annapurna.gov.in'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => {
              const url = window.location.origin + window.location.pathname + '#admin';
              navigator.clipboard?.writeText(url);
              alert('Direct Admin URL copied to clipboard:\n' + url);
            }}
            className="px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-container border border-outline-variant/30 text-on-surface font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Icon name="link" className="w-3.5 h-3.5 text-primary" />
            <span>Copy Link</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-semibold flex items-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
          >
            <Icon name="logout" className="w-3.5 h-3.5 text-white" />
            <span>Log Out & Exit</span>
          </button>
        </div>
      </div>

      {/* Top Welcome & Greeting Area with Region Security Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold">
              REGION CLUSTER:
            </span>
            <div className="relative inline-flex items-center">
              <select
                value={activeCluster}
                onChange={handleRegionSelect}
                className="bg-surface-container-high px-3 py-1 rounded-xl text-xs font-bold text-primary border border-outline-variant/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary pr-7"
              >
                {Object.keys(REGIONS_DATA).map(regName => {
                  const unlocked = isRegionUnlocked(regName);
                  return (
                    <option key={regName} value={regName}>
                      {unlocked ? '✓ ' : '🔒 '} {regName.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>

            <span className="text-[11px] text-on-surface-variant font-medium">
              {currentRegion.state} • Officer: <strong>{currentRegion.officerTitle}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
            {currentRegion.regionName} Command Hub
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            {currentRegion.statusCard.desc}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert('Cluster configuration for ' + activeCluster + ' opened. Active node capacity: 500 MT.')}
            className="bg-primary hover:bg-primary/90 text-on-primary font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all text-xs sm:text-sm cursor-pointer"
          >
            <Icon name="settings_suggest" className="w-4 h-4 text-on-primary" />
            <span>Manage Cluster</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid - Dynamic for Active Region */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Active Farmers */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Farmers</span>
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <Icon name="agriculture" className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">{currentRegion.metrics.activeFarmers}</span>
            <span className="text-xs text-secondary flex items-center gap-1 mt-1 font-bold">
              <Icon name="trending_up" className="w-3.5 h-3.5 text-secondary" /> {currentRegion.metrics.farmersTrend}
            </span>
          </div>
        </div>

        {/* Active Buyers */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Buyers</span>
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary shrink-0">
              <Icon name="storefront" className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">{currentRegion.metrics.activeBuyers}</span>
            <span className="text-xs text-on-surface-variant mt-1 block">{currentRegion.metrics.buyersDesc}</span>
          </div>
        </div>

        {/* Active Inventory */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Inventory</span>
            <div className="w-10 h-10 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
              <Icon name="inventory_2" className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">{currentRegion.metrics.activeInventory}</span>
            <span className="text-xs text-secondary mt-1 block font-bold">{currentRegion.metrics.inventorySub}</span>
          </div>
        </div>

        {/* Warehouse Utilization */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-outline"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Warehouse Utilization</span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface shrink-0">
              <Icon name="warehouse" className="w-5 h-5 text-on-surface" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">{currentRegion.metrics.warehouseUtilization}</span>
            <span className="text-xs text-on-surface-variant mt-1 block">{currentRegion.metrics.utilizationDesc}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Regional Corridor Map & Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Telemetry Map Card */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <h2 className="text-lg sm:text-xl text-on-surface font-bold">
                  {currentRegion.corridorMap.corridorName}
                </h2>
                <span className="text-xs text-on-surface-variant">
                  {currentRegion.corridorMap.trackingUnitsSummary}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary font-bold flex items-center gap-1.5 bg-secondary-container/40 px-2.5 py-1 rounded-full">
                  <Icon name="radar" className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  <span>{currentRegion.telemetry.lastSync}</span>
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

              {/* Dynamic Regional Nodes */}
              {currentRegion.corridorMap.nodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute z-10 flex items-center gap-2"
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-primary ring-4 ring-primary/20 flex items-center justify-center text-white text-[10px] font-bold">
                      {node.id}
                    </div>
                    {node.id === 1 && (
                      <div className="absolute -inset-1 rounded-full bg-primary/30 animate-ping"></div>
                    )}
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-outline-variant/30 text-left">
                    <span className="text-xs font-extrabold text-primary block leading-tight">{node.name}</span>
                    <span className="text-[10px] text-on-surface-variant font-medium">{node.status}</span>
                  </div>
                </div>
              ))}

              {/* Moving Vehicle on Route */}
              <div
                className="absolute z-20 transition-all duration-1000 ease-linear flex flex-col items-center pointer-events-none"
                style={{
                  left: liveVehiclePos + '%',
                  top: (16 + (liveVehiclePos * 0.65)) + '%'
                }}
              >
                <div className="bg-primary text-white p-1.5 rounded-xl shadow-lg ring-2 ring-white flex items-center gap-1.5">
                  <Icon name="local_shipping" className="w-3.5 h-3.5 text-white" />
                  <span className="text-[9px] font-mono font-bold pr-1">{currentRegion.corridorMap.vehicleReg}</span>
                </div>
                <div className="bg-white/95 px-1.5 py-0.5 rounded text-[8px] font-bold text-primary shadow mt-0.5 whitespace-nowrap">
                  {currentRegion.corridorMap.vehicleCargo}
                </div>
              </div>

              {/* Bottom Map Stats Overlay */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded-xl border border-outline-variant/20">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Corridor Distance:</span>
                    <span className="font-bold text-on-surface">{currentRegion.corridorMap.distance}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Avg Transit:</span>
                    <span className="font-bold text-secondary">{currentRegion.corridorMap.avgTransit}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Live Fleet on Corridor:</span>
                    <span className="font-bold text-primary">{currentRegion.corridorMap.activeUnits} Units</span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => alert('Satellite geofence for ' + currentRegion.regionName + ' refreshed.')}
                    className="px-2.5 py-1 bg-surface-container-high hover:bg-surface-container rounded-lg text-xs font-bold text-primary cursor-pointer"
                  >
                    Refresh Geofence
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Real-Time Activity Feed & Audit Stream */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-lg sm:text-xl text-on-surface font-bold">
                  {currentRegion.regionName} Event Stream
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Immutable audit records verified for {currentRegion.code}.
                </span>
              </div>
              <button
                onClick={() => alert('Full audit log for ' + currentRegion.regionName + ' exported as CSV.')}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Export Regional Audit CSV
              </button>
            </div>

            <div className="space-y-2.5">
              {currentRegion.auditStream.map((log) => (
                <div
                  key={log.id}
                  className="bg-surface-container-lowest p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/15 hover:border-outline-variant/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                      <Icon name="verified_user" className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-on-surface">{log.title}</h4>
                      <p className="text-xs text-on-surface-variant">{log.detail}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mb-0.5 ' + log.badgeClass}>
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
                {currentRegion.code} STATUS TELEMETRY
              </span>
              <Icon name="admin_panel_settings" className="w-5 h-5 text-primary-fixed" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">{currentRegion.statusCard.title}</h3>
            <p className="text-xs text-on-primary-container mb-4">
              {currentRegion.statusCard.desc}
            </p>
            <div className="bg-surface/10 backdrop-blur-md p-3.5 rounded-xl mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-on-primary-container">Active Fleet Units:</span>
                <span className="text-on-primary font-bold">{currentRegion.statusCard.activeFleet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary-container">System Latency:</span>
                <span className="text-on-primary font-bold">{currentRegion.statusCard.systemLatency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary-container">Escrow Health:</span>
                <span className="text-secondary-fixed font-bold">{currentRegion.statusCard.escrowHealth}</span>
              </div>
            </div>
            <button
              onClick={() => alert('Network Audit Report generated for ' + currentRegion.regionName + '. Running at nominal efficiency.')}
              className="w-full bg-surface text-on-surface hover:bg-surface-container-low font-bold py-2.5 px-4 rounded-xl transition-all text-xs cursor-pointer"
            >
              Download Regional Audit
            </button>
          </div>

          {/* Regional Cold Storage IoT Telemetry */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg text-on-surface font-bold">Cold-Chain Telemetry</h3>
              <Icon name="thermostat" className="w-4 h-4 text-secondary" />
            </div>
            <div className="p-3.5 bg-surface-container rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-on-surface">Ambient Pulp Temperature:</span>
                <span className="text-xs font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
                  {currentRegion.telemetry.ambientTemp}
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant block">
                {currentRegion.telemetry.ambientStatus}
              </span>

              <div className="flex justify-between items-center pt-2 border-t border-outline-variant/20">
                <span className="text-xs font-semibold text-on-surface">Chamber Humidity:</span>
                <span className="text-xs font-bold text-primary bg-primary-container/30 px-2 py-0.5 rounded">
                  {currentRegion.telemetry.humidity}
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant block">
                {currentRegion.telemetry.humidityStatus}
              </span>

              <div className="flex justify-between items-center pt-2 border-t border-outline-variant/20">
                <span className="text-xs font-semibold text-on-surface">Corridor Compliance:</span>
                <span className="text-xs font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
                  {currentRegion.telemetry.complianceRate}
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant block">
                {currentRegion.telemetry.complianceStatus}
              </span>
            </div>
          </div>

          {/* Regional Clearance Security Info */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 text-xs">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="verified_user" className="w-4 h-4 text-primary" />
              <span className="font-bold text-on-surface">Data Access Control Policy</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Every agro corridor maintains segregated cryptographic partitions. Regional officers can only access telemetry within their jurisdiction. Super Admins hold multi-tenant national clearance.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Access Challenge Modal */}
      {challengeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 shadow-2xl border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-error-container/30 text-error flex items-center justify-center shrink-0">
                <Icon name="lock" className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Restricted Regional Clearance</h3>
                <span className="text-xs text-on-surface-variant font-mono">
                  Target: {challengeModal.targetRegion}
                </span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant mb-4">
              You are currently logged in as <strong>{adminSession?.name}</strong>. Data for <strong>{challengeModal.targetRegion}</strong> is encrypted. Please enter this territory's Regional Officer security key or the National Super Admin key to unlock:
            </p>

            {challengeModal.error && (
              <div className="mb-3 p-2.5 rounded-xl bg-error-container/40 text-error text-xs flex items-center gap-2">
                <Icon name="gpp_bad" className="w-4 h-4 text-error shrink-0" />
                <span>{challengeModal.error}</span>
              </div>
            )}

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-on-surface">Regional Passkey</label>
                  <button
                    type="button"
                    onClick={() => {
                      const demoKey = REGIONS_DATA[challengeModal.targetRegion]?.passkey || 'admin2026';
                      setChallengeModal(prev => ({ ...prev, passkeyInput: demoKey, error: '' }));
                    }}
                    className="text-[11px] text-secondary hover:text-primary font-bold hover:underline cursor-pointer"
                  >
                    Demo key: <code className="font-mono bg-surface-container px-1 py-0.5 rounded">{REGIONS_DATA[challengeModal.targetRegion]?.passkey}</code>
                  </button>
                </div>
                <input
                  type="password"
                  value={challengeModal.passkeyInput}
                  onChange={(e) => setChallengeModal(prev => ({ ...prev, passkeyInput: e.target.value, error: '' }))}
                  required
                  autoFocus
                  placeholder="Enter passkey to unlock..."
                  className="w-full bg-surface-container-low px-3.5 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChallengeModal(null)}
                  className="flex-1 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-xs font-bold text-on-primary shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Icon name="verified_user" className="w-3.5 h-3.5 text-white" />
                  <span>Unlock Region</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
