/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * @license
 * Copyright 2022 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.FirebaseExtensionsError=exports.ExtensionsApiClient=void 0;const api_request_1=require("../utils/api-request"),error_1=require("../utils/error"),validator=require("../utils/validator"),utils=require("../utils"),FIREBASE_FUNCTIONS_CONFIG_HEADERS={"X-Firebase-Client":`fire-admin-node/${utils.getSdkVersion()}`},EXTENSIONS_API_VERSION="v1beta",EXTENSIONS_URL="https://firebaseextensions.googleapis.com";class ExtensionsApiClient{constructor(e){if(this.app=e,!validator.isNonNullObject(e)||!("options"in e))throw new error_1.FirebaseAppError("invalid-argument","First argument passed to getExtensions() must be a valid Firebase app instance.");this.httpClient=new api_request_1.AuthorizedHttpClient(this.app)}async updateRuntimeData(e,r,t){const s={method:"PATCH",url:this.getRuntimeDataUri(e,r),headers:FIREBASE_FUNCTIONS_CONFIG_HEADERS,data:t};try{return(await this.httpClient.send(s)).data}catch(e){throw this.toFirebaseError(e)}}getExtensionsApiUri(){return process.env.FIREBASE_EXT_URL??EXTENSIONS_URL}getRuntimeDataUri(e,r){return`${this.getExtensionsApiUri()}/v1beta/projects/${e}/instances/${r}/runtimeData`}toFirebaseError(e){if(e instanceof error_1.PrefixedFirebaseError)return e;const r=e.response;if(!r?.isJson())return new FirebaseExtensionsError("unknown-error",`Unexpected response with status: ${r.status} and body: ${r.text}`);const t=r.data?.error,s=t?.message||`Unknown server error: ${r.text}`;switch(t.code){case 403:return new FirebaseExtensionsError("forbidden",s);case 404:return new FirebaseExtensionsError("not-found",s);case 500:return new FirebaseExtensionsError("internal-error",s)}return new FirebaseExtensionsError("unknown-error",s)}}exports.ExtensionsApiClient=ExtensionsApiClient;class FirebaseExtensionsError extends error_1.PrefixedFirebaseError{constructor(e,r){super("Extensions",e,r),this.__proto__=FirebaseExtensionsError.prototype}}exports.FirebaseExtensionsError=FirebaseExtensionsError;