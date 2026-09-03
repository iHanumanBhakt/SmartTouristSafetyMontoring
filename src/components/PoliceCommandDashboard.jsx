import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Activity, 
  Radio, 
  Lock, 
  Key, 
  FileCheck2,
  Ambulance,
  Building2,
  Shield,
  Search,
  CheckSquare
} from 'lucide-react';

export default function PoliceCommandDashboard({ emergencyEvents = [] }) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [shoSigned, setShoSigned] = useState(false);
  const [dispatchedUnit, setDispatchedUnit] = useState(null);
  const [activeTab, setActiveTab] = useState('queue');

  const incidents = emergencyEvents.length > 0 ? emergencyEvents : [
    {
      id: 'INC-2026-8891',
      touristName: 'Elena Rostova',
      did: 'did:sih:ne:0x8F9aC37d8291bB126',
      type: 'SENSOR_FALL_ACCELEROMETER',
      severity: 'CRITICAL',
      location: 'Restricted Cliff Belt • Shillong Peak',
      timestamp: '12:34:10 IST',
      heartRate: 148,
      medicalHistory: 'Asthma / Blood Type O+',
      triageScore: 'CRITICAL (0.96 Confidence)',
      cacheStatus: 'Deduplicated (0 Tokens Used)',
      status: 'PENDING_SHO_AUTHORIZATION'
    },
    {
      id: 'INC-2026-8890',
      touristName: 'Vikramaditya Sharma',
      did: 'did:sih:ne:0x419B27c1902Caa89',
      type: 'GEOFENCE_BREACH',
      severity: 'HIGH',
      location: 'Dawki River Border Sector',
      timestamp: '12:18:44 IST',
      heartRate: 88,
      medicalHistory: 'No Known Allergies',
      triageScore: 'HIGH (0.89 Confidence)',
      cacheStatus: 'Cache Miss (142 Tokens)',
      status: 'RESOLVED'
    }
  ];

  const currentInc = selectedIncident || incidents[0];

  const handleSignEFIR = () => {
    setShoSigned(true);
    setDispatchedUnit('Patrol Squad #4 & Emergency Medical Response #2');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Command Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">State Police GIS & Multi-Agency Dispatch Center</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                Authorized Operational Console
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              BNSS / CrPC Compliant E-FIR Framework • Multi-Agent Consensus Engine
            </p>
          </div>
        </div>

        {/* View Selection */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'queue' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Distress Queue ({incidents.length})
          </button>
          <button
            onClick={() => setActiveTab('efir')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'efir' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Official E-FIR Hub
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'audit' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            On-Chain Audit Log
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Active Distress Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-rose-500" /> Active Distress Queue
            </h3>
            <span className="text-[10px] font-mono text-slate-400">WebSocket Stream</span>
          </div>

          <div className="space-y-2.5">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer space-y-2 ${
                  currentInc.id === inc.id
                    ? 'bg-slate-800 border-blue-500 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    inc.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{inc.timestamp}</span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-200">{inc.touristName}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{inc.location}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-900 pt-1.5">
                  <span>Type: {inc.type}</span>
                  <span className="text-blue-400">HR: {inc.heartRate} BPM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Reasoning & Official E-FIR Document */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Multi-Agent Reasoning Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Multi-Agent AI Pipeline Diagnostics</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Deterministic Guardrails Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">1. Vector Deduplication</span>
                <p className="font-semibold text-emerald-400 text-xs">{currentInc.cacheStatus}</p>
                <p className="text-[10px] text-slate-500">Spatial radius match: 50m</p>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">2. Triage Agent (Gemini Flash)</span>
                <p className="font-semibold text-amber-400 text-xs">{currentInc.triageScore}</p>
                <p className="text-[10px] text-slate-500">Anomaly severity scoring</p>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">3. Judge Agent (Gemini Pro)</span>
                <p className="font-semibold text-blue-400 text-xs">Verified via Blockchain RAG</p>
                <p className="text-[10px] text-slate-500">Anti-hallucination validation</p>
              </div>
            </div>
          </div>

          {/* Formal E-FIR Document Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-100">First Information Report (Draft E-FIR)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Admissible under BNSS / CrPC Code • Requires SHO Signature Token</p>
              </div>

              <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded ${
                shoSigned ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {shoSigned ? 'STATUS: OFFICIALLY LODGED' : 'STATUS: DRAFT AWAITING E-SIGN'}
              </span>
            </div>

            {/* Official Form Document Body */}
            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-400">
                <span>FORM NO. 1 - E-FIR REPORT</span>
                <span>CASE REFERENCE: {currentInc.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">SUBJECT NAME:</span>
                  <span className="font-semibold">{currentInc.touristName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">DECENTRALIZED IDENTITY (DID):</span>
                  <span className="font-semibold text-blue-400">{currentInc.did}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">LOCATION COORDINATES:</span>
                  <span>{currentInc.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">VERIFIED MEDICAL CONTEXT:</span>
                  <span>{currentInc.medicalHistory}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 text-slate-400">
                <span className="text-slate-500 block text-[10px] mb-1">AI AGENT SYNTHESIS STATEMENT:</span>
                <p className="italic bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-slate-300">
                  "Impact anomaly recorded at 12:34 IST. Biometric telemetry indicates elevated heart rate (148 BPM). Medical profile attestation verified via Polygon Consortium Ledger. Draft generated for police review."
                </p>
              </div>

              {shoSigned && (
                <div className="pt-3 border-t border-emerald-900 text-emerald-400 flex items-center justify-between text-xs">
                  <span>Duty SHO Cryptographic Signature: 0x99A8F4...442F</span>
                  <CheckSquare className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {!shoSigned ? (
                <button
                  onClick={handleSignEFIR}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Key className="w-4 h-4" /> Authorize & Lodge E-FIR (Duty SHO Signature Token)
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Ambulance className="w-4 h-4 text-emerald-400" />
                  <span>Units Dispatched: {dispatchedUnit}</span>
                </div>
              )}

              <span className="text-[11px] text-slate-500 font-mono">Consortium Block #889210</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
