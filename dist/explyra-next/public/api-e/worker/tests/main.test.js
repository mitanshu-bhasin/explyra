import { describe, it, expect, beforeEach } from 'vitest';
import '../vitest.setup.js';
import { hashPassword, verifyPassword } from '../src/utils.js';
import { handleBillingWebhook } from '../src/billingWebhook.js';
import { kvPut, kvGet } from '../src/utils.js';

describe('Explyra Utils', () => {
  it('should hash and verify passwords correctly', async () => {
    const pass = 'supersecure123';
    const hash = await hashPassword(pass);
    expect(hash).toContain(':');
    
    const isValid = await verifyPassword(pass, hash);
    expect(isValid).toBe(true);
    
    const isInvalid = await verifyPassword('wrongpass', hash);
    expect(isInvalid).toBe(false);
  });
});

describe('Billing Webhook', () => {
  const env = globalThis.mockEnv;

  beforeEach(async () => {
    // Reset KV
    env.EXPLYRA_COMPANIES.storage.clear();
    env.EXPLYRA_API_KEYS.storage.clear();
    
    // Setup a test company
    await kvPut(env.EXPLYRA_COMPANIES, 'company:test-corp', {
      id: 'test-corp',
      plan: 'starter',
      admin_email: 'admin@test.com'
    });
  });

  it('should upgrade plan and auto-generate key', async () => {
    const payload = {
      company_id: 'test-corp',
      event: 'plan_update',
      new_plan: 'growth'
    };
    
    // We mock the signature verification for simplicity in unit test
    // or we could generate a real one here.
    // For this test, let's assume valid signature logic.
    
    const body = JSON.stringify(payload);
    
    // Mocking hmacVerify in units.js might be easier for this specific test
    // But since we have a real Web Crypto in setup, let's use it.
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(env.WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureRaw = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const signature = btoa(String.fromCharCode(...new Uint8Array(signatureRaw)));

    const request = new Request('http://localhost/webhook/billing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-signature': signature
      },
      body
    });

    const response = await handleBillingWebhook(request, env);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.auto_key).not.toBeNull();
    expect(result.auto_key).toContain('exp_');

    const company = await kvGet(env.EXPLYRA_COMPANIES, 'company:test-corp');
    expect(company.plan).toBe('growth');
    
    const keyData = await kvGet(env.EXPLYRA_API_KEYS, `key:${result.auto_key}`);
    expect(keyData.company_id).toBe('test-corp');
    expect(keyData.label).toBe('auto-upgrade');
  });
});
