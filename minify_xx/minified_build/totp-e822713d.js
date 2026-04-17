"use strict";var app=require("@firebase/app"),util=require("@firebase/util"),component=require("@firebase/component"),logger=require("@firebase/logger");
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
 */function _debugErrorMap(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function _prodErrorMap(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const debugErrorMap=_debugErrorMap,prodErrorMap=_prodErrorMap,_DEFAULT_AUTH_ERROR_FACTORY=new util.ErrorFactory("auth","Firebase",_prodErrorMap()),AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_PASSWORD:"auth/missing-password",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"},logClient=new logger.Logger("@firebase/auth");function _logWarn(e,...t){logClient.logLevel<=logger.LogLevel.WARN&&logClient.warn(`Auth (${app.SDK_VERSION}): ${e}`,...t)}function _logError(e,...t){logClient.logLevel<=logger.LogLevel.ERROR&&logClient.error(`Auth (${app.SDK_VERSION}): ${e}`,...t)}
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
 */function _fail(e,...t){throw createErrorInternal(e,...t)}function _createError(e,...t){return createErrorInternal(e,...t)}function _errorWithCustomMessage(e,t,r){const i={...prodErrorMap(),[t]:r};return new util.ErrorFactory("auth","Firebase",i).create(t,{appName:e.name})}function _serverAppCurrentUserOperationNotSupportedError(e){return _errorWithCustomMessage(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function createErrorInternal(e,...t){if("string"!=typeof e){const r=t[0],i=[...t.slice(1)];return i[0]&&(i[0].appName=e.name),e._errorFactory.create(r,...i)}return _DEFAULT_AUTH_ERROR_FACTORY.create(e,...t)}function _assert(e,t,...r){if(!e)throw createErrorInternal(t,...r)}function debugFail(e){const t="INTERNAL ASSERTION FAILED: "+e;throw _logError(t),new Error(t)}function debugAssert(e,t){e||debugFail(t)}
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
 */function _getCurrentUrl(){return"undefined"!=typeof self&&self.location?.href||""}function _isHttpOrHttps(){return"http:"===_getCurrentScheme()||"https:"===_getCurrentScheme()}function _getCurrentScheme(){return"undefined"!=typeof self&&self.location?.protocol||null}
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
 */function _isOnline(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(_isHttpOrHttps()||util.isBrowserExtension()||"connection"in navigator))||navigator.onLine}function _getUserLanguage(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
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
 */class Delay{constructor(e,t){this.shortDelay=e,this.longDelay=t,debugAssert(t>e,"Short delay should be less than long delay!"),this.isMobile=util.isMobileCordova()||util.isReactNative()}get(){return _isOnline()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
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
 */function _emulatorUrl(e,t){debugAssert(e.emulator,"Emulator should always be set here");const{url:r}=e.emulator;return t?`${r}${t.startsWith("/")?t.slice(1):t}`:r}
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
 */class FetchProvider{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
 */const SERVER_ERROR_MAP={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},CookieAuthProxiedEndpoints=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],DEFAULT_API_TIMEOUT_MS=new Delay(3e4,6e4);
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
 */function _addTidIfNecessary(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function _performApiRequest(e,t,r,i,n={}){return _performFetchWithErrorHandling(e,n,async()=>{let n={},s={};i&&("GET"===t?s=i:n={body:JSON.stringify(i)});const o=util.querystring({key:e.config.apiKey,...s}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...n};return util.isCloudflareWorker()||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&util.isCloudWorkstation(e.emulatorConfig.host)&&(c.credentials="include"),FetchProvider.fetch()(await _getFinalTarget(e,e.config.apiHost,r,o),c)})}async function _performFetchWithErrorHandling(e,t,r){e._canInitEmulator=!1;const i={...SERVER_ERROR_MAP,...t};try{const t=new NetworkTimeout(e),n=await Promise.race([r(),t.promise]);t.clearNetworkTimeout();const s=await n.json();if("needConfirmation"in s)throw _makeTaggedError(e,"account-exists-with-different-credential",s);if(n.ok&&!("errorMessage"in s))return s;{const t=n.ok?s.errorMessage:s.error.message,[r,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===r)throw _makeTaggedError(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===r)throw _makeTaggedError(e,"email-already-in-use",s);if("USER_DISABLED"===r)throw _makeTaggedError(e,"user-disabled",s);const a=i[r]||r.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw _errorWithCustomMessage(e,a,o);_fail(e,a)}}catch(t){if(t instanceof util.FirebaseError)throw t;_fail(e,"network-request-failed",{message:String(t)})}}async function _performSignInRequest(e,t,r,i,n={}){const s=await _performApiRequest(e,t,r,i,n);return"mfaPendingCredential"in s&&_fail(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function _getFinalTarget(e,t,r,i){const n=`${t}${r}?${i}`,s=e,o=s.config.emulator?_emulatorUrl(e.config,n):`${e.config.apiScheme}://${n}`;return CookieAuthProxiedEndpoints.includes(r)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())?s._getPersistence()._getFinalTarget(o).toString():o}function _parseEnforcementState(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class NetworkTimeout{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(_createError(this.auth,"network-request-failed")),DEFAULT_API_TIMEOUT_MS.get())})}}function _makeTaggedError(e,t,r){const i={appName:e.name};r.email&&(i.email=r.email),r.phoneNumber&&(i.phoneNumber=r.phoneNumber);const n=_createError(e,t,i);return n.customData._tokenResponse=r,n}
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
 */function isEnterprise(e){return void 0!==e&&void 0!==e.enterprise}class RecaptchaConfig{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return _parseEnforcementState(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
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
 */async function getRecaptchaConfig(e,t){return _performApiRequest(e,"GET","/v2/recaptchaConfig",_addTidIfNecessary(e,t))}
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
 */async function deleteAccount(e,t){return _performApiRequest(e,"POST","/v1/accounts:delete",t)}async function deleteLinkedAccounts(e,t){return _performApiRequest(e,"POST","/v1/accounts:update",t)}async function getAccountInfo(e,t){return _performApiRequest(e,"POST","/v1/accounts:lookup",t)}
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
 */function utcTimestampToDateString(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}
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
 */function getIdToken(e,t=!1){return util.getModularInstance(e).getIdToken(t)}async function getIdTokenResult(e,t=!1){const r=util.getModularInstance(e),i=await r.getIdToken(t),n=_parseToken(i);_assert(n&&n.exp&&n.auth_time&&n.iat,r.auth,"internal-error");const s="object"==typeof n.firebase?n.firebase:void 0,o=s?.sign_in_provider;return{claims:n,token:i,authTime:utcTimestampToDateString(secondsStringToMilliseconds(n.auth_time)),issuedAtTime:utcTimestampToDateString(secondsStringToMilliseconds(n.iat)),expirationTime:utcTimestampToDateString(secondsStringToMilliseconds(n.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function secondsStringToMilliseconds(e){return 1e3*Number(e)}function _parseToken(e){const[t,r,i]=e.split(".");if(void 0===t||void 0===r||void 0===i)return _logError("JWT malformed, contained fewer than 3 sections"),null;try{const e=util.base64Decode(r);return e?JSON.parse(e):(_logError("Failed to decode base64 JWT payload"),null)}catch(e){return _logError("Caught error parsing JWT payload as JSON",e?.toString()),null}}function _tokenExpiresIn(e){const t=_parseToken(e);return _assert(t,"internal-error"),_assert(void 0!==t.exp,"internal-error"),_assert(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
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
 */async function _logoutIfInvalidated(e,t,r=!1){if(r)return t;try{return await t}catch(t){throw t instanceof util.FirebaseError&&isUserInvalidated(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}function isUserInvalidated({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
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
 */class ProactiveRefresh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
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
 */class UserMetadata{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=utcTimestampToDateString(this.lastLoginAt),this.creationTime=utcTimestampToDateString(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
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
 */async function _reloadWithoutSaving(e){const t=e.auth,r=await e.getIdToken(),i=await _logoutIfInvalidated(e,getAccountInfo(t,{idToken:r}));_assert(i?.users.length,t,"internal-error");const n=i.users[0];e._notifyReloadListener(n);const s=n.providerUserInfo?.length?extractProviderData(n.providerUserInfo):[],o=mergeProviderData(e.providerData,s),a=e.isAnonymous,c=!(e.email&&n.passwordHash||o?.length),u=!!a&&c,d={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:o,metadata:new UserMetadata(n.createdAt,n.lastLoginAt),isAnonymous:u};Object.assign(e,d)}async function reload(e){const t=util.getModularInstance(e);await _reloadWithoutSaving(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function mergeProviderData(e,t){return[...e.filter(e=>!t.some(t=>t.providerId===e.providerId)),...t]}function extractProviderData(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
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
 */async function requestStsToken(e,t){const r=await _performFetchWithErrorHandling(e,{},async()=>{const r=util.querystring({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:n}=e.config,s=await _getFinalTarget(e,i,"/v1/token",`key=${n}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:r};return e.emulatorConfig&&util.isCloudWorkstation(e.emulatorConfig.host)&&(a.credentials="include"),FetchProvider.fetch()(s,a)});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function revokeToken(e,t){return _performApiRequest(e,"POST","/v2/accounts:revokeToken",_addTidIfNecessary(e,t))}
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
 */class StsTokenManager{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_assert(e.idToken,"internal-error"),_assert(void 0!==e.idToken,"internal-error"),_assert(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):_tokenExpiresIn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){_assert(0!==e.length,"internal-error");const t=_tokenExpiresIn(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(_assert(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:n}=await requestStsToken(e,t);this.updateTokensAndExpiration(r,i,Number(n))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*r}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:n}=t,s=new StsTokenManager;return r&&(_assert("string"==typeof r,"internal-error",{appName:e}),s.refreshToken=r),i&&(_assert("string"==typeof i,"internal-error",{appName:e}),s.accessToken=i),n&&(_assert("number"==typeof n,"internal-error",{appName:e}),s.expirationTime=n),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new StsTokenManager,this.toJSON())}_performRefresh(){return debugFail("not implemented")}}
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
 */function assertStringOrUndefined(e,t){_assert("string"==typeof e||void 0===e,"internal-error",{appName:t})}class UserImpl{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new ProactiveRefresh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new UserMetadata(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await _logoutIfInvalidated(this,this.stsTokenManager.getToken(this.auth,e));return _assert(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return getIdTokenResult(this,e)}reload(){return reload(this)}_assign(e){this!==e&&(_assert(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new UserImpl({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){_assert(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await _reloadWithoutSaving(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(app._isFirebaseServerApp(this.auth.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this.auth));const e=await this.getIdToken();return await _logoutIfInvalidated(this,deleteAccount(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,n=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:l,isAnonymous:h,providerData:p,stsTokenManager:m}=t;_assert(d&&m,e,"internal-error");const f=StsTokenManager.fromJSON(this.name,m);_assert("string"==typeof d,e,"internal-error"),assertStringOrUndefined(r,e.name),assertStringOrUndefined(i,e.name),_assert("boolean"==typeof l,e,"internal-error"),_assert("boolean"==typeof h,e,"internal-error"),assertStringOrUndefined(n,e.name),assertStringOrUndefined(s,e.name),assertStringOrUndefined(o,e.name),assertStringOrUndefined(a,e.name),assertStringOrUndefined(c,e.name),assertStringOrUndefined(u,e.name);const _=new UserImpl({uid:d,auth:e,email:i,emailVerified:l,displayName:r,isAnonymous:h,photoURL:s,phoneNumber:n,tenantId:o,stsTokenManager:f,createdAt:c,lastLoginAt:u});return p&&Array.isArray(p)&&(_.providerData=p.map(e=>({...e}))),a&&(_._redirectEventId=a),_}static async _fromIdTokenResponse(e,t,r=!1){const i=new StsTokenManager;i.updateFromServerResponse(t);const n=new UserImpl({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await _reloadWithoutSaving(n),n}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];_assert(void 0!==i.localId,"internal-error");const n=void 0!==i.providerUserInfo?extractProviderData(i.providerUserInfo):[],s=!(i.email&&i.passwordHash||n?.length),o=new StsTokenManager;o.updateFromIdToken(r);const a=new UserImpl({uid:i.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:n,metadata:new UserMetadata(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash||n?.length)};return Object.assign(a,c),a
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
 */}}const instanceCache=new Map;function _getInstance(e){debugAssert(e instanceof Function,"Expected a class definition");let t=instanceCache.get(e);return t?(debugAssert(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,instanceCache.set(e,t),t)}
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
 */class InMemoryPersistence{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}InMemoryPersistence.type="NONE";const inMemoryPersistence=InMemoryPersistence;
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
 */function _persistenceKeyName(e,t,r){return`firebase:${e}:${t}:${r}`}class PersistenceUserManager{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:n}=this.auth;this.fullUserKey=_persistenceKeyName(this.userKey,i.apiKey,n),this.fullPersistenceKey=_persistenceKeyName("persistence",i.apiKey,n),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await getAccountInfo(this.auth,{idToken:e}).catch(()=>{});return t?UserImpl._fromGetAccountInfoResponse(this.auth,t,e):null}return UserImpl._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new PersistenceUserManager(_getInstance(inMemoryPersistence),e,r);const i=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let n=i[0]||_getInstance(inMemoryPersistence);const s=_persistenceKeyName(r,e.config.apiKey,e.name);let o=null;for(const r of t)try{const t=await r._get(s);if(t){let i;if("string"==typeof t){const r=await getAccountInfo(e,{idToken:t}).catch(()=>{});if(!r)break;i=await UserImpl._fromGetAccountInfoResponse(e,r,t)}else i=UserImpl._fromJSON(e,t);r!==n&&(o=i),n=r;break}}catch{}const a=i.filter(e=>e._shouldAllowMigration);return n._shouldAllowMigration&&a.length?(n=a[0],o&&await n._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==n)try{await e._remove(s)}catch{}})),new PersistenceUserManager(n,e,r)):new PersistenceUserManager(n,e,r)}}
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
 */function _getBrowserName(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(_isIEMobile(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(_isFirefox(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(_isBlackBerry(t))return"Blackberry";if(_isWebOS(t))return"Webos";if(_isSafari(t))return"Safari";if((t.includes("chrome/")||_isChromeIOS(t))&&!t.includes("edge/"))return"Chrome";if(_isAndroid(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=e.match(t);if(2===r?.length)return r[1]}return"Other"}function _isFirefox(e=util.getUA()){return/firefox\//i.test(e)}function _isSafari(e=util.getUA()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function _isChromeIOS(e=util.getUA()){return/crios\//i.test(e)}function _isIEMobile(e=util.getUA()){return/iemobile/i.test(e)}function _isAndroid(e=util.getUA()){return/android/i.test(e)}function _isBlackBerry(e=util.getUA()){return/blackberry/i.test(e)}function _isWebOS(e=util.getUA()){return/webos/i.test(e)}function _isIOS(e=util.getUA()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function _isIOS7Or8(e=util.getUA()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(e)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(e)}function _isIE10(){return util.isIE()&&10===document.documentMode}function _isMobileBrowser(e=util.getUA()){return _isIOS(e)||_isAndroid(e)||_isWebOS(e)||_isBlackBerry(e)||/windows phone/i.test(e)||_isIEMobile(e)}
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
 */function _getClientVersion(e,t=[]){let r;switch(e){case"Browser":r=_getBrowserName(util.getUA());break;case"Worker":r=`${_getBrowserName(util.getUA())}-${e}`;break;default:r=e}const i=t.length?t.join(","):"FirebaseCore-web";return`${r}/JsCore/${app.SDK_VERSION}/${i}`
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
 */}class AuthMiddlewareQueue{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=t=>new Promise((r,i)=>{try{r(e(t))}catch(e){i(e)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(e){t.reverse();for(const r of t)try{r()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:e?.message})}}}
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
 */async function _getPasswordPolicy(e,t={}){return _performApiRequest(e,"GET","/v2/passwordPolicy",_addTidIfNecessary(e,t))}
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
 */const MINIMUM_MIN_PASSWORD_LENGTH=6;class PasswordPolicyImpl{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){let r;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,n){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=n))
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
 */}}class AuthImpl{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Subscription(this),this.idTokenSubscription=new Subscription(this),this.beforeStateQueue=new AuthMiddlewareQueue(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_DEFAULT_AUTH_ERROR_FACTORY,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=_getInstance(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await PersistenceUserManager.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await getAccountInfo(this,{idToken:e}),r=await UserImpl._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(app._isFirebaseServerApp(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,n=r?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==n||!s?.user||(r=s.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return _assert(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await _reloadWithoutSaving(e)}catch(e){if("auth/network-request-failed"!==e?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=_getUserLanguage()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(app._isFirebaseServerApp(this.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));const t=e?util.getModularInstance(e):null;return t&&_assert(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&_assert(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return app._isFirebaseServerApp(this.app)?Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return app._isFirebaseServerApp(this.app)?Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_getInstance(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await _getPasswordPolicy(this),t=new PasswordPolicyImpl(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new util.ErrorFactory("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await revokeToken(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return null===e?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&_getInstance(e)||this._popupRedirectResolver;_assert(t,this,"argument-error"),this.redirectPersistenceManager=await PersistenceUserManager.create(this,[_getInstance(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const n="function"==typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(_assert(o,this,"internal-error"),o.then(()=>{s||n(this.currentUser)}),"function"==typeof t){const n=e.addObserver(t,r,i);return()=>{s=!0,n()}}{const r=e.addObserver(t);return()=>{s=!0,r()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _assert(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_getClientVersion(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(app._isFirebaseServerApp(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&_logWarn(`Error while retrieving App Check token: ${e.error}`),e?.token}}function _castAuth(e){return util.getModularInstance(e)}class Subscription{constructor(e){this.auth=e,this.observer=null,this.addObserver=util.createSubscribe(e=>this.observer=e)}get next(){return _assert(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)
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
 */}}let externalJSProvider={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _loadJS(e){return externalJSProvider.loadJS(e)}function _recaptchaEnterpriseScriptUrl(){return externalJSProvider.recaptchaEnterpriseScript}
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
 */class MockGreCAPTCHATopLevel{constructor(){this.enterprise=new MockGreCAPTCHA}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class MockGreCAPTCHA{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const RECAPTCHA_ENTERPRISE_VERIFIER_TYPE="recaptcha-enterprise",FAKE_TOKEN="NO_RECAPTCHA";class RecaptchaEnterpriseVerifier{constructor(e){this.type="recaptcha-enterprise",this.auth=_castAuth(e)}async verify(e="verify",t=!1){function r(t,r,i){const n=window.grecaptcha;isEnterprise(n)?n.enterprise.ready(()=>{n.enterprise.execute(t,{action:e}).then(e=>{r(e)}).catch(()=>{r(FAKE_TOKEN)})}):i(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?(new MockGreCAPTCHATopLevel).execute("siteKey",{action:"verify"}):new Promise((e,i)=>{(async function(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,r)=>{getRecaptchaConfig(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(i=>{if(void 0!==i.recaptchaKey){const r=new RecaptchaConfig(i);return null==e.tenantId?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,t(r.siteKey)}r(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{r(e)})})})(this.auth).then(n=>{if(!t&&isEnterprise(window.grecaptcha))r(n,e,i);else{if("undefined"==typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=_recaptchaEnterpriseScriptUrl();0!==t.length&&(t+=n),_loadJS(t).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function injectRecaptchaFields(e,t,r,i=!1,n=!1){const s=new RecaptchaEnterpriseVerifier(e);let o;if(n)o=FAKE_TOKEN;else try{o=await s.verify(r)}catch(e){o=await s.verify(r,!0)}const a={...t};if("mfaSmsEnrollment"===r||"mfaSmsSignIn"===r){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function handleRecaptchaFlow(e,t,r,i,n){if("EMAIL_PASSWORD_PROVIDER"===n){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const n=await injectRecaptchaFields(e,t,r,"getOobCode"===r);return i(e,n)}return i(e,t).catch(async n=>{if("auth/missing-recaptcha-token"===n.code){console.log(`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const n=await injectRecaptchaFields(e,t,r,"getOobCode"===r);return i(e,n)}return Promise.reject(n)})}if("PHONE_PROVIDER"===n){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const n=await injectRecaptchaFields(e,t,r);return i(e,n).catch(async n=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===n.code||"auth/invalid-app-credential"===n.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${r} flow.`);const n=await injectRecaptchaFields(e,t,r,!1,!0);return i(e,n)}return Promise.reject(n)})}{const n=await injectRecaptchaFields(e,t,r,!1,!0);return i(e,n)}}return Promise.reject(n+" provider is not supported.")}async function _initializeRecaptchaConfig(e){const t=_castAuth(e),r=await getRecaptchaConfig(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),i=new RecaptchaConfig(r);null==t.tenantId?t._agentRecaptchaConfig=i:t._tenantRecaptchaConfigs[t.tenantId]=i,i.isAnyProviderEnabled()&&new RecaptchaEnterpriseVerifier(t).verify()}
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
 */function initializeAuth(e,t){const r=app._getProvider(e,"auth");if(r.isInitialized()){const e=r.getImmediate(),i=r.getOptions();if(util.deepEqual(i,t??{}))return e;_fail(e,"already-initialized")}return r.initialize({options:t})}function _initializeAuthInstance(e,t){const r=t?.persistence||[],i=(Array.isArray(r)?r:[r]).map(_getInstance);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(i,t?.popupRedirectResolver)}function connectAuthEmulator(e,t,r){const i=_castAuth(e);_assert(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");const n=!!r?.disableWarnings,s=extractProtocol(t),{host:o,port:a}=extractHostAndPort(t),c=null===a?"":`:${a}`,u={url:`${s}//${o}${c}/`},d=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:n})});if(!i._canInitEmulator)return _assert(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),void _assert(util.deepEqual(u,i.config.emulator)&&util.deepEqual(d,i.emulatorConfig),i,"emulator-config-failed");i.config.emulator=u,i.emulatorConfig=d,i.settings.appVerificationDisabledForTesting=!0,util.isCloudWorkstation(o)?(util.pingServer(`${s}//${o}${c}`),util.updateEmulatorBanner("Auth",!0)):n||emitEmulatorWarning()}function extractProtocol(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function extractHostAndPort(e){const t=extractProtocol(e),r=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!r)return{host:"",port:null};const i=r[2].split("@").pop()||"",n=/^(\[[^\]]+\])(:|$)/.exec(i);if(n){const e=n[1];return{host:e,port:parsePort(i.substr(e.length+1))}}{const[e,t]=i.split(":");return{host:e,port:parsePort(t)}}}function parsePort(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function emitEmulatorWarning(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
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
 */class AuthCredential{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return debugFail("not implemented")}_getIdTokenResponse(e){return debugFail("not implemented")}_linkToIdToken(e,t){return debugFail("not implemented")}_getReauthenticationResolver(e){return debugFail("not implemented")}}
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
 */async function resetPassword(e,t){return _performApiRequest(e,"POST","/v1/accounts:resetPassword",_addTidIfNecessary(e,t))}async function updateEmailPassword(e,t){return _performApiRequest(e,"POST","/v1/accounts:update",t)}async function linkEmailPassword(e,t){return _performApiRequest(e,"POST","/v1/accounts:signUp",t)}async function applyActionCode$1(e,t){return _performApiRequest(e,"POST","/v1/accounts:update",_addTidIfNecessary(e,t))}
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
 */async function signInWithPassword(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithPassword",_addTidIfNecessary(e,t))}async function sendOobCode(e,t){return _performApiRequest(e,"POST","/v1/accounts:sendOobCode",_addTidIfNecessary(e,t))}async function sendEmailVerification$1(e,t){return sendOobCode(e,t)}async function sendPasswordResetEmail$1(e,t){return sendOobCode(e,t)}async function sendSignInLinkToEmail$1(e,t){return sendOobCode(e,t)}async function verifyAndChangeEmail(e,t){return sendOobCode(e,t)}
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
 */async function signInWithEmailLink$1(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithEmailLink",_addTidIfNecessary(e,t))}async function signInWithEmailLinkForLinking(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithEmailLink",_addTidIfNecessary(e,t))}
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
 */class EmailAuthCredential extends AuthCredential{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new EmailAuthCredential(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new EmailAuthCredential(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return handleRecaptchaFlow(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",signInWithPassword,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return signInWithEmailLink$1(e,{email:this._email,oobCode:this._password});default:_fail(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return handleRecaptchaFlow(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",linkEmailPassword,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return signInWithEmailLinkForLinking(e,{idToken:t,email:this._email,oobCode:this._password});default:_fail(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
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
 */async function signInWithIdp(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithIdp",_addTidIfNecessary(e,t))}
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
 */const IDP_REQUEST_URI$1="http://localhost";class OAuthCredential extends AuthCredential{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new OAuthCredential(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_fail("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:r,signInMethod:i,...n}=t;if(!r||!i)return null;const s=new OAuthCredential(r,i);return s.idToken=n.idToken||void 0,s.accessToken=n.accessToken||void 0,s.secret=n.secret,s.nonce=n.nonce,s.pendingToken=n.pendingToken||null,s}_getIdTokenResponse(e){return signInWithIdp(e,this.buildRequest())}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,signInWithIdp(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,signInWithIdp(e,t)}buildRequest(){const e={requestUri:IDP_REQUEST_URI$1,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=util.querystring(t)}return e}}
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
 */async function signInWithPhoneNumber$1(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithPhoneNumber",_addTidIfNecessary(e,t))}async function linkWithPhoneNumber$1(e,t){const r=await _performSignInRequest(e,"POST","/v1/accounts:signInWithPhoneNumber",_addTidIfNecessary(e,t));if(r.temporaryProof)throw _makeTaggedError(e,"account-exists-with-different-credential",r);return r}const VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_={USER_NOT_FOUND:"user-not-found"};async function verifyPhoneNumberForExisting(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithPhoneNumber",_addTidIfNecessary(e,{...t,operation:"REAUTH"}),VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_)}
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
 */class PhoneAuthCredential extends AuthCredential{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new PhoneAuthCredential({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new PhoneAuthCredential({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return signInWithPhoneNumber$1(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return linkWithPhoneNumber$1(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return verifyPhoneNumberForExisting(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:n}=e;return r||t||i||n?new PhoneAuthCredential({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:n}):null}}
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
 */function parseMode(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function parseDeepLink(e){const t=util.querystringDecode(util.extractQuerystring(e)).link,r=t?util.querystringDecode(util.extractQuerystring(t)).deep_link_id:null,i=util.querystringDecode(util.extractQuerystring(e)).deep_link_id;return(i?util.querystringDecode(util.extractQuerystring(i)).link:null)||i||r||t||e}class ActionCodeURL{constructor(e){const t=util.querystringDecode(util.extractQuerystring(e)),r=t.apiKey??null,i=t.oobCode??null,n=parseMode(t.mode??null);_assert(r&&i&&n,"argument-error"),this.apiKey=r,this.operation=n,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=parseDeepLink(e);try{return new ActionCodeURL(t)}catch{return null}}}function parseActionCodeURL(e){return ActionCodeURL.parseLink(e)}
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
 */class EmailAuthProvider{constructor(){this.providerId=EmailAuthProvider.PROVIDER_ID}static credential(e,t){return EmailAuthCredential._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ActionCodeURL.parseLink(t);return _assert(r,"argument-error"),EmailAuthCredential._fromEmailAndCode(e,r.code,r.tenantId)}}EmailAuthProvider.PROVIDER_ID="password",EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD="password",EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
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
class FederatedAuthProvider{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
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
 */class BaseOAuthProvider extends FederatedAuthProvider{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class OAuthProvider extends BaseOAuthProvider{static credentialFromJSON(e){const t="string"==typeof e?JSON.parse(e):e;return _assert("providerId"in t&&"signInMethod"in t,"argument-error"),OAuthCredential._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return _assert(e.idToken||e.accessToken,"argument-error"),OAuthCredential._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return OAuthProvider.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return OAuthProvider.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:n,nonce:s,providerId:o}=e;if(!(r||i||t||n))return null;if(!o)return null;try{return new OAuthProvider(o)._credential({idToken:t,accessToken:r,nonce:s,pendingToken:n})}catch(e){return null}}}
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
 */class FacebookAuthProvider extends BaseOAuthProvider{constructor(){super("facebook.com")}static credential(e){return OAuthCredential._fromParams({providerId:FacebookAuthProvider.PROVIDER_ID,signInMethod:FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return FacebookAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return FacebookAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return FacebookAuthProvider.credential(e.oauthAccessToken)}catch{return null}}}FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD="facebook.com",FacebookAuthProvider.PROVIDER_ID="facebook.com";
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
class GoogleAuthProvider extends BaseOAuthProvider{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return OAuthCredential._fromParams({providerId:GoogleAuthProvider.PROVIDER_ID,signInMethod:GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return GoogleAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return GoogleAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return GoogleAuthProvider.credential(t,r)}catch{return null}}}GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD="google.com",GoogleAuthProvider.PROVIDER_ID="google.com";
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
class GithubAuthProvider extends BaseOAuthProvider{constructor(){super("github.com")}static credential(e){return OAuthCredential._fromParams({providerId:GithubAuthProvider.PROVIDER_ID,signInMethod:GithubAuthProvider.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return GithubAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return GithubAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return GithubAuthProvider.credential(e.oauthAccessToken)}catch{return null}}}GithubAuthProvider.GITHUB_SIGN_IN_METHOD="github.com",GithubAuthProvider.PROVIDER_ID="github.com";
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
const IDP_REQUEST_URI="http://localhost";class SAMLAuthCredential extends AuthCredential{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){return signInWithIdp(e,this.buildRequest())}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,signInWithIdp(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,signInWithIdp(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:n}=t;return r&&i&&n&&r===i?new SAMLAuthCredential(r,n):null}static _create(e,t){return new SAMLAuthCredential(e,t)}buildRequest(){return{requestUri:IDP_REQUEST_URI,returnSecureToken:!0,pendingToken:this.pendingToken}}}
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
 */const SAML_PROVIDER_PREFIX="saml.";class SAMLAuthProvider extends FederatedAuthProvider{constructor(e){_assert(e.startsWith("saml."),"argument-error"),super(e)}static credentialFromResult(e){return SAMLAuthProvider.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return SAMLAuthProvider.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=SAMLAuthCredential.fromJSON(e);return _assert(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return SAMLAuthCredential._create(r,t)}catch(e){return null}}}
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
 */class TwitterAuthProvider extends BaseOAuthProvider{constructor(){super("twitter.com")}static credential(e,t){return OAuthCredential._fromParams({providerId:TwitterAuthProvider.PROVIDER_ID,signInMethod:TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return TwitterAuthProvider.credentialFromTaggedObject(e)}static credentialFromError(e){return TwitterAuthProvider.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return TwitterAuthProvider.credential(t,r)}catch{return null}}}
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
 */async function signUp(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signUp",_addTidIfNecessary(e,t))}
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
 */TwitterAuthProvider.TWITTER_SIGN_IN_METHOD="twitter.com",TwitterAuthProvider.PROVIDER_ID="twitter.com";class UserCredentialImpl{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const n=await UserImpl._fromIdTokenResponse(e,r,i),s=providerIdForResponse(r);return new UserCredentialImpl({user:n,providerId:s,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=providerIdForResponse(r);return new UserCredentialImpl({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function providerIdForResponse(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
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
 */async function signInAnonymously(e){if(app._isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const t=_castAuth(e);if(await t._initializationPromise,t.currentUser?.isAnonymous)return new UserCredentialImpl({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await signUp(t,{returnSecureToken:!0}),i=await UserCredentialImpl._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}
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
 */class MultiFactorError extends util.FirebaseError{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,MultiFactorError.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new MultiFactorError(e,t,r,i)}}function _processCredentialSavingMfaContextIfNecessary(e,t,r,i){return("reauthenticate"===t?r._getReauthenticationResolver(e):r._getIdTokenResponse(e)).catch(r=>{if("auth/multi-factor-auth-required"===r.code)throw MultiFactorError._fromErrorAndOperation(e,r,t,i);throw r})}
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
 */function providerDataAsNames(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}
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
 */async function unlink(e,t){const r=util.getModularInstance(e);await _assertLinkedStatus(!0,r,t);const{providerUserInfo:i}=await deleteLinkedAccounts(r.auth,{idToken:await r.getIdToken(),deleteProvider:[t]}),n=providerDataAsNames(i||[]);return r.providerData=r.providerData.filter(e=>n.has(e.providerId)),n.has("phone")||(r.phoneNumber=null),await r.auth._persistUserIfCurrent(r),r}async function _link(e,t,r=!1){const i=await _logoutIfInvalidated(e,t._linkToIdToken(e.auth,await e.getIdToken()),r);return UserCredentialImpl._forOperation(e,"link",i)}async function _assertLinkedStatus(e,t,r){await _reloadWithoutSaving(t);const i=!1===e?"provider-already-linked":"no-such-provider";_assert(providerDataAsNames(t.providerData).has(r)===e,t.auth,i)}
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
 */async function _reauthenticate(e,t,r=!1){const{auth:i}=e;if(app._isFirebaseServerApp(i.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(i));const n="reauthenticate";try{const s=await _logoutIfInvalidated(e,_processCredentialSavingMfaContextIfNecessary(i,n,t,e),r);_assert(s.idToken,i,"internal-error");const o=_parseToken(s.idToken);_assert(o,i,"internal-error");const{sub:a}=o;return _assert(e.uid===a,i,"user-mismatch"),UserCredentialImpl._forOperation(e,n,s)}catch(e){throw"auth/user-not-found"===e?.code&&_fail(i,"user-mismatch"),e
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
 */}}async function _signInWithCredential(e,t,r=!1){if(app._isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const i="signIn",n=await _processCredentialSavingMfaContextIfNecessary(e,i,t),s=await UserCredentialImpl._fromIdTokenResponse(e,i,n);return r||await e._updateCurrentUser(s.user),s}async function signInWithCredential(e,t){return _signInWithCredential(_castAuth(e),t)}async function linkWithCredential(e,t){const r=util.getModularInstance(e);return await _assertLinkedStatus(!1,r,t.providerId),_link(r,t)}async function reauthenticateWithCredential(e,t){return _reauthenticate(util.getModularInstance(e),t)}
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
 */async function signInWithCustomToken$1(e,t){return _performSignInRequest(e,"POST","/v1/accounts:signInWithCustomToken",_addTidIfNecessary(e,t))}
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
 */async function signInWithCustomToken(e,t){if(app._isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const r=_castAuth(e),i=await signInWithCustomToken$1(r,{token:t,returnSecureToken:!0}),n=await UserCredentialImpl._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(n.user),n}
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
 */class MultiFactorInfoImpl{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?PhoneMultiFactorInfoImpl._fromServerResponse(e,t):"totpInfo"in t?TotpMultiFactorInfoImpl._fromServerResponse(e,t):_fail(e,"internal-error")}}class PhoneMultiFactorInfoImpl extends MultiFactorInfoImpl{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new PhoneMultiFactorInfoImpl(t)}}class TotpMultiFactorInfoImpl extends MultiFactorInfoImpl{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new TotpMultiFactorInfoImpl(t)}}
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
 */function _setActionCodeSettingsOnRequest(e,t,r){_assert(r.url?.length>0,e,"invalid-continue-uri"),_assert(void 0===r.dynamicLinkDomain||r.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),_assert(void 0===r.linkDomain||r.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=r.url,t.dynamicLinkDomain=r.dynamicLinkDomain,t.linkDomain=r.linkDomain,t.canHandleCodeInApp=r.handleCodeInApp,r.iOS&&(_assert(r.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=r.iOS.bundleId),r.android&&(_assert(r.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=r.android.installApp,t.androidMinimumVersionCode=r.android.minimumVersion,t.androidPackageName=r.android.packageName)}
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
 */async function recachePasswordPolicy(e){const t=_castAuth(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function sendPasswordResetEmail(e,t,r){const i=_castAuth(e),n={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};r&&_setActionCodeSettingsOnRequest(i,n,r),await handleRecaptchaFlow(i,n,"getOobCode",sendPasswordResetEmail$1,"EMAIL_PASSWORD_PROVIDER")}async function confirmPasswordReset(e,t,r){await resetPassword(util.getModularInstance(e),{oobCode:t,newPassword:r}).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&recachePasswordPolicy(e),t})}async function applyActionCode(e,t){await applyActionCode$1(util.getModularInstance(e),{oobCode:t})}async function checkActionCode(e,t){const r=util.getModularInstance(e),i=await resetPassword(r,{oobCode:t}),n=i.requestType;switch(_assert(n,r,"internal-error"),n){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":_assert(i.newEmail,r,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":_assert(i.mfaInfo,r,"internal-error");default:_assert(i.email,r,"internal-error")}let s=null;return i.mfaInfo&&(s=MultiFactorInfoImpl._fromServerResponse(_castAuth(r),i.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.newEmail:i.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.email:i.newEmail)||null,multiFactorInfo:s},operation:n}}async function verifyPasswordResetCode(e,t){const{data:r}=await checkActionCode(util.getModularInstance(e),t);return r.email}async function createUserWithEmailAndPassword(e,t,r){if(app._isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const i=_castAuth(e),n=handleRecaptchaFlow(i,{returnSecureToken:!0,email:t,password:r,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",signUp,"EMAIL_PASSWORD_PROVIDER"),s=await n.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&recachePasswordPolicy(e),t}),o=await UserCredentialImpl._fromIdTokenResponse(i,"signIn",s);return await i._updateCurrentUser(o.user),o}function signInWithEmailAndPassword(e,t,r){return app._isFirebaseServerApp(e.app)?Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e)):signInWithCredential(util.getModularInstance(e),EmailAuthProvider.credential(t,r)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&recachePasswordPolicy(e),t})}
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
 */async function sendSignInLinkToEmail(e,t,r){const i=_castAuth(e),n={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};!function(e,t){_assert(t.handleCodeInApp,i,"argument-error"),t&&_setActionCodeSettingsOnRequest(i,e,t)}(n,r),await handleRecaptchaFlow(i,n,"getOobCode",sendSignInLinkToEmail$1,"EMAIL_PASSWORD_PROVIDER")}function isSignInWithEmailLink(e,t){const r=ActionCodeURL.parseLink(t);return"EMAIL_SIGNIN"===r?.operation}async function signInWithEmailLink(e,t,r){if(app._isFirebaseServerApp(e.app))return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(e));const i=util.getModularInstance(e),n=EmailAuthProvider.credentialWithLink(t,r||_getCurrentUrl());return _assert(n._tenantId===(i.tenantId||null),i,"tenant-id-mismatch"),signInWithCredential(i,n)}
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
 */async function createAuthUri(e,t){return _performApiRequest(e,"POST","/v1/accounts:createAuthUri",_addTidIfNecessary(e,t))}
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
 */async function fetchSignInMethodsForEmail(e,t){const r={identifier:t,continueUri:_isHttpOrHttps()?_getCurrentUrl():"http://localhost"},{signinMethods:i}=await createAuthUri(util.getModularInstance(e),r);return i||[]}async function sendEmailVerification(e,t){const r=util.getModularInstance(e),i={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()};t&&_setActionCodeSettingsOnRequest(r.auth,i,t);const{email:n}=await sendEmailVerification$1(r.auth,i);n!==e.email&&await e.reload()}async function verifyBeforeUpdateEmail(e,t,r){const i=util.getModularInstance(e),n={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await e.getIdToken(),newEmail:t};r&&_setActionCodeSettingsOnRequest(i.auth,n,r);const{email:s}=await verifyAndChangeEmail(i.auth,n);s!==e.email&&await e.reload()}
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
 */async function updateProfile$1(e,t){return _performApiRequest(e,"POST","/v1/accounts:update",t)}
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
 */async function updateProfile(e,{displayName:t,photoURL:r}){if(void 0===t&&void 0===r)return;const i=util.getModularInstance(e),n={idToken:await i.getIdToken(),displayName:t,photoUrl:r,returnSecureToken:!0},s=await _logoutIfInvalidated(i,updateProfile$1(i.auth,n));i.displayName=s.displayName||null,i.photoURL=s.photoUrl||null;const o=i.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=i.displayName,o.photoURL=i.photoURL),await i._updateTokensIfNecessary(s)}function updateEmail(e,t){const r=util.getModularInstance(e);return app._isFirebaseServerApp(r.auth.app)?Promise.reject(_serverAppCurrentUserOperationNotSupportedError(r.auth)):updateEmailOrPassword(r,t,null)}function updatePassword(e,t){return updateEmailOrPassword(util.getModularInstance(e),null,t)}async function updateEmailOrPassword(e,t,r){const{auth:i}=e,n={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(n.email=t),r&&(n.password=r);const s=await _logoutIfInvalidated(e,updateEmailPassword(i,n));await e._updateTokensIfNecessary(s,!0)}
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
 */function _fromIdTokenResponse(e){if(!e)return null;const{providerId:t}=e,r=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},i=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!t&&e?.idToken){const t=_parseToken(e.idToken)?.firebase?.sign_in_provider;if(t)return new GenericAdditionalUserInfo(i,"anonymous"!==t&&"custom"!==t?t:null)}if(!t)return null;switch(t){case"facebook.com":return new FacebookAdditionalUserInfo(i,r);case"github.com":return new GithubAdditionalUserInfo(i,r);case"google.com":return new GoogleAdditionalUserInfo(i,r);case"twitter.com":return new TwitterAdditionalUserInfo(i,r,e.screenName||null);case"custom":case"anonymous":return new GenericAdditionalUserInfo(i,null);default:return new GenericAdditionalUserInfo(i,t,r)}}class GenericAdditionalUserInfo{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class FederatedAdditionalUserInfoWithUsername extends GenericAdditionalUserInfo{constructor(e,t,r,i){super(e,t,r),this.username=i}}class FacebookAdditionalUserInfo extends GenericAdditionalUserInfo{constructor(e,t){super(e,"facebook.com",t)}}class GithubAdditionalUserInfo extends FederatedAdditionalUserInfoWithUsername{constructor(e,t){super(e,"github.com",t,"string"==typeof t?.login?t?.login:null)}}class GoogleAdditionalUserInfo extends GenericAdditionalUserInfo{constructor(e,t){super(e,"google.com",t)}}class TwitterAdditionalUserInfo extends FederatedAdditionalUserInfoWithUsername{constructor(e,t,r){super(e,"twitter.com",t,r)}}function getAdditionalUserInfo(e){const{user:t,_tokenResponse:r}=e;return t.isAnonymous&&!r?{providerId:null,isNewUser:!1,profile:null}:_fromIdTokenResponse(r)}
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
 */function setPersistence(e,t){return util.getModularInstance(e).setPersistence(t)}function initializeRecaptchaConfig(e){return _initializeRecaptchaConfig(e)}async function validatePassword(e,t){return _castAuth(e).validatePassword(t)}function onIdTokenChanged(e,t,r,i){return util.getModularInstance(e).onIdTokenChanged(t,r,i)}function beforeAuthStateChanged(e,t,r){return util.getModularInstance(e).beforeAuthStateChanged(t,r)}function onAuthStateChanged(e,t,r,i){return util.getModularInstance(e).onAuthStateChanged(t,r,i)}function useDeviceLanguage(e){util.getModularInstance(e).useDeviceLanguage()}function updateCurrentUser(e,t){return util.getModularInstance(e).updateCurrentUser(t)}function signOut(e){return util.getModularInstance(e).signOut()}function revokeAccessToken(e,t){return _castAuth(e).revokeAccessToken(t)}async function deleteUser(e){return util.getModularInstance(e).delete()}
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
 */class MultiFactorSessionImpl{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new MultiFactorSessionImpl("enroll",e,t)}static _fromMfaPendingCredential(e){return new MultiFactorSessionImpl("signin",e)}toJSON(){const e="enroll"===this.type?"idToken":"pendingCredential";return{multiFactorSession:{[e]:this.credential}}}static fromJSON(e){if(e?.multiFactorSession){if(e.multiFactorSession?.pendingCredential)return MultiFactorSessionImpl._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(e.multiFactorSession?.idToken)return MultiFactorSessionImpl._fromIdtoken(e.multiFactorSession.idToken)}return null}}
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
 */class MultiFactorResolverImpl{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=_castAuth(e),i=t.customData._serverResponse,n=(i.mfaInfo||[]).map(e=>MultiFactorInfoImpl._fromServerResponse(r,e));_assert(i.mfaPendingCredential,r,"internal-error");const s=MultiFactorSessionImpl._fromMfaPendingCredential(i.mfaPendingCredential);return new MultiFactorResolverImpl(s,n,async e=>{const n=await e._process(r,s);delete i.mfaInfo,delete i.mfaPendingCredential;const o={...i,idToken:n.idToken,refreshToken:n.refreshToken};switch(t.operationType){case"signIn":const e=await UserCredentialImpl._fromIdTokenResponse(r,t.operationType,o);return await r._updateCurrentUser(e.user),e;case"reauthenticate":return _assert(t.user,r,"internal-error"),UserCredentialImpl._forOperation(t.user,t.operationType,o);default:_fail(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function getMultiFactorResolver(e,t){const r=util.getModularInstance(e),i=t;return _assert(t.customData.operationType,r,"argument-error"),_assert(i.customData._serverResponse?.mfaPendingCredential,r,"argument-error"),MultiFactorResolverImpl._fromError(r,i)}
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
 */function startEnrollTotpMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaEnrollment:start",_addTidIfNecessary(e,t))}function finalizeEnrollTotpMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaEnrollment:finalize",_addTidIfNecessary(e,t))}function withdrawMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaEnrollment:withdraw",_addTidIfNecessary(e,t))}class MultiFactorUserImpl{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>MultiFactorInfoImpl._fromServerResponse(e.auth,t)))})}static _fromUser(e){return new MultiFactorUserImpl(e)}async getSession(){return MultiFactorSessionImpl._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),n=await _logoutIfInvalidated(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(n),this.user.reload()}async unenroll(e){const t="string"==typeof e?e:e.uid,r=await this.user.getIdToken();try{const e=await _logoutIfInvalidated(this.user,withdrawMfa(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==t),await this.user._updateTokensIfNecessary(e),await this.user.reload()}catch(e){throw e}}}const multiFactorUserCache=new WeakMap;function multiFactor(e){const t=util.getModularInstance(e);return multiFactorUserCache.has(t)||multiFactorUserCache.set(t,MultiFactorUserImpl._fromUser(t)),multiFactorUserCache.get(t)}var name="@firebase/auth",version="1.12.1";
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
 */class AuthInterop{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){_assert(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
 */function getVersionForPlatform(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function registerAuth(e){app._registerComponent(new component.Component("auth",(t,{options:r})=>{const i=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat"),s=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;_assert(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_getClientVersion(e)},u=new AuthImpl(i,n,s,c);return _initializeAuthInstance(u,r),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),app._registerComponent(new component.Component("auth-internal",e=>(e=>new AuthInterop(e))(_castAuth(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),app.registerVersion(name,version,getVersionForPlatform(e)),app.registerVersion(name,version,"cjs2020")}
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
 */function getAuth(e=app.getApp()){const t=app._getProvider(e,"auth");if(t.isInitialized())return t.getImmediate();const r=initializeAuth(e),i=util.getDefaultEmulatorHost("auth");return i&&connectAuthEmulator(r,`http://${i}`),r}FetchProvider.initialize(fetch,Headers,Response),registerAuth("Node");const NOT_AVAILABLE_ERROR=_createError("operation-not-supported-in-this-environment");async function fail(){throw NOT_AVAILABLE_ERROR}class FailClass{constructor(){throw NOT_AVAILABLE_ERROR}}const browserLocalPersistence=inMemoryPersistence,browserSessionPersistence=inMemoryPersistence,browserCookiePersistence=inMemoryPersistence,indexedDBLocalPersistence=inMemoryPersistence,browserPopupRedirectResolver=NOT_AVAILABLE_ERROR,PhoneAuthProvider=FailClass,signInWithPhoneNumber=fail,linkWithPhoneNumber=fail,reauthenticateWithPhoneNumber=fail,updatePhoneNumber=fail,signInWithPopup=fail,linkWithPopup=fail,reauthenticateWithPopup=fail,signInWithRedirect=fail,linkWithRedirect=fail,reauthenticateWithRedirect=fail,getRedirectResult=fail,RecaptchaVerifier=FailClass;class PhoneMultiFactorGenerator{static assertion(){throw NOT_AVAILABLE_ERROR}}
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
 */function finalizeSignInTotpMfa(e,t){return _performApiRequest(e,"POST","/v2/accounts/mfaSignIn:finalize",_addTidIfNecessary(e,t))}AuthImpl.prototype.setPersistence=async()=>{};class MultiFactorAssertionImpl{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return debugFail("unexpected MultiFactorSessionType")}}}class TotpMultiFactorGenerator{static assertionForEnrollment(e,t){return TotpMultiFactorAssertionImpl._fromSecret(e,t)}static assertionForSignIn(e,t){return TotpMultiFactorAssertionImpl._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;_assert(void 0!==t.user?.auth,"internal-error");const r=await startEnrollTotpMfa(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return TotpSecret._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}}TotpMultiFactorGenerator.FACTOR_ID="totp";class TotpMultiFactorAssertionImpl extends MultiFactorAssertionImpl{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new TotpMultiFactorAssertionImpl(t,void 0,e)}static _fromEnrollmentId(e,t){return new TotpMultiFactorAssertionImpl(t,e)}async _finalizeEnroll(e,t,r){return _assert(void 0!==this.secret,e,"argument-error"),finalizeEnrollTotpMfa(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){_assert(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const r={verificationCode:this.otp};return finalizeSignInTotpMfa(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class TotpSecret{constructor(e,t,r,i,n,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=n}static _fromStartTotpMfaEnrollmentResponse(e,t){return new TotpSecret(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(_isEmptyString(e)||_isEmptyString(t))&&(r=!0),r&&(_isEmptyString(e)&&(e=this.auth.currentUser?.email||"unknownuser"),_isEmptyString(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function _isEmptyString(e){return void 0===e||0===e?.length}exports.AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY=AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY,exports.ActionCodeOperation=ActionCodeOperation,exports.ActionCodeURL=ActionCodeURL,exports.AuthCredential=AuthCredential,exports.AuthImpl=AuthImpl,exports.BaseOAuthProvider=BaseOAuthProvider,exports.EmailAuthCredential=EmailAuthCredential,exports.EmailAuthProvider=EmailAuthProvider,exports.FacebookAuthProvider=FacebookAuthProvider,exports.FactorId=FactorId,exports.FederatedAuthProvider=FederatedAuthProvider,exports.FetchProvider=FetchProvider,exports.GithubAuthProvider=GithubAuthProvider,exports.GoogleAuthProvider=GoogleAuthProvider,exports.OAuthCredential=OAuthCredential,exports.OAuthProvider=OAuthProvider,exports.OperationType=OperationType,exports.PhoneAuthCredential=PhoneAuthCredential,exports.PhoneAuthProvider=PhoneAuthProvider,exports.PhoneMultiFactorGenerator=PhoneMultiFactorGenerator,exports.ProviderId=ProviderId,exports.RecaptchaVerifier=RecaptchaVerifier,exports.SAMLAuthCredential=SAMLAuthCredential,exports.SAMLAuthProvider=SAMLAuthProvider,exports.SignInMethod=SignInMethod,exports.TotpMultiFactorGenerator=TotpMultiFactorGenerator,exports.TotpSecret=TotpSecret,exports.TwitterAuthProvider=TwitterAuthProvider,exports.UserImpl=UserImpl,exports._assert=_assert,exports._castAuth=_castAuth,exports._createError=_createError,exports._emulatorUrl=_emulatorUrl,exports._fail=_fail,exports._getClientVersion=_getClientVersion,exports._getInstance=_getInstance,exports._isAndroid=_isAndroid,exports._isIE10=_isIE10,exports._isIOS=_isIOS,exports._isIOS7Or8=_isIOS7Or8,exports._isMobileBrowser=_isMobileBrowser,exports._link=_link,exports._performApiRequest=_performApiRequest,exports._persistenceKeyName=_persistenceKeyName,exports._reauthenticate=_reauthenticate,exports._serverAppCurrentUserOperationNotSupportedError=_serverAppCurrentUserOperationNotSupportedError,exports._signInWithCredential=_signInWithCredential,exports.applyActionCode=applyActionCode,exports.beforeAuthStateChanged=beforeAuthStateChanged,exports.browserCookiePersistence=browserCookiePersistence,exports.browserLocalPersistence=browserLocalPersistence,exports.browserPopupRedirectResolver=browserPopupRedirectResolver,exports.browserSessionPersistence=browserSessionPersistence,exports.checkActionCode=checkActionCode,exports.confirmPasswordReset=confirmPasswordReset,exports.connectAuthEmulator=connectAuthEmulator,exports.createUserWithEmailAndPassword=createUserWithEmailAndPassword,exports.debugAssert=debugAssert,exports.debugErrorMap=debugErrorMap,exports.deleteUser=deleteUser,exports.fetchSignInMethodsForEmail=fetchSignInMethodsForEmail,exports.getAdditionalUserInfo=getAdditionalUserInfo,exports.getAuth=getAuth,exports.getIdToken=getIdToken,exports.getIdTokenResult=getIdTokenResult,exports.getMultiFactorResolver=getMultiFactorResolver,exports.getRedirectResult=getRedirectResult,exports.inMemoryPersistence=inMemoryPersistence,exports.indexedDBLocalPersistence=indexedDBLocalPersistence,exports.initializeAuth=initializeAuth,exports.initializeRecaptchaConfig=initializeRecaptchaConfig,exports.isSignInWithEmailLink=isSignInWithEmailLink,exports.linkWithCredential=linkWithCredential,exports.linkWithPhoneNumber=linkWithPhoneNumber,exports.linkWithPopup=linkWithPopup,exports.linkWithRedirect=linkWithRedirect,exports.multiFactor=multiFactor,exports.onAuthStateChanged=onAuthStateChanged,exports.onIdTokenChanged=onIdTokenChanged,exports.parseActionCodeURL=parseActionCodeURL,exports.prodErrorMap=prodErrorMap,exports.reauthenticateWithCredential=reauthenticateWithCredential,exports.reauthenticateWithPhoneNumber=reauthenticateWithPhoneNumber,exports.reauthenticateWithPopup=reauthenticateWithPopup,exports.reauthenticateWithRedirect=reauthenticateWithRedirect,exports.reload=reload,exports.revokeAccessToken=revokeAccessToken,exports.sendEmailVerification=sendEmailVerification,exports.sendPasswordResetEmail=sendPasswordResetEmail,exports.sendSignInLinkToEmail=sendSignInLinkToEmail,exports.setPersistence=setPersistence,exports.signInAnonymously=signInAnonymously,exports.signInWithCredential=signInWithCredential,exports.signInWithCustomToken=signInWithCustomToken,exports.signInWithEmailAndPassword=signInWithEmailAndPassword,exports.signInWithEmailLink=signInWithEmailLink,exports.signInWithIdp=signInWithIdp,exports.signInWithPhoneNumber=signInWithPhoneNumber,exports.signInWithPopup=signInWithPopup,exports.signInWithRedirect=signInWithRedirect,exports.signOut=signOut,exports.unlink=unlink,exports.updateCurrentUser=updateCurrentUser,exports.updateEmail=updateEmail,exports.updatePassword=updatePassword,exports.updatePhoneNumber=updatePhoneNumber,exports.updateProfile=updateProfile,exports.useDeviceLanguage=useDeviceLanguage,exports.validatePassword=validatePassword,exports.verifyBeforeUpdateEmail=verifyBeforeUpdateEmail,exports.verifyPasswordResetCode=verifyPasswordResetCode;