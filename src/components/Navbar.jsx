import React from 'react';
import { Shield, Database, Smartphone, ShieldAlert } from 'lucide-react';

export default function Navbar({ mainView, setMainView }) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo Mark & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-sm tracking-tight text-zinc-100">
                RakshaYatra 360
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
                SIH 2026
              </span>
            </div>
          </div>

          {/* Minimalist Segment Tabs */}
          <nav className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setMainView('blockchain')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mainView === 'blockchain'
                  ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Identity & Ledger</span>
            </button>

            <button
              onClick={() => setMainView('tourist_app')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mainView === 'tourist_app'
                  ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Tourist PWA</span>
            </button>

            <button
              onClick={() => setMainView('police_dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mainView === 'police_dashboard'
                  ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>GIS Command</span>
            </button>
          </nav>

          {/* Status Dot */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Polygon PoA Network</span>
          </div>

        </div>
      </div>
    </header>
  );
}
