import CryptoJS from 'crypto-js';

// Sovereign Consortium Blockchain Network Meta
export const BLOCKCHAIN_NETWORK = {
  name: "RakshaYatra Sovereign PoA Chain",
  symbol: "RY-ID",
  chainId: 80002,
  smartContractAddress: "0x8F9aC37d8291bB1264c91A54b42E5675eFf01192",
  consensus: "Proof-of-Authority (Multi-Agency Govt Consortium)",
  blockTime: "2.1 seconds",
  stakeholders: [
    "Ministry of Tourism",
    "State Police Department",
    "Emergency Medical Services / Hospitals",
    "Forest & Border Security",
    "Hotel Association Node"
  ]
};

// LocalStorage Keys for Persistence
const STORAGE_KEYS = {
  LEDGER: 'sih_blockchain_ledger_v2',
  INCIDENTS: 'sih_blockchain_incidents_v2',
  AUDIT_LOGS: 'sih_blockchain_audit_logs_v2',
  EVIDENCE_HASHES: 'sih_blockchain_evidence_v2'
};

// Initial Mock Ledger (Tourist DIDs)
const INITIAL_MOCK_LEDGER = [
  {
    blockNumber: 104821,
    timestamp: "2026-08-30T10:15:00Z",
    txHash: "0xa81f9b3c4d2e5a1b0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a",
    did: "did:sih:ne:0x7a8f9c1d2e3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f",
    kycHash: "0x4f8b2c1d9a0e3f5b7c9d1a3e5f7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b",
    status: "ACTIVE",
    issuedBy: "Guwahati Airport Immigration & Tourist Counter",
    validFrom: "2026-08-30",
    validTo: "2026-09-15",
    publicData: {
      touristName: "Elena Rostova",
      nationality: "Germany",
      documentType: "PASSPORT",
      documentIdMasked: "DE******892",
      emergencyContactName: "Hans Rostova (Father)",
      emergencyPhone: "+49 170 9823145",
      itinerary: ["Guwahati", "Shillong", "Cherrapunji", "Dawki"],
      medicalAlerts: "Penicillin Allergy",
      safetyScore: 94
    },
    zeroKnowledgeProof: {
      zkHash: "zk-proof_0x99281aef83b0c112",
      isIdentityVerifiedOnChain: true,
      ageGroupVerified: "25-34",
    }
  },
  {
    blockNumber: 104822,
    timestamp: "2026-08-31T08:30:00Z",
    txHash: "0xb72e4c1f9a8b3d5e2f1a0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f",
    did: "did:sih:ne:0x3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a",
    kycHash: "0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d",
    status: "ACTIVE",
    issuedBy: "Tawang Checkpost Border Security Point",
    validFrom: "2026-08-31",
    validTo: "2026-09-10",
    publicData: {
      touristName: "Rahul Sharma",
      nationality: "India",
      documentType: "AADHAAR",
      documentIdMasked: "XXXX-XXXX-4819",
      emergencyContactName: "Priya Sharma (Wife)",
      emergencyPhone: "+91 98765 43210",
      itinerary: ["Tezpur", "Bomdila", "Tawang"],
      medicalAlerts: "Asthma (Carries Inhaler)",
      safetyScore: 88
    },
    zeroKnowledgeProof: {
      zkHash: "zk-proof_0x331278ffab901192",
      isIdentityVerifiedOnChain: true,
      ageGroupVerified: "35-44",
    }
  }
];

