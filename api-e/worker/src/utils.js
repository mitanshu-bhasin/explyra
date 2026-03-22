/**
 * Core Utilities for Explyra API-E
 * Handles crypto, KV helpers, and JWT logic.
 */

// --- Crypto & Hashing ---

/**
 * Generates a random secure string
 */
export function randomKey(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash password using PBKDF2 (Native Web Crypto)
 */
export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw", 
    new TextEncoder().encode(password), 
    { name: "PBKDF2" }, 
    false, 
    ["deriveBits", "deriveKey"]
  );
  const key = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  
  const saltHex = btoa(String.fromCharCode(...salt));
  const hashHex = btoa(String.fromCharCode(...new Uint8Array(key)));
  return `${saltHex}:${hashHex}`;
}

/**
 * Verify password against stored hash
 */
export async function verifyPassword(password, storedHash) {
  const [saltHex, hashHex] = storedHash.split(":");
  const salt = Uint8Array.from(atob(saltHex), c => c.charCodeAt(0));
  const keyMaterial = await crypto.subtle.importKey(
    "raw", 
    new TextEncoder().encode(password), 
    { name: "PBKDF2" }, 
    false, 
    ["deriveBits", "deriveKey"]
  );
  const key = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  const currentHashHex = btoa(String.fromCharCode(...new Uint8Array(key)));
  return currentHashHex === hashHex;
}

/**
 * HMAC-SHA256 Validation for Webhooks
 */
export async function hmacVerify(payload, signature, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const sigBuf = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
  return await crypto.subtle.verify(
    "HMAC",
    key,
    sigBuf,
    encoder.encode(payload)
  );
}

// --- JWT & Sessions ---

export async function signJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const data = `${encodedHeader}.${encodedPayload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
    
  return `${data}.${encodedSignature}`;
}

export async function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  
  const [header, payload, signature] = parts;
  const data = `${header}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  
  const sigBuf = Uint8Array.from(atob(signature.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
  const isValid = await crypto.subtle.verify("HMAC", key, sigBuf, encoder.encode(data));
  
  if (!isValid) return null;
  
  try {
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch (e) {
    return null;
  }
}

// --- KV Helpers ---

export async function kvGet(namespace, key) {
  const val = await namespace.get(key);
  return val ? JSON.parse(val) : null;
}

export async function kvPut(namespace, key, value, opts = {}) {
  await namespace.put(key, JSON.stringify(value), opts);
}

export async function kvList(namespace, prefix) {
  return await namespace.list({ prefix });
}

export async function kvDelete(namespace, key) {
  await namespace.delete(key);
}

// --- Error Helpers ---

export function errorResponse(error, message, status = 400) {
  return new Response(JSON.stringify({ error, message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
