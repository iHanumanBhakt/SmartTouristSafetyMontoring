import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DigitalIDPortal from './components/DigitalIDPortal';

export default function App() {
  const [activeTab, setActiveTab] = useState('mint');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        <DigitalIDPortal activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Smart Tourist Safety & Incident Response Ecosystem • SIH 2026</span>
          <span className="text-cyan-500/80">Sovereign Blockchain DID Protocol v1.0 • DPDP Compliant</span>
        </div>
      </footer>
    </div>
  );
}
