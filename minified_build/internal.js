import{a8 as STORAGE_AVAILABLE_KEY,a9 as _isMobileBrowser,aa as _isIE10,ab as Delay,ac as _window,ad as _assert,ae as isV2,af as _createError,ag as _recaptchaV2ScriptUrl,ah as _loadJS,ai as MockReCaptcha,aj as _generateCallbackName,ak as _castAuth,al as _isHttpOrHttps,am as _isWorker,an as getRecaptchaParams,ao as _serverAppCurrentUserOperationNotSupportedError,z as signInWithCredential,ap as _assertLinkedStatus,B as linkWithCredential,C as reauthenticateWithCredential,aq as _initializeRecaptchaConfig,ar as FAKE_TOKEN,as as startEnrollPhoneMfa,at as handleRecaptchaFlow,au as startSignInPhoneMfa,av as sendPhoneVerificationCode,aw as _link$1,P as PhoneAuthCredential,ax as _getInstance,ay as _signInWithCredential,az as _reauthenticate,m as AuthCredential,aA as signInWithIdp,aB as _fail,aC as debugAssert,aD as _assertInstanceOf,aE as _generateEventId,aF as FederatedAuthProvider,aG as _persistenceKeyName,aH as _performApiRequest,aI as _getCurrentUrl,aJ as _gapiScriptUrl,aK as _emulatorUrl,aL as _isChromeIOS,aM as _isFirefox,aN as _isIOSStandalone,aO as BaseOAuthProvider,aP as _setWindowLocation,aQ as _isSafari,aR as _isIOS,aS as MultiFactorAssertionImpl,aT as finalizeEnrollPhoneMfa,aU as finalizeSignInPhoneMfa,r as registerAuth,i as initializeAuth,a as indexedDBLocalPersistence,e as beforeAuthStateChanged,o as onIdTokenChanged,c as connectAuthEmulator,aV as _setExternalJSProvider,aW as _isAndroid,aX as _isIOS7Or8}from"./register-27e07cc8.js";export{Y as ActionCodeURL,m as AuthCredential,A as AuthErrorCodes,aZ as AuthImpl,E as EmailAuthCredential,q as EmailAuthProvider,F as FacebookAuthProvider,a$ as FetchProvider,t as GithubAuthProvider,G as GoogleAuthProvider,O as OAuthCredential,w as OAuthProvider,P as PhoneAuthCredential,b0 as SAMLAuthCredential,S as SAMLAuthProvider,T as TotpMultiFactorGenerator,b as TotpSecret,x as TwitterAuthProvider,aY as UserImpl,ad as _assert,ak as _castAuth,aB as _fail,aE as _generateEventId,a_ as _getClientVersion,ax as _getInstance,aG as _persistenceKeyName,J as applyActionCode,e as beforeAuthStateChanged,K as checkActionCode,I as confirmPasswordReset,c as connectAuthEmulator,M as createUserWithEmailAndPassword,l as debugErrorMap,k as deleteUser,V as fetchSignInMethodsForEmail,a4 as getAdditionalUserInfo,a1 as getIdToken,a2 as getIdTokenResult,a6 as getMultiFactorResolver,n as inMemoryPersistence,a as indexedDBLocalPersistence,i as initializeAuth,d as initializeRecaptchaConfig,R as isSignInWithEmailLink,B as linkWithCredential,a7 as multiFactor,f as onAuthStateChanged,o as onIdTokenChanged,Z as parseActionCodeURL,p as prodErrorMap,C as reauthenticateWithCredential,a5 as reload,j as revokeAccessToken,W as sendEmailVerification,H as sendPasswordResetEmail,Q as sendSignInLinkToEmail,s as setPersistence,y as signInAnonymously,z as signInWithCredential,D as signInWithCustomToken,N as signInWithEmailAndPassword,U as signInWithEmailLink,h as signOut,a3 as unlink,g as updateCurrentUser,$ as updateEmail,a0 as updatePassword,_ as updateProfile,u as useDeviceLanguage,v as validatePassword,X as verifyBeforeUpdateEmail,L as verifyPasswordResetCode}from"./register-27e07cc8.js";import{querystring,getModularInstance,getUA,isEmpty,getExperimentalSetting,getDefaultEmulatorHost,querystringDecode}from"@firebase/util";import{_isFirebaseServerApp,SDK_VERSION,_getProvider,getApp}from"@firebase/app";import"@firebase/component";import"@firebase/logger";
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
 */const FactorId={PHONE:"phone",TOTP:"totp"},ProviderId={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},SignInMethod={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},OperationType={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},ActionCodeOperation={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};
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
class BrowserPersistenceClass{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(STORAGE_AVAILABLE_KEY,"1"),this.storage.removeItem(STORAGE_AVAILABLE_KEY),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
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
 */const _POLLING_INTERVAL_MS=1e3,IE10_LOCAL_STORAGE_SYNC_DELAY=10;class BrowserLocalPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_isMobileBrowser(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);_isIE10()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}BrowserLocalPersistence.type="LOCAL";const browserLocalPersistence=BrowserLocalPersistence,POLLING_INTERVAL_MS=1e3;
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
 */function getDocumentCookie(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function getCookieName(e){return`${"http:"===window.location.protocol?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class CookiePersistence{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"==typeof isSecureContext&&!isSecureContext)&&("undefined"!=typeof navigator&&"undefined"!=typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=getCookieName(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return getDocumentCookie(t)}async _remove(e){if(!this._isAvailable())return;if(!await this._get(e))return;const t=getCookieName(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=getCookieName(e);if(window.cookieStore){const e=e=>{const r=e.changed.find(e=>e.name===n);r&&t(r.value);e.deleted.find(e=>e.name===n)&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=getDocumentCookie(n);const i=setInterval(()=>{const e=getDocumentCookie(n);e!==r&&(t(e),r=e)},1e3);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}CookiePersistence.type="COOKIE";const browserCookiePersistence=CookiePersistence;
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
 */class BrowserSessionPersistence extends BrowserPersistenceClass{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}BrowserSessionPersistence.type="SESSION";const browserSessionPersistence=BrowserSessionPersistence,_JSLOAD_CALLBACK=_generateCallbackName("rcb"),NETWORK_TIMEOUT_DELAY=new Delay(3e4,6e4);
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
 */class ReCaptchaLoaderImpl{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!_window().grecaptcha?.render}load(e,t=""){return _assert(isHostLanguageValid(t),e,"argument-error"),this.shouldResolveImmediately(t)&&isV2(_window().grecaptcha)?Promise.resolve(_window().grecaptcha):new Promise((n,r)=>{const i=_window().setTimeout(()=>{r(_createError(e,"network-request-failed"))},NETWORK_TIMEOUT_DELAY.get());_window()[_JSLOAD_CALLBACK]=()=>{_window().clearTimeout(i),delete _window()[_JSLOAD_CALLBACK];const s=_window().grecaptcha;if(!s||!isV2(s))return void r(_createError(e,"internal-error"));const a=s.render;s.render=(e,t)=>{const n=a(e,t);return this.counter++,n},this.hostLanguage=t,n(s)};const s=`${_recaptchaV2ScriptUrl()}?${querystring({onload:_JSLOAD_CALLBACK,render:"explicit",hl:t})}`;_loadJS(s).catch(()=>{clearTimeout(i),r(_createError(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!_window().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function isHostLanguageValid(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}class MockReCaptchaLoaderImpl{async load(e){return new MockReCaptcha(e)}clearedOneInstance(){}}
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
 */const RECAPTCHA_VERIFIER_TYPE="recaptcha",DEFAULT_PARAMS={theme:"light",type:"image"};class RecaptchaVerifier{constructor(e,t,n={...DEFAULT_PARAMS}){this.parameters=n,this.type="recaptcha",this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=_castAuth(e),this.isInvisible="invisible"===this.parameters.size,_assert("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");const r="string"==typeof t?document.getElementById(t):t;_assert(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new MockReCaptchaLoaderImpl:new ReCaptchaLoaderImpl,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(n=>{const r=e=>{e&&(this.tokenChangeListeners.delete(r),n(e))};this.tokenChangeListeners.add(r),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){_assert(!this.parameters.sitekey,this.auth,"argument-error"),_assert(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),_assert("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"==typeof e)e(t);else if("string"==typeof e){const n=_window()[e];"function"==typeof n&&n(t)}}}assertNotDestroyed(){_assert(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){_assert(_isHttpOrHttps()&&!_isWorker(),this.auth,"internal-error"),await domReady(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await getRecaptchaParams(this.auth);_assert(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return _assert(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function domReady(){let e=null;return new Promise(t=>{"complete"!==document.readyState?(e=()=>t(),window.addEventListener("load",e)):t()}).catch(t=>{throw e&&window.removeEventListener("load",e),t})}
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
 */class ConfirmationResultImpl{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=PhoneAuthCredential._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function signInWithPhoneNumber(e,t,n){if(_isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const r=_castAuth(e),i=await _verifyPhoneNumber(r,t,getModularInstance(n));return new ConfirmationResultImpl(i,e=>signInWithCredential(r,e))}async function linkWithPhoneNumber(e,t,n){const r=getModularInstance(e);await _assertLinkedStatus(!1,r,"phone");const i=await _verifyPhoneNumber(r.auth,t,getModularInstance(n));return new ConfirmationResultImpl(i,e=>linkWithCredential(r,e))}async function reauthenticateWithPhoneNumber(e,t,n){const r=getModularInstance(e);if(_isFirebaseServerApp(r.auth.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(r.auth));const i=await _verifyPhoneNumber(r.auth,t,getModularInstance(n));return new ConfirmationResultImpl(i,e=>reauthenticateWithCredential(r,e))}async function _verifyPhoneNumber(e,t,n){if(!e._getRecaptchaConfig())try{await _initializeRecaptchaConfig(e)}catch(e){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"==typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){_assert("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=handleRecaptchaFlow(e,i,"mfaSmsEnrollment",async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===FAKE_TOKEN){_assert("recaptcha"===n?.type,e,"argument-error");const r=await injectRecaptchaV2Token(e,t,n);return startEnrollPhoneMfa(e,r)}return startEnrollPhoneMfa(e,t)},"PHONE_PROVIDER");return(await s.catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo}{_assert("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;_assert(i,e,"missing-multi-factor-info");const s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},a=handleRecaptchaFlow(e,s,"mfaSmsSignIn",async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===FAKE_TOKEN){_assert("recaptcha"===n?.type,e,"argument-error");const r=await injectRecaptchaV2Token(e,t,n);return startSignInPhoneMfa(e,r)}return startSignInPhoneMfa(e,t)},"PHONE_PROVIDER");return(await a.catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=handleRecaptchaFlow(e,t,"sendVerificationCode",async(e,t)=>{if(t.captchaResponse===FAKE_TOKEN){_assert("recaptcha"===n?.type,e,"argument-error");const r=await injectRecaptchaV2Token(e,t,n);return sendPhoneVerificationCode(e,r)}return sendPhoneVerificationCode(e,t)},"PHONE_PROVIDER");return(await i.catch(e=>Promise.reject(e))).sessionInfo}}finally{n?._reset()}}async function updatePhoneNumber(e,t){const n=getModularInstance(e);if(_isFirebaseServerApp(n.auth.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(n.auth));await _link$1(n,t)}async function injectRecaptchaV2Token(e,t,n){_assert("recaptcha"===n.type,e,"argument-error");const r=await n.verify();_assert("string"==typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
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
 */class PhoneAuthProvider{constructor(e){this.providerId=PhoneAuthProvider.PROVIDER_ID,this.auth=_castAuth(e)}verifyPhoneNumber(e,t){return _verifyPhoneNumber(this.auth,e,getModularInstance(t))}static credential(e,t){return PhoneAuthCredential._fromVerification(e,t)}static credentialFromResult(e){const t=e;return PhoneAuthProvider.credentialFromTaggedObject(t)}static credentialFromError(e){return PhoneAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?PhoneAuthCredential._fromTokenResponse(t,n):null}}
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
function _withDefaultResolver(e,t){return t?_getInstance(t):(_assert(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
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
 */PhoneAuthProvider.PROVIDER_ID="phone",PhoneAuthProvider.PHONE_SIGN_IN_METHOD="phone";class IdpCredential extends AuthCredential{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return signInWithIdp(e,this._buildIdpRequest())}_linkToIdToken(e,t){return signInWithIdp(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return signInWithIdp(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function _signIn(e){return _signInWithCredential(e.auth,new IdpCredential(e),e.bypassAuthState)}function _reauth(e){const{auth:t,user:n}=e;return _assert(n,t,"internal-error"),_reauthenticate(n,new IdpCredential(e),e.bypassAuthState)}async function _link(e){const{auth:t,user:n}=e;return _assert(n,t,"internal-error"),_link$1(n,new IdpCredential(e),e.bypassAuthState)}
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
 */class AbstractPopupRedirectOperation{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:a}=e;if(s)return void this.reject(s);const o={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _signIn;case"linkViaPopup":case"linkViaRedirect":return _link;case"reauthViaPopup":case"reauthViaRedirect":return _reauth;default:_fail(this.auth,"internal-error")}}resolve(e){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){debugAssert(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
 */const _POLL_WINDOW_CLOSE_TIMEOUT=new Delay(2e3,1e4);async function signInWithPopup(e,t,n){if(_isFirebaseServerApp(e.app))return Promise.reject(_createError(e,"operation-not-supported-in-this-environment"));const r=_castAuth(e);_assertInstanceOf(e,t,FederatedAuthProvider);const i=_withDefaultResolver(r,n);return new PopupOperation(r,"signInViaPopup",t,i).executeNotNull()}async function reauthenticateWithPopup(e,t,n){const r=getModularInstance(e);if(_isFirebaseServerApp(r.auth.app))return Promise.reject(_createError(r.auth,"operation-not-supported-in-this-environment"));_assertInstanceOf(r.auth,t,FederatedAuthProvider);const i=_withDefaultResolver(r.auth,n);return new PopupOperation(r.auth,"reauthViaPopup",t,i,r).executeNotNull()}async function linkWithPopup(e,t,n){const r=getModularInstance(e);_assertInstanceOf(r.auth,t,FederatedAuthProvider);const i=_withDefaultResolver(r.auth,n);return new PopupOperation(r.auth,"linkViaPopup",t,i,r).executeNotNull()}class PopupOperation extends AbstractPopupRedirectOperation{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction&&PopupOperation.currentPopupAction.cancel(),PopupOperation.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _assert(e,this.auth,"internal-error"),e}async onExecution(){debugAssert(1===this.filter.length,"Popup operations only handle one event");const e=_generateEventId();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(_createError(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(_createError(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,PopupOperation.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_createError(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,_POLL_WINDOW_CLOSE_TIMEOUT.get())};e()}}PopupOperation.currentPopupAction=null;
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
const PENDING_REDIRECT_KEY="pendingRedirect",redirectOutcomeMap=new Map;class RedirectAction extends AbstractPopupRedirectOperation{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=redirectOutcomeMap.get(this.auth._key());if(!e){try{const t=await _getAndClearPendingRedirectStatus(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}redirectOutcomeMap.set(this.auth._key(),e)}return this.bypassAuthState||redirectOutcomeMap.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function _getAndClearPendingRedirectStatus(e,t){const n=pendingRedirectKey(t),r=resolverPersistence(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}async function _setPendingRedirectStatus(e,t){return resolverPersistence(e)._set(pendingRedirectKey(t),"true")}function _clearRedirectOutcomes(){redirectOutcomeMap.clear()}function _overrideRedirectResult(e,t){redirectOutcomeMap.set(e._key(),t)}function resolverPersistence(e){return _getInstance(e._redirectPersistence)}function pendingRedirectKey(e){return _persistenceKeyName("pendingRedirect",e.config.apiKey,e.name)}
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
 */function signInWithRedirect(e,t,n){return _signInWithRedirect(e,t,n)}async function _signInWithRedirect(e,t,n){if(_isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const r=_castAuth(e);_assertInstanceOf(e,t,FederatedAuthProvider),await r._initializationPromise;const i=_withDefaultResolver(r,n);return await _setPendingRedirectStatus(i,r),i._openRedirect(r,t,"signInViaRedirect")}function reauthenticateWithRedirect(e,t,n){return _reauthenticateWithRedirect(e,t,n)}async function _reauthenticateWithRedirect(e,t,n){const r=getModularInstance(e);if(_assertInstanceOf(r.auth,t,FederatedAuthProvider),_isFirebaseServerApp(r.auth.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(r.auth));await r.auth._initializationPromise;const i=_withDefaultResolver(r.auth,n);await _setPendingRedirectStatus(i,r.auth);const s=await prepareUserForRedirect(r);return i._openRedirect(r.auth,t,"reauthViaRedirect",s)}function linkWithRedirect(e,t,n){return _linkWithRedirect(e,t,n)}async function _linkWithRedirect(e,t,n){const r=getModularInstance(e);_assertInstanceOf(r.auth,t,FederatedAuthProvider),await r.auth._initializationPromise;const i=_withDefaultResolver(r.auth,n);await _assertLinkedStatus(!1,r,t.providerId),await _setPendingRedirectStatus(i,r.auth);const s=await prepareUserForRedirect(r);return i._openRedirect(r.auth,t,"linkViaRedirect",s)}async function getRedirectResult(e,t){return await _castAuth(e)._initializationPromise,_getRedirectResult(e,t,!1)}async function _getRedirectResult(e,t,n=!1){if(_isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const r=_castAuth(e),i=_withDefaultResolver(r,t),s=new RedirectAction(r,i,n),a=await s.execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,t)),a}async function prepareUserForRedirect(e){const t=_generateEventId(`${e.uid}:::`);return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}
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
 */const EVENT_DUPLICATION_CACHE_DURATION_MS=6e5;class AuthEventManager{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!isRedirectEvent(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!isNullRedirectEvent(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(_createError(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(eventUid(e))}saveEventToCache(e){this.cachedEventUids.add(eventUid(e)),this.lastProcessedEventTime=Date.now()}}function eventUid(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function isNullRedirectEvent({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}function isRedirectEvent(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return isNullRedirectEvent(e);default:return!1}}
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
 */async function _getProjectConfig(e,t={}){return _performApiRequest(e,"GET","/v1/projects",t)}
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
 */const IP_ADDRESS_REGEX=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,HTTP_REGEX=/^https?/;async function _validateOrigin$1(e){if(e.config.emulator)return;const{authorizedDomains:t}=await _getProjectConfig(e);for(const e of t)try{if(matchDomain(e))return}catch{}_fail(e,"unauthorized-domain")}function matchDomain(e){const t=_getCurrentUrl(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!HTTP_REGEX.test(n))return!1;if(IP_ADDRESS_REGEX.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NETWORK_TIMEOUT=new Delay(3e4,6e4);function resetUnloadedGapiModules(){const e=_window().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}function loadGapi(e){return new Promise((t,n)=>{function r(){resetUnloadedGapiModules(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{resetUnloadedGapiModules(),n(_createError(e,"network-request-failed"))},timeout:NETWORK_TIMEOUT.get()})}if(_window().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!_window().gapi?.load){const t=_generateCallbackName("iframefcb");return _window()[t]=()=>{gapi.load?r():n(_createError(e,"network-request-failed"))},_loadJS(`${_gapiScriptUrl()}?onload=${t}`).catch(e=>n(e))}r()}}).catch(e=>{throw cachedGApiLoader=null,e})}let cachedGApiLoader=null;function _loadGapi(e){return cachedGApiLoader=cachedGApiLoader||loadGapi(e),cachedGApiLoader}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PING_TIMEOUT=new Delay(5e3,15e3),IFRAME_PATH="__/auth/iframe",EMULATED_IFRAME_PATH="emulator/auth/iframe",IFRAME_ATTRIBUTES={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EID_FROM_APIHOST=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function getIframeUrl(e){const t=e.config;_assert(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?_emulatorUrl(t,EMULATED_IFRAME_PATH):`https://${e.config.authDomain}/${IFRAME_PATH}`,r={apiKey:t.apiKey,appName:e.name,v:SDK_VERSION},i=EID_FROM_APIHOST.get(e.config.apiHost);i&&(r.eid=i);const s=e._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${querystring(r).slice(1)}`}async function _openIframe(e){const t=await _loadGapi(e),n=_window().gapi;return _assert(n,e,"internal-error"),t.open({where:document.body,url:getIframeUrl(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:IFRAME_ATTRIBUTES,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=_createError(e,"network-request-failed"),s=_window().setTimeout(()=>{r(i)},PING_TIMEOUT.get());function a(){_window().clearTimeout(s),n(t)}t.ping(a).then(a,()=>{r(i)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BASE_POPUP_OPTIONS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DEFAULT_WIDTH=500,DEFAULT_HEIGHT=600,TARGET_BLANK="_blank",FIREFOX_EMPTY_URL="http://localhost";class AuthPopup{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function _open(e,t,n,r=500,i=600){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let o="";const c={...BASE_POPUP_OPTIONS,width:r.toString(),height:i.toString(),top:s,left:a},u=getUA().toLowerCase();n&&(o=_isChromeIOS(u)?"_blank":n),_isFirefox(u)&&(t=t||FIREFOX_EMPTY_URL,c.scrollbars="yes");const l=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(_isIOSStandalone(u)&&"_self"!==o)return openAsNewWindowIOS(t||"",o),new AuthPopup(null);const d=window.open(t||"",o,l);_assert(d,e,"popup-blocked");try{d.focus()}catch(e){}return new AuthPopup(d)}function openAsNewWindowIOS(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
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
 */const WIDGET_PATH="__/auth/handler",EMULATOR_WIDGET_PATH="emulator/auth/handler",FIREBASE_APP_CHECK_FRAGMENT_ID=encodeURIComponent("fac");async function _getRedirectUrl(e,t,n,r,i,s){_assert(e.config.authDomain,e,"auth-domain-config-required"),_assert(e.config.apiKey,e,"invalid-api-key");const a={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:SDK_VERSION,eventId:i};if(t instanceof FederatedAuthProvider){t.setDefaultLanguage(e.languageCode),a.providerId=t.providerId||"",isEmpty(t.getCustomParameters())||(a.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(s||{}))a[e]=t}if(t instanceof BaseOAuthProvider){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(a.scopes=e.join(","))}e.tenantId&&(a.tid=e.tenantId);const o=a;for(const e of Object.keys(o))void 0===o[e]&&delete o[e];const c=await e._getAppCheckToken(),u=c?`#${FIREBASE_APP_CHECK_FRAGMENT_ID}=${encodeURIComponent(c)}`:"";return`${getHandlerBase(e)}?${querystring(o).slice(1)}${u}`}function getHandlerBase({config:e}){return e.emulator?_emulatorUrl(e,EMULATOR_WIDGET_PATH):`https://${e.authDomain}/${WIDGET_PATH}`}
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
 */const WEB_STORAGE_SUPPORT_KEY="webStorageSupport";class BrowserPopupRedirectResolver{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=browserSessionPersistence,this._completeRedirectFn=_getRedirectResult,this._overrideRedirectResult=_overrideRedirectResult}async _openPopup(e,t,n,r){debugAssert(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");return _open(e,await _getRedirectUrl(e,t,n,_getCurrentUrl(),r),_generateEventId())}async _openRedirect(e,t,n,r){await this._originValidation(e);const i=await _getRedirectUrl(e,t,n,_getCurrentUrl(),r);return _setWindowLocation(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(debugAssert(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await _openIframe(e),n=new AuthEventManager(e);return t.register("authEvent",t=>{_assert(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send("webStorageSupport",{type:"webStorageSupport"},n=>{const r=n?.[0]?.webStorageSupport;void 0!==r&&t(!!r),_fail(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=_validateOrigin$1(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _isMobileBrowser()||_isSafari()||_isIOS()}}const browserPopupRedirectResolver=BrowserPopupRedirectResolver;class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new PhoneMultiFactorAssertionImpl(e)}_finalizeEnroll(e,t,n){return finalizeEnrollPhoneMfa(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return finalizeSignInPhoneMfa(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class PhoneMultiFactorGenerator{constructor(){}static assertion(e){return PhoneMultiFactorAssertionImpl._fromCredential(e)}}PhoneMultiFactorGenerator.FACTOR_ID="phone";
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
const DEFAULT_ID_TOKEN_MAX_AGE=300,authIdTokenMaxAge=getExperimentalSetting("authIdTokenMaxAge")||300;let lastPostedIdToken=null;const mintCookieFactory=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>authIdTokenMaxAge)return;const i=n?.token;lastPostedIdToken!==i&&(lastPostedIdToken=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function getAuth(e=getApp()){const t=_getProvider(e,"auth");if(t.isInitialized())return t.getImmediate();const n=initializeAuth(e,{popupRedirectResolver:browserPopupRedirectResolver,persistence:[indexedDBLocalPersistence,browserLocalPersistence,browserSessionPersistence]}),r=getExperimentalSetting("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=mintCookieFactory(e.toString());beforeAuthStateChanged(n,t,()=>t(n.currentUser)),onIdTokenChanged(n,e=>t(e))}}const i=getDefaultEmulatorHost("auth");return i&&connectAuthEmulator(n,`http://${i}`),n}function getScriptParentElement(){return document.getElementsByTagName("head")?.[0]??document}
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
function _cordovaWindow(){return window}
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
 */_setExternalJSProvider({loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=_createError("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",getScriptParentElement().appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),registerAuth("Browser");const REDIRECT_TIMEOUT_MS=2e3;async function _generateHandlerUrl(e,t,n){const{BuildInfo:r}=_cordovaWindow();debugAssert(t.sessionId,"AuthEvent did not contain a session ID");const i=await computeSha256(t.sessionId),s={};return _isIOS()?s.ibi=r.packageName:_isAndroid()?s.apn=r.packageName:_fail(e,"operation-not-supported-in-this-environment"),r.displayName&&(s.appDisplayName=r.displayName),s.sessionId=i,_getRedirectUrl(e,n,t.type,void 0,t.eventId??void 0,s)}async function _validateOrigin(e){const{BuildInfo:t}=_cordovaWindow(),n={};_isIOS()?n.iosBundleId=t.packageName:_isAndroid()?n.androidPackageName=t.packageName:_fail(e,"operation-not-supported-in-this-environment"),await _getProjectConfig(e,n)}function _performRedirect(e){const{cordova:t}=_cordovaWindow();return new Promise(n=>{t.plugins.browsertab.isAvailable(r=>{let i=null;r?t.plugins.browsertab.openUrl(e):i=t.InAppBrowser.open(e,_isIOS7Or8()?"_blank":"_system","location=yes"),n(i)})})}async function _waitForAppResume(e,t,n){const{cordova:r}=_cordovaWindow();let i=()=>{};try{await new Promise((s,a)=>{let o=null;function c(){s();const e=r.plugins.browsertab?.close;"function"==typeof e&&e(),"function"==typeof n?.close&&n.close()}function u(){o||(o=window.setTimeout(()=>{a(_createError(e,"redirect-cancelled-by-user"))},2e3))}function l(){"visible"===document?.visibilityState&&u()}t.addPassiveListener(c),document.addEventListener("resume",u,!1),_isAndroid()&&document.addEventListener("visibilitychange",l,!1),i=()=>{t.removePassiveListener(c),document.removeEventListener("resume",u,!1),document.removeEventListener("visibilitychange",l,!1),o&&window.clearTimeout(o)}})}finally{i()}}function _checkCordovaConfiguration(e){const t=_cordovaWindow();_assert("function"==typeof t?.universalLinks?.subscribe,e,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),_assert(void 0!==t?.BuildInfo?.packageName,e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),_assert("function"==typeof t?.cordova?.plugins?.browsertab?.openUrl,e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),_assert("function"==typeof t?.cordova?.plugins?.browsertab?.isAvailable,e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),_assert("function"==typeof t?.cordova?.InAppBrowser?.open,e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function computeSha256(e){const t=stringToArrayBuffer(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,"0")).join("")}function stringToArrayBuffer(e){if(debugAssert(/[0-9a-zA-Z]+/.test(e),"Can only convert alpha-numeric strings"),"undefined"!=typeof TextEncoder)return(new TextEncoder).encode(e);const t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t);return n}
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
 */const SESSION_ID_LENGTH=20;class CordovaAuthEventManager extends AuthEventManager{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInitialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInitialized(),this.passiveListeners.forEach(t=>t(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function _generateNewEvent(e,t,n=null){return{type:t,eventId:n,urlResponse:null,sessionId:generateSessionId(),postBody:null,tenantId:e.tenantId,error:_createError(e,"no-auth-event")}}function _savePartialEvent(e,t){return storage()._set(persistenceKey(e),t)}async function _getAndRemoveEvent(e){const t=await storage()._get(persistenceKey(e));return t&&await storage()._remove(persistenceKey(e)),t}function _eventFromPartialAndUrl(e,t){const n=_getDeepLinkFromCallback(t);if(n.includes("/__/auth/callback")){const t=searchParamsOrEmpty(n),r=t.firebaseError?parseJsonOrNull(decodeURIComponent(t.firebaseError)):null,i=r?.code?.split("auth/")?.[1],s=i?_createError(i):null;return s?{type:e.type,eventId:e.eventId,tenantId:e.tenantId,error:s,urlResponse:null,sessionId:null,postBody:null}:{type:e.type,eventId:e.eventId,tenantId:e.tenantId,sessionId:e.sessionId,urlResponse:n,postBody:null}}return null}function generateSessionId(){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<20;n++){const n=Math.floor(62*Math.random());e.push(t.charAt(n))}return e.join("")}function storage(){return _getInstance(browserLocalPersistence)}function persistenceKey(e){return _persistenceKeyName("authEvent",e.config.apiKey,e.name)}function parseJsonOrNull(e){try{return JSON.parse(e)}catch(e){return null}}function _getDeepLinkFromCallback(e){const t=searchParamsOrEmpty(e),n=t.link?decodeURIComponent(t.link):void 0,r=searchParamsOrEmpty(n).link,i=t.deep_link_id?decodeURIComponent(t.deep_link_id):void 0;return searchParamsOrEmpty(i).link||i||r||n||e}function searchParamsOrEmpty(e){if(!e?.includes("?"))return{};const[t,...n]=e.split("?");return querystringDecode(n.join("?"))}
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
 */const INITIAL_EVENT_TIMEOUT_MS=500;class CordovaPopupRedirectResolver{constructor(){this._redirectPersistence=browserSessionPersistence,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=_getRedirectResult,this._overrideRedirectResult=_overrideRedirectResult}async _initialize(e){const t=e._key();let n=this.eventManagers.get(t);return n||(n=new CordovaAuthEventManager(e),this.eventManagers.set(t,n),this.attachCallbackListeners(e,n)),n}_openPopup(e){_fail(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,t,n,r){_checkCordovaConfiguration(e);const i=await this._initialize(e);await i.initialized(),i.resetRedirect(),_clearRedirectOutcomes(),await this._originValidation(e);const s=_generateNewEvent(e,n,r);await _savePartialEvent(e,s);const a=await _generateHandlerUrl(e,s,t);return _waitForAppResume(e,i,await _performRedirect(a))}_isIframeWebStorageSupported(e,t){throw new Error("Method not implemented.")}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=_validateOrigin(e)),this.originValidationPromises[t]}attachCallbackListeners(e,t){const{universalLinks:n,handleOpenURL:r,BuildInfo:i}=_cordovaWindow(),s=setTimeout(async()=>{await _getAndRemoveEvent(e),t.onEvent(generateNoEvent())},500),a=async n=>{clearTimeout(s);const r=await _getAndRemoveEvent(e);let i=null;r&&n?.url&&(i=_eventFromPartialAndUrl(r,n.url)),t.onEvent(i||generateNoEvent())};void 0!==n&&"function"==typeof n.subscribe&&n.subscribe(null,a);const o=r,c=`${i.packageName.toLowerCase()}://`;_cordovaWindow().handleOpenURL=async e=>{if(e.toLowerCase().startsWith(c)&&a({url:e}),"function"==typeof o)try{o(e)}catch(e){console.error(e)}}}}const cordovaPopupRedirectResolver=CordovaPopupRedirectResolver;function generateNoEvent(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:_createError("no-auth-event")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function addFrameworkForLogging(e,t){_castAuth(e)._logFramework(t)}export{ActionCodeOperation,AuthPopup,FactorId,OperationType,PhoneAuthProvider,PhoneMultiFactorGenerator,ProviderId,RecaptchaVerifier,SignInMethod,_getRedirectResult,_overrideRedirectResult,addFrameworkForLogging,browserCookiePersistence,browserLocalPersistence,browserPopupRedirectResolver,browserSessionPersistence,cordovaPopupRedirectResolver,getAuth,getRedirectResult,linkWithPhoneNumber,linkWithPopup,linkWithRedirect,reauthenticateWithPhoneNumber,reauthenticateWithPopup,reauthenticateWithRedirect,signInWithPhoneNumber,signInWithPopup,signInWithRedirect,updatePhoneNumber};