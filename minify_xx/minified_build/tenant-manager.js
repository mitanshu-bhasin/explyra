/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.TenantManager=exports.TenantAwareAuth=void 0;const validator=require("../utils/validator"),utils=require("../utils/index"),error_1=require("../utils/error"),base_auth_1=require("./base-auth"),tenant_1=require("./tenant"),auth_api_request_1=require("./auth-api-request");class TenantAwareAuth extends base_auth_1.BaseAuth{constructor(e,t){super(e,new auth_api_request_1.TenantAwareAuthRequestHandler(e,t),(0,base_auth_1.createFirebaseTokenGenerator)(e,t)),utils.addReadonlyGetter(this,"tenantId",t)}verifyIdToken(e,t=!1){return super.verifyIdToken(e,t).then(e=>{if(e.firebase.tenant!==this.tenantId)throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.MISMATCHING_TENANT_ID);return e})}createSessionCookie(e,t){return validator.isNonEmptyString(e)?validator.isNonNullObject(t)&&validator.isNumber(t.expiresIn)?this.verifyIdToken(e).then(()=>super.createSessionCookie(e,t)):Promise.reject(new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_SESSION_COOKIE_DURATION)):Promise.reject(new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ID_TOKEN))}verifySessionCookie(e,t=!1){return super.verifySessionCookie(e,t).then(e=>{if(e.firebase.tenant!==this.tenantId)throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.MISMATCHING_TENANT_ID);return e})}}exports.TenantAwareAuth=TenantAwareAuth;class TenantManager{constructor(e){this.app=e,this.authRequestHandler=new auth_api_request_1.AuthRequestHandler(e),this.tenantsMap={}}authForTenant(e){if(!validator.isNonEmptyString(e))throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_TENANT_ID);return void 0===this.tenantsMap[e]&&(this.tenantsMap[e]=new TenantAwareAuth(this.app,e)),this.tenantsMap[e]}getTenant(e){return this.authRequestHandler.getTenant(e).then(e=>new tenant_1.Tenant(e))}listTenants(e,t){return this.authRequestHandler.listTenants(e,t).then(e=>{const t=[];e.tenants.forEach(e=>{t.push(new tenant_1.Tenant(e))});const r={tenants:t,pageToken:e.nextPageToken};return void 0===r.pageToken&&delete r.pageToken,r})}deleteTenant(e){return this.authRequestHandler.deleteTenant(e)}createTenant(e){return this.authRequestHandler.createTenant(e).then(e=>new tenant_1.Tenant(e))}updateTenant(e,t){return this.authRequestHandler.updateTenant(e,t).then(e=>new tenant_1.Tenant(e))}}exports.TenantManager=TenantManager;