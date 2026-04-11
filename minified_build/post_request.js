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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.postRequest=void 0;const API_BASE_PATH="aiplatform.googleapis.com",GOOGLE_INTERNAL_ENDPOINT="googleapis.com",AUTHORIZATION_HEADER="Authorization",CONTENT_TYPE_HEADER="Content-Type",USER_AGENT_HEADER="User-Agent",X_GOOG_API_CLIENT_HEADER="X-Goog-Api-Client",SERVER_RESERVED_HEADERS=["Authorization","Content-Type"],errors_1=require("../types/errors"),constants=require("../util/constants");async function postRequest({region:e,resourcePath:t,resourceMethod:n,token:r,data:o,apiEndpoint:s,requestOptions:i,apiVersion:a="v1"}){const E=null!=s?s:`${e}-${API_BASE_PATH}`;let l=`https://${E}/${a}/${t}:${n}`;n===constants.STREAMING_GENERATE_CONTENT_METHOD&&(l+="?alt=sse");const u=getExtraHeaders(E,new Headers({[AUTHORIZATION_HEADER]:`Bearer ${r}`,[CONTENT_TYPE_HEADER]:"application/json",[USER_AGENT_HEADER]:constants.USER_AGENT}),i);return fetch(l,{...getFetchOptions(i),method:"POST",headers:u,body:JSON.stringify(o)})}function getFetchOptions(e){const t={};if(!e||void 0===e.timeout||e.timeout<0)return t;const n=new AbortController,r=n.signal;return setTimeout(()=>n.abort(),e.timeout),t.signal=r,t}function stringHasLineBreak(e){return null!=e&&(e.includes("\n")||e.includes("\r"))}function headersHasLineBreak(e){if(!e)return!1;for(const[t,n]of e.entries())if(stringHasLineBreak(t)||stringHasLineBreak(n))return!0;return!1}function getExtraHeaders(e,t,n){var r;if(stringHasLineBreak(null==n?void 0:n.apiClient))throw new errors_1.ClientError("Found line break in apiClient request option field, please remove the line break and try again.");if(headersHasLineBreak(null==n?void 0:n.customHeaders))throw new errors_1.ClientError("Found line break in customerHeaders request option field, please remove the line break and try again.");const o=new Headers(t),s=null!==(r=null==n?void 0:n.customHeaders)&&void 0!==r?r:new Headers;for(const[e,t]of s.entries())o.append(e,t);let i;(null==n?void 0:n.apiClient)&&o.append("X-Goog-Api-Client",null==n?void 0:n.apiClient),i=e.endsWith("googleapis.com")?t:s;for(const e of SERVER_RESERVED_HEADERS)i.has(e)&&o.set(e,i.get(e));return o}exports.postRequest=postRequest;