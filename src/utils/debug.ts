/**
 * Centralized debug logging utility
 * Set ENABLE_DEBUG to false to disable all debug logging
 */
const ENABLE_DEBUG = false; // Set to true to enable debug logging
const DEBUG_ENDPOINT = 'http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60';

interface DebugLogData {
  location: string;
  message: string;
  data?: Record<string, any>;
  timestamp?: number;
  sessionId?: string;
  runId?: string;
  hypothesisId?: string;
}

export const debugLog = (logData: DebugLogData): void => {
  if (!ENABLE_DEBUG) return;
  
  const payload = {
    ...logData,
    timestamp: logData.timestamp || Date.now(),
    sessionId: logData.sessionId || 'debug-session',
  };

  fetch(DEBUG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently fail if debug server is not available
  });
};

export const debugConsole = (message: string, ...args: any[]): void => {
  if (!ENABLE_DEBUG) return;
  console.log(message, ...args);
};
