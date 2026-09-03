import React from 'react';
import { Shield, Sparkles, Smartphone, ShieldAlert, Database, Building2 } from 'lucide-react';

export default function Navbar({ mainView, setMainView }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Official Agency Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-100">
                  National Tourist Safety Platform
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-blue-950 text-blue-300 border border-blue-800 rounded">
                  SIH 2026 Enterprise Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Ministry of Tourism & Law Enforcement Multi-Agency Infrastructure
              </p>
            </div>
          </div>

          {/* Navigation Modules */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setMainView('blockchain')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                mainView === 'blockchain'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Identity & Ledger Portal</span>
            </button>

            <button
              onClick={() => setMainView('tourist_app')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                mainView === 'tourist_app'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Tourist PWA & Hardware</span>
            </button>

            <button
              onClick={() => setMainView('police_dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                mainView === 'police_dashboard'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>GIS Command Center</span>
            </button>
          </nav>

          {/* Institutional Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="flex flex-col text-right">
              <span className="font-mono font-medium text-slate-200 text-[11px]">
                Consortium Network Online
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Polygon PoA • DPDP Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
