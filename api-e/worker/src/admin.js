import { hashPassword, verifyPassword, signJWT, kvGet, kvPut, randomKey, jsonResponse, errorResponse } from './utils.js';

/**
 * Register a new company
 */
export async function registerCompany(request, env) {
  const body = await request.json();
  const { id, admin_email, admin_password } = body;

  if (!id || !admin_email || !admin_password) {
    return errorResponse("missing_fields", "ID, email, and password are required");
  }

  const existingCompany = await kvGet(env.EXPLYRA_COMPANIES, `company:${id}`);
  if (existingCompany) {
    return errorResponse("company_exists", "Company ID already taken");
  }

  const hashedPassword = await hashPassword(admin_password);
  const company = {
    id,
    admin_email,
    admin_password: hashedPassword,
    plan: "starter",
    created_at: new Date().toISOString()
  };

  await kvPut(env.EXPLYRA_COMPANIES, `company:${id}`, company);
  // Store email mapping for login lookups
  await env.EXPLYRA_COMPANIES.put(`email:${admin_email}`, id);
  
  return jsonResponse({ message: "Company registered successfully", company_id: id });
}

/**
 * Login admin and return JWT session
 */
export async function loginAdmin(request, env) {
  const body = await request.json();
  const { admin_email, admin_password } = body;

  // Lookup company ID from email
  const id = await env.EXPLYRA_COMPANIES.get(`email:${admin_email}`);
  if (!id) {
    return errorResponse("auth_failed", "Invalid email or password", 401);
  }

  const company = await kvGet(env.EXPLYRA_COMPANIES, `company:${id}`);
  if (!company) {
    return errorResponse("auth_failed", "Invalid email or password", 401);
  }

  const isValid = await verifyPassword(admin_password, company.admin_password);
  if (!isValid) {
    return errorResponse("auth_failed", "Invalid company ID or password", 401);
  }

  const sessionToken = randomKey(32);
  const payload = { company_id: id, email: company.admin_email, exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) };
  const jwt = await signJWT(payload, env.JWT_SECRET);

  await kvPut(env.EXPLYRA_SESSIONS, `session:${sessionToken}`, payload, { expirationTtl: 86400 });

  return jsonResponse({ token: jwt, session_token: sessionToken });
}

/**
 * Create a New API Key
 */
export async function createApiKey(request, env, decoded) {
  const body = await request.json();
  const { label } = body;
  const companyId = decoded.company_id;

  const apiKey = `exp_${randomKey(24)}`;
  const keyMetadata = {
    company_id: companyId,
    label: label || "default",
    created_at: new Date().toISOString(),
    revoked: false
  };

  await kvPut(env.EXPLYRA_API_KEYS, `key:${apiKey}`, keyMetadata);
  return jsonResponse({ api_key: apiKey, message: "API key created" });
}

/**
 * Revoke an API Key
 */
export async function revokeApiKey(request, env, decoded) {
  const body = await request.json();
  const { api_key } = body;
  const companyId = decoded.company_id;

  const keyData = await kvGet(env.EXPLYRA_API_KEYS, `key:${api_key}`);
  if (!keyData || keyData.company_id !== companyId) {
    return errorResponse("not_found", "API key not found", 404);
  }

  keyData.revoked = true;
  await kvPut(env.EXPLYRA_API_KEYS, `key:${api_key}`, keyData);

  return jsonResponse({ message: "API key revoked" });
}
