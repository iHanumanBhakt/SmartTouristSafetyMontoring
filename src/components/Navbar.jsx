import React from 'react';
import { ShieldCheck, Sparkles, Smartphone, ShieldAlert, Layers } from 'lucide-react';
import { BLOCKCHAIN_NETWORK } from '../services/blockchainService';

export default function Navbar({ mainView, setMainView }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 glow-cyan">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                  RakshaYatra 360
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-full">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Smart Tourist Safety Monitoring & Sovereign Blockchain Ecosystem
              </p>
            </div>
          </div>

          {/* Top-Level Module Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setMainView('blockchain')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mainView === 'blockchain'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Blockchain ID Platform</span>
            </button>

            <button
              onClick={() => setMainView('tourist_app')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mainView === 'tourist_app'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>2. Tourist App & IoT Band</span>
            </button>

            <button
              onClick={() => setMainView('police_dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mainView === 'police_dashboard'
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>3. Police GIS Command</span>
            </button>
          </nav>

          {/* Network Status Badge */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-semibold text-emerald-400 text-[11px]">
                Polygon PoS Consortium
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                5 Nodes • ZK-SNARK Privacy
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
