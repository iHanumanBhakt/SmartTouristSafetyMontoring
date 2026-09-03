import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Radio, 
  MapPin, 
  PhoneCall, 
  Mic, 
  CheckCircle2, 
  Volume2, 
  Navigation, 
  RefreshCw,
  Sliders,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TouristAppView({ onTriggerEmergency }) {
  const [safetyScore, setSafetyScore] = useState(94);
  const [heartRate, setHeartRate] = useState(76);
  const [isFallSimulated, setIsFallSimulated] = useState(false);
  const [networkMode, setNetworkMode] = useState('4G_CELLULAR'); // '4G_CELLULAR' | 'LORAWAN_MESH'
  const [currentZone, setCurrentZone] = useState('Shillong Safe Belt');
  const [sosCountdown, setSosCountdown] = useState(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  // Heart rate pulse animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFallSimulated) {
        setHeartRate(prev => 74 + Math.floor(Math.random() * 6));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isFallSimulated]);

  // Countdown timer for SOS auto-cancel false-positive protection
  useEffect(() => {
    let timer;
    if (sosCountdown !== null && sosCountdown > 0) {
      timer = setInterval(() => {
        setSosCountdown(prev => prev - 1);
      }, 1000);
    } else if (sosCountdown === 0) {
      // Countdown reached 0 -> Execute Emergency Dispatch
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
    setSosCountdown(30); // 30s cancellation countdown
  };

  const handleCancelSOS = () => {
    setSosCountdown(null);
    setSosTriggered(false);
  };

  const handleSimulateFall = () => {
    setIsFallSimulated(true);
    setHeartRate(148); // HR Spike
    setSafetyScore(28); // Score Drops
    setSosCountdown(30); // Auto 30s countdown
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
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
              <span className={`text-2xl font-bold font-mono ${safetyScore > 80 ? 'text-emerald-400' : safetyScore > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {safetyScore}
              </span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${safetyScore > 80 ? 'bg-emerald-500' : safetyScore > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Live Safety Meter & Telemetry PWA</h2>
            <p className="text-xs text-slate-400">DID: <span className="font-mono text-cyan-400">did:sih:ne:0x8F9a...291b</span> • Verified Tourist Pass</p>
          </div>
        </div>

        {/* Network & Zone Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">{currentZone}</span>
          </div>

          <div className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 font-mono ${
            networkMode === 'LORAWAN_MESH' 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{networkMode === 'LORAWAN_MESH' ? 'LoRaWAN 868MHz (Zero-Internet)' : '4G Cellular Active'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: SOS & IoT Band Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Big Tactile Panic SOS Button */}
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 bg-slate-900/60 flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-rose-400 flex items-center justify-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Emergency Panic Hub
            </h3>
            <p className="text-xs text-slate-400">Press button or speak to trigger immediate rescue dispatch</p>
          </div>

          {/* Big SOS Button */}
          {sosCountdown === null && !sosTriggered ? (
            <button
              onClick={handleStartSOS}
              className="relative group w-44 h-44 rounded-full bg-gradient-to-br from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 border-4 border-rose-400/40 shadow-2xl shadow-rose-600/50 flex flex-col items-center justify-center transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
              <ShieldAlert className="w-16 h-16 text-white mb-1" />
              <span className="text-2xl font-black tracking-widest text-white">PANIC SOS</span>
              <span className="text-[10px] text-rose-200/80 font-mono">HOLD 3 SEC</span>
            </button>
          ) : sosCountdown !== null ? (
            /* SOS 30s Countdown Cancel Shield */
            <div className="w-full space-y-4 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40">
              <div className="text-4xl font-black font-mono text-rose-400 animate-bounce">
                {sosCountdown}s
              </div>
              <p className="text-xs text-rose-200">
                Emergency Alert Triggered! Auto-dispatching in {sosCountdown} seconds unless cancelled.
              </p>
              <button
                onClick={handleCancelSOS}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 font-bold text-sm transition-all"
              >
                False Positive? Tap to Cancel
              </button>
            </div>
          ) : (
            /* SOS Triggered Confirmation */
            <div className="w-full space-y-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-emerald-300">Rescue Units Dispatched!</h4>
              <p className="text-xs text-slate-300">Police & Medical squads routed to your exact GPS coordinates.</p>
              <button
                onClick={handleCancelSOS}
                className="text-xs text-slate-400 underline"
              >
                Reset Simulator
              </button>
            </div>
          )}

          {/* Multilingual Voice SOS Trigger */}
          <button
            onClick={handleVoiceCommand}
            className={`w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
              voiceActive 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse' 
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Mic className={`w-4 h-4 ${voiceActive ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>{voiceActive ? 'Listening... "Ayuda, me caí!"' : 'Trigger Hands-Free Voice SOS (10+ Languages)'}</span>
          </button>
        </div>

        {/* Center & Right Column: IoT Smart Safety Band Simulator */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100">IoT Smart Safety Band Hardware Simulator</h3>
                <p className="text-xs text-slate-400">ESP32 + MPU6050 Accelerometer + MAX30102 Oximeter + SX1276 LoRa</p>
              </div>
            </div>

            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
              MAC: 84:F3:EB:11:90:A4
            </span>
          </div>

          {/* Sensor Controls & Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Heart Rate Gauge */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>MAX30102 Pulse</span>
                <Heart className={`w-4 h-4 ${heartRate > 120 ? 'text-rose-500 animate-ping' : 'text-rose-400'}`} />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-100">
                {heartRate} <span className="text-xs font-sans text-slate-400">BPM</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${heartRate > 120 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${Math.min(100, (heartRate / 160) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Fall Detection Sensor */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>MPU6050 Motion</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-sm font-bold font-mono text-slate-100">
                {isFallSimulated ? 'FREE-FALL DETECTED' : '1.0g Normal Accelerometer'}
              </div>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-semibold ${isFallSimulated ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isFallSimulated ? 'Impact Spike -9.8m/s²' : 'Stable Movement'}
              </span>
            </div>

            {/* LoRaWAN Transceiver Status */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>SX1276 LoRa Relay</span>
                <Radio className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-sm font-bold text-slate-100">
                {networkMode === 'LORAWAN_MESH' ? '868 MHz Active' : 'Standby (4G Active)'}
              </div>
              <span className="text-[10px] text-slate-400 block">5-10km Range Basecamp Sync</span>
            </div>
          </div>

          {/* Action Simulation Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleSimulateFall}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <AlertTriangle className="w-4 h-4" /> Simulate Sudden Fall (MPU6050)
            </button>

            <button
              onClick={() => handleToggleZone('Dawki River Border Belt', 42, 'LORAWAN_MESH')}
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Navigation className="w-4 h-4" /> Move to Dead-Zone (LoRaWAN Mode)
            </button>

            <button
              onClick={() => {
                setIsFallSimulated(false);
                setHeartRate(76);
                setSafetyScore(94);
                setNetworkMode('4G_CELLULAR');
                setCurrentZone('Shillong Safe Belt');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-all ml-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Geo-Fence Route Simulator */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-cyan-400" /> Interactive Geo-Fencing & Itinerary Route Simulation
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <button
            onClick={() => handleToggleZone('Guwahati Airport Entry', 98, '4G_CELLULAR')}
            className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
              currentZone === 'Guwahati Airport Entry' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200' : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-sm text-slate-200">1. Guwahati Airport</div>
            <div className="text-[11px]">Safe Zone • Score 98/100</div>
          </button>

          <button
            onClick={() => handleToggleZone('Shillong Peak Trail', 88, '4G_CELLULAR')}
            className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
              currentZone === 'Shillong Peak Trail' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200' : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-sm text-slate-200">2. Shillong Peak</div>
            <div className="text-[11px]">Safe Trek • Score 88/100</div>
          </button>

          <button
            onClick={() => handleToggleZone('Dawki River Border Belt', 42, 'LORAWAN_MESH')}
            className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
              currentZone === 'Dawki River Border Belt' ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-sm text-slate-200">3. Dawki River</div>
            <div className="text-[11px]">Zero 4G • LoRaWAN Mesh • Score 42</div>
          </button>

          <button
            onClick={() => handleToggleZone('Restricted Cliff Zone', 18, 'LORAWAN_MESH')}
            className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
              currentZone === 'Restricted Cliff Zone' ? 'bg-rose-500/20 border-rose-500 text-rose-200' : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-sm text-slate-200">4. High-Risk Cliff</div>
            <div className="text-[11px]">DANGER ZONE • Score 18/100</div>
          </button>
        </div>
      </div>
    </div>
  );
}
