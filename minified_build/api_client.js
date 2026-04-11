"use strict";
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.ApiClient=void 0;const util_1=require("../../util"),types_1=require("../../types"),AUTHORIZATION_HEADER="Authorization",CONTENT_TYPE_HEADER="Content-Type",USER_AGENT_HEADER="User-Agent";class ApiClient{constructor(t,e,r,o){this.project=t,this.location=e,this.apiVersion=r,this.googleAuth=o}fetchToken(){return this.googleAuth.getAccessToken().catch(t=>{throw new types_1.GoogleAuthError(util_1.constants.CREDENTIAL_ERROR_MESSAGE,t)})}getBaseUrl(){return`https://${this.location}-aiplatform.googleapis.com/${this.apiVersion}`}getBaseResourePath(){return`projects/${this.project}/locations/${this.location}`}async unaryApiCall(t,e,r){const o=await this.getHeaders();return this.apiCall(t.toString(),{...e,method:r,headers:o})}async apiCall(t,e){const r=await fetch(t,e).catch(r=>{throw new types_1.GoogleGenerativeAIError(`exception sending request to url: ${t} with requestInit: ${JSON.stringify(e)}}`,r)});await throwErrorIfNotOK(r,t,e).catch(t=>{throw t});try{return await r.json()}catch(t){throw new types_1.GoogleGenerativeAIError(JSON.stringify(r),t)}}async getHeaders(){const t=await this.fetchToken();return new Headers({[AUTHORIZATION_HEADER]:`Bearer ${t}`,[CONTENT_TYPE_HEADER]:"application/json",[USER_AGENT_HEADER]:util_1.constants.USER_AGENT})}}async function throwErrorIfNotOK(t,e,r){var o;if(void 0===t)throw new types_1.GoogleGenerativeAIError("response is undefined");if(!t.ok){const s=t.status,i=t.statusText;let n;n=(null===(o=t.headers.get("content-type"))||void 0===o?void 0:o.includes("application/json"))?await t.json():{error:{message:`exception sending request to url: ${e} with requestInit: ${JSON.stringify(r)}}`,code:t.status,status:t.statusText}};const a=`got status: ${s} ${i}. ${JSON.stringify(n)}`;if(s>=400&&s<500){throw new types_1.ClientError(a,new types_1.GoogleApiError(n.error.message,n.error.code,n.error.status,n.error.details))}throw new types_1.GoogleGenerativeAIError(a)}}exports.ApiClient=ApiClient;