import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DigitalIDPortal from './components/DigitalIDPortal';
import TouristAppView from './components/TouristAppView';
import PoliceCommandDashboard from './components/PoliceCommandDashboard';

export default function App() {
  const [mainView, setMainView] = useState('blockchain'); // 'blockchain' | 'tourist_app' | 'police_dashboard'
  const [activePortalTab, setActivePortalTab] = useState('mint');
  const [emergencyEvents, setEmergencyEvents] = useState([]);

  const handleTriggerEmergencyFromApp = (eventPayload) => {
    const newIncident = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      touristName: 'Elena Rostova',
      did: 'did:sih:ne:0x8F9aC37d8291bB126',
      type: eventPayload.type,
      severity: 'CRITICAL',
      location: eventPayload.zone,
      timestamp: eventPayload.timestamp,
      heartRate: eventPayload.heartRate,
      medicalHistory: 'Asthma / Blood Type O+',
      triageScore: 'CRITICAL (0.96 Confidence)',
      cacheStatus: 'Deduplicated (0 Tokens - 1 Grouped Cluster)',
      status: 'PENDING_SHO_SIGNATURE'
    };

    setEmergencyEvents(prev => [newIncident, ...prev]);
    // Switch view automatically to Police Command Center to show live dispatch
    setMainView('police_dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Navbar */}
      <Navbar mainView={mainView} setMainView={setMainView} />

      {/* Main Content Area */}
      <main className="flex-1">
        {mainView === 'blockchain' && (
          <DigitalIDPortal activeTab={activePortalTab} setActiveTab={setActivePortalTab} />
        )}

        {mainView === 'tourist_app' && (
          <TouristAppView onTriggerEmergency={handleTriggerEmergencyFromApp} />
        )}

        {mainView === 'police_dashboard' && (
          <PoliceCommandDashboard emergencyEvents={emergencyEvents} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Smart Tourist Safety & Incident Response Ecosystem • SIH 2026</span>
          <span className="text-cyan-500/80">Sovereign Blockchain DID Protocol v1.0 • DPDP & BNSS Compliant</span>
        </div>
      </footer>
    </div>
  );
}
