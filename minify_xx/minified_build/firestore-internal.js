/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.getFirestoreOptions=exports.FirestoreService=void 0;const error_1=require("../utils/error"),credential_internal_1=require("../app/credential-internal"),validator=require("../utils/validator"),utils=require("../utils/index");class FirestoreService{constructor(e){this.databases=new Map,this.firestoreSettings=new Map,this.appInternal=e}initializeDatabase(e,t){const r=this.databases.get(e);if(r){const i=this.firestoreSettings.get(e)??{};if(this.checkIfSameSettings(t,i))return r;throw new error_1.FirebaseFirestoreError({code:"failed-precondition",message:"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance."})}const i=initFirestore(this.app,e,t);return this.databases.set(e,i),this.firestoreSettings.set(e,t),i}getDatabase(e){let t=this.databases.get(e);return void 0===t&&(t=initFirestore(this.app,e,{}),this.databases.set(e,t),this.firestoreSettings.set(e,{})),t}checkIfSameSettings(e,t){const r=t??{};return(e??{}).preferRest===r.preferRest}get app(){return this.appInternal}}function getFirestoreOptions(e,t){if(!validator.isNonNullObject(e)||!("options"in e))throw new error_1.FirebaseFirestoreError({code:"invalid-argument",message:"First argument passed to admin.firestore() must be a valid Firebase app instance."});const r=utils.getExplicitProjectId(e),i=e.options.credential,{version:s}=require("../../package.json"),a=t?.preferRest;if(i instanceof credential_internal_1.ServiceAccountCredential)return{credentials:{private_key:i.privateKey,client_email:i.clientEmail},projectId:r,firebaseVersion:s,preferRest:a};if((0,credential_internal_1.isApplicationDefault)(e.options.credential))return validator.isNonEmptyString(r)?{projectId:r,firebaseVersion:s,preferRest:a}:{firebaseVersion:s,preferRest:a};throw new error_1.FirebaseFirestoreError({code:"invalid-credential",message:"Failed to initialize Google Cloud Firestore client with the available credentials. Must initialize the SDK with a certificate credential or application default credentials to use Cloud Firestore API."})}function initFirestore(e,t,r){const i=getFirestoreOptions(e,r);let s;i.databaseId=t;try{s=require("@google-cloud/firestore").Firestore}catch(e){throw new error_1.FirebaseFirestoreError({code:"missing-dependencies",message:`Failed to import the Cloud Firestore client library for Node.js. Make sure to install the "@google-cloud/firestore" npm package. Original error: ${e}`})}return new s(i)}exports.FirestoreService=FirestoreService,exports.getFirestoreOptions=getFirestoreOptions;