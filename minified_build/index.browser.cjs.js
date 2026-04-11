"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var app=require("@firebase/app"),util=require("@firebase/util"),component=require("@firebase/component");
/**
 * @license
 * Copyright 2017 Google LLC
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
 */
const DEFAULT_HOST="firebasestorage.googleapis.com",CONFIG_STORAGE_BUCKET_KEY="storageBucket",DEFAULT_MAX_OPERATION_RETRY_TIME=12e4,DEFAULT_MAX_UPLOAD_RETRY_TIME=6e5,DEFAULT_MIN_SLEEP_TIME_MILLIS=1e3;
/**
 * @license
 * Copyright 2017 Google LLC
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
 */
class StorageError extends util.FirebaseError{constructor(e,t,r=0){super(prependCode(e),`Firebase Storage: ${t} (${prependCode(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,StorageError.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return prependCode(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}function prependCode(e){return"storage/"+e}function unknown(){return new StorageError(exports.StorageErrorCode.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function objectNotFound(e){return new StorageError(exports.StorageErrorCode.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function quotaExceeded(e){return new StorageError(exports.StorageErrorCode.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function unauthenticated(){return new StorageError(exports.StorageErrorCode.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again.")}function unauthorizedApp(){return new StorageError(exports.StorageErrorCode.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function unauthorized(e){return new StorageError(exports.StorageErrorCode.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function retryLimitExceeded(){return new StorageError(exports.StorageErrorCode.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function canceled(){return new StorageError(exports.StorageErrorCode.CANCELED,"User canceled the upload/download.")}function invalidUrl(e){return new StorageError(exports.StorageErrorCode.INVALID_URL,"Invalid URL '"+e+"'.")}function invalidDefaultBucket(e){return new StorageError(exports.StorageErrorCode.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function noDefaultBucket(){return new StorageError(exports.StorageErrorCode.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the 'storageBucket' property when initializing the app?")}function cannotSliceBlob(){return new StorageError(exports.StorageErrorCode.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function serverFileWrongSize(){return new StorageError(exports.StorageErrorCode.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function noDownloadURL(){return new StorageError(exports.StorageErrorCode.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function missingPolyFill(e){return new StorageError(exports.StorageErrorCode.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function invalidArgument(e){return new StorageError(exports.StorageErrorCode.INVALID_ARGUMENT,e)}function appDeleted(){return new StorageError(exports.StorageErrorCode.APP_DELETED,"The Firebase app was deleted.")}function invalidRootOperation(e){return new StorageError(exports.StorageErrorCode.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function invalidFormat(e,t){return new StorageError(exports.StorageErrorCode.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function internalError(e){throw new StorageError(exports.StorageErrorCode.INTERNAL_ERROR,"Internal error: "+e)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */exports.StorageErrorCode=void 0,function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(exports.StorageErrorCode||(exports.StorageErrorCode={}));class Location{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Location.makeFromUrl(e,t)}catch(t){return new Location(e,"")}if(""===r.path)return r;throw invalidDefaultBucket(e)}static makeFromUrl(e,t){let r=null;const n="([A-Za-z0-9.\\-_]+)";const o=new RegExp("^gs://"+n+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}const a=t.replace(/[.]/g,"\\."),i=[{regex:o,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${n}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${t===DEFAULT_HOST?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${n}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let t=0;t<i.length;t++){const n=i[t],o=n.regex.exec(e);if(o){const e=o[n.indices.bucket];let t=o[n.indices.path];t||(t=""),r=new Location(e,t),n.postModify(r);break}}if(null==r)throw invalidUrl(e);return r}}class FailRequest{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function start(e,t,r){let n=1,o=null,s=null,a=!1,i=0;function l(){return 2===i}let u=!1;function c(...e){u||(u=!0,t.apply(null,e))}function h(t){o=setTimeout(()=>{o=null,e(p,l())},t)}function d(){s&&clearTimeout(s)}function p(e,...t){if(u)return void d();if(e)return d(),void c.call(null,e,...t);if(l()||a)return d(),void c.call(null,e,...t);let r;n<64&&(n*=2),1===i?(i=2,r=0):r=1e3*(n+Math.random()),h(r)}let _=!1;function g(e){_||(_=!0,d(),u||(null!==o?(e||(i=2),clearTimeout(o),h(0)):e||(i=1)))}return h(0),s=setTimeout(()=>{a=!0,g(!0)},r),g}function stop(e){e(!1)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function isJustDef(e){return void 0!==e}function isFunction(e){return"function"==typeof e}function isNonArrayObject(e){return"object"==typeof e&&!Array.isArray(e)}function isString(e){return"string"==typeof e||e instanceof String}function isNativeBlob(e){return isNativeBlobDefined()&&e instanceof Blob}function isNativeBlobDefined(){return"undefined"!=typeof Blob}function validateNumber(e,t,r,n){if(n<t)throw invalidArgument(`Invalid value for '${e}'. Expected ${t} or greater.`);if(n>r)throw invalidArgument(`Invalid value for '${e}'. Expected ${r} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function makeUrl(e,t,r){let n=t;return null==r&&(n=`https://${t}`),`${r}://${n}/v0${e}`}function makeQueryString(e){const t=encodeURIComponent;let r="?";for(const n in e)if(e.hasOwnProperty(n)){r=r+(t(n)+"="+t(e[n]))+"&"}return r=r.slice(0,-1),r}var ErrorCode;
/**
 * @license
 * Copyright 2022 Google LLC
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
 */
function isRetryStatusCode(e,t){const r=e>=500&&e<600,n=-1!==[408,429].indexOf(e),o=-1!==t.indexOf(e);return r||n||o}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(ErrorCode||(ErrorCode={}));class NetworkRequest{constructor(e,t,r,n,o,s,a,i,l,u,c,h=!0,d=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=o,this.additionalRetryCodes_=s,this.callback_=a,this.errorCallback_=i,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=c,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new RequestEndStatus(!1,null,!0));const r=this.connectionFactory_();this.pendingConnection_=r;const n=e=>{const t=e.loaded,r=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,r)};null!==this.progressCallback_&&r.addUploadProgressListener(n),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&r.removeUploadProgressListener(n),this.pendingConnection_=null;const t=r.getErrorCode()===ErrorCode.NO_ERROR,o=r.getStatus();if(!t||isRetryStatusCode(o,this.additionalRetryCodes_)&&this.retry){const t=r.getErrorCode()===ErrorCode.ABORT;return void e(!1,new RequestEndStatus(!1,null,t))}const s=-1!==this.successCodes_.indexOf(o);e(!0,new RequestEndStatus(s,r))})},t=(e,t)=>{const r=this.resolve_,n=this.reject_,o=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(o,o.getResponse());isJustDef(e)?r(e):r()}catch(e){n(e)}else if(null!==o){const e=unknown();e.serverResponse=o.getErrorText(),this.errorCallback_?n(this.errorCallback_(o,e)):n(e)}else if(t.canceled){n(this.appDelete_?appDeleted():canceled())}else{n(retryLimitExceeded())}};this.canceled_?t(0,new RequestEndStatus(!1,null,!0)):this.backoffId_=start(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&stop(this.backoffId_),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class RequestEndStatus{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function addAuthHeader_(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}function addVersionHeader_(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function addGmpidHeader_(e,t){t&&(e["X-Firebase-GMPID"]=t)}function addAppCheckHeader_(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}function makeRequest(e,t,r,n,o,s,a=!0,i=!1){const l=makeQueryString(e.urlParams),u=e.url+l,c=Object.assign({},e.headers);return addGmpidHeader_(c,t),addAuthHeader_(c,r),addVersionHeader_(c,s),addAppCheckHeader_(c,n),new NetworkRequest(u,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,o,a,i)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function getBlobBuilder(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function getBlob$1(...e){const t=getBlobBuilder();if(void 0!==t){const r=new t;for(let t=0;t<e.length;t++)r.append(e[t]);return r.getBlob()}if(isNativeBlobDefined())return new Blob(e);throw new StorageError(exports.StorageErrorCode.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function sliceBlob(e,t,r){return e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice?e.slice(t,r):null}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */function decodeBase64(e){if("undefined"==typeof atob)throw missingPolyFill("base-64");return atob(e)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const StringFormat={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class StringData{constructor(e,t){this.data=e,this.contentType=t||null}}function dataFromString(e,t){switch(e){case StringFormat.RAW:return new StringData(utf8Bytes_(t));case StringFormat.BASE64:case StringFormat.BASE64URL:return new StringData(base64Bytes_(e,t));case StringFormat.DATA_URL:return new StringData(dataURLBytes_(t),dataURLContentType_(t))}throw unknown()}function utf8Bytes_(e){const t=[];for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|63&n);else if(55296==(64512&n)){if(r<e.length-1&&56320==(64512&e.charCodeAt(r+1))){n=65536|(1023&n)<<10|1023&e.charCodeAt(++r),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)}else t.push(239,191,189)}else 56320==(64512&n)?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function percentEncodedBytes_(e){let t;try{t=decodeURIComponent(e)}catch(e){throw invalidFormat(StringFormat.DATA_URL,"Malformed data URL.")}return utf8Bytes_(t)}function base64Bytes_(e,t){switch(e){case StringFormat.BASE64:{const r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n){throw invalidFormat(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?")}break}case StringFormat.BASE64URL:{const r=-1!==t.indexOf("+"),n=-1!==t.indexOf("/");if(r||n){throw invalidFormat(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let r;try{r=decodeBase64(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw invalidFormat(e,"Invalid character found")}const n=new Uint8Array(r.length);for(let e=0;e<r.length;e++)n[e]=r.charCodeAt(e);return n}class DataURLParts{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw invalidFormat(StringFormat.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;null!=r&&(this.base64=endsWith(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function dataURLBytes_(e){const t=new DataURLParts(e);return t.base64?base64Bytes_(StringFormat.BASE64,t.rest):percentEncodedBytes_(t.rest)}function dataURLContentType_(e){return new DataURLParts(e).contentType}function endsWith(e,t){return!!(e.length>=t.length)&&e.substring(e.length-t.length)===t}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class FbsBlob{constructor(e,t){let r=0,n="";isNativeBlob(e)?(this.data_=e,r=e.size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}size(){return this.size_}type(){return this.type_}slice(e,t){if(isNativeBlob(this.data_)){const r=sliceBlob(this.data_,e,t);return null===r?null:new FbsBlob(r)}{const r=new Uint8Array(this.data_.buffer,e,t-e);return new FbsBlob(r,!0)}}static getBlob(...e){if(isNativeBlobDefined()){const t=e.map(e=>e instanceof FbsBlob?e.data_:e);return new FbsBlob(getBlob$1.apply(null,t))}{const t=e.map(e=>isString(e)?dataFromString(StringFormat.RAW,e).data:e.data_);let r=0;t.forEach(e=>{r+=e.byteLength});const n=new Uint8Array(r);let o=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)n[o++]=e[t]}),new FbsBlob(n,!0)}}uploadData(){return this.data_}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function jsonObjectOrNull(e){let t;try{t=JSON.parse(e)}catch(e){return null}return isNonArrayObject(t)?t:null}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function parent(e){if(0===e.length)return null;const t=e.lastIndexOf("/");if(-1===t)return"";return e.slice(0,t)}function child(e,t){const r=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?r:e+"/"+r}function lastComponent(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function noXform_(e,t){return t}class Mapping{constructor(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||noXform_}}let mappings_=null;function xformPath(e){return!isString(e)||e.length<2?e:lastComponent(e)}function getMappings(){if(mappings_)return mappings_;const e=[];e.push(new Mapping("bucket")),e.push(new Mapping("generation")),e.push(new Mapping("metageneration")),e.push(new Mapping("name","fullPath",!0));const t=new Mapping("name");t.xform=function(e,t){return xformPath(t)},e.push(t);const r=new Mapping("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new Mapping("timeCreated")),e.push(new Mapping("updated")),e.push(new Mapping("md5Hash",null,!0)),e.push(new Mapping("cacheControl",null,!0)),e.push(new Mapping("contentDisposition",null,!0)),e.push(new Mapping("contentEncoding",null,!0)),e.push(new Mapping("contentLanguage",null,!0)),e.push(new Mapping("contentType",null,!0)),e.push(new Mapping("metadata","customMetadata",!0)),mappings_=e,mappings_}function addRef(e,t){Object.defineProperty(e,"ref",{get:function(){const r=e.bucket,n=e.fullPath,o=new Location(r,n);return t._makeStorageReference(o)}})}function fromResource(e,t,r){const n={type:"file"},o=r.length;for(let e=0;e<o;e++){const o=r[e];n[o.local]=o.xform(n,t[o.server])}return addRef(n,e),n}function fromResourceString(e,t,r){const n=jsonObjectOrNull(t);if(null===n)return null;return fromResource(e,n,r)}function downloadUrlFromResourceString(e,t,r,n){const o=jsonObjectOrNull(t);if(null===o)return null;if(!isString(o.downloadTokens))return null;const s=o.downloadTokens;if(0===s.length)return null;const a=encodeURIComponent;return s.split(",").map(t=>{const o=e.bucket,s=e.fullPath;return makeUrl("/b/"+a(o)+"/o/"+a(s),r,n)+makeQueryString({alt:"media",token:t})})[0]}function toResourceString(e,t){const r={},n=t.length;for(let o=0;o<n;o++){const n=t[o];n.writable&&(r[n.server]=e[n.local])}return JSON.stringify(r)}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */const PREFIXES_KEY="prefixes",ITEMS_KEY="items";function fromBackendResponse(e,t,r){const n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r.prefixes)for(const o of r.prefixes){const r=o.replace(/\/$/,""),s=e._makeStorageReference(new Location(t,r));n.prefixes.push(s)}if(r.items)for(const o of r.items){const r=e._makeStorageReference(new Location(t,o.name));n.items.push(r)}return n}function fromResponseString(e,t,r){const n=jsonObjectOrNull(r);if(null===n)return null;return fromBackendResponse(e,t,n)}class RequestInfo{constructor(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function handlerCheck(e){if(!e)throw unknown()}function metadataHandler(e,t){return function(r,n){const o=fromResourceString(e,n,t);return handlerCheck(null!==o),o}}function listHandler(e,t){return function(r,n){const o=fromResponseString(e,t,n);return handlerCheck(null!==o),o}}function downloadUrlHandler(e,t){return function(r,n){const o=fromResourceString(e,n,t);return handlerCheck(null!==o),downloadUrlFromResourceString(o,n,e.host,e._protocol)}}function sharedErrorHandler(e){return function(t,r){let n;return n=401===t.getStatus()?t.getErrorText().includes("Firebase App Check token is invalid")?unauthorizedApp():unauthenticated():402===t.getStatus()?quotaExceeded(e.bucket):403===t.getStatus()?unauthorized(e.path):r,n.status=t.getStatus(),n.serverResponse=r.serverResponse,n}}function objectErrorHandler(e){const t=sharedErrorHandler(e);return function(r,n){let o=t(r,n);return 404===r.getStatus()&&(o=objectNotFound(e.path)),o.serverResponse=n.serverResponse,o}}function getMetadata$2(e,t,r){const n=makeUrl(t.fullServerUrl(),e.host,e._protocol),o=e.maxOperationRetryTime,s=new RequestInfo(n,"GET",metadataHandler(e,r),o);return s.errorHandler=objectErrorHandler(t),s}function list$2(e,t,r,n,o){const s={};t.isRoot?s.prefix="":s.prefix=t.path+"/",r&&r.length>0&&(s.delimiter=r),n&&(s.pageToken=n),o&&(s.maxResults=o);const a=makeUrl(t.bucketOnlyServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,l=new RequestInfo(a,"GET",listHandler(e,t.bucket),i);return l.urlParams=s,l.errorHandler=sharedErrorHandler(t),l}function getBytes$1(e,t,r){const n=makeUrl(t.fullServerUrl(),e.host,e._protocol)+"?alt=media",o=e.maxOperationRetryTime,s=new RequestInfo(n,"GET",(e,t)=>t,o);return s.errorHandler=objectErrorHandler(t),void 0!==r&&(s.headers.Range=`bytes=0-${r}`,s.successCodes=[200,206]),s}function getDownloadUrl(e,t,r){const n=makeUrl(t.fullServerUrl(),e.host,e._protocol),o=e.maxOperationRetryTime,s=new RequestInfo(n,"GET",downloadUrlHandler(e,r),o);return s.errorHandler=objectErrorHandler(t),s}function updateMetadata$2(e,t,r,n){const o=makeUrl(t.fullServerUrl(),e.host,e._protocol),s=toResourceString(r,n),a=e.maxOperationRetryTime,i=new RequestInfo(o,"PATCH",metadataHandler(e,n),a);return i.headers={"Content-Type":"application/json; charset=utf-8"},i.body=s,i.errorHandler=objectErrorHandler(t),i}function deleteObject$2(e,t){const r=makeUrl(t.fullServerUrl(),e.host,e._protocol),n=e.maxOperationRetryTime;const o=new RequestInfo(r,"DELETE",function(e,t){},n);return o.successCodes=[200,204],o.errorHandler=objectErrorHandler(t),o}function determineContentType_(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function metadataForUpload_(e,t,r){const n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),n.contentType||(n.contentType=determineContentType_(null,t)),n}function multipartUpload(e,t,r,n,o){const s=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};const i=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+i;const l=metadataForUpload_(t,n,o),u="--"+i+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+toResourceString(l,r)+"\r\n--"+i+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",c="\r\n--"+i+"--",h=FbsBlob.getBlob(u,n,c);if(null===h)throw cannotSliceBlob();const d={name:l.fullPath},p=makeUrl(s,e.host,e._protocol),_=e.maxUploadRetryTime,g=new RequestInfo(p,"POST",metadataHandler(e,r),_);return g.urlParams=d,g.headers=a,g.body=h.uploadData(),g.errorHandler=sharedErrorHandler(t),g}class ResumableUploadStatus{constructor(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null}}function checkResumeHeader_(e,t){let r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){handlerCheck(!1)}return handlerCheck(!!r&&-1!==(t||["active"]).indexOf(r)),r}function createResumableUpload(e,t,r,n,o){const s=t.bucketOnlyServerUrl(),a=metadataForUpload_(t,n,o),i={name:a.fullPath},l=makeUrl(s,e.host,e._protocol),u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},c=toResourceString(a,r),h=e.maxUploadRetryTime;const d=new RequestInfo(l,"POST",function(e){let t;checkResumeHeader_(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){handlerCheck(!1)}return handlerCheck(isString(t)),t},h);return d.urlParams=i,d.headers=u,d.body=c,d.errorHandler=sharedErrorHandler(t),d}function getResumableUploadStatus(e,t,r,n){const o=e.maxUploadRetryTime,s=new RequestInfo(r,"POST",function(e){const t=checkResumeHeader_(e,["active","final"]);let r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){handlerCheck(!1)}r||handlerCheck(!1);const o=Number(r);return handlerCheck(!isNaN(o)),new ResumableUploadStatus(o,n.size(),"final"===t)},o);return s.headers={"X-Goog-Upload-Command":"query"},s.errorHandler=sharedErrorHandler(t),s}const RESUMABLE_UPLOAD_CHUNK_SIZE=262144;function continueResumableUpload(e,t,r,n,o,s,a,i){const l=new ResumableUploadStatus(0,0);if(a?(l.current=a.current,l.total=a.total):(l.current=0,l.total=n.size()),n.size()!==l.total)throw serverFileWrongSize();const u=l.total-l.current;let c=u;o>0&&(c=Math.min(c,o));const h=l.current,d=h+c;let p="";p=0===c?"finalize":u===c?"upload, finalize":"upload";const _={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":`${l.current}`},g=n.slice(h,d);if(null===g)throw cannotSliceBlob();const f=t.maxUploadRetryTime,m=new RequestInfo(r,"POST",function(e,r){const o=checkResumeHeader_(e,["active","final"]),a=l.current+c,i=n.size();let u;return u="final"===o?metadataHandler(t,s)(e,r):null,new ResumableUploadStatus(a,i,"final"===o,u)},f);return m.headers=_,m.body=g.uploadData(),m.progressCallback=i||null,m.errorHandler=sharedErrorHandler(e),m}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */const TaskEvent={STATE_CHANGED:"state_changed"},TaskState={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function taskStateFromInternalTaskState(e){switch(e){case"running":case"pausing":case"canceling":return TaskState.RUNNING;case"paused":return TaskState.PAUSED;case"success":return TaskState.SUCCESS;case"canceled":return TaskState.CANCELED;default:return TaskState.ERROR}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class Observer{constructor(e,t,r){if(isFunction(e)||null!=t||null!=r)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function async(e){return(...t)=>{Promise.resolve().then(()=>e(...t))}}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */let textFactoryOverride=null;class XhrConnection{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ErrorCode.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ErrorCode.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ErrorCode.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,n,o){if(this.sent_)throw internalError("cannot .send() more than once");if(util.isCloudWorkstation(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==o)for(const e in o)o.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,o[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw internalError("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw internalError("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw internalError("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw internalError("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class XhrTextConnection extends XhrConnection{initXhr(){this.xhr_.responseType="text"}}function newTextConnection(){return textFactoryOverride?textFactoryOverride():new XhrTextConnection}class XhrBytesConnection extends XhrConnection{initXhr(){this.xhr_.responseType="arraybuffer"}}function newBytesConnection(){return new XhrBytesConnection}class XhrBlobConnection extends XhrConnection{initXhr(){this.xhr_.responseType="blob"}}function newBlobConnection(){return new XhrBlobConnection}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */class UploadTask{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=getMappings(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(exports.StorageErrorCode.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const t=this.isExponentialBackoffExpired();if(isRetryStatusCode(e.status,[])){if(!t)return this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,void this.completeTransitions_();e=retryLimitExceeded()}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(exports.StorageErrorCode.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((e,t)=>{this._resolve=e,this._reject=t,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}})}_createResumable(){this._resolveToken((e,t)=>{const r=createResumableUpload(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,newTextConnection,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const n=getResumableUploadStatus(this._ref.storage,this._ref._location,e,this._blob),o=this._ref.storage._makeRequest(n,newTextConnection,t,r);this._request=o,o.getPromise().then(e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=262144*this._chunkMultiplier,t=new ResumableUploadStatus(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((n,o)=>{let s;try{s=continueResumableUpload(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){return this._error=e,void this._transition("error")}const a=this._ref.storage._makeRequest(s,newTextConnection,n,o,!1);this._request=a,a.getPromise().then(e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){2*(262144*this._chunkMultiplier)<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=getMetadata$2(this._ref.storage,this._ref._location,this._mappings),n=this._ref.storage._makeRequest(r,newTextConnection,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=multipartUpload(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,newTextConnection,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=canceled(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){const e=taskStateFromInternalTaskState(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,n){const o=new Observer(t||void 0,r||void 0,n||void 0);return this._addObserver(o),()=>{this._removeObserver(o)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(taskStateFromInternalTaskState(this._state)){case TaskState.SUCCESS:async(this._resolve.bind(null,this.snapshot))();break;case TaskState.CANCELED:case TaskState.ERROR:async(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(taskStateFromInternalTaskState(this._state)){case TaskState.RUNNING:case TaskState.PAUSED:e.next&&async(e.next.bind(e,this.snapshot))();break;case TaskState.SUCCESS:e.complete&&async(e.complete.bind(e))();break;default:e.error&&async(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}
/**
 * @license
 * Copyright 2019 Google LLC
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
 */class Reference{constructor(e,t){this._service=e,this._location=t instanceof Location?t:Location.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Reference(e,t)}get root(){const e=new Location(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return lastComponent(this._location.path)}get storage(){return this._service}get parent(){const e=parent(this._location.path);if(null===e)return null;const t=new Location(this._location.bucket,e);return new Reference(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw invalidRootOperation(e)}}function getBytesInternal(e,t){e._throwIfRoot("getBytes");const r=getBytes$1(e.storage,e._location,t);return e.storage.makeRequestWithTokens(r,newBytesConnection).then(e=>void 0!==t?e.slice(0,t):e)}function getBlobInternal(e,t){e._throwIfRoot("getBlob");const r=getBytes$1(e.storage,e._location,t);return e.storage.makeRequestWithTokens(r,newBlobConnection).then(e=>void 0!==t?e.slice(0,t):e)}function uploadBytes$1(e,t,r){e._throwIfRoot("uploadBytes");const n=multipartUpload(e.storage,e._location,getMappings(),new FbsBlob(t,!0),r);return e.storage.makeRequestWithTokens(n,newTextConnection).then(t=>({metadata:t,ref:e}))}function uploadBytesResumable$1(e,t,r){return e._throwIfRoot("uploadBytesResumable"),new UploadTask(e,new FbsBlob(t),r)}function uploadString$1(e,t,r=StringFormat.RAW,n){e._throwIfRoot("uploadString");const o=dataFromString(r,t),s={...n};return null==s.contentType&&null!=o.contentType&&(s.contentType=o.contentType),uploadBytes$1(e,o.data,s)}function listAll$1(e){const t={prefixes:[],items:[]};return listAllHelper(e,t).then(()=>t)}async function listAllHelper(e,t,r){const n={pageToken:r},o=await list$1(e,n);t.prefixes.push(...o.prefixes),t.items.push(...o.items),null!=o.nextPageToken&&await listAllHelper(e,t,o.nextPageToken)}function list$1(e,t){null!=t&&"number"==typeof t.maxResults&&validateNumber("options.maxResults",1,1e3,t.maxResults);const r=t||{},n=list$2(e.storage,e._location,"/",r.pageToken,r.maxResults);return e.storage.makeRequestWithTokens(n,newTextConnection)}function getMetadata$1(e){e._throwIfRoot("getMetadata");const t=getMetadata$2(e.storage,e._location,getMappings());return e.storage.makeRequestWithTokens(t,newTextConnection)}function updateMetadata$1(e,t){e._throwIfRoot("updateMetadata");const r=updateMetadata$2(e.storage,e._location,t,getMappings());return e.storage.makeRequestWithTokens(r,newTextConnection)}function getDownloadURL$1(e){e._throwIfRoot("getDownloadURL");const t=getDownloadUrl(e.storage,e._location,getMappings());return e.storage.makeRequestWithTokens(t,newTextConnection).then(e=>{if(null===e)throw noDownloadURL();return e})}function deleteObject$1(e){e._throwIfRoot("deleteObject");const t=deleteObject$2(e.storage,e._location);return e.storage.makeRequestWithTokens(t,newTextConnection)}function _getChild$1(e,t){const r=child(e._location.path,t),n=new Location(e._location.bucket,r);return new Reference(e.storage,n)}
/**
 * @license
 * Copyright 2017 Google LLC
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
 */function isUrl(e){return/^[A-Za-z]+:\/\//.test(e)}function refFromURL(e,t){return new Reference(e,t)}function refFromPath(e,t){if(e instanceof FirebaseStorageImpl){const r=e;if(null==r._bucket)throw noDefaultBucket();const n=new Reference(r,r._bucket);return null!=t?refFromPath(n,t):n}return void 0!==t?_getChild$1(e,t):e}function ref$1(e,t){if(t&&isUrl(t)){if(e instanceof FirebaseStorageImpl)return refFromURL(e,t);throw invalidArgument("To use ref(service, url), the first argument must be a Storage instance.")}return refFromPath(e,t)}function extractBucket(e,t){const r=t?.storageBucket;return null==r?null:Location.makeFromBucketSpec(r,e)}function connectStorageEmulator$1(e,t,r,n={}){e.host=`${t}:${r}`;const o=util.isCloudWorkstation(t);o&&util.pingServer(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=o?"https":"http";const{mockUserToken:s}=n;s&&(e._overrideAuthToken="string"==typeof s?s:util.createMockUserToken(s,e.app.options.projectId))}class FirebaseStorageImpl{constructor(e,t,r,n,o,s=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=n,this._firebaseVersion=o,this._isUsingEmulator=s,this._bucket=null,this._host=DEFAULT_HOST,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=n?Location.makeFromBucketSpec(n,this._host):extractBucket(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=Location.makeFromBucketSpec(this._url,e):this._bucket=extractBucket(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){validateNumber("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){validateNumber("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if(app._isFirebaseServerApp(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Reference(this,e)}_makeRequest(e,t,r,n,o=!0){if(this._deleted)return new FailRequest(appDeleted());{const s=makeRequest(e,this._appId,r,n,t,this._firebaseVersion,o,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){const[r,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,n).getPromise()}}const name="@firebase/storage",version="0.14.2",STORAGE_TYPE="storage";
/**
 * @license
 * Copyright 2020 Google LLC
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
 */
function getBytes(e,t){return getBytesInternal(e=util.getModularInstance(e),t)}function uploadBytes(e,t,r){return uploadBytes$1(e=util.getModularInstance(e),t,r)}function uploadString(e,t,r,n){return uploadString$1(e=util.getModularInstance(e),t,r,n)}function uploadBytesResumable(e,t,r){return uploadBytesResumable$1(e=util.getModularInstance(e),t,r)}function getMetadata(e){return getMetadata$1(e=util.getModularInstance(e))}function updateMetadata(e,t){return updateMetadata$1(e=util.getModularInstance(e),t)}function list(e,t){return list$1(e=util.getModularInstance(e),t)}function listAll(e){return listAll$1(e=util.getModularInstance(e))}function getDownloadURL(e){return getDownloadURL$1(e=util.getModularInstance(e))}function deleteObject(e){return deleteObject$1(e=util.getModularInstance(e))}function ref(e,t){return ref$1(e=util.getModularInstance(e),t)}function _getChild(e,t){return _getChild$1(e,t)}function getStorage(e=app.getApp(),t){e=util.getModularInstance(e);const r=app._getProvider(e,"storage").getImmediate({identifier:t}),n=util.getDefaultEmulatorHostnameAndPort("storage");return n&&connectStorageEmulator(r,...n),r}function connectStorageEmulator(e,t,r,n={}){connectStorageEmulator$1(e,t,r,n)}
/**
 * @license
 * Copyright 2021 Google LLC
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
 */function getBlob(e,t){return getBlobInternal(e=util.getModularInstance(e),t)}function getStream(e,t){throw new Error("getStream() is only supported by NodeJS builds")}function factory(e,{instanceIdentifier:t}){const r=e.getProvider("app").getImmediate(),n=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return new FirebaseStorageImpl(r,n,o,t,app.SDK_VERSION)}function registerStorage(){app._registerComponent(new component.Component("storage",factory,"PUBLIC").setMultipleInstances(!0)),app.registerVersion(name,version,""),app.registerVersion(name,version,"cjs2020")}registerStorage(),exports.StorageError=StorageError,exports.StringFormat=StringFormat,exports._FbsBlob=FbsBlob,exports._Location=Location,exports._TaskEvent=TaskEvent,exports._TaskState=TaskState,exports._UploadTask=UploadTask,exports._dataFromString=dataFromString,exports._getChild=_getChild,exports._invalidArgument=invalidArgument,exports._invalidRootOperation=invalidRootOperation,exports.connectStorageEmulator=connectStorageEmulator,exports.deleteObject=deleteObject,exports.getBlob=getBlob,exports.getBytes=getBytes,exports.getDownloadURL=getDownloadURL,exports.getMetadata=getMetadata,exports.getStorage=getStorage,exports.getStream=getStream,exports.list=list,exports.listAll=listAll,exports.ref=ref,exports.updateMetadata=updateMetadata,exports.uploadBytes=uploadBytes,exports.uploadBytesResumable=uploadBytesResumable,exports.uploadString=uploadString;