// Initial Mock Incidents (Lifecycle: SOS -> Verification -> Response -> Resolution -> Closure)
const INITIAL_MOCK_INCIDENTS = [
  {
    incidentId: "INC-2026-8801",
    touristDID: "did:sih:ne:0x7a8f9c1d2e3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f",
    timestamp: "2026-09-01T14:20:00Z",
    incidentType: "SOS_PANIC_BUTTON",
    locationHash: "0xloc_25.5788_91.8933_shillong_peak",
    locationCoordinates: { lat: 25.5788, lng: 91.8933, name: "Shillong Peak Trail, Meghalaya" },
    currentLifecycleState: "RESPONSE", // States: SOS_TRIGGERED -> VERIFICATION -> RESPONSE -> RESOLVED -> CLOSED
    txHash: "0xinc_8801_tx_0x99281aef83b0c112",
    smartContractEvent: "EVENT_SOS_AUTODISPATCH_TRIGGERED",
    assignedAgency: "Meghalaya Tourist Police Unit 4",
    responseUpdates: [
      { timestamp: "2026-09-01T14:20:00Z", state: "SOS_TRIGGERED", actor: "Tourist App", note: "Panic SOS activated by tourist." },
      { timestamp: "2026-09-01T14:21:30Z", state: "VERIFICATION", actor: "Command Tower AI", note: "Smart contract verified DID & biometric integrity." },
      { timestamp: "2026-09-01T14:23:00Z", state: "RESPONSE", actor: "Police Squad #4", note: "Unit dispatched to Shillong Peak GPS coordinates." }
    ],
    evidenceHashes: [
      { docType: "CCTV_FRAME_HASH", hash: "0xcctv_frame_99812a0011", uploadedBy: "Shillong City CCTV Node" },
      { docType: "E_FIR_DOCUMENT_HASH", hash: "0xefir_hash_doc_2026_001", uploadedBy: "Meghalaya Police HQ" }
    ]
  }
];

