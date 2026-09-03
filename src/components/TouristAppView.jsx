import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Radio, 
  MapPin, 
  Mic, 
  CheckCircle2, 
  Navigation, 
  RefreshCw,
  Cpu,
  User,
  ShieldCheck,
  Info
} from 'lucide-react';

export default function TouristAppView({ onTriggerEmergency }) {
  const [safetyScore, setSafetyScore] = useState(94);
  const [heartRate, setHeartRate] = useState(76);
  const [isFallSimulated, setIsFallSimulated] = useState(false);
  const [networkMode, setNetworkMode] = useState('4G_CELLULAR');
  const [currentZone, setCurrentZone] = useState('Shillong Safe Belt');
  const [sosCountdown, setSosCountdown] = useState(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFallSimulated) {
        setHeartRate(prev => 74 + Math.floor(Math.random() * 5));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isFallSimulated]);

  useEffect(() => {
    let timer;
    if (sosCountdown !== null && sosCountdown > 0) {
      timer = setInterval(() => {
        setSosCountdown(prev => prev - 1);
      }, 1000);
    } else if (sosCountdown === 0) {
      setSosTriggered(true);
      setSosCountdown(null);
      if (onTriggerEmergency) {
        onTriggerEmergency({
          type: isFallSimulated ? 'SENSOR_FALL_ACCELEROMETER' : 'PANIC_BUTTON_MANUAL',
          heartRate,
          zone: currentZone,
          networkMode,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }
    return () => clearInterval(timer);
  }, [sosCountdown, isFallSimulated, heartRate, currentZone, networkMode, onTriggerEmergency]);

  const handleStartSOS = () => {
    setSosCountdown(30);
  };

  const handleCancelSOS = () => {
    setSosCountdown(null);
    setSosTriggered(false);
  };

  const handleSimulateFall = () => {
    setIsFallSimulated(true);
    setHeartRate(148);
    setSafetyScore(28);
    setSosCountdown(30);
  };

  const handleToggleZone = (zoneName, score, netMode) => {
    setCurrentZone(zoneName);
    setSafetyScore(score);
    setNetworkMode(netMode);
  };

  const handleVoiceCommand = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setVoiceActive(false);
      handleStartSOS();
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xl font-bold text-slate-100">
            {safetyScore}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">Tourist Safety & Telemetry Interface</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                Active Verification
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Decentralized Identity: did:sih:ne:0x8F9aC37d8291bB126
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-2 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">{currentZone}</span>
          </div>

          <div className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 font-mono ${
            networkMode === 'LORAWAN_MESH' 
              ? 'bg-amber-950/60 border-amber-800 text-amber-300' 
              : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            <Radio className="w-3.5 h-3.5" />
            <span>{networkMode === 'LORAWAN_MESH' ? 'LoRaWAN Mesh (Zero Internet)' : '4G Network Stream'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Distress Control */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-between text-center space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Emergency Distress Control
            </h3>
            <p className="text-xs text-slate-400 mt-1">Triggers immediate rescue dispatch with 30-second cancellation safeguard</p>
          </div>

          {sosCountdown === null && !sosTriggered ? (
            <button
              onClick={handleStartSOS}
              className="w-40 h-40 rounded-full bg-rose-600 hover:bg-rose-700 border-4 border-rose-500/30 text-white font-bold flex flex-col items-center justify-center shadow-lg transition-colors"
            >
              <ShieldAlert className="w-12 h-12 mb-1" />
              <span className="text-xl font-black">PANIC SOS</span>
              <span className="text-[10px] text-rose-200 font-mono mt-1">HOLD TO TRIGGER</span>
            </button>
          ) : sosCountdown !== null ? (
            <div className="w-full p-4 rounded-lg bg-rose-950 border border-rose-800 text-center space-y-3">
              <div className="text-3xl font-mono font-bold text-rose-400">{sosCountdown}s</div>
              <p className="text-xs text-rose-200">Emergency signal active. Cancelling stops dispatch.</p>
              <button
                onClick={handleCancelSOS}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded border border-slate-700"
              >
                Cancel Distress Signal
              </button>
            </div>
          ) : (
            <div className="w-full p-4 rounded-lg bg-emerald-950 border border-emerald-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-emerald-200">Dispatch Initiated</div>
              <p className="text-xs text-emerald-400">Response units notified with verified telemetry profile.</p>
              <button onClick={handleCancelSOS} className="text-xs text-slate-400 underline">Reset Interface</button>
            </div>
          )}

          <button
            onClick={handleVoiceCommand}
            className={`w-full py-2.5 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
              voiceActive ? 'bg-blue-950 border-blue-700 text-blue-300' : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-blue-400" />
            <span>{voiceActive ? 'Listening for voice SOS...' : 'Voice Command SOS Trigger'}</span>
          </button>
        </div>

        {/* Telemetry Hardware Simulator */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-slate-100">IoT Safety Band Hardware Diagnostics</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Firmware v2.4 • ESP32</span>
          </div>

          {/* Diagnostics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Heart Rate (MAX30102)</span>
                <Heart className={`w-3.5 h-3.5 ${heartRate > 120 ? 'text-rose-500' : 'text-slate-400'}`} />
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">{heartRate} BPM</div>
              <p className="text-[10px] text-slate-500">Optical PPG Sensor Active</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Motion (MPU6050)</span>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-sm font-bold font-mono text-slate-100">
                {isFallSimulated ? 'Impact Anomaly' : 'Nominal Motion'}
              </div>
              <p className="text-[10px] text-slate-500">{isFallSimulated ? 'Threshold breached' : 'Stable g-force'}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>LoRa Radio (SX1276)</span>
                <Radio className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-sm font-bold text-slate-100">
                {networkMode === 'LORAWAN_MESH' ? '868 MHz Active' : 'Standby'}
              </div>
              <p className="text-[10px] text-slate-500">5-10km Relay Gateway</p>
            </div>
          </div>

          {/* Test Controls */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleSimulateFall}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Simulate Motion Anomaly (Fall Sensor)
            </button>

            <button
              onClick={() => handleToggleZone('Dawki River Border Belt', 42, 'LORAWAN_MESH')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" /> Simulate Zero-Network Zone Transition
            </button>

            <button
              onClick={() => {
                setIsFallSimulated(false);
                setHeartRate(76);
                setSafetyScore(94);
                setNetworkMode('4G_CELLULAR');
                setCurrentZone('Shillong Safe Belt');
              }}
              className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium flex items-center gap-1.5 ml-auto"
            >
              <RefreshCw className="w-3 h-3" /> Reset Diagnostics
            </button>
          </div>
        </div>
      </div>

      {/* Zone Control Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-400" /> Spatial Zone & Route Simulation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleToggleZone('Guwahati Entry Point', 98, '4G_CELLULAR')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-colors ${
              currentZone === 'Guwahati Entry Point' ? 'bg-slate-800 border-blue-500 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-xs">1. Guwahati Checkpoint</div>
            <div className="text-[11px] text-slate-400">Low Risk • Score 98</div>
          </button>

          <button
            onClick={() => handleToggleZone('Shillong Safe Belt', 88, '4G_CELLULAR')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-colors ${
              currentZone === 'Shillong Safe Belt' ? 'bg-slate-800 border-blue-500 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-xs">2. Shillong Sector</div>
            <div className="text-[11px] text-slate-400">Moderate Risk • Score 88</div>
          </button>

          <button
            onClick={() => handleToggleZone('Dawki River Border Belt', 42, 'LORAWAN_MESH')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-colors ${
              currentZone === 'Dawki River Border Belt' ? 'bg-slate-800 border-amber-500 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-xs">3. Dawki Border</div>
            <div className="text-[11px] text-amber-400">Zero Internet • LoRaWAN</div>
          </button>

          <button
            onClick={() => handleToggleZone('Restricted Cliff Belt', 18, 'LORAWAN_MESH')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-colors ${
              currentZone === 'Restricted Cliff Belt' ? 'bg-slate-800 border-rose-500 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-xs text-rose-300">4. High-Risk Cliff Zone</div>
            <div className="text-[11px] text-rose-400">Restricted • Score 18</div>
          </button>
        </div>
      </div>

    </div>
  );
}
