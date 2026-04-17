"use strict";var app=require("@firebase/app"),util=require("@firebase/util"),bloomBlob=require("@firebase/webchannel-wrapper/bloom-blob"),logger=require("@firebase/logger"),webchannelBlob=require("@firebase/webchannel-wrapper/webchannel-blob");
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
 */class User{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}User.UNAUTHENTICATED=new User(null),User.GOOGLE_CREDENTIALS=new User("google-credentials-uid"),User.FIRST_PARTY=new User("first-party-uid"),User.MOCK_USER=new User("mock-user");
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
let b="12.11.0";function __PRIVATE_setSDKVersion(e){b=e}
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
 */const S=new logger.Logger("@firebase/firestore");function __PRIVATE_getLogLevel(){return S.logLevel}function setLogLevel(e){S.setLogLevel(e)}function __PRIVATE_logDebug(e,...t){if(S.logLevel<=logger.LogLevel.DEBUG){const r=t.map(__PRIVATE_argToString);S.debug(`Firestore (${b}): ${e}`,...r)}}function __PRIVATE_logError(e,...t){if(S.logLevel<=logger.LogLevel.ERROR){const r=t.map(__PRIVATE_argToString);S.error(`Firestore (${b}): ${e}`,...r)}}function __PRIVATE_logWarn(e,...t){if(S.logLevel<=logger.LogLevel.WARN){const r=t.map(__PRIVATE_argToString);S.warn(`Firestore (${b}): ${e}`,...r)}}function __PRIVATE_argToString(e){if("string"==typeof e)return e;try{return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
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
 */function fail(e,t,r){let n="Unexpected state";"string"==typeof t?n=t:r=t,__PRIVATE__fail(e,n,r)}function __PRIVATE__fail(e,t,r){let n=`FIRESTORE (${b}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==r)try{n+=" CONTEXT: "+JSON.stringify(r)}catch(e){n+=" CONTEXT: "+r}throw __PRIVATE_logError(n),new Error(n)}function __PRIVATE_hardAssert(e,t,r,n){let s="Unexpected state";"string"==typeof r?s=r:n=r,e||__PRIVATE__fail(t,s,n)}function __PRIVATE_debugAssert(e,t){e||fail(57014,t)}function __PRIVATE_debugCast(e,t){return e}
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
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class FirestoreError extends util.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`
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
 */}}class __PRIVATE_Deferred{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
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
 */class __PRIVATE_OAuthToken{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class __PRIVATE_EmptyAuthCredentialsProvider{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(User.UNAUTHENTICATED))}shutdown(){}}class __PRIVATE_EmulatorAuthCredentialsProvider{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class __PRIVATE_FirebaseAuthCredentialsProvider{constructor(e){this.t=e,this.currentUser=User.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){__PRIVATE_hardAssert(void 0===this.o,42304);let r=this.i;const n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve();let s=new __PRIVATE_Deferred;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new __PRIVATE_Deferred,e.enqueueRetryable(()=>n(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},o=e=>{__PRIVATE_logDebug("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(__PRIVATE_logDebug("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new __PRIVATE_Deferred)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(__PRIVATE_logDebug("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(__PRIVATE_hardAssert("string"==typeof t.accessToken,31837,{l:t}),new __PRIVATE_OAuthToken(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return __PRIVATE_hardAssert(null===e||"string"==typeof e,2055,{h:e}),new User(e)}}class __PRIVATE_FirstPartyToken{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=User.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class __PRIVATE_FirstPartyAuthCredentialsProvider{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new __PRIVATE_FirstPartyToken(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(User.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class AppCheckToken{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class __PRIVATE_FirebaseAppCheckTokenProvider{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,app._isFirebaseServerApp(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){__PRIVATE_hardAssert(void 0===this.o,3512);const r=e=>{null!=e.error&&__PRIVATE_logDebug("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const r=e.token!==this.m;return this.m=e.token,__PRIVATE_logDebug("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};const n=e=>{__PRIVATE_logDebug("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?n(e):__PRIVATE_logDebug("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new AppCheckToken(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(__PRIVATE_hardAssert("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new AppCheckToken(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class __PRIVATE_EmptyAppCheckTokenProvider{getToken(){return Promise.resolve(new AppCheckToken(""))}invalidateToken(){}start(e,t){}shutdown(){}}
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
 */function __PRIVATE_randomBytes(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let t=0;t<e;t++)r[t]=Math.floor(256*Math.random());return r}
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
 */class __PRIVATE_AutoId{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const r=__PRIVATE_randomBytes(40);for(let n=0;n<r.length;++n)t.length<20&&r[n]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(r[n]%62))}return t}}function __PRIVATE_primitiveComparator(e,t){return e<t?-1:e>t?1:0}function __PRIVATE_compareUtf8Strings(e,t){const r=Math.min(e.length,t.length);for(let n=0;n<r;n++){const r=e.charAt(n),s=t.charAt(n);if(r!==s)return __PRIVATE_isSurrogate(r)===__PRIVATE_isSurrogate(s)?__PRIVATE_primitiveComparator(r,s):__PRIVATE_isSurrogate(r)?1:-1}return __PRIVATE_primitiveComparator(e.length,t.length)}const C=55296,v=57343;function __PRIVATE_isSurrogate(e){const t=e.charCodeAt(0);return t>=C&&t<=v}function __PRIVATE_arrayEquals(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}function __PRIVATE_isOptionalEqual(e,t,r){return void 0===e&&void 0===t||void 0!==e&&void 0!==t&&r(e,t)}function __PRIVATE_immediateSuccessor(e){return e+"\0"}
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
 */const F="__name__";class BasePath{constructor(e,t,r){void 0===t?t=0:t>e.length&&fail(637,{offset:t,range:e.length}),void 0===r?r=e.length-t:r>e.length-t&&fail(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===BasePath.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof BasePath?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let n=0;n<r;n++){const r=BasePath.compareSegments(e.get(n),t.get(n));if(0!==r)return r}return __PRIVATE_primitiveComparator(e.length,t.length)}static compareSegments(e,t){const r=BasePath.isNumericId(e),n=BasePath.isNumericId(t);return r&&!n?-1:!r&&n?1:r&&n?BasePath.extractNumericId(e).compare(BasePath.extractNumericId(t)):__PRIVATE_compareUtf8Strings(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return bloomBlob.Integer.fromString(e.substring(4,e.length-2))}}class ResourcePath extends BasePath{construct(e,t,r){return new ResourcePath(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new FirestoreError(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new ResourcePath(t)}static emptyPath(){return new ResourcePath([])}}const M=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class FieldPath$1 extends BasePath{construct(e,t,r){return new FieldPath$1(e,t,r)}static isValidIdentifier(e){return M.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),FieldPath$1.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===F}static keyField(){return new FieldPath$1([F])}static fromServerFormat(e){const t=[];let r="",n=0;const s=()=>{if(0===r.length)throw new FirestoreError(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let i=!1;for(;n<e.length;){const t=e[n];if("\\"===t){if(n+1===e.length)throw new FirestoreError(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new FirestoreError(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?(i=!i,n++):"."!==t||i?(r+=t,n++):(s(),n++)}if(s(),i)throw new FirestoreError(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new FieldPath$1(t)}static emptyPath(){return new FieldPath$1([])}}
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
 */class DocumentKey{constructor(e){this.path=e}static fromPath(e){return new DocumentKey(ResourcePath.fromString(e))}static fromName(e){return new DocumentKey(ResourcePath.fromString(e).popFirst(5))}static empty(){return new DocumentKey(ResourcePath.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ResourcePath.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ResourcePath.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new DocumentKey(new ResourcePath(e.slice()))}}
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
 */function __PRIVATE_validateNonEmptyArgument(e,t,r){if(!r)throw new FirestoreError(D.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function __PRIVATE_validateIsNotUsedTogether(e,t,r,n){if(!0===t&&!0===n)throw new FirestoreError(D.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)}function __PRIVATE_validateDocumentPath(e){if(!DocumentKey.isDocumentKey(e))throw new FirestoreError(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function __PRIVATE_validateCollectionPath(e){if(DocumentKey.isDocumentKey(e))throw new FirestoreError(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function __PRIVATE_isPlainObject(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function __PRIVATE_valueDescription(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":fail(12329,{type:typeof e})}function __PRIVATE_cast(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new FirestoreError(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const r=__PRIVATE_valueDescription(e);throw new FirestoreError(D.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}function __PRIVATE_validatePositiveNumber(e,t){if(t<=0)throw new FirestoreError(D.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
 * @license
 * Copyright 2025 Google LLC
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
 */function property(e,t){const r={typeString:e};return t&&(r.value=t),r}function __PRIVATE_validateJSON(e,t){if(!__PRIVATE_isPlainObject(e))throw new FirestoreError(D.INVALID_ARGUMENT,"JSON must be an object");let r;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in e)){r=`JSON missing required field: '${n}'`;break}const o=e[n];if(s&&typeof o!==s){r=`JSON field '${n}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){r=`Expected '${n}' field to equal '${i.value}'`;break}}if(r)throw new FirestoreError(D.INVALID_ARGUMENT,r);return!0}
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
 */const x=-62135596800,O=1e6;class Timestamp{static now(){return Timestamp.fromMillis(Date.now())}static fromDate(e){return Timestamp.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*O);return new Timestamp(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new FirestoreError(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new FirestoreError(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<x)throw new FirestoreError(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new FirestoreError(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/O}_compareTo(e){return this.seconds===e.seconds?__PRIVATE_primitiveComparator(this.nanoseconds,e.nanoseconds):__PRIVATE_primitiveComparator(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Timestamp._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(__PRIVATE_validateJSON(e,Timestamp._jsonSchema))return new Timestamp(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-x;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Timestamp._jsonSchemaVersion="firestore/timestamp/1.0",Timestamp._jsonSchema={type:property("string",Timestamp._jsonSchemaVersion),seconds:property("number"),nanoseconds:property("number")};
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
class SnapshotVersion{static fromTimestamp(e){return new SnapshotVersion(e)}static min(){return new SnapshotVersion(new Timestamp(0,0))}static max(){return new SnapshotVersion(new Timestamp(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const N=-1;class FieldIndex{constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}function __PRIVATE_fieldIndexGetArraySegment(e){return e.fields.find(e=>2===e.kind)}function __PRIVATE_fieldIndexGetDirectionalSegments(e){return e.fields.filter(e=>2!==e.kind)}function __PRIVATE_fieldIndexSemanticComparator(e,t){let r=__PRIVATE_primitiveComparator(e.collectionGroup,t.collectionGroup);if(0!==r)return r;for(let n=0;n<Math.min(e.fields.length,t.fields.length);++n)if(r=__PRIVATE_indexSegmentComparator(e.fields[n],t.fields[n]),0!==r)return r;return __PRIVATE_primitiveComparator(e.fields.length,t.fields.length)}FieldIndex.UNKNOWN_ID=-1;class IndexSegment{constructor(e,t){this.fieldPath=e,this.kind=t}}function __PRIVATE_indexSegmentComparator(e,t){const r=FieldPath$1.comparator(e.fieldPath,t.fieldPath);return 0!==r?r:__PRIVATE_primitiveComparator(e.kind,t.kind)}class IndexState{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new IndexState(0,IndexOffset.min())}}function __PRIVATE_newIndexOffsetSuccessorFromReadTime(e,t){const r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1,s=SnapshotVersion.fromTimestamp(1e9===n?new Timestamp(r+1,0):new Timestamp(r,n));return new IndexOffset(s,DocumentKey.empty(),t)}function __PRIVATE_newIndexOffsetFromDocument(e){return new IndexOffset(e.readTime,e.key,N)}class IndexOffset{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new IndexOffset(SnapshotVersion.min(),DocumentKey.empty(),N)}static max(){return new IndexOffset(SnapshotVersion.max(),DocumentKey.empty(),N)}}function __PRIVATE_indexOffsetComparator(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:(r=DocumentKey.comparator(e.documentKey,t.documentKey),0!==r?r:__PRIVATE_primitiveComparator(e.largestBatchId,t.largestBatchId)
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
 */)}const B="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class PersistenceTransaction{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
 */async function __PRIVATE_ignoreIfPrimaryLeaseLoss(e){if(e.code!==D.FAILED_PRECONDITION||e.message!==B)throw e;__PRIVATE_logDebug("LocalStore","Unexpectedly lost primary lease")}
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
 */class PersistencePromise{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&fail(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new PersistencePromise((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof PersistencePromise?t:PersistencePromise.resolve(t)}catch(e){return PersistencePromise.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):PersistencePromise.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):PersistencePromise.reject(t)}static resolve(e){return new PersistencePromise((t,r)=>{t(e)})}static reject(e){return new PersistencePromise((t,r)=>{r(e)})}static waitFor(e){return new PersistencePromise((t,r)=>{let n=0,s=0,i=!1;e.forEach(e=>{++n,e.next(()=>{++s,i&&s===n&&t()},e=>r(e))}),i=!0,s===n&&t()})}static or(e){let t=PersistencePromise.resolve(!1);for(const r of e)t=t.next(e=>e?PersistencePromise.resolve(e):r());return t}static forEach(e,t){const r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new PersistencePromise((r,n)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const u=a;t(e[u]).next(e=>{i[u]=e,++o,o===s&&r(i)},e=>n(e))}})}static doWhile(e,t){return new PersistencePromise((r,n)=>{const s=()=>{!0===e()?t().next(()=>{s()},n):r()};s()})}}
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
 */const L="SimpleDb";class __PRIVATE_SimpleDbTransaction{static open(e,t,r,n){try{return new __PRIVATE_SimpleDbTransaction(t,e.transaction(n,r))}catch(e){throw new __PRIVATE_IndexedDbTransactionError(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new __PRIVATE_Deferred,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new __PRIVATE_IndexedDbTransactionError(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{const r=__PRIVATE_checkForAndReportiOSError(t.target.error);this.S.reject(new __PRIVATE_IndexedDbTransactionError(e,r))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(__PRIVATE_logDebug(L,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new __PRIVATE_SimpleDbStore(t)}}class __PRIVATE_SimpleDb{static delete(e){return __PRIVATE_logDebug(L,"Removing database:",e),__PRIVATE_wrapRequest(util.getGlobal().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!util.isIndexedDBAvailable())return!1;if(__PRIVATE_SimpleDb.F())return!0;const e=util.getUA(),t=__PRIVATE_SimpleDb.M(e),r=0<t&&t<10,n=__PRIVATE_getAndroidVersion(e),s=0<n&&n<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static F(){return"undefined"!=typeof process&&"YES"===process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,12.2===__PRIVATE_SimpleDb.M(util.getUA())&&__PRIVATE_logError("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(__PRIVATE_logDebug(L,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const n=indexedDB.open(this.name,this.version);n.onsuccess=e=>{const r=e.target.result;t(r)},n.onblocked=()=>{r(new __PRIVATE_IndexedDbTransactionError(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},n.onerror=t=>{const n=t.target.error;"VersionError"===n.name?r(new FirestoreError(D.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===n.name?r(new FirestoreError(D.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+n)):r(new __PRIVATE_IndexedDbTransactionError(e,n))},n.onupgradeneeded=e=>{__PRIVATE_logDebug(L,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.k(t,n.transaction,e.oldVersion,this.version).next(()=>{__PRIVATE_logDebug(L,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,n){const s="readonly"===t;let i=0;for(;;){++i;try{this.db=await this.L(e);const t=__PRIVATE_SimpleDbTransaction.open(this.db,e,s?"readonly":"readwrite",r),i=n(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),PersistencePromise.reject(e))).toPromise();return i.catch(()=>{}),await t.D,i}catch(e){const t=e,r="FirebaseError"!==t.name&&i<3;if(__PRIVATE_logDebug(L,"Transaction failed with error:",t.message,"Retrying:",r),this.close(),!r)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function __PRIVATE_getAndroidVersion(e){const t=e.match(/Android ([\d.]+)/i),r=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(r)}class __PRIVATE_IterationController{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return __PRIVATE_wrapRequest(this.U.delete())}}class __PRIVATE_IndexedDbTransactionError extends FirestoreError{constructor(e,t){super(D.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function __PRIVATE_isIndexedDbTransactionError(e){return"IndexedDbTransactionError"===e.name}class __PRIVATE_SimpleDbStore{constructor(e){this.store=e}put(e,t){let r;return void 0!==t?(__PRIVATE_logDebug(L,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(__PRIVATE_logDebug(L,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),__PRIVATE_wrapRequest(r)}add(e){return __PRIVATE_logDebug(L,"ADD",this.store.name,e,e),__PRIVATE_wrapRequest(this.store.add(e))}get(e){return __PRIVATE_wrapRequest(this.store.get(e)).next(t=>(void 0===t&&(t=null),__PRIVATE_logDebug(L,"GET",this.store.name,e,t),t))}delete(e){return __PRIVATE_logDebug(L,"DELETE",this.store.name,e),__PRIVATE_wrapRequest(this.store.delete(e))}count(){return __PRIVATE_logDebug(L,"COUNT",this.store.name),__PRIVATE_wrapRequest(this.store.count())}J(e,t){const r=this.options(e,t),n=r.index?this.store.index(r.index):this.store;if("function"==typeof n.getAll){const e=n.getAll(r.range);return new PersistencePromise((t,r)=>{e.onerror=e=>{r(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(r),t=[];return this.H(e,(e,r)=>{t.push(r)}).next(()=>t)}}Z(e,t){const r=this.store.getAll(e,null===t?void 0:t);return new PersistencePromise((e,t)=>{r.onerror=e=>{t(e.target.error)},r.onsuccess=t=>{e(t.target.result)}})}X(e,t){__PRIVATE_logDebug(L,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const n=this.cursor(r);return this.H(n,(e,t,r)=>r.delete())}ee(e,t){let r;t?r=e:(r={},t=e);const n=this.cursor(r);return this.H(n,t)}te(e){const t=this.cursor({});return new PersistencePromise((r,n)=>{t.onerror=e=>{const t=__PRIVATE_checkForAndReportiOSError(e.target.error);n(t)},t.onsuccess=t=>{const n=t.target.result;n?e(n.primaryKey,n.value).next(e=>{e?n.continue():r()}):r()}})}H(e,t){const r=[];return new PersistencePromise((n,s)=>{e.onerror=e=>{s(e.target.error)},e.onsuccess=e=>{const s=e.target.result;if(!s)return void n();const i=new __PRIVATE_IterationController(s),o=t(s.primaryKey,s.value,i);if(o instanceof PersistencePromise){const e=o.catch(e=>(i.done(),PersistencePromise.reject(e)));r.push(e)}i.isDone?n():null===i.G?s.continue():s.continue(i.G)}}).next(()=>PersistencePromise.waitFor(r))}options(e,t){let r;return void 0!==e&&("string"==typeof e?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function __PRIVATE_wrapRequest(e){return new PersistencePromise((t,r)=>{e.onsuccess=e=>{const r=e.target.result;t(r)},e.onerror=e=>{const t=__PRIVATE_checkForAndReportiOSError(e.target.error);r(t)}})}let k=!1;function __PRIVATE_checkForAndReportiOSError(e){const t=__PRIVATE_SimpleDb.M(util.getUA());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new FirestoreError("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return k||(k=!0,setTimeout(()=>{throw e},0)),e}}return e}const K="IndexBackfiller";class __PRIVATE_IndexBackfillerScheduler{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){__PRIVATE_logDebug(K,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();__PRIVATE_logDebug(K,`Documents written: ${e}`)}catch(e){__PRIVATE_isIndexedDbTransactionError(e)?__PRIVATE_logDebug(K,"Ignoring IndexedDB error during index backfill: ",e):await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}await this.re(6e4)})}}class __PRIVATE_IndexBackfiller{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const r=new Set;let n=t,s=!0;return PersistencePromise.doWhile(()=>!0===s&&n>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!r.has(t))return __PRIVATE_logDebug(K,`Processing collection: ${t}`),this.oe(e,t,n).next(e=>{n-=e,r.add(t)});s=!1})).next(()=>t-n)}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(n=>this.localStore.localDocuments.getNextDocuments(e,t,n,r).next(r=>{const s=r.changes;return this.localStore.indexManager.updateIndexEntries(e,s).next(()=>this._e(n,r)).next(r=>(__PRIVATE_logDebug(K,`Updating offset: ${r}`),this.localStore.indexManager.updateCollectionGroup(e,t,r))).next(()=>s.size)}))}_e(e,t){let r=e;return t.changes.forEach((e,t)=>{const n=__PRIVATE_newIndexOffsetFromDocument(t);__PRIVATE_indexOffsetComparator(n,r)>0&&(r=n)}),new IndexOffset(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))
/**
 * @license
 * Copyright 2018 Google LLC
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
 */}}class __PRIVATE_ListenSequence{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}__PRIVATE_ListenSequence.ce=-1;
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
const q=-1;function __PRIVATE_isNullOrUndefined(e){return null==e}function __PRIVATE_isNegativeZero(e){return 0===e&&1/e==-1/0}function __PRIVATE_isNumber$1(e){return"number"==typeof e}function isSafeInteger(e){return"number"==typeof e&&Number.isInteger(e)&&!__PRIVATE_isNegativeZero(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function __PRIVATE_isString(e){return"string"==typeof e}
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
 */const U="";function __PRIVATE_encodeResourcePath(e){let t="";for(let r=0;r<e.length;r++)t.length>0&&(t=__PRIVATE_encodeSeparator(t)),t=__PRIVATE_encodeSegment(e.get(r),t);return __PRIVATE_encodeSeparator(t)}function __PRIVATE_encodeSegment(e,t){let r=t;const n=e.length;for(let t=0;t<n;t++){const n=e.charAt(t);switch(n){case"\0":r+="";break;case U:r+="";break;default:r+=n}}return r}function __PRIVATE_encodeSeparator(e){return e+U+""}function __PRIVATE_decodeResourcePath(e){const t=e.length;if(__PRIVATE_hardAssert(t>=2,64408,{path:e}),2===t)return __PRIVATE_hardAssert(e.charAt(0)===U&&""===e.charAt(1),56145,{path:e}),ResourcePath.emptyPath();const r=t-2,n=[];let s="";for(let i=0;i<t;){const t=e.indexOf(U,i);switch((t<0||t>r)&&fail(50515,{path:e}),e.charAt(t+1)){case"":const r=e.substring(i,t);let o;0===s.length?o=r:(s+=r,o=s,s=""),n.push(o);break;case"":s+=e.substring(i,t),s+="\0";break;case"":s+=e.substring(i,t+1);break;default:fail(61167,{path:e})}i=t+2}return new ResourcePath(n)}
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
 */const $="remoteDocuments",W="owner",Q="owner",G="mutationQueues",z="userId",j="mutations",H="batchId",J="userMutationsIndex",Z=["userId","batchId"];
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
 */function __PRIVATE_newDbDocumentMutationPrefixForPath(e,t){return[e,__PRIVATE_encodeResourcePath(t)]}function __PRIVATE_newDbDocumentMutationKey(e,t,r){return[e,__PRIVATE_encodeResourcePath(t),r]}const X={},Y="documentMutations",ee="remoteDocumentsV14",te=["prefixPath","collectionGroup","readTime","documentId"],ne="documentKeyIndex",re=["prefixPath","collectionGroup","documentId"],ie="collectionGroupIndex",se=["collectionGroup","readTime","prefixPath","documentId"],oe="remoteDocumentGlobal",_e="remoteDocumentGlobalKey",ae="targets",ue="queryTargetsIndex",ce=["canonicalId","targetId"],le="targetDocuments",he=["targetId","path"],Pe="documentTargetsIndex",Te=["path","targetId"],Ie="targetGlobalKey",Ee="targetGlobal",Re="collectionParents",Ae=["collectionId","parent"],Ve="clientMetadata",de="clientId",me="bundles",fe="bundleId",ge="namedQueries",pe="name",ye="indexConfiguration",we="indexId",be="collectionGroupIndex",Se="collectionGroup",De="indexState",Ce=["indexId","uid"],ve="sequenceNumberIndex",Fe=["uid","sequenceNumber"],Me="indexEntries",xe=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Oe="documentKeyIndex",Ne=["indexId","uid","orderedDocumentKey"],Be="documentOverlays",Le=["userId","collectionPath","documentId"],ke="collectionPathOverlayIndex",Ke=["userId","collectionPath","largestBatchId"],qe="collectionGroupOverlayIndex",Ue=["userId","collectionGroup","largestBatchId"],$e="globals",We="name",Qe=[G,j,Y,$,ae,W,Ee,le,Ve,oe,Re,me,ge],Ge=[...Qe,Be],ze=[G,j,Y,ee,ae,W,Ee,le,Ve,oe,Re,me,ge,Be],je=ze,He=[...je,ye,De,Me],Je=He,Ze=[...He,$e],Xe=Ze;
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
 */class __PRIVATE_IndexedDbTransaction extends PersistenceTransaction{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function __PRIVATE_getStore(e,t){const r=__PRIVATE_debugCast(e);return __PRIVATE_SimpleDb.O(r.le,t)}
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
 */function __PRIVATE_objectSize(e){let t=0;for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function forEach(e,t){for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function __PRIVATE_mapToArray(e,t){const r=[];for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.push(t(e[n],n,e));return r}function isEmpty(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */class SortedMap{constructor(e,t){this.comparator=e,this.root=t||LLRBNode.EMPTY}insert(e,t){return new SortedMap(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,LLRBNode.BLACK,null,null))}remove(e){return new SortedMap(this.comparator,this.root.remove(e,this.comparator).copy(null,null,LLRBNode.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new SortedMapIterator(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new SortedMapIterator(this.root,e,this.comparator,!1)}getReverseIterator(){return new SortedMapIterator(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new SortedMapIterator(this.root,e,this.comparator,!0)}}class SortedMapIterator{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&n&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class LLRBNode{constructor(e,t,r,n,s){this.key=e,this.value=t,this.color=null!=r?r:LLRBNode.RED,this.left=null!=n?n:LLRBNode.EMPTY,this.right=null!=s?s:LLRBNode.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,s){return new LLRBNode(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this;const s=r(e,n.key);return n=s<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===s?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r)),n.fixUp()}removeMin(){if(this.left.isEmpty())return LLRBNode.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,n=this;if(t(e,n.key)<0)n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return LLRBNode.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,LLRBNode.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,LLRBNode.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw fail(43730,{key:this.key,value:this.value});if(this.right.isRed())throw fail(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw fail(27949);return e+(this.isRed()?0:1)}}LLRBNode.EMPTY=null,LLRBNode.RED=!0,LLRBNode.BLACK=!1,LLRBNode.EMPTY=new class{constructor(){this.size=0}get key(){throw fail(57766)}get value(){throw fail(16141)}get color(){throw fail(16727)}get left(){throw fail(29726)}get right(){throw fail(36894)}copy(e,t,r,n,s){return this}insert(e,t,r){return new LLRBNode(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class SortedSet{constructor(e){this.comparator=e,this.data=new SortedMap(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new SortedSetIterator(this.data.getIterator())}getIteratorFrom(e){return new SortedSetIterator(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof SortedSet))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new SortedSet(this.comparator);return t.data=e,t}}class SortedSetIterator{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function __PRIVATE_advanceIterator(e){return e.hasNext()?e.getNext():void 0}
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
 */class FieldMask{constructor(e){this.fields=e,e.sort(FieldPath$1.comparator)}static empty(){return new FieldMask([])}unionWith(e){let t=new SortedSet(FieldPath$1.comparator);for(const e of this.fields)t=t.add(e);for(const r of e)t=t.add(r);return new FieldMask(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return __PRIVATE_arrayEquals(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */class __PRIVATE_Base64DecodeError extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"
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
 */}}function __PRIVATE_isBase64Available(){return"undefined"!=typeof atob}
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
 */class ByteString{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new __PRIVATE_Base64DecodeError("Invalid base64 string: "+e):e}}(e);return new ByteString(t)}static fromUint8Array(e){const t=function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e);return new ByteString(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}
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
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return __PRIVATE_primitiveComparator(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ByteString.EMPTY_BYTE_STRING=new ByteString("");const Ye=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function __PRIVATE_normalizeTimestamp(e){if(__PRIVATE_hardAssert(!!e,39018),"string"==typeof e){let t=0;const r=Ye.exec(e);if(__PRIVATE_hardAssert(!!r,46558,{timestamp:e}),r[1]){let e=r[1];e=(e+"000000000").substr(0,9),t=Number(e)}const n=new Date(e);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:__PRIVATE_normalizeNumber(e.seconds),nanos:__PRIVATE_normalizeNumber(e.nanos)}}function __PRIVATE_normalizeNumber(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function __PRIVATE_normalizeByteString(e){return"string"==typeof e?ByteString.fromBase64String(e):ByteString.fromUint8Array(e)}
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
 */const et="server_timestamp",tt="__type__",nt="__previous_value__",rt="__local_write_time__";function __PRIVATE_isServerTimestamp(e){const t=(e?.mapValue?.fields||{})[tt]?.stringValue;return t===et}function __PRIVATE_getPreviousValue(e){const t=e.mapValue.fields[nt];return __PRIVATE_isServerTimestamp(t)?__PRIVATE_getPreviousValue(t):t}function __PRIVATE_getLocalWriteTime(e){const t=__PRIVATE_normalizeTimestamp(e.mapValue.fields[rt].timestampValue);return new Timestamp(t.seconds,t.nanos)}
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
 */class DatabaseInfo{constructor(e,t,r,n,s,i,o,a,u,c,_){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=u,this.isUsingEmulator=c,this.apiKey=_}}const it="(default)";class DatabaseId{constructor(e,t){this.projectId=e,this.database=t||it}static empty(){return new DatabaseId("","")}get isDefaultDatabase(){return this.database===it}isEqual(e){return e instanceof DatabaseId&&e.projectId===this.projectId&&e.database===this.database}}function __PRIVATE_databaseIdFromApp(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new FirestoreError(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new DatabaseId(e.options.projectId,t)}
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
 */const st="__type__",ot="__max__",_t={mapValue:{fields:{__type__:{stringValue:ot}}}},at="__vector__",ut="value",ct={nullValue:"NULL_VALUE"};function __PRIVATE_typeOrder(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?__PRIVATE_isServerTimestamp(e)?4:__PRIVATE_isMaxValue(e)?9007199254740991:__PRIVATE_isVectorValue(e)?10:11:fail(28295,{value:e})}function __PRIVATE_valueEquals(e,t){if(e===t)return!0;const r=__PRIVATE_typeOrder(e);if(r!==__PRIVATE_typeOrder(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return __PRIVATE_getLocalWriteTime(e).isEqual(__PRIVATE_getLocalWriteTime(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const r=__PRIVATE_normalizeTimestamp(e.timestampValue),n=__PRIVATE_normalizeTimestamp(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return __PRIVATE_normalizeByteString(e.bytesValue).isEqual(__PRIVATE_normalizeByteString(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return __PRIVATE_normalizeNumber(e.geoPointValue.latitude)===__PRIVATE_normalizeNumber(t.geoPointValue.latitude)&&__PRIVATE_normalizeNumber(e.geoPointValue.longitude)===__PRIVATE_normalizeNumber(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return __PRIVATE_normalizeNumber(e.integerValue)===__PRIVATE_normalizeNumber(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const r=__PRIVATE_normalizeNumber(e.doubleValue),n=__PRIVATE_normalizeNumber(t.doubleValue);return r===n?__PRIVATE_isNegativeZero(r)===__PRIVATE_isNegativeZero(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return __PRIVATE_arrayEquals(e.arrayValue.values||[],t.arrayValue.values||[],__PRIVATE_valueEquals);case 10:case 11:return function(e,t){const r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(__PRIVATE_objectSize(r)!==__PRIVATE_objectSize(n))return!1;for(const e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!__PRIVATE_valueEquals(r[e],n[e])))return!1;return!0}(e,t);default:return fail(52216,{left:e})}}function __PRIVATE_arrayValueContains(e,t){return void 0!==(e.values||[]).find(e=>__PRIVATE_valueEquals(e,t))}function __PRIVATE_valueCompare(e,t){if(e===t)return 0;const r=__PRIVATE_typeOrder(e),n=__PRIVATE_typeOrder(t);if(r!==n)return __PRIVATE_primitiveComparator(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return __PRIVATE_primitiveComparator(e.booleanValue,t.booleanValue);case 2:return function(e,t){const r=__PRIVATE_normalizeNumber(e.integerValue||e.doubleValue),n=__PRIVATE_normalizeNumber(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return __PRIVATE_compareTimestamps(e.timestampValue,t.timestampValue);case 4:return __PRIVATE_compareTimestamps(__PRIVATE_getLocalWriteTime(e),__PRIVATE_getLocalWriteTime(t));case 5:return __PRIVATE_compareUtf8Strings(e.stringValue,t.stringValue);case 6:return function(e,t){const r=__PRIVATE_normalizeByteString(e),n=__PRIVATE_normalizeByteString(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){const t=__PRIVATE_primitiveComparator(r[e],n[e]);if(0!==t)return t}return __PRIVATE_primitiveComparator(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const r=__PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e.latitude),__PRIVATE_normalizeNumber(t.latitude));return 0!==r?r:__PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e.longitude),__PRIVATE_normalizeNumber(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return __PRIVATE_compareArrays(e.arrayValue,t.arrayValue);case 10:return function(e,t){const r=e.fields||{},n=t.fields||{},s=r[ut]?.arrayValue,i=n[ut]?.arrayValue,o=__PRIVATE_primitiveComparator(s?.values?.length||0,i?.values?.length||0);return 0!==o?o:__PRIVATE_compareArrays(s,i)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===_t.mapValue&&t===_t.mapValue)return 0;if(e===_t.mapValue)return 1;if(t===_t.mapValue)return-1;const r=e.fields||{},n=Object.keys(r),s=t.fields||{},i=Object.keys(s);n.sort(),i.sort();for(let e=0;e<n.length&&e<i.length;++e){const t=__PRIVATE_compareUtf8Strings(n[e],i[e]);if(0!==t)return t;const o=__PRIVATE_valueCompare(r[n[e]],s[i[e]]);if(0!==o)return o}return __PRIVATE_primitiveComparator(n.length,i.length)}(e.mapValue,t.mapValue);default:throw fail(23264,{he:r})}}function __PRIVATE_compareTimestamps(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return __PRIVATE_primitiveComparator(e,t);const r=__PRIVATE_normalizeTimestamp(e),n=__PRIVATE_normalizeTimestamp(t),s=__PRIVATE_primitiveComparator(r.seconds,n.seconds);return 0!==s?s:__PRIVATE_primitiveComparator(r.nanos,n.nanos)}function __PRIVATE_compareArrays(e,t){const r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){const t=__PRIVATE_valueCompare(r[e],n[e]);if(t)return t}return __PRIVATE_primitiveComparator(r.length,n.length)}function canonicalId(e){return __PRIVATE_canonifyValue(e)}function __PRIVATE_canonifyValue(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=__PRIVATE_normalizeTimestamp(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return __PRIVATE_normalizeByteString(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return DocumentKey.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",r=!0;for(const n of e.values||[])r?r=!1:t+=",",t+=__PRIVATE_canonifyValue(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let r="{",n=!0;for(const s of t)n?n=!1:r+=",",r+=`${s}:${__PRIVATE_canonifyValue(e.fields[s])}`;return r+"}"}(e.mapValue):fail(61005,{value:e})}function __PRIVATE_estimateByteSize(e){switch(__PRIVATE_typeOrder(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=__PRIVATE_getPreviousValue(e);return t?16+__PRIVATE_estimateByteSize(t):16;case 5:return 2*e.stringValue.length;case 6:return __PRIVATE_normalizeByteString(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+__PRIVATE_estimateByteSize(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return forEach(e.fields,(e,r)=>{t+=e.length+__PRIVATE_estimateByteSize(r)}),t}(e.mapValue);default:throw fail(13486,{value:e})}}function __PRIVATE_refValue(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function isInteger(e){return!!e&&"integerValue"in e}function isArray(e){return!!e&&"arrayValue"in e}function __PRIVATE_isNullValue(e){return!!e&&"nullValue"in e}function __PRIVATE_isNanValue(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function __PRIVATE_isMapValue(e){return!!e&&"mapValue"in e}function __PRIVATE_isVectorValue(e){const t=(e?.mapValue?.fields||{})[st]?.stringValue;return t===at}function __PRIVATE_deepClone(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return forEach(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=__PRIVATE_deepClone(r)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=__PRIVATE_deepClone(e.arrayValue.values[r]);return t}return{...e}}function __PRIVATE_isMaxValue(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===ot}const lt={mapValue:{fields:{[st]:{stringValue:at},[ut]:{arrayValue:{}}}}};function __PRIVATE_valuesGetLowerBound(e){return"nullValue"in e?ct:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?__PRIVATE_refValue(DatabaseId.empty(),DocumentKey.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?__PRIVATE_isVectorValue(e)?lt:{mapValue:{}}:fail(35942,{value:e})}function __PRIVATE_valuesGetUpperBound(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?__PRIVATE_refValue(DatabaseId.empty(),DocumentKey.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?lt:"mapValue"in e?__PRIVATE_isVectorValue(e)?{mapValue:{}}:_t:fail(61959,{value:e})}function __PRIVATE_lowerBoundCompare(e,t){const r=__PRIVATE_valueCompare(e.value,t.value);return 0!==r?r:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function __PRIVATE_upperBoundCompare(e,t){const r=__PRIVATE_valueCompare(e.value,t.value);return 0!==r?r:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
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
 */class ObjectValue{constructor(e){this.value=e}static empty(){return new ObjectValue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!__PRIVATE_isMapValue(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=__PRIVATE_deepClone(t)}setAll(e){let t=FieldPath$1.emptyPath(),r={},n=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=s.popLast()}e?r[s.lastSegment()]=__PRIVATE_deepClone(e):n.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,n)}delete(e){const t=this.field(e.popLast());__PRIVATE_isMapValue(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return __PRIVATE_valueEquals(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];__PRIVATE_isMapValue(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){forEach(t,(t,r)=>e[t]=r);for(const t of r)delete e[t]}clone(){return new ObjectValue(__PRIVATE_deepClone(this.value))}}function __PRIVATE_extractFieldMask(e){const t=[];return forEach(e.fields,(e,r)=>{const n=new FieldPath$1([e]);if(__PRIVATE_isMapValue(r)){const e=__PRIVATE_extractFieldMask(r.mapValue).fields;if(0===e.length)t.push(n);else for(const r of e)t.push(n.child(r))}else t.push(n)}),new FieldMask(t)
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
 */}class MutableDocument{constructor(e,t,r,n,s,i,o){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new MutableDocument(e,0,SnapshotVersion.min(),SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),0)}static newFoundDocument(e,t,r,n){return new MutableDocument(e,1,t,SnapshotVersion.min(),r,n,0)}static newNoDocument(e,t){return new MutableDocument(e,2,t,SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),0)}static newUnknownDocument(e,t){return new MutableDocument(e,3,t,SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(SnapshotVersion.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ObjectValue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ObjectValue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=SnapshotVersion.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof MutableDocument&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new MutableDocument(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Bound{constructor(e,t){this.position=e,this.inclusive=t}}function __PRIVATE_boundCompareToDocument(e,t,r){let n=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(n=i.field.isKeyField()?DocumentKey.comparator(DocumentKey.fromName(o.referenceValue),r.key):__PRIVATE_valueCompare(o,r.data.field(i.field)),"desc"===i.dir&&(n*=-1),0!==n)break}return n}function __PRIVATE_boundEquals(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!__PRIVATE_valueEquals(e.position[r],t.position[r]))return!1;return!0}
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
 */class OrderBy{constructor(e,t="asc"){this.field=e,this.dir=t}}function __PRIVATE_orderByEquals(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
 */class Filter{}class FieldFilter extends Filter{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new __PRIVATE_KeyFieldFilter(e,t,r):"array-contains"===t?new __PRIVATE_ArrayContainsFilter(e,r):"in"===t?new __PRIVATE_InFilter(e,r):"not-in"===t?new __PRIVATE_NotInFilter(e,r):"array-contains-any"===t?new __PRIVATE_ArrayContainsAnyFilter(e,r):new FieldFilter(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new __PRIVATE_KeyFieldInFilter(e,r):new __PRIVATE_KeyFieldNotInFilter(e,r)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(__PRIVATE_valueCompare(t,this.value)):null!==t&&__PRIVATE_typeOrder(this.value)===__PRIVATE_typeOrder(t)&&this.matchesComparison(__PRIVATE_valueCompare(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return fail(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class CompositeFilter extends Filter{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new CompositeFilter(e,t)}matches(e){return __PRIVATE_compositeFilterIsConjunction(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function __PRIVATE_compositeFilterIsConjunction(e){return"and"===e.op}function __PRIVATE_compositeFilterIsDisjunction(e){return"or"===e.op}function __PRIVATE_compositeFilterIsFlatConjunction(e){return __PRIVATE_compositeFilterIsFlat(e)&&__PRIVATE_compositeFilterIsConjunction(e)}function __PRIVATE_compositeFilterIsFlat(e){for(const t of e.filters)if(t instanceof CompositeFilter)return!1;return!0}function __PRIVATE_canonifyFilter(e){if(e instanceof FieldFilter)return e.field.canonicalString()+e.op.toString()+canonicalId(e.value);if(__PRIVATE_compositeFilterIsFlatConjunction(e))return e.filters.map(e=>__PRIVATE_canonifyFilter(e)).join(",");{const t=e.filters.map(e=>__PRIVATE_canonifyFilter(e)).join(",");return`${e.op}(${t})`}}function __PRIVATE_filterEquals(e,t){return e instanceof FieldFilter?function(e,t){return t instanceof FieldFilter&&e.op===t.op&&e.field.isEqual(t.field)&&__PRIVATE_valueEquals(e.value,t.value)}(e,t):e instanceof CompositeFilter?function(e,t){return t instanceof CompositeFilter&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,r,n)=>e&&__PRIVATE_filterEquals(r,t.filters[n]),!0)}(e,t):void fail(19439)}function __PRIVATE_compositeFilterWithAddedFilters(e,t){const r=e.filters.concat(t);return CompositeFilter.create(r,e.op)}function __PRIVATE_stringifyFilter(e){return e instanceof FieldFilter?function(e){return`${e.field.canonicalString()} ${e.op} ${canonicalId(e.value)}`}(e):e instanceof CompositeFilter?function(e){return e.op.toString()+" {"+e.getFilters().map(__PRIVATE_stringifyFilter).join(" ,")+"}"}(e):"Filter"}class __PRIVATE_KeyFieldFilter extends FieldFilter{constructor(e,t,r){super(e,t,r),this.key=DocumentKey.fromName(r.referenceValue)}matches(e){const t=DocumentKey.comparator(e.key,this.key);return this.matchesComparison(t)}}class __PRIVATE_KeyFieldInFilter extends FieldFilter{constructor(e,t){super(e,"in",t),this.keys=__PRIVATE_extractDocumentKeysFromArrayValue("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class __PRIVATE_KeyFieldNotInFilter extends FieldFilter{constructor(e,t){super(e,"not-in",t),this.keys=__PRIVATE_extractDocumentKeysFromArrayValue("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function __PRIVATE_extractDocumentKeysFromArrayValue(e,t){return(t.arrayValue?.values||[]).map(e=>DocumentKey.fromName(e.referenceValue))}class __PRIVATE_ArrayContainsFilter extends FieldFilter{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return isArray(t)&&__PRIVATE_arrayValueContains(t.arrayValue,this.value)}}class __PRIVATE_InFilter extends FieldFilter{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&__PRIVATE_arrayValueContains(this.value.arrayValue,t)}}class __PRIVATE_NotInFilter extends FieldFilter{constructor(e,t){super(e,"not-in",t)}matches(e){if(__PRIVATE_arrayValueContains(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!__PRIVATE_arrayValueContains(this.value.arrayValue,t)}}class __PRIVATE_ArrayContainsAnyFilter extends FieldFilter{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!isArray(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>__PRIVATE_arrayValueContains(this.value.arrayValue,e))}}
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
 */class __PRIVATE_TargetImpl{constructor(e,t=null,r=[],n=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function __PRIVATE_newTarget(e,t=null,r=[],n=[],s=null,i=null,o=null){return new __PRIVATE_TargetImpl(e,t,r,n,s,i,o)}function __PRIVATE_canonifyTarget(e){const t=__PRIVATE_debugCast(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>__PRIVATE_canonifyFilter(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),__PRIVATE_isNullOrUndefined(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>canonicalId(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>canonicalId(e)).join(",")),t.Te=e}return t.Te}function __PRIVATE_targetEquals(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let r=0;r<e.orderBy.length;r++)if(!__PRIVATE_orderByEquals(e.orderBy[r],t.orderBy[r]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!__PRIVATE_filterEquals(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!__PRIVATE_boundEquals(e.startAt,t.startAt)&&__PRIVATE_boundEquals(e.endAt,t.endAt)}function __PRIVATE_targetIsDocumentTarget(e){return DocumentKey.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function __PRIVATE_targetGetFieldFiltersForPath(e,t){return e.filters.filter(e=>e instanceof FieldFilter&&e.field.isEqual(t))}function __PRIVATE_targetGetAscendingBound(e,t,r){let n=ct,s=!0;for(const r of __PRIVATE_targetGetFieldFiltersForPath(e,t)){let e=ct,t=!0;switch(r.op){case"<":case"<=":e=__PRIVATE_valuesGetLowerBound(r.value);break;case"==":case"in":case">=":e=r.value;break;case">":e=r.value,t=!1;break;case"!=":case"not-in":e=ct}__PRIVATE_lowerBoundCompare({value:n,inclusive:s},{value:e,inclusive:t})<0&&(n=e,s=t)}if(null!==r)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=r.position[i];__PRIVATE_lowerBoundCompare({value:n,inclusive:s},{value:e,inclusive:r.inclusive})<0&&(n=e,s=r.inclusive);break}return{value:n,inclusive:s}}function __PRIVATE_targetGetDescendingBound(e,t,r){let n=_t,s=!0;for(const r of __PRIVATE_targetGetFieldFiltersForPath(e,t)){let e=_t,t=!0;switch(r.op){case">=":case">":e=__PRIVATE_valuesGetUpperBound(r.value),t=!1;break;case"==":case"in":case"<=":e=r.value;break;case"<":e=r.value,t=!1;break;case"!=":case"not-in":e=_t}__PRIVATE_upperBoundCompare({value:n,inclusive:s},{value:e,inclusive:t})>0&&(n=e,s=t)}if(null!==r)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=r.position[i];__PRIVATE_upperBoundCompare({value:n,inclusive:s},{value:e,inclusive:r.inclusive})>0&&(n=e,s=r.inclusive);break}return{value:n,inclusive:s}}
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
 */class __PRIVATE_QueryImpl{constructor(e,t=null,r=[],n=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function __PRIVATE_newQuery(e,t,r,n,s,i,o,a){return new __PRIVATE_QueryImpl(e,t,r,n,s,i,o,a)}function __PRIVATE_newQueryForPath(e){return new __PRIVATE_QueryImpl(e)}function __PRIVATE_queryMatchesAllDocuments(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function __PRIVATE_isDocumentQuery$1(e){return DocumentKey.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function __PRIVATE_isCollectionGroupQuery(e){return null!==e.collectionGroup}function __PRIVATE_queryNormalizedOrderBy(e){const t=__PRIVATE_debugCast(e);if(null===t.Ee){t.Ee=[];const e=new Set;for(const r of t.explicitOrderBy)t.Ee.push(r),e.add(r.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",n=function(e){let t=new SortedSet(FieldPath$1.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);n.forEach(n=>{e.has(n.canonicalString())||n.isKeyField()||t.Ee.push(new OrderBy(n,r))}),e.has(FieldPath$1.keyField().canonicalString())||t.Ee.push(new OrderBy(FieldPath$1.keyField(),r))}return t.Ee}function __PRIVATE_queryToTarget(e){const t=__PRIVATE_debugCast(e);return t.Ie||(t.Ie=__PRIVATE__queryToTarget(t,__PRIVATE_queryNormalizedOrderBy(e))),t.Ie}function __PRIVATE_queryToAggregateTarget(e){const t=__PRIVATE_debugCast(e);return t.Re||(t.Re=__PRIVATE__queryToTarget(t,e.explicitOrderBy)),t.Re}function __PRIVATE__queryToTarget(e,t){if("F"===e.limitType)return __PRIVATE_newTarget(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new OrderBy(e.field,t)});const r=e.endAt?new Bound(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new Bound(e.startAt.position,e.startAt.inclusive):null;return __PRIVATE_newTarget(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}function __PRIVATE_queryWithAddedFilter(e,t){const r=e.filters.concat([t]);return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function __PRIVATE_queryWithAddedOrderBy(e,t){const r=e.explicitOrderBy.concat([t]);return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,r,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function __PRIVATE_queryWithLimit(e,t,r){return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function __PRIVATE_queryWithStartAt(e,t){return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function __PRIVATE_queryWithEndAt(e,t){return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function __PRIVATE_queryEquals(e,t){return __PRIVATE_targetEquals(__PRIVATE_queryToTarget(e),__PRIVATE_queryToTarget(t))&&e.limitType===t.limitType}function __PRIVATE_canonifyQuery(e){return`${__PRIVATE_canonifyTarget(__PRIVATE_queryToTarget(e))}|lt:${e.limitType}`}function __PRIVATE_stringifyQuery(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>__PRIVATE_stringifyFilter(e)).join(", ")}]`),__PRIVATE_isNullOrUndefined(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>canonicalId(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>canonicalId(e)).join(",")),`Target(${t})`}(__PRIVATE_queryToTarget(e))}; limitType=${e.limitType})`}function __PRIVATE_queryMatches(e,t){return t.isFoundDocument()&&function(e,t){const r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):DocumentKey.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(const r of __PRIVATE_queryNormalizedOrderBy(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(const r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,r){const n=__PRIVATE_boundCompareToDocument(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,__PRIVATE_queryNormalizedOrderBy(e),t)||e.endAt&&!function(e,t,r){const n=__PRIVATE_boundCompareToDocument(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,__PRIVATE_queryNormalizedOrderBy(e),t))}(e,t)}function __PRIVATE_queryCollectionGroup(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function __PRIVATE_newQueryComparator(e){return(t,r)=>{let n=!1;for(const s of __PRIVATE_queryNormalizedOrderBy(e)){const e=__PRIVATE_compareDocs(s,t,r);if(0!==e)return e;n=n||s.field.isKeyField()}return 0}}function __PRIVATE_compareDocs(e,t,r){const n=e.field.isKeyField()?DocumentKey.comparator(t.key,r.key):function(e,t,r){const n=t.data.field(e),s=r.data.field(e);return null!==n&&null!==s?__PRIVATE_valueCompare(n,s):fail(42886)}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return-1*n;default:return fail(19790,{direction:e.dir})}}
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
 */class ObjectMap{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r)for(const[t,n]of r)if(this.equalsFn(t,e))return n}has(e){return void 0!==this.get(e)}set(e,t){const r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){forEach(this.inner,(t,r)=>{for(const[t,n]of r)e(t,n)})}isEmpty(){return isEmpty(this.inner)}size(){return this.innerSize}}
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
 */const ht=new SortedMap(DocumentKey.comparator);function __PRIVATE_mutableDocumentMap(){return ht}const Pt=new SortedMap(DocumentKey.comparator);function documentMap(...e){let t=Pt;for(const r of e)t=t.insert(r.key,r);return t}function __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e){let t=Pt;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function __PRIVATE_newOverlayMap(){return __PRIVATE_newDocumentKeyMap()}function __PRIVATE_newMutationMap(){return __PRIVATE_newDocumentKeyMap()}function __PRIVATE_newDocumentKeyMap(){return new ObjectMap(e=>e.toString(),(e,t)=>e.isEqual(t))}const Tt=new SortedMap(DocumentKey.comparator),It=new SortedSet(DocumentKey.comparator);function __PRIVATE_documentKeySet(...e){let t=It;for(const r of e)t=t.add(r);return t}const Et=new SortedSet(__PRIVATE_primitiveComparator);function __PRIVATE_targetIdSet(){return Et}
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
 */function __PRIVATE_toDouble(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:__PRIVATE_isNegativeZero(t)?"-0":t}}function __PRIVATE_toInteger(e){return{integerValue:""+e}}function toNumber(e,t){return isSafeInteger(t)?__PRIVATE_toInteger(t):__PRIVATE_toDouble(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */class TransformOperation{constructor(){this._=void 0}}function __PRIVATE_applyTransformOperationToLocalView(e,t,r){return e instanceof __PRIVATE_ServerTimestampTransform?function(e,t){const r={fields:{[tt]:{stringValue:et},[rt]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&__PRIVATE_isServerTimestamp(t)&&(t=__PRIVATE_getPreviousValue(t)),t&&(r.fields[nt]=t),{mapValue:r}}(r,t):e instanceof __PRIVATE_ArrayUnionTransformOperation?__PRIVATE_applyArrayUnionTransformOperation(e,t):e instanceof __PRIVATE_ArrayRemoveTransformOperation?__PRIVATE_applyArrayRemoveTransformOperation(e,t):function(e,t){const r=__PRIVATE_computeTransformOperationBaseValue(e,t),n=asNumber(r)+asNumber(e.Ae);return isInteger(r)&&isInteger(e.Ae)?__PRIVATE_toInteger(n):__PRIVATE_toDouble(e.serializer,n)}(e,t)}function __PRIVATE_applyTransformOperationToRemoteDocument(e,t,r){return e instanceof __PRIVATE_ArrayUnionTransformOperation?__PRIVATE_applyArrayUnionTransformOperation(e,t):e instanceof __PRIVATE_ArrayRemoveTransformOperation?__PRIVATE_applyArrayRemoveTransformOperation(e,t):r}function __PRIVATE_computeTransformOperationBaseValue(e,t){return e instanceof __PRIVATE_NumericIncrementTransformOperation?function(e){return isInteger(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class __PRIVATE_ServerTimestampTransform extends TransformOperation{}class __PRIVATE_ArrayUnionTransformOperation extends TransformOperation{constructor(e){super(),this.elements=e}}function __PRIVATE_applyArrayUnionTransformOperation(e,t){const r=__PRIVATE_coercedFieldValuesArray(t);for(const t of e.elements)r.some(e=>__PRIVATE_valueEquals(e,t))||r.push(t);return{arrayValue:{values:r}}}class __PRIVATE_ArrayRemoveTransformOperation extends TransformOperation{constructor(e){super(),this.elements=e}}function __PRIVATE_applyArrayRemoveTransformOperation(e,t){let r=__PRIVATE_coercedFieldValuesArray(t);for(const t of e.elements)r=r.filter(e=>!__PRIVATE_valueEquals(e,t));return{arrayValue:{values:r}}}class __PRIVATE_NumericIncrementTransformOperation extends TransformOperation{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function asNumber(e){return __PRIVATE_normalizeNumber(e.integerValue||e.doubleValue)}function __PRIVATE_coercedFieldValuesArray(e){return isArray(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
 */class FieldTransform{constructor(e,t){this.field=e,this.transform=t}}function __PRIVATE_fieldTransformEquals(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof __PRIVATE_ArrayUnionTransformOperation&&t instanceof __PRIVATE_ArrayUnionTransformOperation||e instanceof __PRIVATE_ArrayRemoveTransformOperation&&t instanceof __PRIVATE_ArrayRemoveTransformOperation?__PRIVATE_arrayEquals(e.elements,t.elements,__PRIVATE_valueEquals):e instanceof __PRIVATE_NumericIncrementTransformOperation&&t instanceof __PRIVATE_NumericIncrementTransformOperation?__PRIVATE_valueEquals(e.Ae,t.Ae):e instanceof __PRIVATE_ServerTimestampTransform&&t instanceof __PRIVATE_ServerTimestampTransform}(e.transform,t.transform)}class MutationResult{constructor(e,t){this.version=e,this.transformResults=t}}class Precondition{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Precondition}static exists(e){return new Precondition(void 0,e)}static updateTime(e){return new Precondition(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function __PRIVATE_preconditionIsValidForDocument(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Mutation{}function __PRIVATE_calculateOverlayMutation(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new __PRIVATE_DeleteMutation(e.key,Precondition.none()):new __PRIVATE_SetMutation(e.key,e.data,Precondition.none());{const r=e.data,n=ObjectValue.empty();let s=new SortedSet(FieldPath$1.comparator);for(let e of t.fields)if(!s.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),s=s.add(e)}return new __PRIVATE_PatchMutation(e.key,n,new FieldMask(s.toArray()),Precondition.none())}}function __PRIVATE_mutationApplyToRemoteDocument(e,t,r){e instanceof __PRIVATE_SetMutation?function(e,t,r){const n=e.value.clone(),s=__PRIVATE_serverTransformResults(e.fieldTransforms,t,r.transformResults);n.setAll(s),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(e,t,r):e instanceof __PRIVATE_PatchMutation?function(e,t,r){if(!__PRIVATE_preconditionIsValidForDocument(e.precondition,t))return void t.convertToUnknownDocument(r.version);const n=__PRIVATE_serverTransformResults(e.fieldTransforms,t,r.transformResults),s=t.data;s.setAll(__PRIVATE_getPatch(e)),s.setAll(n),t.convertToFoundDocument(r.version,s).setHasCommittedMutations()}(e,t,r):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,t,r)}function __PRIVATE_mutationApplyToLocalView(e,t,r,n){return e instanceof __PRIVATE_SetMutation?function(e,t,r,n){if(!__PRIVATE_preconditionIsValidForDocument(e.precondition,t))return r;const s=e.value.clone(),i=__PRIVATE_localTransformResults(e.fieldTransforms,n,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,r,n):e instanceof __PRIVATE_PatchMutation?function(e,t,r,n){if(!__PRIVATE_preconditionIsValidForDocument(e.precondition,t))return r;const s=__PRIVATE_localTransformResults(e.fieldTransforms,n,t),i=t.data;return i.setAll(__PRIVATE_getPatch(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===r?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):function(e,t,r){return __PRIVATE_preconditionIsValidForDocument(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}(e,t,r)}function __PRIVATE_mutationExtractBaseValue(e,t){let r=null;for(const n of e.fieldTransforms){const e=t.data.field(n.field),s=__PRIVATE_computeTransformOperationBaseValue(n.transform,e||null);null!=s&&(null===r&&(r=ObjectValue.empty()),r.set(n.field,s))}return r||null}function __PRIVATE_mutationEquals(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&__PRIVATE_arrayEquals(e,t,(e,t)=>__PRIVATE_fieldTransformEquals(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class __PRIVATE_SetMutation extends Mutation{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class __PRIVATE_PatchMutation extends Mutation{constructor(e,t,r,n,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function __PRIVATE_getPatch(e){const t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){const n=e.data.field(r);t.set(r,n)}}),t}function __PRIVATE_serverTransformResults(e,t,r){const n=new Map;__PRIVATE_hardAssert(e.length===r.length,32656,{Ve:r.length,de:e.length});for(let s=0;s<r.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);n.set(i.field,__PRIVATE_applyTransformOperationToRemoteDocument(o,a,r[s]))}return n}function __PRIVATE_localTransformResults(e,t,r){const n=new Map;for(const s of e){const e=s.transform,i=r.data.field(s.field);n.set(s.field,__PRIVATE_applyTransformOperationToLocalView(e,i,t))}return n}class __PRIVATE_DeleteMutation extends Mutation{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class __PRIVATE_VerifyMutation extends Mutation{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class MutationBatch{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const n=this.mutations[t];n.key.isEqual(e.key)&&__PRIVATE_mutationApplyToRemoteDocument(n,e,r[t])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=__PRIVATE_mutationApplyToLocalView(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=__PRIVATE_mutationApplyToLocalView(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=__PRIVATE_newMutationMap();return this.mutations.forEach(n=>{const s=e.get(n.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(n.key)?null:o;const a=__PRIVATE_calculateOverlayMutation(i,o);null!==a&&r.set(n.key,a),i.isValidDocument()||i.convertToNoDocument(SnapshotVersion.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),__PRIVATE_documentKeySet())}isEqual(e){return this.batchId===e.batchId&&__PRIVATE_arrayEquals(this.mutations,e.mutations,(e,t)=>__PRIVATE_mutationEquals(e,t))&&__PRIVATE_arrayEquals(this.baseMutations,e.baseMutations,(e,t)=>__PRIVATE_mutationEquals(e,t))}}class MutationBatchResult{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){__PRIVATE_hardAssert(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let n=Tt;const s=e.mutations;for(let e=0;e<s.length;e++)n=n.insert(s[e].key,r[e].version);return new MutationBatchResult(e,t,r,n)}}
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
 */class Overlay{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */class __PRIVATE_AggregateImpl{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r
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
 */}}class ExistenceFilter{constructor(e,t){this.count=e,this.unchangedNames=t
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
 */}}var Rt,At;function __PRIVATE_isPermanentError(e){switch(e){case D.OK:return fail(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return fail(15467,{code:e})}}function __PRIVATE_mapCodeFromRpcCode(e){if(void 0===e)return __PRIVATE_logError("GRPC error has no .code"),D.UNKNOWN;switch(e){case Rt.OK:return D.OK;case Rt.CANCELLED:return D.CANCELLED;case Rt.UNKNOWN:return D.UNKNOWN;case Rt.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Rt.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Rt.INTERNAL:return D.INTERNAL;case Rt.UNAVAILABLE:return D.UNAVAILABLE;case Rt.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Rt.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Rt.NOT_FOUND:return D.NOT_FOUND;case Rt.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Rt.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Rt.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Rt.ABORTED:return D.ABORTED;case Rt.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Rt.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Rt.DATA_LOSS:return D.DATA_LOSS;default:return fail(39323,{code:e})}}(At=Rt||(Rt={}))[At.OK=0]="OK",At[At.CANCELLED=1]="CANCELLED",At[At.UNKNOWN=2]="UNKNOWN",At[At.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",At[At.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",At[At.NOT_FOUND=5]="NOT_FOUND",At[At.ALREADY_EXISTS=6]="ALREADY_EXISTS",At[At.PERMISSION_DENIED=7]="PERMISSION_DENIED",At[At.UNAUTHENTICATED=16]="UNAUTHENTICATED",At[At.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",At[At.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",At[At.ABORTED=10]="ABORTED",At[At.OUT_OF_RANGE=11]="OUT_OF_RANGE",At[At.UNIMPLEMENTED=12]="UNIMPLEMENTED",At[At.INTERNAL=13]="INTERNAL",At[At.UNAVAILABLE=14]="UNAVAILABLE",At[At.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2023 Google LLC
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
let Vt=null;function __PRIVATE_setTestingHooksSpi(e){if(Vt)throw new Error("a TestingHooksSpi instance is already set");Vt=e}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */function __PRIVATE_newTextEncoder(){return new TextEncoder}
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
 */const dt=new bloomBlob.Integer([4294967295,4294967295],0);function __PRIVATE_getMd5HashValue(e){const t=__PRIVATE_newTextEncoder().encode(e),r=new bloomBlob.Md5;return r.update(t),new Uint8Array(r.digest())}function __PRIVATE_get64BitUints(e){const t=new DataView(e.buffer),r=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new bloomBlob.Integer([r,n],0),new bloomBlob.Integer([s,i],0)]}class BloomFilter{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new __PRIVATE_BloomFilterError(`Invalid padding: ${t}`);if(r<0)throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${r}`);if(e.length>0&&0===this.hashCount)throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new __PRIVATE_BloomFilterError(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=bloomBlob.Integer.fromNumber(this.ge)}ye(e,t,r){let n=e.add(t.multiply(bloomBlob.Integer.fromNumber(r)));return 1===n.compare(dt)&&(n=new bloomBlob.Integer([n.getBits(0),n.getBits(1)],0)),n.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=__PRIVATE_getMd5HashValue(e),[r,n]=__PRIVATE_get64BitUints(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(r,n,e);if(!this.we(t))return!1}return!0}static create(e,t,r){const n=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new BloomFilter(s,n,t);return r.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=__PRIVATE_getMd5HashValue(e),[r,n]=__PRIVATE_get64BitUints(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(r,n,e);this.Se(t)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class __PRIVATE_BloomFilterError extends Error{constructor(){super(...arguments),this.name="BloomFilterError"
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
 */}}class RemoteEvent{constructor(e,t,r,n,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const n=new Map;return n.set(e,TargetChange.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new RemoteEvent(SnapshotVersion.min(),n,new SortedMap(__PRIVATE_primitiveComparator),__PRIVATE_mutableDocumentMap(),__PRIVATE_documentKeySet())}}class TargetChange{constructor(e,t,r,n,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new TargetChange(r,t,__PRIVATE_documentKeySet(),__PRIVATE_documentKeySet(),__PRIVATE_documentKeySet())}}
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
 */class __PRIVATE_DocumentWatchChange{constructor(e,t,r,n){this.be=e,this.removedTargetIds=t,this.key=r,this.De=n}}class __PRIVATE_ExistenceFilterChange{constructor(e,t){this.targetId=e,this.Ce=t}}class __PRIVATE_WatchTargetChange{constructor(e,t,r=ByteString.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class __PRIVATE_TargetState{constructor(){this.ve=0,this.Fe=__PRIVATE_snapshotChangesMap(),this.Me=ByteString.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=__PRIVATE_documentKeySet(),t=__PRIVATE_documentKeySet(),r=__PRIVATE_documentKeySet();return this.Fe.forEach((n,s)=>{switch(s){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:fail(38017,{changeType:s})}}),new TargetChange(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=__PRIVATE_snapshotChangesMap()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,__PRIVATE_hardAssert(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class __PRIVATE_WatchChangeAggregator{constructor(e){this.Ge=e,this.ze=new Map,this.je=__PRIVATE_mutableDocumentMap(),this.Je=__PRIVATE_documentTargetMap(),this.He=__PRIVATE_documentTargetMap(),this.Ze=new SortedMap(__PRIVATE_primitiveComparator)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:fail(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,r=e.Ce.count,n=this.ot(t);if(n){const s=n.target;if(__PRIVATE_targetIsDocumentTarget(s))if(0===r){const e=new DocumentKey(s.path);this.et(t,e,MutableDocument.newNoDocument(e,SnapshotVersion.min()))}else __PRIVATE_hardAssert(1===r,20013,{expectedCount:r});else{const n=this._t(t);if(n!==r){const r=this.ut(e),s=r?this.ct(r,e,n):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,e)}Vt?.o(function(e,t,r,n,s){const i={localCacheCount:e,existenceFilterCount:t.count,databaseId:r.database,projectId:r.projectId},o=t.unchangedNames;return o&&(i.bloomFilter={applied:0===s,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>n?.mightContain(e)??!1}),i}
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
 */(n,e.Ce,this.Ge.ht(),r,s))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:n=0},hashCount:s=0}=t;let i,o;try{i=__PRIVATE_normalizeByteString(r).toUint8Array()}catch(e){if(e instanceof __PRIVATE_Base64DecodeError)return __PRIVATE_logWarn("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new BloomFilter(i,n,s)}catch(e){return __PRIVATE_logWarn(e instanceof __PRIVATE_BloomFilterError?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let n=0;return r.forEach(r=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${r.path.canonicalString()}`;e.mightContain(i)||(this.et(t,r,null),n++)}),n}Tt(e){const t=new Map;this.ze.forEach((r,n)=>{const s=this.ot(n);if(s){if(r.current&&__PRIVATE_targetIsDocumentTarget(s.target)){const t=new DocumentKey(s.target.path);this.Et(t).has(n)||this.It(n,t)||this.et(n,t,MutableDocument.newNoDocument(t,e))}r.Be&&(t.set(n,r.ke()),r.qe())}});let r=__PRIVATE_documentKeySet();this.He.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.je.forEach((t,r)=>r.setReadTime(e));const n=new RemoteEvent(e,t,this.Ze,this.je,r);return this.je=__PRIVATE_mutableDocumentMap(),this.Je=__PRIVATE_documentTargetMap(),this.He=__PRIVATE_documentTargetMap(),this.Ze=new SortedMap(__PRIVATE_primitiveComparator),n}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const n=this.nt(e);this.It(e,t)?n.Ke(t,1):n.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new __PRIVATE_TargetState,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new SortedSet(__PRIVATE_primitiveComparator),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new SortedSet(__PRIVATE_primitiveComparator),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||__PRIVATE_logDebug("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new __PRIVATE_TargetState),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function __PRIVATE_documentTargetMap(){return new SortedMap(DocumentKey.comparator)}function __PRIVATE_snapshotChangesMap(){return new SortedMap(DocumentKey.comparator)}const mt={asc:"ASCENDING",desc:"DESCENDING"},ft={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gt={and:"AND",or:"OR"};class JsonProtoSerializer{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function __PRIVATE_toInt32Proto(e,t){return e.useProto3Json||__PRIVATE_isNullOrUndefined(t)?t:{value:t}}function toTimestamp(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function __PRIVATE_toBytes(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function __PRIVATE_toVersion(e,t){return toTimestamp(e,t.toTimestamp())}function __PRIVATE_fromVersion(e){return __PRIVATE_hardAssert(!!e,49232),SnapshotVersion.fromTimestamp(function(e){const t=__PRIVATE_normalizeTimestamp(e);return new Timestamp(t.seconds,t.nanos)}(e))}function __PRIVATE_toResourceName(e,t){return __PRIVATE_toResourcePath(e,t).canonicalString()}function __PRIVATE_toResourcePath(e,t){const r=function(e){return new ResourcePath(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?r:r.child(t)}function __PRIVATE_fromResourceName(e){const t=ResourcePath.fromString(e);return __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(t),10190,{key:t.toString()}),t}function __PRIVATE_toName(e,t){return __PRIVATE_toResourceName(e.databaseId,t.path)}function fromName(e,t){const r=__PRIVATE_fromResourceName(t);if(r.get(1)!==e.databaseId.projectId)throw new FirestoreError(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new FirestoreError(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new DocumentKey(__PRIVATE_extractLocalPathFromResourceName(r))}function __PRIVATE_toQueryPath(e,t){return __PRIVATE_toResourceName(e.databaseId,t)}function __PRIVATE_fromQueryPath(e){const t=__PRIVATE_fromResourceName(e);return 4===t.length?ResourcePath.emptyPath():__PRIVATE_extractLocalPathFromResourceName(t)}function __PRIVATE_getEncodedDatabaseId(e){return new ResourcePath(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function __PRIVATE_extractLocalPathFromResourceName(e){return __PRIVATE_hardAssert(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function __PRIVATE_toMutationDocument(e,t,r){return{name:__PRIVATE_toName(e,t),fields:r.value.mapValue.fields}}function __PRIVATE_fromPipelineResponse(e,t,r){const n={};t.transaction?.length&&(n.transaction=t.transaction);const s=t.executionTime?__PRIVATE_fromVersion(t.executionTime):void 0;return n.executionTime=s,r&&(n.key=r.name?fromName(e,r.name):void 0,n.fields=new ObjectValue({mapValue:{fields:r.fields}}),n.createTime=r.createTime?__PRIVATE_fromVersion(r.createTime):void 0,n.updateTime=r.updateTime?__PRIVATE_fromVersion(r.updateTime):void 0),n}function __PRIVATE_fromDocument(e,t,r){const n=fromName(e,t.name),s=__PRIVATE_fromVersion(t.updateTime),i=t.createTime?__PRIVATE_fromVersion(t.createTime):SnapshotVersion.min(),o=new ObjectValue({mapValue:{fields:t.fields}}),a=MutableDocument.newFoundDocument(n,s,i,o);return r&&a.setHasCommittedMutations(),r?a.setHasCommittedMutations():a}function __PRIVATE_fromBatchGetDocumentsResponse(e,t){return"found"in t?function(e,t){__PRIVATE_hardAssert(!!t.found,43571),t.found.name,t.found.updateTime;const r=fromName(e,t.found.name),n=__PRIVATE_fromVersion(t.found.updateTime),s=t.found.createTime?__PRIVATE_fromVersion(t.found.createTime):SnapshotVersion.min(),i=new ObjectValue({mapValue:{fields:t.found.fields}});return MutableDocument.newFoundDocument(r,n,s,i)}(e,t):"missing"in t?function(e,t){__PRIVATE_hardAssert(!!t.missing,3894),__PRIVATE_hardAssert(!!t.readTime,22933);const r=fromName(e,t.missing),n=__PRIVATE_fromVersion(t.readTime);return MutableDocument.newNoDocument(r,n)}(e,t):fail(7234,{result:t})}function __PRIVATE_fromWatchChange(e,t){let r;if("targetChange"in t){t.targetChange;const n=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:fail(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(e,t){return e.useProto3Json?(__PRIVATE_hardAssert(void 0===t||"string"==typeof t,58123),ByteString.fromBase64String(t||"")):(__PRIVATE_hardAssert(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),ByteString.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?D.UNKNOWN:__PRIVATE_mapCodeFromRpcCode(e.code);return new FirestoreError(t,e.message||"")}(o);r=new __PRIVATE_WatchTargetChange(n,s,i,a||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=fromName(e,n.document.name),i=__PRIVATE_fromVersion(n.document.updateTime),o=n.document.createTime?__PRIVATE_fromVersion(n.document.createTime):SnapshotVersion.min(),a=new ObjectValue({mapValue:{fields:n.document.fields}}),u=MutableDocument.newFoundDocument(s,i,o,a),c=n.targetIds||[],_=n.removedTargetIds||[];r=new __PRIVATE_DocumentWatchChange(c,_,u.key,u)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=fromName(e,n.document),i=n.readTime?__PRIVATE_fromVersion(n.readTime):SnapshotVersion.min(),o=MutableDocument.newNoDocument(s,i),a=n.removedTargetIds||[];r=new __PRIVATE_DocumentWatchChange([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=fromName(e,n.document),i=n.removedTargetIds||[];r=new __PRIVATE_DocumentWatchChange([],i,s,null)}else{if(!("filter"in t))return fail(11601,{Vt:t});{t.filter;const e=t.filter;e.targetId;const{count:n=0,unchangedNames:s}=e,i=new ExistenceFilter(n,s),o=e.targetId;r=new __PRIVATE_ExistenceFilterChange(o,i)}}return r}function toMutation(e,t){let r;if(t instanceof __PRIVATE_SetMutation)r={update:__PRIVATE_toMutationDocument(e,t.key,t.value)};else if(t instanceof __PRIVATE_DeleteMutation)r={delete:__PRIVATE_toName(e,t.key)};else if(t instanceof __PRIVATE_PatchMutation)r={update:__PRIVATE_toMutationDocument(e,t.key,t.data),updateMask:__PRIVATE_toDocumentMask(t.fieldMask)};else{if(!(t instanceof __PRIVATE_VerifyMutation))return fail(16599,{dt:t.type});r={verify:__PRIVATE_toName(e,t.key)}}return t.fieldTransforms.length>0&&(r.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const r=t.transform;if(r instanceof __PRIVATE_ServerTimestampTransform)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof __PRIVATE_ArrayUnionTransformOperation)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof __PRIVATE_ArrayRemoveTransformOperation)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof __PRIVATE_NumericIncrementTransformOperation)return{fieldPath:t.field.canonicalString(),increment:r.Ae};throw fail(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(r.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:__PRIVATE_toVersion(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:fail(27497)}(e,t.precondition)),r}function __PRIVATE_fromMutation(e,t){const r=t.currentDocument?function(e){return void 0!==e.updateTime?Precondition.updateTime(__PRIVATE_fromVersion(e.updateTime)):void 0!==e.exists?Precondition.exists(e.exists):Precondition.none()}(t.currentDocument):Precondition.none(),n=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let r=null;if("setToServerValue"in t)__PRIVATE_hardAssert("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),r=new __PRIVATE_ServerTimestampTransform;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];r=new __PRIVATE_ArrayUnionTransformOperation(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];r=new __PRIVATE_ArrayRemoveTransformOperation(e)}else"increment"in t?r=new __PRIVATE_NumericIncrementTransformOperation(e,t.increment):fail(16584,{proto:t});const n=FieldPath$1.fromServerFormat(t.fieldPath);return new FieldTransform(n,r)}(e,t)):[];if(t.update){t.update.name;const s=fromName(e,t.update.name),i=new ObjectValue({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new FieldMask(t.map(e=>FieldPath$1.fromServerFormat(e)))}(t.updateMask);return new __PRIVATE_PatchMutation(s,i,e,r,n)}return new __PRIVATE_SetMutation(s,i,r,n)}if(t.delete){const n=fromName(e,t.delete);return new __PRIVATE_DeleteMutation(n,r)}if(t.verify){const n=fromName(e,t.verify);return new __PRIVATE_VerifyMutation(n,r)}return fail(1463,{proto:t})}function __PRIVATE_fromWriteResults(e,t){return e&&e.length>0?(__PRIVATE_hardAssert(void 0!==t,14353),e.map(e=>function(e,t){let r=e.updateTime?__PRIVATE_fromVersion(e.updateTime):__PRIVATE_fromVersion(t);return r.isEqual(SnapshotVersion.min())&&(r=__PRIVATE_fromVersion(t)),new MutationResult(r,e.transformResults||[])}(e,t))):[]}function __PRIVATE_toDocumentsTarget(e,t){return{documents:[__PRIVATE_toQueryPath(e,t.path)]}}function __PRIVATE_toQueryTarget(e,t){const r={structuredQuery:{}},n=t.path;let s;null!==t.collectionGroup?(s=n,r.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),r.structuredQuery.from=[{collectionId:n.lastSegment()}]),r.parent=__PRIVATE_toQueryPath(e,s);const i=function(e){if(0!==e.length)return __PRIVATE_toFilter(CompositeFilter.create(e,"and"))}(t.filters);i&&(r.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:__PRIVATE_toFieldPathReference(e.field),direction:__PRIVATE_toDirection(e.dir)}}(e))}(t.orderBy);o&&(r.structuredQuery.orderBy=o);const a=__PRIVATE_toInt32Proto(e,t.limit);return null!==a&&(r.structuredQuery.limit=a),t.startAt&&(r.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(r.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:r,parent:s}}function __PRIVATE_toRunAggregationQueryRequest(e,t,r,n){const{ft:s,parent:i}=__PRIVATE_toQueryTarget(e,t),o={},a=[];let u=0;return r.forEach(e=>{const t=n?e.alias:"aggregate_"+u++;o[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:__PRIVATE_toFieldPathReference(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:__PRIVATE_toFieldPathReference(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function __PRIVATE_convertQueryTargetToQuery(e){let t=__PRIVATE_fromQueryPath(e.parent);const r=e.structuredQuery,n=r.from?r.from.length:0;let s=null;if(n>0){__PRIVATE_hardAssert(1===n,65062);const e=r.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];r.where&&(i=function(e){const t=__PRIVATE_fromFilter(e);return t instanceof CompositeFilter&&__PRIVATE_compositeFilterIsFlatConjunction(t)?t.getFilters():[t]}(r.where));let o=[];r.orderBy&&(o=function(e){return e.map(e=>function(e){return new OrderBy(__PRIVATE_fromFieldPathReference(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(r.orderBy));let a=null;r.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,__PRIVATE_isNullOrUndefined(t)?null:t}(r.limit));let u=null;r.startAt&&(u=function(e){const t=!!e.before,r=e.values||[];return new Bound(r,t)}(r.startAt));let c=null;return r.endAt&&(c=function(e){const t=!e.before,r=e.values||[];return new Bound(r,t)}(r.endAt)),__PRIVATE_newQuery(t,s,o,i,a,"F",u,c)}function __PRIVATE_toListenRequestLabels(e,t){const r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return fail(28987,{purpose:e})}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}function __PRIVATE_fromFilter(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(t,"==",{doubleValue:NaN});case"IS_NULL":const r=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const n=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return fail(61313);default:return fail(60726)}}(e):void 0!==e.fieldFilter?function(e){return FieldFilter.create(__PRIVATE_fromFieldPathReference(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return fail(58110);default:return fail(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return CompositeFilter.create(e.compositeFilter.filters.map(e=>__PRIVATE_fromFilter(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return fail(1026)}}(e.compositeFilter.op))}(e):fail(30097,{filter:e})}function __PRIVATE_toDirection(e){return mt[e]}function __PRIVATE_toOperatorName(e){return ft[e]}function __PRIVATE_toCompositeOperatorName(e){return gt[e]}function __PRIVATE_toFieldPathReference(e){return{fieldPath:e.canonicalString()}}function __PRIVATE_fromFieldPathReference(e){return FieldPath$1.fromServerFormat(e.fieldPath)}function __PRIVATE_toFilter(e){return e instanceof FieldFilter?function(e){if("=="===e.op){if(__PRIVATE_isNanValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NAN"}};if(__PRIVATE_isNullValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(__PRIVATE_isNanValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NOT_NAN"}};if(__PRIVATE_isNullValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:__PRIVATE_toOperatorName(e.op),value:e.value}}}(e):e instanceof CompositeFilter?function(e){const t=e.getFilters().map(e=>__PRIVATE_toFilter(e));return 1===t.length?t[0]:{compositeFilter:{op:__PRIVATE_toCompositeOperatorName(e.op),filters:t}}}(e):fail(54877,{filter:e})}function __PRIVATE_toDocumentMask(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function __PRIVATE_isValidResourceName(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function __PRIVATE_isProtoValueSerializable(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function __PRIVATE_toMapValue(e,t){const r={fields:{}};return t.forEach((t,n)=>{if("string"!=typeof n)throw new Error(`Cannot encode map with non-string key: ${n}`);r.fields[n]=t._toProto(e)}),{mapValue:r}}function __PRIVATE_toStringValue(e){return{stringValue:e}}function __PRIVATE_toPipelineValue(e){return{pipelineValue:e}}
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
 */class TargetData{constructor(e,t,r,n,s=SnapshotVersion.min(),i=SnapshotVersion.min(),o=ByteString.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new TargetData(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new TargetData(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new TargetData(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new TargetData(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
 */class __PRIVATE_LocalSerializer{constructor(e){this.yt=e}}function __PRIVATE_fromDbRemoteDocument(e,t){let r;if(t.document)r=__PRIVATE_fromDocument(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=DocumentKey.fromSegments(t.noDocument.path),n=__PRIVATE_fromDbTimestamp(t.noDocument.readTime);r=MutableDocument.newNoDocument(e,n),t.hasCommittedMutations&&r.setHasCommittedMutations()}else{if(!t.unknownDocument)return fail(56709);{const e=DocumentKey.fromSegments(t.unknownDocument.path),n=__PRIVATE_fromDbTimestamp(t.unknownDocument.version);r=MutableDocument.newUnknownDocument(e,n)}}return t.readTime&&r.setReadTime(function(e){const t=new Timestamp(e[0],e[1]);return SnapshotVersion.fromTimestamp(t)}(t.readTime)),r}function __PRIVATE_toDbRemoteDocument(e,t){const r=t.key,n={prefixPath:r.getCollectionPath().popLast().toArray(),collectionGroup:r.collectionGroup,documentId:r.path.lastSegment(),readTime:__PRIVATE_toDbTimestampKey(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(e,t){return{name:__PRIVATE_toName(e,t.key),fields:t.data.value.mapValue.fields,updateTime:toTimestamp(e,t.version.toTimestamp()),createTime:toTimestamp(e,t.createTime.toTimestamp())}}(e.yt,t);else if(t.isNoDocument())n.noDocument={path:r.path.toArray(),readTime:__PRIVATE_toDbTimestamp(t.version)};else{if(!t.isUnknownDocument())return fail(57904,{document:t});n.unknownDocument={path:r.path.toArray(),version:__PRIVATE_toDbTimestamp(t.version)}}return n}function __PRIVATE_toDbTimestampKey(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function __PRIVATE_toDbTimestamp(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function __PRIVATE_fromDbTimestamp(e){const t=new Timestamp(e.seconds,e.nanoseconds);return SnapshotVersion.fromTimestamp(t)}function __PRIVATE_fromDbMutationBatch(e,t){const r=(t.baseMutations||[]).map(t=>__PRIVATE_fromMutation(e.yt,t));for(let e=0;e<t.mutations.length-1;++e){const r=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const n=t.mutations[e+1];r.updateTransforms=n.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const n=t.mutations.map(t=>__PRIVATE_fromMutation(e.yt,t)),s=Timestamp.fromMillis(t.localWriteTimeMs);return new MutationBatch(t.batchId,s,r,n)}function __PRIVATE_fromDbTarget(e){const t=__PRIVATE_fromDbTimestamp(e.readTime),r=void 0!==e.lastLimboFreeSnapshotVersion?__PRIVATE_fromDbTimestamp(e.lastLimboFreeSnapshotVersion):SnapshotVersion.min();let n;return n=function(e){return void 0!==e.documents}(e.query)?function(e){const t=e.documents.length;return __PRIVATE_hardAssert(1===t,1966,{count:t}),__PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(__PRIVATE_fromQueryPath(e.documents[0])))}(e.query):function(e){return __PRIVATE_queryToTarget(__PRIVATE_convertQueryTargetToQuery(e))}(e.query),new TargetData(n,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,r,ByteString.fromBase64String(e.resumeToken))}function __PRIVATE_toDbTarget(e,t){const r=__PRIVATE_toDbTimestamp(t.snapshotVersion),n=__PRIVATE_toDbTimestamp(t.lastLimboFreeSnapshotVersion);let s;s=__PRIVATE_targetIsDocumentTarget(t.target)?__PRIVATE_toDocumentsTarget(e.yt,t.target):__PRIVATE_toQueryTarget(e.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:__PRIVATE_canonifyTarget(t.target),readTime:r,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function __PRIVATE_fromBundledQuery(e){const t=__PRIVATE_convertQueryTargetToQuery({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?__PRIVATE_queryWithLimit(t,t.limit,"L"):t}function __PRIVATE_fromDbDocumentOverlay(e,t){return new Overlay(t.largestBatchId,__PRIVATE_fromMutation(e.yt,t.overlayMutation))}function __PRIVATE_toDbDocumentOverlayKey(e,t){const r=t.path.lastSegment();return[e,__PRIVATE_encodeResourcePath(t.path.popLast()),r]}function __PRIVATE_toDbIndexState(e,t,r,n){return{indexId:e,uid:t,sequenceNumber:r,readTime:__PRIVATE_toDbTimestamp(n.readTime),documentKey:__PRIVATE_encodeResourcePath(n.documentKey.path),largestBatchId:n.largestBatchId}}
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
 */class __PRIVATE_IndexedDbBundleCache{getBundleMetadata(e,t){return __PRIVATE_bundlesStore(e).get(t).next(e=>{if(e)return function(e){return{id:e.bundleId,createTime:__PRIVATE_fromDbTimestamp(e.createTime),version:e.version}}(e)})}saveBundleMetadata(e,t){return __PRIVATE_bundlesStore(e).put(function(e){return{bundleId:e.id,createTime:__PRIVATE_toDbTimestamp(__PRIVATE_fromVersion(e.createTime)),version:e.version}}(t))}getNamedQuery(e,t){return __PRIVATE_namedQueriesStore(e).get(t).next(e=>{if(e)return function(e){return{name:e.name,query:__PRIVATE_fromBundledQuery(e.bundledQuery),readTime:__PRIVATE_fromDbTimestamp(e.readTime)}}(e)})}saveNamedQuery(e,t){return __PRIVATE_namedQueriesStore(e).put(function(e){return{name:e.name,readTime:__PRIVATE_toDbTimestamp(__PRIVATE_fromVersion(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function __PRIVATE_bundlesStore(e){return __PRIVATE_getStore(e,me)}function __PRIVATE_namedQueriesStore(e){return __PRIVATE_getStore(e,ge)}
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
 */class __PRIVATE_IndexedDbDocumentOverlayCache{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new __PRIVATE_IndexedDbDocumentOverlayCache(e,r)}getOverlay(e,t){return __PRIVATE_documentOverlayStore(e).get(__PRIVATE_toDbDocumentOverlayKey(this.userId,t)).next(e=>e?__PRIVATE_fromDbDocumentOverlay(this.serializer,e):null)}getOverlays(e,t){const r=__PRIVATE_newOverlayMap();return PersistencePromise.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){const n=[];return r.forEach((r,s)=>{const i=new Overlay(t,s);n.push(this.St(e,i))}),PersistencePromise.waitFor(n)}removeOverlaysForBatchId(e,t,r){const n=new Set;t.forEach(e=>n.add(__PRIVATE_encodeResourcePath(e.getCollectionPath())));const s=[];return n.forEach(t=>{const n=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,r+1],!1,!0);s.push(__PRIVATE_documentOverlayStore(e).X(ke,n))}),PersistencePromise.waitFor(s)}getOverlaysForCollection(e,t,r){const n=__PRIVATE_newOverlayMap(),s=__PRIVATE_encodeResourcePath(t),i=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return __PRIVATE_documentOverlayStore(e).J(ke,i).next(e=>{for(const t of e){const e=__PRIVATE_fromDbDocumentOverlay(this.serializer,t);n.set(e.getKey(),e)}return n})}getOverlaysForCollectionGroup(e,t,r,n){const s=__PRIVATE_newOverlayMap();let i;const o=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return __PRIVATE_documentOverlayStore(e).ee({index:qe,range:o},(e,t,r)=>{const o=__PRIVATE_fromDbDocumentOverlay(this.serializer,t);s.size()<n||o.largestBatchId===i?(s.set(o.getKey(),o),i=o.largestBatchId):r.done()}).next(()=>s)}St(e,t){return __PRIVATE_documentOverlayStore(e).put(function(e,t,r){const[n,s,i]=__PRIVATE_toDbDocumentOverlayKey(t,r.mutation.key);return{userId:t,collectionPath:s,documentId:i,collectionGroup:r.mutation.key.getCollectionGroup(),largestBatchId:r.largestBatchId,overlayMutation:toMutation(e.yt,r.mutation)}}(this.serializer,this.userId,t))}}function __PRIVATE_documentOverlayStore(e){return __PRIVATE_getStore(e,Be)}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */class __PRIVATE_IndexedDbGlobalsCache{bt(e){return __PRIVATE_getStore(e,$e)}getSessionToken(e){return this.bt(e).get("sessionToken").next(e=>{const t=e?.value;return t?ByteString.fromUint8Array(t):ByteString.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}
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
 */class __PRIVATE_FirestoreIndexValueWriter{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(__PRIVATE_normalizeNumber(e.integerValue));else if("doubleValue"in e){const r=__PRIVATE_normalizeNumber(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),__PRIVATE_isNegativeZero(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),"string"==typeof r&&(r=__PRIVATE_normalizeTimestamp(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(__PRIVATE_normalizeByteString(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?__PRIVATE_isMaxValue(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):__PRIVATE_isVectorValue(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):fail(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const r=e.fields||{};this.Ft(t,55);for(const e of Object.keys(r))this.Ot(e,t),this.Ct(r[e],t)}kt(e,t){const r=e.fields||{};this.Ft(t,53);const n=ut,s=r[n].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(__PRIVATE_normalizeNumber(s)),this.Ot(n,t),this.Ct(r[n],t)}Kt(e,t){const r=e.values||[];this.Ft(t,50);for(const e of r)this.Ct(e,t)}Lt(e,t){this.Ft(t,37),DocumentKey.fromName(e).path.forEach(e=>{this.Ft(t,60),this.$t(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}__PRIVATE_FirestoreIndexValueWriter.Wt=new __PRIVATE_FirestoreIndexValueWriter;
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
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pt=255;function __PRIVATE_numberOfLeadingZerosInByte(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function __PRIVATE_unsignedNumLength(e){const t=64-function(e){let t=0;for(let r=0;r<8;++r){const n=__PRIVATE_numberOfLeadingZerosInByte(255&e[r]);if(t+=n,8!==n)break}return t}(e);return Math.ceil(t/8)}class __PRIVATE_OrderedCodeWriter{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{const e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Xt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Jt(e);else if(e<2048)this.Jt(960|e>>>6),this.Jt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Jt(480|e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e);else{const e=t.codePointAt(0);this.Jt(240|e>>>18),this.Jt(128|63&e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e)}}this.Ht()}Yt(e){const t=this.en(e),r=__PRIVATE_unsignedNumLength(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let e=t.length-r;e<t.length;++e)this.buffer[this.position++]=255&t[e]}nn(e){const t=this.en(e),r=__PRIVATE_unsignedNumLength(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let e=t.length-r;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}rn(){this.sn(pt),this.sn(255)}_n(){this.an(pt),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let e=1;e<t.length;++e)t[e]^=r?255:0;return t}Gt(e){const t=255&e;0===t?(this.sn(0),this.sn(255)):t===pt?(this.sn(pt),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;0===t?(this.an(0),this.an(255)):t===pt?(this.an(pt),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const n=new Uint8Array(r);n.set(this.buffer),this.buffer=n}}class __PRIVATE_AscendingIndexByteEncoder{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class __PRIVATE_DescendingIndexByteEncoder{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class __PRIVATE_IndexByteEncoder{constructor(){this.cn=new __PRIVATE_OrderedCodeWriter,this.ascending=new __PRIVATE_AscendingIndexByteEncoder(this.cn),this.descending=new __PRIVATE_DescendingIndexByteEncoder(this.cn)}seed(e){this.cn.seed(e)}ln(e){return 0===e?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}
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
 */class __PRIVATE_IndexEntry{constructor(e,t,r,n){this.hn=e,this.Pn=t,this.Tn=r,this.En=n}In(){const e=this.En.length,t=0===e||255===this.En[e-1]?e+1:e,r=new Uint8Array(t);return r.set(this.En,0),t!==e?r.set([0],this.En.length):++r[r.length-1],new __PRIVATE_IndexEntry(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:__PRIVATE_encodeKeySafeBytes(this.Tn),directionalValue:__PRIVATE_encodeKeySafeBytes(this.En),orderedDocumentKey:__PRIVATE_encodeKeySafeBytes(t),documentKey:r.path.toArray()}}An(e,t,r){const n=this.Rn(e,t,r);return[n.indexId,n.uid,n.arrayValue,n.directionalValue,n.orderedDocumentKey,n.documentKey]}}function __PRIVATE_indexEntryComparator(e,t){let r=e.hn-t.hn;return 0!==r?r:(r=__PRIVATE_compareByteArrays(e.Tn,t.Tn),0!==r?r:(r=__PRIVATE_compareByteArrays(e.En,t.En),0!==r?r:DocumentKey.comparator(e.Pn,t.Pn)))}function __PRIVATE_compareByteArrays(e,t){for(let r=0;r<e.length&&r<t.length;++r){const n=e[r]-t[r];if(0!==n)return n}return e.length-t.length}function __PRIVATE_encodeKeySafeBytes(e){return util.isSafariOrWebkit()?function(e){let t="";for(let r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t}(e):e}function __PRIVATE_decodeKeySafeBytes(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}
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
 */(e)}class __PRIVATE_TargetIndexMatcher{constructor(e){this.Vn=new SortedSet((e,t)=>FieldPath$1.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const e=t;e.isInequality()?this.Vn=this.Vn.add(e):this.mn.push(e)}}get fn(){return this.Vn.size>1}gn(e){if(__PRIVATE_hardAssert(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=__PRIVATE_fieldIndexGetArraySegment(e);if(void 0!==t&&!this.pn(t))return!1;const r=__PRIVATE_fieldIndexGetDirectionalSegments(e);let n=new Set,s=0,i=0;for(;s<r.length&&this.pn(r[s]);++s)n=n.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Vn.size>0){const e=this.Vn.getIterator().getNext();if(!n.has(e.field.canonicalString())){const t=r[s];if(!this.yn(e,t)||!this.wn(this.dn[i++],t))return!1}++s}for(;s<r.length;++s){const e=r[s];if(i>=this.dn.length||!this.wn(this.dn[i++],e))return!1}return!0}Sn(){if(this.fn)return null;let e=new SortedSet(FieldPath$1.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if("array-contains"===r.op||"array-contains-any"===r.op)t.push(new IndexSegment(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new IndexSegment(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new IndexSegment(r.field,"asc"===r.dir?0:1)));return new FieldIndex(FieldIndex.UNKNOWN_ID,this.collectionId,t,IndexState.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const r="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
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
 */function __PRIVATE_computeInExpansion(e){if(__PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,20012),e instanceof FieldFilter){if(e instanceof __PRIVATE_InFilter){const t=e.value.arrayValue?.values?.map(t=>FieldFilter.create(e.field,"==",t))||[];return CompositeFilter.create(t,"or")}return e}const t=e.filters.map(e=>__PRIVATE_computeInExpansion(e));return CompositeFilter.create(t,e.op)}function __PRIVATE_getDnfTerms(e){if(0===e.getFilters().length)return[];const t=__PRIVATE_computeDistributedNormalForm(__PRIVATE_computeInExpansion(e));return __PRIVATE_hardAssert(__PRIVATE_isDisjunctiveNormalForm(t),7391),__PRIVATE_isSingleFieldFilter(t)||__PRIVATE_isFlatConjunction(t)?[t]:t.getFilters()}function __PRIVATE_isSingleFieldFilter(e){return e instanceof FieldFilter}function __PRIVATE_isFlatConjunction(e){return e instanceof CompositeFilter&&__PRIVATE_compositeFilterIsFlatConjunction(e)}function __PRIVATE_isDisjunctiveNormalForm(e){return __PRIVATE_isSingleFieldFilter(e)||__PRIVATE_isFlatConjunction(e)||function(e){if(e instanceof CompositeFilter&&__PRIVATE_compositeFilterIsDisjunction(e)){for(const t of e.getFilters())if(!__PRIVATE_isSingleFieldFilter(t)&&!__PRIVATE_isFlatConjunction(t))return!1;return!0}return!1}(e)}function __PRIVATE_computeDistributedNormalForm(e){if(__PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,34018),e instanceof FieldFilter)return e;if(1===e.filters.length)return __PRIVATE_computeDistributedNormalForm(e.filters[0]);const t=e.filters.map(e=>__PRIVATE_computeDistributedNormalForm(e));let r=CompositeFilter.create(t,e.op);return r=__PRIVATE_applyAssociation(r),__PRIVATE_isDisjunctiveNormalForm(r)?r:(__PRIVATE_hardAssert(r instanceof CompositeFilter,64498),__PRIVATE_hardAssert(__PRIVATE_compositeFilterIsConjunction(r),40251),__PRIVATE_hardAssert(r.filters.length>1,57927),r.filters.reduce((e,t)=>__PRIVATE_applyDistribution(e,t)))}function __PRIVATE_applyDistribution(e,t){let r;return __PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,38388),__PRIVATE_hardAssert(t instanceof FieldFilter||t instanceof CompositeFilter,25473),r=e instanceof FieldFilter?t instanceof FieldFilter?function(e,t){return CompositeFilter.create([e,t],"and")}(e,t):__PRIVATE_applyDistributionFieldAndCompositeFilters(e,t):t instanceof FieldFilter?__PRIVATE_applyDistributionFieldAndCompositeFilters(t,e):function(e,t){if(__PRIVATE_hardAssert(e.filters.length>0&&t.filters.length>0,48005),__PRIVATE_compositeFilterIsConjunction(e)&&__PRIVATE_compositeFilterIsConjunction(t))return __PRIVATE_compositeFilterWithAddedFilters(e,t.getFilters());const r=__PRIVATE_compositeFilterIsDisjunction(e)?e:t,n=__PRIVATE_compositeFilterIsDisjunction(e)?t:e,s=r.filters.map(e=>__PRIVATE_applyDistribution(e,n));return CompositeFilter.create(s,"or")}(e,t),__PRIVATE_applyAssociation(r)}function __PRIVATE_applyDistributionFieldAndCompositeFilters(e,t){if(__PRIVATE_compositeFilterIsConjunction(t))return __PRIVATE_compositeFilterWithAddedFilters(t,e.getFilters());{const r=t.filters.map(t=>__PRIVATE_applyDistribution(e,t));return CompositeFilter.create(r,"or")}}function __PRIVATE_applyAssociation(e){if(__PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,11850),e instanceof FieldFilter)return e;const t=e.getFilters();if(1===t.length)return __PRIVATE_applyAssociation(t[0]);if(__PRIVATE_compositeFilterIsFlat(e))return e;const r=t.map(e=>__PRIVATE_applyAssociation(e)),n=[];return r.forEach(t=>{t instanceof FieldFilter?n.push(t):t instanceof CompositeFilter&&(t.op===e.op?n.push(...t.filters):n.push(t))}),1===n.length?n[0]:CompositeFilter.create(n,e.op)
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
 */}class __PRIVATE_MemoryIndexManager{constructor(){this.bn=new __PRIVATE_MemoryCollectionParentIndex}addToCollectionParentIndex(e,t){return this.bn.add(t),PersistencePromise.resolve()}getCollectionParents(e,t){return PersistencePromise.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return PersistencePromise.resolve()}deleteFieldIndex(e,t){return PersistencePromise.resolve()}deleteAllFieldIndexes(e){return PersistencePromise.resolve()}createTargetIndexes(e,t){return PersistencePromise.resolve()}getDocumentsMatchingTarget(e,t){return PersistencePromise.resolve(null)}getIndexType(e,t){return PersistencePromise.resolve(0)}getFieldIndexes(e,t){return PersistencePromise.resolve([])}getNextCollectionGroupToUpdate(e){return PersistencePromise.resolve(null)}getMinOffset(e,t){return PersistencePromise.resolve(IndexOffset.min())}getMinOffsetFromCollectionGroup(e,t){return PersistencePromise.resolve(IndexOffset.min())}updateCollectionGroup(e,t,r){return PersistencePromise.resolve()}updateIndexEntries(e,t){return PersistencePromise.resolve()}}class __PRIVATE_MemoryCollectionParentIndex{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new SortedSet(ResourcePath.comparator),s=!n.has(r);return this.index[t]=n.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new SortedSet(ResourcePath.comparator)).toArray()}}
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
 */const yt="IndexedDbIndexManager",wt=new Uint8Array(0);class __PRIVATE_IndexedDbIndexManager{constructor(e,t){this.databaseId=t,this.Dn=new __PRIVATE_MemoryCollectionParentIndex,this.Cn=new ObjectMap(e=>__PRIVATE_canonifyTarget(e),(e,t)=>__PRIVATE_targetEquals(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),n=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const s={collectionId:r,parent:__PRIVATE_encodeResourcePath(n)};return __PRIVATE_collectionParentsStore(e).put(s)}return PersistencePromise.resolve()}getCollectionParents(e,t){const r=[],n=IDBKeyRange.bound([t,""],[__PRIVATE_immediateSuccessor(t),""],!1,!0);return __PRIVATE_collectionParentsStore(e).J(n).next(e=>{for(const n of e){if(n.collectionId!==t)break;r.push(__PRIVATE_decodeResourcePath(n.parent))}return r})}addFieldIndex(e,t){const r=__PRIVATE_indexConfigurationStore(e),n=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete n.indexId;const s=r.add(n);if(t.indexState){const r=__PRIVATE_indexStateStore(e);return s.next(e=>{r.put(__PRIVATE_toDbIndexState(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=__PRIVATE_indexConfigurationStore(e),n=__PRIVATE_indexStateStore(e),s=__PRIVATE_indexEntriesStore(e);return r.delete(t.indexId).next(()=>n.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=__PRIVATE_indexConfigurationStore(e),r=__PRIVATE_indexEntriesStore(e),n=__PRIVATE_indexStateStore(e);return t.X().next(()=>r.X()).next(()=>n.X())}createTargetIndexes(e,t){return PersistencePromise.forEach(this.vn(t),t=>this.getIndexType(e,t).next(r=>{if(0===r||1===r){const r=new __PRIVATE_TargetIndexMatcher(t).Sn();if(null!=r)return this.addFieldIndex(e,r)}}))}getDocumentsMatchingTarget(e,t){const r=__PRIVATE_indexEntriesStore(e);let n=!0;const s=new Map;return PersistencePromise.forEach(this.vn(t),t=>this.Fn(e,t).next(e=>{n&&(n=!!e),s.set(t,e)})).next(()=>{if(n){let e=__PRIVATE_documentKeySet();const n=[];return PersistencePromise.forEach(s,(s,i)=>{__PRIVATE_logDebug(yt,`Using index ${function(e){return`id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`}(s)} to execute ${__PRIVATE_canonifyTarget(t)}`);const o=function(e,t){const r=__PRIVATE_fieldIndexGetArraySegment(t);if(void 0===r)return null;for(const t of __PRIVATE_targetGetFieldFiltersForPath(e,r.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(i,s),a=function(e,t){const r=new Map;for(const n of __PRIVATE_fieldIndexGetDirectionalSegments(t))for(const t of __PRIVATE_targetGetFieldFiltersForPath(e,n.fieldPath))switch(t.op){case"==":case"in":r.set(n.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return r.set(n.fieldPath.canonicalString(),t.value),Array.from(r.values())}return null}(i,s),u=function(e,t){const r=[];let n=!0;for(const s of __PRIVATE_fieldIndexGetDirectionalSegments(t)){const t=0===s.kind?__PRIVATE_targetGetAscendingBound(e,s.fieldPath,e.startAt):__PRIVATE_targetGetDescendingBound(e,s.fieldPath,e.startAt);r.push(t.value),n&&(n=t.inclusive)}return new Bound(r,n)}(i,s),c=function(e,t){const r=[];let n=!0;for(const s of __PRIVATE_fieldIndexGetDirectionalSegments(t)){const t=0===s.kind?__PRIVATE_targetGetDescendingBound(e,s.fieldPath,e.endAt):__PRIVATE_targetGetAscendingBound(e,s.fieldPath,e.endAt);r.push(t.value),n&&(n=t.inclusive)}return new Bound(r,n)}(i,s),_=this.Mn(s,i,u),l=this.Mn(s,i,c),h=this.xn(s,i,a),d=this.On(s.indexId,o,_,u.inclusive,l,c.inclusive,h);return PersistencePromise.forEach(d,s=>r.Z(s,t.limit).next(t=>{t.forEach(t=>{const r=DocumentKey.fromSegments(t.documentKey);e.has(r)||(e=e.add(r),n.push(r))})}))}).next(()=>n)}return PersistencePromise.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(t=0===e.filters.length?[e]:__PRIVATE_getDnfTerms(CompositeFilter.create(e.filters,"and")).map(t=>__PRIVATE_newTarget(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,r,n,s,i,o){const a=(null!=t?t.length:1)*Math.max(r.length,s.length),u=a/(null!=t?t.length:1),c=[];for(let _=0;_<a;++_){const a=t?this.Nn(t[_/u]):wt,l=this.Bn(e,a,r[_%u],n),h=this.Ln(e,a,s[_%u],i),d=o.map(t=>this.Bn(e,a,t,!0));c.push(...this.createRange(l,h,d))}return c}Bn(e,t,r,n){const s=new __PRIVATE_IndexEntry(e,DocumentKey.empty(),t,r);return n?s:s.In()}Ln(e,t,r,n){const s=new __PRIVATE_IndexEntry(e,DocumentKey.empty(),t,r);return n?s.In():s}Fn(e,t){const r=new __PRIVATE_TargetIndexMatcher(t),n=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,n).next(e=>{let t=null;for(const n of e)r.gn(n)&&(!t||n.fields.length>t.fields.length)&&(t=n);return t})}getIndexType(e,t){let r=2;const n=this.vn(t);return PersistencePromise.forEach(n,t=>this.Fn(e,t).next(e=>{e?0!==r&&e.fields.length<function(e){let t=new SortedSet(FieldPath$1.comparator),r=!1;for(const n of e.filters)for(const e of n.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?r=!0:t=t.add(e.field));for(const r of e.orderBy)r.field.isKeyField()||(t=t.add(r.field));return t.size+(r?1:0)}(t)&&(r=1):r=0})).next(()=>function(e){return null!==e.limit}(t)&&n.length>1&&2===r?1:r)}kn(e,t){const r=new __PRIVATE_IndexByteEncoder;for(const n of __PRIVATE_fieldIndexGetDirectionalSegments(e)){const e=t.data.field(n.fieldPath);if(null==e)return null;const s=r.ln(n.kind);__PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,s)}return r.un()}Nn(e){const t=new __PRIVATE_IndexByteEncoder;return __PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const r=new __PRIVATE_IndexByteEncoder;return __PRIVATE_FirestoreIndexValueWriter.Wt.Dt(__PRIVATE_refValue(this.databaseId,t),r.ln(function(e){const t=__PRIVATE_fieldIndexGetDirectionalSegments(e);return 0===t.length?0:t[t.length-1].kind}(e))),r.un()}xn(e,t,r){if(null===r)return[];let n=[];n.push(new __PRIVATE_IndexByteEncoder);let s=0;for(const i of __PRIVATE_fieldIndexGetDirectionalSegments(e)){const e=r[s++];for(const r of n)if(this.Kn(t,i.fieldPath)&&isArray(e))n=this.Un(n,i,e);else{const t=r.ln(i.kind);__PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,t)}}return this.$n(n)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const n=[...e],s=[];for(const e of r.arrayValue.values||[])for(const r of n){const n=new __PRIVATE_IndexByteEncoder;n.seed(r.un()),__PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,n.ln(t.kind)),s.push(n)}return s}Kn(e,t){return!!e.filters.find(e=>e instanceof FieldFilter&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const r=__PRIVATE_indexConfigurationStore(e),n=__PRIVATE_indexStateStore(e);return(t?r.J(be,IDBKeyRange.bound(t,t)):r.J()).next(e=>{const t=[];return PersistencePromise.forEach(e,e=>n.get([e.indexId,this.uid]).next(r=>{t.push(function(e,t){const r=t?new IndexState(t.sequenceNumber,new IndexOffset(__PRIVATE_fromDbTimestamp(t.readTime),new DocumentKey(__PRIVATE_decodeResourcePath(t.documentKey)),t.largestBatchId)):IndexState.empty(),n=e.fields.map(([e,t])=>new IndexSegment(FieldPath$1.fromServerFormat(e),t));return new FieldIndex(e.indexId,e.collectionGroup,n,r)}(e,r))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const r=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==r?r:__PRIVATE_primitiveComparator(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,r){const n=__PRIVATE_indexConfigurationStore(e),s=__PRIVATE_indexStateStore(e);return this.Wn(e).next(e=>n.J(be,IDBKeyRange.bound(t,t)).next(t=>PersistencePromise.forEach(t,t=>s.put(__PRIVATE_toDbIndexState(t.indexId,this.uid,e,r)))))}updateIndexEntries(e,t){const r=new Map;return PersistencePromise.forEach(t,(t,n)=>{const s=r.get(t.collectionGroup);return(s?PersistencePromise.resolve(s):this.getFieldIndexes(e,t.collectionGroup)).next(s=>(r.set(t.collectionGroup,s),PersistencePromise.forEach(s,r=>this.Qn(e,t,r).next(t=>{const s=this.Gn(n,r);return t.isEqual(s)?PersistencePromise.resolve():this.zn(e,n,r,t,s)}))))})}jn(e,t,r,n){return __PRIVATE_indexEntriesStore(e).put(n.Rn(this.uid,this.qn(r,t.key),t.key))}Jn(e,t,r,n){return __PRIVATE_indexEntriesStore(e).delete(n.An(this.uid,this.qn(r,t.key),t.key))}Qn(e,t,r){const n=__PRIVATE_indexEntriesStore(e);let s=new SortedSet(__PRIVATE_indexEntryComparator);return n.ee({index:Oe,range:IDBKeyRange.only([r.indexId,this.uid,__PRIVATE_encodeKeySafeBytes(this.qn(r,t))])},(e,n)=>{s=s.add(new __PRIVATE_IndexEntry(r.indexId,t,__PRIVATE_decodeKeySafeBytes(n.arrayValue),__PRIVATE_decodeKeySafeBytes(n.directionalValue)))}).next(()=>s)}Gn(e,t){let r=new SortedSet(__PRIVATE_indexEntryComparator);const n=this.kn(t,e);if(null==n)return r;const s=__PRIVATE_fieldIndexGetArraySegment(t);if(null!=s){const i=e.data.field(s.fieldPath);if(isArray(i))for(const s of i.arrayValue.values||[])r=r.add(new __PRIVATE_IndexEntry(t.indexId,e.key,this.Nn(s),n))}else r=r.add(new __PRIVATE_IndexEntry(t.indexId,e.key,wt,n));return r}zn(e,t,r,n,s){__PRIVATE_logDebug(yt,"Updating index entries for document '%s'",t.key);const i=[];return function(e,t,r,n,s){const i=e.getIterator(),o=t.getIterator();let a=__PRIVATE_advanceIterator(i),u=__PRIVATE_advanceIterator(o);for(;a||u;){let e=!1,t=!1;if(a&&u){const n=r(a,u);n<0?t=!0:n>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(n(u),u=__PRIVATE_advanceIterator(o)):t?(s(a),a=__PRIVATE_advanceIterator(i)):(a=__PRIVATE_advanceIterator(i),u=__PRIVATE_advanceIterator(o))}}(n,s,__PRIVATE_indexEntryComparator,n=>{i.push(this.jn(e,t,r,n))},n=>{i.push(this.Jn(e,t,r,n))}),PersistencePromise.waitFor(i)}Wn(e){let t=1;return __PRIVATE_indexStateStore(e).ee({index:ve,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,r,n)=>{n.done(),t=r.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((e,t)=>__PRIVATE_indexEntryComparator(e,t)).filter((e,t,r)=>!t||0!==__PRIVATE_indexEntryComparator(e,r[t-1]));const n=[];n.push(e);for(const s of r){const r=__PRIVATE_indexEntryComparator(s,e),i=__PRIVATE_indexEntryComparator(s,t);if(0===r)n[0]=e.In();else if(r>0&&i<0)n.push(s),n.push(s.In());else if(i>0)break}n.push(t);const s=[];for(let e=0;e<n.length;e+=2){if(this.Hn(n[e],n[e+1]))return[];const t=n[e].An(this.uid,wt,DocumentKey.empty()),r=n[e+1].An(this.uid,wt,DocumentKey.empty());s.push(IDBKeyRange.bound(t,r))}return s}Hn(e,t){return __PRIVATE_indexEntryComparator(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(__PRIVATE_getMinOffsetFromFieldIndexes)}getMinOffset(e,t){return PersistencePromise.mapArray(this.vn(t),t=>this.Fn(e,t).next(e=>e||fail(44426))).next(__PRIVATE_getMinOffsetFromFieldIndexes)}}function __PRIVATE_collectionParentsStore(e){return __PRIVATE_getStore(e,Re)}function __PRIVATE_indexEntriesStore(e){return __PRIVATE_getStore(e,Me)}function __PRIVATE_indexConfigurationStore(e){return __PRIVATE_getStore(e,ye)}function __PRIVATE_indexStateStore(e){return __PRIVATE_getStore(e,De)}function __PRIVATE_getMinOffsetFromFieldIndexes(e){__PRIVATE_hardAssert(0!==e.length,28825);let t=e[0].indexState.offset,r=t.largestBatchId;for(let n=1;n<e.length;n++){const s=e[n].indexState.offset;__PRIVATE_indexOffsetComparator(s,t)<0&&(t=s),r<s.largestBatchId&&(r=s.largestBatchId)}return new IndexOffset(t.readTime,t.documentKey,r)}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */const bt={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},St=41943040;class LruParams{static withCacheSize(e){return new LruParams(e,LruParams.DEFAULT_COLLECTION_PERCENTILE,LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r
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
 */}}function removeMutationBatch(e,t,r){const n=e.store(j),s=e.store(Y),i=[],o=IDBKeyRange.only(r.batchId);let a=0;const u=n.ee({range:o},(e,t,r)=>(a++,r.delete()));i.push(u.next(()=>{__PRIVATE_hardAssert(1===a,47070,{batchId:r.batchId})}));const c=[];for(const e of r.mutations){const n=__PRIVATE_newDbDocumentMutationKey(t,e.key.path,r.batchId);i.push(s.delete(n)),c.push(e.key)}return PersistencePromise.waitFor(i).next(()=>c)}function __PRIVATE_dbDocumentSize(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw fail(14731);t=e.noDocument}return JSON.stringify(t).length}
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
 */LruParams.DEFAULT_COLLECTION_PERCENTILE=10,LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,LruParams.DEFAULT=new LruParams(St,LruParams.DEFAULT_COLLECTION_PERCENTILE,LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),LruParams.DISABLED=new LruParams(-1,0,0);class __PRIVATE_IndexedDbMutationQueue{constructor(e,t,r,n){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=n,this.Zn={}}static wt(e,t,r,n){__PRIVATE_hardAssert(""!==e.uid,64387);const s=e.isAuthenticated()?e.uid:"";return new __PRIVATE_IndexedDbMutationQueue(s,t,r,n)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return __PRIVATE_mutationsStore(e).ee({index:J,range:r},(e,r,n)=>{t=!1,n.done()}).next(()=>t)}addMutationBatch(e,t,r,n){const s=__PRIVATE_documentMutationsStore(e),i=__PRIVATE_mutationsStore(e);return i.add({}).next(o=>{__PRIVATE_hardAssert("number"==typeof o,49019);const a=new MutationBatch(o,t,r,n),u=function(e,t,r){const n=r.baseMutations.map(t=>toMutation(e.yt,t)),s=r.mutations.map(t=>toMutation(e.yt,t));return{userId:t,batchId:r.batchId,localWriteTimeMs:r.localWriteTime.toMillis(),baseMutations:n,mutations:s}}(this.serializer,this.userId,a),c=[];let _=new SortedSet((e,t)=>__PRIVATE_primitiveComparator(e.canonicalString(),t.canonicalString()));for(const e of n){const t=__PRIVATE_newDbDocumentMutationKey(this.userId,e.key.path,o);_=_.add(e.key.path.popLast()),c.push(i.put(u)),c.push(s.put(t,X))}return _.forEach(t=>{c.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Zn[o]=a.keys()}),PersistencePromise.waitFor(c).next(()=>a)})}lookupMutationBatch(e,t){return __PRIVATE_mutationsStore(e).get(t).next(e=>e?(__PRIVATE_hardAssert(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),__PRIVATE_fromDbMutationBatch(this.serializer,e)):null)}Xn(e,t){return this.Zn[t]?PersistencePromise.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const r=e.keys();return this.Zn[t]=r,r}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,n=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return __PRIVATE_mutationsStore(e).ee({index:J,range:n},(e,t,n)=>{t.userId===this.userId&&(__PRIVATE_hardAssert(t.batchId>=r,47524,{Yn:r}),s=__PRIVATE_fromDbMutationBatch(this.serializer,t)),n.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=q;return __PRIVATE_mutationsStore(e).ee({index:J,range:t,reverse:!0},(e,t,n)=>{r=t.batchId,n.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,q],[this.userId,Number.POSITIVE_INFINITY]);return __PRIVATE_mutationsStore(e).J(J,t).next(e=>e.map(e=>__PRIVATE_fromDbMutationBatch(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=__PRIVATE_newDbDocumentMutationPrefixForPath(this.userId,t.path),n=IDBKeyRange.lowerBound(r),s=[];return __PRIVATE_documentMutationsStore(e).ee({range:n},(r,n,i)=>{const[o,a,u]=r,c=__PRIVATE_decodeResourcePath(a);if(o===this.userId&&t.path.isEqual(c))return __PRIVATE_mutationsStore(e).get(u).next(e=>{if(!e)throw fail(61480,{er:r,batchId:u});__PRIVATE_hardAssert(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:u}),s.push(__PRIVATE_fromDbMutationBatch(this.serializer,e))});i.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new SortedSet(__PRIVATE_primitiveComparator);const n=[];return t.forEach(t=>{const s=__PRIVATE_newDbDocumentMutationPrefixForPath(this.userId,t.path),i=IDBKeyRange.lowerBound(s),o=__PRIVATE_documentMutationsStore(e).ee({range:i},(e,n,s)=>{const[i,o,a]=e,u=__PRIVATE_decodeResourcePath(o);i===this.userId&&t.path.isEqual(u)?r=r.add(a):s.done()});n.push(o)}),PersistencePromise.waitFor(n).next(()=>this.tr(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,n=r.length+1,s=__PRIVATE_newDbDocumentMutationPrefixForPath(this.userId,r),i=IDBKeyRange.lowerBound(s);let o=new SortedSet(__PRIVATE_primitiveComparator);return __PRIVATE_documentMutationsStore(e).ee({range:i},(e,t,s)=>{const[i,a,u]=e,c=__PRIVATE_decodeResourcePath(a);i===this.userId&&r.isPrefixOf(c)?c.length===n&&(o=o.add(u)):s.done()}).next(()=>this.tr(e,o))}tr(e,t){const r=[],n=[];return t.forEach(t=>{n.push(__PRIVATE_mutationsStore(e).get(t).next(e=>{if(null===e)throw fail(35274,{batchId:t});__PRIVATE_hardAssert(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),r.push(__PRIVATE_fromDbMutationBatch(this.serializer,e))}))}),PersistencePromise.waitFor(n).next(()=>r)}removeMutationBatch(e,t){return removeMutationBatch(e.le,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),PersistencePromise.forEach(r,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return PersistencePromise.resolve();const r=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),n=[];return __PRIVATE_documentMutationsStore(e).ee({range:r},(e,t,r)=>{if(e[0]===this.userId){const t=__PRIVATE_decodeResourcePath(e[1]);n.push(t)}else r.done()}).next(()=>{__PRIVATE_hardAssert(0===n.length,56720,{rr:n.map(e=>e.canonicalString())})})})}containsKey(e,t){return __PRIVATE_mutationQueueContainsKey(e,this.userId,t)}ir(e){return __PRIVATE_mutationQueuesStore(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:q,lastStreamToken:""})}}function __PRIVATE_mutationQueueContainsKey(e,t,r){const n=__PRIVATE_newDbDocumentMutationPrefixForPath(t,r.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return __PRIVATE_documentMutationsStore(e).ee({range:i,Y:!0},(e,r,n)=>{const[i,a,u]=e;i===t&&a===s&&(o=!0),n.done()}).next(()=>o)}function __PRIVATE_mutationsStore(e){return __PRIVATE_getStore(e,j)}function __PRIVATE_documentMutationsStore(e){return __PRIVATE_getStore(e,Y)}function __PRIVATE_mutationQueuesStore(e){return __PRIVATE_getStore(e,G)}
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
 */class __PRIVATE_TargetIdGenerator{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new __PRIVATE_TargetIdGenerator(0)}static ar(){return new __PRIVATE_TargetIdGenerator(-1)}}
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
 */class __PRIVATE_IndexedDbTargetCache{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const r=new __PRIVATE_TargetIdGenerator(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(e=>SnapshotVersion.fromTimestamp(new Timestamp(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.ur(e).next(n=>(n.highestListenSequenceNumber=t,r&&(n.lastRemoteSnapshotVersion=r.toTimestamp()),t>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=t),this.cr(e,n)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>__PRIVATE_targetsStore(e).delete(t.targetId)).next(()=>this.ur(e)).next(t=>(__PRIVATE_hardAssert(t.targetCount>0,8065),t.targetCount-=1,this.cr(e,t)))}removeTargets(e,t,r){let n=0;const s=[];return __PRIVATE_targetsStore(e).ee((i,o)=>{const a=__PRIVATE_fromDbTarget(o);a.sequenceNumber<=t&&null===r.get(a.targetId)&&(n++,s.push(this.removeTargetData(e,a)))}).next(()=>PersistencePromise.waitFor(s)).next(()=>n)}forEachTarget(e,t){return __PRIVATE_targetsStore(e).ee((e,r)=>{const n=__PRIVATE_fromDbTarget(r);t(n)})}ur(e){return __PRIVATE_globalTargetStore(e).get(Ie).next(e=>(__PRIVATE_hardAssert(null!==e,2888),e))}cr(e,t){return __PRIVATE_globalTargetStore(e).put(Ie,t)}lr(e,t){return __PRIVATE_targetsStore(e).put(__PRIVATE_toDbTarget(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next(e=>e.targetCount)}getTargetData(e,t){const r=__PRIVATE_canonifyTarget(t),n=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return __PRIVATE_targetsStore(e).ee({range:n,index:ue},(e,r,n)=>{const i=__PRIVATE_fromDbTarget(r);__PRIVATE_targetEquals(t,i.target)&&(s=i,n.done())}).next(()=>s)}addMatchingKeys(e,t,r){const n=[],s=__PRIVATE_documentTargetStore(e);return t.forEach(t=>{const i=__PRIVATE_encodeResourcePath(t.path);n.push(s.put({targetId:r,path:i})),n.push(this.referenceDelegate.addReference(e,r,t))}),PersistencePromise.waitFor(n)}removeMatchingKeys(e,t,r){const n=__PRIVATE_documentTargetStore(e);return PersistencePromise.forEach(t,t=>{const s=__PRIVATE_encodeResourcePath(t.path);return PersistencePromise.waitFor([n.delete([r,s]),this.referenceDelegate.removeReference(e,r,t)])})}removeMatchingKeysForTargetId(e,t){const r=__PRIVATE_documentTargetStore(e),n=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(n)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),n=__PRIVATE_documentTargetStore(e);let s=__PRIVATE_documentKeySet();return n.ee({range:r,Y:!0},(e,t,r)=>{const n=__PRIVATE_decodeResourcePath(e[1]),i=new DocumentKey(n);s=s.add(i)}).next(()=>s)}containsKey(e,t){const r=__PRIVATE_encodeResourcePath(t.path),n=IDBKeyRange.bound([r],[__PRIVATE_immediateSuccessor(r)],!1,!0);let s=0;return __PRIVATE_documentTargetStore(e).ee({index:Pe,Y:!0,range:n},([e,t],r,n)=>{0!==e&&(s++,n.done())}).next(()=>s>0)}At(e,t){return __PRIVATE_targetsStore(e).get(t).next(e=>e?__PRIVATE_fromDbTarget(e):null)}}function __PRIVATE_targetsStore(e){return __PRIVATE_getStore(e,ae)}function __PRIVATE_globalTargetStore(e){return __PRIVATE_getStore(e,Ee)}function __PRIVATE_documentTargetStore(e){return __PRIVATE_getStore(e,le)}
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
 */const Dt="LruGarbageCollector",Ct=1048576;function __PRIVATE_bufferEntryComparator([e,t],[r,n]){const s=__PRIVATE_primitiveComparator(e,r);return 0===s?__PRIVATE_primitiveComparator(t,n):s}class __PRIVATE_RollingSequenceNumberBuffer{constructor(e){this.Pr=e,this.buffer=new SortedSet(__PRIVATE_bufferEntryComparator),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();__PRIVATE_bufferEntryComparator(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class __PRIVATE_LruScheduler{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Ar(e){__PRIVATE_logDebug(Dt,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){__PRIVATE_isIndexedDbTransactionError(e)?__PRIVATE_logDebug(Dt,"Ignoring IndexedDB error during garbage collection: ",e):await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}await this.Ar(3e5)})}}class __PRIVATE_LruGarbageCollectorImpl{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return PersistencePromise.resolve(__PRIVATE_ListenSequence.ce);const r=new __PRIVATE_RollingSequenceNumberBuffer(t);return this.Vr.forEachTarget(e,e=>r.Ir(e.sequenceNumber)).next(()=>this.Vr.mr(e,e=>r.Ir(e))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(__PRIVATE_logDebug("LruGarbageCollector","Garbage collection skipped; disabled"),PersistencePromise.resolve(bt)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(__PRIVATE_logDebug("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),bt):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,n,s,i,o,a,u;const c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(__PRIVATE_logDebug("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),n=this.params.maximumSequenceNumbersToCollect):n=t,i=Date.now(),this.nthSequenceNumber(e,n))).next(n=>(r=n,o=Date.now(),this.removeTargets(e,r,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,r))).next(e=>(u=Date.now(),__PRIVATE_getLogLevel()<=logger.LogLevel.DEBUG&&__PRIVATE_logDebug("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-c}ms\n\tDetermined least recently used ${n} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(u-a)+"ms\n"+`Total Duration: ${u-c}ms`),PersistencePromise.resolve({didRun:!0,sequenceNumbersCollected:n,targetsRemoved:s,documentsRemoved:e})))}}function __PRIVATE_newLruGarbageCollector(e,t){return new __PRIVATE_LruGarbageCollectorImpl(e,t)}
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
 */class __PRIVATE_IndexedDbLruDelegateImpl{constructor(e,t){this.db=e,this.garbageCollector=__PRIVATE_newLruGarbageCollector(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(e,r)=>t(r))}addReference(e,t,r){return __PRIVATE_writeSentinelKey(e,r)}removeReference(e,t,r){return __PRIVATE_writeSentinelKey(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return __PRIVATE_writeSentinelKey(e,t)}wr(e,t){return function(e,t){let r=!1;return __PRIVATE_mutationQueuesStore(e).te(n=>__PRIVATE_mutationQueueContainsKey(e,n,t).next(e=>(e&&(r=!0),PersistencePromise.resolve(!e)))).next(()=>r)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),n=[];let s=0;return this.yr(e,(i,o)=>{if(o<=t){const t=this.wr(e,i).next(t=>{if(!t)return s++,r.getEntry(e,i).next(()=>(r.removeEntry(i,SnapshotVersion.min()),__PRIVATE_documentTargetStore(e).delete(function(e){return[0,__PRIVATE_encodeResourcePath(e.path)]}(i))))});n.push(t)}}).next(()=>PersistencePromise.waitFor(n)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return __PRIVATE_writeSentinelKey(e,t)}yr(e,t){const r=__PRIVATE_documentTargetStore(e);let n,s=__PRIVATE_ListenSequence.ce;return r.ee({index:Pe},([e,r],{path:i,sequenceNumber:o})=>{0===e?(s!==__PRIVATE_ListenSequence.ce&&t(new DocumentKey(__PRIVATE_decodeResourcePath(n)),s),s=o,n=i):s=__PRIVATE_ListenSequence.ce}).next(()=>{s!==__PRIVATE_ListenSequence.ce&&t(new DocumentKey(__PRIVATE_decodeResourcePath(n)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function __PRIVATE_writeSentinelKey(e,t){return __PRIVATE_documentTargetStore(e).put(function(e,t){return{targetId:0,path:__PRIVATE_encodeResourcePath(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
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
 */class RemoteDocumentChangeBuffer{constructor(){this.changes=new ObjectMap(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,MutableDocument.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return void 0!==r?PersistencePromise.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
 */class __PRIVATE_IndexedDbRemoteDocumentCacheImpl{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return __PRIVATE_remoteDocumentsStore(e).put(r)}removeEntry(e,t,r){return __PRIVATE_remoteDocumentsStore(e).delete(function(e,t){const r=e.path.toArray();return[r.slice(0,r.length-2),r[r.length-2],__PRIVATE_toDbTimestampKey(t),r[r.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.Sr(e,r)))}getEntry(e,t){let r=MutableDocument.newInvalidDocument(t);return __PRIVATE_remoteDocumentsStore(e).ee({index:ne,range:IDBKeyRange.only(__PRIVATE_dbKey(t))},(e,n)=>{r=this.br(t,n)}).next(()=>r)}Dr(e,t){let r={size:0,document:MutableDocument.newInvalidDocument(t)};return __PRIVATE_remoteDocumentsStore(e).ee({index:ne,range:IDBKeyRange.only(__PRIVATE_dbKey(t))},(e,n)=>{r={document:this.br(t,n),size:__PRIVATE_dbDocumentSize(n)}}).next(()=>r)}getEntries(e,t){let r=__PRIVATE_mutableDocumentMap();return this.Cr(e,t,(e,t)=>{const n=this.br(e,t);r=r.insert(e,n)}).next(()=>r)}vr(e,t){let r=__PRIVATE_mutableDocumentMap(),n=new SortedMap(DocumentKey.comparator);return this.Cr(e,t,(e,t)=>{const s=this.br(e,t);r=r.insert(e,s),n=n.insert(e,__PRIVATE_dbDocumentSize(t))}).next(()=>({documents:r,Fr:n}))}Cr(e,t,r){if(t.isEmpty())return PersistencePromise.resolve();let n=new SortedSet(__PRIVATE_dbKeyComparator);t.forEach(e=>n=n.add(e));const s=IDBKeyRange.bound(__PRIVATE_dbKey(n.first()),__PRIVATE_dbKey(n.last())),i=n.getIterator();let o=i.getNext();return __PRIVATE_remoteDocumentsStore(e).ee({index:ne,range:s},(e,t,n)=>{const s=DocumentKey.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&__PRIVATE_dbKeyComparator(o,s)<0;)r(o,null),o=i.getNext();o&&o.isEqual(s)&&(r(o,t),o=i.hasNext()?i.getNext():null),o?n.j(__PRIVATE_dbKey(o)):n.done()}).next(()=>{for(;o;)r(o,null),o=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,t,r,n,s){const i=t.path,o=[i.popLast().toArray(),i.lastSegment(),__PRIVATE_toDbTimestampKey(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return __PRIVATE_remoteDocumentsStore(e).J(IDBKeyRange.bound(o,a,!0)).next(e=>{s?.incrementDocumentReadCount(e.length);let r=__PRIVATE_mutableDocumentMap();for(const s of e){const e=this.br(DocumentKey.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);e.isFoundDocument()&&(__PRIVATE_queryMatches(t,e)||n.has(e.key))&&(r=r.insert(e.key,e))}return r})}getAllFromCollectionGroup(e,t,r,n){let s=__PRIVATE_mutableDocumentMap();const i=__PRIVATE_dbCollectionGroupKey(t,r),o=__PRIVATE_dbCollectionGroupKey(t,IndexOffset.max());return __PRIVATE_remoteDocumentsStore(e).ee({index:ie,range:IDBKeyRange.bound(i,o,!0)},(e,t,r)=>{const i=this.br(DocumentKey.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);s=s.insert(i.key,i),s.size===n&&r.done()}).next(()=>s)}newChangeBuffer(e){return new __PRIVATE_IndexedDbRemoteDocumentChangeBuffer(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return __PRIVATE_documentGlobalStore(e).get(_e).next(e=>(__PRIVATE_hardAssert(!!e,20021),e))}Sr(e,t){return __PRIVATE_documentGlobalStore(e).put(_e,t)}br(e,t){if(t){const e=__PRIVATE_fromDbRemoteDocument(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(SnapshotVersion.min()))return e}return MutableDocument.newInvalidDocument(e)}}function __PRIVATE_newIndexedDbRemoteDocumentCache(e){return new __PRIVATE_IndexedDbRemoteDocumentCacheImpl(e)}class __PRIVATE_IndexedDbRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new ObjectMap(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let r=0,n=new SortedSet((e,t)=>__PRIVATE_primitiveComparator(e.canonicalString(),t.canonicalString()));return this.changes.forEach((s,i)=>{const o=this.Or.get(s);if(t.push(this.Mr.removeEntry(e,s,o.readTime)),i.isValidDocument()){const a=__PRIVATE_toDbRemoteDocument(this.Mr.serializer,i);n=n.add(s.path.popLast());const u=__PRIVATE_dbDocumentSize(a);r+=u-o.size,t.push(this.Mr.addEntry(e,s,a))}else if(r-=o.size,this.trackRemovals){const r=__PRIVATE_toDbRemoteDocument(this.Mr.serializer,i.convertToNoDocument(SnapshotVersion.min()));t.push(this.Mr.addEntry(e,s,r))}}),n.forEach(r=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,r))}),t.push(this.Mr.updateMetadata(e,r)),PersistencePromise.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(e=>(this.Or.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:e,Fr:t})=>(t.forEach((t,r)=>{this.Or.set(t,{size:r,readTime:e.get(t).readTime})}),e))}}function __PRIVATE_documentGlobalStore(e){return __PRIVATE_getStore(e,oe)}function __PRIVATE_remoteDocumentsStore(e){return __PRIVATE_getStore(e,ee)}function __PRIVATE_dbKey(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function __PRIVATE_dbCollectionGroupKey(e,t){const r=t.documentKey.path.toArray();return[e,__PRIVATE_toDbTimestampKey(t.readTime),r.slice(0,r.length-2),r.length>0?r[r.length-1]:""]}function __PRIVATE_dbKeyComparator(e,t){const r=e.path.toArray(),n=t.path.toArray();let s=0;for(let e=0;e<r.length-2&&e<n.length-2;++e)if(s=__PRIVATE_primitiveComparator(r[e],n[e]),s)return s;return s=__PRIVATE_primitiveComparator(r.length,n.length),s||(s=__PRIVATE_primitiveComparator(r[r.length-2],n[n.length-2]),s||__PRIVATE_primitiveComparator(r[r.length-1],n[n.length-1])
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
 */)}class OverlayedDocument{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t
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
 */}}class LocalDocumentsView{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&__PRIVATE_mutationApplyToLocalView(r.mutation,e,FieldMask.empty(),Timestamp.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,__PRIVATE_documentKeySet()).next(()=>t))}getLocalViewOfDocuments(e,t,r=__PRIVATE_documentKeySet()){const n=__PRIVATE_newOverlayMap();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=documentMap();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const r=__PRIVATE_newOverlayMap();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,__PRIVATE_documentKeySet()))}populateOverlays(e,t,r){const n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let s=__PRIVATE_mutableDocumentMap();const i=__PRIVATE_newDocumentKeyMap(),o=__PRIVATE_newDocumentKeyMap();return t.forEach((e,t)=>{const o=r.get(t.key);n.has(t.key)&&(void 0===o||o.mutation instanceof __PRIVATE_PatchMutation)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),__PRIVATE_mutationApplyToLocalView(o.mutation,t,o.mutation.getFieldMask(),Timestamp.now())):i.set(t.key,FieldMask.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new OverlayedDocument(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const r=__PRIVATE_newDocumentKeyMap();let n=new SortedMap((e,t)=>e-t),s=__PRIVATE_documentKeySet();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=r.get(e)||FieldMask.empty();o=s.applyToLocalView(i,o),r.set(e,o);const a=(n.get(s.batchId)||__PRIVATE_documentKeySet()).add(e);n=n.insert(s.batchId,a)})}).next(()=>{const i=[],o=n.getReverseIterator();for(;o.hasNext();){const n=o.getNext(),a=n.key,u=n.value,c=__PRIVATE_newMutationMap();u.forEach(e=>{if(!s.has(e)){const n=__PRIVATE_calculateOverlayMutation(t.get(e),r.get(e));null!==n&&c.set(e,n),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,c))}return PersistencePromise.waitFor(i)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return __PRIVATE_isDocumentQuery$1(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):__PRIVATE_isCollectionGroupQuery(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(s=>{const i=n-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-s.size):PersistencePromise.resolve(__PRIVATE_newOverlayMap());let o=N,a=s;return i.next(t=>PersistencePromise.forEach(t,(t,r)=>(o<r.largestBatchId&&(o=r.largestBatchId),s.get(t)?PersistencePromise.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,__PRIVATE_documentKeySet())).next(e=>({batchId:o,changes:__PRIVATE_convertOverlayedDocumentMapToDocumentMap(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new DocumentKey(t)).next(e=>{let t=documentMap();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){const s=t.collectionGroup;let i=documentMap();return this.indexManager.getCollectionParents(e,s).next(o=>PersistencePromise.forEach(o,o=>{const a=function(e,t){return new __PRIVATE_QueryImpl(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(s));return this.getDocumentsMatchingCollectionQuery(e,a,r,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,r,n){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,n))).next(e=>{s.forEach((t,r)=>{const n=r.getKey();null===e.get(n)&&(e=e.insert(n,MutableDocument.newInvalidDocument(n)))});let r=documentMap();return e.forEach((e,n)=>{const i=s.get(e);void 0!==i&&__PRIVATE_mutationApplyToLocalView(i.mutation,n,FieldMask.empty(),Timestamp.now()),__PRIVATE_queryMatches(t,n)&&(r=r.insert(e,n))}),r})}}
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
 */class __PRIVATE_MemoryBundleCache{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return PersistencePromise.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:__PRIVATE_fromVersion(e.createTime)}}(t)),PersistencePromise.resolve()}getNamedQuery(e,t){return PersistencePromise.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(e){return{name:e.name,query:__PRIVATE_fromBundledQuery(e.bundledQuery),readTime:__PRIVATE_fromVersion(e.readTime)}}(t)),PersistencePromise.resolve()
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
 */}}class __PRIVATE_MemoryDocumentOverlayCache{constructor(){this.overlays=new SortedMap(DocumentKey.comparator),this.Lr=new Map}getOverlay(e,t){return PersistencePromise.resolve(this.overlays.get(t))}getOverlays(e,t){const r=__PRIVATE_newOverlayMap();return PersistencePromise.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.St(e,t,n)}),PersistencePromise.resolve()}removeOverlaysForBatchId(e,t,r){const n=this.Lr.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.Lr.delete(r)),PersistencePromise.resolve()}getOverlaysForCollection(e,t,r){const n=__PRIVATE_newOverlayMap(),s=t.length+1,i=new DocumentKey(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>r&&n.set(e.getKey(),e)}return PersistencePromise.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let s=new SortedMap((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=s.get(e.largestBatchId);null===t&&(t=__PRIVATE_newOverlayMap(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=__PRIVATE_newOverlayMap(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=n)););return PersistencePromise.resolve(o)}St(e,t,r){const n=this.overlays.get(r.key);if(null!==n){const e=this.Lr.get(n.largestBatchId).delete(r.key);this.Lr.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new Overlay(t,r));let s=this.Lr.get(t);void 0===s&&(s=__PRIVATE_documentKeySet(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */class __PRIVATE_MemoryGlobalsCache{constructor(){this.sessionToken=ByteString.EMPTY_BYTE_STRING}getSessionToken(e){return PersistencePromise.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,PersistencePromise.resolve()
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
 */}}class __PRIVATE_ReferenceSet{constructor(){this.kr=new SortedSet(__PRIVATE_DocReference.qr),this.Kr=new SortedSet(__PRIVATE_DocReference.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new __PRIVATE_DocReference(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Wr(new __PRIVATE_DocReference(e,t))}Qr(e,t){e.forEach(e=>this.removeReference(e,t))}Gr(e){const t=new DocumentKey(new ResourcePath([])),r=new __PRIVATE_DocReference(t,e),n=new __PRIVATE_DocReference(t,e+1),s=[];return this.Kr.forEachInRange([r,n],e=>{this.Wr(e),s.push(e.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new DocumentKey(new ResourcePath([])),r=new __PRIVATE_DocReference(t,e),n=new __PRIVATE_DocReference(t,e+1);let s=__PRIVATE_documentKeySet();return this.Kr.forEachInRange([r,n],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new __PRIVATE_DocReference(e,0),r=this.kr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class __PRIVATE_DocReference{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return DocumentKey.comparator(e.key,t.key)||__PRIVATE_primitiveComparator(e.Jr,t.Jr)}static Ur(e,t){return __PRIVATE_primitiveComparator(e.Jr,t.Jr)||DocumentKey.comparator(e.key,t.key)}}
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
 */class __PRIVATE_MemoryMutationQueue{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new SortedSet(__PRIVATE_DocReference.qr)}checkEmpty(e){return PersistencePromise.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new MutationBatch(s,t,r,n);this.mutationQueue.push(i);for(const t of n)this.Hr=this.Hr.add(new __PRIVATE_DocReference(t.key,s)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return PersistencePromise.resolve(i)}lookupMutationBatch(e,t){return PersistencePromise.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,n=this.Xr(r),s=n<0?0:n;return PersistencePromise.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return PersistencePromise.resolve(0===this.mutationQueue.length?q:this.Yn-1)}getAllMutationBatches(e){return PersistencePromise.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new __PRIVATE_DocReference(t,0),n=new __PRIVATE_DocReference(t,Number.POSITIVE_INFINITY),s=[];return this.Hr.forEachInRange([r,n],e=>{const t=this.Zr(e.Jr);s.push(t)}),PersistencePromise.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new SortedSet(__PRIVATE_primitiveComparator);return t.forEach(e=>{const t=new __PRIVATE_DocReference(e,0),n=new __PRIVATE_DocReference(e,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([t,n],e=>{r=r.add(e.Jr)})}),PersistencePromise.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,n=r.length+1;let s=r;DocumentKey.isDocumentKey(s)||(s=s.child(""));const i=new __PRIVATE_DocReference(new DocumentKey(s),0);let o=new SortedSet(__PRIVATE_primitiveComparator);return this.Hr.forEachWhile(e=>{const t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(o=o.add(e.Jr)),!0)},i),PersistencePromise.resolve(this.Yr(o))}Yr(e){const t=[];return e.forEach(e=>{const r=this.Zr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){__PRIVATE_hardAssert(0===this.ei(t.batchId,"removed"),55003),this.mutationQueue.shift();let r=this.Hr;return PersistencePromise.forEach(t.mutations,n=>{const s=new __PRIVATE_DocReference(n.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.Hr=r})}nr(e){}containsKey(e,t){const r=new __PRIVATE_DocReference(t,0),n=this.Hr.firstAfterOrEqual(r);return PersistencePromise.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,PersistencePromise.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
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
 */class __PRIVATE_MemoryRemoteDocumentCacheImpl{constructor(e){this.ti=e,this.docs=new SortedMap(DocumentKey.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,n=this.docs.get(r),s=n?n.size:0,i=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return PersistencePromise.resolve(r?r.document.mutableCopy():MutableDocument.newInvalidDocument(t))}getEntries(e,t){let r=__PRIVATE_mutableDocumentMap();return t.forEach(e=>{const t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():MutableDocument.newInvalidDocument(e))}),PersistencePromise.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let s=__PRIVATE_mutableDocumentMap();const i=t.path,o=new DocumentKey(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||__PRIVATE_indexOffsetComparator(__PRIVATE_newIndexOffsetFromDocument(o),r)<=0||(n.has(o.key)||__PRIVATE_queryMatches(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return PersistencePromise.resolve(s)}getAllFromCollectionGroup(e,t,r,n){fail(9500)}ni(e,t){return PersistencePromise.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new __PRIVATE_MemoryRemoteDocumentChangeBuffer(this)}getSize(e){return PersistencePromise.resolve(this.size)}}class __PRIVATE_MemoryRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.Mr.addEntry(e,n)):this.Mr.removeEntry(r)}),PersistencePromise.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}
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
 */class __PRIVATE_MemoryTargetCache{constructor(e){this.persistence=e,this.ri=new ObjectMap(e=>__PRIVATE_canonifyTarget(e),__PRIVATE_targetEquals),this.lastRemoteSnapshotVersion=SnapshotVersion.min(),this.highestTargetId=0,this.ii=0,this.si=new __PRIVATE_ReferenceSet,this.targetCount=0,this.oi=__PRIVATE_TargetIdGenerator._r()}forEachTarget(e,t){return this.ri.forEach((e,r)=>t(r)),PersistencePromise.resolve()}getLastRemoteSnapshotVersion(e){return PersistencePromise.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return PersistencePromise.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),PersistencePromise.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),PersistencePromise.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new __PRIVATE_TargetIdGenerator(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,PersistencePromise.resolve()}updateTargetData(e,t){return this.lr(t),PersistencePromise.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,PersistencePromise.resolve()}removeTargets(e,t,r){let n=0;const s=[];return this.ri.forEach((i,o)=>{o.sequenceNumber<=t&&null===r.get(o.targetId)&&(this.ri.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),n++)}),PersistencePromise.waitFor(s).next(()=>n)}getTargetCount(e){return PersistencePromise.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return PersistencePromise.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),PersistencePromise.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const n=this.persistence.referenceDelegate,s=[];return n&&t.forEach(t=>{s.push(n.markPotentiallyOrphaned(e,t))}),PersistencePromise.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),PersistencePromise.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return PersistencePromise.resolve(r)}containsKey(e,t){return PersistencePromise.resolve(this.si.containsKey(t))}}
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
 */class __PRIVATE_MemoryPersistence{constructor(e,t){this._i={},this.overlays={},this.ai=new __PRIVATE_ListenSequence(0),this.ui=!1,this.ui=!0,this.ci=new __PRIVATE_MemoryGlobalsCache,this.referenceDelegate=e(this),this.li=new __PRIVATE_MemoryTargetCache(this),this.indexManager=new __PRIVATE_MemoryIndexManager,this.remoteDocumentCache=function(e){return new __PRIVATE_MemoryRemoteDocumentCacheImpl(e)}(e=>this.referenceDelegate.hi(e)),this.serializer=new __PRIVATE_LocalSerializer(t),this.Pi=new __PRIVATE_MemoryBundleCache(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new __PRIVATE_MemoryDocumentOverlayCache,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new __PRIVATE_MemoryMutationQueue(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){__PRIVATE_logDebug("MemoryPersistence","Starting transaction:",e);const n=new __PRIVATE_MemoryTransaction(this.ai.next());return this.referenceDelegate.Ti(),r(n).next(e=>this.referenceDelegate.Ei(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Ii(e,t){return PersistencePromise.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class __PRIVATE_MemoryTransaction extends PersistenceTransaction{constructor(e){super(),this.currentSequenceNumber=e}}class __PRIVATE_MemoryEagerDelegate{constructor(e){this.persistence=e,this.Ri=new __PRIVATE_ReferenceSet,this.Ai=null}static Vi(e){return new __PRIVATE_MemoryEagerDelegate(e)}get di(){if(this.Ai)return this.Ai;throw fail(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),PersistencePromise.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),PersistencePromise.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),PersistencePromise.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(e=>this.di.add(e.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return PersistencePromise.forEach(this.di,r=>{const n=DocumentKey.fromPath(r);return this.mi(e,n).next(e=>{e||t.removeEntry(n,SnapshotVersion.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return PersistencePromise.or([()=>PersistencePromise.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class __PRIVATE_MemoryLruDelegate{constructor(e,t){this.persistence=e,this.fi=new ObjectMap(e=>__PRIVATE_encodeResourcePath(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=__PRIVATE_newLruGarbageCollector(this,t)}static Vi(e,t){return new __PRIVATE_MemoryLruDelegate(e,t)}Ti(){}Ei(e){return PersistencePromise.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}mr(e,t){return PersistencePromise.forEach(this.fi,(r,n)=>this.wr(e,r,n).next(e=>e?PersistencePromise.resolve():t(n)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const n=this.persistence.getRemoteDocumentCache(),s=n.newChangeBuffer();return n.ni(e,n=>this.wr(e,n,t).next(e=>{e||(r++,s.removeEntry(n,SnapshotVersion.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),PersistencePromise.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),PersistencePromise.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),PersistencePromise.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),PersistencePromise.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=__PRIVATE_estimateByteSize(e.data.value)),t}wr(e,t,r){return PersistencePromise.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.fi.get(t);return PersistencePromise.resolve(void 0!==e&&e>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
 */class __PRIVATE_SchemaConverter{constructor(e){this.serializer=e}k(e,t,r,n){const s=new __PRIVATE_SimpleDbTransaction("createOrUpgrade",t);r<1&&n>=1&&(function(e){e.createObjectStore(W)}(e),function(e){e.createObjectStore(G,{keyPath:z}),e.createObjectStore(j,{keyPath:H,autoIncrement:!0}).createIndex(J,Z,{unique:!0}),e.createObjectStore(Y)}(e),__PRIVATE_createQueryCache(e),function(e){e.createObjectStore($)}(e));let i=PersistencePromise.resolve();return r<3&&n>=3&&(0!==r&&(function(e){e.deleteObjectStore(le),e.deleteObjectStore(ae),e.deleteObjectStore(Ee)}(e),__PRIVATE_createQueryCache(e)),i=i.next(()=>function(e){const t=e.store(Ee),r={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:SnapshotVersion.min().toTimestamp(),targetCount:0};return t.put(Ie,r)}(s))),r<4&&n>=4&&(0!==r&&(i=i.next(()=>function(e,t){return t.store(j).J().next(r=>{e.deleteObjectStore(j),e.createObjectStore(j,{keyPath:H,autoIncrement:!0}).createIndex(J,Z,{unique:!0});const n=t.store(j),s=r.map(e=>n.put(e));return PersistencePromise.waitFor(s)})}(e,s))),i=i.next(()=>{!function(e){e.createObjectStore(Ve,{keyPath:de})}(e)})),r<5&&n>=5&&(i=i.next(()=>this.gi(s))),r<6&&n>=6&&(i=i.next(()=>(function(e){e.createObjectStore(oe)}(e),this.pi(s)))),r<7&&n>=7&&(i=i.next(()=>this.yi(s))),r<8&&n>=8&&(i=i.next(()=>this.wi(e,s))),r<9&&n>=9&&(i=i.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),r<10&&n>=10&&(i=i.next(()=>this.Si(s))),r<11&&n>=11&&(i=i.next(()=>{!function(e){e.createObjectStore(me,{keyPath:fe})}(e),function(e){e.createObjectStore(ge,{keyPath:pe})}(e)})),r<12&&n>=12&&(i=i.next(()=>{!function(e){const t=e.createObjectStore(Be,{keyPath:Le});t.createIndex(ke,Ke,{unique:!1}),t.createIndex(qe,Ue,{unique:!1})}(e)})),r<13&&n>=13&&(i=i.next(()=>function(e){const t=e.createObjectStore(ee,{keyPath:te});t.createIndex(ne,re),t.createIndex(ie,se)}(e)).next(()=>this.bi(e,s)).next(()=>e.deleteObjectStore($))),r<14&&n>=14&&(i=i.next(()=>this.Di(e,s))),r<15&&n>=15&&(i=i.next(()=>function(e){e.createObjectStore(ye,{keyPath:we,autoIncrement:!0}).createIndex(be,Se,{unique:!1}),e.createObjectStore(De,{keyPath:Ce}).createIndex(ve,Fe,{unique:!1}),e.createObjectStore(Me,{keyPath:xe}).createIndex(Oe,Ne,{unique:!1})}(e))),r<16&&n>=16&&(i=i.next(()=>{t.objectStore(De).clear()}).next(()=>{t.objectStore(Me).clear()})),r<17&&n>=17&&(i=i.next(()=>{!function(e){e.createObjectStore($e,{keyPath:We})}(e)})),r<18&&n>=18&&util.isSafariOrWebkit()&&(i=i.next(()=>{t.objectStore(De).clear()}).next(()=>{t.objectStore(Me).clear()})),i}pi(e){let t=0;return e.store($).ee((e,r)=>{t+=__PRIVATE_dbDocumentSize(r)}).next(()=>{const r={byteSize:t};return e.store(oe).put(_e,r)})}gi(e){const t=e.store(G),r=e.store(j);return t.J().next(t=>PersistencePromise.forEach(t,t=>{const n=IDBKeyRange.bound([t.userId,q],[t.userId,t.lastAcknowledgedBatchId]);return r.J(J,n).next(r=>PersistencePromise.forEach(r,r=>{__PRIVATE_hardAssert(r.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:r.batchId});const n=__PRIVATE_fromDbMutationBatch(this.serializer,r);return removeMutationBatch(e,t.userId,n).next(()=>{})}))}))}yi(e){const t=e.store(le),r=e.store($);return e.store(Ee).get(Ie).next(e=>{const n=[];return r.ee((r,s)=>{const i=new ResourcePath(r),o=function(e){return[0,__PRIVATE_encodeResourcePath(e)]}(i);n.push(t.get(o).next(r=>r?PersistencePromise.resolve():(r=>t.put({targetId:0,path:__PRIVATE_encodeResourcePath(r),sequenceNumber:e.highestListenSequenceNumber}))(i)))}).next(()=>PersistencePromise.waitFor(n))})}wi(e,t){e.createObjectStore(Re,{keyPath:Ae});const r=t.store(Re),n=new __PRIVATE_MemoryCollectionParentIndex,s=e=>{if(n.add(e)){const t=e.lastSegment(),n=e.popLast();return r.put({collectionId:t,parent:__PRIVATE_encodeResourcePath(n)})}};return t.store($).ee({Y:!0},(e,t)=>{const r=new ResourcePath(e);return s(r.popLast())}).next(()=>t.store(Y).ee({Y:!0},([e,t,r],n)=>{const i=__PRIVATE_decodeResourcePath(t);return s(i.popLast())}))}Si(e){const t=e.store(ae);return t.ee((e,r)=>{const n=__PRIVATE_fromDbTarget(r),s=__PRIVATE_toDbTarget(this.serializer,n);return t.put(s)})}bi(e,t){const r=t.store($),n=[];return r.ee((e,r)=>{const s=t.store(ee),i=function(e){return e.document?new DocumentKey(ResourcePath.fromString(e.document.name).popFirst(5)):e.noDocument?DocumentKey.fromSegments(e.noDocument.path):e.unknownDocument?DocumentKey.fromSegments(e.unknownDocument.path):fail(36783)}
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
 */(r).path.toArray(),o={prefixPath:i.slice(0,i.length-2),collectionGroup:i[i.length-2],documentId:i[i.length-1],readTime:r.readTime||[0,0],unknownDocument:r.unknownDocument,noDocument:r.noDocument,document:r.document,hasCommittedMutations:!!r.hasCommittedMutations};n.push(s.put(o))}).next(()=>PersistencePromise.waitFor(n))}Di(e,t){const r=t.store(j),n=__PRIVATE_newIndexedDbRemoteDocumentCache(this.serializer),s=new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.Vi,this.serializer.yt);return r.J().next(e=>{const r=new Map;return e.forEach(e=>{let t=r.get(e.userId)??__PRIVATE_documentKeySet();__PRIVATE_fromDbMutationBatch(this.serializer,e).keys().forEach(e=>t=t.add(e)),r.set(e.userId,t)}),PersistencePromise.forEach(r,(e,r)=>{const i=new User(r),o=__PRIVATE_IndexedDbDocumentOverlayCache.wt(this.serializer,i),a=s.getIndexManager(i),u=__PRIVATE_IndexedDbMutationQueue.wt(i,this.serializer,a,s.referenceDelegate);return new LocalDocumentsView(n,u,o,a).recalculateAndSaveOverlaysForDocumentKeys(new __PRIVATE_IndexedDbTransaction(t,__PRIVATE_ListenSequence.ce),e).next()})})}}function __PRIVATE_createQueryCache(e){e.createObjectStore(le,{keyPath:he}).createIndex(Pe,Te,{unique:!0}),e.createObjectStore(ae,{keyPath:"targetId"}).createIndex(ue,ce,{unique:!0}),e.createObjectStore(Ee)}const vt="IndexedDbPersistence",Ft=18e5,Mt=5e3,xt="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Ot="main";class __PRIVATE_IndexedDbPersistence{constructor(e,t,r,n,s,i,o,a,u,c,_=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=s,this.window=i,this.document=o,this.Fi=u,this.Mi=c,this.xi=_,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=e=>Promise.resolve(),!__PRIVATE_IndexedDbPersistence.v())throw new FirestoreError(D.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new __PRIVATE_IndexedDbLruDelegateImpl(this,n),this.qi=t+Ot,this.serializer=new __PRIVATE_LocalSerializer(a),this.Ki=new __PRIVATE_SimpleDb(this.qi,this.xi,new __PRIVATE_SchemaConverter(this.serializer)),this.ci=new __PRIVATE_IndexedDbGlobalsCache,this.li=new __PRIVATE_IndexedDbTargetCache(this.referenceDelegate,this.serializer),this.remoteDocumentCache=__PRIVATE_newIndexedDbRemoteDocumentCache(this.serializer),this.Pi=new __PRIVATE_IndexedDbBundleCache,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,!1===c&&__PRIVATE_logError(vt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new FirestoreError(D.FAILED_PRECONDITION,xt);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new __PRIVATE_ListenSequence(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>__PRIVATE_clientMetadataStore(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(__PRIVATE_isIndexedDbTransactionError(e))return __PRIVATE_logDebug(vt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return __PRIVATE_logDebug(vt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return __PRIVATE_primaryClientStore(e).get(Q).next(e=>PersistencePromise.resolve(this.Xi(e)))}Yi(e){return __PRIVATE_clientMetadataStore(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Ft)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=__PRIVATE_getStore(e,Ve);return t.J().next(e=>{const r=this.ns(e,Ft),n=e.filter(e=>-1===r.indexOf(e));return PersistencePromise.forEach(n,e=>t.delete(e.clientId)).next(()=>n)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?PersistencePromise.resolve(!0):__PRIVATE_primaryClientStore(e).get(Q).next(t=>{if(null!==t&&this.ts(t.leaseTimestampMs,Mt)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new FirestoreError(D.FAILED_PRECONDITION,xt);return!1}}return!(!this.networkEnabled||!this.inForeground)||__PRIVATE_clientMetadataStore(e).J().next(e=>void 0===this.ns(e,Mt).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,r=!this.inForeground&&e.inForeground,n=this.networkEnabled===e.networkEnabled;if(t||r&&n)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&__PRIVATE_logDebug(vt,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[W,Ve],e=>{const t=new __PRIVATE_IndexedDbTransaction(e,__PRIVATE_ListenSequence.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(e=>this.ts(e.updateTimeMs,t)&&!this.ss(e.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>__PRIVATE_clientMetadataStore(e).J().next(e=>this.ns(e,Ft).map(e=>e.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return __PRIVATE_IndexedDbMutationQueue.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new __PRIVATE_IndexedDbIndexManager(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return __PRIVATE_IndexedDbDocumentOverlayCache.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){__PRIVATE_logDebug(vt,"Starting transaction:",e);const n="readonly"===t?"readonly":"readwrite",s=function(e){return 18===e?Xe:17===e?Ze:16===e?Je:15===e?He:14===e?je:13===e?ze:12===e?Ge:11===e?Qe:void fail(60245)}(this.xi);let i;return this.Ki.runTransaction(e,n,s,n=>(i=new __PRIVATE_IndexedDbTransaction(n,this.ai?this.ai.next():__PRIVATE_ListenSequence.ce),"readwrite-primary"===t?this.ji(i).next(e=>!!e||this.Ji(i)).next(t=>{if(!t)throw __PRIVATE_logError(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new FirestoreError(D.FAILED_PRECONDITION,B);return r(i)}).next(e=>this.Zi(i).next(()=>e)):this.Ps(i).next(()=>r(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Ps(e){return __PRIVATE_primaryClientStore(e).get(Q).next(e=>{if(null!==e&&this.ts(e.leaseTimestampMs,Mt)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new FirestoreError(D.FAILED_PRECONDITION,xt)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return __PRIVATE_primaryClientStore(e).put(Q,t)}static v(){return __PRIVATE_SimpleDb.v()}Hi(e){const t=__PRIVATE_primaryClientStore(e);return t.get(Q).next(e=>this.Xi(e)?(__PRIVATE_logDebug(vt,"Releasing primary lease."),t.delete(Q)):PersistencePromise.resolve())}ts(e,t){const r=Date.now();return!(e<r-t||e>r&&(__PRIVATE_logError(`Detected an update time that is in the future: ${e} > ${r}`),1))}Wi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground="visible"===this.document.visibilityState)}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){"function"==typeof this.window?.addEventListener&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;util.isSafari()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=null!==this.Ui?.getItem(this.rs(e));return __PRIVATE_logDebug(vt,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return __PRIVATE_logError(vt,"Failed to get zombied client id.",e),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){__PRIVATE_logError("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch(e){}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function __PRIVATE_primaryClientStore(e){return __PRIVATE_getStore(e,W)}function __PRIVATE_clientMetadataStore(e){return __PRIVATE_getStore(e,Ve)}function __PRIVATE_indexedDbStoragePrefix(e,t){let r=e.projectId;return e.isDefaultDatabase||(r+="."+e.database),"firestore/"+t+"/"+r+"/"
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
 */}class __PRIVATE_LocalViewChanges{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=n}static Is(e,t){let r=__PRIVATE_documentKeySet(),n=__PRIVATE_documentKeySet();for(const e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new __PRIVATE_LocalViewChanges(e,t.fromCache,r,n)}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */class QueryContext{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
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
 */class __PRIVATE_QueryEngine{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=util.isSafari()?8:__PRIVATE_getAndroidVersion(util.getUA())>0?6:4}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,n){const s={result:null};return this.gs(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ps(e,t,n,r).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const r=new QueryContext;return this.ys(e,t,r).next(n=>{if(s.result=n,this.As)return this.ws(e,t,r,n.size)})}).next(()=>s.result)}ws(e,t,r,n){return r.documentReadCount<this.Vs?(__PRIVATE_getLogLevel()<=logger.LogLevel.DEBUG&&__PRIVATE_logDebug("QueryEngine","SDK will not create cache indexes for query:",__PRIVATE_stringifyQuery(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),PersistencePromise.resolve()):(__PRIVATE_getLogLevel()<=logger.LogLevel.DEBUG&&__PRIVATE_logDebug("QueryEngine","Query:",__PRIVATE_stringifyQuery(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.ds*n?(__PRIVATE_getLogLevel()<=logger.LogLevel.DEBUG&&__PRIVATE_logDebug("QueryEngine","The SDK decides to create cache indexes for query:",__PRIVATE_stringifyQuery(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,__PRIVATE_queryToTarget(t))):PersistencePromise.resolve())}gs(e,t){if(__PRIVATE_queryMatchesAllDocuments(t))return PersistencePromise.resolve(null);let r=__PRIVATE_queryToTarget(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(t=__PRIVATE_queryWithLimit(t,null,"F"),r=__PRIVATE_queryToTarget(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{const s=__PRIVATE_documentKeySet(...n);return this.fs.getDocuments(e,s).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{const i=this.Ss(t,n);return this.bs(t,i,s,r.readTime)?this.gs(e,__PRIVATE_queryWithLimit(t,null,"F")):this.Ds(e,i,t,r)}))})))}ps(e,t,r,n){return __PRIVATE_queryMatchesAllDocuments(t)||n.isEqual(SnapshotVersion.min())?PersistencePromise.resolve(null):this.fs.getDocuments(e,r).next(s=>{const i=this.Ss(t,s);return this.bs(t,i,r,n)?PersistencePromise.resolve(null):(__PRIVATE_getLogLevel()<=logger.LogLevel.DEBUG&&__PRIVATE_logDebug("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),__PRIVATE_stringifyQuery(t)),this.Ds(e,i,t,__PRIVATE_newIndexOffsetSuccessorFromReadTime(n,N)).next(e=>e))})}Ss(e,t){let r=new SortedSet(__PRIVATE_newQueryComparator(e));return t.forEach((t,n)=>{__PRIVATE_queryMatches(e,n)&&(r=r.add(n))}),r}bs(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(n)>0)}ys(e,t,r){return __PRIVATE_getLogLevel()<=logger.LogLevel.DEBUG&&__PRIVATE_logDebug("QueryEngine","Using full collection scan to execute query:",__PRIVATE_stringifyQuery(t)),this.fs.getDocumentsMatchingQuery(e,t,IndexOffset.min(),r)}Ds(e,t,r,n){return this.fs.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const Nt="LocalStore",Bt=3e8;class __PRIVATE_LocalStoreImpl{constructor(e,t,r,n){this.persistence=e,this.Cs=t,this.serializer=n,this.vs=new SortedMap(__PRIVATE_primitiveComparator),this.Fs=new ObjectMap(e=>__PRIVATE_canonifyTarget(e),__PRIVATE_targetEquals),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new LocalDocumentsView(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function __PRIVATE_newLocalStore(e,t,r,n){return new __PRIVATE_LocalStoreImpl(e,t,r,n)}async function __PRIVATE_localStoreHandleUserChange(e,t){const r=__PRIVATE_debugCast(e);return await r.persistence.runTransaction("Handle user change","readonly",e=>{let n;return r.mutationQueue.getAllMutationBatches(e).next(s=>(n=s,r.Os(t),r.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=__PRIVATE_documentKeySet();for(const e of n){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return r.localDocuments.getDocuments(e,o).next(e=>({Ns:e,removedBatchIds:s,addedBatchIds:i}))})})}function __PRIVATE_localStoreAcknowledgeBatch(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const n=t.batch.keys(),s=r.xs.newChangeBuffer({trackRemovals:!0});return function(e,t,r,n){const s=r.batch,i=s.keys();let o=PersistencePromise.resolve();return i.forEach(e=>{o=o.next(()=>n.getEntry(t,e)).next(t=>{const i=r.docVersions.get(e);__PRIVATE_hardAssert(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(r,e,t,s).next(()=>s.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=__PRIVATE_documentKeySet();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))})}function __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e){const t=__PRIVATE_debugCast(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function __PRIVATE_localStoreApplyRemoteEventToLocalCache(e,t){const r=__PRIVATE_debugCast(e),n=t.snapshotVersion;let s=r.vs;return r.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=r.xs.newChangeBuffer({trackRemovals:!0});s=r.vs;const o=[];t.targetChanges.forEach((i,a)=>{const u=s.get(a);if(!u)return;o.push(r.li.removeMatchingKeys(e,i.removedDocuments,a).next(()=>r.li.addMatchingKeys(e,i.addedDocuments,a)));let c=u.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?c=c.withResumeToken(ByteString.EMPTY_BYTE_STRING,SnapshotVersion.min()).withLastLimboFreeSnapshotVersion(SnapshotVersion.min()):i.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(i.resumeToken,n)),s=s.insert(a,c),function(e,t,r){return 0===e.resumeToken.approximateByteSize()||t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=Bt||r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size>0}(u,c,i)&&o.push(r.li.updateTargetData(e,c))});let a=__PRIVATE_mutableDocumentMap(),u=__PRIVATE_documentKeySet();if(t.documentUpdates.forEach(n=>{t.resolvedLimboDocuments.has(n)&&o.push(r.persistence.referenceDelegate.updateLimboDocument(e,n))}),o.push(__PRIVATE_populateDocumentChangeBuffer(e,i,t.documentUpdates).next(e=>{a=e.Bs,u=e.Ls})),!n.isEqual(SnapshotVersion.min())){const t=r.li.getLastRemoteSnapshotVersion(e).next(t=>r.li.setTargetsMetadata(e,e.currentSequenceNumber,n));o.push(t)}return PersistencePromise.waitFor(o).next(()=>i.apply(e)).next(()=>r.localDocuments.getLocalViewOfDocuments(e,a,u)).next(()=>a)}).then(e=>(r.vs=s,e))}function __PRIVATE_populateDocumentChangeBuffer(e,t,r){let n=__PRIVATE_documentKeySet(),s=__PRIVATE_documentKeySet();return r.forEach(e=>n=n.add(e)),t.getEntries(e,n).next(e=>{let n=__PRIVATE_mutableDocumentMap();return r.forEach((r,i)=>{const o=e.get(r);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(r)),i.isNoDocument()&&i.version.isEqual(SnapshotVersion.min())?(t.removeEntry(r,i.readTime),n=n.insert(r,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),n=n.insert(r,i)):__PRIVATE_logDebug(Nt,"Ignoring outdated watch update for ",r,". Current version:",o.version," Watch version:",i.version)}),{Bs:n,Ls:s}})}function __PRIVATE_localStoreGetNextMutationBatch(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=q),r.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function __PRIVATE_localStoreAllocateTarget(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("Allocate target","readwrite",e=>{let n;return r.li.getTargetData(e,t).next(s=>s?(n=s,PersistencePromise.resolve(n)):r.li.allocateTargetId(e).next(s=>(n=new TargetData(t,s,"TargetPurposeListen",e.currentSequenceNumber),r.li.addTargetData(e,n).next(()=>n))))}).then(e=>{const n=r.vs.get(e.targetId);return(null===n||e.snapshotVersion.compareTo(n.snapshotVersion)>0)&&(r.vs=r.vs.insert(e.targetId,e),r.Fs.set(t,e.targetId)),e})}async function __PRIVATE_localStoreReleaseTarget(e,t,r){const n=__PRIVATE_debugCast(e),s=n.vs.get(t),i=r?"readwrite":"readwrite-primary";try{r||await n.persistence.runTransaction("Release target",i,e=>n.persistence.referenceDelegate.removeTarget(e,s))}catch(e){if(!__PRIVATE_isIndexedDbTransactionError(e))throw e;__PRIVATE_logDebug(Nt,`Failed to update sequence numbers for target ${t}: ${e}`)}n.vs=n.vs.remove(t),n.Fs.delete(s.target)}function __PRIVATE_localStoreExecuteQuery(e,t,r){const n=__PRIVATE_debugCast(e);let s=SnapshotVersion.min(),i=__PRIVATE_documentKeySet();return n.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,r){const n=__PRIVATE_debugCast(e),s=n.Fs.get(r);return void 0!==s?PersistencePromise.resolve(n.vs.get(s)):n.li.getTargetData(t,r)}(n,e,__PRIVATE_queryToTarget(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>n.Cs.getDocumentsMatchingQuery(e,t,r?s:SnapshotVersion.min(),r?i:__PRIVATE_documentKeySet())).next(e=>(__PRIVATE_setMaxReadTime(n,__PRIVATE_queryCollectionGroup(t),e),{documents:e,ks:i})))}function __PRIVATE_localStoreGetCachedTarget(e,t){const r=__PRIVATE_debugCast(e),n=__PRIVATE_debugCast(r.li),s=r.vs.get(t);return s?Promise.resolve(s.target):r.persistence.runTransaction("Get target data","readonly",e=>n.At(e,t).next(e=>e?e.target:null))}function __PRIVATE_localStoreGetNewDocumentChanges(e,t){const r=__PRIVATE_debugCast(e),n=r.Ms.get(t)||SnapshotVersion.min();return r.persistence.runTransaction("Get new document changes","readonly",e=>r.xs.getAllFromCollectionGroup(e,t,__PRIVATE_newIndexOffsetSuccessorFromReadTime(n,N),Number.MAX_SAFE_INTEGER)).then(e=>(__PRIVATE_setMaxReadTime(r,t,e),e))}function __PRIVATE_setMaxReadTime(e,t,r){let n=e.Ms.get(t)||SnapshotVersion.min();r.forEach((e,t)=>{t.readTime.compareTo(n)>0&&(n=t.readTime)}),e.Ms.set(t,n)}async function __PRIVATE_localStoreApplyBundledDocuments(e,t,r,n){const s=__PRIVATE_debugCast(e);let i=__PRIVATE_documentKeySet(),o=__PRIVATE_mutableDocumentMap();for(const e of r){const r=t.qs(e.metadata.name);e.document&&(i=i.add(r));const n=t.Ks(e);n.setReadTime(t.Us(e.metadata.readTime)),o=o.insert(r,n)}const a=s.xs.newChangeBuffer({trackRemovals:!0}),u=await __PRIVATE_localStoreAllocateTarget(s,function(e){return __PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(ResourcePath.fromString(`__bundle__/docs/${e}`)))}(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",e=>__PRIVATE_populateDocumentChangeBuffer(e,a,o).next(t=>(a.apply(e),t)).next(t=>s.li.removeMatchingKeysForTargetId(e,u.targetId).next(()=>s.li.addMatchingKeys(e,i,u.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(e,t.Bs,t.Ls)).next(()=>t.Bs)))}async function __PRIVATE_localStoreSaveNamedQuery(e,t,r=__PRIVATE_documentKeySet()){const n=await __PRIVATE_localStoreAllocateTarget(e,__PRIVATE_queryToTarget(__PRIVATE_fromBundledQuery(t.bundledQuery))),s=__PRIVATE_debugCast(e);return s.persistence.runTransaction("Save named query","readwrite",e=>{const i=__PRIVATE_fromVersion(t.readTime);if(n.snapshotVersion.compareTo(i)>=0)return s.Pi.saveNamedQuery(e,t);const o=n.withResumeToken(ByteString.EMPTY_BYTE_STRING,i);return s.vs=s.vs.insert(o.targetId,o),s.li.updateTargetData(e,o).next(()=>s.li.removeMatchingKeysForTargetId(e,n.targetId)).next(()=>s.li.addMatchingKeys(e,r,n.targetId)).next(()=>s.Pi.saveNamedQuery(e,t))})}
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
 */const Lt="firestore_clients";function createWebStorageClientStateKey(e,t){return`${Lt}_${e}_${t}`}const kt="firestore_mutations";function createWebStorageMutationBatchKey(e,t,r){let n=`${kt}_${e}_${r}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const Kt="firestore_targets";function createWebStorageQueryTargetMetadataKey(e,t){return`${Kt}_${e}_${t}`;
/**
 * @license
 * Copyright 2018 Google LLC
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
 */}const qt="SharedClientState";class __PRIVATE_MutationMetadata{constructor(e,t,r,n){this.user=e,this.batchId=t,this.state=r,this.error=n}static $s(e,t,r){const n=JSON.parse(r);let s,i="object"==typeof n&&-1!==["pending","acknowledged","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code,i&&(s=new FirestoreError(n.error.code,n.error.message))),i?new __PRIVATE_MutationMetadata(e,t,n.state,s):(__PRIVATE_logError(qt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class __PRIVATE_QueryTargetMetadata{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let n,s="object"==typeof r&&-1!==["not-current","current","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code,s&&(n=new FirestoreError(r.error.code,r.error.message))),s?new __PRIVATE_QueryTargetMetadata(e,r.state,n):(__PRIVATE_logError(qt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class __PRIVATE_RemoteClientState{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let n="object"==typeof r&&r.activeTargetIds instanceof Array,s=__PRIVATE_targetIdSet();for(let e=0;n&&e<r.activeTargetIds.length;++e)n=isSafeInteger(r.activeTargetIds[e]),s=s.add(r.activeTargetIds[e]);return n?new __PRIVATE_RemoteClientState(e,s):(__PRIVATE_logError(qt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class __PRIVATE_SharedOnlineState{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new __PRIVATE_SharedOnlineState(t.clientId,t.onlineState):(__PRIVATE_logError(qt,`Failed to parse online state: ${e}`),null)}}class __PRIVATE_LocalClientState{constructor(){this.activeTargetIds=__PRIVATE_targetIdSet()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class __PRIVATE_WebStorageSharedClientState{constructor(e,t,r,n,s){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=n,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new SortedMap(__PRIVATE_primitiveComparator),this.started=!1,this.Zs=[];const i=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Xs=createWebStorageClientStateKey(this.persistenceKey,this.zs),this.Ys=function(e){return`firestore_sequence_number_${e}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new __PRIVATE_LocalClientState),this.eo=new RegExp(`^${Lt}_${i}_([^_]*)$`),this.no=new RegExp(`^${kt}_${i}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Kt}_${i}_(\\d+)$`),this.io=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.so=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const t of e){if(t===this.zs)continue;const e=this.getItem(createWebStorageClientStateKey(this.persistenceKey,t));if(e){const r=__PRIVATE_RemoteClientState.$s(t,e);r&&(this.Hs=this.Hs.insert(r.clientId,r))}}this.oo();const t=this.storage.getItem(this.io);if(t){const e=this._o(t);e&&this.ao(e)}for(const e of this.Zs)this.Js(e);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((r,n)=>{n.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey,e));if(t){const n=__PRIVATE_QueryTargetMetadata.$s(e,t);n&&(r=n.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach(e=>{this.lo(e)}),this.currentUser=e,r.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return __PRIVATE_logDebug(qt,"READ",e,t),t}setItem(e,t){__PRIVATE_logDebug(qt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){__PRIVATE_logDebug(qt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(__PRIVATE_logDebug(qt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void __PRIVATE_logError("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.eo.test(t.key)){if(null==t.newValue){const e=this.Io(t.key);return this.Ro(e,null)}{const e=this.Ao(t.key,t.newValue);if(e)return this.Ro(e.clientId,e)}}else if(this.no.test(t.key)){if(null!==t.newValue){const e=this.Vo(t.key,t.newValue);if(e)return this.mo(e)}}else if(this.ro.test(t.key)){if(null!==t.newValue){const e=this.fo(t.key,t.newValue);if(e)return this.po(e)}}else if(t.key===this.io){if(null!==t.newValue){const e=this._o(t.newValue);if(e)return this.ao(e)}}else if(t.key===this.Ys){const e=function(e){let t=__PRIVATE_ListenSequence.ce;if(null!=e)try{const r=JSON.parse(e);__PRIVATE_hardAssert("number"==typeof r,30636,{yo:e}),t=r}catch(e){__PRIVATE_logError(qt,"Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==__PRIVATE_ListenSequence.ce&&this.sequenceNumberHandler(e)}else if(t.key===this.so){const e=this.wo(t.newValue);await Promise.all(e.map(e=>this.syncEngine.So(e)))}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const n=new __PRIVATE_MutationMetadata(this.currentUser,e,t,r),s=createWebStorageMutationBatchKey(this.persistenceKey,this.currentUser,e);this.setItem(s,n.Ws())}lo(e){const t=createWebStorageMutationBatchKey(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const n=createWebStorageQueryTargetMetadataKey(this.persistenceKey,e),s=new __PRIVATE_QueryTargetMetadata(e,t,r);this.setItem(n,s.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Io(e);return __PRIVATE_RemoteClientState.$s(r,t)}Vo(e,t){const r=this.no.exec(e),n=Number(r[1]),s=void 0!==r[2]?r[2]:null;return __PRIVATE_MutationMetadata.$s(new User(s),n,t)}fo(e,t){const r=this.ro.exec(e),n=Number(r[1]);return __PRIVATE_QueryTargetMetadata.$s(n,t)}_o(e){return __PRIVATE_SharedOnlineState.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);__PRIVATE_logDebug(qt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),n=this.uo(this.Hs),s=this.uo(r),i=[],o=[];return s.forEach(e=>{n.has(e)||i.push(e)}),n.forEach(e=>{s.has(e)||o.push(e)}),this.syncEngine.Co(i,o).then(()=>{this.Hs=r})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=__PRIVATE_targetIdSet();return e.forEach((e,r)=>{t=t.unionWith(r.activeTargetIds)}),t}}class __PRIVATE_MemorySharedClientState{constructor(){this.vo=new __PRIVATE_LocalClientState,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new __PRIVATE_LocalClientState,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */class __PRIVATE_NoopConnectivityMonitor{Mo(e){}shutdown(){}}
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
 */const Ut="ConnectivityMonitor";class __PRIVATE_BrowserConnectivityMonitor{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){__PRIVATE_logDebug(Ut,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){__PRIVATE_logDebug(Ut,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */let $t=null;function __PRIVATE_generateUniqueDebugId(){return null===$t?$t=268435456+Math.round(2147483648*Math.random()):$t++,"0x"+$t.toString(16)
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
 */}const Wt="RestConnection",Qt={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class __PRIVATE_RestConnection{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${n}`,this.$o=this.databaseId.database===it?`project_id=${r}`:`project_id=${r}&database_id=${n}`}Wo(e,t,r,n,s){const i=__PRIVATE_generateUniqueDebugId(),o=this.Qo(e,t.toUriEncodedString());__PRIVATE_logDebug(Wt,`Sending RPC '${e}' ${i}:`,o,r);const a={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(a,n,s);const{host:u}=new URL(o),c=util.isCloudWorkstation(u);return this.zo(e,o,a,r,c).then(t=>(__PRIVATE_logDebug(Wt,`Received RPC '${e}' ${i}: `,t),t),t=>{throw __PRIVATE_logWarn(Wt,`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",r),t})}jo(e,t,r,n,s,i){return this.Wo(e,t,r,n,s)}Go(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+b,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}Qo(e,t){const r=Qt[e];let n=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(n=`${n}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),n}terminate(){}}
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
 */class __PRIVATE_StreamBridge{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}
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
 */const Gt="WebChannelConnection",__PRIVATE_unguardedEventListen=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};class __PRIVATE_WebChannelConnection extends __PRIVATE_RestConnection{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!__PRIVATE_WebChannelConnection.c_){const e=webchannelBlob.getStatEventTarget();__PRIVATE_unguardedEventListen(e,webchannelBlob.Event.STAT_EVENT,e=>{e.stat===webchannelBlob.Stat.PROXY?__PRIVATE_logDebug(Gt,"STAT_EVENT: detected buffering proxy"):e.stat===webchannelBlob.Stat.NOPROXY&&__PRIVATE_logDebug(Gt,"STAT_EVENT: detected no buffering proxy")}),__PRIVATE_WebChannelConnection.c_=!0}}zo(e,t,r,n,s){const i=__PRIVATE_generateUniqueDebugId();return new Promise((s,o)=>{const a=new webchannelBlob.XhrIo;a.setWithCredentials(!0),a.listenOnce(webchannelBlob.EventType.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case webchannelBlob.ErrorCode.NO_ERROR:const t=a.getResponseJson();__PRIVATE_logDebug(Gt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case webchannelBlob.ErrorCode.TIMEOUT:__PRIVATE_logDebug(Gt,`RPC '${e}' ${i} timed out`),o(new FirestoreError(D.DEADLINE_EXCEEDED,"Request time out"));break;case webchannelBlob.ErrorCode.HTTP_ERROR:const r=a.getStatus();if(__PRIVATE_logDebug(Gt,`RPC '${e}' ${i} failed with status:`,r,"response text:",a.getResponseText()),r>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(t)>=0?t:D.UNKNOWN}(t.status);o(new FirestoreError(e,t.message))}else o(new FirestoreError(D.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new FirestoreError(D.UNAVAILABLE,"Connection failed."));break;default:fail(9055,{l_:e,streamId:i,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{__PRIVATE_logDebug(Gt,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(n);__PRIVATE_logDebug(Gt,`RPC '${e}' ${i} sending request:`,n),a.send(t,"POST",u,r,15)})}T_(e,t,r){const n=__PRIVATE_generateUniqueDebugId(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},a=this.longPollingOptions.timeoutSeconds;void 0!==a&&(o.longPollingTimeout=Math.round(1e3*a)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,t,r),o.encodeInitMessageHeaders=!0;const u=s.join("");__PRIVATE_logDebug(Gt,`Creating RPC '${e}' stream ${n}: ${u}`,o);const c=i.createWebChannel(u,o);this.E_(c);let _=!1,l=!1;const h=new __PRIVATE_StreamBridge({Jo:t=>{l?__PRIVATE_logDebug(Gt,`Not sending because RPC '${e}' stream ${n} is closed:`,t):(_||(__PRIVATE_logDebug(Gt,`Opening RPC '${e}' stream ${n} transport.`),c.open(),_=!0),__PRIVATE_logDebug(Gt,`RPC '${e}' stream ${n} sending:`,t),c.send(t))},Ho:()=>c.close()});return __PRIVATE_unguardedEventListen(c,webchannelBlob.WebChannel.EventType.OPEN,()=>{l||(__PRIVATE_logDebug(Gt,`RPC '${e}' stream ${n} transport opened.`),h.i_())}),__PRIVATE_unguardedEventListen(c,webchannelBlob.WebChannel.EventType.CLOSE,()=>{l||(l=!0,__PRIVATE_logDebug(Gt,`RPC '${e}' stream ${n} transport closed`),h.o_(),this.I_(c))}),__PRIVATE_unguardedEventListen(c,webchannelBlob.WebChannel.EventType.ERROR,t=>{l||(l=!0,__PRIVATE_logWarn(Gt,`RPC '${e}' stream ${n} transport errored. Name:`,t.name,"Message:",t.message),h.o_(new FirestoreError(D.UNAVAILABLE,"The operation could not be completed")))}),__PRIVATE_unguardedEventListen(c,webchannelBlob.WebChannel.EventType.MESSAGE,t=>{if(!l){const r=t.data[0];__PRIVATE_hardAssert(!!r,16349);const s=r,i=s?.error||s[0]?.error;if(i){__PRIVATE_logDebug(Gt,`RPC '${e}' stream ${n} received error:`,i);const t=i.status;let r=function(e){const t=Rt[e];if(void 0!==t)return __PRIVATE_mapCodeFromRpcCode(t)}(t),s=i.message;"NOT_FOUND"===t&&s.includes("database")&&s.includes("does not exist")&&s.includes(this.databaseId.database)&&__PRIVATE_logWarn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===r&&(r=D.INTERNAL,s="Unknown error status: "+t+" with message "+i.message),l=!0,h.o_(new FirestoreError(r,s)),c.close()}else __PRIVATE_logDebug(Gt,`RPC '${e}' stream ${n} received:`,r),h.__(r)}}),__PRIVATE_WebChannelConnection.u_(),setTimeout(()=>{h.s_()},0),h}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return webchannelBlob.createWebChannelTransport()}}
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
 */function __PRIVATE_newConnection(e){return new __PRIVATE_WebChannelConnection(e)}
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
 */function __PRIVATE_getWindow(){return"undefined"!=typeof window?window:null}function getDocument(){return"undefined"!=typeof document?document:null}
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
 */function __PRIVATE_newSerializer(e){return new JsonProtoSerializer(e,!0)}
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
 */__PRIVATE_WebChannelConnection.c_=!1;class __PRIVATE_ExponentialBackoff{constructor(e,t,r=1e3,n=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=n,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),n=Math.max(0,t-r);n>0&&__PRIVATE_logDebug("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,n,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}
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
 */const zt="PersistentStream";class __PRIVATE_PersistentStream{constructor(e,t,r,n,s,i,o,a){this.Ci=e,this.S_=r,this.b_=n,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new __PRIVATE_ExponentialBackoff(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(__PRIVATE_logError(t.toString()),__PRIVATE_logError("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===D.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.D_===t&&this.G_(e,r)},t=>{e(()=>{const e=new FirestoreError(D.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(e=>{r(()=>this.z_(e))}),this.stream.onMessage(e=>{r(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return __PRIVATE_logDebug(zt,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(__PRIVATE_logDebug(zt,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class __PRIVATE_PersistentListenStream extends __PRIVATE_PersistentStream{constructor(e,t,r,n,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=__PRIVATE_fromWatchChange(this.serializer,e),r=function(e){if(!("targetChange"in e))return SnapshotVersion.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?SnapshotVersion.min():t.readTime?__PRIVATE_fromVersion(t.readTime):SnapshotVersion.min()}(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=__PRIVATE_getEncodedDatabaseId(this.serializer),t.addTarget=function(e,t){let r;const n=t.target;if(r=__PRIVATE_targetIsDocumentTarget(n)?{documents:__PRIVATE_toDocumentsTarget(e,n)}:{query:__PRIVATE_toQueryTarget(e,n).ft},r.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=__PRIVATE_toBytes(e,t.resumeToken);const n=__PRIVATE_toInt32Proto(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(SnapshotVersion.min())>0){r.readTime=toTimestamp(e,t.snapshotVersion.toTimestamp());const n=__PRIVATE_toInt32Proto(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);const r=__PRIVATE_toListenRequestLabels(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=__PRIVATE_getEncodedDatabaseId(this.serializer),t.removeTarget=e,this.q_(t)}}class __PRIVATE_PersistentWriteStream extends __PRIVATE_PersistentStream{constructor(e,t,r,n,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,i),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return __PRIVATE_hardAssert(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,__PRIVATE_hardAssert(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){__PRIVATE_hardAssert(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=__PRIVATE_fromWriteResults(e.writeResults,e.commitTime),r=__PRIVATE_fromVersion(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=__PRIVATE_getEncodedDatabaseId(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>toMutation(this.serializer,e))};this.q_(t)}}
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
 */class Datastore{}class __PRIVATE_DatastoreImpl extends Datastore{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.ia=!1}sa(){if(this.ia)throw new FirestoreError(D.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,n){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Wo(e,__PRIVATE_toResourcePath(t,r),n,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new FirestoreError(D.UNKNOWN,e.toString())})}jo(e,t,r,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.jo(e,__PRIVATE_toResourcePath(t,r),n,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new FirestoreError(D.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function __PRIVATE_newDatastore(e,t,r,n){return new __PRIVATE_DatastoreImpl(e,t,r,n)}class __PRIVATE_OnlineStateTracker{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(__PRIVATE_logError(t),this.aa=!1):__PRIVATE_logDebug("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null
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
 */)}}const jt="RemoteStore";class __PRIVATE_RemoteStoreImpl{constructor(e,t,r,n,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(e=>{r.enqueueAndForget(async()=>{__PRIVATE_canUseNetwork(this)&&(__PRIVATE_logDebug(jt,"Restarting streams for network reachability change."),await async function(e){const t=__PRIVATE_debugCast(e);t.Ia.add(4),await __PRIVATE_disableNetworkInternal(t),t.Va.set("Unknown"),t.Ia.delete(4),await __PRIVATE_enableNetworkInternal(t)}(this))})}),this.Va=new __PRIVATE_OnlineStateTracker(r,n)}}async function __PRIVATE_enableNetworkInternal(e){if(__PRIVATE_canUseNetwork(e))for(const t of e.Ra)await t(!0)}async function __PRIVATE_disableNetworkInternal(e){for(const t of e.Ra)await t(!1)}function __PRIVATE_remoteStoreListen(e,t){const r=__PRIVATE_debugCast(e);r.Ea.has(t.targetId)||(r.Ea.set(t.targetId,t),__PRIVATE_shouldStartWatchStream(r)?__PRIVATE_startWatchStream(r):__PRIVATE_ensureWatchStream(r).O_()&&__PRIVATE_sendWatchRequest(r,t))}function __PRIVATE_remoteStoreUnlisten(e,t){const r=__PRIVATE_debugCast(e),n=__PRIVATE_ensureWatchStream(r);r.Ea.delete(t),n.O_()&&__PRIVATE_sendUnwatchRequest(r,t),0===r.Ea.size&&(n.O_()?n.L_():__PRIVATE_canUseNetwork(r)&&r.Va.set("Unknown"))}function __PRIVATE_sendWatchRequest(e,t){if(e.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(SnapshotVersion.min())>0){const r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}__PRIVATE_ensureWatchStream(e).Z_(t)}function __PRIVATE_sendUnwatchRequest(e,t){e.da.$e(t),__PRIVATE_ensureWatchStream(e).X_(t)}function __PRIVATE_startWatchStream(e){e.da=new __PRIVATE_WatchChangeAggregator({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ea.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),__PRIVATE_ensureWatchStream(e).start(),e.Va.ua()}function __PRIVATE_shouldStartWatchStream(e){return __PRIVATE_canUseNetwork(e)&&!__PRIVATE_ensureWatchStream(e).x_()&&e.Ea.size>0}function __PRIVATE_canUseNetwork(e){return 0===__PRIVATE_debugCast(e).Ia.size}function __PRIVATE_cleanUpWatchStreamState(e){e.da=void 0}async function __PRIVATE_onWatchStreamConnected(e){e.Va.set("Online")}async function __PRIVATE_onWatchStreamOpen(e){e.Ea.forEach((t,r)=>{__PRIVATE_sendWatchRequest(e,t)})}async function __PRIVATE_onWatchStreamClose(e,t){__PRIVATE_cleanUpWatchStreamState(e),__PRIVATE_shouldStartWatchStream(e)?(e.Va.ha(t),__PRIVATE_startWatchStream(e)):e.Va.set("Unknown")}async function __PRIVATE_onWatchStreamChange(e,t,r){if(e.Va.set("Online"),t instanceof __PRIVATE_WatchTargetChange&&2===t.state&&t.cause)try{await async function(e,t){const r=t.cause;for(const n of t.targetIds)e.Ea.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.Ea.delete(n),e.da.removeTarget(n))}(e,t)}catch(r){__PRIVATE_logDebug(jt,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await __PRIVATE_disableNetworkUntilRecovery(e,r)}else if(t instanceof __PRIVATE_DocumentWatchChange?e.da.Xe(t):t instanceof __PRIVATE_ExistenceFilterChange?e.da.st(t):e.da.tt(t),!r.isEqual(SnapshotVersion.min()))try{const t=await __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore);r.compareTo(t)>=0&&await function(e,t){const r=e.da.Tt(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){const s=e.Ea.get(n);s&&e.Ea.set(n,s.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{const n=e.Ea.get(t);if(!n)return;e.Ea.set(t,n.withResumeToken(ByteString.EMPTY_BYTE_STRING,n.snapshotVersion)),__PRIVATE_sendUnwatchRequest(e,t);const s=new TargetData(n.target,t,r,n.sequenceNumber);__PRIVATE_sendWatchRequest(e,s)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){__PRIVATE_logDebug(jt,"Failed to raise snapshot:",t),await __PRIVATE_disableNetworkUntilRecovery(e,t)}}async function __PRIVATE_disableNetworkUntilRecovery(e,t,r){if(!__PRIVATE_isIndexedDbTransactionError(t))throw t;e.Ia.add(1),await __PRIVATE_disableNetworkInternal(e),e.Va.set("Offline"),r||(r=()=>__PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{__PRIVATE_logDebug(jt,"Retrying IndexedDB access"),await r(),e.Ia.delete(1),await __PRIVATE_enableNetworkInternal(e)})}function __PRIVATE_executeWithRecovery(e,t){return t().catch(r=>__PRIVATE_disableNetworkUntilRecovery(e,r,t))}async function __PRIVATE_fillWritePipeline(e){const t=__PRIVATE_debugCast(e),r=__PRIVATE_ensureWriteStream(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:q;for(;__PRIVATE_canAddToWritePipeline(t);)try{const e=await __PRIVATE_localStoreGetNextMutationBatch(t.localStore,n);if(null===e){0===t.Ta.length&&r.L_();break}n=e.batchId,__PRIVATE_addToWritePipeline(t,e)}catch(e){await __PRIVATE_disableNetworkUntilRecovery(t,e)}__PRIVATE_shouldStartWriteStream(t)&&__PRIVATE_startWriteStream(t)}function __PRIVATE_canAddToWritePipeline(e){return __PRIVATE_canUseNetwork(e)&&e.Ta.length<10}function __PRIVATE_addToWritePipeline(e,t){e.Ta.push(t);const r=__PRIVATE_ensureWriteStream(e);r.O_()&&r.Y_&&r.ea(t.mutations)}function __PRIVATE_shouldStartWriteStream(e){return __PRIVATE_canUseNetwork(e)&&!__PRIVATE_ensureWriteStream(e).x_()&&e.Ta.length>0}function __PRIVATE_startWriteStream(e){__PRIVATE_ensureWriteStream(e).start()}async function __PRIVATE_onWriteStreamOpen(e){__PRIVATE_ensureWriteStream(e).ra()}async function __PRIVATE_onWriteHandshakeComplete(e){const t=__PRIVATE_ensureWriteStream(e);for(const r of e.Ta)t.ea(r.mutations)}async function __PRIVATE_onMutationResult(e,t,r){const n=e.Ta.shift(),s=MutationBatchResult.from(n,t,r);await __PRIVATE_executeWithRecovery(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await __PRIVATE_fillWritePipeline(e)}async function __PRIVATE_onWriteStreamClose(e,t){t&&__PRIVATE_ensureWriteStream(e).Y_&&await async function(e,t){if(function(e){return __PRIVATE_isPermanentError(e)&&e!==D.ABORTED}(t.code)){const r=e.Ta.shift();__PRIVATE_ensureWriteStream(e).B_(),await __PRIVATE_executeWithRecovery(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await __PRIVATE_fillWritePipeline(e)}}(e,t),__PRIVATE_shouldStartWriteStream(e)&&__PRIVATE_startWriteStream(e)}async function __PRIVATE_remoteStoreHandleCredentialChange(e,t){const r=__PRIVATE_debugCast(e);r.asyncQueue.verifyOperationInProgress(),__PRIVATE_logDebug(jt,"RemoteStore received new credentials");const n=__PRIVATE_canUseNetwork(r);r.Ia.add(3),await __PRIVATE_disableNetworkInternal(r),n&&r.Va.set("Unknown"),await r.remoteSyncer.handleCredentialChange(t),r.Ia.delete(3),await __PRIVATE_enableNetworkInternal(r)}async function __PRIVATE_remoteStoreApplyPrimaryState(e,t){const r=__PRIVATE_debugCast(e);t?(r.Ia.delete(2),await __PRIVATE_enableNetworkInternal(r)):t||(r.Ia.add(2),await __PRIVATE_disableNetworkInternal(r),r.Va.set("Unknown"))}function __PRIVATE_ensureWatchStream(e){return e.ma||(e.ma=function(e,t,r){const n=__PRIVATE_debugCast(e);return n.sa(),new __PRIVATE_PersistentListenStream(t,n.connection,n.authCredentials,n.appCheckCredentials,n.serializer,r)
/**
 * @license
 * Copyright 2018 Google LLC
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
 */}(e.datastore,e.asyncQueue,{Zo:__PRIVATE_onWatchStreamConnected.bind(null,e),Yo:__PRIVATE_onWatchStreamOpen.bind(null,e),t_:__PRIVATE_onWatchStreamClose.bind(null,e),H_:__PRIVATE_onWatchStreamChange.bind(null,e)}),e.Ra.push(async t=>{t?(e.ma.B_(),__PRIVATE_shouldStartWatchStream(e)?__PRIVATE_startWatchStream(e):e.Va.set("Unknown")):(await e.ma.stop(),__PRIVATE_cleanUpWatchStreamState(e))})),e.ma}function __PRIVATE_ensureWriteStream(e){return e.fa||(e.fa=function(e,t,r){const n=__PRIVATE_debugCast(e);return n.sa(),new __PRIVATE_PersistentWriteStream(t,n.connection,n.authCredentials,n.appCheckCredentials,n.serializer,r)}(e.datastore,e.asyncQueue,{Zo:()=>Promise.resolve(),Yo:__PRIVATE_onWriteStreamOpen.bind(null,e),t_:__PRIVATE_onWriteStreamClose.bind(null,e),ta:__PRIVATE_onWriteHandshakeComplete.bind(null,e),na:__PRIVATE_onMutationResult.bind(null,e)}),e.Ra.push(async t=>{t?(e.fa.B_(),await __PRIVATE_fillWritePipeline(e)):(await e.fa.stop(),e.Ta.length>0&&(__PRIVATE_logDebug(jt,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
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
 */}class DelayedOperation{constructor(e,t,r,n,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=s,this.deferred=new __PRIVATE_Deferred,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,s){const i=Date.now()+r,o=new DelayedOperation(e,t,i,n,s);return o.start(r),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new FirestoreError(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function __PRIVATE_wrapInUserErrorIfRecoverable(e,t){if(__PRIVATE_logError("AsyncQueue",`${t}: ${e}`),__PRIVATE_isIndexedDbTransactionError(e))return new FirestoreError(D.UNAVAILABLE,`${t}: ${e}`);throw e}
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
 */class DocumentSet{static emptySet(e){return new DocumentSet(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||DocumentKey.comparator(t.key,r.key):(e,t)=>DocumentKey.comparator(e.key,t.key),this.keyedMap=documentMap(),this.sortedSet=new SortedMap(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof DocumentSet))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const r=new DocumentSet;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r
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
 */}}class __PRIVATE_DocumentChangeSet{constructor(){this.ga=new SortedMap(DocumentKey.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?0!==e.type&&3===r.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==r.type?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.ga=this.ga.remove(t):1===e.type&&2===r.type?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):fail(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class ViewSnapshot{constructor(e,t,r,n,s,i,o,a,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,n,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new ViewSnapshot(e,t,DocumentSet.emptySet(t),i,r,n,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&__PRIVATE_queryEquals(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}
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
 */class __PRIVATE_QueryListenersInfo{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class __PRIVATE_EventManagerImpl{constructor(){this.queries=__PRIVATE_newQueriesObjectMap(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const r=__PRIVATE_debugCast(e),n=r.queries;r.queries=__PRIVATE_newQueriesObjectMap(),n.forEach((e,r)=>{for(const e of r.Sa)e.onError(t)})}(this,new FirestoreError(D.ABORTED,"Firestore shutting down"))}}function __PRIVATE_newQueriesObjectMap(){return new ObjectMap(e=>__PRIVATE_canonifyQuery(e),__PRIVATE_queryEquals)}async function __PRIVATE_eventManagerListen(e,t){const r=__PRIVATE_debugCast(e);let n=3;const s=t.query;let i=r.queries.get(s);i?!i.ba()&&t.Da()&&(n=2):(i=new __PRIVATE_QueryListenersInfo,n=t.Da()?0:1);try{switch(n){case 0:i.wa=await r.onListen(s,!0);break;case 1:i.wa=await r.onListen(s,!1);break;case 2:await r.onFirstRemoteStoreListen(s)}}catch(e){const r=__PRIVATE_wrapInUserErrorIfRecoverable(e,`Initialization of query '${__PRIVATE_stringifyQuery(t.query)}' failed`);return void t.onError(r)}r.queries.set(s,i),i.Sa.push(t),t.va(r.onlineState),i.wa&&t.Fa(i.wa)&&__PRIVATE_raiseSnapshotsInSyncEvent(r)}async function __PRIVATE_eventManagerUnlisten(e,t){const r=__PRIVATE_debugCast(e),n=t.query;let s=3;const i=r.queries.get(n);if(i){const e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return r.queries.delete(n),r.onUnlisten(n,!0);case 1:return r.queries.delete(n),r.onUnlisten(n,!1);case 2:return r.onLastRemoteStoreUnlisten(n);default:return}}function __PRIVATE_eventManagerOnWatchChange(e,t){const r=__PRIVATE_debugCast(e);let n=!1;for(const e of t){const t=e.query,s=r.queries.get(t);if(s){for(const t of s.Sa)t.Fa(e)&&(n=!0);s.wa=e}}n&&__PRIVATE_raiseSnapshotsInSyncEvent(r)}function __PRIVATE_eventManagerOnWatchError(e,t,r){const n=__PRIVATE_debugCast(e),s=n.queries.get(t);if(s)for(const e of s.Sa)e.onError(r);n.queries.delete(t)}function __PRIVATE_raiseSnapshotsInSyncEvent(e){e.Ca.forEach(e=>{e.next()})}var Ht,Jt;(Jt=Ht||(Ht={})).Ma="default",Jt.Cache="cache";class __PRIVATE_QueryListener{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const r of e.docChanges)3!==r.type&&t.push(r);e=new ViewSnapshot(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const r="Offline"!==t;return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=ViewSnapshot.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ht.Cache}}
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
 */class __PRIVATE_SizedBundleElement{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}
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
 */class __PRIVATE_BundleConverterImpl{constructor(e){this.serializer=e}qs(e){return fromName(this.serializer,e)}Ks(e){return e.metadata.exists?__PRIVATE_fromDocument(this.serializer,e.document,!1):MutableDocument.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return __PRIVATE_fromVersion(e)}}class __PRIVATE_BundleLoader{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=__PRIVATE_bundleInitialProgress(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const r=ResourcePath.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new __PRIVATE_BundleConverterImpl(this.serializer);for(const n of e)if(n.metadata.queries){const e=r.qs(n.metadata.name);for(const r of n.metadata.queries){const n=(t.get(r)||__PRIVATE_documentKeySet()).add(e);t.set(r,n)}}return t}async ja(e){const t=await __PRIVATE_localStoreApplyBundledDocuments(e,new __PRIVATE_BundleConverterImpl(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const t of this.Wa)await __PRIVATE_localStoreSaveNamedQuery(e,t,r.get(t.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function __PRIVATE_bundleInitialProgress(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
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
 */class __PRIVATE_AddedLimboDocument{constructor(e){this.key=e}}class __PRIVATE_RemovedLimboDocument{constructor(e){this.key=e}}class __PRIVATE_View{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=__PRIVATE_documentKeySet(),this.mutatedKeys=__PRIVATE_documentKeySet(),this.eu=__PRIVATE_newQueryComparator(e),this.tu=new DocumentSet(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new __PRIVATE_DocumentChangeSet,n=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=n,o=!1;const a="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,u="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{const c=n.get(e),_=__PRIVATE_queryMatches(this.query,t)?t:null,l=!!c&&this.mutatedKeys.has(c.key),h=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let d=!1;c&&_?c.data.isEqual(_.data)?l!==h&&(r.track({type:3,doc:_}),d=!0):this.su(c,_)||(r.track({type:2,doc:_}),d=!0,(a&&this.eu(_,a)>0||u&&this.eu(_,u)<0)&&(o=!0)):!c&&_?(r.track({type:0,doc:_}),d=!0):c&&!_&&(r.track({type:1,doc:c}),d=!0,(a||u)&&(o=!0)),d&&(_?(i=i.add(_),s=h?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),r.track({type:1,doc:e})}return{tu:i,iu:r,bs:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((e,t)=>function(e,t){const r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return fail(20277,{Vt:e})}};return r(e)-r(t)}
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
 */(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(r),n=n??!1;const o=t&&!n?this._u():[],a=0===this.Ya.size&&this.current&&!n?1:0,u=a!==this.Xa;return this.Xa=a,0!==i.length||u?{snapshot:new ViewSnapshot(this.query,e.tu,s,i,e.mutatedKeys,0===a,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new __PRIVATE_DocumentChangeSet,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=__PRIVATE_documentKeySet(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Ya=this.Ya.add(e.key))});const t=[];return e.forEach(e=>{this.Ya.has(e)||t.push(new __PRIVATE_RemovedLimboDocument(e))}),this.Ya.forEach(r=>{e.has(r)||t.push(new __PRIVATE_AddedLimboDocument(r))}),t}cu(e){this.Za=e.ks,this.Ya=__PRIVATE_documentKeySet();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ViewSnapshot.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Xa,this.hasCachedResults)}}const Zt="SyncEngine";class __PRIVATE_QueryView{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class LimboResolution{constructor(e){this.key=e,this.hu=!1}}class __PRIVATE_SyncEngineImpl{constructor(e,t,r,n,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new ObjectMap(e=>__PRIVATE_canonifyQuery(e),__PRIVATE_queryEquals),this.Eu=new Map,this.Iu=new Set,this.Ru=new SortedMap(DocumentKey.comparator),this.Au=new Map,this.Vu=new __PRIVATE_ReferenceSet,this.du={},this.mu=new Map,this.fu=__PRIVATE_TargetIdGenerator.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function __PRIVATE_syncEngineListen(e,t,r=!0){const n=__PRIVATE_ensureWatchCallbacks(e);let s;const i=n.Tu.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await __PRIVATE_allocateTargetAndMaybeListen(n,t,r,!0),s}async function __PRIVATE_triggerRemoteStoreListen(e,t){const r=__PRIVATE_ensureWatchCallbacks(e);await __PRIVATE_allocateTargetAndMaybeListen(r,t,!0,!1)}async function __PRIVATE_allocateTargetAndMaybeListen(e,t,r,n){const s=await __PRIVATE_localStoreAllocateTarget(e.localStore,__PRIVATE_queryToTarget(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,r);let a;return n&&(a=await __PRIVATE_initializeViewAndComputeSnapshot(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&r&&__PRIVATE_remoteStoreListen(e.remoteStore,s),a}async function __PRIVATE_initializeViewAndComputeSnapshot(e,t,r,n,s){e.pu=(t,r,n)=>async function(e,t,r,n){let s=t.view.ru(r);s.bs&&(s=await __PRIVATE_localStoreExecuteQuery(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const i=n&&n.targetChanges.get(t.targetId),o=n&&null!=n.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return __PRIVATE_updateTrackedLimbos(e,t.targetId,a.au),a.snapshot}(e,t,r,n);const i=await __PRIVATE_localStoreExecuteQuery(e.localStore,t,!0),o=new __PRIVATE_View(t,i.ks),a=o.ru(i.documents),u=TargetChange.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,s),c=o.applyChanges(a,e.isPrimaryClient,u);__PRIVATE_updateTrackedLimbos(e,r,c.au);const _=new __PRIVATE_QueryView(t,r,o);return e.Tu.set(t,_),e.Eu.has(r)?e.Eu.get(r).push(t):e.Eu.set(r,[t]),c.snapshot}async function __PRIVATE_syncEngineUnlisten(e,t,r){const n=__PRIVATE_debugCast(e),s=n.Tu.get(t),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter(e=>!__PRIVATE_queryEquals(e,t))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await __PRIVATE_localStoreReleaseTarget(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),r&&__PRIVATE_remoteStoreUnlisten(n.remoteStore,s.targetId),__PRIVATE_removeAndCleanupTarget(n,s.targetId)}).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)):(__PRIVATE_removeAndCleanupTarget(n,s.targetId),await __PRIVATE_localStoreReleaseTarget(n.localStore,s.targetId,!0))}async function __PRIVATE_triggerRemoteStoreUnlisten(e,t){const r=__PRIVATE_debugCast(e),n=r.Tu.get(t),s=r.Eu.get(n.targetId);r.isPrimaryClient&&1===s.length&&(r.sharedClientState.removeLocalQueryTarget(n.targetId),__PRIVATE_remoteStoreUnlisten(r.remoteStore,n.targetId))}async function __PRIVATE_syncEngineWrite(e,t,r){const n=__PRIVATE_syncEngineEnsureWriteCallbacks(e);try{const e=await function(e,t){const r=__PRIVATE_debugCast(e),n=Timestamp.now(),s=t.reduce((e,t)=>e.add(t.key),__PRIVATE_documentKeySet());let i,o;return r.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=__PRIVATE_mutableDocumentMap(),u=__PRIVATE_documentKeySet();return r.xs.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>r.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=__PRIVATE_mutationExtractBaseValue(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new __PRIVATE_PatchMutation(e.key,t,__PRIVATE_extractFieldMask(t.value.mapValue),Precondition.exists(!0)))}return r.mutationQueue.addMutationBatch(e,n,o,t)}).next(t=>{o=t;const n=t.applyToLocalDocumentSet(i,u);return r.documentOverlayCache.saveOverlays(e,t.batchId,n)})}).then(()=>({batchId:o.batchId,changes:__PRIVATE_convertOverlayedDocumentMapToDocumentMap(i)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(e.batchId),function(e,t,r){let n=e.du[e.currentUser.toKey()];n||(n=new SortedMap(__PRIVATE_primitiveComparator)),n=n.insert(t,r),e.du[e.currentUser.toKey()]=n}(n,e.batchId,r),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n,e.changes),await __PRIVATE_fillWritePipeline(n.remoteStore)}catch(e){const t=__PRIVATE_wrapInUserErrorIfRecoverable(e,"Failed to persist write");r.reject(t)}}async function __PRIVATE_syncEngineApplyRemoteEvent(e,t){const r=__PRIVATE_debugCast(e);try{const e=await __PRIVATE_localStoreApplyRemoteEventToLocalCache(r.localStore,t);t.targetChanges.forEach((e,t)=>{const n=r.Au.get(t);n&&(__PRIVATE_hardAssert(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?n.hu=!0:e.modifiedDocuments.size>0?__PRIVATE_hardAssert(n.hu,14607):e.removedDocuments.size>0&&(__PRIVATE_hardAssert(n.hu,42227),n.hu=!1))}),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r,e,t)}catch(e){await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}}function __PRIVATE_syncEngineApplyOnlineStateChange(e,t,r){const n=__PRIVATE_debugCast(e);if(n.isPrimaryClient&&0===r||!n.isPrimaryClient&&1===r){const e=[];n.Tu.forEach((r,n)=>{const s=n.view.va(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const r=__PRIVATE_debugCast(e);r.onlineState=t;let n=!1;r.queries.forEach((e,r)=>{for(const e of r.Sa)e.va(t)&&(n=!0)}),n&&__PRIVATE_raiseSnapshotsInSyncEvent(r)}(n.eventManager,t),e.length&&n.Pu.H_(e),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function __PRIVATE_syncEngineRejectListen(e,t,r){const n=__PRIVATE_debugCast(e);n.sharedClientState.updateQueryState(t,"rejected",r);const s=n.Au.get(t),i=s&&s.key;if(i){let e=new SortedMap(DocumentKey.comparator);e=e.insert(i,MutableDocument.newNoDocument(i,SnapshotVersion.min()));const r=__PRIVATE_documentKeySet().add(i),s=new RemoteEvent(SnapshotVersion.min(),new Map,new SortedMap(__PRIVATE_primitiveComparator),e,r);await __PRIVATE_syncEngineApplyRemoteEvent(n,s),n.Ru=n.Ru.remove(i),n.Au.delete(t),__PRIVATE_pumpEnqueuedLimboResolutions(n)}else await __PRIVATE_localStoreReleaseTarget(n.localStore,t,!1).then(()=>__PRIVATE_removeAndCleanupTarget(n,t,r)).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)}async function __PRIVATE_syncEngineApplySuccessfulWrite(e,t){const r=__PRIVATE_debugCast(e),n=t.batch.batchId;try{const e=await __PRIVATE_localStoreAcknowledgeBatch(r.localStore,t);__PRIVATE_processUserCallback(r,n,null),__PRIVATE_triggerPendingWritesCallbacks(r,n),r.sharedClientState.updateMutationState(n,"acknowledged"),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r,e)}catch(e){await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}}async function __PRIVATE_syncEngineRejectFailedWrite(e,t,r){const n=__PRIVATE_debugCast(e);try{const e=await function(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return r.mutationQueue.lookupMutationBatch(e,t).next(t=>(__PRIVATE_hardAssert(null!==t,37113),n=t.keys(),r.mutationQueue.removeMutationBatch(e,t))).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>r.localDocuments.getDocuments(e,n))})}(n.localStore,t);__PRIVATE_processUserCallback(n,t,r),__PRIVATE_triggerPendingWritesCallbacks(n,t),n.sharedClientState.updateMutationState(t,"rejected",r),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n,e)}catch(r){await __PRIVATE_ignoreIfPrimaryLeaseLoss(r)}}async function __PRIVATE_syncEngineRegisterPendingWritesCallback(e,t){const r=__PRIVATE_debugCast(e);__PRIVATE_canUseNetwork(r.remoteStore)||__PRIVATE_logDebug(Zt,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=__PRIVATE_debugCast(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(r.localStore);if(e===q)return void t.resolve();const n=r.mu.get(e)||[];n.push(t),r.mu.set(e,n)}catch(e){const r=__PRIVATE_wrapInUserErrorIfRecoverable(e,"Initialization of waitForPendingWrites() operation failed");t.reject(r)}}function __PRIVATE_triggerPendingWritesCallbacks(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function __PRIVATE_processUserCallback(e,t,r){const n=__PRIVATE_debugCast(e);let s=n.du[n.currentUser.toKey()];if(s){const e=s.get(t);e&&(r?e.reject(r):e.resolve(),s=s.remove(t)),n.du[n.currentUser.toKey()]=s}}function __PRIVATE_removeAndCleanupTarget(e,t,r=null){e.sharedClientState.removeLocalQueryTarget(t);for(const n of e.Eu.get(t))e.Tu.delete(n),r&&e.Pu.yu(n,r);e.Eu.delete(t),e.isPrimaryClient&&e.Vu.Gr(t).forEach(t=>{e.Vu.containsKey(t)||__PRIVATE_removeLimboTarget(e,t)})}function __PRIVATE_removeLimboTarget(e,t){e.Iu.delete(t.path.canonicalString());const r=e.Ru.get(t);null!==r&&(__PRIVATE_remoteStoreUnlisten(e.remoteStore,r),e.Ru=e.Ru.remove(t),e.Au.delete(r),__PRIVATE_pumpEnqueuedLimboResolutions(e))}function __PRIVATE_updateTrackedLimbos(e,t,r){for(const n of r)n instanceof __PRIVATE_AddedLimboDocument?(e.Vu.addReference(n.key,t),__PRIVATE_trackLimboChange(e,n)):n instanceof __PRIVATE_RemovedLimboDocument?(__PRIVATE_logDebug(Zt,"Document no longer in limbo: "+n.key),e.Vu.removeReference(n.key,t),e.Vu.containsKey(n.key)||__PRIVATE_removeLimboTarget(e,n.key)):fail(19791,{wu:n})}function __PRIVATE_trackLimboChange(e,t){const r=t.key,n=r.path.canonicalString();e.Ru.get(r)||e.Iu.has(n)||(__PRIVATE_logDebug(Zt,"New document in limbo: "+r),e.Iu.add(n),__PRIVATE_pumpEnqueuedLimboResolutions(e))}function __PRIVATE_pumpEnqueuedLimboResolutions(e){for(;e.Iu.size>0&&e.Ru.size<e.maxConcurrentLimboResolutions;){const t=e.Iu.values().next().value;e.Iu.delete(t);const r=new DocumentKey(ResourcePath.fromString(t)),n=e.fu.next();e.Au.set(n,new LimboResolution(r)),e.Ru=e.Ru.insert(r,n),__PRIVATE_remoteStoreListen(e.remoteStore,new TargetData(__PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(r.path)),n,"TargetPurposeLimboResolution",__PRIVATE_ListenSequence.ce))}}async function __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e,t,r){const n=__PRIVATE_debugCast(e),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach((e,a)=>{o.push(n.pu(a,t,r).then(e=>{if((e||r)&&n.isPrimaryClient){const t=e?!e.fromCache:r?.targetChanges.get(a.targetId)?.current;n.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){s.push(e);const t=__PRIVATE_LocalViewChanges.Is(a.targetId,e);i.push(t)}}))}),await Promise.all(o),n.Pu.H_(s),await async function(e,t){const r=__PRIVATE_debugCast(e);try{await r.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>PersistencePromise.forEach(t,t=>PersistencePromise.forEach(t.Ts,n=>r.persistence.referenceDelegate.addReference(e,t.targetId,n)).next(()=>PersistencePromise.forEach(t.Es,n=>r.persistence.referenceDelegate.removeReference(e,t.targetId,n)))))}catch(e){if(!__PRIVATE_isIndexedDbTransactionError(e))throw e;__PRIVATE_logDebug(Nt,"Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=r.vs.get(t),n=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(n);r.vs=r.vs.insert(t,s)}}}(n.localStore,i))}async function __PRIVATE_syncEngineHandleCredentialChange(e,t){const r=__PRIVATE_debugCast(e);if(!r.currentUser.isEqual(t)){__PRIVATE_logDebug(Zt,"User change. New user:",t.toKey());const e=await __PRIVATE_localStoreHandleUserChange(r.localStore,t);r.currentUser=t,function(e){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new FirestoreError(D.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.mu.clear()}(r),r.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r,e.Ns)}}function __PRIVATE_syncEngineGetRemoteKeysForTarget(e,t){const r=__PRIVATE_debugCast(e),n=r.Au.get(t);if(n&&n.hu)return __PRIVATE_documentKeySet().add(n.key);{let e=__PRIVATE_documentKeySet();const n=r.Eu.get(t);if(!n)return e;for(const t of n){const n=r.Tu.get(t);e=e.unionWith(n.view.nu)}return e}}async function __PRIVATE_synchronizeViewAndComputeSnapshot(e,t){const r=__PRIVATE_debugCast(e),n=await __PRIVATE_localStoreExecuteQuery(r.localStore,t.query,!0),s=t.view.cu(n);return r.isPrimaryClient&&__PRIVATE_updateTrackedLimbos(r,t.targetId,s.au),s}async function __PRIVATE_syncEngineSynchronizeWithChangedDocuments(e,t){const r=__PRIVATE_debugCast(e);return __PRIVATE_localStoreGetNewDocumentChanges(r.localStore,t).then(e=>__PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r,e))}async function __PRIVATE_syncEngineApplyBatchState(e,t,r,n){const s=__PRIVATE_debugCast(e),i=await function(e,t){const r=__PRIVATE_debugCast(e),n=__PRIVATE_debugCast(r.mutationQueue);return r.persistence.runTransaction("Lookup mutation documents","readonly",e=>n.Xn(e,t).next(t=>t?r.localDocuments.getDocuments(e,t):PersistencePromise.resolve(null)))}(s.localStore,t);null!==i?("pending"===r?await __PRIVATE_fillWritePipeline(s.remoteStore):"acknowledged"===r||"rejected"===r?(__PRIVATE_processUserCallback(s,t,n||null),__PRIVATE_triggerPendingWritesCallbacks(s,t),function(e,t){__PRIVATE_debugCast(__PRIVATE_debugCast(e).mutationQueue).nr(t)}(s.localStore,t)):fail(6720,"Unknown batchState",{Su:r}),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(s,i)):__PRIVATE_logDebug(Zt,"Cannot apply mutation batch with id: "+t)}async function __PRIVATE_syncEngineApplyPrimaryState(e,t){const r=__PRIVATE_debugCast(e);if(__PRIVATE_ensureWatchCallbacks(r),__PRIVATE_syncEngineEnsureWriteCallbacks(r),!0===t&&!0!==r.gu){const e=r.sharedClientState.getAllActiveQueryTargets(),t=await __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(r,e.toArray());r.gu=!0,await __PRIVATE_remoteStoreApplyPrimaryState(r.remoteStore,!0);for(const e of t)__PRIVATE_remoteStoreListen(r.remoteStore,e)}else if(!1===t&&!1!==r.gu){const e=[];let t=Promise.resolve();r.Eu.forEach((n,s)=>{r.sharedClientState.isLocalQueryTarget(s)?e.push(s):t=t.then(()=>(__PRIVATE_removeAndCleanupTarget(r,s),__PRIVATE_localStoreReleaseTarget(r.localStore,s,!0))),__PRIVATE_remoteStoreUnlisten(r.remoteStore,s)}),await t,await __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(r,e),function(e){const t=__PRIVATE_debugCast(e);t.Au.forEach((e,r)=>{__PRIVATE_remoteStoreUnlisten(t.remoteStore,r)}),t.Vu.zr(),t.Au=new Map,t.Ru=new SortedMap(DocumentKey.comparator)}(r),r.gu=!1,await __PRIVATE_remoteStoreApplyPrimaryState(r.remoteStore,!1)}}async function __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(e,t,r){const n=__PRIVATE_debugCast(e),s=[],i=[];for(const e of t){let t;const r=n.Eu.get(e);if(r&&0!==r.length){t=await __PRIVATE_localStoreAllocateTarget(n.localStore,__PRIVATE_queryToTarget(r[0]));for(const e of r){const t=n.Tu.get(e),r=await __PRIVATE_synchronizeViewAndComputeSnapshot(n,t);r.snapshot&&i.push(r.snapshot)}}else{const r=await __PRIVATE_localStoreGetCachedTarget(n.localStore,e);t=await __PRIVATE_localStoreAllocateTarget(n.localStore,r),await __PRIVATE_initializeViewAndComputeSnapshot(n,__PRIVATE_synthesizeTargetToQuery(r),e,!1,t.resumeToken)}s.push(t)}return n.Pu.H_(i),s}function __PRIVATE_synthesizeTargetToQuery(e){return __PRIVATE_newQuery(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function __PRIVATE_syncEngineGetActiveClients(e){return function(e){return __PRIVATE_debugCast(__PRIVATE_debugCast(e).persistence).hs()}(__PRIVATE_debugCast(e).localStore)}async function __PRIVATE_syncEngineApplyTargetState(e,t,r,n){const s=__PRIVATE_debugCast(e);if(s.gu)return void __PRIVATE_logDebug(Zt,"Ignoring unexpected query state notification.");const i=s.Eu.get(t);if(i&&i.length>0)switch(r){case"current":case"not-current":{const e=await __PRIVATE_localStoreGetNewDocumentChanges(s.localStore,__PRIVATE_queryCollectionGroup(i[0])),n=RemoteEvent.createSynthesizedRemoteEventForCurrentChange(t,"current"===r,ByteString.EMPTY_BYTE_STRING);await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(s,e,n);break}case"rejected":await __PRIVATE_localStoreReleaseTarget(s.localStore,t,!0),__PRIVATE_removeAndCleanupTarget(s,t,n);break;default:fail(64155,r)}}async function __PRIVATE_syncEngineApplyActiveTargetsChange(e,t,r){const n=__PRIVATE_ensureWatchCallbacks(e);if(n.gu){for(const e of t){if(n.Eu.has(e)&&n.sharedClientState.isActiveQueryTarget(e)){__PRIVATE_logDebug(Zt,"Adding an already active target "+e);continue}const t=await __PRIVATE_localStoreGetCachedTarget(n.localStore,e),r=await __PRIVATE_localStoreAllocateTarget(n.localStore,t);await __PRIVATE_initializeViewAndComputeSnapshot(n,__PRIVATE_synthesizeTargetToQuery(t),r.targetId,!1,r.resumeToken),__PRIVATE_remoteStoreListen(n.remoteStore,r)}for(const e of r)n.Eu.has(e)&&await __PRIVATE_localStoreReleaseTarget(n.localStore,e,!1).then(()=>{__PRIVATE_remoteStoreUnlisten(n.remoteStore,e),__PRIVATE_removeAndCleanupTarget(n,e)}).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)}}function __PRIVATE_ensureWatchCallbacks(e){const t=__PRIVATE_debugCast(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=__PRIVATE_syncEngineApplyRemoteEvent.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=__PRIVATE_syncEngineGetRemoteKeysForTarget.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=__PRIVATE_syncEngineRejectListen.bind(null,t),t.Pu.H_=__PRIVATE_eventManagerOnWatchChange.bind(null,t.eventManager),t.Pu.yu=__PRIVATE_eventManagerOnWatchError.bind(null,t.eventManager),t}function __PRIVATE_syncEngineEnsureWriteCallbacks(e){const t=__PRIVATE_debugCast(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=__PRIVATE_syncEngineApplySuccessfulWrite.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=__PRIVATE_syncEngineRejectFailedWrite.bind(null,t),t}function __PRIVATE_syncEngineLoadBundle(e,t,r){const n=__PRIVATE_debugCast(e);(async function(e,t,r){try{const n=await t.getMetadata();if(await function(e,t){const r=__PRIVATE_debugCast(e),n=__PRIVATE_fromVersion(t.createTime);return r.persistence.runTransaction("hasNewerBundle","readonly",e=>r.Pi.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(n)>=0)}(e.localStore,n))return await t.close(),r._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(n)),Promise.resolve(new Set);r._updateProgress(__PRIVATE_bundleInitialProgress(n));const s=new __PRIVATE_BundleLoader(n,t.serializer);let i=await t.bu();for(;i;){const e=await s.Ga(i);e&&r._updateProgress(e),i=await t.bu()}const o=await s.ja(e.localStore);return await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e,o.Ha,void 0),await function(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("Save bundle","readwrite",e=>r.Pi.saveBundleMetadata(e,t))}(e.localStore,n),r._completeWith(o.progress),Promise.resolve(o.Ja)}catch(e){return __PRIVATE_logWarn(Zt,`Loading bundle failed with ${e}`),r._failWith(e),Promise.resolve(new Set)
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
 */}})(n,t,r).then(e=>{n.sharedClientState.notifyBundleLoaded(e)})}class __PRIVATE_MemoryOfflineComponentProvider{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=__PRIVATE_newSerializer(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return __PRIVATE_newLocalStore(this.persistence,new __PRIVATE_QueryEngine,e.initialUser,this.serializer)}Cu(e){return new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.Vi,this.serializer)}Du(e){return new __PRIVATE_MemorySharedClientState}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}__PRIVATE_MemoryOfflineComponentProvider.provider={build:()=>new __PRIVATE_MemoryOfflineComponentProvider};class __PRIVATE_LruGcMemoryOfflineComponentProvider extends __PRIVATE_MemoryOfflineComponentProvider{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){__PRIVATE_hardAssert(this.persistence.referenceDelegate instanceof __PRIVATE_MemoryLruDelegate,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new __PRIVATE_LruScheduler(r,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?LruParams.withCacheSize(this.cacheSizeBytes):LruParams.DEFAULT;return new __PRIVATE_MemoryPersistence(e=>__PRIVATE_MemoryLruDelegate.Vi(e,t),this.serializer)}}class __PRIVATE_IndexedDbOfflineComponentProvider extends __PRIVATE_MemoryOfflineComponentProvider{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await __PRIVATE_syncEngineEnsureWriteCallbacks(this.xu.syncEngine),await __PRIVATE_fillWritePipeline(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return __PRIVATE_newLocalStore(this.persistence,new __PRIVATE_QueryEngine,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new __PRIVATE_LruScheduler(r,e.asyncQueue,t)}Mu(e,t){const r=new __PRIVATE_IndexBackfiller(t,this.persistence);return new __PRIVATE_IndexBackfillerScheduler(e.asyncQueue,r)}Cu(e){const t=__PRIVATE_indexedDbStoragePrefix(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=void 0!==this.cacheSizeBytes?LruParams.withCacheSize(this.cacheSizeBytes):LruParams.DEFAULT;return new __PRIVATE_IndexedDbPersistence(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,__PRIVATE_getWindow(),getDocument(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new __PRIVATE_MemorySharedClientState}}class __PRIVATE_MultiTabOfflineComponentProvider extends __PRIVATE_IndexedDbOfflineComponentProvider{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof __PRIVATE_WebStorageSharedClientState&&(this.sharedClientState.syncEngine={bo:__PRIVATE_syncEngineApplyBatchState.bind(null,t),Do:__PRIVATE_syncEngineApplyTargetState.bind(null,t),Co:__PRIVATE_syncEngineApplyActiveTargetsChange.bind(null,t),hs:__PRIVATE_syncEngineGetActiveClients.bind(null,t),So:__PRIVATE_syncEngineSynchronizeWithChangedDocuments.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async e=>{await __PRIVATE_syncEngineApplyPrimaryState(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){const t=__PRIVATE_getWindow();if(!__PRIVATE_WebStorageSharedClientState.v(t))throw new FirestoreError(D.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=__PRIVATE_indexedDbStoragePrefix(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new __PRIVATE_WebStorageSharedClientState(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class OnlineComponentProvider{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>__PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=__PRIVATE_syncEngineHandleCredentialChange.bind(null,this.syncEngine),await __PRIVATE_remoteStoreApplyPrimaryState(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new __PRIVATE_EventManagerImpl}createDatastore(e){const t=__PRIVATE_newSerializer(e.databaseInfo.databaseId),r=__PRIVATE_newConnection(e.databaseInfo);return __PRIVATE_newDatastore(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(e,t,r,n,s){return new __PRIVATE_RemoteStoreImpl(e,t,r,n,s)}(this.localStore,this.datastore,e.asyncQueue,e=>__PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine,e,0),__PRIVATE_BrowserConnectivityMonitor.v()?new __PRIVATE_BrowserConnectivityMonitor:new __PRIVATE_NoopConnectivityMonitor)}createSyncEngine(e,t){return function(e,t,r,n,s,i,o){const a=new __PRIVATE_SyncEngineImpl(e,t,r,n,s,i);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=__PRIVATE_debugCast(e);__PRIVATE_logDebug(jt,"RemoteStore shutting down."),t.Ia.add(5),await __PRIVATE_disableNetworkInternal(t),t.Aa.shutdown(),t.Va.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function __PRIVATE_toByteStreamReaderHelper(e,t=10240){let r=0;return{async read(){if(r<e.byteLength){const n={value:e.slice(r,r+t),done:!1};return r+=t,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}
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
 */OnlineComponentProvider.provider={build:()=>new OnlineComponentProvider};class __PRIVATE_AsyncObserver{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):__PRIVATE_logError("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
 */class __PRIVATE_BundleReaderImpl{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new __PRIVATE_Deferred,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.Ua()?this.metadata.resolve(e.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.Ka)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(null===e)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.Ku(`length string (${t}) is not valid number`);const n=await this.Uu(r);return new __PRIVATE_SizedBundleElement(JSON.parse(n),e.length+r)}$u(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async qu(){for(;this.$u()<0&&!await this.Wu(););if(0===this.buffer.length)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
/**
 * @license
 * Copyright 2025 Google LLC
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
 */class __PRIVATE_BundleReaderSyncImpl{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.bu();if(!r||!r.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(r?.Ka)}`);this.metadata=r;do{r=this.bu(),null!==r&&this.elements.push(r)}while(null!==r)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new __PRIVATE_SizedBundleElement(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new FirestoreError(D.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
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
 */class Transaction{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new FirestoreError(D.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const r=__PRIVATE_debugCast(e),n={documents:t.map(e=>__PRIVATE_toName(r.serializer,e))},s=await r.jo("BatchGetDocuments",r.serializer.databaseId,ResourcePath.emptyPath(),n,t.length),i=new Map;s.forEach(e=>{const t=__PRIVATE_fromBatchGetDocumentsResponse(r.serializer,e);i.set(t.key.toString(),t)});const o=[];return t.forEach(e=>{const t=i.get(e.toString());__PRIVATE_hardAssert(!!t,55234,{key:e}),o.push(t)}),o}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new __PRIVATE_DeleteMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const r=DocumentKey.fromPath(t);this.mutations.push(new __PRIVATE_VerifyMutation(r,this.precondition(r)))}),await async function(e,t){const r=__PRIVATE_debugCast(e),n={writes:t.map(e=>toMutation(r.serializer,e))};await r.Wo("Commit",r.serializer.databaseId,ResourcePath.emptyPath(),n)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw fail(50498,{Gu:e.constructor.name});t=SnapshotVersion.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new FirestoreError(D.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(SnapshotVersion.min())?Precondition.exists(!1):Precondition.updateTime(t):Precondition.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(SnapshotVersion.min()))throw new FirestoreError(D.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Precondition.updateTime(t)}return Precondition.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
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
 */class __PRIVATE_TransactionRunner{constructor(e,t,r,n,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=n,this.deferred=s,this.zu=r.maxAttempts,this.M_=new __PRIVATE_ExponentialBackoff(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new Transaction(this.datastore),t=this.Hu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Zu(e)}))}).catch(e=>{this.Zu(e)})})}Hu(e){try{const t=this.updateFunction(e);return!__PRIVATE_isNullOrUndefined(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!__PRIVATE_isPermanentError(t)}return!1}}
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
 */const Xt="FirestoreClient";class FirestoreClient{constructor(e,t,r,n,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=n,this.user=User.UNAUTHENTICATED,this.clientId=__PRIVATE_AutoId.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async e=>{__PRIVATE_logDebug(Xt,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(__PRIVATE_logDebug(Xt,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new __PRIVATE_Deferred;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=__PRIVATE_wrapInUserErrorIfRecoverable(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function __PRIVATE_setOfflineComponentProvider(e,t){e.asyncQueue.verifyOperationInProgress(),__PRIVATE_logDebug(Xt,"Initializing OfflineComponentProvider");const r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await __PRIVATE_localStoreHandleUserChange(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function __PRIVATE_setOnlineComponentProvider(e,t){e.asyncQueue.verifyOperationInProgress();const r=await __PRIVATE_ensureOfflineComponents(e);__PRIVATE_logDebug(Xt,"Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>__PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>__PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore,r)),e._onlineComponents=t}async function __PRIVATE_ensureOfflineComponents(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){__PRIVATE_logDebug(Xt,"Using user provided OfflineComponentProvider");try{await __PRIVATE_setOfflineComponentProvider(e,e._uninitializedComponentsProvider._offline)}catch(t){const r=t;if(!function(e){return"FirebaseError"===e.name?e.code===D.FAILED_PRECONDITION||e.code===D.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(r))throw r;__PRIVATE_logWarn("Error using user provided cache. Falling back to memory cache: "+r),await __PRIVATE_setOfflineComponentProvider(e,new __PRIVATE_MemoryOfflineComponentProvider)}}else __PRIVATE_logDebug(Xt,"Using default OfflineComponentProvider"),await __PRIVATE_setOfflineComponentProvider(e,new __PRIVATE_LruGcMemoryOfflineComponentProvider(void 0));return e._offlineComponents}async function __PRIVATE_ensureOnlineComponents(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(__PRIVATE_logDebug(Xt,"Using user provided OnlineComponentProvider"),await __PRIVATE_setOnlineComponentProvider(e,e._uninitializedComponentsProvider._online)):(__PRIVATE_logDebug(Xt,"Using default OnlineComponentProvider"),await __PRIVATE_setOnlineComponentProvider(e,new OnlineComponentProvider))),e._onlineComponents}function __PRIVATE_getPersistence(e){return __PRIVATE_ensureOfflineComponents(e).then(e=>e.persistence)}function __PRIVATE_getLocalStore(e){return __PRIVATE_ensureOfflineComponents(e).then(e=>e.localStore)}function __PRIVATE_getRemoteStore(e){return __PRIVATE_ensureOnlineComponents(e).then(e=>e.remoteStore)}function __PRIVATE_getSyncEngine(e){return __PRIVATE_ensureOnlineComponents(e).then(e=>e.syncEngine)}function __PRIVATE_getDatastore$1(e){return __PRIVATE_ensureOnlineComponents(e).then(e=>e.datastore)}async function __PRIVATE_getEventManager(e){const t=await __PRIVATE_ensureOnlineComponents(e),r=t.eventManager;return r.onListen=__PRIVATE_syncEngineListen.bind(null,t.syncEngine),r.onUnlisten=__PRIVATE_syncEngineUnlisten.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=__PRIVATE_triggerRemoteStoreListen.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=__PRIVATE_triggerRemoteStoreUnlisten.bind(null,t.syncEngine),r}function __PRIVATE_firestoreClientEnableNetwork(e){return e.asyncQueue.enqueue(async()=>{const t=await __PRIVATE_getPersistence(e),r=await __PRIVATE_getRemoteStore(e);return t.setNetworkEnabled(!0),function(e){const t=__PRIVATE_debugCast(e);return t.Ia.delete(0),__PRIVATE_enableNetworkInternal(t)}(r)})}function __PRIVATE_firestoreClientDisableNetwork(e){return e.asyncQueue.enqueue(async()=>{const t=await __PRIVATE_getPersistence(e),r=await __PRIVATE_getRemoteStore(e);return t.setNetworkEnabled(!1),async function(e){const t=__PRIVATE_debugCast(e);t.Ia.add(0),await __PRIVATE_disableNetworkInternal(t),t.Va.set("Offline")}(r)})}function __PRIVATE_firestoreClientListen(e,t,r,n){const s=new __PRIVATE_AsyncObserver(n),i=new __PRIVATE_QueryListener(t,s,r);return e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_eventManagerListen(await __PRIVATE_getEventManager(e),i)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_eventManagerUnlisten(await __PRIVATE_getEventManager(e),i))}}function __PRIVATE_firestoreClientGetDocumentFromLocalCache(e,t){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,r){try{const n=await function(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("read document","readonly",e=>r.localDocuments.getDocument(e,t))}(e,t);n.isFoundDocument()?r.resolve(n):n.isNoDocument()?r.resolve(null):r.reject(new FirestoreError(D.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const n=__PRIVATE_wrapInUserErrorIfRecoverable(e,`Failed to get document '${t} from cache`);r.reject(n)}}(await __PRIVATE_getLocalStore(e),t,r)),r.promise}function __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(e,t,r={}){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,r,n,s){const i=new __PRIVATE_AsyncObserver({next:a=>{i.Nu(),t.enqueueAndForget(()=>__PRIVATE_eventManagerUnlisten(e,o));const u=a.docs.has(r);!u&&a.fromCache?s.reject(new FirestoreError(D.UNAVAILABLE,"Failed to get document because the client is offline.")):u&&a.fromCache&&n&&"server"===n.source?s.reject(new FirestoreError(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new __PRIVATE_QueryListener(__PRIVATE_newQueryForPath(r.path),i,{includeMetadataChanges:!0,qa:!0});return __PRIVATE_eventManagerListen(e,o)}(await __PRIVATE_getEventManager(e),e.asyncQueue,t,r,n)),n.promise}function __PRIVATE_firestoreClientGetDocumentsFromLocalCache(e,t){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,r){try{const n=await __PRIVATE_localStoreExecuteQuery(e,t,!0),s=new __PRIVATE_View(t,n.ks),i=s.ru(n.documents),o=s.applyChanges(i,!1);r.resolve(o.snapshot)}catch(e){const n=__PRIVATE_wrapInUserErrorIfRecoverable(e,`Failed to execute query '${t} against cache`);r.reject(n)}}(await __PRIVATE_getLocalStore(e),t,r)),r.promise}function __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(e,t,r={}){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,r,n,s){const i=new __PRIVATE_AsyncObserver({next:r=>{i.Nu(),t.enqueueAndForget(()=>__PRIVATE_eventManagerUnlisten(e,o)),r.fromCache&&"server"===n.source?s.reject(new FirestoreError(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(r)},error:e=>s.reject(e)}),o=new __PRIVATE_QueryListener(r,i,{includeMetadataChanges:!0,qa:!0});return __PRIVATE_eventManagerListen(e,o)}(await __PRIVATE_getEventManager(e),e.asyncQueue,t,r,n)),n.promise}function __PRIVATE_firestoreClientRunAggregateQuery(e,t,r){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>{try{const s=await __PRIVATE_getDatastore$1(e);n.resolve(async function(e,t,r){const n=__PRIVATE_debugCast(e),{request:s,gt:i,parent:o}=__PRIVATE_toRunAggregationQueryRequest(n.serializer,__PRIVATE_queryToAggregateTarget(t),r);n.connection.qo||delete s.parent;const a=(await n.jo("RunAggregationQuery",n.serializer.databaseId,o,s,1)).filter(e=>!!e.result);__PRIVATE_hardAssert(1===a.length,64727);const u=a[0].result?.aggregateFields;return Object.keys(u).reduce((e,t)=>(e[i[t]]=u[t],e),{})}(s,t,r))}catch(e){n.reject(e)}}),n.promise}function __PRIVATE_firestoreClientExecutePipeline(e,t){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>{try{const n=await __PRIVATE_getDatastore$1(e);r.resolve(async function(e,t){const r=__PRIVATE_debugCast(e),n={database:__PRIVATE_getEncodedDatabaseId(r.serializer),structuredPipeline:t._toProto(r.serializer)},s=await r.jo("ExecutePipeline",r.serializer.databaseId,ResourcePath.emptyPath(),n),i=[];return s.forEach(e=>{if(e.results&&0!==e.results.length)return e.results.forEach(t=>i.push(__PRIVATE_fromPipelineResponse(r.serializer,e,t)));i.push(__PRIVATE_fromPipelineResponse(r.serializer,e))}),i}(n,t))}catch(e){r.reject(e)}}),r.promise}function __PRIVATE_firestoreClientWrite(e,t){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_syncEngineWrite(await __PRIVATE_getSyncEngine(e),t,r)),r.promise}function __PRIVATE_firestoreClientAddSnapshotsInSyncListener(e,t){const r=new __PRIVATE_AsyncObserver(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){__PRIVATE_debugCast(e).Ca.add(t),t.next()}(await __PRIVATE_getEventManager(e),r)),()=>{r.Nu(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){__PRIVATE_debugCast(e).Ca.delete(t)}(await __PRIVATE_getEventManager(e),r))}}function __PRIVATE_firestoreClientTransaction(e,t,r){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>{const s=await __PRIVATE_getDatastore$1(e);new __PRIVATE_TransactionRunner(e.asyncQueue,s,r,t,n).ju()}),n.promise}function __PRIVATE_firestoreClientLoadBundle(e,t,r,n){const s=function(e,t){let r;return r="string"==typeof e?__PRIVATE_newTextEncoder().encode(e):e,function(e,t){return new __PRIVATE_BundleReaderImpl(e,t)}(function(e,t){if(e instanceof Uint8Array)return __PRIVATE_toByteStreamReaderHelper(e,t);if(e instanceof ArrayBuffer)return __PRIVATE_toByteStreamReaderHelper(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(r),t)}(r,__PRIVATE_newSerializer(t));e.asyncQueue.enqueueAndForget(async()=>{__PRIVATE_syncEngineLoadBundle(await __PRIVATE_getSyncEngine(e),s,n)})}function __PRIVATE_firestoreClientGetNamedQuery(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const r=__PRIVATE_debugCast(e);return r.persistence.runTransaction("Get named query","readonly",e=>r.Pi.getNamedQuery(e,t))}(await __PRIVATE_getLocalStore(e),t))}function __PRIVATE_createBundleReaderSync(e,t){return function(e,t){return new __PRIVATE_BundleReaderSyncImpl(e,t)}(e,t)}function __PRIVATE_firestoreClientSetIndexConfiguration(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const r=__PRIVATE_debugCast(e),n=r.indexManager,s=[];return r.persistence.runTransaction("Configure indexes","readwrite",e=>n.getFieldIndexes(e).next(r=>
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
function(e,t,r,n,s){e=[...e],t=[...t],e.sort(r),t.sort(r);const i=e.length,o=t.length;let a=0,u=0;for(;a<o&&u<i;){const i=r(e[u],t[a]);i<0?s(e[u++]):i>0?n(t[a++]):(a++,u++)}for(;a<o;)n(t[a++]);for(;u<i;)s(e[u++])}(r,t,__PRIVATE_fieldIndexSemanticComparator,t=>{s.push(n.addFieldIndex(e,t))},t=>{s.push(n.deleteFieldIndex(e,t))})).next(()=>PersistencePromise.waitFor(s)))}(await __PRIVATE_getLocalStore(e),t))}function __PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){__PRIVATE_debugCast(e).Cs.As=t}(await __PRIVATE_getLocalStore(e),t))}function __PRIVATE_firestoreClientDeleteAllFieldIndexes(e){return e.asyncQueue.enqueue(async()=>function(e){const t=__PRIVATE_debugCast(e),r=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>r.deleteAllFieldIndexes(e))}(await __PRIVATE_getLocalStore(e)))}
/**
 * @license
 * Copyright 2023 Google LLC
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
 */function __PRIVATE_cloneLongPollingOptions(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
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
 */}const Yt="ComponentProvider",en=new Map;function __PRIVATE_makeDatabaseInfo(e,t,r,n,s){return new DatabaseInfo(e,t,r,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,__PRIVATE_cloneLongPollingOptions(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}
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
 */const tn="firestore.googleapis.com",nn=!0;class FirestoreSettingsImpl{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new FirestoreError(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=tn,this.ssl=nn}else this.host=e.host,this.ssl=e.ssl??nn;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=St;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<Ct)throw new FirestoreError(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}__PRIVATE_validateIsNotUsedTogether("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=__PRIVATE_cloneLongPollingOptions(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new FirestoreError(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new FirestoreError(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new FirestoreError(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Firestore$1{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new FirestoreSettingsImpl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new FirestoreError(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new FirestoreError(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new FirestoreSettingsImpl(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new __PRIVATE_EmptyAuthCredentialsProvider;switch(e.type){case"firstParty":return new __PRIVATE_FirstPartyAuthCredentialsProvider(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new FirestoreError(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=en.get(e);t&&(__PRIVATE_logDebug(Yt,"Removing Datastore"),en.delete(e),t.terminate())}(this),Promise.resolve()}}function connectFirestoreEmulator(e,t,r,n={}){e=__PRIVATE_cast(e,Firestore$1);const s=util.isCloudWorkstation(t),i=e._getSettings(),o={...i,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${r}`;s&&util.pingServer(`https://${a}`),i.host!==tn&&i.host!==a&&__PRIVATE_logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:a,ssl:s,emulatorOptions:n};if(!util.deepEqual(u,o)&&(e._setSettings(u),n.mockUserToken)){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=User.MOCK_USER;else{t=util.createMockUserToken(n.mockUserToken,e._app?.options.projectId);const s=n.mockUserToken.sub||n.mockUserToken.user_id;if(!s)throw new FirestoreError(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new User(s)}e._authCredentials=new __PRIVATE_EmulatorAuthCredentialsProvider(new __PRIVATE_OAuthToken(t,r))}}
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
 */class Query{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Query(this.firestore,e,this._query)}}class DocumentReference{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new CollectionReference(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new DocumentReference(this.firestore,e,this._key)}toJSON(){return{type:DocumentReference._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(__PRIVATE_validateJSON(t,DocumentReference._jsonSchema))return new DocumentReference(e,r||null,new DocumentKey(ResourcePath.fromString(t.referencePath)))}}DocumentReference._jsonSchemaVersion="firestore/documentReference/1.0",DocumentReference._jsonSchema={type:property("string",DocumentReference._jsonSchemaVersion),referencePath:property("string")};class CollectionReference extends Query{constructor(e,t,r){super(e,t,__PRIVATE_newQueryForPath(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new DocumentReference(this.firestore,null,new DocumentKey(e))}withConverter(e){return new CollectionReference(this.firestore,e,this._path)}}function __PRIVATE_isCollectionReference(e){return e instanceof CollectionReference}function collection(e,t,...r){if(e=util.getModularInstance(e),__PRIVATE_validateNonEmptyArgument("collection","path",t),e instanceof Firestore$1){const n=ResourcePath.fromString(t,...r);return __PRIVATE_validateCollectionPath(n),new CollectionReference(e,null,n)}{if(!(e instanceof DocumentReference||e instanceof CollectionReference))throw new FirestoreError(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(ResourcePath.fromString(t,...r));return __PRIVATE_validateCollectionPath(n),new CollectionReference(e.firestore,null,n)}}function collectionGroup(e,t){if(e=__PRIVATE_cast(e,Firestore$1),__PRIVATE_validateNonEmptyArgument("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new FirestoreError(D.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Query(e,null,function(e){return new __PRIVATE_QueryImpl(ResourcePath.emptyPath(),e)}(t))}function doc(e,t,...r){if(e=util.getModularInstance(e),1===arguments.length&&(t=__PRIVATE_AutoId.newId()),__PRIVATE_validateNonEmptyArgument("doc","path",t),e instanceof Firestore$1){const n=ResourcePath.fromString(t,...r);return __PRIVATE_validateDocumentPath(n),new DocumentReference(e,null,new DocumentKey(n))}{if(!(e instanceof DocumentReference||e instanceof CollectionReference))throw new FirestoreError(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(ResourcePath.fromString(t,...r));return __PRIVATE_validateDocumentPath(n),new DocumentReference(e.firestore,e instanceof CollectionReference?e.converter:null,new DocumentKey(n))}}function refEqual(e,t){return e=util.getModularInstance(e),t=util.getModularInstance(t),(e instanceof DocumentReference||e instanceof CollectionReference)&&(t instanceof DocumentReference||t instanceof CollectionReference)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function queryEqual(e,t){return e=util.getModularInstance(e),t=util.getModularInstance(t),e instanceof Query&&t instanceof Query&&e.firestore===t.firestore&&__PRIVATE_queryEquals(e._query,t._query)&&e.converter===t.converter
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
 */}const rn="AsyncQueue";class __PRIVATE_AsyncQueueImpl{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new __PRIVATE_ExponentialBackoff(this,"async_queue_retry"),this._c=()=>{const e=getDocument();e&&__PRIVATE_logDebug(rn,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=getDocument();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=getDocument();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new __PRIVATE_Deferred;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(0!==this.Yu.length){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!__PRIVATE_isIndexedDbTransactionError(e))throw e;__PRIVATE_logDebug(rn,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,__PRIVATE_logError("INTERNAL UNHANDLED ERROR: ",__PRIVATE_getMessageOrStack(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const n=DelayedOperation.createAndSchedule(this,e,t,r,e=>this.hc(e));return this.tc.push(n),n}uc(){this.nc&&fail(47125,{Pc:__PRIVATE_getMessageOrStack(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function __PRIVATE_getMessageOrStack(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
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
 */}class LoadBundleTask{constructor(){this._progressObserver={},this._taskCompletionResolver=new __PRIVATE_Deferred,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)
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
 */}}const sn=-1;class Firestore extends Firestore$1{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new __PRIVATE_AsyncQueueImpl,this._persistenceKey=n?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new __PRIVATE_AsyncQueueImpl(e),this._firestoreClient=void 0,await e}}}function initializeFirestore(e,t,r){r||(r=it);const n=app._getProvider(e,"firestore");if(n.isInitialized(r)){const e=n.getImmediate({identifier:r}),s=n.getOptions(r);if(util.deepEqual(s,t))return e;throw new FirestoreError(D.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new FirestoreError(D.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<Ct)throw new FirestoreError(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&util.isCloudWorkstation(t.host)&&util.pingServer(t.host),n.initialize({options:t,instanceIdentifier:r})}function getFirestore(e,t){const r="object"==typeof e?e:app.getApp(),n="string"==typeof e?e:t||it,s=app._getProvider(r,"firestore").getImmediate({identifier:n});if(!s._initialized){const e=util.getDefaultEmulatorHostnameAndPort("firestore");e&&connectFirestoreEmulator(s,...e)}return s}function ensureFirestoreConfigured(e){if(e._terminated)throw new FirestoreError(D.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||__PRIVATE_configureFirestore(e),e._firestoreClient}function __PRIVATE_configureFirestore(e){const t=e._freezeSettings(),r=__PRIVATE_makeDatabaseInfo(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new FirestoreClient(e._authCredentials,e._appCheckCredentials,e._queue,r,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function enableIndexedDbPersistence(e,t){__PRIVATE_logWarn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const r=e._freezeSettings();return __PRIVATE_setPersistenceProviders(e,OnlineComponentProvider.provider,{build:e=>new __PRIVATE_IndexedDbOfflineComponentProvider(e,r.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function enableMultiTabIndexedDbPersistence(e){__PRIVATE_logWarn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();__PRIVATE_setPersistenceProviders(e,OnlineComponentProvider.provider,{build:e=>new __PRIVATE_MultiTabOfflineComponentProvider(e,t.cacheSizeBytes)})}function __PRIVATE_setPersistenceProviders(e,t,r){if((e=__PRIVATE_cast(e,Firestore))._firestoreClient||e._terminated)throw new FirestoreError(D.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new FirestoreError(D.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:r},__PRIVATE_configureFirestore(e)}function clearIndexedDbPersistence(e){if(e._initialized&&!e._terminated)throw new FirestoreError(D.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new __PRIVATE_Deferred;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!__PRIVATE_SimpleDb.v())return Promise.resolve();const t=e+Ot;await __PRIVATE_SimpleDb.delete(t)}(__PRIVATE_indexedDbStoragePrefix(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function waitForPendingWrites(e){return function(e){const t=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_syncEngineRegisterPendingWritesCallback(await __PRIVATE_getSyncEngine(e),t)),t.promise}(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)))}function enableNetwork(e){return __PRIVATE_firestoreClientEnableNetwork(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)))}function disableNetwork(e){return __PRIVATE_firestoreClientDisableNetwork(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)))}function terminate(e){return app._removeServiceInstance(e.app,"firestore",e._databaseId.database),e._delete()}function loadBundle(e,t){const r=ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)),n=new LoadBundleTask;return __PRIVATE_firestoreClientLoadBundle(r,e._databaseId,t,n),n}function namedQuery(e,t){return __PRIVATE_firestoreClientGetNamedQuery(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)),t).then(t=>t?new Query(e,null,t.query):null)}
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
 */class Bytes{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bytes(ByteString.fromBase64String(e))}catch(e){throw new FirestoreError(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Bytes(ByteString.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Bytes._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(__PRIVATE_validateJSON(e,Bytes._jsonSchema))return Bytes.fromBase64String(e.bytes)}}Bytes._jsonSchemaVersion="firestore/bytes/1.0",Bytes._jsonSchema={type:property("string",Bytes._jsonSchemaVersion),bytes:property("string")};
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
class FieldPath{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new FirestoreError(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new FieldPath$1(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function documentId(){return new FieldPath(F)}
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
 */class FieldValue{constructor(e){this._methodName=e}}
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
 */class GeoPoint{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new FirestoreError(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new FirestoreError(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return __PRIVATE_primitiveComparator(this._lat,e._lat)||__PRIVATE_primitiveComparator(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:GeoPoint._jsonSchemaVersion}}static fromJSON(e){if(__PRIVATE_validateJSON(e,GeoPoint._jsonSchema))return new GeoPoint(e.latitude,e.longitude)}}GeoPoint._jsonSchemaVersion="firestore/geoPoint/1.0",GeoPoint._jsonSchema={type:property("string",GeoPoint._jsonSchemaVersion),latitude:property("number"),longitude:property("number")};
/**
 * @license
 * Copyright 2024 Google LLC
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
class VectorValue{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:VectorValue._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(__PRIVATE_validateJSON(e,VectorValue._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new VectorValue(e.vectorValues);throw new FirestoreError(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}VectorValue._jsonSchemaVersion="firestore/vectorValue/1.0",VectorValue._jsonSchema={type:property("string",VectorValue._jsonSchemaVersion),vectorValues:property("object")};
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
const on=/^__.*__$/;class ParsedSetData{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new __PRIVATE_PatchMutation(e,this.data,this.fieldMask,t,this.fieldTransforms):new __PRIVATE_SetMutation(e,this.data,t,this.fieldTransforms)}}class ParsedUpdateData{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new __PRIVATE_PatchMutation(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function __PRIVATE_isWrite(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw fail(40011,{dataSource:e})}}class __PRIVATE_ParseContextImpl{constructor(e,t,r,n,s,i){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===s&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new __PRIVATE_ParseContextImpl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return __PRIVATE_createError(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(0===e.length)throw this.yc("Document fields must not be empty");if(__PRIVATE_isWrite(this.dataSource)&&on.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class __PRIVATE_UserDataReader{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||__PRIVATE_newSerializer(e)}A(e,t,r,n=!1){return new __PRIVATE_ParseContextImpl({dataSource:e,methodName:t,targetDoc:r,path:FieldPath$1.emptyPath(),arrayElement:!1,hasConverter:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function __PRIVATE_newUserDataReader(e){const t=e._freezeSettings(),r=__PRIVATE_newSerializer(e._databaseId);return new __PRIVATE_UserDataReader(e._databaseId,!!t.ignoreUndefinedProperties,r)}function __PRIVATE_parseSetData(e,t,r,n,s,i={}){const o=e.A(i.merge||i.mergeFields?2:0,t,r,s);__PRIVATE_validatePlainObject("Data must be an object, but it was:",o,n);const a=__PRIVATE_parseObject(n,o);let u,c;if(i.merge)u=new FieldMask(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const n of i.mergeFields){const s=__PRIVATE_fieldPathFromArgument(t,n,r);if(!o.contains(s))throw new FirestoreError(D.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);__PRIVATE_fieldMaskContains(e,s)||e.push(s)}u=new FieldMask(e),c=o.fieldTransforms.filter(e=>u.covers(e.field))}else u=null,c=o.fieldTransforms;return new ParsedSetData(new ObjectValue(a),u,c)}class __PRIVATE_DeleteFieldValueImpl extends FieldValue{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof __PRIVATE_DeleteFieldValueImpl}}function __PRIVATE_createSentinelChildContext(e,t,r){return new __PRIVATE_ParseContextImpl({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:r},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class __PRIVATE_ServerTimestampFieldValueImpl extends FieldValue{_toFieldTransform(e){return new FieldTransform(e.path,new __PRIVATE_ServerTimestampTransform)}isEqual(e){return e instanceof __PRIVATE_ServerTimestampFieldValueImpl}}class __PRIVATE_ArrayUnionFieldValueImpl extends FieldValue{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=__PRIVATE_createSentinelChildContext(this,e,!0),r=this.Sc.map(e=>__PRIVATE_parseData(e,t)),n=new __PRIVATE_ArrayUnionTransformOperation(r);return new FieldTransform(e.path,n)}isEqual(e){return e instanceof __PRIVATE_ArrayUnionFieldValueImpl&&util.deepEqual(this.Sc,e.Sc)}}class __PRIVATE_ArrayRemoveFieldValueImpl extends FieldValue{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=__PRIVATE_createSentinelChildContext(this,e,!0),r=this.Sc.map(e=>__PRIVATE_parseData(e,t)),n=new __PRIVATE_ArrayRemoveTransformOperation(r);return new FieldTransform(e.path,n)}isEqual(e){return e instanceof __PRIVATE_ArrayRemoveFieldValueImpl&&util.deepEqual(this.Sc,e.Sc)}}class __PRIVATE_NumericIncrementFieldValueImpl extends FieldValue{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new __PRIVATE_NumericIncrementTransformOperation(e.serializer,toNumber(e.serializer,this.bc));return new FieldTransform(e.path,t)}isEqual(e){return e instanceof __PRIVATE_NumericIncrementFieldValueImpl&&this.bc===e.bc}}function __PRIVATE_parseUpdateData(e,t,r,n){const s=e.A(1,t,r);__PRIVATE_validatePlainObject("Data must be an object, but it was:",s,n);const i=[],o=ObjectValue.empty();forEach(n,(e,n)=>{const a=__PRIVATE_fieldPathFromDotSeparatedString(t,e,r);n=util.getModularInstance(n);const u=s.fc(a);if(n instanceof __PRIVATE_DeleteFieldValueImpl)i.push(a);else{const e=__PRIVATE_parseData(n,u);null!=e&&(i.push(a),o.set(a,e))}});const a=new FieldMask(i);return new ParsedUpdateData(o,a,s.fieldTransforms)}function __PRIVATE_parseUpdateVarargs(e,t,r,n,s,i){const o=e.A(1,t,r),a=[__PRIVATE_fieldPathFromArgument(t,n,r)],u=[s];if(i.length%2!=0)throw new FirestoreError(D.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)a.push(__PRIVATE_fieldPathFromArgument(t,i[e])),u.push(i[e+1]);const c=[],_=ObjectValue.empty();for(let e=a.length-1;e>=0;--e)if(!__PRIVATE_fieldMaskContains(c,a[e])){const t=a[e];let r=u[e];r=util.getModularInstance(r);const n=o.fc(t);if(r instanceof __PRIVATE_DeleteFieldValueImpl)c.push(t);else{const e=__PRIVATE_parseData(r,n);null!=e&&(c.push(t),_.set(t,e))}}const l=new FieldMask(c);return new ParsedUpdateData(_,l,o.fieldTransforms)}function __PRIVATE_parseQueryValue(e,t,r,n=!1){return __PRIVATE_parseData(r,e.A(n?4:3,t))}function __PRIVATE_parseData(e,t){if(__PRIVATE_looksLikeJsonObject(e=util.getModularInstance(e)))return __PRIVATE_validatePlainObject("Unsupported field value:",t,e),__PRIVATE_parseObject(e,t);if(e instanceof FieldValue)return function(e,t){if(!__PRIVATE_isWrite(t.dataSource))throw t.yc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.yc(`${e._methodName}() is not currently supported inside arrays`);const r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.yc("Nested arrays are not supported");return function(e,t){const r=[];let n=0;for(const s of e){let e=__PRIVATE_parseData(s,t.gc(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){if(null===(e=util.getModularInstance(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return toNumber(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const r=Timestamp.fromDate(e);return{timestampValue:toTimestamp(t.serializer,r)}}if(e instanceof Timestamp){const r=new Timestamp(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:toTimestamp(t.serializer,r)}}if(e instanceof GeoPoint)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Bytes)return{bytesValue:__PRIVATE_toBytes(t.serializer,e._byteString)};if(e instanceof DocumentReference){const r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.yc(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:__PRIVATE_toResourceName(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof VectorValue)return function(e,t){const r=e instanceof VectorValue?e.toArray():e,n={fields:{[st]:{stringValue:at},[ut]:{arrayValue:{values:r.map(e=>{if("number"!=typeof e)throw t.yc("VectorValues must only contain numeric values.");return __PRIVATE_toDouble(t.serializer,e)})}}}};return{mapValue:n}}(e,t);if(__PRIVATE_isProtoValueSerializable(e))return e._toProto(t.serializer);throw t.yc(`Unsupported field value: ${__PRIVATE_valueDescription(e)}`)}(e,t)}function __PRIVATE_parseObject(e,t){const r={};return isEmpty(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):forEach(e,(e,n)=>{const s=__PRIVATE_parseData(n,t.dc(e));null!=s&&(r[e]=s)}),{mapValue:{fields:r}}}function __PRIVATE_looksLikeJsonObject(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Timestamp||e instanceof GeoPoint||e instanceof Bytes||e instanceof DocumentReference||e instanceof FieldValue||e instanceof VectorValue||__PRIVATE_isProtoValueSerializable(e))}function __PRIVATE_validatePlainObject(e,t,r){if(!__PRIVATE_looksLikeJsonObject(r)||!__PRIVATE_isPlainObject(r)){const n=__PRIVATE_valueDescription(r);throw"an object"===n?t.yc(e+" a custom object"):t.yc(e+" "+n)}}function __PRIVATE_fieldPathFromArgument(e,t,r){if((t=util.getModularInstance(t))instanceof FieldPath)return t._internalPath;if("string"==typeof t)return __PRIVATE_fieldPathFromDotSeparatedString(e,t);throw __PRIVATE_createError("Field path arguments must be of type string or ",e,!1,void 0,r)}const _n=new RegExp("[~\\*/\\[\\]]");function __PRIVATE_fieldPathFromDotSeparatedString(e,t,r){if(t.search(_n)>=0)throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new FieldPath(...t.split("."))._internalPath}catch(n){throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function __PRIVATE_createError(e,t,r,n,s){const i=n&&!n.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;r&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new FirestoreError(D.INVALID_ARGUMENT,a+e+u)}function __PRIVATE_fieldMaskContains(e,t){return e.some(e=>e.isEqual(t))}function __PRIVATE_isUserData(e){return"function"==typeof e._readUserData}
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
 */class AbstractUserDataWriter{convertValue(e,t="none"){switch(__PRIVATE_typeOrder(e)){case 0:return null;case 1:return e.booleanValue;case 2:return __PRIVATE_normalizeNumber(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(__PRIVATE_normalizeByteString(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw fail(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return forEach(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){const t=e.fields?.[ut].arrayValue?.values?.map(e=>__PRIVATE_normalizeNumber(e.doubleValue));return new VectorValue(t)}convertGeoPoint(e){return new GeoPoint(__PRIVATE_normalizeNumber(e.latitude),__PRIVATE_normalizeNumber(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=__PRIVATE_getPreviousValue(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(__PRIVATE_getLocalWriteTime(e));default:return null}}convertTimestamp(e){const t=__PRIVATE_normalizeTimestamp(e);return new Timestamp(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ResourcePath.fromString(e);__PRIVATE_hardAssert(__PRIVATE_isValidResourceName(r),9688,{name:e});const n=new DatabaseId(r.get(1),r.get(3)),s=new DocumentKey(r.popFirst(5));return n.isEqual(t)||__PRIVATE_logError(`Document ${s} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s
/**
 * @license
 * Copyright 2024 Google LLC
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
 */}}class __PRIVATE_ExpUserDataWriter extends AbstractUserDataWriter{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bytes(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new DocumentReference(this.firestore,null,t)}}
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
 */function deleteField(){return new __PRIVATE_DeleteFieldValueImpl("deleteField")}function serverTimestamp(){return new __PRIVATE_ServerTimestampFieldValueImpl("serverTimestamp")}function arrayUnion(...e){return new __PRIVATE_ArrayUnionFieldValueImpl("arrayUnion",e)}function arrayRemove(...e){return new __PRIVATE_ArrayRemoveFieldValueImpl("arrayRemove",e)}function increment(e){return new __PRIVATE_NumericIncrementFieldValueImpl("increment",e)}function vector(e){return new VectorValue(e)}
/**
 * @license
 * Copyright 2025 Google LLC
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
 */class OptionsUtil{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=ObjectValue.empty();for(const n in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(n)){const s=this.optionDefinitions[n];if(n in e){const i=e[n];let o;s.nestedOptions&&__PRIVATE_isPlainObject(i)?o={mapValue:{fields:new OptionsUtil(s.nestedOptions).getOptionsProto(t,i)}}:i&&(o=__PRIVATE_parseData(i,t)??void 0),o&&r.set(FieldPath$1.fromServerFormat(s.serverName),o)}}return r}getOptionsProto(e,t,r){const n=this._getKnownOptions(t,e);if(r){const t=new Map(__PRIVATE_mapToArray(r,(t,r)=>[FieldPath$1.fromServerFormat(r),void 0!==t?__PRIVATE_parseData(t,e):null]));n.setAll(t)}return n.value.mapValue.fields??{}}}
/**
 * @license
 * Copyright 2025 Google LLC
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
 */class __PRIVATE_StructuredPipelineOptions{constructor(e={},t={}){this.Dc=e,this.Cc=t,this.vc=new OptionsUtil({indexMode:{serverName:"index_mode"}})}_readUserData(e){this.proto=this.vc.getOptionsProto(e,this.Dc,this.Cc)}}class StructuredPipeline{constructor(e,t){this.pipeline=e,this.options=t}_toProto(e){return{pipeline:this.pipeline._toProto(e),options:this.options.proto}}}
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
 */function _internalQueryToProtoQueryTarget(e){const t=ensureFirestoreConfigured(__PRIVATE_cast(e.firestore,Firestore)),r=t._onlineComponents?.datastore.serializer;return void 0===r?null:__PRIVATE_toQueryTarget(r,__PRIVATE_queryToTarget(e._query)).ft}function _internalAggregationQueryToProtoRunAggregationQueryRequest(e,t){const r=__PRIVATE_mapToArray(t,(e,t)=>new __PRIVATE_AggregateImpl(t,e.aggregateType,e._internalFieldPath)),n=ensureFirestoreConfigured(__PRIVATE_cast(e.firestore,Firestore)),s=n._onlineComponents?.datastore.serializer;return void 0===s?null:__PRIVATE_toRunAggregationQueryRequest(s,__PRIVATE_queryToAggregateTarget(e._query),r,!0).request}function _internalPipelineToExecutePipelineRequestProto(e){const t=function(e){if(e._terminated)throw new FirestoreError(D.FAILED_PRECONDITION,"The client has already been terminated.");if(!en.has(e)){__PRIVATE_logDebug(Yt,"Initializing Datastore");const t=__PRIVATE_newConnection(__PRIVATE_makeDatabaseInfo(e._databaseId,e.app.options.appId||"",e._persistenceKey,e.app.options.apiKey,e._freezeSettings())),r=__PRIVATE_newSerializer(e._databaseId),n=__PRIVATE_newDatastore(e._authCredentials,e._appCheckCredentials,t,r);en.set(e,n)}return en.get(e)}(__PRIVATE_cast(e._db,Firestore)),r=t.serializer;if(void 0===r)return null;const n=new StructuredPipeline(e,new __PRIVATE_StructuredPipelineOptions);return{database:__PRIVATE_getEncodedDatabaseId(r),structuredPipeline:n._toProto(r)}}exports.AbstractUserDataWriter=AbstractUserDataWriter,exports.Bound=Bound,exports.ByteString=ByteString,exports.Bytes=Bytes,exports.CollectionReference=CollectionReference,exports.CompositeFilter=CompositeFilter,exports.D=D,exports.DatabaseId=DatabaseId,exports.DocumentKey=DocumentKey,exports.DocumentReference=DocumentReference,exports.DocumentSet=DocumentSet,exports.F=F,exports.FieldFilter=FieldFilter,exports.FieldIndex=FieldIndex,exports.FieldPath=FieldPath,exports.FieldPath$1=FieldPath$1,exports.FieldValue=FieldValue,exports.Firestore=Firestore,exports.FirestoreError=FirestoreError,exports.GeoPoint=GeoPoint,exports.IndexSegment=IndexSegment,exports.IndexState=IndexState,exports.LoadBundleTask=LoadBundleTask,exports.ObjectValue=ObjectValue,exports.OnlineComponentProvider=OnlineComponentProvider,exports.OptionsUtil=OptionsUtil,exports.OrderBy=OrderBy,exports.Precondition=Precondition,exports.Query=Query,exports.ResourcePath=ResourcePath,exports.StructuredPipeline=StructuredPipeline,exports.Timestamp=Timestamp,exports.VectorValue=VectorValue,exports.ViewSnapshot=ViewSnapshot,exports.__PRIVATE_AggregateImpl=__PRIVATE_AggregateImpl,exports.__PRIVATE_AutoId=__PRIVATE_AutoId,exports.__PRIVATE_BundleLoader=__PRIVATE_BundleLoader,exports.__PRIVATE_DeleteMutation=__PRIVATE_DeleteMutation,exports.__PRIVATE_EmptyAppCheckTokenProvider=__PRIVATE_EmptyAppCheckTokenProvider,exports.__PRIVATE_EmptyAuthCredentialsProvider=__PRIVATE_EmptyAuthCredentialsProvider,exports.__PRIVATE_ExpUserDataWriter=__PRIVATE_ExpUserDataWriter,exports.__PRIVATE_FirebaseAppCheckTokenProvider=__PRIVATE_FirebaseAppCheckTokenProvider,exports.__PRIVATE_FirebaseAuthCredentialsProvider=__PRIVATE_FirebaseAuthCredentialsProvider,exports.__PRIVATE_IndexedDbOfflineComponentProvider=__PRIVATE_IndexedDbOfflineComponentProvider,exports.__PRIVATE_LruGcMemoryOfflineComponentProvider=__PRIVATE_LruGcMemoryOfflineComponentProvider,exports.__PRIVATE_MemoryOfflineComponentProvider=__PRIVATE_MemoryOfflineComponentProvider,exports.__PRIVATE_MultiTabOfflineComponentProvider=__PRIVATE_MultiTabOfflineComponentProvider,exports.__PRIVATE_StructuredPipelineOptions=__PRIVATE_StructuredPipelineOptions,exports.__PRIVATE_cast=__PRIVATE_cast,exports.__PRIVATE_createBundleReaderSync=__PRIVATE_createBundleReaderSync,exports.__PRIVATE_databaseIdFromApp=__PRIVATE_databaseIdFromApp,exports.__PRIVATE_debugAssert=__PRIVATE_debugAssert,exports.__PRIVATE_documentKeySet=__PRIVATE_documentKeySet,exports.__PRIVATE_fieldPathFromArgument=__PRIVATE_fieldPathFromArgument,exports.__PRIVATE_fieldPathFromDotSeparatedString=__PRIVATE_fieldPathFromDotSeparatedString,exports.__PRIVATE_firestoreClientAddSnapshotsInSyncListener=__PRIVATE_firestoreClientAddSnapshotsInSyncListener,exports.__PRIVATE_firestoreClientDeleteAllFieldIndexes=__PRIVATE_firestoreClientDeleteAllFieldIndexes,exports.__PRIVATE_firestoreClientExecutePipeline=__PRIVATE_firestoreClientExecutePipeline,exports.__PRIVATE_firestoreClientGetDocumentFromLocalCache=__PRIVATE_firestoreClientGetDocumentFromLocalCache,exports.__PRIVATE_firestoreClientGetDocumentViaSnapshotListener=__PRIVATE_firestoreClientGetDocumentViaSnapshotListener,exports.__PRIVATE_firestoreClientGetDocumentsFromLocalCache=__PRIVATE_firestoreClientGetDocumentsFromLocalCache,exports.__PRIVATE_firestoreClientGetDocumentsViaSnapshotListener=__PRIVATE_firestoreClientGetDocumentsViaSnapshotListener,exports.__PRIVATE_firestoreClientListen=__PRIVATE_firestoreClientListen,exports.__PRIVATE_firestoreClientRunAggregateQuery=__PRIVATE_firestoreClientRunAggregateQuery,exports.__PRIVATE_firestoreClientSetIndexConfiguration=__PRIVATE_firestoreClientSetIndexConfiguration,exports.__PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled=__PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled,exports.__PRIVATE_firestoreClientTransaction=__PRIVATE_firestoreClientTransaction,exports.__PRIVATE_firestoreClientWrite=__PRIVATE_firestoreClientWrite,exports.__PRIVATE_fromBundledQuery=__PRIVATE_fromBundledQuery,exports.__PRIVATE_fromDocument=__PRIVATE_fromDocument,exports.__PRIVATE_hardAssert=__PRIVATE_hardAssert,exports.__PRIVATE_isBase64Available=__PRIVATE_isBase64Available,exports.__PRIVATE_isCollectionGroupQuery=__PRIVATE_isCollectionGroupQuery,exports.__PRIVATE_isCollectionReference=__PRIVATE_isCollectionReference,exports.__PRIVATE_isDocumentQuery$1=__PRIVATE_isDocumentQuery$1,exports.__PRIVATE_isNumber$1=__PRIVATE_isNumber$1,exports.__PRIVATE_isOptionalEqual=__PRIVATE_isOptionalEqual,exports.__PRIVATE_isPlainObject=__PRIVATE_isPlainObject,exports.__PRIVATE_isServerTimestamp=__PRIVATE_isServerTimestamp,exports.__PRIVATE_isString=__PRIVATE_isString,exports.__PRIVATE_isUserData=__PRIVATE_isUserData,exports.__PRIVATE_logDebug=__PRIVATE_logDebug,exports.__PRIVATE_logWarn=__PRIVATE_logWarn,exports.__PRIVATE_mapToArray=__PRIVATE_mapToArray,exports.__PRIVATE_newQueryForPath=__PRIVATE_newQueryForPath,exports.__PRIVATE_newSerializer=__PRIVATE_newSerializer,exports.__PRIVATE_newUserDataReader=__PRIVATE_newUserDataReader,exports.__PRIVATE_parseData=__PRIVATE_parseData,exports.__PRIVATE_parseQueryValue=__PRIVATE_parseQueryValue,exports.__PRIVATE_parseSetData=__PRIVATE_parseSetData,exports.__PRIVATE_parseUpdateData=__PRIVATE_parseUpdateData,exports.__PRIVATE_parseUpdateVarargs=__PRIVATE_parseUpdateVarargs,exports.__PRIVATE_queryNormalizedOrderBy=__PRIVATE_queryNormalizedOrderBy,exports.__PRIVATE_queryWithAddedFilter=__PRIVATE_queryWithAddedFilter,exports.__PRIVATE_queryWithAddedOrderBy=__PRIVATE_queryWithAddedOrderBy,exports.__PRIVATE_queryWithEndAt=__PRIVATE_queryWithEndAt,exports.__PRIVATE_queryWithLimit=__PRIVATE_queryWithLimit,exports.__PRIVATE_queryWithStartAt=__PRIVATE_queryWithStartAt,exports.__PRIVATE_refValue=__PRIVATE_refValue,exports.__PRIVATE_setSDKVersion=__PRIVATE_setSDKVersion,exports.__PRIVATE_setTestingHooksSpi=__PRIVATE_setTestingHooksSpi,exports.__PRIVATE_toMapValue=__PRIVATE_toMapValue,exports.__PRIVATE_toPipelineValue=__PRIVATE_toPipelineValue,exports.__PRIVATE_toStringValue=__PRIVATE_toStringValue,exports.__PRIVATE_validateIsNotUsedTogether=__PRIVATE_validateIsNotUsedTogether,exports.__PRIVATE_validateJSON=__PRIVATE_validateJSON,exports.__PRIVATE_validatePositiveNumber=__PRIVATE_validatePositiveNumber,exports.__PRIVATE_valueDescription=__PRIVATE_valueDescription,exports._internalAggregationQueryToProtoRunAggregationQueryRequest=_internalAggregationQueryToProtoRunAggregationQueryRequest,exports._internalPipelineToExecutePipelineRequestProto=_internalPipelineToExecutePipelineRequestProto,exports._internalQueryToProtoQueryTarget=_internalQueryToProtoQueryTarget,exports.arrayRemove=arrayRemove,exports.arrayUnion=arrayUnion,exports.clearIndexedDbPersistence=clearIndexedDbPersistence,exports.collection=collection,exports.collectionGroup=collectionGroup,exports.connectFirestoreEmulator=connectFirestoreEmulator,exports.deleteField=deleteField,exports.disableNetwork=disableNetwork,exports.doc=doc,exports.documentId=documentId,exports.enableIndexedDbPersistence=enableIndexedDbPersistence,exports.enableMultiTabIndexedDbPersistence=enableMultiTabIndexedDbPersistence,exports.enableNetwork=enableNetwork,exports.ensureFirestoreConfigured=ensureFirestoreConfigured,exports.fail=fail,exports.getFirestore=getFirestore,exports.increment=increment,exports.initializeFirestore=initializeFirestore,exports.loadBundle=loadBundle,exports.namedQuery=namedQuery,exports.property=property,exports.queryEqual=queryEqual,exports.refEqual=refEqual,exports.serverTimestamp=serverTimestamp,exports.setLogLevel=setLogLevel,exports.sn=-1,exports.terminate=terminate,exports.toNumber=toNumber,exports.vector=vector,exports.waitForPendingWrites=waitForPendingWrites;