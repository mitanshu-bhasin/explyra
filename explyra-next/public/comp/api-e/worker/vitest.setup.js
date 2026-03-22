import { vi } from 'vitest';
import { Crypto } from '@peculiar/webcrypto';

// Setup Web Crypto for Node environment
if (!globalThis.crypto) {
  globalThis.crypto = new Crypto();
}

// Mock KV Namespace
class MockKV {
  constructor() {
    this.storage = new Map();
  }
  async get(key) {
    return this.storage.get(key) || null;
  }
  async put(key, value, opts) {
    this.storage.set(key, value);
  }
  async delete(key) {
    this.storage.delete(key);
  }
}

// Mock Environment
globalThis.mockEnv = {
  EXPLYRA_COMPANIES: new MockKV(),
  EXPLYRA_API_KEYS: new MockKV(),
  EXPLYRA_USAGE: new MockKV(),
  EXPLYRA_SESSIONS: new MockKV(),
  JWT_SECRET: "test_jwt_secret",
  WEBHOOK_SECRET: "test_webhook_secret"
};
