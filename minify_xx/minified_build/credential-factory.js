/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * @license
 * Copyright 2021 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearGlobalAppDefaultCred=exports.refreshToken=exports.cert=exports.applicationDefault=void 0;const credential_internal_1=require("./credential-internal");let globalAppDefaultCred;const globalCertCreds={},globalRefreshTokenCreds={};function applicationDefault(e){return void 0===globalAppDefaultCred&&(globalAppDefaultCred=(0,credential_internal_1.getApplicationDefault)(e)),globalAppDefaultCred}function cert(e,r){const l=JSON.stringify(e);return l in globalCertCreds||(globalCertCreds[l]=new credential_internal_1.ServiceAccountCredential(e,r)),globalCertCreds[l]}function refreshToken(e,r){const l=JSON.stringify(e);return l in globalRefreshTokenCreds||(globalRefreshTokenCreds[l]=new credential_internal_1.RefreshTokenCredential(e,r)),globalRefreshTokenCreds[l]}function clearGlobalAppDefaultCred(){globalAppDefaultCred=void 0}exports.applicationDefault=applicationDefault,exports.cert=cert,exports.refreshToken=refreshToken,exports.clearGlobalAppDefaultCred=clearGlobalAppDefaultCred;