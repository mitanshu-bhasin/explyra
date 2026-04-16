import{_isFirebaseServerApp as e,_getProvider,getApp as t,_removeServiceInstance as n}from"@firebase/app";import{FirebaseError as r,getGlobal as i,isIndexedDBAvailable as s,getUA as o,base64 as _,DecodeBase64StringError as a,isSafariOrWebkit as u,isSafari as c,isCloudWorkstation as l,pingServer as h,deepEqual as P,createMockUserToken as T,getModularInstance as I,getDefaultEmulatorHostnameAndPort as E}from"@firebase/util";import{Integer as R,Md5 as A}from"@firebase/webchannel-wrapper/bloom-blob";import{Logger as V,LogLevel as d}from"@firebase/logger";import{getStatEventTarget as m,Event as f,XhrIo as g,EventType as p,ErrorCode as y,WebChannel as w,createWebChannelTransport as b,Stat as S}from"@firebase/webchannel-wrapper/webchannel-blob";
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
let D="12.11.0";function __PRIVATE_setSDKVersion(e){D=e}
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
 */const C=new V("@firebase/firestore");function __PRIVATE_getLogLevel(){return C.logLevel}function setLogLevel(e){C.setLogLevel(e)}function __PRIVATE_logDebug(e,...t){if(C.logLevel<=d.DEBUG){const n=t.map(__PRIVATE_argToString);C.debug(`Firestore (${D}): ${e}`,...n)}}function __PRIVATE_logError(e,...t){if(C.logLevel<=d.ERROR){const n=t.map(__PRIVATE_argToString);C.error(`Firestore (${D}): ${e}`,...n)}}function __PRIVATE_logWarn(e,...t){if(C.logLevel<=d.WARN){const n=t.map(__PRIVATE_argToString);C.warn(`Firestore (${D}): ${e}`,...n)}}function __PRIVATE_argToString(e){if("string"==typeof e)return e;try{return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
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
 */function fail(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,__PRIVATE__fail(e,r,n)}function __PRIVATE__fail(e,t,n){let r=`FIRESTORE (${D}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw __PRIVATE_logError(r),new Error(r)}function __PRIVATE_hardAssert(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||__PRIVATE__fail(t,s,r)}function __PRIVATE_debugAssert(e,t){e||fail(57014,t)}function __PRIVATE_debugCast(e,t){return e}
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
 */const v={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class FirestoreError extends r{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`
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
 */class __PRIVATE_OAuthToken{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class __PRIVATE_EmptyAuthCredentialsProvider{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(User.UNAUTHENTICATED))}shutdown(){}}class __PRIVATE_EmulatorAuthCredentialsProvider{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class __PRIVATE_FirebaseAuthCredentialsProvider{constructor(e){this.t=e,this.currentUser=User.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){__PRIVATE_hardAssert(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new __PRIVATE_Deferred;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new __PRIVATE_Deferred,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{__PRIVATE_logDebug("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(__PRIVATE_logDebug("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new __PRIVATE_Deferred)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(__PRIVATE_logDebug("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(__PRIVATE_hardAssert("string"==typeof t.accessToken,31837,{l:t}),new __PRIVATE_OAuthToken(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return __PRIVATE_hardAssert(null===e||"string"==typeof e,2055,{h:e}),new User(e)}}class __PRIVATE_FirstPartyToken{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=User.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class __PRIVATE_FirstPartyAuthCredentialsProvider{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new __PRIVATE_FirstPartyToken(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(User.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class AppCheckToken{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class __PRIVATE_FirebaseAppCheckTokenProvider{constructor(t,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,e(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(e,t){__PRIVATE_hardAssert(void 0===this.o,3512);const n=e=>{null!=e.error&&__PRIVATE_logDebug("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,__PRIVATE_logDebug("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{__PRIVATE_logDebug("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):__PRIVATE_logDebug("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new AppCheckToken(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(__PRIVATE_hardAssert("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new AppCheckToken(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class __PRIVATE_EmptyAppCheckTokenProvider{getToken(){return Promise.resolve(new AppCheckToken(""))}invalidateToken(){}start(e,t){}shutdown(){}}
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
 */function __PRIVATE_randomBytes(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
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
 */class __PRIVATE_AutoId{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=__PRIVATE_randomBytes(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function __PRIVATE_primitiveComparator(e,t){return e<t?-1:e>t?1:0}function __PRIVATE_compareUtf8Strings(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return __PRIVATE_isSurrogate(n)===__PRIVATE_isSurrogate(s)?__PRIVATE_primitiveComparator(n,s):__PRIVATE_isSurrogate(n)?1:-1}return __PRIVATE_primitiveComparator(e.length,t.length)}const F=55296,M=57343;function __PRIVATE_isSurrogate(e){const t=e.charCodeAt(0);return t>=F&&t<=M}function __PRIVATE_arrayEquals(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function __PRIVATE_isOptionalEqual(e,t,n){return void 0===e&&void 0===t||void 0!==e&&void 0!==t&&n(e,t)}function __PRIVATE_immediateSuccessor(e){return e+"\0"}
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
 */const x="__name__";class BasePath{constructor(e,t,n){void 0===t?t=0:t>e.length&&fail(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&fail(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===BasePath.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof BasePath?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=BasePath.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return __PRIVATE_primitiveComparator(e.length,t.length)}static compareSegments(e,t){const n=BasePath.isNumericId(e),r=BasePath.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?BasePath.extractNumericId(e).compare(BasePath.extractNumericId(t)):__PRIVATE_compareUtf8Strings(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return R.fromString(e.substring(4,e.length-2))}}class ResourcePath extends BasePath{construct(e,t,n){return new ResourcePath(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new FirestoreError(v.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new ResourcePath(t)}static emptyPath(){return new ResourcePath([])}}const O=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class FieldPath$1 extends BasePath{construct(e,t,n){return new FieldPath$1(e,t,n)}static isValidIdentifier(e){return O.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),FieldPath$1.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===x}static keyField(){return new FieldPath$1([x])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new FirestoreError(v.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new FirestoreError(v.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new FirestoreError(v.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new FirestoreError(v.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new FieldPath$1(t)}static emptyPath(){return new FieldPath$1([])}}
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
 */function __PRIVATE_validateNonEmptyArgument(e,t,n){if(!n)throw new FirestoreError(v.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function __PRIVATE_validateIsNotUsedTogether(e,t,n,r){if(!0===t&&!0===r)throw new FirestoreError(v.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function __PRIVATE_validateDocumentPath(e){if(!DocumentKey.isDocumentKey(e))throw new FirestoreError(v.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function __PRIVATE_validateCollectionPath(e){if(DocumentKey.isDocumentKey(e))throw new FirestoreError(v.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function __PRIVATE_isPlainObject(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function __PRIVATE_valueDescription(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":fail(12329,{type:typeof e})}function __PRIVATE_cast(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new FirestoreError(v.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=__PRIVATE_valueDescription(e);throw new FirestoreError(v.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function __PRIVATE_validatePositiveNumber(e,t){if(t<=0)throw new FirestoreError(v.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
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
 */function property(e,t){const n={typeString:e};return t&&(n.value=t),n}function __PRIVATE_validateJSON(e,t){if(!__PRIVATE_isPlainObject(e))throw new FirestoreError(v.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new FirestoreError(v.INVALID_ARGUMENT,n);return!0}
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
 */const N=-62135596800,B=1e6;class Timestamp{static now(){return Timestamp.fromMillis(Date.now())}static fromDate(e){return Timestamp.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*B);return new Timestamp(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new FirestoreError(v.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new FirestoreError(v.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<N)throw new FirestoreError(v.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new FirestoreError(v.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/B}_compareTo(e){return this.seconds===e.seconds?__PRIVATE_primitiveComparator(this.nanoseconds,e.nanoseconds):__PRIVATE_primitiveComparator(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Timestamp._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(__PRIVATE_validateJSON(e,Timestamp._jsonSchema))return new Timestamp(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-N;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Timestamp._jsonSchemaVersion="firestore/timestamp/1.0",Timestamp._jsonSchema={type:property("string",Timestamp._jsonSchemaVersion),seconds:property("number"),nanoseconds:property("number")};
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
 */const L=-1;class FieldIndex{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function __PRIVATE_fieldIndexGetArraySegment(e){return e.fields.find(e=>2===e.kind)}function __PRIVATE_fieldIndexGetDirectionalSegments(e){return e.fields.filter(e=>2!==e.kind)}function __PRIVATE_fieldIndexSemanticComparator(e,t){let n=__PRIVATE_primitiveComparator(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=__PRIVATE_indexSegmentComparator(e.fields[r],t.fields[r]),0!==n)return n;return __PRIVATE_primitiveComparator(e.fields.length,t.fields.length)}FieldIndex.UNKNOWN_ID=-1;class IndexSegment{constructor(e,t){this.fieldPath=e,this.kind=t}}function __PRIVATE_indexSegmentComparator(e,t){const n=FieldPath$1.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:__PRIVATE_primitiveComparator(e.kind,t.kind)}class IndexState{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new IndexState(0,IndexOffset.min())}}function __PRIVATE_newIndexOffsetSuccessorFromReadTime(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=SnapshotVersion.fromTimestamp(1e9===r?new Timestamp(n+1,0):new Timestamp(n,r));return new IndexOffset(s,DocumentKey.empty(),t)}function __PRIVATE_newIndexOffsetFromDocument(e){return new IndexOffset(e.readTime,e.key,L)}class IndexOffset{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new IndexOffset(SnapshotVersion.min(),DocumentKey.empty(),L)}static max(){return new IndexOffset(SnapshotVersion.max(),DocumentKey.empty(),L)}}function __PRIVATE_indexOffsetComparator(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=DocumentKey.comparator(e.documentKey,t.documentKey),0!==n?n:__PRIVATE_primitiveComparator(e.largestBatchId,t.largestBatchId)
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
 */)}const k="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class PersistenceTransaction{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
 */async function __PRIVATE_ignoreIfPrimaryLeaseLoss(e){if(e.code!==v.FAILED_PRECONDITION||e.message!==k)throw e;__PRIVATE_logDebug("LocalStore","Unexpectedly lost primary lease")}
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
 */class PersistencePromise{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&fail(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new PersistencePromise((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof PersistencePromise?t:PersistencePromise.resolve(t)}catch(e){return PersistencePromise.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):PersistencePromise.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):PersistencePromise.reject(t)}static resolve(e){return new PersistencePromise((t,n)=>{t(e)})}static reject(e){return new PersistencePromise((t,n)=>{n(e)})}static waitFor(e){return new PersistencePromise((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=PersistencePromise.resolve(!1);for(const n of e)t=t.next(e=>e?PersistencePromise.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new PersistencePromise((n,r)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;t(e[c]).next(e=>{i[c]=e,++o,o===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new PersistencePromise((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}
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
 */const K="SimpleDb";class __PRIVATE_SimpleDbTransaction{static open(e,t,n,r){try{return new __PRIVATE_SimpleDbTransaction(t,e.transaction(r,n))}catch(e){throw new __PRIVATE_IndexedDbTransactionError(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new __PRIVATE_Deferred,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new __PRIVATE_IndexedDbTransactionError(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{const n=__PRIVATE_checkForAndReportiOSError(t.target.error);this.S.reject(new __PRIVATE_IndexedDbTransactionError(e,n))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(__PRIVATE_logDebug(K,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new __PRIVATE_SimpleDbStore(t)}}class __PRIVATE_SimpleDb{static delete(e){return __PRIVATE_logDebug(K,"Removing database:",e),__PRIVATE_wrapRequest(i().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!s())return!1;if(__PRIVATE_SimpleDb.F())return!0;const e=o(),t=__PRIVATE_SimpleDb.M(e),n=0<t&&t<10,r=__PRIVATE_getAndroidVersion(e),i=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return"undefined"!=typeof process&&"YES"===process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,12.2===__PRIVATE_SimpleDb.M(o())&&__PRIVATE_logError("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(__PRIVATE_logDebug(K,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new __PRIVATE_IndexedDbTransactionError(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new FirestoreError(v.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new FirestoreError(v.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new __PRIVATE_IndexedDbTransactionError(e,r))},r.onupgradeneeded=e=>{__PRIVATE_logDebug(K,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.k(t,r.transaction,e.oldVersion,this.version).next(()=>{__PRIVATE_logDebug(K,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const s="readonly"===t;let i=0;for(;;){++i;try{this.db=await this.L(e);const t=__PRIVATE_SimpleDbTransaction.open(this.db,e,s?"readonly":"readwrite",n),i=r(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),PersistencePromise.reject(e))).toPromise();return i.catch(()=>{}),await t.D,i}catch(e){const t=e,n="FirebaseError"!==t.name&&i<3;if(__PRIVATE_logDebug(K,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function __PRIVATE_getAndroidVersion(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class __PRIVATE_IterationController{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return __PRIVATE_wrapRequest(this.U.delete())}}class __PRIVATE_IndexedDbTransactionError extends FirestoreError{constructor(e,t){super(v.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function __PRIVATE_isIndexedDbTransactionError(e){return"IndexedDbTransactionError"===e.name}class __PRIVATE_SimpleDbStore{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(__PRIVATE_logDebug(K,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(__PRIVATE_logDebug(K,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),__PRIVATE_wrapRequest(n)}add(e){return __PRIVATE_logDebug(K,"ADD",this.store.name,e,e),__PRIVATE_wrapRequest(this.store.add(e))}get(e){return __PRIVATE_wrapRequest(this.store.get(e)).next(t=>(void 0===t&&(t=null),__PRIVATE_logDebug(K,"GET",this.store.name,e,t),t))}delete(e){return __PRIVATE_logDebug(K,"DELETE",this.store.name,e),__PRIVATE_wrapRequest(this.store.delete(e))}count(){return __PRIVATE_logDebug(K,"COUNT",this.store.name),__PRIVATE_wrapRequest(this.store.count())}J(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new PersistencePromise((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.H(e,(e,n)=>{t.push(n)}).next(()=>t)}}Z(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new PersistencePromise((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}X(e,t){__PRIVATE_logDebug(K,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.H(r,t)}te(e){const t=this.cursor({});return new PersistencePromise((n,r)=>{t.onerror=e=>{const t=__PRIVATE_checkForAndReportiOSError(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){const n=[];return new PersistencePromise((r,s)=>{e.onerror=e=>{s(e.target.error)},e.onsuccess=e=>{const s=e.target.result;if(!s)return void r();const i=new __PRIVATE_IterationController(s),o=t(s.primaryKey,s.value,i);if(o instanceof PersistencePromise){const e=o.catch(e=>(i.done(),PersistencePromise.reject(e)));n.push(e)}i.isDone?r():null===i.G?s.continue():s.continue(i.G)}}).next(()=>PersistencePromise.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function __PRIVATE_wrapRequest(e){return new PersistencePromise((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=__PRIVATE_checkForAndReportiOSError(e.target.error);n(t)}})}let q=!1;function __PRIVATE_checkForAndReportiOSError(e){const t=__PRIVATE_SimpleDb.M(o());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new FirestoreError("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return q||(q=!0,setTimeout(()=>{throw e},0)),e}}return e}const U="IndexBackfiller";class __PRIVATE_IndexBackfillerScheduler{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){__PRIVATE_logDebug(U,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();__PRIVATE_logDebug(U,`Documents written: ${e}`)}catch(e){__PRIVATE_isIndexedDbTransactionError(e)?__PRIVATE_logDebug(U,"Ignoring IndexedDB error during index backfill: ",e):await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}await this.re(6e4)})}}class __PRIVATE_IndexBackfiller{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let r=t,s=!0;return PersistencePromise.doWhile(()=>!0===s&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return __PRIVATE_logDebug(U,`Processing collection: ${t}`),this.oe(e,t,r).next(e=>{r-=e,n.add(t)});s=!1})).next(()=>t-r)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const s=n.changes;return this.localStore.indexManager.updateIndexEntries(e,s).next(()=>this._e(r,n)).next(n=>(__PRIVATE_logDebug(U,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>s.size)}))}_e(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=__PRIVATE_newIndexOffsetFromDocument(t);__PRIVATE_indexOffsetComparator(r,n)>0&&(n=r)}),new IndexOffset(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))
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
const $=-1;function __PRIVATE_isNullOrUndefined(e){return null==e}function __PRIVATE_isNegativeZero(e){return 0===e&&1/e==-1/0}function __PRIVATE_isNumber$1(e){return"number"==typeof e}function isSafeInteger(e){return"number"==typeof e&&Number.isInteger(e)&&!__PRIVATE_isNegativeZero(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function __PRIVATE_isString(e){return"string"==typeof e}
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
 */const W="";function __PRIVATE_encodeResourcePath(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=__PRIVATE_encodeSeparator(t)),t=__PRIVATE_encodeSegment(e.get(n),t);return __PRIVATE_encodeSeparator(t)}function __PRIVATE_encodeSegment(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="";break;case W:n+="";break;default:n+=r}}return n}function __PRIVATE_encodeSeparator(e){return e+W+""}function __PRIVATE_decodeResourcePath(e){const t=e.length;if(__PRIVATE_hardAssert(t>=2,64408,{path:e}),2===t)return __PRIVATE_hardAssert(e.charAt(0)===W&&""===e.charAt(1),56145,{path:e}),ResourcePath.emptyPath();const n=t-2,r=[];let s="";for(let i=0;i<t;){const t=e.indexOf(W,i);switch((t<0||t>n)&&fail(50515,{path:e}),e.charAt(t+1)){case"":const n=e.substring(i,t);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=e.substring(i,t),s+="\0";break;case"":s+=e.substring(i,t+1);break;default:fail(61167,{path:e})}i=t+2}return new ResourcePath(r)}
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
 */const Q="remoteDocuments",G="owner",z="owner",j="mutationQueues",H="userId",J="mutations",Z="batchId",X="userMutationsIndex",Y=["userId","batchId"];
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
 */function __PRIVATE_newDbDocumentMutationPrefixForPath(e,t){return[e,__PRIVATE_encodeResourcePath(t)]}function __PRIVATE_newDbDocumentMutationKey(e,t,n){return[e,__PRIVATE_encodeResourcePath(t),n]}const ee={},te="documentMutations",ne="remoteDocumentsV14",re=["prefixPath","collectionGroup","readTime","documentId"],ie="documentKeyIndex",se=["prefixPath","collectionGroup","documentId"],oe="collectionGroupIndex",_e=["collectionGroup","readTime","prefixPath","documentId"],ae="remoteDocumentGlobal",ue="remoteDocumentGlobalKey",ce="targets",le="queryTargetsIndex",he=["canonicalId","targetId"],Pe="targetDocuments",Te=["targetId","path"],Ie="documentTargetsIndex",Ee=["path","targetId"],Re="targetGlobalKey",Ae="targetGlobal",Ve="collectionParents",de=["collectionId","parent"],me="clientMetadata",fe="clientId",ge="bundles",pe="bundleId",ye="namedQueries",we="name",be="indexConfiguration",Se="indexId",De="collectionGroupIndex",Ce="collectionGroup",ve="indexState",Fe=["indexId","uid"],Me="sequenceNumberIndex",xe=["uid","sequenceNumber"],Oe="indexEntries",Ne=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Be="documentKeyIndex",Le=["indexId","uid","orderedDocumentKey"],ke="documentOverlays",Ke=["userId","collectionPath","documentId"],qe="collectionPathOverlayIndex",Ue=["userId","collectionPath","largestBatchId"],$e="collectionGroupOverlayIndex",We=["userId","collectionGroup","largestBatchId"],Qe="globals",Ge="name",ze=[j,J,te,Q,ce,G,Ae,Pe,me,ae,Ve,ge,ye],je=[...ze,ke],He=[j,J,te,ne,ce,G,Ae,Pe,me,ae,Ve,ge,ye,ke],Je=He,Ze=[...Je,be,ve,Oe],Xe=Ze,Ye=[...Ze,Qe],et=Ye;
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
 */class __PRIVATE_IndexedDbTransaction extends PersistenceTransaction{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function __PRIVATE_getStore(e,t){const n=__PRIVATE_debugCast(e);return __PRIVATE_SimpleDb.O(n.le,t)}
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
 */function __PRIVATE_objectSize(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function forEach(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function __PRIVATE_mapToArray(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function isEmpty(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */class SortedMap{constructor(e,t){this.comparator=e,this.root=t||LLRBNode.EMPTY}insert(e,t){return new SortedMap(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,LLRBNode.BLACK,null,null))}remove(e){return new SortedMap(this.comparator,this.root.remove(e,this.comparator).copy(null,null,LLRBNode.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new SortedMapIterator(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new SortedMapIterator(this.root,e,this.comparator,!1)}getReverseIterator(){return new SortedMapIterator(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new SortedMapIterator(this.root,e,this.comparator,!0)}}class SortedMapIterator{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class LLRBNode{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:LLRBNode.RED,this.left=null!=r?r:LLRBNode.EMPTY,this.right=null!=s?s:LLRBNode.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new LLRBNode(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return LLRBNode.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return LLRBNode.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,LLRBNode.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,LLRBNode.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw fail(43730,{key:this.key,value:this.value});if(this.right.isRed())throw fail(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw fail(27949);return e+(this.isRed()?0:1)}}LLRBNode.EMPTY=null,LLRBNode.RED=!0,LLRBNode.BLACK=!1,LLRBNode.EMPTY=new class{constructor(){this.size=0}get key(){throw fail(57766)}get value(){throw fail(16141)}get color(){throw fail(16727)}get left(){throw fail(29726)}get right(){throw fail(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new LLRBNode(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class SortedSet{constructor(e){this.comparator=e,this.data=new SortedMap(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new SortedSetIterator(this.data.getIterator())}getIteratorFrom(e){return new SortedSetIterator(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof SortedSet))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new SortedSet(this.comparator);return t.data=e,t}}class SortedSetIterator{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function __PRIVATE_advanceIterator(e){return e.hasNext()?e.getNext():void 0}
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
 */class FieldMask{constructor(e){this.fields=e,e.sort(FieldPath$1.comparator)}static empty(){return new FieldMask([])}unionWith(e){let t=new SortedSet(FieldPath$1.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new FieldMask(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return __PRIVATE_arrayEquals(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */}}const tt=!1;function __PRIVATE_decodeBase64(e){try{return String.fromCharCode.apply(null,_.decodeStringToByteArray(e,tt))}catch(e){throw e instanceof a?new __PRIVATE_Base64DecodeError("Invalid base64 string: "+e):e}}function __PRIVATE_isBase64Available(){return!0}
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
 */class ByteString{constructor(e){this.binaryString=e}static fromBase64String(e){const t=__PRIVATE_decodeBase64(e);return new ByteString(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new ByteString(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){const t=[];for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return _.encodeByteArray(t,tt)}(this.binaryString)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return __PRIVATE_primitiveComparator(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ByteString.EMPTY_BYTE_STRING=new ByteString("");const nt=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function __PRIVATE_normalizeTimestamp(e){if(__PRIVATE_hardAssert(!!e,39018),"string"==typeof e){let t=0;const n=nt.exec(e);if(__PRIVATE_hardAssert(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:__PRIVATE_normalizeNumber(e.seconds),nanos:__PRIVATE_normalizeNumber(e.nanos)}}function __PRIVATE_normalizeNumber(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function __PRIVATE_normalizeByteString(e){return"string"==typeof e?ByteString.fromBase64String(e):ByteString.fromUint8Array(e)}
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
 */const rt="server_timestamp",it="__type__",st="__previous_value__",ot="__local_write_time__";function __PRIVATE_isServerTimestamp(e){const t=(e?.mapValue?.fields||{})[it]?.stringValue;return t===rt}function __PRIVATE_getPreviousValue(e){const t=e.mapValue.fields[st];return __PRIVATE_isServerTimestamp(t)?__PRIVATE_getPreviousValue(t):t}function __PRIVATE_getLocalWriteTime(e){const t=__PRIVATE_normalizeTimestamp(e.mapValue.fields[ot].timestampValue);return new Timestamp(t.seconds,t.nanos)}
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
 */class DatabaseInfo{constructor(e,t,n,r,s,i,o,a,c,u,_){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=_}}const _t="(default)";class DatabaseId{constructor(e,t){this.projectId=e,this.database=t||_t}static empty(){return new DatabaseId("","")}get isDefaultDatabase(){return this.database===_t}isEqual(e){return e instanceof DatabaseId&&e.projectId===this.projectId&&e.database===this.database}}function __PRIVATE_databaseIdFromApp(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new FirestoreError(v.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new DatabaseId(e.options.projectId,t)}
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
 */const at="__type__",ut="__max__",ct={mapValue:{fields:{__type__:{stringValue:ut}}}},lt="__vector__",ht="value",Pt={nullValue:"NULL_VALUE"};function __PRIVATE_typeOrder(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?__PRIVATE_isServerTimestamp(e)?4:__PRIVATE_isMaxValue(e)?9007199254740991:__PRIVATE_isVectorValue(e)?10:11:fail(28295,{value:e})}function __PRIVATE_valueEquals(e,t){if(e===t)return!0;const n=__PRIVATE_typeOrder(e);if(n!==__PRIVATE_typeOrder(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return __PRIVATE_getLocalWriteTime(e).isEqual(__PRIVATE_getLocalWriteTime(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=__PRIVATE_normalizeTimestamp(e.timestampValue),r=__PRIVATE_normalizeTimestamp(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return __PRIVATE_normalizeByteString(e.bytesValue).isEqual(__PRIVATE_normalizeByteString(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return __PRIVATE_normalizeNumber(e.geoPointValue.latitude)===__PRIVATE_normalizeNumber(t.geoPointValue.latitude)&&__PRIVATE_normalizeNumber(e.geoPointValue.longitude)===__PRIVATE_normalizeNumber(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return __PRIVATE_normalizeNumber(e.integerValue)===__PRIVATE_normalizeNumber(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=__PRIVATE_normalizeNumber(e.doubleValue),r=__PRIVATE_normalizeNumber(t.doubleValue);return n===r?__PRIVATE_isNegativeZero(n)===__PRIVATE_isNegativeZero(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return __PRIVATE_arrayEquals(e.arrayValue.values||[],t.arrayValue.values||[],__PRIVATE_valueEquals);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(__PRIVATE_objectSize(n)!==__PRIVATE_objectSize(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!__PRIVATE_valueEquals(n[e],r[e])))return!1;return!0}(e,t);default:return fail(52216,{left:e})}}function __PRIVATE_arrayValueContains(e,t){return void 0!==(e.values||[]).find(e=>__PRIVATE_valueEquals(e,t))}function __PRIVATE_valueCompare(e,t){if(e===t)return 0;const n=__PRIVATE_typeOrder(e),r=__PRIVATE_typeOrder(t);if(n!==r)return __PRIVATE_primitiveComparator(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return __PRIVATE_primitiveComparator(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=__PRIVATE_normalizeNumber(e.integerValue||e.doubleValue),r=__PRIVATE_normalizeNumber(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return __PRIVATE_compareTimestamps(e.timestampValue,t.timestampValue);case 4:return __PRIVATE_compareTimestamps(__PRIVATE_getLocalWriteTime(e),__PRIVATE_getLocalWriteTime(t));case 5:return __PRIVATE_compareUtf8Strings(e.stringValue,t.stringValue);case 6:return function(e,t){const n=__PRIVATE_normalizeByteString(e),r=__PRIVATE_normalizeByteString(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=__PRIVATE_primitiveComparator(n[e],r[e]);if(0!==t)return t}return __PRIVATE_primitiveComparator(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=__PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e.latitude),__PRIVATE_normalizeNumber(t.latitude));return 0!==n?n:__PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e.longitude),__PRIVATE_normalizeNumber(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return __PRIVATE_compareArrays(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},s=n[ht]?.arrayValue,i=r[ht]?.arrayValue,o=__PRIVATE_primitiveComparator(s?.values?.length||0,i?.values?.length||0);return 0!==o?o:__PRIVATE_compareArrays(s,i)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===ct.mapValue&&t===ct.mapValue)return 0;if(e===ct.mapValue)return 1;if(t===ct.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let e=0;e<r.length&&e<i.length;++e){const t=__PRIVATE_compareUtf8Strings(r[e],i[e]);if(0!==t)return t;const o=__PRIVATE_valueCompare(n[r[e]],s[i[e]]);if(0!==o)return o}return __PRIVATE_primitiveComparator(r.length,i.length)}(e.mapValue,t.mapValue);default:throw fail(23264,{he:n})}}function __PRIVATE_compareTimestamps(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return __PRIVATE_primitiveComparator(e,t);const n=__PRIVATE_normalizeTimestamp(e),r=__PRIVATE_normalizeTimestamp(t),s=__PRIVATE_primitiveComparator(n.seconds,r.seconds);return 0!==s?s:__PRIVATE_primitiveComparator(n.nanos,r.nanos)}function __PRIVATE_compareArrays(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=__PRIVATE_valueCompare(n[e],r[e]);if(t)return t}return __PRIVATE_primitiveComparator(n.length,r.length)}function canonicalId(e){return __PRIVATE_canonifyValue(e)}function __PRIVATE_canonifyValue(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=__PRIVATE_normalizeTimestamp(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return __PRIVATE_normalizeByteString(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return DocumentKey.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=__PRIVATE_canonifyValue(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${__PRIVATE_canonifyValue(e.fields[s])}`;return n+"}"}(e.mapValue):fail(61005,{value:e})}function __PRIVATE_estimateByteSize(e){switch(__PRIVATE_typeOrder(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=__PRIVATE_getPreviousValue(e);return t?16+__PRIVATE_estimateByteSize(t):16;case 5:return 2*e.stringValue.length;case 6:return __PRIVATE_normalizeByteString(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+__PRIVATE_estimateByteSize(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return forEach(e.fields,(e,n)=>{t+=e.length+__PRIVATE_estimateByteSize(n)}),t}(e.mapValue);default:throw fail(13486,{value:e})}}function __PRIVATE_refValue(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function isInteger(e){return!!e&&"integerValue"in e}function isArray(e){return!!e&&"arrayValue"in e}function __PRIVATE_isNullValue(e){return!!e&&"nullValue"in e}function __PRIVATE_isNanValue(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function __PRIVATE_isMapValue(e){return!!e&&"mapValue"in e}function __PRIVATE_isVectorValue(e){const t=(e?.mapValue?.fields||{})[at]?.stringValue;return t===lt}function __PRIVATE_deepClone(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return forEach(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=__PRIVATE_deepClone(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=__PRIVATE_deepClone(e.arrayValue.values[n]);return t}return{...e}}function __PRIVATE_isMaxValue(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===ut}const Tt={mapValue:{fields:{[at]:{stringValue:lt},[ht]:{arrayValue:{}}}}};function __PRIVATE_valuesGetLowerBound(e){return"nullValue"in e?Pt:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?__PRIVATE_refValue(DatabaseId.empty(),DocumentKey.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?__PRIVATE_isVectorValue(e)?Tt:{mapValue:{}}:fail(35942,{value:e})}function __PRIVATE_valuesGetUpperBound(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?__PRIVATE_refValue(DatabaseId.empty(),DocumentKey.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?Tt:"mapValue"in e?__PRIVATE_isVectorValue(e)?{mapValue:{}}:ct:fail(61959,{value:e})}function __PRIVATE_lowerBoundCompare(e,t){const n=__PRIVATE_valueCompare(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function __PRIVATE_upperBoundCompare(e,t){const n=__PRIVATE_valueCompare(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
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
 */class ObjectValue{constructor(e){this.value=e}static empty(){return new ObjectValue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!__PRIVATE_isMapValue(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=__PRIVATE_deepClone(t)}setAll(e){let t=FieldPath$1.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=__PRIVATE_deepClone(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());__PRIVATE_isMapValue(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return __PRIVATE_valueEquals(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];__PRIVATE_isMapValue(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){forEach(t,(t,n)=>e[t]=n);for(const t of n)delete e[t]}clone(){return new ObjectValue(__PRIVATE_deepClone(this.value))}}function __PRIVATE_extractFieldMask(e){const t=[];return forEach(e.fields,(e,n)=>{const r=new FieldPath$1([e]);if(__PRIVATE_isMapValue(n)){const e=__PRIVATE_extractFieldMask(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new FieldMask(t)
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
 */}class MutableDocument{constructor(e,t,n,r,s,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new MutableDocument(e,0,SnapshotVersion.min(),SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),0)}static newFoundDocument(e,t,n,r){return new MutableDocument(e,1,t,SnapshotVersion.min(),n,r,0)}static newNoDocument(e,t){return new MutableDocument(e,2,t,SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),0)}static newUnknownDocument(e,t){return new MutableDocument(e,3,t,SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(SnapshotVersion.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ObjectValue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ObjectValue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=SnapshotVersion.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof MutableDocument&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new MutableDocument(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Bound{constructor(e,t){this.position=e,this.inclusive=t}}function __PRIVATE_boundCompareToDocument(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(r=i.field.isKeyField()?DocumentKey.comparator(DocumentKey.fromName(o.referenceValue),n.key):__PRIVATE_valueCompare(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function __PRIVATE_boundEquals(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!__PRIVATE_valueEquals(e.position[n],t.position[n]))return!1;return!0}
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
 */class Filter{}class FieldFilter extends Filter{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new __PRIVATE_KeyFieldFilter(e,t,n):"array-contains"===t?new __PRIVATE_ArrayContainsFilter(e,n):"in"===t?new __PRIVATE_InFilter(e,n):"not-in"===t?new __PRIVATE_NotInFilter(e,n):"array-contains-any"===t?new __PRIVATE_ArrayContainsAnyFilter(e,n):new FieldFilter(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new __PRIVATE_KeyFieldInFilter(e,n):new __PRIVATE_KeyFieldNotInFilter(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(__PRIVATE_valueCompare(t,this.value)):null!==t&&__PRIVATE_typeOrder(this.value)===__PRIVATE_typeOrder(t)&&this.matchesComparison(__PRIVATE_valueCompare(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return fail(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class CompositeFilter extends Filter{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new CompositeFilter(e,t)}matches(e){return __PRIVATE_compositeFilterIsConjunction(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function __PRIVATE_compositeFilterIsConjunction(e){return"and"===e.op}function __PRIVATE_compositeFilterIsDisjunction(e){return"or"===e.op}function __PRIVATE_compositeFilterIsFlatConjunction(e){return __PRIVATE_compositeFilterIsFlat(e)&&__PRIVATE_compositeFilterIsConjunction(e)}function __PRIVATE_compositeFilterIsFlat(e){for(const t of e.filters)if(t instanceof CompositeFilter)return!1;return!0}function __PRIVATE_canonifyFilter(e){if(e instanceof FieldFilter)return e.field.canonicalString()+e.op.toString()+canonicalId(e.value);if(__PRIVATE_compositeFilterIsFlatConjunction(e))return e.filters.map(e=>__PRIVATE_canonifyFilter(e)).join(",");{const t=e.filters.map(e=>__PRIVATE_canonifyFilter(e)).join(",");return`${e.op}(${t})`}}function __PRIVATE_filterEquals(e,t){return e instanceof FieldFilter?function(e,t){return t instanceof FieldFilter&&e.op===t.op&&e.field.isEqual(t.field)&&__PRIVATE_valueEquals(e.value,t.value)}(e,t):e instanceof CompositeFilter?function(e,t){return t instanceof CompositeFilter&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&__PRIVATE_filterEquals(n,t.filters[r]),!0)}(e,t):void fail(19439)}function __PRIVATE_compositeFilterWithAddedFilters(e,t){const n=e.filters.concat(t);return CompositeFilter.create(n,e.op)}function __PRIVATE_stringifyFilter(e){return e instanceof FieldFilter?function(e){return`${e.field.canonicalString()} ${e.op} ${canonicalId(e.value)}`}(e):e instanceof CompositeFilter?function(e){return e.op.toString()+" {"+e.getFilters().map(__PRIVATE_stringifyFilter).join(" ,")+"}"}(e):"Filter"}class __PRIVATE_KeyFieldFilter extends FieldFilter{constructor(e,t,n){super(e,t,n),this.key=DocumentKey.fromName(n.referenceValue)}matches(e){const t=DocumentKey.comparator(e.key,this.key);return this.matchesComparison(t)}}class __PRIVATE_KeyFieldInFilter extends FieldFilter{constructor(e,t){super(e,"in",t),this.keys=__PRIVATE_extractDocumentKeysFromArrayValue("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class __PRIVATE_KeyFieldNotInFilter extends FieldFilter{constructor(e,t){super(e,"not-in",t),this.keys=__PRIVATE_extractDocumentKeysFromArrayValue("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function __PRIVATE_extractDocumentKeysFromArrayValue(e,t){return(t.arrayValue?.values||[]).map(e=>DocumentKey.fromName(e.referenceValue))}class __PRIVATE_ArrayContainsFilter extends FieldFilter{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return isArray(t)&&__PRIVATE_arrayValueContains(t.arrayValue,this.value)}}class __PRIVATE_InFilter extends FieldFilter{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&__PRIVATE_arrayValueContains(this.value.arrayValue,t)}}class __PRIVATE_NotInFilter extends FieldFilter{constructor(e,t){super(e,"not-in",t)}matches(e){if(__PRIVATE_arrayValueContains(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!__PRIVATE_arrayValueContains(this.value.arrayValue,t)}}class __PRIVATE_ArrayContainsAnyFilter extends FieldFilter{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!isArray(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>__PRIVATE_arrayValueContains(this.value.arrayValue,e))}}
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
 */class __PRIVATE_TargetImpl{constructor(e,t=null,n=[],r=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function __PRIVATE_newTarget(e,t=null,n=[],r=[],s=null,i=null,o=null){return new __PRIVATE_TargetImpl(e,t,n,r,s,i,o)}function __PRIVATE_canonifyTarget(e){const t=__PRIVATE_debugCast(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>__PRIVATE_canonifyFilter(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),__PRIVATE_isNullOrUndefined(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>canonicalId(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>canonicalId(e)).join(",")),t.Te=e}return t.Te}function __PRIVATE_targetEquals(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!__PRIVATE_orderByEquals(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!__PRIVATE_filterEquals(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!__PRIVATE_boundEquals(e.startAt,t.startAt)&&__PRIVATE_boundEquals(e.endAt,t.endAt)}function __PRIVATE_targetIsDocumentTarget(e){return DocumentKey.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function __PRIVATE_targetGetFieldFiltersForPath(e,t){return e.filters.filter(e=>e instanceof FieldFilter&&e.field.isEqual(t))}function __PRIVATE_targetGetAscendingBound(e,t,n){let r=Pt,s=!0;for(const n of __PRIVATE_targetGetFieldFiltersForPath(e,t)){let e=Pt,t=!0;switch(n.op){case"<":case"<=":e=__PRIVATE_valuesGetLowerBound(n.value);break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=Pt}__PRIVATE_lowerBoundCompare({value:r,inclusive:s},{value:e,inclusive:t})<0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];__PRIVATE_lowerBoundCompare({value:r,inclusive:s},{value:e,inclusive:n.inclusive})<0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}function __PRIVATE_targetGetDescendingBound(e,t,n){let r=ct,s=!0;for(const n of __PRIVATE_targetGetFieldFiltersForPath(e,t)){let e=ct,t=!0;switch(n.op){case">=":case">":e=__PRIVATE_valuesGetUpperBound(n.value),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=ct}__PRIVATE_upperBoundCompare({value:r,inclusive:s},{value:e,inclusive:t})>0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];__PRIVATE_upperBoundCompare({value:r,inclusive:s},{value:e,inclusive:n.inclusive})>0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}
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
 */class __PRIVATE_QueryImpl{constructor(e,t=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function __PRIVATE_newQuery(e,t,n,r,s,i,o,a){return new __PRIVATE_QueryImpl(e,t,n,r,s,i,o,a)}function __PRIVATE_newQueryForPath(e){return new __PRIVATE_QueryImpl(e)}function __PRIVATE_queryMatchesAllDocuments(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function __PRIVATE_isDocumentQuery$1(e){return DocumentKey.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function __PRIVATE_isCollectionGroupQuery(e){return null!==e.collectionGroup}function __PRIVATE_queryNormalizedOrderBy(e){const t=__PRIVATE_debugCast(e);if(null===t.Ee){t.Ee=[];const e=new Set;for(const n of t.explicitOrderBy)t.Ee.push(n),e.add(n.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new SortedSet(FieldPath$1.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ee.push(new OrderBy(r,n))}),e.has(FieldPath$1.keyField().canonicalString())||t.Ee.push(new OrderBy(FieldPath$1.keyField(),n))}return t.Ee}function __PRIVATE_queryToTarget(e){const t=__PRIVATE_debugCast(e);return t.Ie||(t.Ie=__PRIVATE__queryToTarget(t,__PRIVATE_queryNormalizedOrderBy(e))),t.Ie}function __PRIVATE_queryToAggregateTarget(e){const t=__PRIVATE_debugCast(e);return t.Re||(t.Re=__PRIVATE__queryToTarget(t,e.explicitOrderBy)),t.Re}function __PRIVATE__queryToTarget(e,t){if("F"===e.limitType)return __PRIVATE_newTarget(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new OrderBy(e.field,t)});const n=e.endAt?new Bound(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Bound(e.startAt.position,e.startAt.inclusive):null;return __PRIVATE_newTarget(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function __PRIVATE_queryWithAddedFilter(e,t){const n=e.filters.concat([t]);return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function __PRIVATE_queryWithAddedOrderBy(e,t){const n=e.explicitOrderBy.concat([t]);return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function __PRIVATE_queryWithLimit(e,t,n){return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function __PRIVATE_queryWithStartAt(e,t){return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function __PRIVATE_queryWithEndAt(e,t){return new __PRIVATE_QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function __PRIVATE_queryEquals(e,t){return __PRIVATE_targetEquals(__PRIVATE_queryToTarget(e),__PRIVATE_queryToTarget(t))&&e.limitType===t.limitType}function __PRIVATE_canonifyQuery(e){return`${__PRIVATE_canonifyTarget(__PRIVATE_queryToTarget(e))}|lt:${e.limitType}`}function __PRIVATE_stringifyQuery(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>__PRIVATE_stringifyFilter(e)).join(", ")}]`),__PRIVATE_isNullOrUndefined(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>canonicalId(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>canonicalId(e)).join(",")),`Target(${t})`}(__PRIVATE_queryToTarget(e))}; limitType=${e.limitType})`}function __PRIVATE_queryMatches(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):DocumentKey.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of __PRIVATE_queryNormalizedOrderBy(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=__PRIVATE_boundCompareToDocument(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,__PRIVATE_queryNormalizedOrderBy(e),t)||e.endAt&&!function(e,t,n){const r=__PRIVATE_boundCompareToDocument(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,__PRIVATE_queryNormalizedOrderBy(e),t))}(e,t)}function __PRIVATE_queryCollectionGroup(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function __PRIVATE_newQueryComparator(e){return(t,n)=>{let r=!1;for(const s of __PRIVATE_queryNormalizedOrderBy(e)){const e=__PRIVATE_compareDocs(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function __PRIVATE_compareDocs(e,t,n){const r=e.field.isKeyField()?DocumentKey.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?__PRIVATE_valueCompare(r,s):fail(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return fail(19790,{direction:e.dir})}}
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
 */class ObjectMap{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){forEach(this.inner,(t,n)=>{for(const[t,r]of n)e(t,r)})}isEmpty(){return isEmpty(this.inner)}size(){return this.innerSize}}
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
 */const It=new SortedMap(DocumentKey.comparator);function __PRIVATE_mutableDocumentMap(){return It}const Et=new SortedMap(DocumentKey.comparator);function documentMap(...e){let t=Et;for(const n of e)t=t.insert(n.key,n);return t}function __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e){let t=Et;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function __PRIVATE_newOverlayMap(){return __PRIVATE_newDocumentKeyMap()}function __PRIVATE_newMutationMap(){return __PRIVATE_newDocumentKeyMap()}function __PRIVATE_newDocumentKeyMap(){return new ObjectMap(e=>e.toString(),(e,t)=>e.isEqual(t))}const Rt=new SortedMap(DocumentKey.comparator),At=new SortedSet(DocumentKey.comparator);function __PRIVATE_documentKeySet(...e){let t=At;for(const n of e)t=t.add(n);return t}const Vt=new SortedSet(__PRIVATE_primitiveComparator);function __PRIVATE_targetIdSet(){return Vt}
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
 */class TransformOperation{constructor(){this._=void 0}}function __PRIVATE_applyTransformOperationToLocalView(e,t,n){return e instanceof __PRIVATE_ServerTimestampTransform?function(e,t){const n={fields:{[it]:{stringValue:rt},[ot]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&__PRIVATE_isServerTimestamp(t)&&(t=__PRIVATE_getPreviousValue(t)),t&&(n.fields[st]=t),{mapValue:n}}(n,t):e instanceof __PRIVATE_ArrayUnionTransformOperation?__PRIVATE_applyArrayUnionTransformOperation(e,t):e instanceof __PRIVATE_ArrayRemoveTransformOperation?__PRIVATE_applyArrayRemoveTransformOperation(e,t):function(e,t){const n=__PRIVATE_computeTransformOperationBaseValue(e,t),r=asNumber(n)+asNumber(e.Ae);return isInteger(n)&&isInteger(e.Ae)?__PRIVATE_toInteger(r):__PRIVATE_toDouble(e.serializer,r)}(e,t)}function __PRIVATE_applyTransformOperationToRemoteDocument(e,t,n){return e instanceof __PRIVATE_ArrayUnionTransformOperation?__PRIVATE_applyArrayUnionTransformOperation(e,t):e instanceof __PRIVATE_ArrayRemoveTransformOperation?__PRIVATE_applyArrayRemoveTransformOperation(e,t):n}function __PRIVATE_computeTransformOperationBaseValue(e,t){return e instanceof __PRIVATE_NumericIncrementTransformOperation?function(e){return isInteger(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class __PRIVATE_ServerTimestampTransform extends TransformOperation{}class __PRIVATE_ArrayUnionTransformOperation extends TransformOperation{constructor(e){super(),this.elements=e}}function __PRIVATE_applyArrayUnionTransformOperation(e,t){const n=__PRIVATE_coercedFieldValuesArray(t);for(const t of e.elements)n.some(e=>__PRIVATE_valueEquals(e,t))||n.push(t);return{arrayValue:{values:n}}}class __PRIVATE_ArrayRemoveTransformOperation extends TransformOperation{constructor(e){super(),this.elements=e}}function __PRIVATE_applyArrayRemoveTransformOperation(e,t){let n=__PRIVATE_coercedFieldValuesArray(t);for(const t of e.elements)n=n.filter(e=>!__PRIVATE_valueEquals(e,t));return{arrayValue:{values:n}}}class __PRIVATE_NumericIncrementTransformOperation extends TransformOperation{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function asNumber(e){return __PRIVATE_normalizeNumber(e.integerValue||e.doubleValue)}function __PRIVATE_coercedFieldValuesArray(e){return isArray(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
 */class FieldTransform{constructor(e,t){this.field=e,this.transform=t}}function __PRIVATE_fieldTransformEquals(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof __PRIVATE_ArrayUnionTransformOperation&&t instanceof __PRIVATE_ArrayUnionTransformOperation||e instanceof __PRIVATE_ArrayRemoveTransformOperation&&t instanceof __PRIVATE_ArrayRemoveTransformOperation?__PRIVATE_arrayEquals(e.elements,t.elements,__PRIVATE_valueEquals):e instanceof __PRIVATE_NumericIncrementTransformOperation&&t instanceof __PRIVATE_NumericIncrementTransformOperation?__PRIVATE_valueEquals(e.Ae,t.Ae):e instanceof __PRIVATE_ServerTimestampTransform&&t instanceof __PRIVATE_ServerTimestampTransform}(e.transform,t.transform)}class MutationResult{constructor(e,t){this.version=e,this.transformResults=t}}class Precondition{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Precondition}static exists(e){return new Precondition(void 0,e)}static updateTime(e){return new Precondition(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function __PRIVATE_preconditionIsValidForDocument(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Mutation{}function __PRIVATE_calculateOverlayMutation(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new __PRIVATE_DeleteMutation(e.key,Precondition.none()):new __PRIVATE_SetMutation(e.key,e.data,Precondition.none());{const n=e.data,r=ObjectValue.empty();let s=new SortedSet(FieldPath$1.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new __PRIVATE_PatchMutation(e.key,r,new FieldMask(s.toArray()),Precondition.none())}}function __PRIVATE_mutationApplyToRemoteDocument(e,t,n){e instanceof __PRIVATE_SetMutation?function(e,t,n){const r=e.value.clone(),s=__PRIVATE_serverTransformResults(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof __PRIVATE_PatchMutation?function(e,t,n){if(!__PRIVATE_preconditionIsValidForDocument(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=__PRIVATE_serverTransformResults(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(__PRIVATE_getPatch(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function __PRIVATE_mutationApplyToLocalView(e,t,n,r){return e instanceof __PRIVATE_SetMutation?function(e,t,n,r){if(!__PRIVATE_preconditionIsValidForDocument(e.precondition,t))return n;const s=e.value.clone(),i=__PRIVATE_localTransformResults(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof __PRIVATE_PatchMutation?function(e,t,n,r){if(!__PRIVATE_preconditionIsValidForDocument(e.precondition,t))return n;const s=__PRIVATE_localTransformResults(e.fieldTransforms,r,t),i=t.data;return i.setAll(__PRIVATE_getPatch(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return __PRIVATE_preconditionIsValidForDocument(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function __PRIVATE_mutationExtractBaseValue(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=__PRIVATE_computeTransformOperationBaseValue(r.transform,e||null);null!=s&&(null===n&&(n=ObjectValue.empty()),n.set(r.field,s))}return n||null}function __PRIVATE_mutationEquals(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&__PRIVATE_arrayEquals(e,t,(e,t)=>__PRIVATE_fieldTransformEquals(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class __PRIVATE_SetMutation extends Mutation{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class __PRIVATE_PatchMutation extends Mutation{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function __PRIVATE_getPatch(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function __PRIVATE_serverTransformResults(e,t,n){const r=new Map;__PRIVATE_hardAssert(e.length===n.length,32656,{Ve:n.length,de:e.length});for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,__PRIVATE_applyTransformOperationToRemoteDocument(o,a,n[s]))}return r}function __PRIVATE_localTransformResults(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,__PRIVATE_applyTransformOperationToLocalView(e,i,t))}return r}class __PRIVATE_DeleteMutation extends Mutation{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class __PRIVATE_VerifyMutation extends Mutation{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class MutationBatch{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];r.key.isEqual(e.key)&&__PRIVATE_mutationApplyToRemoteDocument(r,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=__PRIVATE_mutationApplyToLocalView(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=__PRIVATE_mutationApplyToLocalView(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=__PRIVATE_newMutationMap();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(r.key)?null:o;const a=__PRIVATE_calculateOverlayMutation(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(SnapshotVersion.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),__PRIVATE_documentKeySet())}isEqual(e){return this.batchId===e.batchId&&__PRIVATE_arrayEquals(this.mutations,e.mutations,(e,t)=>__PRIVATE_mutationEquals(e,t))&&__PRIVATE_arrayEquals(this.baseMutations,e.baseMutations,(e,t)=>__PRIVATE_mutationEquals(e,t))}}class MutationBatchResult{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){__PRIVATE_hardAssert(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=Rt;const s=e.mutations;for(let e=0;e<s.length;e++)r=r.insert(s[e].key,n[e].version);return new MutationBatchResult(e,t,n,r)}}
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
 */class __PRIVATE_AggregateImpl{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n
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
 */}}var dt,mt;function __PRIVATE_isPermanentError(e){switch(e){case v.OK:return fail(64938);case v.CANCELLED:case v.UNKNOWN:case v.DEADLINE_EXCEEDED:case v.RESOURCE_EXHAUSTED:case v.INTERNAL:case v.UNAVAILABLE:case v.UNAUTHENTICATED:return!1;case v.INVALID_ARGUMENT:case v.NOT_FOUND:case v.ALREADY_EXISTS:case v.PERMISSION_DENIED:case v.FAILED_PRECONDITION:case v.ABORTED:case v.OUT_OF_RANGE:case v.UNIMPLEMENTED:case v.DATA_LOSS:return!0;default:return fail(15467,{code:e})}}function __PRIVATE_mapCodeFromRpcCode(e){if(void 0===e)return __PRIVATE_logError("GRPC error has no .code"),v.UNKNOWN;switch(e){case dt.OK:return v.OK;case dt.CANCELLED:return v.CANCELLED;case dt.UNKNOWN:return v.UNKNOWN;case dt.DEADLINE_EXCEEDED:return v.DEADLINE_EXCEEDED;case dt.RESOURCE_EXHAUSTED:return v.RESOURCE_EXHAUSTED;case dt.INTERNAL:return v.INTERNAL;case dt.UNAVAILABLE:return v.UNAVAILABLE;case dt.UNAUTHENTICATED:return v.UNAUTHENTICATED;case dt.INVALID_ARGUMENT:return v.INVALID_ARGUMENT;case dt.NOT_FOUND:return v.NOT_FOUND;case dt.ALREADY_EXISTS:return v.ALREADY_EXISTS;case dt.PERMISSION_DENIED:return v.PERMISSION_DENIED;case dt.FAILED_PRECONDITION:return v.FAILED_PRECONDITION;case dt.ABORTED:return v.ABORTED;case dt.OUT_OF_RANGE:return v.OUT_OF_RANGE;case dt.UNIMPLEMENTED:return v.UNIMPLEMENTED;case dt.DATA_LOSS:return v.DATA_LOSS;default:return fail(39323,{code:e})}}(mt=dt||(dt={}))[mt.OK=0]="OK",mt[mt.CANCELLED=1]="CANCELLED",mt[mt.UNKNOWN=2]="UNKNOWN",mt[mt.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",mt[mt.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",mt[mt.NOT_FOUND=5]="NOT_FOUND",mt[mt.ALREADY_EXISTS=6]="ALREADY_EXISTS",mt[mt.PERMISSION_DENIED=7]="PERMISSION_DENIED",mt[mt.UNAUTHENTICATED=16]="UNAUTHENTICATED",mt[mt.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",mt[mt.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",mt[mt.ABORTED=10]="ABORTED",mt[mt.OUT_OF_RANGE=11]="OUT_OF_RANGE",mt[mt.UNIMPLEMENTED=12]="UNIMPLEMENTED",mt[mt.INTERNAL=13]="INTERNAL",mt[mt.UNAVAILABLE=14]="UNAVAILABLE",mt[mt.DATA_LOSS=15]="DATA_LOSS";
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
let ft=null;function __PRIVATE_setTestingHooksSpi(e){if(ft)throw new Error("a TestingHooksSpi instance is already set");ft=e}
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
 */const gt=new R([4294967295,4294967295],0);function __PRIVATE_getMd5HashValue(e){const t=__PRIVATE_newTextEncoder().encode(e),n=new A;return n.update(t),new Uint8Array(n.digest())}function __PRIVATE_get64BitUints(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new R([n,r],0),new R([s,i],0)]}class BloomFilter{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new __PRIVATE_BloomFilterError(`Invalid padding: ${t}`);if(n<0)throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new __PRIVATE_BloomFilterError(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=R.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(R.fromNumber(n)));return 1===r.compare(gt)&&(r=new R([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=__PRIVATE_getMd5HashValue(e),[n,r]=__PRIVATE_get64BitUints(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(n,r,e);if(!this.we(t))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new BloomFilter(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=__PRIVATE_getMd5HashValue(e),[n,r]=__PRIVATE_get64BitUints(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(n,r,e);this.Se(t)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class __PRIVATE_BloomFilterError extends Error{constructor(){super(...arguments),this.name="BloomFilterError"
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
 */}}class RemoteEvent{constructor(e,t,n,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,TargetChange.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new RemoteEvent(SnapshotVersion.min(),r,new SortedMap(__PRIVATE_primitiveComparator),__PRIVATE_mutableDocumentMap(),__PRIVATE_documentKeySet())}}class TargetChange{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new TargetChange(n,t,__PRIVATE_documentKeySet(),__PRIVATE_documentKeySet(),__PRIVATE_documentKeySet())}}
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
 */class __PRIVATE_DocumentWatchChange{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class __PRIVATE_ExistenceFilterChange{constructor(e,t){this.targetId=e,this.Ce=t}}class __PRIVATE_WatchTargetChange{constructor(e,t,n=ByteString.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class __PRIVATE_TargetState{constructor(){this.ve=0,this.Fe=__PRIVATE_snapshotChangesMap(),this.Me=ByteString.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=__PRIVATE_documentKeySet(),t=__PRIVATE_documentKeySet(),n=__PRIVATE_documentKeySet();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:fail(38017,{changeType:s})}}),new TargetChange(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=__PRIVATE_snapshotChangesMap()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,__PRIVATE_hardAssert(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class __PRIVATE_WatchChangeAggregator{constructor(e){this.Ge=e,this.ze=new Map,this.je=__PRIVATE_mutableDocumentMap(),this.Je=__PRIVATE_documentTargetMap(),this.He=__PRIVATE_documentTargetMap(),this.Ze=new SortedMap(__PRIVATE_primitiveComparator)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:fail(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const s=r.target;if(__PRIVATE_targetIsDocumentTarget(s))if(0===n){const e=new DocumentKey(s.path);this.et(t,e,MutableDocument.newNoDocument(e,SnapshotVersion.min()))}else __PRIVATE_hardAssert(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),s=n?this.ct(n,e,r):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,e)}ft?.o(function(e,t,n,r,s){const i={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(i.bloomFilter={applied:0===s,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),i}
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
 */(r,e.Ce,this.Ge.ht(),n,s))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,o;try{i=__PRIVATE_normalizeByteString(n).toUint8Array()}catch(e){if(e instanceof __PRIVATE_Base64DecodeError)return __PRIVATE_logWarn("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new BloomFilter(i,r,s)}catch(e){return __PRIVATE_logWarn(e instanceof __PRIVATE_BloomFilterError?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const s=this.ot(r);if(s){if(n.current&&__PRIVATE_targetIsDocumentTarget(s.target)){const t=new DocumentKey(s.target.path);this.Et(t).has(r)||this.It(r,t)||this.et(r,t,MutableDocument.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=__PRIVATE_documentKeySet();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new RemoteEvent(e,t,this.Ze,this.je,n);return this.je=__PRIVATE_mutableDocumentMap(),this.Je=__PRIVATE_documentTargetMap(),this.He=__PRIVATE_documentTargetMap(),this.Ze=new SortedMap(__PRIVATE_primitiveComparator),r}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.It(e,t)?r.Ke(t,1):r.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new __PRIVATE_TargetState,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new SortedSet(__PRIVATE_primitiveComparator),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new SortedSet(__PRIVATE_primitiveComparator),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||__PRIVATE_logDebug("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new __PRIVATE_TargetState),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function __PRIVATE_documentTargetMap(){return new SortedMap(DocumentKey.comparator)}function __PRIVATE_snapshotChangesMap(){return new SortedMap(DocumentKey.comparator)}const pt={asc:"ASCENDING",desc:"DESCENDING"},yt={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},wt={and:"AND",or:"OR"};class JsonProtoSerializer{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function __PRIVATE_toInt32Proto(e,t){return e.useProto3Json||__PRIVATE_isNullOrUndefined(t)?t:{value:t}}function toTimestamp(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function __PRIVATE_toBytes(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function __PRIVATE_toVersion(e,t){return toTimestamp(e,t.toTimestamp())}function __PRIVATE_fromVersion(e){return __PRIVATE_hardAssert(!!e,49232),SnapshotVersion.fromTimestamp(function(e){const t=__PRIVATE_normalizeTimestamp(e);return new Timestamp(t.seconds,t.nanos)}(e))}function __PRIVATE_toResourceName(e,t){return __PRIVATE_toResourcePath(e,t).canonicalString()}function __PRIVATE_toResourcePath(e,t){const n=function(e){return new ResourcePath(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function __PRIVATE_fromResourceName(e){const t=ResourcePath.fromString(e);return __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(t),10190,{key:t.toString()}),t}function __PRIVATE_toName(e,t){return __PRIVATE_toResourceName(e.databaseId,t.path)}function fromName(e,t){const n=__PRIVATE_fromResourceName(t);if(n.get(1)!==e.databaseId.projectId)throw new FirestoreError(v.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new FirestoreError(v.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new DocumentKey(__PRIVATE_extractLocalPathFromResourceName(n))}function __PRIVATE_toQueryPath(e,t){return __PRIVATE_toResourceName(e.databaseId,t)}function __PRIVATE_fromQueryPath(e){const t=__PRIVATE_fromResourceName(e);return 4===t.length?ResourcePath.emptyPath():__PRIVATE_extractLocalPathFromResourceName(t)}function __PRIVATE_getEncodedDatabaseId(e){return new ResourcePath(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function __PRIVATE_extractLocalPathFromResourceName(e){return __PRIVATE_hardAssert(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function __PRIVATE_toMutationDocument(e,t,n){return{name:__PRIVATE_toName(e,t),fields:n.value.mapValue.fields}}function __PRIVATE_fromPipelineResponse(e,t,n){const r={};t.transaction?.length&&(r.transaction=t.transaction);const s=t.executionTime?__PRIVATE_fromVersion(t.executionTime):void 0;return r.executionTime=s,n&&(r.key=n.name?fromName(e,n.name):void 0,r.fields=new ObjectValue({mapValue:{fields:n.fields}}),r.createTime=n.createTime?__PRIVATE_fromVersion(n.createTime):void 0,r.updateTime=n.updateTime?__PRIVATE_fromVersion(n.updateTime):void 0),r}function __PRIVATE_fromDocument(e,t,n){const r=fromName(e,t.name),s=__PRIVATE_fromVersion(t.updateTime),i=t.createTime?__PRIVATE_fromVersion(t.createTime):SnapshotVersion.min(),o=new ObjectValue({mapValue:{fields:t.fields}}),a=MutableDocument.newFoundDocument(r,s,i,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function __PRIVATE_fromBatchGetDocumentsResponse(e,t){return"found"in t?function(e,t){__PRIVATE_hardAssert(!!t.found,43571),t.found.name,t.found.updateTime;const n=fromName(e,t.found.name),r=__PRIVATE_fromVersion(t.found.updateTime),s=t.found.createTime?__PRIVATE_fromVersion(t.found.createTime):SnapshotVersion.min(),i=new ObjectValue({mapValue:{fields:t.found.fields}});return MutableDocument.newFoundDocument(n,r,s,i)}(e,t):"missing"in t?function(e,t){__PRIVATE_hardAssert(!!t.missing,3894),__PRIVATE_hardAssert(!!t.readTime,22933);const n=fromName(e,t.missing),r=__PRIVATE_fromVersion(t.readTime);return MutableDocument.newNoDocument(n,r)}(e,t):fail(7234,{result:t})}function __PRIVATE_fromWatchChange(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:fail(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(e,t){return e.useProto3Json?(__PRIVATE_hardAssert(void 0===t||"string"==typeof t,58123),ByteString.fromBase64String(t||"")):(__PRIVATE_hardAssert(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),ByteString.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?v.UNKNOWN:__PRIVATE_mapCodeFromRpcCode(e.code);return new FirestoreError(t,e.message||"")}(o);n=new __PRIVATE_WatchTargetChange(r,s,i,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=fromName(e,r.document.name),i=__PRIVATE_fromVersion(r.document.updateTime),o=r.document.createTime?__PRIVATE_fromVersion(r.document.createTime):SnapshotVersion.min(),a=new ObjectValue({mapValue:{fields:r.document.fields}}),c=MutableDocument.newFoundDocument(s,i,o,a),u=r.targetIds||[],_=r.removedTargetIds||[];n=new __PRIVATE_DocumentWatchChange(u,_,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=fromName(e,r.document),i=r.readTime?__PRIVATE_fromVersion(r.readTime):SnapshotVersion.min(),o=MutableDocument.newNoDocument(s,i),a=r.removedTargetIds||[];n=new __PRIVATE_DocumentWatchChange([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=fromName(e,r.document),i=r.removedTargetIds||[];n=new __PRIVATE_DocumentWatchChange([],i,s,null)}else{if(!("filter"in t))return fail(11601,{Vt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new ExistenceFilter(r,s),o=e.targetId;n=new __PRIVATE_ExistenceFilterChange(o,i)}}return n}function toMutation(e,t){let n;if(t instanceof __PRIVATE_SetMutation)n={update:__PRIVATE_toMutationDocument(e,t.key,t.value)};else if(t instanceof __PRIVATE_DeleteMutation)n={delete:__PRIVATE_toName(e,t.key)};else if(t instanceof __PRIVATE_PatchMutation)n={update:__PRIVATE_toMutationDocument(e,t.key,t.data),updateMask:__PRIVATE_toDocumentMask(t.fieldMask)};else{if(!(t instanceof __PRIVATE_VerifyMutation))return fail(16599,{dt:t.type});n={verify:__PRIVATE_toName(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof __PRIVATE_ServerTimestampTransform)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof __PRIVATE_ArrayUnionTransformOperation)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof __PRIVATE_ArrayRemoveTransformOperation)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof __PRIVATE_NumericIncrementTransformOperation)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw fail(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:__PRIVATE_toVersion(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:fail(27497)}(e,t.precondition)),n}function __PRIVATE_fromMutation(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?Precondition.updateTime(__PRIVATE_fromVersion(e.updateTime)):void 0!==e.exists?Precondition.exists(e.exists):Precondition.none()}(t.currentDocument):Precondition.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)__PRIVATE_hardAssert("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new __PRIVATE_ServerTimestampTransform;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new __PRIVATE_ArrayUnionTransformOperation(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new __PRIVATE_ArrayRemoveTransformOperation(e)}else"increment"in t?n=new __PRIVATE_NumericIncrementTransformOperation(e,t.increment):fail(16584,{proto:t});const r=FieldPath$1.fromServerFormat(t.fieldPath);return new FieldTransform(r,n)}(e,t)):[];if(t.update){t.update.name;const s=fromName(e,t.update.name),i=new ObjectValue({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new FieldMask(t.map(e=>FieldPath$1.fromServerFormat(e)))}(t.updateMask);return new __PRIVATE_PatchMutation(s,i,e,n,r)}return new __PRIVATE_SetMutation(s,i,n,r)}if(t.delete){const r=fromName(e,t.delete);return new __PRIVATE_DeleteMutation(r,n)}if(t.verify){const r=fromName(e,t.verify);return new __PRIVATE_VerifyMutation(r,n)}return fail(1463,{proto:t})}function __PRIVATE_fromWriteResults(e,t){return e&&e.length>0?(__PRIVATE_hardAssert(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?__PRIVATE_fromVersion(e.updateTime):__PRIVATE_fromVersion(t);return n.isEqual(SnapshotVersion.min())&&(n=__PRIVATE_fromVersion(t)),new MutationResult(n,e.transformResults||[])}(e,t))):[]}function __PRIVATE_toDocumentsTarget(e,t){return{documents:[__PRIVATE_toQueryPath(e,t.path)]}}function __PRIVATE_toQueryTarget(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=__PRIVATE_toQueryPath(e,s);const i=function(e){if(0!==e.length)return __PRIVATE_toFilter(CompositeFilter.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:__PRIVATE_toFieldPathReference(e.field),direction:__PRIVATE_toDirection(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=__PRIVATE_toInt32Proto(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:s}}function __PRIVATE_toRunAggregationQueryRequest(e,t,n,r){const{ft:s,parent:i}=__PRIVATE_toQueryTarget(e,t),o={},a=[];let c=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+c++;o[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:__PRIVATE_toFieldPathReference(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:__PRIVATE_toFieldPathReference(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function __PRIVATE_convertQueryTargetToQuery(e){let t=__PRIVATE_fromQueryPath(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){__PRIVATE_hardAssert(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=__PRIVATE_fromFilter(e);return t instanceof CompositeFilter&&__PRIVATE_compositeFilterIsFlatConjunction(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new OrderBy(__PRIVATE_fromFieldPathReference(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,__PRIVATE_isNullOrUndefined(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Bound(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Bound(n,t)}(n.endAt)),__PRIVATE_newQuery(t,s,o,i,a,"F",c,u)}function __PRIVATE_toListenRequestLabels(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return fail(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}function __PRIVATE_fromFilter(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=__PRIVATE_fromFieldPathReference(e.unaryFilter.field);return FieldFilter.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return fail(61313);default:return fail(60726)}}(e):void 0!==e.fieldFilter?function(e){return FieldFilter.create(__PRIVATE_fromFieldPathReference(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return fail(58110);default:return fail(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return CompositeFilter.create(e.compositeFilter.filters.map(e=>__PRIVATE_fromFilter(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return fail(1026)}}(e.compositeFilter.op))}(e):fail(30097,{filter:e})}function __PRIVATE_toDirection(e){return pt[e]}function __PRIVATE_toOperatorName(e){return yt[e]}function __PRIVATE_toCompositeOperatorName(e){return wt[e]}function __PRIVATE_toFieldPathReference(e){return{fieldPath:e.canonicalString()}}function __PRIVATE_fromFieldPathReference(e){return FieldPath$1.fromServerFormat(e.fieldPath)}function __PRIVATE_toFilter(e){return e instanceof FieldFilter?function(e){if("=="===e.op){if(__PRIVATE_isNanValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NAN"}};if(__PRIVATE_isNullValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(__PRIVATE_isNanValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NOT_NAN"}};if(__PRIVATE_isNullValue(e.value))return{unaryFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:__PRIVATE_toFieldPathReference(e.field),op:__PRIVATE_toOperatorName(e.op),value:e.value}}}(e):e instanceof CompositeFilter?function(e){const t=e.getFilters().map(e=>__PRIVATE_toFilter(e));return 1===t.length?t[0]:{compositeFilter:{op:__PRIVATE_toCompositeOperatorName(e.op),filters:t}}}(e):fail(54877,{filter:e})}function __PRIVATE_toDocumentMask(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function __PRIVATE_isValidResourceName(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function __PRIVATE_isProtoValueSerializable(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function __PRIVATE_toMapValue(e,t){const n={fields:{}};return t.forEach((t,r)=>{if("string"!=typeof r)throw new Error(`Cannot encode map with non-string key: ${r}`);n.fields[r]=t._toProto(e)}),{mapValue:n}}function __PRIVATE_toStringValue(e){return{stringValue:e}}function __PRIVATE_toPipelineValue(e){return{pipelineValue:e}}
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
 */class TargetData{constructor(e,t,n,r,s=SnapshotVersion.min(),i=SnapshotVersion.min(),o=ByteString.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new TargetData(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new TargetData(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new TargetData(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new TargetData(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
 */class __PRIVATE_LocalSerializer{constructor(e){this.yt=e}}function __PRIVATE_fromDbRemoteDocument(e,t){let n;if(t.document)n=__PRIVATE_fromDocument(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=DocumentKey.fromSegments(t.noDocument.path),r=__PRIVATE_fromDbTimestamp(t.noDocument.readTime);n=MutableDocument.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return fail(56709);{const e=DocumentKey.fromSegments(t.unknownDocument.path),r=__PRIVATE_fromDbTimestamp(t.unknownDocument.version);n=MutableDocument.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new Timestamp(e[0],e[1]);return SnapshotVersion.fromTimestamp(t)}(t.readTime)),n}function __PRIVATE_toDbRemoteDocument(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:__PRIVATE_toDbTimestampKey(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:__PRIVATE_toName(e,t.key),fields:t.data.value.mapValue.fields,updateTime:toTimestamp(e,t.version.toTimestamp()),createTime:toTimestamp(e,t.createTime.toTimestamp())}}(e.yt,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:__PRIVATE_toDbTimestamp(t.version)};else{if(!t.isUnknownDocument())return fail(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:__PRIVATE_toDbTimestamp(t.version)}}return r}function __PRIVATE_toDbTimestampKey(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function __PRIVATE_toDbTimestamp(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function __PRIVATE_fromDbTimestamp(e){const t=new Timestamp(e.seconds,e.nanoseconds);return SnapshotVersion.fromTimestamp(t)}function __PRIVATE_fromDbMutationBatch(e,t){const n=(t.baseMutations||[]).map(t=>__PRIVATE_fromMutation(e.yt,t));for(let e=0;e<t.mutations.length-1;++e){const n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const r=t.mutations.map(t=>__PRIVATE_fromMutation(e.yt,t)),s=Timestamp.fromMillis(t.localWriteTimeMs);return new MutationBatch(t.batchId,s,n,r)}function __PRIVATE_fromDbTarget(e){const t=__PRIVATE_fromDbTimestamp(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?__PRIVATE_fromDbTimestamp(e.lastLimboFreeSnapshotVersion):SnapshotVersion.min();let r;return r=function(e){return void 0!==e.documents}(e.query)?function(e){const t=e.documents.length;return __PRIVATE_hardAssert(1===t,1966,{count:t}),__PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(__PRIVATE_fromQueryPath(e.documents[0])))}(e.query):function(e){return __PRIVATE_queryToTarget(__PRIVATE_convertQueryTargetToQuery(e))}(e.query),new TargetData(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,ByteString.fromBase64String(e.resumeToken))}function __PRIVATE_toDbTarget(e,t){const n=__PRIVATE_toDbTimestamp(t.snapshotVersion),r=__PRIVATE_toDbTimestamp(t.lastLimboFreeSnapshotVersion);let s;s=__PRIVATE_targetIsDocumentTarget(t.target)?__PRIVATE_toDocumentsTarget(e.yt,t.target):__PRIVATE_toQueryTarget(e.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:__PRIVATE_canonifyTarget(t.target),readTime:n,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function __PRIVATE_fromBundledQuery(e){const t=__PRIVATE_convertQueryTargetToQuery({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?__PRIVATE_queryWithLimit(t,t.limit,"L"):t}function __PRIVATE_fromDbDocumentOverlay(e,t){return new Overlay(t.largestBatchId,__PRIVATE_fromMutation(e.yt,t.overlayMutation))}function __PRIVATE_toDbDocumentOverlayKey(e,t){const n=t.path.lastSegment();return[e,__PRIVATE_encodeResourcePath(t.path.popLast()),n]}function __PRIVATE_toDbIndexState(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:__PRIVATE_toDbTimestamp(r.readTime),documentKey:__PRIVATE_encodeResourcePath(r.documentKey.path),largestBatchId:r.largestBatchId}}
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
 */class __PRIVATE_IndexedDbBundleCache{getBundleMetadata(e,t){return __PRIVATE_bundlesStore(e).get(t).next(e=>{if(e)return function(e){return{id:e.bundleId,createTime:__PRIVATE_fromDbTimestamp(e.createTime),version:e.version}}(e)})}saveBundleMetadata(e,t){return __PRIVATE_bundlesStore(e).put(function(e){return{bundleId:e.id,createTime:__PRIVATE_toDbTimestamp(__PRIVATE_fromVersion(e.createTime)),version:e.version}}(t))}getNamedQuery(e,t){return __PRIVATE_namedQueriesStore(e).get(t).next(e=>{if(e)return function(e){return{name:e.name,query:__PRIVATE_fromBundledQuery(e.bundledQuery),readTime:__PRIVATE_fromDbTimestamp(e.readTime)}}(e)})}saveNamedQuery(e,t){return __PRIVATE_namedQueriesStore(e).put(function(e){return{name:e.name,readTime:__PRIVATE_toDbTimestamp(__PRIVATE_fromVersion(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function __PRIVATE_bundlesStore(e){return __PRIVATE_getStore(e,ge)}function __PRIVATE_namedQueriesStore(e){return __PRIVATE_getStore(e,ye)}
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
 */class __PRIVATE_IndexedDbDocumentOverlayCache{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new __PRIVATE_IndexedDbDocumentOverlayCache(e,n)}getOverlay(e,t){return __PRIVATE_documentOverlayStore(e).get(__PRIVATE_toDbDocumentOverlayKey(this.userId,t)).next(e=>e?__PRIVATE_fromDbDocumentOverlay(this.serializer,e):null)}getOverlays(e,t){const n=__PRIVATE_newOverlayMap();return PersistencePromise.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,s)=>{const i=new Overlay(t,s);r.push(this.St(e,i))}),PersistencePromise.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(__PRIVATE_encodeResourcePath(e.getCollectionPath())));const s=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);s.push(__PRIVATE_documentOverlayStore(e).X(qe,r))}),PersistencePromise.waitFor(s)}getOverlaysForCollection(e,t,n){const r=__PRIVATE_newOverlayMap(),s=__PRIVATE_encodeResourcePath(t),i=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return __PRIVATE_documentOverlayStore(e).J(qe,i).next(e=>{for(const t of e){const e=__PRIVATE_fromDbDocumentOverlay(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const s=__PRIVATE_newOverlayMap();let i;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return __PRIVATE_documentOverlayStore(e).ee({index:$e,range:o},(e,t,n)=>{const o=__PRIVATE_fromDbDocumentOverlay(this.serializer,t);s.size()<r||o.largestBatchId===i?(s.set(o.getKey(),o),i=o.largestBatchId):n.done()}).next(()=>s)}St(e,t){return __PRIVATE_documentOverlayStore(e).put(function(e,t,n){const[r,s,i]=__PRIVATE_toDbDocumentOverlayKey(t,n.mutation.key);return{userId:t,collectionPath:s,documentId:i,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:toMutation(e.yt,n.mutation)}}(this.serializer,this.userId,t))}}function __PRIVATE_documentOverlayStore(e){return __PRIVATE_getStore(e,ke)}
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
 */class __PRIVATE_IndexedDbGlobalsCache{bt(e){return __PRIVATE_getStore(e,Qe)}getSessionToken(e){return this.bt(e).get("sessionToken").next(e=>{const t=e?.value;return t?ByteString.fromUint8Array(t):ByteString.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}
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
 */class __PRIVATE_FirestoreIndexValueWriter{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(__PRIVATE_normalizeNumber(e.integerValue));else if("doubleValue"in e){const n=__PRIVATE_normalizeNumber(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),__PRIVATE_isNegativeZero(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=__PRIVATE_normalizeTimestamp(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(__PRIVATE_normalizeByteString(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?__PRIVATE_isMaxValue(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):__PRIVATE_isVectorValue(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):fail(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const e of Object.keys(n))this.Ot(e,t),this.Ct(n[e],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const r=ht,s=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(__PRIVATE_normalizeNumber(s)),this.Ot(r,t),this.Ct(n[r],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const e of n)this.Ct(e,t)}Lt(e,t){this.Ft(t,37),DocumentKey.fromName(e).path.forEach(e=>{this.Ft(t,60),this.$t(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}__PRIVATE_FirestoreIndexValueWriter.Wt=new __PRIVATE_FirestoreIndexValueWriter;
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
const bt=255;function __PRIVATE_numberOfLeadingZerosInByte(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function __PRIVATE_unsignedNumLength(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=__PRIVATE_numberOfLeadingZerosInByte(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class __PRIVATE_OrderedCodeWriter{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{const e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Xt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Jt(e);else if(e<2048)this.Jt(960|e>>>6),this.Jt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Jt(480|e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e);else{const e=t.codePointAt(0);this.Jt(240|e>>>18),this.Jt(128|63&e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e)}}this.Ht()}Yt(e){const t=this.en(e),n=__PRIVATE_unsignedNumLength(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}nn(e){const t=this.en(e),n=__PRIVATE_unsignedNumLength(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}rn(){this.sn(bt),this.sn(255)}_n(){this.an(bt),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Gt(e){const t=255&e;0===t?(this.sn(0),this.sn(255)):t===bt?(this.sn(bt),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;0===t?(this.an(0),this.an(255)):t===bt?(this.an(bt),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class __PRIVATE_AscendingIndexByteEncoder{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class __PRIVATE_DescendingIndexByteEncoder{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class __PRIVATE_IndexByteEncoder{constructor(){this.cn=new __PRIVATE_OrderedCodeWriter,this.ascending=new __PRIVATE_AscendingIndexByteEncoder(this.cn),this.descending=new __PRIVATE_DescendingIndexByteEncoder(this.cn)}seed(e){this.cn.seed(e)}ln(e){return 0===e?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}
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
 */class __PRIVATE_IndexEntry{constructor(e,t,n,r){this.hn=e,this.Pn=t,this.Tn=n,this.En=r}In(){const e=this.En.length,t=0===e||255===this.En[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new __PRIVATE_IndexEntry(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:__PRIVATE_encodeKeySafeBytes(this.Tn),directionalValue:__PRIVATE_encodeKeySafeBytes(this.En),orderedDocumentKey:__PRIVATE_encodeKeySafeBytes(t),documentKey:n.path.toArray()}}An(e,t,n){const r=this.Rn(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function __PRIVATE_indexEntryComparator(e,t){let n=e.hn-t.hn;return 0!==n?n:(n=__PRIVATE_compareByteArrays(e.Tn,t.Tn),0!==n?n:(n=__PRIVATE_compareByteArrays(e.En,t.En),0!==n?n:DocumentKey.comparator(e.Pn,t.Pn)))}function __PRIVATE_compareByteArrays(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function __PRIVATE_encodeKeySafeBytes(e){return u()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function __PRIVATE_decodeKeySafeBytes(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(e)}class __PRIVATE_TargetIndexMatcher{constructor(e){this.Vn=new SortedSet((e,t)=>FieldPath$1.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const e=t;e.isInequality()?this.Vn=this.Vn.add(e):this.mn.push(e)}}get fn(){return this.Vn.size>1}gn(e){if(__PRIVATE_hardAssert(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=__PRIVATE_fieldIndexGetArraySegment(e);if(void 0!==t&&!this.pn(t))return!1;const n=__PRIVATE_fieldIndexGetDirectionalSegments(e);let r=new Set,s=0,i=0;for(;s<n.length&&this.pn(n[s]);++s)r=r.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Vn.size>0){const e=this.Vn.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[s];if(!this.yn(e,t)||!this.wn(this.dn[i++],t))return!1}++s}for(;s<n.length;++s){const e=n[s];if(i>=this.dn.length||!this.wn(this.dn[i++],e))return!1}return!0}Sn(){if(this.fn)return null;let e=new SortedSet(FieldPath$1.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new IndexSegment(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new IndexSegment(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new IndexSegment(n.field,"asc"===n.dir?0:1)));return new FieldIndex(FieldIndex.UNKNOWN_ID,this.collectionId,t,IndexState.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
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
 */function __PRIVATE_computeInExpansion(e){if(__PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,20012),e instanceof FieldFilter){if(e instanceof __PRIVATE_InFilter){const t=e.value.arrayValue?.values?.map(t=>FieldFilter.create(e.field,"==",t))||[];return CompositeFilter.create(t,"or")}return e}const t=e.filters.map(e=>__PRIVATE_computeInExpansion(e));return CompositeFilter.create(t,e.op)}function __PRIVATE_getDnfTerms(e){if(0===e.getFilters().length)return[];const t=__PRIVATE_computeDistributedNormalForm(__PRIVATE_computeInExpansion(e));return __PRIVATE_hardAssert(__PRIVATE_isDisjunctiveNormalForm(t),7391),__PRIVATE_isSingleFieldFilter(t)||__PRIVATE_isFlatConjunction(t)?[t]:t.getFilters()}function __PRIVATE_isSingleFieldFilter(e){return e instanceof FieldFilter}function __PRIVATE_isFlatConjunction(e){return e instanceof CompositeFilter&&__PRIVATE_compositeFilterIsFlatConjunction(e)}function __PRIVATE_isDisjunctiveNormalForm(e){return __PRIVATE_isSingleFieldFilter(e)||__PRIVATE_isFlatConjunction(e)||function(e){if(e instanceof CompositeFilter&&__PRIVATE_compositeFilterIsDisjunction(e)){for(const t of e.getFilters())if(!__PRIVATE_isSingleFieldFilter(t)&&!__PRIVATE_isFlatConjunction(t))return!1;return!0}return!1}(e)}function __PRIVATE_computeDistributedNormalForm(e){if(__PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,34018),e instanceof FieldFilter)return e;if(1===e.filters.length)return __PRIVATE_computeDistributedNormalForm(e.filters[0]);const t=e.filters.map(e=>__PRIVATE_computeDistributedNormalForm(e));let n=CompositeFilter.create(t,e.op);return n=__PRIVATE_applyAssociation(n),__PRIVATE_isDisjunctiveNormalForm(n)?n:(__PRIVATE_hardAssert(n instanceof CompositeFilter,64498),__PRIVATE_hardAssert(__PRIVATE_compositeFilterIsConjunction(n),40251),__PRIVATE_hardAssert(n.filters.length>1,57927),n.filters.reduce((e,t)=>__PRIVATE_applyDistribution(e,t)))}function __PRIVATE_applyDistribution(e,t){let n;return __PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,38388),__PRIVATE_hardAssert(t instanceof FieldFilter||t instanceof CompositeFilter,25473),n=e instanceof FieldFilter?t instanceof FieldFilter?function(e,t){return CompositeFilter.create([e,t],"and")}(e,t):__PRIVATE_applyDistributionFieldAndCompositeFilters(e,t):t instanceof FieldFilter?__PRIVATE_applyDistributionFieldAndCompositeFilters(t,e):function(e,t){if(__PRIVATE_hardAssert(e.filters.length>0&&t.filters.length>0,48005),__PRIVATE_compositeFilterIsConjunction(e)&&__PRIVATE_compositeFilterIsConjunction(t))return __PRIVATE_compositeFilterWithAddedFilters(e,t.getFilters());const n=__PRIVATE_compositeFilterIsDisjunction(e)?e:t,r=__PRIVATE_compositeFilterIsDisjunction(e)?t:e,s=n.filters.map(e=>__PRIVATE_applyDistribution(e,r));return CompositeFilter.create(s,"or")}(e,t),__PRIVATE_applyAssociation(n)}function __PRIVATE_applyDistributionFieldAndCompositeFilters(e,t){if(__PRIVATE_compositeFilterIsConjunction(t))return __PRIVATE_compositeFilterWithAddedFilters(t,e.getFilters());{const n=t.filters.map(t=>__PRIVATE_applyDistribution(e,t));return CompositeFilter.create(n,"or")}}function __PRIVATE_applyAssociation(e){if(__PRIVATE_hardAssert(e instanceof FieldFilter||e instanceof CompositeFilter,11850),e instanceof FieldFilter)return e;const t=e.getFilters();if(1===t.length)return __PRIVATE_applyAssociation(t[0]);if(__PRIVATE_compositeFilterIsFlat(e))return e;const n=t.map(e=>__PRIVATE_applyAssociation(e)),r=[];return n.forEach(t=>{t instanceof FieldFilter?r.push(t):t instanceof CompositeFilter&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:CompositeFilter.create(r,e.op)
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
 */}class __PRIVATE_MemoryIndexManager{constructor(){this.bn=new __PRIVATE_MemoryCollectionParentIndex}addToCollectionParentIndex(e,t){return this.bn.add(t),PersistencePromise.resolve()}getCollectionParents(e,t){return PersistencePromise.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return PersistencePromise.resolve()}deleteFieldIndex(e,t){return PersistencePromise.resolve()}deleteAllFieldIndexes(e){return PersistencePromise.resolve()}createTargetIndexes(e,t){return PersistencePromise.resolve()}getDocumentsMatchingTarget(e,t){return PersistencePromise.resolve(null)}getIndexType(e,t){return PersistencePromise.resolve(0)}getFieldIndexes(e,t){return PersistencePromise.resolve([])}getNextCollectionGroupToUpdate(e){return PersistencePromise.resolve(null)}getMinOffset(e,t){return PersistencePromise.resolve(IndexOffset.min())}getMinOffsetFromCollectionGroup(e,t){return PersistencePromise.resolve(IndexOffset.min())}updateCollectionGroup(e,t,n){return PersistencePromise.resolve()}updateIndexEntries(e,t){return PersistencePromise.resolve()}}class __PRIVATE_MemoryCollectionParentIndex{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new SortedSet(ResourcePath.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new SortedSet(ResourcePath.comparator)).toArray()}}
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
 */const St="IndexedDbIndexManager",Dt=new Uint8Array(0);class __PRIVATE_IndexedDbIndexManager{constructor(e,t){this.databaseId=t,this.Dn=new __PRIVATE_MemoryCollectionParentIndex,this.Cn=new ObjectMap(e=>__PRIVATE_canonifyTarget(e),(e,t)=>__PRIVATE_targetEquals(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const s={collectionId:n,parent:__PRIVATE_encodeResourcePath(r)};return __PRIVATE_collectionParentsStore(e).put(s)}return PersistencePromise.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[__PRIVATE_immediateSuccessor(t),""],!1,!0);return __PRIVATE_collectionParentsStore(e).J(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(__PRIVATE_decodeResourcePath(r.parent))}return n})}addFieldIndex(e,t){const n=__PRIVATE_indexConfigurationStore(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const s=n.add(r);if(t.indexState){const n=__PRIVATE_indexStateStore(e);return s.next(e=>{n.put(__PRIVATE_toDbIndexState(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=__PRIVATE_indexConfigurationStore(e),r=__PRIVATE_indexStateStore(e),s=__PRIVATE_indexEntriesStore(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=__PRIVATE_indexConfigurationStore(e),n=__PRIVATE_indexEntriesStore(e),r=__PRIVATE_indexStateStore(e);return t.X().next(()=>n.X()).next(()=>r.X())}createTargetIndexes(e,t){return PersistencePromise.forEach(this.vn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new __PRIVATE_TargetIndexMatcher(t).Sn();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=__PRIVATE_indexEntriesStore(e);let r=!0;const s=new Map;return PersistencePromise.forEach(this.vn(t),t=>this.Fn(e,t).next(e=>{r&&(r=!!e),s.set(t,e)})).next(()=>{if(r){let e=__PRIVATE_documentKeySet();const r=[];return PersistencePromise.forEach(s,(s,i)=>{__PRIVATE_logDebug(St,`Using index ${function(e){return`id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`}(s)} to execute ${__PRIVATE_canonifyTarget(t)}`);const o=function(e,t){const n=__PRIVATE_fieldIndexGetArraySegment(t);if(void 0===n)return null;for(const t of __PRIVATE_targetGetFieldFiltersForPath(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(i,s),a=function(e,t){const n=new Map;for(const r of __PRIVATE_fieldIndexGetDirectionalSegments(t))for(const t of __PRIVATE_targetGetFieldFiltersForPath(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(i,s),c=function(e,t){const n=[];let r=!0;for(const s of __PRIVATE_fieldIndexGetDirectionalSegments(t)){const t=0===s.kind?__PRIVATE_targetGetAscendingBound(e,s.fieldPath,e.startAt):__PRIVATE_targetGetDescendingBound(e,s.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new Bound(n,r)}(i,s),u=function(e,t){const n=[];let r=!0;for(const s of __PRIVATE_fieldIndexGetDirectionalSegments(t)){const t=0===s.kind?__PRIVATE_targetGetDescendingBound(e,s.fieldPath,e.endAt):__PRIVATE_targetGetAscendingBound(e,s.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new Bound(n,r)}(i,s),_=this.Mn(s,i,c),l=this.Mn(s,i,u),h=this.xn(s,i,a),d=this.On(s.indexId,o,_,c.inclusive,l,u.inclusive,h);return PersistencePromise.forEach(d,s=>n.Z(s,t.limit).next(t=>{t.forEach(t=>{const n=DocumentKey.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return PersistencePromise.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(t=0===e.filters.length?[e]:__PRIVATE_getDnfTerms(CompositeFilter.create(e.filters,"and")).map(t=>__PRIVATE_newTarget(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,n,r,s,i,o){const a=(null!=t?t.length:1)*Math.max(n.length,s.length),c=a/(null!=t?t.length:1),u=[];for(let _=0;_<a;++_){const a=t?this.Nn(t[_/c]):Dt,l=this.Bn(e,a,n[_%c],r),h=this.Ln(e,a,s[_%c],i),d=o.map(t=>this.Bn(e,a,t,!0));u.push(...this.createRange(l,h,d))}return u}Bn(e,t,n,r){const s=new __PRIVATE_IndexEntry(e,DocumentKey.empty(),t,n);return r?s:s.In()}Ln(e,t,n,r){const s=new __PRIVATE_IndexEntry(e,DocumentKey.empty(),t,n);return r?s.In():s}Fn(e,t){const n=new __PRIVATE_TargetIndexMatcher(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.gn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.vn(t);return PersistencePromise.forEach(r,t=>this.Fn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new SortedSet(FieldPath$1.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}kn(e,t){const n=new __PRIVATE_IndexByteEncoder;for(const r of __PRIVATE_fieldIndexGetDirectionalSegments(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const s=n.ln(r.kind);__PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,s)}return n.un()}Nn(e){const t=new __PRIVATE_IndexByteEncoder;return __PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new __PRIVATE_IndexByteEncoder;return __PRIVATE_FirestoreIndexValueWriter.Wt.Dt(__PRIVATE_refValue(this.databaseId,t),n.ln(function(e){const t=__PRIVATE_fieldIndexGetDirectionalSegments(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.un()}xn(e,t,n){if(null===n)return[];let r=[];r.push(new __PRIVATE_IndexByteEncoder);let s=0;for(const i of __PRIVATE_fieldIndexGetDirectionalSegments(e)){const e=n[s++];for(const n of r)if(this.Kn(t,i.fieldPath)&&isArray(e))r=this.Un(r,i,e);else{const t=n.ln(i.kind);__PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,t)}}return this.$n(r)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const r=[...e],s=[];for(const e of n.arrayValue.values||[])for(const n of r){const r=new __PRIVATE_IndexByteEncoder;r.seed(n.un()),__PRIVATE_FirestoreIndexValueWriter.Wt.Dt(e,r.ln(t.kind)),s.push(r)}return s}Kn(e,t){return!!e.filters.find(e=>e instanceof FieldFilter&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=__PRIVATE_indexConfigurationStore(e),r=__PRIVATE_indexStateStore(e);return(t?n.J(De,IDBKeyRange.bound(t,t)):n.J()).next(e=>{const t=[];return PersistencePromise.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new IndexState(t.sequenceNumber,new IndexOffset(__PRIVATE_fromDbTimestamp(t.readTime),new DocumentKey(__PRIVATE_decodeResourcePath(t.documentKey)),t.largestBatchId)):IndexState.empty(),r=e.fields.map(([e,t])=>new IndexSegment(FieldPath$1.fromServerFormat(e),t));return new FieldIndex(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:__PRIVATE_primitiveComparator(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=__PRIVATE_indexConfigurationStore(e),s=__PRIVATE_indexStateStore(e);return this.Wn(e).next(e=>r.J(De,IDBKeyRange.bound(t,t)).next(t=>PersistencePromise.forEach(t,t=>s.put(__PRIVATE_toDbIndexState(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return PersistencePromise.forEach(t,(t,r)=>{const s=n.get(t.collectionGroup);return(s?PersistencePromise.resolve(s):this.getFieldIndexes(e,t.collectionGroup)).next(s=>(n.set(t.collectionGroup,s),PersistencePromise.forEach(s,n=>this.Qn(e,t,n).next(t=>{const s=this.Gn(r,n);return t.isEqual(s)?PersistencePromise.resolve():this.zn(e,r,n,t,s)}))))})}jn(e,t,n,r){return __PRIVATE_indexEntriesStore(e).put(r.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,r){return __PRIVATE_indexEntriesStore(e).delete(r.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const r=__PRIVATE_indexEntriesStore(e);let s=new SortedSet(__PRIVATE_indexEntryComparator);return r.ee({index:Be,range:IDBKeyRange.only([n.indexId,this.uid,__PRIVATE_encodeKeySafeBytes(this.qn(n,t))])},(e,r)=>{s=s.add(new __PRIVATE_IndexEntry(n.indexId,t,__PRIVATE_decodeKeySafeBytes(r.arrayValue),__PRIVATE_decodeKeySafeBytes(r.directionalValue)))}).next(()=>s)}Gn(e,t){let n=new SortedSet(__PRIVATE_indexEntryComparator);const r=this.kn(t,e);if(null==r)return n;const s=__PRIVATE_fieldIndexGetArraySegment(t);if(null!=s){const i=e.data.field(s.fieldPath);if(isArray(i))for(const s of i.arrayValue.values||[])n=n.add(new __PRIVATE_IndexEntry(t.indexId,e.key,this.Nn(s),r))}else n=n.add(new __PRIVATE_IndexEntry(t.indexId,e.key,Dt,r));return n}zn(e,t,n,r,s){__PRIVATE_logDebug(St,"Updating index entries for document '%s'",t.key);const i=[];return function(e,t,n,r,s){const i=e.getIterator(),o=t.getIterator();let a=__PRIVATE_advanceIterator(i),c=__PRIVATE_advanceIterator(o);for(;a||c;){let e=!1,t=!1;if(a&&c){const r=n(a,c);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(c),c=__PRIVATE_advanceIterator(o)):t?(s(a),a=__PRIVATE_advanceIterator(i)):(a=__PRIVATE_advanceIterator(i),c=__PRIVATE_advanceIterator(o))}}(r,s,__PRIVATE_indexEntryComparator,r=>{i.push(this.jn(e,t,n,r))},r=>{i.push(this.Jn(e,t,n,r))}),PersistencePromise.waitFor(i)}Wn(e){let t=1;return __PRIVATE_indexStateStore(e).ee({index:Me,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>__PRIVATE_indexEntryComparator(e,t)).filter((e,t,n)=>!t||0!==__PRIVATE_indexEntryComparator(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=__PRIVATE_indexEntryComparator(s,e),i=__PRIVATE_indexEntryComparator(s,t);if(0===n)r[0]=e.In();else if(n>0&&i<0)r.push(s),r.push(s.In());else if(i>0)break}r.push(t);const s=[];for(let e=0;e<r.length;e+=2){if(this.Hn(r[e],r[e+1]))return[];const t=r[e].An(this.uid,Dt,DocumentKey.empty()),n=r[e+1].An(this.uid,Dt,DocumentKey.empty());s.push(IDBKeyRange.bound(t,n))}return s}Hn(e,t){return __PRIVATE_indexEntryComparator(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(__PRIVATE_getMinOffsetFromFieldIndexes)}getMinOffset(e,t){return PersistencePromise.mapArray(this.vn(t),t=>this.Fn(e,t).next(e=>e||fail(44426))).next(__PRIVATE_getMinOffsetFromFieldIndexes)}}function __PRIVATE_collectionParentsStore(e){return __PRIVATE_getStore(e,Ve)}function __PRIVATE_indexEntriesStore(e){return __PRIVATE_getStore(e,Oe)}function __PRIVATE_indexConfigurationStore(e){return __PRIVATE_getStore(e,be)}function __PRIVATE_indexStateStore(e){return __PRIVATE_getStore(e,ve)}function __PRIVATE_getMinOffsetFromFieldIndexes(e){__PRIVATE_hardAssert(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const s=e[r].indexState.offset;__PRIVATE_indexOffsetComparator(s,t)<0&&(t=s),n<s.largestBatchId&&(n=s.largestBatchId)}return new IndexOffset(t.readTime,t.documentKey,n)}
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
 */const Ct={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},vt=41943040;class LruParams{static withCacheSize(e){return new LruParams(e,LruParams.DEFAULT_COLLECTION_PERCENTILE,LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n
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
 */}}function removeMutationBatch(e,t,n){const r=e.store(J),s=e.store(te),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.ee({range:o},(e,t,n)=>(a++,n.delete()));i.push(c.next(()=>{__PRIVATE_hardAssert(1===a,47070,{batchId:n.batchId})}));const u=[];for(const e of n.mutations){const r=__PRIVATE_newDbDocumentMutationKey(t,e.key.path,n.batchId);i.push(s.delete(r)),u.push(e.key)}return PersistencePromise.waitFor(i).next(()=>u)}function __PRIVATE_dbDocumentSize(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw fail(14731);t=e.noDocument}return JSON.stringify(t).length}
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
 */LruParams.DEFAULT_COLLECTION_PERCENTILE=10,LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,LruParams.DEFAULT=new LruParams(vt,LruParams.DEFAULT_COLLECTION_PERCENTILE,LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),LruParams.DISABLED=new LruParams(-1,0,0);class __PRIVATE_IndexedDbMutationQueue{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Zn={}}static wt(e,t,n,r){__PRIVATE_hardAssert(""!==e.uid,64387);const s=e.isAuthenticated()?e.uid:"";return new __PRIVATE_IndexedDbMutationQueue(s,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return __PRIVATE_mutationsStore(e).ee({index:X,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const s=__PRIVATE_documentMutationsStore(e),i=__PRIVATE_mutationsStore(e);return i.add({}).next(o=>{__PRIVATE_hardAssert("number"==typeof o,49019);const a=new MutationBatch(o,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>toMutation(e.yt,t)),s=n.mutations.map(t=>toMutation(e.yt,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:s}}(this.serializer,this.userId,a),u=[];let _=new SortedSet((e,t)=>__PRIVATE_primitiveComparator(e.canonicalString(),t.canonicalString()));for(const e of r){const t=__PRIVATE_newDbDocumentMutationKey(this.userId,e.key.path,o);_=_.add(e.key.path.popLast()),u.push(i.put(c)),u.push(s.put(t,ee))}return _.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Zn[o]=a.keys()}),PersistencePromise.waitFor(u).next(()=>a)})}lookupMutationBatch(e,t){return __PRIVATE_mutationsStore(e).get(t).next(e=>e?(__PRIVATE_hardAssert(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),__PRIVATE_fromDbMutationBatch(this.serializer,e)):null)}Xn(e,t){return this.Zn[t]?PersistencePromise.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.Zn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return __PRIVATE_mutationsStore(e).ee({index:X,range:r},(e,t,r)=>{t.userId===this.userId&&(__PRIVATE_hardAssert(t.batchId>=n,47524,{Yn:n}),s=__PRIVATE_fromDbMutationBatch(this.serializer,t)),r.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=$;return __PRIVATE_mutationsStore(e).ee({index:X,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,$],[this.userId,Number.POSITIVE_INFINITY]);return __PRIVATE_mutationsStore(e).J(X,t).next(e=>e.map(e=>__PRIVATE_fromDbMutationBatch(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=__PRIVATE_newDbDocumentMutationPrefixForPath(this.userId,t.path),r=IDBKeyRange.lowerBound(n),s=[];return __PRIVATE_documentMutationsStore(e).ee({range:r},(n,r,i)=>{const[o,a,c]=n,u=__PRIVATE_decodeResourcePath(a);if(o===this.userId&&t.path.isEqual(u))return __PRIVATE_mutationsStore(e).get(c).next(e=>{if(!e)throw fail(61480,{er:n,batchId:c});__PRIVATE_hardAssert(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),s.push(__PRIVATE_fromDbMutationBatch(this.serializer,e))});i.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new SortedSet(__PRIVATE_primitiveComparator);const r=[];return t.forEach(t=>{const s=__PRIVATE_newDbDocumentMutationPrefixForPath(this.userId,t.path),i=IDBKeyRange.lowerBound(s),o=__PRIVATE_documentMutationsStore(e).ee({range:i},(e,r,s)=>{const[i,o,a]=e,c=__PRIVATE_decodeResourcePath(o);i===this.userId&&t.path.isEqual(c)?n=n.add(a):s.done()});r.push(o)}),PersistencePromise.waitFor(r).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,s=__PRIVATE_newDbDocumentMutationPrefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new SortedSet(__PRIVATE_primitiveComparator);return __PRIVATE_documentMutationsStore(e).ee({range:i},(e,t,s)=>{const[i,a,c]=e,u=__PRIVATE_decodeResourcePath(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()}).next(()=>this.tr(e,o))}tr(e,t){const n=[],r=[];return t.forEach(t=>{r.push(__PRIVATE_mutationsStore(e).get(t).next(e=>{if(null===e)throw fail(35274,{batchId:t});__PRIVATE_hardAssert(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(__PRIVATE_fromDbMutationBatch(this.serializer,e))}))}),PersistencePromise.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return removeMutationBatch(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),PersistencePromise.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return PersistencePromise.resolve();const n=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),r=[];return __PRIVATE_documentMutationsStore(e).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=__PRIVATE_decodeResourcePath(e[1]);r.push(t)}else n.done()}).next(()=>{__PRIVATE_hardAssert(0===r.length,56720,{rr:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return __PRIVATE_mutationQueueContainsKey(e,this.userId,t)}ir(e){return __PRIVATE_mutationQueuesStore(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:$,lastStreamToken:""})}}function __PRIVATE_mutationQueueContainsKey(e,t,n){const r=__PRIVATE_newDbDocumentMutationPrefixForPath(t,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return __PRIVATE_documentMutationsStore(e).ee({range:i,Y:!0},(e,n,r)=>{const[i,a,c]=e;i===t&&a===s&&(o=!0),r.done()}).next(()=>o)}function __PRIVATE_mutationsStore(e){return __PRIVATE_getStore(e,J)}function __PRIVATE_documentMutationsStore(e){return __PRIVATE_getStore(e,te)}function __PRIVATE_mutationQueuesStore(e){return __PRIVATE_getStore(e,j)}
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
 */class __PRIVATE_IndexedDbTargetCache{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const n=new __PRIVATE_TargetIdGenerator(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(e=>SnapshotVersion.fromTimestamp(new Timestamp(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.cr(e,r)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>__PRIVATE_targetsStore(e).delete(t.targetId)).next(()=>this.ur(e)).next(t=>(__PRIVATE_hardAssert(t.targetCount>0,8065),t.targetCount-=1,this.cr(e,t)))}removeTargets(e,t,n){let r=0;const s=[];return __PRIVATE_targetsStore(e).ee((i,o)=>{const a=__PRIVATE_fromDbTarget(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(e,a)))}).next(()=>PersistencePromise.waitFor(s)).next(()=>r)}forEachTarget(e,t){return __PRIVATE_targetsStore(e).ee((e,n)=>{const r=__PRIVATE_fromDbTarget(n);t(r)})}ur(e){return __PRIVATE_globalTargetStore(e).get(Re).next(e=>(__PRIVATE_hardAssert(null!==e,2888),e))}cr(e,t){return __PRIVATE_globalTargetStore(e).put(Re,t)}lr(e,t){return __PRIVATE_targetsStore(e).put(__PRIVATE_toDbTarget(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(e=>e.targetCount)}getTargetData(e,t){const n=__PRIVATE_canonifyTarget(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return __PRIVATE_targetsStore(e).ee({range:r,index:le},(e,n,r)=>{const i=__PRIVATE_fromDbTarget(n);__PRIVATE_targetEquals(t,i.target)&&(s=i,r.done())}).next(()=>s)}addMatchingKeys(e,t,n){const r=[],s=__PRIVATE_documentTargetStore(e);return t.forEach(t=>{const i=__PRIVATE_encodeResourcePath(t.path);r.push(s.put({targetId:n,path:i})),r.push(this.referenceDelegate.addReference(e,n,t))}),PersistencePromise.waitFor(r)}removeMatchingKeys(e,t,n){const r=__PRIVATE_documentTargetStore(e);return PersistencePromise.forEach(t,t=>{const s=__PRIVATE_encodeResourcePath(t.path);return PersistencePromise.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=__PRIVATE_documentTargetStore(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=__PRIVATE_documentTargetStore(e);let s=__PRIVATE_documentKeySet();return r.ee({range:n,Y:!0},(e,t,n)=>{const r=__PRIVATE_decodeResourcePath(e[1]),i=new DocumentKey(r);s=s.add(i)}).next(()=>s)}containsKey(e,t){const n=__PRIVATE_encodeResourcePath(t.path),r=IDBKeyRange.bound([n],[__PRIVATE_immediateSuccessor(n)],!1,!0);let s=0;return __PRIVATE_documentTargetStore(e).ee({index:Ie,Y:!0,range:r},([e,t],n,r)=>{0!==e&&(s++,r.done())}).next(()=>s>0)}At(e,t){return __PRIVATE_targetsStore(e).get(t).next(e=>e?__PRIVATE_fromDbTarget(e):null)}}function __PRIVATE_targetsStore(e){return __PRIVATE_getStore(e,ce)}function __PRIVATE_globalTargetStore(e){return __PRIVATE_getStore(e,Ae)}function __PRIVATE_documentTargetStore(e){return __PRIVATE_getStore(e,Pe)}
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
 */const Ft="LruGarbageCollector",Mt=1048576;function __PRIVATE_bufferEntryComparator([e,t],[n,r]){const s=__PRIVATE_primitiveComparator(e,n);return 0===s?__PRIVATE_primitiveComparator(t,r):s}class __PRIVATE_RollingSequenceNumberBuffer{constructor(e){this.Pr=e,this.buffer=new SortedSet(__PRIVATE_bufferEntryComparator),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();__PRIVATE_bufferEntryComparator(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class __PRIVATE_LruScheduler{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Ar(e){__PRIVATE_logDebug(Ft,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){__PRIVATE_isIndexedDbTransactionError(e)?__PRIVATE_logDebug(Ft,"Ignoring IndexedDB error during garbage collection: ",e):await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}await this.Ar(3e5)})}}class __PRIVATE_LruGarbageCollectorImpl{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return PersistencePromise.resolve(__PRIVATE_ListenSequence.ce);const n=new __PRIVATE_RollingSequenceNumberBuffer(t);return this.Vr.forEachTarget(e,e=>n.Ir(e.sequenceNumber)).next(()=>this.Vr.mr(e,e=>n.Ir(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(__PRIVATE_logDebug("LruGarbageCollector","Garbage collection skipped; disabled"),PersistencePromise.resolve(Ct)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(__PRIVATE_logDebug("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ct):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(__PRIVATE_logDebug("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),__PRIVATE_getLogLevel()<=d.DEBUG&&__PRIVATE_logDebug("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),PersistencePromise.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}function __PRIVATE_newLruGarbageCollector(e,t){return new __PRIVATE_LruGarbageCollectorImpl(e,t)}
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
 */class __PRIVATE_IndexedDbLruDelegateImpl{constructor(e,t){this.db=e,this.garbageCollector=__PRIVATE_newLruGarbageCollector(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(e,n)=>t(n))}addReference(e,t,n){return __PRIVATE_writeSentinelKey(e,n)}removeReference(e,t,n){return __PRIVATE_writeSentinelKey(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return __PRIVATE_writeSentinelKey(e,t)}wr(e,t){return function(e,t){let n=!1;return __PRIVATE_mutationQueuesStore(e).te(r=>__PRIVATE_mutationQueueContainsKey(e,r,t).next(e=>(e&&(n=!0),PersistencePromise.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.yr(e,(i,o)=>{if(o<=t){const t=this.wr(e,i).next(t=>{if(!t)return s++,n.getEntry(e,i).next(()=>(n.removeEntry(i,SnapshotVersion.min()),__PRIVATE_documentTargetStore(e).delete(function(e){return[0,__PRIVATE_encodeResourcePath(e.path)]}(i))))});r.push(t)}}).next(()=>PersistencePromise.waitFor(r)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return __PRIVATE_writeSentinelKey(e,t)}yr(e,t){const n=__PRIVATE_documentTargetStore(e);let r,s=__PRIVATE_ListenSequence.ce;return n.ee({index:Ie},([e,n],{path:i,sequenceNumber:o})=>{0===e?(s!==__PRIVATE_ListenSequence.ce&&t(new DocumentKey(__PRIVATE_decodeResourcePath(r)),s),s=o,r=i):s=__PRIVATE_ListenSequence.ce}).next(()=>{s!==__PRIVATE_ListenSequence.ce&&t(new DocumentKey(__PRIVATE_decodeResourcePath(r)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function __PRIVATE_writeSentinelKey(e,t){return __PRIVATE_documentTargetStore(e).put(function(e,t){return{targetId:0,path:__PRIVATE_encodeResourcePath(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
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
 */class RemoteDocumentChangeBuffer{constructor(){this.changes=new ObjectMap(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,MutableDocument.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?PersistencePromise.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
 */class __PRIVATE_IndexedDbRemoteDocumentCacheImpl{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return __PRIVATE_remoteDocumentsStore(e).put(n)}removeEntry(e,t,n){return __PRIVATE_remoteDocumentsStore(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],__PRIVATE_toDbTimestampKey(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Sr(e,n)))}getEntry(e,t){let n=MutableDocument.newInvalidDocument(t);return __PRIVATE_remoteDocumentsStore(e).ee({index:ie,range:IDBKeyRange.only(__PRIVATE_dbKey(t))},(e,r)=>{n=this.br(t,r)}).next(()=>n)}Dr(e,t){let n={size:0,document:MutableDocument.newInvalidDocument(t)};return __PRIVATE_remoteDocumentsStore(e).ee({index:ie,range:IDBKeyRange.only(__PRIVATE_dbKey(t))},(e,r)=>{n={document:this.br(t,r),size:__PRIVATE_dbDocumentSize(r)}}).next(()=>n)}getEntries(e,t){let n=__PRIVATE_mutableDocumentMap();return this.Cr(e,t,(e,t)=>{const r=this.br(e,t);n=n.insert(e,r)}).next(()=>n)}vr(e,t){let n=__PRIVATE_mutableDocumentMap(),r=new SortedMap(DocumentKey.comparator);return this.Cr(e,t,(e,t)=>{const s=this.br(e,t);n=n.insert(e,s),r=r.insert(e,__PRIVATE_dbDocumentSize(t))}).next(()=>({documents:n,Fr:r}))}Cr(e,t,n){if(t.isEmpty())return PersistencePromise.resolve();let r=new SortedSet(__PRIVATE_dbKeyComparator);t.forEach(e=>r=r.add(e));const s=IDBKeyRange.bound(__PRIVATE_dbKey(r.first()),__PRIVATE_dbKey(r.last())),i=r.getIterator();let o=i.getNext();return __PRIVATE_remoteDocumentsStore(e).ee({index:ie,range:s},(e,t,r)=>{const s=DocumentKey.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&__PRIVATE_dbKeyComparator(o,s)<0;)n(o,null),o=i.getNext();o&&o.isEqual(s)&&(n(o,t),o=i.hasNext()?i.getNext():null),o?r.j(__PRIVATE_dbKey(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,s){const i=t.path,o=[i.popLast().toArray(),i.lastSegment(),__PRIVATE_toDbTimestampKey(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return __PRIVATE_remoteDocumentsStore(e).J(IDBKeyRange.bound(o,a,!0)).next(e=>{s?.incrementDocumentReadCount(e.length);let n=__PRIVATE_mutableDocumentMap();for(const s of e){const e=this.br(DocumentKey.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);e.isFoundDocument()&&(__PRIVATE_queryMatches(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let s=__PRIVATE_mutableDocumentMap();const i=__PRIVATE_dbCollectionGroupKey(t,n),o=__PRIVATE_dbCollectionGroupKey(t,IndexOffset.max());return __PRIVATE_remoteDocumentsStore(e).ee({index:oe,range:IDBKeyRange.bound(i,o,!0)},(e,t,n)=>{const i=this.br(DocumentKey.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);s=s.insert(i.key,i),s.size===r&&n.done()}).next(()=>s)}newChangeBuffer(e){return new __PRIVATE_IndexedDbRemoteDocumentChangeBuffer(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return __PRIVATE_documentGlobalStore(e).get(ue).next(e=>(__PRIVATE_hardAssert(!!e,20021),e))}Sr(e,t){return __PRIVATE_documentGlobalStore(e).put(ue,t)}br(e,t){if(t){const e=__PRIVATE_fromDbRemoteDocument(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(SnapshotVersion.min()))return e}return MutableDocument.newInvalidDocument(e)}}function __PRIVATE_newIndexedDbRemoteDocumentCache(e){return new __PRIVATE_IndexedDbRemoteDocumentCacheImpl(e)}class __PRIVATE_IndexedDbRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new ObjectMap(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new SortedSet((e,t)=>__PRIVATE_primitiveComparator(e.canonicalString(),t.canonicalString()));return this.changes.forEach((s,i)=>{const o=this.Or.get(s);if(t.push(this.Mr.removeEntry(e,s,o.readTime)),i.isValidDocument()){const a=__PRIVATE_toDbRemoteDocument(this.Mr.serializer,i);r=r.add(s.path.popLast());const c=__PRIVATE_dbDocumentSize(a);n+=c-o.size,t.push(this.Mr.addEntry(e,s,a))}else if(n-=o.size,this.trackRemovals){const n=__PRIVATE_toDbRemoteDocument(this.Mr.serializer,i.convertToNoDocument(SnapshotVersion.min()));t.push(this.Mr.addEntry(e,s,n))}}),r.forEach(n=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Mr.updateMetadata(e,n)),PersistencePromise.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(e=>(this.Or.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:e,Fr:t})=>(t.forEach((t,n)=>{this.Or.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function __PRIVATE_documentGlobalStore(e){return __PRIVATE_getStore(e,ae)}function __PRIVATE_remoteDocumentsStore(e){return __PRIVATE_getStore(e,ne)}function __PRIVATE_dbKey(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function __PRIVATE_dbCollectionGroupKey(e,t){const n=t.documentKey.path.toArray();return[e,__PRIVATE_toDbTimestampKey(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function __PRIVATE_dbKeyComparator(e,t){const n=e.path.toArray(),r=t.path.toArray();let s=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(s=__PRIVATE_primitiveComparator(n[e],r[e]),s)return s;return s=__PRIVATE_primitiveComparator(n.length,r.length),s||(s=__PRIVATE_primitiveComparator(n[n.length-2],r[r.length-2]),s||__PRIVATE_primitiveComparator(n[n.length-1],r[r.length-1])
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
 */}}class LocalDocumentsView{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&__PRIVATE_mutationApplyToLocalView(n.mutation,e,FieldMask.empty(),Timestamp.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,__PRIVATE_documentKeySet()).next(()=>t))}getLocalViewOfDocuments(e,t,n=__PRIVATE_documentKeySet()){const r=__PRIVATE_newOverlayMap();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=documentMap();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=__PRIVATE_newOverlayMap();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,__PRIVATE_documentKeySet()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=__PRIVATE_mutableDocumentMap();const i=__PRIVATE_newDocumentKeyMap(),o=__PRIVATE_newDocumentKeyMap();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof __PRIVATE_PatchMutation)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),__PRIVATE_mutationApplyToLocalView(o.mutation,t,o.mutation.getFieldMask(),Timestamp.now())):i.set(t.key,FieldMask.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new OverlayedDocument(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=__PRIVATE_newDocumentKeyMap();let r=new SortedMap((e,t)=>e-t),s=__PRIVATE_documentKeySet();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||FieldMask.empty();o=s.applyToLocalView(i,o),n.set(e,o);const a=(r.get(s.batchId)||__PRIVATE_documentKeySet()).add(e);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=__PRIVATE_newMutationMap();c.forEach(e=>{if(!s.has(e)){const r=__PRIVATE_calculateOverlayMutation(t.get(e),n.get(e));null!==r&&u.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,u))}return PersistencePromise.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return __PRIVATE_isDocumentQuery$1(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):__PRIVATE_isCollectionGroupQuery(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):PersistencePromise.resolve(__PRIVATE_newOverlayMap());let o=L,a=s;return i.next(t=>PersistencePromise.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?PersistencePromise.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,__PRIVATE_documentKeySet())).next(e=>({batchId:o,changes:__PRIVATE_convertOverlayedDocumentMapToDocumentMap(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new DocumentKey(t)).next(e=>{let t=documentMap();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=documentMap();return this.indexManager.getCollectionParents(e,s).next(o=>PersistencePromise.forEach(o,o=>{const a=function(e,t){return new __PRIVATE_QueryImpl(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(s));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>{s.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,MutableDocument.newInvalidDocument(r)))});let n=documentMap();return e.forEach((e,r)=>{const i=s.get(e);void 0!==i&&__PRIVATE_mutationApplyToLocalView(i.mutation,r,FieldMask.empty(),Timestamp.now()),__PRIVATE_queryMatches(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */}}class __PRIVATE_MemoryDocumentOverlayCache{constructor(){this.overlays=new SortedMap(DocumentKey.comparator),this.Lr=new Map}getOverlay(e,t){return PersistencePromise.resolve(this.overlays.get(t))}getOverlays(e,t){const n=__PRIVATE_newOverlayMap();return PersistencePromise.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),PersistencePromise.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Lr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Lr.delete(n)),PersistencePromise.resolve()}getOverlaysForCollection(e,t,n){const r=__PRIVATE_newOverlayMap(),s=t.length+1,i=new DocumentKey(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return PersistencePromise.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new SortedMap((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=__PRIVATE_newOverlayMap(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=__PRIVATE_newOverlayMap(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return PersistencePromise.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Lr.get(r.largestBatchId).delete(n.key);this.Lr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Overlay(t,n));let s=this.Lr.get(t);void 0===s&&(s=__PRIVATE_documentKeySet(),this.Lr.set(t,s)),this.Lr.set(t,s.add(n.key))}}
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
 */}}class __PRIVATE_ReferenceSet{constructor(){this.kr=new SortedSet(__PRIVATE_DocReference.qr),this.Kr=new SortedSet(__PRIVATE_DocReference.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new __PRIVATE_DocReference(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Wr(new __PRIVATE_DocReference(e,t))}Qr(e,t){e.forEach(e=>this.removeReference(e,t))}Gr(e){const t=new DocumentKey(new ResourcePath([])),n=new __PRIVATE_DocReference(t,e),r=new __PRIVATE_DocReference(t,e+1),s=[];return this.Kr.forEachInRange([n,r],e=>{this.Wr(e),s.push(e.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new DocumentKey(new ResourcePath([])),n=new __PRIVATE_DocReference(t,e),r=new __PRIVATE_DocReference(t,e+1);let s=__PRIVATE_documentKeySet();return this.Kr.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new __PRIVATE_DocReference(e,0),n=this.kr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class __PRIVATE_DocReference{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return DocumentKey.comparator(e.key,t.key)||__PRIVATE_primitiveComparator(e.Jr,t.Jr)}static Ur(e,t){return __PRIVATE_primitiveComparator(e.Jr,t.Jr)||DocumentKey.comparator(e.key,t.key)}}
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
 */class __PRIVATE_MemoryMutationQueue{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new SortedSet(__PRIVATE_DocReference.qr)}checkEmpty(e){return PersistencePromise.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new MutationBatch(s,t,n,r);this.mutationQueue.push(i);for(const t of r)this.Hr=this.Hr.add(new __PRIVATE_DocReference(t.key,s)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return PersistencePromise.resolve(i)}lookupMutationBatch(e,t){return PersistencePromise.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.Xr(n),s=r<0?0:r;return PersistencePromise.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return PersistencePromise.resolve(0===this.mutationQueue.length?$:this.Yn-1)}getAllMutationBatches(e){return PersistencePromise.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new __PRIVATE_DocReference(t,0),r=new __PRIVATE_DocReference(t,Number.POSITIVE_INFINITY),s=[];return this.Hr.forEachInRange([n,r],e=>{const t=this.Zr(e.Jr);s.push(t)}),PersistencePromise.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new SortedSet(__PRIVATE_primitiveComparator);return t.forEach(e=>{const t=new __PRIVATE_DocReference(e,0),r=new __PRIVATE_DocReference(e,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([t,r],e=>{n=n.add(e.Jr)})}),PersistencePromise.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;DocumentKey.isDocumentKey(s)||(s=s.child(""));const i=new __PRIVATE_DocReference(new DocumentKey(s),0);let o=new SortedSet(__PRIVATE_primitiveComparator);return this.Hr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Jr)),!0)},i),PersistencePromise.resolve(this.Yr(o))}Yr(e){const t=[];return e.forEach(e=>{const n=this.Zr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){__PRIVATE_hardAssert(0===this.ei(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Hr;return PersistencePromise.forEach(t.mutations,r=>{const s=new __PRIVATE_DocReference(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Hr=n})}nr(e){}containsKey(e,t){const n=new __PRIVATE_DocReference(t,0),r=this.Hr.firstAfterOrEqual(n);return PersistencePromise.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,PersistencePromise.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
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
 */class __PRIVATE_MemoryRemoteDocumentCacheImpl{constructor(e){this.ti=e,this.docs=new SortedMap(DocumentKey.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return PersistencePromise.resolve(n?n.document.mutableCopy():MutableDocument.newInvalidDocument(t))}getEntries(e,t){let n=__PRIVATE_mutableDocumentMap();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():MutableDocument.newInvalidDocument(e))}),PersistencePromise.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let s=__PRIVATE_mutableDocumentMap();const i=t.path,o=new DocumentKey(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||__PRIVATE_indexOffsetComparator(__PRIVATE_newIndexOffsetFromDocument(o),n)<=0||(r.has(o.key)||__PRIVATE_queryMatches(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return PersistencePromise.resolve(s)}getAllFromCollectionGroup(e,t,n,r){fail(9500)}ni(e,t){return PersistencePromise.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new __PRIVATE_MemoryRemoteDocumentChangeBuffer(this)}getSize(e){return PersistencePromise.resolve(this.size)}}class __PRIVATE_MemoryRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(n)}),PersistencePromise.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}
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
 */class __PRIVATE_MemoryTargetCache{constructor(e){this.persistence=e,this.ri=new ObjectMap(e=>__PRIVATE_canonifyTarget(e),__PRIVATE_targetEquals),this.lastRemoteSnapshotVersion=SnapshotVersion.min(),this.highestTargetId=0,this.ii=0,this.si=new __PRIVATE_ReferenceSet,this.targetCount=0,this.oi=__PRIVATE_TargetIdGenerator._r()}forEachTarget(e,t){return this.ri.forEach((e,n)=>t(n)),PersistencePromise.resolve()}getLastRemoteSnapshotVersion(e){return PersistencePromise.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return PersistencePromise.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),PersistencePromise.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),PersistencePromise.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new __PRIVATE_TargetIdGenerator(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,PersistencePromise.resolve()}updateTargetData(e,t){return this.lr(t),PersistencePromise.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,PersistencePromise.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.ri.forEach((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.ri.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),PersistencePromise.waitFor(s).next(()=>r)}getTargetCount(e){return PersistencePromise.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return PersistencePromise.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),PersistencePromise.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),PersistencePromise.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),PersistencePromise.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return PersistencePromise.resolve(n)}containsKey(e,t){return PersistencePromise.resolve(this.si.containsKey(t))}}
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
 */class __PRIVATE_MemoryPersistence{constructor(e,t){this._i={},this.overlays={},this.ai=new __PRIVATE_ListenSequence(0),this.ui=!1,this.ui=!0,this.ci=new __PRIVATE_MemoryGlobalsCache,this.referenceDelegate=e(this),this.li=new __PRIVATE_MemoryTargetCache(this),this.indexManager=new __PRIVATE_MemoryIndexManager,this.remoteDocumentCache=function(e){return new __PRIVATE_MemoryRemoteDocumentCacheImpl(e)}(e=>this.referenceDelegate.hi(e)),this.serializer=new __PRIVATE_LocalSerializer(t),this.Pi=new __PRIVATE_MemoryBundleCache(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new __PRIVATE_MemoryDocumentOverlayCache,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new __PRIVATE_MemoryMutationQueue(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){__PRIVATE_logDebug("MemoryPersistence","Starting transaction:",e);const r=new __PRIVATE_MemoryTransaction(this.ai.next());return this.referenceDelegate.Ti(),n(r).next(e=>this.referenceDelegate.Ei(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ii(e,t){return PersistencePromise.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class __PRIVATE_MemoryTransaction extends PersistenceTransaction{constructor(e){super(),this.currentSequenceNumber=e}}class __PRIVATE_MemoryEagerDelegate{constructor(e){this.persistence=e,this.Ri=new __PRIVATE_ReferenceSet,this.Ai=null}static Vi(e){return new __PRIVATE_MemoryEagerDelegate(e)}get di(){if(this.Ai)return this.Ai;throw fail(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),PersistencePromise.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),PersistencePromise.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),PersistencePromise.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(e=>this.di.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return PersistencePromise.forEach(this.di,n=>{const r=DocumentKey.fromPath(n);return this.mi(e,r).next(e=>{e||t.removeEntry(r,SnapshotVersion.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return PersistencePromise.or([()=>PersistencePromise.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class __PRIVATE_MemoryLruDelegate{constructor(e,t){this.persistence=e,this.fi=new ObjectMap(e=>__PRIVATE_encodeResourcePath(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=__PRIVATE_newLruGarbageCollector(this,t)}static Vi(e,t){return new __PRIVATE_MemoryLruDelegate(e,t)}Ti(){}Ei(e){return PersistencePromise.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}mr(e,t){return PersistencePromise.forEach(this.fi,(n,r)=>this.wr(e,n,r).next(e=>e?PersistencePromise.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ni(e,r=>this.wr(e,r,t).next(e=>{e||(n++,s.removeEntry(r,SnapshotVersion.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),PersistencePromise.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),PersistencePromise.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),PersistencePromise.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),PersistencePromise.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=__PRIVATE_estimateByteSize(e.data.value)),t}wr(e,t,n){return PersistencePromise.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.fi.get(t);return PersistencePromise.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
 */class __PRIVATE_SchemaConverter{constructor(e){this.serializer=e}k(e,t,n,r){const s=new __PRIVATE_SimpleDbTransaction("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore(G)}(e),function(e){e.createObjectStore(j,{keyPath:H}),e.createObjectStore(J,{keyPath:Z,autoIncrement:!0}).createIndex(X,Y,{unique:!0}),e.createObjectStore(te)}(e),__PRIVATE_createQueryCache(e),function(e){e.createObjectStore(Q)}(e));let i=PersistencePromise.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore(Pe),e.deleteObjectStore(ce),e.deleteObjectStore(Ae)}(e),__PRIVATE_createQueryCache(e)),i=i.next(()=>function(e){const t=e.store(Ae),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:SnapshotVersion.min().toTimestamp(),targetCount:0};return t.put(Re,n)}(s))),n<4&&r>=4&&(0!==n&&(i=i.next(()=>function(e,t){return t.store(J).J().next(n=>{e.deleteObjectStore(J),e.createObjectStore(J,{keyPath:Z,autoIncrement:!0}).createIndex(X,Y,{unique:!0});const r=t.store(J),s=n.map(e=>r.put(e));return PersistencePromise.waitFor(s)})}(e,s))),i=i.next(()=>{!function(e){e.createObjectStore(me,{keyPath:fe})}(e)})),n<5&&r>=5&&(i=i.next(()=>this.gi(s))),n<6&&r>=6&&(i=i.next(()=>(function(e){e.createObjectStore(ae)}(e),this.pi(s)))),n<7&&r>=7&&(i=i.next(()=>this.yi(s))),n<8&&r>=8&&(i=i.next(()=>this.wi(e,s))),n<9&&r>=9&&(i=i.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(i=i.next(()=>this.Si(s))),n<11&&r>=11&&(i=i.next(()=>{!function(e){e.createObjectStore(ge,{keyPath:pe})}(e),function(e){e.createObjectStore(ye,{keyPath:we})}(e)})),n<12&&r>=12&&(i=i.next(()=>{!function(e){const t=e.createObjectStore(ke,{keyPath:Ke});t.createIndex(qe,Ue,{unique:!1}),t.createIndex($e,We,{unique:!1})}(e)})),n<13&&r>=13&&(i=i.next(()=>function(e){const t=e.createObjectStore(ne,{keyPath:re});t.createIndex(ie,se),t.createIndex(oe,_e)}(e)).next(()=>this.bi(e,s)).next(()=>e.deleteObjectStore(Q))),n<14&&r>=14&&(i=i.next(()=>this.Di(e,s))),n<15&&r>=15&&(i=i.next(()=>function(e){e.createObjectStore(be,{keyPath:Se,autoIncrement:!0}).createIndex(De,Ce,{unique:!1}),e.createObjectStore(ve,{keyPath:Fe}).createIndex(Me,xe,{unique:!1}),e.createObjectStore(Oe,{keyPath:Ne}).createIndex(Be,Le,{unique:!1})}(e))),n<16&&r>=16&&(i=i.next(()=>{t.objectStore(ve).clear()}).next(()=>{t.objectStore(Oe).clear()})),n<17&&r>=17&&(i=i.next(()=>{!function(e){e.createObjectStore(Qe,{keyPath:Ge})}(e)})),n<18&&r>=18&&u()&&(i=i.next(()=>{t.objectStore(ve).clear()}).next(()=>{t.objectStore(Oe).clear()})),i}pi(e){let t=0;return e.store(Q).ee((e,n)=>{t+=__PRIVATE_dbDocumentSize(n)}).next(()=>{const n={byteSize:t};return e.store(ae).put(ue,n)})}gi(e){const t=e.store(j),n=e.store(J);return t.J().next(t=>PersistencePromise.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,$],[t.userId,t.lastAcknowledgedBatchId]);return n.J(X,r).next(n=>PersistencePromise.forEach(n,n=>{__PRIVATE_hardAssert(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=__PRIVATE_fromDbMutationBatch(this.serializer,n);return removeMutationBatch(e,t.userId,r).next(()=>{})}))}))}yi(e){const t=e.store(Pe),n=e.store(Q);return e.store(Ae).get(Re).next(e=>{const r=[];return n.ee((n,s)=>{const i=new ResourcePath(n),o=function(e){return[0,__PRIVATE_encodeResourcePath(e)]}(i);r.push(t.get(o).next(n=>n?PersistencePromise.resolve():(n=>t.put({targetId:0,path:__PRIVATE_encodeResourcePath(n),sequenceNumber:e.highestListenSequenceNumber}))(i)))}).next(()=>PersistencePromise.waitFor(r))})}wi(e,t){e.createObjectStore(Ve,{keyPath:de});const n=t.store(Ve),r=new __PRIVATE_MemoryCollectionParentIndex,s=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:__PRIVATE_encodeResourcePath(r)})}};return t.store(Q).ee({Y:!0},(e,t)=>{const n=new ResourcePath(e);return s(n.popLast())}).next(()=>t.store(te).ee({Y:!0},([e,t,n],r)=>{const i=__PRIVATE_decodeResourcePath(t);return s(i.popLast())}))}Si(e){const t=e.store(ce);return t.ee((e,n)=>{const r=__PRIVATE_fromDbTarget(n),s=__PRIVATE_toDbTarget(this.serializer,r);return t.put(s)})}bi(e,t){const n=t.store(Q),r=[];return n.ee((e,n)=>{const s=t.store(ne),i=function(e){return e.document?new DocumentKey(ResourcePath.fromString(e.document.name).popFirst(5)):e.noDocument?DocumentKey.fromSegments(e.noDocument.path):e.unknownDocument?DocumentKey.fromSegments(e.unknownDocument.path):fail(36783)}
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
 */(n).path.toArray(),o={prefixPath:i.slice(0,i.length-2),collectionGroup:i[i.length-2],documentId:i[i.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(s.put(o))}).next(()=>PersistencePromise.waitFor(r))}Di(e,t){const n=t.store(J),r=__PRIVATE_newIndexedDbRemoteDocumentCache(this.serializer),s=new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.Vi,this.serializer.yt);return n.J().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??__PRIVATE_documentKeySet();__PRIVATE_fromDbMutationBatch(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),PersistencePromise.forEach(n,(e,n)=>{const i=new User(n),o=__PRIVATE_IndexedDbDocumentOverlayCache.wt(this.serializer,i),a=s.getIndexManager(i),c=__PRIVATE_IndexedDbMutationQueue.wt(i,this.serializer,a,s.referenceDelegate);return new LocalDocumentsView(r,c,o,a).recalculateAndSaveOverlaysForDocumentKeys(new __PRIVATE_IndexedDbTransaction(t,__PRIVATE_ListenSequence.ce),e).next()})})}}function __PRIVATE_createQueryCache(e){e.createObjectStore(Pe,{keyPath:Te}).createIndex(Ie,Ee,{unique:!0}),e.createObjectStore(ce,{keyPath:"targetId"}).createIndex(le,he,{unique:!0}),e.createObjectStore(Ae)}const xt="IndexedDbPersistence",Ot=18e5,Nt=5e3,Bt="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Lt="main";class __PRIVATE_IndexedDbPersistence{constructor(e,t,n,r,s,i,o,a,c,u,_=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=s,this.window=i,this.document=o,this.Fi=c,this.Mi=u,this.xi=_,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=e=>Promise.resolve(),!__PRIVATE_IndexedDbPersistence.v())throw new FirestoreError(v.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new __PRIVATE_IndexedDbLruDelegateImpl(this,r),this.qi=t+Lt,this.serializer=new __PRIVATE_LocalSerializer(a),this.Ki=new __PRIVATE_SimpleDb(this.qi,this.xi,new __PRIVATE_SchemaConverter(this.serializer)),this.ci=new __PRIVATE_IndexedDbGlobalsCache,this.li=new __PRIVATE_IndexedDbTargetCache(this.referenceDelegate,this.serializer),this.remoteDocumentCache=__PRIVATE_newIndexedDbRemoteDocumentCache(this.serializer),this.Pi=new __PRIVATE_IndexedDbBundleCache,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,!1===u&&__PRIVATE_logError(xt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new FirestoreError(v.FAILED_PRECONDITION,Bt);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new __PRIVATE_ListenSequence(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>__PRIVATE_clientMetadataStore(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(__PRIVATE_isIndexedDbTransactionError(e))return __PRIVATE_logDebug(xt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return __PRIVATE_logDebug(xt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return __PRIVATE_primaryClientStore(e).get(z).next(e=>PersistencePromise.resolve(this.Xi(e)))}Yi(e){return __PRIVATE_clientMetadataStore(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Ot)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=__PRIVATE_getStore(e,me);return t.J().next(e=>{const n=this.ns(e,Ot),r=e.filter(e=>-1===n.indexOf(e));return PersistencePromise.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?PersistencePromise.resolve(!0):__PRIVATE_primaryClientStore(e).get(z).next(t=>{if(null!==t&&this.ts(t.leaseTimestampMs,Nt)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new FirestoreError(v.FAILED_PRECONDITION,Bt);return!1}}return!(!this.networkEnabled||!this.inForeground)||__PRIVATE_clientMetadataStore(e).J().next(e=>void 0===this.ns(e,Nt).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&__PRIVATE_logDebug(xt,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[G,me],e=>{const t=new __PRIVATE_IndexedDbTransaction(e,__PRIVATE_ListenSequence.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(e=>this.ts(e.updateTimeMs,t)&&!this.ss(e.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>__PRIVATE_clientMetadataStore(e).J().next(e=>this.ns(e,Ot).map(e=>e.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return __PRIVATE_IndexedDbMutationQueue.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new __PRIVATE_IndexedDbIndexManager(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return __PRIVATE_IndexedDbDocumentOverlayCache.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){__PRIVATE_logDebug(xt,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",s=function(e){return 18===e?et:17===e?Ye:16===e?Xe:15===e?Ze:14===e?Je:13===e?He:12===e?je:11===e?ze:void fail(60245)}(this.xi);let i;return this.Ki.runTransaction(e,r,s,r=>(i=new __PRIVATE_IndexedDbTransaction(r,this.ai?this.ai.next():__PRIVATE_ListenSequence.ce),"readwrite-primary"===t?this.ji(i).next(e=>!!e||this.Ji(i)).next(t=>{if(!t)throw __PRIVATE_logError(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new FirestoreError(v.FAILED_PRECONDITION,k);return n(i)}).next(e=>this.Zi(i).next(()=>e)):this.Ps(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Ps(e){return __PRIVATE_primaryClientStore(e).get(z).next(e=>{if(null!==e&&this.ts(e.leaseTimestampMs,Nt)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new FirestoreError(v.FAILED_PRECONDITION,Bt)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return __PRIVATE_primaryClientStore(e).put(z,t)}static v(){return __PRIVATE_SimpleDb.v()}Hi(e){const t=__PRIVATE_primaryClientStore(e);return t.get(z).next(e=>this.Xi(e)?(__PRIVATE_logDebug(xt,"Releasing primary lease."),t.delete(z)):PersistencePromise.resolve())}ts(e,t){const n=Date.now();return!(e<n-t||e>n&&(__PRIVATE_logError(`Detected an update time that is in the future: ${e} > ${n}`),1))}Wi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground="visible"===this.document.visibilityState)}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){"function"==typeof this.window?.addEventListener&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;c()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=null!==this.Ui?.getItem(this.rs(e));return __PRIVATE_logDebug(xt,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return __PRIVATE_logError(xt,"Failed to get zombied client id.",e),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){__PRIVATE_logError("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch(e){}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function __PRIVATE_primaryClientStore(e){return __PRIVATE_getStore(e,G)}function __PRIVATE_clientMetadataStore(e){return __PRIVATE_getStore(e,me)}function __PRIVATE_indexedDbStoragePrefix(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"
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
 */}class __PRIVATE_LocalViewChanges{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=r}static Is(e,t){let n=__PRIVATE_documentKeySet(),r=__PRIVATE_documentKeySet();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new __PRIVATE_LocalViewChanges(e,t.fromCache,n,r)}}
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
 */class __PRIVATE_QueryEngine{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=c()?8:__PRIVATE_getAndroidVersion(o())>0?6:4}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.gs(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ps(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new QueryContext;return this.ys(e,t,n).next(r=>{if(s.result=r,this.As)return this.ws(e,t,n,r.size)})}).next(()=>s.result)}ws(e,t,n,r){return n.documentReadCount<this.Vs?(__PRIVATE_getLogLevel()<=d.DEBUG&&__PRIVATE_logDebug("QueryEngine","SDK will not create cache indexes for query:",__PRIVATE_stringifyQuery(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),PersistencePromise.resolve()):(__PRIVATE_getLogLevel()<=d.DEBUG&&__PRIVATE_logDebug("QueryEngine","Query:",__PRIVATE_stringifyQuery(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(__PRIVATE_getLogLevel()<=d.DEBUG&&__PRIVATE_logDebug("QueryEngine","The SDK decides to create cache indexes for query:",__PRIVATE_stringifyQuery(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,__PRIVATE_queryToTarget(t))):PersistencePromise.resolve())}gs(e,t){if(__PRIVATE_queryMatchesAllDocuments(t))return PersistencePromise.resolve(null);let n=__PRIVATE_queryToTarget(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=__PRIVATE_queryWithLimit(t,null,"F"),n=__PRIVATE_queryToTarget(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const s=__PRIVATE_documentKeySet(...r);return this.fs.getDocuments(e,s).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const i=this.Ss(t,r);return this.bs(t,i,s,n.readTime)?this.gs(e,__PRIVATE_queryWithLimit(t,null,"F")):this.Ds(e,i,t,n)}))})))}ps(e,t,n,r){return __PRIVATE_queryMatchesAllDocuments(t)||r.isEqual(SnapshotVersion.min())?PersistencePromise.resolve(null):this.fs.getDocuments(e,n).next(s=>{const i=this.Ss(t,s);return this.bs(t,i,n,r)?PersistencePromise.resolve(null):(__PRIVATE_getLogLevel()<=d.DEBUG&&__PRIVATE_logDebug("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),__PRIVATE_stringifyQuery(t)),this.Ds(e,i,t,__PRIVATE_newIndexOffsetSuccessorFromReadTime(r,L)).next(e=>e))})}Ss(e,t){let n=new SortedSet(__PRIVATE_newQueryComparator(e));return t.forEach((t,r)=>{__PRIVATE_queryMatches(e,r)&&(n=n.add(r))}),n}bs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}ys(e,t,n){return __PRIVATE_getLogLevel()<=d.DEBUG&&__PRIVATE_logDebug("QueryEngine","Using full collection scan to execute query:",__PRIVATE_stringifyQuery(t)),this.fs.getDocumentsMatchingQuery(e,t,IndexOffset.min(),n)}Ds(e,t,n,r){return this.fs.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const kt="LocalStore",Kt=3e8;class __PRIVATE_LocalStoreImpl{constructor(e,t,n,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new SortedMap(__PRIVATE_primitiveComparator),this.Fs=new ObjectMap(e=>__PRIVATE_canonifyTarget(e),__PRIVATE_targetEquals),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new LocalDocumentsView(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function __PRIVATE_newLocalStore(e,t,n,r){return new __PRIVATE_LocalStoreImpl(e,t,n,r)}async function __PRIVATE_localStoreHandleUserChange(e,t){const n=__PRIVATE_debugCast(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Os(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=__PRIVATE_documentKeySet();for(const e of r){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ns:e,removedBatchIds:s,addedBatchIds:i}))})})}function __PRIVATE_localStoreAcknowledgeBatch(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.xs.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let o=PersistencePromise.resolve();return i.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);__PRIVATE_hardAssert(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=__PRIVATE_documentKeySet();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}function __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e){const t=__PRIVATE_debugCast(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function __PRIVATE_localStoreApplyRemoteEventToLocalCache(e,t){const n=__PRIVATE_debugCast(e),r=t.snapshotVersion;let s=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.xs.newChangeBuffer({trackRemovals:!0});s=n.vs;const o=[];t.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.li.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.li.addMatchingKeys(e,i.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(ByteString.EMPTY_BYTE_STRING,SnapshotVersion.min()).withLastLimboFreeSnapshotVersion(SnapshotVersion.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=Kt||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,u,i)&&o.push(n.li.updateTargetData(e,u))});let a=__PRIVATE_mutableDocumentMap(),c=__PRIVATE_documentKeySet();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(__PRIVATE_populateDocumentChangeBuffer(e,i,t.documentUpdates).next(e=>{a=e.Bs,c=e.Ls})),!r.isEqual(SnapshotVersion.min())){const t=n.li.getLastRemoteSnapshotVersion(e).next(t=>n.li.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return PersistencePromise.waitFor(o).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.vs=s,e))}function __PRIVATE_populateDocumentChangeBuffer(e,t,n){let r=__PRIVATE_documentKeySet(),s=__PRIVATE_documentKeySet();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=__PRIVATE_mutableDocumentMap();return n.forEach((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(SnapshotVersion.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):__PRIVATE_logDebug(kt,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{Bs:r,Ls:s}})}function __PRIVATE_localStoreGetNextMutationBatch(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=$),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function __PRIVATE_localStoreAllocateTarget(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.li.getTargetData(e,t).next(s=>s?(r=s,PersistencePromise.resolve(r)):n.li.allocateTargetId(e).next(s=>(r=new TargetData(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.li.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.vs.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.vs=n.vs.insert(e.targetId,e),n.Fs.set(t,e.targetId)),e})}async function __PRIVATE_localStoreReleaseTarget(e,t,n){const r=__PRIVATE_debugCast(e),s=r.vs.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(e){if(!__PRIVATE_isIndexedDbTransactionError(e))throw e;__PRIVATE_logDebug(kt,`Failed to update sequence numbers for target ${t}: ${e}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function __PRIVATE_localStoreExecuteQuery(e,t,n){const r=__PRIVATE_debugCast(e);let s=SnapshotVersion.min(),i=__PRIVATE_documentKeySet();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=__PRIVATE_debugCast(e),s=r.Fs.get(n);return void 0!==s?PersistencePromise.resolve(r.vs.get(s)):r.li.getTargetData(t,n)}(r,e,__PRIVATE_queryToTarget(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.Cs.getDocumentsMatchingQuery(e,t,n?s:SnapshotVersion.min(),n?i:__PRIVATE_documentKeySet())).next(e=>(__PRIVATE_setMaxReadTime(r,__PRIVATE_queryCollectionGroup(t),e),{documents:e,ks:i})))}function __PRIVATE_localStoreGetCachedTarget(e,t){const n=__PRIVATE_debugCast(e),r=__PRIVATE_debugCast(n.li),s=n.vs.get(t);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",e=>r.At(e,t).next(e=>e?e.target:null))}function __PRIVATE_localStoreGetNewDocumentChanges(e,t){const n=__PRIVATE_debugCast(e),r=n.Ms.get(t)||SnapshotVersion.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.xs.getAllFromCollectionGroup(e,t,__PRIVATE_newIndexOffsetSuccessorFromReadTime(r,L),Number.MAX_SAFE_INTEGER)).then(e=>(__PRIVATE_setMaxReadTime(n,t,e),e))}function __PRIVATE_setMaxReadTime(e,t,n){let r=e.Ms.get(t)||SnapshotVersion.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ms.set(t,r)}async function __PRIVATE_localStoreApplyBundledDocuments(e,t,n,r){const s=__PRIVATE_debugCast(e);let i=__PRIVATE_documentKeySet(),o=__PRIVATE_mutableDocumentMap();for(const e of n){const n=t.qs(e.metadata.name);e.document&&(i=i.add(n));const r=t.Ks(e);r.setReadTime(t.Us(e.metadata.readTime)),o=o.insert(n,r)}const a=s.xs.newChangeBuffer({trackRemovals:!0}),c=await __PRIVATE_localStoreAllocateTarget(s,function(e){return __PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(ResourcePath.fromString(`__bundle__/docs/${e}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",e=>__PRIVATE_populateDocumentChangeBuffer(e,a,o).next(t=>(a.apply(e),t)).next(t=>s.li.removeMatchingKeysForTargetId(e,c.targetId).next(()=>s.li.addMatchingKeys(e,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(e,t.Bs,t.Ls)).next(()=>t.Bs)))}async function __PRIVATE_localStoreSaveNamedQuery(e,t,n=__PRIVATE_documentKeySet()){const r=await __PRIVATE_localStoreAllocateTarget(e,__PRIVATE_queryToTarget(__PRIVATE_fromBundledQuery(t.bundledQuery))),s=__PRIVATE_debugCast(e);return s.persistence.runTransaction("Save named query","readwrite",e=>{const i=__PRIVATE_fromVersion(t.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Pi.saveNamedQuery(e,t);const o=r.withResumeToken(ByteString.EMPTY_BYTE_STRING,i);return s.vs=s.vs.insert(o.targetId,o),s.li.updateTargetData(e,o).next(()=>s.li.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>s.li.addMatchingKeys(e,n,r.targetId)).next(()=>s.Pi.saveNamedQuery(e,t))})}
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
 */const qt="firestore_clients";function createWebStorageClientStateKey(e,t){return`${qt}_${e}_${t}`}const Ut="firestore_mutations";function createWebStorageMutationBatchKey(e,t,n){let r=`${Ut}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const $t="firestore_targets";function createWebStorageQueryTargetMetadataKey(e,t){return`${$t}_${e}_${t}`
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
 */}const Wt="SharedClientState";class __PRIVATE_MutationMetadata{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static $s(e,t,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new FirestoreError(r.error.code,r.error.message))),i?new __PRIVATE_MutationMetadata(e,t,r.state,s):(__PRIVATE_logError(Wt,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class __PRIVATE_QueryTargetMetadata{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new FirestoreError(n.error.code,n.error.message))),s?new __PRIVATE_QueryTargetMetadata(e,n.state,r):(__PRIVATE_logError(Wt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class __PRIVATE_RemoteClientState{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=__PRIVATE_targetIdSet();for(let e=0;r&&e<n.activeTargetIds.length;++e)r=isSafeInteger(n.activeTargetIds[e]),s=s.add(n.activeTargetIds[e]);return r?new __PRIVATE_RemoteClientState(e,s):(__PRIVATE_logError(Wt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class __PRIVATE_SharedOnlineState{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new __PRIVATE_SharedOnlineState(t.clientId,t.onlineState):(__PRIVATE_logError(Wt,`Failed to parse online state: ${e}`),null)}}class __PRIVATE_LocalClientState{constructor(){this.activeTargetIds=__PRIVATE_targetIdSet()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class __PRIVATE_WebStorageSharedClientState{constructor(e,t,n,r,s){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new SortedMap(__PRIVATE_primitiveComparator),this.started=!1,this.Zs=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Xs=createWebStorageClientStateKey(this.persistenceKey,this.zs),this.Ys=function(e){return`firestore_sequence_number_${e}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new __PRIVATE_LocalClientState),this.eo=new RegExp(`^${qt}_${i}_([^_]*)$`),this.no=new RegExp(`^${Ut}_${i}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${$t}_${i}_(\\d+)$`),this.io=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.so=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const t of e){if(t===this.zs)continue;const e=this.getItem(createWebStorageClientStateKey(this.persistenceKey,t));if(e){const n=__PRIVATE_RemoteClientState.$s(t,e);n&&(this.Hs=this.Hs.insert(n.clientId,n))}}this.oo();const t=this.storage.getItem(this.io);if(t){const e=this._o(t);e&&this.ao(e)}for(const e of this.Zs)this.Js(e);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey,e));if(t){const r=__PRIVATE_QueryTargetMetadata.$s(e,t);r&&(n=r.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.lo(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return __PRIVATE_logDebug(Wt,"READ",e,t),t}setItem(e,t){__PRIVATE_logDebug(Wt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){__PRIVATE_logDebug(Wt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(__PRIVATE_logDebug(Wt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void __PRIVATE_logError("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.eo.test(t.key)){if(null==t.newValue){const e=this.Io(t.key);return this.Ro(e,null)}{const e=this.Ao(t.key,t.newValue);if(e)return this.Ro(e.clientId,e)}}else if(this.no.test(t.key)){if(null!==t.newValue){const e=this.Vo(t.key,t.newValue);if(e)return this.mo(e)}}else if(this.ro.test(t.key)){if(null!==t.newValue){const e=this.fo(t.key,t.newValue);if(e)return this.po(e)}}else if(t.key===this.io){if(null!==t.newValue){const e=this._o(t.newValue);if(e)return this.ao(e)}}else if(t.key===this.Ys){const e=function(e){let t=__PRIVATE_ListenSequence.ce;if(null!=e)try{const n=JSON.parse(e);__PRIVATE_hardAssert("number"==typeof n,30636,{yo:e}),t=n}catch(e){__PRIVATE_logError(Wt,"Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==__PRIVATE_ListenSequence.ce&&this.sequenceNumberHandler(e)}else if(t.key===this.so){const e=this.wo(t.newValue);await Promise.all(e.map(e=>this.syncEngine.So(e)))}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const r=new __PRIVATE_MutationMetadata(this.currentUser,e,t,n),s=createWebStorageMutationBatchKey(this.persistenceKey,this.currentUser,e);this.setItem(s,r.Ws())}lo(e){const t=createWebStorageMutationBatchKey(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const r=createWebStorageQueryTargetMetadataKey(this.persistenceKey,e),s=new __PRIVATE_QueryTargetMetadata(e,t,n);this.setItem(r,s.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Io(e);return __PRIVATE_RemoteClientState.$s(n,t)}Vo(e,t){const n=this.no.exec(e),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return __PRIVATE_MutationMetadata.$s(new User(s),r,t)}fo(e,t){const n=this.ro.exec(e),r=Number(n[1]);return __PRIVATE_QueryTargetMetadata.$s(r,t)}_o(e){return __PRIVATE_SharedOnlineState.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);__PRIVATE_logDebug(Wt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Hs.insert(e,t):this.Hs.remove(e),r=this.uo(this.Hs),s=this.uo(n),i=[],o=[];return s.forEach(e=>{r.has(e)||i.push(e)}),r.forEach(e=>{s.has(e)||o.push(e)}),this.syncEngine.Co(i,o).then(()=>{this.Hs=n})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=__PRIVATE_targetIdSet();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class __PRIVATE_MemorySharedClientState{constructor(){this.vo=new __PRIVATE_LocalClientState,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new __PRIVATE_LocalClientState,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */const Qt="ConnectivityMonitor";class __PRIVATE_BrowserConnectivityMonitor{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){__PRIVATE_logDebug(Qt,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){__PRIVATE_logDebug(Qt,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let Gt=null;function __PRIVATE_generateUniqueDebugId(){return null===Gt?Gt=268435456+Math.round(2147483648*Math.random()):Gt++,"0x"+Gt.toString(16)
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
 */}const zt="RestConnection",jt={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class __PRIVATE_RestConnection{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${r}`,this.$o=this.databaseId.database===_t?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Wo(e,t,n,r,s){const i=__PRIVATE_generateUniqueDebugId(),o=this.Qo(e,t.toUriEncodedString());__PRIVATE_logDebug(zt,`Sending RPC '${e}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(a,r,s);const{host:c}=new URL(o),u=l(c);return this.zo(e,o,a,n,u).then(t=>(__PRIVATE_logDebug(zt,`Received RPC '${e}' ${i}: `,t),t),t=>{throw __PRIVATE_logWarn(zt,`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",n),t})}jo(e,t,n,r,s,i){return this.Wo(e,t,n,r,s)}Go(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+D,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Qo(e,t){const n=jt[e];let r=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
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
 */const Ht="WebChannelConnection",__PRIVATE_unguardedEventListen=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};class __PRIVATE_WebChannelConnection extends __PRIVATE_RestConnection{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!__PRIVATE_WebChannelConnection.c_){const e=m();__PRIVATE_unguardedEventListen(e,f.STAT_EVENT,e=>{e.stat===S.PROXY?__PRIVATE_logDebug(Ht,"STAT_EVENT: detected buffering proxy"):e.stat===S.NOPROXY&&__PRIVATE_logDebug(Ht,"STAT_EVENT: detected no buffering proxy")}),__PRIVATE_WebChannelConnection.c_=!0}}zo(e,t,n,r,s){const i=__PRIVATE_generateUniqueDebugId();return new Promise((s,o)=>{const a=new g;a.setWithCredentials(!0),a.listenOnce(p.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case y.NO_ERROR:const t=a.getResponseJson();__PRIVATE_logDebug(Ht,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case y.TIMEOUT:__PRIVATE_logDebug(Ht,`RPC '${e}' ${i} timed out`),o(new FirestoreError(v.DEADLINE_EXCEEDED,"Request time out"));break;case y.HTTP_ERROR:const n=a.getStatus();if(__PRIVATE_logDebug(Ht,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(v).indexOf(t)>=0?t:v.UNKNOWN}(t.status);o(new FirestoreError(e,t.message))}else o(new FirestoreError(v.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new FirestoreError(v.UNAVAILABLE,"Connection failed."));break;default:fail(9055,{l_:e,streamId:i,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{__PRIVATE_logDebug(Ht,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(r);__PRIVATE_logDebug(Ht,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=__PRIVATE_generateUniqueDebugId(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},a=this.longPollingOptions.timeoutSeconds;void 0!==a&&(o.longPollingTimeout=Math.round(1e3*a)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=s.join("");__PRIVATE_logDebug(Ht,`Creating RPC '${e}' stream ${r}: ${c}`,o);const u=i.createWebChannel(c,o);this.E_(u);let _=!1,l=!1;const h=new __PRIVATE_StreamBridge({Jo:t=>{l?__PRIVATE_logDebug(Ht,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(_||(__PRIVATE_logDebug(Ht,`Opening RPC '${e}' stream ${r} transport.`),u.open(),_=!0),__PRIVATE_logDebug(Ht,`RPC '${e}' stream ${r} sending:`,t),u.send(t))},Ho:()=>u.close()});return __PRIVATE_unguardedEventListen(u,w.EventType.OPEN,()=>{l||(__PRIVATE_logDebug(Ht,`RPC '${e}' stream ${r} transport opened.`),h.i_())}),__PRIVATE_unguardedEventListen(u,w.EventType.CLOSE,()=>{l||(l=!0,__PRIVATE_logDebug(Ht,`RPC '${e}' stream ${r} transport closed`),h.o_(),this.I_(u))}),__PRIVATE_unguardedEventListen(u,w.EventType.ERROR,t=>{l||(l=!0,__PRIVATE_logWarn(Ht,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),h.o_(new FirestoreError(v.UNAVAILABLE,"The operation could not be completed")))}),__PRIVATE_unguardedEventListen(u,w.EventType.MESSAGE,t=>{if(!l){const n=t.data[0];__PRIVATE_hardAssert(!!n,16349);const s=n,i=s?.error||s[0]?.error;if(i){__PRIVATE_logDebug(Ht,`RPC '${e}' stream ${r} received error:`,i);const t=i.status;let n=function(e){const t=dt[e];if(void 0!==t)return __PRIVATE_mapCodeFromRpcCode(t)}(t),s=i.message;"NOT_FOUND"===t&&s.includes("database")&&s.includes("does not exist")&&s.includes(this.databaseId.database)&&__PRIVATE_logWarn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=v.INTERNAL,s="Unknown error status: "+t+" with message "+i.message),l=!0,h.o_(new FirestoreError(n,s)),u.close()}else __PRIVATE_logDebug(Ht,`RPC '${e}' stream ${r} received:`,n),h.__(n)}}),__PRIVATE_WebChannelConnection.u_(),setTimeout(()=>{h.s_()},0),h}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return b()}}
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
 */__PRIVATE_WebChannelConnection.c_=!1;class __PRIVATE_ExponentialBackoff{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=r,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&__PRIVATE_logDebug("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}
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
 */const Jt="PersistentStream";class __PRIVATE_PersistentStream{constructor(e,t,n,r,s,i,o,a){this.Ci=e,this.S_=n,this.b_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new __PRIVATE_ExponentialBackoff(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===v.RESOURCE_EXHAUSTED?(__PRIVATE_logError(t.toString()),__PRIVATE_logError("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===v.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new FirestoreError(v.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return __PRIVATE_logDebug(Jt,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(__PRIVATE_logDebug(Jt,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class __PRIVATE_PersistentListenStream extends __PRIVATE_PersistentStream{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=__PRIVATE_fromWatchChange(this.serializer,e),n=function(e){if(!("targetChange"in e))return SnapshotVersion.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?SnapshotVersion.min():t.readTime?__PRIVATE_fromVersion(t.readTime):SnapshotVersion.min()}(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=__PRIVATE_getEncodedDatabaseId(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=__PRIVATE_targetIsDocumentTarget(r)?{documents:__PRIVATE_toDocumentsTarget(e,r)}:{query:__PRIVATE_toQueryTarget(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=__PRIVATE_toBytes(e,t.resumeToken);const r=__PRIVATE_toInt32Proto(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(SnapshotVersion.min())>0){n.readTime=toTimestamp(e,t.snapshotVersion.toTimestamp());const r=__PRIVATE_toInt32Proto(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=__PRIVATE_toListenRequestLabels(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=__PRIVATE_getEncodedDatabaseId(this.serializer),t.removeTarget=e,this.q_(t)}}class __PRIVATE_PersistentWriteStream extends __PRIVATE_PersistentStream{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return __PRIVATE_hardAssert(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,__PRIVATE_hardAssert(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){__PRIVATE_hardAssert(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=__PRIVATE_fromWriteResults(e.writeResults,e.commitTime),n=__PRIVATE_fromVersion(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=__PRIVATE_getEncodedDatabaseId(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>toMutation(this.serializer,e))};this.q_(t)}}
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
 */class Datastore{}class __PRIVATE_DatastoreImpl extends Datastore{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new FirestoreError(v.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Wo(e,__PRIVATE_toResourcePath(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===v.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new FirestoreError(v.UNKNOWN,e.toString())})}jo(e,t,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.jo(e,__PRIVATE_toResourcePath(t,n),r,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===v.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new FirestoreError(v.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function __PRIVATE_newDatastore(e,t,n,r){return new __PRIVATE_DatastoreImpl(e,t,n,r)}class __PRIVATE_OnlineStateTracker{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(__PRIVATE_logError(t),this.aa=!1):__PRIVATE_logDebug("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null
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
 */)}}const Zt="RemoteStore";class __PRIVATE_RemoteStoreImpl{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(e=>{n.enqueueAndForget(async()=>{__PRIVATE_canUseNetwork(this)&&(__PRIVATE_logDebug(Zt,"Restarting streams for network reachability change."),await async function(e){const t=__PRIVATE_debugCast(e);t.Ia.add(4),await __PRIVATE_disableNetworkInternal(t),t.Va.set("Unknown"),t.Ia.delete(4),await __PRIVATE_enableNetworkInternal(t)}(this))})}),this.Va=new __PRIVATE_OnlineStateTracker(n,r)}}async function __PRIVATE_enableNetworkInternal(e){if(__PRIVATE_canUseNetwork(e))for(const t of e.Ra)await t(!0)}async function __PRIVATE_disableNetworkInternal(e){for(const t of e.Ra)await t(!1)}function __PRIVATE_remoteStoreListen(e,t){const n=__PRIVATE_debugCast(e);n.Ea.has(t.targetId)||(n.Ea.set(t.targetId,t),__PRIVATE_shouldStartWatchStream(n)?__PRIVATE_startWatchStream(n):__PRIVATE_ensureWatchStream(n).O_()&&__PRIVATE_sendWatchRequest(n,t))}function __PRIVATE_remoteStoreUnlisten(e,t){const n=__PRIVATE_debugCast(e),r=__PRIVATE_ensureWatchStream(n);n.Ea.delete(t),r.O_()&&__PRIVATE_sendUnwatchRequest(n,t),0===n.Ea.size&&(r.O_()?r.L_():__PRIVATE_canUseNetwork(n)&&n.Va.set("Unknown"))}function __PRIVATE_sendWatchRequest(e,t){if(e.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(SnapshotVersion.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}__PRIVATE_ensureWatchStream(e).Z_(t)}function __PRIVATE_sendUnwatchRequest(e,t){e.da.$e(t),__PRIVATE_ensureWatchStream(e).X_(t)}function __PRIVATE_startWatchStream(e){e.da=new __PRIVATE_WatchChangeAggregator({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ea.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),__PRIVATE_ensureWatchStream(e).start(),e.Va.ua()}function __PRIVATE_shouldStartWatchStream(e){return __PRIVATE_canUseNetwork(e)&&!__PRIVATE_ensureWatchStream(e).x_()&&e.Ea.size>0}function __PRIVATE_canUseNetwork(e){return 0===__PRIVATE_debugCast(e).Ia.size}function __PRIVATE_cleanUpWatchStreamState(e){e.da=void 0}async function __PRIVATE_onWatchStreamConnected(e){e.Va.set("Online")}async function __PRIVATE_onWatchStreamOpen(e){e.Ea.forEach((t,n)=>{__PRIVATE_sendWatchRequest(e,t)})}async function __PRIVATE_onWatchStreamClose(e,t){__PRIVATE_cleanUpWatchStreamState(e),__PRIVATE_shouldStartWatchStream(e)?(e.Va.ha(t),__PRIVATE_startWatchStream(e)):e.Va.set("Unknown")}async function __PRIVATE_onWatchStreamChange(e,t,n){if(e.Va.set("Online"),t instanceof __PRIVATE_WatchTargetChange&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ea.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ea.delete(r),e.da.removeTarget(r))}(e,t)}catch(n){__PRIVATE_logDebug(Zt,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await __PRIVATE_disableNetworkUntilRecovery(e,n)}else if(t instanceof __PRIVATE_DocumentWatchChange?e.da.Xe(t):t instanceof __PRIVATE_ExistenceFilterChange?e.da.st(t):e.da.tt(t),!n.isEqual(SnapshotVersion.min()))try{const t=await __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.da.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ea.get(r);s&&e.Ea.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ea.get(t);if(!r)return;e.Ea.set(t,r.withResumeToken(ByteString.EMPTY_BYTE_STRING,r.snapshotVersion)),__PRIVATE_sendUnwatchRequest(e,t);const s=new TargetData(r.target,t,n,r.sequenceNumber);__PRIVATE_sendWatchRequest(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){__PRIVATE_logDebug(Zt,"Failed to raise snapshot:",t),await __PRIVATE_disableNetworkUntilRecovery(e,t)}}async function __PRIVATE_disableNetworkUntilRecovery(e,t,n){if(!__PRIVATE_isIndexedDbTransactionError(t))throw t;e.Ia.add(1),await __PRIVATE_disableNetworkInternal(e),e.Va.set("Offline"),n||(n=()=>__PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{__PRIVATE_logDebug(Zt,"Retrying IndexedDB access"),await n(),e.Ia.delete(1),await __PRIVATE_enableNetworkInternal(e)})}function __PRIVATE_executeWithRecovery(e,t){return t().catch(n=>__PRIVATE_disableNetworkUntilRecovery(e,n,t))}async function __PRIVATE_fillWritePipeline(e){const t=__PRIVATE_debugCast(e),n=__PRIVATE_ensureWriteStream(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:$;for(;__PRIVATE_canAddToWritePipeline(t);)try{const e=await __PRIVATE_localStoreGetNextMutationBatch(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,__PRIVATE_addToWritePipeline(t,e)}catch(e){await __PRIVATE_disableNetworkUntilRecovery(t,e)}__PRIVATE_shouldStartWriteStream(t)&&__PRIVATE_startWriteStream(t)}function __PRIVATE_canAddToWritePipeline(e){return __PRIVATE_canUseNetwork(e)&&e.Ta.length<10}function __PRIVATE_addToWritePipeline(e,t){e.Ta.push(t);const n=__PRIVATE_ensureWriteStream(e);n.O_()&&n.Y_&&n.ea(t.mutations)}function __PRIVATE_shouldStartWriteStream(e){return __PRIVATE_canUseNetwork(e)&&!__PRIVATE_ensureWriteStream(e).x_()&&e.Ta.length>0}function __PRIVATE_startWriteStream(e){__PRIVATE_ensureWriteStream(e).start()}async function __PRIVATE_onWriteStreamOpen(e){__PRIVATE_ensureWriteStream(e).ra()}async function __PRIVATE_onWriteHandshakeComplete(e){const t=__PRIVATE_ensureWriteStream(e);for(const n of e.Ta)t.ea(n.mutations)}async function __PRIVATE_onMutationResult(e,t,n){const r=e.Ta.shift(),s=MutationBatchResult.from(r,t,n);await __PRIVATE_executeWithRecovery(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await __PRIVATE_fillWritePipeline(e)}async function __PRIVATE_onWriteStreamClose(e,t){t&&__PRIVATE_ensureWriteStream(e).Y_&&await async function(e,t){if(function(e){return __PRIVATE_isPermanentError(e)&&e!==v.ABORTED}(t.code)){const n=e.Ta.shift();__PRIVATE_ensureWriteStream(e).B_(),await __PRIVATE_executeWithRecovery(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await __PRIVATE_fillWritePipeline(e)}}(e,t),__PRIVATE_shouldStartWriteStream(e)&&__PRIVATE_startWriteStream(e)}async function __PRIVATE_remoteStoreHandleCredentialChange(e,t){const n=__PRIVATE_debugCast(e);n.asyncQueue.verifyOperationInProgress(),__PRIVATE_logDebug(Zt,"RemoteStore received new credentials");const r=__PRIVATE_canUseNetwork(n);n.Ia.add(3),await __PRIVATE_disableNetworkInternal(n),r&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ia.delete(3),await __PRIVATE_enableNetworkInternal(n)}async function __PRIVATE_remoteStoreApplyPrimaryState(e,t){const n=__PRIVATE_debugCast(e);t?(n.Ia.delete(2),await __PRIVATE_enableNetworkInternal(n)):t||(n.Ia.add(2),await __PRIVATE_disableNetworkInternal(n),n.Va.set("Unknown"))}function __PRIVATE_ensureWatchStream(e){return e.ma||(e.ma=function(e,t,n){const r=__PRIVATE_debugCast(e);return r.sa(),new __PRIVATE_PersistentListenStream(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)
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
 */}(e.datastore,e.asyncQueue,{Zo:__PRIVATE_onWatchStreamConnected.bind(null,e),Yo:__PRIVATE_onWatchStreamOpen.bind(null,e),t_:__PRIVATE_onWatchStreamClose.bind(null,e),H_:__PRIVATE_onWatchStreamChange.bind(null,e)}),e.Ra.push(async t=>{t?(e.ma.B_(),__PRIVATE_shouldStartWatchStream(e)?__PRIVATE_startWatchStream(e):e.Va.set("Unknown")):(await e.ma.stop(),__PRIVATE_cleanUpWatchStreamState(e))})),e.ma}function __PRIVATE_ensureWriteStream(e){return e.fa||(e.fa=function(e,t,n){const r=__PRIVATE_debugCast(e);return r.sa(),new __PRIVATE_PersistentWriteStream(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Zo:()=>Promise.resolve(),Yo:__PRIVATE_onWriteStreamOpen.bind(null,e),t_:__PRIVATE_onWriteStreamClose.bind(null,e),ta:__PRIVATE_onWriteHandshakeComplete.bind(null,e),na:__PRIVATE_onMutationResult.bind(null,e)}),e.Ra.push(async t=>{t?(e.fa.B_(),await __PRIVATE_fillWritePipeline(e)):(await e.fa.stop(),e.Ta.length>0&&(__PRIVATE_logDebug(Zt,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
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
 */}class DelayedOperation{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new __PRIVATE_Deferred,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,o=new DelayedOperation(e,t,i,r,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new FirestoreError(v.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function __PRIVATE_wrapInUserErrorIfRecoverable(e,t){if(__PRIVATE_logError("AsyncQueue",`${t}: ${e}`),__PRIVATE_isIndexedDbTransactionError(e))return new FirestoreError(v.UNAVAILABLE,`${t}: ${e}`);throw e}
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
 */class DocumentSet{static emptySet(e){return new DocumentSet(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||DocumentKey.comparator(t.key,n.key):(e,t)=>DocumentKey.comparator(e.key,t.key),this.keyedMap=documentMap(),this.sortedSet=new SortedMap(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof DocumentSet))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new DocumentSet;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n
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
 */}}class __PRIVATE_DocumentChangeSet{constructor(){this.ga=new SortedMap(DocumentKey.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):fail(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class ViewSnapshot{constructor(e,t,n,r,s,i,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new ViewSnapshot(e,t,DocumentSet.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&__PRIVATE_queryEquals(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
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
 */class __PRIVATE_QueryListenersInfo{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class __PRIVATE_EventManagerImpl{constructor(){this.queries=__PRIVATE_newQueriesObjectMap(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=__PRIVATE_debugCast(e),r=n.queries;n.queries=__PRIVATE_newQueriesObjectMap(),r.forEach((e,n)=>{for(const e of n.Sa)e.onError(t)})}(this,new FirestoreError(v.ABORTED,"Firestore shutting down"))}}function __PRIVATE_newQueriesObjectMap(){return new ObjectMap(e=>__PRIVATE_canonifyQuery(e),__PRIVATE_queryEquals)}async function __PRIVATE_eventManagerListen(e,t){const n=__PRIVATE_debugCast(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new __PRIVATE_QueryListenersInfo,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(e){const n=__PRIVATE_wrapInUserErrorIfRecoverable(e,`Initialization of query '${__PRIVATE_stringifyQuery(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,i),i.Sa.push(t),t.va(n.onlineState),i.wa&&t.Fa(i.wa)&&__PRIVATE_raiseSnapshotsInSyncEvent(n)}async function __PRIVATE_eventManagerUnlisten(e,t){const n=__PRIVATE_debugCast(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function __PRIVATE_eventManagerOnWatchChange(e,t){const n=__PRIVATE_debugCast(e);let r=!1;for(const e of t){const t=e.query,s=n.queries.get(t);if(s){for(const t of s.Sa)t.Fa(e)&&(r=!0);s.wa=e}}r&&__PRIVATE_raiseSnapshotsInSyncEvent(n)}function __PRIVATE_eventManagerOnWatchError(e,t,n){const r=__PRIVATE_debugCast(e),s=r.queries.get(t);if(s)for(const e of s.Sa)e.onError(n);r.queries.delete(t)}function __PRIVATE_raiseSnapshotsInSyncEvent(e){e.Ca.forEach(e=>{e.next()})}var Xt,Yt;(Yt=Xt||(Xt={})).Ma="default",Yt.Cache="cache";class __PRIVATE_QueryListener{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new ViewSnapshot(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=ViewSnapshot.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Xt.Cache}}
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
 */class __PRIVATE_BundleConverterImpl{constructor(e){this.serializer=e}qs(e){return fromName(this.serializer,e)}Ks(e){return e.metadata.exists?__PRIVATE_fromDocument(this.serializer,e.document,!1):MutableDocument.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return __PRIVATE_fromVersion(e)}}class __PRIVATE_BundleLoader{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=__PRIVATE_bundleInitialProgress(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const n=ResourcePath.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new __PRIVATE_BundleConverterImpl(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.qs(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||__PRIVATE_documentKeySet()).add(e);t.set(n,r)}}return t}async ja(e){const t=await __PRIVATE_localStoreApplyBundledDocuments(e,new __PRIVATE_BundleConverterImpl(this.serializer),this.Qa,this.$a.id),n=this.za(this.documents);for(const t of this.Wa)await __PRIVATE_localStoreSaveNamedQuery(e,t,n.get(t.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function __PRIVATE_bundleInitialProgress(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
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
 */class __PRIVATE_AddedLimboDocument{constructor(e){this.key=e}}class __PRIVATE_RemovedLimboDocument{constructor(e){this.key=e}}class __PRIVATE_View{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=__PRIVATE_documentKeySet(),this.mutatedKeys=__PRIVATE_documentKeySet(),this.eu=__PRIVATE_newQueryComparator(e),this.tu=new DocumentSet(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new __PRIVATE_DocumentChangeSet,r=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),_=__PRIVATE_queryMatches(this.query,t)?t:null,l=!!u&&this.mutatedKeys.has(u.key),h=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let d=!1;u&&_?u.data.isEqual(_.data)?l!==h&&(n.track({type:3,doc:_}),d=!0):this.su(u,_)||(n.track({type:2,doc:_}),d=!0,(a&&this.eu(_,a)>0||c&&this.eu(_,c)<0)&&(o=!0)):!u&&_?(n.track({type:0,doc:_}),d=!0):u&&!_&&(n.track({type:1,doc:u}),d=!0,(a||c)&&(o=!0)),d&&(_?(i=i.add(_),s=h?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{tu:i,iu:n,bs:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return fail(20277,{Vt:e})}};return n(e)-n(t)}
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
 */(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Ya.size&&this.current&&!r?1:0,c=a!==this.Xa;return this.Xa=a,0!==i.length||c?{snapshot:new ViewSnapshot(this.query,e.tu,s,i,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new __PRIVATE_DocumentChangeSet,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=__PRIVATE_documentKeySet(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Ya=this.Ya.add(e.key))});const t=[];return e.forEach(e=>{this.Ya.has(e)||t.push(new __PRIVATE_RemovedLimboDocument(e))}),this.Ya.forEach(n=>{e.has(n)||t.push(new __PRIVATE_AddedLimboDocument(n))}),t}cu(e){this.Za=e.ks,this.Ya=__PRIVATE_documentKeySet();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ViewSnapshot.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Xa,this.hasCachedResults)}}const en="SyncEngine";class __PRIVATE_QueryView{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class LimboResolution{constructor(e){this.key=e,this.hu=!1}}class __PRIVATE_SyncEngineImpl{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new ObjectMap(e=>__PRIVATE_canonifyQuery(e),__PRIVATE_queryEquals),this.Eu=new Map,this.Iu=new Set,this.Ru=new SortedMap(DocumentKey.comparator),this.Au=new Map,this.Vu=new __PRIVATE_ReferenceSet,this.du={},this.mu=new Map,this.fu=__PRIVATE_TargetIdGenerator.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function __PRIVATE_syncEngineListen(e,t,n=!0){const r=__PRIVATE_ensureWatchCallbacks(e);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await __PRIVATE_allocateTargetAndMaybeListen(r,t,n,!0),s}async function __PRIVATE_triggerRemoteStoreListen(e,t){const n=__PRIVATE_ensureWatchCallbacks(e);await __PRIVATE_allocateTargetAndMaybeListen(n,t,!0,!1)}async function __PRIVATE_allocateTargetAndMaybeListen(e,t,n,r){const s=await __PRIVATE_localStoreAllocateTarget(e.localStore,__PRIVATE_queryToTarget(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await __PRIVATE_initializeViewAndComputeSnapshot(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&__PRIVATE_remoteStoreListen(e.remoteStore,s),a}async function __PRIVATE_initializeViewAndComputeSnapshot(e,t,n,r,s){e.pu=(t,n,r)=>async function(e,t,n,r){let s=t.view.ru(n);s.bs&&(s=await __PRIVATE_localStoreExecuteQuery(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const i=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return __PRIVATE_updateTrackedLimbos(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const i=await __PRIVATE_localStoreExecuteQuery(e.localStore,t,!0),o=new __PRIVATE_View(t,i.ks),a=o.ru(i.documents),c=TargetChange.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),u=o.applyChanges(a,e.isPrimaryClient,c);__PRIVATE_updateTrackedLimbos(e,n,u.au);const _=new __PRIVATE_QueryView(t,n,o);return e.Tu.set(t,_),e.Eu.has(n)?e.Eu.get(n).push(t):e.Eu.set(n,[t]),u.snapshot}async function __PRIVATE_syncEngineUnlisten(e,t,n){const r=__PRIVATE_debugCast(e),s=r.Tu.get(t),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter(e=>!__PRIVATE_queryEquals(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await __PRIVATE_localStoreReleaseTarget(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&__PRIVATE_remoteStoreUnlisten(r.remoteStore,s.targetId),__PRIVATE_removeAndCleanupTarget(r,s.targetId)}).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)):(__PRIVATE_removeAndCleanupTarget(r,s.targetId),await __PRIVATE_localStoreReleaseTarget(r.localStore,s.targetId,!0))}async function __PRIVATE_triggerRemoteStoreUnlisten(e,t){const n=__PRIVATE_debugCast(e),r=n.Tu.get(t),s=n.Eu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),__PRIVATE_remoteStoreUnlisten(n.remoteStore,r.targetId))}async function __PRIVATE_syncEngineWrite(e,t,n){const r=__PRIVATE_syncEngineEnsureWriteCallbacks(e);try{const e=await function(e,t){const n=__PRIVATE_debugCast(e),r=Timestamp.now(),s=t.reduce((e,t)=>e.add(t.key),__PRIVATE_documentKeySet());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=__PRIVATE_mutableDocumentMap(),c=__PRIVATE_documentKeySet();return n.xs.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=__PRIVATE_mutationExtractBaseValue(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new __PRIVATE_PatchMutation(e.key,t,__PRIVATE_extractFieldMask(t.value.mapValue),Precondition.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:__PRIVATE_convertOverlayedDocumentMapToDocumentMap(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.du[e.currentUser.toKey()];r||(r=new SortedMap(__PRIVATE_primitiveComparator)),r=r.insert(t,n),e.du[e.currentUser.toKey()]=r}(r,e.batchId,n),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r,e.changes),await __PRIVATE_fillWritePipeline(r.remoteStore)}catch(e){const t=__PRIVATE_wrapInUserErrorIfRecoverable(e,"Failed to persist write");n.reject(t)}}async function __PRIVATE_syncEngineApplyRemoteEvent(e,t){const n=__PRIVATE_debugCast(e);try{const e=await __PRIVATE_localStoreApplyRemoteEventToLocalCache(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(__PRIVATE_hardAssert(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?__PRIVATE_hardAssert(r.hu,14607):e.removedDocuments.size>0&&(__PRIVATE_hardAssert(r.hu,42227),r.hu=!1))}),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n,e,t)}catch(e){await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}}function __PRIVATE_syncEngineApplyOnlineStateChange(e,t,n){const r=__PRIVATE_debugCast(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const s=r.view.va(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=__PRIVATE_debugCast(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const e of n.Sa)e.va(t)&&(r=!0)}),r&&__PRIVATE_raiseSnapshotsInSyncEvent(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function __PRIVATE_syncEngineRejectListen(e,t,n){const r=__PRIVATE_debugCast(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Au.get(t),i=s&&s.key;if(i){let e=new SortedMap(DocumentKey.comparator);e=e.insert(i,MutableDocument.newNoDocument(i,SnapshotVersion.min()));const n=__PRIVATE_documentKeySet().add(i),s=new RemoteEvent(SnapshotVersion.min(),new Map,new SortedMap(__PRIVATE_primitiveComparator),e,n);await __PRIVATE_syncEngineApplyRemoteEvent(r,s),r.Ru=r.Ru.remove(i),r.Au.delete(t),__PRIVATE_pumpEnqueuedLimboResolutions(r)}else await __PRIVATE_localStoreReleaseTarget(r.localStore,t,!1).then(()=>__PRIVATE_removeAndCleanupTarget(r,t,n)).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)}async function __PRIVATE_syncEngineApplySuccessfulWrite(e,t){const n=__PRIVATE_debugCast(e),r=t.batch.batchId;try{const e=await __PRIVATE_localStoreAcknowledgeBatch(n.localStore,t);__PRIVATE_processUserCallback(n,r,null),__PRIVATE_triggerPendingWritesCallbacks(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n,e)}catch(e){await __PRIVATE_ignoreIfPrimaryLeaseLoss(e)}}async function __PRIVATE_syncEngineRejectFailedWrite(e,t,n){const r=__PRIVATE_debugCast(e);try{const e=await function(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(__PRIVATE_hardAssert(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);__PRIVATE_processUserCallback(r,t,n),__PRIVATE_triggerPendingWritesCallbacks(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(r,e)}catch(n){await __PRIVATE_ignoreIfPrimaryLeaseLoss(n)}}async function __PRIVATE_syncEngineRegisterPendingWritesCallback(e,t){const n=__PRIVATE_debugCast(e);__PRIVATE_canUseNetwork(n.remoteStore)||__PRIVATE_logDebug(en,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=__PRIVATE_debugCast(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(n.localStore);if(e===$)return void t.resolve();const r=n.mu.get(e)||[];r.push(t),n.mu.set(e,r)}catch(e){const n=__PRIVATE_wrapInUserErrorIfRecoverable(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}function __PRIVATE_triggerPendingWritesCallbacks(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function __PRIVATE_processUserCallback(e,t,n){const r=__PRIVATE_debugCast(e);let s=r.du[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}function __PRIVATE_removeAndCleanupTarget(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Eu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Eu.delete(t),e.isPrimaryClient&&e.Vu.Gr(t).forEach(t=>{e.Vu.containsKey(t)||__PRIVATE_removeLimboTarget(e,t)})}function __PRIVATE_removeLimboTarget(e,t){e.Iu.delete(t.path.canonicalString());const n=e.Ru.get(t);null!==n&&(__PRIVATE_remoteStoreUnlisten(e.remoteStore,n),e.Ru=e.Ru.remove(t),e.Au.delete(n),__PRIVATE_pumpEnqueuedLimboResolutions(e))}function __PRIVATE_updateTrackedLimbos(e,t,n){for(const r of n)r instanceof __PRIVATE_AddedLimboDocument?(e.Vu.addReference(r.key,t),__PRIVATE_trackLimboChange(e,r)):r instanceof __PRIVATE_RemovedLimboDocument?(__PRIVATE_logDebug(en,"Document no longer in limbo: "+r.key),e.Vu.removeReference(r.key,t),e.Vu.containsKey(r.key)||__PRIVATE_removeLimboTarget(e,r.key)):fail(19791,{wu:r})}function __PRIVATE_trackLimboChange(e,t){const n=t.key,r=n.path.canonicalString();e.Ru.get(n)||e.Iu.has(r)||(__PRIVATE_logDebug(en,"New document in limbo: "+n),e.Iu.add(r),__PRIVATE_pumpEnqueuedLimboResolutions(e))}function __PRIVATE_pumpEnqueuedLimboResolutions(e){for(;e.Iu.size>0&&e.Ru.size<e.maxConcurrentLimboResolutions;){const t=e.Iu.values().next().value;e.Iu.delete(t);const n=new DocumentKey(ResourcePath.fromString(t)),r=e.fu.next();e.Au.set(r,new LimboResolution(n)),e.Ru=e.Ru.insert(n,r),__PRIVATE_remoteStoreListen(e.remoteStore,new TargetData(__PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(n.path)),r,"TargetPurposeLimboResolution",__PRIVATE_ListenSequence.ce))}}async function __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e,t,n){const r=__PRIVATE_debugCast(e),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){s.push(e);const t=__PRIVATE_LocalViewChanges.Is(a.targetId,e);i.push(t)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(e,t){const n=__PRIVATE_debugCast(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>PersistencePromise.forEach(t,t=>PersistencePromise.forEach(t.Ts,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>PersistencePromise.forEach(t.Es,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!__PRIVATE_isIndexedDbTransactionError(e))throw e;__PRIVATE_logDebug(kt,"Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.vs.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.vs=n.vs.insert(t,s)}}}(r.localStore,i))}async function __PRIVATE_syncEngineHandleCredentialChange(e,t){const n=__PRIVATE_debugCast(e);if(!n.currentUser.isEqual(t)){__PRIVATE_logDebug(en,"User change. New user:",t.toKey());const e=await __PRIVATE_localStoreHandleUserChange(n.localStore,t);n.currentUser=t,function(e){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new FirestoreError(v.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.mu.clear()}(n),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n,e.Ns)}}function __PRIVATE_syncEngineGetRemoteKeysForTarget(e,t){const n=__PRIVATE_debugCast(e),r=n.Au.get(t);if(r&&r.hu)return __PRIVATE_documentKeySet().add(r.key);{let e=__PRIVATE_documentKeySet();const r=n.Eu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}async function __PRIVATE_synchronizeViewAndComputeSnapshot(e,t){const n=__PRIVATE_debugCast(e),r=await __PRIVATE_localStoreExecuteQuery(n.localStore,t.query,!0),s=t.view.cu(r);return n.isPrimaryClient&&__PRIVATE_updateTrackedLimbos(n,t.targetId,s.au),s}async function __PRIVATE_syncEngineSynchronizeWithChangedDocuments(e,t){const n=__PRIVATE_debugCast(e);return __PRIVATE_localStoreGetNewDocumentChanges(n.localStore,t).then(e=>__PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n,e))}async function __PRIVATE_syncEngineApplyBatchState(e,t,n,r){const s=__PRIVATE_debugCast(e),i=await function(e,t){const n=__PRIVATE_debugCast(e),r=__PRIVATE_debugCast(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.Xn(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):PersistencePromise.resolve(null)))}(s.localStore,t);null!==i?("pending"===n?await __PRIVATE_fillWritePipeline(s.remoteStore):"acknowledged"===n||"rejected"===n?(__PRIVATE_processUserCallback(s,t,r||null),__PRIVATE_triggerPendingWritesCallbacks(s,t),function(e,t){__PRIVATE_debugCast(__PRIVATE_debugCast(e).mutationQueue).nr(t)}(s.localStore,t)):fail(6720,"Unknown batchState",{Su:n}),await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(s,i)):__PRIVATE_logDebug(en,"Cannot apply mutation batch with id: "+t)}async function __PRIVATE_syncEngineApplyPrimaryState(e,t){const n=__PRIVATE_debugCast(e);if(__PRIVATE_ensureWatchCallbacks(n),__PRIVATE_syncEngineEnsureWriteCallbacks(n),!0===t&&!0!==n.gu){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(n,e.toArray());n.gu=!0,await __PRIVATE_remoteStoreApplyPrimaryState(n.remoteStore,!0);for(const e of t)__PRIVATE_remoteStoreListen(n.remoteStore,e)}else if(!1===t&&!1!==n.gu){const e=[];let t=Promise.resolve();n.Eu.forEach((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?e.push(s):t=t.then(()=>(__PRIVATE_removeAndCleanupTarget(n,s),__PRIVATE_localStoreReleaseTarget(n.localStore,s,!0))),__PRIVATE_remoteStoreUnlisten(n.remoteStore,s)}),await t,await __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(n,e),function(e){const t=__PRIVATE_debugCast(e);t.Au.forEach((e,n)=>{__PRIVATE_remoteStoreUnlisten(t.remoteStore,n)}),t.Vu.zr(),t.Au=new Map,t.Ru=new SortedMap(DocumentKey.comparator)}(n),n.gu=!1,await __PRIVATE_remoteStoreApplyPrimaryState(n.remoteStore,!1)}}async function __PRIVATE_synchronizeQueryViewsAndRaiseSnapshots(e,t,n){const r=__PRIVATE_debugCast(e),s=[],i=[];for(const e of t){let t;const n=r.Eu.get(e);if(n&&0!==n.length){t=await __PRIVATE_localStoreAllocateTarget(r.localStore,__PRIVATE_queryToTarget(n[0]));for(const e of n){const t=r.Tu.get(e),n=await __PRIVATE_synchronizeViewAndComputeSnapshot(r,t);n.snapshot&&i.push(n.snapshot)}}else{const n=await __PRIVATE_localStoreGetCachedTarget(r.localStore,e);t=await __PRIVATE_localStoreAllocateTarget(r.localStore,n),await __PRIVATE_initializeViewAndComputeSnapshot(r,__PRIVATE_synthesizeTargetToQuery(n),e,!1,t.resumeToken)}s.push(t)}return r.Pu.H_(i),s}function __PRIVATE_synthesizeTargetToQuery(e){return __PRIVATE_newQuery(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function __PRIVATE_syncEngineGetActiveClients(e){return function(e){return __PRIVATE_debugCast(__PRIVATE_debugCast(e).persistence).hs()}(__PRIVATE_debugCast(e).localStore)}async function __PRIVATE_syncEngineApplyTargetState(e,t,n,r){const s=__PRIVATE_debugCast(e);if(s.gu)return void __PRIVATE_logDebug(en,"Ignoring unexpected query state notification.");const i=s.Eu.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{const e=await __PRIVATE_localStoreGetNewDocumentChanges(s.localStore,__PRIVATE_queryCollectionGroup(i[0])),r=RemoteEvent.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,ByteString.EMPTY_BYTE_STRING);await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(s,e,r);break}case"rejected":await __PRIVATE_localStoreReleaseTarget(s.localStore,t,!0),__PRIVATE_removeAndCleanupTarget(s,t,r);break;default:fail(64155,n)}}async function __PRIVATE_syncEngineApplyActiveTargetsChange(e,t,n){const r=__PRIVATE_ensureWatchCallbacks(e);if(r.gu){for(const e of t){if(r.Eu.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){__PRIVATE_logDebug(en,"Adding an already active target "+e);continue}const t=await __PRIVATE_localStoreGetCachedTarget(r.localStore,e),n=await __PRIVATE_localStoreAllocateTarget(r.localStore,t);await __PRIVATE_initializeViewAndComputeSnapshot(r,__PRIVATE_synthesizeTargetToQuery(t),n.targetId,!1,n.resumeToken),__PRIVATE_remoteStoreListen(r.remoteStore,n)}for(const e of n)r.Eu.has(e)&&await __PRIVATE_localStoreReleaseTarget(r.localStore,e,!1).then(()=>{__PRIVATE_remoteStoreUnlisten(r.remoteStore,e),__PRIVATE_removeAndCleanupTarget(r,e)}).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss)}}function __PRIVATE_ensureWatchCallbacks(e){const t=__PRIVATE_debugCast(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=__PRIVATE_syncEngineApplyRemoteEvent.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=__PRIVATE_syncEngineGetRemoteKeysForTarget.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=__PRIVATE_syncEngineRejectListen.bind(null,t),t.Pu.H_=__PRIVATE_eventManagerOnWatchChange.bind(null,t.eventManager),t.Pu.yu=__PRIVATE_eventManagerOnWatchError.bind(null,t.eventManager),t}function __PRIVATE_syncEngineEnsureWriteCallbacks(e){const t=__PRIVATE_debugCast(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=__PRIVATE_syncEngineApplySuccessfulWrite.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=__PRIVATE_syncEngineRejectFailedWrite.bind(null,t),t}function __PRIVATE_syncEngineLoadBundle(e,t,n){const r=__PRIVATE_debugCast(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await function(e,t){const n=__PRIVATE_debugCast(e),r=__PRIVATE_fromVersion(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.Pi.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,r))return await t.close(),n._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(r)),Promise.resolve(new Set);n._updateProgress(__PRIVATE_bundleInitialProgress(r));const s=new __PRIVATE_BundleLoader(r,t.serializer);let i=await t.bu();for(;i;){const e=await s.Ga(i);e&&n._updateProgress(e),i=await t.bu()}const o=await s.ja(e.localStore);return await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e,o.Ha,void 0),await function(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.Pi.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(o.progress),Promise.resolve(o.Ja)}catch(e){return __PRIVATE_logWarn(en,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)
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
 */}})(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}class __PRIVATE_MemoryOfflineComponentProvider{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=__PRIVATE_newSerializer(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return __PRIVATE_newLocalStore(this.persistence,new __PRIVATE_QueryEngine,e.initialUser,this.serializer)}Cu(e){return new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.Vi,this.serializer)}Du(e){return new __PRIVATE_MemorySharedClientState}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}__PRIVATE_MemoryOfflineComponentProvider.provider={build:()=>new __PRIVATE_MemoryOfflineComponentProvider};class __PRIVATE_LruGcMemoryOfflineComponentProvider extends __PRIVATE_MemoryOfflineComponentProvider{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){__PRIVATE_hardAssert(this.persistence.referenceDelegate instanceof __PRIVATE_MemoryLruDelegate,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new __PRIVATE_LruScheduler(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?LruParams.withCacheSize(this.cacheSizeBytes):LruParams.DEFAULT;return new __PRIVATE_MemoryPersistence(e=>__PRIVATE_MemoryLruDelegate.Vi(e,t),this.serializer)}}class __PRIVATE_IndexedDbOfflineComponentProvider extends __PRIVATE_MemoryOfflineComponentProvider{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await __PRIVATE_syncEngineEnsureWriteCallbacks(this.xu.syncEngine),await __PRIVATE_fillWritePipeline(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return __PRIVATE_newLocalStore(this.persistence,new __PRIVATE_QueryEngine,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new __PRIVATE_LruScheduler(n,e.asyncQueue,t)}Mu(e,t){const n=new __PRIVATE_IndexBackfiller(t,this.persistence);return new __PRIVATE_IndexBackfillerScheduler(e.asyncQueue,n)}Cu(e){const t=__PRIVATE_indexedDbStoragePrefix(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?LruParams.withCacheSize(this.cacheSizeBytes):LruParams.DEFAULT;return new __PRIVATE_IndexedDbPersistence(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,__PRIVATE_getWindow(),getDocument(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new __PRIVATE_MemorySharedClientState}}class __PRIVATE_MultiTabOfflineComponentProvider extends __PRIVATE_IndexedDbOfflineComponentProvider{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof __PRIVATE_WebStorageSharedClientState&&(this.sharedClientState.syncEngine={bo:__PRIVATE_syncEngineApplyBatchState.bind(null,t),Do:__PRIVATE_syncEngineApplyTargetState.bind(null,t),Co:__PRIVATE_syncEngineApplyActiveTargetsChange.bind(null,t),hs:__PRIVATE_syncEngineGetActiveClients.bind(null,t),So:__PRIVATE_syncEngineSynchronizeWithChangedDocuments.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async e=>{await __PRIVATE_syncEngineApplyPrimaryState(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){const t=__PRIVATE_getWindow();if(!__PRIVATE_WebStorageSharedClientState.v(t))throw new FirestoreError(v.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=__PRIVATE_indexedDbStoragePrefix(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new __PRIVATE_WebStorageSharedClientState(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class OnlineComponentProvider{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>__PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=__PRIVATE_syncEngineHandleCredentialChange.bind(null,this.syncEngine),await __PRIVATE_remoteStoreApplyPrimaryState(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new __PRIVATE_EventManagerImpl}createDatastore(e){const t=__PRIVATE_newSerializer(e.databaseInfo.databaseId),n=__PRIVATE_newConnection(e.databaseInfo);return __PRIVATE_newDatastore(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,s){return new __PRIVATE_RemoteStoreImpl(e,t,n,r,s)}(this.localStore,this.datastore,e.asyncQueue,e=>__PRIVATE_syncEngineApplyOnlineStateChange(this.syncEngine,e,0),__PRIVATE_BrowserConnectivityMonitor.v()?new __PRIVATE_BrowserConnectivityMonitor:new __PRIVATE_NoopConnectivityMonitor)}createSyncEngine(e,t){return function(e,t,n,r,s,i,o){const a=new __PRIVATE_SyncEngineImpl(e,t,n,r,s,i);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=__PRIVATE_debugCast(e);__PRIVATE_logDebug(Zt,"RemoteStore shutting down."),t.Ia.add(5),await __PRIVATE_disableNetworkInternal(t),t.Aa.shutdown(),t.Va.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function __PRIVATE_toByteStreamReaderHelper(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}
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
 */class __PRIVATE_BundleReaderImpl{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new __PRIVATE_Deferred,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.Ua()?this.metadata.resolve(e.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.Ka)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(null===e)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.Ku(`length string (${t}) is not valid number`);const r=await this.Uu(n);return new __PRIVATE_SizedBundleElement(JSON.parse(r),e.length+n)}$u(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async qu(){for(;this.$u()<0&&!await this.Wu(););if(0===this.buffer.length)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
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
 */class __PRIVATE_BundleReaderSyncImpl{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(n?.Ka)}`);this.metadata=n;do{n=this.bu(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new __PRIVATE_SizedBundleElement(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new FirestoreError(v.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
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
 */class Transaction{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new FirestoreError(v.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const n=__PRIVATE_debugCast(e),r={documents:t.map(e=>__PRIVATE_toName(n.serializer,e))},s=await n.jo("BatchGetDocuments",n.serializer.databaseId,ResourcePath.emptyPath(),r,t.length),i=new Map;s.forEach(e=>{const t=__PRIVATE_fromBatchGetDocumentsResponse(n.serializer,e);i.set(t.key.toString(),t)});const o=[];return t.forEach(e=>{const t=i.get(e.toString());__PRIVATE_hardAssert(!!t,55234,{key:e}),o.push(t)}),o}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new __PRIVATE_DeleteMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=DocumentKey.fromPath(t);this.mutations.push(new __PRIVATE_VerifyMutation(n,this.precondition(n)))}),await async function(e,t){const n=__PRIVATE_debugCast(e),r={writes:t.map(e=>toMutation(n.serializer,e))};await n.Wo("Commit",n.serializer.databaseId,ResourcePath.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw fail(50498,{Gu:e.constructor.name});t=SnapshotVersion.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new FirestoreError(v.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(SnapshotVersion.min())?Precondition.exists(!1):Precondition.updateTime(t):Precondition.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(SnapshotVersion.min()))throw new FirestoreError(v.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Precondition.updateTime(t)}return Precondition.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
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
 */class __PRIVATE_TransactionRunner{constructor(e,t,n,r,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=s,this.zu=n.maxAttempts,this.M_=new __PRIVATE_ExponentialBackoff(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new Transaction(this.datastore),t=this.Hu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Zu(e)}))}).catch(e=>{this.Zu(e)})})}Hu(e){try{const t=this.updateFunction(e);return!__PRIVATE_isNullOrUndefined(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!__PRIVATE_isPermanentError(t)}return!1}}
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
 */const tn="FirestoreClient";class FirestoreClient{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=User.UNAUTHENTICATED,this.clientId=__PRIVATE_AutoId.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{__PRIVATE_logDebug(tn,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(__PRIVATE_logDebug(tn,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new __PRIVATE_Deferred;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=__PRIVATE_wrapInUserErrorIfRecoverable(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function __PRIVATE_setOfflineComponentProvider(e,t){e.asyncQueue.verifyOperationInProgress(),__PRIVATE_logDebug(tn,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await __PRIVATE_localStoreHandleUserChange(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function __PRIVATE_setOnlineComponentProvider(e,t){e.asyncQueue.verifyOperationInProgress();const n=await __PRIVATE_ensureOfflineComponents(e);__PRIVATE_logDebug(tn,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>__PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>__PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore,n)),e._onlineComponents=t}async function __PRIVATE_ensureOfflineComponents(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){__PRIVATE_logDebug(tn,"Using user provided OfflineComponentProvider");try{await __PRIVATE_setOfflineComponentProvider(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===v.FAILED_PRECONDITION||e.code===v.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;__PRIVATE_logWarn("Error using user provided cache. Falling back to memory cache: "+n),await __PRIVATE_setOfflineComponentProvider(e,new __PRIVATE_MemoryOfflineComponentProvider)}}else __PRIVATE_logDebug(tn,"Using default OfflineComponentProvider"),await __PRIVATE_setOfflineComponentProvider(e,new __PRIVATE_LruGcMemoryOfflineComponentProvider(void 0));return e._offlineComponents}async function __PRIVATE_ensureOnlineComponents(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(__PRIVATE_logDebug(tn,"Using user provided OnlineComponentProvider"),await __PRIVATE_setOnlineComponentProvider(e,e._uninitializedComponentsProvider._online)):(__PRIVATE_logDebug(tn,"Using default OnlineComponentProvider"),await __PRIVATE_setOnlineComponentProvider(e,new OnlineComponentProvider))),e._onlineComponents}function __PRIVATE_getPersistence(e){return __PRIVATE_ensureOfflineComponents(e).then(e=>e.persistence)}function __PRIVATE_getLocalStore(e){return __PRIVATE_ensureOfflineComponents(e).then(e=>e.localStore)}function __PRIVATE_getRemoteStore(e){return __PRIVATE_ensureOnlineComponents(e).then(e=>e.remoteStore)}function __PRIVATE_getSyncEngine(e){return __PRIVATE_ensureOnlineComponents(e).then(e=>e.syncEngine)}function __PRIVATE_getDatastore$1(e){return __PRIVATE_ensureOnlineComponents(e).then(e=>e.datastore)}async function __PRIVATE_getEventManager(e){const t=await __PRIVATE_ensureOnlineComponents(e),n=t.eventManager;return n.onListen=__PRIVATE_syncEngineListen.bind(null,t.syncEngine),n.onUnlisten=__PRIVATE_syncEngineUnlisten.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=__PRIVATE_triggerRemoteStoreListen.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=__PRIVATE_triggerRemoteStoreUnlisten.bind(null,t.syncEngine),n}function __PRIVATE_firestoreClientEnableNetwork(e){return e.asyncQueue.enqueue(async()=>{const t=await __PRIVATE_getPersistence(e),n=await __PRIVATE_getRemoteStore(e);return t.setNetworkEnabled(!0),function(e){const t=__PRIVATE_debugCast(e);return t.Ia.delete(0),__PRIVATE_enableNetworkInternal(t)}(n)})}function __PRIVATE_firestoreClientDisableNetwork(e){return e.asyncQueue.enqueue(async()=>{const t=await __PRIVATE_getPersistence(e),n=await __PRIVATE_getRemoteStore(e);return t.setNetworkEnabled(!1),async function(e){const t=__PRIVATE_debugCast(e);t.Ia.add(0),await __PRIVATE_disableNetworkInternal(t),t.Va.set("Offline")}(n)})}function __PRIVATE_firestoreClientListen(e,t,n,r){const s=new __PRIVATE_AsyncObserver(r),i=new __PRIVATE_QueryListener(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_eventManagerListen(await __PRIVATE_getEventManager(e),i)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_eventManagerUnlisten(await __PRIVATE_getEventManager(e),i))}}function __PRIVATE_firestoreClientGetDocumentFromLocalCache(e,t){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new FirestoreError(v.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=__PRIVATE_wrapInUserErrorIfRecoverable(e,`Failed to get document '${t} from cache`);n.reject(r)}}(await __PRIVATE_getLocalStore(e),t,n)),n.promise}function __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(e,t,n={}){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new __PRIVATE_AsyncObserver({next:a=>{i.Nu(),t.enqueueAndForget(()=>__PRIVATE_eventManagerUnlisten(e,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new FirestoreError(v.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?s.reject(new FirestoreError(v.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new __PRIVATE_QueryListener(__PRIVATE_newQueryForPath(n.path),i,{includeMetadataChanges:!0,qa:!0});return __PRIVATE_eventManagerListen(e,o)}(await __PRIVATE_getEventManager(e),e.asyncQueue,t,n,r)),r.promise}function __PRIVATE_firestoreClientGetDocumentsFromLocalCache(e,t){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await __PRIVATE_localStoreExecuteQuery(e,t,!0),s=new __PRIVATE_View(t,r.ks),i=s.ru(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(e){const r=__PRIVATE_wrapInUserErrorIfRecoverable(e,`Failed to execute query '${t} against cache`);n.reject(r)}}(await __PRIVATE_getLocalStore(e),t,n)),n.promise}function __PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(e,t,n={}){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new __PRIVATE_AsyncObserver({next:n=>{i.Nu(),t.enqueueAndForget(()=>__PRIVATE_eventManagerUnlisten(e,o)),n.fromCache&&"server"===r.source?s.reject(new FirestoreError(v.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),o=new __PRIVATE_QueryListener(n,i,{includeMetadataChanges:!0,qa:!0});return __PRIVATE_eventManagerListen(e,o)}(await __PRIVATE_getEventManager(e),e.asyncQueue,t,n,r)),r.promise}function __PRIVATE_firestoreClientRunAggregateQuery(e,t,n){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>{try{const s=await __PRIVATE_getDatastore$1(e);r.resolve(async function(e,t,n){const r=__PRIVATE_debugCast(e),{request:s,gt:i,parent:o}=__PRIVATE_toRunAggregationQueryRequest(r.serializer,__PRIVATE_queryToAggregateTarget(t),n);r.connection.qo||delete s.parent;const a=(await r.jo("RunAggregationQuery",r.serializer.databaseId,o,s,1)).filter(e=>!!e.result);__PRIVATE_hardAssert(1===a.length,64727);const c=a[0].result?.aggregateFields;return Object.keys(c).reduce((e,t)=>(e[i[t]]=c[t],e),{})}(s,t,n))}catch(e){r.reject(e)}}),r.promise}function __PRIVATE_firestoreClientExecutePipeline(e,t){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>{try{const r=await __PRIVATE_getDatastore$1(e);n.resolve(async function(e,t){const n=__PRIVATE_debugCast(e),r={database:__PRIVATE_getEncodedDatabaseId(n.serializer),structuredPipeline:t._toProto(n.serializer)},s=await n.jo("ExecutePipeline",n.serializer.databaseId,ResourcePath.emptyPath(),r),i=[];return s.forEach(e=>{if(e.results&&0!==e.results.length)return e.results.forEach(t=>i.push(__PRIVATE_fromPipelineResponse(n.serializer,e,t)));i.push(__PRIVATE_fromPipelineResponse(n.serializer,e))}),i}(r,t))}catch(e){n.reject(e)}}),n.promise}function __PRIVATE_firestoreClientWrite(e,t){const n=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_syncEngineWrite(await __PRIVATE_getSyncEngine(e),t,n)),n.promise}function __PRIVATE_firestoreClientAddSnapshotsInSyncListener(e,t){const n=new __PRIVATE_AsyncObserver(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){__PRIVATE_debugCast(e).Ca.add(t),t.next()}(await __PRIVATE_getEventManager(e),n)),()=>{n.Nu(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){__PRIVATE_debugCast(e).Ca.delete(t)}(await __PRIVATE_getEventManager(e),n))}}function __PRIVATE_firestoreClientTransaction(e,t,n){const r=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>{const s=await __PRIVATE_getDatastore$1(e);new __PRIVATE_TransactionRunner(e.asyncQueue,s,n,t,r).ju()}),r.promise}function __PRIVATE_firestoreClientLoadBundle(e,t,n,r){const s=function(e,t){let n;return n="string"==typeof e?__PRIVATE_newTextEncoder().encode(e):e,function(e,t){return new __PRIVATE_BundleReaderImpl(e,t)}(function(e,t){if(e instanceof Uint8Array)return __PRIVATE_toByteStreamReaderHelper(e,t);if(e instanceof ArrayBuffer)return __PRIVATE_toByteStreamReaderHelper(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),t)}(n,__PRIVATE_newSerializer(t));e.asyncQueue.enqueueAndForget(async()=>{__PRIVATE_syncEngineLoadBundle(await __PRIVATE_getSyncEngine(e),s,r)})}function __PRIVATE_firestoreClientGetNamedQuery(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=__PRIVATE_debugCast(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.Pi.getNamedQuery(e,t))}(await __PRIVATE_getLocalStore(e),t))}function __PRIVATE_createBundleReaderSync(e,t){return function(e,t){return new __PRIVATE_BundleReaderSyncImpl(e,t)}(e,t)}function __PRIVATE_firestoreClientSetIndexConfiguration(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const n=__PRIVATE_debugCast(e),r=n.indexManager,s=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>
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
function(e,t,n,r,s){e=[...e],t=[...t],e.sort(n),t.sort(n);const i=e.length,o=t.length;let a=0,c=0;for(;a<o&&c<i;){const i=n(e[c],t[a]);i<0?s(e[c++]):i>0?r(t[a++]):(a++,c++)}for(;a<o;)r(t[a++]);for(;c<i;)s(e[c++])}(n,t,__PRIVATE_fieldIndexSemanticComparator,t=>{s.push(r.addFieldIndex(e,t))},t=>{s.push(r.deleteFieldIndex(e,t))})).next(()=>PersistencePromise.waitFor(s)))}(await __PRIVATE_getLocalStore(e),t))}function __PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){__PRIVATE_debugCast(e).Cs.As=t}(await __PRIVATE_getLocalStore(e),t))}function __PRIVATE_firestoreClientDeleteAllFieldIndexes(e){return e.asyncQueue.enqueue(async()=>function(e){const t=__PRIVATE_debugCast(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))}(await __PRIVATE_getLocalStore(e)))}
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
 */}const nn="ComponentProvider",rn=new Map;function __PRIVATE_makeDatabaseInfo(e,t,n,r,s){return new DatabaseInfo(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,__PRIVATE_cloneLongPollingOptions(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}
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
 */const sn="firestore.googleapis.com",on=!0;class FirestoreSettingsImpl{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new FirestoreError(v.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=sn,this.ssl=on}else this.host=e.host,this.ssl=e.ssl??on;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=vt;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<Mt)throw new FirestoreError(v.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}__PRIVATE_validateIsNotUsedTogether("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=__PRIVATE_cloneLongPollingOptions(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new FirestoreError(v.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new FirestoreError(v.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new FirestoreError(v.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Firestore$1{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new FirestoreSettingsImpl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new FirestoreError(v.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new FirestoreError(v.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new FirestoreSettingsImpl(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new __PRIVATE_EmptyAuthCredentialsProvider;switch(e.type){case"firstParty":return new __PRIVATE_FirstPartyAuthCredentialsProvider(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new FirestoreError(v.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=rn.get(e);t&&(__PRIVATE_logDebug(nn,"Removing Datastore"),rn.delete(e),t.terminate())}(this),Promise.resolve()}}function connectFirestoreEmulator(e,t,n,r={}){e=__PRIVATE_cast(e,Firestore$1);const s=l(t),i=e._getSettings(),o={...i,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;s&&h(`https://${a}`),i.host!==sn&&i.host!==a&&__PRIVATE_logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:s,emulatorOptions:r};if(!P(c,o)&&(e._setSettings(c),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=User.MOCK_USER;else{t=T(r.mockUserToken,e._app?.options.projectId);const s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new FirestoreError(v.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new User(s)}e._authCredentials=new __PRIVATE_EmulatorAuthCredentialsProvider(new __PRIVATE_OAuthToken(t,n))}}
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
 */class Query{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Query(this.firestore,e,this._query)}}class DocumentReference{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new CollectionReference(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new DocumentReference(this.firestore,e,this._key)}toJSON(){return{type:DocumentReference._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(__PRIVATE_validateJSON(t,DocumentReference._jsonSchema))return new DocumentReference(e,n||null,new DocumentKey(ResourcePath.fromString(t.referencePath)))}}DocumentReference._jsonSchemaVersion="firestore/documentReference/1.0",DocumentReference._jsonSchema={type:property("string",DocumentReference._jsonSchemaVersion),referencePath:property("string")};class CollectionReference extends Query{constructor(e,t,n){super(e,t,__PRIVATE_newQueryForPath(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new DocumentReference(this.firestore,null,new DocumentKey(e))}withConverter(e){return new CollectionReference(this.firestore,e,this._path)}}function __PRIVATE_isCollectionReference(e){return e instanceof CollectionReference}function collection(e,t,...n){if(e=I(e),__PRIVATE_validateNonEmptyArgument("collection","path",t),e instanceof Firestore$1){const r=ResourcePath.fromString(t,...n);return __PRIVATE_validateCollectionPath(r),new CollectionReference(e,null,r)}{if(!(e instanceof DocumentReference||e instanceof CollectionReference))throw new FirestoreError(v.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ResourcePath.fromString(t,...n));return __PRIVATE_validateCollectionPath(r),new CollectionReference(e.firestore,null,r)}}function collectionGroup(e,t){if(e=__PRIVATE_cast(e,Firestore$1),__PRIVATE_validateNonEmptyArgument("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new FirestoreError(v.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Query(e,null,function(e){return new __PRIVATE_QueryImpl(ResourcePath.emptyPath(),e)}(t))}function doc(e,t,...n){if(e=I(e),1===arguments.length&&(t=__PRIVATE_AutoId.newId()),__PRIVATE_validateNonEmptyArgument("doc","path",t),e instanceof Firestore$1){const r=ResourcePath.fromString(t,...n);return __PRIVATE_validateDocumentPath(r),new DocumentReference(e,null,new DocumentKey(r))}{if(!(e instanceof DocumentReference||e instanceof CollectionReference))throw new FirestoreError(v.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ResourcePath.fromString(t,...n));return __PRIVATE_validateDocumentPath(r),new DocumentReference(e.firestore,e instanceof CollectionReference?e.converter:null,new DocumentKey(r))}}function refEqual(e,t){return e=I(e),t=I(t),(e instanceof DocumentReference||e instanceof CollectionReference)&&(t instanceof DocumentReference||t instanceof CollectionReference)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function queryEqual(e,t){return e=I(e),t=I(t),e instanceof Query&&t instanceof Query&&e.firestore===t.firestore&&__PRIVATE_queryEquals(e._query,t._query)&&e.converter===t.converter
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
 */}const _n="AsyncQueue";class __PRIVATE_AsyncQueueImpl{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new __PRIVATE_ExponentialBackoff(this,"async_queue_retry"),this._c=()=>{const e=getDocument();e&&__PRIVATE_logDebug(_n,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=getDocument();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=getDocument();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new __PRIVATE_Deferred;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(0!==this.Yu.length){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!__PRIVATE_isIndexedDbTransactionError(e))throw e;__PRIVATE_logDebug(_n,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,__PRIVATE_logError("INTERNAL UNHANDLED ERROR: ",__PRIVATE_getMessageOrStack(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=DelayedOperation.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&fail(47125,{Pc:__PRIVATE_getMessageOrStack(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function __PRIVATE_getMessageOrStack(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
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
 */}class LoadBundleTask{constructor(){this._progressObserver={},this._taskCompletionResolver=new __PRIVATE_Deferred,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)
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
 */}}const an=-1;class Firestore extends Firestore$1{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new __PRIVATE_AsyncQueueImpl,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new __PRIVATE_AsyncQueueImpl(e),this._firestoreClient=void 0,await e}}}function initializeFirestore(e,t,n){n||(n=_t);const r=_getProvider(e,"firestore");if(r.isInitialized(n)){const e=r.getImmediate({identifier:n}),s=r.getOptions(n);if(P(s,t))return e;throw new FirestoreError(v.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new FirestoreError(v.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<Mt)throw new FirestoreError(v.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&l(t.host)&&h(t.host),r.initialize({options:t,instanceIdentifier:n})}function getFirestore(e,n){const r="object"==typeof e?e:t(),s="string"==typeof e?e:n||_t,i=_getProvider(r,"firestore").getImmediate({identifier:s});if(!i._initialized){const e=E("firestore");e&&connectFirestoreEmulator(i,...e)}return i}function ensureFirestoreConfigured(e){if(e._terminated)throw new FirestoreError(v.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||__PRIVATE_configureFirestore(e),e._firestoreClient}function __PRIVATE_configureFirestore(e){const t=e._freezeSettings(),n=__PRIVATE_makeDatabaseInfo(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new FirestoreClient(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function enableIndexedDbPersistence(e,t){__PRIVATE_logWarn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return __PRIVATE_setPersistenceProviders(e,OnlineComponentProvider.provider,{build:e=>new __PRIVATE_IndexedDbOfflineComponentProvider(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function enableMultiTabIndexedDbPersistence(e){__PRIVATE_logWarn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();__PRIVATE_setPersistenceProviders(e,OnlineComponentProvider.provider,{build:e=>new __PRIVATE_MultiTabOfflineComponentProvider(e,t.cacheSizeBytes)})}function __PRIVATE_setPersistenceProviders(e,t,n){if((e=__PRIVATE_cast(e,Firestore))._firestoreClient||e._terminated)throw new FirestoreError(v.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new FirestoreError(v.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},__PRIVATE_configureFirestore(e)}function clearIndexedDbPersistence(e){if(e._initialized&&!e._terminated)throw new FirestoreError(v.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new __PRIVATE_Deferred;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!__PRIVATE_SimpleDb.v())return Promise.resolve();const t=e+Lt;await __PRIVATE_SimpleDb.delete(t)}(__PRIVATE_indexedDbStoragePrefix(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function waitForPendingWrites(e){return function(e){const t=new __PRIVATE_Deferred;return e.asyncQueue.enqueueAndForget(async()=>__PRIVATE_syncEngineRegisterPendingWritesCallback(await __PRIVATE_getSyncEngine(e),t)),t.promise}(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)))}function enableNetwork(e){return __PRIVATE_firestoreClientEnableNetwork(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)))}function disableNetwork(e){return __PRIVATE_firestoreClientDisableNetwork(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)))}function terminate(e){return n(e.app,"firestore",e._databaseId.database),e._delete()}function loadBundle(e,t){const n=ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)),r=new LoadBundleTask;return __PRIVATE_firestoreClientLoadBundle(n,e._databaseId,t,r),r}function namedQuery(e,t){return __PRIVATE_firestoreClientGetNamedQuery(ensureFirestoreConfigured(e=__PRIVATE_cast(e,Firestore)),t).then(t=>t?new Query(e,null,t.query):null)}
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
 */class Bytes{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bytes(ByteString.fromBase64String(e))}catch(e){throw new FirestoreError(v.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Bytes(ByteString.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Bytes._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(__PRIVATE_validateJSON(e,Bytes._jsonSchema))return Bytes.fromBase64String(e.bytes)}}Bytes._jsonSchemaVersion="firestore/bytes/1.0",Bytes._jsonSchema={type:property("string",Bytes._jsonSchemaVersion),bytes:property("string")};
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
class FieldPath{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new FirestoreError(v.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new FieldPath$1(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function documentId(){return new FieldPath(x)}
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
 */class GeoPoint{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new FirestoreError(v.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new FirestoreError(v.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return __PRIVATE_primitiveComparator(this._lat,e._lat)||__PRIVATE_primitiveComparator(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:GeoPoint._jsonSchemaVersion}}static fromJSON(e){if(__PRIVATE_validateJSON(e,GeoPoint._jsonSchema))return new GeoPoint(e.latitude,e.longitude)}}GeoPoint._jsonSchemaVersion="firestore/geoPoint/1.0",GeoPoint._jsonSchema={type:property("string",GeoPoint._jsonSchemaVersion),latitude:property("number"),longitude:property("number")};
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
class VectorValue{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:VectorValue._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(__PRIVATE_validateJSON(e,VectorValue._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new VectorValue(e.vectorValues);throw new FirestoreError(v.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}VectorValue._jsonSchemaVersion="firestore/vectorValue/1.0",VectorValue._jsonSchema={type:property("string",VectorValue._jsonSchemaVersion),vectorValues:property("object")};
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
const un=/^__.*__$/;class ParsedSetData{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new __PRIVATE_PatchMutation(e,this.data,this.fieldMask,t,this.fieldTransforms):new __PRIVATE_SetMutation(e,this.data,t,this.fieldTransforms)}}class ParsedUpdateData{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new __PRIVATE_PatchMutation(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function __PRIVATE_isWrite(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw fail(40011,{dataSource:e})}}class __PRIVATE_ParseContextImpl{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new __PRIVATE_ParseContextImpl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return __PRIVATE_createError(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(0===e.length)throw this.yc("Document fields must not be empty");if(__PRIVATE_isWrite(this.dataSource)&&un.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class __PRIVATE_UserDataReader{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||__PRIVATE_newSerializer(e)}A(e,t,n,r=!1){return new __PRIVATE_ParseContextImpl({dataSource:e,methodName:t,targetDoc:n,path:FieldPath$1.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function __PRIVATE_newUserDataReader(e){const t=e._freezeSettings(),n=__PRIVATE_newSerializer(e._databaseId);return new __PRIVATE_UserDataReader(e._databaseId,!!t.ignoreUndefinedProperties,n)}function __PRIVATE_parseSetData(e,t,n,r,s,i={}){const o=e.A(i.merge||i.mergeFields?2:0,t,n,s);__PRIVATE_validatePlainObject("Data must be an object, but it was:",o,r);const a=__PRIVATE_parseObject(r,o);let c,u;if(i.merge)c=new FieldMask(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=__PRIVATE_fieldPathFromArgument(t,r,n);if(!o.contains(s))throw new FirestoreError(v.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);__PRIVATE_fieldMaskContains(e,s)||e.push(s)}c=new FieldMask(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new ParsedSetData(new ObjectValue(a),c,u)}class __PRIVATE_DeleteFieldValueImpl extends FieldValue{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof __PRIVATE_DeleteFieldValueImpl}}function __PRIVATE_createSentinelChildContext(e,t,n){return new __PRIVATE_ParseContextImpl({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class __PRIVATE_ServerTimestampFieldValueImpl extends FieldValue{_toFieldTransform(e){return new FieldTransform(e.path,new __PRIVATE_ServerTimestampTransform)}isEqual(e){return e instanceof __PRIVATE_ServerTimestampFieldValueImpl}}class __PRIVATE_ArrayUnionFieldValueImpl extends FieldValue{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=__PRIVATE_createSentinelChildContext(this,e,!0),n=this.Sc.map(e=>__PRIVATE_parseData(e,t)),r=new __PRIVATE_ArrayUnionTransformOperation(n);return new FieldTransform(e.path,r)}isEqual(e){return e instanceof __PRIVATE_ArrayUnionFieldValueImpl&&P(this.Sc,e.Sc)}}class __PRIVATE_ArrayRemoveFieldValueImpl extends FieldValue{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=__PRIVATE_createSentinelChildContext(this,e,!0),n=this.Sc.map(e=>__PRIVATE_parseData(e,t)),r=new __PRIVATE_ArrayRemoveTransformOperation(n);return new FieldTransform(e.path,r)}isEqual(e){return e instanceof __PRIVATE_ArrayRemoveFieldValueImpl&&P(this.Sc,e.Sc)}}class __PRIVATE_NumericIncrementFieldValueImpl extends FieldValue{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new __PRIVATE_NumericIncrementTransformOperation(e.serializer,toNumber(e.serializer,this.bc));return new FieldTransform(e.path,t)}isEqual(e){return e instanceof __PRIVATE_NumericIncrementFieldValueImpl&&this.bc===e.bc}}function __PRIVATE_parseUpdateData(e,t,n,r){const s=e.A(1,t,n);__PRIVATE_validatePlainObject("Data must be an object, but it was:",s,r);const i=[],o=ObjectValue.empty();forEach(r,(e,r)=>{const a=__PRIVATE_fieldPathFromDotSeparatedString(t,e,n);r=I(r);const c=s.fc(a);if(r instanceof __PRIVATE_DeleteFieldValueImpl)i.push(a);else{const e=__PRIVATE_parseData(r,c);null!=e&&(i.push(a),o.set(a,e))}});const a=new FieldMask(i);return new ParsedUpdateData(o,a,s.fieldTransforms)}function __PRIVATE_parseUpdateVarargs(e,t,n,r,s,i){const o=e.A(1,t,n),a=[__PRIVATE_fieldPathFromArgument(t,r,n)],c=[s];if(i.length%2!=0)throw new FirestoreError(v.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)a.push(__PRIVATE_fieldPathFromArgument(t,i[e])),c.push(i[e+1]);const u=[],_=ObjectValue.empty();for(let e=a.length-1;e>=0;--e)if(!__PRIVATE_fieldMaskContains(u,a[e])){const t=a[e];let n=c[e];n=I(n);const r=o.fc(t);if(n instanceof __PRIVATE_DeleteFieldValueImpl)u.push(t);else{const e=__PRIVATE_parseData(n,r);null!=e&&(u.push(t),_.set(t,e))}}const l=new FieldMask(u);return new ParsedUpdateData(_,l,o.fieldTransforms)}function __PRIVATE_parseQueryValue(e,t,n,r=!1){return __PRIVATE_parseData(n,e.A(r?4:3,t))}function __PRIVATE_parseData(e,t){if(__PRIVATE_looksLikeJsonObject(e=I(e)))return __PRIVATE_validatePlainObject("Unsupported field value:",t,e),__PRIVATE_parseObject(e,t);if(e instanceof FieldValue)return function(e,t){if(!__PRIVATE_isWrite(t.dataSource))throw t.yc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.yc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.yc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=__PRIVATE_parseData(s,t.gc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=I(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return toNumber(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=Timestamp.fromDate(e);return{timestampValue:toTimestamp(t.serializer,n)}}if(e instanceof Timestamp){const n=new Timestamp(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:toTimestamp(t.serializer,n)}}if(e instanceof GeoPoint)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Bytes)return{bytesValue:__PRIVATE_toBytes(t.serializer,e._byteString)};if(e instanceof DocumentReference){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:__PRIVATE_toResourceName(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof VectorValue)return function(e,t){const n=e instanceof VectorValue?e.toArray():e,r={fields:{[at]:{stringValue:lt},[ht]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.yc("VectorValues must only contain numeric values.");return __PRIVATE_toDouble(t.serializer,e)})}}}};return{mapValue:r}}(e,t);if(__PRIVATE_isProtoValueSerializable(e))return e._toProto(t.serializer);throw t.yc(`Unsupported field value: ${__PRIVATE_valueDescription(e)}`)}(e,t)}function __PRIVATE_parseObject(e,t){const n={};return isEmpty(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):forEach(e,(e,r)=>{const s=__PRIVATE_parseData(r,t.dc(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function __PRIVATE_looksLikeJsonObject(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Timestamp||e instanceof GeoPoint||e instanceof Bytes||e instanceof DocumentReference||e instanceof FieldValue||e instanceof VectorValue||__PRIVATE_isProtoValueSerializable(e))}function __PRIVATE_validatePlainObject(e,t,n){if(!__PRIVATE_looksLikeJsonObject(n)||!__PRIVATE_isPlainObject(n)){const r=__PRIVATE_valueDescription(n);throw"an object"===r?t.yc(e+" a custom object"):t.yc(e+" "+r)}}function __PRIVATE_fieldPathFromArgument(e,t,n){if((t=I(t))instanceof FieldPath)return t._internalPath;if("string"==typeof t)return __PRIVATE_fieldPathFromDotSeparatedString(e,t);throw __PRIVATE_createError("Field path arguments must be of type string or ",e,!1,void 0,n)}const cn=new RegExp("[~\\*/\\[\\]]");function __PRIVATE_fieldPathFromDotSeparatedString(e,t,n){if(t.search(cn)>=0)throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new FieldPath(...t.split("."))._internalPath}catch(r){throw __PRIVATE_createError(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function __PRIVATE_createError(e,t,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new FirestoreError(v.INVALID_ARGUMENT,a+e+c)}function __PRIVATE_fieldMaskContains(e,t){return e.some(e=>e.isEqual(t))}function __PRIVATE_isUserData(e){return"function"==typeof e._readUserData}
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
 */class AbstractUserDataWriter{convertValue(e,t="none"){switch(__PRIVATE_typeOrder(e)){case 0:return null;case 1:return e.booleanValue;case 2:return __PRIVATE_normalizeNumber(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(__PRIVATE_normalizeByteString(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw fail(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return forEach(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[ht].arrayValue?.values?.map(e=>__PRIVATE_normalizeNumber(e.doubleValue));return new VectorValue(t)}convertGeoPoint(e){return new GeoPoint(__PRIVATE_normalizeNumber(e.latitude),__PRIVATE_normalizeNumber(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=__PRIVATE_getPreviousValue(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(__PRIVATE_getLocalWriteTime(e));default:return null}}convertTimestamp(e){const t=__PRIVATE_normalizeTimestamp(e);return new Timestamp(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ResourcePath.fromString(e);__PRIVATE_hardAssert(__PRIVATE_isValidResourceName(n),9688,{name:e});const r=new DatabaseId(n.get(1),n.get(3)),s=new DocumentKey(n.popFirst(5));return r.isEqual(t)||__PRIVATE_logError(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s
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
 */class OptionsUtil{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=ObjectValue.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const s=this.optionDefinitions[r];if(r in e){const i=e[r];let o;s.nestedOptions&&__PRIVATE_isPlainObject(i)?o={mapValue:{fields:new OptionsUtil(s.nestedOptions).getOptionsProto(t,i)}}:i&&(o=__PRIVATE_parseData(i,t)??void 0),o&&n.set(FieldPath$1.fromServerFormat(s.serverName),o)}}return n}getOptionsProto(e,t,n){const r=this._getKnownOptions(t,e);if(n){const t=new Map(__PRIVATE_mapToArray(n,(t,n)=>[FieldPath$1.fromServerFormat(n),void 0!==t?__PRIVATE_parseData(t,e):null]));r.setAll(t)}return r.value.mapValue.fields??{}}}
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
 */function _internalQueryToProtoQueryTarget(e){const t=ensureFirestoreConfigured(__PRIVATE_cast(e.firestore,Firestore)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:__PRIVATE_toQueryTarget(n,__PRIVATE_queryToTarget(e._query)).ft}function _internalAggregationQueryToProtoRunAggregationQueryRequest(e,t){const n=__PRIVATE_mapToArray(t,(e,t)=>new __PRIVATE_AggregateImpl(t,e.aggregateType,e._internalFieldPath)),r=ensureFirestoreConfigured(__PRIVATE_cast(e.firestore,Firestore)),s=r._onlineComponents?.datastore.serializer;return void 0===s?null:__PRIVATE_toRunAggregationQueryRequest(s,__PRIVATE_queryToAggregateTarget(e._query),n,!0).request}function _internalPipelineToExecutePipelineRequestProto(e){const t=function(e){if(e._terminated)throw new FirestoreError(v.FAILED_PRECONDITION,"The client has already been terminated.");if(!rn.has(e)){__PRIVATE_logDebug(nn,"Initializing Datastore");const t=__PRIVATE_newConnection(__PRIVATE_makeDatabaseInfo(e._databaseId,e.app.options.appId||"",e._persistenceKey,e.app.options.apiKey,e._freezeSettings())),n=__PRIVATE_newSerializer(e._databaseId),r=__PRIVATE_newDatastore(e._authCredentials,e._appCheckCredentials,t,n);rn.set(e,r)}return rn.get(e)}(__PRIVATE_cast(e._db,Firestore)),n=t.serializer;if(void 0===n)return null;const r=new StructuredPipeline(e,new __PRIVATE_StructuredPipelineOptions);return{database:__PRIVATE_getEncodedDatabaseId(n),structuredPipeline:r._toProto(n)}}export{ViewSnapshot as $,AbstractUserDataWriter as A,Bound as B,CompositeFilter as C,DocumentReference as D,__PRIVATE_mapToArray as E,Firestore as F,__PRIVATE_firestoreClientRunAggregateQuery as G,__PRIVATE_ExpUserDataWriter as H,__PRIVATE_AggregateImpl as I,OnlineComponentProvider as J,__PRIVATE_LruGcMemoryOfflineComponentProvider as K,__PRIVATE_MemoryOfflineComponentProvider as L,__PRIVATE_IndexedDbOfflineComponentProvider as M,__PRIVATE_MultiTabOfflineComponentProvider as N,ObjectValue as O,property as P,Query as Q,ResourcePath as R,__PRIVATE_validateJSON as S,__PRIVATE_newSerializer as T,__PRIVATE_createBundleReaderSync as U,__PRIVATE_BundleLoader as V,__PRIVATE_fromDocument as W,__PRIVATE_AutoId as X,__PRIVATE_fromBundledQuery as Y,DocumentSet as Z,__PRIVATE_setSDKVersion as _,__PRIVATE_FirebaseAuthCredentialsProvider as a,__PRIVATE_debugAssert as a$,__PRIVATE_documentKeySet as a0,fail as a1,__PRIVATE_parseSetData as a2,Precondition as a3,FieldPath as a4,__PRIVATE_parseUpdateVarargs as a5,__PRIVATE_parseUpdateData as a6,__PRIVATE_DeleteMutation as a7,__PRIVATE_firestoreClientTransaction as a8,__PRIVATE_firestoreClientGetDocumentViaSnapshotListener as a9,enableNetwork as aA,getFirestore as aB,initializeFirestore as aC,terminate as aD,waitForPendingWrites as aE,LoadBundleTask as aF,collection as aG,collectionGroup as aH,CollectionReference as aI,refEqual as aJ,FieldValue as aK,arrayRemove as aL,arrayUnion as aM,deleteField as aN,increment as aO,serverTimestamp as aP,vector as aQ,VectorValue as aR,setLogLevel as aS,GeoPoint as aT,Timestamp as aU,an as aV,__PRIVATE_isBase64Available as aW,DatabaseId as aX,_internalQueryToProtoQueryTarget as aY,_internalAggregationQueryToProtoRunAggregationQueryRequest as aZ,__PRIVATE_validateIsNotUsedTogether as a_,__PRIVATE_firestoreClientGetDocumentFromLocalCache as aa,__PRIVATE_firestoreClientGetDocumentsViaSnapshotListener as ab,__PRIVATE_firestoreClientGetDocumentsFromLocalCache as ac,doc as ad,__PRIVATE_newQueryForPath as ae,__PRIVATE_firestoreClientListen as af,__PRIVATE_firestoreClientAddSnapshotsInSyncListener as ag,__PRIVATE_firestoreClientWrite as ah,loadBundle as ai,namedQuery as aj,__PRIVATE_logWarn as ak,__PRIVATE_firestoreClientSetIndexConfiguration as al,__PRIVATE_fieldPathFromDotSeparatedString as am,IndexSegment as an,FieldIndex as ao,IndexState as ap,__PRIVATE_firestoreClientDeleteAllFieldIndexes as aq,__PRIVATE_logDebug as ar,__PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled as as,__PRIVATE_setTestingHooksSpi as at,documentId as au,clearIndexedDbPersistence as av,connectFirestoreEmulator as aw,disableNetwork as ax,enableIndexedDbPersistence as ay,enableMultiTabIndexedDbPersistence as az,__PRIVATE_FirebaseAppCheckTokenProvider as b,FieldPath$1 as b0,ByteString as b1,__PRIVATE_EmptyAuthCredentialsProvider as b2,__PRIVATE_EmptyAppCheckTokenProvider as b3,__PRIVATE_isPlainObject as b4,__PRIVATE_isString as b5,x as b6,__PRIVATE_hardAssert as b7,__PRIVATE_parseData as b8,__PRIVATE_toStringValue as b9,__PRIVATE_toMapValue as ba,__PRIVATE_isDocumentQuery$1 as bb,OptionsUtil as bc,toNumber as bd,__PRIVATE_toPipelineValue as be,__PRIVATE_isUserData as bf,__PRIVATE_isCollectionReference as bg,__PRIVATE_isOptionalEqual as bh,__PRIVATE_isNumber$1 as bi,__PRIVATE_StructuredPipelineOptions as bj,StructuredPipeline as bk,__PRIVATE_firestoreClientExecutePipeline as bl,_internalPipelineToExecutePipelineRequestProto as bm,__PRIVATE_databaseIdFromApp as c,__PRIVATE_fieldPathFromArgument as d,__PRIVATE_queryWithAddedFilter as e,__PRIVATE_newUserDataReader as f,__PRIVATE_queryWithAddedOrderBy as g,__PRIVATE_queryWithLimit as h,__PRIVATE_validatePositiveNumber as i,__PRIVATE_queryWithStartAt as j,__PRIVATE_queryWithEndAt as k,FirestoreError as l,v as m,__PRIVATE_parseQueryValue as n,FieldFilter as o,OrderBy as p,__PRIVATE_queryNormalizedOrderBy as q,__PRIVATE_refValue as r,__PRIVATE_isServerTimestamp as s,__PRIVATE_isCollectionGroupQuery as t,DocumentKey as u,__PRIVATE_valueDescription as v,Bytes as w,queryEqual as x,__PRIVATE_cast as y,ensureFirestoreConfigured as z};