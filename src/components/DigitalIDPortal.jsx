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
    }, 1000);
  };

  // Search DID/Hash
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const result = verifyDigitalID(searchQuery.trim());
    setVerificationResult(result);
    setHasSearched(true);
  };

  const ledger = getLedger();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab('mint')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'mint'
                ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Issue Digital ID
          </button>

          <button
            onClick={() => setActiveTab('verify')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'verify'
                ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Authority Verification
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'ledger'
                ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Consortium Ledger Explorer
          </button>
        </div>

        <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
          Polygon PoA • 0.00 MATIC Gas
        </span>
      </div>

      {/* TAB 1: ISSUE DIGITAL ID FORM */}
      {activeTab === 'mint' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Minting Form */}
          <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-6">
            <div className="border-b border-zinc-800/80 pb-4">
              <h2 className="text-base font-semibold text-zinc-100">Issue Verifiable Digital Tourist ID</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Generates W3C DID & SHA-256 ZKP Hash on Polygon Consortium Chain</p>
            </div>

            <form onSubmit={handleMintSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Tourist Full Name *</label>
                  <input
                    type="text"
                    name="touristName"
                    required
                    value={formData.touristName}
                    onChange={handleChange}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Nationality *</label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Identity Document Type *</label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-700"
                  >
                    <option value="AADHAAR">Aadhaar Card (UIDAI Hash)</option>
                    <option value="PASSPORT">International Passport</option>
                    <option value="DRIVING_LICENSE">Driving License</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Document Number (Encrypted Off-Chain) *</label>
                  <input
                    type="text"
                    name="documentId"
                    required
                    value={formData.documentId}
                    onChange={handleChange}
                    placeholder="e.g. 5891-2091-8821"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Emergency Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    required
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="e.g. Victor Rostova (Father)"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Emergency Phone Number *</label>
                  <input
                    type="text"
                    name="emergencyPhone"
                    required
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98210-99821"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Itinerary Duration *</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      name="validFrom"
                      value={formData.validFrom}
                      onChange={handleChange}
                      className="w-1/2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 font-mono"
                    />
                    <input
                      type="date"
                      name="validTo"
                      value={formData.validTo}
                      onChange={handleChange}
                      className="w-1/2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Issuing Checkpoint *</label>
                  <input
                    type="text"
                    name="issuingPoint"
                    value={formData.issuingPoint}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100"
                  />
                </div>
              </div>

              {/* Sample Preset Selector */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-zinc-500 block mb-2">OR SELECT PRESET TEST DATA:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      touristName: 'Elena Rostova',
                      nationality: 'Russian Federation',
                      documentType: 'PASSPORT',
                      documentId: 'DE9821738',
                      emergencyContactName: 'Embassy Contact',
                      emergencyPhone: '+91 98112-99001',
                      validFrom: '2026-09-01',
                      validTo: '2026-09-14',
                      itinerary: 'Guwahati → Shillong → Dawki',
                      issuingPoint: 'Guwahati Airport Entry Gate',
                      medicalAlerts: 'Asthma',
                      ageGroup: '25-34'
                    })}
                    className="px-2.5 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-[11px]"
                  >
                    Preset: Foreign Tourist (Elena)
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({
                      touristName: 'Vikramaditya Sharma',
                      nationality: 'India',
                      documentType: 'AADHAAR',
                      documentId: '4982-1092-8821',
                      emergencyContactName: 'Sunita Sharma (Wife)',
                      emergencyPhone: '+91 98765-43210',
                      validFrom: '2026-09-01',
                      validTo: '2026-09-07',
                      itinerary: 'Guwahati → Tawang → Kaziranga',
                      issuingPoint: 'Airport Checkpost #2',
                      medicalAlerts: 'None',
                      ageGroup: '35-44'
                    })}
                    className="px-2.5 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-[11px]"
                  >
                    Preset: Domestic Tourist (Vikram)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isMinting}
                className="w-full py-3 mt-4 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                {isMinting ? 'Minting Blockchain DID...' : 'Mint Sovereign Digital Tourist ID (Polygon PoA)'}
              </button>
            </form>
          </div>

          {/* Right Column: Node Info & DPDP Compliance Box */}
          <div className="space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> DPDP Act 2023 Compliance
              </h3>

              <div className="space-y-3 text-xs text-zinc-400">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1">
                  <span className="font-semibold text-zinc-200 block">Off-Chain Vault Storage</span>
                  <p className="text-[11px] text-zinc-500">Raw Aadhaar/Passport numbers are encrypted and saved in an off-chain database. Never exposed on-chain.</p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1">
                  <span className="font-semibold text-zinc-200 block">Zero-Knowledge Proof (ZKP)</span>
                  <p className="text-[11px] text-zinc-500">Checkposts verify QR passes using SHA-256 math without transmitting personal details.</p>
                </div>

                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-1">
                  <span className="font-semibold text-zinc-200 block">Ephemeral Credential TTL</span>
                  <p className="text-[11px] text-zinc-500">Digital IDs auto-expire at itinerary end date, triggering automatic key revocation.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: AUTHORITY VERIFICATION SCANNER */}
      {activeTab === 'verify' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4 text-center">
            <h2 className="text-base font-semibold text-zinc-100">Checkpost & Hotel Identity Verification</h2>
            <p className="text-xs text-zinc-500">Enter Tourist DID (`did:sih:ne:0x...`) or SHA-256 Hash to verify active status</p>

            <form onSubmit={handleSearch} className="flex gap-2 pt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Paste DID or SHA-256 Hash..."
                className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs rounded-lg transition-colors"
              >
                Verify Pass
              </button>
            </form>

            {/* Quick Demo Pre-fill */}
            <div className="flex justify-center gap-2 text-[11px] font-mono text-zinc-500">
              <span>DEMO DIDs:</span>
              <button
                onClick={() => setSearchQuery('did:sih:ne:0x8F9aC37d8291bB126')}
                className="underline hover:text-zinc-300"
              >
                did:sih:ne:0x8F9a... (Elena)
              </button>
              <span>•</span>
              <button
                onClick={() => setSearchQuery('did:sih:ne:0x419B27c1902Caa89')}
                className="underline hover:text-zinc-300"
              >
                did:sih:ne:0x419B... (Vikram)
              </button>
            </div>
          </div>

          {/* Verification Results Card */}
          {hasSearched && verificationResult && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
              {verificationResult.valid ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>AUTHENTIC VERIFIED DIGITAL TOURIST PASS (VALID ON CONSORTIUM LEDGER)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-300 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">TOURIST NAME:</span>
                      <span className="font-bold text-sm text-zinc-100">{verificationResult.data.publicData?.touristName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">VALIDITY PERIOD:</span>
                      <span>{verificationResult.data.validTo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">ISSUING POINT:</span>
                      <span>{verificationResult.data.publicData?.issuingPoint}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">EMERGENCY PHONE:</span>
                      <span>{verificationResult.data.publicData?.emergencyPhone}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs font-semibold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>INVALID OR EXPIRED DIGITAL PASS. NOT FOUND ON BLOCKCHAIN LEDGER.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONSORTIUM LEDGER EXPLORER TABLE */}
      {activeTab === 'ledger' && (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div>
              <h2 className="text-base font-semibold text-zinc-100">Polygon Consortium Block Explorer</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Immutable Transaction Stream Across Multi-Agency Nodes</p>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1 rounded border border-zinc-800">
              Total Blocks: {ledger.length}
            </span>
          </div>

          {/* Minimalist Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                  <th className="py-2.5 px-3">Block #</th>
                  <th className="py-2.5 px-3">Event Type</th>
                  <th className="py-2.5 px-3">DID / Subject</th>
                  <th className="py-2.5 px-3">Transaction Hash</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {ledger.map((block) => (
                  <tr key={block.blockNumber} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-3 text-zinc-400 font-bold">#{block.blockNumber}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-200 border border-zinc-700">
                        {block.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-100">{block.did?.substring(0, 18)}...</td>
                    <td className="py-3 px-3 text-zinc-400">{block.txHash?.substring(0, 20)}...</td>
                    <td className="py-3 px-3 text-zinc-500">{new Date(block.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Popup for Minted Card */}
      {mintedCard && (
        <DigitalIDCard idData={mintedCard} onClose={() => setMintedCard(null)} />
      )}
    </div>
  );
}
