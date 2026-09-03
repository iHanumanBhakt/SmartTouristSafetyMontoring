import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Lock, Calendar, MapPin, User, Phone, Cpu, CheckCircle2, AlertTriangle, Download, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigitalIDCard({ idData, onClose }) {
  if (!idData) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownload = () => {
    window.print();
  };

  const qrPayload = JSON.stringify({
    did: idData.did,
    txHash: idData.txHash,
    kycHash: idData.kycHash,
    touristName: idData.publicData?.touristName,
    validTo: idData.validTo,
    emergencyPhone: idData.publicData?.emergencyPhone,
    status: idData.status
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in duration-200">
        
        {/* Top Glow & Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                Blockchain Tourist Digital Pass
                <span className="px-2 py-0.5 text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-md">
                  VERIFIED ON-CHAIN
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Sovereign Smart Contract • Ministry of Tourism & Police Node
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Digital Pass Card Container */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 p-6 shadow-inner relative overflow-hidden">
          
          {/* Watermark Background Icon */}
          <div className="absolute -right-8 -bottom-8 opacity-5 text-cyan-400 pointer-events-none">
            <ShieldCheck className="w-64 h-64" />
          </div>

          {/* Card Top Row: Status & DID */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Decentralized Identifier (DID)</span>
              <span className="text-xs font-mono font-bold text-cyan-400 break-all">
                {idData.did}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {idData.status || "VALID"}
              </span>
            </div>
          </div>

          {/* Card Main Body: QR & Key Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-5 items-center">
            
            {/* QR Code Column */}
            <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-lg border border-slate-200">
              <QRCodeSVG
                value={qrPayload}
                size={140}
                level="H"
                includeMargin={true}
              />
              <span className="text-[10px] text-slate-700 font-mono font-semibold mt-1">
                SCAN TO VERIFY ZKP
              </span>
            </div>

            {/* Tourist Details Column */}
            <div className="sm:col-span-2 space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase">Tourist Full Name</span>
                <p className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  {idData.publicData?.touristName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Nationality</span>
                  <p className="font-semibold text-slate-200">{idData.publicData?.nationality}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">KYC Doc Masked</span>
                  <p className="font-mono font-semibold text-cyan-300">{idData.publicData?.documentIdMasked}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Valid From</span>
                  <p className="font-mono text-emerald-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {idData.validFrom}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Valid Until</span>
                  <p className="font-mono text-amber-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {idData.validTo}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary & Emergency Contacts */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Authorized Itinerary
              </span>
              <div className="flex flex-wrap gap-1">
                {idData.publicData?.itinerary?.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-300 rounded border border-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase flex items-center gap-1 mb-1">
                <Phone className="w-3 h-3 text-rose-400" /> Emergency Contact
              </span>
              <p className="font-semibold text-slate-200">
                {idData.publicData?.emergencyContactName}
              </p>
              <p className="font-mono text-slate-400 text-[11px]">
                {idData.publicData?.emergencyPhone}
              </p>
            </div>
          </div>

          {/* Blockchain Hashes & ZKP Seal */}
          <div className="mt-4 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[10px] font-mono space-y-1">
            <div className="flex justify-between items-center text-slate-400">
              <span>Tx Hash:</span>
              <span className="text-cyan-400 truncate max-w-[260px]">{idData.txHash}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Issued By:</span>
              <span className="text-slate-300">{idData.issuedBy}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <Lock className="w-3 h-3" /> ZK-Proof Hash
              </span>
              <span className="text-emerald-400">{idData.zeroKnowledgeProof?.zkHash}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            onClick={triggerConfetti}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            🎉 Celebrate Verification
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/60 transition-all"
            >
              <Download className="w-4 h-4" />
              Download / Print Digital Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
