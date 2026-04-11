"use strict";var firebase=require("@firebase/app-compat"),exp=require("@firebase/auth/internal"),component=require("@firebase/component"),util=require("@firebase/util");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}}),t.default=e,Object.freeze(t)}var firebase__default=_interopDefaultLegacy(firebase),exp__namespace=_interopNamespace(exp),name="@firebase/auth-compat",version="0.6.4";
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
const CORDOVA_ONDEVICEREADY_TIMEOUT_MS=1e3;function _getCurrentScheme(){return self?.location?.protocol||null}function _isHttpOrHttps(){return"http:"===_getCurrentScheme()||"https:"===_getCurrentScheme()}function _isAndroidOrIosCordovaScheme(e=util.getUA()){return!("file:"!==_getCurrentScheme()&&"ionic:"!==_getCurrentScheme()&&"capacitor:"!==_getCurrentScheme()||!e.toLowerCase().match(/iphone|ipad|ipod|android/))}function _isNativeEnvironment(){return util.isReactNative()||util.isNode()}function _isIe11(){return util.isIE()&&11===document?.documentMode}function _isEdge(e=util.getUA()){return/Edge\/\d+/.test(e)}function _isLocalStorageNotSynchronized(e=util.getUA()){return _isIe11()||_isEdge(e)}function _isWebStorageSupported(){try{const e=self.localStorage,t=exp__namespace._generateEventId();if(e)return e.setItem(t,"1"),e.removeItem(t),!_isLocalStorageNotSynchronized()||util.isIndexedDBAvailable()}catch(e){return _isWorker()&&util.isIndexedDBAvailable()}return!1}function _isWorker(){return"undefined"!=typeof global&&"WorkerGlobalScope"in global&&"importScripts"in global}function _isPopupRedirectSupported(){return(_isHttpOrHttps()||util.isBrowserExtension()||_isAndroidOrIosCordovaScheme())&&!_isNativeEnvironment()&&_isWebStorageSupported()&&!_isWorker()}function _isLikelyCordova(){return _isAndroidOrIosCordovaScheme()&&"undefined"!=typeof document}async function _isCordova(){return!!_isLikelyCordova()&&new Promise(e=>{const t=setTimeout(()=>{e(!1)},1e3);document.addEventListener("deviceready",()=>{clearTimeout(t),e(!0)})})}function _getSelfWindow(){return"undefined"!=typeof window?window:null}
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
 */const Persistence={LOCAL:"local",NONE:"none",SESSION:"session"},_assert$3=exp__namespace._assert,PERSISTENCE_KEY="persistence";function _validatePersistenceArgument(e,t){_assert$3(Object.values(Persistence).includes(t),e,"invalid-persistence-type"),util.isReactNative()?_assert$3(t!==Persistence.SESSION,e,"unsupported-persistence-type"):util.isNode()?_assert$3(t===Persistence.NONE,e,"unsupported-persistence-type"):_isWorker()?_assert$3(t===Persistence.NONE||t===Persistence.LOCAL&&util.isIndexedDBAvailable(),e,"unsupported-persistence-type"):_assert$3(t===Persistence.NONE||_isWebStorageSupported(),e,"unsupported-persistence-type")}async function _savePersistenceForRedirect(e){await e._initializationPromise;const t=getSessionStorageIfAvailable(),r=exp__namespace._persistenceKeyName("persistence",e.config.apiKey,e.name);t&&t.setItem(r,e._getPersistenceType())}function _getPersistencesFromRedirect(e,t){const r=getSessionStorageIfAvailable();if(!r)return[];const n=exp__namespace._persistenceKeyName("persistence",e,t);switch(r.getItem(n)){case Persistence.NONE:return[exp__namespace.inMemoryPersistence];case Persistence.LOCAL:return[exp__namespace.indexedDBLocalPersistence,exp__namespace.browserSessionPersistence];case Persistence.SESSION:return[exp__namespace.browserSessionPersistence];default:return[]}}function getSessionStorageIfAvailable(){try{return _getSelfWindow()?.sessionStorage||null}catch(e){return null}}
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
 */const _assert$2=exp__namespace._assert;class CompatPopupRedirectResolver{constructor(){this.browserResolver=exp__namespace._getInstance(exp__namespace.browserPopupRedirectResolver),this.cordovaResolver=exp__namespace._getInstance(exp__namespace.cordovaPopupRedirectResolver),this.underlyingResolver=null,this._redirectPersistence=exp__namespace.browserSessionPersistence,this._completeRedirectFn=exp__namespace._getRedirectResult,this._overrideRedirectResult=exp__namespace._overrideRedirectResult}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,r,n){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,r,n)}async _openRedirect(e,t,r,n){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,r,n)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return _isLikelyCordova()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return _assert$2(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await _isCordova();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}
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
 */function unwrap(e){return e.unwrap()}function wrapped(e){return e.wrapped()}
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
 */function credentialFromResponse(e){return credentialFromObject(e)}function attachExtraErrorFields(e,t){const r=t.customData?._tokenResponse;if("auth/multi-factor-auth-required"===t?.code){t.resolver=new MultiFactorResolver(e,exp__namespace.getMultiFactorResolver(e,t))}else if(r){const e=credentialFromObject(t),n=t;e&&(n.credential=e,n.tenantId=r.tenantId||void 0,n.email=r.email||void 0,n.phoneNumber=r.phoneNumber||void 0)}}function credentialFromObject(e){const{_tokenResponse:t}=e instanceof util.FirebaseError?e.customData:e;if(!t)return null;if(!(e instanceof util.FirebaseError)&&"temporaryProof"in t&&"phoneNumber"in t)return exp__namespace.PhoneAuthProvider.credentialFromResult(e);const r=t.providerId;if(!r||r===exp__namespace.ProviderId.PASSWORD)return null;let n;switch(r){case exp__namespace.ProviderId.GOOGLE:n=exp__namespace.GoogleAuthProvider;break;case exp__namespace.ProviderId.FACEBOOK:n=exp__namespace.FacebookAuthProvider;break;case exp__namespace.ProviderId.GITHUB:n=exp__namespace.GithubAuthProvider;break;case exp__namespace.ProviderId.TWITTER:n=exp__namespace.TwitterAuthProvider;break;default:const{oauthIdToken:e,oauthAccessToken:i,oauthTokenSecret:a,pendingToken:s,nonce:o}=t;return i||a||e||s?s?r.startsWith("saml.")?exp__namespace.SAMLAuthCredential._create(r,s):exp__namespace.OAuthCredential._fromParams({providerId:r,signInMethod:r,pendingToken:s,idToken:e,accessToken:i}):new exp__namespace.OAuthProvider(r).credential({idToken:e,accessToken:i,rawNonce:o}):null}return e instanceof util.FirebaseError?n.credentialFromError(e):n.credentialFromResult(e)}function convertCredential(e,t){return t.catch(t=>{throw t instanceof util.FirebaseError&&attachExtraErrorFields(e,t),t}).then(e=>{const t=e.operationType,r=e.user;return{operationType:t,credential:credentialFromResponse(e),additionalUserInfo:exp__namespace.getAdditionalUserInfo(e),user:User.getOrCreate(r)}})}async function convertConfirmationResult(e,t){const r=await t;return{verificationId:r.verificationId,confirm:t=>convertCredential(e,r.confirm(t))}}class MultiFactorResolver{constructor(e,t){this.resolver=t,this.auth=wrapped(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return convertCredential(unwrap(this.auth),this.resolver.resolveSignIn(e))}}
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
 */class User{constructor(e){this._delegate=e,this.multiFactor=exp__namespace.multiFactor(e)}static getOrCreate(e){return User.USER_MAP.has(e)||User.USER_MAP.set(e,new User(e)),User.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return convertCredential(this.auth,exp__namespace.linkWithCredential(this._delegate,e))}async linkWithPhoneNumber(e,t){return convertConfirmationResult(this.auth,exp__namespace.linkWithPhoneNumber(this._delegate,e,t))}async linkWithPopup(e){return convertCredential(this.auth,exp__namespace.linkWithPopup(this._delegate,e,CompatPopupRedirectResolver))}async linkWithRedirect(e){return await _savePersistenceForRedirect(exp__namespace._castAuth(this.auth)),exp__namespace.linkWithRedirect(this._delegate,e,CompatPopupRedirectResolver)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return convertCredential(this.auth,exp__namespace.reauthenticateWithCredential(this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return convertConfirmationResult(this.auth,exp__namespace.reauthenticateWithPhoneNumber(this._delegate,e,t))}reauthenticateWithPopup(e){return convertCredential(this.auth,exp__namespace.reauthenticateWithPopup(this._delegate,e,CompatPopupRedirectResolver))}async reauthenticateWithRedirect(e){return await _savePersistenceForRedirect(exp__namespace._castAuth(this.auth)),exp__namespace.reauthenticateWithRedirect(this._delegate,e,CompatPopupRedirectResolver)}sendEmailVerification(e){return exp__namespace.sendEmailVerification(this._delegate,e)}async unlink(e){return await exp__namespace.unlink(this._delegate,e),this}updateEmail(e){return exp__namespace.updateEmail(this._delegate,e)}updatePassword(e){return exp__namespace.updatePassword(this._delegate,e)}updatePhoneNumber(e){return exp__namespace.updatePhoneNumber(this._delegate,e)}updateProfile(e){return exp__namespace.updateProfile(this._delegate,e)}verifyBeforeUpdateEmail(e,t){return exp__namespace.verifyBeforeUpdateEmail(this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}User.USER_MAP=new WeakMap;
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
const _assert$1=exp__namespace._assert;class Auth{constructor(e,t){if(this.app=e,t.isInitialized())return this._delegate=t.getImmediate(),void this.linkUnderlyingAuth();const{apiKey:r}=e.options;_assert$1(r,"invalid-api-key",{appName:e.name}),_assert$1(r,"invalid-api-key",{appName:e.name});const n="undefined"!=typeof window?CompatPopupRedirectResolver:void 0;this._delegate=t.initialize({options:{persistence:buildPersistenceHierarchy(r,e.name),popupRedirectResolver:n}}),this._delegate._updateErrorMap(exp__namespace.debugErrorMap),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?User.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){exp__namespace.connectAuthEmulator(this._delegate,e,t)}applyActionCode(e){return exp__namespace.applyActionCode(this._delegate,e)}checkActionCode(e){return exp__namespace.checkActionCode(this._delegate,e)}confirmPasswordReset(e,t){return exp__namespace.confirmPasswordReset(this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return convertCredential(this._delegate,exp__namespace.createUserWithEmailAndPassword(this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return exp__namespace.fetchSignInMethodsForEmail(this._delegate,e)}isSignInWithEmailLink(e){return exp__namespace.isSignInWithEmailLink(this._delegate,e)}async getRedirectResult(){_assert$1(_isPopupRedirectSupported(),this._delegate,"operation-not-supported-in-this-environment");const e=await exp__namespace.getRedirectResult(this._delegate,CompatPopupRedirectResolver);return e?convertCredential(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){exp__namespace.addFrameworkForLogging(this._delegate,e)}onAuthStateChanged(e,t,r){const{next:n,error:i,complete:a}=wrapObservers(e,t,r);return this._delegate.onAuthStateChanged(n,i,a)}onIdTokenChanged(e,t,r){const{next:n,error:i,complete:a}=wrapObservers(e,t,r);return this._delegate.onIdTokenChanged(n,i,a)}sendSignInLinkToEmail(e,t){return exp__namespace.sendSignInLinkToEmail(this._delegate,e,t)}sendPasswordResetEmail(e,t){return exp__namespace.sendPasswordResetEmail(this._delegate,e,t||void 0)}async setPersistence(e){let t;switch(_validatePersistenceArgument(this._delegate,e),e){case Persistence.SESSION:t=exp__namespace.browserSessionPersistence;break;case Persistence.LOCAL:t=await exp__namespace._getInstance(exp__namespace.indexedDBLocalPersistence)._isAvailable()?exp__namespace.indexedDBLocalPersistence:exp__namespace.browserLocalPersistence;break;case Persistence.NONE:t=exp__namespace.inMemoryPersistence;break;default:return exp__namespace._fail("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return convertCredential(this._delegate,exp__namespace.signInAnonymously(this._delegate))}signInWithCredential(e){return convertCredential(this._delegate,exp__namespace.signInWithCredential(this._delegate,e))}signInWithCustomToken(e){return convertCredential(this._delegate,exp__namespace.signInWithCustomToken(this._delegate,e))}signInWithEmailAndPassword(e,t){return convertCredential(this._delegate,exp__namespace.signInWithEmailAndPassword(this._delegate,e,t))}signInWithEmailLink(e,t){return convertCredential(this._delegate,exp__namespace.signInWithEmailLink(this._delegate,e,t))}signInWithPhoneNumber(e,t){return convertConfirmationResult(this._delegate,exp__namespace.signInWithPhoneNumber(this._delegate,e,t))}async signInWithPopup(e){return _assert$1(_isPopupRedirectSupported(),this._delegate,"operation-not-supported-in-this-environment"),convertCredential(this._delegate,exp__namespace.signInWithPopup(this._delegate,e,CompatPopupRedirectResolver))}async signInWithRedirect(e){return _assert$1(_isPopupRedirectSupported(),this._delegate,"operation-not-supported-in-this-environment"),await _savePersistenceForRedirect(this._delegate),exp__namespace.signInWithRedirect(this._delegate,e,CompatPopupRedirectResolver)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return exp__namespace.verifyPasswordResetCode(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}function wrapObservers(e,t,r){let n=e;"function"!=typeof e&&({next:n,error:t,complete:r}=e);const i=n;return{next:e=>i(e&&User.getOrCreate(e)),error:t,complete:r}}function buildPersistenceHierarchy(e,t){const r=_getPersistencesFromRedirect(e,t);if("undefined"==typeof self||r.includes(exp__namespace.indexedDBLocalPersistence)||r.push(exp__namespace.indexedDBLocalPersistence),"undefined"!=typeof window)for(const e of[exp__namespace.browserLocalPersistence,exp__namespace.browserSessionPersistence])r.includes(e)||r.push(e);return r.includes(exp__namespace.inMemoryPersistence)||r.push(exp__namespace.inMemoryPersistence),r}
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
 */Auth.Persistence=Persistence;class PhoneAuthProvider{static credential(e,t){return exp__namespace.PhoneAuthProvider.credential(e,t)}constructor(){this.providerId="phone",this._delegate=new exp__namespace.PhoneAuthProvider(unwrap(firebase__default.default.auth()))}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}PhoneAuthProvider.PHONE_SIGN_IN_METHOD=exp__namespace.PhoneAuthProvider.PHONE_SIGN_IN_METHOD,PhoneAuthProvider.PROVIDER_ID=exp__namespace.PhoneAuthProvider.PROVIDER_ID;
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
const _assert=exp__namespace._assert;class RecaptchaVerifier{constructor(e,t,r=firebase__default.default.app()){_assert(r.options?.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new exp__namespace.RecaptchaVerifier(r.auth(),e,t),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}
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
 */const AUTH_TYPE="auth-compat";function registerAuthCompat(e){e.INTERNAL.registerComponent(new component.Component(AUTH_TYPE,e=>{const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth");return new Auth(t,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:exp__namespace.ActionCodeOperation.EMAIL_SIGNIN,PASSWORD_RESET:exp__namespace.ActionCodeOperation.PASSWORD_RESET,RECOVER_EMAIL:exp__namespace.ActionCodeOperation.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:exp__namespace.ActionCodeOperation.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:exp__namespace.ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:exp__namespace.ActionCodeOperation.VERIFY_EMAIL}},EmailAuthProvider:exp__namespace.EmailAuthProvider,FacebookAuthProvider:exp__namespace.FacebookAuthProvider,GithubAuthProvider:exp__namespace.GithubAuthProvider,GoogleAuthProvider:exp__namespace.GoogleAuthProvider,OAuthProvider:exp__namespace.OAuthProvider,SAMLAuthProvider:exp__namespace.SAMLAuthProvider,PhoneAuthProvider:PhoneAuthProvider,PhoneMultiFactorGenerator:exp__namespace.PhoneMultiFactorGenerator,RecaptchaVerifier:RecaptchaVerifier,TwitterAuthProvider:exp__namespace.TwitterAuthProvider,Auth:Auth,AuthCredential:exp__namespace.AuthCredential,Error:util.FirebaseError}).setInstantiationMode("LAZY").setMultipleInstances(!1)),e.registerVersion(name,version)}registerAuthCompat(firebase__default.default),
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
exp.FetchProvider.initialize(fetch,Headers,Response);