module.exports=["[project]/booking/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-ssr] (ecmascript)",e=>{"use strict";e.s(["$",()=>Sp,"A",()=>Pp,"B",()=>tp,"C",()=>kr,"D",()=>xh,"E",()=>ie,"F",()=>Lh,"G",()=>zh,"H",()=>dn,"I",()=>ah,"J",()=>Vp,"K",()=>oe,"L",()=>Au,"M",()=>ph,"N",()=>Vl,"O",()=>wr,"P",()=>aa,"Q",()=>Dh,"R",()=>W,"S",()=>M,"T",()=>qa,"U",()=>Tl,"V",()=>Sl,"W",()=>Ri,"X",()=>b,"Y",()=>mp,"Z",()=>Zi,"_",()=>np,"a",()=>_,"a$",()=>Yh,"a0",()=>vp,"a1",()=>hs,"a2",()=>lh,"a3",()=>rh,"a4",()=>nh,"a5",()=>sh,"a6",()=>ih,"a7",()=>Rh,"a8",()=>ti,"a9",()=>th,"aA",()=>Qs,"aB",()=>pa,"aC",()=>ai,"aD",()=>Cp,"aE",()=>Bh,"aF",()=>kh,"aG",()=>ip,"aH",()=>sp,"aI",()=>Mh,"aJ",()=>ap,"aK",()=>vn,"aL",()=>Vn,"aM",()=>V,"aN",()=>k,"aO",()=>Y,"aP",()=>S,"aQ",()=>jp,"aR",()=>Gp,"aS",()=>Tn,"aT",()=>Z,"aU",()=>Lp,"aV",()=>Bp,"aW",()=>$h,"aX",()=>_h,"aY",()=>Nh,"aZ",()=>Ch,"a_",()=>Fp,"aa",()=>uh,"ab",()=>ch,"ac",()=>y,"ad",()=>mh,"ae",()=>_p,"af",()=>pe,"ag",()=>be,"ah",()=>fh,"ai",()=>g,"aj",()=>gh,"ak",()=>Er,"al",()=>ep,"am",()=>Ad,"an",()=>Dd,"ao",()=>Cd,"ap",()=>xd,"aq",()=>kd,"ar",()=>Xh,"as",()=>Zh,"at",()=>ye,"au",()=>Is,"av",()=>le,"aw",()=>zs,"ax",()=>hp,"ay",()=>Gs,"az",()=>Xs,"b",()=>P,"b0",()=>rp,"b1",()=>Qh,"b2",()=>Gh,"b3",()=>Hh,"b4",()=>Uh,"b5",()=>qp,"b6",()=>qh,"b7",()=>Oh,"b8",()=>Mp,"b9",()=>m,"ba",()=>Jh,"bb",()=>Up,"bc",()=>Wh,"bd",()=>zn,"be",()=>j,"bf",()=>v,"bg",()=>Ep,"bh",()=>ka,"bi",()=>Ah,"bj",()=>Q,"bk",()=>oh,"bl",()=>ne,"bm",()=>ri,"bn",()=>zp,"bo",()=>qn,"bp",()=>Kp,"bq",()=>xa,"br",()=>Mi,"bs",()=>Aa,"bt",()=>Op,"bu",()=>Qp,"bv",()=>$p,"c",()=>pp,"d",()=>Fn,"e",()=>li,"f",()=>kp,"g",()=>di,"h",()=>hi,"i",()=>pi,"j",()=>C,"k",()=>E,"l",()=>Ip,"m",()=>xr,"n",()=>Es,"o",()=>si,"p",()=>ae,"q",()=>ui,"r",()=>ir,"s",()=>d,"t",()=>_n,"u",()=>vr,"v",()=>se,"w",()=>ii,"x",()=>J,"y",()=>re,"z",()=>Ph]);var t=e.i("[project]/booking/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript) <locals>"),n=e.i("[project]/booking/node_modules/@firebase/util/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)"),r=e.i("[project]/booking/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js [app-ssr] (ecmascript)"),i=e.i("[project]/booking/node_modules/@firebase/logger/dist/esm/index.esm.js [app-ssr] (ecmascript)"),s=e.i("[externals]/util [external] (util, cjs)"),a=e.i("[externals]/crypto [external] (crypto, cjs)"),o=e.i("[project]/booking/node_modules/@grpc/grpc-js/build/src/index.js [app-ssr] (ecmascript)"),c=e.i("[project]/booking/node_modules/@grpc/proto-loader/build/src/index.js [app-ssr] (ecmascript)");
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
class u{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}u.UNAUTHENTICATED=new u(null),u.GOOGLE_CREDENTIALS=new u("google-credentials-uid"),u.FIRST_PARTY=new u("first-party-uid"),u.MOCK_USER=new u("mock-user");
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
let l="12.11.0";function d(e){l=e}
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
 */
const h=new i.Logger("@firebase/firestore");function p(){return h.logLevel}function m(e){h.setLogLevel(e)}function g(e,...t){if(h.logLevel<=i.LogLevel.DEBUG){const n=t.map(w);h.debug(`Firestore (${l}): ${e}`,...n)}}function f(e,...t){if(h.logLevel<=i.LogLevel.ERROR){const n=t.map(w);h.error(`Firestore (${l}): ${e}`,...n)}}function y(e,...t){if(h.logLevel<=i.LogLevel.WARN){const n=t.map(w);h.warn(`Firestore (${l}): ${e}`,...n)}}function w(e){if("string"==typeof e)return e;try{return t=e,(0,s.inspect)(t,{depth:100})}catch(t){return e}var t}
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
 */function b(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,T(e,r,n)}function T(e,t,n){let r=`FIRESTORE (${l}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw f(r),new Error(r)}function v(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||T(t,i,r)}function S(e,t){e||b(57014,t)}function I(e,t){return e}
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
 */const E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends n.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class D{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
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
 */class x{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class k{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(u.UNAUTHENTICATED))}shutdown(){}}class A{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class _{constructor(e){this.authProvider=e,this.currentUser=u.UNAUTHENTICATED,this.tokenCounter=0,this.forceRefresh=!1,this.auth=null}start(e,t){v(void 0===this.tokenListener,42304);let n=this.tokenCounter;const r=e=>this.tokenCounter!==n?(n=this.tokenCounter,t(e)):Promise.resolve();let i=new D;this.tokenListener=()=>{this.tokenCounter++,this.currentUser=this.getUser(),i.resolve(),i=new D,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{g("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.tokenListener&&(this.auth.addAuthTokenListener(this.tokenListener),s())};this.authProvider.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){const e=this.authProvider.getImmediate({optional:!0});e?a(e):(g("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new D)}},0),s()}getToken(){const e=this.tokenCounter,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.tokenCounter!==e?(g("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(v("string"==typeof t.accessToken,31837,{tokenData:t}),new x(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.tokenListener&&this.auth.removeAuthTokenListener(this.tokenListener),this.tokenListener=void 0}getUser(){const e=this.auth&&this.auth.getUid();return v(null===e||"string"==typeof e,2055,{currentUid:e}),new u(e)}}class N{constructor(e,t,n){this.sessionIndex=e,this.iamToken=t,this.authTokenFactory=n,this.type="FirstParty",this.user=u.FIRST_PARTY,this._headers=new Map}getAuthToken(){return this.authTokenFactory?this.authTokenFactory():null}get headers(){this._headers.set("X-Goog-AuthUser",this.sessionIndex);const e=this.getAuthToken();return e&&this._headers.set("Authorization",e),this.iamToken&&this._headers.set("X-Goog-Iam-Authorization-Token",this.iamToken),this._headers}}class R{constructor(e,t,n){this.sessionIndex=e,this.iamToken=t,this.authTokenFactory=n}getToken(){return Promise.resolve(new N(this.sessionIndex,this.iamToken,this.authTokenFactory))}start(e,t){e.enqueueRetryable(()=>t(u.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class O{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class P{constructor(e,n){this.appCheckProvider=n,this.forceRefresh=!1,this.appCheck=null,this.latestAppCheckToken=null,this.serverAppAppCheckToken=null,(0,t._isFirebaseServerApp)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken)}start(e,t){v(void 0===this.tokenListener,3512);const n=e=>{null!=e.error&&g("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.latestAppCheckToken;return this.latestAppCheckToken=e.token,g("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.tokenListener=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{g("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.tokenListener&&this.appCheck.addTokenListener(this.tokenListener)};this.appCheckProvider.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.appCheckProvider.getImmediate({optional:!0});e?r(e):g("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.serverAppAppCheckToken)return Promise.resolve(new O(this.serverAppAppCheckToken));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(v("string"==typeof e.token,44558,{tokenResult:e}),this.latestAppCheckToken=e.token,new O(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.tokenListener&&this.appCheck.removeTokenListener(this.tokenListener),this.tokenListener=void 0}}class V{getToken(){return Promise.resolve(new O(""))}invalidateToken(){}start(e,t){}shutdown(){}}
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
function F(e){return(0,a.randomBytes)(e)}
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
 */class M{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(256/62);let n="";for(;n.length<20;){const r=F(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%62))}return n}}function B(e,t){return e<t?-1:e>t?1:0}function L(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),i=t.charAt(r);if(n!==i)return z(n)===z(i)?B(n,i):z(n)?1:-1}return B(e.length,t.length)}const q=55296,U=57343;function z(e){const t=e.charCodeAt(0);return t>=q&&t<=U}function K(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function Q(e,t,n){return void 0===e&&void 0===t||void 0!==e&&void 0!==t&&n(e,t)}function G(e){return e+"\0"}
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
 */const j="__name__";class ${constructor(e,t,n){void 0===t?t=0:t>e.length&&b(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&b(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===$.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof $?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=$.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return B(e.length,t.length)}static compareSegments(e,t){const n=$.isNumericId(e),r=$.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?$.extractNumericId(e).compare($.extractNumericId(t)):L(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return r.Integer.fromString(e.substring(4,e.length-2))}}class W extends ${construct(e,t,n){return new W(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new C(E.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new W(t)}static emptyPath(){return new W([])}}const H=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Y extends ${construct(e,t,n){return new Y(e,t,n)}static isValidIdentifier(e){return H.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Y.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===j}static keyField(){return new Y([j])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new C(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new C(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new C(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new C(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Y(t)}static emptyPath(){return new Y([])}}
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
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(W.fromString(e))}static fromName(e){return new J(W.fromString(e).popFirst(5))}static empty(){return new J(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===W.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return W.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new W(e.slice()))}}
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
 */function X(e,t,n){if(!n)throw new C(E.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Z(e,t,n,r){if(!0===t&&!0===r)throw new C(E.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ee(e){if(!J.isDocumentKey(e))throw new C(E.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function te(e){if(J.isDocumentKey(e))throw new C(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function ne(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function re(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){if(e.constructor)return e.constructor.name;return null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":b(12329,{type:typeof e})}function ie(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new C(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=re(e);throw new C(E.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function se(e,t){if(t<=0)throw new C(E.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
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
 */function ae(e,t){const n={typeString:e};return t&&(n.value=t),n}function oe(e,t){if(!ne(e))throw new C(E.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const a=e[r];if(i&&typeof a!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&a!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new C(E.INVALID_ARGUMENT,n);return!0}
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
 */const ce=-62135596800,ue=1e6;class le{static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*ue);return new le(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new C(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new C(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ce)throw new C(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new C(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ue}_compareTo(e){return this.seconds===e.seconds?B(this.nanoseconds,e.nanoseconds):B(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:le._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(oe(e,le._jsonSchema))return new le(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ce;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}le._jsonSchemaVersion="firestore/timestamp/1.0",le._jsonSchema={type:ae("string",le._jsonSchemaVersion),seconds:ae("number"),nanoseconds:ae("number")};
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
class de{static fromTimestamp(e){return new de(e)}static min(){return new de(new le(0,0))}static max(){return new de(new le(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */const he=-1;class pe{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function me(e){return e.fields.find(e=>2===e.kind)}function ge(e){return e.fields.filter(e=>2!==e.kind)}function fe(e,t){let n=B(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=we(e.fields[r],t.fields[r]),0!==n)return n;return B(e.fields.length,t.fields.length)}pe.UNKNOWN_ID=-1;class ye{constructor(e,t){this.fieldPath=e,this.kind=t}}function we(e,t){const n=Y.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:B(e.kind,t.kind)}class be{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new be(0,Se.min())}}function Te(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=de.fromTimestamp(1e9===r?new le(n+1,0):new le(n,r));return new Se(i,J.empty(),t)}function ve(e){return new Se(e.readTime,e.key,he)}class Se{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Se(de.min(),J.empty(),he)}static max(){return new Se(de.max(),J.empty(),he)}}function Ie(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=J.comparator(e.documentKey,t.documentKey),0!==n?n:B(e.largestBatchId,t.largestBatchId))}
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
 */const Ee="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ce{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
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
 */async function De(e){if(e.code!==E.FAILED_PRECONDITION||e.message!==Ee)throw e;g("LocalStore","Unexpectedly lost primary lease")}
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
 */class xe{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&b(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new xe((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof xe?t:xe.resolve(t)}catch(e){return xe.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):xe.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):xe.reject(t)}static resolve(e){return new xe((t,n)=>{t(e)})}static reject(e){return new xe((t,n)=>{n(e)})}static waitFor(e){return new xe((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=xe.resolve(!1);for(const n of e)t=t.next(e=>e?xe.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new xe((n,r)=>{const i=e.length,s=new Array(i);let a=0;for(let o=0;o<i;o++){const c=o;t(e[c]).next(e=>{s[c]=e,++a,a===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new xe((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
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
 */const ke="SimpleDb";class Ae{static open(e,t,n,r){try{return new Ae(t,e.transaction(r,n))}catch(e){throw new Oe(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.completionDeferred=new D,this.transaction.oncomplete=()=>{this.completionDeferred.resolve()},this.transaction.onabort=()=>{t.error?this.completionDeferred.reject(new Oe(e,t.error)):this.completionDeferred.resolve()},this.transaction.onerror=t=>{const n=Be(t.target.error);this.completionDeferred.reject(new Oe(e,n))}}get completionPromise(){return this.completionDeferred.promise}abort(e){e&&this.completionDeferred.reject(e),this.aborted||(g(ke,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}maybeCommit(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Ve(t)}}class _e{static delete(e){g(ke,"Removing database:",e);return Fe((0,n.getGlobal)().indexedDB.deleteDatabase(e)).toPromise()}static isAvailable(){if(!(0,n.isIndexedDBAvailable)())return!1;if(_e.isMockPersistence())return!0;const e=(0,n.getUA)(),t=_e.getIOSVersion(e),r=0<t&&t<10,i=Ne(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static isMockPersistence(){return"undefined"!=typeof process&&"YES"===process.env?.USE_MOCK_PERSISTENCE}static getStore(e,t){return e.store(t)}static getIOSVersion(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,r){this.name=e,this.version=t,this.schemaConverter=r,this.lastClosedDbVersion=null;12.2===_e.getIOSVersion((0,n.getUA)())&&f("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async ensureDb(e){return this.db||(g(ke,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new Oe(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new C(E.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new C(E.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new Oe(e,r))},r.onupgradeneeded=e=>{g(ke,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.schemaConverter.createOrUpgrade(t,r.transaction,e.oldVersion,this.version).next(()=>{g(ke,"Database upgrade to version "+this.version+" complete")})}})),this.versionchangelistener&&(this.db.onversionchange=e=>this.versionchangelistener(e)),this.db}setVersionChangeListener(e){this.versionchangelistener=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const i="readonly"===t;let s=0;for(;;){++s;try{this.db=await this.ensureDb(e);const t=Ae.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.maybeCommit(),e)).catch(e=>(t.abort(e),xe.reject(e))).toPromise();return s.catch(()=>{}),await t.completionPromise,s}catch(e){const t=e,n="FirebaseError"!==t.name&&s<3;if(g(ke,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Ne(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class Re{constructor(e){this.dbCursor=e,this.shouldStop=!1,this.nextKey=null}get isDone(){return this.shouldStop}get skipToKey(){return this.nextKey}set cursor(e){this.dbCursor=e}done(){this.shouldStop=!0}skip(e){this.nextKey=e}delete(){return Fe(this.dbCursor.delete())}}class Oe extends C{constructor(e,t){super(E.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Pe(e){return"IndexedDbTransactionError"===e.name}class Ve{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(g(ke,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(g(ke,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Fe(n)}add(e){g(ke,"ADD",this.store.name,e,e);return Fe(this.store.add(e))}get(e){return Fe(this.store.get(e)).next(t=>(void 0===t&&(t=null),g(ke,"GET",this.store.name,e,t),t))}delete(e){g(ke,"DELETE",this.store.name,e);return Fe(this.store.delete(e))}count(){g(ke,"COUNT",this.store.name);return Fe(this.store.count())}loadAll(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new xe((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.iterateCursor(e,(e,n)=>{t.push(n)}).next(()=>t)}}loadFirst(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new xe((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}deleteAll(e,t){g(ke,"DELETE ALL",this.store.name);const n=this.options(e,t);n.keysOnly=!1;const r=this.cursor(n);return this.iterateCursor(r,(e,t,n)=>n.delete())}iterate(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.iterateCursor(r,t)}iterateSerial(e){const t=this.cursor({});return new xe((n,r)=>{t.onerror=e=>{const t=Be(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}iterateCursor(e,t){const n=[];return new xe((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{const i=e.target.result;if(!i)return void r();const s=new Re(i),a=t(i.primaryKey,i.value,s);if(a instanceof xe){const e=a.catch(e=>(s.done(),xe.reject(e)));n.push(e)}s.isDone?r():null===s.skipToKey?i.continue():i.continue(s.skipToKey)}}).next(()=>xe.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.keysOnly?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Fe(e){return new xe((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=Be(e.target.error);n(t)}})}let Me=!1;function Be(e){const t=_e.getIOSVersion((0,n.getUA)());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new C("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Me||(Me=!0,setTimeout(()=>{throw e},0)),e}}return e}const Le="IndexBackfiller";class qe{constructor(e,t){this.asyncQueue=e,this.backfiller=t,this.task=null}start(){this.schedule(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}schedule(e){g(Le,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.backfiller.backfill();g(Le,`Documents written: ${e}`)}catch(e){Pe(e)?g(Le,"Ignoring IndexedDB error during index backfill: ",e):await De(e)}await this.schedule(6e4)})}}class Ue{constructor(e,t){this.localStore=e,this.persistence=t}async backfill(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.writeIndexEntries(t,e))}writeIndexEntries(e,t){const n=new Set;let r=t,i=!0;return xe.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return g(Le,`Processing collection: ${t}`),this.writeEntriesForCollectionGroup(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}writeEntriesForCollectionGroup(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this.getNewOffset(r,n)).next(n=>(g(Le,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}getNewOffset(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=ve(t);Ie(r,n)>0&&(n=r)}),new Se(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
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
 */class ze{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.setPreviousValue(e),this.writeNewSequenceNumber=e=>t.writeSequenceNumber(e))}setPreviousValue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.writeNewSequenceNumber&&this.writeNewSequenceNumber(e),e}}ze.INVALID=-1;
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
const Ke="";function Qe(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=je(t)),t=Ge(e.get(n),t);return je(t)}function Ge(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="";break;case Ke:n+="";break;default:n+=r}}return n}function je(e){return e+Ke+""}function $e(e){const t=e.length;if(v(t>=2,64408,{path:e}),2===t)return v(e.charAt(0)===Ke&&""===e.charAt(1),56145,{path:e}),W.emptyPath();const n=t-2,r=[];let i="";for(let s=0;s<t;){const t=e.indexOf(Ke,s);(t<0||t>n)&&b(50515,{path:e});switch(e.charAt(t+1)){case"":const n=e.substring(s,t);let a;0===i.length?a=n:(i+=n,a=i,i=""),r.push(a);break;case"":i+=e.substring(s,t),i+="\0";break;case"":i+=e.substring(s,t+1);break;default:b(61167,{path:e})}s=t+2}return new W(r)}
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
 */const We="remoteDocuments",He="owner",Ye="owner",Je="mutationQueues",Xe="userId",Ze="mutations",et="batchId",tt="userMutationsIndex",nt=["userId","batchId"];
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
 */function rt(e,t){return[e,Qe(t)]}function it(e,t,n){return[e,Qe(t),n]}const st={},at="documentMutations",ot="remoteDocumentsV14",ct=["prefixPath","collectionGroup","readTime","documentId"],ut="documentKeyIndex",lt=["prefixPath","collectionGroup","documentId"],dt="collectionGroupIndex",ht=["collectionGroup","readTime","prefixPath","documentId"],pt="remoteDocumentGlobal",mt="remoteDocumentGlobalKey",gt="targets",ft="queryTargetsIndex",yt=["canonicalId","targetId"],wt="targetDocuments",bt=["targetId","path"],Tt="documentTargetsIndex",vt=["path","targetId"],St="targetGlobalKey",It="targetGlobal",Et="collectionParents",Ct=["collectionId","parent"],Dt="clientMetadata",xt="clientId",kt="bundles",At="bundleId",_t="namedQueries",Nt="name",Rt="indexConfiguration",Ot="indexId",Pt="collectionGroupIndex",Vt="collectionGroup",Ft="indexState",Mt=["indexId","uid"],Bt="sequenceNumberIndex",Lt=["uid","sequenceNumber"],qt="indexEntries",Ut=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],zt="documentKeyIndex",Kt=["indexId","uid","orderedDocumentKey"],Qt="documentOverlays",Gt=["userId","collectionPath","documentId"],jt="collectionPathOverlayIndex",$t=["userId","collectionPath","largestBatchId"],Wt="collectionGroupOverlayIndex",Ht=["userId","collectionGroup","largestBatchId"],Yt="globals",Jt="name",Xt=[...[...[...[...[Je,Ze,at,We,gt,He,It,wt],Dt],pt],Et],kt,_t],Zt=[...Xt,Qt],en=[Je,Ze,at,ot,gt,He,It,wt,Dt,pt,Et,kt,_t,Qt],tn=en,nn=[...tn,Rt,Ft,qt],rn=nn,sn=[...nn,Yt],an=sn;
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
class on extends Ce{constructor(e,t){super(),this.simpleDbTransaction=e,this.currentSequenceNumber=t}}function cn(e,t){const n=I(e);return _e.getStore(n.simpleDbTransaction,t)}
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
 */function un(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function ln(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function dn(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function hn(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */class pn{constructor(e,t){this.comparator=e,this.root=t||gn.EMPTY}insert(e,t){return new pn(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,gn.BLACK,null,null))}remove(e){return new pn(this.comparator,this.root.remove(e,this.comparator).copy(null,null,gn.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new mn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new mn(this.root,e,this.comparator,!1)}getReverseIterator(){return new mn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new mn(this.root,e,this.comparator,!0)}}class mn{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class gn{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:gn.RED,this.left=null!=r?r:gn.EMPTY,this.right=null!=i?i:gn.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new gn(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return gn.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return gn.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,gn.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,gn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw b(43730,{key:this.key,value:this.value});if(this.right.isRed())throw b(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw b(27949);return e+(this.isRed()?0:1)}}gn.EMPTY=null,gn.RED=!0,gn.BLACK=!1;gn.EMPTY=new class{constructor(){this.size=0}get key(){throw b(57766)}get value(){throw b(16141)}get color(){throw b(16727)}get left(){throw b(29726)}get right(){throw b(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new gn(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class fn{constructor(e){this.comparator=e,this.data=new pn(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();){if(!e(n.getNext().key))return}}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yn(this.data.getIterator())}getIteratorFrom(e){return new yn(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof fn))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new fn(this.comparator);return t.data=e,t}}class yn{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function wn(e){return e.hasNext()?e.getNext():void 0}
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
 */class bn{constructor(e){this.fields=e,e.sort(Y.comparator)}static empty(){return new bn([])}unionWith(e){let t=new fn(Y.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new bn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return K(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */function Tn(){return!0}
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
 */class vn{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(n=e,Buffer.from(n,"base64").toString("binary"));var n;return new vn(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new vn(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,Buffer.from(e,"binary").toString("base64");var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return B(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}vn.EMPTY_BYTE_STRING=new vn("");const Sn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function In(e){if(v(!!e,39018),"string"==typeof e){let t=0;const n=Sn.exec(e);if(v(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:En(e.seconds),nanos:En(e.nanos)}}function En(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Cn(e){return"string"==typeof e?vn.fromBase64String(e):vn.fromUint8Array(e)}
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
 */const Dn="server_timestamp",xn="__type__",kn="__previous_value__",An="__local_write_time__";function _n(e){const t=(e?.mapValue?.fields||{})[xn]?.stringValue;return t===Dn}function Nn(e){const t=e.mapValue.fields[kn];return _n(t)?Nn(t):t}function Rn(e){const t=In(e.mapValue.fields[An].timestampValue);return new le(t.seconds,t.nanos)}
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
 */class On{constructor(e,t,n,r,i,s,a,o,c,u,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=l}}const Pn="(default)";class Vn{constructor(e,t){this.projectId=e,this.database=t||Pn}static empty(){return new Vn("","")}get isDefaultDatabase(){return this.database===Pn}isEqual(e){return e instanceof Vn&&e.projectId===this.projectId&&e.database===this.database}}function Fn(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new C(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vn(e.options.projectId,t)}
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
 */const Mn=-1;function Bn(e){return null==e}function Ln(e){return 0===e&&1/e==-1/0}function qn(e){return"number"==typeof e}function Un(e){return"number"==typeof e&&Number.isInteger(e)&&!Ln(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function zn(e){return"string"==typeof e}
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
 */const Kn="__type__",Qn="__max__",Gn={mapValue:{fields:{__type__:{stringValue:Qn}}}},jn="__vector__",$n="value",Wn={nullValue:"NULL_VALUE"};function Hn(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?_n(e)?4:hr(e)?9007199254740991:lr(e)?10:11:b(28295,{value:e})}function Yn(e,t){if(e===t)return!0;const n=Hn(e);if(n!==Hn(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Rn(e).isEqual(Rn(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=In(e.timestampValue),r=In(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Cn(e.bytesValue).isEqual(Cn(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return En(e.geoPointValue.latitude)===En(t.geoPointValue.latitude)&&En(e.geoPointValue.longitude)===En(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return En(e.integerValue)===En(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=En(e.doubleValue),r=En(t.doubleValue);return n===r?Ln(n)===Ln(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return K(e.arrayValue.values||[],t.arrayValue.values||[],Yn);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(un(n)!==un(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!Yn(n[e],r[e])))return!1;return!0}(e,t);default:return b(52216,{left:e})}}function Jn(e,t){return void 0!==(e.values||[]).find(e=>Yn(e,t))}function Xn(e,t){if(e===t)return 0;const n=Hn(e),r=Hn(t);if(n!==r)return B(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return B(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=En(e.integerValue||e.doubleValue),r=En(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Zn(e.timestampValue,t.timestampValue);case 4:return Zn(Rn(e),Rn(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Cn(e),r=Cn(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=B(n[e],r[e]);if(0!==t)return t}return B(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=B(En(e.latitude),En(t.latitude));if(0!==n)return n;return B(En(e.longitude),En(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return er(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},i=n[$n]?.arrayValue,s=r[$n]?.arrayValue,a=B(i?.values?.length||0,s?.values?.length||0);if(0!==a)return a;return er(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Gn.mapValue&&t===Gn.mapValue)return 0;if(e===Gn.mapValue)return 1;if(t===Gn.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){const t=L(r[e],s[e]);if(0!==t)return t;const a=Xn(n[r[e]],i[s[e]]);if(0!==a)return a}return B(r.length,s.length)}(e.mapValue,t.mapValue);default:throw b(23264,{leftType:n})}}function Zn(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return B(e,t);const n=In(e),r=In(t),i=B(n.seconds,r.seconds);return 0!==i?i:B(n.nanos,r.nanos)}function er(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=Xn(n[e],r[e]);if(t)return t}return B(n.length,r.length)}function tr(e){return nr(e)}function nr(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=In(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Cn(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,J.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=nr(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${nr(e.fields[i])}`;return n+"}"}(e.mapValue):b(61005,{value:e});var t,n}function rr(e){switch(Hn(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Nn(e);return t?16+rr(t):16;case 5:return 2*e.stringValue.length;case 6:return Cn(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+rr(t),0);case 10:case 11:return function(e){let t=0;return ln(e.fields,(e,n)=>{t+=e.length+rr(n)}),t}(e.mapValue);default:throw b(13486,{value:e})}}function ir(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function sr(e){return!!e&&"integerValue"in e}function ar(e){return!!e&&"arrayValue"in e}function or(e){return!!e&&"nullValue"in e}function cr(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ur(e){return!!e&&"mapValue"in e}function lr(e){const t=(e?.mapValue?.fields||{})[Kn]?.stringValue;return t===jn}function dr(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return ln(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=dr(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=dr(e.arrayValue.values[n]);return t}return{...e}}function hr(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Qn}const pr={mapValue:{fields:{[Kn]:{stringValue:jn},[$n]:{arrayValue:{}}}}};function mr(e){return"nullValue"in e?Wn:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?ir(Vn.empty(),J.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?lr(e)?pr:{mapValue:{}}:b(35942,{value:e})}function gr(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?ir(Vn.empty(),J.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?pr:"mapValue"in e?lr(e)?{mapValue:{}}:Gn:b(61959,{value:e})}function fr(e,t){const n=Xn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function yr(e,t){const n=Xn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
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
 */class wr{constructor(e){this.value=e}static empty(){return new wr({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ur(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=dr(t)}setAll(e){let t=Y.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=dr(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());ur(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Yn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];ur(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){ln(t,(t,n)=>e[t]=n);for(const t of n)delete e[t]}clone(){return new wr(dr(this.value))}}function br(e){const t=[];return ln(e.fields,(e,n)=>{const r=new Y([e]);if(ur(n)){const e=br(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new bn(t)}
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
 */class Tr{constructor(e,t,n,r,i,s,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new Tr(e,0,de.min(),de.min(),de.min(),wr.empty(),0)}static newFoundDocument(e,t,n,r){return new Tr(e,1,t,de.min(),n,r,0)}static newNoDocument(e,t){return new Tr(e,2,t,de.min(),de.min(),wr.empty(),0)}static newUnknownDocument(e,t){return new Tr(e,3,t,de.min(),de.min(),wr.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(de.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=wr.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=wr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=de.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Tr&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Tr(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
class vr{constructor(e,t){this.position=e,this.inclusive=t}}function Sr(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],a=e.position[i];if(s.field.isKeyField())r=J.comparator(J.fromName(a.referenceValue),n.key);else{r=Xn(a,n.data.field(s.field))}if("desc"===s.dir&&(r*=-1),0!==r)break}return r}function Ir(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++){if(!Yn(e.position[n],t.position[n]))return!1}return!0}
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
 */class Er{constructor(e,t="asc"){this.field=e,this.dir=t}}function Cr(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
 */class Dr{}class xr extends Dr{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Mr(e,t,n):"array-contains"===t?new Ur(e,n):"in"===t?new zr(e,n):"not-in"===t?new Kr(e,n):"array-contains-any"===t?new Qr(e,n):new xr(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Br(e,n):new Lr(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Xn(t,this.value)):null!==t&&Hn(this.value)===Hn(t)&&this.matchesComparison(Xn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return b(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class kr extends Dr{constructor(e,t){super(),this.filters=e,this.op=t,this.memoizedFlattenedFilters=null}static create(e,t){return new kr(e,t)}matches(e){return Ar(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.memoizedFlattenedFilters||(this.memoizedFlattenedFilters=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.memoizedFlattenedFilters}getFilters(){return Object.assign([],this.filters)}}function Ar(e){return"and"===e.op}function _r(e){return"or"===e.op}function Nr(e){return Rr(e)&&Ar(e)}function Rr(e){for(const t of e.filters)if(t instanceof kr)return!1;return!0}function Or(e){if(e instanceof xr)return e.field.canonicalString()+e.op.toString()+tr(e.value);if(Nr(e))return e.filters.map(e=>Or(e)).join(",");{const t=e.filters.map(e=>Or(e)).join(",");return`${e.op}(${t})`}}function Pr(e,t){return e instanceof xr?function(e,t){return t instanceof xr&&e.op===t.op&&e.field.isEqual(t.field)&&Yn(e.value,t.value)}(e,t):e instanceof kr?function(e,t){if(t instanceof kr&&e.op===t.op&&e.filters.length===t.filters.length){return e.filters.reduce((e,n,r)=>e&&Pr(n,t.filters[r]),!0)}return!1}(e,t):void b(19439)}function Vr(e,t){const n=e.filters.concat(t);return kr.create(n,e.op)}function Fr(e){return e instanceof xr?function(e){return`${e.field.canonicalString()} ${e.op} ${tr(e.value)}`}(e):e instanceof kr?function(e){return e.op.toString()+" {"+e.getFilters().map(Fr).join(" ,")+"}"}(e):"Filter"}class Mr extends xr{constructor(e,t,n){super(e,t,n),this.key=J.fromName(n.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class Br extends xr{constructor(e,t){super(e,"in",t),this.keys=qr("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Lr extends xr{constructor(e,t){super(e,"not-in",t),this.keys=qr("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function qr(e,t){return(t.arrayValue?.values||[]).map(e=>J.fromName(e.referenceValue))}class Ur extends xr{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ar(t)&&Jn(t.arrayValue,this.value)}}class zr extends xr{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Jn(this.value.arrayValue,t)}}class Kr extends xr{constructor(e,t){super(e,"not-in",t)}matches(e){if(Jn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Jn(this.value.arrayValue,t)}}class Qr extends xr{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ar(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Jn(this.value.arrayValue,e))}}
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
 */class Gr{constructor(e,t=null,n=[],r=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this.memoizedCanonicalId=null}}function jr(e,t=null,n=[],r=[],i=null,s=null,a=null){return new Gr(e,t,n,r,i,s,a)}function $r(e){const t=I(e);if(null===t.memoizedCanonicalId){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Or(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Bn(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>tr(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>tr(e)).join(",")),t.memoizedCanonicalId=e}return t.memoizedCanonicalId}function Wr(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Cr(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Pr(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&(!!e.path.isEqual(t.path)&&(!!Ir(e.startAt,t.startAt)&&Ir(e.endAt,t.endAt)))}function Hr(e){return J.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Yr(e,t){return e.filters.filter(e=>e instanceof xr&&e.field.isEqual(t))}function Jr(e,t,n){let r=Wn,i=!0;for(const n of Yr(e,t)){let e=Wn,t=!0;switch(n.op){case"<":case"<=":e=mr(n.value);break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=Wn}fr({value:r,inclusive:i},{value:e,inclusive:t})<0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s){if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];fr({value:r,inclusive:i},{value:e,inclusive:n.inclusive})<0&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}function Xr(e,t,n){let r=Gn,i=!0;for(const n of Yr(e,t)){let e=Gn,t=!0;switch(n.op){case">=":case">":e=gr(n.value),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=Gn}yr({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s){if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];yr({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}
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
class Zr{constructor(e,t=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.memoizedNormalizedOrderBy=null,this.memoizedTarget=null,this.memoizedAggregateTarget=null,this.startAt,this.endAt}}function ei(e,t,n,r,i,s,a,o){return new Zr(e,t,n,r,i,s,a,o)}function ti(e){return new Zr(e)}function ni(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function ri(e){return J.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function ii(e){return null!==e.collectionGroup}function si(e){const t=I(e);if(null===t.memoizedNormalizedOrderBy){t.memoizedNormalizedOrderBy=[];const e=new Set;for(const n of t.explicitOrderBy)t.memoizedNormalizedOrderBy.push(n),e.add(n.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new fn(Y.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.memoizedNormalizedOrderBy.push(new Er(r,n))}),e.has(Y.keyField().canonicalString())||t.memoizedNormalizedOrderBy.push(new Er(Y.keyField(),n))}return t.memoizedNormalizedOrderBy}function ai(e){const t=I(e);return t.memoizedTarget||(t.memoizedTarget=ci(t,si(e))),t.memoizedTarget}function oi(e){const t=I(e);return t.memoizedAggregateTarget||(t.memoizedAggregateTarget=ci(t,e.explicitOrderBy)),t.memoizedAggregateTarget}function ci(e,t){if("F"===e.limitType)return jr(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new Er(e.field,t)});const n=e.endAt?new vr(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new vr(e.startAt.position,e.startAt.inclusive):null;return jr(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function ui(e,t){const n=e.filters.concat([t]);return new Zr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function li(e,t){const n=e.explicitOrderBy.concat([t]);return new Zr(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function di(e,t,n){return new Zr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function hi(e,t){return new Zr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function pi(e,t){return new Zr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function mi(e,t){return Wr(ai(e),ai(t))&&e.limitType===t.limitType}function gi(e){return`${$r(ai(e))}|lt:${e.limitType}`}function fi(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>Fr(e)).join(", ")}]`),Bn(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>tr(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>tr(e)).join(",")),`Target(${t})`}(ai(e))}; limitType=${e.limitType})`}function yi(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):J.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of si(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){if(e.startAt&&!function(e,t,n){const r=Sr(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,si(e),t))return!1;if(e.endAt&&!function(e,t,n){const r=Sr(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,si(e),t))return!1;return!0}(e,t)}function wi(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function bi(e){return(t,n)=>{let r=!1;for(const i of si(e)){const e=Ti(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function Ti(e,t,n){const r=e.field.isKeyField()?J.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Xn(r,i):b(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return b(19790,{direction:e.dir})}}
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
 */class vi{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){ln(this.inner,(t,n)=>{for(const[t,r]of n)e(t,r)})}isEmpty(){return hn(this.inner)}size(){return this.innerSize}}
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
 */const Si=new pn(J.comparator);function Ii(){return Si}const Ei=new pn(J.comparator);function Ci(...e){let t=Ei;for(const n of e)t=t.insert(n.key,n);return t}function Di(e){let t=Ei;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function xi(){return Ai()}function ki(){return Ai()}function Ai(){return new vi(e=>e.toString(),(e,t)=>e.isEqual(t))}const _i=new pn(J.comparator);const Ni=new fn(J.comparator);function Ri(...e){let t=Ni;for(const n of e)t=t.add(n);return t}const Oi=new fn(B);function Pi(){return Oi}
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
 */function Vi(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ln(t)?"-0":t}}function Fi(e){return{integerValue:""+e}}function Mi(e,t){return Un(t)?Fi(t):Vi(e,t)}
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
 */class Bi{constructor(){this._=void 0}}function Li(e,t,n){return e instanceof zi?function(e,t){const n={fields:{[xn]:{stringValue:Dn},[An]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&_n(t)&&(t=Nn(t)),t&&(n.fields[kn]=t),{mapValue:n}}(n,t):e instanceof Ki?Qi(e,t):e instanceof Gi?ji(e,t):function(e,t){const n=Ui(e,t),r=Wi(n)+Wi(e.operand);return sr(n)&&sr(e.operand)?Fi(r):Vi(e.serializer,r)}(e,t)}function qi(e,t,n){return e instanceof Ki?Qi(e,t):e instanceof Gi?ji(e,t):n}function Ui(e,t){return e instanceof $i?sr(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null;var n}class zi extends Bi{}class Ki extends Bi{constructor(e){super(),this.elements=e}}function Qi(e,t){const n=Hi(t);for(const t of e.elements)n.some(e=>Yn(e,t))||n.push(t);return{arrayValue:{values:n}}}class Gi extends Bi{constructor(e){super(),this.elements=e}}function ji(e,t){let n=Hi(t);for(const t of e.elements)n=n.filter(e=>!Yn(e,t));return{arrayValue:{values:n}}}class $i extends Bi{constructor(e,t){super(),this.serializer=e,this.operand=t}}function Wi(e){return En(e.integerValue||e.doubleValue)}function Hi(e){return ar(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
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
 */class Yi{constructor(e,t){this.field=e,this.transform=t}}function Ji(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Ki&&t instanceof Ki||e instanceof Gi&&t instanceof Gi?K(e.elements,t.elements,Yn):e instanceof $i&&t instanceof $i?Yn(e.operand,t.operand):e instanceof zi&&t instanceof zi}(e.transform,t.transform)}class Xi{constructor(e,t){this.version=e,this.transformResults=t}}class Zi{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Zi}static exists(e){return new Zi(void 0,e)}static updateTime(e){return new Zi(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function es(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class ts{}function ns(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new hs(e.key,Zi.none()):new os(e.key,e.data,Zi.none());{const n=e.data,r=wr.empty();let i=new fn(Y.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new cs(e.key,r,new bn(i.toArray()),Zi.none())}}function rs(e,t,n){e instanceof os?function(e,t,n){const r=e.value.clone(),i=ls(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof cs?function(e,t,n){if(!es(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=ls(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(us(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function is(e,t,n,r){return e instanceof os?function(e,t,n,r){if(!es(e.precondition,t))return n;const i=e.value.clone(),s=ds(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof cs?function(e,t,n,r){if(!es(e.precondition,t))return n;const i=ds(e.fieldTransforms,r,t),s=t.data;if(s.setAll(us(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)return null;return n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){if(es(e.precondition,t))return t.convertToNoDocument(t.version).setHasLocalMutations(),null;return n}(e,t,n)}function ss(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=Ui(r.transform,e||null);null!=i&&(null===n&&(n=wr.empty()),n.set(r.field,i))}return n||null}function as(e,t){return e.type===t.type&&(!!e.key.isEqual(t.key)&&(!!e.precondition.isEqual(t.precondition)&&(!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&K(e,t,(e,t)=>Ji(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)))))}class os extends ts{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class cs extends ts{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function us(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function ls(e,t,n){const r=new Map;v(e.length===n.length,32656,{serverTransformResultCount:n.length,fieldTransformCount:e.length});for(let i=0;i<n.length;i++){const s=e[i],a=s.transform,o=t.data.field(s.field);r.set(s.field,qi(a,o,n[i]))}return r}function ds(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,Li(e,s,t))}return r}class hs extends ts{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ps extends ts{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */class ms{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];if(r.key.isEqual(e.key)){rs(r,e,n[t])}}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=is(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=is(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=ki();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let a=this.applyToLocalView(s,i.mutatedFields);a=t.has(r.key)?null:a;const o=ns(s,a);null!==o&&n.set(r.key,o),s.isValidDocument()||s.convertToNoDocument(de.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ri())}isEqual(e){return this.batchId===e.batchId&&K(this.mutations,e.mutations,(e,t)=>as(e,t))&&K(this.baseMutations,e.baseMutations,(e,t)=>as(e,t))}}class gs{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){v(e.mutations.length===n.length,58842,{mutationsSent:e.mutations.length,resultsReceived:n.length});let r=_i;const i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new gs(e,t,n,r)}}
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
 */class fs{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
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
 */class ys{constructor(e,t){this.count=e,this.unchangedNames=t}}
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
 */var ws;function bs(e){switch(e){case E.OK:return b(64938);case E.CANCELLED:case E.UNKNOWN:case E.DEADLINE_EXCEEDED:case E.RESOURCE_EXHAUSTED:case E.INTERNAL:case E.UNAVAILABLE:case E.UNAUTHENTICATED:return!1;case E.INVALID_ARGUMENT:case E.NOT_FOUND:case E.ALREADY_EXISTS:case E.PERMISSION_DENIED:case E.FAILED_PRECONDITION:case E.ABORTED:case E.OUT_OF_RANGE:case E.UNIMPLEMENTED:case E.DATA_LOSS:return!0;default:return b(15467,{code:e})}}function Ts(e){if(void 0===e)return f("GRPC error has no .code"),E.UNKNOWN;switch(e){case ws.OK:return E.OK;case ws.CANCELLED:return E.CANCELLED;case ws.UNKNOWN:return E.UNKNOWN;case ws.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case ws.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case ws.INTERNAL:return E.INTERNAL;case ws.UNAVAILABLE:return E.UNAVAILABLE;case ws.UNAUTHENTICATED:return E.UNAUTHENTICATED;case ws.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case ws.NOT_FOUND:return E.NOT_FOUND;case ws.ALREADY_EXISTS:return E.ALREADY_EXISTS;case ws.PERMISSION_DENIED:return E.PERMISSION_DENIED;case ws.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case ws.ABORTED:return E.ABORTED;case ws.OUT_OF_RANGE:return E.OUT_OF_RANGE;case ws.UNIMPLEMENTED:return E.UNIMPLEMENTED;case ws.DATA_LOSS:return E.DATA_LOSS;default:return b(39323,{code:e})}}
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
 */!function(e){e[e.OK=0]="OK",e[e.CANCELLED=1]="CANCELLED",e[e.UNKNOWN=2]="UNKNOWN",e[e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",e[e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",e[e.NOT_FOUND=5]="NOT_FOUND",e[e.ALREADY_EXISTS=6]="ALREADY_EXISTS",e[e.PERMISSION_DENIED=7]="PERMISSION_DENIED",e[e.UNAUTHENTICATED=16]="UNAUTHENTICATED",e[e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",e[e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",e[e.ABORTED=10]="ABORTED",e[e.OUT_OF_RANGE=11]="OUT_OF_RANGE",e[e.UNIMPLEMENTED=12]="UNIMPLEMENTED",e[e.INTERNAL=13]="INTERNAL",e[e.UNAVAILABLE=14]="UNAVAILABLE",e[e.DATA_LOSS=15]="DATA_LOSS"}(ws||(ws={}));class vs extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
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
 */let Ss=null;function Is(e){if(Ss)throw new Error("a TestingHooksSpi instance is already set");Ss=e}
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
 */function Es(){return new s.TextEncoder}
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
const Cs=new r.Integer([4294967295,4294967295],0);function Ds(e){const t=Es().encode(e),n=new r.Md5;return n.update(t),new Uint8Array(n.digest())}function xs(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),a=t.getUint32(12,!0);return[new r.Integer([n,i],0),new r.Integer([s,a],0)]}class ks{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new As(`Invalid padding: ${t}`);if(n<0)throw new As(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new As(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new As(`Invalid padding when bitmap length is 0: ${t}`);this.bitCount=8*e.length-t,this.bitCountInInteger=r.Integer.fromNumber(this.bitCount)}getBitIndex(e,t,n){let i=e.add(t.multiply(r.Integer.fromNumber(n)));return 1===i.compare(Cs)&&(i=new r.Integer([i.getBits(0),i.getBits(1)],0)),i.modulo(this.bitCountInInteger).toNumber()}isBitSet(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.bitCount)return!1;const t=Ds(e),[n,r]=xs(t);for(let e=0;e<this.hashCount;e++){const t=this.getBitIndex(n,r,e);if(!this.isBitSet(t))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new ks(i,r,t);return n.forEach(e=>s.insert(e)),s}insert(e){if(0===this.bitCount)return;const t=Ds(e),[n,r]=xs(t);for(let e=0;e<this.hashCount;e++){const t=this.getBitIndex(n,r,e);this.setBit(t)}}setBit(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class As extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
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
 */class _s{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Ns.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new _s(de.min(),r,new pn(B),Ii(),Ri())}}class Ns{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ns(n,t,Ri(),Ri(),Ri())}}
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
 */class Rs{constructor(e,t,n,r){this.updatedTargetIds=e,this.removedTargetIds=t,this.key=n,this.newDoc=r}}class Os{constructor(e,t){this.targetId=e,this.existenceFilter=t}}class Ps{constructor(e,t,n=vn.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Vs{constructor(){this.pendingResponses=0,this.documentChanges=Bs(),this._resumeToken=vn.EMPTY_BYTE_STRING,this._current=!1,this._hasPendingChanges=!0}get current(){return this._current}get resumeToken(){return this._resumeToken}get isPending(){return 0!==this.pendingResponses}get hasPendingChanges(){return this._hasPendingChanges}updateResumeToken(e){e.approximateByteSize()>0&&(this._hasPendingChanges=!0,this._resumeToken=e)}toTargetChange(){let e=Ri(),t=Ri(),n=Ri();return this.documentChanges.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:b(38017,{changeType:i})}}),new Ns(this._resumeToken,this._current,e,t,n)}clearPendingChanges(){this._hasPendingChanges=!1,this.documentChanges=Bs()}addDocumentChange(e,t){this._hasPendingChanges=!0,this.documentChanges=this.documentChanges.insert(e,t)}removeDocumentChange(e){this._hasPendingChanges=!0,this.documentChanges=this.documentChanges.remove(e)}recordPendingTargetRequest(){this.pendingResponses+=1}recordTargetResponse(){this.pendingResponses-=1,v(this.pendingResponses>=0,3241,{pendingResponses:this.pendingResponses})}markCurrent(){this._hasPendingChanges=!0,this._current=!0}}class Fs{constructor(e){this.metadataProvider=e,this.targetStates=new Map,this.pendingDocumentUpdates=Ii(),this.pendingDocumentUpdatesByTarget=Ms(),this.pendingDocumentTargetMapping=Ms(),this.pendingTargetResets=new pn(B)}handleDocumentChange(e){for(const t of e.updatedTargetIds)e.newDoc&&e.newDoc.isFoundDocument()?this.addDocumentToTarget(t,e.newDoc):this.removeDocumentFromTarget(t,e.key,e.newDoc);for(const t of e.removedTargetIds)this.removeDocumentFromTarget(t,e.key,e.newDoc)}handleTargetChange(e){this.forEachTarget(e,t=>{const n=this.ensureTargetState(t);switch(e.state){case 0:this.isActiveTarget(t)&&n.updateResumeToken(e.resumeToken);break;case 1:n.recordTargetResponse(),n.isPending||n.clearPendingChanges(),n.updateResumeToken(e.resumeToken);break;case 2:n.recordTargetResponse(),n.isPending||this.removeTarget(t);break;case 3:this.isActiveTarget(t)&&(n.markCurrent(),n.updateResumeToken(e.resumeToken));break;case 4:this.isActiveTarget(t)&&(this.resetTarget(t),n.updateResumeToken(e.resumeToken));break;default:b(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.targetStates.forEach((e,n)=>{this.isActiveTarget(n)&&t(n)})}handleExistenceFilter(e){const t=e.targetId,n=e.existenceFilter.count,r=this.targetDataForActiveTarget(t);if(r){const i=r.target;if(Hr(i))if(0===n){const e=new J(i.path);this.removeDocumentFromTarget(t,e,Tr.newNoDocument(e,de.min()))}else v(1===n,20013,{expectedCount:n});else{const r=this.getCurrentDocumentCountForTarget(t);if(r!==n){const n=this.parseBloomFilter(e),i=n?this.applyBloomFilter(n,e,r):1;if(0!==i){this.resetTarget(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.pendingTargetResets=this.pendingTargetResets.insert(t,e)}Ss?.notifyOnExistenceFilterMismatch(function(e,t,n,r,i){const s={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},a=t.unchangedNames;a&&(s.bloomFilter={applied:0===i,hashCount:a?.hashCount??0,bitmapLength:a?.bits?.bitmap?.length??0,padding:a?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1});return s}
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
 */(r,e.existenceFilter,this.metadataProvider.getDatabaseId(),n,i))}}}}parseBloomFilter(e){const t=e.existenceFilter.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,a;try{s=Cn(n).toUint8Array()}catch(e){if(e instanceof vs)return y("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{a=new ks(s,r,i)}catch(e){return y(e instanceof As?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===a.bitCount?null:a}applyBloomFilter(e,t,n){return t.existenceFilter.count===n-this.filterRemovedDocuments(e,t.targetId)?0:2}filterRemovedDocuments(e,t){const n=this.metadataProvider.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const i=this.metadataProvider.getDatabaseId(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.removeDocumentFromTarget(t,n,null),r++)}),r}createRemoteEvent(e){const t=new Map;this.targetStates.forEach((n,r)=>{const i=this.targetDataForActiveTarget(r);if(i){if(n.current&&Hr(i.target)){const t=new J(i.target.path);this.ensureDocumentUpdateByTarget(t).has(r)||this.targetContainsDocument(r,t)||this.removeDocumentFromTarget(r,t,Tr.newNoDocument(t,e))}n.hasPendingChanges&&(t.set(r,n.toTargetChange()),n.clearPendingChanges())}});let n=Ri();this.pendingDocumentTargetMapping.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.targetDataForActiveTarget(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.pendingDocumentUpdates.forEach((t,n)=>n.setReadTime(e));const r=new _s(e,t,this.pendingTargetResets,this.pendingDocumentUpdates,n);return this.pendingDocumentUpdates=Ii(),this.pendingDocumentUpdatesByTarget=Ms(),this.pendingDocumentTargetMapping=Ms(),this.pendingTargetResets=new pn(B),r}addDocumentToTarget(e,t){if(!this.isActiveTarget(e))return;const n=this.targetContainsDocument(e,t.key)?2:0;this.ensureTargetState(e).addDocumentChange(t.key,n),this.pendingDocumentUpdates=this.pendingDocumentUpdates.insert(t.key,t),this.pendingDocumentUpdatesByTarget=this.pendingDocumentUpdatesByTarget.insert(t.key,this.ensureDocumentUpdateByTarget(t.key).add(e)),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(t.key,this.ensureDocumentTargetMapping(t.key).add(e))}removeDocumentFromTarget(e,t,n){if(!this.isActiveTarget(e))return;const r=this.ensureTargetState(e);this.targetContainsDocument(e,t)?r.addDocumentChange(t,1):r.removeDocumentChange(t),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(t,this.ensureDocumentTargetMapping(t).delete(e)),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(t,this.ensureDocumentTargetMapping(t).add(e)),n&&(this.pendingDocumentUpdates=this.pendingDocumentUpdates.insert(t,n))}removeTarget(e){this.targetStates.delete(e)}getCurrentDocumentCountForTarget(e){const t=this.ensureTargetState(e).toTargetChange();return this.metadataProvider.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}recordPendingTargetRequest(e){this.ensureTargetState(e).recordPendingTargetRequest()}ensureTargetState(e){let t=this.targetStates.get(e);return t||(t=new Vs,this.targetStates.set(e,t)),t}ensureDocumentTargetMapping(e){let t=this.pendingDocumentTargetMapping.get(e);return t||(t=new fn(B),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(e,t)),t}ensureDocumentUpdateByTarget(e){let t=this.pendingDocumentUpdatesByTarget.get(e);return t||(t=new fn(B),this.pendingDocumentUpdatesByTarget=this.pendingDocumentUpdatesByTarget.insert(e,t)),t}isActiveTarget(e){const t=null!==this.targetDataForActiveTarget(e);return t||g("WatchChangeAggregator","Detected inactive target",e),t}targetDataForActiveTarget(e){const t=this.targetStates.get(e);return t&&t.isPending?null:this.metadataProvider.getTargetDataForTarget(e)}resetTarget(e){this.targetStates.set(e,new Vs);this.metadataProvider.getRemoteKeysForTarget(e).forEach(t=>{this.removeDocumentFromTarget(e,t,null)})}targetContainsDocument(e,t){return this.metadataProvider.getRemoteKeysForTarget(e).has(t)}}function Ms(){return new pn(J.comparator)}function Bs(){return new pn(J.comparator)}const Ls=(()=>{const e={asc:"ASCENDING",desc:"DESCENDING"};return e})(),qs=(()=>{const e={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return e})(),Us=(()=>{const e={and:"AND",or:"OR"};return e})();class zs{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ks(e,t){return e.useProto3Json||Bn(t)?t:{value:t}}function Qs(e,t){if(e.useProto3Json){return`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`}return{seconds:""+t.seconds,nanos:t.nanoseconds}}function Gs(e){const t=In(e);return new le(t.seconds,t.nanos)}function js(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function $s(e,t){return Qs(e,t.toTimestamp())}function Ws(e){return v(!!e,49232),de.fromTimestamp(Gs(e))}function Hs(e,t){return Ys(e,t).canonicalString()}function Ys(e,t){const n=function(e){return new W(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Js(e){const t=W.fromString(e);return v(Ca(t),10190,{key:t.toString()}),t}function Xs(e,t){return Hs(e.databaseId,t.path)}function Zs(e,t){const n=Js(t);if(n.get(1)!==e.databaseId.projectId)throw new C(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new C(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new J(ra(n))}function ea(e,t){return Hs(e.databaseId,t)}function ta(e){const t=Js(e);return 4===t.length?W.emptyPath():ra(t)}function na(e){return new W(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function ra(e){return v(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function ia(e,t,n){return{name:Xs(e,t),fields:n.value.mapValue.fields}}function sa(e,t,n){const r={};t.transaction?.length&&(r.transaction=t.transaction);const i=t.executionTime?Ws(t.executionTime):void 0;return r.executionTime=i,n&&(r.key=n.name?Zs(e,n.name):void 0,r.fields=new wr({mapValue:{fields:n.fields}}),r.createTime=n.createTime?Ws(n.createTime):void 0,r.updateTime=n.updateTime?Ws(n.updateTime):void 0),r}function aa(e,t,n){const r=Zs(e,t.name),i=Ws(t.updateTime),s=t.createTime?Ws(t.createTime):de.min(),a=new wr({mapValue:{fields:t.fields}}),o=Tr.newFoundDocument(r,i,s,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function oa(e,t){return"found"in t?function(e,t){v(!!t.found,43571),t.found.name,t.found.updateTime;const n=Zs(e,t.found.name),r=Ws(t.found.updateTime),i=t.found.createTime?Ws(t.found.createTime):de.min(),s=new wr({mapValue:{fields:t.found.fields}});return Tr.newFoundDocument(n,r,i,s)}(e,t):"missing"in t?function(e,t){v(!!t.missing,3894),v(!!t.readTime,22933);const n=Zs(e,t.missing),r=Ws(t.readTime);return Tr.newNoDocument(n,r)}(e,t):b(7234,{result:t})}function ca(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:b(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.useProto3Json?(v(void 0===t||"string"==typeof t,58123),vn.fromBase64String(t||"")):(v(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),vn.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,o=a&&function(e){const t=void 0===e.code?E.UNKNOWN:Ts(e.code);return new C(t,e.message||"")}(a);n=new Ps(r,i,s,o||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Zs(e,r.document.name),s=Ws(r.document.updateTime),a=r.document.createTime?Ws(r.document.createTime):de.min(),o=new wr({mapValue:{fields:r.document.fields}}),c=Tr.newFoundDocument(i,s,a,o),u=r.targetIds||[],l=r.removedTargetIds||[];n=new Rs(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Zs(e,r.document),s=r.readTime?Ws(r.readTime):de.min(),a=Tr.newNoDocument(i,s),o=r.removedTargetIds||[];n=new Rs([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Zs(e,r.document),s=r.removedTargetIds||[];n=new Rs([],s,i,null)}else{if(!("filter"in t))return b(11601,{change:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new ys(r,i),a=e.targetId;n=new Os(a,s)}}return n}function ua(e,t){let n;if(t instanceof os)n={update:ia(e,t.key,t.value)};else if(t instanceof hs)n={delete:Xs(e,t.key)};else if(t instanceof cs)n={update:ia(e,t.key,t.data),updateMask:Ea(t.fieldMask)};else{if(!(t instanceof ps))return b(16599,{mutationType:t.type});n={verify:Xs(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof zi)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ki)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Gi)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof $i)return{fieldPath:t.field.canonicalString(),increment:n.operand};throw b(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:$s(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:b(27497)}(e,t.precondition)),n}function la(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?Zi.updateTime(Ws(e.updateTime)):void 0!==e.exists?Zi.exists(e.exists):Zi.none()}(t.currentDocument):Zi.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)v("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new zi;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new Ki(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new Gi(e)}else"increment"in t?n=new $i(e,t.increment):b(16584,{proto:t});const r=Y.fromServerFormat(t.fieldPath);return new Yi(r,n)}(e,t)):[];if(t.update){t.update.name;const i=Zs(e,t.update.name),s=new wr({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new bn(t.map(e=>Y.fromServerFormat(e)))}(t.updateMask);return new cs(i,s,e,n,r)}return new os(i,s,n,r)}if(t.delete){const r=Zs(e,t.delete);return new hs(r,n)}if(t.verify){const r=Zs(e,t.verify);return new ps(r,n)}return b(1463,{proto:t})}function da(e,t){return e&&e.length>0?(v(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?Ws(e.updateTime):Ws(t);return n.isEqual(de.min())&&(n=Ws(t)),new Xi(n,e.transformResults||[])}(e,t))):[]}function ha(e,t){return{documents:[ea(e,t.path)]}}function pa(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=ea(e,i);const s=function(e){if(0===e.length)return;return Ia(kr.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const a=function(e){if(0===e.length)return;return e.map(e=>function(e){return{field:va(e.field),direction:wa(e.dir)}}(e))}(t.orderBy);a&&(n.structuredQuery.orderBy=a);const o=Ks(e,t.limit);var c;return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(c=t.startAt).inclusive,values:c.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{queryTarget:n,parent:i}}function ma(e,t,n,r){const{queryTarget:i,parent:s}=pa(e,t),a={},o=[];let c=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+c++;a[t]=e.alias,"count"===e.aggregateType?o.push({alias:t,count:{}}):"avg"===e.aggregateType?o.push({alias:t,avg:{field:va(e.fieldPath)}}):"sum"===e.aggregateType&&o.push({alias:t,sum:{field:va(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:o,structuredQuery:i.structuredQuery},parent:i.parent},aliasMap:a,parent:s}}function ga(e){let t=ta(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){v(1===r,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=ya(e);if(t instanceof kr&&Nr(t))return t.getFilters();return[t]}(n.where));let a=[];n.orderBy&&(a=n.orderBy.map(e=>function(e){return new Er(Sa(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e)));let o=null;n.limit&&(o=function(e){let t;return t="object"==typeof e?e.value:e,Bn(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new vr(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new vr(n,t)}(n.endAt)),ei(t,i,a,s,o,"F",c,u)}function fa(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return b(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}function ya(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Sa(e.unaryFilter.field);return xr.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Sa(e.unaryFilter.field);return xr.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Sa(e.unaryFilter.field);return xr.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Sa(e.unaryFilter.field);return xr.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return b(61313);default:return b(60726)}}(e):void 0!==e.fieldFilter?function(e){return xr.create(Sa(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return b(58110);default:return b(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return kr.create(e.compositeFilter.filters.map(e=>ya(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return b(1026)}}(e.compositeFilter.op))}(e):b(30097,{filter:e})}function wa(e){return Ls[e]}function ba(e){return qs[e]}function Ta(e){return Us[e]}function va(e){return{fieldPath:e.canonicalString()}}function Sa(e){return Y.fromServerFormat(e.fieldPath)}function Ia(e){return e instanceof xr?function(e){if("=="===e.op){if(cr(e.value))return{unaryFilter:{field:va(e.field),op:"IS_NAN"}};if(or(e.value))return{unaryFilter:{field:va(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(cr(e.value))return{unaryFilter:{field:va(e.field),op:"IS_NOT_NAN"}};if(or(e.value))return{unaryFilter:{field:va(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:va(e.field),op:ba(e.op),value:e.value}}}(e):e instanceof kr?function(e){const t=e.getFilters().map(e=>Ia(e));if(1===t.length)return t[0];return{compositeFilter:{op:Ta(e.op),filters:t}}}(e):b(54877,{filter:e})}function Ea(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Ca(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function Da(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function xa(e,t){const n={fields:{}};return t.forEach((t,r)=>{if("string"!=typeof r)throw new Error(`Cannot encode map with non-string key: ${r}`);n.fields[r]=t._toProto(e)}),{mapValue:n}}function ka(e){return{stringValue:e}}function Aa(e){return{pipelineValue:e}}
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
 */class _a{constructor(e,t,n,r,i=de.min(),s=de.min(),a=vn.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new _a(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new _a(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new _a(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new _a(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
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
 */class Na{constructor(e){this.remoteSerializer=e}}function Ra(e,t){let n;if(t.document)n=aa(e.remoteSerializer,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=J.fromSegments(t.noDocument.path),r=Fa(t.noDocument.readTime);n=Tr.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return b(56709);{const e=J.fromSegments(t.unknownDocument.path),r=Fa(t.unknownDocument.version);n=Tr.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new le(e[0],e[1]);return de.fromTimestamp(t)}(t.readTime)),n}function Oa(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Pa(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:Xs(e,t.key),fields:t.data.value.mapValue.fields,updateTime:Qs(e,t.version.toTimestamp()),createTime:Qs(e,t.createTime.toTimestamp())}}(e.remoteSerializer,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Va(t.version)};else{if(!t.isUnknownDocument())return b(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:Va(t.version)}}return r}function Pa(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Va(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Fa(e){const t=new le(e.seconds,e.nanoseconds);return de.fromTimestamp(t)}function Ma(e,t){const n=(t.baseMutations||[]).map(t=>la(e.remoteSerializer,t));for(let e=0;e<t.mutations.length-1;++e){const n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const r=t.mutations.map(t=>la(e.remoteSerializer,t)),i=le.fromMillis(t.localWriteTimeMs);return new ms(t.batchId,i,n,r)}function Ba(e){const t=Fa(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?Fa(e.lastLimboFreeSnapshotVersion):de.min();let r;return r=void 0!==e.query.documents?function(e){const t=e.documents.length;return v(1===t,1966,{count:t}),ai(ti(ta(e.documents[0])))}(e.query):function(e){return ai(ga(e))}(e.query),new _a(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,vn.fromBase64String(e.resumeToken))}function La(e,t){const n=Va(t.snapshotVersion),r=Va(t.lastLimboFreeSnapshotVersion);let i;i=Hr(t.target)?ha(e.remoteSerializer,t.target):pa(e.remoteSerializer,t.target).queryTarget;const s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:$r(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function qa(e){const t=ga({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?di(t,t.limit,"L"):t}function Ua(e,t){return new fs(t.largestBatchId,la(e.remoteSerializer,t.overlayMutation))}function za(e,t){const n=t.path.lastSegment();return[e,Qe(t.path.popLast()),n]}function Ka(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Va(r.readTime),documentKey:Qe(r.documentKey.path),largestBatchId:r.largestBatchId}}
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
 */class Qa{getBundleMetadata(e,t){return Ga(e).get(t).next(e=>{if(e)return{id:(t=e).bundleId,createTime:Fa(t.createTime),version:t.version};var t})}saveBundleMetadata(e,t){return Ga(e).put({bundleId:(n=t).id,createTime:Va(Ws(n.createTime)),version:n.version});var n}getNamedQuery(e,t){return ja(e).get(t).next(e=>{if(e)return{name:(t=e).name,query:qa(t.bundledQuery),readTime:Fa(t.readTime)};var t})}saveNamedQuery(e,t){return ja(e).put(function(e){return{name:e.name,readTime:Va(Ws(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function Ga(e){return cn(e,kt)}function ja(e){return cn(e,_t)}
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
 */class $a{constructor(e,t){this.serializer=e,this.userId=t}static forUser(e,t){const n=t.uid||"";return new $a(e,n)}getOverlay(e,t){return Wa(e).get(za(this.userId,t)).next(e=>e?Ua(this.serializer,e):null)}getOverlays(e,t){const n=xi();return xe.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,i)=>{const s=new fs(t,i);r.push(this.saveOverlay(e,s))}),xe.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(Qe(e.getCollectionPath())));const i=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(Wa(e).deleteAll(jt,r))}),xe.waitFor(i)}getOverlaysForCollection(e,t,n){const r=xi(),i=Qe(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Wa(e).loadAll(jt,s).next(e=>{for(const t of e){const e=Ua(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const i=xi();let s;const a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Wa(e).iterate({index:Wt,range:a},(e,t,n)=>{const a=Ua(this.serializer,t);i.size()<r||a.largestBatchId===s?(i.set(a.getKey(),a),s=a.largestBatchId):n.done()}).next(()=>i)}saveOverlay(e,t){return Wa(e).put(function(e,t,n){const[r,i,s]=za(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:ua(e.remoteSerializer,n.mutation)}}(this.serializer,this.userId,t))}}function Wa(e){return cn(e,Qt)}
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
 */class Ha{globalsStore(e){return cn(e,Yt)}getSessionToken(e){return this.globalsStore(e).get("sessionToken").next(e=>{const t=e?.value;return t?vn.fromUint8Array(t):vn.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.globalsStore(e).put({name:"sessionToken",value:t.toUint8Array()})}}
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
 */class Ya{constructor(){}writeIndexValue(e,t){this.writeIndexValueAux(e,t),t.writeInfinity()}writeIndexValueAux(e,t){if("nullValue"in e)this.writeValueTypeLabel(t,5);else if("booleanValue"in e)this.writeValueTypeLabel(t,10),t.writeNumber(e.booleanValue?1:0);else if("integerValue"in e)this.writeValueTypeLabel(t,15),t.writeNumber(En(e.integerValue));else if("doubleValue"in e){const n=En(e.doubleValue);isNaN(n)?this.writeValueTypeLabel(t,13):(this.writeValueTypeLabel(t,15),Ln(n)?t.writeNumber(0):t.writeNumber(n))}else if("timestampValue"in e){let n=e.timestampValue;this.writeValueTypeLabel(t,20),"string"==typeof n&&(n=In(n)),t.writeString(`${n.seconds||""}`),t.writeNumber(n.nanos||0)}else if("stringValue"in e)this.writeIndexString(e.stringValue,t),this.writeTruncationMarker(t);else if("bytesValue"in e)this.writeValueTypeLabel(t,30),t.writeBytes(Cn(e.bytesValue)),this.writeTruncationMarker(t);else if("referenceValue"in e)this.writeIndexEntityRef(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.writeValueTypeLabel(t,45),t.writeNumber(n.latitude||0),t.writeNumber(n.longitude||0)}else"mapValue"in e?hr(e)?this.writeValueTypeLabel(t,Number.MAX_SAFE_INTEGER):lr(e)?this.writeIndexVector(e.mapValue,t):(this.writeIndexMap(e.mapValue,t),this.writeTruncationMarker(t)):"arrayValue"in e?(this.writeIndexArray(e.arrayValue,t),this.writeTruncationMarker(t)):b(19022,{indexValue:e})}writeIndexString(e,t){this.writeValueTypeLabel(t,25),this.writeUnlabeledIndexString(e,t)}writeUnlabeledIndexString(e,t){t.writeString(e)}writeIndexMap(e,t){const n=e.fields||{};this.writeValueTypeLabel(t,55);for(const e of Object.keys(n))this.writeIndexString(e,t),this.writeIndexValueAux(n[e],t)}writeIndexVector(e,t){const n=e.fields||{};this.writeValueTypeLabel(t,53);const r=$n,i=n[r].arrayValue?.values?.length||0;this.writeValueTypeLabel(t,15),t.writeNumber(En(i)),this.writeIndexString(r,t),this.writeIndexValueAux(n[r],t)}writeIndexArray(e,t){const n=e.values||[];this.writeValueTypeLabel(t,50);for(const e of n)this.writeIndexValueAux(e,t)}writeIndexEntityRef(e,t){this.writeValueTypeLabel(t,37);J.fromName(e).path.forEach(e=>{this.writeValueTypeLabel(t,60),this.writeUnlabeledIndexString(e,t)})}writeValueTypeLabel(e,t){e.writeNumber(t)}writeTruncationMarker(e){e.writeNumber(2)}}Ya.INSTANCE=new Ya;
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
 */const Ja=255;function Xa(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function Za(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=Xa(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class eo{constructor(){this.buffer=new Uint8Array(1024),this.position=0}writeBytesAscending(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.writeByteAscending(n.value),n=t.next();this.writeSeparatorAscending()}writeBytesDescending(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.writeByteDescending(n.value),n=t.next();this.writeSeparatorDescending()}writeUtf8Ascending(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.writeByteAscending(e);else if(e<2048)this.writeByteAscending(960|e>>>6),this.writeByteAscending(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.writeByteAscending(480|e>>>12),this.writeByteAscending(128|63&e>>>6),this.writeByteAscending(128|63&e);else{const e=t.codePointAt(0);this.writeByteAscending(240|e>>>18),this.writeByteAscending(128|63&e>>>12),this.writeByteAscending(128|63&e>>>6),this.writeByteAscending(128|63&e)}}this.writeSeparatorAscending()}writeUtf8Descending(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.writeByteDescending(e);else if(e<2048)this.writeByteDescending(960|e>>>6),this.writeByteDescending(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.writeByteDescending(480|e>>>12),this.writeByteDescending(128|63&e>>>6),this.writeByteDescending(128|63&e);else{const e=t.codePointAt(0);this.writeByteDescending(240|e>>>18),this.writeByteDescending(128|63&e>>>12),this.writeByteDescending(128|63&e>>>6),this.writeByteDescending(128|63&e)}}this.writeSeparatorDescending()}writeNumberAscending(e){const t=this.toOrderedBits(e),n=Za(t);this.ensureAvailable(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}writeNumberDescending(e){const t=this.toOrderedBits(e),n=Za(t);this.ensureAvailable(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}writeInfinityAscending(){this.writeEscapedByteAscending(Ja),this.writeEscapedByteAscending(255)}writeInfinityDescending(){this.writeEscapedByteDescending(Ja),this.writeEscapedByteDescending(255)}reset(){this.position=0}seed(e){this.ensureAvailable(e.length),this.buffer.set(e,this.position),this.position+=e.length}encodedBytes(){return this.buffer.slice(0,this.position)}toOrderedBits(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}writeByteAscending(e){const t=255&e;0===t?(this.writeEscapedByteAscending(0),this.writeEscapedByteAscending(255)):t===Ja?(this.writeEscapedByteAscending(Ja),this.writeEscapedByteAscending(0)):this.writeEscapedByteAscending(t)}writeByteDescending(e){const t=255&e;0===t?(this.writeEscapedByteDescending(0),this.writeEscapedByteDescending(255)):t===Ja?(this.writeEscapedByteDescending(Ja),this.writeEscapedByteDescending(0)):this.writeEscapedByteDescending(e)}writeSeparatorAscending(){this.writeEscapedByteAscending(0),this.writeEscapedByteAscending(1)}writeSeparatorDescending(){this.writeEscapedByteDescending(0),this.writeEscapedByteDescending(1)}writeEscapedByteAscending(e){this.ensureAvailable(1),this.buffer[this.position++]=e}writeEscapedByteDescending(e){this.ensureAvailable(1),this.buffer[this.position++]=~e}ensureAvailable(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class to{constructor(e){this.orderedCode=e}writeBytes(e){this.orderedCode.writeBytesAscending(e)}writeString(e){this.orderedCode.writeUtf8Ascending(e)}writeNumber(e){this.orderedCode.writeNumberAscending(e)}writeInfinity(){this.orderedCode.writeInfinityAscending()}}class no{constructor(e){this.orderedCode=e}writeBytes(e){this.orderedCode.writeBytesDescending(e)}writeString(e){this.orderedCode.writeUtf8Descending(e)}writeNumber(e){this.orderedCode.writeNumberDescending(e)}writeInfinity(){this.orderedCode.writeInfinityDescending()}}class ro{constructor(){this.orderedCode=new eo,this.ascending=new to(this.orderedCode),this.descending=new no(this.orderedCode)}seed(e){this.orderedCode.seed(e)}forKind(e){return 0===e?this.ascending:this.descending}encodedBytes(){return this.orderedCode.encodedBytes()}reset(){this.orderedCode.reset()}}
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
 */class io{constructor(e,t,n,r){this._indexId=e,this._documentKey=t,this._arrayValue=n,this._directionalValue=r}successor(){const e=this._directionalValue.length,t=0===e||255===this._directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this._directionalValue,0),t!==e?n.set([0],this._directionalValue.length):++n[n.length-1],new io(this._indexId,this._documentKey,this._arrayValue,n)}dbIndexEntry(e,t,n){return{indexId:this._indexId,uid:e,arrayValue:oo(this._arrayValue),directionalValue:oo(this._directionalValue),orderedDocumentKey:oo(t),documentKey:n.path.toArray()}}dbIndexEntryKey(e,t,n){const r=this.dbIndexEntry(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function so(e,t){let n=e._indexId-t._indexId;return 0!==n?n:(n=ao(e._arrayValue,t._arrayValue),0!==n?n:(n=ao(e._directionalValue,t._directionalValue),0!==n?n:J.comparator(e._documentKey,t._documentKey)))}function ao(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function oo(e){return(0,n.isSafariOrWebkit)()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function co(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(e)}class uo{constructor(e){this.inequalityFilters=new fn((e,t)=>Y.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.orderBys=e.orderBy,this.equalityFilters=[];for(const t of e.filters){const e=t;e.isInequality()?this.inequalityFilters=this.inequalityFilters.add(e):this.equalityFilters.push(e)}}get hasMultipleInequality(){return this.inequalityFilters.size>1}servedByIndex(e){if(v(e.collectionGroup===this.collectionId,49279),this.hasMultipleInequality)return!1;const t=me(e);if(void 0!==t&&!this.hasMatchingEqualityFilter(t))return!1;const n=ge(e);let r=new Set,i=0,s=0;for(;i<n.length&&this.hasMatchingEqualityFilter(n[i]);++i)r=r.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.inequalityFilters.size>0){const e=this.inequalityFilters.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[i];if(!this.matchesFilter(e,t)||!this.matchesOrderBy(this.orderBys[s++],t))return!1}++i}for(;i<n.length;++i){const e=n[i];if(s>=this.orderBys.length||!this.matchesOrderBy(this.orderBys[s++],e))return!1}return!0}buildTargetIndex(){if(this.hasMultipleInequality)return null;let e=new fn(Y.comparator);const t=[];for(const n of this.equalityFilters){if(n.field.isKeyField())continue;if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new ye(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new ye(n.field,0))}}for(const n of this.orderBys)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new ye(n.field,"asc"===n.dir?0:1)));return new pe(pe.UNKNOWN_ID,this.collectionId,t,be.empty())}hasMatchingEqualityFilter(e){for(const t of this.equalityFilters)if(this.matchesFilter(t,e))return!0;return!1}matchesFilter(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}matchesOrderBy(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
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
 */function lo(e){if(v(e instanceof xr||e instanceof kr,20012),e instanceof xr){if(e instanceof zr){const t=e.value.arrayValue?.values?.map(t=>xr.create(e.field,"==",t))||[];return kr.create(t,"or")}return e}const t=e.filters.map(e=>lo(e));return kr.create(t,e.op)}function ho(e){if(0===e.getFilters().length)return[];const t=fo(lo(e));return v(go(t),7391),po(t)||mo(t)?[t]:t.getFilters()}function po(e){return e instanceof xr}function mo(e){return e instanceof kr&&Nr(e)}function go(e){return po(e)||mo(e)||function(e){if(e instanceof kr&&_r(e)){for(const t of e.getFilters())if(!po(t)&&!mo(t))return!1;return!0}return!1}(e)}function fo(e){if(v(e instanceof xr||e instanceof kr,34018),e instanceof xr)return e;if(1===e.filters.length)return fo(e.filters[0]);const t=e.filters.map(e=>fo(e));let n=kr.create(t,e.op);return n=bo(n),go(n)?n:(v(n instanceof kr,64498),v(Ar(n),40251),v(n.filters.length>1,57927),n.filters.reduce((e,t)=>yo(e,t)))}function yo(e,t){let n;return v(e instanceof xr||e instanceof kr,38388),v(t instanceof xr||t instanceof kr,25473),n=e instanceof xr?t instanceof xr?function(e,t){return kr.create([e,t],"and")}(e,t):wo(e,t):t instanceof xr?wo(t,e):function(e,t){if(v(e.filters.length>0&&t.filters.length>0,48005),Ar(e)&&Ar(t))return Vr(e,t.getFilters());const n=_r(e)?e:t,r=_r(e)?t:e,i=n.filters.map(e=>yo(e,r));return kr.create(i,"or")}(e,t),bo(n)}function wo(e,t){if(Ar(t))return Vr(t,e.getFilters());{const n=t.filters.map(t=>yo(e,t));return kr.create(n,"or")}}function bo(e){if(v(e instanceof xr||e instanceof kr,11850),e instanceof xr)return e;const t=e.getFilters();if(1===t.length)return bo(t[0]);if(Rr(e))return e;const n=t.map(e=>bo(e)),r=[];return n.forEach(t=>{t instanceof xr?r.push(t):t instanceof kr&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:kr.create(r,e.op)}
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
 */class To{constructor(){this.collectionParentIndex=new vo}addToCollectionParentIndex(e,t){return this.collectionParentIndex.add(t),xe.resolve()}getCollectionParents(e,t){return xe.resolve(this.collectionParentIndex.getEntries(t))}addFieldIndex(e,t){return xe.resolve()}deleteFieldIndex(e,t){return xe.resolve()}deleteAllFieldIndexes(e){return xe.resolve()}createTargetIndexes(e,t){return xe.resolve()}getDocumentsMatchingTarget(e,t){return xe.resolve(null)}getIndexType(e,t){return xe.resolve(0)}getFieldIndexes(e,t){return xe.resolve([])}getNextCollectionGroupToUpdate(e){return xe.resolve(null)}getMinOffset(e,t){return xe.resolve(Se.min())}getMinOffsetFromCollectionGroup(e,t){return xe.resolve(Se.min())}updateCollectionGroup(e,t,n){return xe.resolve()}updateIndexEntries(e,t){return xe.resolve()}}class vo{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new fn(W.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new fn(W.comparator)).toArray()}}
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
 */const So="IndexedDbIndexManager",Io=new Uint8Array(0);class Eo{constructor(e,t){this.databaseId=t,this.collectionParentsCache=new vo,this.targetToDnfSubTargets=new vi(e=>$r(e),(e,t)=>Wr(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.collectionParentsCache.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.collectionParentsCache.add(t)});const i={collectionId:n,parent:Qe(r)};return Co(e).put(i)}return xe.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[G(t),""],!1,!0);return Co(e).loadAll(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push($e(r.parent))}return n})}addFieldIndex(e,t){const n=xo(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const i=n.add(r);if(t.indexState){const n=ko(e);return i.next(e=>{n.put(Ka(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=xo(e),r=ko(e),i=Do(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=xo(e),n=Do(e),r=ko(e);return t.deleteAll().next(()=>n.deleteAll()).next(()=>r.deleteAll())}createTargetIndexes(e,t){return xe.forEach(this.getSubTargets(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new uo(t).buildTargetIndex();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=Do(e);let r=!0;const i=new Map;return xe.forEach(this.getSubTargets(t),t=>this.getFieldIndex(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=Ri();const r=[];return xe.forEach(i,(i,s)=>{var a;g(So,`Using index ${a=i,`id=${a.indexId}|cg=${a.collectionGroup}|f=${a.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${$r(t)}`);const o=function(e,t){const n=me(t);if(void 0===n)return null;for(const t of Yr(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(s,i),c=function(e,t){const n=new Map;for(const r of ge(t))for(const t of Yr(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),u=function(e,t){const n=[];let r=!0;for(const i of ge(t)){const t=0===i.kind?Jr(e,i.fieldPath,e.startAt):Xr(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new vr(n,r)}(s,i),l=function(e,t){const n=[];let r=!0;for(const i of ge(t)){const t=0===i.kind?Xr(e,i.fieldPath,e.endAt):Jr(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new vr(n,r)}(s,i),d=this.encodeBound(i,s,u),h=this.encodeBound(i,s,l),p=this.encodeValues(i,s,c),m=this.generateIndexRanges(i.indexId,o,d,u.inclusive,h,l.inclusive,p);return xe.forEach(m,i=>n.loadFirst(i,t.limit).next(t=>{t.forEach(t=>{const n=J.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return xe.resolve(null)})}getSubTargets(e){let t=this.targetToDnfSubTargets.get(e);if(t)return t;if(0===e.filters.length)t=[e];else{t=ho(kr.create(e.filters,"and")).map(t=>jr(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt))}return this.targetToDnfSubTargets.set(e,t),t}generateIndexRanges(e,t,n,r,i,s,a){const o=(null!=t?t.length:1)*Math.max(n.length,i.length),c=o/(null!=t?t.length:1),u=[];for(let l=0;l<o;++l){const o=t?this.encodeSingleElement(t[l/c]):Io,d=this.generateLowerBound(e,o,n[l%c],r),h=this.generateUpperBound(e,o,i[l%c],s),p=a.map(t=>this.generateLowerBound(e,o,t,!0));u.push(...this.createRange(d,h,p))}return u}generateLowerBound(e,t,n,r){const i=new io(e,J.empty(),t,n);return r?i:i.successor()}generateUpperBound(e,t,n,r){const i=new io(e,J.empty(),t,n);return r?i.successor():i}getFieldIndex(e,t){const n=new uo(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e){n.servedByIndex(r)&&(!t||r.fields.length>t.fields.length)&&(t=r)}return t})}getIndexType(e,t){let n=2;const r=this.getSubTargets(t);return xe.forEach(r,t=>this.getFieldIndex(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new fn(Y.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}encodeDirectionalElements(e,t){const n=new ro;for(const r of ge(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const i=n.forKind(r.kind);Ya.INSTANCE.writeIndexValue(e,i)}return n.encodedBytes()}encodeSingleElement(e){const t=new ro;return Ya.INSTANCE.writeIndexValue(e,t.forKind(0)),t.encodedBytes()}encodeDirectionalKey(e,t){const n=new ro;return Ya.INSTANCE.writeIndexValue(ir(this.databaseId,t),n.forKind(function(e){const t=ge(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.encodedBytes()}encodeValues(e,t,n){if(null===n)return[];let r=[];r.push(new ro);let i=0;for(const s of ge(e)){const e=n[i++];for(const n of r)if(this.isInFilter(t,s.fieldPath)&&ar(e))r=this.expandIndexValues(r,s,e);else{const t=n.forKind(s.kind);Ya.INSTANCE.writeIndexValue(e,t)}}return this.getEncodedBytes(r)}encodeBound(e,t,n){return this.encodeValues(e,t,n.position)}getEncodedBytes(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].encodedBytes();return t}expandIndexValues(e,t,n){const r=[...e],i=[];for(const e of n.arrayValue.values||[])for(const n of r){const r=new ro;r.seed(n.encodedBytes()),Ya.INSTANCE.writeIndexValue(e,r.forKind(t.kind)),i.push(r)}return i}isInFilter(e,t){return!!e.filters.find(e=>e instanceof xr&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=xo(e),r=ko(e);return(t?n.loadAll(Pt,IDBKeyRange.bound(t,t)):n.loadAll()).next(e=>{const t=[];return xe.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new be(t.sequenceNumber,new Se(Fa(t.readTime),new J($e(t.documentKey)),t.largestBatchId)):be.empty(),r=e.fields.map(([e,t])=>new ye(Y.fromServerFormat(e),t));return new pe(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:B(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=xo(e),i=ko(e);return this.getNextSequenceNumber(e).next(e=>r.loadAll(Pt,IDBKeyRange.bound(t,t)).next(t=>xe.forEach(t,t=>i.put(Ka(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return xe.forEach(t,(t,r)=>{const i=n.get(t.collectionGroup);return(i?xe.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),xe.forEach(i,n=>this.getExistingIndexEntries(e,t,n).next(t=>{const i=this.computeIndexEntries(r,n);return t.isEqual(i)?xe.resolve():this.updateEntries(e,r,n,t,i)}))))})}addIndexEntry(e,t,n,r){return Do(e).put(r.dbIndexEntry(this.uid,this.encodeDirectionalKey(n,t.key),t.key))}deleteIndexEntry(e,t,n,r){return Do(e).delete(r.dbIndexEntryKey(this.uid,this.encodeDirectionalKey(n,t.key),t.key))}getExistingIndexEntries(e,t,n){const r=Do(e);let i=new fn(so);return r.iterate({index:zt,range:IDBKeyRange.only([n.indexId,this.uid,oo(this.encodeDirectionalKey(n,t))])},(e,r)=>{i=i.add(new io(n.indexId,t,co(r.arrayValue),co(r.directionalValue)))}).next(()=>i)}computeIndexEntries(e,t){let n=new fn(so);const r=this.encodeDirectionalElements(t,e);if(null==r)return n;const i=me(t);if(null!=i){const s=e.data.field(i.fieldPath);if(ar(s))for(const i of s.arrayValue.values||[])n=n.add(new io(t.indexId,e.key,this.encodeSingleElement(i),r))}else n=n.add(new io(t.indexId,e.key,Io,r));return n}updateEntries(e,t,n,r,i){g(So,"Updating index entries for document '%s'",t.key);const s=[];return function(e,t,n,r,i){const s=e.getIterator(),a=t.getIterator();let o=wn(s),c=wn(a);for(;o||c;){let e=!1,t=!1;if(o&&c){const r=n(o,c);r<0?t=!0:r>0&&(e=!0)}else null!=o?t=!0:e=!0;e?(r(c),c=wn(a)):t?(i(o),o=wn(s)):(o=wn(s),c=wn(a))}}(r,i,so,r=>{s.push(this.addIndexEntry(e,t,n,r))},r=>{s.push(this.deleteIndexEntry(e,t,n,r))}),xe.waitFor(s)}getNextSequenceNumber(e){let t=1;return ko(e).iterate({index:Bt,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>so(e,t)).filter((e,t,n)=>!t||0!==so(e,n[t-1]));const r=[];r.push(e);for(const i of n){const n=so(i,e),s=so(i,t);if(0===n)r[0]=e.successor();else if(n>0&&s<0)r.push(i),r.push(i.successor());else if(s>0)break}r.push(t);const i=[];for(let e=0;e<r.length;e+=2){if(this.isRangeMatchable(r[e],r[e+1]))return[];const t=r[e].dbIndexEntryKey(this.uid,Io,J.empty()),n=r[e+1].dbIndexEntryKey(this.uid,Io,J.empty());i.push(IDBKeyRange.bound(t,n))}return i}isRangeMatchable(e,t){return so(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Ao)}getMinOffset(e,t){return xe.mapArray(this.getSubTargets(t),t=>this.getFieldIndex(e,t).next(e=>e||b(44426))).next(Ao)}}function Co(e){return cn(e,Et)}function Do(e){return cn(e,qt)}function xo(e){return cn(e,Rt)}function ko(e){return cn(e,Ft)}function Ao(e){v(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const i=e[r].indexState.offset;Ie(i,t)<0&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new Se(t.readTime,t.documentKey,n)}
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
 */function _o(e,t,n){const r=e.store(Ze),i=e.store(at),s=[],a=IDBKeyRange.only(n.batchId);let o=0;const c=r.iterate({range:a},(e,t,n)=>(o++,n.delete()));s.push(c.next(()=>{v(1===o,47070,{batchId:n.batchId})}));const u=[];for(const e of n.mutations){const r=it(t,e.key.path,n.batchId);s.push(i.delete(r)),u.push(e.key)}return xe.waitFor(s).next(()=>u)}function No(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw b(14731);t=e.noDocument}return JSON.stringify(t).length}
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
 */class Ro{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.documentKeysByBatchId={}}static forUser(e,t,n,r){v(""!==e.uid,64387);const i=e.isAuthenticated()?e.uid:"";return new Ro(i,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Po(e).iterate({index:tt,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const i=Vo(e),s=Po(e);return s.add({}).next(a=>{v("number"==typeof a,49019);const o=new ms(a,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>ua(e.remoteSerializer,t)),i=n.mutations.map(t=>ua(e.remoteSerializer,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.serializer,this.userId,o),u=[];let l=new fn((e,t)=>B(e.canonicalString(),t.canonicalString()));for(const e of r){const t=it(this.userId,e.key.path,a);l=l.add(e.key.path.popLast()),u.push(s.put(c)),u.push(i.put(t,st))}return l.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.documentKeysByBatchId[a]=o.keys()}),xe.waitFor(u).next(()=>o)})}lookupMutationBatch(e,t){return Po(e).get(t).next(e=>e?(v(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),Ma(this.serializer,e)):null)}lookupMutationKeys(e,t){return this.documentKeysByBatchId[t]?xe.resolve(this.documentKeysByBatchId[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.documentKeysByBatchId[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Po(e).iterate({index:tt,range:r},(e,t,r)=>{t.userId===this.userId&&(v(t.batchId>=n,47524,{nextBatchId:n}),i=Ma(this.serializer,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Mn;return Po(e).iterate({index:tt,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Mn],[this.userId,Number.POSITIVE_INFINITY]);return Po(e).loadAll(tt,t).next(e=>e.map(e=>Ma(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=rt(this.userId,t.path),r=IDBKeyRange.lowerBound(n),i=[];return Vo(e).iterate({range:r},(n,r,s)=>{const[a,o,c]=n,u=$e(o);if(a===this.userId&&t.path.isEqual(u))return Po(e).get(c).next(e=>{if(!e)throw b(61480,{indexKey:n,batchId:c});v(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),i.push(Ma(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new fn(B);const r=[];return t.forEach(t=>{const i=rt(this.userId,t.path),s=IDBKeyRange.lowerBound(i),a=Vo(e).iterate({range:s},(e,r,i)=>{const[s,a,o]=e,c=$e(a);s===this.userId&&t.path.isEqual(c)?n=n.add(o):i.done()});r.push(a)}),xe.waitFor(r).next(()=>this.lookupMutationBatches(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,i=rt(this.userId,n),s=IDBKeyRange.lowerBound(i);let a=new fn(B);return Vo(e).iterate({range:s},(e,t,i)=>{const[s,o,c]=e,u=$e(o);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(a=a.add(c)):i.done()}).next(()=>this.lookupMutationBatches(e,a))}lookupMutationBatches(e,t){const n=[],r=[];return t.forEach(t=>{r.push(Po(e).get(t).next(e=>{if(null===e)throw b(35274,{batchId:t});v(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(Ma(this.serializer,e))}))}),xe.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return _o(e.simpleDbTransaction,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.removeCachedMutationKeys(t.batchId)}),xe.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}removeCachedMutationKeys(e){delete this.documentKeysByBatchId[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return xe.resolve();const n=IDBKeyRange.lowerBound([this.userId]);const r=[];return Vo(e).iterate({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=$e(e[1]);r.push(t)}else n.done()}).next(()=>{v(0===r.length,56720,{danglingKeys:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return Oo(e,this.userId,t)}getMutationQueueMetadata(e){return Fo(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:Mn,lastStreamToken:""})}}function Oo(e,t,n){const r=rt(t,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let a=!1;return Vo(e).iterate({range:s,keysOnly:!0},(e,n,r)=>{const[s,o,c]=e;s===t&&o===i&&(a=!0),r.done()}).next(()=>a)}function Po(e){return cn(e,Ze)}function Vo(e){return cn(e,at)}function Fo(e){return cn(e,Je)}
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
 */class Mo{constructor(e){this.lastId=e}next(){return this.lastId+=2,this.lastId}static forTargetCache(){return new Mo(0)}static forSyncEngine(){return new Mo(-1)}}
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
 */class Bo{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.retrieveMetadata(e).next(t=>{const n=new Mo(t.highestTargetId);return t.highestTargetId=n.next(),this.saveMetadata(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.retrieveMetadata(e).next(e=>de.fromTimestamp(new le(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.retrieveMetadata(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.retrieveMetadata(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.saveMetadata(e,r)))}addTargetData(e,t){return this.saveTargetData(e,t).next(()=>this.retrieveMetadata(e).next(n=>(n.targetCount+=1,this.updateMetadataFromTargetData(t,n),this.saveMetadata(e,n))))}updateTargetData(e,t){return this.saveTargetData(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Lo(e).delete(t.targetId)).next(()=>this.retrieveMetadata(e)).next(t=>(v(t.targetCount>0,8065),t.targetCount-=1,this.saveMetadata(e,t)))}removeTargets(e,t,n){let r=0;const i=[];return Lo(e).iterate((s,a)=>{const o=Ba(a);o.sequenceNumber<=t&&null===n.get(o.targetId)&&(r++,i.push(this.removeTargetData(e,o)))}).next(()=>xe.waitFor(i)).next(()=>r)}forEachTarget(e,t){return Lo(e).iterate((e,n)=>{const r=Ba(n);t(r)})}retrieveMetadata(e){return qo(e).get(St).next(e=>(v(null!==e,2888),e))}saveMetadata(e,t){return qo(e).put(St,t)}saveTargetData(e,t){return Lo(e).put(La(this.serializer,t))}updateMetadataFromTargetData(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.retrieveMetadata(e).next(e=>e.targetCount)}getTargetData(e,t){const n=$r(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Lo(e).iterate({range:r,index:ft},(e,n,r)=>{const s=Ba(n);Wr(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){const r=[],i=Uo(e);return t.forEach(t=>{const s=Qe(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),xe.waitFor(r)}removeMatchingKeys(e,t,n){const r=Uo(e);return xe.forEach(t,t=>{const i=Qe(t.path);return xe.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=Uo(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=Uo(e);let i=Ri();return r.iterate({range:n,keysOnly:!0},(e,t,n)=>{const r=$e(e[1]),s=new J(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){const n=Qe(t.path),r=IDBKeyRange.bound([n],[G(n)],!1,!0);let i=0;return Uo(e).iterate({index:Tt,keysOnly:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}getTargetDataForTarget(e,t){return Lo(e).get(t).next(e=>e?Ba(e):null)}}function Lo(e){return cn(e,gt)}function qo(e){return cn(e,It)}function Uo(e){return cn(e,wt)}
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
 */const zo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ko=41943040;class Qo{static withCacheSize(e){return new Qo(e,Qo.DEFAULT_COLLECTION_PERCENTILE,Qo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}Qo.DEFAULT_COLLECTION_PERCENTILE=10,Qo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Qo.DEFAULT=new Qo(Ko,Qo.DEFAULT_COLLECTION_PERCENTILE,Qo.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Qo.DISABLED=new Qo(-1,0,0);
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
const Go="LruGarbageCollector",jo=1048576;function $o([e,t],[n,r]){const i=B(e,n);return 0===i?B(t,r):i}class Wo{constructor(e){this.maxElements=e,this.buffer=new fn($o),this.previousIndex=0}nextIndex(){return++this.previousIndex}addElement(e){const t=[e,this.nextIndex()];if(this.buffer.size<this.maxElements)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();$o(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Ho{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.gcTask=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.scheduleGC(6e4)}stop(){this.gcTask&&(this.gcTask.cancel(),this.gcTask=null)}get started(){return null!==this.gcTask}scheduleGC(e){g(Go,`Garbage collection scheduled in ${e}ms`),this.gcTask=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.gcTask=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Pe(e)?g(Go,"Ignoring IndexedDB error during garbage collection: ",e):await De(e)}await this.scheduleGC(3e5)})}}class Yo{constructor(e,t){this.delegate=e,this.params=t}calculateTargetCount(e,t){return this.delegate.getSequenceNumberCount(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return xe.resolve(ze.INVALID);const n=new Wo(t);return this.delegate.forEachTarget(e,e=>n.addElement(e.sequenceNumber)).next(()=>this.delegate.forEachOrphanedDocumentSequenceNumber(e,e=>n.addElement(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.delegate.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.delegate.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(g("LruGarbageCollector","Garbage collection skipped; disabled"),xe.resolve(zo)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(g("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),zo):this.runGarbageCollection(e,t))}getCacheSize(e){return this.delegate.getCacheSize(e)}runGarbageCollection(e,t){let n,r,s,a,o,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(g("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,a=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>{if(u=Date.now(),p()<=i.LogLevel.DEBUG){g("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${a-l}ms\n\tDetermined least recently used ${r} in `+(o-a)+"ms\n"+`\tRemoved ${s} targets in `+(c-o)+"ms\n"+`\tRemoved ${e} documents in `+(u-c)+"ms\n"+`Total Duration: ${u-l}ms`)}return xe.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})})}}function Jo(e,t){return new Yo(e,t)}
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
 */class Xo{constructor(e,t){this.db=e,this.garbageCollector=Jo(this,t)}getSequenceNumberCount(e){const t=this.orphanedDocumentCount(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}orphanedDocumentCount(e){let t=0;return this.forEachOrphanedDocumentSequenceNumber(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}forEachOrphanedDocumentSequenceNumber(e,t){return this.forEachOrphanedDocument(e,(e,n)=>t(n))}addReference(e,t,n){return Zo(e,n)}removeReference(e,t,n){return Zo(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Zo(e,t)}isPinned(e,t){return function(e,t){let n=!1;return Fo(e).iterateSerial(r=>Oo(e,r,t).next(e=>(e&&(n=!0),xe.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.forEachOrphanedDocument(e,(s,a)=>{if(a<=t){const t=this.isPinned(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,de.min()),Uo(e).delete([0,Qe(s.path)])))});r.push(t)}}).next(()=>xe.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Zo(e,t)}forEachOrphanedDocument(e,t){const n=Uo(e);let r,i=ze.INVALID;return n.iterate({index:Tt},([e,n],{path:s,sequenceNumber:a})=>{0===e?(i!==ze.INVALID&&t(new J($e(r)),i),i=a,r=s):i=ze.INVALID}).next(()=>{i!==ze.INVALID&&t(new J($e(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Zo(e,t){return Uo(e).put(function(e,t){return{targetId:0,path:Qe(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
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
 */class ec{constructor(){this.changes=new vi(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Tr.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?xe.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
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
 */class tc{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return sc(e).put(n)}removeEntry(e,t,n){return sc(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],Pa(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.setMetadata(e,n)))}getEntry(e,t){let n=Tr.newInvalidDocument(t);return sc(e).iterate({index:ut,range:IDBKeyRange.only(ac(t))},(e,r)=>{n=this.maybeDecodeDocument(t,r)}).next(()=>n)}getSizedEntry(e,t){let n={size:0,document:Tr.newInvalidDocument(t)};return sc(e).iterate({index:ut,range:IDBKeyRange.only(ac(t))},(e,r)=>{n={document:this.maybeDecodeDocument(t,r),size:No(r)}}).next(()=>n)}getEntries(e,t){let n=Ii();return this.forEachDbEntry(e,t,(e,t)=>{const r=this.maybeDecodeDocument(e,t);n=n.insert(e,r)}).next(()=>n)}getSizedEntries(e,t){let n=Ii(),r=new pn(J.comparator);return this.forEachDbEntry(e,t,(e,t)=>{const i=this.maybeDecodeDocument(e,t);n=n.insert(e,i),r=r.insert(e,No(t))}).next(()=>({documents:n,sizeMap:r}))}forEachDbEntry(e,t,n){if(t.isEmpty())return xe.resolve();let r=new fn(cc);t.forEach(e=>r=r.add(e));const i=IDBKeyRange.bound(ac(r.first()),ac(r.last())),s=r.getIterator();let a=s.getNext();return sc(e).iterate({index:ut,range:i},(e,t,r)=>{const i=J.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&cc(a,i)<0;)n(a,null),a=s.getNext();a&&a.isEqual(i)&&(n(a,t),a=s.hasNext()?s.getNext():null),a?r.skip(ac(a)):r.done()}).next(()=>{for(;a;)n(a,null),a=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,i){const s=t.path,a=[s.popLast().toArray(),s.lastSegment(),Pa(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],o=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return sc(e).loadAll(IDBKeyRange.bound(a,o,!0)).next(e=>{i?.incrementDocumentReadCount(e.length);let n=Ii();for(const i of e){const e=this.maybeDecodeDocument(J.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(yi(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=Ii();const s=oc(t,n),a=oc(t,Se.max());return sc(e).iterate({index:dt,range:IDBKeyRange.bound(s,a,!0)},(e,t,n)=>{const s=this.maybeDecodeDocument(J.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);i=i.insert(s.key,s),i.size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new rc(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return ic(e).get(mt).next(e=>(v(!!e,20021),e))}setMetadata(e,t){return ic(e).put(mt,t)}maybeDecodeDocument(e,t){if(t){const e=Ra(this.serializer,t);if(!(e.isNoDocument()&&e.version.isEqual(de.min())))return e}return Tr.newInvalidDocument(e)}}function nc(e){return new tc(e)}class rc extends ec{constructor(e,t){super(),this.documentCache=e,this.trackRemovals=t,this.documentStates=new vi(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new fn((e,t)=>B(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{const a=this.documentStates.get(i);if(t.push(this.documentCache.removeEntry(e,i,a.readTime)),s.isValidDocument()){const o=Oa(this.documentCache.serializer,s);r=r.add(i.path.popLast());const c=No(o);n+=c-a.size,t.push(this.documentCache.addEntry(e,i,o))}else if(n-=a.size,this.trackRemovals){const n=Oa(this.documentCache.serializer,s.convertToNoDocument(de.min()));t.push(this.documentCache.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.documentCache.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.documentCache.updateMetadata(e,n)),xe.waitFor(t)}getFromCache(e,t){return this.documentCache.getSizedEntry(e,t).next(e=>(this.documentStates.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.documentCache.getSizedEntries(e,t).next(({documents:e,sizeMap:t})=>(t.forEach((t,n)=>{this.documentStates.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function ic(e){return cn(e,pt)}function sc(e){return cn(e,ot)}function ac(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function oc(e,t){const n=t.documentKey.path.toArray();return[e,Pa(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function cc(e,t){const n=e.path.toArray(),r=t.path.toArray();let i=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(i=B(n[e],r[e]),i)return i;return i=B(n.length,r.length),i||(i=B(n[n.length-2],r[r.length-2]),i||B(n[n.length-1],r[r.length-1]))}
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
 */
class uc{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
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
 */class lc{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&is(n.mutation,e,bn.empty(),le.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Ri()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Ri()){const r=xi();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Ci();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=xi();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Ri()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=Ii();const s=Ai(),a=Ai();return t.forEach((e,t)=>{const a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof cs)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),is(a.mutation,t,a.mutation.getFieldMask(),le.now())):s.set(t.key,bn.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>a.set(e,new uc(t,s.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){const n=Ai();let r=new pn((e,t)=>e-t),i=Ri();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let a=n.get(e)||bn.empty();a=i.applyToLocalView(s,a),n.set(e,a);const o=(r.get(i.batchId)||Ri()).add(e);r=r.insert(i.batchId,o)})}).next(()=>{const s=[],a=r.getReverseIterator();for(;a.hasNext();){const r=a.getNext(),o=r.key,c=r.value,u=ki();c.forEach(e=>{if(!i.has(e)){const r=ns(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return xe.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return ri(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ii(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):xe.resolve(xi());let a=he,o=i;return s.next(t=>xe.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),i.get(t)?xe.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,Ri())).next(e=>({batchId:a,changes:Di(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(e=>{let t=Ci();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=Ci();return this.indexManager.getCollectionParents(e,i).next(a=>xe.forEach(a,a=>{const o=function(e,t){return new Zr(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,a.child(i));return this.getDocumentsMatchingCollectionQuery(e,o,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,Tr.newInvalidDocument(r)))});let n=Ci();return e.forEach((e,r)=>{const s=i.get(e);void 0!==s&&is(s.mutation,r,bn.empty(),le.now()),yi(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */class dc{constructor(e){this.serializer=e,this.bundles=new Map,this.namedQueries=new Map}getBundleMetadata(e,t){return xe.resolve(this.bundles.get(t))}saveBundleMetadata(e,t){var n;return this.bundles.set(t.id,{id:(n=t).id,version:n.version,createTime:Ws(n.createTime)}),xe.resolve()}getNamedQuery(e,t){return xe.resolve(this.namedQueries.get(t))}saveNamedQuery(e,t){return this.namedQueries.set(t.name,function(e){return{name:e.name,query:qa(e.bundledQuery),readTime:Ws(e.readTime)}}(t)),xe.resolve()}}
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
 */class hc{constructor(){this.overlays=new pn(J.comparator),this.overlayByBatchId=new Map}getOverlay(e,t){return xe.resolve(this.overlays.get(t))}getOverlays(e,t){const n=xi();return xe.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.saveOverlay(e,t,r)}),xe.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.overlayByBatchId.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.overlayByBatchId.delete(n)),xe.resolve()}getOverlaysForCollection(e,t,n){const r=xi(),i=t.length+1,s=new J(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){const e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&(e.largestBatchId>n&&r.set(e.getKey(),e))}return xe.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new pn((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=xi(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const a=xi(),o=i.getIterator();for(;o.hasNext();){if(o.getNext().value.forEach((e,t)=>a.set(e,t)),a.size()>=r)break}return xe.resolve(a)}saveOverlay(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.overlayByBatchId.get(r.largestBatchId).delete(n.key);this.overlayByBatchId.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new fs(t,n));let i=this.overlayByBatchId.get(t);void 0===i&&(i=Ri(),this.overlayByBatchId.set(t,i)),this.overlayByBatchId.set(t,i.add(n.key))}}
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
 */class pc{constructor(){this.sessionToken=vn.EMPTY_BYTE_STRING}getSessionToken(e){return xe.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,xe.resolve()}}
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
 */class mc{constructor(){this.refsByKey=new fn(gc.compareByKey),this.refsByTarget=new fn(gc.compareByTargetId)}isEmpty(){return this.refsByKey.isEmpty()}addReference(e,t){const n=new gc(e,t);this.refsByKey=this.refsByKey.add(n),this.refsByTarget=this.refsByTarget.add(n)}addReferences(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.removeRef(new gc(e,t))}removeReferences(e,t){e.forEach(e=>this.removeReference(e,t))}removeReferencesForId(e){const t=new J(new W([])),n=new gc(t,e),r=new gc(t,e+1),i=[];return this.refsByTarget.forEachInRange([n,r],e=>{this.removeRef(e),i.push(e.key)}),i}removeAllReferences(){this.refsByKey.forEach(e=>this.removeRef(e))}removeRef(e){this.refsByKey=this.refsByKey.delete(e),this.refsByTarget=this.refsByTarget.delete(e)}referencesForId(e){const t=new J(new W([])),n=new gc(t,e),r=new gc(t,e+1);let i=Ri();return this.refsByTarget.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new gc(e,0),n=this.refsByKey.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class gc{constructor(e,t){this.key=e,this.targetOrBatchId=t}static compareByKey(e,t){return J.comparator(e.key,t.key)||B(e.targetOrBatchId,t.targetOrBatchId)}static compareByTargetId(e,t){return B(e.targetOrBatchId,t.targetOrBatchId)||J.comparator(e.key,t.key)}}
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
 */class fc{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.nextBatchId=1,this.batchesByDocumentKey=new fn(gc.compareByKey)}checkEmpty(e){return xe.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.nextBatchId;this.nextBatchId++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new ms(i,t,n,r);this.mutationQueue.push(s);for(const t of r)this.batchesByDocumentKey=this.batchesByDocumentKey.add(new gc(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return xe.resolve(s)}lookupMutationBatch(e,t){return xe.resolve(this.findMutationBatch(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.indexOfBatchId(n),i=r<0?0:r;return xe.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return xe.resolve(0===this.mutationQueue.length?Mn:this.nextBatchId-1)}getAllMutationBatches(e){return xe.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new gc(t,0),r=new gc(t,Number.POSITIVE_INFINITY),i=[];return this.batchesByDocumentKey.forEachInRange([n,r],e=>{const t=this.findMutationBatch(e.targetOrBatchId);i.push(t)}),xe.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new fn(B);return t.forEach(e=>{const t=new gc(e,0),r=new gc(e,Number.POSITIVE_INFINITY);this.batchesByDocumentKey.forEachInRange([t,r],e=>{n=n.add(e.targetOrBatchId)})}),xe.resolve(this.findMutationBatches(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;J.isDocumentKey(i)||(i=i.child(""));const s=new gc(new J(i),0);let a=new fn(B);return this.batchesByDocumentKey.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.targetOrBatchId)),!0)},s),xe.resolve(this.findMutationBatches(a))}findMutationBatches(e){const t=[];return e.forEach(e=>{const n=this.findMutationBatch(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){v(0===this.indexOfExistingBatchId(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.batchesByDocumentKey;return xe.forEach(t.mutations,r=>{const i=new gc(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.batchesByDocumentKey=n})}removeCachedMutationKeys(e){}containsKey(e,t){const n=new gc(t,0),r=this.batchesByDocumentKey.firstAfterOrEqual(n);return xe.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,xe.resolve()}indexOfExistingBatchId(e,t){return this.indexOfBatchId(e)}indexOfBatchId(e){if(0===this.mutationQueue.length)return 0;return e-this.mutationQueue[0].batchId}findMutationBatch(e){const t=this.indexOfBatchId(e);if(t<0||t>=this.mutationQueue.length)return null;return this.mutationQueue[t]}}
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
 */class yc{constructor(e){this.sizer=e,this.docs=new pn(J.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.sizer(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return xe.resolve(n?n.document.mutableCopy():Tr.newInvalidDocument(t))}getEntries(e,t){let n=Ii();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Tr.newInvalidDocument(e))}),xe.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=Ii();const s=t.path,a=new J(s.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){const{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||(Ie(ve(a),n)<=0||(r.has(a.key)||yi(t,a))&&(i=i.insert(a.key,a.mutableCopy())))}return xe.resolve(i)}getAllFromCollectionGroup(e,t,n,r){b(9500)}forEachDocumentKey(e,t){return xe.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new wc(this)}getSize(e){return xe.resolve(this.size)}}class wc extends ec{constructor(e){super(),this.documentCache=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.documentCache.addEntry(e,r)):this.documentCache.removeEntry(n)}),xe.waitFor(t)}getFromCache(e,t){return this.documentCache.getEntry(e,t)}getAllFromCache(e,t){return this.documentCache.getEntries(e,t)}}
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
 */class bc{constructor(e){this.persistence=e,this.targets=new vi(e=>$r(e),Wr),this.lastRemoteSnapshotVersion=de.min(),this.highestTargetId=0,this.highestSequenceNumber=0,this.references=new mc,this.targetCount=0,this.targetIdGenerator=Mo.forTargetCache()}forEachTarget(e,t){return this.targets.forEach((e,n)=>t(n)),xe.resolve()}getLastRemoteSnapshotVersion(e){return xe.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return xe.resolve(this.highestSequenceNumber)}allocateTargetId(e){return this.highestTargetId=this.targetIdGenerator.next(),xe.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.highestSequenceNumber&&(this.highestSequenceNumber=t),xe.resolve()}saveTargetData(e){this.targets.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.targetIdGenerator=new Mo(t),this.highestTargetId=t),e.sequenceNumber>this.highestSequenceNumber&&(this.highestSequenceNumber=e.sequenceNumber)}addTargetData(e,t){return this.saveTargetData(t),this.targetCount+=1,xe.resolve()}updateTargetData(e,t){return this.saveTargetData(t),xe.resolve()}removeTargetData(e,t){return this.targets.delete(t.target),this.references.removeReferencesForId(t.targetId),this.targetCount-=1,xe.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.targets.forEach((s,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.targets.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),xe.waitFor(i).next(()=>r)}getTargetCount(e){return xe.resolve(this.targetCount)}getTargetData(e,t){const n=this.targets.get(t)||null;return xe.resolve(n)}addMatchingKeys(e,t,n){return this.references.addReferences(t,n),xe.resolve()}removeMatchingKeys(e,t,n){this.references.removeReferences(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),xe.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.references.removeReferencesForId(t),xe.resolve()}getMatchingKeysForTargetId(e,t){const n=this.references.referencesForId(t);return xe.resolve(n)}containsKey(e,t){return xe.resolve(this.references.containsKey(t))}}
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
 */class Tc{constructor(e,t){this.mutationQueues={},this.overlays={},this.listenSequence=new ze(0),this._started=!1,this._started=!0,this.globalsCache=new pc,this.referenceDelegate=e(this),this.targetCache=new bc(this);this.indexManager=new To,this.remoteDocumentCache=function(e){return new yc(e)}(e=>this.referenceDelegate.documentSize(e)),this.serializer=new Na(t),this.bundleCache=new dc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this._started=!1,Promise.resolve()}get started(){return this._started}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new hc,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.mutationQueues[e.toKey()];return n||(n=new fc(t,this.referenceDelegate),this.mutationQueues[e.toKey()]=n),n}getGlobalsCache(){return this.globalsCache}getTargetCache(){return this.targetCache}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.bundleCache}runTransaction(e,t,n){g("MemoryPersistence","Starting transaction:",e);const r=new vc(this.listenSequence.next());return this.referenceDelegate.onTransactionStarted(),n(r).next(e=>this.referenceDelegate.onTransactionCommitted(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}mutationQueuesContainKey(e,t){return xe.or(Object.values(this.mutationQueues).map(n=>()=>n.containsKey(e,t)))}}class vc extends Ce{constructor(e){super(),this.currentSequenceNumber=e}}class Sc{constructor(e){this.persistence=e,this.localViewReferences=new mc,this._orphanedDocuments=null}static factory(e){return new Sc(e)}get orphanedDocuments(){if(this._orphanedDocuments)return this._orphanedDocuments;throw b(60996)}addReference(e,t,n){return this.localViewReferences.addReference(n,t),this.orphanedDocuments.delete(n.toString()),xe.resolve()}removeReference(e,t,n){return this.localViewReferences.removeReference(n,t),this.orphanedDocuments.add(n.toString()),xe.resolve()}markPotentiallyOrphaned(e,t){return this.orphanedDocuments.add(t.toString()),xe.resolve()}removeTarget(e,t){this.localViewReferences.removeReferencesForId(t.targetId).forEach(e=>this.orphanedDocuments.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.orphanedDocuments.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}onTransactionStarted(){this._orphanedDocuments=new Set}onTransactionCommitted(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return xe.forEach(this.orphanedDocuments,n=>{const r=J.fromPath(n);return this.isReferenced(e,r).next(e=>{e||t.removeEntry(r,de.min())})}).next(()=>(this._orphanedDocuments=null,t.apply(e)))}updateLimboDocument(e,t){return this.isReferenced(e,t).next(e=>{e?this.orphanedDocuments.delete(t.toString()):this.orphanedDocuments.add(t.toString())})}documentSize(e){return 0}isReferenced(e,t){return xe.or([()=>xe.resolve(this.localViewReferences.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.mutationQueuesContainKey(e,t)])}}class Ic{constructor(e,t){this.persistence=e,this.orphanedSequenceNumbers=new vi(e=>Qe(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=Jo(this,t)}static factory(e,t){return new Ic(e,t)}onTransactionStarted(){}onTransactionCommitted(e){return xe.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}getSequenceNumberCount(e){const t=this.orphanedDocumentCount(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}orphanedDocumentCount(e){let t=0;return this.forEachOrphanedDocumentSequenceNumber(e,e=>{t++}).next(()=>t)}forEachOrphanedDocumentSequenceNumber(e,t){return xe.forEach(this.orphanedSequenceNumbers,(n,r)=>this.isPinned(e,n,r).next(e=>e?xe.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.forEachDocumentKey(e,r=>this.isPinned(e,r,t).next(e=>{e||(n++,i.removeEntry(r,de.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.orphanedSequenceNumbers.set(t,e.currentSequenceNumber),xe.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.orphanedSequenceNumbers.set(n,e.currentSequenceNumber),xe.resolve()}removeReference(e,t,n){return this.orphanedSequenceNumbers.set(n,e.currentSequenceNumber),xe.resolve()}updateLimboDocument(e,t){return this.orphanedSequenceNumbers.set(t,e.currentSequenceNumber),xe.resolve()}documentSize(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=rr(e.data.value)),t}isPinned(e,t,n){return xe.or([()=>this.persistence.mutationQueuesContainKey(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.orphanedSequenceNumbers.get(t);return xe.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
 */class Ec{constructor(e){this.serializer=e}createOrUpgrade(e,t,r,i){const s=new Ae("createOrUpgrade",t);r<1&&i>=1&&(function(e){e.createObjectStore(He)}(e),function(e){e.createObjectStore(Je,{keyPath:Xe});const t=e.createObjectStore(Ze,{keyPath:et,autoIncrement:!0});t.createIndex(tt,nt,{unique:!0}),e.createObjectStore(at)}(e),Cc(e),function(e){e.createObjectStore(We)}(e));let a=xe.resolve();return r<3&&i>=3&&(0!==r&&(!function(e){e.deleteObjectStore(wt),e.deleteObjectStore(gt),e.deleteObjectStore(It)}(e),Cc(e)),a=a.next(()=>function(e){const t=e.store(It),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:de.min().toTimestamp(),targetCount:0};return t.put(St,n)}(s))),r<4&&i>=4&&(0!==r&&(a=a.next(()=>function(e,t){const n=t.store(Ze);return n.loadAll().next(n=>{e.deleteObjectStore(Ze);e.createObjectStore(Ze,{keyPath:et,autoIncrement:!0}).createIndex(tt,nt,{unique:!0});const r=t.store(Ze),i=n.map(e=>r.put(e));return xe.waitFor(i)})}(e,s))),a=a.next(()=>{!function(e){e.createObjectStore(Dt,{keyPath:xt})}(e)})),r<5&&i>=5&&(a=a.next(()=>this.removeAcknowledgedMutations(s))),r<6&&i>=6&&(a=a.next(()=>(function(e){e.createObjectStore(pt)}(e),this.addDocumentGlobal(s)))),r<7&&i>=7&&(a=a.next(()=>this.ensureSequenceNumbers(s))),r<8&&i>=8&&(a=a.next(()=>this.createCollectionParentIndex(e,s))),r<9&&i>=9&&(a=a.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),r<10&&i>=10&&(a=a.next(()=>this.rewriteCanonicalIds(s))),r<11&&i>=11&&(a=a.next(()=>{!function(e){e.createObjectStore(kt,{keyPath:At})}(e),function(e){e.createObjectStore(_t,{keyPath:Nt})}(e)})),r<12&&i>=12&&(a=a.next(()=>{!function(e){const t=e.createObjectStore(Qt,{keyPath:Gt});t.createIndex(jt,$t,{unique:!1}),t.createIndex(Wt,Ht,{unique:!1})}(e)})),r<13&&i>=13&&(a=a.next(()=>function(e){const t=e.createObjectStore(ot,{keyPath:ct});t.createIndex(ut,lt),t.createIndex(dt,ht)}(e)).next(()=>this.rewriteRemoteDocumentCache(e,s)).next(()=>e.deleteObjectStore(We))),r<14&&i>=14&&(a=a.next(()=>this.runOverlayMigration(e,s))),r<15&&i>=15&&(a=a.next(()=>function(e){const t=e.createObjectStore(Rt,{keyPath:Ot,autoIncrement:!0});t.createIndex(Pt,Vt,{unique:!1});const n=e.createObjectStore(Ft,{keyPath:Mt});n.createIndex(Bt,Lt,{unique:!1});const r=e.createObjectStore(qt,{keyPath:Ut});r.createIndex(zt,Kt,{unique:!1})}(e))),r<16&&i>=16&&(a=a.next(()=>{t.objectStore(Ft).clear()}).next(()=>{t.objectStore(qt).clear()})),r<17&&i>=17&&(a=a.next(()=>{!function(e){e.createObjectStore(Yt,{keyPath:Jt})}(e)})),r<18&&i>=18&&(0,n.isSafariOrWebkit)()&&(a=a.next(()=>{t.objectStore(Ft).clear()}).next(()=>{t.objectStore(qt).clear()})),a}addDocumentGlobal(e){let t=0;return e.store(We).iterate((e,n)=>{t+=No(n)}).next(()=>{const n={byteSize:t};return e.store(pt).put(mt,n)})}removeAcknowledgedMutations(e){const t=e.store(Je),n=e.store(Ze);return t.loadAll().next(t=>xe.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,Mn],[t.userId,t.lastAcknowledgedBatchId]);return n.loadAll(tt,r).next(n=>xe.forEach(n,n=>{v(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=Ma(this.serializer,n);return _o(e,t.userId,r).next(()=>{})}))}))}ensureSequenceNumbers(e){const t=e.store(wt),n=e.store(We);return e.store(It).get(St).next(e=>{const r=[];return n.iterate((n,i)=>{const s=new W(n),a=function(e){return[0,Qe(e)]}(s);r.push(t.get(a).next(n=>n?xe.resolve():(n=>t.put({targetId:0,path:Qe(n),sequenceNumber:e.highestListenSequenceNumber}))(s)))}).next(()=>xe.waitFor(r))})}createCollectionParentIndex(e,t){e.createObjectStore(Et,{keyPath:Ct});const n=t.store(Et),r=new vo,i=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:Qe(r)})}};return t.store(We).iterate({keysOnly:!0},(e,t)=>{const n=new W(e);return i(n.popLast())}).next(()=>t.store(at).iterate({keysOnly:!0},([e,t,n],r)=>{const s=$e(t);return i(s.popLast())}))}rewriteCanonicalIds(e){const t=e.store(gt);return t.iterate((e,n)=>{const r=Ba(n),i=La(this.serializer,r);return t.put(i)})}rewriteRemoteDocumentCache(e,t){const n=t.store(We),r=[];return n.iterate((e,n)=>{const i=t.store(ot),s=(a=n,a.document?new J(W.fromString(a.document.name).popFirst(5)):a.noDocument?J.fromSegments(a.noDocument.path):a.unknownDocument?J.fromSegments(a.unknownDocument.path):b(36783)).path.toArray();var a;
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
 */const o={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(i.put(o))}).next(()=>xe.waitFor(r))}runOverlayMigration(e,t){const n=t.store(Ze),r=nc(this.serializer),i=new Tc(Sc.factory,this.serializer.remoteSerializer);return n.loadAll().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??Ri();Ma(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),xe.forEach(n,(e,n)=>{const s=new u(n),a=$a.forUser(this.serializer,s),o=i.getIndexManager(s),c=Ro.forUser(s,this.serializer,o,i.referenceDelegate);return new lc(r,c,a,o).recalculateAndSaveOverlaysForDocumentKeys(new on(t,ze.INVALID),e).next()})})}}function Cc(e){e.createObjectStore(wt,{keyPath:bt}).createIndex(Tt,vt,{unique:!0});e.createObjectStore(gt,{keyPath:"targetId"}).createIndex(ft,yt,{unique:!0}),e.createObjectStore(It)}const Dc="IndexedDbPersistence",xc=18e5,kc=5e3,Ac="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",_c="main";class Nc{constructor(e,t,n,r,i,s,a,o,c,u,l=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.queue=i,this.window=s,this.document=a,this.sequenceNumberSyncer=c,this.forceOwningTab=u,this.schemaVersion=l,this.listenSequence=null,this._started=!1,this.isPrimary=!1,this.networkEnabled=!0,this.windowUnloadHandler=null,this.inForeground=!1,this.documentVisibilityHandler=null,this.clientMetadataRefresher=null,this.lastGarbageCollectionTime=Number.NEGATIVE_INFINITY,this.primaryStateListener=e=>Promise.resolve(),!Nc.isAvailable())throw new C(E.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Xo(this,r),this.dbName=t+_c,this.serializer=new Na(o),this.simpleDb=new _e(this.dbName,this.schemaVersion,new Ec(this.serializer)),this.globalsCache=new Ha,this.targetCache=new Bo(this.referenceDelegate,this.serializer),this.remoteDocumentCache=nc(this.serializer),this.bundleCache=new Qa,this.window&&this.window.localStorage?this.webStorage=this.window.localStorage:(this.webStorage=null,!1===u&&f(Dc,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.updateClientMetadataAndTryBecomePrimary().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new C(E.FAILED_PRECONDITION,Ac);return this.attachVisibilityHandler(),this.attachWindowUnloadHook(),this.scheduleClientMetadataAndPrimaryLeaseRefreshes(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.targetCache.getHighestSequenceNumber(e))}).then(e=>{this.listenSequence=new ze(e,this.sequenceNumberSyncer)}).then(()=>{this._started=!0}).catch(e=>(this.simpleDb&&this.simpleDb.close(),Promise.reject(e)))}setPrimaryStateListener(e){return this.primaryStateListener=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.simpleDb.setVersionChangeListener(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.queue.enqueueAndForget(async()=>{this.started&&await this.updateClientMetadataAndTryBecomePrimary()}))}updateClientMetadataAndTryBecomePrimary(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Oc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.verifyPrimaryLease(e).next(e=>{e||(this.isPrimary=!1,this.queue.enqueueRetryable(()=>this.primaryStateListener(!1)))})}).next(()=>this.canActAsPrimary(e)).next(t=>this.isPrimary&&!t?this.releasePrimaryLeaseIfHeld(e).next(()=>!1):!!t&&this.acquireOrExtendPrimaryLease(e).next(()=>!0))).catch(e=>{if(Pe(e))return g(Dc,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return g(Dc,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.queue.enqueueRetryable(()=>this.primaryStateListener(e)),this.isPrimary=e})}verifyPrimaryLease(e){return Rc(e).get(Ye).next(e=>xe.resolve(this.isLocalClient(e)))}removeClientMetadata(e){return Oc(e).delete(this.clientId)}async maybeGarbageCollectMultiClientState(){if(this.isPrimary&&!this.isWithinAge(this.lastGarbageCollectionTime,xc)){this.lastGarbageCollectionTime=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=cn(e,Dt);return t.loadAll().next(e=>{const n=this.filterActiveClients(e,xc),r=e.filter(e=>-1===n.indexOf(e));return xe.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.webStorage)for(const t of e)this.webStorage.removeItem(this.zombiedClientLocalStorageKey(t.clientId))}}scheduleClientMetadataAndPrimaryLeaseRefreshes(){this.clientMetadataRefresher=this.queue.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.updateClientMetadataAndTryBecomePrimary().then(()=>this.maybeGarbageCollectMultiClientState()).then(()=>this.scheduleClientMetadataAndPrimaryLeaseRefreshes()))}isLocalClient(e){return!!e&&e.ownerId===this.clientId}canActAsPrimary(e){if(this.forceOwningTab)return xe.resolve(!0);return Rc(e).get(Ye).next(t=>{if(null!==t&&this.isWithinAge(t.leaseTimestampMs,kc)&&!this.isClientZombied(t.ownerId)){if(this.isLocalClient(t)&&this.networkEnabled)return!0;if(!this.isLocalClient(t)){if(!t.allowTabSynchronization)throw new C(E.FAILED_PRECONDITION,Ac);return!1}}return!(!this.networkEnabled||!this.inForeground)||Oc(e).loadAll().next(e=>void 0===this.filterActiveClients(e,kc).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&g(Dc,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this._started=!1,this.markClientZombied(),this.clientMetadataRefresher&&(this.clientMetadataRefresher.cancel(),this.clientMetadataRefresher=null),this.detachVisibilityHandler(),this.detachWindowUnloadHook(),await this.simpleDb.runTransaction("shutdown","readwrite",[He,Dt],e=>{const t=new on(e,ze.INVALID);return this.releasePrimaryLeaseIfHeld(t).next(()=>this.removeClientMetadata(t))}),this.simpleDb.close(),this.removeClientZombiedEntry()}filterActiveClients(e,t){return e.filter(e=>this.isWithinAge(e.updateTimeMs,t)&&!this.isClientZombied(e.clientId))}getActiveClients(){return this.runTransaction("getActiveClients","readonly",e=>Oc(e).loadAll().next(e=>this.filterActiveClients(e,xc).map(e=>e.clientId)))}get started(){return this._started}getGlobalsCache(){return this.globalsCache}getMutationQueue(e,t){return Ro.forUser(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.targetCache}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Eo(e,this.serializer.remoteSerializer.databaseId)}getDocumentOverlayCache(e){return $a.forUser(this.serializer,e)}getBundleCache(){return this.bundleCache}runTransaction(e,t,n){g(Dc,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",i=18===(s=this.schemaVersion)?an:17===s?sn:16===s?rn:15===s?nn:14===s?tn:13===s?en:12===s?Zt:11===s?Xt:void b(60245);var s;let a;return this.simpleDb.runTransaction(e,r,i,r=>(a=new on(r,this.listenSequence?this.listenSequence.next():ze.INVALID),"readwrite-primary"===t?this.verifyPrimaryLease(a).next(e=>!!e||this.canActAsPrimary(a)).next(t=>{if(!t)throw f(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.queue.enqueueRetryable(()=>this.primaryStateListener(!1)),new C(E.FAILED_PRECONDITION,Ee);return n(a)}).next(e=>this.acquireOrExtendPrimaryLease(a).next(()=>e)):this.verifyAllowTabSynchronization(a).next(()=>n(a)))).then(e=>(a.raiseOnCommittedEvent(),e))}verifyAllowTabSynchronization(e){return Rc(e).get(Ye).next(e=>{if(null!==e&&this.isWithinAge(e.leaseTimestampMs,kc)&&!this.isClientZombied(e.ownerId)&&!this.isLocalClient(e)&&!(this.forceOwningTab||this.allowTabSynchronization&&e.allowTabSynchronization))throw new C(E.FAILED_PRECONDITION,Ac)})}acquireOrExtendPrimaryLease(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Rc(e).put(Ye,t)}static isAvailable(){return _e.isAvailable()}releasePrimaryLeaseIfHeld(e){const t=Rc(e);return t.get(Ye).next(e=>this.isLocalClient(e)?(g(Dc,"Releasing primary lease."),t.delete(Ye)):xe.resolve())}isWithinAge(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(f(`Detected an update time that is in the future: ${e} > ${n}`),!1))}attachVisibilityHandler(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.documentVisibilityHandler=()=>{this.queue.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.updateClientMetadataAndTryBecomePrimary()))},this.document.addEventListener("visibilitychange",this.documentVisibilityHandler),this.inForeground="visible"===this.document.visibilityState)}detachVisibilityHandler(){this.documentVisibilityHandler&&(this.document.removeEventListener("visibilitychange",this.documentVisibilityHandler),this.documentVisibilityHandler=null)}attachWindowUnloadHook(){"function"==typeof this.window?.addEventListener&&(this.windowUnloadHandler=()=>{this.markClientZombied();const e=/(?:Version|Mobile)\/1[456]/;(0,n.isSafari)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.queue.enterRestrictedMode(!0),this.queue.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.windowUnloadHandler))}detachWindowUnloadHook(){this.windowUnloadHandler&&(this.window.removeEventListener("pagehide",this.windowUnloadHandler),this.windowUnloadHandler=null)}isClientZombied(e){try{const t=null!==this.webStorage?.getItem(this.zombiedClientLocalStorageKey(e));return g(Dc,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return f(Dc,"Failed to get zombied client id.",e),!1}}markClientZombied(){if(this.webStorage)try{this.webStorage.setItem(this.zombiedClientLocalStorageKey(this.clientId),String(Date.now()))}catch(e){f("Failed to set zombie client id.",e)}}removeClientZombiedEntry(){if(this.webStorage)try{this.webStorage.removeItem(this.zombiedClientLocalStorageKey(this.clientId))}catch(e){}}zombiedClientLocalStorageKey(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Rc(e){return cn(e,He)}function Oc(e){return cn(e,Dt)}function Pc(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}
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
const Vc="LocalStore",Fc=3e8;class Mc{constructor(e,t,n,r){this.persistence=e,this.queryEngine=t,this.serializer=r,this.targetDataByTarget=new pn(B),this.targetIdByTarget=new vi(e=>$r(e),Wr),this.collectionGroupReadTime=new Map,this.remoteDocuments=e.getRemoteDocumentCache(),this.targetCache=e.getTargetCache(),this.bundleCache=e.getBundleCache(),this.initializeUserComponents(n)}initializeUserComponents(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new lc(this.remoteDocuments,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.remoteDocuments.setIndexManager(this.indexManager),this.queryEngine.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.targetDataByTarget))}}function Bc(e,t,n,r){return new Mc(e,t,n,r)}async function Lc(e,t){const n=I(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.initializeUserComponents(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let a=Ri();for(const e of r){i.push(e.batchId);for(const t of e.mutations)a=a.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)a=a.add(t.key)}return n.localDocuments.getDocuments(e,a).next(e=>({affectedDocuments:e,removedBatchIds:i,addedBatchIds:s}))})})}function qc(e,t){const n=I(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.remoteDocuments.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let a=xe.resolve();return s.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);v(null!==s,48541),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Ri();for(let n=0;n<e.mutationResults.length;++n){e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key))}return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}function Uc(e){const t=I(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.targetCache.getLastRemoteSnapshotVersion(e))}function zc(e,t){const n=I(e),r=t.snapshotVersion;let i=n.targetDataByTarget;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.remoteDocuments.newChangeBuffer({trackRemovals:!0});i=n.targetDataByTarget;const a=[];t.targetChanges.forEach((s,o)=>{const c=i.get(o);if(!c)return;a.push(n.targetCache.removeMatchingKeys(e,s.removedDocuments,o).next(()=>n.targetCache.addMatchingKeys(e,s.addedDocuments,o)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(o)?u=u.withResumeToken(vn.EMPTY_BYTE_STRING,de.min()).withLastLimboFreeSnapshotVersion(de.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),i=i.insert(o,u),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;const r=t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds();if(r>=Fc)return!0;const i=n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size;return i>0}(c,u,s)&&a.push(n.targetCache.updateTargetData(e,u))});let o=Ii(),c=Ri();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),a.push(Kc(e,s,t.documentUpdates).next(e=>{o=e.changedDocuments,c=e.existenceChangedKeys})),!r.isEqual(de.min())){const t=n.targetCache.getLastRemoteSnapshotVersion(e).next(t=>n.targetCache.setTargetsMetadata(e,e.currentSequenceNumber,r));a.push(t)}return xe.waitFor(a).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,o,c)).next(()=>o)}).then(e=>(n.targetDataByTarget=i,e))}function Kc(e,t,n){let r=Ri(),i=Ri();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Ii();return n.forEach((n,s)=>{const a=e.get(n);s.isFoundDocument()!==a.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(de.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):g(Vc,"Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",s.version)}),{changedDocuments:r,existenceChangedKeys:i}})}function Qc(e,t){const n=I(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=Mn),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Gc(e,t){const n=I(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.targetCache.getTargetData(e,t).next(i=>i?(r=i,xe.resolve(r)):n.targetCache.allocateTargetId(e).next(i=>(r=new _a(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.targetCache.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.targetDataByTarget.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.targetDataByTarget=n.targetDataByTarget.insert(e.targetId,e),n.targetIdByTarget.set(t,e.targetId)),e})}async function jc(e,t,n){const r=I(e),i=r.targetDataByTarget.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!Pe(e))throw e;g(Vc,`Failed to update sequence numbers for target ${t}: ${e}`)}r.targetDataByTarget=r.targetDataByTarget.remove(t),r.targetIdByTarget.delete(i.target)}function $c(e,t,n){const r=I(e);let i=de.min(),s=Ri();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=I(e),i=r.targetIdByTarget.get(n);return void 0!==i?xe.resolve(r.targetDataByTarget.get(i)):r.targetCache.getTargetData(t,n)}(r,e,ai(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.targetCache.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.queryEngine.getDocumentsMatchingQuery(e,t,n?i:de.min(),n?s:Ri())).next(e=>(Yc(r,wi(t),e),{documents:e,remoteKeys:s})))}function Wc(e,t){const n=I(e),r=I(n.targetCache),i=n.targetDataByTarget.get(t);return i?Promise.resolve(i.target):n.persistence.runTransaction("Get target data","readonly",e=>r.getTargetDataForTarget(e,t).next(e=>e?e.target:null))}function Hc(e,t){const n=I(e),r=n.collectionGroupReadTime.get(t)||de.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.remoteDocuments.getAllFromCollectionGroup(e,t,Te(r,he),Number.MAX_SAFE_INTEGER)).then(e=>(Yc(n,t,e),e))}function Yc(e,t,n){let r=e.collectionGroupReadTime.get(t)||de.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.collectionGroupReadTime.set(t,r)}async function Jc(e,t,n,r){const i=I(e);let s=Ri(),a=Ii();for(const e of n){const n=t.toDocumentKey(e.metadata.name);e.document&&(s=s.add(n));const r=t.toMutableDocument(e);r.setReadTime(t.toSnapshotVersion(e.metadata.readTime)),a=a.insert(n,r)}const o=i.remoteDocuments.newChangeBuffer({trackRemovals:!0}),c=await Gc(i,function(e){return ai(ti(W.fromString(`__bundle__/docs/${e}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",e=>Kc(e,o,a).next(t=>(o.apply(e),t)).next(t=>i.targetCache.removeMatchingKeysForTargetId(e,c.targetId).next(()=>i.targetCache.addMatchingKeys(e,s,c.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(e,t.changedDocuments,t.existenceChangedKeys)).next(()=>t.changedDocuments)))}async function Xc(e,t,n=Ri()){const r=await Gc(e,ai(qa(t.bundledQuery))),i=I(e);return i.persistence.runTransaction("Save named query","readwrite",e=>{const s=Ws(t.readTime);if(r.snapshotVersion.compareTo(s)>=0)return i.bundleCache.saveNamedQuery(e,t);const a=r.withResumeToken(vn.EMPTY_BYTE_STRING,s);return i.targetDataByTarget=i.targetDataByTarget.insert(a.targetId,a),i.targetCache.updateTargetData(e,a).next(()=>i.targetCache.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>i.targetCache.addMatchingKeys(e,n,r.targetId)).next(()=>i.bundleCache.saveNamedQuery(e,t))})}
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
class Zc{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
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
 */class eu{constructor(){this.initialized=!1,this.indexAutoCreationEnabled=!1,this.indexAutoCreationMinCollectionSize=100,this.relativeIndexReadCostPerDocument=(0,n.isSafari)()?8:Ne((0,n.getUA)())>0?6:4}initialize(e,t){this.localDocumentsView=e,this.indexManager=t,this.initialized=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.performQueryUsingIndex(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.performQueryUsingRemoteKeys(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new Zc;return this.executeFullCollectionScan(e,t,n).next(r=>{if(i.result=r,this.indexAutoCreationEnabled)return this.createCacheIndexes(e,t,n,r.size)})}).next(()=>i.result)}createCacheIndexes(e,t,n,r){return n.documentReadCount<this.indexAutoCreationMinCollectionSize?(p()<=i.LogLevel.DEBUG&&g("QueryEngine","SDK will not create cache indexes for query:",fi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.indexAutoCreationMinCollectionSize,"documents"),xe.resolve()):(p()<=i.LogLevel.DEBUG&&g("QueryEngine","Query:",fi(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.relativeIndexReadCostPerDocument*r?(p()<=i.LogLevel.DEBUG&&g("QueryEngine","The SDK decides to create cache indexes for query:",fi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ai(t))):xe.resolve())}performQueryUsingIndex(e,t){if(ni(t))return xe.resolve(null);let n=ai(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=di(t,null,"F"),n=ai(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=Ri(...r);return this.localDocumentsView.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.applyQuery(t,r);return this.needsRefill(t,s,i,n.readTime)?this.performQueryUsingIndex(e,di(t,null,"F")):this.appendRemainingResults(e,s,t,n)}))})))}performQueryUsingRemoteKeys(e,t,n,r){return ni(t)||r.isEqual(de.min())?xe.resolve(null):this.localDocumentsView.getDocuments(e,n).next(s=>{const a=this.applyQuery(t,s);return this.needsRefill(t,a,n,r)?xe.resolve(null):(p()<=i.LogLevel.DEBUG&&g("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),fi(t)),this.appendRemainingResults(e,a,t,Te(r,he)).next(e=>e))})}applyQuery(e,t){let n=new fn(bi(e));return t.forEach((t,r)=>{yi(e,r)&&(n=n.add(r))}),n}needsRefill(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}executeFullCollectionScan(e,t,n){return p()<=i.LogLevel.DEBUG&&g("QueryEngine","Using full collection scan to execute query:",fi(t)),this.localDocumentsView.getDocumentsMatchingQuery(e,t,Se.min(),n)}appendRemainingResults(e,t,n,r){return this.localDocumentsView.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const tu="firestore_clients";function nu(e,t){return`${tu}_${e}_${t}`}const ru="firestore_mutations";function iu(e,t,n){let r=`${ru}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const su="firestore_targets";function au(e,t){return`${su}_${e}_${t}`}
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
 */
const ou="SharedClientState";class cu{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static fromWebStorageEntry(e,t,n){const r=JSON.parse(n);let i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code,s&&(i=new C(r.error.code,r.error.message))),s?new cu(e,t,r.state,i):(f(ou,`Failed to parse mutation state for ID '${t}': ${n}`),null)}toWebStorageJSON(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class uu{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static fromWebStorageEntry(e,t){const n=JSON.parse(t);let r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code,i&&(r=new C(n.error.code,n.error.message))),i?new uu(e,n.state,r):(f(ou,`Failed to parse target state for ID '${e}': ${t}`),null)}toWebStorageJSON(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class lu{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static fromWebStorageEntry(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,i=Pi();for(let e=0;r&&e<n.activeTargetIds.length;++e)r=Un(n.activeTargetIds[e]),i=i.add(n.activeTargetIds[e]);return r?new lu(e,i):(f(ou,`Failed to parse client data for instance '${e}': ${t}`),null)}}class du{constructor(e,t){this.clientId=e,this.onlineState=t}static fromWebStorageEntry(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new du(t.clientId,t.onlineState):(f(ou,`Failed to parse online state: ${e}`),null)}}class hu{constructor(){this.activeTargetIds=Pi()}addQueryTarget(e){this.activeTargetIds=this.activeTargetIds.add(e)}removeQueryTarget(e){this.activeTargetIds=this.activeTargetIds.delete(e)}toWebStorageJSON(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class pu{constructor(e,t,n,r,i){this.window=e,this.queue=t,this.persistenceKey=n,this.localClientId=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.storageListener=this.handleWebStorageEvent.bind(this),this.activeClients=new pn(B),this.started=!1,this.earlyEvents=[];const s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.localClientStorageKey=nu(this.persistenceKey,this.localClientId),this.sequenceNumberKey=function(e){return`firestore_sequence_number_${e}`}(this.persistenceKey),this.activeClients=this.activeClients.insert(this.localClientId,new hu),this.clientStateKeyRe=new RegExp(`^${tu}_${s}_([^_]*)$`),this.mutationBatchKeyRe=new RegExp(`^${ru}_${s}_(\\d+)(?:_(.*))?$`),this.queryTargetKeyRe=new RegExp(`^${su}_${s}_(\\d+)$`),this.onlineStateKey=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.bundleLoadedKey=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.storageListener)}static isAvailable(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.getActiveClients();for(const t of e){if(t===this.localClientId)continue;const e=this.getItem(nu(this.persistenceKey,t));if(e){const n=lu.fromWebStorageEntry(t,e);n&&(this.activeClients=this.activeClients.insert(n.clientId,n))}}this.persistClientState();const t=this.storage.getItem(this.onlineStateKey);if(t){const e=this.fromWebStorageOnlineState(t);e&&this.handleOnlineStateEvent(e)}for(const e of this.earlyEvents)this.handleWebStorageEvent(e);this.earlyEvents=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.sequenceNumberKey,JSON.stringify(e))}getAllActiveQueryTargets(){return this.extractActiveQueryTargets(this.activeClients)}isActiveQueryTarget(e){let t=!1;return this.activeClients.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.persistMutationState(e,"pending")}updateMutationState(e,t,n){this.persistMutationState(e,t,n),this.removeMutationState(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(au(this.persistenceKey,e));if(t){const r=uu.fromWebStorageEntry(e,t);r&&(n=r.state)}}return t&&this.localClientState.addQueryTarget(e),this.persistClientState(),n}removeLocalQueryTarget(e){this.localClientState.removeQueryTarget(e),this.persistClientState()}isLocalQueryTarget(e){return this.localClientState.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(au(this.persistenceKey,e))}updateQueryState(e,t,n){this.persistQueryTargetState(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.removeMutationState(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.persistOnlineState(e)}notifyBundleLoaded(e){this.persistBundleLoadedState(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.storageListener),this.removeItem(this.localClientStorageKey),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return g(ou,"READ",e,t),t}setItem(e,t){g(ou,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){g(ou,"REMOVE",e),this.storage.removeItem(e)}handleWebStorageEvent(e){const t=e;if(t.storageArea===this.storage){if(g(ou,"EVENT",t.key,t.newValue),t.key===this.localClientStorageKey)return void f("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.queue.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.clientStateKeyRe.test(t.key)){if(null==t.newValue){const e=this.fromWebStorageClientStateKey(t.key);return this.handleClientStateEvent(e,null)}{const e=this.fromWebStorageClientState(t.key,t.newValue);if(e)return this.handleClientStateEvent(e.clientId,e)}}else if(this.mutationBatchKeyRe.test(t.key)){if(null!==t.newValue){const e=this.fromWebStorageMutationMetadata(t.key,t.newValue);if(e)return this.handleMutationBatchEvent(e)}}else if(this.queryTargetKeyRe.test(t.key)){if(null!==t.newValue){const e=this.fromWebStorageQueryTargetMetadata(t.key,t.newValue);if(e)return this.handleQueryTargetEvent(e)}}else if(t.key===this.onlineStateKey){if(null!==t.newValue){const e=this.fromWebStorageOnlineState(t.newValue);if(e)return this.handleOnlineStateEvent(e)}}else if(t.key===this.sequenceNumberKey){const e=function(e){let t=ze.INVALID;if(null!=e)try{const n=JSON.parse(e);v("number"==typeof n,30636,{seqString:e}),t=n}catch(e){f(ou,"Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==ze.INVALID&&this.sequenceNumberHandler(e)}else if(t.key===this.bundleLoadedKey){const e=this.fromWebStoreBundleLoadedState(t.newValue);await Promise.all(e.map(e=>this.syncEngine.synchronizeWithChangedDocuments(e)))}}else this.earlyEvents.push(t)})}}get localClientState(){return this.activeClients.get(this.localClientId)}persistClientState(){this.setItem(this.localClientStorageKey,this.localClientState.toWebStorageJSON())}persistMutationState(e,t,n){const r=new cu(this.currentUser,e,t,n),i=iu(this.persistenceKey,this.currentUser,e);this.setItem(i,r.toWebStorageJSON())}removeMutationState(e){const t=iu(this.persistenceKey,this.currentUser,e);this.removeItem(t)}persistOnlineState(e){const t={clientId:this.localClientId,onlineState:e};this.storage.setItem(this.onlineStateKey,JSON.stringify(t))}persistQueryTargetState(e,t,n){const r=au(this.persistenceKey,e),i=new uu(e,t,n);this.setItem(r,i.toWebStorageJSON())}persistBundleLoadedState(e){const t=JSON.stringify(Array.from(e));this.setItem(this.bundleLoadedKey,t)}fromWebStorageClientStateKey(e){const t=this.clientStateKeyRe.exec(e);return t?t[1]:null}fromWebStorageClientState(e,t){const n=this.fromWebStorageClientStateKey(e);return lu.fromWebStorageEntry(n,t)}fromWebStorageMutationMetadata(e,t){const n=this.mutationBatchKeyRe.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return cu.fromWebStorageEntry(new u(i),r,t)}fromWebStorageQueryTargetMetadata(e,t){const n=this.queryTargetKeyRe.exec(e),r=Number(n[1]);return uu.fromWebStorageEntry(r,t)}fromWebStorageOnlineState(e){return du.fromWebStorageEntry(e)}fromWebStoreBundleLoadedState(e){return JSON.parse(e)}async handleMutationBatchEvent(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.applyBatchState(e.batchId,e.state,e.error);g(ou,`Ignoring mutation for non-active user ${e.user.uid}`)}handleQueryTargetEvent(e){return this.syncEngine.applyTargetState(e.targetId,e.state,e.error)}handleClientStateEvent(e,t){const n=t?this.activeClients.insert(e,t):this.activeClients.remove(e),r=this.extractActiveQueryTargets(this.activeClients),i=this.extractActiveQueryTargets(n),s=[],a=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||a.push(e)}),this.syncEngine.applyActiveTargetsChange(s,a).then(()=>{this.activeClients=n})}handleOnlineStateEvent(e){this.activeClients.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}extractActiveQueryTargets(e){let t=Pi();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class mu{constructor(){this.localState=new hu,this.queryState={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.localState.addQueryTarget(e),this.queryState[e]||"not-current"}updateQueryState(e,t,n){this.queryState[e]=t}removeLocalQueryTarget(e){this.localState.removeQueryTarget(e)}isLocalQueryTarget(e){return this.localState.activeTargetIds.has(e)}clearQueryState(e){delete this.queryState[e]}getAllActiveQueryTargets(){return this.localState.activeTargetIds}isActiveQueryTarget(e){return this.localState.activeTargetIds.has(e)}start(){return this.localState=new hu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */class gu{addCallback(e){}shutdown(){}}
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
 */class fu{constructor(e){this.sendFn=e.sendFn,this.closeFn=e.closeFn}onConnected(e){this.wrappedOnConnected=e}onOpen(e){this.wrappedOnOpen=e}onClose(e){this.wrappedOnClose=e}onMessage(e){this.wrappedOnMessage=e}close(){this.closeFn()}send(e){this.sendFn(e)}callOnConnected(){this.wrappedOnConnected()}callOnOpen(){this.wrappedOnOpen()}callOnClose(e){this.wrappedOnClose(e)}callOnMessage(e){this.wrappedOnMessage(e)}}
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
 */let yu=null;function wu(){return null===yu?yu=268435456+Math.round(2147483648*Math.random()):yu++,"0x"+yu.toString(16)}
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
const bu="GrpcConnection",Tu=`gl-node/${process.versions.node} fire/${l} grpc/1.9.15`;function vu(e,t,n,r,i){v(null===t||"OAuth"===t.type,36936);const s=new o.Metadata;return t&&t.headers.forEach((e,t)=>s.set(t,e)),n&&n.headers.forEach((e,t)=>s.set(t,e)),r&&s.set("X-Firebase-GMPID",r),s.set("X-Goog-Api-Client",Tu),s.set("Google-Cloud-Resource-Prefix",e),s.set("x-goog-request-params",e),i&&s.set("X-Goog-Api-Key",i),s}class Su{get shouldResourcePathBeIncludedInRequest(){return!0}constructor(e,t){this.databaseInfo=t,this.cachedStub=null,this.firestore=e.google.firestore.v1,this.databasePath=`projects/${t.databaseId.projectId}/databases/${t.databaseId.database}`}ensureActiveStub(){if(!this.cachedStub){g(bu,"Creating Firestore stub.");const e=this.databaseInfo.ssl?o.credentials.createSsl():o.credentials.createInsecure();this.cachedStub=new this.firestore.Firestore(this.databaseInfo.host,e)}return this.cachedStub}invokeRPC(e,t,n,r,i){const s=wu(),a=this.ensureActiveStub(),o=vu(this.databasePath,r,i,this.databaseInfo.appId,this.databaseInfo.apiKey),c={database:this.databasePath,...n};return u=t=>(g(bu,`RPC '${e}' ${s} invoked with request:`,n),a[e](c,o,(n,r)=>{n?(g(bu,`RPC '${e}' ${s} failed with error:`,n),t(new C(Ts(n.code),n.message))):(g(bu,`RPC '${e}' ${s} completed with response:`,r),t(void 0,r))})),new Promise((e,t)=>{u((n,r)=>{n?t(n):e(r)})});var u}invokeStreamingRPC(e,t,n,r,i,s){const a=wu(),o=[],c=new D;g(bu,`RPC '${e}' ${a} invoked (streaming) with request:`,n);const u=this.ensureActiveStub(),l=vu(this.databasePath,r,i,this.databaseInfo.appId,this.databaseInfo.apiKey),d={...n,database:this.databasePath},h=u[e](d,l);let p=!1;return h.on("data",t=>{g(bu,`RPC ${e} ${a} received result:`,t),o.push(t),void 0!==s&&o.length===s&&(p=!0,c.resolve(o))}),h.on("end",()=>{g(bu,`RPC '${e}' ${a} completed.`),p||(p=!0,c.resolve(o))}),h.on("error",t=>{g(bu,`RPC '${e}' ${a} failed with error:`,t);const n=Ts(t.code);c.reject(new C(n,t.message))}),c.promise}openStream(e,t,n){const r=wu(),i=this.ensureActiveStub(),s=vu(this.databasePath,t,n,this.databaseInfo.appId,this.databaseInfo.apiKey),a=i[e](s);let o=!1;const c=e=>{o||(o=!0,u.callOnClose(e),a.end())},u=new fu({sendFn:t=>{if(o)g(bu,`RPC '${e}' stream ${r} not sending because gRPC stream is closed:`,t);else{g(bu,`RPC '${e}' stream ${r} sending:`,t);try{a.write(t)}catch(e){throw f("Failure sending:",t),f("Error:",e),e}}},closeFn:()=>{g(bu,`RPC '${e}' stream ${r} closed locally via close().`),c()}});let l=!1;return a.on("data",t=>{o||(g(bu,`RPC '${e}' stream ${r} received:`,t),l||(u.callOnConnected(),l=!0),u.callOnMessage(t))}),a.on("end",()=>{g(bu,`RPC '${e}' stream ${r} ended.`),c()}),a.on("error",t=>{if(!o){y(bu,`RPC '${e}' stream ${r} error. Code:`,t.code,"Message:",t.message);const n=Ts(t.code);c(new C(n,t.message))}}),g(bu,`Opening RPC '${e}' stream ${r} to ${this.databaseInfo.host}`),setTimeout(()=>{u.callOnOpen()},0),u}terminate(){this.cachedStub&&(this.cachedStub.close(),this.cachedStub=void 0)}}const Iu={google:{nested:{protobuf:{options:{go_package:"github.com/golang/protobuf/protoc-gen-go/descriptor;descriptor",java_package:"com.google.protobuf",java_outer_classname:"DescriptorProtos",csharp_namespace:"Google.Protobuf.Reflection",objc_class_prefix:"GPB",cc_enable_arenas:!0,optimize_for:"SPEED"},nested:{Struct:{fields:{fields:{keyType:"string",type:"Value",id:1}}},Value:{oneofs:{kind:{oneof:["nullValue","numberValue","stringValue","boolValue","structValue","listValue"]}},fields:{nullValue:{type:"NullValue",id:1},numberValue:{type:"double",id:2},stringValue:{type:"string",id:3},boolValue:{type:"bool",id:4},structValue:{type:"Struct",id:5},listValue:{type:"ListValue",id:6}}},NullValue:{values:{NULL_VALUE:0}},ListValue:{fields:{values:{rule:"repeated",type:"Value",id:1}}},Timestamp:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}},FileDescriptorSet:{fields:{file:{rule:"repeated",type:"FileDescriptorProto",id:1}}},FileDescriptorProto:{fields:{name:{type:"string",id:1},package:{type:"string",id:2},dependency:{rule:"repeated",type:"string",id:3},publicDependency:{rule:"repeated",type:"int32",id:10,options:{packed:!1}},weakDependency:{rule:"repeated",type:"int32",id:11,options:{packed:!1}},messageType:{rule:"repeated",type:"DescriptorProto",id:4},enumType:{rule:"repeated",type:"EnumDescriptorProto",id:5},service:{rule:"repeated",type:"ServiceDescriptorProto",id:6},extension:{rule:"repeated",type:"FieldDescriptorProto",id:7},options:{type:"FileOptions",id:8},sourceCodeInfo:{type:"SourceCodeInfo",id:9},syntax:{type:"string",id:12}}},DescriptorProto:{fields:{name:{type:"string",id:1},field:{rule:"repeated",type:"FieldDescriptorProto",id:2},extension:{rule:"repeated",type:"FieldDescriptorProto",id:6},nestedType:{rule:"repeated",type:"DescriptorProto",id:3},enumType:{rule:"repeated",type:"EnumDescriptorProto",id:4},extensionRange:{rule:"repeated",type:"ExtensionRange",id:5},oneofDecl:{rule:"repeated",type:"OneofDescriptorProto",id:8},options:{type:"MessageOptions",id:7},reservedRange:{rule:"repeated",type:"ReservedRange",id:9},reservedName:{rule:"repeated",type:"string",id:10}},nested:{ExtensionRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2},options:{type:"ExtensionRangeOptions",id:3}}},ReservedRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2}}}}},ExtensionRangeOptions:{fields:{uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},FieldDescriptorProto:{fields:{name:{type:"string",id:1},number:{type:"int32",id:3},label:{type:"Label",id:4},type:{type:"Type",id:5},typeName:{type:"string",id:6},extendee:{type:"string",id:2},defaultValue:{type:"string",id:7},oneofIndex:{type:"int32",id:9},jsonName:{type:"string",id:10},options:{type:"FieldOptions",id:8}},nested:{Type:{values:{TYPE_DOUBLE:1,TYPE_FLOAT:2,TYPE_INT64:3,TYPE_UINT64:4,TYPE_INT32:5,TYPE_FIXED64:6,TYPE_FIXED32:7,TYPE_BOOL:8,TYPE_STRING:9,TYPE_GROUP:10,TYPE_MESSAGE:11,TYPE_BYTES:12,TYPE_UINT32:13,TYPE_ENUM:14,TYPE_SFIXED32:15,TYPE_SFIXED64:16,TYPE_SINT32:17,TYPE_SINT64:18}},Label:{values:{LABEL_OPTIONAL:1,LABEL_REQUIRED:2,LABEL_REPEATED:3}}}},OneofDescriptorProto:{fields:{name:{type:"string",id:1},options:{type:"OneofOptions",id:2}}},EnumDescriptorProto:{fields:{name:{type:"string",id:1},value:{rule:"repeated",type:"EnumValueDescriptorProto",id:2},options:{type:"EnumOptions",id:3},reservedRange:{rule:"repeated",type:"EnumReservedRange",id:4},reservedName:{rule:"repeated",type:"string",id:5}},nested:{EnumReservedRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2}}}}},EnumValueDescriptorProto:{fields:{name:{type:"string",id:1},number:{type:"int32",id:2},options:{type:"EnumValueOptions",id:3}}},ServiceDescriptorProto:{fields:{name:{type:"string",id:1},method:{rule:"repeated",type:"MethodDescriptorProto",id:2},options:{type:"ServiceOptions",id:3}}},MethodDescriptorProto:{fields:{name:{type:"string",id:1},inputType:{type:"string",id:2},outputType:{type:"string",id:3},options:{type:"MethodOptions",id:4},clientStreaming:{type:"bool",id:5,options:{default:!1}},serverStreaming:{type:"bool",id:6,options:{default:!1}}}},FileOptions:{fields:{javaPackage:{type:"string",id:1},javaOuterClassname:{type:"string",id:8},javaMultipleFiles:{type:"bool",id:10,options:{default:!1}},javaGenerateEqualsAndHash:{type:"bool",id:20,options:{deprecated:!0}},javaStringCheckUtf8:{type:"bool",id:27,options:{default:!1}},optimizeFor:{type:"OptimizeMode",id:9,options:{default:"SPEED"}},goPackage:{type:"string",id:11},ccGenericServices:{type:"bool",id:16,options:{default:!1}},javaGenericServices:{type:"bool",id:17,options:{default:!1}},pyGenericServices:{type:"bool",id:18,options:{default:!1}},phpGenericServices:{type:"bool",id:42,options:{default:!1}},deprecated:{type:"bool",id:23,options:{default:!1}},ccEnableArenas:{type:"bool",id:31,options:{default:!1}},objcClassPrefix:{type:"string",id:36},csharpNamespace:{type:"string",id:37},swiftPrefix:{type:"string",id:39},phpClassPrefix:{type:"string",id:40},phpNamespace:{type:"string",id:41},phpMetadataNamespace:{type:"string",id:44},rubyPackage:{type:"string",id:45},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[38,38]],nested:{OptimizeMode:{values:{SPEED:1,CODE_SIZE:2,LITE_RUNTIME:3}}}},MessageOptions:{fields:{messageSetWireFormat:{type:"bool",id:1,options:{default:!1}},noStandardDescriptorAccessor:{type:"bool",id:2,options:{default:!1}},deprecated:{type:"bool",id:3,options:{default:!1}},mapEntry:{type:"bool",id:7},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[8,8],[9,9]]},FieldOptions:{fields:{ctype:{type:"CType",id:1,options:{default:"STRING"}},packed:{type:"bool",id:2},jstype:{type:"JSType",id:6,options:{default:"JS_NORMAL"}},lazy:{type:"bool",id:5,options:{default:!1}},deprecated:{type:"bool",id:3,options:{default:!1}},weak:{type:"bool",id:10,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[4,4]],nested:{CType:{values:{STRING:0,CORD:1,STRING_PIECE:2}},JSType:{values:{JS_NORMAL:0,JS_STRING:1,JS_NUMBER:2}}}},OneofOptions:{fields:{uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},EnumOptions:{fields:{allowAlias:{type:"bool",id:2},deprecated:{type:"bool",id:3,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[5,5]]},EnumValueOptions:{fields:{deprecated:{type:"bool",id:1,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},ServiceOptions:{fields:{deprecated:{type:"bool",id:33,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},MethodOptions:{fields:{deprecated:{type:"bool",id:33,options:{default:!1}},idempotencyLevel:{type:"IdempotencyLevel",id:34,options:{default:"IDEMPOTENCY_UNKNOWN"}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],nested:{IdempotencyLevel:{values:{IDEMPOTENCY_UNKNOWN:0,NO_SIDE_EFFECTS:1,IDEMPOTENT:2}}}},UninterpretedOption:{fields:{name:{rule:"repeated",type:"NamePart",id:2},identifierValue:{type:"string",id:3},positiveIntValue:{type:"uint64",id:4},negativeIntValue:{type:"int64",id:5},doubleValue:{type:"double",id:6},stringValue:{type:"bytes",id:7},aggregateValue:{type:"string",id:8}},nested:{NamePart:{fields:{namePart:{rule:"required",type:"string",id:1},isExtension:{rule:"required",type:"bool",id:2}}}}},SourceCodeInfo:{fields:{location:{rule:"repeated",type:"Location",id:1}},nested:{Location:{fields:{path:{rule:"repeated",type:"int32",id:1},span:{rule:"repeated",type:"int32",id:2},leadingComments:{type:"string",id:3},trailingComments:{type:"string",id:4},leadingDetachedComments:{rule:"repeated",type:"string",id:6}}}}},GeneratedCodeInfo:{fields:{annotation:{rule:"repeated",type:"Annotation",id:1}},nested:{Annotation:{fields:{path:{rule:"repeated",type:"int32",id:1},sourceFile:{type:"string",id:2},begin:{type:"int32",id:3},end:{type:"int32",id:4}}}}},DoubleValue:{fields:{value:{type:"double",id:1}}},FloatValue:{fields:{value:{type:"float",id:1}}},Int64Value:{fields:{value:{type:"int64",id:1}}},UInt64Value:{fields:{value:{type:"uint64",id:1}}},Int32Value:{fields:{value:{type:"int32",id:1}}},UInt32Value:{fields:{value:{type:"uint32",id:1}}},BoolValue:{fields:{value:{type:"bool",id:1}}},StringValue:{fields:{value:{type:"string",id:1}}},BytesValue:{fields:{value:{type:"bytes",id:1}}},Empty:{fields:{}},Any:{fields:{type_url:{type:"string",id:1},value:{type:"bytes",id:2}}},Duration:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}},firestore:{nested:{v1:{options:{csharp_namespace:"Google.Cloud.Firestore.V1",go_package:"cloud.google.com/go/firestore/apiv1/firestorepb;firestorepb",java_multiple_files:!0,java_outer_classname:"QueryProfileProto",java_package:"com.google.firestore.v1",objc_class_prefix:"GCFS",php_namespace:"Google\\Cloud\\Firestore\\V1",ruby_package:"Google::Cloud::Firestore::V1"},nested:{AggregationResult:{fields:{aggregateFields:{keyType:"string",type:"Value",id:2}}},Document:{fields:{name:{type:"string",id:1},fields:{keyType:"string",type:"Value",id:2},createTime:{type:"google.protobuf.Timestamp",id:3},updateTime:{type:"google.protobuf.Timestamp",id:4}}},Value:{oneofs:{valueType:{oneof:["nullValue","booleanValue","integerValue","doubleValue","timestampValue","stringValue","bytesValue","referenceValue","geoPointValue","arrayValue","mapValue","fieldReferenceValue","functionValue","pipelineValue"]}},fields:{nullValue:{type:"google.protobuf.NullValue",id:11},booleanValue:{type:"bool",id:1},integerValue:{type:"int64",id:2},doubleValue:{type:"double",id:3},timestampValue:{type:"google.protobuf.Timestamp",id:10},stringValue:{type:"string",id:17},bytesValue:{type:"bytes",id:18},referenceValue:{type:"string",id:5},geoPointValue:{type:"google.type.LatLng",id:8},arrayValue:{type:"ArrayValue",id:9},mapValue:{type:"MapValue",id:6},fieldReferenceValue:{type:"string",id:19},functionValue:{type:"Function",id:20},pipelineValue:{type:"Pipeline",id:21}}},ArrayValue:{fields:{values:{rule:"repeated",type:"Value",id:1}}},MapValue:{fields:{fields:{keyType:"string",type:"Value",id:1}}},Function:{fields:{name:{type:"string",id:1},args:{rule:"repeated",type:"Value",id:2},options:{keyType:"string",type:"Value",id:3}}},Pipeline:{fields:{stages:{rule:"repeated",type:"Stage",id:1}},nested:{Stage:{fields:{name:{type:"string",id:1},args:{rule:"repeated",type:"Value",id:2},options:{keyType:"string",type:"Value",id:3}}}}},BitSequence:{fields:{bitmap:{type:"bytes",id:1},padding:{type:"int32",id:2}}},BloomFilter:{fields:{bits:{type:"BitSequence",id:1},hashCount:{type:"int32",id:2}}},DocumentMask:{fields:{fieldPaths:{rule:"repeated",type:"string",id:1}}},Precondition:{oneofs:{conditionType:{oneof:["exists","updateTime"]}},fields:{exists:{type:"bool",id:1},updateTime:{type:"google.protobuf.Timestamp",id:2}}},TransactionOptions:{oneofs:{mode:{oneof:["readOnly","readWrite"]}},fields:{readOnly:{type:"ReadOnly",id:2},readWrite:{type:"ReadWrite",id:3}},nested:{ReadWrite:{fields:{retryTransaction:{type:"bytes",id:1}}},ReadOnly:{oneofs:{consistencySelector:{oneof:["readTime"]}},fields:{readTime:{type:"google.protobuf.Timestamp",id:2}}}}},Firestore:{options:{"(google.api.default_host)":"firestore.googleapis.com","(google.api.oauth_scopes)":"https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/datastore"},methods:{GetDocument:{requestType:"GetDocumentRequest",responseType:"Document",options:{"(google.api.http).get":"/v1/{name=projects/*/databases/*/documents/*/**}"},parsedOptions:[{"(google.api.http)":{get:"/v1/{name=projects/*/databases/*/documents/*/**}"}}]},ListDocuments:{requestType:"ListDocumentsRequest",responseType:"ListDocumentsResponse",options:{"(google.api.http).get":"/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"},parsedOptions:[{"(google.api.http)":{get:"/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"}}]},UpdateDocument:{requestType:"UpdateDocumentRequest",responseType:"Document",options:{"(google.api.http).patch":"/v1/{document.name=projects/*/databases/*/documents/*/**}","(google.api.http).body":"document","(google.api.method_signature)":"document,update_mask"},parsedOptions:[{"(google.api.http)":{patch:"/v1/{document.name=projects/*/databases/*/documents/*/**}",body:"document"}},{"(google.api.method_signature)":"document,update_mask"}]},DeleteDocument:{requestType:"DeleteDocumentRequest",responseType:"google.protobuf.Empty",options:{"(google.api.http).delete":"/v1/{name=projects/*/databases/*/documents/*/**}","(google.api.method_signature)":"name"},parsedOptions:[{"(google.api.http)":{delete:"/v1/{name=projects/*/databases/*/documents/*/**}"}},{"(google.api.method_signature)":"name"}]},BatchGetDocuments:{requestType:"BatchGetDocumentsRequest",responseType:"BatchGetDocumentsResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:batchGet","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:batchGet",body:"*"}}]},BeginTransaction:{requestType:"BeginTransactionRequest",responseType:"BeginTransactionResponse",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:beginTransaction","(google.api.http).body":"*","(google.api.method_signature)":"database"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:beginTransaction",body:"*"}},{"(google.api.method_signature)":"database"}]},Commit:{requestType:"CommitRequest",responseType:"CommitResponse",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:commit","(google.api.http).body":"*","(google.api.method_signature)":"database,writes"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:commit",body:"*"}},{"(google.api.method_signature)":"database,writes"}]},Rollback:{requestType:"RollbackRequest",responseType:"google.protobuf.Empty",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:rollback","(google.api.http).body":"*","(google.api.method_signature)":"database,transaction"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:rollback",body:"*"}},{"(google.api.method_signature)":"database,transaction"}]},RunQuery:{requestType:"RunQueryRequest",responseType:"RunQueryResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:runQuery","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery","(google.api.http).additional_bindings.body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:runQuery",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery",body:"*"}}}]},ExecutePipeline:{requestType:"ExecutePipelineRequest",responseType:"ExecutePipelineResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:executePipeline","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:executePipeline",body:"*"}}]},RunAggregationQuery:{requestType:"RunAggregationQueryRequest",responseType:"RunAggregationQueryResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery","(google.api.http).additional_bindings.body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery",body:"*"}}}]},PartitionQuery:{requestType:"PartitionQueryRequest",responseType:"PartitionQueryResponse",options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:partitionQuery","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery","(google.api.http).additional_bindings.body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:partitionQuery",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery",body:"*"}}}]},Write:{requestType:"WriteRequest",requestStream:!0,responseType:"WriteResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:write","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:write",body:"*"}}]},Listen:{requestType:"ListenRequest",requestStream:!0,responseType:"ListenResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:listen","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:listen",body:"*"}}]},ListCollectionIds:{requestType:"ListCollectionIdsRequest",responseType:"ListCollectionIdsResponse",options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:listCollectionIds","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds","(google.api.http).additional_bindings.body":"*","(google.api.method_signature)":"parent"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:listCollectionIds",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds",body:"*"}}},{"(google.api.method_signature)":"parent"}]},BatchWrite:{requestType:"BatchWriteRequest",responseType:"BatchWriteResponse",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:batchWrite","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:batchWrite",body:"*"}}]},CreateDocument:{requestType:"CreateDocumentRequest",responseType:"Document",options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}","(google.api.http).body":"document"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}",body:"document"}}]}}},GetDocumentRequest:{oneofs:{consistencySelector:{oneof:["transaction","readTime"]}},fields:{name:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},mask:{type:"DocumentMask",id:2},transaction:{type:"bytes",id:3},readTime:{type:"google.protobuf.Timestamp",id:5}}},ListDocumentsRequest:{oneofs:{consistencySelector:{oneof:["transaction","readTime"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},collectionId:{type:"string",id:2,options:{"(google.api.field_behavior)":"REQUIRED"}},pageSize:{type:"int32",id:3},pageToken:{type:"string",id:4},orderBy:{type:"string",id:6},mask:{type:"DocumentMask",id:7},transaction:{type:"bytes",id:8},readTime:{type:"google.protobuf.Timestamp",id:10},showMissing:{type:"bool",id:12}}},ListDocumentsResponse:{fields:{documents:{rule:"repeated",type:"Document",id:1},nextPageToken:{type:"string",id:2}}},CreateDocumentRequest:{fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},collectionId:{type:"string",id:2,options:{"(google.api.field_behavior)":"REQUIRED"}},documentId:{type:"string",id:3},document:{type:"Document",id:4,options:{"(google.api.field_behavior)":"REQUIRED"}},mask:{type:"DocumentMask",id:5}}},UpdateDocumentRequest:{fields:{document:{type:"Document",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},updateMask:{type:"DocumentMask",id:2},mask:{type:"DocumentMask",id:3},currentDocument:{type:"Precondition",id:4}}},DeleteDocumentRequest:{fields:{name:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},currentDocument:{type:"Precondition",id:2}}},BatchGetDocumentsRequest:{oneofs:{consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},documents:{rule:"repeated",type:"string",id:2},mask:{type:"DocumentMask",id:3},transaction:{type:"bytes",id:4},newTransaction:{type:"TransactionOptions",id:5},readTime:{type:"google.protobuf.Timestamp",id:7}}},BatchGetDocumentsResponse:{oneofs:{result:{oneof:["found","missing"]}},fields:{found:{type:"Document",id:1},missing:{type:"string",id:2},transaction:{type:"bytes",id:3},readTime:{type:"google.protobuf.Timestamp",id:4}}},BeginTransactionRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},options:{type:"TransactionOptions",id:2}}},BeginTransactionResponse:{fields:{transaction:{type:"bytes",id:1}}},CommitRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},writes:{rule:"repeated",type:"Write",id:2},transaction:{type:"bytes",id:3}}},CommitResponse:{fields:{writeResults:{rule:"repeated",type:"WriteResult",id:1},commitTime:{type:"google.protobuf.Timestamp",id:2}}},RollbackRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},transaction:{type:"bytes",id:2,options:{"(google.api.field_behavior)":"REQUIRED"}}}},RunQueryRequest:{oneofs:{queryType:{oneof:["structuredQuery"]},consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredQuery:{type:"StructuredQuery",id:2},transaction:{type:"bytes",id:5},newTransaction:{type:"TransactionOptions",id:6},readTime:{type:"google.protobuf.Timestamp",id:7}}},RunQueryResponse:{fields:{transaction:{type:"bytes",id:2},document:{type:"Document",id:1},readTime:{type:"google.protobuf.Timestamp",id:3},skippedResults:{type:"int32",id:4}}},ExecutePipelineRequest:{oneofs:{pipelineType:{oneof:["structuredPipeline"]},consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredPipeline:{type:"StructuredPipeline",id:2},transaction:{type:"bytes",id:5},newTransaction:{type:"TransactionOptions",id:6},readTime:{type:"google.protobuf.Timestamp",id:7}}},ExecutePipelineResponse:{fields:{transaction:{type:"bytes",id:1},results:{rule:"repeated",type:"Document",id:2},executionTime:{type:"google.protobuf.Timestamp",id:3}}},RunAggregationQueryRequest:{oneofs:{queryType:{oneof:["structuredAggregationQuery"]},consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredAggregationQuery:{type:"StructuredAggregationQuery",id:2},transaction:{type:"bytes",id:4},newTransaction:{type:"TransactionOptions",id:5},readTime:{type:"google.protobuf.Timestamp",id:6}}},RunAggregationQueryResponse:{fields:{result:{type:"AggregationResult",id:1},transaction:{type:"bytes",id:2},readTime:{type:"google.protobuf.Timestamp",id:3}}},PartitionQueryRequest:{oneofs:{queryType:{oneof:["structuredQuery"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredQuery:{type:"StructuredQuery",id:2},partitionCount:{type:"int64",id:3},pageToken:{type:"string",id:4},pageSize:{type:"int32",id:5}}},PartitionQueryResponse:{fields:{partitions:{rule:"repeated",type:"Cursor",id:1},nextPageToken:{type:"string",id:2}}},WriteRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},streamId:{type:"string",id:2},writes:{rule:"repeated",type:"Write",id:3},streamToken:{type:"bytes",id:4},labels:{keyType:"string",type:"string",id:5}}},WriteResponse:{fields:{streamId:{type:"string",id:1},streamToken:{type:"bytes",id:2},writeResults:{rule:"repeated",type:"WriteResult",id:3},commitTime:{type:"google.protobuf.Timestamp",id:4}}},ListenRequest:{oneofs:{targetChange:{oneof:["addTarget","removeTarget"]}},fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},addTarget:{type:"Target",id:2},removeTarget:{type:"int32",id:3},labels:{keyType:"string",type:"string",id:4}}},ListenResponse:{oneofs:{responseType:{oneof:["targetChange","documentChange","documentDelete","documentRemove","filter"]}},fields:{targetChange:{type:"TargetChange",id:2},documentChange:{type:"DocumentChange",id:3},documentDelete:{type:"DocumentDelete",id:4},documentRemove:{type:"DocumentRemove",id:6},filter:{type:"ExistenceFilter",id:5}}},Target:{oneofs:{targetType:{oneof:["query","documents"]},resumeType:{oneof:["resumeToken","readTime"]}},fields:{query:{type:"QueryTarget",id:2},documents:{type:"DocumentsTarget",id:3},resumeToken:{type:"bytes",id:4},readTime:{type:"google.protobuf.Timestamp",id:11},targetId:{type:"int32",id:5},once:{type:"bool",id:6},expectedCount:{type:"google.protobuf.Int32Value",id:12}},nested:{DocumentsTarget:{fields:{documents:{rule:"repeated",type:"string",id:2}}},QueryTarget:{oneofs:{queryType:{oneof:["structuredQuery"]}},fields:{parent:{type:"string",id:1},structuredQuery:{type:"StructuredQuery",id:2}}}}},TargetChange:{fields:{targetChangeType:{type:"TargetChangeType",id:1},targetIds:{rule:"repeated",type:"int32",id:2},cause:{type:"google.rpc.Status",id:3},resumeToken:{type:"bytes",id:4},readTime:{type:"google.protobuf.Timestamp",id:6}},nested:{TargetChangeType:{values:{NO_CHANGE:0,ADD:1,REMOVE:2,CURRENT:3,RESET:4}}}},ListCollectionIdsRequest:{fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},pageSize:{type:"int32",id:2},pageToken:{type:"string",id:3}}},ListCollectionIdsResponse:{fields:{collectionIds:{rule:"repeated",type:"string",id:1},nextPageToken:{type:"string",id:2}}},BatchWriteRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},writes:{rule:"repeated",type:"Write",id:2},labels:{keyType:"string",type:"string",id:3}}},BatchWriteResponse:{fields:{writeResults:{rule:"repeated",type:"WriteResult",id:1},status:{rule:"repeated",type:"google.rpc.Status",id:2}}},StructuredPipeline:{fields:{pipeline:{type:"Pipeline",id:1},options:{keyType:"string",type:"Value",id:2}}},StructuredQuery:{fields:{select:{type:"Projection",id:1},from:{rule:"repeated",type:"CollectionSelector",id:2},where:{type:"Filter",id:3},orderBy:{rule:"repeated",type:"Order",id:4},startAt:{type:"Cursor",id:7},endAt:{type:"Cursor",id:8},offset:{type:"int32",id:6},limit:{type:"google.protobuf.Int32Value",id:5}},nested:{CollectionSelector:{fields:{collectionId:{type:"string",id:2},allDescendants:{type:"bool",id:3}}},Filter:{oneofs:{filterType:{oneof:["compositeFilter","fieldFilter","unaryFilter"]}},fields:{compositeFilter:{type:"CompositeFilter",id:1},fieldFilter:{type:"FieldFilter",id:2},unaryFilter:{type:"UnaryFilter",id:3}}},CompositeFilter:{fields:{op:{type:"Operator",id:1},filters:{rule:"repeated",type:"Filter",id:2}},nested:{Operator:{values:{OPERATOR_UNSPECIFIED:0,AND:1,OR:2}}}},FieldFilter:{fields:{field:{type:"FieldReference",id:1},op:{type:"Operator",id:2},value:{type:"Value",id:3}},nested:{Operator:{values:{OPERATOR_UNSPECIFIED:0,LESS_THAN:1,LESS_THAN_OR_EQUAL:2,GREATER_THAN:3,GREATER_THAN_OR_EQUAL:4,EQUAL:5,NOT_EQUAL:6,ARRAY_CONTAINS:7,IN:8,ARRAY_CONTAINS_ANY:9,NOT_IN:10}}}},UnaryFilter:{oneofs:{operandType:{oneof:["field"]}},fields:{op:{type:"Operator",id:1},field:{type:"FieldReference",id:2}},nested:{Operator:{values:{OPERATOR_UNSPECIFIED:0,IS_NAN:2,IS_NULL:3,IS_NOT_NAN:4,IS_NOT_NULL:5}}}},Order:{fields:{field:{type:"FieldReference",id:1},direction:{type:"Direction",id:2}}},FieldReference:{fields:{fieldPath:{type:"string",id:2}}},Projection:{fields:{fields:{rule:"repeated",type:"FieldReference",id:2}}},Direction:{values:{DIRECTION_UNSPECIFIED:0,ASCENDING:1,DESCENDING:2}}}},StructuredAggregationQuery:{oneofs:{queryType:{oneof:["structuredQuery"]}},fields:{structuredQuery:{type:"StructuredQuery",id:1},aggregations:{rule:"repeated",type:"Aggregation",id:3}},nested:{Aggregation:{oneofs:{operator:{oneof:["count","sum","avg"]}},fields:{count:{type:"Count",id:1},sum:{type:"Sum",id:2},avg:{type:"Avg",id:3},alias:{type:"string",id:7}},nested:{Count:{fields:{upTo:{type:"google.protobuf.Int64Value",id:1}}},Sum:{fields:{field:{type:"StructuredQuery.FieldReference",id:1}}},Avg:{fields:{field:{type:"StructuredQuery.FieldReference",id:1}}}}}}},Cursor:{fields:{values:{rule:"repeated",type:"Value",id:1},before:{type:"bool",id:2}}},Write:{oneofs:{operation:{oneof:["update","delete","verify","transform"]}},fields:{update:{type:"Document",id:1},delete:{type:"string",id:2},verify:{type:"string",id:5},transform:{type:"DocumentTransform",id:6},updateMask:{type:"DocumentMask",id:3},updateTransforms:{rule:"repeated",type:"DocumentTransform.FieldTransform",id:7},currentDocument:{type:"Precondition",id:4}}},DocumentTransform:{fields:{document:{type:"string",id:1},fieldTransforms:{rule:"repeated",type:"FieldTransform",id:2}},nested:{FieldTransform:{oneofs:{transformType:{oneof:["setToServerValue","increment","maximum","minimum","appendMissingElements","removeAllFromArray"]}},fields:{fieldPath:{type:"string",id:1},setToServerValue:{type:"ServerValue",id:2},increment:{type:"Value",id:3},maximum:{type:"Value",id:4},minimum:{type:"Value",id:5},appendMissingElements:{type:"ArrayValue",id:6},removeAllFromArray:{type:"ArrayValue",id:7}},nested:{ServerValue:{values:{SERVER_VALUE_UNSPECIFIED:0,REQUEST_TIME:1}}}}}},WriteResult:{fields:{updateTime:{type:"google.protobuf.Timestamp",id:1},transformResults:{rule:"repeated",type:"Value",id:2}}},DocumentChange:{fields:{document:{type:"Document",id:1},targetIds:{rule:"repeated",type:"int32",id:5},removedTargetIds:{rule:"repeated",type:"int32",id:6}}},DocumentDelete:{fields:{document:{type:"string",id:1},removedTargetIds:{rule:"repeated",type:"int32",id:6},readTime:{type:"google.protobuf.Timestamp",id:4}}},DocumentRemove:{fields:{document:{type:"string",id:1},removedTargetIds:{rule:"repeated",type:"int32",id:2},readTime:{type:"google.protobuf.Timestamp",id:4}}},ExistenceFilter:{fields:{targetId:{type:"int32",id:1},count:{type:"int32",id:2},unchangedNames:{type:"BloomFilter",id:3}}},ExplainOptions:{fields:{analyze:{type:"bool",id:1,options:{"(google.api.field_behavior)":"OPTIONAL"}}}},ExplainMetrics:{fields:{planSummary:{type:"PlanSummary",id:1},executionStats:{type:"ExecutionStats",id:2}}},PlanSummary:{fields:{indexesUsed:{rule:"repeated",type:"google.protobuf.Struct",id:1}}},ExecutionStats:{fields:{resultsReturned:{type:"int64",id:1},executionDuration:{type:"google.protobuf.Duration",id:3},readOperations:{type:"int64",id:4},debugStats:{type:"google.protobuf.Struct",id:5}}}}}}},type:{options:{cc_enable_arenas:!0,go_package:"google.golang.org/genproto/googleapis/type/latlng;latlng",java_multiple_files:!0,java_outer_classname:"LatLngProto",java_package:"com.google.type",objc_class_prefix:"GTP"},nested:{LatLng:{fields:{latitude:{type:"double",id:1},longitude:{type:"double",id:2}}}}},api:{options:{go_package:"google.golang.org/genproto/googleapis/api;api",java_multiple_files:!0,java_outer_classname:"LaunchStageProto",java_package:"com.google.api",objc_class_prefix:"GAPI",cc_enable_arenas:!0},nested:{http:{type:"HttpRule",id:72295728,extend:"google.protobuf.MethodOptions"},Http:{fields:{rules:{rule:"repeated",type:"HttpRule",id:1},fullyDecodeReservedExpansion:{type:"bool",id:2}}},HttpRule:{oneofs:{pattern:{oneof:["get","put","post","delete","patch","custom"]}},fields:{selector:{type:"string",id:1},get:{type:"string",id:2},put:{type:"string",id:3},post:{type:"string",id:4},delete:{type:"string",id:5},patch:{type:"string",id:6},custom:{type:"CustomHttpPattern",id:8},body:{type:"string",id:7},responseBody:{type:"string",id:12},additionalBindings:{rule:"repeated",type:"HttpRule",id:11}}},CustomHttpPattern:{fields:{kind:{type:"string",id:1},path:{type:"string",id:2}}},methodSignature:{rule:"repeated",type:"string",id:1051,extend:"google.protobuf.MethodOptions"},defaultHost:{type:"string",id:1049,extend:"google.protobuf.ServiceOptions"},oauthScopes:{type:"string",id:1050,extend:"google.protobuf.ServiceOptions"},fieldBehavior:{rule:"repeated",type:"google.api.FieldBehavior",id:1052,extend:"google.protobuf.FieldOptions"},FieldBehavior:{values:{FIELD_BEHAVIOR_UNSPECIFIED:0,OPTIONAL:1,REQUIRED:2,OUTPUT_ONLY:3,INPUT_ONLY:4,IMMUTABLE:5,UNORDERED_LIST:6,NON_EMPTY_DEFAULT:7}},LaunchStage:{values:{LAUNCH_STAGE_UNSPECIFIED:0,UNIMPLEMENTED:6,PRELAUNCH:7,EARLY_ACCESS:1,ALPHA:2,BETA:3,GA:4,DEPRECATED:5}}}},rpc:{options:{cc_enable_arenas:!0,go_package:"google.golang.org/genproto/googleapis/rpc/status;status",java_multiple_files:!0,java_outer_classname:"StatusProto",java_package:"com.google.rpc",objc_class_prefix:"RPC"},nested:{Status:{fields:{code:{type:"int32",id:1},message:{type:"string",id:2},details:{rule:"repeated",type:"google.protobuf.Any",id:3}}}}}}}};var Eu={nested:Iu},Cu=Object.freeze({__proto__:null,nested:Iu,default:Eu});
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
 */const Du={longs:String,enums:String,defaults:!0,oneofs:!1};
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
 */function xu(e){const t=function(){const e=c.fromJSON(Cu,Du);return o.loadPackageDefinition(e)}();return new Su(t,e)}
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
 */function ku(){return"YES"===process.env.USE_MOCK_PERSISTENCE?window:null}
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
function Au(e){return new zs(e,!1)}
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
 */class _u{constructor(e,t,n=1e3,r=1.5,i=6e4){this.queue=e,this.timerId=t,this.initialDelayMs=n,this.backoffFactor=r,this.maxDelayMs=i,this.currentBaseMs=0,this.timerPromise=null,this.lastAttemptTime=Date.now(),this.reset()}reset(){this.currentBaseMs=0}resetToMax(){this.currentBaseMs=this.maxDelayMs}backoffAndRun(e){this.cancel();const t=Math.floor(this.currentBaseMs+this.jitterDelayMs()),n=Math.max(0,Date.now()-this.lastAttemptTime),r=Math.max(0,t-n);r>0&&g("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.currentBaseMs} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.timerPromise=this.queue.enqueueAfterDelay(this.timerId,r,()=>(this.lastAttemptTime=Date.now(),e())),this.currentBaseMs*=this.backoffFactor,this.currentBaseMs<this.initialDelayMs&&(this.currentBaseMs=this.initialDelayMs),this.currentBaseMs>this.maxDelayMs&&(this.currentBaseMs=this.maxDelayMs)}skipBackoff(){null!==this.timerPromise&&(this.timerPromise.skipDelay(),this.timerPromise=null)}cancel(){null!==this.timerPromise&&(this.timerPromise.cancel(),this.timerPromise=null)}jitterDelayMs(){return(Math.random()-.5)*this.currentBaseMs}}
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
 */const Nu="PersistentStream";class Ru{constructor(e,t,n,r,i,s,a,o){this.queue=e,this.idleTimerId=n,this.healthTimerId=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.closeCount=0,this.idleTimer=null,this.healthCheck=null,this.stream=null,this.responseCount=0,this.backoff=new _u(e,t)}isStarted(){return 1===this.state||5===this.state||this.isOpen()}isOpen(){return 2===this.state||3===this.state}start(){this.responseCount=0,4!==this.state?this.auth():this.performBackoff()}async stop(){this.isStarted()&&await this.close(0)}inhibitBackoff(){this.state=0,this.backoff.reset()}markIdle(){this.isOpen()&&null===this.idleTimer&&(this.idleTimer=this.queue.enqueueAfterDelay(this.idleTimerId,6e4,()=>this.handleIdleCloseTimer()))}sendRequest(e){this.cancelIdleCheck(),this.stream.send(e)}async handleIdleCloseTimer(){if(this.isOpen())return this.close(0)}cancelIdleCheck(){this.idleTimer&&(this.idleTimer.cancel(),this.idleTimer=null)}cancelHealthCheck(){this.healthCheck&&(this.healthCheck.cancel(),this.healthCheck=null)}async close(e,t){this.cancelIdleCheck(),this.cancelHealthCheck(),this.backoff.cancel(),this.closeCount++,4!==e?this.backoff.reset():t&&t.code===E.RESOURCE_EXHAUSTED?(f(t.toString()),f("Using maximum backoff delay to prevent overloading the backend."),this.backoff.resetToMax()):t&&t.code===E.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.tearDown(),this.stream.close(),this.stream=null),this.state=e,await this.listener.onClose(t)}tearDown(){}auth(){this.state=1;const e=this.getCloseGuardedDispatcher(this.closeCount),t=this.closeCount;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.closeCount===t&&this.startStream(e,n)},t=>{e(()=>{const e=new C(E.UNKNOWN,"Fetching auth token failed: "+t.message);return this.handleStreamClose(e)})})}startStream(e,t){const n=this.getCloseGuardedDispatcher(this.closeCount);this.stream=this.startRpc(e,t),this.stream.onConnected(()=>{n(()=>this.listener.onConnected())}),this.stream.onOpen(()=>{n(()=>(this.state=2,this.healthCheck=this.queue.enqueueAfterDelay(this.healthTimerId,1e4,()=>(this.isOpen()&&(this.state=3),Promise.resolve())),this.listener.onOpen()))}),this.stream.onClose(e=>{n(()=>this.handleStreamClose(e))}),this.stream.onMessage(e=>{n(()=>1===++this.responseCount?this.onFirst(e):this.onNext(e))})}performBackoff(){this.state=5,this.backoff.backoffAndRun(async()=>{this.state=0,this.start()})}handleStreamClose(e){return g(Nu,`close with error: ${e}`),this.stream=null,this.close(4,e)}getCloseGuardedDispatcher(e){return t=>{this.queue.enqueueAndForget(()=>this.closeCount===e?t():(g(Nu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ou extends Ru{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}startRpc(e,t){return this.connection.openStream("Listen",e,t)}onFirst(e){return this.onNext(e)}onNext(e){this.backoff.reset();const t=ca(this.serializer,e),n=function(e){if(!("targetChange"in e))return de.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?de.min():t.readTime?Ws(t.readTime):de.min()}(e);return this.listener.onWatchChange(t,n)}watch(e){const t={};t.database=na(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=Hr(r)?{documents:ha(e,r)}:{query:pa(e,r).queryTarget},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=js(e,t.resumeToken);const r=Ks(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(de.min())>0){n.readTime=Qs(e,t.snapshotVersion.toTimestamp());const r=Ks(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=fa(this.serializer,e);n&&(t.labels=n),this.sendRequest(t)}unwatch(e){const t={};t.database=na(this.serializer),t.removeTarget=e,this.sendRequest(t)}}class Pu extends Ru{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get handshakeComplete(){return this.responseCount>0}start(){this.lastStreamToken=void 0,super.start()}tearDown(){this.handshakeComplete&&this.writeMutations([])}startRpc(e,t){return this.connection.openStream("Write",e,t)}onFirst(e){return v(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,v(!e.writeResults||0===e.writeResults.length,55816),this.listener.onHandshakeComplete()}onNext(e){v(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.backoff.reset();const t=da(e.writeResults,e.commitTime),n=Ws(e.commitTime);return this.listener.onMutationResult(n,t)}writeHandshake(){const e={};e.database=na(this.serializer),this.sendRequest(e)}writeMutations(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>ua(this.serializer,e))};this.sendRequest(t)}}
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
 */class Vu{}class Fu extends Vu{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.terminated=!1}verifyInitialized(){if(this.terminated)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.")}invokeRPC(e,t,n,r){return this.verifyInitialized(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.invokeRPC(e,Ys(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new C(E.UNKNOWN,e.toString())})}invokeStreamingRPC(e,t,n,r,i){return this.verifyInitialized(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.invokeStreamingRPC(e,Ys(t,n),r,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new C(E.UNKNOWN,e.toString())})}terminate(){this.terminated=!0,this.connection.terminate()}}function Mu(e,t,n,r){return new Fu(e,t,n,r)}class Bu{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.watchStreamFailures=0,this.onlineStateTimer=null,this.shouldWarnClientIsOffline=!0}handleWatchStreamStart(){0===this.watchStreamFailures&&(this.setAndBroadcast("Unknown"),this.onlineStateTimer=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.onlineStateTimer=null,this.logClientOfflineWarningIfNecessary("Backend didn't respond within 10 seconds."),this.setAndBroadcast("Offline"),Promise.resolve())))}handleWatchStreamFailure(e){"Online"===this.state?this.setAndBroadcast("Unknown"):(this.watchStreamFailures++,this.watchStreamFailures>=1&&(this.clearOnlineStateTimer(),this.logClientOfflineWarningIfNecessary(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.setAndBroadcast("Offline")))}set(e){this.clearOnlineStateTimer(),this.watchStreamFailures=0,"Online"===e&&(this.shouldWarnClientIsOffline=!1),this.setAndBroadcast(e)}setAndBroadcast(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}logClientOfflineWarningIfNecessary(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.shouldWarnClientIsOffline?(f(t),this.shouldWarnClientIsOffline=!1):g("OnlineStateTracker",t)}clearOnlineStateTimer(){null!==this.onlineStateTimer&&(this.onlineStateTimer.cancel(),this.onlineStateTimer=null)}}
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
 */const Lu="RemoteStore",qu=10;class Uu{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.writePipeline=[],this.listenTargets=new Map,this.offlineCauses=new Set,this.onNetworkStatusChange=[],this.connectivityMonitor=i,this.connectivityMonitor.addCallback(e=>{n.enqueueAndForget(async()=>{Yu(this)&&(g(Lu,"Restarting streams for network reachability change."),await async function(e){const t=I(e);t.offlineCauses.add(4),await Ku(t),t.onlineStateTracker.set("Unknown"),t.offlineCauses.delete(4),await zu(t)}(this))})}),this.onlineStateTracker=new Bu(n,r)}}async function zu(e){if(Yu(e))for(const t of e.onNetworkStatusChange)await t(!0)}async function Ku(e){for(const t of e.onNetworkStatusChange)await t(!1)}function Qu(e,t){const n=I(e);n.listenTargets.has(t.targetId)||(n.listenTargets.set(t.targetId,t),Hu(n)?Wu(n):gl(n).isOpen()&&ju(n,t))}function Gu(e,t){const n=I(e),r=gl(n);n.listenTargets.delete(t),r.isOpen()&&$u(n,t),0===n.listenTargets.size&&(r.isOpen()?r.markIdle():Yu(n)&&n.onlineStateTracker.set("Unknown"))}function ju(e,t){if(e.watchChangeAggregator.recordPendingTargetRequest(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(de.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}gl(e).watch(t)}function $u(e,t){e.watchChangeAggregator.recordPendingTargetRequest(t),gl(e).unwatch(t)}function Wu(e){e.watchChangeAggregator=new Fs({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),getTargetDataForTarget:t=>e.listenTargets.get(t)||null,getDatabaseId:()=>e.datastore.serializer.databaseId}),gl(e).start(),e.onlineStateTracker.handleWatchStreamStart()}function Hu(e){return Yu(e)&&!gl(e).isStarted()&&e.listenTargets.size>0}function Yu(e){return 0===I(e).offlineCauses.size}function Ju(e){e.watchChangeAggregator=void 0}async function Xu(e){e.onlineStateTracker.set("Online")}async function Zu(e){e.listenTargets.forEach((t,n)=>{ju(e,t)})}async function el(e,t){Ju(e),Hu(e)?(e.onlineStateTracker.handleWatchStreamFailure(t),Wu(e)):e.onlineStateTracker.set("Unknown")}async function tl(e,t,n){if(e.onlineStateTracker.set("Online"),t instanceof Ps&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.listenTargets.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.listenTargets.delete(r),e.watchChangeAggregator.removeTarget(r))}(e,t)}catch(n){g(Lu,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await nl(e,n)}else if(t instanceof Rs?e.watchChangeAggregator.handleDocumentChange(t):t instanceof Os?e.watchChangeAggregator.handleExistenceFilter(t):e.watchChangeAggregator.handleTargetChange(t),!n.isEqual(de.min()))try{const t=await Uc(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.watchChangeAggregator.createRemoteEvent(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.listenTargets.get(r);i&&e.listenTargets.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.listenTargets.get(t);if(!r)return;e.listenTargets.set(t,r.withResumeToken(vn.EMPTY_BYTE_STRING,r.snapshotVersion)),$u(e,t);const i=new _a(r.target,t,n,r.sequenceNumber);ju(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){g(Lu,"Failed to raise snapshot:",t),await nl(e,t)}}async function nl(e,t,n){if(!Pe(t))throw t;e.offlineCauses.add(1),await Ku(e),e.onlineStateTracker.set("Offline"),n||(n=()=>Uc(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{g(Lu,"Retrying IndexedDB access"),await n(),e.offlineCauses.delete(1),await zu(e)})}function rl(e,t){return t().catch(n=>nl(e,n,t))}async function il(e){const t=I(e),n=fl(t);let r=t.writePipeline.length>0?t.writePipeline[t.writePipeline.length-1].batchId:Mn;for(;sl(t);)try{const e=await Qc(t.localStore,r);if(null===e){0===t.writePipeline.length&&n.markIdle();break}r=e.batchId,al(t,e)}catch(e){await nl(t,e)}ol(t)&&cl(t)}function sl(e){return Yu(e)&&e.writePipeline.length<qu}function al(e,t){e.writePipeline.push(t);const n=fl(e);n.isOpen()&&n.handshakeComplete&&n.writeMutations(t.mutations)}function ol(e){return Yu(e)&&!fl(e).isStarted()&&e.writePipeline.length>0}function cl(e){fl(e).start()}async function ul(e){fl(e).writeHandshake()}async function ll(e){const t=fl(e);for(const n of e.writePipeline)t.writeMutations(n.mutations)}async function dl(e,t,n){const r=e.writePipeline.shift(),i=gs.from(r,t,n);await rl(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await il(e)}async function hl(e,t){t&&fl(e).handshakeComplete&&await async function(e,t){if(n=t.code,bs(n)&&n!==E.ABORTED){const n=e.writePipeline.shift();fl(e).inhibitBackoff(),await rl(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await il(e)}var n}(e,t),ol(e)&&cl(e)}async function pl(e,t){const n=I(e);n.asyncQueue.verifyOperationInProgress(),g(Lu,"RemoteStore received new credentials");const r=Yu(n);n.offlineCauses.add(3),await Ku(n),r&&n.onlineStateTracker.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.offlineCauses.delete(3),await zu(n)}async function ml(e,t){const n=I(e);t?(n.offlineCauses.delete(2),await zu(n)):t||(n.offlineCauses.add(2),await Ku(n),n.onlineStateTracker.set("Unknown"))}function gl(e){return e.watchStream||(e.watchStream=function(e,t,n){const r=I(e);return r.verifyInitialized(),new Ou(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}
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
 */(e.datastore,e.asyncQueue,{onConnected:Xu.bind(null,e),onOpen:Zu.bind(null,e),onClose:el.bind(null,e),onWatchChange:tl.bind(null,e)}),e.onNetworkStatusChange.push(async t=>{t?(e.watchStream.inhibitBackoff(),Hu(e)?Wu(e):e.onlineStateTracker.set("Unknown")):(await e.watchStream.stop(),Ju(e))})),e.watchStream}function fl(e){return e.writeStream||(e.writeStream=function(e,t,n){const r=I(e);return r.verifyInitialized(),new Pu(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{onConnected:()=>Promise.resolve(),onOpen:ul.bind(null,e),onClose:hl.bind(null,e),onHandshakeComplete:ll.bind(null,e),onMutationResult:dl.bind(null,e)}),e.onNetworkStatusChange.push(async t=>{t?(e.writeStream.inhibitBackoff(),await il(e)):(await e.writeStream.stop(),e.writePipeline.length>0&&(g(Lu,`Stopping write stream with ${e.writePipeline.length} pending writes`),e.writePipeline=[]))})),e.writeStream}
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
 */const yl="AsyncQueue";class wl{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new D,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,a=new wl(e,t,s,r,i);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new C(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bl(e,t){if(f(yl,`${t}: ${e}`),Pe(e))return new C(E.UNAVAILABLE,`${t}: ${e}`);throw e}
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
 */class Tl{static emptySet(e){return new Tl(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||J.comparator(t.key,n.key):(e,t)=>J.comparator(e.key,t.key),this.keyedMap=Ci(),this.sortedSet=new pn(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Tl))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Tl;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
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
 */class vl{constructor(){this.changeMap=new pn(J.comparator)}track(e){const t=e.doc.key,n=this.changeMap.get(t);n?0!==e.type&&3===n.type?this.changeMap=this.changeMap.insert(t,e):3===e.type&&1!==n.type?this.changeMap=this.changeMap.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.changeMap=this.changeMap.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.changeMap=this.changeMap.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.changeMap=this.changeMap.remove(t):1===e.type&&2===n.type?this.changeMap=this.changeMap.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.changeMap=this.changeMap.insert(t,{type:2,doc:e.doc}):b(63341,{change:e,oldChange:n}):this.changeMap=this.changeMap.insert(t,e)}getChanges(){const e=[];return this.changeMap.inorderTraversal((t,n)=>{e.push(n)}),e}}class Sl{constructor(e,t,n,r,i,s,a,o,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new Sl(e,t,Tl.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&mi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
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
 */class Il{constructor(){this.viewSnap=void 0,this.listeners=[]}hasRemoteListeners(){return this.listeners.some(e=>e.listensToRemoteStore())}}class El{constructor(){this.queries=Cl(),this.onlineState="Unknown",this.snapshotsInSyncListeners=new Set}terminate(){!function(e,t){const n=I(e),r=n.queries;n.queries=Cl(),r.forEach((e,n)=>{for(const e of n.listeners)e.onError(t)})}(this,new C(E.ABORTED,"Firestore shutting down"))}}function Cl(){return new vi(e=>gi(e),mi)}async function Dl(e,t){const n=I(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.hasRemoteListeners()&&t.listensToRemoteStore()&&(r=2):(s=new Il,r=t.listensToRemoteStore()?0:1);try{switch(r){case 0:s.viewSnap=await n.onListen(i,!0);break;case 1:s.viewSnap=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){const n=bl(e,`Initialization of query '${fi(t.query)}' failed`);return void t.onError(n)}if(n.queries.set(i,s),s.listeners.push(t),t.applyOnlineStateChange(n.onlineState),s.viewSnap){t.onViewSnapshot(s.viewSnap)&&_l(n)}}async function xl(e,t){const n=I(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.listeners.indexOf(t);e>=0&&(s.listeners.splice(e,1),0===s.listeners.length?i=t.listensToRemoteStore()?0:1:!s.hasRemoteListeners()&&t.listensToRemoteStore()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function kl(e,t){const n=I(e);let r=!1;for(const e of t){const t=e.query,i=n.queries.get(t);if(i){for(const t of i.listeners)t.onViewSnapshot(e)&&(r=!0);i.viewSnap=e}}r&&_l(n)}function Al(e,t,n){const r=I(e),i=r.queries.get(t);if(i)for(const e of i.listeners)e.onError(n);r.queries.delete(t)}function _l(e){e.snapshotsInSyncListeners.forEach(e=>{e.next()})}var Nl;!function(e){e.Default="default",e.Cache="cache"}(Nl||(Nl={}));class Rl{constructor(e,t,n){this.query=e,this.queryObserver=t,this.raisedInitialEvent=!1,this.snap=null,this.onlineState="Unknown",this.options=n||{}}onViewSnapshot(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Sl(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.raisedInitialEvent?this.shouldRaiseEvent(e)&&(this.queryObserver.next(e),t=!0):this.shouldRaiseInitialEvent(e,this.onlineState)&&(this.raiseInitialEvent(e),t=!0),this.snap=e,t}onError(e){this.queryObserver.error(e)}applyOnlineStateChange(e){this.onlineState=e;let t=!1;return this.snap&&!this.raisedInitialEvent&&this.shouldRaiseInitialEvent(this.snap,e)&&(this.raiseInitialEvent(this.snap),t=!0),t}shouldRaiseInitialEvent(e,t){if(!e.fromCache)return!0;if(!this.listensToRemoteStore())return!0;const n="Offline"!==t;return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}shouldRaiseEvent(e){if(e.docChanges.length>0)return!0;const t=this.snap&&this.snap.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}raiseInitialEvent(e){e=Sl.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.raisedInitialEvent=!0,this.queryObserver.next(e)}listensToRemoteStore(){return this.options.source!==Nl.Cache}}
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
 */class Ol{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.addedKeys=n,this.removedKeys=r}static fromSnapshot(e,t){let n=Ri(),r=Ri();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new Ol(e,t.fromCache,n,r)}}
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
 */class Pl{constructor(e){this.serializer=e}toDocumentKey(e){return Zs(this.serializer,e)}toMutableDocument(e){return e.metadata.exists?aa(this.serializer,e.document,!1):Tr.newNoDocument(this.toDocumentKey(e.metadata.name),this.toSnapshotVersion(e.metadata.readTime))}toSnapshotVersion(e){return Ws(e)}}class Vl{constructor(e,t){this.bundleMetadata=e,this.serializer=t,this._queries=[],this._documents=[],this.collectionGroups=new Set,this.progress=Fl(e)}get queries(){return this._queries}get documents(){return this._documents}addSizedElement(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.payload.namedQuery)this._queries.push(e.payload.namedQuery);else if(e.payload.documentMetadata){this._documents.push({metadata:e.payload.documentMetadata}),e.payload.documentMetadata.exists||++t;const n=W.fromString(e.payload.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.payload.document&&(this._documents[this._documents.length-1].document=e.payload.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}getQueryDocumentMapping(e){const t=new Map,n=new Pl(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.toDocumentKey(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||Ri()).add(e);t.set(n,r)}}return t}async completeAndStoreAsync(e){const t=await Jc(e,new Pl(this.serializer),this._documents,this.bundleMetadata.id),n=this.getQueryDocumentMapping(this.documents);for(const t of this._queries)await Xc(e,t,n.get(t.name));return this.progress.taskState="Success",{progress:this.progress,changedCollectionGroups:this.collectionGroups,changedDocs:t}}}function Fl(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
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
class Ml{constructor(e){this.key=e}}class Bl{constructor(e){this.key=e}}class Ll{constructor(e,t){this.query=e,this._syncedDocuments=t,this.syncState=null,this.hasCachedResults=!1,this.current=!1,this.limboDocuments=Ri(),this.mutatedKeys=Ri(),this.docComparator=bi(e),this.documentSet=new Tl(this.docComparator)}get syncedDocuments(){return this._syncedDocuments}computeDocChanges(e,t){const n=t?t.changeSet:new vl,r=t?t.documentSet:this.documentSet;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,a=!1;const o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=yi(this.query,t)?t:null,d=!!u&&this.mutatedKeys.has(u.key),h=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let p=!1;if(u&&l){u.data.isEqual(l.data)?d!==h&&(n.track({type:3,doc:l}),p=!0):this.shouldWaitForSyncedDocument(u,l)||(n.track({type:2,doc:l}),p=!0,(o&&this.docComparator(l,o)>0||c&&this.docComparator(l,c)<0)&&(a=!0))}else!u&&l?(n.track({type:0,doc:l}),p=!0):u&&!l&&(n.track({type:1,doc:u}),p=!0,(o||c)&&(a=!0));p&&(l?(s=s.add(l),i=h?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{documentSet:s,changeSet:n,needsRefill:a,mutatedKeys:i}}shouldWaitForSyncedDocument(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.documentSet;this.documentSet=e.documentSet,this.mutatedKeys=e.mutatedKeys;const s=e.changeSet.getChanges();s.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return b(20277,{change:e})}};return n(e)-n(t)}
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
 */(e.type,t.type)||this.docComparator(e.doc,t.doc)),this.applyTargetChange(n),r=r??!1;const a=t&&!r?this.updateLimboDocuments():[],o=0===this.limboDocuments.size&&this.current&&!r?1:0,c=o!==this.syncState;if(this.syncState=o,0!==s.length||c){return{snapshot:new Sl(this.query,e.documentSet,i,s,e.mutatedKeys,0===o,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),limboChanges:a}}return{limboChanges:a}}applyOnlineStateChange(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({documentSet:this.documentSet,changeSet:new vl,mutatedKeys:this.mutatedKeys,needsRefill:!1},!1)):{limboChanges:[]}}shouldBeInLimbo(e){return!this._syncedDocuments.has(e)&&(!!this.documentSet.has(e)&&!this.documentSet.get(e).hasLocalMutations)}applyTargetChange(e){e&&(e.addedDocuments.forEach(e=>this._syncedDocuments=this._syncedDocuments.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this._syncedDocuments=this._syncedDocuments.delete(e)),this.current=e.current)}updateLimboDocuments(){if(!this.current)return[];const e=this.limboDocuments;this.limboDocuments=Ri(),this.documentSet.forEach(e=>{this.shouldBeInLimbo(e.key)&&(this.limboDocuments=this.limboDocuments.add(e.key))});const t=[];return e.forEach(e=>{this.limboDocuments.has(e)||t.push(new Bl(e))}),this.limboDocuments.forEach(n=>{e.has(n)||t.push(new Ml(n))}),t}synchronizeWithPersistedState(e){this._syncedDocuments=e.remoteKeys,this.limboDocuments=Ri();const t=this.computeDocChanges(e.documents);return this.applyChanges(t,!0)}computeInitialSnapshot(){return Sl.fromInitialDocuments(this.query,this.documentSet,this.mutatedKeys,0===this.syncState,this.hasCachedResults)}}const ql="SyncEngine";class Ul{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class zl{constructor(e){this.key=e,this.receivedDocument=!1}}class Kl{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.syncEngineListener={},this.queryViewsByQuery=new vi(e=>gi(e),mi),this.queriesByTarget=new Map,this.enqueuedLimboResolutions=new Set,this.activeLimboTargetsByKey=new pn(J.comparator),this.activeLimboResolutionsByTarget=new Map,this.limboDocumentRefs=new mc,this.mutationUserCallbacks={},this.pendingWritesCallbacks=new Map,this.limboTargetIdGenerator=Mo.forSyncEngine(),this.onlineState="Unknown",this._isPrimaryClient=void 0}get isPrimaryClient(){return!0===this._isPrimaryClient}}async function Ql(e,t,n=!0){const r=Sd(e);let i;const s=r.queryViewsByQuery.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.computeInitialSnapshot()):i=await jl(r,t,n,!0),i}async function Gl(e,t){const n=Sd(e);await jl(n,t,!0,!1)}async function jl(e,t,n,r){const i=await Gc(e.localStore,ai(t)),s=i.targetId,a=e.sharedClientState.addLocalQueryTarget(s,n);let o;return r&&(o=await $l(e,t,s,"current"===a,i.resumeToken)),e.isPrimaryClient&&n&&Qu(e.remoteStore,i),o}async function $l(e,t,n,r,i){e.applyDocChanges=(t,n,r)=>async function(e,t,n,r){let i=t.view.computeDocChanges(n);i.needsRefill&&(i=await $c(e.localStore,t.query,!1).then(({documents:e})=>t.view.computeDocChanges(e,i)));const s=r&&r.targetChanges.get(t.targetId),a=r&&null!=r.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return od(e,t.targetId,o.limboChanges),o.snapshot}(e,t,n,r);const s=await $c(e.localStore,t,!0),a=new Ll(t,s.remoteKeys),o=a.computeDocChanges(s.documents),c=Ns.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,c);od(e,n,u.limboChanges);const l=new Ul(t,n,a);return e.queryViewsByQuery.set(t,l),e.queriesByTarget.has(n)?e.queriesByTarget.get(n).push(t):e.queriesByTarget.set(n,[t]),u.snapshot}async function Wl(e,t,n){const r=I(e),i=r.queryViewsByQuery.get(t),s=r.queriesByTarget.get(i.targetId);if(s.length>1)return r.queriesByTarget.set(i.targetId,s.filter(e=>!mi(e,t))),void r.queryViewsByQuery.delete(t);if(r.isPrimaryClient){r.sharedClientState.removeLocalQueryTarget(i.targetId);r.sharedClientState.isActiveQueryTarget(i.targetId)||await jc(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Gu(r.remoteStore,i.targetId),sd(r,i.targetId)}).catch(De)}else sd(r,i.targetId),await jc(r.localStore,i.targetId,!0)}async function Hl(e,t){const n=I(e),r=n.queryViewsByQuery.get(t),i=n.queriesByTarget.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Gu(n.remoteStore,r.targetId))}async function Yl(e,t,n){const r=Id(e);try{const e=await function(e,t){const n=I(e),r=le.now(),i=t.reduce((e,t)=>e.add(t.key),Ri());let s,a;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let o=Ii(),c=Ri();return n.remoteDocuments.getEntries(e,i).next(e=>{o=e,o.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,o)).next(i=>{s=i;const a=[];for(const e of t){const t=ss(e,s.get(e.key).overlayedDocument);null!=t&&a.push(new cs(e.key,t,br(t.value.mapValue),Zi.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,a,t)}).next(t=>{a=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:a.batchId,changes:Di(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.mutationUserCallbacks[e.currentUser.toKey()];r||(r=new pn(B));r=r.insert(t,n),e.mutationUserCallbacks[e.currentUser.toKey()]=r}(r,e.batchId,n),await ld(r,e.changes),await il(r.remoteStore)}catch(e){const t=bl(e,"Failed to persist write");n.reject(t)}}async function Jl(e,t){const n=I(e);try{const e=await zc(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.activeLimboResolutionsByTarget.get(t);r&&(v(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.receivedDocument=!0:e.modifiedDocuments.size>0?v(r.receivedDocument,14607):e.removedDocuments.size>0&&(v(r.receivedDocument,42227),r.receivedDocument=!1))}),await ld(n,e,t)}catch(e){await De(e)}}function Xl(e,t,n){const r=I(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.queryViewsByQuery.forEach((n,r)=>{const i=r.view.applyOnlineStateChange(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=I(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const e of n.listeners)e.applyOnlineStateChange(t)&&(r=!0)}),r&&_l(n)}(r.eventManager,t),e.length&&r.syncEngineListener.onWatchChange(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Zl(e,t,n){const r=I(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.activeLimboResolutionsByTarget.get(t),s=i&&i.key;if(s){let e=new pn(J.comparator);e=e.insert(s,Tr.newNoDocument(s,de.min()));const n=Ri().add(s),i=new _s(de.min(),new Map,new pn(B),e,n);await Jl(r,i),r.activeLimboTargetsByKey=r.activeLimboTargetsByKey.remove(s),r.activeLimboResolutionsByTarget.delete(t),ud(r)}else await jc(r.localStore,t,!1).then(()=>sd(r,t,n)).catch(De)}async function ed(e,t){const n=I(e),r=t.batch.batchId;try{const e=await qc(n.localStore,t);id(n,r,null),rd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await ld(n,e)}catch(e){await De(e)}}async function td(e,t,n){const r=I(e);try{const e=await function(e,t){const n=I(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(v(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);id(r,t,n),rd(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await ld(r,e)}catch(n){await De(n)}}async function nd(e,t){const n=I(e);Yu(n.remoteStore)||g(ql,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=I(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(n.localStore);if(e===Mn)return void t.resolve();const r=n.pendingWritesCallbacks.get(e)||[];r.push(t),n.pendingWritesCallbacks.set(e,r)}catch(e){const n=bl(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}function rd(e,t){(e.pendingWritesCallbacks.get(t)||[]).forEach(e=>{e.resolve()}),e.pendingWritesCallbacks.delete(t)}function id(e,t,n){const r=I(e);let i=r.mutationUserCallbacks[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.mutationUserCallbacks[r.currentUser.toKey()]=i}}function sd(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.queriesByTarget.get(t))e.queryViewsByQuery.delete(r),n&&e.syncEngineListener.onWatchError(r,n);if(e.queriesByTarget.delete(t),e.isPrimaryClient){e.limboDocumentRefs.removeReferencesForId(t).forEach(t=>{e.limboDocumentRefs.containsKey(t)||ad(e,t)})}}function ad(e,t){e.enqueuedLimboResolutions.delete(t.path.canonicalString());const n=e.activeLimboTargetsByKey.get(t);null!==n&&(Gu(e.remoteStore,n),e.activeLimboTargetsByKey=e.activeLimboTargetsByKey.remove(t),e.activeLimboResolutionsByTarget.delete(n),ud(e))}function od(e,t,n){for(const r of n)if(r instanceof Ml)e.limboDocumentRefs.addReference(r.key,t),cd(e,r);else if(r instanceof Bl){g(ql,"Document no longer in limbo: "+r.key),e.limboDocumentRefs.removeReference(r.key,t);e.limboDocumentRefs.containsKey(r.key)||ad(e,r.key)}else b(19791,{limboChange:r})}function cd(e,t){const n=t.key,r=n.path.canonicalString();e.activeLimboTargetsByKey.get(n)||e.enqueuedLimboResolutions.has(r)||(g(ql,"New document in limbo: "+n),e.enqueuedLimboResolutions.add(r),ud(e))}function ud(e){for(;e.enqueuedLimboResolutions.size>0&&e.activeLimboTargetsByKey.size<e.maxConcurrentLimboResolutions;){const t=e.enqueuedLimboResolutions.values().next().value;e.enqueuedLimboResolutions.delete(t);const n=new J(W.fromString(t)),r=e.limboTargetIdGenerator.next();e.activeLimboResolutionsByTarget.set(r,new zl(n)),e.activeLimboTargetsByKey=e.activeLimboTargetsByKey.insert(n,r),Qu(e.remoteStore,new _a(ai(ti(n.path)),r,"TargetPurposeLimboResolution",ze.INVALID))}}async function ld(e,t,n){const r=I(e),i=[],s=[],a=[];r.queryViewsByQuery.isEmpty()||(r.queryViewsByQuery.forEach((e,o)=>{a.push(r.applyDocChanges(o,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(o.targetId)?.current;r.sharedClientState.updateQueryState(o.targetId,t?"current":"not-current")}if(e){i.push(e);const t=Ol.fromSnapshot(o.targetId,e);s.push(t)}}))}),await Promise.all(a),r.syncEngineListener.onWatchChange(i),await async function(e,t){const n=I(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>xe.forEach(t,t=>xe.forEach(t.addedKeys,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>xe.forEach(t.removedKeys,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Pe(e))throw e;g(Vc,"Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.targetDataByTarget.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.targetDataByTarget=n.targetDataByTarget.insert(t,i)}}}(r.localStore,s))}async function dd(e,t){const n=I(e);if(!n.currentUser.isEqual(t)){g(ql,"User change. New user:",t.toKey());const e=await Lc(n.localStore,t);n.currentUser=t,function(e,t){e.pendingWritesCallbacks.forEach(e=>{e.forEach(e=>{e.reject(new C(E.CANCELLED,t))})}),e.pendingWritesCallbacks.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await ld(n,e.affectedDocuments)}}function hd(e,t){const n=I(e),r=n.activeLimboResolutionsByTarget.get(t);if(r&&r.receivedDocument)return Ri().add(r.key);{let e=Ri();const r=n.queriesByTarget.get(t);if(!r)return e;for(const t of r){const r=n.queryViewsByQuery.get(t);e=e.unionWith(r.view.syncedDocuments)}return e}}async function pd(e,t){const n=I(e),r=await $c(n.localStore,t.query,!0),i=t.view.synchronizeWithPersistedState(r);return n.isPrimaryClient&&od(n,t.targetId,i.limboChanges),i}async function md(e,t){const n=I(e);return Hc(n.localStore,t).then(e=>ld(n,e))}async function gd(e,t,n,r){const i=I(e),s=await function(e,t){const n=I(e),r=I(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.lookupMutationKeys(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):xe.resolve(null)))}(i.localStore,t);null!==s?("pending"===n?await il(i.remoteStore):"acknowledged"===n||"rejected"===n?(id(i,t,r||null),rd(i,t),function(e,t){I(I(e).mutationQueue).removeCachedMutationKeys(t)}(i.localStore,t)):b(6720,"Unknown batchState",{batchState:n}),await ld(i,s)):g(ql,"Cannot apply mutation batch with id: "+t)}async function fd(e,t){const n=I(e);if(Sd(n),Id(n),!0===t&&!0!==n._isPrimaryClient){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await yd(n,e.toArray());n._isPrimaryClient=!0,await ml(n.remoteStore,!0);for(const e of t)Qu(n.remoteStore,e)}else if(!1===t&&!1!==n._isPrimaryClient){const e=[];let t=Promise.resolve();n.queriesByTarget.forEach((r,i)=>{n.sharedClientState.isLocalQueryTarget(i)?e.push(i):t=t.then(()=>(sd(n,i),jc(n.localStore,i,!0))),Gu(n.remoteStore,i)}),await t,await yd(n,e),function(e){const t=I(e);t.activeLimboResolutionsByTarget.forEach((e,n)=>{Gu(t.remoteStore,n)}),t.limboDocumentRefs.removeAllReferences(),t.activeLimboResolutionsByTarget=new Map,t.activeLimboTargetsByKey=new pn(J.comparator)}(n),n._isPrimaryClient=!1,await ml(n.remoteStore,!1)}}async function yd(e,t,n){const r=I(e),i=[],s=[];for(const e of t){let t;const n=r.queriesByTarget.get(e);if(n&&0!==n.length){t=await Gc(r.localStore,ai(n[0]));for(const e of n){const t=r.queryViewsByQuery.get(e),n=await pd(r,t);n.snapshot&&s.push(n.snapshot)}}else{const n=await Wc(r.localStore,e);t=await Gc(r.localStore,n),await $l(r,wd(n),e,!1,t.resumeToken)}i.push(t)}return r.syncEngineListener.onWatchChange(s),i}function wd(e){return ei(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function bd(e){const t=I(e);return I(I(t.localStore).persistence).getActiveClients()}async function Td(e,t,n,r){const i=I(e);if(i._isPrimaryClient)return void g(ql,"Ignoring unexpected query state notification.");const s=i.queriesByTarget.get(t);if(s&&s.length>0)switch(n){case"current":case"not-current":{const e=await Hc(i.localStore,wi(s[0])),r=_s.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,vn.EMPTY_BYTE_STRING);await ld(i,e,r);break}case"rejected":await jc(i.localStore,t,!0),sd(i,t,r);break;default:b(64155,n)}}async function vd(e,t,n){const r=Sd(e);if(r._isPrimaryClient){for(const e of t){if(r.queriesByTarget.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){g(ql,"Adding an already active target "+e);continue}const t=await Wc(r.localStore,e),n=await Gc(r.localStore,t);await $l(r,wd(t),n.targetId,!1,n.resumeToken),Qu(r.remoteStore,n)}for(const e of n)r.queriesByTarget.has(e)&&await jc(r.localStore,e,!1).then(()=>{Gu(r.remoteStore,e),sd(r,e)}).catch(De)}}function Sd(e){const t=I(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Jl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=hd.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Zl.bind(null,t),t.syncEngineListener.onWatchChange=kl.bind(null,t.eventManager),t.syncEngineListener.onWatchError=Al.bind(null,t.eventManager),t}function Id(e){const t=I(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=ed.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=td.bind(null,t),t}function Ed(e,t,n){const r=I(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await function(e,t){const n=I(e),r=Ws(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.bundleCache.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,r))return await t.close(),n._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(r)),Promise.resolve(new Set);n._updateProgress(Fl(r));const i=new Vl(r,t.serializer);let s=await t.nextElement();for(;s;){const e=await i.addSizedElement(s);e&&n._updateProgress(e),s=await t.nextElement()}const a=await i.completeAndStoreAsync(e.localStore);return await ld(e,a.changedDocs,void 0),await function(e,t){const n=I(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.bundleCache.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(a.progress),Promise.resolve(a.changedCollectionGroups)}catch(e){return y(ql,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}}
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
 */)(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}class Cd{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Au(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Bc(this.persistence,new eu,e.initialUser,this.serializer)}createPersistence(e){return new Tc(Sc.factory,this.serializer)}createSharedClientState(e){return new mu}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cd.provider={build:()=>new Cd};class Dd extends Cd{constructor(e){super(),this.cacheSizeBytes=e}createGarbageCollectionScheduler(e,t){v(this.persistence.referenceDelegate instanceof Ic,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Ho(n,e.asyncQueue,t)}createPersistence(e){const t=void 0!==this.cacheSizeBytes?Qo.withCacheSize(this.cacheSizeBytes):Qo.DEFAULT;return new Tc(e=>Ic.factory(e,t),this.serializer)}}class xd extends Cd{constructor(e,t,n){super(),this.onlineComponentProvider=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.onlineComponentProvider.initialize(this,e),await Id(this.onlineComponentProvider.syncEngine),await il(this.onlineComponentProvider.remoteStore),await this.persistence.setPrimaryStateListener(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){return Bc(this.persistence,new eu,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Ho(n,e.asyncQueue,t)}createIndexBackfillerScheduler(e,t){const n=new Ue(t,this.persistence);return new qe(e.asyncQueue,n)}createPersistence(e){const t=Pc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?Qo.withCacheSize(this.cacheSizeBytes):Qo.DEFAULT;return new Nc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,ku(),null,this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new mu}}class kd extends xd{constructor(e,t){super(e,t,!1),this.onlineComponentProvider=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.onlineComponentProvider.syncEngine;this.sharedClientState instanceof pu&&(this.sharedClientState.syncEngine={applyBatchState:gd.bind(null,t),applyTargetState:Td.bind(null,t),applyActiveTargetsChange:vd.bind(null,t),getActiveClients:bd.bind(null,t),synchronizeWithChangedDocuments:md.bind(null,t)},await this.sharedClientState.start()),await this.persistence.setPrimaryStateListener(async e=>{await fd(this.onlineComponentProvider.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){const t=ku();if(!pu.isAvailable(t))throw new C(E.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Pc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new pu(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Ad{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Xl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=dd.bind(null,this.syncEngine),await ml(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new El}createDatastore(e){const t=Au(e.databaseInfo.databaseId),n=xu(e.databaseInfo);return Mu(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>Xl(this.syncEngine,e,0),s=new gu,new Uu(t,n,r,i,s);var t,n,r,i,s}createSyncEngine(e,t){return function(e,t,n,r,i,s,a){const o=new Kl(e,t,n,r,i,s);return a&&(o._isPrimaryClient=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=I(e);g(Lu,"RemoteStore shutting down."),t.offlineCauses.add(5),await Ku(t),t.connectivityMonitor.shutdown(),t.onlineStateTracker.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ad.provider={build:()=>new Ad};
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
const _d=10240;
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
function Nd(e,t){if(!(e instanceof Uint8Array))throw new C(E.INVALID_ARGUMENT,`NodePlatform.toByteStreamReader expects source to be Uint8Array, got ${re(e)}`);return function(e,t=_d){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}(e,t)}
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
 */class Rd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.scheduleEvent(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.scheduleEvent(this.observer.error,e):f("Uncaught Error in snapshot listener:",e.toString()))}mute(){this.muted=!0}scheduleEvent(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
 */class Od{constructor(e,t){this.payload=e,this.byteLength=t}isBundleMetadata(){return"metadata"in this.payload}}
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
 */class Pd{constructor(e,t){this.reader=e,this.serializer=t,this.metadata=new D,this.buffer=new Uint8Array,this.textDecoder=new s.TextDecoder("utf-8"),this.nextElementImpl().then(e=>{e&&e.isBundleMetadata()?this.metadata.resolve(e.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.payload)}`))},e=>this.metadata.reject(e))}close(){return this.reader.cancel()}async getMetadata(){return this.metadata.promise}async nextElement(){return await this.getMetadata(),this.nextElementImpl()}async nextElementImpl(){const e=await this.readLength();if(null===e)return null;const t=this.textDecoder.decode(e),n=Number(t);isNaN(n)&&this.raiseError(`length string (${t}) is not valid number`);const r=await this.readJsonString(n);return new Od(JSON.parse(r),e.length+n)}indexOfOpenBracket(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async readLength(){for(;this.indexOfOpenBracket()<0;){if(await this.pullMoreDataToBuffer())break}if(0===this.buffer.length)return null;const e=this.indexOfOpenBracket();e<0&&this.raiseError("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async readJsonString(e){for(;this.buffer.length<e;){await this.pullMoreDataToBuffer()&&this.raiseError("Reached the end of bundle when more is expected.")}const t=this.textDecoder.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}raiseError(e){throw this.reader.cancel(),new Error(`Invalid bundle format: ${e}`)}async pullMoreDataToBuffer(){const e=await this.reader.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
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
class Vd{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.nextElement();if(!n||!n.isBundleMetadata())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(n?.payload)}`);this.metadata=n;do{n=this.nextElement(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}getElements(){return this.elements}nextElement(){if(this.cursor===this.bundleData.length)return null;const e=this.readLength(),t=this.readJsonString(e);return new Od(JSON.parse(t),e)}readJsonString(e){if(this.cursor+e>this.bundleData.length)throw new C(E.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}readLength(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
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
class Fd{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new C(E.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const n=I(e),r={documents:t.map(e=>Xs(n.serializer,e))},i=await n.invokeStreamingRPC("BatchGetDocuments",n.serializer.databaseId,W.emptyPath(),r,t.length),s=new Map;i.forEach(e=>{const t=oa(n.serializer,e);s.set(t.key.toString(),t)});const a=[];return t.forEach(e=>{const t=s.get(e.toString());v(!!t,55234,{key:e}),a.push(t)}),a}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new hs(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=J.fromPath(t);this.mutations.push(new ps(n,this.precondition(n)))}),await async function(e,t){const n=I(e),r={writes:t.map(e=>ua(n.serializer,e))};await n.invokeRPC("Commit",n.serializer.databaseId,W.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw b(50498,{documentName:e.constructor.name});t=de.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new C(E.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(de.min())?Zi.exists(!1):Zi.updateTime(t):Zi.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(de.min()))throw new C(E.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Zi.updateTime(t)}return Zi.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
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
 */class Md{constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.attemptsRemaining=n.maxAttempts,this.backoff=new _u(this.asyncQueue,"transaction_retry")}run(){this.attemptsRemaining-=1,this.runWithBackOff()}runWithBackOff(){this.backoff.backoffAndRun(async()=>{const e=new Fd(this.datastore),t=this.tryRunUpdateFunction(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.handleTransactionError(e)}))}).catch(e=>{this.handleTransactionError(e)})})}tryRunUpdateFunction(e){try{const t=this.updateFunction(e);return!Bn(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}handleTransactionError(e){this.attemptsRemaining>0&&this.isRetryableTransactionError(e)?(this.attemptsRemaining-=1,this.asyncQueue.enqueueAndForget(()=>(this.runWithBackOff(),Promise.resolve()))):this.deferred.reject(e)}isRetryableTransactionError(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!bs(t)}return!1}}
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
 */const Bd="FirestoreClient",Ld=11,qd=20,Ud=22;class zd{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=u.UNAUTHENTICATED,this.clientId=M.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{g(Bd,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(g(Bd,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new D;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=bl(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Kd(e,t){e.asyncQueue.verifyOperationInProgress(),g(Bd,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Lc(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Qd(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Gd(e);g(Bd,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>pl(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>pl(t.remoteStore,n)),e._onlineComponents=t}async function Gd(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){g(Bd,"Using user provided OfflineComponentProvider");try{await Kd(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===E.FAILED_PRECONDITION||e.code===E.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||e.code===Ud||e.code===qd||e.code===Ld}(n))throw n;y("Error using user provided cache. Falling back to memory cache: "+n),await Kd(e,new Cd)}}else g(Bd,"Using default OfflineComponentProvider"),await Kd(e,new Dd(void 0));return e._offlineComponents}async function jd(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(g(Bd,"Using user provided OnlineComponentProvider"),await Qd(e,e._uninitializedComponentsProvider._online)):(g(Bd,"Using default OnlineComponentProvider"),await Qd(e,new Ad))),e._onlineComponents}function $d(e){return Gd(e).then(e=>e.persistence)}function Wd(e){return Gd(e).then(e=>e.localStore)}function Hd(e){return jd(e).then(e=>e.remoteStore)}function Yd(e){return jd(e).then(e=>e.syncEngine)}function Jd(e){return jd(e).then(e=>e.datastore)}async function Xd(e){const t=await jd(e),n=t.eventManager;return n.onListen=Ql.bind(null,t.syncEngine),n.onUnlisten=Wl.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Gl.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=Hl.bind(null,t.syncEngine),n}function Zd(e){return e.asyncQueue.enqueue(async()=>{const t=await $d(e),n=await Hd(e);return t.setNetworkEnabled(!0),function(e){const t=I(e);return t.offlineCauses.delete(0),zu(t)}(n)})}function eh(e){return e.asyncQueue.enqueue(async()=>{const t=await $d(e),n=await Hd(e);return t.setNetworkEnabled(!1),async function(e){const t=I(e);t.offlineCauses.add(0),await Ku(t),t.onlineStateTracker.set("Offline")}(n)})}function th(e,t,n,r){const i=new Rd(r),s=new Rl(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>Dl(await Xd(e),s)),()=>{i.mute(),e.asyncQueue.enqueueAndForget(async()=>xl(await Xd(e),s))}}function nh(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=I(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new C(E.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=bl(e,`Failed to get document '${t} from cache`);n.reject(r)}}(await Wd(e),t,n)),n.promise}function rh(e,t,n={}){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Rd({next:o=>{s.mute(),t.enqueueAndForget(()=>xl(e,a));const c=o.docs.has(n);!c&&o.fromCache?i.reject(new C(E.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&o.fromCache&&r&&"server"===r.source?i.reject(new C(E.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),a=new Rl(ti(n.path),s,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Dl(e,a)}(await Xd(e),e.asyncQueue,t,n,r)),r.promise}function ih(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await $c(e,t,!0),i=new Ll(t,r.remoteKeys),s=i.computeDocChanges(r.documents),a=i.applyChanges(s,!1);n.resolve(a.snapshot)}catch(e){const r=bl(e,`Failed to execute query '${t} against cache`);n.reject(r)}}(await Wd(e),t,n)),n.promise}function sh(e,t,n={}){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Rd({next:n=>{s.mute(),t.enqueueAndForget(()=>xl(e,a)),n.fromCache&&"server"===r.source?i.reject(new C(E.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),a=new Rl(n,s,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Dl(e,a)}(await Xd(e),e.asyncQueue,t,n,r)),r.promise}function ah(e,t,n){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>{try{const i=await Jd(e);r.resolve(async function(e,t,n){const r=I(e),{request:i,aliasMap:s,parent:a}=ma(r.serializer,oi(t),n);r.connection.shouldResourcePathBeIncludedInRequest||delete i.parent;const o=(await r.invokeStreamingRPC("RunAggregationQuery",r.serializer.databaseId,a,i,1)).filter(e=>!!e.result);v(1===o.length,64727);const c=o[0].result?.aggregateFields;return Object.keys(c).reduce((e,t)=>(e[s[t]]=c[t],e),{})}(i,t,n))}catch(e){r.reject(e)}}),r.promise}function oh(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>{try{const r=await Jd(e);n.resolve(async function(e,t){const n=I(e),r={database:na(n.serializer),structuredPipeline:t._toProto(n.serializer)},i=await n.invokeStreamingRPC("ExecutePipeline",n.serializer.databaseId,W.emptyPath(),r),s=[];return i.forEach(e=>{if(e.results&&0!==e.results.length)return e.results.forEach(t=>s.push(sa(n.serializer,e,t)));s.push(sa(n.serializer,e))}),s}(r,t))}catch(e){n.reject(e)}}),n.promise}function ch(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>Yl(await Yd(e),t,n)),n.promise}function uh(e,t){const n=new Rd(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){I(e).snapshotsInSyncListeners.add(t),t.next()}(await Xd(e),n)),()=>{n.mute(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){I(e).snapshotsInSyncListeners.delete(t)}(await Xd(e),n))}}function lh(e,t,n){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>{const i=await Jd(e);new Md(e.asyncQueue,i,n,t,r).run()}),r.promise}function dh(e,t,n,r){const i=function(e,t){let n;n="string"==typeof e?Es().encode(e):e;return function(e,t){return new Pd(e,t)}(Nd(n),t)}(n,Au(t));e.asyncQueue.enqueueAndForget(async()=>{Ed(await Yd(e),i,r)})}function hh(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=I(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.bundleCache.getNamedQuery(e,t))}(await Wd(e),t))}function ph(e,t){return function(e,t){return new Vd(e,t)}(e,t)}function mh(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const n=I(e),r=n.indexManager,i=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>
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
function(e,t,n,r,i){e=[...e],t=[...t],e.sort(n),t.sort(n);const s=e.length,a=t.length;let o=0,c=0;for(;o<a&&c<s;){const s=n(e[c],t[o]);s<0?i(e[c++]):s>0?r(t[o++]):(o++,c++)}for(;o<a;)r(t[o++]);for(;c<s;)i(e[c++])}(n,t,fe,t=>{i.push(r.addFieldIndex(e,t))},t=>{i.push(r.deleteFieldIndex(e,t))})).next(()=>xe.waitFor(i)))}(await Wd(e),t))}function gh(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){I(e).queryEngine.indexAutoCreationEnabled=t}(await Wd(e),t))}function fh(e){return e.asyncQueue.enqueue(async()=>function(e){const t=I(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))}(await Wd(e)))}
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
 */function yh(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}
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
 */const wh="ComponentProvider",bh=new Map;function Th(e,t,n,r,i){return new On(e,t,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,yh(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}
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
 */const vh="firestore.googleapis.com",Sh=!0;class Ih{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new C(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=vh,this.ssl=Sh}else this.host=e.host,this.ssl=e.ssl??Sh;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=Ko;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<jo)throw new C(E.INVALID_ARGUMENT,`cacheSizeBytes must be at least ${jo}`);this.cacheSizeBytes=e.cacheSizeBytes}Z("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=true:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yh(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class Eh{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ih({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new C(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new C(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ih(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new k;switch(e.type){case"firstParty":return new R(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new C(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=bh.get(e);t&&(g(wh,"Removing Datastore"),bh.delete(e),t.terminate())}(this),Promise.resolve()}}function Ch(e,t,r,i={}){e=ie(e,Eh);const s=(0,n.isCloudWorkstation)(t),a=e._getSettings(),o={...a,emulatorOptions:e._getEmulatorOptions()},c=`${t}:${r}`;s&&(0,n.pingServer)(`https://${c}`),a.host!==vh&&a.host!==c&&y("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...a,host:c,ssl:s,emulatorOptions:i};if(!(0,n.deepEqual)(l,o)&&(e._setSettings(l),i.mockUserToken)){let t,r;if("string"==typeof i.mockUserToken)t=i.mockUserToken,r=u.MOCK_USER;else{t=(0,n.createMockUserToken)(i.mockUserToken,e._app?.options.projectId);const s=i.mockUserToken.sub||i.mockUserToken.user_id;if(!s)throw new C(E.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new u(s)}e._authCredentials=new A(new x(t,r))}}
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
 */class Dh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Dh(this.firestore,e,this._query)}}class xh{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kh(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xh(this.firestore,e,this._key)}toJSON(){return{type:xh._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(oe(t,xh._jsonSchema))return new xh(e,n||null,new J(W.fromString(t.referencePath)))}}xh._jsonSchemaVersion="firestore/documentReference/1.0",xh._jsonSchema={type:ae("string",xh._jsonSchemaVersion),referencePath:ae("string")};class kh extends Dh{constructor(e,t,n){super(e,t,ti(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xh(this.firestore,null,new J(e))}withConverter(e){return new kh(this.firestore,e,this._path)}}function Ah(e){return e instanceof kh}function _h(e,t,...r){if(e=(0,n.getModularInstance)(e),X("collection","path",t),e instanceof Eh){const n=W.fromString(t,...r);return te(n),new kh(e,null,n)}{if(!(e instanceof xh||e instanceof kh))throw new C(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(W.fromString(t,...r));return te(n),new kh(e.firestore,null,n)}}function Nh(e,t){if(e=ie(e,Eh),X("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new C(E.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Dh(e,null,function(e){return new Zr(W.emptyPath(),e)}(t))}function Rh(e,t,...r){if(e=(0,n.getModularInstance)(e),1===arguments.length&&(t=M.newId()),X("doc","path",t),e instanceof Eh){const n=W.fromString(t,...r);return ee(n),new xh(e,null,new J(n))}{if(!(e instanceof xh||e instanceof kh))throw new C(E.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(W.fromString(t,...r));return ee(n),new xh(e.firestore,e instanceof kh?e.converter:null,new J(n))}}function Oh(e,t){return e=(0,n.getModularInstance)(e),t=(0,n.getModularInstance)(t),(e instanceof xh||e instanceof kh)&&(t instanceof xh||t instanceof kh)&&(e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter)}function Ph(e,t){return e=(0,n.getModularInstance)(e),t=(0,n.getModularInstance)(t),e instanceof Dh&&t instanceof Dh&&(e.firestore===t.firestore&&mi(e._query,t._query)&&e.converter===t.converter)}
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
 */class Vh{constructor(e=Promise.resolve()){this.retryableOps=[],this._isShuttingDown=!1,this.delayedOperations=[],this.failure=null,this.operationInProgress=!1,this.skipNonRestrictedTasks=!1,this.timerIdsToSkip=[],this.backoff=new _u(this,"async_queue_retry"),this.visibilityHandler=()=>{this.backoff.skipBackoff()},this.tail=e}get isShuttingDown(){return this._isShuttingDown}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.verifyNotFailed(),this.enqueueInternal(e)}enterRestrictedMode(e){this._isShuttingDown||(this._isShuttingDown=!0,this.skipNonRestrictedTasks=e||!1)}enqueue(e){if(this.verifyNotFailed(),this._isShuttingDown)return new Promise(()=>{});const t=new D;return this.enqueueInternal(()=>this._isShuttingDown&&this.skipNonRestrictedTasks?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.retryableOps.push(e),this.retryNextOp()))}async retryNextOp(){if(0!==this.retryableOps.length){try{await this.retryableOps[0](),this.retryableOps.shift(),this.backoff.reset()}catch(e){if(!Pe(e))throw e;g("AsyncQueue","Operation failed with retryable error: "+e)}this.retryableOps.length>0&&this.backoff.backoffAndRun(()=>this.retryNextOp())}}enqueueInternal(e){const t=this.tail.then(()=>(this.operationInProgress=!0,e().catch(e=>{this.failure=e,this.operationInProgress=!1;throw f("INTERNAL UNHANDLED ERROR: ",Fh(e)),e}).then(e=>(this.operationInProgress=!1,e))));return this.tail=t,t}enqueueAfterDelay(e,t,n){this.verifyNotFailed(),this.timerIdsToSkip.indexOf(e)>-1&&(t=0);const r=wl.createAndSchedule(this,e,t,n,e=>this.removeDelayedOperation(e));return this.delayedOperations.push(r),r}verifyNotFailed(){this.failure&&b(47125,{messageOrStack:Fh(this.failure)})}verifyOperationInProgress(){}async drain(){let e;do{e=this.tail,await e}while(e!==this.tail)}containsDelayedOperation(e){for(const t of this.delayedOperations)if(t.timerId===e)return!0;return!1}runAllDelayedOperationsUntil(e){return this.drain().then(()=>{this.delayedOperations.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.delayedOperations)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.drain()})}skipDelaysForTimerId(e){this.timerIdsToSkip.push(e)}removeDelayedOperation(e){const t=this.delayedOperations.indexOf(e);this.delayedOperations.splice(t,1)}}function Fh(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
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
 */class Mh{constructor(){this._progressObserver={},this._taskCompletionResolver=new D,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}
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
 */const Bh=-1;class Lh extends Eh{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new Vh,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Vh(e),this._firestoreClient=void 0,await e}}}function qh(e,r,i){i||(i=Pn);const s=(0,t._getProvider)(e,"firestore");if(s.isInitialized(i)){const e=s.getImmediate({identifier:i}),t=s.getOptions(i);if((0,n.deepEqual)(t,r))return e;throw new C(E.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==r.cacheSizeBytes&&void 0!==r.localCache)throw new C(E.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==r.cacheSizeBytes&&r.cacheSizeBytes!==Bh&&r.cacheSizeBytes<jo)throw new C(E.INVALID_ARGUMENT,`cacheSizeBytes must be at least ${jo}`);return r.host&&(0,n.isCloudWorkstation)(r.host)&&(0,n.pingServer)(r.host),s.initialize({options:r,instanceIdentifier:i})}function Uh(e,r){const i="object"==typeof e?e:(0,t.getApp)(),s="string"==typeof e?e:r||Pn,a=(0,t._getProvider)(i,"firestore").getImmediate({identifier:s});if(!a._initialized){const e=(0,n.getDefaultEmulatorHostnameAndPort)("firestore");e&&Ch(a,...e)}return a}function zh(e){if(e._terminated)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||Kh(e),e._firestoreClient}function Kh(e){const t=e._freezeSettings(),n=Th(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new zd(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function Qh(e,t){y("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return jh(e,Ad.provider,{build:e=>new xd(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function Gh(e){y("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();jh(e,Ad.provider,{build:e=>new kd(e,t.cacheSizeBytes)})}function jh(e,t,n){if((e=ie(e,Lh))._firestoreClient||e._terminated)throw new C(E.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new C(E.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},Kh(e)}function $h(e){if(e._initialized&&!e._terminated)throw new C(E.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new D;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!_e.isAvailable())return Promise.resolve();const t=e+_c;await _e.delete(t)}(Pc(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function Wh(e){return function(e){const t=new D;return e.asyncQueue.enqueueAndForget(async()=>nd(await Yd(e),t)),t.promise}(zh(e=ie(e,Lh)))}function Hh(e){return Zd(zh(e=ie(e,Lh)))}function Yh(e){return eh(zh(e=ie(e,Lh)))}function Jh(e){return(0,t._removeServiceInstance)(e.app,"firestore",e._databaseId.database),e._delete()}function Xh(e,t){const n=zh(e=ie(e,Lh)),r=new Mh;return dh(n,e._databaseId,t,r),r}function Zh(e,t){return hh(zh(e=ie(e,Lh)),t).then(t=>t?new Dh(e,null,t.query):null)}
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
 */class ep{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}
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
 */class tp{constructor(e){this._byteString=e}static fromBase64String(e){try{return new tp(vn.fromBase64String(e))}catch(e){throw new C(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new tp(vn.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:tp._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(oe(e,tp._jsonSchema))return tp.fromBase64String(e.bytes)}}tp._jsonSchemaVersion="firestore/bytes/1.0",tp._jsonSchema={type:ae("string",tp._jsonSchemaVersion),bytes:ae("string")};
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
class np{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new C(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Y(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function rp(){return new np(j)}
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
 */class ip{constructor(e){this._methodName=e}}
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
 */class sp{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new C(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new C(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return B(this._lat,e._lat)||B(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:sp._jsonSchemaVersion}}static fromJSON(e){if(oe(e,sp._jsonSchema))return new sp(e.latitude,e.longitude)}}sp._jsonSchemaVersion="firestore/geoPoint/1.0",sp._jsonSchema={type:ae("string",sp._jsonSchemaVersion),latitude:ae("number"),longitude:ae("number")};
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
class ap{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ap._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(oe(e,ap._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new ap(e.vectorValues);throw new C(E.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ap._jsonSchemaVersion="firestore/vectorValue/1.0",ap._jsonSchema={type:ae("string",ap._jsonSchemaVersion),vectorValues:ae("object")};
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
const op=/^__.*__$/;class cp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new cs(e,this.data,this.fieldMask,t,this.fieldTransforms):new os(e,this.data,t,this.fieldTransforms)}}class up{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new cs(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function lp(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw b(40011,{dataSource:e})}}class dp{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new dp({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Np(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(lp(this.dataSource)&&op.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class hp{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Au(e)}createContext(e,t,n,r=!1){return new dp({dataSource:e,methodName:t,targetDoc:n,path:Y.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pp(e){const t=e._freezeSettings(),n=Au(e._databaseId);return new hp(e._databaseId,!!t.ignoreUndefinedProperties,n)}function mp(e,t,n,r,i,s={}){const a=e.createContext(s.merge||s.mergeFields?2:0,t,n,i);xp("Data must be an object, but it was:",a,r);const o=Cp(r,a);let c,u;if(s.merge)c=new bn(a.fieldMask),u=a.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=kp(t,r,n);if(!a.contains(i))throw new C(E.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);Rp(e,i)||e.push(i)}c=new bn(e),u=a.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=a.fieldTransforms;return new cp(new wr(o),c,u)}class gp extends ip{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof gp}}function fp(e,t,n){return new dp({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class yp extends ip{_toFieldTransform(e){return new Yi(e.path,new zi)}isEqual(e){return e instanceof yp}}class wp extends ip{constructor(e,t){super(e),this._elements=t}_toFieldTransform(e){const t=fp(this,e,!0),n=this._elements.map(e=>Ep(e,t)),r=new Ki(n);return new Yi(e.path,r)}isEqual(e){return e instanceof wp&&(0,n.deepEqual)(this._elements,e._elements)}}class bp extends ip{constructor(e,t){super(e),this._elements=t}_toFieldTransform(e){const t=fp(this,e,!0),n=this._elements.map(e=>Ep(e,t)),r=new Gi(n);return new Yi(e.path,r)}isEqual(e){return e instanceof bp&&(0,n.deepEqual)(this._elements,e._elements)}}class Tp extends ip{constructor(e,t){super(e),this._operand=t}_toFieldTransform(e){const t=new $i(e.serializer,Mi(e.serializer,this._operand));return new Yi(e.path,t)}isEqual(e){return e instanceof Tp&&this._operand===e._operand}}function vp(e,t,r,i){const s=e.createContext(1,t,r);xp("Data must be an object, but it was:",s,i);const a=[],o=wr.empty();ln(i,(e,i)=>{const c=_p(t,e,r);i=(0,n.getModularInstance)(i);const u=s.childContextForFieldPath(c);if(i instanceof gp)a.push(c);else{const e=Ep(i,u);null!=e&&(a.push(c),o.set(c,e))}});const c=new bn(a);return new up(o,c,s.fieldTransforms)}function Sp(e,t,r,i,s,a){const o=e.createContext(1,t,r),c=[kp(t,i,r)],u=[s];if(a.length%2!=0)throw new C(E.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<a.length;e+=2)c.push(kp(t,a[e])),u.push(a[e+1]);const l=[],d=wr.empty();for(let e=c.length-1;e>=0;--e)if(!Rp(l,c[e])){const t=c[e];let r=u[e];r=(0,n.getModularInstance)(r);const i=o.childContextForFieldPath(t);if(r instanceof gp)l.push(t);else{const e=Ep(r,i);null!=e&&(l.push(t),d.set(t,e))}}const h=new bn(l);return new up(d,h,o.fieldTransforms)}function Ip(e,t,n,r=!1){return Ep(n,e.createContext(r?4:3,t))}function Ep(e,t){if(Dp(e=(0,n.getModularInstance)(e)))return xp("Unsupported field value:",t,e),Cp(e,t);if(e instanceof ip)return function(e,t){if(!lp(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=Ep(i,t.childContextForArray(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,n.getModularInstance)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Mi(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=le.fromDate(e);return{timestampValue:Qs(t.serializer,n)}}if(e instanceof le){const n=new le(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Qs(t.serializer,n)}}if(e instanceof sp)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof tp)return{bytesValue:js(t.serializer,e._byteString)};if(e instanceof xh){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Hs(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof ap)return function(e,t){const n=e instanceof ap?e.toArray():e,r={fields:{[Kn]:{stringValue:jn},[$n]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return Vi(t.serializer,e)})}}}};return{mapValue:r}}(e,t);if(Da(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${re(e)}`)}(e,t)}function Cp(e,t){const n={};return hn(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ln(e,(e,r)=>{const i=Ep(r,t.childContextForField(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function Dp(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof le||e instanceof sp||e instanceof tp||e instanceof xh||e instanceof ip||e instanceof ap||Da(e))}function xp(e,t,n){if(!Dp(n)||!ne(n)){const r=re(n);throw"an object"===r?t.createError(e+" a custom object"):t.createError(e+" "+r)}}function kp(e,t,r){if((t=(0,n.getModularInstance)(t))instanceof np)return t._internalPath;if("string"==typeof t)return _p(e,t);throw Np("Field path arguments must be of type string or ",e,!1,void 0,r)}const Ap=new RegExp("[~\\*/\\[\\]]");function _p(e,t,n){if(t.search(Ap)>=0)throw Np(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new np(...t.split("."))._internalPath}catch(r){throw Np(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Np(e,t,n,r,i){const s=r&&!r.isEmpty(),a=void 0!==i;let o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let c="";return(s||a)&&(c+=" (found",s&&(c+=` in field ${r}`),a&&(c+=` in document ${i}`),c+=")"),new C(E.INVALID_ARGUMENT,o+e+c)}function Rp(e,t){return e.some(e=>e.isEqual(t))}function Op(e){return"function"==typeof e._readUserData}
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
 */class Pp{convertValue(e,t="none"){switch(Hn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return En(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Cn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw b(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return ln(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[$n].arrayValue?.values?.map(e=>En(e.doubleValue));return new ap(t)}convertGeoPoint(e){return new sp(En(e.latitude),En(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Nn(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Rn(e));default:return null}}convertTimestamp(e){const t=In(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=W.fromString(e);v(Ca(n),9688,{name:e});const r=new Vn(n.get(1),n.get(3)),i=new J(n.popFirst(5));return r.isEqual(t)||f(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
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
 */class Vp extends Pp{constructor(e){super(),this.firestore=e}convertBytes(e){return new tp(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xh(this.firestore,null,t)}}
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
 */function Fp(){return new gp("deleteField")}function Mp(){return new yp("serverTimestamp")}function Bp(...e){return new wp("arrayUnion",e)}function Lp(...e){return new bp("arrayRemove",e)}function qp(e){return new Tp("increment",e)}function Up(e){return new ap(e)}
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
 */class zp{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=wr.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const i=this.optionDefinitions[r];if(r in e){const s=e[r];let a;if(i.nestedOptions&&ne(s)){a={mapValue:{fields:new zp(i.nestedOptions).getOptionsProto(t,s)}}}else s&&(a=Ep(s,t)??void 0);a&&n.set(Y.fromServerFormat(i.serverName),a)}}return n}getOptionsProto(e,t,n){const r=this._getKnownOptions(t,e);if(n){const t=new Map(dn(n,(t,n)=>[Y.fromServerFormat(n),void 0!==t?Ep(t,e):null]));r.setAll(t)}return r.value.mapValue.fields??{}}}
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
 */class Kp{constructor(e={},t={}){this._userOptions=e,this._optionsOverride=t,this.optionsUtil=new zp({indexMode:{serverName:"index_mode"}})}_readUserData(e){this.proto=this.optionsUtil.getOptionsProto(e,this._userOptions,this._optionsOverride)}}class Qp{constructor(e,t){this.pipeline=e,this.options=t}_toProto(e){return{pipeline:this.pipeline._toProto(e),options:this.options.proto}}}
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
 */function Gp(e){const t=zh(ie(e.firestore,Lh)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:pa(n,ai(e._query)).queryTarget}function jp(e,t){const n=dn(t,(e,t)=>new ep(t,e.aggregateType,e._internalFieldPath)),r=zh(ie(e.firestore,Lh)),i=r._onlineComponents?.datastore.serializer;return void 0===i?null:ma(i,oi(e._query),n,!0).request}function $p(e){const t=function(e){if(e._terminated)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.");if(!bh.has(e)){g(wh,"Initializing Datastore");const t=xu(Th(e._databaseId,e.app.options.appId||"",e._persistenceKey,e.app.options.apiKey,e._freezeSettings())),n=Au(e._databaseId),r=Mu(e._authCredentials,e._appCheckCredentials,t,n);bh.set(e,r)}return bh.get(e)}(ie(e._db,Lh)),n=t.serializer;if(void 0===n)return null;const r=new Qp(e,new Kp);return{database:na(n),structuredPipeline:r._toProto(n)}}}];