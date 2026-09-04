import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function FleetManagement() {
  const { fleetList, updateVehicleStatus, activeCluster, setActiveCluster } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVehicleForKYC, setSelectedVehicleForKYC] = useState(null);

  const filteredVehicles = fleetList.filter((v) => {
    if (selectedCategory === 'all') return true;
    return v.typeCode === selectedCategory;
  });

  const verifiedCount = fleetList.filter(v => v.status === 'Verified').length;
  const pendingCount = fleetList.filter(v => v.status === 'Pending Verification').length;
  const suspendedCount = fleetList.filter(v => v.status === 'Suspended').length;

  const handleApproveKYC = (vehicleId) => {
    updateVehicleStatus(vehicleId, 'Verified');
    setSelectedVehicleForKYC(null);
  };

  const handleFlagKYC = (vehicleId) => {
    updateVehicleStatus(vehicleId, 'Suspended');
    setSelectedVehicleForKYC(null);
  };

  return (
    <div className="flex flex-col w-full pb-16 overflow-x-hidden">
      {/* Top Section: Title & Regional Cluster Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant mb-1">
            <Icon name="local_shipping" className="w-4 h-4 text-primary" />
            <span className="text-[10px] uppercase tracking-wider font-extrabold">Logistics & Compliance Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">Transport Fleet & Legal Compliance Hub</h1>
        </div>

        <div className="flex items-center gap-2.5 bg-surface-container-high p-2 rounded-xl self-start md:self-auto shadow-sm border border-outline-variant/30">
          <Icon name="location_on" className="w-5 h-5 text-primary ml-1" />
          <div className="flex flex-col pr-2">
            <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">ACTIVE CLUSTER</span>
            <select
              value={activeCluster}
              onChange={(e) => setActiveCluster(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="Nashik Cluster (MH-15)">Nashik Cluster (MH-15)</option>
              <option value="Pune Hub (MH-12)">Pune Hub (MH-12)</option>
              <option value="Mumbai Agro Corridor (MH-01)">Mumbai Agro Corridor (MH-01)</option>
              <option value="Nagpur Central (MH-31)">Nagpur Central (MH-31)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fleet Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full -mr-6 -mt-6"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                Total Active Fleet
              </span>
              <div className="p-2 bg-primary-fixed/40 rounded-xl">
                <Icon name="directions_car" className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-primary">{fleetList.length * 128 + 2}</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-on-surface-variant">
            <span className="text-secondary font-bold flex items-center gap-0.5">
              <Icon name="trending_up" className="w-3.5 h-3.5 text-secondary" /> +12
            </span>
            registered this month
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-secondary/10 rounded-full -mr-6 -mt-6"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                Legally Verified
              </span>
              <div className="p-2 bg-secondary-container/50 rounded-xl">
                <Icon name="verified" className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-secondary">{verifiedCount * 120 + 18}</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-on-surface-variant">
            <span className="text-secondary font-bold">96.2%</span> full compliance rate
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-tertiary/10 rounded-full -mr-6 -mt-6"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                Pending Verification
              </span>
              <div className="p-2 bg-tertiary-fixed/30 rounded-xl">
                <Icon name="hourglass_top" className="w-5 h-5 text-tertiary-container" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-tertiary-container">{pendingCount}</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-on-surface-variant">
            <span className="text-tertiary font-bold">Action required</span> within 48 hrs
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-error/10 rounded-full -mr-6 -mt-6"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                Suspended / Flagged
              </span>
              <div className="p-2 bg-error-container/50 rounded-xl">
                <Icon name="gpp_bad" className="w-5 h-5 text-error" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-error">{suspendedCount}</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-on-surface-variant">
            <span className="text-error font-bold">Permits expired</span> or flagged
          </div>
        </div>
      </div>

      {/* Fleet Category Filter Pills */}
      <div className="mb-6">
        <h2 className="text-base sm:text-lg text-on-surface font-bold mb-3">Fleet Categories & Weight Tiers</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Vehicles', icon: 'apps', count: fleetList.length },
            { id: '3w', label: 'Three-Wheeler - 500kg', icon: 'electric_rickshaw', count: 142 },
            { id: '4w', label: 'Four-Wheeler - 1.5 Tons', icon: 'local_shipping', count: 284 },
            { id: 'multi', label: 'Multi-Wheeler - 8+ Tons', icon: 'rv_hookup', count: 160 },
            { id: 'reefer', label: 'Cold-Chain Reefer', icon: 'ac_unit', count: 56 },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface border border-outline-variant/20'
              }`}
            >
              <Icon name={cat.icon} className="w-3.5 h-3.5" />
              <span>{cat.label} ({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Roster Table */}
      <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-base sm:text-lg text-on-surface font-bold">Active Fleet & Driver Compliance Register</h3>
            <span className="text-xs text-on-surface-variant">
              Synchronized with State RTO databases and GPS telematics.
            </span>
          </div>
          <button
            onClick={() => alert("Fleet manifest downloaded in PDF format.")}
            className="px-3.5 py-1.5 rounded-xl bg-surface-container-high text-primary font-bold text-xs hover:bg-surface-container flex items-center gap-1.5"
          >
            <Icon name="download" className="w-4 h-4 text-primary" />
            <span>Export Roster</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-surface-variant text-[11px] text-on-surface-variant uppercase font-bold">
                <th className="pb-3">Vehicle Reg</th>
                <th className="pb-3">Driver Details</th>
                <th className="pb-3">Category / Capacity</th>
                <th className="pb-3">Assigned Corridor</th>
                <th className="pb-3">Compliance Docs</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant text-xs sm:text-sm">
              {filteredVehicles.map((veh) => (
                <tr key={veh.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <Icon name={veh.typeCode === 'reefer' ? 'ac_unit' : 'local_shipping'} className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-mono font-bold text-on-surface text-xs">{veh.regNo}</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant block mt-0.5">{veh.cluster}</span>
                  </td>
                  <td className="py-3.5">
                    <span className="font-semibold text-on-surface block">{veh.driverName}</span>
                    <span className="text-[11px] text-on-surface-variant">{veh.phone}</span>
                  </td>
                  <td className="py-3.5">
                    <span className="text-on-surface block font-medium text-xs">{veh.category}</span>
                    <span className="text-[10px] text-secondary font-bold">Cap: {veh.capacityTons} MT</span>
                  </td>
                  <td className="py-3.5">
                    <span className="text-xs text-on-surface font-medium block">{veh.assignedCorridor}</span>
                    <span className="text-[10px] text-on-surface-variant block mt-0.5 line-clamp-1">
                      {veh.currentLoad}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className={`px-1.5 py-0.5 rounded font-bold ${veh.documents.rc ? 'bg-secondary-container/40 text-secondary' : 'bg-error-container text-error'}`} title="Registration Certificate">
                        RC
                      </span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${veh.documents.insurance ? 'bg-secondary-container/40 text-secondary' : 'bg-error-container text-error'}`} title="Commercial Insurance">
                        INS
                      </span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${veh.documents.fitness ? 'bg-secondary-container/40 text-secondary' : 'bg-error-container text-error'}`} title="RTO Fitness Slip">
                        FIT
                      </span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${veh.documents.dl ? 'bg-secondary-container/40 text-secondary' : 'bg-error-container text-error'}`} title="Commercial Heavy DL">
                        DL
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold inline-block ${
                      veh.status === 'Verified'
                        ? 'bg-secondary-container text-secondary'
                        : veh.status === 'Pending Verification'
                        ? 'bg-tertiary-fixed/40 text-tertiary'
                        : 'bg-error-container text-error'
                    }`}>
                      {veh.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedVehicleForKYC(veh)}
                      className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs transition-all"
                    >
                      Review KYC
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Legal Review Modal */}
      {selectedVehicleForKYC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-outline-variant/30">
            <div className="flex items-center justify-between border-b border-surface-variant pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <Icon name="policy" className="w-5 h-5 text-on-primary-container" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary">RTO Legal Verification</h3>
                  <span className="text-xs font-mono text-on-surface-variant">{selectedVehicleForKYC.regNo}</span>
                </div>
              </div>
              <button onClick={() => setSelectedVehicleForKYC(null)} className="text-on-surface-variant hover:text-on-surface p-1">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 mb-6">
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">{selectedVehicleForKYC.driverName}</span>
                  <span className="text-xs text-on-surface-variant">{selectedVehicleForKYC.phone}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary block">{selectedVehicleForKYC.category}</span>
                  <span className="text-[10px] text-on-surface-variant">Capacity: {selectedVehicleForKYC.capacityTons} MT</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Document Checklist & Validity
                </h4>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="verified" className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-xs font-medium text-on-surface">Vahan RC Book Digital Record</span>
                  </div>
                  <span className="text-[10px] text-secondary font-bold">Valid till 2031</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="verified" className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-xs font-medium text-on-surface">Comprehensive Cargo Insurance</span>
                  </div>
                  <span className="text-[10px] text-secondary font-bold">Valid till Nov 2026</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name={selectedVehicleForKYC.documents.fitness ? 'verified' : 'pending'} className={`w-4 h-4 shrink-0 ${selectedVehicleForKYC.documents.fitness ? 'text-secondary' : 'text-tertiary'}`} />
                    <span className="text-xs font-medium text-on-surface">RTO Annual Fitness Certificate</span>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedVehicleForKYC.documents.fitness ? 'text-secondary' : 'text-tertiary'}`}>
                    {selectedVehicleForKYC.documents.fitness ? 'Verified Passed' : 'Inspection Due'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="verified" className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-xs font-medium text-on-surface">Driver Commercial Heavy DL</span>
                  </div>
                  <span className="text-[10px] text-secondary font-bold">Active & Clean Record</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleApproveKYC(selectedVehicleForKYC.id)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container shadow transition-all flex items-center justify-center gap-1.5"
              >
                <Icon name="verified" className="w-4 h-4" />
                <span>Approve Full Compliance</span>
              </button>
              <button
                onClick={() => handleFlagKYC(selectedVehicleForKYC.id)}
                className="px-4 py-2.5 rounded-xl bg-error-container text-on-error-container font-bold text-xs hover:bg-error/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Icon name="flag" className="w-4 h-4" />
                <span>Flag Issue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
