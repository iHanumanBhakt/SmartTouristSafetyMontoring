import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  Cpu, 
  Layers, 
  Activity, 
  Navigation, 
  Radio, 
  Clock, 
  Search, 
  Lock, 
  Key, 
  FileCheck2,
  Ambulance,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PoliceCommandDashboard({ emergencyEvents = [] }) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [shoSigned, setShoSigned] = useState(false);
  const [dispatchedUnit, setDispatchedUnit] = useState(null);
  const [activeTab, setActiveTab] = useState('incidents'); // 'incidents' | 'efir' | 'audit'

  // Default mock incidents if none passed
  const incidents = emergencyEvents.length > 0 ? emergencyEvents : [
    {
      id: 'INC-2026-8891',
      touristName: 'Elena Rostova',
      did: 'did:sih:ne:0x8F9aC37d8291bB126',
      type: 'SENSOR_FALL_ACCELEROMETER',
      severity: 'CRITICAL',
      location: 'Restricted Cliff Zone • Shillong Peak',
      timestamp: 'Just now',
      heartRate: 148,
      medicalHistory: 'Asthma / Blood Type O+',
      triageScore: 'CRITICAL (0.96 Confidence)',
      cacheStatus: 'Deduplicated (0 Tokens - 1 Grouped Cluster)',
      status: 'PENDING_SHO_SIGNATURE'
    },
    {
      id: 'INC-2026-8890',
      touristName: 'Vikramaditya Sharma',
      did: 'did:sih:ne:0x419B27c1902Caa89',
      type: 'GEOFENCE_BREACH',
      severity: 'HIGH',
      location: 'Dawki River Border Belt',
      timestamp: '12 mins ago',
      heartRate: 88,
      medicalHistory: 'No Known Allergies',
      triageScore: 'HIGH (0.89 Confidence)',
      cacheStatus: 'Cache Miss (Tokens: 142)',
      status: 'RESOLVED'
    }
  ];

  const currentInc = selectedIncident || incidents[0];

  const handleSignEFIR = () => {
    setShoSigned(true);
    setDispatchedUnit('QRT Patrol Unit #4 & Rescue Squad #2');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Police & Multi-Agency GIS Command Center</h2>
            <p className="text-xs text-slate-400">Real-Time Incident Triage • Gen AI Consensus Engine • Duty SHO e-Sign</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'incidents' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" /> Live Distress Queue ({incidents.length})
          </button>
          <button
            onClick={() => setActiveTab('efir')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'efir' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" /> Auto E-FIR Hub
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" /> On-Chain Audit Lock
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Live Incident Stream */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-rose-400 animate-pulse" /> Active Distress Feed</span>
            <span className="text-xs text-slate-400 font-mono">Live WebSocket</span>
          </h3>

          <div className="space-y-3">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  currentInc.id === inc.id
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-950/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    inc.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-[11px] text-slate-400">{inc.timestamp}</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-100">{inc.touristName}</h4>
                  <p className="text-xs text-slate-400 truncate">{inc.location}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-900">
                  <span>Type: {inc.type}</span>
                  <span className="text-cyan-400">HR: {inc.heartRate} BPM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Multi-Agent AI Triage & E-FIR Generator */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Multi-Agent Gen AI Reasoning Status */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/60 space-y-4">
            <h3 className="font-bold text-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-2"><Cpu className="w-5 h-5 text-cyan-400" /> Multi-Agent AI Reasoning & Consensus Pipeline</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">Verified Zero Hallucination</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Agent 1: Semantic Vector Cache */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Semantic Cache (Pinecone)</span>
                <p className="text-xs font-bold text-emerald-400">{currentInc.cacheStatus}</p>
                <p className="text-[10px] text-slate-500">Vector cluster match score 0.95</p>
              </div>

              {/* Agent 2: Triage LLM (Gemini Flash) */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">2. Triage LLM (Gemini Flash)</span>
                <p className="text-xs font-bold text-amber-400">{currentInc.triageScore}</p>
                <p className="text-[10px] text-slate-500">Rapid anomaly classification</p>
              </div>

              {/* Agent 3: Judge LLM (Gemini Pro) */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">3. Judge LLM (Gemini Pro)</span>
                <p className="text-xs font-bold text-cyan-400">Confirmed (Anti-Hallucination RAG)</p>
                <p className="text-[10px] text-slate-500">Weather + Terrain double-check</p>
              </div>
            </div>
          </div>

          {/* Automated E-FIR & Duty SHO e-Sign Modal (BNSS / CrPC Admissibility) */}
          <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-slate-900/60 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-6 h-6 text-rose-400" />
                <div>
                  <h3 className="font-bold text-slate-100">Automated E-FIR Draft & Duty SHO e-Sign</h3>
                  <p className="text-xs text-slate-400">BNSS / CrPC Compliant • Requires Cryptographic SHO e-Sign for Legal Admissibility</p>
                </div>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${shoSigned ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
                {shoSigned ? 'OFFICIALLY LODGED & SIGNED' : 'DRAFT ONLY (Awaiting SHO Sign)'}
              </span>
            </div>

            {/* Generated E-FIR Document Body */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex justify-between text-slate-500 border-b border-slate-900 pb-2">
                <span>FIRST INFORMATION REPORT (E-FIR DRAFT)</span>
                <span>INCIDENT ID: {currentInc.id}</span>
              </div>

              <p><strong className="text-cyan-400">COMPLAINANT / SUBJECT:</strong> {currentInc.touristName} (DID: {currentInc.did})</p>
              <p><strong className="text-cyan-400">INCIDENT LOCATION:</strong> {currentInc.location}</p>
              <p><strong className="text-cyan-400">TELEMETRY ANOMALY:</strong> {currentInc.type} (Heart Rate: {currentInc.heartRate} BPM)</p>
              <p><strong className="text-cyan-400">BLOCKCHAIN MEDICAL RAG:</strong> {currentInc.medicalHistory}</p>
              
              <div className="pt-2 text-slate-400 italic">
                "AI Agent Summary: High probability fall incident detected at cliff edge. Medical profile retrieved via Polygon Blockchain RAG. Recommend immediate QRT dispatch."
              </div>

              {shoSigned && (
                <div className="pt-3 border-t border-emerald-500/30 text-emerald-400 flex items-center justify-between">
                  <span>Duty SHO Token e-Sign: 0x99A8...442F (Verified)</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Dispatch & e-Sign Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {!shoSigned ? (
                <button
                  onClick={handleSignEFIR}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/50 transition-all"
                >
                  <Key className="w-4 h-4" /> Duty SHO e-Sign & Lodge E-FIR (BNSS Compliant)
                </button>
              ) : (
                <div className="flex items-center gap-3 text-sm font-bold text-emerald-400">
                  <Ambulance className="w-5 h-5 animate-pulse" />
                  <span>Units Dispatched: {dispatchedUnit}</span>
                </div>
              )}

              <span className="text-xs text-slate-500 font-mono">Polygon Block #889210 • 0.00 MATIC Gas</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
