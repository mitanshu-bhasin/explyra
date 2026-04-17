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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.BatchRequestClient=void 0;const api_request_1=require("../utils/api-request"),error_1=require("../utils/error"),PART_BOUNDARY="__END_OF_PART__",TEN_SECONDS_IN_MILLIS=15e3;class BatchRequestClient{constructor(e,t,r){this.httpClient=e,this.batchUrl=t,this.commonHeaders=r}send(e){e=e.map(e=>(e.headers=Object.assign({},this.commonHeaders,e.headers),e));const t={"Content-Type":`multipart/mixed; boundary=${PART_BOUNDARY}`},r={method:"POST",url:this.batchUrl,data:this.getMultipartPayload(e),headers:Object.assign({},this.commonHeaders,t),timeout:15e3};return this.httpClient.send(r).then(e=>{if(!e.multipart)throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR,"Expected a multipart response.");return e.multipart.map(e=>(0,api_request_1.parseHttpResponse)(e,r))})}getMultipartPayload(e){let t="";return e.forEach((e,r)=>{t+=createPart(e,PART_BOUNDARY,r)}),t+=`--${PART_BOUNDARY}--\r\n`,Buffer.from(t,"utf-8")}}function createPart(e,t,r){const n=serializeSubRequest(e);let s=`--${t}\r\n`;return s+=`Content-Length: ${n.length}\r\n`,s+="Content-Type: application/http\r\n",s+=`content-id: ${r+1}\r\n`,s+="content-transfer-encoding: binary\r\n",s+="\r\n",s+=`${n}\r\n`,s}function serializeSubRequest(e){const t=JSON.stringify(e.body);let r=`POST ${e.url} HTTP/1.1\r\n`;return r+=`Content-Length: ${t.length}\r\n`,r+="Content-Type: application/json; charset=UTF-8\r\n",e.headers&&Object.keys(e.headers).forEach(t=>{r+=`${t}: ${e.headers[t]}\r\n`}),r+="\r\n",r+=t,r}exports.BatchRequestClient=BatchRequestClient;