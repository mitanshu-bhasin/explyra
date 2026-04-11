import firebase from"@firebase/app-compat";import*as exp from"@firebase/auth/internal";import{FetchProvider}from"@firebase/auth/internal";import{Component}from"@firebase/component";import{isBrowserExtension,getUA,isReactNative,isNode,isIndexedDBAvailable,isIE,FirebaseError}from"@firebase/util";var name="@firebase/auth-compat",version="0.6.4";
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
const CORDOVA_ONDEVICEREADY_TIMEOUT_MS=1e3;function _getCurrentScheme(){return self?.location?.protocol||null}function _isHttpOrHttps(){return"http:"===_getCurrentScheme()||"https:"===_getCurrentScheme()}function _isAndroidOrIosCordovaScheme(e=getUA()){return!("file:"!==_getCurrentScheme()&&"ionic:"!==_getCurrentScheme()&&"capacitor:"!==_getCurrentScheme()||!e.toLowerCase().match(/iphone|ipad|ipod|android/))}function _isNativeEnvironment(){return isReactNative()||isNode()}function _isIe11(){return isIE()&&11===document?.documentMode}function _isEdge(e=getUA()){return/Edge\/\d+/.test(e)}function _isLocalStorageNotSynchronized(e=getUA()){return _isIe11()||_isEdge(e)}function _isWebStorageSupported(){try{const e=self.localStorage,t=exp._generateEventId();if(e)return e.setItem(t,"1"),e.removeItem(t),!_isLocalStorageNotSynchronized()||isIndexedDBAvailable()}catch(e){return _isWorker()&&isIndexedDBAvailable()}return!1}function _isWorker(){return"undefined"!=typeof global&&"WorkerGlobalScope"in global&&"importScripts"in global}function _isPopupRedirectSupported(){return(_isHttpOrHttps()||isBrowserExtension()||_isAndroidOrIosCordovaScheme())&&!_isNativeEnvironment()&&_isWebStorageSupported()&&!_isWorker()}function _isLikelyCordova(){return _isAndroidOrIosCordovaScheme()&&"undefined"!=typeof document}async function _isCordova(){return!!_isLikelyCordova()&&new Promise(e=>{const t=setTimeout(()=>{e(!1)},1e3);document.addEventListener("deviceready",()=>{clearTimeout(t),e(!0)})})}function _getSelfWindow(){return"undefined"!=typeof window?window:null}
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
 */const Persistence={LOCAL:"local",NONE:"none",SESSION:"session"},_assert$3=exp._assert,PERSISTENCE_KEY="persistence";function _validatePersistenceArgument(e,t){_assert$3(Object.values(Persistence).includes(t),e,"invalid-persistence-type"),isReactNative()?_assert$3(t!==Persistence.SESSION,e,"unsupported-persistence-type"):isNode()?_assert$3(t===Persistence.NONE,e,"unsupported-persistence-type"):_isWorker()?_assert$3(t===Persistence.NONE||t===Persistence.LOCAL&&isIndexedDBAvailable(),e,"unsupported-persistence-type"):_assert$3(t===Persistence.NONE||_isWebStorageSupported(),e,"unsupported-persistence-type")}async function _savePersistenceForRedirect(e){await e._initializationPromise;const t=getSessionStorageIfAvailable(),r=exp._persistenceKeyName("persistence",e.config.apiKey,e.name);t&&t.setItem(r,e._getPersistenceType())}function _getPersistencesFromRedirect(e,t){const r=getSessionStorageIfAvailable();if(!r)return[];const i=exp._persistenceKeyName("persistence",e,t);switch(r.getItem(i)){case Persistence.NONE:return[exp.inMemoryPersistence];case Persistence.LOCAL:return[exp.indexedDBLocalPersistence,exp.browserSessionPersistence];case Persistence.SESSION:return[exp.browserSessionPersistence];default:return[]}}function getSessionStorageIfAvailable(){try{return _getSelfWindow()?.sessionStorage||null}catch(e){return null}}
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
 */const _assert$2=exp._assert;class CompatPopupRedirectResolver{constructor(){this.browserResolver=exp._getInstance(exp.browserPopupRedirectResolver),this.cordovaResolver=exp._getInstance(exp.cordovaPopupRedirectResolver),this.underlyingResolver=null,this._redirectPersistence=exp.browserSessionPersistence,this._completeRedirectFn=exp._getRedirectResult,this._overrideRedirectResult=exp._overrideRedirectResult}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,r,i)}async _openRedirect(e,t,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,r,i)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return _isLikelyCordova()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return _assert$2(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await _isCordova();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}
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
 */function credentialFromResponse(e){return credentialFromObject(e)}function attachExtraErrorFields(e,t){const r=t.customData?._tokenResponse;if("auth/multi-factor-auth-required"===t?.code){t.resolver=new MultiFactorResolver(e,exp.getMultiFactorResolver(e,t))}else if(r){const e=credentialFromObject(t),i=t;e&&(i.credential=e,i.tenantId=r.tenantId||void 0,i.email=r.email||void 0,i.phoneNumber=r.phoneNumber||void 0)}}function credentialFromObject(e){const{_tokenResponse:t}=e instanceof FirebaseError?e.customData:e;if(!t)return null;if(!(e instanceof FirebaseError)&&"temporaryProof"in t&&"phoneNumber"in t)return exp.PhoneAuthProvider.credentialFromResult(e);const r=t.providerId;if(!r||r===exp.ProviderId.PASSWORD)return null;let i;switch(r){case exp.ProviderId.GOOGLE:i=exp.GoogleAuthProvider;break;case exp.ProviderId.FACEBOOK:i=exp.FacebookAuthProvider;break;case exp.ProviderId.GITHUB:i=exp.GithubAuthProvider;break;case exp.ProviderId.TWITTER:i=exp.TwitterAuthProvider;break;default:const{oauthIdToken:e,oauthAccessToken:n,oauthTokenSecret:s,pendingToken:o,nonce:a}=t;return n||s||e||o?o?r.startsWith("saml.")?exp.SAMLAuthCredential._create(r,o):exp.OAuthCredential._fromParams({providerId:r,signInMethod:r,pendingToken:o,idToken:e,accessToken:n}):new exp.OAuthProvider(r).credential({idToken:e,accessToken:n,rawNonce:a}):null}return e instanceof FirebaseError?i.credentialFromError(e):i.credentialFromResult(e)}function convertCredential(e,t){return t.catch(t=>{throw t instanceof FirebaseError&&attachExtraErrorFields(e,t),t}).then(e=>{const t=e.operationType,r=e.user;return{operationType:t,credential:credentialFromResponse(e),additionalUserInfo:exp.getAdditionalUserInfo(e),user:User.getOrCreate(r)}})}async function convertConfirmationResult(e,t){const r=await t;return{verificationId:r.verificationId,confirm:t=>convertCredential(e,r.confirm(t))}}class MultiFactorResolver{constructor(e,t){this.resolver=t,this.auth=wrapped(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return convertCredential(unwrap(this.auth),this.resolver.resolveSignIn(e))}}
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
 */class User{constructor(e){this._delegate=e,this.multiFactor=exp.multiFactor(e)}static getOrCreate(e){return User.USER_MAP.has(e)||User.USER_MAP.set(e,new User(e)),User.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return convertCredential(this.auth,exp.linkWithCredential(this._delegate,e))}async linkWithPhoneNumber(e,t){return convertConfirmationResult(this.auth,exp.linkWithPhoneNumber(this._delegate,e,t))}async linkWithPopup(e){return convertCredential(this.auth,exp.linkWithPopup(this._delegate,e,CompatPopupRedirectResolver))}async linkWithRedirect(e){return await _savePersistenceForRedirect(exp._castAuth(this.auth)),exp.linkWithRedirect(this._delegate,e,CompatPopupRedirectResolver)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return convertCredential(this.auth,exp.reauthenticateWithCredential(this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return convertConfirmationResult(this.auth,exp.reauthenticateWithPhoneNumber(this._delegate,e,t))}reauthenticateWithPopup(e){return convertCredential(this.auth,exp.reauthenticateWithPopup(this._delegate,e,CompatPopupRedirectResolver))}async reauthenticateWithRedirect(e){return await _savePersistenceForRedirect(exp._castAuth(this.auth)),exp.reauthenticateWithRedirect(this._delegate,e,CompatPopupRedirectResolver)}sendEmailVerification(e){return exp.sendEmailVerification(this._delegate,e)}async unlink(e){return await exp.unlink(this._delegate,e),this}updateEmail(e){return exp.updateEmail(this._delegate,e)}updatePassword(e){return exp.updatePassword(this._delegate,e)}updatePhoneNumber(e){return exp.updatePhoneNumber(this._delegate,e)}updateProfile(e){return exp.updateProfile(this._delegate,e)}verifyBeforeUpdateEmail(e,t){return exp.verifyBeforeUpdateEmail(this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}User.USER_MAP=new WeakMap;
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
const _assert$1=exp._assert;class Auth{constructor(e,t){if(this.app=e,t.isInitialized())return this._delegate=t.getImmediate(),void this.linkUnderlyingAuth();const{apiKey:r}=e.options;_assert$1(r,"invalid-api-key",{appName:e.name}),_assert$1(r,"invalid-api-key",{appName:e.name});const i="undefined"!=typeof window?CompatPopupRedirectResolver:void 0;this._delegate=t.initialize({options:{persistence:buildPersistenceHierarchy(r,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(exp.debugErrorMap),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?User.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){exp.connectAuthEmulator(this._delegate,e,t)}applyActionCode(e){return exp.applyActionCode(this._delegate,e)}checkActionCode(e){return exp.checkActionCode(this._delegate,e)}confirmPasswordReset(e,t){return exp.confirmPasswordReset(this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return convertCredential(this._delegate,exp.createUserWithEmailAndPassword(this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return exp.fetchSignInMethodsForEmail(this._delegate,e)}isSignInWithEmailLink(e){return exp.isSignInWithEmailLink(this._delegate,e)}async getRedirectResult(){_assert$1(_isPopupRedirectSupported(),this._delegate,"operation-not-supported-in-this-environment");const e=await exp.getRedirectResult(this._delegate,CompatPopupRedirectResolver);return e?convertCredential(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){exp.addFrameworkForLogging(this._delegate,e)}onAuthStateChanged(e,t,r){const{next:i,error:n,complete:s}=wrapObservers(e,t,r);return this._delegate.onAuthStateChanged(i,n,s)}onIdTokenChanged(e,t,r){const{next:i,error:n,complete:s}=wrapObservers(e,t,r);return this._delegate.onIdTokenChanged(i,n,s)}sendSignInLinkToEmail(e,t){return exp.sendSignInLinkToEmail(this._delegate,e,t)}sendPasswordResetEmail(e,t){return exp.sendPasswordResetEmail(this._delegate,e,t||void 0)}async setPersistence(e){let t;switch(_validatePersistenceArgument(this._delegate,e),e){case Persistence.SESSION:t=exp.browserSessionPersistence;break;case Persistence.LOCAL:t=await exp._getInstance(exp.indexedDBLocalPersistence)._isAvailable()?exp.indexedDBLocalPersistence:exp.browserLocalPersistence;break;case Persistence.NONE:t=exp.inMemoryPersistence;break;default:return exp._fail("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return convertCredential(this._delegate,exp.signInAnonymously(this._delegate))}signInWithCredential(e){return convertCredential(this._delegate,exp.signInWithCredential(this._delegate,e))}signInWithCustomToken(e){return convertCredential(this._delegate,exp.signInWithCustomToken(this._delegate,e))}signInWithEmailAndPassword(e,t){return convertCredential(this._delegate,exp.signInWithEmailAndPassword(this._delegate,e,t))}signInWithEmailLink(e,t){return convertCredential(this._delegate,exp.signInWithEmailLink(this._delegate,e,t))}signInWithPhoneNumber(e,t){return convertConfirmationResult(this._delegate,exp.signInWithPhoneNumber(this._delegate,e,t))}async signInWithPopup(e){return _assert$1(_isPopupRedirectSupported(),this._delegate,"operation-not-supported-in-this-environment"),convertCredential(this._delegate,exp.signInWithPopup(this._delegate,e,CompatPopupRedirectResolver))}async signInWithRedirect(e){return _assert$1(_isPopupRedirectSupported(),this._delegate,"operation-not-supported-in-this-environment"),await _savePersistenceForRedirect(this._delegate),exp.signInWithRedirect(this._delegate,e,CompatPopupRedirectResolver)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return exp.verifyPasswordResetCode(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}function wrapObservers(e,t,r){let i=e;"function"!=typeof e&&({next:i,error:t,complete:r}=e);const n=i;return{next:e=>n(e&&User.getOrCreate(e)),error:t,complete:r}}function buildPersistenceHierarchy(e,t){const r=_getPersistencesFromRedirect(e,t);if("undefined"==typeof self||r.includes(exp.indexedDBLocalPersistence)||r.push(exp.indexedDBLocalPersistence),"undefined"!=typeof window)for(const e of[exp.browserLocalPersistence,exp.browserSessionPersistence])r.includes(e)||r.push(e);return r.includes(exp.inMemoryPersistence)||r.push(exp.inMemoryPersistence),r}
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
 */Auth.Persistence=Persistence;class PhoneAuthProvider{static credential(e,t){return exp.PhoneAuthProvider.credential(e,t)}constructor(){this.providerId="phone",this._delegate=new exp.PhoneAuthProvider(unwrap(firebase.auth()))}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}PhoneAuthProvider.PHONE_SIGN_IN_METHOD=exp.PhoneAuthProvider.PHONE_SIGN_IN_METHOD,PhoneAuthProvider.PROVIDER_ID=exp.PhoneAuthProvider.PROVIDER_ID;
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
const _assert=exp._assert;class RecaptchaVerifier{constructor(e,t,r=firebase.app()){_assert(r.options?.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new exp.RecaptchaVerifier(r.auth(),e,t),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}
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
 */const AUTH_TYPE="auth-compat";function registerAuthCompat(e){e.INTERNAL.registerComponent(new Component(AUTH_TYPE,e=>{const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth");return new Auth(t,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:exp.ActionCodeOperation.EMAIL_SIGNIN,PASSWORD_RESET:exp.ActionCodeOperation.PASSWORD_RESET,RECOVER_EMAIL:exp.ActionCodeOperation.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:exp.ActionCodeOperation.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:exp.ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:exp.ActionCodeOperation.VERIFY_EMAIL}},EmailAuthProvider:exp.EmailAuthProvider,FacebookAuthProvider:exp.FacebookAuthProvider,GithubAuthProvider:exp.GithubAuthProvider,GoogleAuthProvider:exp.GoogleAuthProvider,OAuthProvider:exp.OAuthProvider,SAMLAuthProvider:exp.SAMLAuthProvider,PhoneAuthProvider:PhoneAuthProvider,PhoneMultiFactorGenerator:exp.PhoneMultiFactorGenerator,RecaptchaVerifier:RecaptchaVerifier,TwitterAuthProvider:exp.TwitterAuthProvider,Auth:Auth,AuthCredential:exp.AuthCredential,Error:FirebaseError}).setInstantiationMode("LAZY").setMultipleInstances(!1)),e.registerVersion(name,version)}registerAuthCompat(firebase),
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
FetchProvider.initialize(fetch,Headers,Response);