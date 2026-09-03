import React, { useState } from 'react';
import { 
  mintTouristDigitalID, 
  verifyDigitalID, 
  getLedger, 
  getIncidentsOnChain,
  logIncidentOnChain,
  updateIncidentStateOnChain,
  attachEvidenceHashOnChain,
  getAuditLogs,
  BLOCKCHAIN_NETWORK 
} from '../services/blockchainService';
import DigitalIDCard from './DigitalIDCard';
import { 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Lock, 
  Cpu, 
  Layers, 
  RefreshCw, 
  Clock, 
  Activity,
  FileCheck,
  Building2,
  Users,
  Eye,
  PlusCircle,
  Zap,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigitalIDPortal({ activeTab, setActiveTab }) {
  // Form State for Minting
  const [formData, setFormData] = useState({
    touristName: '',
    nationality: 'India',
    documentType: 'AADHAAR',
    documentId: '',
    emergencyContactName: '',
    emergencyPhone: '',
    validFrom: new Date().toISOString().split('T')[0],
    validTo: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    itinerary: 'Guwahati, Shillong, Cherrapunji, Dawki',
    issuingPoint: 'Guwahati Airport Entry Checkpoint',
    medicalAlerts: 'None',
    ageGroup: '25-34'
  });

  const [isMinting, setIsMinting] = useState(false);
  const [mintedCard, setMintedCard] = useState(null);

  // Search/Verification State
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Incident Lifecycle Simulation State
  const [incidents, setIncidents] = useState(getIncidentsOnChain());
  const [auditLogs, setAuditLogs] = useState(getAuditLogs());
  const [evidenceFileName, setEvidenceFileName] = useState('');
  const [selectedIncidentForEvidence, setSelectedIncidentForEvidence] = useState(incidents[0]?.incidentId || '');

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Minting
  const handleMintSubmit = (e) => {
    e.preventDefault();
    setIsMinting(true);

    setTimeout(() => {
      const newPass = mintTouristDigitalID(formData);
      setIsMinting(false);
      setMintedCard(newPass);
      setAuditLogs(getAuditLogs());
    }, 1200);
  };

  // Execute Verification Search
  const handleVerifySearch = (queryToUse) => {
    const q = queryToUse || searchQuery;
    if (!q) return;
    setHasSearched(true);
    const result = verifyDigitalID(q);
    setVerificationResult(result);
    setAuditLogs(getAuditLogs());
  };

  const handleQuickDemoVerify = (did) => {
    setSearchQuery(did);
    handleVerifySearch(did);
  };

  // Trigger New Test Incident (Smart Contract Event Simulation)
  const handleTriggerTestSOS = () => {
    const newInc = logIncidentOnChain({
      touristDID: ledger[0]?.did || "did:sih:ne:0x7a8f9c1d2e3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f",
      incidentType: "DISTRESS_SOS_BUTTON",
      locationCoordinates: { lat: 25.5788, lng: 91.8933, name: "Shillong Peak Trail, Meghalaya" },
      note: "Manual SOS Panic button pressed by tourist."
    });
    setIncidents(getIncidentsOnChain());
    setAuditLogs(getAuditLogs());
  };

  // State Transition (SOS -> VERIFICATION -> RESPONSE -> RESOLVED -> CLOSED)
  const handleTransitionState = (incidentId, newState) => {
    updateIncidentStateOnChain(incidentId, newState, "Consortium Command Node", `Lifecycle state transitioned to ${newState}`);
    setIncidents(getIncidentsOnChain());
    setAuditLogs(getAuditLogs());
  };

  // Attach Evidence Hash
  const handleAttachEvidence = (e) => {
    e.preventDefault();
    if (!evidenceFileName || !selectedIncidentForEvidence) return;
    attachEvidenceHashOnChain(selectedIncidentForEvidence, "DOCUMENT_EVIDENCE_HASH", evidenceFileName, "Investigator Node");
    setEvidenceFileName('');
    setIncidents(getIncidentsOnChain());
    setAuditLogs(getAuditLogs());
  };

  const ledger = getLedger();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Overview */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden border border-cyan-500/20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sovereign Tourist Identification Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Blockchain Digital Tourist ID & Verification Platform
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Issues tamper-proof Decentralized Identifiers (DIDs) at airports, hotel check-ins, and border posts. Enforces Zero-Knowledge privacy & automatic visit duration expiry for tourist safety across high-risk travel corridors.
            </p>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <span className="text-[11px] font-mono text-slate-400 block">Total Issued DIDs</span>
              <span className="text-xl font-mono font-bold text-cyan-400">{ledger.length}</span>
            </div>
            <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <span className="text-[11px] font-mono text-slate-400 block">Smart Contract</span>
              <span className="text-xs font-mono font-semibold text-emerald-400 truncate block max-w-[100px]">
                {BLOCKCHAIN_NETWORK.smartContractAddress.substring(0, 10)}...
              </span>
            </div>
            <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl col-span-2 sm:col-span-1">
              <span className="text-[11px] font-mono text-slate-400 block">Verification Speed</span>
              <span className="text-xl font-mono font-bold text-amber-400">&lt; 0.4s</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Bar for 4 Compliance Views */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('mint')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'mint'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 1. Issue Digital ID (ZKP)
          </button>

          <button
            onClick={() => setActiveTab('verify')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'verify'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" /> 2. Authority Verification Scanner
          </button>

          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'lifecycle'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" /> 3. Incident Lifecycle & Smart Contracts
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'ledger'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> 4. Audit Trail & Consortium Ledger
          </button>
        </div>
      </div>

      {/* 1. MINT TAB */}
      {activeTab === 'mint' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-950 text-cyan-400 rounded-xl border border-cyan-800/80">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Entry Point Tourist Registration</h2>
                  <p className="text-xs text-slate-400 font-mono">Issue On-Chain Verifiable Digital Pass</p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                Off-Chain PII + On-Chain Hashes
              </span>
            </div>

            <form onSubmit={handleMintSubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                  1. Tourist KYC & Personal Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Full Name (as per Passport/Aadhaar)</span>
                    <input
                      type="text"
                      name="touristName"
                      required
                      value={formData.touristName}
                      onChange={handleChange}
                      placeholder="e.g. Elena Rostova / Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Nationality</span>
                    <input
                      type="text"
                      name="nationality"
                      required
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="e.g. India / Germany / Japan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">KYC Document Type</span>
                    <select
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                    >
                      <option value="AADHAAR">Aadhaar Card (Domestic)</option>
                      <option value="PASSPORT">International Passport</option>
                      <option value="VOTER_ID">Voter ID Card</option>
                      <option value="DRIVING_LICENSE">Driving License</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Document ID Number</span>
                    <input
                      type="text"
                      name="documentId"
                      required
                      value={formData.documentId}
                      onChange={handleChange}
                      placeholder="e.g. 5891-2384-9012 or Z8912301"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                  2. Emergency Contact & Medical Alerts
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Emergency Contact Name</span>
                    <input
                      type="text"
                      name="emergencyContactName"
                      required
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      placeholder="e.g. Hans Rostova (Father)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Emergency Phone Number</span>
                    <input
                      type="text"
                      name="emergencyPhone"
                      required
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                  3. Trip Itinerary & Entry Checkpoint
                </label>
                <div>
                  <span className="text-xs text-slate-300 mb-1 block">Authorized Tour Destinations</span>
                  <input
                    type="text"
                    name="itinerary"
                    required
                    value={formData.itinerary}
                    onChange={handleChange}
                    placeholder="e.g. Guwahati, Shillong, Cherrapunji, Kaziranga"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Valid From</span>
                    <input
                      type="date"
                      name="validFrom"
                      required
                      value={formData.validFrom}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Valid Until (Expiry)</span>
                    <input
                      type="date"
                      name="validTo"
                      required
                      value={formData.validTo}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 mb-1 block">Issuing Counter</span>
                    <select
                      name="issuingPoint"
                      value={formData.issuingPoint}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                    >
                      <option value="Guwahati Airport Entry Checkpoint">Guwahati Airport</option>
                      <option value="Shillong Tourist Information Hub">Shillong Hub</option>
                      <option value="Tawang Border Security Post">Tawang Border Post</option>
                      <option value="Kaziranga Safari Registry Desk">Kaziranga Desk</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isMinting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-950/60 transition disabled:opacity-50"
                >
                  {isMinting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Minting Smart Contract & DID on Polygon Ledger...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-cyan-200" />
                      <span>Execute Smart Contract & Mint Digital ID</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-4 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Zero-Knowledge (ZKP) Identity Privacy</h3>
                  <p className="text-xs text-slate-400">DPDP Act Compliant Architecture</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Raw Aadhaar and Passport numbers are <strong className="text-emerald-400">never stored in plain text</strong> on the shared blockchain ledger. Only cryptographic SHA-256 hashes and verifiable ZKP seals are anchored.
              </p>

              <div className="space-y-2 text-xs font-mono bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Off-Chain Data:</span>
                  <span className="text-cyan-400 font-semibold">Sensitive PII & Docs</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>On-Chain Data:</span>
                  <span className="text-emerald-400 font-semibold">DID, Hashes & ZKP Seal</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Expiry Enforcement:</span>
                  <span className="text-amber-400 font-semibold">Automated Smart Contract Expiry</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Quick Demo Presets
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => setFormData({
                    touristName: 'Elena Rostova',
                    nationality: 'Germany',
                    documentType: 'PASSPORT',
                    documentId: 'DE9821738',
                    emergencyContactName: 'Hans Rostova (Father)',
                    emergencyPhone: '+49 170 9823145',
                    validFrom: '2026-09-01',
                    validTo: '2026-09-15',
                    itinerary: 'Guwahati, Shillong, Cherrapunji, Dawki',
                    issuingPoint: 'Guwahati Airport Entry Checkpoint',
                    medicalAlerts: 'Penicillin Allergy',
                    ageGroup: '25-34'
                  })}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs transition space-y-1"
                >
                  <div className="flex justify-between items-center font-semibold text-slate-200">
                    <span>Elena Rostova (International Tourist)</span>
                    <span className="text-[10px] text-cyan-400 font-mono">Germany</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Passport DE9821738 • Guwahati &rarr; Shillong &rarr; Dawki</p>
                </button>

                <button
                  onClick={() => setFormData({
                    touristName: 'Rahul Sharma',
                    nationality: 'India',
                    documentType: 'AADHAAR',
                    documentId: '5819-4819-2019',
                    emergencyContactName: 'Priya Sharma (Wife)',
                    emergencyPhone: '+91 98765 43210',
                    validFrom: '2026-09-01',
                    validTo: '2026-09-10',
                    itinerary: 'Tezpur, Bomdila, Tawang Trek',
                    issuingPoint: 'Tawang Border Security Post',
                    medicalAlerts: 'Asthma (Carries Inhaler)',
                    ageGroup: '35-44'
                  })}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs transition space-y-1"
                >
                  <div className="flex justify-between items-center font-semibold text-slate-200">
                    <span>Rahul Sharma (High-Altitude Trekker)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Domestic</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Aadhaar 5819-XXXX-2019 • Tezpur &rarr; Tawang Trek</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VERIFY TAB */}
      {activeTab === 'verify' && (
        <div className="space-y-8">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-950 text-cyan-400 rounded-xl border border-cyan-800">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Authority Verification & QR Scanner</h2>
                <p className="text-xs text-slate-400">For Police Patrols, Hotel Reception, and Checkpoint Border Security</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifySearch()}
                  placeholder="Enter DID (e.g. did:sih:ne:0x...), Transaction Hash, or Tourist Name..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <button
                onClick={() => handleVerifySearch()}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 transition"
              >
                <Search className="w-4 h-4" />
                Verify On-Chain
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-2">
              <span className="text-slate-400 font-mono">Sample DIDs:</span>
              {ledger.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickDemoVerify(item.did)}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 font-mono text-[11px] transition"
                >
                  {item.publicData.touristName} ({item.did.substring(0, 16)}...)
                </button>
              ))}
            </div>
          </div>

          {hasSearched && (
            <div>
              {verificationResult ? (
                <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/40 space-y-6 bg-slate-900/80">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
                        <CheckCircle2 className="w-8 h-8 animate-bounce" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-100">AUTHENTIC & VALID DIGITAL PASS</h3>
                          <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            STATUS: {verificationResult.verificationStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          Cryptographically Verified on Polygon PoS Block #{verificationResult.blockNumber}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setMintedCard(verificationResult)}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800 transition"
                    >
                      View Digital Pass Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Tourist Identity</span>
                      <p className="font-bold text-slate-100 text-base">{verificationResult.publicData.touristName}</p>
                      <p className="text-xs text-slate-300">{verificationResult.publicData.nationality} • {verificationResult.publicData.documentType}</p>
                      <p className="text-xs font-mono text-cyan-400">{verificationResult.publicData.documentIdMasked}</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Validity & Permit</span>
                      <p className="text-xs font-mono text-emerald-400">Valid From: {verificationResult.validFrom}</p>
                      <p className="text-xs font-mono text-amber-400">Valid To: {verificationResult.validTo}</p>
                      <p className="text-xs text-slate-400">Issued By: {verificationResult.issuedBy}</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Emergency Contacts</span>
                      <p className="text-xs font-bold text-slate-200">{verificationResult.publicData.emergencyContactName}</p>
                      <p className="text-xs font-mono text-rose-400">{verificationResult.publicData.emergencyPhone}</p>
                      <p className="text-xs text-amber-300">Alerts: {verificationResult.publicData.medicalAlerts}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-8 border border-rose-500/40 text-center space-y-3 bg-rose-950/10">
                  <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto animate-pulse" />
                  <h3 className="text-lg font-bold text-slate-100">VERIFICATION FAILED / NOT FOUND ON-CHAIN</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    No matching tourist record found for query: <strong className="text-rose-400 font-mono">{searchQuery}</strong>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. INCIDENT LIFECYCLE & SMART CONTRACTS TAB */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-8">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-950 text-cyan-400 rounded-xl border border-cyan-800">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Transparent Incident Lifecycle & Smart Contracts</h2>
                  <p className="text-xs text-slate-400">Tracks SOS alerts, automated dispatch events, state transitions, and evidence hashes on-chain</p>
                </div>
              </div>

              <button
                onClick={handleTriggerTestSOS}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs shadow-lg shadow-rose-950/50 hover:from-rose-500 hover:to-amber-500 transition"
              >
                <Zap className="w-4 h-4" /> Trigger Smart Contract SOS Event
              </button>
            </div>

            {/* Lifecycle Stages Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono pt-2">
              <div className="p-2 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-lg">1. SOS_TRIGGERED</div>
              <div className="p-2 bg-amber-950/60 border border-amber-800 text-amber-300 rounded-lg">2. VERIFICATION</div>
              <div className="p-2 bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded-lg">3. RESPONSE</div>
              <div className="p-2 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-lg">4. RESOLVED</div>
              <div className="p-2 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg">5. CLOSED</div>
            </div>
          </div>

          {/* Incidents On-Chain List */}
          <div className="space-y-6">
            {incidents.map((inc, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
                
                {/* Incident Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-100 text-lg">{inc.incidentId}</span>
                      <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">
                        {inc.currentLifecycleState}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Target DID: {inc.touristDID} • Location Hash: <span className="text-cyan-400">{inc.locationHash}</span>
                    </p>
                  </div>

                  {/* Transition Controls */}
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <button
                      onClick={() => handleTransitionState(inc.incidentId, 'VERIFICATION')}
                      className="px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded hover:bg-amber-900 transition"
                    >
                      Set VERIFICATION
                    </button>
                    <button
                      onClick={() => handleTransitionState(inc.incidentId, 'RESPONSE')}
                      className="px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded hover:bg-cyan-900 transition"
                    >
                      Set RESPONSE
                    </button>
                    <button
                      onClick={() => handleTransitionState(inc.incidentId, 'RESOLVED')}
                      className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded hover:bg-emerald-900 transition"
                    >
                      Set RESOLVED
                    </button>
                  </div>
                </div>

                {/* Response Updates Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Immutable State Transition History
                  </h4>
                  <div className="space-y-2 font-mono text-xs">
                    {inc.responseUpdates.map((upd, uIdx) => (
                      <div key={uIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                        <div>
                          <span className="text-cyan-400 font-bold">[{upd.state}]</span>{" "}
                          <span className="text-slate-200">{upd.note}</span>
                          <div className="text-[10px] text-slate-500 mt-0.5">Actor: {upd.actor}</div>
                        </div>
                        <span className="text-[10px] text-slate-400">{new Date(upd.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Hashes Section */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    On-Chain Document & Evidence Hashes (Off-Chain Data + On-Chain Proof)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {inc.evidenceHashes?.map((ev, eIdx) => (
                      <div key={eIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                        <div className="flex justify-between text-slate-300 font-bold">
                          <span>{ev.docType}</span>
                          <span className="text-emerald-400">HASH VERIFIED</span>
                        </div>
                        <p className="text-[11px] text-cyan-400 truncate">{ev.hash}</p>
                        <p className="text-[10px] text-slate-500">Uploaded by: {ev.uploadedBy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Attach Evidence Form */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              Attach Evidence Hash to On-Chain Incident
            </h3>

            <form onSubmit={handleAttachEvidence} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-slate-400 mb-1 block">Select Incident</span>
                <select
                  value={selectedIncidentForEvidence}
                  onChange={(e) => setSelectedIncidentForEvidence(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl focus:outline-none focus:border-cyan-500"
                >
                  {incidents.map((i) => (
                    <option key={i.incidentId} value={i.incidentId}>
                      {i.incidentId} ({i.currentLifecycleState})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-xs text-slate-400 mb-1 block">Document / Evidence Name</span>
                <input
                  type="text"
                  value={evidenceFileName}
                  onChange={(e) => setEvidenceFileName(e.target.value)}
                  placeholder="e.g. CCTV_Shillong_Peak_1420.mp4 / E_FIR_Report.pdf"
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-cyan-950/50"
                >
                  Anchor Hash On-Chain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. AUDIT TRAIL & CONSORTIUM LEDGER TAB */}
      {activeTab === 'ledger' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-950 text-cyan-400 rounded-xl border border-cyan-800">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Audit Trail & Sovereign Consortium Ledger</h2>
                <p className="text-xs text-slate-400 font-mono">Multi-Agency Stakeholders: Police, Tourism, Hospitals & Border Patrol</p>
              </div>
            </div>
          </div>

          {/* Consortium Stakeholder Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BLOCKCHAIN_NETWORK.stakeholders.map((node, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="truncate">{node}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono block">Node Status: ONLINE</span>
              </div>
            ))}
          </div>

          {/* Audit Logs Table */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              Immutable Access Control & Audit Log (Who accessed what)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Actor / Agency</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Target DID / Resource</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {auditLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition">
                      <td className="p-3 font-bold text-cyan-400">{log.logId}</td>
                      <td className="p-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="p-3 text-slate-200">{log.actorAgency}</td>
                      <td className="p-3 font-bold text-amber-400">{log.action}</td>
                      <td className="p-3 text-cyan-300 truncate max-w-[150px]">{log.targetDID}</td>
                      <td className="p-3 text-slate-400">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {mintedCard && (
        <DigitalIDCard idData={mintedCard} onClose={() => setMintedCard(null)} />
      )}
    </div>
  );
}
