(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,"[project]/retired/node_modules/@firebase/firestore/dist/common-091f2944.esm.js [app-client] (ecmascript)",e=>{"use strict";e.s(["$",()=>Qd,"A",()=>af,"B",()=>Cd,"C",()=>T,"D",()=>Zh,"E",()=>un,"F",()=>dd,"G",()=>Mh,"H",()=>cf,"I",()=>oe,"J",()=>gu,"K",()=>qh,"L",()=>Il,"M",()=>Xi,"N",()=>P,"O",()=>hr,"P",()=>Do,"Q",()=>Xh,"R",()=>Q,"S",()=>sl,"T",()=>Ss,"U",()=>w,"V",()=>ol,"W",()=>Ud,"X",()=>js,"Y",()=>Dd,"Z",()=>Wd,"_",()=>l,"a",()=>N,"a$",()=>lf,"a0",()=>si,"a1",()=>Lh,"a2",()=>kh,"a3",()=>Ah,"a4",()=>Rh,"a5",()=>Fh,"a6",()=>sd,"a7",()=>Wr,"a8",()=>Nh,"a9",()=>Sd,"aA",()=>Fd,"aB",()=>In,"aC",()=>Mn,"aD",()=>M,"aE",()=>C,"aF",()=>H,"aG",()=>b,"aH",()=>vf,"aI",()=>wf,"aJ",()=>vn,"aK",()=>X,"aL",()=>df,"aM",()=>hf,"aN",()=>Id,"aO",()=>nd,"aP",()=>rd,"aQ",()=>Yh,"aR",()=>uf,"aS",()=>Td,"aT",()=>Nd,"aU",()=>yd,"aV",()=>wd,"aW",()=>_d,"aX",()=>md,"aY",()=>ff,"aZ",()=>fd,"a_",()=>id,"aa",()=>xd,"ab",()=>Oh,"ac",()=>Ph,"ad",()=>p,"ae",()=>nf,"af",()=>pe,"ag",()=>de,"ah",()=>we,"ai",()=>Uh,"aj",()=>zh,"ak",()=>m,"al",()=>Bh,"am",()=>pi,"an",()=>yr,"ao",()=>ui,"ap",()=>lh,"aq",()=>ah,"ar",()=>oh,"as",()=>ch,"at",()=>uh,"au",()=>hd,"av",()=>ed,"aw",()=>Ad,"ax",()=>kd,"ay",()=>ld,"az",()=>ue,"b",()=>R,"b0",()=>f,"b1",()=>Ed,"b2",()=>mf,"b3",()=>bd,"b4",()=>Qe,"b5",()=>j,"b6",()=>I,"b7",()=>Jd,"b8",()=>yo,"b9",()=>td,"ba",()=>$,"bb",()=>Ld,"bc",()=>Vh,"bd",()=>te,"be",()=>Jr,"bf",()=>gf,"bg",()=>je,"bh",()=>pf,"bi",()=>po,"bj",()=>As,"bk",()=>wo,"bl",()=>of,"bm",()=>yf,"bn",()=>If,"c",()=>Vn,"d",()=>E,"e",()=>ns,"f",()=>qd,"g",()=>Hd,"h",()=>Ir,"i",()=>ef,"j",()=>br,"k",()=>rs,"l",()=>ss,"m",()=>se,"n",()=>is,"o",()=>os,"p",()=>ie,"q",()=>Xr,"r",()=>Yn,"s",()=>Nn,"t",()=>mr,"u",()=>Yr,"v",()=>J,"w",()=>ne,"x",()=>od,"y",()=>re,"z",()=>gd]);var t=e.i("[project]/retired/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)"),n=e.i("[project]/retired/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)"),r=e.i("[project]/retired/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>"),s=e.i("[project]/retired/node_modules/@firebase/util/dist/index.esm.js [app-client] (ecmascript)"),i=e.i("[project]/retired/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js [app-client] (ecmascript)"),o=e.i("[project]/retired/node_modules/@firebase/logger/dist/esm/index.esm.js [app-client] (ecmascript)"),a=e.i("[project]/retired/node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js [app-client] (ecmascript)");
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
 */class c{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}c.UNAUTHENTICATED=new c(null),c.GOOGLE_CREDENTIALS=new c("google-credentials-uid"),c.FIRST_PARTY=new c("first-party-uid"),c.MOCK_USER=new c("mock-user");
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
let u="12.10.0";function l(e){u=e}
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
 */const h=new o.Logger("@firebase/firestore");function d(){return h.logLevel}function f(e){h.setLogLevel(e)}function m(e,...t){if(h.logLevel<=o.LogLevel.DEBUG){const n=t.map(y);h.debug(`Firestore (${u}): ${e}`,...n)}}function g(e,...t){if(h.logLevel<=o.LogLevel.ERROR){const n=t.map(y);h.error(`Firestore (${u}): ${e}`,...n)}}function p(e,...t){if(h.logLevel<=o.LogLevel.WARN){const n=t.map(y);h.warn(`Firestore (${u}): ${e}`,...n)}}function y(e){if("string"==typeof e)return e;try{return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
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
 */function w(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,v(e,r,n)}function v(e,t,n){let r=`FIRESTORE (${u}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw g(r),new Error(r)}function I(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||v(t,s,r)}function b(e,t){e||w(57014,t)}function _(e,t){return e}
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
 */const T={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class E extends s.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`
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
 */}}class S{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
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
 */class x{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class C{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(c.UNAUTHENTICATED))}shutdown(){}}class D{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class N{constructor(e){this.t=e,this.currentUser=c.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){I(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new S;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new S,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{m("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(m("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new S)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(m("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(I("string"==typeof t.accessToken,31837,{l:t}),new x(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return I(null===e||"string"==typeof e,2055,{h:e}),new c(e)}}class A{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=c.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class k{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new A(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(c.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class F{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class R{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,r._isFirebaseServerApp)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){I(void 0===this.o,3512);const n=e=>{null!=e.error&&m("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,m("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{m("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):m("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new F(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(I("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new F(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class M{getToken(){return Promise.resolve(new F(""))}invalidateToken(){}start(e,t){}shutdown(){}}
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
 */function V(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
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
 */class P{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=V(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function O(e,t){return e<t?-1:e>t?1:0}function L(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return B(n)===B(s)?O(n,s):B(n)?1:-1}return O(e.length,t.length)}const q=55296,U=57343;function B(e){const t=e.charCodeAt(0);return t>=q&&t<=U}function z(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function $(e,t,n){return void 0===e&&void 0===t||void 0!==e&&void 0!==t&&n(e,t)}function G(e){return e+"\0"}
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
 */const j="__name__";class K{constructor(e,t,n){void 0===t?t=0:t>e.length&&w(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&w(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===K.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof K?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=K.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return O(e.length,t.length)}static compareSegments(e,t){const n=K.isNumericId(e),r=K.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?K.extractNumericId(e).compare(K.extractNumericId(t)):L(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return i.Integer.fromString(e.substring(4,e.length-2))}}class Q extends K{construct(e,t,n){return new Q(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new E(T.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new Q(t)}static emptyPath(){return new Q([])}}const W=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class H extends K{construct(e,t,n){return new H(e,t,n)}static isValidIdentifier(e){return W.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),H.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===j}static keyField(){return new H([j])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new E(T.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new E(T.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new E(T.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new E(T.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new H(t)}static emptyPath(){return new H([])}}
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
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(Q.fromString(e))}static fromName(e){return new J(Q.fromString(e).popFirst(5))}static empty(){return new J(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Q.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new Q(e.slice()))}}
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
 */function Y(e,t,n){if(!n)throw new E(T.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function X(e,t,n,r){if(!0===t&&!0===r)throw new E(T.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function Z(e){if(!J.isDocumentKey(e))throw new E(T.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ee(e){if(J.isDocumentKey(e))throw new E(T.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function te(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function ne(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":w(12329,{type:typeof e})}function re(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new E(T.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ne(e);throw new E(T.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function se(e,t){if(t<=0)throw new E(T.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
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
 */function ie(e,t){const n={typeString:e};return t&&(n.value=t),n}function oe(e,t){if(!te(e))throw new E(T.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new E(T.INVALID_ARGUMENT,n);return!0}
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
 */const ae=-62135596800,ce=1e6;class ue{static now(){return ue.fromMillis(Date.now())}static fromDate(e){return ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*ce);return new ue(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new E(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new E(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ae)throw new E(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new E(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ce}_compareTo(e){return this.seconds===e.seconds?O(this.nanoseconds,e.nanoseconds):O(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ue._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(oe(e,ue._jsonSchema))return new ue(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ae;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ue._jsonSchemaVersion="firestore/timestamp/1.0",ue._jsonSchema={type:ie("string",ue._jsonSchemaVersion),seconds:ie("number"),nanoseconds:ie("number")};
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
class le{static fromTimestamp(e){return new le(e)}static min(){return new le(new ue(0,0))}static max(){return new le(new ue(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const he=-1;class de{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function fe(e){return e.fields.find(e=>2===e.kind)}function me(e){return e.fields.filter(e=>2!==e.kind)}function ge(e,t){let n=O(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=ye(e.fields[r],t.fields[r]),0!==n)return n;return O(e.fields.length,t.fields.length)}de.UNKNOWN_ID=-1;class pe{constructor(e,t){this.fieldPath=e,this.kind=t}}function ye(e,t){const n=H.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:O(e.kind,t.kind)}class we{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new we(0,be.min())}}function ve(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=le.fromTimestamp(1e9===r?new ue(n+1,0):new ue(n,r));return new be(s,J.empty(),t)}function Ie(e){return new be(e.readTime,e.key,he)}class be{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new be(le.min(),J.empty(),he)}static max(){return new be(le.max(),J.empty(),he)}}function _e(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=J.comparator(e.documentKey,t.documentKey),0!==n?n:O(e.largestBatchId,t.largestBatchId)
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
 */)}const Te="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ee{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
 */async function Se(e){if(e.code!==T.FAILED_PRECONDITION||e.message!==Te)throw e;m("LocalStore","Unexpectedly lost primary lease")}
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
 */class xe{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&w(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new xe((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof xe?t:xe.resolve(t)}catch(e){return xe.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):xe.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):xe.reject(t)}static resolve(e){return new xe((t,n)=>{t(e)})}static reject(e){return new xe((t,n)=>{n(e)})}static waitFor(e){return new xe((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=xe.resolve(!1);for(const n of e)t=t.next(e=>e?xe.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new xe((n,r)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;t(e[c]).next(e=>{i[c]=e,++o,o===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new xe((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}
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
 */const Ce="SimpleDb";class De{static open(e,t,n,r){try{return new De(t,e.transaction(r,n))}catch(e){throw new Fe(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new S,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Fe(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{const n=Oe(t.target.error);this.S.reject(new Fe(e,n))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(m(Ce,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Me(t)}}class Ne{static delete(e){return m(Ce,"Removing database:",e),Ve((0,s.getGlobal)().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!(0,s.isIndexedDBAvailable)())return!1;if(Ne.F())return!0;const e=(0,s.getUA)(),t=Ne.M(e),n=0<t&&t<10,r=Ae(e),i=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return void 0!==t.default&&"YES"===t.default.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,12.2===Ne.M((0,s.getUA)())&&g("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(m(Ce,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new Fe(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new E(T.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new E(T.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new Fe(e,r))},r.onupgradeneeded=e=>{m(Ce,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.k(t,r.transaction,e.oldVersion,this.version).next(()=>{m(Ce,"Database upgrade to version "+this.version+" complete")})}})),this.K&&(this.db.onversionchange=e=>this.K(e)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const s="readonly"===t;let i=0;for(;;){++i;try{this.db=await this.L(e);const t=De.open(this.db,e,s?"readonly":"readwrite",n),i=r(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),xe.reject(e))).toPromise();return i.catch(()=>{}),await t.D,i}catch(e){const t=e,n="FirebaseError"!==t.name&&i<3;if(m(Ce,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Ae(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class ke{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return Ve(this.U.delete())}}class Fe extends E{constructor(e,t){super(T.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Re(e){return"IndexedDbTransactionError"===e.name}class Me{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(m(Ce,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(m(Ce,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Ve(n)}add(e){return m(Ce,"ADD",this.store.name,e,e),Ve(this.store.add(e))}get(e){return Ve(this.store.get(e)).next(t=>(void 0===t&&(t=null),m(Ce,"GET",this.store.name,e,t),t))}delete(e){return m(Ce,"DELETE",this.store.name,e),Ve(this.store.delete(e))}count(){return m(Ce,"COUNT",this.store.name),Ve(this.store.count())}H(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new xe((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.J(e,(e,n)=>{t.push(n)}).next(()=>t)}}Z(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new xe((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}X(e,t){m(Ce,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const r=this.cursor(n);return this.J(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.J(r,t)}te(e){const t=this.cursor({});return new xe((n,r)=>{t.onerror=e=>{const t=Oe(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}J(e,t){const n=[];return new xe((r,s)=>{e.onerror=e=>{s(e.target.error)},e.onsuccess=e=>{const s=e.target.result;if(!s)return void r();const i=new ke(s),o=t(s.primaryKey,s.value,i);if(o instanceof xe){const e=o.catch(e=>(i.done(),xe.reject(e)));n.push(e)}i.isDone?r():null===i.G?s.continue():s.continue(i.G)}}).next(()=>xe.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Ve(e){return new xe((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=Oe(e.target.error);n(t)}})}let Pe=!1;function Oe(e){const t=Ne.M((0,s.getUA)());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new E("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Pe||(Pe=!0,setTimeout(()=>{throw e},0)),e}}return e}const Le="IndexBackfiller";class qe{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){m(Le,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();m(Le,`Documents written: ${e}`)}catch(e){Re(e)?m(Le,"Ignoring IndexedDB error during index backfill: ",e):await Se(e)}await this.re(6e4)})}}class Ue{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let r=t,s=!0;return xe.doWhile(()=>!0===s&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return m(Le,`Processing collection: ${t}`),this.oe(e,t,r).next(e=>{r-=e,n.add(t)});s=!1})).next(()=>t-r)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const s=n.changes;return this.localStore.indexManager.updateIndexEntries(e,s).next(()=>this._e(r,n)).next(n=>(m(Le,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>s.size)}))}_e(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=Ie(t);_e(r,n)>0&&(n=r)}),new be(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))
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
 */}}class Be{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Be.ce=-1;
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
const ze=-1;function $e(e){return null==e}function Ge(e){return 0===e&&1/e==-1/0}function je(e){return"number"==typeof e}function Ke(e){return"number"==typeof e&&Number.isInteger(e)&&!Ge(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function Qe(e){return"string"==typeof e}
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
 */const We="";function He(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Ye(t)),t=Je(e.get(n),t);return Ye(t)}function Je(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="";break;case We:n+="";break;default:n+=r}}return n}function Ye(e){return e+We+""}function Xe(e){const t=e.length;if(I(t>=2,64408,{path:e}),2===t)return I(e.charAt(0)===We&&""===e.charAt(1),56145,{path:e}),Q.emptyPath();const n=t-2,r=[];let s="";for(let i=0;i<t;){const t=e.indexOf(We,i);switch((t<0||t>n)&&w(50515,{path:e}),e.charAt(t+1)){case"":const n=e.substring(i,t);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=e.substring(i,t),s+="\0";break;case"":s+=e.substring(i,t+1);break;default:w(61167,{path:e})}i=t+2}return new Q(r)}
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
 */const Ze="remoteDocuments",et="owner",tt="owner",nt="mutationQueues",rt="mutations",st="batchId",it="userMutationsIndex",ot=["userId","batchId"];
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
 */function at(e,t){return[e,He(t)]}function ct(e,t,n){return[e,He(t),n]}const ut={},lt="documentMutations",ht="remoteDocumentsV14",dt=["prefixPath","collectionGroup","readTime","documentId"],ft="documentKeyIndex",mt=["prefixPath","collectionGroup","documentId"],gt="collectionGroupIndex",pt=["collectionGroup","readTime","prefixPath","documentId"],yt="remoteDocumentGlobal",wt="remoteDocumentGlobalKey",vt="targets",It="queryTargetsIndex",bt=["canonicalId","targetId"],_t="targetDocuments",Tt=["targetId","path"],Et="documentTargetsIndex",St=["path","targetId"],xt="targetGlobalKey",Ct="targetGlobal",Dt="collectionParents",Nt=["collectionId","parent"],At="clientMetadata",kt="bundles",Ft="namedQueries",Rt="indexConfiguration",Mt="collectionGroupIndex",Vt="indexState",Pt=["indexId","uid"],Ot="sequenceNumberIndex",Lt=["uid","sequenceNumber"],qt="indexEntries",Ut=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Bt="documentKeyIndex",zt=["indexId","uid","orderedDocumentKey"],$t="documentOverlays",Gt=["userId","collectionPath","documentId"],jt="collectionPathOverlayIndex",Kt=["userId","collectionPath","largestBatchId"],Qt="collectionGroupOverlayIndex",Wt=["userId","collectionGroup","largestBatchId"],Ht="globals",Jt=[nt,rt,lt,Ze,vt,et,Ct,_t,At,yt,Dt,kt,Ft],Yt=[...Jt,$t],Xt=[nt,rt,lt,ht,vt,et,Ct,_t,At,yt,Dt,kt,Ft,$t],Zt=Xt,en=[...Zt,Rt,Vt,qt],tn=en,nn=[...en,Ht],rn=nn;
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
 */class sn extends Ee{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function on(e,t){const n=_(e);return Ne.O(n.le,t)}
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
 */function an(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function cn(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function un(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function ln(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */class hn{constructor(e,t){this.comparator=e,this.root=t||fn.EMPTY}insert(e,t){return new hn(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,fn.BLACK,null,null))}remove(e){return new hn(this.comparator,this.root.remove(e,this.comparator).copy(null,null,fn.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new dn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new dn(this.root,e,this.comparator,!1)}getReverseIterator(){return new dn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new dn(this.root,e,this.comparator,!0)}}class dn{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class fn{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:fn.RED,this.left=null!=r?r:fn.EMPTY,this.right=null!=s?s:fn.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new fn(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return fn.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return fn.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,fn.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,fn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw w(43730,{key:this.key,value:this.value});if(this.right.isRed())throw w(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw w(27949);return e+(this.isRed()?0:1)}}fn.EMPTY=null,fn.RED=!0,fn.BLACK=!1,fn.EMPTY=new class{constructor(){this.size=0}get key(){throw w(57766)}get value(){throw w(16141)}get color(){throw w(16727)}get left(){throw w(29726)}get right(){throw w(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new fn(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class mn{constructor(e){this.comparator=e,this.data=new hn(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gn(this.data.getIterator())}getIteratorFrom(e){return new gn(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof mn))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new mn(this.comparator);return t.data=e,t}}class gn{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function pn(e){return e.hasNext()?e.getNext():void 0}
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
 */class yn{constructor(e){this.fields=e,e.sort(H.comparator)}static empty(){return new yn([])}unionWith(e){let t=new mn(H.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new yn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return z(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */class wn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"
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
 */}}function vn(){return"undefined"!=typeof atob}
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
 */class In{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new wn("Invalid base64 string: "+e):e}}(e);return new In(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new In(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return O(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}In.EMPTY_BYTE_STRING=new In("");const bn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function _n(e){if(I(!!e,39018),"string"==typeof e){let t=0;const n=bn.exec(e);if(I(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Tn(e.seconds),nanos:Tn(e.nanos)}}function Tn(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function En(e){return"string"==typeof e?In.fromBase64String(e):In.fromUint8Array(e)}
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
 */const Sn="server_timestamp",xn="__type__",Cn="__previous_value__",Dn="__local_write_time__";function Nn(e){const t=(e?.mapValue?.fields||{})[xn]?.stringValue;return t===Sn}function An(e){const t=e.mapValue.fields[Cn];return Nn(t)?An(t):t}function kn(e){const t=_n(e.mapValue.fields[Dn].timestampValue);return new ue(t.seconds,t.nanos)}
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
 */class Fn{constructor(e,t,n,r,s,i,o,a,c,u,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=l}}const Rn="(default)";class Mn{constructor(e,t){this.projectId=e,this.database=t||Rn}static empty(){return new Mn("","")}get isDefaultDatabase(){return this.database===Rn}isEqual(e){return e instanceof Mn&&e.projectId===this.projectId&&e.database===this.database}}function Vn(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new E(T.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Mn(e.options.projectId,t)}
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
 */const Pn="__type__",On="__max__",Ln={mapValue:{fields:{__type__:{stringValue:On}}}},qn="__vector__",Un="value",Bn={nullValue:"NULL_VALUE"};function zn(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Nn(e)?4:ir(e)?9007199254740991:rr(e)?10:11:w(28295,{value:e})}function $n(e,t){if(e===t)return!0;const n=zn(e);if(n!==zn(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return kn(e).isEqual(kn(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=_n(e.timestampValue),r=_n(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return En(e.bytesValue).isEqual(En(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Tn(e.geoPointValue.latitude)===Tn(t.geoPointValue.latitude)&&Tn(e.geoPointValue.longitude)===Tn(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Tn(e.integerValue)===Tn(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Tn(e.doubleValue),r=Tn(t.doubleValue);return n===r?Ge(n)===Ge(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return z(e.arrayValue.values||[],t.arrayValue.values||[],$n);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(an(n)!==an(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!$n(n[e],r[e])))return!1;return!0}(e,t);default:return w(52216,{left:e})}}function Gn(e,t){return void 0!==(e.values||[]).find(e=>$n(e,t))}function jn(e,t){if(e===t)return 0;const n=zn(e),r=zn(t);if(n!==r)return O(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return O(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Tn(e.integerValue||e.doubleValue),r=Tn(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Kn(e.timestampValue,t.timestampValue);case 4:return Kn(kn(e),kn(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){const n=En(e),r=En(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=O(n[e],r[e]);if(0!==t)return t}return O(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=O(Tn(e.latitude),Tn(t.latitude));return 0!==n?n:O(Tn(e.longitude),Tn(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Qn(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},s=n[Un]?.arrayValue,i=r[Un]?.arrayValue,o=O(s?.values?.length||0,i?.values?.length||0);return 0!==o?o:Qn(s,i)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Ln.mapValue&&t===Ln.mapValue)return 0;if(e===Ln.mapValue)return 1;if(t===Ln.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let e=0;e<r.length&&e<i.length;++e){const t=L(r[e],i[e]);if(0!==t)return t;const o=jn(n[r[e]],s[i[e]]);if(0!==o)return o}return O(r.length,i.length)}(e.mapValue,t.mapValue);default:throw w(23264,{he:n})}}function Kn(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return O(e,t);const n=_n(e),r=_n(t),s=O(n.seconds,r.seconds);return 0!==s?s:O(n.nanos,r.nanos)}function Qn(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=jn(n[e],r[e]);if(t)return t}return O(n.length,r.length)}function Wn(e){return Hn(e)}function Hn(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=_n(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return En(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return J.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Hn(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${Hn(e.fields[s])}`;return n+"}"}(e.mapValue):w(61005,{value:e})}function Jn(e){switch(zn(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=An(e);return t?16+Jn(t):16;case 5:return 2*e.stringValue.length;case 6:return En(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+Jn(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return cn(e.fields,(e,n)=>{t+=e.length+Jn(n)}),t}(e.mapValue);default:throw w(13486,{value:e})}}function Yn(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Xn(e){return!!e&&"integerValue"in e}function Zn(e){return!!e&&"arrayValue"in e}function er(e){return!!e&&"nullValue"in e}function tr(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function nr(e){return!!e&&"mapValue"in e}function rr(e){const t=(e?.mapValue?.fields||{})[Pn]?.stringValue;return t===qn}function sr(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return cn(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=sr(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=sr(e.arrayValue.values[n]);return t}return{...e}}function ir(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===On}const or={mapValue:{fields:{[Pn]:{stringValue:qn},[Un]:{arrayValue:{}}}}};function ar(e){return"nullValue"in e?Bn:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Yn(Mn.empty(),J.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?rr(e)?or:{mapValue:{}}:w(35942,{value:e})}function cr(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Yn(Mn.empty(),J.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?or:"mapValue"in e?rr(e)?{mapValue:{}}:Ln:w(61959,{value:e})}function ur(e,t){const n=jn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function lr(e,t){const n=jn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
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
 */class hr{constructor(e){this.value=e}static empty(){return new hr({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!nr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=sr(t)}setAll(e){let t=H.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=sr(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());nr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $n(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];nr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){cn(t,(t,n)=>e[t]=n);for(const t of n)delete e[t]}clone(){return new hr(sr(this.value))}}function dr(e){const t=[];return cn(e.fields,(e,n)=>{const r=new H([e]);if(nr(n)){const e=dr(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new yn(t)
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
 */}class fr{constructor(e,t,n,r,s,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new fr(e,0,le.min(),le.min(),le.min(),hr.empty(),0)}static newFoundDocument(e,t,n,r){return new fr(e,1,t,le.min(),n,r,0)}static newNoDocument(e,t){return new fr(e,2,t,le.min(),le.min(),hr.empty(),0)}static newUnknownDocument(e,t){return new fr(e,3,t,le.min(),le.min(),hr.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(le.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=hr.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=hr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=le.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof fr&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fr(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class mr{constructor(e,t){this.position=e,this.inclusive=t}}function gr(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(r=i.field.isKeyField()?J.comparator(J.fromName(o.referenceValue),n.key):jn(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function pr(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!$n(e.position[n],t.position[n]))return!1;return!0}
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
 */class yr{constructor(e,t="asc"){this.field=e,this.dir=t}}function wr(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
 */class vr{}class Ir extends vr{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Ar(e,t,n):"array-contains"===t?new Mr(e,n):"in"===t?new Vr(e,n):"not-in"===t?new Pr(e,n):"array-contains-any"===t?new Or(e,n):new Ir(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new kr(e,n):new Fr(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(jn(t,this.value)):null!==t&&zn(this.value)===zn(t)&&this.matchesComparison(jn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return w(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class br extends vr{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new br(e,t)}matches(e){return _r(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function _r(e){return"and"===e.op}function Tr(e){return"or"===e.op}function Er(e){return Sr(e)&&_r(e)}function Sr(e){for(const t of e.filters)if(t instanceof br)return!1;return!0}function xr(e){if(e instanceof Ir)return e.field.canonicalString()+e.op.toString()+Wn(e.value);if(Er(e))return e.filters.map(e=>xr(e)).join(",");{const t=e.filters.map(e=>xr(e)).join(",");return`${e.op}(${t})`}}function Cr(e,t){return e instanceof Ir?function(e,t){return t instanceof Ir&&e.op===t.op&&e.field.isEqual(t.field)&&$n(e.value,t.value)}(e,t):e instanceof br?function(e,t){return t instanceof br&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&Cr(n,t.filters[r]),!0)}(e,t):void w(19439)}function Dr(e,t){const n=e.filters.concat(t);return br.create(n,e.op)}function Nr(e){return e instanceof Ir?function(e){return`${e.field.canonicalString()} ${e.op} ${Wn(e.value)}`}(e):e instanceof br?function(e){return e.op.toString()+" {"+e.getFilters().map(Nr).join(" ,")+"}"}(e):"Filter"}class Ar extends Ir{constructor(e,t,n){super(e,t,n),this.key=J.fromName(n.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class kr extends Ir{constructor(e,t){super(e,"in",t),this.keys=Rr("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Fr extends Ir{constructor(e,t){super(e,"not-in",t),this.keys=Rr("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Rr(e,t){return(t.arrayValue?.values||[]).map(e=>J.fromName(e.referenceValue))}class Mr extends Ir{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Zn(t)&&Gn(t.arrayValue,this.value)}}class Vr extends Ir{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Gn(this.value.arrayValue,t)}}class Pr extends Ir{constructor(e,t){super(e,"not-in",t)}matches(e){if(Gn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Gn(this.value.arrayValue,t)}}class Or extends Ir{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Zn(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Gn(this.value.arrayValue,e))}}
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
 */class Lr{constructor(e,t=null,n=[],r=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function qr(e,t=null,n=[],r=[],s=null,i=null,o=null){return new Lr(e,t,n,r,s,i,o)}function Ur(e){const t=_(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>xr(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),$e(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Wn(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Wn(e)).join(",")),t.Te=e}return t.Te}function Br(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!wr(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Cr(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!pr(e.startAt,t.startAt)&&pr(e.endAt,t.endAt)}function zr(e){return J.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function $r(e,t){return e.filters.filter(e=>e instanceof Ir&&e.field.isEqual(t))}function Gr(e,t,n){let r=Bn,s=!0;for(const n of $r(e,t)){let e=Bn,t=!0;switch(n.op){case"<":case"<=":e=ar(n.value);break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=Bn}ur({value:r,inclusive:s},{value:e,inclusive:t})<0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];ur({value:r,inclusive:s},{value:e,inclusive:n.inclusive})<0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}function jr(e,t,n){let r=Ln,s=!0;for(const n of $r(e,t)){let e=Ln,t=!0;switch(n.op){case">=":case">":e=cr(n.value),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=Ln}lr({value:r,inclusive:s},{value:e,inclusive:t})>0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];lr({value:r,inclusive:s},{value:e,inclusive:n.inclusive})>0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}
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
 */class Kr{constructor(e,t=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Qr(e,t,n,r,s,i,o,a){return new Kr(e,t,n,r,s,i,o,a)}function Wr(e){return new Kr(e)}function Hr(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Jr(e){return J.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Yr(e){return null!==e.collectionGroup}function Xr(e){const t=_(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const n of t.explicitOrderBy)t.Ie.push(n),e.add(n.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new mn(H.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new yr(r,n))}),e.has(H.keyField().canonicalString())||t.Ie.push(new yr(H.keyField(),n))}return t.Ie}function Zr(e){const t=_(e);return t.Ee||(t.Ee=ts(t,Xr(e))),t.Ee}function es(e){const t=_(e);return t.Re||(t.Re=ts(t,e.explicitOrderBy)),t.Re}function ts(e,t){if("F"===e.limitType)return qr(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new yr(e.field,t)});const n=e.endAt?new mr(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new mr(e.startAt.position,e.startAt.inclusive):null;return qr(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function ns(e,t){const n=e.filters.concat([t]);return new Kr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function rs(e,t){const n=e.explicitOrderBy.concat([t]);return new Kr(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function ss(e,t,n){return new Kr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function is(e,t){return new Kr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function os(e,t){return new Kr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function as(e,t){return Br(Zr(e),Zr(t))&&e.limitType===t.limitType}function cs(e){return`${Ur(Zr(e))}|lt:${e.limitType}`}function us(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>Nr(e)).join(", ")}]`),$e(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Wn(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Wn(e)).join(",")),`Target(${t})`}(Zr(e))}; limitType=${e.limitType})`}function ls(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):J.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Xr(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=gr(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,Xr(e),t)||e.endAt&&!function(e,t,n){const r=gr(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,Xr(e),t))}(e,t)}function hs(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function ds(e){return(t,n)=>{let r=!1;for(const s of Xr(e)){const e=fs(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function fs(e,t,n){const r=e.field.isKeyField()?J.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?jn(r,s):w(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return w(19790,{direction:e.dir})}}
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
 */class ms{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){cn(this.inner,(t,n)=>{for(const[t,r]of n)e(t,r)})}isEmpty(){return ln(this.inner)}size(){return this.innerSize}}
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
 */const gs=new hn(J.comparator);function ps(){return gs}const ys=new hn(J.comparator);function ws(...e){let t=ys;for(const n of e)t=t.insert(n.key,n);return t}function vs(e){let t=ys;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Is(){return _s()}function bs(){return _s()}function _s(){return new ms(e=>e.toString(),(e,t)=>e.isEqual(t))}const Ts=new hn(J.comparator),Es=new mn(J.comparator);function Ss(...e){let t=Es;for(const n of e)t=t.add(n);return t}const xs=new mn(O);function Cs(){return xs}
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
 */function Ds(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ge(t)?"-0":t}}function Ns(e){return{integerValue:""+e}}function As(e,t){return Ke(t)?Ns(t):Ds(e,t)}
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
 */class ks{constructor(){this._=void 0}}function Fs(e,t,n){return e instanceof Vs?function(e,t){const n={fields:{[xn]:{stringValue:Sn},[Dn]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Nn(t)&&(t=An(t)),t&&(n.fields[Cn]=t),{mapValue:n}}(n,t):e instanceof Ps?Os(e,t):e instanceof Ls?qs(e,t):function(e,t){const n=Ms(e,t),r=Bs(n)+Bs(e.Ae);return Xn(n)&&Xn(e.Ae)?Ns(r):Ds(e.serializer,r)}(e,t)}function Rs(e,t,n){return e instanceof Ps?Os(e,t):e instanceof Ls?qs(e,t):n}function Ms(e,t){return e instanceof Us?function(e){return Xn(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class Vs extends ks{}class Ps extends ks{constructor(e){super(),this.elements=e}}function Os(e,t){const n=zs(t);for(const t of e.elements)n.some(e=>$n(e,t))||n.push(t);return{arrayValue:{values:n}}}class Ls extends ks{constructor(e){super(),this.elements=e}}function qs(e,t){let n=zs(t);for(const t of e.elements)n=n.filter(e=>!$n(e,t));return{arrayValue:{values:n}}}class Us extends ks{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Bs(e){return Tn(e.integerValue||e.doubleValue)}function zs(e){return Zn(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
 */class $s{constructor(e,t){this.field=e,this.transform=t}}class Gs{constructor(e,t){this.version=e,this.transformResults=t}}class js{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new js}static exists(e){return new js(void 0,e)}static updateTime(e){return new js(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ks(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Qs{}function Ws(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new si(e.key,js.none()):new Zs(e.key,e.data,js.none());{const n=e.data,r=hr.empty();let s=new mn(H.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new ei(e.key,r,new yn(s.toArray()),js.none())}}function Hs(e,t,n){e instanceof Zs?function(e,t,n){const r=e.value.clone(),s=ni(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof ei?function(e,t,n){if(!Ks(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=ni(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(ti(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Js(e,t,n,r){return e instanceof Zs?function(e,t,n,r){if(!Ks(e.precondition,t))return n;const s=e.value.clone(),i=ri(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof ei?function(e,t,n,r){if(!Ks(e.precondition,t))return n;const s=ri(e.fieldTransforms,r,t),i=t.data;return i.setAll(ti(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return Ks(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function Ys(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=Ms(r.transform,e||null);null!=s&&(null===n&&(n=hr.empty()),n.set(r.field,s))}return n||null}function Xs(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&z(e,t,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Ps&&t instanceof Ps||e instanceof Ls&&t instanceof Ls?z(e.elements,t.elements,$n):e instanceof Us&&t instanceof Us?$n(e.Ae,t.Ae):e instanceof Vs&&t instanceof Vs}(e.transform,t.transform)}(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Zs extends Qs{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ei extends Qs{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function ti(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function ni(e,t,n){const r=new Map;I(e.length===n.length,32656,{Ve:n.length,de:e.length});for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,Rs(o,a,n[s]))}return r}function ri(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,Fs(e,i,t))}return r}class si extends Qs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ii extends Qs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class oi{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];r.key.isEqual(e.key)&&Hs(r,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Js(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Js(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=bs();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(r.key)?null:o;const a=Ws(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(le.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ss())}isEqual(e){return this.batchId===e.batchId&&z(this.mutations,e.mutations,(e,t)=>Xs(e,t))&&z(this.baseMutations,e.baseMutations,(e,t)=>Xs(e,t))}}class ai{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){I(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=Ts;const s=e.mutations;for(let e=0;e<s.length;e++)r=r.insert(s[e].key,n[e].version);return new ai(e,t,n,r)}}
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
 */class ci{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class ui{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n
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
 */}}class li{constructor(e,t){this.count=e,this.unchangedNames=t
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
 */}}var hi,di;function fi(e){switch(e){case T.OK:return w(64938);case T.CANCELLED:case T.UNKNOWN:case T.DEADLINE_EXCEEDED:case T.RESOURCE_EXHAUSTED:case T.INTERNAL:case T.UNAVAILABLE:case T.UNAUTHENTICATED:return!1;case T.INVALID_ARGUMENT:case T.NOT_FOUND:case T.ALREADY_EXISTS:case T.PERMISSION_DENIED:case T.FAILED_PRECONDITION:case T.ABORTED:case T.OUT_OF_RANGE:case T.UNIMPLEMENTED:case T.DATA_LOSS:return!0;default:return w(15467,{code:e})}}function mi(e){if(void 0===e)return g("GRPC error has no .code"),T.UNKNOWN;switch(e){case hi.OK:return T.OK;case hi.CANCELLED:return T.CANCELLED;case hi.UNKNOWN:return T.UNKNOWN;case hi.DEADLINE_EXCEEDED:return T.DEADLINE_EXCEEDED;case hi.RESOURCE_EXHAUSTED:return T.RESOURCE_EXHAUSTED;case hi.INTERNAL:return T.INTERNAL;case hi.UNAVAILABLE:return T.UNAVAILABLE;case hi.UNAUTHENTICATED:return T.UNAUTHENTICATED;case hi.INVALID_ARGUMENT:return T.INVALID_ARGUMENT;case hi.NOT_FOUND:return T.NOT_FOUND;case hi.ALREADY_EXISTS:return T.ALREADY_EXISTS;case hi.PERMISSION_DENIED:return T.PERMISSION_DENIED;case hi.FAILED_PRECONDITION:return T.FAILED_PRECONDITION;case hi.ABORTED:return T.ABORTED;case hi.OUT_OF_RANGE:return T.OUT_OF_RANGE;case hi.UNIMPLEMENTED:return T.UNIMPLEMENTED;case hi.DATA_LOSS:return T.DATA_LOSS;default:return w(39323,{code:e})}}(di=hi||(hi={}))[di.OK=0]="OK",di[di.CANCELLED=1]="CANCELLED",di[di.UNKNOWN=2]="UNKNOWN",di[di.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",di[di.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",di[di.NOT_FOUND=5]="NOT_FOUND",di[di.ALREADY_EXISTS=6]="ALREADY_EXISTS",di[di.PERMISSION_DENIED=7]="PERMISSION_DENIED",di[di.UNAUTHENTICATED=16]="UNAUTHENTICATED",di[di.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",di[di.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",di[di.ABORTED=10]="ABORTED",di[di.OUT_OF_RANGE=11]="OUT_OF_RANGE",di[di.UNIMPLEMENTED=12]="UNIMPLEMENTED",di[di.INTERNAL=13]="INTERNAL",di[di.UNAVAILABLE=14]="UNAVAILABLE",di[di.DATA_LOSS=15]="DATA_LOSS";
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
let gi=null;function pi(e){if(gi)throw new Error("a TestingHooksSpi instance is already set");gi=e}
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
 */function yi(){return new TextEncoder}
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
 */const wi=new i.Integer([4294967295,4294967295],0);function vi(e){const t=yi().encode(e),n=new i.Md5;return n.update(t),new Uint8Array(n.digest())}function Ii(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new i.Integer([n,r],0),new i.Integer([s,o],0)]}class bi{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new _i(`Invalid padding: ${t}`);if(n<0)throw new _i(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new _i(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new _i(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=i.Integer.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(i.Integer.fromNumber(n)));return 1===r.compare(wi)&&(r=new i.Integer([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=vi(e),[n,r]=Ii(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(n,r,e);if(!this.we(t))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new bi(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=vi(e),[n,r]=Ii(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(n,r,e);this.be(t)}}be(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class _i extends Error{constructor(){super(...arguments),this.name="BloomFilterError"
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
 */}}class Ti{constructor(e,t,n,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Ei.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ti(le.min(),r,new hn(O),ps(),Ss())}}class Ei{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ei(n,t,Ss(),Ss(),Ss())}}
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
 */class Si{constructor(e,t,n,r){this.Se=e,this.removedTargetIds=t,this.key=n,this.De=r}}class xi{constructor(e,t){this.targetId=e,this.Ce=t}}class Ci{constructor(e,t,n=In.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Di{constructor(){this.ve=0,this.Fe=ki(),this.Me=In.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Ss(),t=Ss(),n=Ss();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:w(38017,{changeType:s})}}),new Ei(this.Me,this.xe,e,t,n)}Ke(){this.Oe=!1,this.Fe=ki()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,I(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Ni{constructor(e){this.Ge=e,this.ze=new Map,this.je=ps(),this.He=Ai(),this.Je=Ai(),this.Ze=new hn(O)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.Ke(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:w(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const s=r.target;if(zr(s))if(0===n){const e=new J(s.path);this.et(t,e,fr.newNoDocument(e,le.min()))}else I(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),s=n?this.ct(n,e,r):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,e)}gi?.lt(function(e,t,n,r,s){const i={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(i.bloomFilter={applied:0===s,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),i}(r,e.Ce,this.Ge.ht(),n,s))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,o;try{i=En(n).toUint8Array()}catch(e){if(e instanceof wn)return p("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new bi(i,r,s)}catch(e){return p(e instanceof _i?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const s=this.ot(r);if(s){if(n.current&&zr(s.target)){const t=new J(s.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,fr.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.Ke())}});let n=Ss();this.Je.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new Ti(e,t,this.Ze,this.je,n);return this.je=ps(),this.He=Ai(),this.Je=Ai(),this.Ze=new hn(O),r}Ye(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,n),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.qe(t,1):r.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Di,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new mn(O),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new mn(O),this.He=this.He.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||m("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Di),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ai(){return new hn(J.comparator)}function ki(){return new hn(J.comparator)}const Fi={asc:"ASCENDING",desc:"DESCENDING"},Ri={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Mi={and:"AND",or:"OR"};class Vi{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Pi(e,t){return e.useProto3Json||$e(t)?t:{value:t}}function Oi(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Li(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function qi(e,t){return Oi(e,t.toTimestamp())}function Ui(e){return I(!!e,49232),le.fromTimestamp(function(e){const t=_n(e);return new ue(t.seconds,t.nanos)}(e))}function Bi(e,t){return zi(e,t).canonicalString()}function zi(e,t){const n=function(e){return new Q(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function $i(e){const t=Q.fromString(e);return I(mo(t),10190,{key:t.toString()}),t}function Gi(e,t){return Bi(e.databaseId,t.path)}function ji(e,t){const n=$i(t);if(n.get(1)!==e.databaseId.projectId)throw new E(T.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new E(T.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new J(Hi(n))}function Ki(e,t){return Bi(e.databaseId,t)}function Qi(e){const t=$i(e);return 4===t.length?Q.emptyPath():Hi(t)}function Wi(e){return new Q(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Hi(e){return I(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Ji(e,t,n){return{name:Gi(e,t),fields:n.value.mapValue.fields}}function Yi(e,t,n){const r={};t.transaction?.length&&(r.transaction=t.transaction);const s=t.executionTime?Ui(t.executionTime):void 0;return r.executionTime=s,n&&(r.key=n.name?ji(e,n.name):void 0,r.fields=new hr({mapValue:{fields:n.fields}}),r.createTime=n.createTime?Ui(n.createTime):void 0,r.updateTime=n.updateTime?Ui(n.updateTime):void 0),r}function Xi(e,t,n){const r=ji(e,t.name),s=Ui(t.updateTime),i=t.createTime?Ui(t.createTime):le.min(),o=new hr({mapValue:{fields:t.fields}}),a=fr.newFoundDocument(r,s,i,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function Zi(e,t){let n;if(t instanceof Zs)n={update:Ji(e,t.key,t.value)};else if(t instanceof si)n={delete:Gi(e,t.key)};else if(t instanceof ei)n={update:Ji(e,t.key,t.data),updateMask:fo(t.fieldMask)};else{if(!(t instanceof ii))return w(16599,{dt:t.type});n={verify:Gi(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof Vs)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ps)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ls)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Us)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw w(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:qi(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:w(27497)}(e,t.precondition)),n}function eo(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?js.updateTime(Ui(e.updateTime)):void 0!==e.exists?js.exists(e.exists):js.none()}(t.currentDocument):js.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)I("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new Vs;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new Ps(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new Ls(e)}else"increment"in t?n=new Us(e,t.increment):w(16584,{proto:t});const r=H.fromServerFormat(t.fieldPath);return new $s(r,n)}(e,t)):[];if(t.update){t.update.name;const s=ji(e,t.update.name),i=new hr({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new yn(t.map(e=>H.fromServerFormat(e)))}(t.updateMask);return new ei(s,i,e,n,r)}return new Zs(s,i,n,r)}if(t.delete){const r=ji(e,t.delete);return new si(r,n)}if(t.verify){const r=ji(e,t.verify);return new ii(r,n)}return w(1463,{proto:t})}function to(e,t){return{documents:[Ki(e,t.path)]}}function no(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Ki(e,s);const i=function(e){if(0!==e.length)return ho(br.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:uo(e.field),direction:oo(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Pi(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:s}}function ro(e,t,n,r){const{ft:s,parent:i}=no(e,t),o={},a=[];let c=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+c++;o[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:uo(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:uo(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function so(e){let t=Qi(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){I(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=io(e);return t instanceof br&&Er(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new yr(lo(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,$e(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new mr(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new mr(n,t)}(n.endAt)),Qr(t,s,o,i,a,"F",c,u)}function io(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=lo(e.unaryFilter.field);return Ir.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=lo(e.unaryFilter.field);return Ir.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=lo(e.unaryFilter.field);return Ir.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=lo(e.unaryFilter.field);return Ir.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return w(61313);default:return w(60726)}}(e):void 0!==e.fieldFilter?function(e){return Ir.create(lo(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return w(58110);default:return w(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return br.create(e.compositeFilter.filters.map(e=>io(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return w(1026)}}(e.compositeFilter.op))}(e):w(30097,{filter:e})}function oo(e){return Fi[e]}function ao(e){return Ri[e]}function co(e){return Mi[e]}function uo(e){return{fieldPath:e.canonicalString()}}function lo(e){return H.fromServerFormat(e.fieldPath)}function ho(e){return e instanceof Ir?function(e){if("=="===e.op){if(tr(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NAN"}};if(er(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(tr(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NOT_NAN"}};if(er(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:uo(e.field),op:ao(e.op),value:e.value}}}(e):e instanceof br?function(e){const t=e.getFilters().map(e=>ho(e));return 1===t.length?t[0]:{compositeFilter:{op:co(e.op),filters:t}}}(e):w(54877,{filter:e})}function fo(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function mo(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function go(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function po(e,t){const n={fields:{}};return t.forEach((t,r)=>{if("string"!=typeof r)throw new Error(`Cannot encode map with non-string key: ${r}`);n.fields[r]=t._toProto(e)}),{mapValue:n}}function yo(e){return{stringValue:e}}function wo(e){return{pipelineValue:e}}
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
 */class vo{constructor(e,t,n,r,s=le.min(),i=le.min(),o=In.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new vo(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new vo(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new vo(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new vo(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
 */class Io{constructor(e){this.yt=e}}function bo(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:_o(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:Gi(e,t.key),fields:t.data.value.mapValue.fields,updateTime:Oi(e,t.version.toTimestamp()),createTime:Oi(e,t.createTime.toTimestamp())}}(e.yt,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:To(t.version)};else{if(!t.isUnknownDocument())return w(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:To(t.version)}}return r}function _o(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function To(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Eo(e){const t=new ue(e.seconds,e.nanoseconds);return le.fromTimestamp(t)}function So(e,t){const n=(t.baseMutations||[]).map(t=>eo(e.yt,t));for(let e=0;e<t.mutations.length-1;++e){const n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const r=t.mutations.map(t=>eo(e.yt,t)),s=ue.fromMillis(t.localWriteTimeMs);return new oi(t.batchId,s,n,r)}function xo(e){const t=Eo(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?Eo(e.lastLimboFreeSnapshotVersion):le.min();let r;return r=function(e){return void 0!==e.documents}(e.query)?function(e){const t=e.documents.length;return I(1===t,1966,{count:t}),Zr(Wr(Qi(e.documents[0])))}(e.query):function(e){return Zr(so(e))}(e.query),new vo(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,In.fromBase64String(e.resumeToken))}function Co(e,t){const n=To(t.snapshotVersion),r=To(t.lastLimboFreeSnapshotVersion);let s;s=zr(t.target)?to(e.yt,t.target):no(e.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Ur(t.target),readTime:n,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function Do(e){const t=so({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ss(t,t.limit,"L"):t}function No(e,t){return new ci(t.largestBatchId,eo(e.yt,t.overlayMutation))}function Ao(e,t){const n=t.path.lastSegment();return[e,He(t.path.popLast()),n]}function ko(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:To(r.readTime),documentKey:He(r.documentKey.path),largestBatchId:r.largestBatchId}}
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
 */class Fo{getBundleMetadata(e,t){return Ro(e).get(t).next(e=>{if(e)return function(e){return{id:e.bundleId,createTime:Eo(e.createTime),version:e.version}}(e)})}saveBundleMetadata(e,t){return Ro(e).put(function(e){return{bundleId:e.id,createTime:To(Ui(e.createTime)),version:e.version}}(t))}getNamedQuery(e,t){return Mo(e).get(t).next(e=>{if(e)return function(e){return{name:e.name,query:Do(e.bundledQuery),readTime:Eo(e.readTime)}}(e)})}saveNamedQuery(e,t){return Mo(e).put(function(e){return{name:e.name,readTime:To(Ui(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function Ro(e){return on(e,kt)}function Mo(e){return on(e,Ft)}
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
 */class Vo{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new Vo(e,n)}getOverlay(e,t){return Po(e).get(Ao(this.userId,t)).next(e=>e?No(this.serializer,e):null)}getOverlays(e,t){const n=Is();return xe.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,s)=>{const i=new ci(t,s);r.push(this.bt(e,i))}),xe.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(He(e.getCollectionPath())));const s=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);s.push(Po(e).X(jt,r))}),xe.waitFor(s)}getOverlaysForCollection(e,t,n){const r=Is(),s=He(t),i=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Po(e).H(jt,i).next(e=>{for(const t of e){const e=No(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const s=Is();let i;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Po(e).ee({index:Qt,range:o},(e,t,n)=>{const o=No(this.serializer,t);s.size()<r||o.largestBatchId===i?(s.set(o.getKey(),o),i=o.largestBatchId):n.done()}).next(()=>s)}bt(e,t){return Po(e).put(function(e,t,n){const[r,s,i]=Ao(t,n.mutation.key);return{userId:t,collectionPath:s,documentId:i,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:Zi(e.yt,n.mutation)}}(this.serializer,this.userId,t))}}function Po(e){return on(e,$t)}
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
 */class Oo{St(e){return on(e,Ht)}getSessionToken(e){return this.St(e).get("sessionToken").next(e=>{const t=e?.value;return t?In.fromUint8Array(t):In.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}
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
 */class Lo{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(Tn(e.integerValue));else if("doubleValue"in e){const n=Tn(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),Ge(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=_n(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(En(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?ir(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):rr(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):w(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const n=e.fields||{};this.Ft(t,55);for(const e of Object.keys(n))this.Ot(e,t),this.Ct(n[e],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const r=Un,s=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(Tn(s)),this.Ot(r,t),this.Ct(n[r],t)}qt(e,t){const n=e.values||[];this.Ft(t,50);for(const e of n)this.Ct(e,t)}Lt(e,t){this.Ft(t,37),J.fromName(e).path.forEach(e=>{this.Ft(t,60),this.$t(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Lo.Wt=new Lo;
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
const qo=255;function Uo(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function Bo(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=Uo(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class zo{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ht(n.value),n=t.next();this.Jt()}Zt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{const e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Xt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ht(e);else if(e<2048)this.Ht(960|e>>>6),this.Ht(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ht(480|e>>>12),this.Ht(128|63&e>>>6),this.Ht(128|63&e);else{const e=t.codePointAt(0);this.Ht(240|e>>>18),this.Ht(128|63&e>>>12),this.Ht(128|63&e>>>6),this.Ht(128|63&e)}}this.Jt()}Yt(e){const t=this.en(e),n=Bo(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}nn(e){const t=this.en(e),n=Bo(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}rn(){this.sn(qo),this.sn(255)}_n(){this.an(qo),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Gt(e){const t=255&e;0===t?(this.sn(0),this.sn(255)):t===qo?(this.sn(qo),this.sn(0)):this.sn(t)}Ht(e){const t=255&e;0===t?(this.an(0),this.an(255)):t===qo?(this.an(qo),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Jt(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class $o{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class Go{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class jo{constructor(){this.cn=new zo,this.ascending=new $o(this.cn),this.descending=new Go(this.cn)}seed(e){this.cn.seed(e)}ln(e){return 0===e?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}
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
 */class Ko{constructor(e,t,n,r){this.hn=e,this.Pn=t,this.Tn=n,this.In=r}En(){const e=this.In.length,t=0===e||255===this.In[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.In,0),t!==e?n.set([0],this.In.length):++n[n.length-1],new Ko(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:Ho(this.Tn),directionalValue:Ho(this.In),orderedDocumentKey:Ho(t),documentKey:n.path.toArray()}}An(e,t,n){const r=this.Rn(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function Qo(e,t){let n=e.hn-t.hn;return 0!==n?n:(n=Wo(e.Tn,t.Tn),0!==n?n:(n=Wo(e.In,t.In),0!==n?n:J.comparator(e.Pn,t.Pn)))}function Wo(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function Ho(e){return(0,s.isSafariOrWebkit)()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function Jo(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(e)}class Yo{constructor(e){this.Vn=new mn((e,t)=>H.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const e=t;e.isInequality()?this.Vn=this.Vn.add(e):this.mn.push(e)}}get fn(){return this.Vn.size>1}gn(e){if(I(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=fe(e);if(void 0!==t&&!this.pn(t))return!1;const n=me(e);let r=new Set,s=0,i=0;for(;s<n.length&&this.pn(n[s]);++s)r=r.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Vn.size>0){const e=this.Vn.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[s];if(!this.yn(e,t)||!this.wn(this.dn[i++],t))return!1}++s}for(;s<n.length;++s){const e=n[s];if(i>=this.dn.length||!this.wn(this.dn[i++],e))return!1}return!0}bn(){if(this.fn)return null;let e=new mn(H.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new pe(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new pe(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new pe(n.field,"asc"===n.dir?0:1)));return new de(de.UNKNOWN_ID,this.collectionId,t,we.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
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
 */function Xo(e){if(I(e instanceof Ir||e instanceof br,20012),e instanceof Ir){if(e instanceof Vr){const t=e.value.arrayValue?.values?.map(t=>Ir.create(e.field,"==",t))||[];return br.create(t,"or")}return e}const t=e.filters.map(e=>Xo(e));return br.create(t,e.op)}function Zo(e){if(0===e.getFilters().length)return[];const t=ra(Xo(e));return I(na(t),7391),ea(t)||ta(t)?[t]:t.getFilters()}function ea(e){return e instanceof Ir}function ta(e){return e instanceof br&&Er(e)}function na(e){return ea(e)||ta(e)||function(e){if(e instanceof br&&Tr(e)){for(const t of e.getFilters())if(!ea(t)&&!ta(t))return!1;return!0}return!1}(e)}function ra(e){if(I(e instanceof Ir||e instanceof br,34018),e instanceof Ir)return e;if(1===e.filters.length)return ra(e.filters[0]);const t=e.filters.map(e=>ra(e));let n=br.create(t,e.op);return n=oa(n),na(n)?n:(I(n instanceof br,64498),I(_r(n),40251),I(n.filters.length>1,57927),n.filters.reduce((e,t)=>sa(e,t)))}function sa(e,t){let n;return I(e instanceof Ir||e instanceof br,38388),I(t instanceof Ir||t instanceof br,25473),n=e instanceof Ir?t instanceof Ir?function(e,t){return br.create([e,t],"and")}(e,t):ia(e,t):t instanceof Ir?ia(t,e):function(e,t){if(I(e.filters.length>0&&t.filters.length>0,48005),_r(e)&&_r(t))return Dr(e,t.getFilters());const n=Tr(e)?e:t,r=Tr(e)?t:e,s=n.filters.map(e=>sa(e,r));return br.create(s,"or")}(e,t),oa(n)}function ia(e,t){if(_r(t))return Dr(t,e.getFilters());{const n=t.filters.map(t=>sa(e,t));return br.create(n,"or")}}function oa(e){if(I(e instanceof Ir||e instanceof br,11850),e instanceof Ir)return e;const t=e.getFilters();if(1===t.length)return oa(t[0]);if(Sr(e))return e;const n=t.map(e=>oa(e)),r=[];return n.forEach(t=>{t instanceof Ir?r.push(t):t instanceof br&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:br.create(r,e.op)
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
 */}class aa{constructor(){this.Sn=new ca}addToCollectionParentIndex(e,t){return this.Sn.add(t),xe.resolve()}getCollectionParents(e,t){return xe.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return xe.resolve()}deleteFieldIndex(e,t){return xe.resolve()}deleteAllFieldIndexes(e){return xe.resolve()}createTargetIndexes(e,t){return xe.resolve()}getDocumentsMatchingTarget(e,t){return xe.resolve(null)}getIndexType(e,t){return xe.resolve(0)}getFieldIndexes(e,t){return xe.resolve([])}getNextCollectionGroupToUpdate(e){return xe.resolve(null)}getMinOffset(e,t){return xe.resolve(be.min())}getMinOffsetFromCollectionGroup(e,t){return xe.resolve(be.min())}updateCollectionGroup(e,t,n){return xe.resolve()}updateIndexEntries(e,t){return xe.resolve()}}class ca{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new mn(Q.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new mn(Q.comparator)).toArray()}}
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
 */const ua="IndexedDbIndexManager",la=new Uint8Array(0);class ha{constructor(e,t){this.databaseId=t,this.Dn=new ca,this.Cn=new ms(e=>Ur(e),(e,t)=>Br(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const s={collectionId:n,parent:He(r)};return da(e).put(s)}return xe.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[G(t),""],!1,!0);return da(e).H(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(Xe(r.parent))}return n})}addFieldIndex(e,t){const n=ma(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const s=n.add(r);if(t.indexState){const n=ga(e);return s.next(e=>{n.put(ko(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=ma(e),r=ga(e),s=fa(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=ma(e),n=fa(e),r=ga(e);return t.X().next(()=>n.X()).next(()=>r.X())}createTargetIndexes(e,t){return xe.forEach(this.vn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new Yo(t).bn();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=fa(e);let r=!0;const s=new Map;return xe.forEach(this.vn(t),t=>this.Fn(e,t).next(e=>{r&&(r=!!e),s.set(t,e)})).next(()=>{if(r){let e=Ss();const r=[];return xe.forEach(s,(s,i)=>{m(ua,`Using index ${function(e){return`id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`}(s)} to execute ${Ur(t)}`);const o=function(e,t){const n=fe(t);if(void 0===n)return null;for(const t of $r(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(i,s),a=function(e,t){const n=new Map;for(const r of me(t))for(const t of $r(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(i,s),c=function(e,t){const n=[];let r=!0;for(const s of me(t)){const t=0===s.kind?Gr(e,s.fieldPath,e.startAt):jr(e,s.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new mr(n,r)}(i,s),u=function(e,t){const n=[];let r=!0;for(const s of me(t)){const t=0===s.kind?jr(e,s.fieldPath,e.endAt):Gr(e,s.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new mr(n,r)}(i,s),l=this.Mn(s,i,c),h=this.Mn(s,i,u),d=this.xn(s,i,a),f=this.On(s.indexId,o,l,c.inclusive,h,u.inclusive,d);return xe.forEach(f,s=>n.Z(s,t.limit).next(t=>{t.forEach(t=>{const n=J.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return xe.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(t=0===e.filters.length?[e]:Zo(br.create(e.filters,"and")).map(t=>qr(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,n,r,s,i,o){const a=(null!=t?t.length:1)*Math.max(n.length,s.length),c=a/(null!=t?t.length:1),u=[];for(let l=0;l<a;++l){const a=t?this.Nn(t[l/c]):la,h=this.Bn(e,a,n[l%c],r),d=this.Ln(e,a,s[l%c],i),f=o.map(t=>this.Bn(e,a,t,!0));u.push(...this.createRange(h,d,f))}return u}Bn(e,t,n,r){const s=new Ko(e,J.empty(),t,n);return r?s:s.En()}Ln(e,t,n,r){const s=new Ko(e,J.empty(),t,n);return r?s.En():s}Fn(e,t){const n=new Yo(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.gn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.vn(t);return xe.forEach(r,t=>this.Fn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new mn(H.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}kn(e,t){const n=new jo;for(const r of me(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const s=n.ln(r.kind);Lo.Wt.Dt(e,s)}return n.un()}Nn(e){const t=new jo;return Lo.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const n=new jo;return Lo.Wt.Dt(Yn(this.databaseId,t),n.ln(function(e){const t=me(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.un()}xn(e,t,n){if(null===n)return[];let r=[];r.push(new jo);let s=0;for(const i of me(e)){const e=n[s++];for(const n of r)if(this.qn(t,i.fieldPath)&&Zn(e))r=this.Un(r,i,e);else{const t=n.ln(i.kind);Lo.Wt.Dt(e,t)}}return this.$n(r)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const r=[...e],s=[];for(const e of n.arrayValue.values||[])for(const n of r){const r=new jo;r.seed(n.un()),Lo.Wt.Dt(e,r.ln(t.kind)),s.push(r)}return s}qn(e,t){return!!e.filters.find(e=>e instanceof Ir&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=ma(e),r=ga(e);return(t?n.H(Mt,IDBKeyRange.bound(t,t)):n.H()).next(e=>{const t=[];return xe.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new we(t.sequenceNumber,new be(Eo(t.readTime),new J(Xe(t.documentKey)),t.largestBatchId)):we.empty(),r=e.fields.map(([e,t])=>new pe(H.fromServerFormat(e),t));return new de(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:O(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=ma(e),s=ga(e);return this.Wn(e).next(e=>r.H(Mt,IDBKeyRange.bound(t,t)).next(t=>xe.forEach(t,t=>s.put(ko(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return xe.forEach(t,(t,r)=>{const s=n.get(t.collectionGroup);return(s?xe.resolve(s):this.getFieldIndexes(e,t.collectionGroup)).next(s=>(n.set(t.collectionGroup,s),xe.forEach(s,n=>this.Qn(e,t,n).next(t=>{const s=this.Gn(r,n);return t.isEqual(s)?xe.resolve():this.zn(e,r,n,t,s)}))))})}jn(e,t,n,r){return fa(e).put(r.Rn(this.uid,this.Kn(n,t.key),t.key))}Hn(e,t,n,r){return fa(e).delete(r.An(this.uid,this.Kn(n,t.key),t.key))}Qn(e,t,n){const r=fa(e);let s=new mn(Qo);return r.ee({index:Bt,range:IDBKeyRange.only([n.indexId,this.uid,Ho(this.Kn(n,t))])},(e,r)=>{s=s.add(new Ko(n.indexId,t,Jo(r.arrayValue),Jo(r.directionalValue)))}).next(()=>s)}Gn(e,t){let n=new mn(Qo);const r=this.kn(t,e);if(null==r)return n;const s=fe(t);if(null!=s){const i=e.data.field(s.fieldPath);if(Zn(i))for(const s of i.arrayValue.values||[])n=n.add(new Ko(t.indexId,e.key,this.Nn(s),r))}else n=n.add(new Ko(t.indexId,e.key,la,r));return n}zn(e,t,n,r,s){m(ua,"Updating index entries for document '%s'",t.key);const i=[];return function(e,t,n,r,s){const i=e.getIterator(),o=t.getIterator();let a=pn(i),c=pn(o);for(;a||c;){let e=!1,t=!1;if(a&&c){const r=n(a,c);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(c),c=pn(o)):t?(s(a),a=pn(i)):(a=pn(i),c=pn(o))}}(r,s,Qo,r=>{i.push(this.jn(e,t,n,r))},r=>{i.push(this.Hn(e,t,n,r))}),xe.waitFor(i)}Wn(e){let t=1;return ga(e).ee({index:Ot,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>Qo(e,t)).filter((e,t,n)=>!t||0!==Qo(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=Qo(s,e),i=Qo(s,t);if(0===n)r[0]=e.En();else if(n>0&&i<0)r.push(s),r.push(s.En());else if(i>0)break}r.push(t);const s=[];for(let e=0;e<r.length;e+=2){if(this.Jn(r[e],r[e+1]))return[];const t=r[e].An(this.uid,la,J.empty()),n=r[e+1].An(this.uid,la,J.empty());s.push(IDBKeyRange.bound(t,n))}return s}Jn(e,t){return Qo(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(pa)}getMinOffset(e,t){return xe.mapArray(this.vn(t),t=>this.Fn(e,t).next(e=>e||w(44426))).next(pa)}}function da(e){return on(e,Dt)}function fa(e){return on(e,qt)}function ma(e){return on(e,Rt)}function ga(e){return on(e,Vt)}function pa(e){I(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const s=e[r].indexState.offset;_e(s,t)<0&&(t=s),n<s.largestBatchId&&(n=s.largestBatchId)}return new be(t.readTime,t.documentKey,n)}
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
 */const ya={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},wa=41943040;class va{static withCacheSize(e){return new va(e,va.DEFAULT_COLLECTION_PERCENTILE,va.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n
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
 */}}function Ia(e,t,n){const r=e.store(rt),s=e.store(lt),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.ee({range:o},(e,t,n)=>(a++,n.delete()));i.push(c.next(()=>{I(1===a,47070,{batchId:n.batchId})}));const u=[];for(const e of n.mutations){const r=ct(t,e.key.path,n.batchId);i.push(s.delete(r)),u.push(e.key)}return xe.waitFor(i).next(()=>u)}function ba(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw w(14731);t=e.noDocument}return JSON.stringify(t).length}
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
 */va.DEFAULT_COLLECTION_PERCENTILE=10,va.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,va.DEFAULT=new va(wa,va.DEFAULT_COLLECTION_PERCENTILE,va.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),va.DISABLED=new va(-1,0,0);class _a{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Zn={}}static wt(e,t,n,r){I(""!==e.uid,64387);const s=e.isAuthenticated()?e.uid:"";return new _a(s,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ea(e).ee({index:it,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const s=Sa(e),i=Ea(e);return i.add({}).next(o=>{I("number"==typeof o,49019);const a=new oi(o,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>Zi(e.yt,t)),s=n.mutations.map(t=>Zi(e.yt,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:s}}(this.serializer,this.userId,a),u=[];let l=new mn((e,t)=>O(e.canonicalString(),t.canonicalString()));for(const e of r){const t=ct(this.userId,e.key.path,o);l=l.add(e.key.path.popLast()),u.push(i.put(c)),u.push(s.put(t,ut))}return l.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Zn[o]=a.keys()}),xe.waitFor(u).next(()=>a)})}lookupMutationBatch(e,t){return Ea(e).get(t).next(e=>e?(I(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),So(this.serializer,e)):null)}Xn(e,t){return this.Zn[t]?xe.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.Zn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return Ea(e).ee({index:it,range:r},(e,t,r)=>{t.userId===this.userId&&(I(t.batchId>=n,47524,{Yn:n}),s=So(this.serializer,t)),r.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=ze;return Ea(e).ee({index:it,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,ze],[this.userId,Number.POSITIVE_INFINITY]);return Ea(e).H(it,t).next(e=>e.map(e=>So(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=at(this.userId,t.path),r=IDBKeyRange.lowerBound(n),s=[];return Sa(e).ee({range:r},(n,r,i)=>{const[o,a,c]=n,u=Xe(a);if(o===this.userId&&t.path.isEqual(u))return Ea(e).get(c).next(e=>{if(!e)throw w(61480,{er:n,batchId:c});I(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),s.push(So(this.serializer,e))});i.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new mn(O);const r=[];return t.forEach(t=>{const s=at(this.userId,t.path),i=IDBKeyRange.lowerBound(s),o=Sa(e).ee({range:i},(e,r,s)=>{const[i,o,a]=e,c=Xe(o);i===this.userId&&t.path.isEqual(c)?n=n.add(a):s.done()});r.push(o)}),xe.waitFor(r).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,s=at(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new mn(O);return Sa(e).ee({range:i},(e,t,s)=>{const[i,a,c]=e,u=Xe(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()}).next(()=>this.tr(e,o))}tr(e,t){const n=[],r=[];return t.forEach(t=>{r.push(Ea(e).get(t).next(e=>{if(null===e)throw w(35274,{batchId:t});I(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(So(this.serializer,e))}))}),xe.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return Ia(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),xe.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return xe.resolve();const n=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),r=[];return Sa(e).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=Xe(e[1]);r.push(t)}else n.done()}).next(()=>{I(0===r.length,56720,{rr:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return Ta(e,this.userId,t)}ir(e){return xa(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:ze,lastStreamToken:""})}}function Ta(e,t,n){const r=at(t,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Sa(e).ee({range:i,Y:!0},(e,n,r)=>{const[i,a,c]=e;i===t&&a===s&&(o=!0),r.done()}).next(()=>o)}function Ea(e){return on(e,rt)}function Sa(e){return on(e,lt)}function xa(e){return on(e,nt)}
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
 */class Ca{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Ca(0)}static ar(){return new Ca(-1)}}
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
 */class Da{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const n=new Ca(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(e=>le.fromTimestamp(new ue(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.cr(e,r)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Na(e).delete(t.targetId)).next(()=>this.ur(e)).next(t=>(I(t.targetCount>0,8065),t.targetCount-=1,this.cr(e,t)))}removeTargets(e,t,n){let r=0;const s=[];return Na(e).ee((i,o)=>{const a=xo(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(e,a)))}).next(()=>xe.waitFor(s)).next(()=>r)}forEachTarget(e,t){return Na(e).ee((e,n)=>{const r=xo(n);t(r)})}ur(e){return Aa(e).get(xt).next(e=>(I(null!==e,2888),e))}cr(e,t){return Aa(e).put(xt,t)}lr(e,t){return Na(e).put(Co(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(e=>e.targetCount)}getTargetData(e,t){const n=Ur(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Na(e).ee({range:r,index:It},(e,n,r)=>{const i=xo(n);Br(t,i.target)&&(s=i,r.done())}).next(()=>s)}addMatchingKeys(e,t,n){const r=[],s=ka(e);return t.forEach(t=>{const i=He(t.path);r.push(s.put({targetId:n,path:i})),r.push(this.referenceDelegate.addReference(e,n,t))}),xe.waitFor(r)}removeMatchingKeys(e,t,n){const r=ka(e);return xe.forEach(t,t=>{const s=He(t.path);return xe.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=ka(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=ka(e);let s=Ss();return r.ee({range:n,Y:!0},(e,t,n)=>{const r=Xe(e[1]),i=new J(r);s=s.add(i)}).next(()=>s)}containsKey(e,t){const n=He(t.path),r=IDBKeyRange.bound([n],[G(n)],!1,!0);let s=0;return ka(e).ee({index:Et,Y:!0,range:r},([e,t],n,r)=>{0!==e&&(s++,r.done())}).next(()=>s>0)}At(e,t){return Na(e).get(t).next(e=>e?xo(e):null)}}function Na(e){return on(e,vt)}function Aa(e){return on(e,Ct)}function ka(e){return on(e,_t)}
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
 */const Fa="LruGarbageCollector",Ra=1048576;function Ma([e,t],[n,r]){const s=O(e,n);return 0===s?O(t,r):s}class Va{constructor(e){this.Pr=e,this.buffer=new mn(Ma),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Ma(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Pa{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Ar(e){m(Fa,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Re(e)?m(Fa,"Ignoring IndexedDB error during garbage collection: ",e):await Se(e)}await this.Ar(3e5)})}}class Oa{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return xe.resolve(Be.ce);const n=new Va(t);return this.Vr.forEachTarget(e,e=>n.Er(e.sequenceNumber)).next(()=>this.Vr.mr(e,e=>n.Er(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(m("LruGarbageCollector","Garbage collection skipped; disabled"),xe.resolve(ya)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(m("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ya):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,r,s,i,a,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(m("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),d()<=o.LogLevel.DEBUG&&m("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-l}ms\n\tDetermined least recently used ${r} in `+(a-i)+"ms\n"+`\tRemoved ${s} targets in `+(c-a)+"ms\n"+`\tRemoved ${e} documents in `+(u-c)+"ms\n"+`Total Duration: ${u-l}ms`),xe.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}function La(e,t){return new Oa(e,t)}
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
 */class qa{constructor(e,t){this.db=e,this.garbageCollector=La(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(e,n)=>t(n))}addReference(e,t,n){return Ua(e,n)}removeReference(e,t,n){return Ua(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Ua(e,t)}wr(e,t){return function(e,t){let n=!1;return xa(e).te(r=>Ta(e,r,t).next(e=>(e&&(n=!0),xe.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.yr(e,(i,o)=>{if(o<=t){const t=this.wr(e,i).next(t=>{if(!t)return s++,n.getEntry(e,i).next(()=>(n.removeEntry(i,le.min()),ka(e).delete(function(e){return[0,He(e.path)]}(i))))});r.push(t)}}).next(()=>xe.waitFor(r)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Ua(e,t)}yr(e,t){const n=ka(e);let r,s=Be.ce;return n.ee({index:Et},([e,n],{path:i,sequenceNumber:o})=>{0===e?(s!==Be.ce&&t(new J(Xe(r)),s),s=o,r=i):s=Be.ce}).next(()=>{s!==Be.ce&&t(new J(Xe(r)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Ua(e,t){return ka(e).put(function(e,t){return{targetId:0,path:He(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
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
 */class Ba{constructor(){this.changes=new ms(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fr.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?xe.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
 */class za{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Ka(e).put(n)}removeEntry(e,t,n){return Ka(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],_o(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.br(e,n)))}getEntry(e,t){let n=fr.newInvalidDocument(t);return Ka(e).ee({index:ft,range:IDBKeyRange.only(Qa(t))},(e,r)=>{n=this.Sr(t,r)}).next(()=>n)}Dr(e,t){let n={size:0,document:fr.newInvalidDocument(t)};return Ka(e).ee({index:ft,range:IDBKeyRange.only(Qa(t))},(e,r)=>{n={document:this.Sr(t,r),size:ba(r)}}).next(()=>n)}getEntries(e,t){let n=ps();return this.Cr(e,t,(e,t)=>{const r=this.Sr(e,t);n=n.insert(e,r)}).next(()=>n)}vr(e,t){let n=ps(),r=new hn(J.comparator);return this.Cr(e,t,(e,t)=>{const s=this.Sr(e,t);n=n.insert(e,s),r=r.insert(e,ba(t))}).next(()=>({documents:n,Fr:r}))}Cr(e,t,n){if(t.isEmpty())return xe.resolve();let r=new mn(Ha);t.forEach(e=>r=r.add(e));const s=IDBKeyRange.bound(Qa(r.first()),Qa(r.last())),i=r.getIterator();let o=i.getNext();return Ka(e).ee({index:ft,range:s},(e,t,r)=>{const s=J.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&Ha(o,s)<0;)n(o,null),o=i.getNext();o&&o.isEqual(s)&&(n(o,t),o=i.hasNext()?i.getNext():null),o?r.j(Qa(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,s){const i=t.path,o=[i.popLast().toArray(),i.lastSegment(),_o(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ka(e).H(IDBKeyRange.bound(o,a,!0)).next(e=>{s?.incrementDocumentReadCount(e.length);let n=ps();for(const s of e){const e=this.Sr(J.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);e.isFoundDocument()&&(ls(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let s=ps();const i=Wa(t,n),o=Wa(t,be.max());return Ka(e).ee({index:gt,range:IDBKeyRange.bound(i,o,!0)},(e,t,n)=>{const i=this.Sr(J.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);s=s.insert(i.key,i),s.size===r&&n.done()}).next(()=>s)}newChangeBuffer(e){return new Ga(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return ja(e).get(wt).next(e=>(I(!!e,20021),e))}br(e,t){return ja(e).put(wt,t)}Sr(e,t){if(t){const e=function(e,t){let n;if(t.document)n=Xi(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=J.fromSegments(t.noDocument.path),r=Eo(t.noDocument.readTime);n=fr.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return w(56709);{const e=J.fromSegments(t.unknownDocument.path),r=Eo(t.unknownDocument.version);n=fr.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new ue(e[0],e[1]);return le.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(le.min()))return e}return fr.newInvalidDocument(e)}}function $a(e){return new za(e)}class Ga extends Ba{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new ms(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new mn((e,t)=>O(e.canonicalString(),t.canonicalString()));return this.changes.forEach((s,i)=>{const o=this.Or.get(s);if(t.push(this.Mr.removeEntry(e,s,o.readTime)),i.isValidDocument()){const a=bo(this.Mr.serializer,i);r=r.add(s.path.popLast());const c=ba(a);n+=c-o.size,t.push(this.Mr.addEntry(e,s,a))}else if(n-=o.size,this.trackRemovals){const n=bo(this.Mr.serializer,i.convertToNoDocument(le.min()));t.push(this.Mr.addEntry(e,s,n))}}),r.forEach(n=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Mr.updateMetadata(e,n)),xe.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(e=>(this.Or.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:e,Fr:t})=>(t.forEach((t,n)=>{this.Or.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function ja(e){return on(e,yt)}function Ka(e){return on(e,ht)}function Qa(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Wa(e,t){const n=t.documentKey.path.toArray();return[e,_o(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Ha(e,t){const n=e.path.toArray(),r=t.path.toArray();let s=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(s=O(n[e],r[e]),s)return s;return s=O(n.length,r.length),s||(s=O(n[n.length-2],r[r.length-2]),s||O(n[n.length-1],r[r.length-1])
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
 */)}class Ja{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t
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
 */}}class Ya{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Js(n.mutation,e,yn.empty(),ue.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Ss()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Ss()){const r=Is();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=ws();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Is();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Ss()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=ps();const i=_s(),o=_s();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof ei)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),Js(o.mutation,t,o.mutation.getFieldMask(),ue.now())):i.set(t.key,yn.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new Ja(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=_s();let r=new hn((e,t)=>e-t),s=Ss();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||yn.empty();o=s.applyToLocalView(i,o),n.set(e,o);const a=(r.get(s.batchId)||Ss()).add(e);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=bs();c.forEach(e=>{if(!s.has(e)){const r=Ws(t.get(e),n.get(e));null!==r&&u.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,u))}return xe.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return Jr(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Yr(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):xe.resolve(Is());let o=he,a=s;return i.next(t=>xe.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?xe.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,Ss())).next(e=>({batchId:o,changes:vs(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(e=>{let t=ws();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=ws();return this.indexManager.getCollectionParents(e,s).next(o=>xe.forEach(o,o=>{const a=function(e,t){return new Kr(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(s));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>{s.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,fr.newInvalidDocument(r)))});let n=ws();return e.forEach((e,r)=>{const i=s.get(e);void 0!==i&&Js(i.mutation,r,yn.empty(),ue.now()),ls(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */class Xa{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return xe.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:Ui(e.createTime)}}(t)),xe.resolve()}getNamedQuery(e,t){return xe.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(e){return{name:e.name,query:Do(e.bundledQuery),readTime:Ui(e.readTime)}}(t)),xe.resolve()
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
 */}}class Za{constructor(){this.overlays=new hn(J.comparator),this.Lr=new Map}getOverlay(e,t){return xe.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Is();return xe.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.bt(e,t,r)}),xe.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Lr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Lr.delete(n)),xe.resolve()}getOverlaysForCollection(e,t,n){const r=Is(),s=t.length+1,i=new J(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return xe.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new hn((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=Is(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Is(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return xe.resolve(o)}bt(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Lr.get(r.largestBatchId).delete(n.key);this.Lr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new ci(t,n));let s=this.Lr.get(t);void 0===s&&(s=Ss(),this.Lr.set(t,s)),this.Lr.set(t,s.add(n.key))}}
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
 */class ec{constructor(){this.sessionToken=In.EMPTY_BYTE_STRING}getSessionToken(e){return xe.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,xe.resolve()
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
 */}}class tc{constructor(){this.kr=new mn(nc.Kr),this.qr=new mn(nc.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new nc(e,t);this.kr=this.kr.add(n),this.qr=this.qr.add(n)}$r(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Wr(new nc(e,t))}Qr(e,t){e.forEach(e=>this.removeReference(e,t))}Gr(e){const t=new J(new Q([])),n=new nc(t,e),r=new nc(t,e+1),s=[];return this.qr.forEachInRange([n,r],e=>{this.Wr(e),s.push(e.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new J(new Q([])),n=new nc(t,e),r=new nc(t,e+1);let s=Ss();return this.qr.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new nc(e,0),n=this.kr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class nc{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return J.comparator(e.key,t.key)||O(e.Hr,t.Hr)}static Ur(e,t){return O(e.Hr,t.Hr)||J.comparator(e.key,t.key)}}
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
 */class rc{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new mn(nc.Kr)}checkEmpty(e){return xe.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new oi(s,t,n,r);this.mutationQueue.push(i);for(const t of r)this.Jr=this.Jr.add(new nc(t.key,s)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return xe.resolve(i)}lookupMutationBatch(e,t){return xe.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.Xr(n),s=r<0?0:r;return xe.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return xe.resolve(0===this.mutationQueue.length?ze:this.Yn-1)}getAllMutationBatches(e){return xe.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new nc(t,0),r=new nc(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([n,r],e=>{const t=this.Zr(e.Hr);s.push(t)}),xe.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new mn(O);return t.forEach(e=>{const t=new nc(e,0),r=new nc(e,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([t,r],e=>{n=n.add(e.Hr)})}),xe.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;J.isDocumentKey(s)||(s=s.child(""));const i=new nc(new J(s),0);let o=new mn(O);return this.Jr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Hr)),!0)},i),xe.resolve(this.Yr(o))}Yr(e){const t=[];return e.forEach(e=>{const n=this.Zr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){I(0===this.ei(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Jr;return xe.forEach(t.mutations,r=>{const s=new nc(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Jr=n})}nr(e){}containsKey(e,t){const n=new nc(t,0),r=this.Jr.firstAfterOrEqual(n);return xe.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,xe.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
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
 */class sc{constructor(e){this.ti=e,this.docs=new hn(J.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return xe.resolve(n?n.document.mutableCopy():fr.newInvalidDocument(t))}getEntries(e,t){let n=ps();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():fr.newInvalidDocument(e))}),xe.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let s=ps();const i=t.path,o=new J(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||_e(Ie(o),n)<=0||(r.has(o.key)||ls(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return xe.resolve(s)}getAllFromCollectionGroup(e,t,n,r){w(9500)}ni(e,t){return xe.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ic(this)}getSize(e){return xe.resolve(this.size)}}class ic extends Ba{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(n)}),xe.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}
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
 */class oc{constructor(e){this.persistence=e,this.ri=new ms(e=>Ur(e),Br),this.lastRemoteSnapshotVersion=le.min(),this.highestTargetId=0,this.ii=0,this.si=new tc,this.targetCount=0,this.oi=Ca._r()}forEachTarget(e,t){return this.ri.forEach((e,n)=>t(n)),xe.resolve()}getLastRemoteSnapshotVersion(e){return xe.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return xe.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),xe.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),xe.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Ca(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,xe.resolve()}updateTargetData(e,t){return this.lr(t),xe.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,xe.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.ri.forEach((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.ri.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),xe.waitFor(s).next(()=>r)}getTargetCount(e){return xe.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return xe.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),xe.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),xe.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),xe.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return xe.resolve(n)}containsKey(e,t){return xe.resolve(this.si.containsKey(t))}}
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
 */class ac{constructor(e,t){this._i={},this.overlays={},this.ai=new Be(0),this.ui=!1,this.ui=!0,this.ci=new ec,this.referenceDelegate=e(this),this.li=new oc(this),this.indexManager=new aa,this.remoteDocumentCache=function(e){return new sc(e)}(e=>this.referenceDelegate.hi(e)),this.serializer=new Io(t),this.Pi=new Xa(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Za,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new rc(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){m("MemoryPersistence","Starting transaction:",e);const r=new cc(this.ai.next());return this.referenceDelegate.Ti(),n(r).next(e=>this.referenceDelegate.Ii(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ei(e,t){return xe.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class cc extends Ee{constructor(e){super(),this.currentSequenceNumber=e}}class uc{constructor(e){this.persistence=e,this.Ri=new tc,this.Ai=null}static Vi(e){return new uc(e)}get di(){if(this.Ai)return this.Ai;throw w(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),xe.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),xe.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),xe.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(e=>this.di.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return xe.forEach(this.di,n=>{const r=J.fromPath(n);return this.mi(e,r).next(e=>{e||t.removeEntry(r,le.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return xe.or([()=>xe.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class lc{constructor(e,t){this.persistence=e,this.fi=new ms(e=>He(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=La(this,t)}static Vi(e,t){return new lc(e,t)}Ti(){}Ii(e){return xe.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}mr(e,t){return xe.forEach(this.fi,(n,r)=>this.wr(e,n,r).next(e=>e?xe.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ni(e,r=>this.wr(e,r,t).next(e=>{e||(n++,s.removeEntry(r,le.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),xe.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),xe.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),xe.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),xe.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Jn(e.data.value)),t}wr(e,t,n){return xe.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.fi.get(t);return xe.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
 */class hc{constructor(e){this.serializer=e}k(e,t,n,r){const i=new De("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore(et)}(e),function(e){e.createObjectStore(nt,{keyPath:"userId"}),e.createObjectStore(rt,{keyPath:st,autoIncrement:!0}).createIndex(it,ot,{unique:!0}),e.createObjectStore(lt)}(e),dc(e),function(e){e.createObjectStore(Ze)}(e));let o=xe.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore(_t),e.deleteObjectStore(vt),e.deleteObjectStore(Ct)}(e),dc(e)),o=o.next(()=>function(e){const t=e.store(Ct),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:le.min().toTimestamp(),targetCount:0};return t.put(xt,n)}(i))),n<4&&r>=4&&(0!==n&&(o=o.next(()=>function(e,t){return t.store(rt).H().next(n=>{e.deleteObjectStore(rt),e.createObjectStore(rt,{keyPath:st,autoIncrement:!0}).createIndex(it,ot,{unique:!0});const r=t.store(rt),s=n.map(e=>r.put(e));return xe.waitFor(s)})}(e,i))),o=o.next(()=>{!function(e){e.createObjectStore(At,{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(o=o.next(()=>this.gi(i))),n<6&&r>=6&&(o=o.next(()=>(function(e){e.createObjectStore(yt)}(e),this.pi(i)))),n<7&&r>=7&&(o=o.next(()=>this.yi(i))),n<8&&r>=8&&(o=o.next(()=>this.wi(e,i))),n<9&&r>=9&&(o=o.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(o=o.next(()=>this.bi(i))),n<11&&r>=11&&(o=o.next(()=>{!function(e){e.createObjectStore(kt,{keyPath:"bundleId"})}(e),function(e){e.createObjectStore(Ft,{keyPath:"name"})}(e)})),n<12&&r>=12&&(o=o.next(()=>{!function(e){const t=e.createObjectStore($t,{keyPath:Gt});t.createIndex(jt,Kt,{unique:!1}),t.createIndex(Qt,Wt,{unique:!1})}(e)})),n<13&&r>=13&&(o=o.next(()=>function(e){const t=e.createObjectStore(ht,{keyPath:dt});t.createIndex(ft,mt),t.createIndex(gt,pt)}(e)).next(()=>this.Si(e,i)).next(()=>e.deleteObjectStore(Ze))),n<14&&r>=14&&(o=o.next(()=>this.Di(e,i))),n<15&&r>=15&&(o=o.next(()=>function(e){e.createObjectStore(Rt,{keyPath:"indexId",autoIncrement:!0}).createIndex(Mt,"collectionGroup",{unique:!1}),e.createObjectStore(Vt,{keyPath:Pt}).createIndex(Ot,Lt,{unique:!1}),e.createObjectStore(qt,{keyPath:Ut}).createIndex(Bt,zt,{unique:!1})}(e))),n<16&&r>=16&&(o=o.next(()=>{t.objectStore(Vt).clear()}).next(()=>{t.objectStore(qt).clear()})),n<17&&r>=17&&(o=o.next(()=>{!function(e){e.createObjectStore(Ht,{keyPath:"name"})}(e)})),n<18&&r>=18&&(0,s.isSafariOrWebkit)()&&(o=o.next(()=>{t.objectStore(Vt).clear()}).next(()=>{t.objectStore(qt).clear()})),o}pi(e){let t=0;return e.store(Ze).ee((e,n)=>{t+=ba(n)}).next(()=>{const n={byteSize:t};return e.store(yt).put(wt,n)})}gi(e){const t=e.store(nt),n=e.store(rt);return t.H().next(t=>xe.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,ze],[t.userId,t.lastAcknowledgedBatchId]);return n.H(it,r).next(n=>xe.forEach(n,n=>{I(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=So(this.serializer,n);return Ia(e,t.userId,r).next(()=>{})}))}))}yi(e){const t=e.store(_t),n=e.store(Ze);return e.store(Ct).get(xt).next(e=>{const r=[];return n.ee((n,s)=>{const i=new Q(n),o=function(e){return[0,He(e)]}(i);r.push(t.get(o).next(n=>n?xe.resolve():(n=>t.put({targetId:0,path:He(n),sequenceNumber:e.highestListenSequenceNumber}))(i)))}).next(()=>xe.waitFor(r))})}wi(e,t){e.createObjectStore(Dt,{keyPath:Nt});const n=t.store(Dt),r=new ca,s=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:He(r)})}};return t.store(Ze).ee({Y:!0},(e,t)=>{const n=new Q(e);return s(n.popLast())}).next(()=>t.store(lt).ee({Y:!0},([e,t,n],r)=>{const i=Xe(t);return s(i.popLast())}))}bi(e){const t=e.store(vt);return t.ee((e,n)=>{const r=xo(n),s=Co(this.serializer,r);return t.put(s)})}Si(e,t){const n=t.store(Ze),r=[];return n.ee((e,n)=>{const s=t.store(ht),i=function(e){return e.document?new J(Q.fromString(e.document.name).popFirst(5)):e.noDocument?J.fromSegments(e.noDocument.path):e.unknownDocument?J.fromSegments(e.unknownDocument.path):w(36783)}(n).path.toArray(),o={prefixPath:i.slice(0,i.length-2),collectionGroup:i[i.length-2],documentId:i[i.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(s.put(o))}).next(()=>xe.waitFor(r))}Di(e,t){const n=t.store(rt),r=$a(this.serializer),s=new ac(uc.Vi,this.serializer.yt);return n.H().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??Ss();So(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),xe.forEach(n,(e,n)=>{const i=new c(n),o=Vo.wt(this.serializer,i),a=s.getIndexManager(i),u=_a.wt(i,this.serializer,a,s.referenceDelegate);return new Ya(r,u,o,a).recalculateAndSaveOverlaysForDocumentKeys(new sn(t,Be.ce),e).next()})})}}function dc(e){e.createObjectStore(_t,{keyPath:Tt}).createIndex(Et,St,{unique:!0}),e.createObjectStore(vt,{keyPath:"targetId"}).createIndex(It,bt,{unique:!0}),e.createObjectStore(Ct)}const fc="IndexedDbPersistence",mc=18e5,gc=5e3,pc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",yc="main";class wc{constructor(e,t,n,r,s,i,o,a,c,u,l=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=s,this.window=i,this.document=o,this.Fi=c,this.Mi=u,this.xi=l,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=e=>Promise.resolve(),!wc.v())throw new E(T.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new qa(this,r),this.Ki=t+yc,this.serializer=new Io(a),this.qi=new Ne(this.Ki,this.xi,new hc(this.serializer)),this.ci=new Oo,this.li=new Da(this.referenceDelegate,this.serializer),this.remoteDocumentCache=$a(this.serializer),this.Pi=new Fo,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,!1===u&&g(fc,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new E(T.FAILED_PRECONDITION,pc);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new Be(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.qi&&this.qi.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Ic(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Ji(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(Re(e))return m(fc,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return m(fc,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return vc(e).get(tt).next(e=>xe.resolve(this.Xi(e)))}Yi(e){return Ic(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,mc)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=on(e,At);return t.H().next(e=>{const n=this.ns(e,mc),r=e.filter(e=>-1===n.indexOf(e));return xe.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.Mi?xe.resolve(!0):vc(e).get(tt).next(t=>{if(null!==t&&this.ts(t.leaseTimestampMs,gc)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new E(T.FAILED_PRECONDITION,pc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ic(e).H().next(e=>void 0===this.ns(e,gc).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&m(fc,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[et,At],e=>{const t=new sn(e,Be.ce);return this.Ji(t).next(()=>this.Yi(t))}),this.qi.close(),this.ls()}ns(e,t){return e.filter(e=>this.ts(e.updateTimeMs,t)&&!this.ss(e.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>Ic(e).H().next(e=>this.ns(e,mc).map(e=>e.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return _a.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new ha(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Vo.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){m(fc,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",s=function(e){return 18===e?rn:17===e?nn:16===e?tn:15===e?en:14===e?Zt:13===e?Xt:12===e?Yt:11===e?Jt:void w(60245)}(this.xi);let i;return this.qi.runTransaction(e,r,s,r=>(i=new sn(r,this.ai?this.ai.next():Be.ce),"readwrite-primary"===t?this.ji(i).next(e=>!!e||this.Hi(i)).next(t=>{if(!t)throw g(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new E(T.FAILED_PRECONDITION,Te);return n(i)}).next(e=>this.Zi(i).next(()=>e)):this.Ps(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Ps(e){return vc(e).get(tt).next(e=>{if(null!==e&&this.ts(e.leaseTimestampMs,gc)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new E(T.FAILED_PRECONDITION,pc)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return vc(e).put(tt,t)}static v(){return Ne.v()}Ji(e){const t=vc(e);return t.get(tt).next(e=>this.Xi(e)?(m(fc,"Releasing primary lease."),t.delete(tt)):xe.resolve())}ts(e,t){const n=Date.now();return!(e<n-t||e>n&&(g(`Detected an update time that is in the future: ${e} > ${n}`),1))}Wi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground="visible"===this.document.visibilityState)}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){"function"==typeof this.window?.addEventListener&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;(0,s.isSafari)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=null!==this.Ui?.getItem(this.rs(e));return m(fc,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return g(fc,"Failed to get zombied client id.",e),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){g("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch(e){}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function vc(e){return on(e,et)}function Ic(e){return on(e,At)}function bc(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"
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
 */}class _c{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ts=n,this.Is=r}static Es(e,t){let n=Ss(),r=Ss();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new _c(e,t.fromCache,n,r)}}
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
 */class Tc{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
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
 */class Ec{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(0,s.isSafari)()?8:Ae((0,s.getUA)())>0?6:4}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.gs(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ps(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Tc;return this.ys(e,t,n).next(r=>{if(s.result=r,this.As)return this.ws(e,t,n,r.size)})}).next(()=>s.result)}ws(e,t,n,r){return n.documentReadCount<this.Vs?(d()<=o.LogLevel.DEBUG&&m("QueryEngine","SDK will not create cache indexes for query:",us(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),xe.resolve()):(d()<=o.LogLevel.DEBUG&&m("QueryEngine","Query:",us(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(d()<=o.LogLevel.DEBUG&&m("QueryEngine","The SDK decides to create cache indexes for query:",us(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Zr(t))):xe.resolve())}gs(e,t){if(Hr(t))return xe.resolve(null);let n=Zr(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=ss(t,null,"F"),n=Zr(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const s=Ss(...r);return this.fs.getDocuments(e,s).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const i=this.bs(t,r);return this.Ss(t,i,s,n.readTime)?this.gs(e,ss(t,null,"F")):this.Ds(e,i,t,n)}))})))}ps(e,t,n,r){return Hr(t)||r.isEqual(le.min())?xe.resolve(null):this.fs.getDocuments(e,n).next(s=>{const i=this.bs(t,s);return this.Ss(t,i,n,r)?xe.resolve(null):(d()<=o.LogLevel.DEBUG&&m("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),us(t)),this.Ds(e,i,t,ve(r,he)).next(e=>e))})}bs(e,t){let n=new mn(ds(e));return t.forEach((t,r)=>{ls(e,r)&&(n=n.add(r))}),n}Ss(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}ys(e,t,n){return d()<=o.LogLevel.DEBUG&&m("QueryEngine","Using full collection scan to execute query:",us(t)),this.fs.getDocumentsMatchingQuery(e,t,be.min(),n)}Ds(e,t,n,r){return this.fs.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const Sc="LocalStore",xc=3e8;class Cc{constructor(e,t,n,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new hn(O),this.Fs=new ms(e=>Ur(e),Br),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ya(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function Dc(e,t,n,r){return new Cc(e,t,n,r)}async function Nc(e,t){const n=_(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Os(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=Ss();for(const e of r){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ns:e,removedBatchIds:s,addedBatchIds:i}))})})}function Ac(e){const t=_(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function kc(e,t,n){let r=Ss(),s=Ss();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=ps();return n.forEach((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(le.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):m(Sc,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{Bs:r,Ls:s}})}function Fc(e,t){const n=_(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=ze),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Rc(e,t){const n=_(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.li.getTargetData(e,t).next(s=>s?(r=s,xe.resolve(r)):n.li.allocateTargetId(e).next(s=>(r=new vo(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.li.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.vs.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.vs=n.vs.insert(e.targetId,e),n.Fs.set(t,e.targetId)),e})}async function Mc(e,t,n){const r=_(e),s=r.vs.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(e){if(!Re(e))throw e;m(Sc,`Failed to update sequence numbers for target ${t}: ${e}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function Vc(e,t,n){const r=_(e);let s=le.min(),i=Ss();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=_(e),s=r.Fs.get(n);return void 0!==s?xe.resolve(r.vs.get(s)):r.li.getTargetData(t,n)}(r,e,Zr(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.Cs.getDocumentsMatchingQuery(e,t,n?s:le.min(),n?i:Ss())).next(e=>(Lc(r,hs(t),e),{documents:e,ks:i})))}function Pc(e,t){const n=_(e),r=_(n.li),s=n.vs.get(t);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",e=>r.At(e,t).next(e=>e?e.target:null))}function Oc(e,t){const n=_(e),r=n.Ms.get(t)||le.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.xs.getAllFromCollectionGroup(e,t,ve(r,he),Number.MAX_SAFE_INTEGER)).then(e=>(Lc(n,t,e),e))}function Lc(e,t,n){let r=e.Ms.get(t)||le.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ms.set(t,r)}async function qc(e,t,n=Ss()){const r=await Rc(e,Zr(Do(t.bundledQuery))),s=_(e);return s.persistence.runTransaction("Save named query","readwrite",e=>{const i=Ui(t.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Pi.saveNamedQuery(e,t);const o=r.withResumeToken(In.EMPTY_BYTE_STRING,i);return s.vs=s.vs.insert(o.targetId,o),s.li.updateTargetData(e,o).next(()=>s.li.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>s.li.addMatchingKeys(e,n,r.targetId)).next(()=>s.Pi.saveNamedQuery(e,t))})}
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
 */const Uc="firestore_clients";function Bc(e,t){return`${Uc}_${e}_${t}`}const zc="firestore_mutations";function $c(e,t,n){let r=`${zc}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const Gc="firestore_targets";function jc(e,t){return`${Gc}_${e}_${t}`
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
 */}const Kc="SharedClientState";class Qc{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static $s(e,t,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new E(r.error.code,r.error.message))),i?new Qc(e,t,r.state,s):(g(Kc,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Wc{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new E(n.error.code,n.error.message))),s?new Wc(e,n.state,r):(g(Kc,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Hc{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=Cs();for(let e=0;r&&e<n.activeTargetIds.length;++e)r=Ke(n.activeTargetIds[e]),s=s.add(n.activeTargetIds[e]);return r?new Hc(e,s):(g(Kc,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Jc{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new Jc(t.clientId,t.onlineState):(g(Kc,`Failed to parse online state: ${e}`),null)}}class Yc{constructor(){this.activeTargetIds=Cs()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Xc{constructor(e,t,n,r,s){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Hs.bind(this),this.Js=new hn(O),this.started=!1,this.Zs=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Xs=Bc(this.persistenceKey,this.zs),this.Ys=function(e){return`firestore_sequence_number_${e}`}(this.persistenceKey),this.Js=this.Js.insert(this.zs,new Yc),this.eo=new RegExp(`^${Uc}_${i}_([^_]*)$`),this.no=new RegExp(`^${zc}_${i}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Gc}_${i}_(\\d+)$`),this.io=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.so=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const t of e){if(t===this.zs)continue;const e=this.getItem(Bc(this.persistenceKey,t));if(e){const n=Hc.$s(t,e);n&&(this.Js=this.Js.insert(n.clientId,n))}}this.oo();const t=this.storage.getItem(this.io);if(t){const e=this._o(t);e&&this.ao(e)}for(const e of this.Zs)this.Hs(e);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Js)}isActiveQueryTarget(e){let t=!1;return this.Js.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(jc(this.persistenceKey,e));if(t){const r=Wc.$s(e,t);r&&(n=r.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(jc(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.lo(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Io(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return m(Kc,"READ",e,t),t}setItem(e,t){m(Kc,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){m(Kc,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(m(Kc,"EVENT",t.key,t.newValue),t.key===this.Xs)return void g("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.eo.test(t.key)){if(null==t.newValue){const e=this.Eo(t.key);return this.Ro(e,null)}{const e=this.Ao(t.key,t.newValue);if(e)return this.Ro(e.clientId,e)}}else if(this.no.test(t.key)){if(null!==t.newValue){const e=this.Vo(t.key,t.newValue);if(e)return this.mo(e)}}else if(this.ro.test(t.key)){if(null!==t.newValue){const e=this.fo(t.key,t.newValue);if(e)return this.po(e)}}else if(t.key===this.io){if(null!==t.newValue){const e=this._o(t.newValue);if(e)return this.ao(e)}}else if(t.key===this.Ys){const e=function(e){let t=Be.ce;if(null!=e)try{const n=JSON.parse(e);I("number"==typeof n,30636,{yo:e}),t=n}catch(e){g(Kc,"Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==Be.ce&&this.sequenceNumberHandler(e)}else if(t.key===this.so){const e=this.wo(t.newValue);await Promise.all(e.map(e=>this.syncEngine.bo(e)))}}else this.Zs.push(t)})}}get ho(){return this.Js.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const r=new Qc(this.currentUser,e,t,n),s=$c(this.persistenceKey,this.currentUser,e);this.setItem(s,r.Ws())}lo(e){const t=$c(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const r=jc(this.persistenceKey,e),s=new Wc(e,t,n);this.setItem(r,s.Ws())}Io(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Eo(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Eo(e);return Hc.$s(n,t)}Vo(e,t){const n=this.no.exec(e),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return Qc.$s(new c(s),r,t)}fo(e,t){const n=this.ro.exec(e),r=Number(n[1]);return Wc.$s(r,t)}_o(e){return Jc.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.So(e.batchId,e.state,e.error);m(Kc,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Js.insert(e,t):this.Js.remove(e),r=this.uo(this.Js),s=this.uo(n),i=[],o=[];return s.forEach(e=>{r.has(e)||i.push(e)}),r.forEach(e=>{s.has(e)||o.push(e)}),this.syncEngine.Co(i,o).then(()=>{this.Js=n})}ao(e){this.Js.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Cs();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class Zc{constructor(){this.vo=new Yc,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Yc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */class eu{Mo(e){}shutdown(){}}
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
 */const tu="ConnectivityMonitor";class nu{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){m(tu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){m(tu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */let ru=null;function su(){return null===ru?ru=268435456+Math.round(2147483648*Math.random()):ru++,"0x"+ru.toString(16)
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
 */}const iu="RestConnection",ou={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class au{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${n}/databases/${r}`,this.$o=this.databaseId.database===Rn?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Wo(e,t,n,r,i){const o=su(),a=this.Qo(e,t.toUriEncodedString());m(iu,`Sending RPC '${e}' ${o}:`,a,n);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,r,i);const{host:u}=new URL(a),l=(0,s.isCloudWorkstation)(u);return this.zo(e,a,c,n,l).then(t=>(m(iu,`Received RPC '${e}' ${o}: `,t),t),t=>{throw p(iu,`RPC '${e}' ${o} failed with error: `,t,"url: ",a,"request:",n),t})}jo(e,t,n,r,s,i){return this.Wo(e,t,n,r,s)}Go(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+u,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Qo(e,t){const n=ou[e];let r=`${this.qo}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
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
 */class cu{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}
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
 */const uu="WebChannelConnection",lu=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};class hu extends au{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!hu.c_){const e=(0,a.getStatEventTarget)();lu(e,a.Event.STAT_EVENT,e=>{e.stat===a.Stat.PROXY?m(uu,"STAT_EVENT: detected buffering proxy"):e.stat===a.Stat.NOPROXY&&m(uu,"STAT_EVENT: detected no buffering proxy")}),hu.c_=!0}}zo(e,t,n,r,s){const i=su();return new Promise((s,o)=>{const c=new a.XhrIo;c.setWithCredentials(!0),c.listenOnce(a.EventType.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case a.ErrorCode.NO_ERROR:const t=c.getResponseJson();m(uu,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case a.ErrorCode.TIMEOUT:m(uu,`RPC '${e}' ${i} timed out`),o(new E(T.DEADLINE_EXCEEDED,"Request time out"));break;case a.ErrorCode.HTTP_ERROR:const n=c.getStatus();if(m(uu,`RPC '${e}' ${i} failed with status:`,n,"response text:",c.getResponseText()),n>0){let e=c.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(T).indexOf(t)>=0?t:T.UNKNOWN}(t.status);o(new E(e,t.message))}else o(new E(T.UNKNOWN,"Server responded with status "+c.getStatus()))}else o(new E(T.UNAVAILABLE,"Connection failed."));break;default:w(9055,{l_:e,streamId:i,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{m(uu,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(r);m(uu,`RPC '${e}' ${i} sending request:`,r),c.send(t,"POST",u,n,15)})}T_(e,t,n){const r=su(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(o.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const u=s.join("");m(uu,`Creating RPC '${e}' stream ${r}: ${u}`,o);const l=i.createWebChannel(u,o);this.I_(l);let h=!1,d=!1;const f=new cu({Ho:t=>{d?m(uu,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(h||(m(uu,`Opening RPC '${e}' stream ${r} transport.`),l.open(),h=!0),m(uu,`RPC '${e}' stream ${r} sending:`,t),l.send(t))},Jo:()=>l.close()});return lu(l,a.WebChannel.EventType.OPEN,()=>{d||(m(uu,`RPC '${e}' stream ${r} transport opened.`),f.i_())}),lu(l,a.WebChannel.EventType.CLOSE,()=>{d||(d=!0,m(uu,`RPC '${e}' stream ${r} transport closed`),f.o_(),this.E_(l))}),lu(l,a.WebChannel.EventType.ERROR,t=>{d||(d=!0,p(uu,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),f.o_(new E(T.UNAVAILABLE,"The operation could not be completed")))}),lu(l,a.WebChannel.EventType.MESSAGE,t=>{if(!d){const n=t.data[0];I(!!n,16349);const s=n,i=s?.error||s[0]?.error;if(i){m(uu,`RPC '${e}' stream ${r} received error:`,i);const t=i.status;let n=function(e){const t=hi[e];if(void 0!==t)return mi(t)}(t),s=i.message;"NOT_FOUND"===t&&s.includes("database")&&s.includes("does not exist")&&s.includes(this.databaseId.database)&&p(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=T.INTERNAL,s="Unknown error status: "+t+" with message "+i.message),d=!0,f.o_(new E(n,s)),l.close()}else m(uu,`RPC '${e}' stream ${r} received:`,n),f.__(n)}}),hu.u_(),setTimeout(()=>{f.s_()},0),f}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return(0,a.createWebChannelTransport)()}}
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
 */function du(e){return new hu(e)}
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
 */function fu(){return"undefined"!=typeof window?window:null}function mu(){return"undefined"!=typeof document?document:null}
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
 */function gu(e){return new Vi(e,!0)}
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
 */hu.c_=!1;class pu{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=r,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&m("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}
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
 */const yu="PersistentStream";class wu{constructor(e,t,n,r,s,i,o,a){this.Ci=e,this.b_=n,this.S_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new pu(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===T.RESOURCE_EXHAUSTED?(g(t.toString()),g("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===T.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new E(T.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.H_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return m(yu,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(m(yu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class vu extends wu{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let r;if("targetChange"in t){t.targetChange;const s=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:w(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(e,t){return e.useProto3Json?(I(void 0===t||"string"==typeof t,58123),In.fromBase64String(t||"")):(I(void 0===t||t instanceof n.Buffer||t instanceof Uint8Array,16193),In.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(e){const t=void 0===e.code?T.UNKNOWN:mi(e.code);return new E(t,e.message||"")}(a);r=new Ci(s,i,o,c||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=ji(e,n.document.name),i=Ui(n.document.updateTime),o=n.document.createTime?Ui(n.document.createTime):le.min(),a=new hr({mapValue:{fields:n.document.fields}}),c=fr.newFoundDocument(s,i,o,a),u=n.targetIds||[],l=n.removedTargetIds||[];r=new Si(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=ji(e,n.document),i=n.readTime?Ui(n.readTime):le.min(),o=fr.newNoDocument(s,i),a=n.removedTargetIds||[];r=new Si([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=ji(e,n.document),i=n.removedTargetIds||[];r=new Si([],i,s,null)}else{if(!("filter"in t))return w(11601,{Vt:t});{t.filter;const e=t.filter;e.targetId;const{count:n=0,unchangedNames:s}=e,i=new li(n,s),o=e.targetId;r=new xi(o,i)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return le.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?le.min():t.readTime?Ui(t.readTime):le.min()}(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=Wi(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=zr(r)?{documents:to(e,r)}:{query:no(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Li(e,t.resumeToken);const r=Pi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(le.min())>0){n.readTime=Oi(e,t.snapshotVersion.toTimestamp());const r=Pi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return w(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.K_(t)}X_(e){const t={};t.database=Wi(this.serializer),t.removeTarget=e,this.K_(t)}}class Iu extends wu{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return I(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,I(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){I(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(I(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?Ui(e.updateTime):Ui(t);return n.isEqual(le.min())&&(n=Ui(t)),new Gs(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=Ui(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Wi(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Zi(this.serializer,e))};this.K_(t)}}
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
 */class bu{}class _u extends bu{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new E(T.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Wo(e,zi(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new E(T.UNKNOWN,e.toString())})}jo(e,t,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.jo(e,zi(t,n),r,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new E(T.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function Tu(e,t,n,r){return new _u(e,t,n,r)}class Eu{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(g(t),this.aa=!1):m("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null
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
 */)}}const Su="RemoteStore";class xu{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(e=>{n.enqueueAndForget(async()=>{Vu(this)&&(m(Su,"Restarting streams for network reachability change."),await async function(e){const t=_(e);t.Ea.add(4),await Du(t),t.Va.set("Unknown"),t.Ea.delete(4),await Cu(t)}(this))})}),this.Va=new Eu(n,r)}}async function Cu(e){if(Vu(e))for(const t of e.Ra)await t(!0)}async function Du(e){for(const t of e.Ra)await t(!1)}function Nu(e,t){const n=_(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),Mu(n)?Ru(n):el(n).O_()&&ku(n,t))}function Au(e,t){const n=_(e),r=el(n);n.Ia.delete(t),r.O_()&&Fu(n,t),0===n.Ia.size&&(r.O_()?r.L_():Vu(n)&&n.Va.set("Unknown"))}function ku(e,t){if(e.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(le.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}el(e).Z_(t)}function Fu(e,t){e.da.$e(t),el(e).X_(t)}function Ru(e){e.da=new Ni({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),el(e).start(),e.Va.ua()}function Mu(e){return Vu(e)&&!el(e).x_()&&e.Ia.size>0}function Vu(e){return 0===_(e).Ea.size}function Pu(e){e.da=void 0}async function Ou(e){e.Va.set("Online")}async function Lu(e){e.Ia.forEach((t,n)=>{ku(e,t)})}async function qu(e,t){Pu(e),Mu(e)?(e.Va.ha(t),Ru(e)):e.Va.set("Unknown")}async function Uu(e,t,n){if(e.Va.set("Online"),t instanceof Ci&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.da.removeTarget(r))}(e,t)}catch(n){m(Su,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Bu(e,n)}else if(t instanceof Si?e.da.Xe(t):t instanceof xi?e.da.st(t):e.da.tt(t),!n.isEqual(le.min()))try{const t=await Ac(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.da.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ia.get(r);s&&e.Ia.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(In.EMPTY_BYTE_STRING,r.snapshotVersion)),Fu(e,t);const s=new vo(r.target,t,n,r.sequenceNumber);ku(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){m(Su,"Failed to raise snapshot:",t),await Bu(e,t)}}async function Bu(e,t,n){if(!Re(t))throw t;e.Ea.add(1),await Du(e),e.Va.set("Offline"),n||(n=()=>Ac(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{m(Su,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await Cu(e)})}function zu(e,t){return t().catch(n=>Bu(e,n,t))}async function $u(e){const t=_(e),n=tl(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:ze;for(;Gu(t);)try{const e=await Fc(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,ju(t,e)}catch(e){await Bu(t,e)}Ku(t)&&Qu(t)}function Gu(e){return Vu(e)&&e.Ta.length<10}function ju(e,t){e.Ta.push(t);const n=tl(e);n.O_()&&n.Y_&&n.ea(t.mutations)}function Ku(e){return Vu(e)&&!tl(e).x_()&&e.Ta.length>0}function Qu(e){tl(e).start()}async function Wu(e){tl(e).ra()}async function Hu(e){const t=tl(e);for(const n of e.Ta)t.ea(n.mutations)}async function Ju(e,t,n){const r=e.Ta.shift(),s=ai.from(r,t,n);await zu(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await $u(e)}async function Yu(e,t){t&&tl(e).Y_&&await async function(e,t){if(function(e){return fi(e)&&e!==T.ABORTED}(t.code)){const n=e.Ta.shift();tl(e).B_(),await zu(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await $u(e)}}(e,t),Ku(e)&&Qu(e)}async function Xu(e,t){const n=_(e);n.asyncQueue.verifyOperationInProgress(),m(Su,"RemoteStore received new credentials");const r=Vu(n);n.Ea.add(3),await Du(n),r&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await Cu(n)}async function Zu(e,t){const n=_(e);t?(n.Ea.delete(2),await Cu(n)):t||(n.Ea.add(2),await Du(n),n.Va.set("Unknown"))}function el(e){return e.ma||(e.ma=function(e,t,n){const r=_(e);return r.sa(),new vu(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Zo:Ou.bind(null,e),Yo:Lu.bind(null,e),t_:qu.bind(null,e),J_:Uu.bind(null,e)}),e.Ra.push(async t=>{t?(e.ma.B_(),Mu(e)?Ru(e):e.Va.set("Unknown")):(await e.ma.stop(),Pu(e))})),e.ma}function tl(e){return e.fa||(e.fa=function(e,t,n){const r=_(e);return r.sa(),new Iu(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Wu.bind(null,e),t_:Yu.bind(null,e),ta:Hu.bind(null,e),na:Ju.bind(null,e)}),e.Ra.push(async t=>{t?(e.fa.B_(),await $u(e)):(await e.fa.stop(),e.Ta.length>0&&(m(Su,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
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
 */}class nl{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new S,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,o=new nl(e,t,i,r,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new E(T.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function rl(e,t){if(g("AsyncQueue",`${t}: ${e}`),Re(e))return new E(T.UNAVAILABLE,`${t}: ${e}`);throw e}
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
 */class sl{static emptySet(e){return new sl(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||J.comparator(t.key,n.key):(e,t)=>J.comparator(e.key,t.key),this.keyedMap=ws(),this.sortedSet=new hn(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof sl))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new sl;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n
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
 */}}class il{constructor(){this.ga=new hn(J.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):w(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class ol{constructor(e,t,n,r,s,i,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new ol(e,t,sl.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&as(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
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
 */class al{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}}class cl{constructor(){this.queries=ul(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=_(e),r=n.queries;n.queries=ul(),r.forEach((e,n)=>{for(const e of n.ba)e.onError(t)})}(this,new E(T.ABORTED,"Firestore shutting down"))}}function ul(){return new ms(e=>cs(e),as)}async function ll(e,t){const n=_(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.Sa()&&t.Da()&&(r=2):(i=new al,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(e){const n=rl(e,`Initialization of query '${us(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,i),i.ba.push(t),t.va(n.onlineState),i.wa&&t.Fa(i.wa)&&ml(n)}async function hl(e,t){const n=_(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.ba.indexOf(t);e>=0&&(i.ba.splice(e,1),0===i.ba.length?s=t.Da()?0:1:!i.Sa()&&t.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function dl(e,t){const n=_(e);let r=!1;for(const e of t){const t=e.query,s=n.queries.get(t);if(s){for(const t of s.ba)t.Fa(e)&&(r=!0);s.wa=e}}r&&ml(n)}function fl(e,t,n){const r=_(e),s=r.queries.get(t);if(s)for(const e of s.ba)e.onError(n);r.queries.delete(t)}function ml(e){e.Ca.forEach(e=>{e.next()})}var gl,pl;(pl=gl||(gl={})).Ma="default",pl.Cache="cache";class yl{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new ol(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.Ka||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=ol.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==gl.Cache}}
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
 */class wl{constructor(e,t){this.qa=e,this.byteLength=t}Ua(){return"metadata"in this.qa}}
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
 */class vl{constructor(e){this.serializer=e}Ks(e){return ji(this.serializer,e)}qs(e){return e.metadata.exists?Xi(this.serializer,e.document,!1):fr.newNoDocument(this.Ks(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return Ui(e)}}class Il{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=bl(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.qa.namedQuery)this.Wa.push(e.qa.namedQuery);else if(e.qa.documentMetadata){this.Qa.push({metadata:e.qa.documentMetadata}),e.qa.documentMetadata.exists||++t;const n=Q.fromString(e.qa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.qa.document&&(this.Qa[this.Qa.length-1].document=e.qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new vl(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.Ks(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||Ss()).add(e);t.set(n,r)}}return t}async ja(e){const t=await async function(e,t,n,r){const s=_(e);let i=Ss(),o=ps();for(const e of n){const n=t.Ks(e.metadata.name);e.document&&(i=i.add(n));const r=t.qs(e);r.setReadTime(t.Us(e.metadata.readTime)),o=o.insert(n,r)}const a=s.xs.newChangeBuffer({trackRemovals:!0}),c=await Rc(s,function(e){return Zr(Wr(Q.fromString(`__bundle__/docs/${e}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",e=>kc(e,a,o).next(t=>(a.apply(e),t)).next(t=>s.li.removeMatchingKeysForTargetId(e,c.targetId).next(()=>s.li.addMatchingKeys(e,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(e,t.Bs,t.Ls)).next(()=>t.Bs)))}(e,new vl(this.serializer),this.Qa,this.$a.id),n=this.za(this.documents);for(const t of this.Wa)await qc(e,t,n.get(t.name));return this.progress.taskState="Success",{progress:this.progress,Ha:this.collectionGroups,Ja:t}}}function bl(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
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
 */class _l{constructor(e){this.key=e}}class Tl{constructor(e){this.key=e}}class El{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Ss(),this.mutatedKeys=Ss(),this.eu=ds(e),this.tu=new sl(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new il,r=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=ls(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;u&&l?u.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.su(u,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.eu(l,a)>0||c&&this.eu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),f=!0):u&&!l&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(l?(i=i.add(l),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{tu:i,iu:n,Ss:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return w(20277,{Vt:e})}};return n(e)-n(t)}(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Ya.size&&this.current&&!r?1:0,c=a!==this.Xa;return this.Xa=a,0!==i.length||c?{snapshot:new ol(this.query,e.tu,s,i,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new il,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Ss(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Ya=this.Ya.add(e.key))});const t=[];return e.forEach(e=>{this.Ya.has(e)||t.push(new Tl(e))}),this.Ya.forEach(n=>{e.has(n)||t.push(new _l(n))}),t}cu(e){this.Za=e.ks,this.Ya=Ss();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ol.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Xa,this.hasCachedResults)}}const Sl="SyncEngine";class xl{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Cl{constructor(e){this.key=e,this.hu=!1}}class Dl{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new ms(e=>cs(e),as),this.Iu=new Map,this.Eu=new Set,this.Ru=new hn(J.comparator),this.Au=new Map,this.Vu=new tc,this.du={},this.mu=new Map,this.fu=Ca.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function Nl(e,t,n=!0){const r=sh(e);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await kl(r,t,n,!0),s}async function Al(e,t){const n=sh(e);await kl(n,t,!0,!1)}async function kl(e,t,n,r){const s=await Rc(e.localStore,Zr(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await Fl(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&Nu(e.remoteStore,s),a}async function Fl(e,t,n,r,s){e.pu=(t,n,r)=>async function(e,t,n,r){let s=t.view.ru(n);s.Ss&&(s=await Vc(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const i=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return Gl(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const i=await Vc(e.localStore,t,!0),o=new El(t,i.ks),a=o.ru(i.documents),c=Ei.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),u=o.applyChanges(a,e.isPrimaryClient,c);Gl(e,n,u.au);const l=new xl(t,n,o);return e.Tu.set(t,l),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),u.snapshot}async function Rl(e,t,n){const r=_(e),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(e=>!as(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Mc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Au(r.remoteStore,s.targetId),zl(r,s.targetId)}).catch(Se)):(zl(r,s.targetId),await Mc(r.localStore,s.targetId,!0))}async function Ml(e,t){const n=_(e),r=n.Tu.get(t),s=n.Iu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Au(n.remoteStore,r.targetId))}async function Vl(e,t){const n=_(e);try{const e=await function(e,t){const n=_(e),r=t.snapshotVersion;let s=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.xs.newChangeBuffer({trackRemovals:!0});s=n.vs;const o=[];t.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.li.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.li.addMatchingKeys(e,i.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(In.EMPTY_BYTE_STRING,le.min()).withLastLimboFreeSnapshotVersion(le.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=xc||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,u,i)&&o.push(n.li.updateTargetData(e,u))});let a=ps(),c=Ss();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(kc(e,i,t.documentUpdates).next(e=>{a=e.Bs,c=e.Ls})),!r.isEqual(le.min())){const t=n.li.getLastRemoteSnapshotVersion(e).next(t=>n.li.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return xe.waitFor(o).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.vs=s,e))}(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(I(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?I(r.hu,14607):e.removedDocuments.size>0&&(I(r.hu,42227),r.hu=!1))}),await Ql(n,e,t)}catch(e){await Se(e)}}function Pl(e,t,n){const r=_(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const s=r.view.va(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=_(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const e of n.ba)e.va(t)&&(r=!0)}),r&&ml(n)}(r.eventManager,t),e.length&&r.Pu.J_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Ol(e,t,n){const r=_(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Au.get(t),i=s&&s.key;if(i){let e=new hn(J.comparator);e=e.insert(i,fr.newNoDocument(i,le.min()));const n=Ss().add(i),s=new Ti(le.min(),new Map,new hn(O),e,n);await Vl(r,s),r.Ru=r.Ru.remove(i),r.Au.delete(t),Kl(r)}else await Mc(r.localStore,t,!1).then(()=>zl(r,t,n)).catch(Se)}async function Ll(e,t){const n=_(e),r=t.batch.batchId;try{const e=await function(e,t){const n=_(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.xs.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let o=xe.resolve();return i.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);I(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Ss();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);Bl(n,r,null),Ul(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ql(n,e)}catch(e){await Se(e)}}async function ql(e,t,n){const r=_(e);try{const e=await function(e,t){const n=_(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(I(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);Bl(r,t,n),Ul(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Ql(r,e)}catch(n){await Se(n)}}function Ul(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function Bl(e,t,n){const r=_(e);let s=r.du[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}function zl(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Vu.Gr(t).forEach(t=>{e.Vu.containsKey(t)||$l(e,t)})}function $l(e,t){e.Eu.delete(t.path.canonicalString());const n=e.Ru.get(t);null!==n&&(Au(e.remoteStore,n),e.Ru=e.Ru.remove(t),e.Au.delete(n),Kl(e))}function Gl(e,t,n){for(const r of n)r instanceof _l?(e.Vu.addReference(r.key,t),jl(e,r)):r instanceof Tl?(m(Sl,"Document no longer in limbo: "+r.key),e.Vu.removeReference(r.key,t),e.Vu.containsKey(r.key)||$l(e,r.key)):w(19791,{wu:r})}function jl(e,t){const n=t.key,r=n.path.canonicalString();e.Ru.get(n)||e.Eu.has(r)||(m(Sl,"New document in limbo: "+n),e.Eu.add(r),Kl(e))}function Kl(e){for(;e.Eu.size>0&&e.Ru.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new J(Q.fromString(t)),r=e.fu.next();e.Au.set(r,new Cl(n)),e.Ru=e.Ru.insert(n,r),Nu(e.remoteStore,new vo(Zr(Wr(n.path)),r,"TargetPurposeLimboResolution",Be.ce))}}async function Ql(e,t,n){const r=_(e),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){s.push(e);const t=_c.Es(a.targetId,e);i.push(t)}}))}),await Promise.all(o),r.Pu.J_(s),await async function(e,t){const n=_(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>xe.forEach(t,t=>xe.forEach(t.Ts,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>xe.forEach(t.Is,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Re(e))throw e;m(Sc,"Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.vs.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.vs=n.vs.insert(t,s)}}}(r.localStore,i))}async function Wl(e,t){const n=_(e);if(!n.currentUser.isEqual(t)){m(Sl,"User change. New user:",t.toKey());const e=await Nc(n.localStore,t);n.currentUser=t,function(e){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new E(T.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.mu.clear()}(n),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Ql(n,e.Ns)}}function Hl(e,t){const n=_(e),r=n.Au.get(t);if(r&&r.hu)return Ss().add(r.key);{let e=Ss();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}async function Jl(e,t){const n=_(e),r=await Vc(n.localStore,t.query,!0),s=t.view.cu(r);return n.isPrimaryClient&&Gl(n,t.targetId,s.au),s}async function Yl(e,t){const n=_(e);return Oc(n.localStore,t).then(e=>Ql(n,e))}async function Xl(e,t,n,r){const s=_(e),i=await function(e,t){const n=_(e),r=_(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.Xn(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):xe.resolve(null)))}(s.localStore,t);null!==i?("pending"===n?await $u(s.remoteStore):"acknowledged"===n||"rejected"===n?(Bl(s,t,r||null),Ul(s,t),function(e,t){_(_(e).mutationQueue).nr(t)}(s.localStore,t)):w(6720,"Unknown batchState",{bu:n}),await Ql(s,i)):m(Sl,"Cannot apply mutation batch with id: "+t)}async function Zl(e,t,n){const r=_(e),s=[],i=[];for(const e of t){let t;const n=r.Iu.get(e);if(n&&0!==n.length){t=await Rc(r.localStore,Zr(n[0]));for(const e of n){const t=r.Tu.get(e),n=await Jl(r,t);n.snapshot&&i.push(n.snapshot)}}else{const n=await Pc(r.localStore,e);t=await Rc(r.localStore,n),await Fl(r,eh(n),e,!1,t.resumeToken)}s.push(t)}return r.Pu.J_(i),s}function eh(e){return Qr(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function th(e){return function(e){return _(_(e).persistence).hs()}(_(e).localStore)}async function nh(e,t,n,r){const s=_(e);if(s.gu)return void m(Sl,"Ignoring unexpected query state notification.");const i=s.Iu.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{const e=await Oc(s.localStore,hs(i[0])),r=Ti.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,In.EMPTY_BYTE_STRING);await Ql(s,e,r);break}case"rejected":await Mc(s.localStore,t,!0),zl(s,t,r);break;default:w(64155,n)}}async function rh(e,t,n){const r=sh(e);if(r.gu){for(const e of t){if(r.Iu.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){m(Sl,"Adding an already active target "+e);continue}const t=await Pc(r.localStore,e),n=await Rc(r.localStore,t);await Fl(r,eh(t),n.targetId,!1,n.resumeToken),Nu(r.remoteStore,n)}for(const e of n)r.Iu.has(e)&&await Mc(r.localStore,e,!1).then(()=>{Au(r.remoteStore,e),zl(r,e)}).catch(Se)}}function sh(e){const t=_(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Vl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Hl.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ol.bind(null,t),t.Pu.J_=dl.bind(null,t.eventManager),t.Pu.yu=fl.bind(null,t.eventManager),t}function ih(e){const t=_(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ll.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=ql.bind(null,t),t}class oh{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=gu(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Dc(this.persistence,new Ec,e.initialUser,this.serializer)}Cu(e){return new ac(uc.Vi,this.serializer)}Du(e){return new Zc}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}oh.provider={build:()=>new oh};class ah extends oh{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){I(this.persistence.referenceDelegate instanceof lc,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Pa(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?va.withCacheSize(this.cacheSizeBytes):va.DEFAULT;return new ac(e=>lc.Vi(e,t),this.serializer)}}class ch extends oh{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await ih(this.xu.syncEngine),await $u(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Dc(this.persistence,new Ec,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Pa(n,e.asyncQueue,t)}Mu(e,t){const n=new Ue(t,this.persistence);return new qe(e.asyncQueue,n)}Cu(e){const t=bc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?va.withCacheSize(this.cacheSizeBytes):va.DEFAULT;return new wc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,fu(),mu(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Zc}}class uh extends ch{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Xc&&(this.sharedClientState.syncEngine={So:Xl.bind(null,t),Do:nh.bind(null,t),Co:rh.bind(null,t),hs:th.bind(null,t),bo:Yl.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async e=>{await async function(e,t){const n=_(e);if(sh(n),ih(n),!0===t&&!0!==n.gu){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await Zl(n,e.toArray());n.gu=!0,await Zu(n.remoteStore,!0);for(const e of t)Nu(n.remoteStore,e)}else if(!1===t&&!1!==n.gu){const e=[];let t=Promise.resolve();n.Iu.forEach((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?e.push(s):t=t.then(()=>(zl(n,s),Mc(n.localStore,s,!0))),Au(n.remoteStore,s)}),await t,await Zl(n,e),function(e){const t=_(e);t.Au.forEach((e,n)=>{Au(t.remoteStore,n)}),t.Vu.zr(),t.Au=new Map,t.Ru=new hn(J.comparator)}(n),n.gu=!1,await Zu(n.remoteStore,!1)}}(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){const t=fu();if(!Xc.v(t))throw new E(T.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=bc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Xc(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class lh{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Pl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Wl.bind(null,this.syncEngine),await Zu(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new cl}createDatastore(e){const t=gu(e.databaseInfo.databaseId),n=du(e.databaseInfo);return Tu(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,s){return new xu(e,t,n,r,s)}(this.localStore,this.datastore,e.asyncQueue,e=>Pl(this.syncEngine,e,0),nu.v()?new nu:new eu)}createSyncEngine(e,t){return function(e,t,n,r,s,i,o){const a=new Dl(e,t,n,r,s,i);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=_(e);m(Su,"RemoteStore shutting down."),t.Ea.add(5),await Du(t),t.Aa.shutdown(),t.Va.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function hh(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}
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
 */lh.provider={build:()=>new lh};class dh{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):g("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
 */class fh{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new S,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.Ua()?this.metadata.resolve(e.qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.qa)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async Su(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.Ku();if(null===e)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.qu(`length string (${t}) is not valid number`);const r=await this.Uu(n);return new wl(JSON.parse(r),e.length+n)}$u(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async Ku(){for(;this.$u()<0&&!await this.Wu(););if(0===this.buffer.length)return null;const e=this.$u();e<0&&this.qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.qu("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}qu(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
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
 */class mh{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.Su();if(!n||!n.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(n?.qa)}`);this.metadata=n;do{n=this.Su(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}Qu(){return this.elements}Su(){if(this.cursor===this.bundleData.length)return null;const e=this.Ku(),t=this.Uu(e);return new wl(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new E(T.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}Ku(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
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
 */class gh{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new E(T.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const n=_(e),r={documents:t.map(e=>Gi(n.serializer,e))},s=await n.jo("BatchGetDocuments",n.serializer.databaseId,Q.emptyPath(),r,t.length),i=new Map;s.forEach(e=>{const t=function(e,t){return"found"in t?function(e,t){I(!!t.found,43571),t.found.name,t.found.updateTime;const n=ji(e,t.found.name),r=Ui(t.found.updateTime),s=t.found.createTime?Ui(t.found.createTime):le.min(),i=new hr({mapValue:{fields:t.found.fields}});return fr.newFoundDocument(n,r,s,i)}(e,t):"missing"in t?function(e,t){I(!!t.missing,3894),I(!!t.readTime,22933);const n=ji(e,t.missing),r=Ui(t.readTime);return fr.newNoDocument(n,r)}(e,t):w(7234,{result:t})}(n.serializer,e);i.set(t.key.toString(),t)});const o=[];return t.forEach(e=>{const t=i.get(e.toString());I(!!t,55234,{key:e}),o.push(t)}),o}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new si(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=J.fromPath(t);this.mutations.push(new ii(n,this.precondition(n)))}),await async function(e,t){const n=_(e),r={writes:t.map(e=>Zi(n.serializer,e))};await n.Wo("Commit",n.serializer.databaseId,Q.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw w(50498,{Gu:e.constructor.name});t=le.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new E(T.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(le.min())?js.exists(!1):js.updateTime(t):js.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(le.min()))throw new E(T.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return js.updateTime(t)}return js.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
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
 */class ph{constructor(e,t,n,r,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=s,this.zu=n.maxAttempts,this.M_=new pu(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Hu()}Hu(){this.M_.p_(async()=>{const e=new gh(this.datastore),t=this.Ju(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Zu(e)}))}).catch(e=>{this.Zu(e)})})}Ju(e){try{const t=this.updateFunction(e);return!$e(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Hu(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!fi(t)}return!1}}
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
 */const yh="FirestoreClient";class wh{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=c.UNAUTHENTICATED,this.clientId=P.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{m(yh,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(m(yh,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new S;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=rl(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function vh(e,t){e.asyncQueue.verifyOperationInProgress(),m(yh,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Nc(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Ih(e,t){e.asyncQueue.verifyOperationInProgress();const n=await bh(e);m(yh,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Xu(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Xu(t.remoteStore,n)),e._onlineComponents=t}async function bh(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){m(yh,"Using user provided OfflineComponentProvider");try{await vh(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===T.FAILED_PRECONDITION||e.code===T.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;p("Error using user provided cache. Falling back to memory cache: "+n),await vh(e,new oh)}}else m(yh,"Using default OfflineComponentProvider"),await vh(e,new ah(void 0));return e._offlineComponents}async function _h(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(m(yh,"Using user provided OnlineComponentProvider"),await Ih(e,e._uninitializedComponentsProvider._online)):(m(yh,"Using default OnlineComponentProvider"),await Ih(e,new lh))),e._onlineComponents}function Th(e){return bh(e).then(e=>e.persistence)}function Eh(e){return bh(e).then(e=>e.localStore)}function Sh(e){return _h(e).then(e=>e.remoteStore)}function xh(e){return _h(e).then(e=>e.syncEngine)}function Ch(e){return _h(e).then(e=>e.datastore)}async function Dh(e){const t=await _h(e),n=t.eventManager;return n.onListen=Nl.bind(null,t.syncEngine),n.onUnlisten=Rl.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Al.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=Ml.bind(null,t.syncEngine),n}function Nh(e,t,n,r){const s=new dh(r),i=new yl(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>ll(await Dh(e),i)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>hl(await Dh(e),i))}}function Ah(e,t){const n=new S;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=_(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new E(T.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=rl(e,`Failed to get document '${t} from cache`);n.reject(r)}}(await Eh(e),t,n)),n.promise}function kh(e,t,n={}){const r=new S;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new dh({next:a=>{i.Nu(),t.enqueueAndForget(()=>hl(e,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new E(T.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?s.reject(new E(T.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new yl(Wr(n.path),i,{includeMetadataChanges:!0,Ka:!0});return ll(e,o)}(await Dh(e),e.asyncQueue,t,n,r)),r.promise}function Fh(e,t){const n=new S;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await Vc(e,t,!0),s=new El(t,r.ks),i=s.ru(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(e){const r=rl(e,`Failed to execute query '${t} against cache`);n.reject(r)}}(await Eh(e),t,n)),n.promise}function Rh(e,t,n={}){const r=new S;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new dh({next:n=>{i.Nu(),t.enqueueAndForget(()=>hl(e,o)),n.fromCache&&"server"===r.source?s.reject(new E(T.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),o=new yl(n,i,{includeMetadataChanges:!0,Ka:!0});return ll(e,o)}(await Dh(e),e.asyncQueue,t,n,r)),r.promise}function Mh(e,t,n){const r=new S;return e.asyncQueue.enqueueAndForget(async()=>{try{const s=await Ch(e);r.resolve(async function(e,t,n){const r=_(e),{request:s,gt:i,parent:o}=ro(r.serializer,es(t),n);r.connection.Ko||delete s.parent;const a=(await r.jo("RunAggregationQuery",r.serializer.databaseId,o,s,1)).filter(e=>!!e.result);I(1===a.length,64727);const c=a[0].result?.aggregateFields;return Object.keys(c).reduce((e,t)=>(e[i[t]]=c[t],e),{})}(s,t,n))}catch(e){r.reject(e)}}),r.promise}function Vh(e,t){const n=new S;return e.asyncQueue.enqueueAndForget(async()=>{try{const r=await Ch(e);n.resolve(async function(e,t){const n=_(e),r={database:Wi(n.serializer),structuredPipeline:t._toProto(n.serializer)},s=await n.jo("ExecutePipeline",n.serializer.databaseId,Q.emptyPath(),r),i=[];return s.forEach(e=>{if(e.results&&0!==e.results.length)return e.results.forEach(t=>i.push(Yi(n.serializer,e,t)));i.push(Yi(n.serializer,e))}),i}(r,t))}catch(e){n.reject(e)}}),n.promise}function Ph(e,t){const n=new S;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){const r=ih(e);try{const e=await function(e,t){const n=_(e),r=ue.now(),s=t.reduce((e,t)=>e.add(t.key),Ss());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=ps(),c=Ss();return n.xs.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=Ys(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new ei(e.key,t,dr(t.value.mapValue),js.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:vs(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.du[e.currentUser.toKey()];r||(r=new hn(O)),r=r.insert(t,n),e.du[e.currentUser.toKey()]=r}(r,e.batchId,n),await Ql(r,e.changes),await $u(r.remoteStore)}catch(e){const t=rl(e,"Failed to persist write");n.reject(t)}}(await xh(e),t,n)),n.promise}function Oh(e,t){const n=new dh(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){_(e).Ca.add(t),t.next()}(await Dh(e),n)),()=>{n.Nu(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){_(e).Ca.delete(t)}(await Dh(e),n))}}function Lh(e,t,n){const r=new S;return e.asyncQueue.enqueueAndForget(async()=>{const s=await Ch(e);new ph(e.asyncQueue,s,n,t,r).ju()}),r.promise}function qh(e,t){return function(e,t){return new mh(e,t)}(e,t)}function Uh(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const n=_(e),r=n.indexManager,s=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>
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
function(e,t,n,r,s){e=[...e],t=[...t],e.sort(n),t.sort(n);const i=e.length,o=t.length;let a=0,c=0;for(;a<o&&c<i;){const i=n(e[c],t[a]);i<0?s(e[c++]):i>0?r(t[a++]):(a++,c++)}for(;a<o;)r(t[a++]);for(;c<i;)s(e[c++])}(n,t,ge,t=>{s.push(r.addFieldIndex(e,t))},t=>{s.push(r.deleteFieldIndex(e,t))})).next(()=>xe.waitFor(s)))}(await Eh(e),t))}function Bh(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){_(e).Cs.As=t}(await Eh(e),t))}function zh(e){return e.asyncQueue.enqueue(async()=>function(e){const t=_(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))}(await Eh(e)))}
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
 */function $h(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
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
 */}const Gh="ComponentProvider",jh=new Map;function Kh(e,t,n,r,s){return new Fn(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,$h(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}
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
 */const Qh="firestore.googleapis.com",Wh=!0;class Hh{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new E(T.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Qh,this.ssl=Wh}else this.host=e.host,this.ssl=e.ssl??Wh;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=wa;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<Ra)throw new E(T.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}X("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$h(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new E(T.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new E(T.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new E(T.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Jh{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new E(T.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new E(T.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hh(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new C;switch(e.type){case"firstParty":return new k(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new E(T.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=jh.get(e);t&&(m(Gh,"Removing Datastore"),jh.delete(e),t.terminate())}(this),Promise.resolve()}}function Yh(e,t,n,r={}){e=re(e,Jh);const i=(0,s.isCloudWorkstation)(t),o=e._getSettings(),a={...o,emulatorOptions:e._getEmulatorOptions()},u=`${t}:${n}`;i&&((0,s.pingServer)(`https://${u}`),(0,s.updateEmulatorBanner)("Firestore",!0)),o.host!==Qh&&o.host!==u&&p("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...o,host:u,ssl:i,emulatorOptions:r};if(!(0,s.deepEqual)(l,a)&&(e._setSettings(l),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=c.MOCK_USER;else{t=(0,s.createMockUserToken)(r.mockUserToken,e._app?.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new E(T.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new c(i)}e._authCredentials=new D(new x(t,n))}}
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
 */class Xh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Xh(this.firestore,e,this._query)}}class Zh{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ed(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Zh(this.firestore,e,this._key)}toJSON(){return{type:Zh._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(oe(t,Zh._jsonSchema))return new Zh(e,n||null,new J(Q.fromString(t.referencePath)))}}Zh._jsonSchemaVersion="firestore/documentReference/1.0",Zh._jsonSchema={type:ie("string",Zh._jsonSchemaVersion),referencePath:ie("string")};class ed extends Xh{constructor(e,t,n){super(e,t,Wr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Zh(this.firestore,null,new J(e))}withConverter(e){return new ed(this.firestore,e,this._path)}}function td(e){return e instanceof ed}function nd(e,t,...n){if(e=(0,s.getModularInstance)(e),Y("collection","path",t),e instanceof Jh){const r=Q.fromString(t,...n);return ee(r),new ed(e,null,r)}{if(!(e instanceof Zh||e instanceof ed))throw new E(T.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Q.fromString(t,...n));return ee(r),new ed(e.firestore,null,r)}}function rd(e,t){if(e=re(e,Jh),Y("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new E(T.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Xh(e,null,function(e){return new Kr(Q.emptyPath(),e)}(t))}function sd(e,t,...n){if(e=(0,s.getModularInstance)(e),1===arguments.length&&(t=P.newId()),Y("doc","path",t),e instanceof Jh){const r=Q.fromString(t,...n);return Z(r),new Zh(e,null,new J(r))}{if(!(e instanceof Zh||e instanceof ed))throw new E(T.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Q.fromString(t,...n));return Z(r),new Zh(e.firestore,e instanceof ed?e.converter:null,new J(r))}}function id(e,t){return e=(0,s.getModularInstance)(e),t=(0,s.getModularInstance)(t),(e instanceof Zh||e instanceof ed)&&(t instanceof Zh||t instanceof ed)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function od(e,t){return e=(0,s.getModularInstance)(e),t=(0,s.getModularInstance)(t),e instanceof Xh&&t instanceof Xh&&e.firestore===t.firestore&&as(e._query,t._query)&&e.converter===t.converter
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
 */}const ad="AsyncQueue";class cd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new pu(this,"async_queue_retry"),this._c=()=>{const e=mu();e&&m(ad,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=mu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=mu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new S;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(0!==this.Yu.length){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Re(e))throw e;m(ad,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,g("INTERNAL UNHANDLED ERROR: ",ud(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=nl.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&w(47125,{Pc:ud(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ud(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
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
 */}class ld{constructor(){this._progressObserver={},this._taskCompletionResolver=new S,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)
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
 */}}const hd=-1;class dd extends Jh{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new cd,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new cd(e),this._firestoreClient=void 0,await e}}}function fd(e,t,n){n||(n=Rn);const i=(0,r._getProvider)(e,"firestore");if(i.isInitialized(n)){const e=i.getImmediate({identifier:n}),r=i.getOptions(n);if((0,s.deepEqual)(r,t))return e;throw new E(T.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new E(T.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<Ra)throw new E(T.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&(0,s.isCloudWorkstation)(t.host)&&(0,s.pingServer)(t.host),i.initialize({options:t,instanceIdentifier:n})}function md(e,t){const n="object"==typeof e?e:(0,r.getApp)(),i="string"==typeof e?e:t||Rn,o=(0,r._getProvider)(n,"firestore").getImmediate({identifier:i});if(!o._initialized){const e=(0,s.getDefaultEmulatorHostnameAndPort)("firestore");e&&Yh(o,...e)}return o}function gd(e){if(e._terminated)throw new E(T.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||pd(e),e._firestoreClient}function pd(e){const t=e._freezeSettings(),n=Kh(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new wh(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function yd(e,t){p("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return vd(e,lh.provider,{build:e=>new ch(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function wd(e){p("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();vd(e,lh.provider,{build:e=>new uh(e,t.cacheSizeBytes)})}function vd(e,t,n){if((e=re(e,dd))._firestoreClient||e._terminated)throw new E(T.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new E(T.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},pd(e)}function Id(e){if(e._initialized&&!e._terminated)throw new E(T.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new S;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!Ne.v())return Promise.resolve();const t=e+yc;await Ne.delete(t)}(bc(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function bd(e){return function(e){const t=new S;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t){const n=_(e);Vu(n.remoteStore)||m(Sl,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=_(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(n.localStore);if(e===ze)return void t.resolve();const r=n.mu.get(e)||[];r.push(t),n.mu.set(e,r)}catch(e){const n=rl(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}(await xh(e),t)),t.promise}(gd(e=re(e,dd)))}function _d(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await Th(e),n=await Sh(e);return t.setNetworkEnabled(!0),function(e){const t=_(e);return t.Ea.delete(0),Cu(t)}(n)})}(gd(e=re(e,dd)))}function Td(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await Th(e),n=await Sh(e);return t.setNetworkEnabled(!1),async function(e){const t=_(e);t.Ea.add(0),await Du(t),t.Va.set("Offline")}(n)})}(gd(e=re(e,dd)))}function Ed(e){return(0,r._removeServiceInstance)(e.app,"firestore",e._databaseId.database),e._delete()}function Sd(e,t){const n=gd(e=re(e,dd)),r=new ld;return function(e,t,n,r){const s=function(e,t){let n;return n="string"==typeof e?yi().encode(e):e,function(e,t){return new fh(e,t)}(function(e,t){if(e instanceof Uint8Array)return hh(e,t);if(e instanceof ArrayBuffer)return hh(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),t)}(n,gu(t));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){const r=_(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await function(e,t){const n=_(e),r=Ui(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.Pi.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,r))return await t.close(),n._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(r)),Promise.resolve(new Set);n._updateProgress(bl(r));const s=new Il(r,t.serializer);let i=await t.Su();for(;i;){const e=await s.Ga(i);e&&n._updateProgress(e),i=await t.Su()}const o=await s.ja(e.localStore);return await Ql(e,o.Ja,void 0),await function(e,t){const n=_(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.Pi.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(o.progress),Promise.resolve(o.Ha)}catch(e){return p(Sl,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}})(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}(await xh(e),s,r)})}(n,e._databaseId,t,r),r}function xd(e,t){return function(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=_(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.Pi.getNamedQuery(e,t))}(await Eh(e),t))}(gd(e=re(e,dd)),t).then(t=>t?new Xh(e,null,t.query):null)}
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
 */class Cd{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Cd(In.fromBase64String(e))}catch(e){throw new E(T.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Cd(In.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Cd._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(oe(e,Cd._jsonSchema))return Cd.fromBase64String(e.bytes)}}Cd._jsonSchemaVersion="firestore/bytes/1.0",Cd._jsonSchema={type:ie("string",Cd._jsonSchemaVersion),bytes:ie("string")};
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
class Dd{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new E(T.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new H(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Nd(){return new Dd(j)}
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
 */class Ad{constructor(e){this._methodName=e}}
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
 */class kd{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new E(T.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new E(T.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return O(this._lat,e._lat)||O(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:kd._jsonSchemaVersion}}static fromJSON(e){if(oe(e,kd._jsonSchema))return new kd(e.latitude,e.longitude)}}kd._jsonSchemaVersion="firestore/geoPoint/1.0",kd._jsonSchema={type:ie("string",kd._jsonSchemaVersion),latitude:ie("number"),longitude:ie("number")};
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
class Fd{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Fd._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(oe(e,Fd._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Fd(e.vectorValues);throw new E(T.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Fd._jsonSchemaVersion="firestore/vectorValue/1.0",Fd._jsonSchema={type:ie("string",Fd._jsonSchemaVersion),vectorValues:ie("object")};
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
const Rd=/^__.*__$/;class Md{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new ei(e,this.data,this.fieldMask,t,this.fieldTransforms):new Zs(e,this.data,t,this.fieldTransforms)}}class Vd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new ei(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Pd(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw w(40011,{dataSource:e})}}class Od{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Od({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return rf(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(Pd(this.dataSource)&&Rd.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Ld{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||gu(e)}createContext(e,t,n,r=!1){return new Od({dataSource:e,methodName:t,targetDoc:n,path:H.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qd(e){const t=e._freezeSettings(),n=gu(e._databaseId);return new Ld(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Ud(e,t,n,r,s,i={}){const o=e.createContext(i.merge||i.mergeFields?2:0,t,n,s);Zd("Data must be an object, but it was:",o,r);const a=Yd(r,o);let c,u;if(i.merge)c=new yn(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=ef(t,r,n);if(!o.contains(s))throw new E(T.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);sf(e,s)||e.push(s)}c=new yn(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new Md(new hr(a),c,u)}class Bd extends Ad{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Bd}}function zd(e,t,n){return new Od({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class $d extends Ad{_toFieldTransform(e){return new $s(e.path,new Vs)}isEqual(e){return e instanceof $d}}class Gd extends Ad{constructor(e,t){super(e),this.Ac=t}_toFieldTransform(e){const t=zd(this,e,!0),n=this.Ac.map(e=>Jd(e,t)),r=new Ps(n);return new $s(e.path,r)}isEqual(e){return e instanceof Gd&&(0,s.deepEqual)(this.Ac,e.Ac)}}class jd extends Ad{constructor(e,t){super(e),this.Ac=t}_toFieldTransform(e){const t=zd(this,e,!0),n=this.Ac.map(e=>Jd(e,t)),r=new Ls(n);return new $s(e.path,r)}isEqual(e){return e instanceof jd&&(0,s.deepEqual)(this.Ac,e.Ac)}}class Kd extends Ad{constructor(e,t){super(e),this.Vc=t}_toFieldTransform(e){const t=new Us(e.serializer,As(e.serializer,this.Vc));return new $s(e.path,t)}isEqual(e){return e instanceof Kd&&this.Vc===e.Vc}}function Qd(e,t,n,r){const i=e.createContext(1,t,n);Zd("Data must be an object, but it was:",i,r);const o=[],a=hr.empty();cn(r,(e,r)=>{const c=nf(t,e,n);r=(0,s.getModularInstance)(r);const u=i.childContextForFieldPath(c);if(r instanceof Bd)o.push(c);else{const e=Jd(r,u);null!=e&&(o.push(c),a.set(c,e))}});const c=new yn(o);return new Vd(a,c,i.fieldTransforms)}function Wd(e,t,n,r,i,o){const a=e.createContext(1,t,n),c=[ef(t,r,n)],u=[i];if(o.length%2!=0)throw new E(T.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<o.length;e+=2)c.push(ef(t,o[e])),u.push(o[e+1]);const l=[],h=hr.empty();for(let e=c.length-1;e>=0;--e)if(!sf(l,c[e])){const t=c[e];let n=u[e];n=(0,s.getModularInstance)(n);const r=a.childContextForFieldPath(t);if(n instanceof Bd)l.push(t);else{const e=Jd(n,r);null!=e&&(l.push(t),h.set(t,e))}}const d=new yn(l);return new Vd(h,d,a.fieldTransforms)}function Hd(e,t,n,r=!1){return Jd(n,e.createContext(r?4:3,t))}function Jd(e,t){if(Xd(e=(0,s.getModularInstance)(e)))return Zd("Unsupported field value:",t,e),Yd(e,t);if(e instanceof Ad)return function(e,t){if(!Pd(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=Jd(s,t.childContextForArray(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,s.getModularInstance)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return As(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ue.fromDate(e);return{timestampValue:Oi(t.serializer,n)}}if(e instanceof ue){const n=new ue(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Oi(t.serializer,n)}}if(e instanceof kd)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Cd)return{bytesValue:Li(t.serializer,e._byteString)};if(e instanceof Zh){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Bi(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Fd)return function(e,t){const n=e instanceof Fd?e.toArray():e,r={fields:{[Pn]:{stringValue:qn},[Un]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return Ds(t.serializer,e)})}}}};return{mapValue:r}}(e,t);if(go(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${ne(e)}`)}(e,t)}function Yd(e,t){const n={};return ln(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):cn(e,(e,r)=>{const s=Jd(r,t.childContextForField(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function Xd(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ue||e instanceof kd||e instanceof Cd||e instanceof Zh||e instanceof Ad||e instanceof Fd||go(e))}function Zd(e,t,n){if(!Xd(n)||!te(n)){const r=ne(n);throw"an object"===r?t.createError(e+" a custom object"):t.createError(e+" "+r)}}function ef(e,t,n){if((t=(0,s.getModularInstance)(t))instanceof Dd)return t._internalPath;if("string"==typeof t)return nf(e,t);throw rf("Field path arguments must be of type string or ",e,!1,void 0,n)}const tf=new RegExp("[~\\*/\\[\\]]");function nf(e,t,n){if(t.search(tf)>=0)throw rf(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Dd(...t.split("."))._internalPath}catch(r){throw rf(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function rf(e,t,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new E(T.INVALID_ARGUMENT,a+e+c)}function sf(e,t){return e.some(e=>e.isEqual(t))}function of(e){return"function"==typeof e._readUserData}
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
 */class af{convertValue(e,t="none"){switch(zn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Tn(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(En(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw w(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return cn(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[Un].arrayValue?.values?.map(e=>Tn(e.doubleValue));return new Fd(t)}convertGeoPoint(e){return new kd(Tn(e.latitude),Tn(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=An(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(kn(e));default:return null}}convertTimestamp(e){const t=_n(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Q.fromString(e);I(mo(n),9688,{name:e});const r=new Mn(n.get(1),n.get(3)),s=new J(n.popFirst(5));return r.isEqual(t)||g(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s
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
 */}}class cf extends af{constructor(e){super(),this.firestore=e}convertBytes(e){return new Cd(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Zh(this.firestore,null,t)}}
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
 */function uf(){return new Bd("deleteField")}function lf(){return new $d("serverTimestamp")}function hf(...e){return new Gd("arrayUnion",e)}function df(...e){return new jd("arrayRemove",e)}function ff(e){return new Kd("increment",e)}function mf(e){return new Fd(e)}
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
 */class gf{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=hr.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const s=this.optionDefinitions[r];if(r in e){const i=e[r];let o;s.nestedOptions&&te(i)?o={mapValue:{fields:new gf(s.nestedOptions).getOptionsProto(t,i)}}:i&&(o=Jd(i,t)??void 0),o&&n.set(H.fromServerFormat(s.serverName),o)}}return n}getOptionsProto(e,t,n){const r=this._getKnownOptions(t,e);if(n){const t=new Map(un(n,(t,n)=>[H.fromServerFormat(n),void 0!==t?Jd(t,e):null]));r.setAll(t)}return r.value.mapValue.fields??{}}}
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
 */class pf{constructor(e={},t={}){this.dc=e,this.mc=t,this.fc=new gf({indexMode:{serverName:"index_mode"}})}_readUserData(e){this.proto=this.fc.getOptionsProto(e,this.dc,this.mc)}}class yf{constructor(e,t){this.pipeline=e,this.options=t}_toProto(e){return{pipeline:this.pipeline._toProto(e),options:this.options.proto}}}
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
 */function wf(e){const t=gd(re(e.firestore,dd)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:no(n,Zr(e._query)).ft}function vf(e,t){const n=un(t,(e,t)=>new ui(t,e.aggregateType,e._internalFieldPath)),r=gd(re(e.firestore,dd)),s=r._onlineComponents?.datastore.serializer;return void 0===s?null:ro(s,es(e._query),n,!0).request}function If(e){const t=function(e){if(e._terminated)throw new E(T.FAILED_PRECONDITION,"The client has already been terminated.");if(!jh.has(e)){m(Gh,"Initializing Datastore");const t=du(Kh(e._databaseId,e.app.options.appId||"",e._persistenceKey,e.app.options.apiKey,e._freezeSettings())),n=gu(e._databaseId),r=Tu(e._authCredentials,e._appCheckCredentials,t,n);jh.set(e,r)}return jh.get(e)}(re(e._db,dd)),n=t.serializer;if(void 0===n)return null;const r=new yf(e,new pf);return{database:Wi(n),structuredPipeline:r._toProto(n)}}},"[project]/retired/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>",e=>{"use strict";e.s(["AggregateField",()=>c,"AggregateQuerySnapshot",()=>u,"DocumentSnapshot",()=>oe,"PersistentCacheIndexManager",()=>Oe,"QueryCompositeFilterConstraint",()=>w,"QueryConstraint",()=>m,"QueryDocumentSnapshot",()=>ce,"QueryEndAtConstraint",()=>N,"QueryFieldFilterConstraint",()=>p,"QueryLimitConstraint",()=>T,"QueryOrderByConstraint",()=>b,"QuerySnapshot",()=>ue,"QueryStartAtConstraint",()=>x,"SnapshotMetadata",()=>ie,"Transaction",()=>ye,"WriteBatch",()=>me,"_TestingHooks",()=>Ge,"addDoc",()=>De,"aggregateFieldEqual",()=>z,"aggregateQuerySnapshotEqual",()=>$,"and",()=>I,"average",()=>U,"count",()=>B,"deleteAllPersistentCacheIndexes",()=>Be,"deleteDoc",()=>Ce,"disablePersistentCacheIndexAutoCreation",()=>Ue,"documentSnapshotFromJSON",()=>ae,"enablePersistentCacheIndexAutoCreation",()=>qe,"endAt",()=>k,"endBefore",()=>A,"executeWrite",()=>Fe,"getAggregateFromServer",()=>j,"getCountFromServer",()=>G,"getDoc",()=>ve,"getDocFromCache",()=>Ie,"getDocFromServer",()=>be,"getDocs",()=>_e,"getDocsFromCache",()=>Te,"getDocsFromServer",()=>Ee,"getPersistentCacheIndexManager",()=>Le,"limit",()=>E,"limitToLast",()=>S,"memoryEagerGarbageCollector",()=>J,"memoryLocalCache",()=>X,"memoryLruGarbageCollector",()=>Y,"onSnapshot",()=>Ne,"onSnapshotResume",()=>Ae,"onSnapshotsInSync",()=>ke,"or",()=>v,"orderBy",()=>_,"persistentLocalCache",()=>Z,"persistentMultipleTabManager",()=>re,"persistentSingleTabManager",()=>ne,"query",()=>g,"querySnapshotFromJSON",()=>le,"runTransaction",()=>we,"setDoc",()=>Se,"setIndexConfiguration",()=>Ve,"snapshotEqual",()=>de,"startAfter",()=>D,"startAt",()=>C,"sum",()=>q,"updateDoc",()=>xe,"where",()=>y,"writeBatch",()=>Me]);var t=e.i("[project]/retired/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>"),n=e.i("[project]/retired/node_modules/@firebase/component/dist/esm/index.esm.js [app-client] (ecmascript)"),r=e.i("[project]/retired/node_modules/@firebase/firestore/dist/common-091f2944.esm.js [app-client] (ecmascript)"),s=e.i("[project]/retired/node_modules/@firebase/util/dist/index.esm.js [app-client] (ecmascript)");e.i("[project]/retired/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js [app-client] (ecmascript)"),e.i("[project]/retired/node_modules/@firebase/logger/dist/esm/index.esm.js [app-client] (ecmascript)"),e.i("[project]/retired/node_modules/@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js [app-client] (ecmascript)");const i="@firebase/firestore",o="4.12.0";
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
 */function a(e){return function(e){if("object"!=typeof e||null===e)return!1;const t=e;for(const e of["next","error","complete"])if(e in t&&"function"==typeof t[e])return!0;return!1}(e)}
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
 */class c{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class u{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new r.O({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}
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
 */class l{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new r.D(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new h(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field((0,r.i)("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class h extends l{data(){return super.data()}}
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
 */function d(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new r.d(r.C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class f{}class m extends f{}function g(e,t,...n){let s=[];t instanceof f&&s.push(t),s=s.concat(n),function(e){const t=e.filter(e=>e instanceof w).length,n=e.filter(e=>e instanceof p).length;if(t>1||t>0&&n>0)throw new r.d(r.C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const t of s)e=t._apply(e);return e}class p extends m{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new p(e,t,n)}_apply(e){const t=this._parse(e);return V(e._query,t),new r.Q(e.firestore,e.converter,(0,r.e)(e._query,t))}_parse(e){const t=(0,r.f)(e.firestore),n=function(e,t,n,s,i,o,a){let c;if(i.isKeyField()){if("array-contains"===o||"array-contains-any"===o)throw new r.d(r.C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${o}' queries on documentId().`);if("in"===o||"not-in"===o){M(a,o);const t=[];for(const n of a)t.push(R(s,e,n));c={arrayValue:{values:t}}}else c=R(s,e,a)}else"in"!==o&&"not-in"!==o&&"array-contains-any"!==o||M(a,o),c=(0,r.g)(n,"where",a,"in"===o||"not-in"===o);return r.h.create(i,o,c)}(e._query,0,t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function y(e,t,n){const s=t,i=(0,r.i)("where",e);return p._create(i,s,n)}class w extends f{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new w(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:r.j.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const s=t.getFlattenedFilters();for(const e of s)V(n,e),n=(0,r.e)(n,e)}(e._query,t),new r.Q(e.firestore,e.converter,(0,r.e)(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function v(...e){return e.forEach(e=>P("or",e)),w._create("or",e)}function I(...e){return e.forEach(e=>P("and",e)),w._create("and",e)}class b extends m{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new b(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new r.d(r.C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new r.d(r.C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new r.an(t,n)}(e._query,this._field,this._direction);return new r.Q(e.firestore,e.converter,(0,r.k)(e._query,t))}}function _(e,t="asc"){const n=t,s=(0,r.i)("orderBy",e);return b._create(s,n)}class T extends m{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new T(e,t,n)}_apply(e){return new r.Q(e.firestore,e.converter,(0,r.l)(e._query,this._limit,this._limitType))}}function E(e){return(0,r.m)("limit",e),T._create("limit",e,"F")}function S(e){return(0,r.m)("limitToLast",e),T._create("limitToLast",e,"L")}class x extends m{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new x(e,t,n)}_apply(e){const t=F(e,this.type,this._docOrFields,this._inclusive);return new r.Q(e.firestore,e.converter,(0,r.n)(e._query,t))}}function C(...e){return x._create("startAt",e,!0)}function D(...e){return x._create("startAfter",e,!1)}class N extends m{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new N(e,t,n)}_apply(e){const t=F(e,this.type,this._docOrFields,this._inclusive);return new r.Q(e.firestore,e.converter,(0,r.o)(e._query,t))}}function A(...e){return N._create("endBefore",e,!1)}function k(...e){return N._create("endAt",e,!0)}function F(e,t,n,i){if(n[0]=(0,s.getModularInstance)(n[0]),n[0]instanceof l)return function(e,t,n,s,i){if(!s)throw new r.d(r.C.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const o=[];for(const n of(0,r.q)(e))if(n.field.isKeyField())o.push((0,r.r)(t,s.key));else{const e=s.data.field(n.field);if((0,r.s)(e))throw new r.d(r.C.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=n.field.canonicalString();throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}o.push(e)}return new r.t(o,i)}(e._query,e.firestore._databaseId,t,n[0]._document,i);{const s=(0,r.f)(e.firestore);return function(e,t,n,s,i,o){const a=e.explicitOrderBy;if(i.length>a.length)throw new r.d(r.C.INVALID_ARGUMENT,`Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const c=[];for(let o=0;o<i.length;o++){const u=i[o];if(a[o].field.isKeyField()){if("string"!=typeof u)throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof u}`);if(!(0,r.u)(e)&&-1!==u.indexOf("/"))throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${s}() must be a plain document ID, but '${u}' contains a slash.`);const n=e.path.child(r.R.fromString(u));if(!r.v.isDocumentKey(n))throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const i=new r.v(n);c.push((0,r.r)(t,i))}else{const e=(0,r.g)(n,s,u);c.push(e)}}return new r.t(c,o)}(e._query,e.firestore._databaseId,s,t,n,i)}}function R(e,t,n){if("string"==typeof(n=(0,s.getModularInstance)(n))){if(""===n)throw new r.d(r.C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!(0,r.u)(t)&&-1!==n.indexOf("/"))throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=t.path.child(r.R.fromString(n));if(!r.v.isDocumentKey(s))throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return(0,r.r)(e,new r.v(s))}if(n instanceof r.D)return(0,r.r)(e,n._key);throw new r.d(r.C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${(0,r.w)(n)}.`)}function M(e,t){if(!Array.isArray(e)||0===e.length)throw new r.d(r.C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function V(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new r.d(r.C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new r.d(r.C.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function P(e,t){if(!(t instanceof p||t instanceof w))throw new r.d(r.C.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function O(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class L extends r.A{constructor(e){super(),this.firestore=e}convertBytes(e){return new r.B(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new r.D(this.firestore,null,t)}}
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
 */function q(e){return new c("sum",(0,r.i)("sum",e))}function U(e){return new c("avg",(0,r.i)("average",e))}function B(){return new c("count")}function z(e,t){return e instanceof c&&t instanceof c&&e.aggregateType===t.aggregateType&&e._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function $(e,t){return(0,r.x)(e.query,t.query)&&(0,s.deepEqual)(e.data(),t.data())}
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
 */function G(e){return j(e,{count:B()})}function j(e,t){const n=(0,r.y)(e.firestore,r.F),s=(0,r.z)(n),i=(0,r.E)(t,(e,t)=>new r.ao(t,e.aggregateType,e._internalFieldPath));return(0,r.G)(s,e._query,i).then(t=>function(e,t,n){const s=new r.H(e);return new u(t,s,n)}(n,e,t))}class K{constructor(e){this.kind="memory",this._onlineComponentProvider=r.ap.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new r.aq(void 0)}}toJSON(){return{kind:this.kind}}}class Q{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=ne(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class W{constructor(){this.kind="memoryEager",this._offlineComponentProvider=r.ar.provider}toJSON(){return{kind:this.kind}}}class H{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new r.aq(e)}}toJSON(){return{kind:this.kind}}}function J(){return new W}function Y(e){return new H(e?.cacheSizeBytes)}function X(e){return new K(e)}function Z(e){return new Q(e)}class ee{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=r.ap.provider,this._offlineComponentProvider={build:t=>new r.as(t,e?.cacheSizeBytes,this.forceOwnership)}}}class te{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=r.ap.provider,this._offlineComponentProvider={build:t=>new r.at(t,e?.cacheSizeBytes)}}}function ne(e){return new ee(e?.forceOwnership)}function re(){return new te}
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
 */
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
 */const se="NOT SUPPORTED";class ie{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class oe extends l{constructor(e,t,n,r,s,i){super(e,t,n,r,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ce(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field((0,r.i)("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new r.d(r.C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=oe._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}function ae(e,t,n){if((0,r.I)(t,oe._jsonSchema)){if(t.bundle===se)throw new r.d(r.C.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const s=(0,r.J)(e._databaseId),i=(0,r.K)(t.bundle,s),o=i.t(),a=new r.L(i.getMetadata(),s);for(const e of o)a.o(e);const c=a.documents;if(1!==c.length)throw new r.d(r.C.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=(0,r.M)(s,c[0].document),l=new r.v(r.R.fromString(t.bundleName));return new oe(e,new L(e),l,u,new ie(!1,!1),n||null)}}oe._jsonSchemaVersion="firestore/documentSnapshot/1.0",oe._jsonSchema={type:(0,r.p)("string",oe._jsonSchemaVersion),bundleSource:(0,r.p)("string","DocumentSnapshot"),bundleName:(0,r.p)("string"),bundle:(0,r.p)("string")};class ce extends oe{data(e={}){return super.data(e)}}class ue{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new ie(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new ce(this._firestore,this._userDataWriter,n.key,n,new ie(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new r.d(r.C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new ce(e._firestore,e._userDataWriter,n.doc.key,n.doc,new ie(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new ce(e._firestore,e._userDataWriter,t.doc.key,t.doc,new ie(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,i=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:he(t.type),doc:r,oldIndex:s,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new r.d(r.C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ue._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=r.N.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),s.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function le(e,t,n){if((0,r.I)(t,ue._jsonSchema)){if(t.bundle===se)throw new r.d(r.C.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const s=(0,r.J)(e._databaseId),i=(0,r.K)(t.bundle,s),o=i.t(),a=new r.L(i.getMetadata(),s);for(const e of o)a.o(e);if(1!==a.queries.length)throw new r.d(r.C.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${a.queries.length} queries.`);const c=(0,r.P)(a.queries[0].bundledQuery),u=a.documents;let l=new r.S;u.map(e=>{const t=(0,r.M)(s,e.document);l=l.add(t)});const h=r.V.fromInitialDocuments(c,l,(0,r.T)(),!1,!1),d=new r.Q(e,n||null,c);return new ue(e,new L(e),d,h)}}function he(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return(0,r.U)(61501,{type:e})}}function de(e,t){return e instanceof oe&&t instanceof oe?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof ue&&t instanceof ue&&e._firestore===t._firestore&&(0,r.x)(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)}
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
 */ue._jsonSchemaVersion="firestore/querySnapshot/1.0",ue._jsonSchema={type:(0,r.p)("string",ue._jsonSchemaVersion),bundleSource:(0,r.p)("string","QuerySnapshot"),bundleName:(0,r.p)("string"),bundle:(0,r.p)("string")};const fe={maxAttempts:5};
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
 */class me{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=(0,r.f)(e)}set(e,t,n){this._verifyNotCommitted();const s=ge(e,this._firestore),i=O(s.converter,t,n),o=(0,r.W)(this._dataReader,"WriteBatch.set",s._key,i,null!==s.converter,n);return this._mutations.push(o.toMutation(s._key,r.X.none())),this}update(e,t,n,...i){this._verifyNotCommitted();const o=ge(e,this._firestore);let a;return a="string"==typeof(t=(0,s.getModularInstance)(t))||t instanceof r.Y?(0,r.Z)(this._dataReader,"WriteBatch.update",o._key,t,n,i):(0,r.$)(this._dataReader,"WriteBatch.update",o._key,t),this._mutations.push(a.toMutation(o._key,r.X.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ge(e,this._firestore);return this._mutations=this._mutations.concat(new r.a0(t._key,r.X.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new r.d(r.C.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ge(e,t){if((e=(0,s.getModularInstance)(e)).firestore!==t)throw new r.d(r.C.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
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
 */class pe{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=(0,r.f)(e)}get(e){const t=ge(e,this._firestore),n=new L(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return(0,r.U)(24041);const s=e[0];if(s.isFoundDocument())return new l(this._firestore,n,s.key,s,t.converter);if(s.isNoDocument())return new l(this._firestore,n,t._key,null,t.converter);throw(0,r.U)(18433,{doc:s})})}set(e,t,n){const s=ge(e,this._firestore),i=O(s.converter,t,n),o=(0,r.W)(this._dataReader,"Transaction.set",s._key,i,null!==s.converter,n);return this._transaction.set(s._key,o),this}update(e,t,n,...i){const o=ge(e,this._firestore);let a;return a="string"==typeof(t=(0,s.getModularInstance)(t))||t instanceof r.Y?(0,r.Z)(this._dataReader,"Transaction.update",o._key,t,n,i):(0,r.$)(this._dataReader,"Transaction.update",o._key,t),this._transaction.update(o._key,a),this}delete(e){const t=ge(e,this._firestore);return this._transaction.delete(t._key),this
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
 */}}class ye extends pe{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=ge(e,this._firestore),n=new r.H(this._firestore);return super.get(e).then(e=>new oe(this._firestore,n,t._key,e._document,new ie(!1,!1),t.converter))}}function we(e,t,n){e=(0,r.y)(e,r.F);const s={...fe,...n};!function(e){if(e.maxAttempts<1)throw new r.d(r.C.INVALID_ARGUMENT,"Max attempts must be at least 1")}(s);const i=(0,r.z)(e);return(0,r.a1)(i,n=>t(new ye(e,n)),s)}
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
 */function ve(e){e=(0,r.y)(e,r.D);const t=(0,r.y)(e.firestore,r.F),n=(0,r.z)(t);return(0,r.a2)(n,e._key).then(n=>Re(t,e,n))}function Ie(e){e=(0,r.y)(e,r.D);const t=(0,r.y)(e.firestore,r.F),n=(0,r.z)(t),s=new r.H(t);return(0,r.a3)(n,e._key).then(n=>new oe(t,s,e._key,n,new ie(null!==n&&n.hasLocalMutations,!0),e.converter))}function be(e){e=(0,r.y)(e,r.D);const t=(0,r.y)(e.firestore,r.F),n=(0,r.z)(t);return(0,r.a2)(n,e._key,{source:"server"}).then(n=>Re(t,e,n))}function _e(e){e=(0,r.y)(e,r.Q);const t=(0,r.y)(e.firestore,r.F),n=(0,r.z)(t),s=new r.H(t);return d(e._query),(0,r.a4)(n,e._query).then(n=>new ue(t,s,e,n))}function Te(e){e=(0,r.y)(e,r.Q);const t=(0,r.y)(e.firestore,r.F),n=(0,r.z)(t),s=new r.H(t);return(0,r.a5)(n,e._query).then(n=>new ue(t,s,e,n))}function Ee(e){e=(0,r.y)(e,r.Q);const t=(0,r.y)(e.firestore,r.F),n=(0,r.z)(t),s=new r.H(t);return(0,r.a4)(n,e._query,{source:"server"}).then(n=>new ue(t,s,e,n))}function Se(e,t,n){e=(0,r.y)(e,r.D);const s=(0,r.y)(e.firestore,r.F),i=O(e.converter,t,n),o=(0,r.f)(s);return Fe(s,[(0,r.W)(o,"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,r.X.none())])}function xe(e,t,n,...i){e=(0,r.y)(e,r.D);const o=(0,r.y)(e.firestore,r.F),a=(0,r.f)(o);let c;return c="string"==typeof(t=(0,s.getModularInstance)(t))||t instanceof r.Y?(0,r.Z)(a,"updateDoc",e._key,t,n,i):(0,r.$)(a,"updateDoc",e._key,t),Fe(o,[c.toMutation(e._key,r.X.exists(!0))])}function Ce(e){return Fe((0,r.y)(e.firestore,r.F),[new r.a0(e._key,r.X.none())])}function De(e,t){const n=(0,r.y)(e.firestore,r.F),s=(0,r.a6)(e),i=O(e.converter,t),o=(0,r.f)(e.firestore);return Fe(n,[(0,r.W)(o,"addDoc",s._key,i,null!==e.converter,{}).toMutation(s._key,r.X.exists(!1))]).then(()=>s)}function Ne(e,...t){e=(0,s.getModularInstance)(e);let n={includeMetadataChanges:!1,source:"default"},i=0;"object"!=typeof t[i]||a(t[i])||(n=t[i++]);const o={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(a(t[i])){const e=t[i];t[i]=e.next?.bind(e),t[i+1]=e.error?.bind(e),t[i+2]=e.complete?.bind(e)}let c,u,l;if(e instanceof r.D)u=(0,r.y)(e.firestore,r.F),l=(0,r.a7)(e._key.path),c={next:n=>{t[i]&&t[i](Re(u,e,n))},error:t[i+1],complete:t[i+2]};else{const n=(0,r.y)(e,r.Q);u=(0,r.y)(n.firestore,r.F),l=n._query;const s=new r.H(u);c={next:e=>{t[i]&&t[i](new ue(u,s,n,e))},error:t[i+1],complete:t[i+2]},d(e._query)}const h=(0,r.z)(u);return(0,r.a8)(h,l,o,c)}function Ae(e,t,...n){const i=(0,s.getModularInstance)(e),o=function(e){const t={bundle:"",bundleName:"",bundleSource:""},n=["bundle","bundleName","bundleSource"];for(const r of n){if(!(r in e)){t.error=`snapshotJson missing required field: ${r}`;break}const n=e[r];if("string"!=typeof n){t.error=`snapshotJson field '${r}' must be a string.`;break}if(0===n.length){t.error=`snapshotJson field '${r}' cannot be an empty string.`;break}"bundle"===r?t.bundle=n:"bundleName"===r?t.bundleName=n:"bundleSource"===r&&(t.bundleSource=n)}return t}(t);if(o.error)throw new r.d(r.C.INVALID_ARGUMENT,o.error);let c,u=0;if("object"!=typeof n[u]||a(n[u])||(c=n[u++]),"QuerySnapshot"===o.bundleSource){let e=null;if("object"==typeof n[u]&&a(n[u])){const t=n[u++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[u++],error:n[u++],complete:n[u++]};return function(e,t,n,s,i){let o,a=!1;return(0,r.a9)(e,t.bundle).then(()=>(0,r.aa)(e,t.bundleName)).then(e=>{e&&!a&&(i&&e.withConverter(i),o=Ne(e,n||{},s))}).catch(e=>(s.error&&s.error(e),()=>{})),()=>{a||(a=!0,o&&o())}}(i,o,c,e,n[u])}if("DocumentSnapshot"===o.bundleSource){let e=null;if("object"==typeof n[u]&&a(n[u])){const t=n[u++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[u++],error:n[u++],complete:n[u++]};return function(e,t,n,s,i){let o,a=!1;return(0,r.a9)(e,t.bundle).then(()=>{if(!a){const a=new r.D(e,i||null,r.v.fromPath(t.bundleName));o=Ne(a,n||{},s)}}).catch(e=>(s.error&&s.error(e),()=>{})),()=>{a||(a=!0,o&&o())}}(i,o,c,e,n[u])}throw new r.d(r.C.INVALID_ARGUMENT,`unsupported bundle source: ${o.bundleSource}`)}function ke(e,t){e=(0,r.y)(e,r.F);const n=(0,r.z)(e),s=a(t)?t:{next:t};return(0,r.ab)(n,s)}function Fe(e,t){const n=(0,r.z)(e);return(0,r.ac)(n,t)}function Re(e,t,n){const s=n.docs.get(t._key),i=new r.H(e);return new oe(e,i,t._key,s,new ie(n.hasPendingWrites,n.fromCache),t.converter)}function Me(e){return e=(0,r.y)(e,r.F),(0,r.z)(e),new me(e,t=>Fe(e,t))
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
 */}function Ve(e,t){e=(0,r.y)(e,r.F);const n=(0,r.z)(e);if(!n._uninitializedComponentsProvider||"memory"===n._uninitializedComponentsProvider._offline.kind)return(0,r.ad)("Cannot enable indexes when persistence is disabled"),Promise.resolve();const s=function(e){const t="string"==typeof e?function(e){try{return JSON.parse(e)}catch(e){throw new r.d(r.C.INVALID_ARGUMENT,"Failed to parse JSON: "+e?.message)}}(e):e,n=[];if(Array.isArray(t.indexes))for(const e of t.indexes){const t=Pe(e,"collectionGroup"),s=[];if(Array.isArray(e.fields))for(const t of e.fields){const e=Pe(t,"fieldPath"),n=(0,r.ae)("setIndexConfiguration",e);"CONTAINS"===t.arrayConfig?s.push(new r.af(n,2)):"ASCENDING"===t.order?s.push(new r.af(n,0)):"DESCENDING"===t.order&&s.push(new r.af(n,1))}n.push(new r.ag(r.ag.UNKNOWN_ID,t,s,r.ah.empty()))}return n}(t);return(0,r.ai)(n,s)}function Pe(e,t){if("string"!=typeof e[t])throw new r.d(r.C.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}
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
 */class Oe{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Le(e){e=(0,r.y)(e,r.F);const t=$e.get(e);if(t)return t;const n=(0,r.z)(e);if("persistent"!==n._uninitializedComponentsProvider?._offline.kind)return null;const s=new Oe(e);return $e.set(e,s),s}function qe(e){ze(e,!0)}function Ue(e){ze(e,!1)}function Be(e){const t=(0,r.z)(e._firestore);(0,r.aj)(t).then(e=>(0,r.ak)("deleting all persistent cache indexes succeeded")).catch(e=>(0,r.ad)("deleting all persistent cache indexes failed",e))}function ze(e,t){const n=(0,r.z)(e._firestore);(0,r.al)(n,t).then(e=>(0,r.ak)(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>(0,r.ad)(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}const $e=new WeakMap;
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
 */class Ge{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return je.instance.onExistenceFilterMismatch(e)}}class je{constructor(){this.i=new Map}static get instance(){return Ke||(Ke=new je,(0,r.am)(Ke)),Ke}u(e){this.i.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.i;return n.set(t,e),()=>n.delete(t)}}let Ke=null;!function(e,s=!0){(0,r._)(t.SDK_VERSION),(0,t._registerComponent)(new n.Component("firestore",(e,{instanceIdentifier:t,options:n})=>{const i=e.getProvider("app").getImmediate(),o=new r.F(new r.a(e.getProvider("auth-internal")),new r.b(i,e.getProvider("app-check-internal")),(0,r.c)(i,t),i);return n={useFetchStreams:s,...n},o._setSettings(n),o},"PUBLIC").setMultipleInstances(!0)),(0,t.registerVersion)(i,o,e),(0,t.registerVersion)(i,o,"esm2020")}()},"[project]/retired/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)",e=>{"use strict";e.s(["AbstractUserDataWriter",()=>n.A,"AggregateField",()=>t.AggregateField,"AggregateQuerySnapshot",()=>t.AggregateQuerySnapshot,"Bytes",()=>n.B,"CACHE_SIZE_UNLIMITED",()=>n.au,"CollectionReference",()=>n.av,"DocumentReference",()=>n.D,"DocumentSnapshot",()=>t.DocumentSnapshot,"FieldPath",()=>n.Y,"FieldValue",()=>n.aw,"Firestore",()=>n.F,"FirestoreError",()=>n.d,"GeoPoint",()=>n.ax,"LoadBundleTask",()=>n.ay,"PersistentCacheIndexManager",()=>t.PersistentCacheIndexManager,"Query",()=>n.Q,"QueryCompositeFilterConstraint",()=>t.QueryCompositeFilterConstraint,"QueryConstraint",()=>t.QueryConstraint,"QueryDocumentSnapshot",()=>t.QueryDocumentSnapshot,"QueryEndAtConstraint",()=>t.QueryEndAtConstraint,"QueryFieldFilterConstraint",()=>t.QueryFieldFilterConstraint,"QueryLimitConstraint",()=>t.QueryLimitConstraint,"QueryOrderByConstraint",()=>t.QueryOrderByConstraint,"QuerySnapshot",()=>t.QuerySnapshot,"QueryStartAtConstraint",()=>t.QueryStartAtConstraint,"SnapshotMetadata",()=>t.SnapshotMetadata,"Timestamp",()=>n.az,"Transaction",()=>t.Transaction,"VectorValue",()=>n.aA,"WriteBatch",()=>t.WriteBatch,"_AutoId",()=>n.N,"_ByteString",()=>n.aB,"_DatabaseId",()=>n.aC,"_DocumentKey",()=>n.v,"_EmptyAppCheckTokenProvider",()=>n.aD,"_EmptyAuthCredentialsProvider",()=>n.aE,"_FieldPath",()=>n.aF,"_TestingHooks",()=>t._TestingHooks,"_cast",()=>n.y,"_debugAssert",()=>n.aG,"_internalAggregationQueryToProtoRunAggregationQueryRequest",()=>n.aH,"_internalQueryToProtoQueryTarget",()=>n.aI,"_isBase64Available",()=>n.aJ,"_logWarn",()=>n.ad,"_validateIsNotUsedTogether",()=>n.aK,"addDoc",()=>t.addDoc,"aggregateFieldEqual",()=>t.aggregateFieldEqual,"aggregateQuerySnapshotEqual",()=>t.aggregateQuerySnapshotEqual,"and",()=>t.and,"arrayRemove",()=>n.aL,"arrayUnion",()=>n.aM,"average",()=>t.average,"clearIndexedDbPersistence",()=>n.aN,"collection",()=>n.aO,"collectionGroup",()=>n.aP,"connectFirestoreEmulator",()=>n.aQ,"count",()=>t.count,"deleteAllPersistentCacheIndexes",()=>t.deleteAllPersistentCacheIndexes,"deleteDoc",()=>t.deleteDoc,"deleteField",()=>n.aR,"disableNetwork",()=>n.aS,"disablePersistentCacheIndexAutoCreation",()=>t.disablePersistentCacheIndexAutoCreation,"doc",()=>n.a6,"documentId",()=>n.aT,"documentSnapshotFromJSON",()=>t.documentSnapshotFromJSON,"enableIndexedDbPersistence",()=>n.aU,"enableMultiTabIndexedDbPersistence",()=>n.aV,"enableNetwork",()=>n.aW,"enablePersistentCacheIndexAutoCreation",()=>t.enablePersistentCacheIndexAutoCreation,"endAt",()=>t.endAt,"endBefore",()=>t.endBefore,"ensureFirestoreConfigured",()=>n.z,"executeWrite",()=>t.executeWrite,"getAggregateFromServer",()=>t.getAggregateFromServer,"getCountFromServer",()=>t.getCountFromServer,"getDoc",()=>t.getDoc,"getDocFromCache",()=>t.getDocFromCache,"getDocFromServer",()=>t.getDocFromServer,"getDocs",()=>t.getDocs,"getDocsFromCache",()=>t.getDocsFromCache,"getDocsFromServer",()=>t.getDocsFromServer,"getFirestore",()=>n.aX,"getPersistentCacheIndexManager",()=>t.getPersistentCacheIndexManager,"increment",()=>n.aY,"initializeFirestore",()=>n.aZ,"limit",()=>t.limit,"limitToLast",()=>t.limitToLast,"loadBundle",()=>n.a9,"memoryEagerGarbageCollector",()=>t.memoryEagerGarbageCollector,"memoryLocalCache",()=>t.memoryLocalCache,"memoryLruGarbageCollector",()=>t.memoryLruGarbageCollector,"namedQuery",()=>n.aa,"onSnapshot",()=>t.onSnapshot,"onSnapshotResume",()=>t.onSnapshotResume,"onSnapshotsInSync",()=>t.onSnapshotsInSync,"or",()=>t.or,"orderBy",()=>t.orderBy,"persistentLocalCache",()=>t.persistentLocalCache,"persistentMultipleTabManager",()=>t.persistentMultipleTabManager,"persistentSingleTabManager",()=>t.persistentSingleTabManager,"query",()=>t.query,"queryEqual",()=>n.x,"querySnapshotFromJSON",()=>t.querySnapshotFromJSON,"refEqual",()=>n.a_,"runTransaction",()=>t.runTransaction,"serverTimestamp",()=>n.a$,"setDoc",()=>t.setDoc,"setIndexConfiguration",()=>t.setIndexConfiguration,"setLogLevel",()=>n.b0,"snapshotEqual",()=>t.snapshotEqual,"startAfter",()=>t.startAfter,"startAt",()=>t.startAt,"sum",()=>t.sum,"terminate",()=>n.b1,"updateDoc",()=>t.updateDoc,"vector",()=>n.b2,"waitForPendingWrites",()=>n.b3,"where",()=>t.where,"writeBatch",()=>t.writeBatch]);var t=e.i("[project]/retired/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>"),n=e.i("[project]/retired/node_modules/@firebase/firestore/dist/common-091f2944.esm.js [app-client] (ecmascript)")}]);