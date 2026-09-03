import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Lock, Calendar, MapPin, User, Phone, CheckCircle2, Download, Building2 } from 'lucide-react';

export default function DigitalIDCard({ idData, onClose }) {
  if (!idData) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">National Verifiable Digital Pass</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  VERIFIED ON-CHAIN
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Consortium Ledger • W3C DID Standard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded bg-slate-800 transition-colors text-xs font-bold"
          >
            ✕ Close
          </button>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          
          {/* QR Code */}
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-700">
            <QRCodeSVG value={qrPayload} size={130} level="H" includeMargin={true} />
            <span className="text-[9px] font-mono text-slate-700 font-bold mt-1">OFFLINE SCANNABLE</span>
          </div>

          {/* Details */}
          <div className="sm:col-span-2 space-y-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Tourist Name:</span>
              <span className="font-bold text-sm text-slate-100">{idData.publicData?.touristName}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Decentralized ID (DID):</span>
              <span className="font-mono text-blue-400 break-all">{idData.did}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">VALID UNTIL:</span>
                <span className="font-mono text-slate-200">{idData.validTo}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">EMERGENCY PHONE:</span>
                <span className="font-mono text-slate-200">{idData.publicData?.emergencyPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cryptographic Hashes */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5 font-mono text-[11px] text-slate-400">
          <div className="flex items-center justify-between">
            <span>ZKP Identity Hash:</span>
            <span className="text-slate-200">{idData.kycHash?.substring(0, 18)}...</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Transaction Hash:</span>
            <span className="text-blue-400">{idData.txHash?.substring(0, 18)}...</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleDownload}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Print / Export Official Digital Pass
          </button>
        </div>

      </div>
    </div>
  );
}