// Helper Functions for Local Storage Management
const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed saving to ${key}`, e);
  }
};

// 1. Digital ID Management
export const getLedger = () => getStored(STORAGE_KEYS.LEDGER, INITIAL_MOCK_LEDGER);

export const mintTouristDigitalID = (formData) => {
  const ledger = getLedger();
  const nextBlockNum = ledger.length > 0 ? Math.max(...ledger.map(b => b.blockNumber)) + 1 : 104823;
  const timestamp = new Date().toISOString();
  
  // Off-Chain + On-Chain Cryptographic Hashing Model
  const rawKyPayload = `${formData.touristName}|${formData.documentId}|${formData.nationality}|${timestamp}`;
  const kycHash = '0x' + CryptoJS.SHA256(rawKyPayload).toString(CryptoJS.enc.Hex);
  
  const didSeed = `${formData.documentId}-${formData.touristName}-${Date.now()}`;
  const didHex = CryptoJS.SHA256(didSeed).toString(CryptoJS.enc.Hex).substring(0, 32);
  const did = `did:sih:ne:0x${didHex}`;
  const txHash = '0x' + CryptoJS.SHA256(`${did}-${nextBlockNum}-${timestamp}`).toString(CryptoJS.enc.Hex);

  let maskedDoc = formData.documentId;
  if (formData.documentType === 'AADHAAR') {
    maskedDoc = `XXXX-XXXX-${formData.documentId.slice(-4) || '9999'}`;
  } else if (formData.documentType === 'PASSPORT') {
    maskedDoc = `${formData.documentId.substring(0, 2)}******${formData.documentId.slice(-3) || '123'}`;
  }

  const zkHash = 'zk-proof_' + CryptoJS.SHA256(`zk-${kycHash}-${formData.emergencyPhone}`).toString().substring(0, 16);

  const newBlock = {
    blockNumber: nextBlockNum,
    timestamp,
    txHash,
    did,
    kycHash,
    status: "ACTIVE",
    issuedBy: formData.issuingPoint || "Guwahati Airport Immigration & Tourist Counter",
    validFrom: formData.validFrom || new Date().toISOString().split('T')[0],
    validTo: formData.validTo || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    publicData: {
      touristName: formData.touristName,
      nationality: formData.nationality || "India",
      documentType: formData.documentType || "AADHAAR",
      documentIdMasked: maskedDoc,
      emergencyContactName: formData.emergencyContactName,
      emergencyPhone: formData.emergencyPhone,
      itinerary: Array.isArray(formData.itinerary) ? formData.itinerary : (formData.itinerary ? formData.itinerary.split(',').map(s => s.trim()) : ["Assam", "Meghalaya"]),
      medicalAlerts: formData.medicalAlerts || "None",
      safetyScore: 98
    },
    zeroKnowledgeProof: {
      zkHash,
      isIdentityVerifiedOnChain: true,
      ageGroupVerified: formData.ageGroup || "25-34",
    }
  };

  const updatedLedger = [newBlock, ...ledger];
  setStored(STORAGE_KEYS.LEDGER, updatedLedger);
  
  // Log Access / Audit Trail Event
  logAuditTrail({
    actorAgency: formData.issuingPoint || "Entry Counter Node",
    action: "MINT_DIGITAL_ID",
    targetDID: did,
    details: "New tourist verifiable credential minted on-chain."
  });

  return newBlock;
};

export const verifyDigitalID = (searchQuery) => {
  if (!searchQuery) return null;
  const ledger = getLedger();
  const query = searchQuery.trim().toLowerCase();

  const found = ledger.find(b => 
    b.did.toLowerCase() === query ||
    b.txHash.toLowerCase() === query ||
    b.kycHash.toLowerCase() === query ||
    b.publicData.touristName.toLowerCase().includes(query) ||
    b.publicData.documentIdMasked.toLowerCase().includes(query)
  );

  if (!found) return null;

  const today = new Date().toISOString().split('T')[0];
  const isExpired = found.validTo < today;

  // Log Audit trail access
  logAuditTrail({
    actorAgency: "Verification Authority Node",
    action: "VERIFY_DIGITAL_ID",
    targetDID: found.did,
    details: `Digital ID lookup performed. Status: ${isExpired ? "EXPIRED" : found.status}`
  });

  return {
    ...found,
    isExpired,
    verificationStatus: isExpired ? "EXPIRED" : found.status,
    verifiedOnChain: true,
    verificationTimestamp: new Date().toISOString()
  };
};

// 2. Incident Record & Transparent Lifecycle Tracking
export const getIncidentsOnChain = () => getStored(STORAGE_KEYS.INCIDENTS, INITIAL_MOCK_INCIDENTS);

export const logIncidentOnChain = ({ touristDID, incidentType, locationCoordinates, note }) => {
  const incidents = getIncidentsOnChain();
  const timestamp = new Date().toISOString();
  const incidentId = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const locationHash = '0xloc_' + CryptoJS.SHA256(`${locationCoordinates.lat}_${locationCoordinates.lng}_${timestamp}`).toString().substring(0, 20);
  const txHash = '0xinc_tx_' + CryptoJS.SHA256(`${incidentId}_${timestamp}`).toString().substring(0, 24);

  const newIncident = {
    incidentId,
    touristDID,
    timestamp,
    incidentType: incidentType || "SOS_PANIC_BUTTON",
    locationHash,
    locationCoordinates: locationCoordinates || { lat: 25.5788, lng: 91.8933, name: "Remote GPS Location" },
    currentLifecycleState: "SOS_TRIGGERED", // SOS_TRIGGERED -> VERIFICATION -> RESPONSE -> RESOLVED -> CLOSED
    txHash,
    smartContractEvent: "EVENT_SMART_CONTRACT_RESPONSE_WORKFLOW_INITIATED",
    assignedAgency: "Nearest Regional Response Unit",
    responseUpdates: [
      { timestamp, state: "SOS_TRIGGERED", actor: "Tourist Mobile App", note: note || "SOS Distress signal generated." }
    ],
    evidenceHashes: []
  };

  const updatedIncidents = [newIncident, ...incidents];
  setStored(STORAGE_KEYS.INCIDENTS, updatedIncidents);

  // Smart contract automated trigger: Transition to VERIFICATION & RESPONSE automatically
  setTimeout(() => {
    updateIncidentStateOnChain(incidentId, "VERIFICATION", "Smart Contract Engine", "Biometric & DID cryptographic authenticity verified.");
  }, 1000);

  setTimeout(() => {
    updateIncidentStateOnChain(incidentId, "RESPONSE", "Police & Emergency Dispatch", "Nearest Police Patrol assigned & dispatched to location hash.");
  }, 2500);

  logAuditTrail({
    actorAgency: "Emergency SOS Handler",
    action: "LOG_INCIDENT_ON_CHAIN",
    targetDID: touristDID,
    details: `Incident ${incidentId} logged on-chain. State: SOS_TRIGGERED`
  });

  return newIncident;
};

export const updateIncidentStateOnChain = (incidentId, newState, actor, note) => {
  const incidents = getIncidentsOnChain();
  const updated = incidents.map(inc => {
    if (inc.incidentId === incidentId) {
      const timestamp = new Date().toISOString();
      const updatedHistory = [
        ...inc.responseUpdates,
        { timestamp, state: newState, actor, note }
      ];
      return {
        ...inc,
        currentLifecycleState: newState,
        responseUpdates: updatedHistory
      };
    }
    return inc;
  });

  setStored(STORAGE_KEYS.INCIDENTS, updated);

  logAuditTrail({
    actorAgency: actor || "Consortium Node",
    action: "UPDATE_INCIDENT_LIFECYCLE",
    targetDID: incidentId,
    details: `Lifecycle state updated to ${newState}`
  });

  return updated;
};

// 3. Evidence & Document Hashes On-Chain (Off-Chain file + On-Chain Hash)
export const attachEvidenceHashOnChain = (incidentId, docType, fileName, uploadedBy) => {
  const incidents = getIncidentsOnChain();
  const timestamp = new Date().toISOString();
  const fileHash = '0xevid_' + CryptoJS.SHA256(`${fileName}_${timestamp}`).toString().substring(0, 24);

  const updated = incidents.map(inc => {
    if (inc.incidentId === incidentId) {
      const newEv = {
        docType,
        fileName,
        hash: fileHash,
        timestamp,
        uploadedBy: uploadedBy || "Police Investigator Node"
      };
      return {
        ...inc,
        evidenceHashes: [...(inc.evidenceHashes || []), newEv]
      };
    }
    return inc;
  });

  setStored(STORAGE_KEYS.INCIDENTS, updated);

  logAuditTrail({
    actorAgency: uploadedBy || "Investigator Node",
    action: "ATTACH_EVIDENCE_HASH",
    targetDID: incidentId,
    details: `Document hash ${fileHash} anchored on-chain for evidence proof.`
  });

  return fileHash;
};

// 4. Audit Trail & Access Logs
export const getAuditLogs = () => getStored(STORAGE_KEYS.AUDIT_LOGS, [
  {
    logId: "LOG-1001",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actorAgency: "Guwahati Airport Entry Counter",
    action: "MINT_DIGITAL_ID",
    targetDID: "did:sih:ne:0x7a8f9c1d2e3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f",
    details: "Issued 14-day verifiable tourist credential."
  },
  {
    logId: "LOG-1002",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    actorAgency: "Meghalaya Tourist Police Patrol",
    action: "VERIFY_DIGITAL_ID",
    targetDID: "did:sih:ne:0x7a8f9c1d2e3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f",
    details: "Checked identity authenticity at Shillong Checkpoint."
  }
]);

export const logAuditTrail = ({ actorAgency, action, targetDID, details }) => {
  const logs = getAuditLogs();
  const newLog = {
    logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    actorAgency: actorAgency || "Consortium Node",
    action,
    targetDID,
    details
  };
  const updatedLogs = [newLog, ...logs];
  setStored(STORAGE_KEYS.AUDIT_LOGS, updatedLogs.slice(0, 50)); // Keep recent 50 logs
};
