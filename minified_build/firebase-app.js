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
const getDefaultsFromPostinstall=()=>{},stringToByteArray$1=function(e){const t=[];let r=0;for(let n=0;n<e.length;n++){let a=e.charCodeAt(n);a<128?t[r++]=a:a<2048?(t[r++]=a>>6|192,t[r++]=63&a|128):55296==(64512&a)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(a=65536+((1023&a)<<10)+(1023&e.charCodeAt(++n)),t[r++]=a>>18|240,t[r++]=a>>12&63|128,t[r++]=a>>6&63|128,t[r++]=63&a|128):(t[r++]=a>>12|224,t[r++]=a>>6&63|128,t[r++]=63&a|128)}return t},byteArrayToString=function(e){const t=[];let r=0,n=0;for(;r<e.length;){const a=e[r++];if(a<128)t[n++]=String.fromCharCode(a);else if(a>191&&a<224){const o=e[r++];t[n++]=String.fromCharCode((31&a)<<6|63&o)}else if(a>239&&a<365){const o=((7&a)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(o>>10)),t[n++]=String.fromCharCode(56320+(1023&o))}else{const o=e[r++],i=e[r++];t[n++]=String.fromCharCode((15&a)<<12|(63&o)<<6|63&i)}}return t.join("")},base64={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){const a=e[t],o=t+1<e.length,i=o?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=a>>2,h=(3&a)<<4|i>>4;let p=(15&i)<<2|c>>6,d=63&c;s||(d=64,o||(p=64)),n.push(r[l],r[h],r[p],r[d])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(stringToByteArray$1(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):byteArrayToString(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){const a=r[e.charAt(t++)],o=t<e.length?r[e.charAt(t)]:0;++t;const i=t<e.length?r[e.charAt(t)]:64;++t;const s=t<e.length?r[e.charAt(t)]:64;if(++t,null==a||null==o||null==i||null==s)throw new DecodeBase64StringError;const c=a<<2|o>>4;if(n.push(c),64!==i){const e=o<<4&240|i>>2;if(n.push(e),64!==s){const e=i<<6&192|s;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DecodeBase64StringError extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const base64Encode=function(e){const t=stringToByteArray$1(e);return base64.encodeByteArray(t,!0)},base64urlEncodeWithoutPadding=function(e){return base64Encode(e).replace(/\./g,"")},base64Decode=function(e){try{return base64.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
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
function getGlobal(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
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
 */const getDefaultsFromGlobal=()=>getGlobal().__FIREBASE_DEFAULTS__,getDefaultsFromEnvVariable=()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},getDefaultsFromCookie=()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&base64Decode(e[1]);return t&&JSON.parse(t)},getDefaults=()=>{try{return getDefaultsFromPostinstall()||getDefaultsFromGlobal()||getDefaultsFromEnvVariable()||getDefaultsFromCookie()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},getDefaultAppConfig=()=>getDefaults()?.config;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
class Deferred{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}}function isBrowser(){return"undefined"!=typeof window||isWebWorker()}function isWebWorker(){return"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function isIndexedDBAvailable(){try{return"object"==typeof indexedDB}catch(e){return!1}}function validateIndexedDBOpenable(){return new Promise((e,t)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(n);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{t(a.error?.message||"")}}catch(e){t(e)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ERROR_NAME="FirebaseError";class FirebaseError extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ERROR_NAME,Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},n=`${this.service}/${e}`,a=this.errors[e],o=a?replaceTemplate(a,r):"Error",i=`${this.serviceName}: ${o} (${n}).`;return new FirebaseError(n,i,r)}}function replaceTemplate(e,t){return e.replace(PATTERN,(e,r)=>{const n=t[r];return null!=n?String(n):`<${r}?>`})}const PATTERN=/\{\$([^}]+)}/g;function deepEqual(e,t){if(e===t)return!0;const r=Object.keys(e),n=Object.keys(t);for(const a of r){if(!n.includes(a))return!1;const r=e[a],o=t[a];if(isObject(r)&&isObject(o)){if(!deepEqual(r,o))return!1}else if(r!==o)return!1}for(const e of n)if(!r.includes(e))return!1;return!0}function isObject(e){return null!==e&&"object"==typeof e}class Component{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
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
 */const DEFAULT_ENTRY_NAME$1="[DEFAULT]";
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
 */class Provider{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new Deferred;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(isComponentEager(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[e,t]of this.instancesDeferred.entries()){r===this.normalizeInstanceIdentifier(e)&&t.resolve(n)}return n}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),n=this.onInitCallbacks.get(r)??new Set;n.add(e),this.onInitCallbacks.set(r,n);const a=this.instances.get(r);return a&&e(a,r),()=>{n.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const n of r)try{n(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:normalizeIdentifierForFactory(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function normalizeIdentifierForFactory(e){return"[DEFAULT]"===e?void 0:e}function isComponentEager(e){return"EAGER"===e.instantiationMode}
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
 */class ComponentContainer{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Provider(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const instances=[];var LogLevel;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(LogLevel||(LogLevel={}));const levelStringToEnum={debug:LogLevel.DEBUG,verbose:LogLevel.VERBOSE,info:LogLevel.INFO,warn:LogLevel.WARN,error:LogLevel.ERROR,silent:LogLevel.SILENT},defaultLogLevel=LogLevel.INFO,ConsoleMethod={[LogLevel.DEBUG]:"log",[LogLevel.VERBOSE]:"log",[LogLevel.INFO]:"info",[LogLevel.WARN]:"warn",[LogLevel.ERROR]:"error"},defaultLogHandler=(e,t,...r)=>{if(t<e.logLevel)return;const n=(new Date).toISOString(),a=ConsoleMethod[t];if(!a)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[a](`[${n}]  ${e.name}:`,...r)};class Logger{constructor(e){this.name=e,this._logLevel=defaultLogLevel,this._logHandler=defaultLogHandler,this._userLogHandler=null,instances.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in LogLevel))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?levelStringToEnum[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.DEBUG,...e),this._logHandler(this,LogLevel.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.VERBOSE,...e),this._logHandler(this,LogLevel.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.INFO,...e),this._logHandler(this,LogLevel.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.WARN,...e),this._logHandler(this,LogLevel.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,LogLevel.ERROR,...e),this._logHandler(this,LogLevel.ERROR,...e)}}function setLogLevel$1(e){instances.forEach(t=>{t.setLogLevel(e)})}function setUserLogHandler(e,t){for(const r of instances){let n=null;t&&t.level&&(n=levelStringToEnum[t.level]),r.userLogHandler=null===e?null:(t,r,...a)=>{const o=a.map(e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(e=>e).join(" ");r>=(n??t.logLevel)&&e({level:LogLevel[r].toLowerCase(),message:o,args:a,type:t.name})}}}const instanceOfAny=(e,t)=>t.some(t=>e instanceof t);let idbProxyableTypes,cursorAdvanceMethods;function getIdbProxyableTypes(){return idbProxyableTypes||(idbProxyableTypes=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function getCursorAdvanceMethods(){return cursorAdvanceMethods||(cursorAdvanceMethods=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cursorRequestMap=new WeakMap,transactionDoneMap=new WeakMap,transactionStoreNamesMap=new WeakMap,transformCache=new WeakMap,reverseTransformCache=new WeakMap;function promisifyRequest(e){const t=new Promise((t,r)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",o)},a=()=>{t(wrap(e.result)),n()},o=()=>{r(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",o)});return t.then(t=>{t instanceof IDBCursor&&cursorRequestMap.set(t,e)}).catch(()=>{}),reverseTransformCache.set(t,e),t}function cacheDonePromiseForTransaction(e){if(transactionDoneMap.has(e))return;const t=new Promise((t,r)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",o),e.removeEventListener("abort",o)},a=()=>{t(),n()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",o),e.addEventListener("abort",o)});transactionDoneMap.set(e,t)}let idbProxyTraps={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return transactionDoneMap.get(e);if("objectStoreNames"===t)return e.objectStoreNames||transactionStoreNamesMap.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return wrap(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function replaceTraps(e){idbProxyTraps=e(idbProxyTraps)}function wrapFunction(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?getCursorAdvanceMethods().includes(e)?function(...t){return e.apply(unwrap(this),t),wrap(cursorRequestMap.get(this))}:function(...t){return wrap(e.apply(unwrap(this),t))}:function(t,...r){const n=e.call(unwrap(this),t,...r);return transactionStoreNamesMap.set(n,t.sort?t.sort():[t]),wrap(n)}}function transformCachableValue(e){return"function"==typeof e?wrapFunction(e):(e instanceof IDBTransaction&&cacheDonePromiseForTransaction(e),instanceOfAny(e,getIdbProxyableTypes())?new Proxy(e,idbProxyTraps):e)}function wrap(e){if(e instanceof IDBRequest)return promisifyRequest(e);if(transformCache.has(e))return transformCache.get(e);const t=transformCachableValue(e);return t!==e&&(transformCache.set(e,t),reverseTransformCache.set(t,e)),t}const unwrap=e=>reverseTransformCache.get(e);function openDB(e,t,{blocked:r,upgrade:n,blocking:a,terminated:o}={}){const i=indexedDB.open(e,t),s=wrap(i);return n&&i.addEventListener("upgradeneeded",e=>{n(wrap(i.result),e.oldVersion,e.newVersion,wrap(i.transaction),e)}),r&&i.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),s.then(e=>{o&&e.addEventListener("close",()=>o()),a&&e.addEventListener("versionchange",e=>a(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}const readMethods=["get","getKey","getAll","getAllKeys","count"],writeMethods=["put","add","delete","clear"],cachedMethods=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(cachedMethods.get(t))return cachedMethods.get(t);const r=t.replace(/FromIndex$/,""),n=t!==r,a=writeMethods.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!readMethods.includes(r))return;const o=async function(e,...t){const o=this.transaction(e,a?"readwrite":"readonly");let i=o.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[r](...t),a&&o.done]))[0]};return cachedMethods.set(t,o),o}replaceTraps(e=>({...e,get:(t,r,n)=>getMethod(t,r)||e.get(t,r,n),has:(t,r)=>!!getMethod(t,r)||e.has(t,r)}));
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
class PlatformLoggerServiceImpl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(isVersionServiceProvider(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function isVersionServiceProvider(e){const t=e.getComponent();return"VERSION"===t?.type}const name$q="https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js",version$1="0.14.10",logger=new Logger("https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js"),name$p="@firebase/app-compat",name$o="@firebase/analytics-compat",name$n="@firebase/analytics",name$m="@firebase/app-check-compat",name$l="@firebase/app-check",name$k="@firebase/auth",name$j="@firebase/auth-compat",name$i="@firebase/database",name$h="@firebase/data-connect",name$g="@firebase/database-compat",name$f="@firebase/functions",name$e="@firebase/functions-compat",name$d="@firebase/installations",name$c="@firebase/installations-compat",name$b="@firebase/messaging",name$a="@firebase/messaging-compat",name$9="@firebase/performance",name$8="@firebase/performance-compat",name$7="@firebase/remote-config",name$6="@firebase/remote-config-compat",name$5="@firebase/storage",name$4="@firebase/storage-compat",name$3="@firebase/firestore",name$2="@firebase/ai",name$1="@firebase/firestore-compat",name$r="firebase",version$2="12.11.0",DEFAULT_ENTRY_NAME="[DEFAULT]",PLATFORM_LOG_STRING={[name$q]:"fire-core",[name$p]:"fire-core-compat",[name$n]:"fire-analytics",[name$o]:"fire-analytics-compat",[name$l]:"fire-app-check",[name$m]:"fire-app-check-compat",[name$k]:"fire-auth",[name$j]:"fire-auth-compat",[name$i]:"fire-rtdb",[name$h]:"fire-data-connect",[name$g]:"fire-rtdb-compat",[name$f]:"fire-fn",[name$e]:"fire-fn-compat",[name$d]:"fire-iid",[name$c]:"fire-iid-compat",[name$b]:"fire-fcm",[name$a]:"fire-fcm-compat",[name$9]:"fire-perf",[name$8]:"fire-perf-compat",[name$7]:"fire-rc",[name$6]:"fire-rc-compat",[name$5]:"fire-gcs",[name$4]:"fire-gcs-compat",[name$3]:"fire-fst",[name$1]:"fire-fst-compat",[name$2]:"fire-vertex","fire-js":"fire-js",[name$r]:"fire-js-all"},_apps=new Map,_serverApps=new Map,_components=new Map;function _addComponent(e,t){try{e.container.addComponent(t)}catch(r){logger.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function _addOrOverwriteComponent(e,t){e.container.addOrOverwriteComponent(t)}function _registerComponent(e){const t=e.name;if(_components.has(t))return logger.debug(`There were multiple attempts to register component ${t}.`),!1;_components.set(t,e);for(const t of _apps.values())_addComponent(t,e);for(const t of _serverApps.values())_addComponent(t,e);return!0}function _getProvider(e,t){const r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}function _removeServiceInstance(e,t,r="[DEFAULT]"){_getProvider(e,t).clearInstance(r)}function _isFirebaseApp(e){return void 0!==e.options}function _isFirebaseServerAppSettings(e){return!_isFirebaseApp(e)&&("authIdToken"in e||"appCheckToken"in e||"releaseOnDeref"in e||"automaticDataCollectionEnabled"in e)}function _isFirebaseServerApp(e){return null!=e&&void 0!==e.settings}function _clearComponents(){_components.clear()}
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
 */const ERRORS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ERROR_FACTORY=new ErrorFactory("app","Firebase",ERRORS);
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
class FirebaseAppImpl{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ERROR_FACTORY.create("app-deleted",{appName:this._name})}}
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
 */function validateTokenTTL(e,t){const r=base64Decode(e.split(".")[1]);if(null===r)return void console.error(`FirebaseServerApp ${t} is invalid: second part could not be parsed.`);if(void 0===JSON.parse(r).exp)return void console.error(`FirebaseServerApp ${t} is invalid: expiration claim could not be parsed`);1e3*JSON.parse(r).exp-(new Date).getTime()<=0&&console.error(`FirebaseServerApp ${t} is invalid: the token has expired.`)}class FirebaseServerAppImpl extends FirebaseAppImpl{constructor(e,t,r,n){const a=void 0===t.automaticDataCollectionEnabled||t.automaticDataCollectionEnabled,o={name:r,automaticDataCollectionEnabled:a};if(void 0!==e.apiKey)super(e,o,n);else{super(e.options,o,n)}this._serverConfig={automaticDataCollectionEnabled:a,...t},this._serverConfig.authIdToken&&validateTokenTTL(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&validateTokenTTL(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,"undefined"!=typeof FinalizationRegistry&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,registerVersion(name$q,"0.14.10","serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,void 0!==e&&null!==this._finalizationRegistry&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){deleteApp(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw ERROR_FACTORY.create("server-app-deleted")}}
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
 */const SDK_VERSION="12.11.0";function initializeApp(e,t={}){let r=e;if("object"!=typeof t){t={name:t}}const n={name:"[DEFAULT]",automaticDataCollectionEnabled:!0,...t},a=n.name;if("string"!=typeof a||!a)throw ERROR_FACTORY.create("bad-app-name",{appName:String(a)});if(r||(r=getDefaultAppConfig()),!r)throw ERROR_FACTORY.create("no-options");const o=_apps.get(a);if(o){if(deepEqual(r,o.options)&&deepEqual(n,o.config))return o;throw ERROR_FACTORY.create("duplicate-app",{appName:a})}const i=new ComponentContainer(a);for(const e of _components.values())i.addComponent(e);const s=new FirebaseAppImpl(r,n,i);return _apps.set(a,s),s}function initializeServerApp(e,t={}){if(isBrowser()&&!isWebWorker())throw ERROR_FACTORY.create("invalid-server-app-environment");let r,n=t||{};if(e&&(_isFirebaseApp(e)?r=e.options:_isFirebaseServerAppSettings(e)?n=e:r=e),void 0===n.automaticDataCollectionEnabled&&(n.automaticDataCollectionEnabled=!0),r||(r=getDefaultAppConfig()),!r)throw ERROR_FACTORY.create("no-options");const a={...n,...r};void 0!==a.releaseOnDeref&&delete a.releaseOnDeref;if(void 0!==n.releaseOnDeref&&"undefined"==typeof FinalizationRegistry)throw ERROR_FACTORY.create("finalization-registry-not-supported",{});const o=""+(i=JSON.stringify(a),[...i].reduce((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0,0));var i;const s=_serverApps.get(o);if(s)return s.incRefCount(n.releaseOnDeref),s;const c=new ComponentContainer(o);for(const e of _components.values())c.addComponent(e);const l=new FirebaseServerAppImpl(r,n,o,c);return _serverApps.set(o,l),l}function getApp(e="[DEFAULT]"){const t=_apps.get(e);if(!t&&"[DEFAULT]"===e&&getDefaultAppConfig())return initializeApp();if(!t)throw ERROR_FACTORY.create("no-app",{appName:e});return t}function getApps(){return Array.from(_apps.values())}async function deleteApp(e){let t=!1;const r=e.name;if(_apps.has(r))t=!0,_apps.delete(r);else if(_serverApps.has(r)){e.decRefCount()<=0&&(_serverApps.delete(r),t=!0)}t&&(await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function registerVersion(e,t,r){let n=PLATFORM_LOG_STRING[e]??e;r&&(n+=`-${r}`);const a=n.match(/\s|\//),o=t.match(/\s|\//);if(a||o){const e=[`Unable to register library "${n}" with version "${t}":`];return a&&e.push(`library name "${n}" contains illegal characters (whitespace or "/")`),a&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void logger.warn(e.join(" "))}_registerComponent(new Component(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}function onLog(e,t){if(null!==e&&"function"!=typeof e)throw ERROR_FACTORY.create("invalid-log-argument");setUserLogHandler(e,t)}function setLogLevel(e){setLogLevel$1(e)}
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
 */const DB_NAME="firebase-heartbeat-database",DB_VERSION=1,STORE_NAME="firebase-heartbeat-store";let dbPromise=null;function getDbPromise(){return dbPromise||(dbPromise=openDB(DB_NAME,1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(STORE_NAME)}catch(e){console.warn(e)}}}).catch(e=>{throw ERROR_FACTORY.create("idb-open",{originalErrorMessage:e.message})})),dbPromise}async function readHeartbeatsFromIndexedDB(e){try{const t=(await getDbPromise()).transaction(STORE_NAME),r=await t.objectStore(STORE_NAME).get(computeKey(e));return await t.done,r}catch(e){if(e instanceof FirebaseError)logger.warn(e.message);else{const t=ERROR_FACTORY.create("idb-get",{originalErrorMessage:e?.message});logger.warn(t.message)}}}async function writeHeartbeatsToIndexedDB(e,t){try{const r=(await getDbPromise()).transaction(STORE_NAME,"readwrite"),n=r.objectStore(STORE_NAME);await n.put(t,computeKey(e)),await r.done}catch(e){if(e instanceof FirebaseError)logger.warn(e.message);else{const t=ERROR_FACTORY.create("idb-set",{originalErrorMessage:e?.message});logger.warn(t.message)}}}function computeKey(e){return`${e.name}!${e.options.appId}`}
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
 */const MAX_HEADER_BYTES=1024,MAX_NUM_STORED_HEARTBEATS=30;class HeartbeatServiceImpl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new HeartbeatStorageImpl(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=getUTCDateString();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=getEarliestHeartbeatIdx(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){logger.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=getUTCDateString(),{heartbeatsToSend:t,unsentEntries:r}=extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats),n=base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}catch(e){return logger.warn(e),""}}}function getUTCDateString(){return(new Date).toISOString().substring(0,10)}function extractHeartbeatsForHeader(e,t=1024){const r=[];let n=e.slice();for(const a of e){const e=r.find(e=>e.agent===a.agent);if(e){if(e.dates.push(a.date),countBytes(r)>t){e.dates.pop();break}}else if(r.push({agent:a.agent,dates:[a.date]}),countBytes(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}class HeartbeatStorageImpl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!isIndexedDBAvailable()&&validateIndexedDBOpenable().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await readHeartbeatsFromIndexedDB(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return writeHeartbeatsToIndexedDB(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function countBytes(e){return base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:e})).length}function getEarliestHeartbeatIdx(e){if(0===e.length)return-1;let t=0,r=e[0].date;for(let n=1;n<e.length;n++)e[n].date<r&&(r=e[n].date,t=n);return t}
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
 */function registerCoreComponents(e){_registerComponent(new Component("platform-logger",e=>new PlatformLoggerServiceImpl(e),"PRIVATE")),_registerComponent(new Component("heartbeat",e=>new HeartbeatServiceImpl(e),"PRIVATE")),registerVersion(name$q,"0.14.10",e),registerVersion(name$q,"0.14.10","esm2020"),registerVersion("fire-js","")}registerCoreComponents("");var name="firebase",version="12.11.0";
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
registerVersion(name,version,"cdn");export{FirebaseError,SDK_VERSION,DEFAULT_ENTRY_NAME as _DEFAULT_ENTRY_NAME,_addComponent,_addOrOverwriteComponent,_apps,_clearComponents,_components,_getProvider,_isFirebaseApp,_isFirebaseServerApp,_isFirebaseServerAppSettings,_registerComponent,_removeServiceInstance,_serverApps,deleteApp,getApp,getApps,initializeApp,initializeServerApp,onLog,registerVersion,setLogLevel};