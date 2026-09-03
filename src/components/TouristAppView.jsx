import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Heart, 
  Activity, 
  Radio, 
  MapPin, 
  Mic, 
  CheckCircle2, 
  Navigation, 
  RefreshCw,
  Cpu,
  AlertTriangle
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

  const handleStartSOS = () => setSosCountdown(30);
  const handleCancelSOS = () => { setSosCountdown(null); setSosTriggered(false); };

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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-lg font-bold text-zinc-100">
            {safetyScore}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-100">Tourist Safety & Telemetry Interface</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                DID Verified
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              did:sih:ne:0x8F9aC37d8291bB126
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs flex items-center gap-2 text-zinc-300">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium">{currentZone}</span>
          </div>

          <div className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 font-mono ${
            networkMode === 'LORAWAN_MESH' 
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
              : 'bg-zinc-950 border-zinc-800 text-zinc-400'
          }`}>
            <Radio className="w-3.5 h-3.5" />
            <span>{networkMode === 'LORAWAN_MESH' ? 'LoRaWAN 868MHz Mesh' : '4G Telemetry Stream'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Minimalist Panic SOS Hub */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-between text-center space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Emergency Panic Hub
            </h3>
            <p className="text-xs text-zinc-500 mt-1">Triggers multi-agency emergency rescue with 30s safeguard</p>
          </div>

          {sosCountdown === null && !sosTriggered ? (
            <button
              onClick={handleStartSOS}
              className="w-36 h-36 rounded-full bg-rose-600/90 hover:bg-rose-600 border border-rose-500/40 text-white font-bold flex flex-col items-center justify-center transition-all active:scale-95 shadow-md shadow-rose-950/50"
            >
              <ShieldAlert className="w-10 h-10 mb-1" />
              <span className="text-lg font-extrabold tracking-wider">PANIC SOS</span>
              <span className="text-[10px] text-rose-200 font-mono">PRESS TO ACTIVATE</span>
            </button>
          ) : sosCountdown !== null ? (
            <div className="w-full p-4 rounded-lg bg-rose-950/40 border border-rose-800/60 text-center space-y-3">
              <div className="text-3xl font-mono font-bold text-rose-400">{sosCountdown}s</div>
              <p className="text-xs text-rose-300">Distress alert active. Click below to cancel false positive.</p>
              <button
                onClick={handleCancelSOS}
                className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded border border-zinc-700 transition-colors"
              >
                Cancel False Alert
              </button>
            </div>
          ) : (
            <div className="w-full p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-emerald-300">Rescue Squads Dispatched</div>
              <p className="text-xs text-emerald-400/80">Police & Medical units routed via live GIS coordinates.</p>
              <button onClick={handleCancelSOS} className="text-xs text-zinc-400 underline mt-1">Reset Interface</button>
            </div>
          )}

          <button
            onClick={handleVoiceCommand}
            className={`w-full py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
              voiceActive ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-zinc-400" />
            <span>{voiceActive ? 'Listening for voice SOS...' : 'Hands-Free Voice SOS Trigger'}</span>
          </button>
        </div>

        {/* Minimalist Telemetry Hardware Simulator */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-100">IoT Safety Band Diagnostics</h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">Firmware v2.4 • ESP32</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>MAX30102 Pulse</span>
                <Heart className={`w-3.5 h-3.5 ${heartRate > 120 ? 'text-rose-500' : 'text-zinc-500'}`} />
              </div>
              <div className="text-xl font-mono font-bold text-zinc-100">{heartRate} BPM</div>
              <p className="text-[10px] text-zinc-500">Optical PPG Active</p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>MPU6050 Accelerometer</span>
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <div className="text-sm font-mono font-semibold text-zinc-200">
                {isFallSimulated ? 'Impact Spike (-9.8m/s²)' : '1.0g Nominal'}
              </div>
              <p className="text-[10px] text-zinc-500">{isFallSimulated ? 'Threshold Breached' : 'Motion Stable'}</p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>SX1276 LoRa Radio</span>
                <Radio className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                {networkMode === 'LORAWAN_MESH' ? '868 MHz Active' : 'Standby (4G)'}
              </div>
              <p className="text-[10px] text-zinc-500">5-10km Radio Relay</p>
            </div>
          </div>

          {/* Action Simulation Buttons */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={handleSimulateFall}
              className="px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Simulate Fall Anomaly
            </button>

            <button
              onClick={() => handleToggleZone('Dawki River Border Belt', 42, 'LORAWAN_MESH')}
              className="px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" /> Simulate Dead-Zone
            </button>

            <button
              onClick={() => {
                setIsFallSimulated(false);
                setHeartRate(76);
                setSafetyScore(94);
                setNetworkMode('4G_CELLULAR');
                setCurrentZone('Shillong Safe Belt');
              }}
              className="px-3 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-500 text-xs font-medium flex items-center gap-1.5 ml-auto transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Zone Selector */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" /> Spatial Zone Simulation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleToggleZone('Guwahati Entry Point', 98, '4G_CELLULAR')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-all ${
              currentZone === 'Guwahati Entry Point' ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-zinc-950 border-zinc-800/80 text-zinc-400'
            }`}
          >
            <div className="font-semibold text-xs text-zinc-200">1. Guwahati Checkpoint</div>
            <div className="text-[11px] text-zinc-500">Low Risk • Score 98</div>
          </button>

          <button
            onClick={() => handleToggleZone('Shillong Safe Belt', 88, '4G_CELLULAR')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-all ${
              currentZone === 'Shillong Safe Belt' ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-zinc-950 border-zinc-800/80 text-zinc-400'
            }`}
          >
            <div className="font-semibold text-xs text-zinc-200">2. Shillong Sector</div>
            <div className="text-[11px] text-zinc-500">Moderate Risk • Score 88</div>
          </button>

          <button
            onClick={() => handleToggleZone('Dawki River Border Belt', 42, 'LORAWAN_MESH')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-all ${
              currentZone === 'Dawki River Border Belt' ? 'bg-zinc-800 border-amber-500/50 text-zinc-100' : 'bg-zinc-950 border-zinc-800/80 text-zinc-400'
            }`}
          >
            <div className="font-semibold text-xs text-amber-300">3. Dawki Border</div>
            <div className="text-[11px] text-amber-400/80">Zero 4G • LoRaWAN Mesh</div>
          </button>

          <button
            onClick={() => handleToggleZone('Restricted Cliff Belt', 18, 'LORAWAN_MESH')}
            className={`p-3.5 rounded-lg border text-left space-y-1 transition-all ${
              currentZone === 'Restricted Cliff Belt' ? 'bg-zinc-800 border-rose-500/50 text-zinc-100' : 'bg-zinc-950 border-zinc-800/80 text-zinc-400'
            }`}
          >
            <div className="font-semibold text-xs text-rose-400">4. Restricted Cliff Zone</div>
            <div className="text-[11px] text-rose-500">DANGER • Score 18</div>
          </button>
        </div>
      </div>

    </div>
  );
}
