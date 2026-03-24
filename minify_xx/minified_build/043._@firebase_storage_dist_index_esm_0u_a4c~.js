(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,"[project]/booking/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)",e=>{"use strict";e.s(["StorageError",()=>i,"StorageErrorCode",()=>a,"StringFormat",()=>I,"_FbsBlob",()=>M,"_Location",()=>T,"_TaskEvent",()=>ce,"_TaskState",()=>ue,"_UploadTask",()=>Re,"_dataFromString",()=>N,"_getChild",()=>Ge,"_invalidArgument",()=>p,"_invalidRootOperation",()=>g,"connectStorageEmulator",()=>Xe,"deleteObject",()=>Ve,"getBlob",()=>Ke,"getBytes",()=>De,"getDownloadURL",()=>ze,"getMetadata",()=>qe,"getStorage",()=>$e,"getStream",()=>Ze,"list",()=>He,"listAll",()=>je,"ref",()=>We,"updateMetadata",()=>Fe,"uploadBytes",()=>Le,"uploadBytesResumable",()=>Be,"uploadString",()=>Me]);var t=e.i("[project]/booking/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>"),n=e.i("[project]/booking/node_modules/@firebase/util/dist/index.esm.js [app-client] (ecmascript)"),s=e.i("[project]/booking/node_modules/@firebase/component/dist/esm/index.esm.js [app-client] (ecmascript)");
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
 */const r="firebasestorage.googleapis.com",o="storageBucket";
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
 */class i extends n.FirebaseError{constructor(e,t,n=0){super(u(e),`Firebase Storage: ${t} (${u(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,i.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return u(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var a,c;function u(e){return"storage/"+e}function l(){return new i(a.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function h(){return new i(a.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function d(){return new i(a.CANCELED,"User canceled the upload/download.")}function _(){return new i(a.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function p(e){return new i(a.INVALID_ARGUMENT,e)}function f(){return new i(a.APP_DELETED,"The Firebase app was deleted.")}function g(e){return new i(a.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function m(e,t){return new i(a.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function b(e){throw new i(a.INTERNAL_ERROR,"Internal error: "+e)}
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
 */!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(a||(a={}));class T{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=T.makeFromUrl(e,t)}catch(t){return new T(e,"")}if(""===n.path)return n;throw s=e,new i(a.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+s+"'.");var s}static makeFromUrl(e,t){let n=null;const s="([A-Za-z0-9.\\-_]+)",o=new RegExp("^gs://"+s+"(/(.*))?$","i");function c(e){e.path_=decodeURIComponent(e.path)}const u=t.replace(/[.]/g,"\\."),l=[{regex:o,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${u}/v[A-Za-z0-9_]+/b/${s}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:c},{regex:new RegExp(`^https?://${t===r?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${s}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:c}];for(let t=0;t<l.length;t++){const s=l[t],r=s.regex.exec(e);if(r){const e=r[s.indices.bucket];let t=r[s.indices.path];t||(t=""),n=new T(e,t),s.postModify(n);break}}if(null==n)throw function(e){return new i(a.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class R{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
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
 */function w(e){return"string"==typeof e||e instanceof String}function k(e){return E()&&e instanceof Blob}function E(){return"undefined"!=typeof Blob}function v(e,t,n,s){if(s<t)throw p(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw p(`Invalid value for '${e}'. Expected ${n} or less.`)}
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
 */function y(e,t,n){let s=t;return null==n&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function U(e){const t=encodeURIComponent;let n="?";for(const s in e)e.hasOwnProperty(s)&&(n=n+(t(s)+"=")+t(e[s])+"&");return n=n.slice(0,-1),n}
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
 */function O(e,t){const n=e>=500&&e<600,s=-1!==[408,429].indexOf(e),r=-1!==t.indexOf(e);return n||s||r}
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
 */!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(c||(c={}));class C{constructor(e,t,n,s,r,o,i,a,c,u,l,h=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=i,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=l,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{const n=this.resolve_,s=this.reject_,r=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(r,r.getResponse());void 0!==e?n(e):n()}catch(e){s(e)}else if(null!==r){const e=l();e.serverResponse=r.getErrorText(),this.errorCallback_?s(this.errorCallback_(r,e)):s(e)}else t.canceled?s(this.appDelete_?f():d()):s(h())};this.canceled_?e(0,new A(!1,null,!0)):this.backoffId_=function(e,t,n){let s=1,r=null,o=null,i=!1,a=0;function c(){return 2===a}let u=!1;function l(...e){u||(u=!0,t.apply(null,e))}function h(t){r=setTimeout(()=>{r=null,e(_,c())},t)}function d(){o&&clearTimeout(o)}function _(e,...t){if(u)return void d();if(e)return d(),void l.call(null,e,...t);if(c()||i)return d(),void l.call(null,e,...t);let n;s<64&&(s*=2),1===a?(a=2,n=0):n=1e3*(s+Math.random()),h(n)}let p=!1;function f(e){p||(p=!0,d(),u||(null!==r?(e||(a=2),clearTimeout(r),h(0)):e||(a=1)))}return h(0),o=setTimeout(()=>{i=!0,f(!0)},n),f}((e,t)=>{if(t)return void e(!1,new A(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const s=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(s),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(s),this.pendingConnection_=null;const t=n.getErrorCode()===c.NO_ERROR,r=n.getStatus();if(!t||O(r,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===c.ABORT;return void e(!1,new A(!1,null,t))}const o=-1!==this.successCodes_.indexOf(r);e(!0,new A(o,n))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class A{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function x(...e){const t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(E())return new Blob(e);throw new i(a.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}
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
 */
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
const I={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class S{constructor(e,t){this.data=e,this.contentType=t||null}}function N(e,t){switch(e){case I.RAW:return new S(P(t));case I.BASE64:case I.BASE64URL:return new S(D(e,t));case I.DATA_URL:return new S(function(e){const t=new L(e);return t.base64?D(I.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw m(I.DATA_URL,"Malformed data URL.")}return P(t)}(t.rest)}(t),new L(t).contentType)}throw l()}function P(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);s<=127?t.push(s):s<=2047?t.push(192|s>>6,128|63&s):55296==(64512&s)?n<e.length-1&&56320==(64512&e.charCodeAt(n+1))?(s=65536|(1023&s)<<10|1023&e.charCodeAt(++n),t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|63&s)):t.push(239,191,189):56320==(64512&s)?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|63&s)}return new Uint8Array(t)}function D(e,t){switch(e){case I.BASE64:{const n=-1!==t.indexOf("-"),s=-1!==t.indexOf("_");if(n||s)throw m(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break}case I.BASE64URL:{const n=-1!==t.indexOf("+"),s=-1!==t.indexOf("/");if(n||s)throw m(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=function(e){if("undefined"==typeof atob)throw new i(a.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw m(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let e=0;e<n.length;e++)s[e]=n.charCodeAt(e);return s}class L{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw m(I.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){return e.length>=7&&e.substring(e.length-7)===t}
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
 */(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class M{constructor(e,t){let n=0,s="";k(e)?(this.data_=e,n=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(k(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new M(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new M(n,!0)}}static getBlob(...e){if(E()){const t=e.map(e=>e instanceof M?e.data_:e);return new M(x.apply(null,t))}{const t=e.map(e=>w(e)?N(I.RAW,e).data:e.data_);let n=0;t.forEach(e=>{n+=e.byteLength});const s=new Uint8Array(n);let r=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)s[r++]=e[t]}),new M(s,!0)}}uploadData(){return this.data_}}
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
 */function B(e){let t;try{t=JSON.parse(e)}catch(e){return null}return"object"!=typeof(n=t)||Array.isArray(n)?null:t;var n}
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
 */function q(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
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
 */function F(e,t){return t}class H{constructor(e,t,n,s){this.server=e,this.local=t||e,this.writable=!!n,this.xform=s||F}}let j=null;function z(){if(j)return j;const e=[];e.push(new H("bucket")),e.push(new H("generation")),e.push(new H("metageneration")),e.push(new H("name","fullPath",!0));const t=new H("name");t.xform=function(e,t){return function(e){return!w(e)||e.length<2?e:q(e)}(t)},e.push(t);const n=new H("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new H("timeCreated")),e.push(new H("updated")),e.push(new H("md5Hash",null,!0)),e.push(new H("cacheControl",null,!0)),e.push(new H("contentDisposition",null,!0)),e.push(new H("contentEncoding",null,!0)),e.push(new H("contentLanguage",null,!0)),e.push(new H("contentType",null,!0)),e.push(new H("metadata","customMetadata",!0)),j=e,j}function V(e,t,n){const s=B(t);return null===s?null:function(e,t,n){const s={type:"file"},r=n.length;for(let e=0;e<r;e++){const r=n[e];s[r.local]=r.xform(s,t[r.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,s=e.fullPath,r=new T(n,s);return t._makeStorageReference(r)}})}(s,e),s}(e,s,n)}function W(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const s=t[r];s.writable&&(n[s.server]=e[s.local])}return JSON.stringify(n)}
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
 */const G="prefixes",$="items";class X{constructor(e,t,n,s){this.url=e,this.method=t,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]
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
 */}}function K(e){if(!e)throw l()}function Z(e,t){return function(n,s){const r=V(e,s,t);return K(null!==r),r}}function J(e){return function(t,n){let s;var r,o;return 401===t.getStatus()?s=t.getErrorText().includes("Firebase App Check token is invalid")?new i(a.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new i(a.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,s=new i(a.QUOTA_EXCEEDED,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(r=e.path,s=new i(a.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")):s=n,s.status=t.getStatus(),s.serverResponse=n.serverResponse,s}}function Y(e){const t=J(e);return function(n,s){let r=t(n,s);var o;return 404===n.getStatus()&&(o=e.path,r=new i(a.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")),r.serverResponse=s.serverResponse,r}}function Q(e,t,n){const s=y(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,o=new X(s,"GET",Z(e,n),r);return o.errorHandler=Y(t),o}function ee(e,t,n,s,r){const o={};t.isRoot?o.prefix="":o.prefix=t.path+"/",n&&n.length>0&&(o.delimiter=n),s&&(o.pageToken=s),r&&(o.maxResults=r);const i=y(t.bucketOnlyServerUrl(),e.host,e._protocol),a=e.maxOperationRetryTime,c=new X(i,"GET",function(e,t){return function(n,s){const r=function(e,t,n){const s=B(n);return null===s?null:function(e,t,n){const s={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[G])for(const r of n[G]){const n=r.replace(/\/$/,""),o=e._makeStorageReference(new T(t,n));s.prefixes.push(o)}if(n[$])for(const r of n[$]){const n=e._makeStorageReference(new T(t,r.name));s.items.push(n)}return s}(e,t,s)}(e,t,s);return K(null!==r),r}}(e,t.bucket),a);return c.urlParams=o,c.errorHandler=J(t),c}function te(e,t,n){const s=y(t.fullServerUrl(),e.host,e._protocol)+"?alt=media",r=e.maxOperationRetryTime,o=new X(s,"GET",(e,t)=>t,r);return o.errorHandler=Y(t),void 0!==n&&(o.headers.Range=`bytes=0-${n}`,o.successCodes=[200,206]),o}function ne(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=function(e,t){return t&&t.type()||"application/octet-stream"}(0,t)),s}function se(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"},a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();i["Content-Type"]="multipart/related; boundary="+a;const c=ne(t,s,r),u="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+W(c,n)+"\r\n--"+a+"\r\nContent-Type: "+c.contentType+"\r\n\r\n",l="\r\n--"+a+"--",h=M.getBlob(u,s,l);if(null===h)throw _();const d={name:c.fullPath},p=y(o,e.host,e._protocol),f=e.maxUploadRetryTime,g=new X(p,"POST",Z(e,n),f);return g.urlParams=d,g.headers=i,g.body=h.uploadData(),g.errorHandler=J(t),g}class re{constructor(e,t,n,s){this.current=e,this.total=t,this.finalized=!!n,this.metadata=s||null}}function oe(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){K(!1)}return K(!!n&&-1!==(t||["active"]).indexOf(n)),n}const ie=262144;function ae(e,t,n,s,r,o,c,u){const l=new re(0,0);if(c?(l.current=c.current,l.total=c.total):(l.current=0,l.total=s.size()),s.size()!==l.total)throw new i(a.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");const h=l.total-l.current;let d=h;r>0&&(d=Math.min(d,r));const p=l.current,f=p+d;let g="";g=0===d?"finalize":h===d?"upload, finalize":"upload";const m={"X-Goog-Upload-Command":g,"X-Goog-Upload-Offset":`${l.current}`},b=s.slice(p,f);if(null===b)throw _();const T=t.maxUploadRetryTime,R=new X(n,"POST",function(e,n){const r=oe(e,["active","final"]),i=l.current+d,a=s.size();let c;return c="final"===r?Z(t,o)(e,n):null,new re(i,a,"final"===r,c)},T);return R.headers=m,R.body=b.uploadData(),R.progressCallback=u||null,R.errorHandler=J(e),R}
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
 */const ce={STATE_CHANGED:"state_changed"},ue={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function le(e){switch(e){case"running":case"pausing":case"canceling":return ue.RUNNING;case"paused":return ue.PAUSED;case"success":return ue.SUCCESS;case"canceled":return ue.CANCELED;default:return ue.ERROR}}
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
 */class he{constructor(e,t,n){if("function"==typeof e||null!=t||null!=n)this.next=e,this.error=t??void 0,this.complete=n??void 0;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}
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
 */function de(e){return(...t)=>{Promise.resolve().then(()=>e(...t))}}
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
 */class _e{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=c.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=c.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=c.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,s,r,o){if(this.sent_)throw b("cannot .send() more than once");if((0,n.isCloudWorkstation)(e)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==o)for(const e in o)o.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,o[e].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw b("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw b("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw b("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw b("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class pe extends _e{initXhr(){this.xhr_.responseType="text"}}function fe(){return new pe}class ge extends _e{initXhr(){this.xhr_.responseType="arraybuffer"}}function me(){return new ge}class be extends _e{initXhr(){this.xhr_.responseType="blob"}}function Te(){return new be}
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
 */class Re{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=z(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(a.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const t=this.isExponentialBackoffExpired();if(O(e.status,[])){if(!t)return this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,void this.completeTransitions_();e=h()}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(a.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((e,t)=>{this._resolve=e,this._reject=t,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,n])=>{switch(this._state){case"running":e(t,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}})}_createResumable(){this._resolveToken((e,t)=>{const n=function(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i=ne(t,s,r),a={name:i.fullPath},c=y(o,e.host,e._protocol),u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${s.size()}`,"X-Goog-Upload-Header-Content-Type":i.contentType,"Content-Type":"application/json; charset=utf-8"},l=W(i,n),h=e.maxUploadRetryTime,d=new X(c,"POST",function(e){let t;oe(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){K(!1)}return K(w(t)),t},h);return d.urlParams=a,d.headers=u,d.body=l,d.errorHandler=J(t),d}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,fe,e,t);this._request=s,s.getPromise().then(e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,n)=>{const s=function(e,t,n,s){const r=e.maxUploadRetryTime,o=new X(n,"POST",function(e){const t=oe(e,["active","final"]);let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){K(!1)}n||K(!1);const r=Number(n);return K(!isNaN(r)),new re(r,s.size(),"final"===t)},r);return o.headers={"X-Goog-Upload-Command":"query"},o.errorHandler=J(t),o}(this._ref.storage,this._ref._location,e,this._blob),r=this._ref.storage._makeRequest(s,fe,t,n);this._request=r,r.getPromise().then(e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=ie*this._chunkMultiplier,t=new re(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((s,r)=>{let o;try{o=ae(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){return this._error=e,void this._transition("error")}const i=this._ref.storage._makeRequest(o,fe,s,r,!1);this._request=i,i.getPromise().then(e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){ie*this._chunkMultiplier*2<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const n=Q(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(n,fe,e,t);this._request=s,s.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const n=se(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,fe,e,t);this._request=s,s.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=d(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){const e=le(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,s){const r=new he(t||void 0,n||void 0,s||void 0);return this._addObserver(r),()=>{this._removeObserver(r)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(le(this._state)){case ue.SUCCESS:de(this._resolve.bind(null,this.snapshot))();break;case ue.CANCELED:case ue.ERROR:de(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(le(this._state)){case ue.RUNNING:case ue.PAUSED:e.next&&de(e.next.bind(e,this.snapshot))();break;case ue.SUCCESS:e.complete&&de(e.complete.bind(e))();break;case ue.CANCELED:case ue.ERROR:default:e.error&&de(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e
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
 */}}class we{constructor(e,t){this._service=e,this._location=t instanceof T?t:T.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new we(e,t)}get root(){const e=new T(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return q(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new T(this._location.bucket,e);return new we(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw g(e)}}function ke(e,t,n){e._throwIfRoot("uploadBytes");const s=se(e.storage,e._location,z(),new M(t,!0),n);return e.storage.makeRequestWithTokens(s,fe).then(t=>({metadata:t,ref:e}))}function Ee(e){const t={prefixes:[],items:[]};return ve(e,t).then(()=>t)}async function ve(e,t,n){const s={pageToken:n},r=await ye(e,s);t.prefixes.push(...r.prefixes),t.items.push(...r.items),null!=r.nextPageToken&&await ve(e,t,r.nextPageToken)}function ye(e,t){null!=t&&"number"==typeof t.maxResults&&v("options.maxResults",1,1e3,t.maxResults);const n=t||{},s=ee(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(s,fe)}function Ue(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const s=y(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,o=new X(s,"GET",function(e,t){return function(n,s){const r=V(e,s,t);return K(null!==r),function(e,t,n,s){const r=B(t);if(null===r)return null;if(!w(r.downloadTokens))return null;const o=r.downloadTokens;if(0===o.length)return null;const i=encodeURIComponent;return o.split(",").map(t=>{const r=e.bucket,o=e.fullPath;return y("/b/"+i(r)+"/o/"+i(o),n,s)+U({alt:"media",token:t})})[0]}(r,s,e.host,e._protocol)}}(e,n),r);return o.errorHandler=Y(t),o}(e.storage,e._location,z());return e.storage.makeRequestWithTokens(t,fe).then(e=>{if(null===e)throw new i(a.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}function Oe(e,t){const n=function(e,t){const n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),s=new T(e._location.bucket,n);return new we(e.storage,s)}
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
 */function Ce(e,t){if(e instanceof Ie){const n=e;if(null==n._bucket)throw new i(a.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+o+"' property when initializing the app?");const s=new we(n,n._bucket);return null!=t?Ce(s,t):s}return void 0!==t?Oe(e,t):e}function Ae(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof Ie)return new we(e,t);throw p("To use ref(service, url), the first argument must be a Storage instance.")}return Ce(e,t)}function xe(e,t){const n=t?.[o];return null==n?null:T.makeFromBucketSpec(n,e)}class Ie{constructor(e,t,n,s,o,i=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=s,this._firebaseVersion=o,this._isUsingEmulator=i,this._bucket=null,this._host=r,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=s?T.makeFromBucketSpec(s,this._host):xe(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=T.makeFromBucketSpec(this._url,e):this._bucket=xe(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){v("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){v("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if((0,t._isFirebaseServerApp)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new we(this,e)}_makeRequest(e,t,n,s,r=!0){if(this._deleted)return new R(f());{const o=function(e,t,n,s,r,o,i=!0,a=!1){const c=U(e.urlParams),u=e.url+c,l=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(l,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(l,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(l,o),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(l,s),new C(u,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,i,a)}
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
 */(e,this._appId,n,s,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,s).getPromise()}}const Se="@firebase/storage",Ne="0.14.2",Pe="storage";
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
 */function De(e,t){return function(e,t){e._throwIfRoot("getBytes");const n=te(e.storage,e._location,t);return e.storage.makeRequestWithTokens(n,me).then(e=>void 0!==t?e.slice(0,t):e)}(e=(0,n.getModularInstance)(e),t)}function Le(e,t,s){return ke(e=(0,n.getModularInstance)(e),t,s)}function Me(e,t,s,r){return function(e,t,n=I.RAW,s){e._throwIfRoot("uploadString");const r=N(n,t),o={...s};return null==o.contentType&&null!=r.contentType&&(o.contentType=r.contentType),ke(e,r.data,o)}(e=(0,n.getModularInstance)(e),t,s,r)}function Be(e,t,s){return function(e,t,n){return e._throwIfRoot("uploadBytesResumable"),new Re(e,new M(t),n)}(e=(0,n.getModularInstance)(e),t,s)}function qe(e){return function(e){e._throwIfRoot("getMetadata");const t=Q(e.storage,e._location,z());return e.storage.makeRequestWithTokens(t,fe)}(e=(0,n.getModularInstance)(e))}function Fe(e,t){return function(e,t){e._throwIfRoot("updateMetadata");const n=function(e,t,n,s){const r=y(t.fullServerUrl(),e.host,e._protocol),o=W(n,s),i=e.maxOperationRetryTime,a=new X(r,"PATCH",Z(e,s),i);return a.headers={"Content-Type":"application/json; charset=utf-8"},a.body=o,a.errorHandler=Y(t),a}(e.storage,e._location,t,z());return e.storage.makeRequestWithTokens(n,fe)}(e=(0,n.getModularInstance)(e),t)}function He(e,t){return ye(e=(0,n.getModularInstance)(e),t)}function je(e){return Ee(e=(0,n.getModularInstance)(e))}function ze(e){return Ue(e=(0,n.getModularInstance)(e))}function Ve(e){return function(e){e._throwIfRoot("deleteObject");const t=function(e,t){const n=y(t.fullServerUrl(),e.host,e._protocol),s=e.maxOperationRetryTime,r=new X(n,"DELETE",function(e,t){},s);return r.successCodes=[200,204],r.errorHandler=Y(t),r}(e.storage,e._location);return e.storage.makeRequestWithTokens(t,fe)}(e=(0,n.getModularInstance)(e))}function We(e,t){return Ae(e=(0,n.getModularInstance)(e),t)}function Ge(e,t){return Oe(e,t)}function $e(e=(0,t.getApp)(),s){e=(0,n.getModularInstance)(e);const r=(0,t._getProvider)(e,Pe).getImmediate({identifier:s}),o=(0,n.getDefaultEmulatorHostnameAndPort)("storage");return o&&Xe(r,...o),r}function Xe(e,t,s,r={}){!function(e,t,s,r={}){e.host=`${t}:${s}`;const o=(0,n.isCloudWorkstation)(t);o&&(0,n.pingServer)(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=o?"https":"http";const{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:(0,n.createMockUserToken)(i,e.app.options.projectId))}(e,t,s,r)}
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
 */function Ke(e,t){return function(e,t){e._throwIfRoot("getBlob");const n=te(e.storage,e._location,t);return e.storage.makeRequestWithTokens(n,Te).then(e=>void 0!==t?e.slice(0,t):e)}(e=(0,n.getModularInstance)(e),t)}function Ze(e,t){throw new Error("getStream() is only supported by NodeJS builds")}(0,t._registerComponent)(new s.Component(Pe,function(e,{instanceIdentifier:n}){const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return new Ie(s,r,o,n,t.SDK_VERSION)},"PUBLIC").setMultipleInstances(!0)),(0,t.registerVersion)(Se,Ne,""),(0,t.registerVersion)(Se,Ne,"esm2020")}]);