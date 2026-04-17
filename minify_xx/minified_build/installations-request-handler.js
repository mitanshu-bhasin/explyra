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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.FirebaseInstallationsRequestHandler=void 0;const error_1=require("../utils/error"),api_request_1=require("../utils/api-request"),utils=require("../utils/index"),validator=require("../utils/validator"),FIREBASE_IID_HOST="console.firebase.google.com",FIREBASE_IID_PATH="/v1/",FIREBASE_IID_TIMEOUT=1e4,ERROR_CODES={400:"Malformed installation ID argument.",401:"Request not authorized.",403:"Project does not match installation ID or the client does not have sufficient privileges.",404:"Failed to find the installation ID.",409:"Already deleted.",429:"Request throttled out by the backend server.",500:"Internal server error.",503:"Backend servers are over capacity. Try again later."};class FirebaseInstallationsRequestHandler{constructor(e){this.app=e,this.host=FIREBASE_IID_HOST,this.timeout=1e4,this.httpClient=new api_request_1.AuthorizedHttpClient(e)}deleteInstallation(e){return validator.isNonEmptyString(e)?this.invokeRequestHandler(new api_request_1.ApiSettings(e,"DELETE")):Promise.reject(new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.INVALID_INSTALLATION_ID,"Installation ID must be a non-empty string."))}invokeRequestHandler(e){return this.getPathPrefix().then(t=>{const r={url:`https://${this.host}${t}${e.getEndpoint()}`,method:e.getHttpMethod(),timeout:this.timeout};return this.httpClient.send(r)}).then(()=>{}).catch(t=>{if(t instanceof api_request_1.RequestResponseError){const r=t.response,i=r.isJson()&&"error"in r.data?r.data.error:r.text,s=ERROR_CODES[r.status],n=s?`Installation ID "${e.getEndpoint()}": ${s}`:i;throw new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.API_ERROR,n)}throw t})}getPathPrefix(){return this.path?Promise.resolve(this.path):utils.findProjectId(this.app).then(e=>{if(!validator.isNonEmptyString(e))throw new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.INVALID_PROJECT_ID,"Failed to determine project ID for Installations. Initialize the SDK with service account credentials or set project ID as an app option. Alternatively set the GOOGLE_CLOUD_PROJECT environment variable.");return this.path=`/v1/project/${e}/instanceId/`,this.path})}}exports.FirebaseInstallationsRequestHandler=FirebaseInstallationsRequestHandler;