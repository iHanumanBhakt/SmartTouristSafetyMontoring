# Smart Tourist Safety Monitoring & Incident Response System

[![SIH Hackathon](https://img.shields.io/badge/SIH-2026-blue.svg)](https://sih.gov.in)
[![Blockchain](https://img.shields.io/badge/Blockchain-Polygon%20Consortium-purple.svg)](https://polygon.technology)
[![AI Engine](https://img.shields.io/badge/AI-Multi--Agent%20Consensus-green.svg)](https://deepmind.google)

A robust, multi-tier safety ecosystem leveraging **Generative AI, Geo-Fencing, and Blockchain-based Digital Tourist IDs** to provide real-time tourist monitoring, rapid incident response, and tamper-proof legal evidence logging in high-risk & remote regions.

---

## 🌟 Key Pillars & Features

* **Sovereign Blockchain Digital Tourist ID (W3C DID)**
  - Mint verifiable digital passes (`did:sih:ne:0x...`) at airports, hotels, and checkposts.
  - Zero-Knowledge Privacy (ZKP) seal preserving DPDP Act 2023 compliance—no raw Aadhaar/Passport PII stored on-chain.
  - 100% offline asymmetric public-key QR code verification for dead-zone checkposts.

* **Multi-Agent Generative AI Engine**
  - **Token Pre-Filtering:** Deterministic rules engine drops 99% of normal telemetry to minimize API token costs.
  - **Semantic Vector Caching (Pinecone):** Deduplicates identical multi-casualty incident alerts (e.g. bus crash) with 0 extra tokens.
  - **Multi-LLM Consensus:** Gemini 1.5 Flash (Fast Triage) ➔ Gemini 1.5 Pro (Judge Reasoning) to eliminate false positives.
  - **Automated E-FIR Generator:** Uses Blockchain RAG to fetch verified medical profiles and auto-drafts legally compliant E-FIRs.

* **Dual-Mode Telemetry & Dead-Zone Fallback**
  - High-throughput WebSocket stream for 4G/Wi-Fi zones.
  - Long-range **SX1276 LoRaWAN radio relay (5–10km)** for IoT Smart Safety Bands in zero-internet forest/mountain zones.

* **Police GIS Command Center & Duty SHO e-Sign**
  - Real-time tourist heatmaps, alert triage queue, and unit routing.
  - **BNSS / CrPC Admissibility:** Human-in-the-loop Duty SHO cryptographic e-Sign before official lodging.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│              TIER 1: CLIENT & EDGE INTERFACE LAYER                      │
│   Tourist PWA App  │  Checkpoint Kiosk  │  Police GIS  │  IoT Smart Band│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│              TIER 2: API & TELEMETRY GATEWAY LAYER                      │
│   NGINX API Gateway │ WebSocket Cluster │ LoRaWAN Basecamp Gateway      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│         TIER 3: MULTI-AGENT AI CORE & GEN AI PIPELINE                   │
│   1. Telemetry Filter  │ 2. Semantic Vector Cache (0-Token Resolver)   │
│   3. Triage LLM (Flash)│ 4. Judge LLM (Pro)  │ 5. Auto E-FIR Dispatcher│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│         TIER 4: DUAL STORAGE & SOVEREIGN BLOCKCHAIN LAYER               │
│   Off-Chain Encrypted DB (PostGIS)  │ Sovereign 5-Node Consortium Chain  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, TailwindCSS, Lucide Icons, Leaflet.js / Mapbox
* **Backend:** Node.js, Express, WebSockets (`ws`), Ethers.js, CryptoJS
* **Blockchain:** Polygon Amoy Testnet / Consortium PoA Network, Solidity Smart Contracts
* **AI & Vector DB:** Gemini 1.5 Flash / Pro, LangChain, Pinecone Vector DB
* **IoT Hardware:** ESP32 Microcontroller, MPU6050 (Fall Sensor), MAX30102 (Pulse Oximeter), SX1276 LoRaWAN Transceiver

---

## 🚀 Quickstart & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iHanumanBhakt/SmartTouristSafetyMontoring.git
   cd SmartTouristSafetyMontoring
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚖️ Legal & Privacy Compliance

* **DPDP Act 2023:** Sensitive PII and medical records are stored in encrypted off-chain vaults. Only SHA-256 hashes & W3C DIDs are anchored on-chain. Ephemeral credentials auto-expire at itinerary end.
* **BNSS / CrPC:** Draft E-FIRs require explicit human Duty SHO cryptographic signatures to ensure court admissibility.
