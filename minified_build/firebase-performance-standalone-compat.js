!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).firebase=t()}(this,function(){"use strict";
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
     */const e=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},t={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],a=t+1<e.length,o=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(3&i)<<4|o>>4;let f=(15&o)<<2|c>>6,d=63&c;s||(d=64,a||(f=64)),r.push(n[l],n[u],n[f],n[d])}return r.join("")},encodeString(t,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(t):this.encodeByteArray(e(t),n)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&a)}else if(i>239&&i<365){const a=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{const a=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&a)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let t=0;t<e.length;){const a=r[e.charAt(t++)],o=t<e.length?r[e.charAt(t)]:0;++t;const s=t<e.length?r[e.charAt(t)]:64;++t;const c=t<e.length?r[e.charAt(t)]:64;if(++t,null==a||null==o||null==s||null==c)throw new n;const l=a<<2|o>>4;if(i.push(l),64!==s){const e=o<<4&240|s>>2;if(i.push(e),64!==c){const e=s<<6&192|c;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class n extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const r=function(n){return function(n){const r=e(n);return t.encodeByteArray(r,!0)}(n).replace(/\./g,"")},i=function(e){try{return t.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function a(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=a(e[n],t[n]));return e}
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
     */const o=()=>{try{
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
     */return function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__||(()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&i(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},s=()=>o()?.config
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */;class c{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}function l(){return"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function u(){try{return"object"==typeof indexedDB}catch(e){return!1}}function f(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}class d extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,d.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,p.prototype.create)}}class p{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?function(e,t){return e.replace(h,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${a} (${r}).`;return new d(r,o,n)}}const h=/\{\$([^}]+)}/g;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function g(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function m(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],a=t[i];if(b(n)&&b(a)){if(!m(n,a))return!1}else if(n!==a)return!1}for(const e of r)if(!n.includes(e))return!1;return!0}function b(e){return null!==e&&"object"==typeof e}
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
     */class v{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this
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
     */}}const y="[DEFAULT]";
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
     */class _{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new c;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const e=this.getOrInitializeService({instanceIdentifier:t});e&&n.resolve(e)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
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
     */(e))try{this.getOrInitializeService({instanceIdentifier:y})}catch(e){}for(const[t,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(e){}}}}clearInstance(e=y){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=y){return this.instances.has(e)}getOptions(e=y){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===y?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=y){return this.component?this.component.multipleInstances?e:y:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class w{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new _(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const E=[];var S;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(S||(S={}));const I={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},T=S.INFO,C={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},A=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=C[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class D{constructor(e){this.name=e,this._logLevel=T,this._logHandler=A,this._userLogHandler=null,E.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?I[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}let k,N;const M=new WeakMap,O=new WeakMap,L=new WeakMap,P=new WeakMap,B=new WeakMap;let R={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return O.get(e);if("objectStoreNames"===t)return e.objectStoreNames||L.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function F(e){return"function"==typeof e?function(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(N||(N=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(U(this),t),$(M.get(this))}:function(...t){return $(e.apply(U(this),t))}:function(t,...n){const r=e.call(U(this),t,...n);return L.set(r,t.sort?t.sort():[t]),$(r)}}(e):(e instanceof IDBTransaction&&function(e){if(O.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});O.set(e,t)}(e),t=e,(k||(k=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,R):e);var t}function $(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{t($(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",a)});return t.then(t=>{t instanceof IDBCursor&&M.set(t,e)}).catch(()=>{}),B.set(t,e),t}(e);if(P.has(e))return P.get(e);const t=F(e);return t!==e&&(P.set(e,t),B.set(t,e)),t}const U=e=>B.get(e);function j(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){const o=indexedDB.open(e,t),s=$(o);return r&&o.addEventListener("upgradeneeded",e=>{r($(o.result),e.oldVersion,e.newVersion,$(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener("close",()=>a()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}const x=["get","getKey","getAll","getAllKeys","count"],z=["put","add","delete","clear"],V=new Map;function H(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(V.get(t))return V.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=z.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!x.includes(n))return;const a=async function(e,...t){const a=this.transaction(e,i?"readwrite":"readonly");let o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return V.set(t,a),a}R=(e=>({...e,get:(t,n,r)=>H(t,n)||e.get(t,n,r),has:(t,n)=>!!H(t,n)||e.has(t,n)}))(R);
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
     */
class q{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const W="@firebase/app",K="0.14.10",J=new D("@firebase/app"),G="@firebase/app-compat",X="@firebase/analytics-compat",Y="@firebase/analytics",Z="@firebase/app-check-compat",Q="@firebase/app-check",ee="@firebase/auth",te="@firebase/auth-compat",ne="@firebase/database",re="@firebase/data-connect",ie="@firebase/database-compat",ae="@firebase/functions",oe="@firebase/functions-compat",se="@firebase/installations",ce="@firebase/installations-compat",le="@firebase/messaging",ue="@firebase/messaging-compat",fe="@firebase/performance",de="@firebase/performance-compat",pe="@firebase/remote-config",he="@firebase/remote-config-compat",ge="@firebase/storage",me="@firebase/storage-compat",be="@firebase/firestore",ve="@firebase/ai",ye="@firebase/firestore-compat",_e="firebase",we="[DEFAULT]",Ee={[W]:"fire-core",[G]:"fire-core-compat",[Y]:"fire-analytics",[X]:"fire-analytics-compat",[Q]:"fire-app-check",[Z]:"fire-app-check-compat",[ee]:"fire-auth",[te]:"fire-auth-compat",[ne]:"fire-rtdb",[re]:"fire-data-connect",[ie]:"fire-rtdb-compat",[ae]:"fire-fn",[oe]:"fire-fn-compat",[se]:"fire-iid",[ce]:"fire-iid-compat",[le]:"fire-fcm",[ue]:"fire-fcm-compat",[fe]:"fire-perf",[de]:"fire-perf-compat",[pe]:"fire-rc",[he]:"fire-rc-compat",[ge]:"fire-gcs",[me]:"fire-gcs-compat",[be]:"fire-fst",[ye]:"fire-fst-compat",[ve]:"fire-vertex","fire-js":"fire-js",[_e]:"fire-js-all"},Se=new Map,Ie=new Map,Te=new Map;function Ce(e,t){try{e.container.addComponent(t)}catch(n){J.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Ae(e){const t=e.name;if(Te.has(t))return J.debug(`There were multiple attempts to register component ${t}.`),!1;Te.set(t,e);for(const t of Se.values())Ce(t,e);for(const t of Ie.values())Ce(t,e);return!0}function De(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function ke(e){return void 0!==e.options}function Ne(e){return!ke(e)&&("authIdToken"in e||"appCheckToken"in e||"releaseOnDeref"in e||"automaticDataCollectionEnabled"in e)}
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
     */const Me=new p("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
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
     */class Oe{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new v("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Me.create("app-deleted",{appName:this._name})}}
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
     */function Le(e,t){const n=i(e.split(".")[1]);null!==n?void 0!==JSON.parse(n).exp?1e3*JSON.parse(n).exp-(new Date).getTime()<=0&&console.error(`FirebaseServerApp ${t} is invalid: the token has expired.`):console.error(`FirebaseServerApp ${t} is invalid: expiration claim could not be parsed`):console.error(`FirebaseServerApp ${t} is invalid: second part could not be parsed.`)}class Pe extends Oe{constructor(e,t,n,r){const i=void 0===t.automaticDataCollectionEnabled||t.automaticDataCollectionEnabled,a={name:n,automaticDataCollectionEnabled:i};void 0!==e.apiKey?super(e,a,r):super(e.options,a,r),this._serverConfig={automaticDataCollectionEnabled:i,...t},this._serverConfig.authIdToken&&Le(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&Le(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,"undefined"!=typeof FinalizationRegistry&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,$e(W,K,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,void 0!==e&&null!==this._finalizationRegistry&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){Fe(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw Me.create("server-app-deleted")}}
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
     */const Be="12.11.0";function Re(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});const r={name:we,automaticDataCollectionEnabled:!0,...t},i=r.name;if("string"!=typeof i||!i)throw Me.create("bad-app-name",{appName:String(i)});if(n||(n=s()),!n)throw Me.create("no-options");const a=Se.get(i);if(a){if(m(n,a.options)&&m(r,a.config))return a;throw Me.create("duplicate-app",{appName:i})}const o=new w(i);for(const e of Te.values())o.addComponent(e);const c=new Oe(n,r,o);return Se.set(i,c),c}async function Fe(e){let t=!1;const n=e.name;Se.has(n)?(t=!0,Se.delete(n)):Ie.has(n)&&e.decRefCount()<=0&&(Ie.delete(n),t=!0),t&&(await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function $e(e,t,n){let r=Ee[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const e=[`Unable to register library "${r}" with version "${t}":`];return i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void J.warn(e.join(" "))}Ae(new v(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}function Ue(e,t){if(null!==e&&"function"!=typeof e)throw Me.create("invalid-log-argument");!function(e,t){for(const n of E){let r=null;t&&t.level&&(r=I[t.level]),n.userLogHandler=null===e?null:(t,n,...i)=>{const a=i.map(e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(e=>e).join(" ");n>=(r??t.logLevel)&&e({level:S[n].toLowerCase(),message:a,args:i,type:t.name})}}}(e,t)}function je(e){var t;t=e,E.forEach(e=>{e.setLogLevel(t)})}
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
     */const xe="firebase-heartbeat-store";let ze=null;function Ve(){return ze||(ze=j("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(xe)}catch(e){console.warn(e)}}}).catch(e=>{throw Me.create("idb-open",{originalErrorMessage:e.message})})),ze}async function He(e,t){try{const n=(await Ve()).transaction(xe,"readwrite"),r=n.objectStore(xe);await r.put(t,qe(e)),await n.done}catch(e){if(e instanceof d)J.warn(e.message);else{const t=Me.create("idb-set",{originalErrorMessage:e?.message});J.warn(t.message)}}}function qe(e){return`${e.name}!${e.options.appId}`
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
     */}class We{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Je(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=Ke();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
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
     */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){J.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Ke(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Ge(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ge(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=r(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return J.warn(e),""}}}function Ke(){return(new Date).toISOString().substring(0,10)}class Je{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!u()&&f().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Ve()).transaction(xe),n=await t.objectStore(xe).get(qe(e));return await t.done,n}catch(e){if(e instanceof d)J.warn(e.message);else{const t=Me.create("idb-get",{originalErrorMessage:e?.message});J.warn(t.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return He(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return He(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ge(e){return r(JSON.stringify({version:2,heartbeats:e})).length}Ae(new v("platform-logger",e=>new q(e),"PRIVATE")),Ae(new v("heartbeat",e=>new We(e),"PRIVATE")),$e(W,K,""),$e(W,K,"esm2020"),$e("fire-js","");var Xe=Object.freeze({__proto__:null,SDK_VERSION:Be,_DEFAULT_ENTRY_NAME:we,_addComponent:Ce,_addOrOverwriteComponent:function(e,t){e.container.addOrOverwriteComponent(t)},_apps:Se,_clearComponents:function(){Te.clear()},_components:Te,_getProvider:De,_isFirebaseApp:ke,_isFirebaseServerApp:function(e){return null!=e&&void 0!==e.settings},_isFirebaseServerAppSettings:Ne,_registerComponent:Ae,_removeServiceInstance:function(e,t,n=we){De(e,t).clearInstance(n)},_serverApps:Ie,deleteApp:Fe,getApp:function(e=we){const t=Se.get(e);if(!t&&e===we&&s())return Re();if(!t)throw Me.create("no-app",{appName:e});return t},getApps:function(){return Array.from(Se.values())},initializeApp:Re,initializeServerApp:function(e,t={}){if(("undefined"!=typeof window||l())&&!l())throw Me.create("invalid-server-app-environment");let n,r=t||{};if(e&&(ke(e)?n=e.options:Ne(e)?r=e:n=e),void 0===r.automaticDataCollectionEnabled&&(r.automaticDataCollectionEnabled=!0),n||(n=s()),!n)throw Me.create("no-options");const i={...r,...n};if(void 0!==i.releaseOnDeref&&delete i.releaseOnDeref,void 0!==r.releaseOnDeref&&"undefined"==typeof FinalizationRegistry)throw Me.create("finalization-registry-not-supported",{});const a=""+(e=>[...e].reduce((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0,0))(JSON.stringify(i)),o=Ie.get(a);if(o)return o.incRefCount(r.releaseOnDeref),o;const c=new w(a);for(const e of Te.values())c.addComponent(e);const u=new Pe(n,r,a,c);return Ie.set(a,u),u},onLog:Ue,registerVersion:$e,setLogLevel:je,FirebaseError:d});
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
     */class Ye{constructor(e,t){this._delegate=e,this.firebase=t,Ce(e,new v("app-compat",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return this.firebase.INTERNAL.removeApp(this.name),Fe(this._delegate)}_getService(e,t=we){return this._delegate.checkDestroyed(),this._delegate.container.getProvider(e).getImmediate({identifier:t})
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
     */}}const Ze=new p("app-compat","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."});
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
     */function Qe(e){const t={},n={__esModule:!0,initializeApp:function(r,i={}){const a=Re(r,i);if(g(t,a.name))return t[a.name];const o=new e(a,n);return t[a.name]=o,o},app:r,registerVersion:$e,setLogLevel:je,onLog:Ue,apps:null,SDK_VERSION:Be,INTERNAL:{registerComponent:function(t){const i=t.name,o=i.replace("-compat","");if(Ae(t)&&"PUBLIC"===t.type){const s=(e=r())=>{if("function"!=typeof e[o])throw Ze.create("invalid-app-argument",{appName:i});return e[o]()};void 0!==t.serviceProps&&a(s,t.serviceProps),n[o]=s,e.prototype[o]=function(...e){return this._getService.bind(this,i).apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?n[o]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){return"serverAuth"===t?null:t},modularAPIs:Xe}};function r(e){if(!g(t,e=e||we))throw Ze.create("no-app",{appName:e});return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map(e=>t[e])}}),r.App=e,n}
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
     */
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
     */const et=function(){const e=Qe(Ye);e.SDK_VERSION=`${e.SDK_VERSION}_LITE`;const t=e.INTERNAL.registerComponent;return e.INTERNAL.registerComponent=function(e){if("PUBLIC"===e.type&&!e.name.includes("performance")&&!e.name.includes("installations"))throw Error(`${name} cannot register with the standalone perf instance`);return t(e)},e}();$e("@firebase/app-compat","0.5.10","lite"),
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
et.registerVersion("firebase","12.11.0","app-compat");var tt,nt,rt=function(){var e=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(e&&e.responseStart>0&&e.responseStart<performance.now())return e},it=function(e){if("loading"===document.readyState)return"loading";var t=rt();if(t){if(e<t.domInteractive)return"loading";if(0===t.domContentLoadedEventStart||e<t.domContentLoadedEventStart)return"dom-interactive";if(0===t.domComplete||e<t.domComplete)return"dom-content-loaded"}return"complete"},at=function(e){var t=e.nodeName;return 1===e.nodeType?t.toLowerCase():t.toUpperCase().replace(/^#/,"")},ot=function(e,t){var n="";try{for(;e&&9!==e.nodeType;){var r=e,i=r.id?"#"+r.id:at(r)+(r.classList&&r.classList.value&&r.classList.value.trim()&&r.classList.value.trim().length?"."+r.classList.value.trim().replace(/\s+/g,"."):"");if(n.length+i.length>(t||100)-1)return n||i;if(n=n?i+">"+n:i,r.id)break;e=r.parentNode}}catch(e){}return n},st=-1,ct=function(e){addEventListener("pageshow",function(t){t.persisted&&(st=t.timeStamp,e(t))},!0)},lt=function(){var e=rt();return e&&e.activationStart||0},ut=function(e,t){var n=rt(),r="navigate";return st>=0?r="back-forward-cache":n&&(document.prerendering||lt()>0?r="prerender":document.wasDiscarded?r="restore":n.type&&(r=n.type.replace(/_/g,"-"))),{name:e,value:void 0===t?-1:t,rating:"good",delta:0,entries:[],id:"v4-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},ft=function(e,t,n){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver(function(e){Promise.resolve().then(function(){t(e.getEntries())})});return r.observe(Object.assign({type:e,buffered:!0},n||{})),r}}catch(e){}},dt=function(e,t,n,r){var i,a;return function(o){t.value>=0&&(o||r)&&((a=t.value-(i||0))||void 0===i)&&(i=t.value,t.delta=a,t.rating=function(e,t){return e>t[1]?"poor":e>t[0]?"needs-improvement":"good"}(t.value,n),e(t))}},pt=function(e){requestAnimationFrame(function(){return requestAnimationFrame(function(){return e()})})},ht=function(e){document.addEventListener("visibilitychange",function(){"hidden"===document.visibilityState&&e()})},gt=function(e){var t=!1;return function(){t||(e(),t=!0)}},mt=-1,bt=function(){return"hidden"!==document.visibilityState||document.prerendering?1/0:0},vt=function(e){"hidden"===document.visibilityState&&mt>-1&&(mt="visibilitychange"===e.type?e.timeStamp:0,_t())},yt=function(){addEventListener("visibilitychange",vt,!0),addEventListener("prerenderingchange",vt,!0)},_t=function(){removeEventListener("visibilitychange",vt,!0),removeEventListener("prerenderingchange",vt,!0)},wt=function(){return mt<0&&(mt=bt(),yt(),ct(function(){setTimeout(function(){mt=bt(),yt()},0)})),{get firstHiddenTime(){return mt}}},Et=function(e){document.prerendering?addEventListener("prerenderingchange",function(){return e()},!0):e()},St=[1800,3e3],It=[.1,.25],Tt=function(e,t){!function(e,t){t=t||{},function(e,t){t=t||{},Et(function(){var n,r=wt(),i=ut("FCP"),a=ft("paint",function(e){e.forEach(function(e){"first-contentful-paint"===e.name&&(a.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-lt(),0),i.entries.push(e),n(!0)))})});a&&(n=dt(e,i,St,t.reportAllChanges),ct(function(r){i=ut("FCP"),n=dt(e,i,St,t.reportAllChanges),pt(function(){i.value=performance.now()-r.timeStamp,n(!0)})}))})}(gt(function(){var n,r=ut("CLS",0),i=0,a=[],o=function(e){e.forEach(function(e){if(!e.hadRecentInput){var t=a[0],n=a[a.length-1];i&&e.startTime-n.startTime<1e3&&e.startTime-t.startTime<5e3?(i+=e.value,a.push(e)):(i=e.value,a=[e])}}),i>r.value&&(r.value=i,r.entries=a,n())},s=ft("layout-shift",o);s&&(n=dt(e,r,It,t.reportAllChanges),ht(function(){o(s.takeRecords()),n(!0)}),ct(function(){i=0,r=ut("CLS",0),n=dt(e,r,It,t.reportAllChanges),pt(function(){return n()})}),setTimeout(n,0))}))}(function(t){var n=function(e){var t,n={};if(e.entries.length){var r=e.entries.reduce(function(e,t){return e&&e.value>t.value?e:t});if(r&&r.sources&&r.sources.length){var i=(t=r.sources).find(function(e){return e.node&&1===e.node.nodeType})||t[0];i&&(n={largestShiftTarget:ot(i.node),largestShiftTime:r.startTime,largestShiftValue:r.value,largestShiftSource:i,largestShiftEntry:r,loadState:it(r.startTime)})}}return Object.assign(e,{attribution:n})}(t);e(n)},t)},Ct=0,At=1/0,Dt=0,kt=function(e){e.forEach(function(e){e.interactionId&&(At=Math.min(At,e.interactionId),Dt=Math.max(Dt,e.interactionId),Ct=Dt?(Dt-At)/7+1:0)})},Nt=function(){return tt?Ct:performance.interactionCount||0},Mt=[],Ot=new Map,Lt=0,Pt=[],Bt=function(e){if(Pt.forEach(function(t){return t(e)}),e.interactionId||"first-input"===e.entryType){var t=Mt[Mt.length-1],n=Ot.get(e.interactionId);if(n||Mt.length<10||e.duration>t.latency){if(n)e.duration>n.latency?(n.entries=[e],n.latency=e.duration):e.duration===n.latency&&e.startTime===n.entries[0].startTime&&n.entries.push(e);else{var r={id:e.interactionId,latency:e.duration,entries:[e]};Ot.set(r.id,r),Mt.push(r)}Mt.sort(function(e,t){return t.latency-e.latency}),Mt.length>10&&Mt.splice(10).forEach(function(e){return Ot.delete(e.id)})}}},Rt=function(e){var t=self.requestIdleCallback||self.setTimeout,n=-1;return e=gt(e),"hidden"===document.visibilityState?e():(n=t(e),ht(e)),n},Ft=[200,500],$t=function(e,t){"PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&(t=t||{},Et(function(){var n;"interactionCount"in performance||tt||(tt=ft("event",kt,{type:"event",buffered:!0,durationThreshold:0}));var r,i=ut("INP"),a=function(e){Rt(function(){e.forEach(Bt);var t=function(){var e=Math.min(Mt.length-1,Math.floor((Nt()-Lt)/50));return Mt[e]}();t&&t.latency!==i.value&&(i.value=t.latency,i.entries=t.entries,r())})},o=ft("event",a,{durationThreshold:null!==(n=t.durationThreshold)&&void 0!==n?n:40});r=dt(e,i,Ft,t.reportAllChanges),o&&(o.observe({type:"first-input",buffered:!0}),ht(function(){a(o.takeRecords()),r(!0)}),ct(function(){Lt=Nt(),Mt.length=0,Ot.clear(),i=ut("INP"),r=dt(e,i,Ft,t.reportAllChanges)}))}))},Ut=[],jt=[],xt=0,zt=new WeakMap,Vt=new Map,Ht=-1,qt=function(e){Ut=Ut.concat(e),Wt()},Wt=function(){Ht<0&&(Ht=Rt(Kt))},Kt=function(){Vt.size>10&&Vt.forEach(function(e,t){Ot.has(t)||Vt.delete(t)});var e=Mt.map(function(e){return zt.get(e.entries[0])}),t=jt.length-50;jt=jt.filter(function(n,r){return r>=t||e.includes(n)});for(var n=new Set,r=0;r<jt.length;r++){var i=jt[r];Jt(i.startTime,i.processingEnd).forEach(function(e){n.add(e)})}var a=Ut.length-1-50;Ut=Ut.filter(function(e,t){return e.startTime>xt&&t>a||n.has(e)}),Ht=-1};Pt.push(function(e){e.interactionId&&e.target&&!Vt.has(e.interactionId)&&Vt.set(e.interactionId,e.target)},function(e){var t,n=e.startTime+e.duration;xt=Math.max(xt,e.processingEnd);for(var r=jt.length-1;r>=0;r--){var i=jt[r];if(Math.abs(n-i.renderTime)<=8){(t=i).startTime=Math.min(e.startTime,t.startTime),t.processingStart=Math.min(e.processingStart,t.processingStart),t.processingEnd=Math.max(e.processingEnd,t.processingEnd),t.entries.push(e);break}}t||(t={startTime:e.startTime,processingStart:e.processingStart,processingEnd:e.processingEnd,renderTime:n,entries:[e]},jt.push(t)),(e.interactionId||"first-input"===e.entryType)&&zt.set(e,t),Wt()});var Jt=function(e,t){for(var n,r=[],i=0;n=Ut[i];i++)if(!(n.startTime+n.duration<e)){if(n.startTime>t)break;r.push(n)}return r},Gt=function(e,t){nt||(nt=ft("long-animation-frame",qt)),$t(function(t){var n=function(e){var t=e.entries[0],n=zt.get(t),r=t.processingStart,i=n.processingEnd,a=n.entries.sort(function(e,t){return e.processingStart-t.processingStart}),o=Jt(t.startTime,i),s=e.entries.find(function(e){return e.target}),c=s&&s.target||Vt.get(t.interactionId),l=[t.startTime+t.duration,i].concat(o.map(function(e){return e.startTime+e.duration})),u=Math.max.apply(Math,l),f={interactionTarget:ot(c),interactionTargetElement:c,interactionType:t.name.startsWith("key")?"keyboard":"pointer",interactionTime:t.startTime,nextPaintTime:u,processedEventEntries:a,longAnimationFrameEntries:o,inputDelay:r-t.startTime,processingDuration:i-r,presentationDelay:Math.max(u-i,0),loadState:it(t.startTime)};return Object.assign(e,{attribution:f})}(t);e(n)},t)},Xt=[2500,4e3],Yt={},Zt=function(e,t){!function(e,t){t=t||{},Et(function(){var n,r=wt(),i=ut("LCP"),a=function(e){t.reportAllChanges||(e=e.slice(-1)),e.forEach(function(e){e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-lt(),0),i.entries=[e],n())})},o=ft("largest-contentful-paint",a);if(o){n=dt(e,i,Xt,t.reportAllChanges);var s=gt(function(){Yt[i.id]||(a(o.takeRecords()),o.disconnect(),Yt[i.id]=!0,n(!0))});["keydown","click"].forEach(function(e){addEventListener(e,function(){return Rt(s)},{once:!0,capture:!0})}),ht(s),ct(function(r){i=ut("LCP"),n=dt(e,i,Xt,t.reportAllChanges),pt(function(){i.value=performance.now()-r.timeStamp,Yt[i.id]=!0,n(!0)})})}})}(function(t){var n=function(e){var t={timeToFirstByte:0,resourceLoadDelay:0,resourceLoadDuration:0,elementRenderDelay:e.value};if(e.entries.length){var n=rt();if(n){var r=n.activationStart||0,i=e.entries[e.entries.length-1],a=i.url&&performance.getEntriesByType("resource").filter(function(e){return e.name===i.url})[0],o=Math.max(0,n.responseStart-r),s=Math.max(o,a?(a.requestStart||a.startTime)-r:0),c=Math.max(s,a?a.responseEnd-r:0),l=Math.max(c,i.startTime-r);t={element:ot(i.element),timeToFirstByte:o,resourceLoadDelay:s-o,resourceLoadDuration:c-s,elementRenderDelay:l-c,navigationEntry:n,lcpEntry:i},i.url&&(t.url=i.url),a&&(t.lcpResourceEntry=a)}}return Object.assign(e,{attribution:t})}(t);e(n)},t)};const Qt="@firebase/installations",en="0.6.21",tn=`w:${en}`,nn="FIS_v2",rn=new p("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function an(e){return e instanceof d&&e.code.includes("request-failed")}
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
     */function on({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function sn(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function cn(e,t){const n=(await t.json()).error;return rn.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function ln({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function un(e){const t=await e();return t.status>=500&&t.status<600?e():t}
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
     */function fn(e){return new Promise(t=>{setTimeout(t,e)})}
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
     */
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
     */const dn=/^[cdef][\w-]{21}$/;function pn(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){var t;return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22)}
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
     */(e);return dn.test(t)?t:""}catch{return""}}function hn(e){return`${e.appName}!${e.appId}`
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
     */}const gn=new Map;function mn(e,t){const n=hn(e);bn(n,t),function(e,t){const n=(!vn&&"BroadcastChannel"in self&&(vn=new BroadcastChannel("[Firebase] FID Change"),vn.onmessage=e=>{bn(e.data.key,e.data.fid)}),vn);n&&n.postMessage({key:e,fid:t}),0===gn.size&&vn&&(vn.close(),vn=null)}(n,t)}function bn(e,t){const n=gn.get(e);if(n)for(const e of n)e(t)}let vn=null;
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
     */const yn="firebase-installations-store";let _n=null;function wn(){return _n||(_n=j("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(yn)}})),_n}async function En(e,t){const n=hn(e),r=(await wn()).transaction(yn,"readwrite"),i=r.objectStore(yn),a=await i.get(n);return await i.put(t,n),await r.done,a&&a.fid===t.fid||mn(e,t.fid),t}async function Sn(e){const t=hn(e),n=(await wn()).transaction(yn,"readwrite");await n.objectStore(yn).delete(t),await n.done}async function In(e,t){const n=hn(e),r=(await wn()).transaction(yn,"readwrite"),i=r.objectStore(yn),a=await i.get(n),o=t(a);return void 0===o?await i.delete(n):await i.put(o,n),await r.done,!o||a&&a.fid===o.fid||mn(e,o.fid),o}
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
     */async function Tn(e){let t;const n=await In(e.appConfig,n=>{const r=function(e){return Dn(e||{fid:pn(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(rn.create("app-offline"))};const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=on(e),i=ln(e),a=t.getImmediate({optional:!0});if(a){const e=await a.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={fid:n,authVersion:nn,appId:e.appId,sdkVersion:tn},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await un(()=>fetch(r,s));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:sn(e.authToken)}}throw await cn("Create Installation",c)}(e,t);return En(e.appConfig,n)}catch(n){throw an(n)&&409===n.customData.serverCode?await Sn(e.appConfig):await En(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Cn(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Cn(e){let t=await An(e.appConfig);for(;1===t.registrationStatus;)await fn(100),t=await An(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Tn(e);return n||t}return t}function An(e){return In(e,e=>{if(!e)throw rn.create("installation-not-found");return Dn(e)})}function Dn(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
     */}async function kn({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${on(e)}/${t}/authTokens:generate`
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
     */}(e,n),i=function(e,{refreshToken:t}){const n=ln(e);return n.append("Authorization",function(e){return`${nn} ${e}`
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
     */}(t)),n}(e,n),a=t.getImmediate({optional:!0});if(a){const e=await a.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={installation:{sdkVersion:tn,appId:e.appId}},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await un(()=>fetch(r,s));if(c.ok)return sn(await c.json());throw await cn("Generate Auth Token",c)}async function Nn(e,t=!1){let n;const r=await In(e.appConfig,r=>{if(!On(r))throw rn.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await Mn(e.appConfig);for(;1===n.authToken.requestStatus;)await fn(100),n=await Mn(e.appConfig);const r=n.authToken;return 0===r.requestStatus?Nn(e,t):r}(e,t),r;{if(!navigator.onLine)throw rn.create("app-offline");const t=function(e){return{...e,authToken:{requestStatus:1,requestTime:Date.now()}}}(r);return n=async function(e,t){try{const n=await kn(e,t),r={...t,authToken:n};return await En(e.appConfig,r),n}catch(n){if(!an(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await En(e.appConfig,n)}else await Sn(e.appConfig);throw n}}(e,t),t}});return n?await n:r.authToken}function Mn(e){return In(e,e=>{if(!On(e))throw rn.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?{...e,authToken:{requestStatus:0}}:e;var t;
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
     */})}function On(e){return void 0!==e&&2===e.registrationStatus}
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
     */function Ln(e){return rn.create("missing-app-config-values",{valueName:e})}
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
     */const Pn="installations";Ae(new v(Pn,e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw Ln("App Configuration");if(!e.name)throw Ln("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Ln(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:De(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),Ae(new v("installations-internal",e=>{const t=De(e.getProvider("app").getImmediate(),Pn).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await Tn(t);return r?r.catch(console.error):Nn(t).catch(console.error),n.fid}(t),getToken:e=>async function(e,t=!1){const n=e;return await async function(e){const{registrationPromise:t}=await Tn(e);t&&await t}
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
     */(n),(await Nn(n,t)).token}(t,e)}},"PRIVATE")),$e(Qt,en),$e(Qt,en,"esm2020");const Bn="@firebase/performance",Rn="0.7.11",Fn=Rn,$n="FB-PERF-TRACE-MEASURE",Un="_wt_",jn="_fcp",xn="_fid",zn="_lcp",Vn="_inp",Hn="_cls",qn="@firebase/performance/config",Wn="@firebase/performance/configexpire",Kn="Performance",Jn=new p("performance",Kn,{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),Gn=new D(Kn);
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
     */let Xn,Yn,Zn,Qn;Gn.logLevel=S.INFO;class er{constructor(e){if(this.window=e,!e)throw Jn.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay),this.onLCP=Zt,this.onINP=Gt,this.onCLS=Tt}getUrl(){return this.windowLocation.href.split("?")[0]}mark(e){this.performance&&this.performance.mark&&this.performance.mark(e)}measure(e,t,n){this.performance&&this.performance.measure&&this.performance.measure(e,t,n)}getEntriesByType(e){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(e):[]}getEntriesByName(e){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(e):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&"undefined"!=typeof navigator&&navigator.cookieEnabled?!!u()||(Gn.info("IndexedDB is not supported by current browser"),!1):(Gn.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(e,t){this.PerformanceObserver&&new this.PerformanceObserver(e=>{for(const n of e.getEntries())t(n)}).observe({entryTypes:[e]})}static getInstance(){return void 0===Xn&&(Xn=new er(Yn)),Xn}}function tr(){return Zn}
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
     */function nr(e,t){const n=e.length-t.length;if(n<0||n>1)throw Jn.create("invalid String merger input");const r=[];for(let n=0;n<e.length;n++)r.push(e.charAt(n)),t.length>n&&r.push(t.charAt(n));return r.join("")}
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
     */class rr{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=nr("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=nr("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12,this.logMaxFlushSize=40}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===Qn&&(Qn=new rr),Qn
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
     */}}var ir;!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.VISIBLE=1]="VISIBLE",e[e.HIDDEN=2]="HIDDEN"}(ir||(ir={}));const ar=["firebase_","google_","ga_"],or=new RegExp("^[a-zA-Z]\\w*$");function sr(){const e=er.getInstance().navigator;return e?.serviceWorker?e.serviceWorker.controller?2:3:1}function cr(){switch(er.getInstance().document.visibilityState){case"visible":return ir.VISIBLE;case"hidden":return ir.HIDDEN;default:return ir.UNKNOWN}}function lr(){const e=er.getInstance().navigator.connection;switch(e&&e.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}
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
     */function ur(e){const t=e.options?.appId;if(!t)throw Jn.create("no app id");return t}
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
     */const fr={loggingEnabled:!0};const dr="Could not fetch config, will use default configs";function pr(e){if(!e)return e;const t=rr.getInstance(),n=e.entries||{};return void 0!==n.fpr_enabled?t.loggingEnabled="true"===String(n.fpr_enabled):t.loggingEnabled=fr.loggingEnabled,n.fpr_log_source?t.logSource=Number(n.fpr_log_source):fr.logSource&&(t.logSource=fr.logSource),n.fpr_log_endpoint_url?t.logEndPointUrl=n.fpr_log_endpoint_url:fr.logEndPointUrl&&(t.logEndPointUrl=fr.logEndPointUrl),n.fpr_log_transport_key?t.transportKey=n.fpr_log_transport_key:fr.transportKey&&(t.transportKey=fr.transportKey),void 0!==n.fpr_vc_network_request_sampling_rate?t.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate):void 0!==fr.networkRequestsSamplingRate&&(t.networkRequestsSamplingRate=fr.networkRequestsSamplingRate),void 0!==n.fpr_vc_trace_sampling_rate?t.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate):void 0!==fr.tracesSamplingRate&&(t.tracesSamplingRate=fr.tracesSamplingRate),n.fpr_log_max_flush_size?t.logMaxFlushSize=Number(n.fpr_log_max_flush_size):fr.logMaxFlushSize&&(t.logMaxFlushSize=fr.logMaxFlushSize),t.logTraceAfterSampling=hr(t.tracesSamplingRate),t.logNetworkAfterSampling=hr(t.networkRequestsSamplingRate),e}function hr(e){return Math.random()<=e}
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
     */let gr,mr=1;function br(e){return mr=2,gr=gr||function(e){return function(){const e=er.getInstance().document;return new Promise(t=>{if(e&&"complete"!==e.readyState){const n=()=>{"complete"===e.readyState&&(e.removeEventListener("readystatechange",n),t())};e.addEventListener("readystatechange",n)}else t()})}().then(()=>function(e){const t=e.getId();return t.then(e=>{Zn=e}),t}(e.installations)).then(t=>function(e,t){const n=function(){const e=er.getInstance().localStorage;if(!e)return;const t=e.getItem(Wn);if(!(t&&(n=t,Number(n)>Date.now())))return;var n;const r=e.getItem(qn);if(r)try{return JSON.parse(r)}catch{return}}();return n?(pr(n),Promise.resolve()):function(e,t){return function(e){const t=e.getToken();return t.then(e=>{}),t}(e.installations).then(n=>{const r=function(e){const t=e.options?.projectId;if(!t)throw Jn.create("no project id");return t}(e.app),i=function(e){const t=e.options?.apiKey;if(!t)throw Jn.create("no api key");return t}(e.app),a=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`,{method:"POST",headers:{Authorization:`FIREBASE_INSTALLATIONS_AUTH ${n}`},body:JSON.stringify({app_instance_id:t,app_instance_id_token:n,app_id:ur(e.app),app_version:Fn,sdk_version:"0.0.1"})});return fetch(a).then(e=>{if(e.ok)return e.json();throw Jn.create("RC response not ok")})}).catch(()=>{Gn.info(dr)})}(e,t).then(pr).then(e=>function(e){const t=er.getInstance().localStorage;e&&t&&(t.setItem(qn,JSON.stringify(e)),t.setItem(Wn,String(Date.now()+60*rr.getInstance().configTimeToLive*60*1e3)))}(e),()=>{})}(e,t)).then(()=>vr(),()=>vr())}(e),gr}function vr(){mr=3}
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
     */const yr=new TextEncoder;let _r,wr=3,Er=[],Sr=!1;function Ir(e){setTimeout(()=>{wr<=0||(Er.length>0&&function(){const e=Er.splice(0,1e3);(function(e){const t=rr.getInstance().getFlTransportFullUrl();return yr.encode(e).length<=65536&&navigator.sendBeacon&&navigator.sendBeacon(t,e)?Promise.resolve():fetch(t,{method:"POST",body:e})})(Tr(e)).then(()=>{wr=3}).catch(()=>{Er=[...e,...Er],wr--,Gn.info(`Tries left: ${wr}.`),Ir(1e4)})}(),Ir(1e4))},e)}function Tr(e){const t=e.map(e=>({source_extension_json_proto3:e.message,event_time_ms:String(e.eventTime)})),n={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:rr.getInstance().logSource,log_event:t};return JSON.stringify(n)}function Cr(e){return(...t)=>{!function(e){if(!e.eventTime||!e.message)throw Jn.create("invalid cc log");Er=[...Er,e]}({message:e(...t),eventTime:Date.now()})}}function Ar(){const e=rr.getInstance().getFlTransportFullUrl();for(;Er.length>0;){const t=Er.splice(-rr.getInstance().logMaxFlushSize),n=Tr(t);if(!navigator.sendBeacon||!navigator.sendBeacon(e,n)){Er=[...Er,...t];break}}if(Er.length>0){const t=Tr(Er);fetch(e,{method:"POST",body:t}).catch(()=>{Gn.info("Failed flushing queued events.")})}}
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
     */function Dr(e,t){_r||(_r={send:Cr(Mr),flush:Ar}),_r.send(e,t)}function kr(e){const t=rr.getInstance();!t.instrumentationEnabled&&e.isAuto||(t.dataCollectionEnabled||e.isAuto)&&er.getInstance().requiredApisAvailable()&&(3===mr?Nr(e):br(e.performanceController).then(()=>Nr(e),()=>Nr(e)))}function Nr(e){if(!tr())return;const t=rr.getInstance();t.loggingEnabled&&t.logTraceAfterSampling&&Dr(e,1)}function Mr(e,t){return 0===t?function(e){const t={url:e.url,http_method:e.httpMethod||0,http_response_code:200,response_payload_bytes:e.responsePayloadBytes,client_start_time_us:e.startTimeUs,time_to_response_initiated_us:e.timeToResponseInitiatedUs,time_to_response_completed_us:e.timeToResponseCompletedUs},n={application_info:Or(e.performanceController.app),network_request_metric:t};return JSON.stringify(n)}(e):function(e){const t={name:e.name,is_auto:e.isAuto,client_start_time_us:e.startTimeUs,duration_us:e.durationUs};0!==Object.keys(e.counters).length&&(t.counters=e.counters);const n=e.getAttributes();0!==Object.keys(n).length&&(t.custom_attributes=n);const r={application_info:Or(e.performanceController.app),trace_metric:t};return JSON.stringify(r)}(e)}function Or(e){return{google_app_id:ur(e),app_instance_id:tr(),web_app_info:{sdk_version:Fn,page_url:er.getInstance().getUrl(),service_worker_status:sr(),visibility_state:cr(),effective_connection_type:lr()},application_process_state:0}}
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
     */function Lr(e,t){const n=t;if(!n||void 0===n.responseStart)return;const r=er.getInstance().getTimeOrigin(),i=Math.floor(1e3*(n.startTime+r)),a=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,o=Math.floor(1e3*(n.responseEnd-n.startTime));!function(e){const t=rr.getInstance();if(!t.instrumentationEnabled)return;const n=e.url,r=t.logEndPointUrl.split("?")[0],i=t.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&t.loggingEnabled&&t.logNetworkAfterSampling&&Dr(e,0)}({performanceController:e,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:a,timeToResponseCompletedUs:o})}
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
     */const Pr=["_fp",jn,xn,zn,Hn,Vn];
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
     */class Br{constructor(e,t,n=!1,r){this.performanceController=e,this.name=t,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=er.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`${$n}-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw Jn.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw Jn.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),kr(this)}record(e,t,n){if(e<=0)throw Jn.create("nonpositive trace startTime",{traceName:this.name});if(t<=0)throw Jn.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*t),this.startTimeUs=Math.floor(1e3*e),n&&n.attributes&&(this.customAttributes={...n.attributes}),n&&n.metrics)for(const e of Object.keys(n.metrics))isNaN(Number(n.metrics[e]))||(this.counters[e]=Math.floor(Number(n.metrics[e])));kr(this)}incrementMetric(e,t=1){void 0===this.counters[e]?this.putMetric(e,t):this.putMetric(e,this.counters[e]+t)}putMetric(e,t){if(!function(e,t){return!(0===e.length||e.length>100)&&(t&&t.startsWith(Un)&&Pr.indexOf(e)>-1||!e.startsWith("_"))}(e,this.name))throw Jn.create("invalid custom metric name",{customMetricName:e});this.counters[e]=function(e){const t=Math.floor(e);return t<e&&Gn.info(`Metric value should be an Integer, setting the value as : ${t}.`),t}(t??0)}getMetric(e){return this.counters[e]||0}putAttribute(e,t){const n=function(e){return!(0===e.length||e.length>40||ar.some(t=>e.startsWith(t))||!e.match(or))}(e),r=function(e){return 0!==e.length&&e.length<=100}(t);if(n&&r)this.customAttributes[e]=t;else{if(!n)throw Jn.create("invalid attribute name",{attributeName:e});if(!r)throw Jn.create("invalid attribute value",{attributeValue:t})}}getAttribute(e){return this.customAttributes[e]}removeAttribute(e){void 0!==this.customAttributes[e]&&delete this.customAttributes[e]}getAttributes(){return{...this.customAttributes}}setStartTime(e){this.startTimeUs=e}setDuration(e){this.durationUs=e}calculateTraceMetrics(){const e=this.api.getEntriesByName(this.traceMeasure),t=e&&e[0];t&&(this.durationUs=Math.floor(1e3*t.duration),this.startTimeUs=Math.floor(1e3*(t.startTime+this.api.getTimeOrigin())))}static createOobTrace(e,t,n,r,i){const a=er.getInstance().getUrl();if(!a)return;const o=new Br(e,Un+a,!0),s=Math.floor(1e3*er.getInstance().getTimeOrigin());if(o.setStartTime(s),t&&t[0]&&(o.setDuration(Math.floor(1e3*t[0].duration)),o.putMetric("domInteractive",Math.floor(1e3*t[0].domInteractive)),o.putMetric("domContentLoadedEventEnd",Math.floor(1e3*t[0].domContentLoadedEventEnd)),o.putMetric("loadEventEnd",Math.floor(1e3*t[0].loadEventEnd))),n){const e=n.find(e=>"first-paint"===e.name);e&&e.startTime&&o.putMetric("_fp",Math.floor(1e3*e.startTime));const t=n.find(e=>"first-contentful-paint"===e.name);t&&t.startTime&&o.putMetric(jn,Math.floor(1e3*t.startTime)),i&&o.putMetric(xn,Math.floor(1e3*i))}this.addWebVitalMetric(o,zn,"lcp_element",r.lcp),this.addWebVitalMetric(o,Hn,"cls_largestShiftTarget",r.cls),this.addWebVitalMetric(o,Vn,"inp_interactionTarget",r.inp),kr(o),_r&&_r.flush()}static addWebVitalMetric(e,t,n,r){r&&(e.putMetric(t,Math.floor(1e3*r.value)),r.elementAttribution&&(r.elementAttribution.length>100?e.putAttribute(n,r.elementAttribution.substring(0,100)):e.putAttribute(n,r.elementAttribution)))}static createUserTimingTrace(e,t){kr(new Br(e,t,!1,t))}}
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
     */let Rr,Fr={},$r=!1;function Ur(e){tr()&&(setTimeout(()=>function(e){const t=er.getInstance();"onpagehide"in window?t.document.addEventListener("pagehide",()=>xr(e)):t.document.addEventListener("unload",()=>xr(e)),t.document.addEventListener("visibilitychange",()=>{"hidden"===t.document.visibilityState&&xr(e)}),t.onFirstInputDelay&&t.onFirstInputDelay(e=>{Rr=e}),t.onLCP(e=>{Fr.lcp={value:e.value,elementAttribution:e.attribution?.element}}),t.onCLS(e=>{Fr.cls={value:e.value,elementAttribution:e.attribution?.largestShiftTarget}}),t.onINP(e=>{Fr.inp={value:e.value,elementAttribution:e.attribution?.interactionTarget}})}(e),0),setTimeout(()=>function(e){const t=er.getInstance(),n=t.getEntriesByType("resource");for(const t of n)Lr(e,t);t.setupObserver("resource",t=>Lr(e,t))}(e),0),setTimeout(()=>function(e){const t=er.getInstance(),n=t.getEntriesByType("measure");for(const t of n)jr(e,t);t.setupObserver("measure",t=>jr(e,t))}(e),0))}function jr(e,t){const n=t.name;n.substring(0,21)!==$n&&Br.createUserTimingTrace(e,n)}function xr(e){if(!$r){$r=!0;const t=er.getInstance(),n=t.getEntriesByType("navigation"),r=t.getEntriesByType("paint");setTimeout(()=>{Br.createOobTrace(e,n,r,Fr,Rr)},0)}}
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
     */class zr{constructor(e,t){this.app=e,this.installations=t,this.initialized=!1}_init(e){this.initialized||(void 0!==e?.dataCollectionEnabled&&(this.dataCollectionEnabled=e.dataCollectionEnabled),void 0!==e?.instrumentationEnabled&&(this.instrumentationEnabled=e.instrumentationEnabled),er.getInstance().requiredApisAvailable()?f().then(e=>{e&&(Sr||(Ir(5500),Sr=!0),br(this).then(()=>Ur(this),()=>Ur(this)),this.initialized=!0)}).catch(e=>{Gn.info(`Environment doesn't support IndexedDB: ${e}`)}):Gn.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(e){rr.getInstance().instrumentationEnabled=e}get instrumentationEnabled(){return rr.getInstance().instrumentationEnabled}set dataCollectionEnabled(e){rr.getInstance().dataCollectionEnabled=e}get dataCollectionEnabled(){return rr.getInstance().dataCollectionEnabled}}Ae(new v("performance",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==n.name)throw Jn.create("FB not default");if("undefined"==typeof window)throw Jn.create("no window");!function(e){Yn=e}
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
     */(window);const i=new zr(n,r);return i._init(t),i},"PUBLIC")),$e(Bn,Rn),$e(Bn,Rn,"esm2020");
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
class Vr{constructor(e,t){this.app=e,this._delegate=t}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(e){this._delegate.instrumentationEnabled=e}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(e){this._delegate.dataCollectionEnabled=e}trace(e){return function(e,t){var n;return e=(n=e)&&n._delegate?n._delegate:n,new Br(e,t)}(this._delegate,e)}}
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
var Hr;
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
     */
return(Hr=et).INTERNAL.registerComponent(new v("performance-compat",function(e){const t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("performance").getImmediate();return new Vr(t,n)},"PUBLIC")),Hr.registerVersion("@firebase/performance-compat","0.2.24"),et.registerVersion("firebase","12.11.0","compat-lite"),et});