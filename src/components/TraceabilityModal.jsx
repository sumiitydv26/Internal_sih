import React from 'react';
import { useApp } from '../context/AppContext';
import Icon from './Icon';

export default function TraceabilityModal() {
  const { inspectingBatch, setInspectingBatch } = useApp();

  if (!inspectingBatch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-variant pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
              <Icon name="qr_code_scanner" className="w-5 h-5 text-on-primary-container" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                  Immutable Blockchain Ledger
                </span>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  #{inspectingBatch.id || "LOT-2026-881"}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-primary">
                Agricultural Provenance Passport
              </h2>
            </div>
          </div>
          <button
            onClick={() => setInspectingBatch(null)}
            className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors p-1"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Commodity Overview */}
        <div className="flex gap-4 p-4 rounded-xl bg-surface-container-low mb-6 items-center">
          <img
            src={inspectingBatch.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"}
            alt={inspectingBatch.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-outline-variant/20 shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-on-surface">
                {inspectingBatch.name}
              </h3>
              <span className="text-sm sm:text-base font-bold text-primary">
                ₹{inspectingBatch.pricePerKg}/kg
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {inspectingBatch.grade} • {inspectingBatch.variety || "Hybrid Standard"}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-secondary font-medium">
              <Icon name="verified" className="w-4 h-4 text-secondary" />
              <span>{inspectingBatch.hub || "Nashik Regional Aggregation Hub"}</span>
            </div>
          </div>
        </div>

        {/* Provenance Steps / Timeline */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Supply Chain Handshake Verification
          </h4>

          {/* Step 1: Farm Origin */}
          <div className="flex gap-3 relative pb-4 border-l-2 border-primary ml-3 sm:ml-4 pl-4">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-on-surface">Farm of Origin</span>
                <span className="text-[11px] text-on-surface-variant">{inspectingBatch.harvestDate || "Verified"}</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Producer: <strong>{inspectingBatch.farmerName || "Ramesh Patil"}</strong> (FPO ID: {inspectingBatch.fpoId || "MH-NSK-8842"})
              </p>
              <div className="mt-1 text-[11px] bg-surface-container px-2 py-0.5 rounded inline-block text-on-surface">
                🌱 Soil Nutrients: {inspectingBatch.soilTested || "Optimal N-P-K Organic Grade"}
              </div>
            </div>
          </div>

          {/* Step 2: Quality Inspection */}
          <div className="flex gap-3 relative pb-4 border-l-2 border-primary ml-3 sm:ml-4 pl-4">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-on-surface">Agri-Testing & Grading</span>
                <span className="text-[11px] text-secondary font-bold">Passed (Grade A)</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Assessed at Village Collection Hub via Digital Optical Sorter. Moisture: 11.8%, Firmness: 94/100.
              </p>
              <div className="mt-1 text-[11px] bg-surface-container px-2 py-0.5 rounded inline-block text-on-surface">
                🛡️ FSSAI Compliance: {inspectingBatch.fssaiLicense || "FSSAI-11522036000412"}
              </div>
            </div>
          </div>

          {/* Step 3: Cold Chain Telemetry */}
          <div className="flex gap-3 relative pb-4 border-l-2 border-primary ml-3 sm:ml-4 pl-4">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-on-surface">Logistics & Cold Storage</span>
                <span className="text-[11px] text-on-surface-variant">Continuous IoT Log</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Transit Vehicle: <strong>MH-15-TC-7721</strong> (GPS Geofence Verified).
              </p>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-secondary font-bold flex-wrap">
                <span className="px-2 py-0.5 rounded bg-secondary-container">Avg Temp: 11.4°C</span>
                <span className="px-2 py-0.5 rounded bg-secondary-container">Humidity: 82%</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">0 Spoilage Spikes</span>
              </div>
            </div>
          </div>

          {/* Step 4: Escrow & Mandi Clearance */}
          <div className="flex gap-3 relative ml-3 sm:ml-4 pl-4">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-bold text-on-surface">Smart Contract Escrow</span>
                <span className="text-[11px] text-secondary font-bold">Funds Guaranteed</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Payment held in automated escrow; automatic release triggered upon Mandi weighbridge RFID scan.
              </p>
            </div>
          </div>
        </div>

        {/* QR & Verification Code */}
        <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white p-1 rounded-lg shadow-sm border border-outline-variant/30 flex items-center justify-center shrink-0">
              <Icon name="qr_code_2" className="w-8 h-8 text-primary" />
            </div>
            <div>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">Universal Batch Code</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-primary">
                IND-AGRI-2026-X8842-{(inspectingBatch.id || "001").replace('PROD-', '')}
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">Government e-NAM & APMC Interoperable</span>
            </div>
          </div>
          <button
            onClick={() => alert(`Provenance certificate for lot #${inspectingBatch.id} downloaded successfully!`)}
            className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container transition-all flex items-center gap-1.5"
          >
            <Icon name="download" className="w-4 h-4" />
            <span>Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
