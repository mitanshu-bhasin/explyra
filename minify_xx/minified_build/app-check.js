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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.AppCheck=void 0;const validator=require("../utils/validator"),app_check_api_client_internal_1=require("./app-check-api-client-internal"),token_generator_1=require("./token-generator"),token_verifier_1=require("./token-verifier"),crypto_signer_1=require("../utils/crypto-signer");class AppCheck{constructor(e){this.app=e,this.client=new app_check_api_client_internal_1.AppCheckApiClient(e);try{this.tokenGenerator=new token_generator_1.AppCheckTokenGenerator((0,crypto_signer_1.cryptoSignerFromApp)(e))}catch(e){throw(0,token_generator_1.appCheckErrorFromCryptoSignerError)(e)}this.appCheckTokenVerifier=new token_verifier_1.AppCheckTokenVerifier(e)}createToken(e,r){return this.tokenGenerator.createCustomToken(e,r).then(r=>this.client.exchangeToken(r,e))}verifyToken(e,r){return this.validateVerifyAppCheckTokenOptions(r),this.appCheckTokenVerifier.verifyToken(e).then(t=>r?.consume?this.client.verifyReplayProtection(e).then(e=>({alreadyConsumed:e,appId:t.app_id,token:t})):{appId:t.app_id,token:t})}validateVerifyAppCheckTokenOptions(e){if(void 0!==e&&!validator.isNonNullObject(e))throw new app_check_api_client_internal_1.FirebaseAppCheckError("invalid-argument","VerifyAppCheckTokenOptions must be a non-null object.")}}exports.AppCheck=AppCheck;