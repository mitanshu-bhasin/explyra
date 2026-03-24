module.exports=["[project]/booking/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-ssr] (ecmascript)",e=>{"use strict";e.s(["$",()=>Xh,"A",()=>lp,"B",()=>Nh,"C",()=>vr,"D",()=>rh,"E",()=>se,"F",()=>gh,"G",()=>wh,"H",()=>rn,"I",()=>Md,"J",()=>dp,"K",()=>oe,"L",()=>pu,"M",()=>Kd,"N",()=>bl,"O",()=>dr,"P",()=>Xi,"Q",()=>nh,"R",()=>W,"S",()=>M,"T",()=>xa,"U",()=>sl,"V",()=>al,"W",()=>Cs,"X",()=>b,"Y",()=>Qh,"Z",()=>Gs,"_",()=>Rh,"a",()=>_,"a$",()=>Dh,"a0",()=>Jh,"a1",()=>si,"a2",()=>Ud,"a3",()=>Pd,"a4",()=>Od,"a5",()=>Fd,"a6",()=>Vd,"a7",()=>ch,"a8",()=>Wr,"a9",()=>Rd,"aA",()=>Fi,"aB",()=>na,"aC",()=>Zr,"aD",()=>tp,"aE",()=>mh,"aF",()=>sh,"aG",()=>Ph,"aH",()=>Vh,"aI",()=>ph,"aJ",()=>Fh,"aK",()=>mn,"aL",()=>kn,"aM",()=>V,"aN",()=>k,"aO",()=>Y,"aP",()=>S,"aQ",()=>Sp,"aR",()=>vp,"aS",()=>pn,"aT",()=>Z,"aU",()=>gp,"aV",()=>mp,"aW",()=>Ih,"aX",()=>ah,"aY",()=>oh,"aZ",()=>th,"a_",()=>hp,"aa",()=>qd,"ab",()=>Ld,"ac",()=>y,"ad",()=>Qd,"ae",()=>ap,"af",()=>pe,"ag",()=>be,"ah",()=>jd,"ai",()=>g,"aj",()=>Gd,"ak",()=>yr,"al",()=>_h,"am",()=>ud,"an",()=>ad,"ao",()=>id,"ap",()=>od,"aq",()=>cd,"ar",()=>kh,"as",()=>Ah,"at",()=>ye,"au",()=>gi,"av",()=>le,"aw",()=>Pi,"ax",()=>zh,"ay",()=>Mi,"az",()=>Qi,"b",()=>P,"b0",()=>Oh,"b1",()=>Th,"b2",()=>vh,"b3",()=>Ch,"b4",()=>yh,"b5",()=>fp,"b6",()=>fh,"b7",()=>uh,"b8",()=>pp,"b9",()=>m,"ba",()=>xh,"bb",()=>yp,"bc",()=>Eh,"bd",()=>Vn,"be",()=>j,"bf",()=>v,"bg",()=>ep,"bh",()=>fa,"bi",()=>ih,"bj",()=>Q,"bk",()=>Bd,"bl",()=>ne,"bm",()=>Yr,"bn",()=>wp,"bo",()=>On,"bp",()=>bp,"bq",()=>ga,"br",()=>_s,"bs",()=>ya,"bt",()=>up,"bu",()=>Tp,"bv",()=>Ip,"c",()=>Kh,"d",()=>An,"e",()=>rs,"f",()=>sp,"g",()=>ss,"h",()=>is,"i",()=>as,"j",()=>C,"k",()=>E,"l",()=>Zh,"m",()=>Tr,"n",()=>fi,"o",()=>Xr,"p",()=>ae,"q",()=>ns,"r",()=>Jn,"s",()=>d,"t",()=>In,"u",()=>mr,"v",()=>ie,"w",()=>Jr,"x",()=>J,"y",()=>re,"z",()=>lh]);var t=e.i("[project]/booking/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript) <locals>"),n=e.i("[project]/booking/node_modules/@firebase/util/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)"),r=e.i("[project]/booking/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js [app-ssr] (ecmascript)"),s=e.i("[project]/booking/node_modules/@firebase/logger/dist/esm/index.esm.js [app-ssr] (ecmascript)"),i=e.i("[externals]/util [external] (util, cjs)"),a=e.i("[externals]/crypto [external] (crypto, cjs)"),o=e.i("[project]/booking/node_modules/@grpc/grpc-js/build/src/index.js [app-ssr] (ecmascript)"),c=e.i("[project]/booking/node_modules/@grpc/proto-loader/build/src/index.js [app-ssr] (ecmascript)");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}u.UNAUTHENTICATED=new u(null),u.GOOGLE_CREDENTIALS=new u("google-credentials-uid"),u.FIRST_PARTY=new u("first-party-uid"),u.MOCK_USER=new u("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const h=new s.Logger("@firebase/firestore");function p(){return h.logLevel}function m(e){h.setLogLevel(e)}function g(e,...t){if(h.logLevel<=s.LogLevel.DEBUG){const n=t.map(w);h.debug(`Firestore (${l}): ${e}`,...n)}}function f(e,...t){if(h.logLevel<=s.LogLevel.ERROR){const n=t.map(w);h.error(`Firestore (${l}): ${e}`,...n)}}function y(e,...t){if(h.logLevel<=s.LogLevel.WARN){const n=t.map(w);h.warn(`Firestore (${l}): ${e}`,...n)}}function w(e){if("string"==typeof e)return e;try{return t=e,(0,i.inspect)(t,{depth:100})}catch(t){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,T(e,r,n)}function T(e,t,n){let r=`FIRESTORE (${l}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw f(r),new Error(r)}function v(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||T(t,s,r)}function S(e,t){e||b(57014,t)}function I(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends n.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}}class D{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class k{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(u.UNAUTHENTICATED))}shutdown(){}}class A{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class _{constructor(e){this.authProvider=e,this.currentUser=u.UNAUTHENTICATED,this.tokenCounter=0,this.forceRefresh=!1,this.auth=null}start(e,t){v(void 0===this.tokenListener,42304);let n=this.tokenCounter;const r=e=>this.tokenCounter!==n?(n=this.tokenCounter,t(e)):Promise.resolve();let s=new D;this.tokenListener=()=>{this.tokenCounter++,this.currentUser=this.getUser(),s.resolve(),s=new D,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{g("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.tokenListener&&(this.auth.addAuthTokenListener(this.tokenListener),i())};this.authProvider.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){const e=this.authProvider.getImmediate({optional:!0});e?a(e):(g("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new D)}},0),i()}getToken(){const e=this.tokenCounter,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.tokenCounter!==e?(g("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(v("string"==typeof t.accessToken,31837,{tokenData:t}),new x(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.tokenListener&&this.auth.removeAuthTokenListener(this.tokenListener),this.tokenListener=void 0}getUser(){const e=this.auth&&this.auth.getUid();return v(null===e||"string"==typeof e,2055,{currentUid:e}),new u(e)}}class N{constructor(e,t,n){this.sessionIndex=e,this.iamToken=t,this.authTokenFactory=n,this.type="FirstParty",this.user=u.FIRST_PARTY,this._headers=new Map}getAuthToken(){return this.authTokenFactory?this.authTokenFactory():null}get headers(){this._headers.set("X-Goog-AuthUser",this.sessionIndex);const e=this.getAuthToken();return e&&this._headers.set("Authorization",e),this.iamToken&&this._headers.set("X-Goog-Iam-Authorization-Token",this.iamToken),this._headers}}class R{constructor(e,t,n){this.sessionIndex=e,this.iamToken=t,this.authTokenFactory=n}getToken(){return Promise.resolve(new N(this.sessionIndex,this.iamToken,this.authTokenFactory))}start(e,t){e.enqueueRetryable(()=>t(u.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class O{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class P{constructor(e,n){this.appCheckProvider=n,this.forceRefresh=!1,this.appCheck=null,this.latestAppCheckToken=null,this.serverAppAppCheckToken=null,(0,t._isFirebaseServerApp)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken)}start(e,t){v(void 0===this.tokenListener,3512);const n=e=>{null!=e.error&&g("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.latestAppCheckToken;return this.latestAppCheckToken=e.token,g("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.tokenListener=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{g("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.tokenListener&&this.appCheck.addTokenListener(this.tokenListener)};this.appCheckProvider.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.appCheckProvider.getImmediate({optional:!0});e?r(e):g("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.serverAppAppCheckToken)return Promise.resolve(new O(this.serverAppAppCheckToken));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(v("string"==typeof e.token,44558,{tokenResult:e}),this.latestAppCheckToken=e.token,new O(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.tokenListener&&this.appCheck.removeTokenListener(this.tokenListener),this.tokenListener=void 0}}class V{getToken(){return Promise.resolve(new O(""))}invalidateToken(){}start(e,t){}shutdown(){}}
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
 */function F(e){return(0,a.randomBytes)(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=F(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function B(e,t){return e<t?-1:e>t?1:0}function L(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return z(n)===z(s)?B(n,s):z(n)?1:-1}return B(e.length,t.length)}const q=55296,U=57343;function z(e){const t=e.charCodeAt(0);return t>=q&&t<=U}function K(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function Q(e,t,n){return void 0===e&&void 0===t||void 0!==e&&void 0!==t&&n(e,t)}function G(e){return e+"\0"}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j="__name__";class ${constructor(e,t,n){void 0===t?t=0:t>e.length&&b(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&b(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===$.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof $?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=$.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return B(e.length,t.length)}static compareSegments(e,t){const n=$.isNumericId(e),r=$.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?$.extractNumericId(e).compare($.extractNumericId(t)):L(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return r.Integer.fromString(e.substring(4,e.length-2))}}class W extends ${construct(e,t,n){return new W(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new C(E.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new W(t)}static emptyPath(){return new W([])}}const H=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Y extends ${construct(e,t,n){return new Y(e,t,n)}static isValidIdentifier(e){return H.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Y.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===j}static keyField(){return new Y([j])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new C(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new C(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new C(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new C(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Y(t)}static emptyPath(){return new Y([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function X(e,t,n){if(!n)throw new C(E.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Z(e,t,n,r){if(!0===t&&!0===r)throw new C(E.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ee(e){if(!J.isDocumentKey(e))throw new C(E.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function te(e){if(J.isDocumentKey(e))throw new C(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function ne(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function re(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":b(12329,{type:typeof e})}function se(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new C(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=re(e);throw new C(E.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function ie(e,t){if(t<=0)throw new C(E.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
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
 */function ae(e,t){const n={typeString:e};return t&&(n.value=t),n}function oe(e,t){if(!ne(e))throw new C(E.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const a=e[r];if(s&&typeof a!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&a!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new C(E.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const he=-1;class pe{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function me(e){return e.fields.find(e=>2===e.kind)}function ge(e){return e.fields.filter(e=>2!==e.kind)}function fe(e,t){let n=B(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=we(e.fields[r],t.fields[r]),0!==n)return n;return B(e.fields.length,t.fields.length)}pe.UNKNOWN_ID=-1;class ye{constructor(e,t){this.fieldPath=e,this.kind=t}}function we(e,t){const n=Y.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:B(e.kind,t.kind)}class be{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new be(0,Se.min())}}function Te(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=de.fromTimestamp(1e9===r?new le(n+1,0):new le(n,r));return new Se(s,J.empty(),t)}function ve(e){return new Se(e.readTime,e.key,he)}class Se{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Se(de.min(),J.empty(),he)}static max(){return new Se(de.max(),J.empty(),he)}}function Ie(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=J.comparator(e.documentKey,t.documentKey),0!==n?n:B(e.largestBatchId,t.largestBatchId))}
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
 */class xe{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&b(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new xe((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof xe?t:xe.resolve(t)}catch(e){return xe.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):xe.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):xe.reject(t)}static resolve(e){return new xe((t,n)=>{t(e)})}static reject(e){return new xe((t,n)=>{n(e)})}static waitFor(e){return new xe((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=xe.resolve(!1);for(const n of e)t=t.next(e=>e?xe.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new xe((n,r)=>{const s=e.length,i=new Array(s);let a=0;for(let o=0;o<s;o++){const c=o;t(e[c]).next(e=>{i[c]=e,++a,a===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new xe((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="SimpleDb";class Ae{static open(e,t,n,r){try{return new Ae(t,e.transaction(r,n))}catch(e){throw new Oe(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.completionDeferred=new D,this.transaction.oncomplete=()=>{this.completionDeferred.resolve()},this.transaction.onabort=()=>{t.error?this.completionDeferred.reject(new Oe(e,t.error)):this.completionDeferred.resolve()},this.transaction.onerror=t=>{const n=Be(t.target.error);this.completionDeferred.reject(new Oe(e,n))}}get completionPromise(){return this.completionDeferred.promise}abort(e){e&&this.completionDeferred.reject(e),this.aborted||(g(ke,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}maybeCommit(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Ve(t)}}class _e{static delete(e){return g(ke,"Removing database:",e),Fe((0,n.getGlobal)().indexedDB.deleteDatabase(e)).toPromise()}static isAvailable(){if(!(0,n.isIndexedDBAvailable)())return!1;if(_e.isMockPersistence())return!0;const e=(0,n.getUA)(),t=_e.getIOSVersion(e),r=0<t&&t<10,s=Ne(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static isMockPersistence(){return"undefined"!=typeof process&&"YES"===process.env?.USE_MOCK_PERSISTENCE}static getStore(e,t){return e.store(t)}static getIOSVersion(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,r){this.name=e,this.version=t,this.schemaConverter=r,this.lastClosedDbVersion=null,12.2===_e.getIOSVersion((0,n.getUA)())&&f("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async ensureDb(e){return this.db||(g(ke,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new Oe(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new C(E.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new C(E.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new Oe(e,r))},r.onupgradeneeded=e=>{g(ke,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.schemaConverter.createOrUpgrade(t,r.transaction,e.oldVersion,this.version).next(()=>{g(ke,"Database upgrade to version "+this.version+" complete")})}})),this.versionchangelistener&&(this.db.onversionchange=e=>this.versionchangelistener(e)),this.db}setVersionChangeListener(e){this.versionchangelistener=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const s="readonly"===t;let i=0;for(;;){++i;try{this.db=await this.ensureDb(e);const t=Ae.open(this.db,e,s?"readonly":"readwrite",n),i=r(t).next(e=>(t.maybeCommit(),e)).catch(e=>(t.abort(e),xe.reject(e))).toPromise();return i.catch(()=>{}),await t.completionPromise,i}catch(e){const t=e,n="FirebaseError"!==t.name&&i<3;if(g(ke,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Ne(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class Re{constructor(e){this.dbCursor=e,this.shouldStop=!1,this.nextKey=null}get isDone(){return this.shouldStop}get skipToKey(){return this.nextKey}set cursor(e){this.dbCursor=e}done(){this.shouldStop=!0}skip(e){this.nextKey=e}delete(){return Fe(this.dbCursor.delete())}}class Oe extends C{constructor(e,t){super(E.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Pe(e){return"IndexedDbTransactionError"===e.name}class Ve{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(g(ke,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(g(ke,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Fe(n)}add(e){return g(ke,"ADD",this.store.name,e,e),Fe(this.store.add(e))}get(e){return Fe(this.store.get(e)).next(t=>(void 0===t&&(t=null),g(ke,"GET",this.store.name,e,t),t))}delete(e){return g(ke,"DELETE",this.store.name,e),Fe(this.store.delete(e))}count(){return g(ke,"COUNT",this.store.name),Fe(this.store.count())}loadAll(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new xe((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.iterateCursor(e,(e,n)=>{t.push(n)}).next(()=>t)}}loadFirst(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new xe((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}deleteAll(e,t){g(ke,"DELETE ALL",this.store.name);const n=this.options(e,t);n.keysOnly=!1;const r=this.cursor(n);return this.iterateCursor(r,(e,t,n)=>n.delete())}iterate(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.iterateCursor(r,t)}iterateSerial(e){const t=this.cursor({});return new xe((n,r)=>{t.onerror=e=>{const t=Be(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}iterateCursor(e,t){const n=[];return new xe((r,s)=>{e.onerror=e=>{s(e.target.error)},e.onsuccess=e=>{const s=e.target.result;if(!s)return void r();const i=new Re(s),a=t(s.primaryKey,s.value,i);if(a instanceof xe){const e=a.catch(e=>(i.done(),xe.reject(e)));n.push(e)}i.isDone?r():null===i.skipToKey?s.continue():s.continue(i.skipToKey)}}).next(()=>xe.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.keysOnly?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Fe(e){return new xe((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=Be(e.target.error);n(t)}})}let Me=!1;function Be(e){const t=_e.getIOSVersion((0,n.getUA)());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new C("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Me||(Me=!0,setTimeout(()=>{throw e},0)),e}}return e}const Le="IndexBackfiller";class qe{constructor(e,t){this.asyncQueue=e,this.backfiller=t,this.task=null}start(){this.schedule(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}schedule(e){g(Le,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.backfiller.backfill();g(Le,`Documents written: ${e}`)}catch(e){Pe(e)?g(Le,"Ignoring IndexedDB error during index backfill: ",e):await De(e)}await this.schedule(6e4)})}}class Ue{constructor(e,t){this.localStore=e,this.persistence=t}async backfill(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.writeIndexEntries(t,e))}writeIndexEntries(e,t){const n=new Set;let r=t,s=!0;return xe.doWhile(()=>!0===s&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return g(Le,`Processing collection: ${t}`),this.writeEntriesForCollectionGroup(e,t,r).next(e=>{r-=e,n.add(t)});s=!1})).next(()=>t-r)}writeEntriesForCollectionGroup(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const s=n.changes;return this.localStore.indexManager.updateIndexEntries(e,s).next(()=>this.getNewOffset(r,n)).next(n=>(g(Le,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>s.size)}))}getNewOffset(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=ve(t);Ie(r,n)>0&&(n=r)}),new Se(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))
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
 */}}class ze{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.setPreviousValue(e),this.writeNewSequenceNumber=e=>t.writeSequenceNumber(e))}setPreviousValue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.writeNewSequenceNumber&&this.writeNewSequenceNumber(e),e}}ze.INVALID=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
const Ke="";function Qe(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=je(t)),t=Ge(e.get(n),t);return je(t)}function Ge(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="";break;case Ke:n+="";break;default:n+=r}}return n}function je(e){return e+Ke+""}function $e(e){const t=e.length;if(v(t>=2,64408,{path:e}),2===t)return v(e.charAt(0)===Ke&&""===e.charAt(1),56145,{path:e}),W.emptyPath();const n=t-2,r=[];let s="";for(let i=0;i<t;){const t=e.indexOf(Ke,i);switch((t<0||t>n)&&b(50515,{path:e}),e.charAt(t+1)){case"":const n=e.substring(i,t);let a;0===s.length?a=n:(s+=n,a=s,s=""),r.push(a);break;case"":s+=e.substring(i,t),s+="\0";break;case"":s+=e.substring(i,t+1);break;default:b(61167,{path:e})}i=t+2}return new W(r)}
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
 */const We="remoteDocuments",He="owner",Ye="owner",Je="mutationQueues",Xe="mutations",Ze="batchId",et="userMutationsIndex",tt=["userId","batchId"];
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
 */function nt(e,t){return[e,Qe(t)]}function rt(e,t,n){return[e,Qe(t),n]}const st={},it="documentMutations",at="remoteDocumentsV14",ot=["prefixPath","collectionGroup","readTime","documentId"],ct="documentKeyIndex",ut=["prefixPath","collectionGroup","documentId"],lt="collectionGroupIndex",dt=["collectionGroup","readTime","prefixPath","documentId"],ht="remoteDocumentGlobal",pt="remoteDocumentGlobalKey",mt="targets",gt="queryTargetsIndex",ft=["canonicalId","targetId"],yt="targetDocuments",wt=["targetId","path"],bt="documentTargetsIndex",Tt=["path","targetId"],vt="targetGlobalKey",St="targetGlobal",It="collectionParents",Et=["collectionId","parent"],Ct="clientMetadata",Dt="bundles",xt="namedQueries",kt="indexConfiguration",At="collectionGroupIndex",_t="indexState",Nt=["indexId","uid"],Rt="sequenceNumberIndex",Ot=["uid","sequenceNumber"],Pt="indexEntries",Vt=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Ft="documentKeyIndex",Mt=["indexId","uid","orderedDocumentKey"],Bt="documentOverlays",Lt=["userId","collectionPath","documentId"],qt="collectionPathOverlayIndex",Ut=["userId","collectionPath","largestBatchId"],zt="collectionGroupOverlayIndex",Kt=["userId","collectionGroup","largestBatchId"],Qt="globals",Gt=[Je,Xe,it,We,mt,He,St,yt,Ct,ht,It,Dt,xt],jt=[...Gt,Bt],$t=[Je,Xe,it,at,mt,He,St,yt,Ct,ht,It,Dt,xt,Bt],Wt=$t,Ht=[...Wt,kt,_t,Pt],Yt=Ht,Jt=[...Ht,Qt],Xt=Jt;
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
 */class Zt extends Ce{constructor(e,t){super(),this.simpleDbTransaction=e,this.currentSequenceNumber=t}}function en(e,t){const n=I(e);return _e.getStore(n.simpleDbTransaction,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function nn(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function rn(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function sn(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,t){this.comparator=e,this.root=t||cn.EMPTY}insert(e,t){return new an(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,cn.BLACK,null,null))}remove(e){return new an(this.comparator,this.root.remove(e,this.comparator).copy(null,null,cn.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new on(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new on(this.root,e,this.comparator,!1)}getReverseIterator(){return new on(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new on(this.root,e,this.comparator,!0)}}class on{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class cn{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:cn.RED,this.left=null!=r?r:cn.EMPTY,this.right=null!=s?s:cn.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new cn(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return cn.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return cn.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,cn.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,cn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw b(43730,{key:this.key,value:this.value});if(this.right.isRed())throw b(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw b(27949);return e+(this.isRed()?0:1)}}cn.EMPTY=null,cn.RED=!0,cn.BLACK=!1,cn.EMPTY=new class{constructor(){this.size=0}get key(){throw b(57766)}get value(){throw b(16141)}get color(){throw b(16727)}get left(){throw b(29726)}get right(){throw b(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new cn(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
class un{constructor(e){this.comparator=e,this.data=new an(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ln(this.data.getIterator())}getIteratorFrom(e){return new ln(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof un))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new un(this.comparator);return t.data=e,t}}class ln{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function dn(e){return e.hasNext()?e.getNext():void 0}
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
 */class hn{constructor(e){this.fields=e,e.sort(Y.comparator)}static empty(){return new hn([])}unionWith(e){let t=new un(Y.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new hn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return K(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */function pn(){return!0}
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
 */class mn{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(n=e,Buffer.from(n,"base64").toString("binary"));var n;return new mn(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new mn(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,Buffer.from(e,"binary").toString("base64");var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return B(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}mn.EMPTY_BYTE_STRING=new mn("");const gn=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function fn(e){if(v(!!e,39018),"string"==typeof e){let t=0;const n=gn.exec(e);if(v(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:yn(e.seconds),nanos:yn(e.nanos)}}function yn(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function wn(e){return"string"==typeof e?mn.fromBase64String(e):mn.fromUint8Array(e)}
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
 */const bn="server_timestamp",Tn="__type__",vn="__previous_value__",Sn="__local_write_time__";function In(e){const t=(e?.mapValue?.fields||{})[Tn]?.stringValue;return t===bn}function En(e){const t=e.mapValue.fields[vn];return In(t)?En(t):t}function Cn(e){const t=fn(e.mapValue.fields[Sn].timestampValue);return new le(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e,t,n,r,s,i,a,o,c,u,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=l}}const xn="(default)";class kn{constructor(e,t){this.projectId=e,this.database=t||xn}static empty(){return new kn("","")}get isDefaultDatabase(){return this.database===xn}isEqual(e){return e instanceof kn&&e.projectId===this.projectId&&e.database===this.database}}function An(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new C(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new kn(e.options.projectId,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=-1;function Nn(e){return null==e}function Rn(e){return 0===e&&1/e==-1/0}function On(e){return"number"==typeof e}function Pn(e){return"number"==typeof e&&Number.isInteger(e)&&!Rn(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function Vn(e){return"string"==typeof e}
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
 */const Fn="__type__",Mn="__max__",Bn={mapValue:{fields:{__type__:{stringValue:Mn}}}},Ln="__vector__",qn="value",Un={nullValue:"NULL_VALUE"};function zn(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?In(e)?4:ir(e)?9007199254740991:rr(e)?10:11:b(28295,{value:e})}function Kn(e,t){if(e===t)return!0;const n=zn(e);if(n!==zn(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Cn(e).isEqual(Cn(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=fn(e.timestampValue),r=fn(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return wn(e.bytesValue).isEqual(wn(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return yn(e.geoPointValue.latitude)===yn(t.geoPointValue.latitude)&&yn(e.geoPointValue.longitude)===yn(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return yn(e.integerValue)===yn(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=yn(e.doubleValue),r=yn(t.doubleValue);return n===r?Rn(n)===Rn(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return K(e.arrayValue.values||[],t.arrayValue.values||[],Kn);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(tn(n)!==tn(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!Kn(n[e],r[e])))return!1;return!0}(e,t);default:return b(52216,{left:e})}}function Qn(e,t){return void 0!==(e.values||[]).find(e=>Kn(e,t))}function Gn(e,t){if(e===t)return 0;const n=zn(e),r=zn(t);if(n!==r)return B(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return B(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=yn(e.integerValue||e.doubleValue),r=yn(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return jn(e.timestampValue,t.timestampValue);case 4:return jn(Cn(e),Cn(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){const n=wn(e),r=wn(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=B(n[e],r[e]);if(0!==t)return t}return B(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=B(yn(e.latitude),yn(t.latitude));return 0!==n?n:B(yn(e.longitude),yn(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return $n(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},s=n[qn]?.arrayValue,i=r[qn]?.arrayValue,a=B(s?.values?.length||0,i?.values?.length||0);return 0!==a?a:$n(s,i)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Bn.mapValue&&t===Bn.mapValue)return 0;if(e===Bn.mapValue)return 1;if(t===Bn.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let e=0;e<r.length&&e<i.length;++e){const t=L(r[e],i[e]);if(0!==t)return t;const a=Gn(n[r[e]],s[i[e]]);if(0!==a)return a}return B(r.length,i.length)}(e.mapValue,t.mapValue);default:throw b(23264,{leftType:n})}}function jn(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return B(e,t);const n=fn(e),r=fn(t),s=B(n.seconds,r.seconds);return 0!==s?s:B(n.nanos,r.nanos)}function $n(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=Gn(n[e],r[e]);if(t)return t}return B(n.length,r.length)}function Wn(e){return Hn(e)}function Hn(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=fn(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?wn(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,J.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Hn(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${Hn(e.fields[s])}`;return n+"}"}(e.mapValue):b(61005,{value:e});var t,n}function Yn(e){switch(zn(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=En(e);return t?16+Yn(t):16;case 5:return 2*e.stringValue.length;case 6:return wn(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+Yn(t),0);case 10:case 11:return function(e){let t=0;return nn(e.fields,(e,n)=>{t+=e.length+Yn(n)}),t}(e.mapValue);default:throw b(13486,{value:e})}}function Jn(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Xn(e){return!!e&&"integerValue"in e}function Zn(e){return!!e&&"arrayValue"in e}function er(e){return!!e&&"nullValue"in e}function tr(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function nr(e){return!!e&&"mapValue"in e}function rr(e){const t=(e?.mapValue?.fields||{})[Fn]?.stringValue;return t===Ln}function sr(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return nn(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=sr(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=sr(e.arrayValue.values[n]);return t}return{...e}}function ir(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Mn}const ar={mapValue:{fields:{[Fn]:{stringValue:Ln},[qn]:{arrayValue:{}}}}};function or(e){return"nullValue"in e?Un:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Jn(kn.empty(),J.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?rr(e)?ar:{mapValue:{}}:b(35942,{value:e})}function cr(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Jn(kn.empty(),J.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?ar:"mapValue"in e?rr(e)?{mapValue:{}}:Bn:b(61959,{value:e})}function ur(e,t){const n=Gn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function lr(e,t){const n=Gn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e){this.value=e}static empty(){return new dr({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!nr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=sr(t)}setAll(e){let t=Y.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=sr(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());nr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Kn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];nr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){nn(t,(t,n)=>e[t]=n);for(const t of n)delete e[t]}clone(){return new dr(sr(this.value))}}function hr(e){const t=[];return nn(e.fields,(e,n)=>{const r=new Y([e]);if(nr(n)){const e=hr(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new hn(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t,n,r,s,i,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=a}static newInvalidDocument(e){return new pr(e,0,de.min(),de.min(),de.min(),dr.empty(),0)}static newFoundDocument(e,t,n,r){return new pr(e,1,t,de.min(),n,r,0)}static newNoDocument(e,t){return new pr(e,2,t,de.min(),de.min(),dr.empty(),0)}static newUnknownDocument(e,t){return new pr(e,3,t,de.min(),de.min(),dr.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(de.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=dr.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=dr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=de.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof pr&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new pr(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class mr{constructor(e,t){this.position=e,this.inclusive=t}}function gr(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],a=e.position[s];if(r=i.field.isKeyField()?J.comparator(J.fromName(a.referenceValue),n.key):Gn(a,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function fr(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Kn(e.position[n],t.position[n]))return!1;return!0}
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
 */class br{}class Tr extends br{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new _r(e,t,n):"array-contains"===t?new Pr(e,n):"in"===t?new Vr(e,n):"not-in"===t?new Fr(e,n):"array-contains-any"===t?new Mr(e,n):new Tr(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Nr(e,n):new Rr(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Gn(t,this.value)):null!==t&&zn(this.value)===zn(t)&&this.matchesComparison(Gn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return b(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class vr extends br{constructor(e,t){super(),this.filters=e,this.op=t,this.memoizedFlattenedFilters=null}static create(e,t){return new vr(e,t)}matches(e){return Sr(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.memoizedFlattenedFilters||(this.memoizedFlattenedFilters=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.memoizedFlattenedFilters}getFilters(){return Object.assign([],this.filters)}}function Sr(e){return"and"===e.op}function Ir(e){return"or"===e.op}function Er(e){return Cr(e)&&Sr(e)}function Cr(e){for(const t of e.filters)if(t instanceof vr)return!1;return!0}function Dr(e){if(e instanceof Tr)return e.field.canonicalString()+e.op.toString()+Wn(e.value);if(Er(e))return e.filters.map(e=>Dr(e)).join(",");{const t=e.filters.map(e=>Dr(e)).join(",");return`${e.op}(${t})`}}function xr(e,t){return e instanceof Tr?function(e,t){return t instanceof Tr&&e.op===t.op&&e.field.isEqual(t.field)&&Kn(e.value,t.value)}(e,t):e instanceof vr?function(e,t){return t instanceof vr&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&xr(n,t.filters[r]),!0)}(e,t):void b(19439)}function kr(e,t){const n=e.filters.concat(t);return vr.create(n,e.op)}function Ar(e){return e instanceof Tr?function(e){return`${e.field.canonicalString()} ${e.op} ${Wn(e.value)}`}(e):e instanceof vr?function(e){return e.op.toString()+" {"+e.getFilters().map(Ar).join(" ,")+"}"}(e):"Filter"}class _r extends Tr{constructor(e,t,n){super(e,t,n),this.key=J.fromName(n.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class Nr extends Tr{constructor(e,t){super(e,"in",t),this.keys=Or("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Rr extends Tr{constructor(e,t){super(e,"not-in",t),this.keys=Or("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Or(e,t){return(t.arrayValue?.values||[]).map(e=>J.fromName(e.referenceValue))}class Pr extends Tr{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Zn(t)&&Qn(t.arrayValue,this.value)}}class Vr extends Tr{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Qn(this.value.arrayValue,t)}}class Fr extends Tr{constructor(e,t){super(e,"not-in",t)}matches(e){if(Qn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Qn(this.value.arrayValue,t)}}class Mr extends Tr{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Zn(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Qn(this.value.arrayValue,e))}}
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
 */class Br{constructor(e,t=null,n=[],r=[],s=null,i=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=a,this.memoizedCanonicalId=null}}function Lr(e,t=null,n=[],r=[],s=null,i=null,a=null){return new Br(e,t,n,r,s,i,a)}function qr(e){const t=I(e);if(null===t.memoizedCanonicalId){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Dr(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Nn(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Wn(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Wn(e)).join(",")),t.memoizedCanonicalId=e}return t.memoizedCanonicalId}function Ur(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!wr(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!xr(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!fr(e.startAt,t.startAt)&&fr(e.endAt,t.endAt)}function zr(e){return J.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Kr(e,t){return e.filters.filter(e=>e instanceof Tr&&e.field.isEqual(t))}function Qr(e,t,n){let r=Un,s=!0;for(const n of Kr(e,t)){let e=Un,t=!0;switch(n.op){case"<":case"<=":e=or(n.value);break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=Un}ur({value:r,inclusive:s},{value:e,inclusive:t})<0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];ur({value:r,inclusive:s},{value:e,inclusive:n.inclusive})<0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}function Gr(e,t,n){let r=Bn,s=!0;for(const n of Kr(e,t)){let e=Bn,t=!0;switch(n.op){case">=":case">":e=cr(n.value),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=Bn}lr({value:r,inclusive:s},{value:e,inclusive:t})>0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];lr({value:r,inclusive:s},{value:e,inclusive:n.inclusive})>0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,t=null,n=[],r=[],s=null,i="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=a,this.endAt=o,this.memoizedNormalizedOrderBy=null,this.memoizedTarget=null,this.memoizedAggregateTarget=null,this.startAt,this.endAt}}function $r(e,t,n,r,s,i,a,o){return new jr(e,t,n,r,s,i,a,o)}function Wr(e){return new jr(e)}function Hr(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Yr(e){return J.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Jr(e){return null!==e.collectionGroup}function Xr(e){const t=I(e);if(null===t.memoizedNormalizedOrderBy){t.memoizedNormalizedOrderBy=[];const e=new Set;for(const n of t.explicitOrderBy)t.memoizedNormalizedOrderBy.push(n),e.add(n.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new un(Y.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.memoizedNormalizedOrderBy.push(new yr(r,n))}),e.has(Y.keyField().canonicalString())||t.memoizedNormalizedOrderBy.push(new yr(Y.keyField(),n))}return t.memoizedNormalizedOrderBy}function Zr(e){const t=I(e);return t.memoizedTarget||(t.memoizedTarget=ts(t,Xr(e))),t.memoizedTarget}function es(e){const t=I(e);return t.memoizedAggregateTarget||(t.memoizedAggregateTarget=ts(t,e.explicitOrderBy)),t.memoizedAggregateTarget}function ts(e,t){if("F"===e.limitType)return Lr(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new yr(e.field,t)});const n=e.endAt?new mr(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new mr(e.startAt.position,e.startAt.inclusive):null;return Lr(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function ns(e,t){const n=e.filters.concat([t]);return new jr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function rs(e,t){const n=e.explicitOrderBy.concat([t]);return new jr(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function ss(e,t,n){return new jr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function is(e,t){return new jr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function as(e,t){return new jr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function os(e,t){return Ur(Zr(e),Zr(t))&&e.limitType===t.limitType}function cs(e){return`${qr(Zr(e))}|lt:${e.limitType}`}function us(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>Ar(e)).join(", ")}]`),Nn(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Wn(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Wn(e)).join(",")),`Target(${t})`}(Zr(e))}; limitType=${e.limitType})`}function ls(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):J.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Xr(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=gr(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,Xr(e),t))&&!(e.endAt&&!function(e,t,n){const r=gr(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,Xr(e),t))}(e,t)}function ds(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function hs(e){return(t,n)=>{let r=!1;for(const s of Xr(e)){const e=ps(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function ps(e,t,n){const r=e.field.isKeyField()?J.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?Gn(r,s):b(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return b(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){nn(this.inner,(t,n)=>{for(const[t,r]of n)e(t,r)})}isEmpty(){return sn(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=new an(J.comparator);function fs(){return gs}const ys=new an(J.comparator);function ws(...e){let t=ys;for(const n of e)t=t.insert(n.key,n);return t}function bs(e){let t=ys;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Ts(){return Ss()}function vs(){return Ss()}function Ss(){return new ms(e=>e.toString(),(e,t)=>e.isEqual(t))}const Is=new an(J.comparator),Es=new un(J.comparator);function Cs(...e){let t=Es;for(const n of e)t=t.add(n);return t}const Ds=new un(B);function xs(){return Ds}
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
 */function ks(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Rn(t)?"-0":t}}function As(e){return{integerValue:""+e}}function _s(e,t){return Pn(t)?As(t):ks(e,t)}
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
 */class Ns{constructor(){this._=void 0}}function Rs(e,t,n){return e instanceof Vs?function(e,t){const n={fields:{[Tn]:{stringValue:bn},[Sn]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&In(t)&&(t=En(t)),t&&(n.fields[vn]=t),{mapValue:n}}(n,t):e instanceof Fs?Ms(e,t):e instanceof Bs?Ls(e,t):function(e,t){const n=Ps(e,t),r=Us(n)+Us(e.operand);return Xn(n)&&Xn(e.operand)?As(r):ks(e.serializer,r)}(e,t)}function Os(e,t,n){return e instanceof Fs?Ms(e,t):e instanceof Bs?Ls(e,t):n}function Ps(e,t){return e instanceof qs?Xn(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null;var n}class Vs extends Ns{}class Fs extends Ns{constructor(e){super(),this.elements=e}}function Ms(e,t){const n=zs(t);for(const t of e.elements)n.some(e=>Kn(e,t))||n.push(t);return{arrayValue:{values:n}}}class Bs extends Ns{constructor(e){super(),this.elements=e}}function Ls(e,t){let n=zs(t);for(const t of e.elements)n=n.filter(e=>!Kn(e,t));return{arrayValue:{values:n}}}class qs extends Ns{constructor(e,t){super(),this.serializer=e,this.operand=t}}function Us(e){return yn(e.integerValue||e.doubleValue)}function zs(e){return Zn(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,t){this.field=e,this.transform=t}}class Qs{constructor(e,t){this.version=e,this.transformResults=t}}class Gs{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Gs}static exists(e){return new Gs(void 0,e)}static updateTime(e){return new Gs(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function js(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class $s{}function Ws(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new si(e.key,Gs.none()):new Zs(e.key,e.data,Gs.none());{const n=e.data,r=dr.empty();let s=new un(Y.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new ei(e.key,r,new hn(s.toArray()),Gs.none())}}function Hs(e,t,n){e instanceof Zs?function(e,t,n){const r=e.value.clone(),s=ni(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof ei?function(e,t,n){if(!js(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=ni(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(ti(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Ys(e,t,n,r){return e instanceof Zs?function(e,t,n,r){if(!js(e.precondition,t))return n;const s=e.value.clone(),i=ri(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof ei?function(e,t,n,r){if(!js(e.precondition,t))return n;const s=ri(e.fieldTransforms,r,t),i=t.data;return i.setAll(ti(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return js(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function Js(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=Ps(r.transform,e||null);null!=s&&(null===n&&(n=dr.empty()),n.set(r.field,s))}return n||null}function Xs(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&K(e,t,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Fs&&t instanceof Fs||e instanceof Bs&&t instanceof Bs?K(e.elements,t.elements,Kn):e instanceof qs&&t instanceof qs?Kn(e.operand,t.operand):e instanceof Vs&&t instanceof Vs}(e.transform,t.transform)}(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Zs extends $s{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ei extends $s{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function ti(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function ni(e,t,n){const r=new Map;v(e.length===n.length,32656,{serverTransformResultCount:n.length,fieldTransformCount:e.length});for(let s=0;s<n.length;s++){const i=e[s],a=i.transform,o=t.data.field(i.field);r.set(i.field,Os(a,o,n[s]))}return r}function ri(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,Rs(e,i,t))}return r}class si extends $s{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ii extends $s{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];r.key.isEqual(e.key)&&Hs(r,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Ys(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Ys(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=vs();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let a=this.applyToLocalView(i,s.mutatedFields);a=t.has(r.key)?null:a;const o=Ws(i,a);null!==o&&n.set(r.key,o),i.isValidDocument()||i.convertToNoDocument(de.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Cs())}isEqual(e){return this.batchId===e.batchId&&K(this.mutations,e.mutations,(e,t)=>Xs(e,t))&&K(this.baseMutations,e.baseMutations,(e,t)=>Xs(e,t))}}class oi{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){v(e.mutations.length===n.length,58842,{mutationsSent:e.mutations.length,resultsReceived:n.length});let r=Is;const s=e.mutations;for(let e=0;e<s.length;e++)r=r.insert(s[e].key,n[e].version);return new oi(e,t,n,r)}}
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
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,t){this.count=e,this.unchangedNames=t
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}}var li;function di(e){switch(e){case E.OK:return b(64938);case E.CANCELLED:case E.UNKNOWN:case E.DEADLINE_EXCEEDED:case E.RESOURCE_EXHAUSTED:case E.INTERNAL:case E.UNAVAILABLE:case E.UNAUTHENTICATED:return!1;case E.INVALID_ARGUMENT:case E.NOT_FOUND:case E.ALREADY_EXISTS:case E.PERMISSION_DENIED:case E.FAILED_PRECONDITION:case E.ABORTED:case E.OUT_OF_RANGE:case E.UNIMPLEMENTED:case E.DATA_LOSS:return!0;default:return b(15467,{code:e})}}function hi(e){if(void 0===e)return f("GRPC error has no .code"),E.UNKNOWN;switch(e){case li.OK:return E.OK;case li.CANCELLED:return E.CANCELLED;case li.UNKNOWN:return E.UNKNOWN;case li.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case li.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case li.INTERNAL:return E.INTERNAL;case li.UNAVAILABLE:return E.UNAVAILABLE;case li.UNAUTHENTICATED:return E.UNAUTHENTICATED;case li.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case li.NOT_FOUND:return E.NOT_FOUND;case li.ALREADY_EXISTS:return E.ALREADY_EXISTS;case li.PERMISSION_DENIED:return E.PERMISSION_DENIED;case li.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case li.ABORTED:return E.ABORTED;case li.OUT_OF_RANGE:return E.OUT_OF_RANGE;case li.UNIMPLEMENTED:return E.UNIMPLEMENTED;case li.DATA_LOSS:return E.DATA_LOSS;default:return b(39323,{code:e})}}
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
 */!function(e){e[e.OK=0]="OK",e[e.CANCELLED=1]="CANCELLED",e[e.UNKNOWN=2]="UNKNOWN",e[e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",e[e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",e[e.NOT_FOUND=5]="NOT_FOUND",e[e.ALREADY_EXISTS=6]="ALREADY_EXISTS",e[e.PERMISSION_DENIED=7]="PERMISSION_DENIED",e[e.UNAUTHENTICATED=16]="UNAUTHENTICATED",e[e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",e[e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",e[e.ABORTED=10]="ABORTED",e[e.OUT_OF_RANGE=11]="OUT_OF_RANGE",e[e.UNIMPLEMENTED=12]="UNIMPLEMENTED",e[e.INTERNAL=13]="INTERNAL",e[e.UNAVAILABLE=14]="UNAVAILABLE",e[e.DATA_LOSS=15]="DATA_LOSS"}(li||(li={}));class pi extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"
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
 */}}let mi=null;function gi(e){if(mi)throw new Error("a TestingHooksSpi instance is already set");mi=e}
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
 */function fi(){return new i.TextEncoder}
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
 */const yi=new r.Integer([4294967295,4294967295],0);function wi(e){const t=fi().encode(e),n=new r.Md5;return n.update(t),new Uint8Array(n.digest())}function bi(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),s=t.getUint32(4,!0),i=t.getUint32(8,!0),a=t.getUint32(12,!0);return[new r.Integer([n,s],0),new r.Integer([i,a],0)]}class Ti{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new vi(`Invalid padding: ${t}`);if(n<0)throw new vi(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new vi(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new vi(`Invalid padding when bitmap length is 0: ${t}`);this.bitCount=8*e.length-t,this.bitCountInInteger=r.Integer.fromNumber(this.bitCount)}getBitIndex(e,t,n){let s=e.add(t.multiply(r.Integer.fromNumber(n)));return 1===s.compare(yi)&&(s=new r.Integer([s.getBits(0),s.getBits(1)],0)),s.modulo(this.bitCountInInteger).toNumber()}isBitSet(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.bitCount)return!1;const t=wi(e),[n,r]=bi(t);for(let e=0;e<this.hashCount;e++){const t=this.getBitIndex(n,r,e);if(!this.isBitSet(t))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new Ti(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.bitCount)return;const t=wi(e),[n,r]=bi(t);for(let e=0;e<this.hashCount;e++){const t=this.getBitIndex(n,r,e);this.setBit(t)}}setBit(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class vi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}}class Si{constructor(e,t,n,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Ii.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Si(de.min(),r,new an(B),fs(),Cs())}}class Ii{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ii(n,t,Cs(),Cs(),Cs())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t,n,r){this.updatedTargetIds=e,this.removedTargetIds=t,this.key=n,this.newDoc=r}}class Ci{constructor(e,t){this.targetId=e,this.existenceFilter=t}}class Di{constructor(e,t,n=mn.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class xi{constructor(){this.pendingResponses=0,this.documentChanges=_i(),this._resumeToken=mn.EMPTY_BYTE_STRING,this._current=!1,this._hasPendingChanges=!0}get current(){return this._current}get resumeToken(){return this._resumeToken}get isPending(){return 0!==this.pendingResponses}get hasPendingChanges(){return this._hasPendingChanges}updateResumeToken(e){e.approximateByteSize()>0&&(this._hasPendingChanges=!0,this._resumeToken=e)}toTargetChange(){let e=Cs(),t=Cs(),n=Cs();return this.documentChanges.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:b(38017,{changeType:s})}}),new Ii(this._resumeToken,this._current,e,t,n)}clearPendingChanges(){this._hasPendingChanges=!1,this.documentChanges=_i()}addDocumentChange(e,t){this._hasPendingChanges=!0,this.documentChanges=this.documentChanges.insert(e,t)}removeDocumentChange(e){this._hasPendingChanges=!0,this.documentChanges=this.documentChanges.remove(e)}recordPendingTargetRequest(){this.pendingResponses+=1}recordTargetResponse(){this.pendingResponses-=1,v(this.pendingResponses>=0,3241,{pendingResponses:this.pendingResponses})}markCurrent(){this._hasPendingChanges=!0,this._current=!0}}class ki{constructor(e){this.metadataProvider=e,this.targetStates=new Map,this.pendingDocumentUpdates=fs(),this.pendingDocumentUpdatesByTarget=Ai(),this.pendingDocumentTargetMapping=Ai(),this.pendingTargetResets=new an(B)}handleDocumentChange(e){for(const t of e.updatedTargetIds)e.newDoc&&e.newDoc.isFoundDocument()?this.addDocumentToTarget(t,e.newDoc):this.removeDocumentFromTarget(t,e.key,e.newDoc);for(const t of e.removedTargetIds)this.removeDocumentFromTarget(t,e.key,e.newDoc)}handleTargetChange(e){this.forEachTarget(e,t=>{const n=this.ensureTargetState(t);switch(e.state){case 0:this.isActiveTarget(t)&&n.updateResumeToken(e.resumeToken);break;case 1:n.recordTargetResponse(),n.isPending||n.clearPendingChanges(),n.updateResumeToken(e.resumeToken);break;case 2:n.recordTargetResponse(),n.isPending||this.removeTarget(t);break;case 3:this.isActiveTarget(t)&&(n.markCurrent(),n.updateResumeToken(e.resumeToken));break;case 4:this.isActiveTarget(t)&&(this.resetTarget(t),n.updateResumeToken(e.resumeToken));break;default:b(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.targetStates.forEach((e,n)=>{this.isActiveTarget(n)&&t(n)})}handleExistenceFilter(e){const t=e.targetId,n=e.existenceFilter.count,r=this.targetDataForActiveTarget(t);if(r){const s=r.target;if(zr(s))if(0===n){const e=new J(s.path);this.removeDocumentFromTarget(t,e,pr.newNoDocument(e,de.min()))}else v(1===n,20013,{expectedCount:n});else{const r=this.getCurrentDocumentCountForTarget(t);if(r!==n){const n=this.parseBloomFilter(e),s=n?this.applyBloomFilter(n,e,r):1;if(0!==s){this.resetTarget(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.pendingTargetResets=this.pendingTargetResets.insert(t,e)}mi?.notifyOnExistenceFilterMismatch(function(e,t,n,r,s){const i={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},a=t.unchangedNames;return a&&(i.bloomFilter={applied:0===s,hashCount:a?.hashCount??0,bitmapLength:a?.bits?.bitmap?.length??0,padding:a?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),i}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r,e.existenceFilter,this.metadataProvider.getDatabaseId(),n,s))}}}}parseBloomFilter(e){const t=e.existenceFilter.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,a;try{i=wn(n).toUint8Array()}catch(e){if(e instanceof pi)return y("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{a=new Ti(i,r,s)}catch(e){return y(e instanceof vi?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===a.bitCount?null:a}applyBloomFilter(e,t,n){return t.existenceFilter.count===n-this.filterRemovedDocuments(e,t.targetId)?0:2}filterRemovedDocuments(e,t){const n=this.metadataProvider.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.metadataProvider.getDatabaseId(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.removeDocumentFromTarget(t,n,null),r++)}),r}createRemoteEvent(e){const t=new Map;this.targetStates.forEach((n,r)=>{const s=this.targetDataForActiveTarget(r);if(s){if(n.current&&zr(s.target)){const t=new J(s.target.path);this.ensureDocumentUpdateByTarget(t).has(r)||this.targetContainsDocument(r,t)||this.removeDocumentFromTarget(r,t,pr.newNoDocument(t,e))}n.hasPendingChanges&&(t.set(r,n.toTargetChange()),n.clearPendingChanges())}});let n=Cs();this.pendingDocumentTargetMapping.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.targetDataForActiveTarget(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.pendingDocumentUpdates.forEach((t,n)=>n.setReadTime(e));const r=new Si(e,t,this.pendingTargetResets,this.pendingDocumentUpdates,n);return this.pendingDocumentUpdates=fs(),this.pendingDocumentUpdatesByTarget=Ai(),this.pendingDocumentTargetMapping=Ai(),this.pendingTargetResets=new an(B),r}addDocumentToTarget(e,t){if(!this.isActiveTarget(e))return;const n=this.targetContainsDocument(e,t.key)?2:0;this.ensureTargetState(e).addDocumentChange(t.key,n),this.pendingDocumentUpdates=this.pendingDocumentUpdates.insert(t.key,t),this.pendingDocumentUpdatesByTarget=this.pendingDocumentUpdatesByTarget.insert(t.key,this.ensureDocumentUpdateByTarget(t.key).add(e)),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(t.key,this.ensureDocumentTargetMapping(t.key).add(e))}removeDocumentFromTarget(e,t,n){if(!this.isActiveTarget(e))return;const r=this.ensureTargetState(e);this.targetContainsDocument(e,t)?r.addDocumentChange(t,1):r.removeDocumentChange(t),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(t,this.ensureDocumentTargetMapping(t).delete(e)),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(t,this.ensureDocumentTargetMapping(t).add(e)),n&&(this.pendingDocumentUpdates=this.pendingDocumentUpdates.insert(t,n))}removeTarget(e){this.targetStates.delete(e)}getCurrentDocumentCountForTarget(e){const t=this.ensureTargetState(e).toTargetChange();return this.metadataProvider.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}recordPendingTargetRequest(e){this.ensureTargetState(e).recordPendingTargetRequest()}ensureTargetState(e){let t=this.targetStates.get(e);return t||(t=new xi,this.targetStates.set(e,t)),t}ensureDocumentTargetMapping(e){let t=this.pendingDocumentTargetMapping.get(e);return t||(t=new un(B),this.pendingDocumentTargetMapping=this.pendingDocumentTargetMapping.insert(e,t)),t}ensureDocumentUpdateByTarget(e){let t=this.pendingDocumentUpdatesByTarget.get(e);return t||(t=new un(B),this.pendingDocumentUpdatesByTarget=this.pendingDocumentUpdatesByTarget.insert(e,t)),t}isActiveTarget(e){const t=null!==this.targetDataForActiveTarget(e);return t||g("WatchChangeAggregator","Detected inactive target",e),t}targetDataForActiveTarget(e){const t=this.targetStates.get(e);return t&&t.isPending?null:this.metadataProvider.getTargetDataForTarget(e)}resetTarget(e){this.targetStates.set(e,new xi),this.metadataProvider.getRemoteKeysForTarget(e).forEach(t=>{this.removeDocumentFromTarget(e,t,null)})}targetContainsDocument(e,t){return this.metadataProvider.getRemoteKeysForTarget(e).has(t)}}function Ai(){return new an(J.comparator)}function _i(){return new an(J.comparator)}const Ni={asc:"ASCENDING",desc:"DESCENDING"},Ri={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Oi={and:"AND",or:"OR"};class Pi{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Vi(e,t){return e.useProto3Json||Nn(t)?t:{value:t}}function Fi(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Mi(e){const t=fn(e);return new le(t.seconds,t.nanos)}function Bi(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Li(e,t){return Fi(e,t.toTimestamp())}function qi(e){return v(!!e,49232),de.fromTimestamp(Mi(e))}function Ui(e,t){return zi(e,t).canonicalString()}function zi(e,t){const n=function(e){return new W(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Ki(e){const t=W.fromString(e);return v(pa(t),10190,{key:t.toString()}),t}function Qi(e,t){return Ui(e.databaseId,t.path)}function Gi(e,t){const n=Ki(t);if(n.get(1)!==e.databaseId.projectId)throw new C(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new C(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new J(Hi(n))}function ji(e,t){return Ui(e.databaseId,t)}function $i(e){const t=Ki(e);return 4===t.length?W.emptyPath():Hi(t)}function Wi(e){return new W(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Hi(e){return v(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Yi(e,t,n){return{name:Qi(e,t),fields:n.value.mapValue.fields}}function Ji(e,t,n){const r={};t.transaction?.length&&(r.transaction=t.transaction);const s=t.executionTime?qi(t.executionTime):void 0;return r.executionTime=s,n&&(r.key=n.name?Gi(e,n.name):void 0,r.fields=new dr({mapValue:{fields:n.fields}}),r.createTime=n.createTime?qi(n.createTime):void 0,r.updateTime=n.updateTime?qi(n.updateTime):void 0),r}function Xi(e,t,n){const r=Gi(e,t.name),s=qi(t.updateTime),i=t.createTime?qi(t.createTime):de.min(),a=new dr({mapValue:{fields:t.fields}}),o=pr.newFoundDocument(r,s,i,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function Zi(e,t){let n;if(t instanceof Zs)n={update:Yi(e,t.key,t.value)};else if(t instanceof si)n={delete:Qi(e,t.key)};else if(t instanceof ei)n={update:Yi(e,t.key,t.data),updateMask:ha(t.fieldMask)};else{if(!(t instanceof ii))return b(16599,{mutationType:t.type});n={verify:Qi(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof Vs)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Fs)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Bs)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof qs)return{fieldPath:t.field.canonicalString(),increment:n.operand};throw b(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:Li(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:b(27497)}(e,t.precondition)),n}function ea(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?Gs.updateTime(qi(e.updateTime)):void 0!==e.exists?Gs.exists(e.exists):Gs.none()}(t.currentDocument):Gs.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)v("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new Vs;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new Fs(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new Bs(e)}else"increment"in t?n=new qs(e,t.increment):b(16584,{proto:t});const r=Y.fromServerFormat(t.fieldPath);return new Ks(r,n)}(e,t)):[];if(t.update){t.update.name;const s=Gi(e,t.update.name),i=new dr({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new hn(t.map(e=>Y.fromServerFormat(e)))}(t.updateMask);return new ei(s,i,e,n,r)}return new Zs(s,i,n,r)}if(t.delete){const r=Gi(e,t.delete);return new si(r,n)}if(t.verify){const r=Gi(e,t.verify);return new ii(r,n)}return b(1463,{proto:t})}function ta(e,t){return{documents:[ji(e,t.path)]}}function na(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=ji(e,s);const i=function(e){if(0!==e.length)return da(vr.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const a=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:ua(e.field),direction:aa(e.dir)}}(e))}(t.orderBy);a&&(n.structuredQuery.orderBy=a);const o=Vi(e,t.limit);var c;return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(c=t.startAt).inclusive,values:c.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{queryTarget:n,parent:s}}function ra(e,t,n,r){const{queryTarget:s,parent:i}=na(e,t),a={},o=[];let c=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+c++;a[t]=e.alias,"count"===e.aggregateType?o.push({alias:t,count:{}}):"avg"===e.aggregateType?o.push({alias:t,avg:{field:ua(e.fieldPath)}}):"sum"===e.aggregateType&&o.push({alias:t,sum:{field:ua(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:o,structuredQuery:s.structuredQuery},parent:s.parent},aliasMap:a,parent:i}}function sa(e){let t=$i(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){v(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=ia(e);return t instanceof vr&&Er(t)?t.getFilters():[t]}(n.where));let a=[];n.orderBy&&(a=n.orderBy.map(e=>function(e){return new yr(la(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e)));let o=null;n.limit&&(o=function(e){let t;return t="object"==typeof e?e.value:e,Nn(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new mr(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new mr(n,t)}(n.endAt)),$r(t,s,a,i,o,"F",c,u)}function ia(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=la(e.unaryFilter.field);return Tr.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=la(e.unaryFilter.field);return Tr.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=la(e.unaryFilter.field);return Tr.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=la(e.unaryFilter.field);return Tr.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return b(61313);default:return b(60726)}}(e):void 0!==e.fieldFilter?function(e){return Tr.create(la(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return b(58110);default:return b(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return vr.create(e.compositeFilter.filters.map(e=>ia(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return b(1026)}}(e.compositeFilter.op))}(e):b(30097,{filter:e})}function aa(e){return Ni[e]}function oa(e){return Ri[e]}function ca(e){return Oi[e]}function ua(e){return{fieldPath:e.canonicalString()}}function la(e){return Y.fromServerFormat(e.fieldPath)}function da(e){return e instanceof Tr?function(e){if("=="===e.op){if(tr(e.value))return{unaryFilter:{field:ua(e.field),op:"IS_NAN"}};if(er(e.value))return{unaryFilter:{field:ua(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(tr(e.value))return{unaryFilter:{field:ua(e.field),op:"IS_NOT_NAN"}};if(er(e.value))return{unaryFilter:{field:ua(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ua(e.field),op:oa(e.op),value:e.value}}}(e):e instanceof vr?function(e){const t=e.getFilters().map(e=>da(e));return 1===t.length?t[0]:{compositeFilter:{op:ca(e.op),filters:t}}}(e):b(54877,{filter:e})}function ha(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function pa(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function ma(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function ga(e,t){const n={fields:{}};return t.forEach((t,r)=>{if("string"!=typeof r)throw new Error(`Cannot encode map with non-string key: ${r}`);n.fields[r]=t._toProto(e)}),{mapValue:n}}function fa(e){return{stringValue:e}}function ya(e){return{pipelineValue:e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,t,n,r,s=de.min(),i=de.min(),a=mn.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new wa(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new wa(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new wa(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new wa(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e){this.remoteSerializer=e}}function Ta(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:va(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:Qi(e,t.key),fields:t.data.value.mapValue.fields,updateTime:Fi(e,t.version.toTimestamp()),createTime:Fi(e,t.createTime.toTimestamp())}}(e.remoteSerializer,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Sa(t.version)};else{if(!t.isUnknownDocument())return b(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:Sa(t.version)}}return r}function va(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Sa(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Ia(e){const t=new le(e.seconds,e.nanoseconds);return de.fromTimestamp(t)}function Ea(e,t){const n=(t.baseMutations||[]).map(t=>ea(e.remoteSerializer,t));for(let e=0;e<t.mutations.length-1;++e){const n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const r=t.mutations.map(t=>ea(e.remoteSerializer,t)),s=le.fromMillis(t.localWriteTimeMs);return new ai(t.batchId,s,n,r)}function Ca(e){const t=Ia(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?Ia(e.lastLimboFreeSnapshotVersion):de.min();let r;return r=void 0!==e.query.documents?function(e){const t=e.documents.length;return v(1===t,1966,{count:t}),Zr(Wr($i(e.documents[0])))}(e.query):function(e){return Zr(sa(e))}(e.query),new wa(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,mn.fromBase64String(e.resumeToken))}function Da(e,t){const n=Sa(t.snapshotVersion),r=Sa(t.lastLimboFreeSnapshotVersion);let s;s=zr(t.target)?ta(e.remoteSerializer,t.target):na(e.remoteSerializer,t.target).queryTarget;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:qr(t.target),readTime:n,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function xa(e){const t=sa({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ss(t,t.limit,"L"):t}function ka(e,t){return new ci(t.largestBatchId,ea(e.remoteSerializer,t.overlayMutation))}function Aa(e,t){const n=t.path.lastSegment();return[e,Qe(t.path.popLast()),n]}function _a(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Sa(r.readTime),documentKey:Qe(r.documentKey.path),largestBatchId:r.largestBatchId}}
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
 */class Na{getBundleMetadata(e,t){return Ra(e).get(t).next(e=>{if(e)return{id:(t=e).bundleId,createTime:Ia(t.createTime),version:t.version};var t})}saveBundleMetadata(e,t){return Ra(e).put({bundleId:(n=t).id,createTime:Sa(qi(n.createTime)),version:n.version});var n}getNamedQuery(e,t){return Oa(e).get(t).next(e=>{if(e)return{name:(t=e).name,query:xa(t.bundledQuery),readTime:Ia(t.readTime)};var t})}saveNamedQuery(e,t){return Oa(e).put(function(e){return{name:e.name,readTime:Sa(qi(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function Ra(e){return en(e,Dt)}function Oa(e){return en(e,xt)}
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
 */class Pa{constructor(e,t){this.serializer=e,this.userId=t}static forUser(e,t){const n=t.uid||"";return new Pa(e,n)}getOverlay(e,t){return Va(e).get(Aa(this.userId,t)).next(e=>e?ka(this.serializer,e):null)}getOverlays(e,t){const n=Ts();return xe.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,s)=>{const i=new ci(t,s);r.push(this.saveOverlay(e,i))}),xe.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(Qe(e.getCollectionPath())));const s=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);s.push(Va(e).deleteAll(qt,r))}),xe.waitFor(s)}getOverlaysForCollection(e,t,n){const r=Ts(),s=Qe(t),i=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Va(e).loadAll(qt,i).next(e=>{for(const t of e){const e=ka(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const s=Ts();let i;const a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Va(e).iterate({index:zt,range:a},(e,t,n)=>{const a=ka(this.serializer,t);s.size()<r||a.largestBatchId===i?(s.set(a.getKey(),a),i=a.largestBatchId):n.done()}).next(()=>s)}saveOverlay(e,t){return Va(e).put(function(e,t,n){const[r,s,i]=Aa(t,n.mutation.key);return{userId:t,collectionPath:s,documentId:i,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:Zi(e.remoteSerializer,n.mutation)}}(this.serializer,this.userId,t))}}function Va(e){return en(e,Bt)}
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
 */class Fa{globalsStore(e){return en(e,Qt)}getSessionToken(e){return this.globalsStore(e).get("sessionToken").next(e=>{const t=e?.value;return t?mn.fromUint8Array(t):mn.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.globalsStore(e).put({name:"sessionToken",value:t.toUint8Array()})}}
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
 */class Ma{constructor(){}writeIndexValue(e,t){this.writeIndexValueAux(e,t),t.writeInfinity()}writeIndexValueAux(e,t){if("nullValue"in e)this.writeValueTypeLabel(t,5);else if("booleanValue"in e)this.writeValueTypeLabel(t,10),t.writeNumber(e.booleanValue?1:0);else if("integerValue"in e)this.writeValueTypeLabel(t,15),t.writeNumber(yn(e.integerValue));else if("doubleValue"in e){const n=yn(e.doubleValue);isNaN(n)?this.writeValueTypeLabel(t,13):(this.writeValueTypeLabel(t,15),Rn(n)?t.writeNumber(0):t.writeNumber(n))}else if("timestampValue"in e){let n=e.timestampValue;this.writeValueTypeLabel(t,20),"string"==typeof n&&(n=fn(n)),t.writeString(`${n.seconds||""}`),t.writeNumber(n.nanos||0)}else if("stringValue"in e)this.writeIndexString(e.stringValue,t),this.writeTruncationMarker(t);else if("bytesValue"in e)this.writeValueTypeLabel(t,30),t.writeBytes(wn(e.bytesValue)),this.writeTruncationMarker(t);else if("referenceValue"in e)this.writeIndexEntityRef(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.writeValueTypeLabel(t,45),t.writeNumber(n.latitude||0),t.writeNumber(n.longitude||0)}else"mapValue"in e?ir(e)?this.writeValueTypeLabel(t,Number.MAX_SAFE_INTEGER):rr(e)?this.writeIndexVector(e.mapValue,t):(this.writeIndexMap(e.mapValue,t),this.writeTruncationMarker(t)):"arrayValue"in e?(this.writeIndexArray(e.arrayValue,t),this.writeTruncationMarker(t)):b(19022,{indexValue:e})}writeIndexString(e,t){this.writeValueTypeLabel(t,25),this.writeUnlabeledIndexString(e,t)}writeUnlabeledIndexString(e,t){t.writeString(e)}writeIndexMap(e,t){const n=e.fields||{};this.writeValueTypeLabel(t,55);for(const e of Object.keys(n))this.writeIndexString(e,t),this.writeIndexValueAux(n[e],t)}writeIndexVector(e,t){const n=e.fields||{};this.writeValueTypeLabel(t,53);const r=qn,s=n[r].arrayValue?.values?.length||0;this.writeValueTypeLabel(t,15),t.writeNumber(yn(s)),this.writeIndexString(r,t),this.writeIndexValueAux(n[r],t)}writeIndexArray(e,t){const n=e.values||[];this.writeValueTypeLabel(t,50);for(const e of n)this.writeIndexValueAux(e,t)}writeIndexEntityRef(e,t){this.writeValueTypeLabel(t,37),J.fromName(e).path.forEach(e=>{this.writeValueTypeLabel(t,60),this.writeUnlabeledIndexString(e,t)})}writeValueTypeLabel(e,t){e.writeNumber(t)}writeTruncationMarker(e){e.writeNumber(2)}}Ma.INSTANCE=new Ma;
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
const Ba=255;function La(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function qa(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=La(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class Ua{constructor(){this.buffer=new Uint8Array(1024),this.position=0}writeBytesAscending(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.writeByteAscending(n.value),n=t.next();this.writeSeparatorAscending()}writeBytesDescending(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.writeByteDescending(n.value),n=t.next();this.writeSeparatorDescending()}writeUtf8Ascending(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.writeByteAscending(e);else if(e<2048)this.writeByteAscending(960|e>>>6),this.writeByteAscending(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.writeByteAscending(480|e>>>12),this.writeByteAscending(128|63&e>>>6),this.writeByteAscending(128|63&e);else{const e=t.codePointAt(0);this.writeByteAscending(240|e>>>18),this.writeByteAscending(128|63&e>>>12),this.writeByteAscending(128|63&e>>>6),this.writeByteAscending(128|63&e)}}this.writeSeparatorAscending()}writeUtf8Descending(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.writeByteDescending(e);else if(e<2048)this.writeByteDescending(960|e>>>6),this.writeByteDescending(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.writeByteDescending(480|e>>>12),this.writeByteDescending(128|63&e>>>6),this.writeByteDescending(128|63&e);else{const e=t.codePointAt(0);this.writeByteDescending(240|e>>>18),this.writeByteDescending(128|63&e>>>12),this.writeByteDescending(128|63&e>>>6),this.writeByteDescending(128|63&e)}}this.writeSeparatorDescending()}writeNumberAscending(e){const t=this.toOrderedBits(e),n=qa(t);this.ensureAvailable(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}writeNumberDescending(e){const t=this.toOrderedBits(e),n=qa(t);this.ensureAvailable(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}writeInfinityAscending(){this.writeEscapedByteAscending(Ba),this.writeEscapedByteAscending(255)}writeInfinityDescending(){this.writeEscapedByteDescending(Ba),this.writeEscapedByteDescending(255)}reset(){this.position=0}seed(e){this.ensureAvailable(e.length),this.buffer.set(e,this.position),this.position+=e.length}encodedBytes(){return this.buffer.slice(0,this.position)}toOrderedBits(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}writeByteAscending(e){const t=255&e;0===t?(this.writeEscapedByteAscending(0),this.writeEscapedByteAscending(255)):t===Ba?(this.writeEscapedByteAscending(Ba),this.writeEscapedByteAscending(0)):this.writeEscapedByteAscending(t)}writeByteDescending(e){const t=255&e;0===t?(this.writeEscapedByteDescending(0),this.writeEscapedByteDescending(255)):t===Ba?(this.writeEscapedByteDescending(Ba),this.writeEscapedByteDescending(0)):this.writeEscapedByteDescending(e)}writeSeparatorAscending(){this.writeEscapedByteAscending(0),this.writeEscapedByteAscending(1)}writeSeparatorDescending(){this.writeEscapedByteDescending(0),this.writeEscapedByteDescending(1)}writeEscapedByteAscending(e){this.ensureAvailable(1),this.buffer[this.position++]=e}writeEscapedByteDescending(e){this.ensureAvailable(1),this.buffer[this.position++]=~e}ensureAvailable(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class za{constructor(e){this.orderedCode=e}writeBytes(e){this.orderedCode.writeBytesAscending(e)}writeString(e){this.orderedCode.writeUtf8Ascending(e)}writeNumber(e){this.orderedCode.writeNumberAscending(e)}writeInfinity(){this.orderedCode.writeInfinityAscending()}}class Ka{constructor(e){this.orderedCode=e}writeBytes(e){this.orderedCode.writeBytesDescending(e)}writeString(e){this.orderedCode.writeUtf8Descending(e)}writeNumber(e){this.orderedCode.writeNumberDescending(e)}writeInfinity(){this.orderedCode.writeInfinityDescending()}}class Qa{constructor(){this.orderedCode=new Ua,this.ascending=new za(this.orderedCode),this.descending=new Ka(this.orderedCode)}seed(e){this.orderedCode.seed(e)}forKind(e){return 0===e?this.ascending:this.descending}encodedBytes(){return this.orderedCode.encodedBytes()}reset(){this.orderedCode.reset()}}
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
 */class Ga{constructor(e,t,n,r){this._indexId=e,this._documentKey=t,this._arrayValue=n,this._directionalValue=r}successor(){const e=this._directionalValue.length,t=0===e||255===this._directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this._directionalValue,0),t!==e?n.set([0],this._directionalValue.length):++n[n.length-1],new Ga(this._indexId,this._documentKey,this._arrayValue,n)}dbIndexEntry(e,t,n){return{indexId:this._indexId,uid:e,arrayValue:Wa(this._arrayValue),directionalValue:Wa(this._directionalValue),orderedDocumentKey:Wa(t),documentKey:n.path.toArray()}}dbIndexEntryKey(e,t,n){const r=this.dbIndexEntry(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function ja(e,t){let n=e._indexId-t._indexId;return 0!==n?n:(n=$a(e._arrayValue,t._arrayValue),0!==n?n:(n=$a(e._directionalValue,t._directionalValue),0!==n?n:J.comparator(e._documentKey,t._documentKey)))}function $a(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function Wa(e){return(0,n.isSafariOrWebkit)()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function Ha(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
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
 */(e)}class Ya{constructor(e){this.inequalityFilters=new un((e,t)=>Y.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.orderBys=e.orderBy,this.equalityFilters=[];for(const t of e.filters){const e=t;e.isInequality()?this.inequalityFilters=this.inequalityFilters.add(e):this.equalityFilters.push(e)}}get hasMultipleInequality(){return this.inequalityFilters.size>1}servedByIndex(e){if(v(e.collectionGroup===this.collectionId,49279),this.hasMultipleInequality)return!1;const t=me(e);if(void 0!==t&&!this.hasMatchingEqualityFilter(t))return!1;const n=ge(e);let r=new Set,s=0,i=0;for(;s<n.length&&this.hasMatchingEqualityFilter(n[s]);++s)r=r.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.inequalityFilters.size>0){const e=this.inequalityFilters.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[s];if(!this.matchesFilter(e,t)||!this.matchesOrderBy(this.orderBys[i++],t))return!1}++s}for(;s<n.length;++s){const e=n[s];if(i>=this.orderBys.length||!this.matchesOrderBy(this.orderBys[i++],e))return!1}return!0}buildTargetIndex(){if(this.hasMultipleInequality)return null;let e=new un(Y.comparator);const t=[];for(const n of this.equalityFilters)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new ye(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new ye(n.field,0))}for(const n of this.orderBys)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new ye(n.field,"asc"===n.dir?0:1)));return new pe(pe.UNKNOWN_ID,this.collectionId,t,be.empty())}hasMatchingEqualityFilter(e){for(const t of this.equalityFilters)if(this.matchesFilter(t,e))return!0;return!1}matchesFilter(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}matchesOrderBy(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
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
 */function Ja(e){if(v(e instanceof Tr||e instanceof vr,20012),e instanceof Tr){if(e instanceof Vr){const t=e.value.arrayValue?.values?.map(t=>Tr.create(e.field,"==",t))||[];return vr.create(t,"or")}return e}const t=e.filters.map(e=>Ja(e));return vr.create(t,e.op)}function Xa(e){if(0===e.getFilters().length)return[];const t=no(Ja(e));return v(to(t),7391),Za(t)||eo(t)?[t]:t.getFilters()}function Za(e){return e instanceof Tr}function eo(e){return e instanceof vr&&Er(e)}function to(e){return Za(e)||eo(e)||function(e){if(e instanceof vr&&Ir(e)){for(const t of e.getFilters())if(!Za(t)&&!eo(t))return!1;return!0}return!1}(e)}function no(e){if(v(e instanceof Tr||e instanceof vr,34018),e instanceof Tr)return e;if(1===e.filters.length)return no(e.filters[0]);const t=e.filters.map(e=>no(e));let n=vr.create(t,e.op);return n=io(n),to(n)?n:(v(n instanceof vr,64498),v(Sr(n),40251),v(n.filters.length>1,57927),n.filters.reduce((e,t)=>ro(e,t)))}function ro(e,t){let n;return v(e instanceof Tr||e instanceof vr,38388),v(t instanceof Tr||t instanceof vr,25473),n=e instanceof Tr?t instanceof Tr?function(e,t){return vr.create([e,t],"and")}(e,t):so(e,t):t instanceof Tr?so(t,e):function(e,t){if(v(e.filters.length>0&&t.filters.length>0,48005),Sr(e)&&Sr(t))return kr(e,t.getFilters());const n=Ir(e)?e:t,r=Ir(e)?t:e,s=n.filters.map(e=>ro(e,r));return vr.create(s,"or")}(e,t),io(n)}function so(e,t){if(Sr(t))return kr(t,e.getFilters());{const n=t.filters.map(t=>ro(e,t));return vr.create(n,"or")}}function io(e){if(v(e instanceof Tr||e instanceof vr,11850),e instanceof Tr)return e;const t=e.getFilters();if(1===t.length)return io(t[0]);if(Cr(e))return e;const n=t.map(e=>io(e)),r=[];return n.forEach(t=>{t instanceof Tr?r.push(t):t instanceof vr&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:vr.create(r,e.op)}
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
 */class ao{constructor(){this.collectionParentIndex=new oo}addToCollectionParentIndex(e,t){return this.collectionParentIndex.add(t),xe.resolve()}getCollectionParents(e,t){return xe.resolve(this.collectionParentIndex.getEntries(t))}addFieldIndex(e,t){return xe.resolve()}deleteFieldIndex(e,t){return xe.resolve()}deleteAllFieldIndexes(e){return xe.resolve()}createTargetIndexes(e,t){return xe.resolve()}getDocumentsMatchingTarget(e,t){return xe.resolve(null)}getIndexType(e,t){return xe.resolve(0)}getFieldIndexes(e,t){return xe.resolve([])}getNextCollectionGroupToUpdate(e){return xe.resolve(null)}getMinOffset(e,t){return xe.resolve(Se.min())}getMinOffsetFromCollectionGroup(e,t){return xe.resolve(Se.min())}updateCollectionGroup(e,t,n){return xe.resolve()}updateIndexEntries(e,t){return xe.resolve()}}class oo{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new un(W.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new un(W.comparator)).toArray()}}
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
 */const co="IndexedDbIndexManager",uo=new Uint8Array(0);class lo{constructor(e,t){this.databaseId=t,this.collectionParentsCache=new oo,this.targetToDnfSubTargets=new ms(e=>qr(e),(e,t)=>Ur(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.collectionParentsCache.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.collectionParentsCache.add(t)});const s={collectionId:n,parent:Qe(r)};return ho(e).put(s)}return xe.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[G(t),""],!1,!0);return ho(e).loadAll(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push($e(r.parent))}return n})}addFieldIndex(e,t){const n=mo(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const s=n.add(r);if(t.indexState){const n=go(e);return s.next(e=>{n.put(_a(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=mo(e),r=go(e),s=po(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=mo(e),n=po(e),r=go(e);return t.deleteAll().next(()=>n.deleteAll()).next(()=>r.deleteAll())}createTargetIndexes(e,t){return xe.forEach(this.getSubTargets(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new Ya(t).buildTargetIndex();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=po(e);let r=!0;const s=new Map;return xe.forEach(this.getSubTargets(t),t=>this.getFieldIndex(e,t).next(e=>{r&&(r=!!e),s.set(t,e)})).next(()=>{if(r){let e=Cs();const r=[];return xe.forEach(s,(s,i)=>{var a;g(co,`Using index ${a=s,`id=${a.indexId}|cg=${a.collectionGroup}|f=${a.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`} to execute ${qr(t)}`);const o=function(e,t){const n=me(t);if(void 0===n)return null;for(const t of Kr(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(i,s),c=function(e,t){const n=new Map;for(const r of ge(t))for(const t of Kr(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(i,s),u=function(e,t){const n=[];let r=!0;for(const s of ge(t)){const t=0===s.kind?Qr(e,s.fieldPath,e.startAt):Gr(e,s.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new mr(n,r)}(i,s),l=function(e,t){const n=[];let r=!0;for(const s of ge(t)){const t=0===s.kind?Gr(e,s.fieldPath,e.endAt):Qr(e,s.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new mr(n,r)}(i,s),d=this.encodeBound(s,i,u),h=this.encodeBound(s,i,l),p=this.encodeValues(s,i,c),m=this.generateIndexRanges(s.indexId,o,d,u.inclusive,h,l.inclusive,p);return xe.forEach(m,s=>n.loadFirst(s,t.limit).next(t=>{t.forEach(t=>{const n=J.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return xe.resolve(null)})}getSubTargets(e){let t=this.targetToDnfSubTargets.get(e);return t||(t=0===e.filters.length?[e]:Xa(vr.create(e.filters,"and")).map(t=>Lr(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.targetToDnfSubTargets.set(e,t),t)}generateIndexRanges(e,t,n,r,s,i,a){const o=(null!=t?t.length:1)*Math.max(n.length,s.length),c=o/(null!=t?t.length:1),u=[];for(let l=0;l<o;++l){const o=t?this.encodeSingleElement(t[l/c]):uo,d=this.generateLowerBound(e,o,n[l%c],r),h=this.generateUpperBound(e,o,s[l%c],i),p=a.map(t=>this.generateLowerBound(e,o,t,!0));u.push(...this.createRange(d,h,p))}return u}generateLowerBound(e,t,n,r){const s=new Ga(e,J.empty(),t,n);return r?s:s.successor()}generateUpperBound(e,t,n,r){const s=new Ga(e,J.empty(),t,n);return r?s.successor():s}getFieldIndex(e,t){const n=new Ya(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.servedByIndex(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.getSubTargets(t);return xe.forEach(r,t=>this.getFieldIndex(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new un(Y.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}encodeDirectionalElements(e,t){const n=new Qa;for(const r of ge(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const s=n.forKind(r.kind);Ma.INSTANCE.writeIndexValue(e,s)}return n.encodedBytes()}encodeSingleElement(e){const t=new Qa;return Ma.INSTANCE.writeIndexValue(e,t.forKind(0)),t.encodedBytes()}encodeDirectionalKey(e,t){const n=new Qa;return Ma.INSTANCE.writeIndexValue(Jn(this.databaseId,t),n.forKind(function(e){const t=ge(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.encodedBytes()}encodeValues(e,t,n){if(null===n)return[];let r=[];r.push(new Qa);let s=0;for(const i of ge(e)){const e=n[s++];for(const n of r)if(this.isInFilter(t,i.fieldPath)&&Zn(e))r=this.expandIndexValues(r,i,e);else{const t=n.forKind(i.kind);Ma.INSTANCE.writeIndexValue(e,t)}}return this.getEncodedBytes(r)}encodeBound(e,t,n){return this.encodeValues(e,t,n.position)}getEncodedBytes(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].encodedBytes();return t}expandIndexValues(e,t,n){const r=[...e],s=[];for(const e of n.arrayValue.values||[])for(const n of r){const r=new Qa;r.seed(n.encodedBytes()),Ma.INSTANCE.writeIndexValue(e,r.forKind(t.kind)),s.push(r)}return s}isInFilter(e,t){return!!e.filters.find(e=>e instanceof Tr&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=mo(e),r=go(e);return(t?n.loadAll(At,IDBKeyRange.bound(t,t)):n.loadAll()).next(e=>{const t=[];return xe.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new be(t.sequenceNumber,new Se(Ia(t.readTime),new J($e(t.documentKey)),t.largestBatchId)):be.empty(),r=e.fields.map(([e,t])=>new ye(Y.fromServerFormat(e),t));return new pe(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:B(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=mo(e),s=go(e);return this.getNextSequenceNumber(e).next(e=>r.loadAll(At,IDBKeyRange.bound(t,t)).next(t=>xe.forEach(t,t=>s.put(_a(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return xe.forEach(t,(t,r)=>{const s=n.get(t.collectionGroup);return(s?xe.resolve(s):this.getFieldIndexes(e,t.collectionGroup)).next(s=>(n.set(t.collectionGroup,s),xe.forEach(s,n=>this.getExistingIndexEntries(e,t,n).next(t=>{const s=this.computeIndexEntries(r,n);return t.isEqual(s)?xe.resolve():this.updateEntries(e,r,n,t,s)}))))})}addIndexEntry(e,t,n,r){return po(e).put(r.dbIndexEntry(this.uid,this.encodeDirectionalKey(n,t.key),t.key))}deleteIndexEntry(e,t,n,r){return po(e).delete(r.dbIndexEntryKey(this.uid,this.encodeDirectionalKey(n,t.key),t.key))}getExistingIndexEntries(e,t,n){const r=po(e);let s=new un(ja);return r.iterate({index:Ft,range:IDBKeyRange.only([n.indexId,this.uid,Wa(this.encodeDirectionalKey(n,t))])},(e,r)=>{s=s.add(new Ga(n.indexId,t,Ha(r.arrayValue),Ha(r.directionalValue)))}).next(()=>s)}computeIndexEntries(e,t){let n=new un(ja);const r=this.encodeDirectionalElements(t,e);if(null==r)return n;const s=me(t);if(null!=s){const i=e.data.field(s.fieldPath);if(Zn(i))for(const s of i.arrayValue.values||[])n=n.add(new Ga(t.indexId,e.key,this.encodeSingleElement(s),r))}else n=n.add(new Ga(t.indexId,e.key,uo,r));return n}updateEntries(e,t,n,r,s){g(co,"Updating index entries for document '%s'",t.key);const i=[];return function(e,t,n,r,s){const i=e.getIterator(),a=t.getIterator();let o=dn(i),c=dn(a);for(;o||c;){let e=!1,t=!1;if(o&&c){const r=n(o,c);r<0?t=!0:r>0&&(e=!0)}else null!=o?t=!0:e=!0;e?(r(c),c=dn(a)):t?(s(o),o=dn(i)):(o=dn(i),c=dn(a))}}(r,s,ja,r=>{i.push(this.addIndexEntry(e,t,n,r))},r=>{i.push(this.deleteIndexEntry(e,t,n,r))}),xe.waitFor(i)}getNextSequenceNumber(e){let t=1;return go(e).iterate({index:Rt,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>ja(e,t)).filter((e,t,n)=>!t||0!==ja(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=ja(s,e),i=ja(s,t);if(0===n)r[0]=e.successor();else if(n>0&&i<0)r.push(s),r.push(s.successor());else if(i>0)break}r.push(t);const s=[];for(let e=0;e<r.length;e+=2){if(this.isRangeMatchable(r[e],r[e+1]))return[];const t=r[e].dbIndexEntryKey(this.uid,uo,J.empty()),n=r[e+1].dbIndexEntryKey(this.uid,uo,J.empty());s.push(IDBKeyRange.bound(t,n))}return s}isRangeMatchable(e,t){return ja(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(fo)}getMinOffset(e,t){return xe.mapArray(this.getSubTargets(t),t=>this.getFieldIndex(e,t).next(e=>e||b(44426))).next(fo)}}function ho(e){return en(e,It)}function po(e){return en(e,Pt)}function mo(e){return en(e,kt)}function go(e){return en(e,_t)}function fo(e){v(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const s=e[r].indexState.offset;Ie(s,t)<0&&(t=s),n<s.largestBatchId&&(n=s.largestBatchId)}return new Se(t.readTime,t.documentKey,n)}
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
 */function yo(e,t,n){const r=e.store(Xe),s=e.store(it),i=[],a=IDBKeyRange.only(n.batchId);let o=0;const c=r.iterate({range:a},(e,t,n)=>(o++,n.delete()));i.push(c.next(()=>{v(1===o,47070,{batchId:n.batchId})}));const u=[];for(const e of n.mutations){const r=rt(t,e.key.path,n.batchId);i.push(s.delete(r)),u.push(e.key)}return xe.waitFor(i).next(()=>u)}function wo(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw b(14731);t=e.noDocument}return JSON.stringify(t).length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.documentKeysByBatchId={}}static forUser(e,t,n,r){v(""!==e.uid,64387);const s=e.isAuthenticated()?e.uid:"";return new bo(s,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return vo(e).iterate({index:et,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const s=So(e),i=vo(e);return i.add({}).next(a=>{v("number"==typeof a,49019);const o=new ai(a,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>Zi(e.remoteSerializer,t)),s=n.mutations.map(t=>Zi(e.remoteSerializer,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:s}}(this.serializer,this.userId,o),u=[];let l=new un((e,t)=>B(e.canonicalString(),t.canonicalString()));for(const e of r){const t=rt(this.userId,e.key.path,a);l=l.add(e.key.path.popLast()),u.push(i.put(c)),u.push(s.put(t,st))}return l.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.documentKeysByBatchId[a]=o.keys()}),xe.waitFor(u).next(()=>o)})}lookupMutationBatch(e,t){return vo(e).get(t).next(e=>e?(v(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),Ea(this.serializer,e)):null)}lookupMutationKeys(e,t){return this.documentKeysByBatchId[t]?xe.resolve(this.documentKeysByBatchId[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.documentKeysByBatchId[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return vo(e).iterate({index:et,range:r},(e,t,r)=>{t.userId===this.userId&&(v(t.batchId>=n,47524,{nextBatchId:n}),s=Ea(this.serializer,t)),r.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=_n;return vo(e).iterate({index:et,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,_n],[this.userId,Number.POSITIVE_INFINITY]);return vo(e).loadAll(et,t).next(e=>e.map(e=>Ea(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=nt(this.userId,t.path),r=IDBKeyRange.lowerBound(n),s=[];return So(e).iterate({range:r},(n,r,i)=>{const[a,o,c]=n,u=$e(o);if(a===this.userId&&t.path.isEqual(u))return vo(e).get(c).next(e=>{if(!e)throw b(61480,{indexKey:n,batchId:c});v(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),s.push(Ea(this.serializer,e))});i.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new un(B);const r=[];return t.forEach(t=>{const s=nt(this.userId,t.path),i=IDBKeyRange.lowerBound(s),a=So(e).iterate({range:i},(e,r,s)=>{const[i,a,o]=e,c=$e(a);i===this.userId&&t.path.isEqual(c)?n=n.add(o):s.done()});r.push(a)}),xe.waitFor(r).next(()=>this.lookupMutationBatches(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,s=nt(this.userId,n),i=IDBKeyRange.lowerBound(s);let a=new un(B);return So(e).iterate({range:i},(e,t,s)=>{const[i,o,c]=e,u=$e(o);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(a=a.add(c)):s.done()}).next(()=>this.lookupMutationBatches(e,a))}lookupMutationBatches(e,t){const n=[],r=[];return t.forEach(t=>{r.push(vo(e).get(t).next(e=>{if(null===e)throw b(35274,{batchId:t});v(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(Ea(this.serializer,e))}))}),xe.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return yo(e.simpleDbTransaction,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.removeCachedMutationKeys(t.batchId)}),xe.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}removeCachedMutationKeys(e){delete this.documentKeysByBatchId[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return xe.resolve();const n=IDBKeyRange.lowerBound([this.userId]),r=[];return So(e).iterate({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=$e(e[1]);r.push(t)}else n.done()}).next(()=>{v(0===r.length,56720,{danglingKeys:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return To(e,this.userId,t)}getMutationQueueMetadata(e){return Io(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:_n,lastStreamToken:""})}}function To(e,t,n){const r=nt(t,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let a=!1;return So(e).iterate({range:i,keysOnly:!0},(e,n,r)=>{const[i,o,c]=e;i===t&&o===s&&(a=!0),r.done()}).next(()=>a)}function vo(e){return en(e,Xe)}function So(e){return en(e,it)}function Io(e){return en(e,Je)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e){this.lastId=e}next(){return this.lastId+=2,this.lastId}static forTargetCache(){return new Eo(0)}static forSyncEngine(){return new Eo(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.retrieveMetadata(e).next(t=>{const n=new Eo(t.highestTargetId);return t.highestTargetId=n.next(),this.saveMetadata(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.retrieveMetadata(e).next(e=>de.fromTimestamp(new le(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.retrieveMetadata(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.retrieveMetadata(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.saveMetadata(e,r)))}addTargetData(e,t){return this.saveTargetData(e,t).next(()=>this.retrieveMetadata(e).next(n=>(n.targetCount+=1,this.updateMetadataFromTargetData(t,n),this.saveMetadata(e,n))))}updateTargetData(e,t){return this.saveTargetData(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Do(e).delete(t.targetId)).next(()=>this.retrieveMetadata(e)).next(t=>(v(t.targetCount>0,8065),t.targetCount-=1,this.saveMetadata(e,t)))}removeTargets(e,t,n){let r=0;const s=[];return Do(e).iterate((i,a)=>{const o=Ca(a);o.sequenceNumber<=t&&null===n.get(o.targetId)&&(r++,s.push(this.removeTargetData(e,o)))}).next(()=>xe.waitFor(s)).next(()=>r)}forEachTarget(e,t){return Do(e).iterate((e,n)=>{const r=Ca(n);t(r)})}retrieveMetadata(e){return xo(e).get(vt).next(e=>(v(null!==e,2888),e))}saveMetadata(e,t){return xo(e).put(vt,t)}saveTargetData(e,t){return Do(e).put(Da(this.serializer,t))}updateMetadataFromTargetData(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.retrieveMetadata(e).next(e=>e.targetCount)}getTargetData(e,t){const n=qr(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Do(e).iterate({range:r,index:gt},(e,n,r)=>{const i=Ca(n);Ur(t,i.target)&&(s=i,r.done())}).next(()=>s)}addMatchingKeys(e,t,n){const r=[],s=ko(e);return t.forEach(t=>{const i=Qe(t.path);r.push(s.put({targetId:n,path:i})),r.push(this.referenceDelegate.addReference(e,n,t))}),xe.waitFor(r)}removeMatchingKeys(e,t,n){const r=ko(e);return xe.forEach(t,t=>{const s=Qe(t.path);return xe.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=ko(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=ko(e);let s=Cs();return r.iterate({range:n,keysOnly:!0},(e,t,n)=>{const r=$e(e[1]),i=new J(r);s=s.add(i)}).next(()=>s)}containsKey(e,t){const n=Qe(t.path),r=IDBKeyRange.bound([n],[G(n)],!1,!0);let s=0;return ko(e).iterate({index:bt,keysOnly:!0,range:r},([e,t],n,r)=>{0!==e&&(s++,r.done())}).next(()=>s>0)}getTargetDataForTarget(e,t){return Do(e).get(t).next(e=>e?Ca(e):null)}}function Do(e){return en(e,mt)}function xo(e){return en(e,St)}function ko(e){return en(e,yt)}
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
 */const Ao={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},_o=41943040;class No{static withCacheSize(e){return new No(e,No.DEFAULT_COLLECTION_PERCENTILE,No.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}No.DEFAULT_COLLECTION_PERCENTILE=10,No.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,No.DEFAULT=new No(_o,No.DEFAULT_COLLECTION_PERCENTILE,No.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),No.DISABLED=new No(-1,0,0);
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
const Ro="LruGarbageCollector",Oo=1048576;function Po([e,t],[n,r]){const s=B(e,n);return 0===s?B(t,r):s}class Vo{constructor(e){this.maxElements=e,this.buffer=new un(Po),this.previousIndex=0}nextIndex(){return++this.previousIndex}addElement(e){const t=[e,this.nextIndex()];if(this.buffer.size<this.maxElements)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Po(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Fo{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.gcTask=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.scheduleGC(6e4)}stop(){this.gcTask&&(this.gcTask.cancel(),this.gcTask=null)}get started(){return null!==this.gcTask}scheduleGC(e){g(Ro,`Garbage collection scheduled in ${e}ms`),this.gcTask=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.gcTask=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Pe(e)?g(Ro,"Ignoring IndexedDB error during garbage collection: ",e):await De(e)}await this.scheduleGC(3e5)})}}class Mo{constructor(e,t){this.delegate=e,this.params=t}calculateTargetCount(e,t){return this.delegate.getSequenceNumberCount(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return xe.resolve(ze.INVALID);const n=new Vo(t);return this.delegate.forEachTarget(e,e=>n.addElement(e.sequenceNumber)).next(()=>this.delegate.forEachOrphanedDocumentSequenceNumber(e,e=>n.addElement(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.delegate.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.delegate.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(g("LruGarbageCollector","Garbage collection skipped; disabled"),xe.resolve(Ao)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(g("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ao):this.runGarbageCollection(e,t))}getCacheSize(e){return this.delegate.getCacheSize(e)}runGarbageCollection(e,t){let n,r,i,a,o,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(g("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,a=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),p()<=s.LogLevel.DEBUG&&g("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${a-l}ms\n\tDetermined least recently used ${r} in `+(o-a)+"ms\n"+`\tRemoved ${i} targets in `+(c-o)+"ms\n"+`\tRemoved ${e} documents in `+(u-c)+"ms\n"+`Total Duration: ${u-l}ms`),xe.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}function Bo(e,t){return new Mo(e,t)}
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
 */class Lo{constructor(e,t){this.db=e,this.garbageCollector=Bo(this,t)}getSequenceNumberCount(e){const t=this.orphanedDocumentCount(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}orphanedDocumentCount(e){let t=0;return this.forEachOrphanedDocumentSequenceNumber(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}forEachOrphanedDocumentSequenceNumber(e,t){return this.forEachOrphanedDocument(e,(e,n)=>t(n))}addReference(e,t,n){return qo(e,n)}removeReference(e,t,n){return qo(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return qo(e,t)}isPinned(e,t){return function(e,t){let n=!1;return Io(e).iterateSerial(r=>To(e,r,t).next(e=>(e&&(n=!0),xe.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.forEachOrphanedDocument(e,(i,a)=>{if(a<=t){const t=this.isPinned(e,i).next(t=>{if(!t)return s++,n.getEntry(e,i).next(()=>(n.removeEntry(i,de.min()),ko(e).delete([0,Qe(i.path)])))});r.push(t)}}).next(()=>xe.waitFor(r)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return qo(e,t)}forEachOrphanedDocument(e,t){const n=ko(e);let r,s=ze.INVALID;return n.iterate({index:bt},([e,n],{path:i,sequenceNumber:a})=>{0===e?(s!==ze.INVALID&&t(new J($e(r)),s),s=a,r=i):s=ze.INVALID}).next(()=>{s!==ze.INVALID&&t(new J($e(r)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function qo(e,t){return ko(e).put(function(e,t){return{targetId:0,path:Qe(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(){this.changes=new ms(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,pr.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?xe.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return jo(e).put(n)}removeEntry(e,t,n){return jo(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],va(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.setMetadata(e,n)))}getEntry(e,t){let n=pr.newInvalidDocument(t);return jo(e).iterate({index:ct,range:IDBKeyRange.only($o(t))},(e,r)=>{n=this.maybeDecodeDocument(t,r)}).next(()=>n)}getSizedEntry(e,t){let n={size:0,document:pr.newInvalidDocument(t)};return jo(e).iterate({index:ct,range:IDBKeyRange.only($o(t))},(e,r)=>{n={document:this.maybeDecodeDocument(t,r),size:wo(r)}}).next(()=>n)}getEntries(e,t){let n=fs();return this.forEachDbEntry(e,t,(e,t)=>{const r=this.maybeDecodeDocument(e,t);n=n.insert(e,r)}).next(()=>n)}getSizedEntries(e,t){let n=fs(),r=new an(J.comparator);return this.forEachDbEntry(e,t,(e,t)=>{const s=this.maybeDecodeDocument(e,t);n=n.insert(e,s),r=r.insert(e,wo(t))}).next(()=>({documents:n,sizeMap:r}))}forEachDbEntry(e,t,n){if(t.isEmpty())return xe.resolve();let r=new un(Ho);t.forEach(e=>r=r.add(e));const s=IDBKeyRange.bound($o(r.first()),$o(r.last())),i=r.getIterator();let a=i.getNext();return jo(e).iterate({index:ct,range:s},(e,t,r)=>{const s=J.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&Ho(a,s)<0;)n(a,null),a=i.getNext();a&&a.isEqual(s)&&(n(a,t),a=i.hasNext()?i.getNext():null),a?r.skip($o(a)):r.done()}).next(()=>{for(;a;)n(a,null),a=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,s){const i=t.path,a=[i.popLast().toArray(),i.lastSegment(),va(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],o=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return jo(e).loadAll(IDBKeyRange.bound(a,o,!0)).next(e=>{s?.incrementDocumentReadCount(e.length);let n=fs();for(const s of e){const e=this.maybeDecodeDocument(J.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);e.isFoundDocument()&&(ls(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let s=fs();const i=Wo(t,n),a=Wo(t,Se.max());return jo(e).iterate({index:lt,range:IDBKeyRange.bound(i,a,!0)},(e,t,n)=>{const i=this.maybeDecodeDocument(J.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);s=s.insert(i.key,i),s.size===r&&n.done()}).next(()=>s)}newChangeBuffer(e){return new Qo(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return Go(e).get(pt).next(e=>(v(!!e,20021),e))}setMetadata(e,t){return Go(e).put(pt,t)}maybeDecodeDocument(e,t){if(t){const e=function(e,t){let n;if(t.document)n=Xi(e.remoteSerializer,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=J.fromSegments(t.noDocument.path),r=Ia(t.noDocument.readTime);n=pr.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return b(56709);{const e=J.fromSegments(t.unknownDocument.path),r=Ia(t.unknownDocument.version);n=pr.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new le(e[0],e[1]);return de.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(de.min()))return e}return pr.newInvalidDocument(e)}}function Ko(e){return new zo(e)}class Qo extends Uo{constructor(e,t){super(),this.documentCache=e,this.trackRemovals=t,this.documentStates=new ms(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new un((e,t)=>B(e.canonicalString(),t.canonicalString()));return this.changes.forEach((s,i)=>{const a=this.documentStates.get(s);if(t.push(this.documentCache.removeEntry(e,s,a.readTime)),i.isValidDocument()){const o=Ta(this.documentCache.serializer,i);r=r.add(s.path.popLast());const c=wo(o);n+=c-a.size,t.push(this.documentCache.addEntry(e,s,o))}else if(n-=a.size,this.trackRemovals){const n=Ta(this.documentCache.serializer,i.convertToNoDocument(de.min()));t.push(this.documentCache.addEntry(e,s,n))}}),r.forEach(n=>{t.push(this.documentCache.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.documentCache.updateMetadata(e,n)),xe.waitFor(t)}getFromCache(e,t){return this.documentCache.getSizedEntry(e,t).next(e=>(this.documentStates.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.documentCache.getSizedEntries(e,t).next(({documents:e,sizeMap:t})=>(t.forEach((t,n)=>{this.documentStates.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function Go(e){return en(e,ht)}function jo(e){return en(e,at)}function $o(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Wo(e,t){const n=t.documentKey.path.toArray();return[e,va(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Ho(e,t){const n=e.path.toArray(),r=t.path.toArray();let s=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(s=B(n[e],r[e]),s)return s;return s=B(n.length,r.length),s||(s=B(n[n.length-2],r[r.length-2]),s||B(n[n.length-1],r[r.length-1]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Yo{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}}class Jo{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Ys(n.mutation,e,hn.empty(),le.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Cs()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Cs()){const r=Ts();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=ws();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Ts();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Cs()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=fs();const i=Ss(),a=Ss();return t.forEach((e,t)=>{const a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof ei)?s=s.insert(t.key,t):void 0!==a?(i.set(t.key,a.mutation.getFieldMask()),Ys(a.mutation,t,a.mutation.getFieldMask(),le.now())):i.set(t.key,hn.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>a.set(e,new Yo(t,i.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){const n=Ss();let r=new an((e,t)=>e-t),s=Cs();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let a=n.get(e)||hn.empty();a=s.applyToLocalView(i,a),n.set(e,a);const o=(r.get(s.batchId)||Cs()).add(e);r=r.insert(s.batchId,o)})}).next(()=>{const i=[],a=r.getReverseIterator();for(;a.hasNext();){const r=a.getNext(),o=r.key,c=r.value,u=vs();c.forEach(e=>{if(!s.has(e)){const r=Ws(t.get(e),n.get(e));null!==r&&u.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,o,u))}return xe.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return Yr(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Jr(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):xe.resolve(Ts());let a=he,o=s;return i.next(t=>xe.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),s.get(t)?xe.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,o,t,Cs())).next(e=>({batchId:a,changes:bs(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next(e=>{let t=ws();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=ws();return this.indexManager.getCollectionParents(e,s).next(a=>xe.forEach(a,a=>{const o=function(e,t){return new jr(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,o,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>{s.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,pr.newInvalidDocument(r)))});let n=ws();return e.forEach((e,r)=>{const i=s.get(e);void 0!==i&&Ys(i.mutation,r,hn.empty(),le.now()),ls(t,r)&&(n=n.insert(e,r))}),n})}}
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
 */class Xo{constructor(e){this.serializer=e,this.bundles=new Map,this.namedQueries=new Map}getBundleMetadata(e,t){return xe.resolve(this.bundles.get(t))}saveBundleMetadata(e,t){var n;return this.bundles.set(t.id,{id:(n=t).id,version:n.version,createTime:qi(n.createTime)}),xe.resolve()}getNamedQuery(e,t){return xe.resolve(this.namedQueries.get(t))}saveNamedQuery(e,t){return this.namedQueries.set(t.name,function(e){return{name:e.name,query:xa(e.bundledQuery),readTime:qi(e.readTime)}}(t)),xe.resolve()
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
 */}}class Zo{constructor(){this.overlays=new an(J.comparator),this.overlayByBatchId=new Map}getOverlay(e,t){return xe.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ts();return xe.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.saveOverlay(e,t,r)}),xe.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.overlayByBatchId.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.overlayByBatchId.delete(n)),xe.resolve()}getOverlaysForCollection(e,t,n){const r=Ts(),s=t.length+1,i=new J(t.child("")),a=this.overlays.getIteratorFrom(i);for(;a.hasNext();){const e=a.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return xe.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new an((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=Ts(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const a=Ts(),o=s.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=r)););return xe.resolve(a)}saveOverlay(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.overlayByBatchId.get(r.largestBatchId).delete(n.key);this.overlayByBatchId.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new ci(t,n));let s=this.overlayByBatchId.get(t);void 0===s&&(s=Cs(),this.overlayByBatchId.set(t,s)),this.overlayByBatchId.set(t,s.add(n.key))}}
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
 */class ec{constructor(){this.sessionToken=mn.EMPTY_BYTE_STRING}getSessionToken(e){return xe.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,xe.resolve()
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}}class tc{constructor(){this.refsByKey=new un(nc.compareByKey),this.refsByTarget=new un(nc.compareByTargetId)}isEmpty(){return this.refsByKey.isEmpty()}addReference(e,t){const n=new nc(e,t);this.refsByKey=this.refsByKey.add(n),this.refsByTarget=this.refsByTarget.add(n)}addReferences(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.removeRef(new nc(e,t))}removeReferences(e,t){e.forEach(e=>this.removeReference(e,t))}removeReferencesForId(e){const t=new J(new W([])),n=new nc(t,e),r=new nc(t,e+1),s=[];return this.refsByTarget.forEachInRange([n,r],e=>{this.removeRef(e),s.push(e.key)}),s}removeAllReferences(){this.refsByKey.forEach(e=>this.removeRef(e))}removeRef(e){this.refsByKey=this.refsByKey.delete(e),this.refsByTarget=this.refsByTarget.delete(e)}referencesForId(e){const t=new J(new W([])),n=new nc(t,e),r=new nc(t,e+1);let s=Cs();return this.refsByTarget.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new nc(e,0),n=this.refsByKey.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class nc{constructor(e,t){this.key=e,this.targetOrBatchId=t}static compareByKey(e,t){return J.comparator(e.key,t.key)||B(e.targetOrBatchId,t.targetOrBatchId)}static compareByTargetId(e,t){return B(e.targetOrBatchId,t.targetOrBatchId)||J.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.nextBatchId=1,this.batchesByDocumentKey=new un(nc.compareByKey)}checkEmpty(e){return xe.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.nextBatchId;this.nextBatchId++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new ai(s,t,n,r);this.mutationQueue.push(i);for(const t of r)this.batchesByDocumentKey=this.batchesByDocumentKey.add(new nc(t.key,s)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return xe.resolve(i)}lookupMutationBatch(e,t){return xe.resolve(this.findMutationBatch(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.indexOfBatchId(n),s=r<0?0:r;return xe.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return xe.resolve(0===this.mutationQueue.length?_n:this.nextBatchId-1)}getAllMutationBatches(e){return xe.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new nc(t,0),r=new nc(t,Number.POSITIVE_INFINITY),s=[];return this.batchesByDocumentKey.forEachInRange([n,r],e=>{const t=this.findMutationBatch(e.targetOrBatchId);s.push(t)}),xe.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new un(B);return t.forEach(e=>{const t=new nc(e,0),r=new nc(e,Number.POSITIVE_INFINITY);this.batchesByDocumentKey.forEachInRange([t,r],e=>{n=n.add(e.targetOrBatchId)})}),xe.resolve(this.findMutationBatches(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;J.isDocumentKey(s)||(s=s.child(""));const i=new nc(new J(s),0);let a=new un(B);return this.batchesByDocumentKey.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.targetOrBatchId)),!0)},i),xe.resolve(this.findMutationBatches(a))}findMutationBatches(e){const t=[];return e.forEach(e=>{const n=this.findMutationBatch(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){v(0===this.indexOfExistingBatchId(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.batchesByDocumentKey;return xe.forEach(t.mutations,r=>{const s=new nc(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.batchesByDocumentKey=n})}removeCachedMutationKeys(e){}containsKey(e,t){const n=new nc(t,0),r=this.batchesByDocumentKey.firstAfterOrEqual(n);return xe.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,xe.resolve()}indexOfExistingBatchId(e,t){return this.indexOfBatchId(e)}indexOfBatchId(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}findMutationBatch(e){const t=this.indexOfBatchId(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e){this.sizer=e,this.docs=new an(J.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.sizer(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return xe.resolve(n?n.document.mutableCopy():pr.newInvalidDocument(t))}getEntries(e,t){let n=fs();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():pr.newInvalidDocument(e))}),xe.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let s=fs();const i=t.path,a=new J(i.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){const{key:e,value:{document:a}}=o.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||Ie(ve(a),n)<=0||(r.has(a.key)||ls(t,a))&&(s=s.insert(a.key,a.mutableCopy()))}return xe.resolve(s)}getAllFromCollectionGroup(e,t,n,r){b(9500)}forEachDocumentKey(e,t){return xe.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ic(this)}getSize(e){return xe.resolve(this.size)}}class ic extends Uo{constructor(e){super(),this.documentCache=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.documentCache.addEntry(e,r)):this.documentCache.removeEntry(n)}),xe.waitFor(t)}getFromCache(e,t){return this.documentCache.getEntry(e,t)}getAllFromCache(e,t){return this.documentCache.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e){this.persistence=e,this.targets=new ms(e=>qr(e),Ur),this.lastRemoteSnapshotVersion=de.min(),this.highestTargetId=0,this.highestSequenceNumber=0,this.references=new tc,this.targetCount=0,this.targetIdGenerator=Eo.forTargetCache()}forEachTarget(e,t){return this.targets.forEach((e,n)=>t(n)),xe.resolve()}getLastRemoteSnapshotVersion(e){return xe.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return xe.resolve(this.highestSequenceNumber)}allocateTargetId(e){return this.highestTargetId=this.targetIdGenerator.next(),xe.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.highestSequenceNumber&&(this.highestSequenceNumber=t),xe.resolve()}saveTargetData(e){this.targets.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.targetIdGenerator=new Eo(t),this.highestTargetId=t),e.sequenceNumber>this.highestSequenceNumber&&(this.highestSequenceNumber=e.sequenceNumber)}addTargetData(e,t){return this.saveTargetData(t),this.targetCount+=1,xe.resolve()}updateTargetData(e,t){return this.saveTargetData(t),xe.resolve()}removeTargetData(e,t){return this.targets.delete(t.target),this.references.removeReferencesForId(t.targetId),this.targetCount-=1,xe.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.targets.forEach((i,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.targets.delete(i),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),xe.waitFor(s).next(()=>r)}getTargetCount(e){return xe.resolve(this.targetCount)}getTargetData(e,t){const n=this.targets.get(t)||null;return xe.resolve(n)}addMatchingKeys(e,t,n){return this.references.addReferences(t,n),xe.resolve()}removeMatchingKeys(e,t,n){this.references.removeReferences(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),xe.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.references.removeReferencesForId(t),xe.resolve()}getMatchingKeysForTargetId(e,t){const n=this.references.referencesForId(t);return xe.resolve(n)}containsKey(e,t){return xe.resolve(this.references.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,t){this.mutationQueues={},this.overlays={},this.listenSequence=new ze(0),this._started=!1,this._started=!0,this.globalsCache=new ec,this.referenceDelegate=e(this),this.targetCache=new ac(this),this.indexManager=new ao,this.remoteDocumentCache=function(e){return new sc(e)}(e=>this.referenceDelegate.documentSize(e)),this.serializer=new ba(t),this.bundleCache=new Xo(this.serializer)}start(){return Promise.resolve()}shutdown(){return this._started=!1,Promise.resolve()}get started(){return this._started}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Zo,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.mutationQueues[e.toKey()];return n||(n=new rc(t,this.referenceDelegate),this.mutationQueues[e.toKey()]=n),n}getGlobalsCache(){return this.globalsCache}getTargetCache(){return this.targetCache}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.bundleCache}runTransaction(e,t,n){g("MemoryPersistence","Starting transaction:",e);const r=new cc(this.listenSequence.next());return this.referenceDelegate.onTransactionStarted(),n(r).next(e=>this.referenceDelegate.onTransactionCommitted(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}mutationQueuesContainKey(e,t){return xe.or(Object.values(this.mutationQueues).map(n=>()=>n.containsKey(e,t)))}}class cc extends Ce{constructor(e){super(),this.currentSequenceNumber=e}}class uc{constructor(e){this.persistence=e,this.localViewReferences=new tc,this._orphanedDocuments=null}static factory(e){return new uc(e)}get orphanedDocuments(){if(this._orphanedDocuments)return this._orphanedDocuments;throw b(60996)}addReference(e,t,n){return this.localViewReferences.addReference(n,t),this.orphanedDocuments.delete(n.toString()),xe.resolve()}removeReference(e,t,n){return this.localViewReferences.removeReference(n,t),this.orphanedDocuments.add(n.toString()),xe.resolve()}markPotentiallyOrphaned(e,t){return this.orphanedDocuments.add(t.toString()),xe.resolve()}removeTarget(e,t){this.localViewReferences.removeReferencesForId(t.targetId).forEach(e=>this.orphanedDocuments.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.orphanedDocuments.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}onTransactionStarted(){this._orphanedDocuments=new Set}onTransactionCommitted(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return xe.forEach(this.orphanedDocuments,n=>{const r=J.fromPath(n);return this.isReferenced(e,r).next(e=>{e||t.removeEntry(r,de.min())})}).next(()=>(this._orphanedDocuments=null,t.apply(e)))}updateLimboDocument(e,t){return this.isReferenced(e,t).next(e=>{e?this.orphanedDocuments.delete(t.toString()):this.orphanedDocuments.add(t.toString())})}documentSize(e){return 0}isReferenced(e,t){return xe.or([()=>xe.resolve(this.localViewReferences.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.mutationQueuesContainKey(e,t)])}}class lc{constructor(e,t){this.persistence=e,this.orphanedSequenceNumbers=new ms(e=>Qe(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=Bo(this,t)}static factory(e,t){return new lc(e,t)}onTransactionStarted(){}onTransactionCommitted(e){return xe.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}getSequenceNumberCount(e){const t=this.orphanedDocumentCount(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}orphanedDocumentCount(e){let t=0;return this.forEachOrphanedDocumentSequenceNumber(e,e=>{t++}).next(()=>t)}forEachOrphanedDocumentSequenceNumber(e,t){return xe.forEach(this.orphanedSequenceNumbers,(n,r)=>this.isPinned(e,n,r).next(e=>e?xe.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.forEachDocumentKey(e,r=>this.isPinned(e,r,t).next(e=>{e||(n++,s.removeEntry(r,de.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.orphanedSequenceNumbers.set(t,e.currentSequenceNumber),xe.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.orphanedSequenceNumbers.set(n,e.currentSequenceNumber),xe.resolve()}removeReference(e,t,n){return this.orphanedSequenceNumbers.set(n,e.currentSequenceNumber),xe.resolve()}updateLimboDocument(e,t){return this.orphanedSequenceNumbers.set(t,e.currentSequenceNumber),xe.resolve()}documentSize(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Yn(e.data.value)),t}isPinned(e,t,n){return xe.or([()=>this.persistence.mutationQueuesContainKey(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.orphanedSequenceNumbers.get(t);return xe.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
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
 */class dc{constructor(e){this.serializer=e}createOrUpgrade(e,t,r,s){const i=new Ae("createOrUpgrade",t);r<1&&s>=1&&(function(e){e.createObjectStore(He)}(e),function(e){e.createObjectStore(Je,{keyPath:"userId"});e.createObjectStore(Xe,{keyPath:Ze,autoIncrement:!0}).createIndex(et,tt,{unique:!0}),e.createObjectStore(it)}(e),hc(e),function(e){e.createObjectStore(We)}(e));let a=xe.resolve();return r<3&&s>=3&&(0!==r&&(function(e){e.deleteObjectStore(yt),e.deleteObjectStore(mt),e.deleteObjectStore(St)}(e),hc(e)),a=a.next(()=>function(e){const t=e.store(St),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:de.min().toTimestamp(),targetCount:0};return t.put(vt,n)}(i))),r<4&&s>=4&&(0!==r&&(a=a.next(()=>function(e,t){return t.store(Xe).loadAll().next(n=>{e.deleteObjectStore(Xe),e.createObjectStore(Xe,{keyPath:Ze,autoIncrement:!0}).createIndex(et,tt,{unique:!0});const r=t.store(Xe),s=n.map(e=>r.put(e));return xe.waitFor(s)})}(e,i))),a=a.next(()=>{!function(e){e.createObjectStore(Ct,{keyPath:"clientId"})}(e)})),r<5&&s>=5&&(a=a.next(()=>this.removeAcknowledgedMutations(i))),r<6&&s>=6&&(a=a.next(()=>(function(e){e.createObjectStore(ht)}(e),this.addDocumentGlobal(i)))),r<7&&s>=7&&(a=a.next(()=>this.ensureSequenceNumbers(i))),r<8&&s>=8&&(a=a.next(()=>this.createCollectionParentIndex(e,i))),r<9&&s>=9&&(a=a.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),r<10&&s>=10&&(a=a.next(()=>this.rewriteCanonicalIds(i))),r<11&&s>=11&&(a=a.next(()=>{!function(e){e.createObjectStore(Dt,{keyPath:"bundleId"})}(e),function(e){e.createObjectStore(xt,{keyPath:"name"})}(e)})),r<12&&s>=12&&(a=a.next(()=>{!function(e){const t=e.createObjectStore(Bt,{keyPath:Lt});t.createIndex(qt,Ut,{unique:!1}),t.createIndex(zt,Kt,{unique:!1})}(e)})),r<13&&s>=13&&(a=a.next(()=>function(e){const t=e.createObjectStore(at,{keyPath:ot});t.createIndex(ct,ut),t.createIndex(lt,dt)}(e)).next(()=>this.rewriteRemoteDocumentCache(e,i)).next(()=>e.deleteObjectStore(We))),r<14&&s>=14&&(a=a.next(()=>this.runOverlayMigration(e,i))),r<15&&s>=15&&(a=a.next(()=>function(e){e.createObjectStore(kt,{keyPath:"indexId",autoIncrement:!0}).createIndex(At,"collectionGroup",{unique:!1});e.createObjectStore(_t,{keyPath:Nt}).createIndex(Rt,Ot,{unique:!1});e.createObjectStore(Pt,{keyPath:Vt}).createIndex(Ft,Mt,{unique:!1})}(e))),r<16&&s>=16&&(a=a.next(()=>{t.objectStore(_t).clear()}).next(()=>{t.objectStore(Pt).clear()})),r<17&&s>=17&&(a=a.next(()=>{!function(e){e.createObjectStore(Qt,{keyPath:"name"})}(e)})),r<18&&s>=18&&(0,n.isSafariOrWebkit)()&&(a=a.next(()=>{t.objectStore(_t).clear()}).next(()=>{t.objectStore(Pt).clear()})),a}addDocumentGlobal(e){let t=0;return e.store(We).iterate((e,n)=>{t+=wo(n)}).next(()=>{const n={byteSize:t};return e.store(ht).put(pt,n)})}removeAcknowledgedMutations(e){const t=e.store(Je),n=e.store(Xe);return t.loadAll().next(t=>xe.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,_n],[t.userId,t.lastAcknowledgedBatchId]);return n.loadAll(et,r).next(n=>xe.forEach(n,n=>{v(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=Ea(this.serializer,n);return yo(e,t.userId,r).next(()=>{})}))}))}ensureSequenceNumbers(e){const t=e.store(yt),n=e.store(We);return e.store(St).get(vt).next(e=>{const r=[];return n.iterate((n,s)=>{const i=new W(n),a=function(e){return[0,Qe(e)]}(i);r.push(t.get(a).next(n=>n?xe.resolve():(n=>t.put({targetId:0,path:Qe(n),sequenceNumber:e.highestListenSequenceNumber}))(i)))}).next(()=>xe.waitFor(r))})}createCollectionParentIndex(e,t){e.createObjectStore(It,{keyPath:Et});const n=t.store(It),r=new oo,s=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:Qe(r)})}};return t.store(We).iterate({keysOnly:!0},(e,t)=>{const n=new W(e);return s(n.popLast())}).next(()=>t.store(it).iterate({keysOnly:!0},([e,t,n],r)=>{const i=$e(t);return s(i.popLast())}))}rewriteCanonicalIds(e){const t=e.store(mt);return t.iterate((e,n)=>{const r=Ca(n),s=Da(this.serializer,r);return t.put(s)})}rewriteRemoteDocumentCache(e,t){const n=t.store(We),r=[];return n.iterate((e,n)=>{const s=t.store(at),i=(a=n,a.document?new J(W.fromString(a.document.name).popFirst(5)):a.noDocument?J.fromSegments(a.noDocument.path):a.unknownDocument?J.fromSegments(a.unknownDocument.path):b(36783)).path.toArray();var a;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o={prefixPath:i.slice(0,i.length-2),collectionGroup:i[i.length-2],documentId:i[i.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(s.put(o))}).next(()=>xe.waitFor(r))}runOverlayMigration(e,t){const n=t.store(Xe),r=Ko(this.serializer),s=new oc(uc.factory,this.serializer.remoteSerializer);return n.loadAll().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??Cs();Ea(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),xe.forEach(n,(e,n)=>{const i=new u(n),a=Pa.forUser(this.serializer,i),o=s.getIndexManager(i),c=bo.forUser(i,this.serializer,o,s.referenceDelegate);return new Jo(r,c,a,o).recalculateAndSaveOverlaysForDocumentKeys(new Zt(t,ze.INVALID),e).next()})})}}function hc(e){e.createObjectStore(yt,{keyPath:wt}).createIndex(bt,Tt,{unique:!0}),e.createObjectStore(mt,{keyPath:"targetId"}).createIndex(gt,ft,{unique:!0}),e.createObjectStore(St)}const pc="IndexedDbPersistence",mc=18e5,gc=5e3,fc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",yc="main";class wc{constructor(e,t,n,r,s,i,a,o,c,u,l=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.queue=s,this.window=i,this.document=a,this.sequenceNumberSyncer=c,this.forceOwningTab=u,this.schemaVersion=l,this.listenSequence=null,this._started=!1,this.isPrimary=!1,this.networkEnabled=!0,this.windowUnloadHandler=null,this.inForeground=!1,this.documentVisibilityHandler=null,this.clientMetadataRefresher=null,this.lastGarbageCollectionTime=Number.NEGATIVE_INFINITY,this.primaryStateListener=e=>Promise.resolve(),!wc.isAvailable())throw new C(E.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Lo(this,r),this.dbName=t+yc,this.serializer=new ba(o),this.simpleDb=new _e(this.dbName,this.schemaVersion,new dc(this.serializer)),this.globalsCache=new Fa,this.targetCache=new Co(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Ko(this.serializer),this.bundleCache=new Na,this.window&&this.window.localStorage?this.webStorage=this.window.localStorage:(this.webStorage=null,!1===u&&f(pc,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.updateClientMetadataAndTryBecomePrimary().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new C(E.FAILED_PRECONDITION,fc);return this.attachVisibilityHandler(),this.attachWindowUnloadHook(),this.scheduleClientMetadataAndPrimaryLeaseRefreshes(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.targetCache.getHighestSequenceNumber(e))}).then(e=>{this.listenSequence=new ze(e,this.sequenceNumberSyncer)}).then(()=>{this._started=!0}).catch(e=>(this.simpleDb&&this.simpleDb.close(),Promise.reject(e)))}setPrimaryStateListener(e){return this.primaryStateListener=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.simpleDb.setVersionChangeListener(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.queue.enqueueAndForget(async()=>{this.started&&await this.updateClientMetadataAndTryBecomePrimary()}))}updateClientMetadataAndTryBecomePrimary(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Tc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.verifyPrimaryLease(e).next(e=>{e||(this.isPrimary=!1,this.queue.enqueueRetryable(()=>this.primaryStateListener(!1)))})}).next(()=>this.canActAsPrimary(e)).next(t=>this.isPrimary&&!t?this.releasePrimaryLeaseIfHeld(e).next(()=>!1):!!t&&this.acquireOrExtendPrimaryLease(e).next(()=>!0))).catch(e=>{if(Pe(e))return g(pc,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return g(pc,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.queue.enqueueRetryable(()=>this.primaryStateListener(e)),this.isPrimary=e})}verifyPrimaryLease(e){return bc(e).get(Ye).next(e=>xe.resolve(this.isLocalClient(e)))}removeClientMetadata(e){return Tc(e).delete(this.clientId)}async maybeGarbageCollectMultiClientState(){if(this.isPrimary&&!this.isWithinAge(this.lastGarbageCollectionTime,mc)){this.lastGarbageCollectionTime=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=en(e,Ct);return t.loadAll().next(e=>{const n=this.filterActiveClients(e,mc),r=e.filter(e=>-1===n.indexOf(e));return xe.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.webStorage)for(const t of e)this.webStorage.removeItem(this.zombiedClientLocalStorageKey(t.clientId))}}scheduleClientMetadataAndPrimaryLeaseRefreshes(){this.clientMetadataRefresher=this.queue.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.updateClientMetadataAndTryBecomePrimary().then(()=>this.maybeGarbageCollectMultiClientState()).then(()=>this.scheduleClientMetadataAndPrimaryLeaseRefreshes()))}isLocalClient(e){return!!e&&e.ownerId===this.clientId}canActAsPrimary(e){return this.forceOwningTab?xe.resolve(!0):bc(e).get(Ye).next(t=>{if(null!==t&&this.isWithinAge(t.leaseTimestampMs,gc)&&!this.isClientZombied(t.ownerId)){if(this.isLocalClient(t)&&this.networkEnabled)return!0;if(!this.isLocalClient(t)){if(!t.allowTabSynchronization)throw new C(E.FAILED_PRECONDITION,fc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Tc(e).loadAll().next(e=>void 0===this.filterActiveClients(e,gc).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&g(pc,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this._started=!1,this.markClientZombied(),this.clientMetadataRefresher&&(this.clientMetadataRefresher.cancel(),this.clientMetadataRefresher=null),this.detachVisibilityHandler(),this.detachWindowUnloadHook(),await this.simpleDb.runTransaction("shutdown","readwrite",[He,Ct],e=>{const t=new Zt(e,ze.INVALID);return this.releasePrimaryLeaseIfHeld(t).next(()=>this.removeClientMetadata(t))}),this.simpleDb.close(),this.removeClientZombiedEntry()}filterActiveClients(e,t){return e.filter(e=>this.isWithinAge(e.updateTimeMs,t)&&!this.isClientZombied(e.clientId))}getActiveClients(){return this.runTransaction("getActiveClients","readonly",e=>Tc(e).loadAll().next(e=>this.filterActiveClients(e,mc).map(e=>e.clientId)))}get started(){return this._started}getGlobalsCache(){return this.globalsCache}getMutationQueue(e,t){return bo.forUser(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.targetCache}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new lo(e,this.serializer.remoteSerializer.databaseId)}getDocumentOverlayCache(e){return Pa.forUser(this.serializer,e)}getBundleCache(){return this.bundleCache}runTransaction(e,t,n){g(pc,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",s=18===(i=this.schemaVersion)?Xt:17===i?Jt:16===i?Yt:15===i?Ht:14===i?Wt:13===i?$t:12===i?jt:11===i?Gt:void b(60245);var i;let a;return this.simpleDb.runTransaction(e,r,s,r=>(a=new Zt(r,this.listenSequence?this.listenSequence.next():ze.INVALID),"readwrite-primary"===t?this.verifyPrimaryLease(a).next(e=>!!e||this.canActAsPrimary(a)).next(t=>{if(!t)throw f(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.queue.enqueueRetryable(()=>this.primaryStateListener(!1)),new C(E.FAILED_PRECONDITION,Ee);return n(a)}).next(e=>this.acquireOrExtendPrimaryLease(a).next(()=>e)):this.verifyAllowTabSynchronization(a).next(()=>n(a)))).then(e=>(a.raiseOnCommittedEvent(),e))}verifyAllowTabSynchronization(e){return bc(e).get(Ye).next(e=>{if(null!==e&&this.isWithinAge(e.leaseTimestampMs,gc)&&!this.isClientZombied(e.ownerId)&&!this.isLocalClient(e)&&!(this.forceOwningTab||this.allowTabSynchronization&&e.allowTabSynchronization))throw new C(E.FAILED_PRECONDITION,fc)})}acquireOrExtendPrimaryLease(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return bc(e).put(Ye,t)}static isAvailable(){return _e.isAvailable()}releasePrimaryLeaseIfHeld(e){const t=bc(e);return t.get(Ye).next(e=>this.isLocalClient(e)?(g(pc,"Releasing primary lease."),t.delete(Ye)):xe.resolve())}isWithinAge(e,t){const n=Date.now();return!(e<n-t||e>n&&(f(`Detected an update time that is in the future: ${e} > ${n}`),1))}attachVisibilityHandler(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.documentVisibilityHandler=()=>{this.queue.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.updateClientMetadataAndTryBecomePrimary()))},this.document.addEventListener("visibilitychange",this.documentVisibilityHandler),this.inForeground="visible"===this.document.visibilityState)}detachVisibilityHandler(){this.documentVisibilityHandler&&(this.document.removeEventListener("visibilitychange",this.documentVisibilityHandler),this.documentVisibilityHandler=null)}attachWindowUnloadHook(){"function"==typeof this.window?.addEventListener&&(this.windowUnloadHandler=()=>{this.markClientZombied();const e=/(?:Version|Mobile)\/1[456]/;(0,n.isSafari)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.queue.enterRestrictedMode(!0),this.queue.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.windowUnloadHandler))}detachWindowUnloadHook(){this.windowUnloadHandler&&(this.window.removeEventListener("pagehide",this.windowUnloadHandler),this.windowUnloadHandler=null)}isClientZombied(e){try{const t=null!==this.webStorage?.getItem(this.zombiedClientLocalStorageKey(e));return g(pc,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return f(pc,"Failed to get zombied client id.",e),!1}}markClientZombied(){if(this.webStorage)try{this.webStorage.setItem(this.zombiedClientLocalStorageKey(this.clientId),String(Date.now()))}catch(e){f("Failed to set zombie client id.",e)}}removeClientZombiedEntry(){if(this.webStorage)try{this.webStorage.removeItem(this.zombiedClientLocalStorageKey(this.clientId))}catch(e){}}zombiedClientLocalStorageKey(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function bc(e){return en(e,He)}function Tc(e){return en(e,Ct)}function vc(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}
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
 */const Sc="LocalStore",Ic=3e8;class Ec{constructor(e,t,n,r){this.persistence=e,this.queryEngine=t,this.serializer=r,this.targetDataByTarget=new an(B),this.targetIdByTarget=new ms(e=>qr(e),Ur),this.collectionGroupReadTime=new Map,this.remoteDocuments=e.getRemoteDocumentCache(),this.targetCache=e.getTargetCache(),this.bundleCache=e.getBundleCache(),this.initializeUserComponents(n)}initializeUserComponents(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Jo(this.remoteDocuments,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.remoteDocuments.setIndexManager(this.indexManager),this.queryEngine.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.targetDataByTarget))}}function Cc(e,t,n,r){return new Ec(e,t,n,r)}async function Dc(e,t){const n=I(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.initializeUserComponents(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let a=Cs();for(const e of r){s.push(e.batchId);for(const t of e.mutations)a=a.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)a=a.add(t.key)}return n.localDocuments.getDocuments(e,a).next(e=>({affectedDocuments:e,removedBatchIds:s,addedBatchIds:i}))})})}function xc(e){const t=I(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.targetCache.getLastRemoteSnapshotVersion(e))}function kc(e,t,n){let r=Cs(),s=Cs();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=fs();return n.forEach((n,i)=>{const a=e.get(n);i.isFoundDocument()!==a.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(de.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!a.isValidDocument()||i.version.compareTo(a.version)>0||0===i.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):g(Sc,"Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",i.version)}),{changedDocuments:r,existenceChangedKeys:s}})}function Ac(e,t){const n=I(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=_n),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function _c(e,t){const n=I(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.targetCache.getTargetData(e,t).next(s=>s?(r=s,xe.resolve(r)):n.targetCache.allocateTargetId(e).next(s=>(r=new wa(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.targetCache.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.targetDataByTarget.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.targetDataByTarget=n.targetDataByTarget.insert(e.targetId,e),n.targetIdByTarget.set(t,e.targetId)),e})}async function Nc(e,t,n){const r=I(e),s=r.targetDataByTarget.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(e){if(!Pe(e))throw e;g(Sc,`Failed to update sequence numbers for target ${t}: ${e}`)}r.targetDataByTarget=r.targetDataByTarget.remove(t),r.targetIdByTarget.delete(s.target)}function Rc(e,t,n){const r=I(e);let s=de.min(),i=Cs();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=I(e),s=r.targetIdByTarget.get(n);return void 0!==s?xe.resolve(r.targetDataByTarget.get(s)):r.targetCache.getTargetData(t,n)}(r,e,Zr(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.targetCache.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.queryEngine.getDocumentsMatchingQuery(e,t,n?s:de.min(),n?i:Cs())).next(e=>(Vc(r,ds(t),e),{documents:e,remoteKeys:i})))}function Oc(e,t){const n=I(e),r=I(n.targetCache),s=n.targetDataByTarget.get(t);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",e=>r.getTargetDataForTarget(e,t).next(e=>e?e.target:null))}function Pc(e,t){const n=I(e),r=n.collectionGroupReadTime.get(t)||de.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.remoteDocuments.getAllFromCollectionGroup(e,t,Te(r,he),Number.MAX_SAFE_INTEGER)).then(e=>(Vc(n,t,e),e))}function Vc(e,t,n){let r=e.collectionGroupReadTime.get(t)||de.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.collectionGroupReadTime.set(t,r)}async function Fc(e,t,n=Cs()){const r=await _c(e,Zr(xa(t.bundledQuery))),s=I(e);return s.persistence.runTransaction("Save named query","readwrite",e=>{const i=qi(t.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.bundleCache.saveNamedQuery(e,t);const a=r.withResumeToken(mn.EMPTY_BYTE_STRING,i);return s.targetDataByTarget=s.targetDataByTarget.insert(a.targetId,a),s.targetCache.updateTargetData(e,a).next(()=>s.targetCache.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>s.targetCache.addMatchingKeys(e,n,r.targetId)).next(()=>s.bundleCache.saveNamedQuery(e,t))})}
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
 */class Mc{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
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
 */class Bc{constructor(){this.initialized=!1,this.indexAutoCreationEnabled=!1,this.indexAutoCreationMinCollectionSize=100,this.relativeIndexReadCostPerDocument=(0,n.isSafari)()?8:Ne((0,n.getUA)())>0?6:4}initialize(e,t){this.localDocumentsView=e,this.indexManager=t,this.initialized=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.performQueryUsingIndex(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.performQueryUsingRemoteKeys(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Mc;return this.executeFullCollectionScan(e,t,n).next(r=>{if(s.result=r,this.indexAutoCreationEnabled)return this.createCacheIndexes(e,t,n,r.size)})}).next(()=>s.result)}createCacheIndexes(e,t,n,r){return n.documentReadCount<this.indexAutoCreationMinCollectionSize?(p()<=s.LogLevel.DEBUG&&g("QueryEngine","SDK will not create cache indexes for query:",us(t),"since it only creates cache indexes for collection contains","more than or equal to",this.indexAutoCreationMinCollectionSize,"documents"),xe.resolve()):(p()<=s.LogLevel.DEBUG&&g("QueryEngine","Query:",us(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.relativeIndexReadCostPerDocument*r?(p()<=s.LogLevel.DEBUG&&g("QueryEngine","The SDK decides to create cache indexes for query:",us(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Zr(t))):xe.resolve())}performQueryUsingIndex(e,t){if(Hr(t))return xe.resolve(null);let n=Zr(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=ss(t,null,"F"),n=Zr(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const s=Cs(...r);return this.localDocumentsView.getDocuments(e,s).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const i=this.applyQuery(t,r);return this.needsRefill(t,i,s,n.readTime)?this.performQueryUsingIndex(e,ss(t,null,"F")):this.appendRemainingResults(e,i,t,n)}))})))}performQueryUsingRemoteKeys(e,t,n,r){return Hr(t)||r.isEqual(de.min())?xe.resolve(null):this.localDocumentsView.getDocuments(e,n).next(i=>{const a=this.applyQuery(t,i);return this.needsRefill(t,a,n,r)?xe.resolve(null):(p()<=s.LogLevel.DEBUG&&g("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),us(t)),this.appendRemainingResults(e,a,t,Te(r,he)).next(e=>e))})}applyQuery(e,t){let n=new un(hs(e));return t.forEach((t,r)=>{ls(e,r)&&(n=n.add(r))}),n}needsRefill(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}executeFullCollectionScan(e,t,n){return p()<=s.LogLevel.DEBUG&&g("QueryEngine","Using full collection scan to execute query:",us(t)),this.localDocumentsView.getDocumentsMatchingQuery(e,t,Se.min(),n)}appendRemainingResults(e,t,n,r){return this.localDocumentsView.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
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
 */const Lc="firestore_clients";function qc(e,t){return`${Lc}_${e}_${t}`}const Uc="firestore_mutations";function zc(e,t,n){let r=`${Uc}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const Kc="firestore_targets";function Qc(e,t){return`${Kc}_${e}_${t}`
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
 */}const Gc="SharedClientState";class jc{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static fromWebStorageEntry(e,t,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new C(r.error.code,r.error.message))),i?new jc(e,t,r.state,s):(f(Gc,`Failed to parse mutation state for ID '${t}': ${n}`),null)}toWebStorageJSON(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class $c{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static fromWebStorageEntry(e,t){const n=JSON.parse(t);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new C(n.error.code,n.error.message))),s?new $c(e,n.state,r):(f(Gc,`Failed to parse target state for ID '${e}': ${t}`),null)}toWebStorageJSON(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Wc{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static fromWebStorageEntry(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=xs();for(let e=0;r&&e<n.activeTargetIds.length;++e)r=Pn(n.activeTargetIds[e]),s=s.add(n.activeTargetIds[e]);return r?new Wc(e,s):(f(Gc,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Hc{constructor(e,t){this.clientId=e,this.onlineState=t}static fromWebStorageEntry(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new Hc(t.clientId,t.onlineState):(f(Gc,`Failed to parse online state: ${e}`),null)}}class Yc{constructor(){this.activeTargetIds=xs()}addQueryTarget(e){this.activeTargetIds=this.activeTargetIds.add(e)}removeQueryTarget(e){this.activeTargetIds=this.activeTargetIds.delete(e)}toWebStorageJSON(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Jc{constructor(e,t,n,r,s){this.window=e,this.queue=t,this.persistenceKey=n,this.localClientId=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.storageListener=this.handleWebStorageEvent.bind(this),this.activeClients=new an(B),this.started=!1,this.earlyEvents=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.localClientStorageKey=qc(this.persistenceKey,this.localClientId),this.sequenceNumberKey=function(e){return`firestore_sequence_number_${e}`}(this.persistenceKey),this.activeClients=this.activeClients.insert(this.localClientId,new Yc),this.clientStateKeyRe=new RegExp(`^${Lc}_${i}_([^_]*)$`),this.mutationBatchKeyRe=new RegExp(`^${Uc}_${i}_(\\d+)(?:_(.*))?$`),this.queryTargetKeyRe=new RegExp(`^${Kc}_${i}_(\\d+)$`),this.onlineStateKey=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.bundleLoadedKey=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.storageListener)}static isAvailable(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.getActiveClients();for(const t of e){if(t===this.localClientId)continue;const e=this.getItem(qc(this.persistenceKey,t));if(e){const n=Wc.fromWebStorageEntry(t,e);n&&(this.activeClients=this.activeClients.insert(n.clientId,n))}}this.persistClientState();const t=this.storage.getItem(this.onlineStateKey);if(t){const e=this.fromWebStorageOnlineState(t);e&&this.handleOnlineStateEvent(e)}for(const e of this.earlyEvents)this.handleWebStorageEvent(e);this.earlyEvents=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.sequenceNumberKey,JSON.stringify(e))}getAllActiveQueryTargets(){return this.extractActiveQueryTargets(this.activeClients)}isActiveQueryTarget(e){let t=!1;return this.activeClients.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.persistMutationState(e,"pending")}updateMutationState(e,t,n){this.persistMutationState(e,t,n),this.removeMutationState(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(Qc(this.persistenceKey,e));if(t){const r=$c.fromWebStorageEntry(e,t);r&&(n=r.state)}}return t&&this.localClientState.addQueryTarget(e),this.persistClientState(),n}removeLocalQueryTarget(e){this.localClientState.removeQueryTarget(e),this.persistClientState()}isLocalQueryTarget(e){return this.localClientState.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Qc(this.persistenceKey,e))}updateQueryState(e,t,n){this.persistQueryTargetState(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.removeMutationState(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.persistOnlineState(e)}notifyBundleLoaded(e){this.persistBundleLoadedState(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.storageListener),this.removeItem(this.localClientStorageKey),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return g(Gc,"READ",e,t),t}setItem(e,t){g(Gc,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){g(Gc,"REMOVE",e),this.storage.removeItem(e)}handleWebStorageEvent(e){const t=e;if(t.storageArea===this.storage){if(g(Gc,"EVENT",t.key,t.newValue),t.key===this.localClientStorageKey)return void f("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.queue.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.clientStateKeyRe.test(t.key)){if(null==t.newValue){const e=this.fromWebStorageClientStateKey(t.key);return this.handleClientStateEvent(e,null)}{const e=this.fromWebStorageClientState(t.key,t.newValue);if(e)return this.handleClientStateEvent(e.clientId,e)}}else if(this.mutationBatchKeyRe.test(t.key)){if(null!==t.newValue){const e=this.fromWebStorageMutationMetadata(t.key,t.newValue);if(e)return this.handleMutationBatchEvent(e)}}else if(this.queryTargetKeyRe.test(t.key)){if(null!==t.newValue){const e=this.fromWebStorageQueryTargetMetadata(t.key,t.newValue);if(e)return this.handleQueryTargetEvent(e)}}else if(t.key===this.onlineStateKey){if(null!==t.newValue){const e=this.fromWebStorageOnlineState(t.newValue);if(e)return this.handleOnlineStateEvent(e)}}else if(t.key===this.sequenceNumberKey){const e=function(e){let t=ze.INVALID;if(null!=e)try{const n=JSON.parse(e);v("number"==typeof n,30636,{seqString:e}),t=n}catch(e){f(Gc,"Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==ze.INVALID&&this.sequenceNumberHandler(e)}else if(t.key===this.bundleLoadedKey){const e=this.fromWebStoreBundleLoadedState(t.newValue);await Promise.all(e.map(e=>this.syncEngine.synchronizeWithChangedDocuments(e)))}}else this.earlyEvents.push(t)})}}get localClientState(){return this.activeClients.get(this.localClientId)}persistClientState(){this.setItem(this.localClientStorageKey,this.localClientState.toWebStorageJSON())}persistMutationState(e,t,n){const r=new jc(this.currentUser,e,t,n),s=zc(this.persistenceKey,this.currentUser,e);this.setItem(s,r.toWebStorageJSON())}removeMutationState(e){const t=zc(this.persistenceKey,this.currentUser,e);this.removeItem(t)}persistOnlineState(e){const t={clientId:this.localClientId,onlineState:e};this.storage.setItem(this.onlineStateKey,JSON.stringify(t))}persistQueryTargetState(e,t,n){const r=Qc(this.persistenceKey,e),s=new $c(e,t,n);this.setItem(r,s.toWebStorageJSON())}persistBundleLoadedState(e){const t=JSON.stringify(Array.from(e));this.setItem(this.bundleLoadedKey,t)}fromWebStorageClientStateKey(e){const t=this.clientStateKeyRe.exec(e);return t?t[1]:null}fromWebStorageClientState(e,t){const n=this.fromWebStorageClientStateKey(e);return Wc.fromWebStorageEntry(n,t)}fromWebStorageMutationMetadata(e,t){const n=this.mutationBatchKeyRe.exec(e),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return jc.fromWebStorageEntry(new u(s),r,t)}fromWebStorageQueryTargetMetadata(e,t){const n=this.queryTargetKeyRe.exec(e),r=Number(n[1]);return $c.fromWebStorageEntry(r,t)}fromWebStorageOnlineState(e){return Hc.fromWebStorageEntry(e)}fromWebStoreBundleLoadedState(e){return JSON.parse(e)}async handleMutationBatchEvent(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.applyBatchState(e.batchId,e.state,e.error);g(Gc,`Ignoring mutation for non-active user ${e.user.uid}`)}handleQueryTargetEvent(e){return this.syncEngine.applyTargetState(e.targetId,e.state,e.error)}handleClientStateEvent(e,t){const n=t?this.activeClients.insert(e,t):this.activeClients.remove(e),r=this.extractActiveQueryTargets(this.activeClients),s=this.extractActiveQueryTargets(n),i=[],a=[];return s.forEach(e=>{r.has(e)||i.push(e)}),r.forEach(e=>{s.has(e)||a.push(e)}),this.syncEngine.applyActiveTargetsChange(i,a).then(()=>{this.activeClients=n})}handleOnlineStateEvent(e){this.activeClients.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}extractActiveQueryTargets(e){let t=xs();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class Xc{constructor(){this.localState=new Yc,this.queryState={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.localState.addQueryTarget(e),this.queryState[e]||"not-current"}updateQueryState(e,t,n){this.queryState[e]=t}removeLocalQueryTarget(e){this.localState.removeQueryTarget(e)}isLocalQueryTarget(e){return this.localState.activeTargetIds.has(e)}clearQueryState(e){delete this.queryState[e]}getAllActiveQueryTargets(){return this.localState.activeTargetIds}isActiveQueryTarget(e){return this.localState.activeTargetIds.has(e)}start(){return this.localState=new Yc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
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
 */class Zc{addCallback(e){}shutdown(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this.sendFn=e.sendFn,this.closeFn=e.closeFn}onConnected(e){this.wrappedOnConnected=e}onOpen(e){this.wrappedOnOpen=e}onClose(e){this.wrappedOnClose=e}onMessage(e){this.wrappedOnMessage=e}close(){this.closeFn()}send(e){this.sendFn(e)}callOnConnected(){this.wrappedOnConnected()}callOnOpen(){this.wrappedOnOpen()}callOnClose(e){this.wrappedOnClose(e)}callOnMessage(e){this.wrappedOnMessage(e)}}
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
 */let tu=null;function nu(){return null===tu?tu=268435456+Math.round(2147483648*Math.random()):tu++,"0x"+tu.toString(16)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const ru="GrpcConnection",su=`gl-node/${process.versions.node} fire/${l} grpc/1.9.15`;function iu(e,t,n,r,s){v(null===t||"OAuth"===t.type,36936);const i=new o.Metadata;return t&&t.headers.forEach((e,t)=>i.set(t,e)),n&&n.headers.forEach((e,t)=>i.set(t,e)),r&&i.set("X-Firebase-GMPID",r),i.set("X-Goog-Api-Client",su),i.set("Google-Cloud-Resource-Prefix",e),i.set("x-goog-request-params",e),s&&i.set("X-Goog-Api-Key",s),i}class au{get shouldResourcePathBeIncludedInRequest(){return!0}constructor(e,t){this.databaseInfo=t,this.cachedStub=null,this.firestore=e.google.firestore.v1,this.databasePath=`projects/${t.databaseId.projectId}/databases/${t.databaseId.database}`}ensureActiveStub(){if(!this.cachedStub){g(ru,"Creating Firestore stub.");const e=this.databaseInfo.ssl?o.credentials.createSsl():o.credentials.createInsecure();this.cachedStub=new this.firestore.Firestore(this.databaseInfo.host,e)}return this.cachedStub}invokeRPC(e,t,n,r,s){const i=nu(),a=this.ensureActiveStub(),o=iu(this.databasePath,r,s,this.databaseInfo.appId,this.databaseInfo.apiKey),c={database:this.databasePath,...n};return u=t=>(g(ru,`RPC '${e}' ${i} invoked with request:`,n),a[e](c,o,(n,r)=>{n?(g(ru,`RPC '${e}' ${i} failed with error:`,n),t(new C(hi(n.code),n.message))):(g(ru,`RPC '${e}' ${i} completed with response:`,r),t(void 0,r))})),new Promise((e,t)=>{u((n,r)=>{n?t(n):e(r)})});var u}invokeStreamingRPC(e,t,n,r,s,i){const a=nu(),o=[],c=new D;g(ru,`RPC '${e}' ${a} invoked (streaming) with request:`,n);const u=this.ensureActiveStub(),l=iu(this.databasePath,r,s,this.databaseInfo.appId,this.databaseInfo.apiKey),d={...n,database:this.databasePath},h=u[e](d,l);let p=!1;return h.on("data",t=>{g(ru,`RPC ${e} ${a} received result:`,t),o.push(t),void 0!==i&&o.length===i&&(p=!0,c.resolve(o))}),h.on("end",()=>{g(ru,`RPC '${e}' ${a} completed.`),p||(p=!0,c.resolve(o))}),h.on("error",t=>{g(ru,`RPC '${e}' ${a} failed with error:`,t);const n=hi(t.code);c.reject(new C(n,t.message))}),c.promise}openStream(e,t,n){const r=nu(),s=this.ensureActiveStub(),i=iu(this.databasePath,t,n,this.databaseInfo.appId,this.databaseInfo.apiKey),a=s[e](i);let o=!1;const c=e=>{o||(o=!0,u.callOnClose(e),a.end())},u=new eu({sendFn:t=>{if(o)g(ru,`RPC '${e}' stream ${r} not sending because gRPC stream is closed:`,t);else{g(ru,`RPC '${e}' stream ${r} sending:`,t);try{a.write(t)}catch(e){throw f("Failure sending:",t),f("Error:",e),e}}},closeFn:()=>{g(ru,`RPC '${e}' stream ${r} closed locally via close().`),c()}});let l=!1;return a.on("data",t=>{o||(g(ru,`RPC '${e}' stream ${r} received:`,t),l||(u.callOnConnected(),l=!0),u.callOnMessage(t))}),a.on("end",()=>{g(ru,`RPC '${e}' stream ${r} ended.`),c()}),a.on("error",t=>{if(!o){y(ru,`RPC '${e}' stream ${r} error. Code:`,t.code,"Message:",t.message);const n=hi(t.code);c(new C(n,t.message))}}),g(ru,`Opening RPC '${e}' stream ${r} to ${this.databaseInfo.host}`),setTimeout(()=>{u.callOnOpen()},0),u}terminate(){this.cachedStub&&(this.cachedStub.close(),this.cachedStub=void 0)}}const ou={google:{nested:{protobuf:{options:{go_package:"github.com/golang/protobuf/protoc-gen-go/descriptor;descriptor",java_package:"com.google.protobuf",java_outer_classname:"DescriptorProtos",csharp_namespace:"Google.Protobuf.Reflection",objc_class_prefix:"GPB",cc_enable_arenas:!0,optimize_for:"SPEED"},nested:{Struct:{fields:{fields:{keyType:"string",type:"Value",id:1}}},Value:{oneofs:{kind:{oneof:["nullValue","numberValue","stringValue","boolValue","structValue","listValue"]}},fields:{nullValue:{type:"NullValue",id:1},numberValue:{type:"double",id:2},stringValue:{type:"string",id:3},boolValue:{type:"bool",id:4},structValue:{type:"Struct",id:5},listValue:{type:"ListValue",id:6}}},NullValue:{values:{NULL_VALUE:0}},ListValue:{fields:{values:{rule:"repeated",type:"Value",id:1}}},Timestamp:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}},FileDescriptorSet:{fields:{file:{rule:"repeated",type:"FileDescriptorProto",id:1}}},FileDescriptorProto:{fields:{name:{type:"string",id:1},package:{type:"string",id:2},dependency:{rule:"repeated",type:"string",id:3},publicDependency:{rule:"repeated",type:"int32",id:10,options:{packed:!1}},weakDependency:{rule:"repeated",type:"int32",id:11,options:{packed:!1}},messageType:{rule:"repeated",type:"DescriptorProto",id:4},enumType:{rule:"repeated",type:"EnumDescriptorProto",id:5},service:{rule:"repeated",type:"ServiceDescriptorProto",id:6},extension:{rule:"repeated",type:"FieldDescriptorProto",id:7},options:{type:"FileOptions",id:8},sourceCodeInfo:{type:"SourceCodeInfo",id:9},syntax:{type:"string",id:12}}},DescriptorProto:{fields:{name:{type:"string",id:1},field:{rule:"repeated",type:"FieldDescriptorProto",id:2},extension:{rule:"repeated",type:"FieldDescriptorProto",id:6},nestedType:{rule:"repeated",type:"DescriptorProto",id:3},enumType:{rule:"repeated",type:"EnumDescriptorProto",id:4},extensionRange:{rule:"repeated",type:"ExtensionRange",id:5},oneofDecl:{rule:"repeated",type:"OneofDescriptorProto",id:8},options:{type:"MessageOptions",id:7},reservedRange:{rule:"repeated",type:"ReservedRange",id:9},reservedName:{rule:"repeated",type:"string",id:10}},nested:{ExtensionRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2},options:{type:"ExtensionRangeOptions",id:3}}},ReservedRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2}}}}},ExtensionRangeOptions:{fields:{uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},FieldDescriptorProto:{fields:{name:{type:"string",id:1},number:{type:"int32",id:3},label:{type:"Label",id:4},type:{type:"Type",id:5},typeName:{type:"string",id:6},extendee:{type:"string",id:2},defaultValue:{type:"string",id:7},oneofIndex:{type:"int32",id:9},jsonName:{type:"string",id:10},options:{type:"FieldOptions",id:8}},nested:{Type:{values:{TYPE_DOUBLE:1,TYPE_FLOAT:2,TYPE_INT64:3,TYPE_UINT64:4,TYPE_INT32:5,TYPE_FIXED64:6,TYPE_FIXED32:7,TYPE_BOOL:8,TYPE_STRING:9,TYPE_GROUP:10,TYPE_MESSAGE:11,TYPE_BYTES:12,TYPE_UINT32:13,TYPE_ENUM:14,TYPE_SFIXED32:15,TYPE_SFIXED64:16,TYPE_SINT32:17,TYPE_SINT64:18}},Label:{values:{LABEL_OPTIONAL:1,LABEL_REQUIRED:2,LABEL_REPEATED:3}}}},OneofDescriptorProto:{fields:{name:{type:"string",id:1},options:{type:"OneofOptions",id:2}}},EnumDescriptorProto:{fields:{name:{type:"string",id:1},value:{rule:"repeated",type:"EnumValueDescriptorProto",id:2},options:{type:"EnumOptions",id:3},reservedRange:{rule:"repeated",type:"EnumReservedRange",id:4},reservedName:{rule:"repeated",type:"string",id:5}},nested:{EnumReservedRange:{fields:{start:{type:"int32",id:1},end:{type:"int32",id:2}}}}},EnumValueDescriptorProto:{fields:{name:{type:"string",id:1},number:{type:"int32",id:2},options:{type:"EnumValueOptions",id:3}}},ServiceDescriptorProto:{fields:{name:{type:"string",id:1},method:{rule:"repeated",type:"MethodDescriptorProto",id:2},options:{type:"ServiceOptions",id:3}}},MethodDescriptorProto:{fields:{name:{type:"string",id:1},inputType:{type:"string",id:2},outputType:{type:"string",id:3},options:{type:"MethodOptions",id:4},clientStreaming:{type:"bool",id:5,options:{default:!1}},serverStreaming:{type:"bool",id:6,options:{default:!1}}}},FileOptions:{fields:{javaPackage:{type:"string",id:1},javaOuterClassname:{type:"string",id:8},javaMultipleFiles:{type:"bool",id:10,options:{default:!1}},javaGenerateEqualsAndHash:{type:"bool",id:20,options:{deprecated:!0}},javaStringCheckUtf8:{type:"bool",id:27,options:{default:!1}},optimizeFor:{type:"OptimizeMode",id:9,options:{default:"SPEED"}},goPackage:{type:"string",id:11},ccGenericServices:{type:"bool",id:16,options:{default:!1}},javaGenericServices:{type:"bool",id:17,options:{default:!1}},pyGenericServices:{type:"bool",id:18,options:{default:!1}},phpGenericServices:{type:"bool",id:42,options:{default:!1}},deprecated:{type:"bool",id:23,options:{default:!1}},ccEnableArenas:{type:"bool",id:31,options:{default:!1}},objcClassPrefix:{type:"string",id:36},csharpNamespace:{type:"string",id:37},swiftPrefix:{type:"string",id:39},phpClassPrefix:{type:"string",id:40},phpNamespace:{type:"string",id:41},phpMetadataNamespace:{type:"string",id:44},rubyPackage:{type:"string",id:45},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[38,38]],nested:{OptimizeMode:{values:{SPEED:1,CODE_SIZE:2,LITE_RUNTIME:3}}}},MessageOptions:{fields:{messageSetWireFormat:{type:"bool",id:1,options:{default:!1}},noStandardDescriptorAccessor:{type:"bool",id:2,options:{default:!1}},deprecated:{type:"bool",id:3,options:{default:!1}},mapEntry:{type:"bool",id:7},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[8,8],[9,9]]},FieldOptions:{fields:{ctype:{type:"CType",id:1,options:{default:"STRING"}},packed:{type:"bool",id:2},jstype:{type:"JSType",id:6,options:{default:"JS_NORMAL"}},lazy:{type:"bool",id:5,options:{default:!1}},deprecated:{type:"bool",id:3,options:{default:!1}},weak:{type:"bool",id:10,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[4,4]],nested:{CType:{values:{STRING:0,CORD:1,STRING_PIECE:2}},JSType:{values:{JS_NORMAL:0,JS_STRING:1,JS_NUMBER:2}}}},OneofOptions:{fields:{uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},EnumOptions:{fields:{allowAlias:{type:"bool",id:2},deprecated:{type:"bool",id:3,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],reserved:[[5,5]]},EnumValueOptions:{fields:{deprecated:{type:"bool",id:1,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},ServiceOptions:{fields:{deprecated:{type:"bool",id:33,options:{default:!1}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]]},MethodOptions:{fields:{deprecated:{type:"bool",id:33,options:{default:!1}},idempotencyLevel:{type:"IdempotencyLevel",id:34,options:{default:"IDEMPOTENCY_UNKNOWN"}},uninterpretedOption:{rule:"repeated",type:"UninterpretedOption",id:999}},extensions:[[1e3,536870911]],nested:{IdempotencyLevel:{values:{IDEMPOTENCY_UNKNOWN:0,NO_SIDE_EFFECTS:1,IDEMPOTENT:2}}}},UninterpretedOption:{fields:{name:{rule:"repeated",type:"NamePart",id:2},identifierValue:{type:"string",id:3},positiveIntValue:{type:"uint64",id:4},negativeIntValue:{type:"int64",id:5},doubleValue:{type:"double",id:6},stringValue:{type:"bytes",id:7},aggregateValue:{type:"string",id:8}},nested:{NamePart:{fields:{namePart:{rule:"required",type:"string",id:1},isExtension:{rule:"required",type:"bool",id:2}}}}},SourceCodeInfo:{fields:{location:{rule:"repeated",type:"Location",id:1}},nested:{Location:{fields:{path:{rule:"repeated",type:"int32",id:1},span:{rule:"repeated",type:"int32",id:2},leadingComments:{type:"string",id:3},trailingComments:{type:"string",id:4},leadingDetachedComments:{rule:"repeated",type:"string",id:6}}}}},GeneratedCodeInfo:{fields:{annotation:{rule:"repeated",type:"Annotation",id:1}},nested:{Annotation:{fields:{path:{rule:"repeated",type:"int32",id:1},sourceFile:{type:"string",id:2},begin:{type:"int32",id:3},end:{type:"int32",id:4}}}}},DoubleValue:{fields:{value:{type:"double",id:1}}},FloatValue:{fields:{value:{type:"float",id:1}}},Int64Value:{fields:{value:{type:"int64",id:1}}},UInt64Value:{fields:{value:{type:"uint64",id:1}}},Int32Value:{fields:{value:{type:"int32",id:1}}},UInt32Value:{fields:{value:{type:"uint32",id:1}}},BoolValue:{fields:{value:{type:"bool",id:1}}},StringValue:{fields:{value:{type:"string",id:1}}},BytesValue:{fields:{value:{type:"bytes",id:1}}},Empty:{fields:{}},Any:{fields:{type_url:{type:"string",id:1},value:{type:"bytes",id:2}}},Duration:{fields:{seconds:{type:"int64",id:1},nanos:{type:"int32",id:2}}}}},firestore:{nested:{v1:{options:{csharp_namespace:"Google.Cloud.Firestore.V1",go_package:"cloud.google.com/go/firestore/apiv1/firestorepb;firestorepb",java_multiple_files:!0,java_outer_classname:"QueryProfileProto",java_package:"com.google.firestore.v1",objc_class_prefix:"GCFS",php_namespace:"Google\\Cloud\\Firestore\\V1",ruby_package:"Google::Cloud::Firestore::V1"},nested:{AggregationResult:{fields:{aggregateFields:{keyType:"string",type:"Value",id:2}}},Document:{fields:{name:{type:"string",id:1},fields:{keyType:"string",type:"Value",id:2},createTime:{type:"google.protobuf.Timestamp",id:3},updateTime:{type:"google.protobuf.Timestamp",id:4}}},Value:{oneofs:{valueType:{oneof:["nullValue","booleanValue","integerValue","doubleValue","timestampValue","stringValue","bytesValue","referenceValue","geoPointValue","arrayValue","mapValue","fieldReferenceValue","functionValue","pipelineValue"]}},fields:{nullValue:{type:"google.protobuf.NullValue",id:11},booleanValue:{type:"bool",id:1},integerValue:{type:"int64",id:2},doubleValue:{type:"double",id:3},timestampValue:{type:"google.protobuf.Timestamp",id:10},stringValue:{type:"string",id:17},bytesValue:{type:"bytes",id:18},referenceValue:{type:"string",id:5},geoPointValue:{type:"google.type.LatLng",id:8},arrayValue:{type:"ArrayValue",id:9},mapValue:{type:"MapValue",id:6},fieldReferenceValue:{type:"string",id:19},functionValue:{type:"Function",id:20},pipelineValue:{type:"Pipeline",id:21}}},ArrayValue:{fields:{values:{rule:"repeated",type:"Value",id:1}}},MapValue:{fields:{fields:{keyType:"string",type:"Value",id:1}}},Function:{fields:{name:{type:"string",id:1},args:{rule:"repeated",type:"Value",id:2},options:{keyType:"string",type:"Value",id:3}}},Pipeline:{fields:{stages:{rule:"repeated",type:"Stage",id:1}},nested:{Stage:{fields:{name:{type:"string",id:1},args:{rule:"repeated",type:"Value",id:2},options:{keyType:"string",type:"Value",id:3}}}}},BitSequence:{fields:{bitmap:{type:"bytes",id:1},padding:{type:"int32",id:2}}},BloomFilter:{fields:{bits:{type:"BitSequence",id:1},hashCount:{type:"int32",id:2}}},DocumentMask:{fields:{fieldPaths:{rule:"repeated",type:"string",id:1}}},Precondition:{oneofs:{conditionType:{oneof:["exists","updateTime"]}},fields:{exists:{type:"bool",id:1},updateTime:{type:"google.protobuf.Timestamp",id:2}}},TransactionOptions:{oneofs:{mode:{oneof:["readOnly","readWrite"]}},fields:{readOnly:{type:"ReadOnly",id:2},readWrite:{type:"ReadWrite",id:3}},nested:{ReadWrite:{fields:{retryTransaction:{type:"bytes",id:1}}},ReadOnly:{oneofs:{consistencySelector:{oneof:["readTime"]}},fields:{readTime:{type:"google.protobuf.Timestamp",id:2}}}}},Firestore:{options:{"(google.api.default_host)":"firestore.googleapis.com","(google.api.oauth_scopes)":"https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/datastore"},methods:{GetDocument:{requestType:"GetDocumentRequest",responseType:"Document",options:{"(google.api.http).get":"/v1/{name=projects/*/databases/*/documents/*/**}"},parsedOptions:[{"(google.api.http)":{get:"/v1/{name=projects/*/databases/*/documents/*/**}"}}]},ListDocuments:{requestType:"ListDocumentsRequest",responseType:"ListDocumentsResponse",options:{"(google.api.http).get":"/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"},parsedOptions:[{"(google.api.http)":{get:"/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"}}]},UpdateDocument:{requestType:"UpdateDocumentRequest",responseType:"Document",options:{"(google.api.http).patch":"/v1/{document.name=projects/*/databases/*/documents/*/**}","(google.api.http).body":"document","(google.api.method_signature)":"document,update_mask"},parsedOptions:[{"(google.api.http)":{patch:"/v1/{document.name=projects/*/databases/*/documents/*/**}",body:"document"}},{"(google.api.method_signature)":"document,update_mask"}]},DeleteDocument:{requestType:"DeleteDocumentRequest",responseType:"google.protobuf.Empty",options:{"(google.api.http).delete":"/v1/{name=projects/*/databases/*/documents/*/**}","(google.api.method_signature)":"name"},parsedOptions:[{"(google.api.http)":{delete:"/v1/{name=projects/*/databases/*/documents/*/**}"}},{"(google.api.method_signature)":"name"}]},BatchGetDocuments:{requestType:"BatchGetDocumentsRequest",responseType:"BatchGetDocumentsResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:batchGet","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:batchGet",body:"*"}}]},BeginTransaction:{requestType:"BeginTransactionRequest",responseType:"BeginTransactionResponse",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:beginTransaction","(google.api.http).body":"*","(google.api.method_signature)":"database"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:beginTransaction",body:"*"}},{"(google.api.method_signature)":"database"}]},Commit:{requestType:"CommitRequest",responseType:"CommitResponse",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:commit","(google.api.http).body":"*","(google.api.method_signature)":"database,writes"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:commit",body:"*"}},{"(google.api.method_signature)":"database,writes"}]},Rollback:{requestType:"RollbackRequest",responseType:"google.protobuf.Empty",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:rollback","(google.api.http).body":"*","(google.api.method_signature)":"database,transaction"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:rollback",body:"*"}},{"(google.api.method_signature)":"database,transaction"}]},RunQuery:{requestType:"RunQueryRequest",responseType:"RunQueryResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:runQuery","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery","(google.api.http).additional_bindings.body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:runQuery",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery",body:"*"}}}]},ExecutePipeline:{requestType:"ExecutePipelineRequest",responseType:"ExecutePipelineResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:executePipeline","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:executePipeline",body:"*"}}]},RunAggregationQuery:{requestType:"RunAggregationQueryRequest",responseType:"RunAggregationQueryResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery","(google.api.http).additional_bindings.body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery",body:"*"}}}]},PartitionQuery:{requestType:"PartitionQueryRequest",responseType:"PartitionQueryResponse",options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:partitionQuery","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery","(google.api.http).additional_bindings.body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:partitionQuery",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery",body:"*"}}}]},Write:{requestType:"WriteRequest",requestStream:!0,responseType:"WriteResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:write","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:write",body:"*"}}]},Listen:{requestType:"ListenRequest",requestStream:!0,responseType:"ListenResponse",responseStream:!0,options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:listen","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:listen",body:"*"}}]},ListCollectionIds:{requestType:"ListCollectionIdsRequest",responseType:"ListCollectionIdsResponse",options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents}:listCollectionIds","(google.api.http).body":"*","(google.api.http).additional_bindings.post":"/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds","(google.api.http).additional_bindings.body":"*","(google.api.method_signature)":"parent"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents}:listCollectionIds",body:"*",additional_bindings:{post:"/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds",body:"*"}}},{"(google.api.method_signature)":"parent"}]},BatchWrite:{requestType:"BatchWriteRequest",responseType:"BatchWriteResponse",options:{"(google.api.http).post":"/v1/{database=projects/*/databases/*}/documents:batchWrite","(google.api.http).body":"*"},parsedOptions:[{"(google.api.http)":{post:"/v1/{database=projects/*/databases/*}/documents:batchWrite",body:"*"}}]},CreateDocument:{requestType:"CreateDocumentRequest",responseType:"Document",options:{"(google.api.http).post":"/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}","(google.api.http).body":"document"},parsedOptions:[{"(google.api.http)":{post:"/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}",body:"document"}}]}}},GetDocumentRequest:{oneofs:{consistencySelector:{oneof:["transaction","readTime"]}},fields:{name:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},mask:{type:"DocumentMask",id:2},transaction:{type:"bytes",id:3},readTime:{type:"google.protobuf.Timestamp",id:5}}},ListDocumentsRequest:{oneofs:{consistencySelector:{oneof:["transaction","readTime"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},collectionId:{type:"string",id:2,options:{"(google.api.field_behavior)":"REQUIRED"}},pageSize:{type:"int32",id:3},pageToken:{type:"string",id:4},orderBy:{type:"string",id:6},mask:{type:"DocumentMask",id:7},transaction:{type:"bytes",id:8},readTime:{type:"google.protobuf.Timestamp",id:10},showMissing:{type:"bool",id:12}}},ListDocumentsResponse:{fields:{documents:{rule:"repeated",type:"Document",id:1},nextPageToken:{type:"string",id:2}}},CreateDocumentRequest:{fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},collectionId:{type:"string",id:2,options:{"(google.api.field_behavior)":"REQUIRED"}},documentId:{type:"string",id:3},document:{type:"Document",id:4,options:{"(google.api.field_behavior)":"REQUIRED"}},mask:{type:"DocumentMask",id:5}}},UpdateDocumentRequest:{fields:{document:{type:"Document",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},updateMask:{type:"DocumentMask",id:2},mask:{type:"DocumentMask",id:3},currentDocument:{type:"Precondition",id:4}}},DeleteDocumentRequest:{fields:{name:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},currentDocument:{type:"Precondition",id:2}}},BatchGetDocumentsRequest:{oneofs:{consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},documents:{rule:"repeated",type:"string",id:2},mask:{type:"DocumentMask",id:3},transaction:{type:"bytes",id:4},newTransaction:{type:"TransactionOptions",id:5},readTime:{type:"google.protobuf.Timestamp",id:7}}},BatchGetDocumentsResponse:{oneofs:{result:{oneof:["found","missing"]}},fields:{found:{type:"Document",id:1},missing:{type:"string",id:2},transaction:{type:"bytes",id:3},readTime:{type:"google.protobuf.Timestamp",id:4}}},BeginTransactionRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},options:{type:"TransactionOptions",id:2}}},BeginTransactionResponse:{fields:{transaction:{type:"bytes",id:1}}},CommitRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},writes:{rule:"repeated",type:"Write",id:2},transaction:{type:"bytes",id:3}}},CommitResponse:{fields:{writeResults:{rule:"repeated",type:"WriteResult",id:1},commitTime:{type:"google.protobuf.Timestamp",id:2}}},RollbackRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},transaction:{type:"bytes",id:2,options:{"(google.api.field_behavior)":"REQUIRED"}}}},RunQueryRequest:{oneofs:{queryType:{oneof:["structuredQuery"]},consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredQuery:{type:"StructuredQuery",id:2},transaction:{type:"bytes",id:5},newTransaction:{type:"TransactionOptions",id:6},readTime:{type:"google.protobuf.Timestamp",id:7}}},RunQueryResponse:{fields:{transaction:{type:"bytes",id:2},document:{type:"Document",id:1},readTime:{type:"google.protobuf.Timestamp",id:3},skippedResults:{type:"int32",id:4}}},ExecutePipelineRequest:{oneofs:{pipelineType:{oneof:["structuredPipeline"]},consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredPipeline:{type:"StructuredPipeline",id:2},transaction:{type:"bytes",id:5},newTransaction:{type:"TransactionOptions",id:6},readTime:{type:"google.protobuf.Timestamp",id:7}}},ExecutePipelineResponse:{fields:{transaction:{type:"bytes",id:1},results:{rule:"repeated",type:"Document",id:2},executionTime:{type:"google.protobuf.Timestamp",id:3}}},RunAggregationQueryRequest:{oneofs:{queryType:{oneof:["structuredAggregationQuery"]},consistencySelector:{oneof:["transaction","newTransaction","readTime"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredAggregationQuery:{type:"StructuredAggregationQuery",id:2},transaction:{type:"bytes",id:4},newTransaction:{type:"TransactionOptions",id:5},readTime:{type:"google.protobuf.Timestamp",id:6}}},RunAggregationQueryResponse:{fields:{result:{type:"AggregationResult",id:1},transaction:{type:"bytes",id:2},readTime:{type:"google.protobuf.Timestamp",id:3}}},PartitionQueryRequest:{oneofs:{queryType:{oneof:["structuredQuery"]}},fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},structuredQuery:{type:"StructuredQuery",id:2},partitionCount:{type:"int64",id:3},pageToken:{type:"string",id:4},pageSize:{type:"int32",id:5}}},PartitionQueryResponse:{fields:{partitions:{rule:"repeated",type:"Cursor",id:1},nextPageToken:{type:"string",id:2}}},WriteRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},streamId:{type:"string",id:2},writes:{rule:"repeated",type:"Write",id:3},streamToken:{type:"bytes",id:4},labels:{keyType:"string",type:"string",id:5}}},WriteResponse:{fields:{streamId:{type:"string",id:1},streamToken:{type:"bytes",id:2},writeResults:{rule:"repeated",type:"WriteResult",id:3},commitTime:{type:"google.protobuf.Timestamp",id:4}}},ListenRequest:{oneofs:{targetChange:{oneof:["addTarget","removeTarget"]}},fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},addTarget:{type:"Target",id:2},removeTarget:{type:"int32",id:3},labels:{keyType:"string",type:"string",id:4}}},ListenResponse:{oneofs:{responseType:{oneof:["targetChange","documentChange","documentDelete","documentRemove","filter"]}},fields:{targetChange:{type:"TargetChange",id:2},documentChange:{type:"DocumentChange",id:3},documentDelete:{type:"DocumentDelete",id:4},documentRemove:{type:"DocumentRemove",id:6},filter:{type:"ExistenceFilter",id:5}}},Target:{oneofs:{targetType:{oneof:["query","documents"]},resumeType:{oneof:["resumeToken","readTime"]}},fields:{query:{type:"QueryTarget",id:2},documents:{type:"DocumentsTarget",id:3},resumeToken:{type:"bytes",id:4},readTime:{type:"google.protobuf.Timestamp",id:11},targetId:{type:"int32",id:5},once:{type:"bool",id:6},expectedCount:{type:"google.protobuf.Int32Value",id:12}},nested:{DocumentsTarget:{fields:{documents:{rule:"repeated",type:"string",id:2}}},QueryTarget:{oneofs:{queryType:{oneof:["structuredQuery"]}},fields:{parent:{type:"string",id:1},structuredQuery:{type:"StructuredQuery",id:2}}}}},TargetChange:{fields:{targetChangeType:{type:"TargetChangeType",id:1},targetIds:{rule:"repeated",type:"int32",id:2},cause:{type:"google.rpc.Status",id:3},resumeToken:{type:"bytes",id:4},readTime:{type:"google.protobuf.Timestamp",id:6}},nested:{TargetChangeType:{values:{NO_CHANGE:0,ADD:1,REMOVE:2,CURRENT:3,RESET:4}}}},ListCollectionIdsRequest:{fields:{parent:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},pageSize:{type:"int32",id:2},pageToken:{type:"string",id:3}}},ListCollectionIdsResponse:{fields:{collectionIds:{rule:"repeated",type:"string",id:1},nextPageToken:{type:"string",id:2}}},BatchWriteRequest:{fields:{database:{type:"string",id:1,options:{"(google.api.field_behavior)":"REQUIRED"}},writes:{rule:"repeated",type:"Write",id:2},labels:{keyType:"string",type:"string",id:3}}},BatchWriteResponse:{fields:{writeResults:{rule:"repeated",type:"WriteResult",id:1},status:{rule:"repeated",type:"google.rpc.Status",id:2}}},StructuredPipeline:{fields:{pipeline:{type:"Pipeline",id:1},options:{keyType:"string",type:"Value",id:2}}},StructuredQuery:{fields:{select:{type:"Projection",id:1},from:{rule:"repeated",type:"CollectionSelector",id:2},where:{type:"Filter",id:3},orderBy:{rule:"repeated",type:"Order",id:4},startAt:{type:"Cursor",id:7},endAt:{type:"Cursor",id:8},offset:{type:"int32",id:6},limit:{type:"google.protobuf.Int32Value",id:5}},nested:{CollectionSelector:{fields:{collectionId:{type:"string",id:2},allDescendants:{type:"bool",id:3}}},Filter:{oneofs:{filterType:{oneof:["compositeFilter","fieldFilter","unaryFilter"]}},fields:{compositeFilter:{type:"CompositeFilter",id:1},fieldFilter:{type:"FieldFilter",id:2},unaryFilter:{type:"UnaryFilter",id:3}}},CompositeFilter:{fields:{op:{type:"Operator",id:1},filters:{rule:"repeated",type:"Filter",id:2}},nested:{Operator:{values:{OPERATOR_UNSPECIFIED:0,AND:1,OR:2}}}},FieldFilter:{fields:{field:{type:"FieldReference",id:1},op:{type:"Operator",id:2},value:{type:"Value",id:3}},nested:{Operator:{values:{OPERATOR_UNSPECIFIED:0,LESS_THAN:1,LESS_THAN_OR_EQUAL:2,GREATER_THAN:3,GREATER_THAN_OR_EQUAL:4,EQUAL:5,NOT_EQUAL:6,ARRAY_CONTAINS:7,IN:8,ARRAY_CONTAINS_ANY:9,NOT_IN:10}}}},UnaryFilter:{oneofs:{operandType:{oneof:["field"]}},fields:{op:{type:"Operator",id:1},field:{type:"FieldReference",id:2}},nested:{Operator:{values:{OPERATOR_UNSPECIFIED:0,IS_NAN:2,IS_NULL:3,IS_NOT_NAN:4,IS_NOT_NULL:5}}}},Order:{fields:{field:{type:"FieldReference",id:1},direction:{type:"Direction",id:2}}},FieldReference:{fields:{fieldPath:{type:"string",id:2}}},Projection:{fields:{fields:{rule:"repeated",type:"FieldReference",id:2}}},Direction:{values:{DIRECTION_UNSPECIFIED:0,ASCENDING:1,DESCENDING:2}}}},StructuredAggregationQuery:{oneofs:{queryType:{oneof:["structuredQuery"]}},fields:{structuredQuery:{type:"StructuredQuery",id:1},aggregations:{rule:"repeated",type:"Aggregation",id:3}},nested:{Aggregation:{oneofs:{operator:{oneof:["count","sum","avg"]}},fields:{count:{type:"Count",id:1},sum:{type:"Sum",id:2},avg:{type:"Avg",id:3},alias:{type:"string",id:7}},nested:{Count:{fields:{upTo:{type:"google.protobuf.Int64Value",id:1}}},Sum:{fields:{field:{type:"StructuredQuery.FieldReference",id:1}}},Avg:{fields:{field:{type:"StructuredQuery.FieldReference",id:1}}}}}}},Cursor:{fields:{values:{rule:"repeated",type:"Value",id:1},before:{type:"bool",id:2}}},Write:{oneofs:{operation:{oneof:["update","delete","verify","transform"]}},fields:{update:{type:"Document",id:1},delete:{type:"string",id:2},verify:{type:"string",id:5},transform:{type:"DocumentTransform",id:6},updateMask:{type:"DocumentMask",id:3},updateTransforms:{rule:"repeated",type:"DocumentTransform.FieldTransform",id:7},currentDocument:{type:"Precondition",id:4}}},DocumentTransform:{fields:{document:{type:"string",id:1},fieldTransforms:{rule:"repeated",type:"FieldTransform",id:2}},nested:{FieldTransform:{oneofs:{transformType:{oneof:["setToServerValue","increment","maximum","minimum","appendMissingElements","removeAllFromArray"]}},fields:{fieldPath:{type:"string",id:1},setToServerValue:{type:"ServerValue",id:2},increment:{type:"Value",id:3},maximum:{type:"Value",id:4},minimum:{type:"Value",id:5},appendMissingElements:{type:"ArrayValue",id:6},removeAllFromArray:{type:"ArrayValue",id:7}},nested:{ServerValue:{values:{SERVER_VALUE_UNSPECIFIED:0,REQUEST_TIME:1}}}}}},WriteResult:{fields:{updateTime:{type:"google.protobuf.Timestamp",id:1},transformResults:{rule:"repeated",type:"Value",id:2}}},DocumentChange:{fields:{document:{type:"Document",id:1},targetIds:{rule:"repeated",type:"int32",id:5},removedTargetIds:{rule:"repeated",type:"int32",id:6}}},DocumentDelete:{fields:{document:{type:"string",id:1},removedTargetIds:{rule:"repeated",type:"int32",id:6},readTime:{type:"google.protobuf.Timestamp",id:4}}},DocumentRemove:{fields:{document:{type:"string",id:1},removedTargetIds:{rule:"repeated",type:"int32",id:2},readTime:{type:"google.protobuf.Timestamp",id:4}}},ExistenceFilter:{fields:{targetId:{type:"int32",id:1},count:{type:"int32",id:2},unchangedNames:{type:"BloomFilter",id:3}}},ExplainOptions:{fields:{analyze:{type:"bool",id:1,options:{"(google.api.field_behavior)":"OPTIONAL"}}}},ExplainMetrics:{fields:{planSummary:{type:"PlanSummary",id:1},executionStats:{type:"ExecutionStats",id:2}}},PlanSummary:{fields:{indexesUsed:{rule:"repeated",type:"google.protobuf.Struct",id:1}}},ExecutionStats:{fields:{resultsReturned:{type:"int64",id:1},executionDuration:{type:"google.protobuf.Duration",id:3},readOperations:{type:"int64",id:4},debugStats:{type:"google.protobuf.Struct",id:5}}}}}}},type:{options:{cc_enable_arenas:!0,go_package:"google.golang.org/genproto/googleapis/type/latlng;latlng",java_multiple_files:!0,java_outer_classname:"LatLngProto",java_package:"com.google.type",objc_class_prefix:"GTP"},nested:{LatLng:{fields:{latitude:{type:"double",id:1},longitude:{type:"double",id:2}}}}},api:{options:{go_package:"google.golang.org/genproto/googleapis/api;api",java_multiple_files:!0,java_outer_classname:"LaunchStageProto",java_package:"com.google.api",objc_class_prefix:"GAPI",cc_enable_arenas:!0},nested:{http:{type:"HttpRule",id:72295728,extend:"google.protobuf.MethodOptions"},Http:{fields:{rules:{rule:"repeated",type:"HttpRule",id:1},fullyDecodeReservedExpansion:{type:"bool",id:2}}},HttpRule:{oneofs:{pattern:{oneof:["get","put","post","delete","patch","custom"]}},fields:{selector:{type:"string",id:1},get:{type:"string",id:2},put:{type:"string",id:3},post:{type:"string",id:4},delete:{type:"string",id:5},patch:{type:"string",id:6},custom:{type:"CustomHttpPattern",id:8},body:{type:"string",id:7},responseBody:{type:"string",id:12},additionalBindings:{rule:"repeated",type:"HttpRule",id:11}}},CustomHttpPattern:{fields:{kind:{type:"string",id:1},path:{type:"string",id:2}}},methodSignature:{rule:"repeated",type:"string",id:1051,extend:"google.protobuf.MethodOptions"},defaultHost:{type:"string",id:1049,extend:"google.protobuf.ServiceOptions"},oauthScopes:{type:"string",id:1050,extend:"google.protobuf.ServiceOptions"},fieldBehavior:{rule:"repeated",type:"google.api.FieldBehavior",id:1052,extend:"google.protobuf.FieldOptions"},FieldBehavior:{values:{FIELD_BEHAVIOR_UNSPECIFIED:0,OPTIONAL:1,REQUIRED:2,OUTPUT_ONLY:3,INPUT_ONLY:4,IMMUTABLE:5,UNORDERED_LIST:6,NON_EMPTY_DEFAULT:7}},LaunchStage:{values:{LAUNCH_STAGE_UNSPECIFIED:0,UNIMPLEMENTED:6,PRELAUNCH:7,EARLY_ACCESS:1,ALPHA:2,BETA:3,GA:4,DEPRECATED:5}}}},rpc:{options:{cc_enable_arenas:!0,go_package:"google.golang.org/genproto/googleapis/rpc/status;status",java_multiple_files:!0,java_outer_classname:"StatusProto",java_package:"com.google.rpc",objc_class_prefix:"RPC"},nested:{Status:{fields:{code:{type:"int32",id:1},message:{type:"string",id:2},details:{rule:"repeated",type:"google.protobuf.Any",id:3}}}}}}}};var cu={nested:ou},uu=Object.freeze({__proto__:null,nested:ou,default:cu});
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
 */const lu={longs:String,enums:String,defaults:!0,oneofs:!1};
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
 */function du(e){const t=function(){const e=c.fromJSON(uu,lu);return o.loadPackageDefinition(e)}();return new au(t,e)}
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
 */function hu(){return"YES"===process.env.USE_MOCK_PERSISTENCE?window:null}
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
 */function pu(e){return new Pi(e,!1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t,n=1e3,r=1.5,s=6e4){this.queue=e,this.timerId=t,this.initialDelayMs=n,this.backoffFactor=r,this.maxDelayMs=s,this.currentBaseMs=0,this.timerPromise=null,this.lastAttemptTime=Date.now(),this.reset()}reset(){this.currentBaseMs=0}resetToMax(){this.currentBaseMs=this.maxDelayMs}backoffAndRun(e){this.cancel();const t=Math.floor(this.currentBaseMs+this.jitterDelayMs()),n=Math.max(0,Date.now()-this.lastAttemptTime),r=Math.max(0,t-n);r>0&&g("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.currentBaseMs} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.timerPromise=this.queue.enqueueAfterDelay(this.timerId,r,()=>(this.lastAttemptTime=Date.now(),e())),this.currentBaseMs*=this.backoffFactor,this.currentBaseMs<this.initialDelayMs&&(this.currentBaseMs=this.initialDelayMs),this.currentBaseMs>this.maxDelayMs&&(this.currentBaseMs=this.maxDelayMs)}skipBackoff(){null!==this.timerPromise&&(this.timerPromise.skipDelay(),this.timerPromise=null)}cancel(){null!==this.timerPromise&&(this.timerPromise.cancel(),this.timerPromise=null)}jitterDelayMs(){return(Math.random()-.5)*this.currentBaseMs}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="PersistentStream";class fu{constructor(e,t,n,r,s,i,a,o){this.queue=e,this.idleTimerId=n,this.healthTimerId=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.closeCount=0,this.idleTimer=null,this.healthCheck=null,this.stream=null,this.responseCount=0,this.backoff=new mu(e,t)}isStarted(){return 1===this.state||5===this.state||this.isOpen()}isOpen(){return 2===this.state||3===this.state}start(){this.responseCount=0,4!==this.state?this.auth():this.performBackoff()}async stop(){this.isStarted()&&await this.close(0)}inhibitBackoff(){this.state=0,this.backoff.reset()}markIdle(){this.isOpen()&&null===this.idleTimer&&(this.idleTimer=this.queue.enqueueAfterDelay(this.idleTimerId,6e4,()=>this.handleIdleCloseTimer()))}sendRequest(e){this.cancelIdleCheck(),this.stream.send(e)}async handleIdleCloseTimer(){if(this.isOpen())return this.close(0)}cancelIdleCheck(){this.idleTimer&&(this.idleTimer.cancel(),this.idleTimer=null)}cancelHealthCheck(){this.healthCheck&&(this.healthCheck.cancel(),this.healthCheck=null)}async close(e,t){this.cancelIdleCheck(),this.cancelHealthCheck(),this.backoff.cancel(),this.closeCount++,4!==e?this.backoff.reset():t&&t.code===E.RESOURCE_EXHAUSTED?(f(t.toString()),f("Using maximum backoff delay to prevent overloading the backend."),this.backoff.resetToMax()):t&&t.code===E.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.tearDown(),this.stream.close(),this.stream=null),this.state=e,await this.listener.onClose(t)}tearDown(){}auth(){this.state=1;const e=this.getCloseGuardedDispatcher(this.closeCount),t=this.closeCount;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.closeCount===t&&this.startStream(e,n)},t=>{e(()=>{const e=new C(E.UNKNOWN,"Fetching auth token failed: "+t.message);return this.handleStreamClose(e)})})}startStream(e,t){const n=this.getCloseGuardedDispatcher(this.closeCount);this.stream=this.startRpc(e,t),this.stream.onConnected(()=>{n(()=>this.listener.onConnected())}),this.stream.onOpen(()=>{n(()=>(this.state=2,this.healthCheck=this.queue.enqueueAfterDelay(this.healthTimerId,1e4,()=>(this.isOpen()&&(this.state=3),Promise.resolve())),this.listener.onOpen()))}),this.stream.onClose(e=>{n(()=>this.handleStreamClose(e))}),this.stream.onMessage(e=>{n(()=>1===++this.responseCount?this.onFirst(e):this.onNext(e))})}performBackoff(){this.state=5,this.backoff.backoffAndRun(async()=>{this.state=0,this.start()})}handleStreamClose(e){return g(gu,`close with error: ${e}`),this.stream=null,this.close(4,e)}getCloseGuardedDispatcher(e){return t=>{this.queue.enqueueAndForget(()=>this.closeCount===e?t():(g(gu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class yu extends fu{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}startRpc(e,t){return this.connection.openStream("Listen",e,t)}onFirst(e){return this.onNext(e)}onNext(e){this.backoff.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:b(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(e,t){return e.useProto3Json?(v(void 0===t||"string"==typeof t,58123),mn.fromBase64String(t||"")):(v(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),mn.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,o=a&&function(e){const t=void 0===e.code?E.UNKNOWN:hi(e.code);return new C(t,e.message||"")}(a);n=new Di(r,s,i,o||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Gi(e,r.document.name),i=qi(r.document.updateTime),a=r.document.createTime?qi(r.document.createTime):de.min(),o=new dr({mapValue:{fields:r.document.fields}}),c=pr.newFoundDocument(s,i,a,o),u=r.targetIds||[],l=r.removedTargetIds||[];n=new Ei(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Gi(e,r.document),i=r.readTime?qi(r.readTime):de.min(),a=pr.newNoDocument(s,i),o=r.removedTargetIds||[];n=new Ei([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Gi(e,r.document),i=r.removedTargetIds||[];n=new Ei([],i,s,null)}else{if(!("filter"in t))return b(11601,{change:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new ui(r,s),a=e.targetId;n=new Ci(a,i)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return de.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?de.min():t.readTime?qi(t.readTime):de.min()}(e);return this.listener.onWatchChange(t,n)}watch(e){const t={};t.database=Wi(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=zr(r)?{documents:ta(e,r)}:{query:na(e,r).queryTarget},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Bi(e,t.resumeToken);const r=Vi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(de.min())>0){n.readTime=Fi(e,t.snapshotVersion.toTimestamp());const r=Vi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return b(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.sendRequest(t)}unwatch(e){const t={};t.database=Wi(this.serializer),t.removeTarget=e,this.sendRequest(t)}}class wu extends fu{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get handshakeComplete(){return this.responseCount>0}start(){this.lastStreamToken=void 0,super.start()}tearDown(){this.handshakeComplete&&this.writeMutations([])}startRpc(e,t){return this.connection.openStream("Write",e,t)}onFirst(e){return v(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,v(!e.writeResults||0===e.writeResults.length,55816),this.listener.onHandshakeComplete()}onNext(e){v(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.backoff.reset();const t=function(e,t){return e&&e.length>0?(v(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?qi(e.updateTime):qi(t);return n.isEqual(de.min())&&(n=qi(t)),new Qs(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=qi(e.commitTime);return this.listener.onMutationResult(n,t)}writeHandshake(){const e={};e.database=Wi(this.serializer),this.sendRequest(e)}writeMutations(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Zi(this.serializer,e))};this.sendRequest(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{}class Tu extends bu{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.terminated=!1}verifyInitialized(){if(this.terminated)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.")}invokeRPC(e,t,n,r){return this.verifyInitialized(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.invokeRPC(e,zi(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new C(E.UNKNOWN,e.toString())})}invokeStreamingRPC(e,t,n,r,s){return this.verifyInitialized(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.invokeStreamingRPC(e,zi(t,n),r,i,a,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new C(E.UNKNOWN,e.toString())})}terminate(){this.terminated=!0,this.connection.terminate()}}function vu(e,t,n,r){return new Tu(e,t,n,r)}class Su{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.watchStreamFailures=0,this.onlineStateTimer=null,this.shouldWarnClientIsOffline=!0}handleWatchStreamStart(){0===this.watchStreamFailures&&(this.setAndBroadcast("Unknown"),this.onlineStateTimer=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.onlineStateTimer=null,this.logClientOfflineWarningIfNecessary("Backend didn't respond within 10 seconds."),this.setAndBroadcast("Offline"),Promise.resolve())))}handleWatchStreamFailure(e){"Online"===this.state?this.setAndBroadcast("Unknown"):(this.watchStreamFailures++,this.watchStreamFailures>=1&&(this.clearOnlineStateTimer(),this.logClientOfflineWarningIfNecessary(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.setAndBroadcast("Offline")))}set(e){this.clearOnlineStateTimer(),this.watchStreamFailures=0,"Online"===e&&(this.shouldWarnClientIsOffline=!1),this.setAndBroadcast(e)}setAndBroadcast(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}logClientOfflineWarningIfNecessary(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.shouldWarnClientIsOffline?(f(t),this.shouldWarnClientIsOffline=!1):g("OnlineStateTracker",t)}clearOnlineStateTimer(){null!==this.onlineStateTimer&&(this.onlineStateTimer.cancel(),this.onlineStateTimer=null
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}}const Iu="RemoteStore",Eu=10;class Cu{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.writePipeline=[],this.listenTargets=new Map,this.offlineCauses=new Set,this.onNetworkStatusChange=[],this.connectivityMonitor=s,this.connectivityMonitor.addCallback(e=>{n.enqueueAndForget(async()=>{Pu(this)&&(g(Iu,"Restarting streams for network reachability change."),await async function(e){const t=I(e);t.offlineCauses.add(4),await xu(t),t.onlineStateTracker.set("Unknown"),t.offlineCauses.delete(4),await Du(t)}(this))})}),this.onlineStateTracker=new Su(n,r)}}async function Du(e){if(Pu(e))for(const t of e.onNetworkStatusChange)await t(!0)}async function xu(e){for(const t of e.onNetworkStatusChange)await t(!1)}function ku(e,t){const n=I(e);n.listenTargets.has(t.targetId)||(n.listenTargets.set(t.targetId,t),Ou(n)?Ru(n):Zu(n).isOpen()&&_u(n,t))}function Au(e,t){const n=I(e),r=Zu(n);n.listenTargets.delete(t),r.isOpen()&&Nu(n,t),0===n.listenTargets.size&&(r.isOpen()?r.markIdle():Pu(n)&&n.onlineStateTracker.set("Unknown"))}function _u(e,t){if(e.watchChangeAggregator.recordPendingTargetRequest(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(de.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Zu(e).watch(t)}function Nu(e,t){e.watchChangeAggregator.recordPendingTargetRequest(t),Zu(e).unwatch(t)}function Ru(e){e.watchChangeAggregator=new ki({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),getTargetDataForTarget:t=>e.listenTargets.get(t)||null,getDatabaseId:()=>e.datastore.serializer.databaseId}),Zu(e).start(),e.onlineStateTracker.handleWatchStreamStart()}function Ou(e){return Pu(e)&&!Zu(e).isStarted()&&e.listenTargets.size>0}function Pu(e){return 0===I(e).offlineCauses.size}function Vu(e){e.watchChangeAggregator=void 0}async function Fu(e){e.onlineStateTracker.set("Online")}async function Mu(e){e.listenTargets.forEach((t,n)=>{_u(e,t)})}async function Bu(e,t){Vu(e),Ou(e)?(e.onlineStateTracker.handleWatchStreamFailure(t),Ru(e)):e.onlineStateTracker.set("Unknown")}async function Lu(e,t,n){if(e.onlineStateTracker.set("Online"),t instanceof Di&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.listenTargets.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.listenTargets.delete(r),e.watchChangeAggregator.removeTarget(r))}(e,t)}catch(n){g(Iu,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await qu(e,n)}else if(t instanceof Ei?e.watchChangeAggregator.handleDocumentChange(t):t instanceof Ci?e.watchChangeAggregator.handleExistenceFilter(t):e.watchChangeAggregator.handleTargetChange(t),!n.isEqual(de.min()))try{const t=await xc(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.watchChangeAggregator.createRemoteEvent(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.listenTargets.get(r);s&&e.listenTargets.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.listenTargets.get(t);if(!r)return;e.listenTargets.set(t,r.withResumeToken(mn.EMPTY_BYTE_STRING,r.snapshotVersion)),Nu(e,t);const s=new wa(r.target,t,n,r.sequenceNumber);_u(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){g(Iu,"Failed to raise snapshot:",t),await qu(e,t)}}async function qu(e,t,n){if(!Pe(t))throw t;e.offlineCauses.add(1),await xu(e),e.onlineStateTracker.set("Offline"),n||(n=()=>xc(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{g(Iu,"Retrying IndexedDB access"),await n(),e.offlineCauses.delete(1),await Du(e)})}function Uu(e,t){return t().catch(n=>qu(e,n,t))}async function zu(e){const t=I(e),n=el(t);let r=t.writePipeline.length>0?t.writePipeline[t.writePipeline.length-1].batchId:_n;for(;Ku(t);)try{const e=await Ac(t.localStore,r);if(null===e){0===t.writePipeline.length&&n.markIdle();break}r=e.batchId,Qu(t,e)}catch(e){await qu(t,e)}Gu(t)&&ju(t)}function Ku(e){return Pu(e)&&e.writePipeline.length<Eu}function Qu(e,t){e.writePipeline.push(t);const n=el(e);n.isOpen()&&n.handshakeComplete&&n.writeMutations(t.mutations)}function Gu(e){return Pu(e)&&!el(e).isStarted()&&e.writePipeline.length>0}function ju(e){el(e).start()}async function $u(e){el(e).writeHandshake()}async function Wu(e){const t=el(e);for(const n of e.writePipeline)t.writeMutations(n.mutations)}async function Hu(e,t,n){const r=e.writePipeline.shift(),s=oi.from(r,t,n);await Uu(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await zu(e)}async function Yu(e,t){t&&el(e).handshakeComplete&&await async function(e,t){if(di(n=t.code)&&n!==E.ABORTED){const n=e.writePipeline.shift();el(e).inhibitBackoff(),await Uu(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await zu(e)}var n}(e,t),Gu(e)&&ju(e)}async function Ju(e,t){const n=I(e);n.asyncQueue.verifyOperationInProgress(),g(Iu,"RemoteStore received new credentials");const r=Pu(n);n.offlineCauses.add(3),await xu(n),r&&n.onlineStateTracker.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.offlineCauses.delete(3),await Du(n)}async function Xu(e,t){const n=I(e);t?(n.offlineCauses.delete(2),await Du(n)):t||(n.offlineCauses.add(2),await xu(n),n.onlineStateTracker.set("Unknown"))}function Zu(e){return e.watchStream||(e.watchStream=function(e,t,n){const r=I(e);return r.verifyInitialized(),new yu(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}
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
 */(e.datastore,e.asyncQueue,{onConnected:Fu.bind(null,e),onOpen:Mu.bind(null,e),onClose:Bu.bind(null,e),onWatchChange:Lu.bind(null,e)}),e.onNetworkStatusChange.push(async t=>{t?(e.watchStream.inhibitBackoff(),Ou(e)?Ru(e):e.onlineStateTracker.set("Unknown")):(await e.watchStream.stop(),Vu(e))})),e.watchStream}function el(e){return e.writeStream||(e.writeStream=function(e,t,n){const r=I(e);return r.verifyInitialized(),new wu(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{onConnected:()=>Promise.resolve(),onOpen:$u.bind(null,e),onClose:Yu.bind(null,e),onHandshakeComplete:Wu.bind(null,e),onMutationResult:Hu.bind(null,e)}),e.onNetworkStatusChange.push(async t=>{t?(e.writeStream.inhibitBackoff(),await zu(e)):(await e.writeStream.stop(),e.writePipeline.length>0&&(g(Iu,`Stopping write stream with ${e.writePipeline.length} pending writes`),e.writePipeline=[]))})),e.writeStream}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl="AsyncQueue";class nl{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new D,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,a=new nl(e,t,i,r,s);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new C(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function rl(e,t){if(f(tl,`${t}: ${e}`),Pe(e))return new C(E.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{static emptySet(e){return new sl(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||J.comparator(t.key,n.key):(e,t)=>J.comparator(e.key,t.key),this.keyedMap=ws(),this.sortedSet=new an(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof sl))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new sl;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}}class il{constructor(){this.changeMap=new an(J.comparator)}track(e){const t=e.doc.key,n=this.changeMap.get(t);n?0!==e.type&&3===n.type?this.changeMap=this.changeMap.insert(t,e):3===e.type&&1!==n.type?this.changeMap=this.changeMap.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.changeMap=this.changeMap.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.changeMap=this.changeMap.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.changeMap=this.changeMap.remove(t):1===e.type&&2===n.type?this.changeMap=this.changeMap.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.changeMap=this.changeMap.insert(t,{type:2,doc:e.doc}):b(63341,{change:e,oldChange:n}):this.changeMap=this.changeMap.insert(t,e)}getChanges(){const e=[];return this.changeMap.inorderTraversal((t,n)=>{e.push(n)}),e}}class al{constructor(e,t,n,r,s,i,a,o,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new al(e,t,sl.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&os(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(){this.viewSnap=void 0,this.listeners=[]}hasRemoteListeners(){return this.listeners.some(e=>e.listensToRemoteStore())}}class cl{constructor(){this.queries=ul(),this.onlineState="Unknown",this.snapshotsInSyncListeners=new Set}terminate(){!function(e,t){const n=I(e),r=n.queries;n.queries=ul(),r.forEach((e,n)=>{for(const e of n.listeners)e.onError(t)})}(this,new C(E.ABORTED,"Firestore shutting down"))}}function ul(){return new ms(e=>cs(e),os)}async function ll(e,t){const n=I(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.hasRemoteListeners()&&t.listensToRemoteStore()&&(r=2):(i=new ol,r=t.listensToRemoteStore()?0:1);try{switch(r){case 0:i.viewSnap=await n.onListen(s,!0);break;case 1:i.viewSnap=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(e){const n=rl(e,`Initialization of query '${us(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,i),i.listeners.push(t),t.applyOnlineStateChange(n.onlineState),i.viewSnap&&t.onViewSnapshot(i.viewSnap)&&ml(n)}async function dl(e,t){const n=I(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.listeners.indexOf(t);e>=0&&(i.listeners.splice(e,1),0===i.listeners.length?s=t.listensToRemoteStore()?0:1:!i.hasRemoteListeners()&&t.listensToRemoteStore()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function hl(e,t){const n=I(e);let r=!1;for(const e of t){const t=e.query,s=n.queries.get(t);if(s){for(const t of s.listeners)t.onViewSnapshot(e)&&(r=!0);s.viewSnap=e}}r&&ml(n)}function pl(e,t,n){const r=I(e),s=r.queries.get(t);if(s)for(const e of s.listeners)e.onError(n);r.queries.delete(t)}function ml(e){e.snapshotsInSyncListeners.forEach(e=>{e.next()})}var gl;!function(e){e.Default="default",e.Cache="cache"}(gl||(gl={}));class fl{constructor(e,t,n){this.query=e,this.queryObserver=t,this.raisedInitialEvent=!1,this.snap=null,this.onlineState="Unknown",this.options=n||{}}onViewSnapshot(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new al(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.raisedInitialEvent?this.shouldRaiseEvent(e)&&(this.queryObserver.next(e),t=!0):this.shouldRaiseInitialEvent(e,this.onlineState)&&(this.raiseInitialEvent(e),t=!0),this.snap=e,t}onError(e){this.queryObserver.error(e)}applyOnlineStateChange(e){this.onlineState=e;let t=!1;return this.snap&&!this.raisedInitialEvent&&this.shouldRaiseInitialEvent(this.snap,e)&&(this.raiseInitialEvent(this.snap),t=!0),t}shouldRaiseInitialEvent(e,t){if(!e.fromCache)return!0;if(!this.listensToRemoteStore())return!0;const n="Offline"!==t;return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}shouldRaiseEvent(e){if(e.docChanges.length>0)return!0;const t=this.snap&&this.snap.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}raiseInitialEvent(e){e=al.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.raisedInitialEvent=!0,this.queryObserver.next(e)}listensToRemoteStore(){return this.options.source!==gl.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.addedKeys=n,this.removedKeys=r}static fromSnapshot(e,t){let n=Cs(),r=Cs();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new yl(e,t.fromCache,n,r)}}
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
 */class wl{constructor(e){this.serializer=e}toDocumentKey(e){return Gi(this.serializer,e)}toMutableDocument(e){return e.metadata.exists?Xi(this.serializer,e.document,!1):pr.newNoDocument(this.toDocumentKey(e.metadata.name),this.toSnapshotVersion(e.metadata.readTime))}toSnapshotVersion(e){return qi(e)}}class bl{constructor(e,t){this.bundleMetadata=e,this.serializer=t,this._queries=[],this._documents=[],this.collectionGroups=new Set,this.progress=Tl(e)}get queries(){return this._queries}get documents(){return this._documents}addSizedElement(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.payload.namedQuery)this._queries.push(e.payload.namedQuery);else if(e.payload.documentMetadata){this._documents.push({metadata:e.payload.documentMetadata}),e.payload.documentMetadata.exists||++t;const n=W.fromString(e.payload.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.payload.document&&(this._documents[this._documents.length-1].document=e.payload.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}getQueryDocumentMapping(e){const t=new Map,n=new wl(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.toDocumentKey(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||Cs()).add(e);t.set(n,r)}}return t}async completeAndStoreAsync(e){const t=await async function(e,t,n,r){const s=I(e);let i=Cs(),a=fs();for(const e of n){const n=t.toDocumentKey(e.metadata.name);e.document&&(i=i.add(n));const r=t.toMutableDocument(e);r.setReadTime(t.toSnapshotVersion(e.metadata.readTime)),a=a.insert(n,r)}const o=s.remoteDocuments.newChangeBuffer({trackRemovals:!0}),c=await _c(s,function(e){return Zr(Wr(W.fromString(`__bundle__/docs/${e}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",e=>kc(e,o,a).next(t=>(o.apply(e),t)).next(t=>s.targetCache.removeMatchingKeysForTargetId(e,c.targetId).next(()=>s.targetCache.addMatchingKeys(e,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(e,t.changedDocuments,t.existenceChangedKeys)).next(()=>t.changedDocuments)))}(e,new wl(this.serializer),this._documents,this.bundleMetadata.id),n=this.getQueryDocumentMapping(this.documents);for(const t of this._queries)await Fc(e,t,n.get(t.name));return this.progress.taskState="Success",{progress:this.progress,changedCollectionGroups:this.collectionGroups,changedDocs:t}}}function Tl(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e){this.key=e}}class Sl{constructor(e){this.key=e}}class Il{constructor(e,t){this.query=e,this._syncedDocuments=t,this.syncState=null,this.hasCachedResults=!1,this.current=!1,this.limboDocuments=Cs(),this.mutatedKeys=Cs(),this.docComparator=hs(e),this.documentSet=new sl(this.docComparator)}get syncedDocuments(){return this._syncedDocuments}computeDocChanges(e,t){const n=t?t.changeSet:new il,r=t?t.documentSet:this.documentSet;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,a=!1;const o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),l=ls(this.query,t)?t:null,d=!!u&&this.mutatedKeys.has(u.key),h=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let p=!1;u&&l?u.data.isEqual(l.data)?d!==h&&(n.track({type:3,doc:l}),p=!0):this.shouldWaitForSyncedDocument(u,l)||(n.track({type:2,doc:l}),p=!0,(o&&this.docComparator(l,o)>0||c&&this.docComparator(l,c)<0)&&(a=!0)):!u&&l?(n.track({type:0,doc:l}),p=!0):u&&!l&&(n.track({type:1,doc:u}),p=!0,(o||c)&&(a=!0)),p&&(l?(i=i.add(l),s=h?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{documentSet:i,changeSet:n,needsRefill:a,mutatedKeys:s}}shouldWaitForSyncedDocument(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.documentSet;this.documentSet=e.documentSet,this.mutatedKeys=e.mutatedKeys;const i=e.changeSet.getChanges();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return b(20277,{change:e})}};return n(e)-n(t)}
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
 */(e.type,t.type)||this.docComparator(e.doc,t.doc)),this.applyTargetChange(n),r=r??!1;const a=t&&!r?this.updateLimboDocuments():[],o=0===this.limboDocuments.size&&this.current&&!r?1:0,c=o!==this.syncState;return this.syncState=o,0!==i.length||c?{snapshot:new al(this.query,e.documentSet,s,i,e.mutatedKeys,0===o,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),limboChanges:a}:{limboChanges:a}}applyOnlineStateChange(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({documentSet:this.documentSet,changeSet:new il,mutatedKeys:this.mutatedKeys,needsRefill:!1},!1)):{limboChanges:[]}}shouldBeInLimbo(e){return!this._syncedDocuments.has(e)&&!!this.documentSet.has(e)&&!this.documentSet.get(e).hasLocalMutations}applyTargetChange(e){e&&(e.addedDocuments.forEach(e=>this._syncedDocuments=this._syncedDocuments.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this._syncedDocuments=this._syncedDocuments.delete(e)),this.current=e.current)}updateLimboDocuments(){if(!this.current)return[];const e=this.limboDocuments;this.limboDocuments=Cs(),this.documentSet.forEach(e=>{this.shouldBeInLimbo(e.key)&&(this.limboDocuments=this.limboDocuments.add(e.key))});const t=[];return e.forEach(e=>{this.limboDocuments.has(e)||t.push(new Sl(e))}),this.limboDocuments.forEach(n=>{e.has(n)||t.push(new vl(n))}),t}synchronizeWithPersistedState(e){this._syncedDocuments=e.remoteKeys,this.limboDocuments=Cs();const t=this.computeDocChanges(e.documents);return this.applyChanges(t,!0)}computeInitialSnapshot(){return al.fromInitialDocuments(this.query,this.documentSet,this.mutatedKeys,0===this.syncState,this.hasCachedResults)}}const El="SyncEngine";class Cl{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Dl{constructor(e){this.key=e,this.receivedDocument=!1}}class xl{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.syncEngineListener={},this.queryViewsByQuery=new ms(e=>cs(e),os),this.queriesByTarget=new Map,this.enqueuedLimboResolutions=new Set,this.activeLimboTargetsByKey=new an(J.comparator),this.activeLimboResolutionsByTarget=new Map,this.limboDocumentRefs=new tc,this.mutationUserCallbacks={},this.pendingWritesCallbacks=new Map,this.limboTargetIdGenerator=Eo.forSyncEngine(),this.onlineState="Unknown",this._isPrimaryClient=void 0}get isPrimaryClient(){return!0===this._isPrimaryClient}}async function kl(e,t,n=!0){const r=rd(e);let s;const i=r.queryViewsByQuery.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.computeInitialSnapshot()):s=await _l(r,t,n,!0),s}async function Al(e,t){const n=rd(e);await _l(n,t,!0,!1)}async function _l(e,t,n,r){const s=await _c(e.localStore,Zr(t)),i=s.targetId,a=e.sharedClientState.addLocalQueryTarget(i,n);let o;return r&&(o=await Nl(e,t,i,"current"===a,s.resumeToken)),e.isPrimaryClient&&n&&ku(e.remoteStore,s),o}async function Nl(e,t,n,r,s){e.applyDocChanges=(t,n,r)=>async function(e,t,n,r){let s=t.view.computeDocChanges(n);s.needsRefill&&(s=await Rc(e.localStore,t.query,!1).then(({documents:e})=>t.view.computeDocChanges(e,s)));const i=r&&r.targetChanges.get(t.targetId),a=r&&null!=r.targetMismatches.get(t.targetId),o=t.view.applyChanges(s,e.isPrimaryClient,i,a);return Kl(e,t.targetId,o.limboChanges),o.snapshot}(e,t,n,r);const i=await Rc(e.localStore,t,!0),a=new Il(t,i.remoteKeys),o=a.computeDocChanges(i.documents),c=Ii.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),u=a.applyChanges(o,e.isPrimaryClient,c);Kl(e,n,u.limboChanges);const l=new Cl(t,n,a);return e.queryViewsByQuery.set(t,l),e.queriesByTarget.has(n)?e.queriesByTarget.get(n).push(t):e.queriesByTarget.set(n,[t]),u.snapshot}async function Rl(e,t,n){const r=I(e),s=r.queryViewsByQuery.get(t),i=r.queriesByTarget.get(s.targetId);if(i.length>1)return r.queriesByTarget.set(s.targetId,i.filter(e=>!os(e,t))),void r.queryViewsByQuery.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Nc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Au(r.remoteStore,s.targetId),Ul(r,s.targetId)}).catch(De)):(Ul(r,s.targetId),await Nc(r.localStore,s.targetId,!0))}async function Ol(e,t){const n=I(e),r=n.queryViewsByQuery.get(t),s=n.queriesByTarget.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Au(n.remoteStore,r.targetId))}async function Pl(e,t){const n=I(e);try{const e=await function(e,t){const n=I(e),r=t.snapshotVersion;let s=n.targetDataByTarget;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.remoteDocuments.newChangeBuffer({trackRemovals:!0});s=n.targetDataByTarget;const a=[];t.targetChanges.forEach((i,o)=>{const c=s.get(o);if(!c)return;a.push(n.targetCache.removeMatchingKeys(e,i.removedDocuments,o).next(()=>n.targetCache.addMatchingKeys(e,i.addedDocuments,o)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(o)?u=u.withResumeToken(mn.EMPTY_BYTE_STRING,de.min()).withLastLimboFreeSnapshotVersion(de.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(o,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=Ic||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,u,i)&&a.push(n.targetCache.updateTargetData(e,u))});let o=fs(),c=Cs();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),a.push(kc(e,i,t.documentUpdates).next(e=>{o=e.changedDocuments,c=e.existenceChangedKeys})),!r.isEqual(de.min())){const t=n.targetCache.getLastRemoteSnapshotVersion(e).next(t=>n.targetCache.setTargetsMetadata(e,e.currentSequenceNumber,r));a.push(t)}return xe.waitFor(a).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,o,c)).next(()=>o)}).then(e=>(n.targetDataByTarget=s,e))}(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.activeLimboResolutionsByTarget.get(t);r&&(v(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.receivedDocument=!0:e.modifiedDocuments.size>0?v(r.receivedDocument,14607):e.removedDocuments.size>0&&(v(r.receivedDocument,42227),r.receivedDocument=!1))}),await jl(n,e,t)}catch(e){await De(e)}}function Vl(e,t,n){const r=I(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.queryViewsByQuery.forEach((n,r)=>{const s=r.view.applyOnlineStateChange(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=I(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const e of n.listeners)e.applyOnlineStateChange(t)&&(r=!0)}),r&&ml(n)}(r.eventManager,t),e.length&&r.syncEngineListener.onWatchChange(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Fl(e,t,n){const r=I(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.activeLimboResolutionsByTarget.get(t),i=s&&s.key;if(i){let e=new an(J.comparator);e=e.insert(i,pr.newNoDocument(i,de.min()));const n=Cs().add(i),s=new Si(de.min(),new Map,new an(B),e,n);await Pl(r,s),r.activeLimboTargetsByKey=r.activeLimboTargetsByKey.remove(i),r.activeLimboResolutionsByTarget.delete(t),Gl(r)}else await Nc(r.localStore,t,!1).then(()=>Ul(r,t,n)).catch(De)}async function Ml(e,t){const n=I(e),r=t.batch.batchId;try{const e=await function(e,t){const n=I(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.remoteDocuments.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let a=xe.resolve();return i.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);v(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Cs();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);ql(n,r,null),Ll(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await jl(n,e)}catch(e){await De(e)}}async function Bl(e,t,n){const r=I(e);try{const e=await function(e,t){const n=I(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(v(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);ql(r,t,n),Ll(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await jl(r,e)}catch(n){await De(n)}}function Ll(e,t){(e.pendingWritesCallbacks.get(t)||[]).forEach(e=>{e.resolve()}),e.pendingWritesCallbacks.delete(t)}function ql(e,t,n){const r=I(e);let s=r.mutationUserCallbacks[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.mutationUserCallbacks[r.currentUser.toKey()]=s}}function Ul(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.queriesByTarget.get(t))e.queryViewsByQuery.delete(r),n&&e.syncEngineListener.onWatchError(r,n);e.queriesByTarget.delete(t),e.isPrimaryClient&&e.limboDocumentRefs.removeReferencesForId(t).forEach(t=>{e.limboDocumentRefs.containsKey(t)||zl(e,t)})}function zl(e,t){e.enqueuedLimboResolutions.delete(t.path.canonicalString());const n=e.activeLimboTargetsByKey.get(t);null!==n&&(Au(e.remoteStore,n),e.activeLimboTargetsByKey=e.activeLimboTargetsByKey.remove(t),e.activeLimboResolutionsByTarget.delete(n),Gl(e))}function Kl(e,t,n){for(const r of n)r instanceof vl?(e.limboDocumentRefs.addReference(r.key,t),Ql(e,r)):r instanceof Sl?(g(El,"Document no longer in limbo: "+r.key),e.limboDocumentRefs.removeReference(r.key,t),e.limboDocumentRefs.containsKey(r.key)||zl(e,r.key)):b(19791,{limboChange:r})}function Ql(e,t){const n=t.key,r=n.path.canonicalString();e.activeLimboTargetsByKey.get(n)||e.enqueuedLimboResolutions.has(r)||(g(El,"New document in limbo: "+n),e.enqueuedLimboResolutions.add(r),Gl(e))}function Gl(e){for(;e.enqueuedLimboResolutions.size>0&&e.activeLimboTargetsByKey.size<e.maxConcurrentLimboResolutions;){const t=e.enqueuedLimboResolutions.values().next().value;e.enqueuedLimboResolutions.delete(t);const n=new J(W.fromString(t)),r=e.limboTargetIdGenerator.next();e.activeLimboResolutionsByTarget.set(r,new Dl(n)),e.activeLimboTargetsByKey=e.activeLimboTargetsByKey.insert(n,r),ku(e.remoteStore,new wa(Zr(Wr(n.path)),r,"TargetPurposeLimboResolution",ze.INVALID))}}async function jl(e,t,n){const r=I(e),s=[],i=[],a=[];r.queryViewsByQuery.isEmpty()||(r.queryViewsByQuery.forEach((e,o)=>{a.push(r.applyDocChanges(o,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(o.targetId)?.current;r.sharedClientState.updateQueryState(o.targetId,t?"current":"not-current")}if(e){s.push(e);const t=yl.fromSnapshot(o.targetId,e);i.push(t)}}))}),await Promise.all(a),r.syncEngineListener.onWatchChange(s),await async function(e,t){const n=I(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>xe.forEach(t,t=>xe.forEach(t.addedKeys,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>xe.forEach(t.removedKeys,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Pe(e))throw e;g(Sc,"Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.targetDataByTarget.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.targetDataByTarget=n.targetDataByTarget.insert(t,s)}}}(r.localStore,i))}async function $l(e,t){const n=I(e);if(!n.currentUser.isEqual(t)){g(El,"User change. New user:",t.toKey());const e=await Dc(n.localStore,t);n.currentUser=t,function(e){e.pendingWritesCallbacks.forEach(e=>{e.forEach(e=>{e.reject(new C(E.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.pendingWritesCallbacks.clear()}(n),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await jl(n,e.affectedDocuments)}}function Wl(e,t){const n=I(e),r=n.activeLimboResolutionsByTarget.get(t);if(r&&r.receivedDocument)return Cs().add(r.key);{let e=Cs();const r=n.queriesByTarget.get(t);if(!r)return e;for(const t of r){const r=n.queryViewsByQuery.get(t);e=e.unionWith(r.view.syncedDocuments)}return e}}async function Hl(e,t){const n=I(e),r=await Rc(n.localStore,t.query,!0),s=t.view.synchronizeWithPersistedState(r);return n.isPrimaryClient&&Kl(n,t.targetId,s.limboChanges),s}async function Yl(e,t){const n=I(e);return Pc(n.localStore,t).then(e=>jl(n,e))}async function Jl(e,t,n,r){const s=I(e),i=await function(e,t){const n=I(e),r=I(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.lookupMutationKeys(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):xe.resolve(null)))}(s.localStore,t);null!==i?("pending"===n?await zu(s.remoteStore):"acknowledged"===n||"rejected"===n?(ql(s,t,r||null),Ll(s,t),function(e,t){I(I(e).mutationQueue).removeCachedMutationKeys(t)}(s.localStore,t)):b(6720,"Unknown batchState",{batchState:n}),await jl(s,i)):g(El,"Cannot apply mutation batch with id: "+t)}async function Xl(e,t,n){const r=I(e),s=[],i=[];for(const e of t){let t;const n=r.queriesByTarget.get(e);if(n&&0!==n.length){t=await _c(r.localStore,Zr(n[0]));for(const e of n){const t=r.queryViewsByQuery.get(e),n=await Hl(r,t);n.snapshot&&i.push(n.snapshot)}}else{const n=await Oc(r.localStore,e);t=await _c(r.localStore,n),await Nl(r,Zl(n),e,!1,t.resumeToken)}s.push(t)}return r.syncEngineListener.onWatchChange(i),s}function Zl(e){return $r(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function ed(e){const t=I(e);return I(I(t.localStore).persistence).getActiveClients()}async function td(e,t,n,r){const s=I(e);if(s._isPrimaryClient)return void g(El,"Ignoring unexpected query state notification.");const i=s.queriesByTarget.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{const e=await Pc(s.localStore,ds(i[0])),r=Si.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,mn.EMPTY_BYTE_STRING);await jl(s,e,r);break}case"rejected":await Nc(s.localStore,t,!0),Ul(s,t,r);break;default:b(64155,n)}}async function nd(e,t,n){const r=rd(e);if(r._isPrimaryClient){for(const e of t){if(r.queriesByTarget.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){g(El,"Adding an already active target "+e);continue}const t=await Oc(r.localStore,e),n=await _c(r.localStore,t);await Nl(r,Zl(t),n.targetId,!1,n.resumeToken),ku(r.remoteStore,n)}for(const e of n)r.queriesByTarget.has(e)&&await Nc(r.localStore,e,!1).then(()=>{Au(r.remoteStore,e),Ul(r,e)}).catch(De)}}function rd(e){const t=I(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Pl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Wl.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Fl.bind(null,t),t.syncEngineListener.onWatchChange=hl.bind(null,t.eventManager),t.syncEngineListener.onWatchError=pl.bind(null,t.eventManager),t}function sd(e){const t=I(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ml.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Bl.bind(null,t),t}class id{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=pu(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Cc(this.persistence,new Bc,e.initialUser,this.serializer)}createPersistence(e){return new oc(uc.factory,this.serializer)}createSharedClientState(e){return new Xc}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}id.provider={build:()=>new id};class ad extends id{constructor(e){super(),this.cacheSizeBytes=e}createGarbageCollectionScheduler(e,t){v(this.persistence.referenceDelegate instanceof lc,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Fo(n,e.asyncQueue,t)}createPersistence(e){const t=void 0!==this.cacheSizeBytes?No.withCacheSize(this.cacheSizeBytes):No.DEFAULT;return new oc(e=>lc.factory(e,t),this.serializer)}}class od extends id{constructor(e,t,n){super(),this.onlineComponentProvider=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.onlineComponentProvider.initialize(this,e),await sd(this.onlineComponentProvider.syncEngine),await zu(this.onlineComponentProvider.remoteStore),await this.persistence.setPrimaryStateListener(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){return Cc(this.persistence,new Bc,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Fo(n,e.asyncQueue,t)}createIndexBackfillerScheduler(e,t){const n=new Ue(t,this.persistence);return new qe(e.asyncQueue,n)}createPersistence(e){const t=vc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?No.withCacheSize(this.cacheSizeBytes):No.DEFAULT;return new wc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,hu(),null,this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new Xc}}class cd extends od{constructor(e,t){super(e,t,!1),this.onlineComponentProvider=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.onlineComponentProvider.syncEngine;this.sharedClientState instanceof Jc&&(this.sharedClientState.syncEngine={applyBatchState:Jl.bind(null,t),applyTargetState:td.bind(null,t),applyActiveTargetsChange:nd.bind(null,t),getActiveClients:ed.bind(null,t),synchronizeWithChangedDocuments:Yl.bind(null,t)},await this.sharedClientState.start()),await this.persistence.setPrimaryStateListener(async e=>{await async function(e,t){const n=I(e);if(rd(n),sd(n),!0===t&&!0!==n._isPrimaryClient){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await Xl(n,e.toArray());n._isPrimaryClient=!0,await Xu(n.remoteStore,!0);for(const e of t)ku(n.remoteStore,e)}else if(!1===t&&!1!==n._isPrimaryClient){const e=[];let t=Promise.resolve();n.queriesByTarget.forEach((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?e.push(s):t=t.then(()=>(Ul(n,s),Nc(n.localStore,s,!0))),Au(n.remoteStore,s)}),await t,await Xl(n,e),function(e){const t=I(e);t.activeLimboResolutionsByTarget.forEach((e,n)=>{Au(t.remoteStore,n)}),t.limboDocumentRefs.removeAllReferences(),t.activeLimboResolutionsByTarget=new Map,t.activeLimboTargetsByKey=new an(J.comparator)}(n),n._isPrimaryClient=!1,await Xu(n.remoteStore,!1)}}(this.onlineComponentProvider.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){const t=hu();if(!Jc.isAvailable(t))throw new C(E.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=vc(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Jc(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class ud{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Vl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=$l.bind(null,this.syncEngine),await Xu(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new cl}createDatastore(e){const t=pu(e.databaseInfo.databaseId),n=du(e.databaseInfo);return vu(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,s=e=>Vl(this.syncEngine,e,0),i=new Zc,new Cu(t,n,r,s,i);var t,n,r,s,i}createSyncEngine(e,t){return function(e,t,n,r,s,i,a){const o=new xl(e,t,n,r,s,i);return a&&(o._isPrimaryClient=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=I(e);g(Iu,"RemoteStore shutting down."),t.offlineCauses.add(5),await xu(t),t.connectivityMonitor.shutdown(),t.onlineStateTracker.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ud.provider={build:()=>new ud};
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
const ld=10240;
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
class dd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.scheduleEvent(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.scheduleEvent(this.observer.error,e):f("Uncaught Error in snapshot listener:",e.toString()))}mute(){this.muted=!0}scheduleEvent(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
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
 */class hd{constructor(e,t){this.payload=e,this.byteLength=t}isBundleMetadata(){return"metadata"in this.payload}}
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
 */class pd{constructor(e,t){this.reader=e,this.serializer=t,this.metadata=new D,this.buffer=new Uint8Array,this.textDecoder=new i.TextDecoder("utf-8"),this.nextElementImpl().then(e=>{e&&e.isBundleMetadata()?this.metadata.resolve(e.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.payload)}`))},e=>this.metadata.reject(e))}close(){return this.reader.cancel()}async getMetadata(){return this.metadata.promise}async nextElement(){return await this.getMetadata(),this.nextElementImpl()}async nextElementImpl(){const e=await this.readLength();if(null===e)return null;const t=this.textDecoder.decode(e),n=Number(t);isNaN(n)&&this.raiseError(`length string (${t}) is not valid number`);const r=await this.readJsonString(n);return new hd(JSON.parse(r),e.length+n)}indexOfOpenBracket(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async readLength(){for(;this.indexOfOpenBracket()<0&&!await this.pullMoreDataToBuffer(););if(0===this.buffer.length)return null;const e=this.indexOfOpenBracket();e<0&&this.raiseError("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async readJsonString(e){for(;this.buffer.length<e;)await this.pullMoreDataToBuffer()&&this.raiseError("Reached the end of bundle when more is expected.");const t=this.textDecoder.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}raiseError(e){throw this.reader.cancel(),new Error(`Invalid bundle format: ${e}`)}async pullMoreDataToBuffer(){const e=await this.reader.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
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
 */class md{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.nextElement();if(!n||!n.isBundleMetadata())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(n?.payload)}`);this.metadata=n;do{n=this.nextElement(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}getElements(){return this.elements}nextElement(){if(this.cursor===this.bundleData.length)return null;const e=this.readLength(),t=this.readJsonString(e);return new hd(JSON.parse(t),e)}readJsonString(e){if(this.cursor+e>this.bundleData.length)throw new C(E.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}readLength(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new C(E.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const n=I(e),r={documents:t.map(e=>Qi(n.serializer,e))},s=await n.invokeStreamingRPC("BatchGetDocuments",n.serializer.databaseId,W.emptyPath(),r,t.length),i=new Map;s.forEach(e=>{const t=function(e,t){return"found"in t?function(e,t){v(!!t.found,43571),t.found.name,t.found.updateTime;const n=Gi(e,t.found.name),r=qi(t.found.updateTime),s=t.found.createTime?qi(t.found.createTime):de.min(),i=new dr({mapValue:{fields:t.found.fields}});return pr.newFoundDocument(n,r,s,i)}(e,t):"missing"in t?function(e,t){v(!!t.missing,3894),v(!!t.readTime,22933);const n=Gi(e,t.missing),r=qi(t.readTime);return pr.newNoDocument(n,r)}(e,t):b(7234,{result:t})}(n.serializer,e);i.set(t.key.toString(),t)});const a=[];return t.forEach(e=>{const t=i.get(e.toString());v(!!t,55234,{key:e}),a.push(t)}),a}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new si(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=J.fromPath(t);this.mutations.push(new ii(n,this.precondition(n)))}),await async function(e,t){const n=I(e),r={writes:t.map(e=>Zi(n.serializer,e))};await n.invokeRPC("Commit",n.serializer.databaseId,W.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw b(50498,{documentName:e.constructor.name});t=de.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new C(E.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(de.min())?Gs.exists(!1):Gs.updateTime(t):Gs.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(de.min()))throw new C(E.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Gs.updateTime(t)}return Gs.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
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
 */class fd{constructor(e,t,n,r,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=s,this.attemptsRemaining=n.maxAttempts,this.backoff=new mu(this.asyncQueue,"transaction_retry")}run(){this.attemptsRemaining-=1,this.runWithBackOff()}runWithBackOff(){this.backoff.backoffAndRun(async()=>{const e=new gd(this.datastore),t=this.tryRunUpdateFunction(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.handleTransactionError(e)}))}).catch(e=>{this.handleTransactionError(e)})})}tryRunUpdateFunction(e){try{const t=this.updateFunction(e);return!Nn(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}handleTransactionError(e){this.attemptsRemaining>0&&this.isRetryableTransactionError(e)?(this.attemptsRemaining-=1,this.asyncQueue.enqueueAndForget(()=>(this.runWithBackOff(),Promise.resolve()))):this.deferred.reject(e)}isRetryableTransactionError(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!di(t)}return!1}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd="FirestoreClient",wd=11,bd=20,Td=22;class vd{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=u.UNAUTHENTICATED,this.clientId=M.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{g(yd,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(g(yd,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new D;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=rl(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Sd(e,t){e.asyncQueue.verifyOperationInProgress(),g(yd,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Dc(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Id(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Ed(e);g(yd,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Ju(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Ju(t.remoteStore,n)),e._onlineComponents=t}async function Ed(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){g(yd,"Using user provided OfflineComponentProvider");try{await Sd(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===E.FAILED_PRECONDITION||e.code===E.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||e.code===Td||e.code===bd||e.code===wd}(n))throw n;y("Error using user provided cache. Falling back to memory cache: "+n),await Sd(e,new id)}}else g(yd,"Using default OfflineComponentProvider"),await Sd(e,new ad(void 0));return e._offlineComponents}async function Cd(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(g(yd,"Using user provided OnlineComponentProvider"),await Id(e,e._uninitializedComponentsProvider._online)):(g(yd,"Using default OnlineComponentProvider"),await Id(e,new ud))),e._onlineComponents}function Dd(e){return Ed(e).then(e=>e.persistence)}function xd(e){return Ed(e).then(e=>e.localStore)}function kd(e){return Cd(e).then(e=>e.remoteStore)}function Ad(e){return Cd(e).then(e=>e.syncEngine)}function _d(e){return Cd(e).then(e=>e.datastore)}async function Nd(e){const t=await Cd(e),n=t.eventManager;return n.onListen=kl.bind(null,t.syncEngine),n.onUnlisten=Rl.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Al.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=Ol.bind(null,t.syncEngine),n}function Rd(e,t,n,r){const s=new dd(r),i=new fl(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>ll(await Nd(e),i)),()=>{s.mute(),e.asyncQueue.enqueueAndForget(async()=>dl(await Nd(e),i))}}function Od(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=I(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new C(E.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=rl(e,`Failed to get document '${t} from cache`);n.reject(r)}}(await xd(e),t,n)),n.promise}function Pd(e,t,n={}){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new dd({next:o=>{i.mute(),t.enqueueAndForget(()=>dl(e,a));const c=o.docs.has(n);!c&&o.fromCache?s.reject(new C(E.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&o.fromCache&&r&&"server"===r.source?s.reject(new C(E.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(o)},error:e=>s.reject(e)}),a=new fl(Wr(n.path),i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return ll(e,a)}(await Nd(e),e.asyncQueue,t,n,r)),r.promise}function Vd(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await Rc(e,t,!0),s=new Il(t,r.remoteKeys),i=s.computeDocChanges(r.documents),a=s.applyChanges(i,!1);n.resolve(a.snapshot)}catch(e){const r=rl(e,`Failed to execute query '${t} against cache`);n.reject(r)}}(await xd(e),t,n)),n.promise}function Fd(e,t,n={}){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new dd({next:n=>{i.mute(),t.enqueueAndForget(()=>dl(e,a)),n.fromCache&&"server"===r.source?s.reject(new C(E.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),a=new fl(n,i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return ll(e,a)}(await Nd(e),e.asyncQueue,t,n,r)),r.promise}function Md(e,t,n){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>{try{const s=await _d(e);r.resolve(async function(e,t,n){const r=I(e),{request:s,aliasMap:i,parent:a}=ra(r.serializer,es(t),n);r.connection.shouldResourcePathBeIncludedInRequest||delete s.parent;const o=(await r.invokeStreamingRPC("RunAggregationQuery",r.serializer.databaseId,a,s,1)).filter(e=>!!e.result);v(1===o.length,64727);const c=o[0].result?.aggregateFields;return Object.keys(c).reduce((e,t)=>(e[i[t]]=c[t],e),{})}(s,t,n))}catch(e){r.reject(e)}}),r.promise}function Bd(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>{try{const r=await _d(e);n.resolve(async function(e,t){const n=I(e),r={database:Wi(n.serializer),structuredPipeline:t._toProto(n.serializer)},s=await n.invokeStreamingRPC("ExecutePipeline",n.serializer.databaseId,W.emptyPath(),r),i=[];return s.forEach(e=>{if(e.results&&0!==e.results.length)return e.results.forEach(t=>i.push(Ji(n.serializer,e,t)));i.push(Ji(n.serializer,e))}),i}(r,t))}catch(e){n.reject(e)}}),n.promise}function Ld(e,t){const n=new D;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){const r=sd(e);try{const e=await function(e,t){const n=I(e),r=le.now(),s=t.reduce((e,t)=>e.add(t.key),Cs());let i,a;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let o=fs(),c=Cs();return n.remoteDocuments.getEntries(e,s).next(e=>{o=e,o.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,o)).next(s=>{i=s;const a=[];for(const e of t){const t=Js(e,i.get(e.key).overlayedDocument);null!=t&&a.push(new ei(e.key,t,hr(t.value.mapValue),Gs.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,a,t)}).next(t=>{a=t;const r=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:a.batchId,changes:bs(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.mutationUserCallbacks[e.currentUser.toKey()];r||(r=new an(B)),r=r.insert(t,n),e.mutationUserCallbacks[e.currentUser.toKey()]=r}(r,e.batchId,n),await jl(r,e.changes),await zu(r.remoteStore)}catch(e){const t=rl(e,"Failed to persist write");n.reject(t)}}(await Ad(e),t,n)),n.promise}function qd(e,t){const n=new dd(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){I(e).snapshotsInSyncListeners.add(t),t.next()}(await Nd(e),n)),()=>{n.mute(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){I(e).snapshotsInSyncListeners.delete(t)}(await Nd(e),n))}}function Ud(e,t,n){const r=new D;return e.asyncQueue.enqueueAndForget(async()=>{const s=await _d(e);new fd(e.asyncQueue,s,n,t,r).run()}),r.promise}function zd(e,t,n,r){const s=function(e,t){let n;return n="string"==typeof e?fi().encode(e):e,function(e,t){return new pd(e,t)}(function(e,t){if(!(e instanceof Uint8Array))throw new C(E.INVALID_ARGUMENT,`NodePlatform.toByteStreamReader expects source to be Uint8Array, got ${re(e)}`);return function(e,t=ld){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}(e,t)}(n),t)}(n,pu(t));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){const r=I(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await function(e,t){const n=I(e),r=qi(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.bundleCache.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,r))return await t.close(),n._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(r)),Promise.resolve(new Set);n._updateProgress(Tl(r));const s=new bl(r,t.serializer);let i=await t.nextElement();for(;i;){const e=await s.addSizedElement(i);e&&n._updateProgress(e),i=await t.nextElement()}const a=await s.completeAndStoreAsync(e.localStore);return await jl(e,a.changedDocs,void 0),await function(e,t){const n=I(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.bundleCache.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(a.progress),Promise.resolve(a.changedCollectionGroups)}catch(e){return y(El,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)
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
 */}})(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}(await Ad(e),s,r)})}function Kd(e,t){return function(e,t){return new md(e,t)}(e,t)}function Qd(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const n=I(e),r=n.indexManager,s=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
function(e,t,n,r,s){e=[...e],t=[...t],e.sort(n),t.sort(n);const i=e.length,a=t.length;let o=0,c=0;for(;o<a&&c<i;){const i=n(e[c],t[o]);i<0?s(e[c++]):i>0?r(t[o++]):(o++,c++)}for(;o<a;)r(t[o++]);for(;c<i;)s(e[c++])}(n,t,fe,t=>{s.push(r.addFieldIndex(e,t))},t=>{s.push(r.deleteFieldIndex(e,t))})).next(()=>xe.waitFor(s)))}(await xd(e),t))}function Gd(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){I(e).queryEngine.indexAutoCreationEnabled=t}(await xd(e),t))}function jd(e){return e.asyncQueue.enqueue(async()=>function(e){const t=I(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))}(await xd(e)))}
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
 */function $d(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}
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
 */const Wd="ComponentProvider",Hd=new Map;function Yd(e,t,n,r,s){return new Dn(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,$d(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}
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
 */const Jd="firestore.googleapis.com",Xd=!0;class Zd{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new C(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jd,this.ssl=Xd}else this.host=e.host,this.ssl=e.ssl??Xd;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=_o;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<Oo)throw new C(E.INVALID_ARGUMENT,`cacheSizeBytes must be at least ${Oo}`);this.cacheSizeBytes=e.cacheSizeBytes}Z("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$d(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class eh{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new C(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new C(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zd(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new k;switch(e.type){case"firstParty":return new R(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new C(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Hd.get(e);t&&(g(Wd,"Removing Datastore"),Hd.delete(e),t.terminate())}(this),Promise.resolve()}}function th(e,t,r,s={}){e=se(e,eh);const i=(0,n.isCloudWorkstation)(t),a=e._getSettings(),o={...a,emulatorOptions:e._getEmulatorOptions()},c=`${t}:${r}`;i&&(0,n.pingServer)(`https://${c}`),a.host!==Jd&&a.host!==c&&y("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...a,host:c,ssl:i,emulatorOptions:s};if(!(0,n.deepEqual)(l,o)&&(e._setSettings(l),s.mockUserToken)){let t,r;if("string"==typeof s.mockUserToken)t=s.mockUserToken,r=u.MOCK_USER;else{t=(0,n.createMockUserToken)(s.mockUserToken,e._app?.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new C(E.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new u(i)}e._authCredentials=new A(new x(t,r))}}
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
 */class nh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new nh(this.firestore,e,this._query)}}class rh{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new sh(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new rh(this.firestore,e,this._key)}toJSON(){return{type:rh._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(oe(t,rh._jsonSchema))return new rh(e,n||null,new J(W.fromString(t.referencePath)))}}rh._jsonSchemaVersion="firestore/documentReference/1.0",rh._jsonSchema={type:ae("string",rh._jsonSchemaVersion),referencePath:ae("string")};class sh extends nh{constructor(e,t,n){super(e,t,Wr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new rh(this.firestore,null,new J(e))}withConverter(e){return new sh(this.firestore,e,this._path)}}function ih(e){return e instanceof sh}function ah(e,t,...r){if(e=(0,n.getModularInstance)(e),X("collection","path",t),e instanceof eh){const n=W.fromString(t,...r);return te(n),new sh(e,null,n)}{if(!(e instanceof rh||e instanceof sh))throw new C(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(W.fromString(t,...r));return te(n),new sh(e.firestore,null,n)}}function oh(e,t){if(e=se(e,eh),X("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new C(E.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new nh(e,null,function(e){return new jr(W.emptyPath(),e)}(t))}function ch(e,t,...r){if(e=(0,n.getModularInstance)(e),1===arguments.length&&(t=M.newId()),X("doc","path",t),e instanceof eh){const n=W.fromString(t,...r);return ee(n),new rh(e,null,new J(n))}{if(!(e instanceof rh||e instanceof sh))throw new C(E.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(W.fromString(t,...r));return ee(n),new rh(e.firestore,e instanceof sh?e.converter:null,new J(n))}}function uh(e,t){return e=(0,n.getModularInstance)(e),t=(0,n.getModularInstance)(t),(e instanceof rh||e instanceof sh)&&(t instanceof rh||t instanceof sh)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function lh(e,t){return e=(0,n.getModularInstance)(e),t=(0,n.getModularInstance)(t),e instanceof nh&&t instanceof nh&&e.firestore===t.firestore&&os(e._query,t._query)&&e.converter===t.converter}
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
 */class dh{constructor(e=Promise.resolve()){this.retryableOps=[],this._isShuttingDown=!1,this.delayedOperations=[],this.failure=null,this.operationInProgress=!1,this.skipNonRestrictedTasks=!1,this.timerIdsToSkip=[],this.backoff=new mu(this,"async_queue_retry"),this.visibilityHandler=()=>{this.backoff.skipBackoff()},this.tail=e}get isShuttingDown(){return this._isShuttingDown}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.verifyNotFailed(),this.enqueueInternal(e)}enterRestrictedMode(e){this._isShuttingDown||(this._isShuttingDown=!0,this.skipNonRestrictedTasks=e||!1)}enqueue(e){if(this.verifyNotFailed(),this._isShuttingDown)return new Promise(()=>{});const t=new D;return this.enqueueInternal(()=>this._isShuttingDown&&this.skipNonRestrictedTasks?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.retryableOps.push(e),this.retryNextOp()))}async retryNextOp(){if(0!==this.retryableOps.length){try{await this.retryableOps[0](),this.retryableOps.shift(),this.backoff.reset()}catch(e){if(!Pe(e))throw e;g("AsyncQueue","Operation failed with retryable error: "+e)}this.retryableOps.length>0&&this.backoff.backoffAndRun(()=>this.retryNextOp())}}enqueueInternal(e){const t=this.tail.then(()=>(this.operationInProgress=!0,e().catch(e=>{throw this.failure=e,this.operationInProgress=!1,f("INTERNAL UNHANDLED ERROR: ",hh(e)),e}).then(e=>(this.operationInProgress=!1,e))));return this.tail=t,t}enqueueAfterDelay(e,t,n){this.verifyNotFailed(),this.timerIdsToSkip.indexOf(e)>-1&&(t=0);const r=nl.createAndSchedule(this,e,t,n,e=>this.removeDelayedOperation(e));return this.delayedOperations.push(r),r}verifyNotFailed(){this.failure&&b(47125,{messageOrStack:hh(this.failure)})}verifyOperationInProgress(){}async drain(){let e;do{e=this.tail,await e}while(e!==this.tail)}containsDelayedOperation(e){for(const t of this.delayedOperations)if(t.timerId===e)return!0;return!1}runAllDelayedOperationsUntil(e){return this.drain().then(()=>{this.delayedOperations.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.delayedOperations)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.drain()})}skipDelaysForTimerId(e){this.timerIdsToSkip.push(e)}removeDelayedOperation(e){const t=this.delayedOperations.indexOf(e);this.delayedOperations.splice(t,1)}}function hh(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
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
 */class ph{constructor(){this._progressObserver={},this._taskCompletionResolver=new D,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)
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
 */}}const mh=-1;class gh extends eh{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new dh,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new dh(e),this._firestoreClient=void 0,await e}}}function fh(e,r,s){s||(s=xn);const i=(0,t._getProvider)(e,"firestore");if(i.isInitialized(s)){const e=i.getImmediate({identifier:s}),t=i.getOptions(s);if((0,n.deepEqual)(t,r))return e;throw new C(E.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==r.cacheSizeBytes&&void 0!==r.localCache)throw new C(E.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==r.cacheSizeBytes&&r.cacheSizeBytes!==mh&&r.cacheSizeBytes<Oo)throw new C(E.INVALID_ARGUMENT,`cacheSizeBytes must be at least ${Oo}`);return r.host&&(0,n.isCloudWorkstation)(r.host)&&(0,n.pingServer)(r.host),i.initialize({options:r,instanceIdentifier:s})}function yh(e,r){const s="object"==typeof e?e:(0,t.getApp)(),i="string"==typeof e?e:r||xn,a=(0,t._getProvider)(s,"firestore").getImmediate({identifier:i});if(!a._initialized){const e=(0,n.getDefaultEmulatorHostnameAndPort)("firestore");e&&th(a,...e)}return a}function wh(e){if(e._terminated)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||bh(e),e._firestoreClient}function bh(e){const t=e._freezeSettings(),n=Yd(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new vd(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function Th(e,t){y("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return Sh(e,ud.provider,{build:e=>new od(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function vh(e){y("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();Sh(e,ud.provider,{build:e=>new cd(e,t.cacheSizeBytes)})}function Sh(e,t,n){if((e=se(e,gh))._firestoreClient||e._terminated)throw new C(E.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new C(E.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},bh(e)}function Ih(e){if(e._initialized&&!e._terminated)throw new C(E.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new D;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!_e.isAvailable())return Promise.resolve();const t=e+yc;await _e.delete(t)}(vc(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function Eh(e){return function(e){const t=new D;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t){const n=I(e);Pu(n.remoteStore)||g(El,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=I(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(n.localStore);if(e===_n)return void t.resolve();const r=n.pendingWritesCallbacks.get(e)||[];r.push(t),n.pendingWritesCallbacks.set(e,r)}catch(e){const n=rl(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}(await Ad(e),t)),t.promise}(wh(e=se(e,gh)))}function Ch(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await Dd(e),n=await kd(e);return t.setNetworkEnabled(!0),function(e){const t=I(e);return t.offlineCauses.delete(0),Du(t)}(n)})}(wh(e=se(e,gh)))}function Dh(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await Dd(e),n=await kd(e);return t.setNetworkEnabled(!1),async function(e){const t=I(e);t.offlineCauses.add(0),await xu(t),t.onlineStateTracker.set("Offline")}(n)})}(wh(e=se(e,gh)))}function xh(e){return(0,t._removeServiceInstance)(e.app,"firestore",e._databaseId.database),e._delete()}function kh(e,t){const n=wh(e=se(e,gh)),r=new ph;return zd(n,e._databaseId,t,r),r}function Ah(e,t){return function(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=I(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.bundleCache.getNamedQuery(e,t))}(await xd(e),t))}(wh(e=se(e,gh)),t).then(t=>t?new nh(e,null,t.query):null)}
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
 */class _h{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n
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
 */}}class Nh{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Nh(mn.fromBase64String(e))}catch(e){throw new C(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Nh(mn.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Nh._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(oe(e,Nh._jsonSchema))return Nh.fromBase64String(e.bytes)}}Nh._jsonSchemaVersion="firestore/bytes/1.0",Nh._jsonSchema={type:ae("string",Nh._jsonSchemaVersion),bytes:ae("string")};
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
class Rh{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new C(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Y(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Oh(){return new Rh(j)}
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
 */class Ph{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new C(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new C(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return B(this._lat,e._lat)||B(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Vh._jsonSchemaVersion}}static fromJSON(e){if(oe(e,Vh._jsonSchema))return new Vh(e.latitude,e.longitude)}}Vh._jsonSchemaVersion="firestore/geoPoint/1.0",Vh._jsonSchema={type:ae("string",Vh._jsonSchemaVersion),latitude:ae("number"),longitude:ae("number")};
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
class Fh{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Fh._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(oe(e,Fh._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Fh(e.vectorValues);throw new C(E.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Fh._jsonSchemaVersion="firestore/vectorValue/1.0",Fh._jsonSchema={type:ae("string",Fh._jsonSchemaVersion),vectorValues:ae("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
const Mh=/^__.*__$/;class Bh{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new ei(e,this.data,this.fieldMask,t,this.fieldTransforms):new Zs(e,this.data,t,this.fieldTransforms)}}class Lh{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new ei(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function qh(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw b(40011,{dataSource:e})}}class Uh{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Uh({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return op(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(qh(this.dataSource)&&Mh.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class zh{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||pu(e)}createContext(e,t,n,r=!1){return new Uh({dataSource:e,methodName:t,targetDoc:n,path:Y.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Kh(e){const t=e._freezeSettings(),n=pu(e._databaseId);return new zh(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Qh(e,t,n,r,s,i={}){const a=e.createContext(i.merge||i.mergeFields?2:0,t,n,s);rp("Data must be an object, but it was:",a,r);const o=tp(r,a);let c,u;if(i.merge)c=new hn(a.fieldMask),u=a.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=sp(t,r,n);if(!a.contains(s))throw new C(E.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);cp(e,s)||e.push(s)}c=new hn(e),u=a.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=a.fieldTransforms;return new Bh(new dr(o),c,u)}class Gh extends Ph{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Gh}}function jh(e,t,n){return new Uh({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class $h extends Ph{_toFieldTransform(e){return new Ks(e.path,new Vs)}isEqual(e){return e instanceof $h}}class Wh extends Ph{constructor(e,t){super(e),this._elements=t}_toFieldTransform(e){const t=jh(this,e,!0),n=this._elements.map(e=>ep(e,t)),r=new Fs(n);return new Ks(e.path,r)}isEqual(e){return e instanceof Wh&&(0,n.deepEqual)(this._elements,e._elements)}}class Hh extends Ph{constructor(e,t){super(e),this._elements=t}_toFieldTransform(e){const t=jh(this,e,!0),n=this._elements.map(e=>ep(e,t)),r=new Bs(n);return new Ks(e.path,r)}isEqual(e){return e instanceof Hh&&(0,n.deepEqual)(this._elements,e._elements)}}class Yh extends Ph{constructor(e,t){super(e),this._operand=t}_toFieldTransform(e){const t=new qs(e.serializer,_s(e.serializer,this._operand));return new Ks(e.path,t)}isEqual(e){return e instanceof Yh&&this._operand===e._operand}}function Jh(e,t,r,s){const i=e.createContext(1,t,r);rp("Data must be an object, but it was:",i,s);const a=[],o=dr.empty();nn(s,(e,s)=>{const c=ap(t,e,r);s=(0,n.getModularInstance)(s);const u=i.childContextForFieldPath(c);if(s instanceof Gh)a.push(c);else{const e=ep(s,u);null!=e&&(a.push(c),o.set(c,e))}});const c=new hn(a);return new Lh(o,c,i.fieldTransforms)}function Xh(e,t,r,s,i,a){const o=e.createContext(1,t,r),c=[sp(t,s,r)],u=[i];if(a.length%2!=0)throw new C(E.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<a.length;e+=2)c.push(sp(t,a[e])),u.push(a[e+1]);const l=[],d=dr.empty();for(let e=c.length-1;e>=0;--e)if(!cp(l,c[e])){const t=c[e];let r=u[e];r=(0,n.getModularInstance)(r);const s=o.childContextForFieldPath(t);if(r instanceof Gh)l.push(t);else{const e=ep(r,s);null!=e&&(l.push(t),d.set(t,e))}}const h=new hn(l);return new Lh(d,h,o.fieldTransforms)}function Zh(e,t,n,r=!1){return ep(n,e.createContext(r?4:3,t))}function ep(e,t){if(np(e=(0,n.getModularInstance)(e)))return rp("Unsupported field value:",t,e),tp(e,t);if(e instanceof Ph)return function(e,t){if(!qh(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=ep(s,t.childContextForArray(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,n.getModularInstance)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return _s(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=le.fromDate(e);return{timestampValue:Fi(t.serializer,n)}}if(e instanceof le){const n=new le(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Fi(t.serializer,n)}}if(e instanceof Vh)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Nh)return{bytesValue:Bi(t.serializer,e._byteString)};if(e instanceof rh){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ui(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Fh)return function(e,t){const n=e instanceof Fh?e.toArray():e,r={fields:{[Fn]:{stringValue:Ln},[qn]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return ks(t.serializer,e)})}}}};return{mapValue:r}}(e,t);if(ma(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${re(e)}`)}(e,t)}function tp(e,t){const n={};return sn(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):nn(e,(e,r)=>{const s=ep(r,t.childContextForField(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function np(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof le||e instanceof Vh||e instanceof Nh||e instanceof rh||e instanceof Ph||e instanceof Fh||ma(e))}function rp(e,t,n){if(!np(n)||!ne(n)){const r=re(n);throw"an object"===r?t.createError(e+" a custom object"):t.createError(e+" "+r)}}function sp(e,t,r){if((t=(0,n.getModularInstance)(t))instanceof Rh)return t._internalPath;if("string"==typeof t)return ap(e,t);throw op("Field path arguments must be of type string or ",e,!1,void 0,r)}const ip=new RegExp("[~\\*/\\[\\]]");function ap(e,t,n){if(t.search(ip)>=0)throw op(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Rh(...t.split("."))._internalPath}catch(r){throw op(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function op(e,t,n,r,s){const i=r&&!r.isEmpty(),a=void 0!==s;let o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new C(E.INVALID_ARGUMENT,o+e+c)}function cp(e,t){return e.some(e=>e.isEqual(t))}function up(e){return"function"==typeof e._readUserData}
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
 */class lp{convertValue(e,t="none"){switch(zn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return yn(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(wn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw b(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return nn(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[qn].arrayValue?.values?.map(e=>yn(e.doubleValue));return new Fh(t)}convertGeoPoint(e){return new Vh(yn(e.latitude),yn(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=En(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Cn(e));default:return null}}convertTimestamp(e){const t=fn(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=W.fromString(e);v(pa(n),9688,{name:e});const r=new kn(n.get(1),n.get(3)),s=new J(n.popFirst(5));return r.isEqual(t)||f(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s
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
 */}}class dp extends lp{constructor(e){super(),this.firestore=e}convertBytes(e){return new Nh(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new rh(this.firestore,null,t)}}
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
 */function hp(){return new Gh("deleteField")}function pp(){return new $h("serverTimestamp")}function mp(...e){return new Wh("arrayUnion",e)}function gp(...e){return new Hh("arrayRemove",e)}function fp(e){return new Yh("increment",e)}function yp(e){return new Fh(e)}
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
 */class wp{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=dr.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const s=this.optionDefinitions[r];if(r in e){const i=e[r];let a;s.nestedOptions&&ne(i)?a={mapValue:{fields:new wp(s.nestedOptions).getOptionsProto(t,i)}}:i&&(a=ep(i,t)??void 0),a&&n.set(Y.fromServerFormat(s.serverName),a)}}return n}getOptionsProto(e,t,n){const r=this._getKnownOptions(t,e);if(n){const t=new Map(rn(n,(t,n)=>[Y.fromServerFormat(n),void 0!==t?ep(t,e):null]));r.setAll(t)}return r.value.mapValue.fields??{}}}
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
 */class bp{constructor(e={},t={}){this._userOptions=e,this._optionsOverride=t,this.optionsUtil=new wp({indexMode:{serverName:"index_mode"}})}_readUserData(e){this.proto=this.optionsUtil.getOptionsProto(e,this._userOptions,this._optionsOverride)}}class Tp{constructor(e,t){this.pipeline=e,this.options=t}_toProto(e){return{pipeline:this.pipeline._toProto(e),options:this.options.proto}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(e){const t=wh(se(e.firestore,gh)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:na(n,Zr(e._query)).queryTarget}function Sp(e,t){const n=rn(t,(e,t)=>new _h(t,e.aggregateType,e._internalFieldPath)),r=wh(se(e.firestore,gh)),s=r._onlineComponents?.datastore.serializer;return void 0===s?null:ra(s,es(e._query),n,!0).request}function Ip(e){const t=function(e){if(e._terminated)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.");if(!Hd.has(e)){g(Wd,"Initializing Datastore");const t=du(Yd(e._databaseId,e.app.options.appId||"",e._persistenceKey,e.app.options.apiKey,e._freezeSettings())),n=pu(e._databaseId),r=vu(e._authCredentials,e._appCheckCredentials,t,n);Hd.set(e,r)}return Hd.get(e)}(se(e._db,gh)),n=t.serializer;if(void 0===n)return null;const r=new Tp(e,new bp);return{database:Wi(n),structuredPipeline:r._toProto(n)}}}];