"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var postinstall=require("./postinstall.js");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CONSTANTS={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},assert=function(e,t){if(!e)throw assertionError(t)},assertionError=function(e){return new Error("Firebase Database ("+CONSTANTS.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},stringToByteArray$1=function(e){const t=[];let r=0;for(let o=0;o<e.length;o++){let n=e.charCodeAt(o);n<128?t[r++]=n:n<2048?(t[r++]=n>>6|192,t[r++]=63&n|128):55296==(64512&n)&&o+1<e.length&&56320==(64512&e.charCodeAt(o+1))?(n=65536+((1023&n)<<10)+(1023&e.charCodeAt(++o)),t[r++]=n>>18|240,t[r++]=n>>12&63|128,t[r++]=n>>6&63|128,t[r++]=63&n|128):(t[r++]=n>>12|224,t[r++]=n>>6&63|128,t[r++]=63&n|128)}return t},byteArrayToString=function(e){const t=[];let r=0,o=0;for(;r<e.length;){const n=e[r++];if(n<128)t[o++]=String.fromCharCode(n);else if(n>191&&n<224){const s=e[r++];t[o++]=String.fromCharCode((31&n)<<6|63&s)}else if(n>239&&n<365){const s=((7&n)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[o++]=String.fromCharCode(55296+(s>>10)),t[o++]=String.fromCharCode(56320+(1023&s))}else{const s=e[r++],i=e[r++];t[o++]=String.fromCharCode((15&n)<<12|(63&s)<<6|63&i)}}return t.join("")},base64={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let t=0;t<e.length;t+=3){const n=e[t],s=t+1<e.length,i=s?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,u=n>>2,l=(3&n)<<4|i>>4;let d=(15&i)<<2|c>>6,h=63&c;a||(h=64,s||(d=64)),o.push(r[u],r[l],r[d],r[h])}return o.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(stringToByteArray$1(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):byteArrayToString(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let t=0;t<e.length;){const n=r[e.charAt(t++)],s=t<e.length?r[e.charAt(t)]:0;++t;const i=t<e.length?r[e.charAt(t)]:64;++t;const a=t<e.length?r[e.charAt(t)]:64;if(++t,null==n||null==s||null==i||null==a)throw new DecodeBase64StringError;const c=n<<2|s>>4;if(o.push(c),64!==i){const e=s<<4&240|i>>2;if(o.push(e),64!==a){const e=i<<6&192|a;o.push(e)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function deepCopy(e){return deepExtend(void 0,e)}function deepExtend(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const r in t)t.hasOwnProperty(r)&&isValidKey(r)&&(e[r]=deepExtend(e[r],t[r]));return e}function isValidKey(e){return"__proto__"!==e}
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
 */function getGlobal(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
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
 */const getDefaultsFromGlobal=()=>getGlobal().__FIREBASE_DEFAULTS__,getDefaultsFromEnvVariable=()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},getDefaultsFromCookie=()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&base64Decode(e[1]);return t&&JSON.parse(t)},getDefaults=()=>{try{return postinstall.getDefaultsFromPostinstall()||getDefaultsFromGlobal()||getDefaultsFromEnvVariable()||getDefaultsFromCookie()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},getDefaultEmulatorHost=e=>getDefaults()?.emulatorHosts?.[e],getDefaultEmulatorHostnameAndPort=e=>{const t=getDefaultEmulatorHost(e);if(!t)return;const r=t.lastIndexOf(":");if(r<=0||r+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const o=parseInt(t.substring(r+1),10);return"["===t[0]?[t.substring(1,r-1),o]:[t.substring(0,r),o]},getDefaultAppConfig=()=>getDefaults()?.config,getExperimentalSetting=e=>getDefaults()?.[`_${e}`];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Deferred{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}}
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
 */function isCloudWorkstation(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function pingServer(e){return(await fetch(e,{credentials:"include"})).ok}
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
 */function createMockUserToken(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const r=t||"demo-project",o=e.iat||0,n=e.sub||e.user_id;if(!n)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:n,user_id:n,firebase:{sign_in_provider:"custom",identities:{}},...e};return[base64urlEncodeWithoutPadding(JSON.stringify({alg:"none",type:"JWT"})),base64urlEncodeWithoutPadding(JSON.stringify(s)),""].join(".")}const emulatorStatus={};function getEmulatorSummary(){const e={prod:[],emulator:[]};for(const t of Object.keys(emulatorStatus))emulatorStatus[t]?e.emulator.push(t):e.prod.push(t);return e}function getOrCreateEl(e){let t=document.getElementById(e),r=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),r=!0),{created:r,element:t}}let previouslyDismissed=!1;function updateEmulatorBanner(e,t){if("undefined"==typeof window||"undefined"==typeof document||!isCloudWorkstation(window.location.host)||emulatorStatus[e]===t||emulatorStatus[e]||previouslyDismissed)return;function r(e){return`__firebase__banner__${e}`}emulatorStatus[e]=t;const o="__firebase__banner",n=getEmulatorSummary().prod.length>0;function s(){const e=getOrCreateEl(o),t=r("text"),s=document.getElementById(t)||document.createElement("span"),i=r("learnmore"),a=document.getElementById(i)||document.createElement("a"),c=r("preprendIcon"),u=document.getElementById(c)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(a,i);const r=function(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{previouslyDismissed=!0,function(){const e=document.getElementById(o);e&&e.remove()}()},e}();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(u,c),t.append(u,s,a,r),document.body.appendChild(t)}n?(s.innerText="Preview backend disconnected.",u.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(u.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',s.innerText="Preview backend running in this workspace."),s.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",s):s()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function getUA(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function isMobileCordova(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA())}function isNode(){const e=getDefaults()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}function isBrowser(){return"undefined"!=typeof window||isWebWorker()}function isWebWorker(){return"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function isCloudflareWorker(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function isBrowserExtension(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function isReactNative(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function isElectron(){return getUA().indexOf("Electron/")>=0}function isIE(){const e=getUA();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function isUWP(){return getUA().indexOf("MSAppHost/")>=0}function isNodeSdk(){return!0===CONSTANTS.NODE_CLIENT||!0===CONSTANTS.NODE_ADMIN}function isSafari(){return!isNode()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function isSafariOrWebkit(){return!isNode()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function isIndexedDBAvailable(){try{return"object"==typeof indexedDB}catch(e){return!1}}function validateIndexedDBOpenable(){return new Promise((e,t)=>{try{let r=!0;const o="validate-browser-context-for-indexeddb-analytics-module",n=self.indexedDB.open(o);n.onsuccess=()=>{n.result.close(),r||self.indexedDB.deleteDatabase(o),e(!0)},n.onupgradeneeded=()=>{r=!1},n.onerror=()=>{t(n.error?.message||"")}}catch(e){t(e)}})}function areCookiesEnabled(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ERROR_NAME="FirebaseError";class FirebaseError extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ERROR_NAME,Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},o=`${this.service}/${e}`,n=this.errors[e],s=n?replaceTemplate(n,r):"Error",i=`${this.serviceName}: ${s} (${o}).`;return new FirebaseError(o,i,r)}}function replaceTemplate(e,t){return e.replace(PATTERN,(e,r)=>{const o=t[r];return null!=o?String(o):`<${r}?>`})}const PATTERN=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jsonEval(e){return JSON.parse(e)}function stringify(e){return JSON.stringify(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const decode=function(e){let t={},r={},o={},n="";try{const s=e.split(".");t=jsonEval(base64Decode(s[0])||""),r=jsonEval(base64Decode(s[1])||""),n=s[2],o=r.d||{},delete r.d}catch(e){}return{header:t,claims:r,data:o,signature:n}},isValidTimestamp=function(e){const t=decode(e).claims,r=Math.floor((new Date).getTime()/1e3);let o=0,n=0;return"object"==typeof t&&(t.hasOwnProperty("nbf")?o=t.nbf:t.hasOwnProperty("iat")&&(o=t.iat),n=t.hasOwnProperty("exp")?t.exp:o+86400),!!r&&!!o&&!!n&&r>=o&&r<=n},issuedAtTime=function(e){const t=decode(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null},isValidFormat=function(e){const t=decode(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")},isAdmin=function(e){const t=decode(e).claims;return"object"==typeof t&&!0===t.admin};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function contains(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function safeGet(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function isEmpty(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function map(e,t,r){const o={};for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&(o[n]=t.call(r,e[n],n,e));return o}function deepEqual(e,t){if(e===t)return!0;const r=Object.keys(e),o=Object.keys(t);for(const n of r){if(!o.includes(n))return!1;const r=e[n],s=t[n];if(isObject(r)&&isObject(s)){if(!deepEqual(r,s))return!1}else if(r!==s)return!1}for(const e of o)if(!r.includes(e))return!1;return!0}function isObject(e){return null!==e&&"object"==typeof e}
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
 */function promiseWithTimeout(e,t=2e3){const r=new Deferred;return setTimeout(()=>r.reject("timeout!"),t),e.then(r.resolve,r.reject),r.promise}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function querystring(e){const t=[];for(const[r,o]of Object.entries(e))Array.isArray(o)?o.forEach(e=>{t.push(encodeURIComponent(r)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(r)+"="+encodeURIComponent(o));return t.length?"&"+t.join("&"):""}function querystringDecode(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[r,o]=e.split("=");t[decodeURIComponent(r)]=decodeURIComponent(o)}}),t}function extractQuerystring(e){const t=e.indexOf("?");if(!t)return"";const r=e.indexOf("#",t);return e.substring(t,r>0?r:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sha1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if("string"==typeof e)for(let o=0;o<16;o++)r[o]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let o=0;o<16;o++)r[o]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=r[e-3]^r[e-8]^r[e-14]^r[e-16];r[e]=4294967295&(t<<1|t>>>31)}let o,n,s=this.chain_[0],i=this.chain_[1],a=this.chain_[2],c=this.chain_[3],u=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(o=c^i&(a^c),n=1518500249):(o=i^a^c,n=1859775393):e<60?(o=i&a|c&(i|a),n=2400959708):(o=i^a^c,n=3395469782);const t=(s<<5|s>>>27)+o+u+n+r[e]&4294967295;u=c,c=a,a=4294967295&(i<<30|i>>>2),i=s,s=t}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const r=t-this.blockSize;let o=0;const n=this.buf_;let s=this.inbuf_;for(;o<t;){if(0===s)for(;o<=r;)this.compress_(e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(n[s]=e.charCodeAt(o),++s,++o,s===this.blockSize){this.compress_(n),s=0;break}}else for(;o<t;)if(n[s]=e[o],++s,++o,s===this.blockSize){this.compress_(n),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let r=0;for(let t=0;t<5;t++)for(let o=24;o>=0;o-=8)e[r]=this.chain_[t]>>o&255,++r;return e}}function createSubscribe(e,t){const r=new ObserverProxy(e,t);return r.subscribe.bind(r)}class ObserverProxy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let o;if(void 0===e&&void 0===t&&void 0===r)throw new Error("Missing Observer.");o=implementsAnyMethods(e,["next","error","complete"])?e:{next:e,error:t,complete:r},void 0===o.next&&(o.next=noop),void 0===o.error&&(o.error=noop),void 0===o.complete&&(o.complete=noop);const n=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch(e){}}),this.observers.push(o),n}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function async(e,t){return(...r)=>{Promise.resolve(!0).then(()=>{e(...r)}).catch(e=>{t&&t(e)})}}function implementsAnyMethods(e,t){if("object"!=typeof e||null===e)return!1;for(const r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}function noop(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const validateArgCount=function(e,t,r,o){let n;if(o<t?n="at least "+t:o>r&&(n=0===r?"none":"no more than "+r),n)throw new Error(e+" failed: Was called with "+o+(1===o?" argument.":" arguments.")+" Expects "+n+".")};function errorPrefix(e,t){return`${e} failed: ${t} argument `}function validateNamespace(e,t,r){if((!r||t)&&"string"!=typeof t)throw new Error(errorPrefix(e,"namespace")+"must be a valid firebase namespace.")}function validateCallback(e,t,r,o){if((!o||r)&&"function"!=typeof r)throw new Error(errorPrefix(e,t)+"must be a valid function.")}function validateContextObject(e,t,r,o){if((!o||r)&&("object"!=typeof r||null===r))throw new Error(errorPrefix(e,t)+"must be a valid context object.")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const stringToByteArray=function(e){const t=[];let r=0;for(let o=0;o<e.length;o++){let n=e.charCodeAt(o);if(n>=55296&&n<=56319){const t=n-55296;o++,assert(o<e.length,"Surrogate pair missing trail surrogate."),n=65536+(t<<10)+(e.charCodeAt(o)-56320)}n<128?t[r++]=n:n<2048?(t[r++]=n>>6|192,t[r++]=63&n|128):n<65536?(t[r++]=n>>12|224,t[r++]=n>>6&63|128,t[r++]=63&n|128):(t[r++]=n>>18|240,t[r++]=n>>12&63|128,t[r++]=n>>6&63|128,t[r++]=63&n|128)}return t},stringLength=function(e){let t=0;for(let r=0;r<e.length;r++){const o=e.charCodeAt(r);o<128?t++:o<2048?t+=2:o>=55296&&o<=56319?(t+=4,r++):t+=3}return t},DEFAULT_INTERVAL_MILLIS=1e3,DEFAULT_BACKOFF_FACTOR=2,MAX_VALUE_MILLIS=144e5,RANDOM_FACTOR=.5;function calculateBackoffMillis(e,t=1e3,r=2){const o=t*Math.pow(r,e),n=Math.round(.5*o*(Math.random()-.5)*2);return Math.min(144e5,o+n)}
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
 */function ordinal(e){return Number.isFinite(e)?e+indicator(e):`${e}`}function indicator(e){const t=(e=Math.abs(e))%100;if(t>=10&&t<=20)return"th";const r=e%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"}
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
 */function getModularInstance(e){return e&&e._delegate?e._delegate:e}
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
 */async function generateSHA256Hash(e){const t=(new TextEncoder).encode(e),r=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,"0")).join("")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */CONSTANTS.NODE_CLIENT=!0,exports.CONSTANTS=CONSTANTS,exports.DecodeBase64StringError=DecodeBase64StringError,exports.Deferred=Deferred,exports.ErrorFactory=ErrorFactory,exports.FirebaseError=FirebaseError,exports.MAX_VALUE_MILLIS=144e5,exports.RANDOM_FACTOR=.5,exports.Sha1=Sha1,exports.areCookiesEnabled=areCookiesEnabled,exports.assert=assert,exports.assertionError=assertionError,exports.async=async,exports.base64=base64,exports.base64Decode=base64Decode,exports.base64Encode=base64Encode,exports.base64urlEncodeWithoutPadding=base64urlEncodeWithoutPadding,exports.calculateBackoffMillis=calculateBackoffMillis,exports.contains=contains,exports.createMockUserToken=createMockUserToken,exports.createSubscribe=createSubscribe,exports.decode=decode,exports.deepCopy=deepCopy,exports.deepEqual=deepEqual,exports.deepExtend=deepExtend,exports.errorPrefix=errorPrefix,exports.extractQuerystring=extractQuerystring,exports.generateSHA256Hash=generateSHA256Hash,exports.getDefaultAppConfig=getDefaultAppConfig,exports.getDefaultEmulatorHost=getDefaultEmulatorHost,exports.getDefaultEmulatorHostnameAndPort=getDefaultEmulatorHostnameAndPort,exports.getDefaults=getDefaults,exports.getExperimentalSetting=getExperimentalSetting,exports.getGlobal=getGlobal,exports.getModularInstance=getModularInstance,exports.getUA=getUA,exports.isAdmin=isAdmin,exports.isBrowser=isBrowser,exports.isBrowserExtension=isBrowserExtension,exports.isCloudWorkstation=isCloudWorkstation,exports.isCloudflareWorker=isCloudflareWorker,exports.isElectron=isElectron,exports.isEmpty=isEmpty,exports.isIE=isIE,exports.isIndexedDBAvailable=isIndexedDBAvailable,exports.isMobileCordova=isMobileCordova,exports.isNode=isNode,exports.isNodeSdk=isNodeSdk,exports.isReactNative=isReactNative,exports.isSafari=isSafari,exports.isSafariOrWebkit=isSafariOrWebkit,exports.isUWP=isUWP,exports.isValidFormat=isValidFormat,exports.isValidTimestamp=isValidTimestamp,exports.isWebWorker=isWebWorker,exports.issuedAtTime=issuedAtTime,exports.jsonEval=jsonEval,exports.map=map,exports.ordinal=ordinal,exports.pingServer=pingServer,exports.promiseWithTimeout=promiseWithTimeout,exports.querystring=querystring,exports.querystringDecode=querystringDecode,exports.safeGet=safeGet,exports.stringLength=stringLength,exports.stringToByteArray=stringToByteArray,exports.stringify=stringify,exports.updateEmulatorBanner=updateEmulatorBanner,exports.validateArgCount=validateArgCount,exports.validateCallback=validateCallback,exports.validateContextObject=validateContextObject,exports.validateIndexedDBOpenable=validateIndexedDBOpenable,exports.validateNamespace=validateNamespace;