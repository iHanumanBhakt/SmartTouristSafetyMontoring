import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Radio, 
  Key, 
  Ambulance, 
  Building,
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
      triageScore: 'CRITICAL (0.96)',
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
      triageScore: 'HIGH (0.89)',
      cacheStatus: 'Cache Miss (142 Tokens)',
      status: 'RESOLVED'
    }
  ];

  const currentInc = selectedIncident || incidents[0];

  const handleSignEFIR = () => {
    setShoSigned(true);
    setDispatchedUnit('Patrol Squad #4 & Rescue Medical Unit #2');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Command Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-100">Police GIS & Dispatch Command Center</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                Authorized Node
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              BNSS / CrPC Compliant E-FIR Framework • Multi-Agent AI Consensus Engine
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'queue' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Distress Queue ({incidents.length})
          </button>
          <button
            onClick={() => setActiveTab('efir')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'efir' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Official E-FIR Hub
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${
              activeTab === 'audit' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            On-Chain Audit Log
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Distress Queue */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-rose-500" /> Active Distress Queue
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Live Stream</span>
          </div>

          <div className="space-y-2.5">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer space-y-2 ${
                  currentInc.id === inc.id
                    ? 'bg-zinc-800/80 border-zinc-700 text-zinc-100'
                    : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                    inc.severity === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{inc.timestamp}</span>
                </div>

                <div>
                  <h4 className="font-semibold text-xs text-zinc-200">{inc.touristName}</h4>
                  <p className="text-[11px] text-zinc-500 truncate">{inc.location}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-900 pt-1.5">
                  <span>Type: {inc.type}</span>
                  <span className="text-zinc-300">HR: {inc.heartRate} BPM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Reasoning & E-FIR Review */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Multi-Agent Reasoning Panel */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-400" />
                <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">Multi-Agent AI Pipeline Diagnostics</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Guardrails Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">1. Vector Deduplication</span>
                <p className="font-semibold text-emerald-400 text-xs">{currentInc.cacheStatus}</p>
                <p className="text-[10px] text-zinc-500">Spatial radius: 50m</p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">2. Triage LLM (Flash)</span>
                <p className="font-semibold text-amber-400 text-xs">{currentInc.triageScore}</p>
                <p className="text-[10px] text-zinc-500">Severity scoring</p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">3. Judge LLM (Pro)</span>
                <p className="font-semibold text-zinc-200 text-xs">Blockchain RAG Verified</p>
                <p className="text-[10px] text-zinc-500">Anti-hallucination check</p>
              </div>
            </div>
          </div>

          {/* Minimalist E-FIR Box */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">First Information Report (Draft E-FIR)</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Admissible under BNSS / CrPC Code • Requires Duty SHO Signature</p>
              </div>

              <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded ${
                shoSigned ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {shoSigned ? 'STATUS: OFFICIALLY LODGED' : 'STATUS: DRAFT AWAITING E-SIGN'}
              </span>
            </div>

            {/* Official Document Body */}
            <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-4 text-xs font-mono text-zinc-300">
              <div className="flex justify-between border-b border-zinc-900 pb-2 text-zinc-500">
                <span>FORM NO. 1 - E-FIR REPORT</span>
                <span>CASE ID: {currentInc.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                <div>
                  <span className="text-zinc-500 block text-[10px]">SUBJECT NAME:</span>
                  <span className="font-semibold">{currentInc.touristName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">DECENTRALIZED IDENTITY (DID):</span>
                  <span className="font-mono text-zinc-300">{currentInc.did}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">LOCATION COORDINATES:</span>
                  <span>{currentInc.location}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">VERIFIED MEDICAL CONTEXT:</span>
                  <span>{currentInc.medicalHistory}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-900 text-zinc-400">
                <span className="text-zinc-500 block text-[10px] mb-1">AI SYNTHESIS STATEMENT:</span>
                <p className="italic bg-zinc-900/80 p-2.5 rounded border border-zinc-800/80 text-[11px] text-zinc-300">
                  "Impact anomaly recorded at 12:34 IST. Biometric telemetry indicates elevated heart rate (148 BPM). Medical profile attestation verified via Polygon Consortium Ledger. Draft generated for police review."
                </p>
              </div>

              {shoSigned && (
                <div className="pt-3 border-t border-emerald-500/20 text-emerald-400 flex items-center justify-between text-xs">
                  <span>Duty SHO Cryptographic Signature: 0x99A8F4...442F</span>
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {!shoSigned ? (
                <button
                  onClick={handleSignEFIR}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Key className="w-4 h-4" /> Duty SHO e-Sign & Lodge E-FIR (BNSS)
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Ambulance className="w-4 h-4 text-emerald-400" />
                  <span>Units Dispatched: {dispatchedUnit}</span>
                </div>
              )}

              <span className="text-[11px] text-zinc-500 font-mono">Polygon Block #889210</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
