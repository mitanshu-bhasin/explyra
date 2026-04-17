import firebase from"@firebase/app-compat";import{FirestoreError,Bytes,_isBase64Available,enableIndexedDbPersistence,enableMultiTabIndexedDbPersistence,clearIndexedDbPersistence,_DatabaseId,_logWarn,connectFirestoreEmulator,enableNetwork,disableNetwork,_validateIsNotUsedTogether,waitForPendingWrites,onSnapshotsInSync,collection,doc,collectionGroup,runTransaction,ensureFirestoreConfigured,WriteBatch as WriteBatch$1,executeWrite,loadBundle,namedQuery,DocumentSnapshot as DocumentSnapshot$1,DocumentReference as DocumentReference$1,_DocumentKey,refEqual,setDoc,updateDoc,deleteDoc,onSnapshot,getDocFromCache,getDocFromServer,getDoc,snapshotEqual,query,where,orderBy,limit,limitToLast,startAt,startAfter,endBefore,endAt,queryEqual,getDocsFromCache,getDocsFromServer,getDocs,QuerySnapshot as QuerySnapshot$1,addDoc,_cast,AbstractUserDataWriter,setLogLevel as setLogLevel$1,QueryDocumentSnapshot as QueryDocumentSnapshot$1,_debugAssert,FieldPath as FieldPath$1,_FieldPath,serverTimestamp,deleteField,arrayUnion,arrayRemove,increment,GeoPoint,Timestamp,CACHE_SIZE_UNLIMITED}from"@firebase/firestore";import{getModularInstance}from"@firebase/util";import{Component}from"@firebase/component";const name="@firebase/firestore-compat",version="0.4.6";
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
 */function validateSetOptions(e,t){if(void 0===t)return{merge:!1};if(void 0!==t.mergeFields&&void 0!==t.merge)throw new FirestoreError("invalid-argument",`Invalid options passed to function ${e}(): You cannot specify both "merge" and "mergeFields".`);return t}
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
 */function assertUint8ArrayAvailable(){if("undefined"==typeof Uint8Array)throw new FirestoreError("unimplemented","Uint8Arrays are not available in this environment.")}function assertBase64Available(){if(!_isBase64Available())throw new FirestoreError("unimplemented","Blobs are unavailable in Firestore in this environment.")}class Blob{constructor(e){this._delegate=e}static fromBase64String(e){return assertBase64Available(),new Blob(Bytes.fromBase64String(e))}static fromUint8Array(e){return assertUint8ArrayAvailable(),new Blob(Bytes.fromUint8Array(e))}toBase64(){return assertBase64Available(),this._delegate.toBase64()}toUint8Array(){return assertUint8ArrayAvailable(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
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
 */function isPartialObserver(e){return implementsAnyMethods(e,["next","error","complete"])}function implementsAnyMethods(e,t){if("object"!=typeof e||null===e)return!1;const r=e;for(const e of t)if(e in r&&"function"==typeof r[e])return!0;return!1}
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
 */class IndexedDbPersistenceProvider{enableIndexedDbPersistence(e,t){return enableIndexedDbPersistence(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return enableMultiTabIndexedDbPersistence(e._delegate)}clearIndexedDbPersistence(e){return clearIndexedDbPersistence(e._delegate)}}class Firestore{constructor(e,t,r){this._delegate=t,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof _DatabaseId||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const t=this._delegate._getSettings();e.merge||t.host===e.host||_logWarn("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&delete(e={...t,...e}).merge,this._delegate._setSettings(e)}useEmulator(e,t,r={}){connectFirestoreEmulator(this._delegate,e,t,r)}enableNetwork(){return enableNetwork(this._delegate)}disableNetwork(){return disableNetwork(this._delegate)}enablePersistence(e){let t=!1,r=!1;return e&&(t=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,_validateIsNotUsedTogether("synchronizeTabs",t,"experimentalForceOwningTab",r)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return waitForPendingWrites(this._delegate)}onSnapshotsInSync(e){return onSnapshotsInSync(this._delegate,e)}get app(){if(!this._appCompat)throw new FirestoreError("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new CollectionReference(this,collection(this._delegate,e))}catch(e){throw replaceFunctionName(e,"collection()","Firestore.collection()")}}doc(e){try{return new DocumentReference(this,doc(this._delegate,e))}catch(e){throw replaceFunctionName(e,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new Query(this,collectionGroup(this._delegate,e))}catch(e){throw replaceFunctionName(e,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return runTransaction(this._delegate,t=>e(new Transaction(this,t)))}batch(){return ensureFirestoreConfigured(this._delegate),new WriteBatch(new WriteBatch$1(this._delegate,e=>executeWrite(this._delegate,e)))}loadBundle(e){return loadBundle(this._delegate,e)}namedQuery(e){return namedQuery(this._delegate,e).then(e=>e?new Query(this,e):null)}}class UserDataWriter extends AbstractUserDataWriter{constructor(e){super(),this.firestore=e}convertBytes(e){return new Blob(new Bytes(e))}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return DocumentReference.forKey(t,this.firestore,null)}}function setLogLevel(e){setLogLevel$1(e)}class Transaction{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new UserDataWriter(e)}get(e){const t=castReference(e);return this._delegate.get(t).then(e=>new DocumentSnapshot(this._firestore,new DocumentSnapshot$1(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,t.converter)))}set(e,t,r){const n=castReference(e);return r?(validateSetOptions("Transaction.set",r),this._delegate.set(n,t,r)):this._delegate.set(n,t),this}update(e,t,r,...n){const s=castReference(e);return 2===arguments.length?this._delegate.update(s,t):this._delegate.update(s,t,r,...n),this}delete(e){const t=castReference(e);return this._delegate.delete(t),this}}class WriteBatch{constructor(e){this._delegate=e}set(e,t,r){const n=castReference(e);return r?(validateSetOptions("WriteBatch.set",r),this._delegate.set(n,t,r)):this._delegate.set(n,t),this}update(e,t,r,...n){const s=castReference(e);return 2===arguments.length?this._delegate.update(s,t):this._delegate.update(s,t,r,...n),this}delete(e){const t=castReference(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class FirestoreDataConverter{constructor(e,t,r){this._firestore=e,this._userDataWriter=t,this._delegate=r}fromFirestore(e,t){const r=new QueryDocumentSnapshot$1(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new QueryDocumentSnapshot(this._firestore,r),t??{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){const r=FirestoreDataConverter.INSTANCES;let n=r.get(e);n||(n=new WeakMap,r.set(e,n));let s=n.get(t);return s||(s=new FirestoreDataConverter(e,new UserDataWriter(e),t),n.set(t,s)),s}}FirestoreDataConverter.INSTANCES=new WeakMap;class DocumentReference{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new UserDataWriter(e)}static forPath(e,t,r){if(e.length%2!=0)throw new FirestoreError("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new DocumentReference(t,new DocumentReference$1(t._delegate,r,new _DocumentKey(e)))}static forKey(e,t,r){return new DocumentReference(t,new DocumentReference$1(t._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new CollectionReference(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new CollectionReference(this.firestore,collection(this._delegate,e))}catch(e){throw replaceFunctionName(e,"collection()","DocumentReference.collection()")}}isEqual(e){return(e=getModularInstance(e))instanceof DocumentReference$1&&refEqual(this._delegate,e)}set(e,t){t=validateSetOptions("DocumentReference.set",t);try{return t?setDoc(this._delegate,e,t):setDoc(this._delegate,e)}catch(e){throw replaceFunctionName(e,"setDoc()","DocumentReference.set()")}}update(e,t,...r){try{return 1===arguments.length?updateDoc(this._delegate,e):updateDoc(this._delegate,e,t,...r)}catch(e){throw replaceFunctionName(e,"updateDoc()","DocumentReference.update()")}}delete(){return deleteDoc(this._delegate)}onSnapshot(...e){const t=extractSnapshotOptions(e),r=wrapObserver(e,e=>new DocumentSnapshot(this.firestore,new DocumentSnapshot$1(this.firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,this._delegate.converter)));return onSnapshot(this._delegate,t,r)}get(e){let t;return t="cache"===e?.source?getDocFromCache(this._delegate):"server"===e?.source?getDocFromServer(this._delegate):getDoc(this._delegate),t.then(e=>new DocumentSnapshot(this.firestore,new DocumentSnapshot$1(this.firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,this._delegate.converter)))}withConverter(e){return new DocumentReference(this.firestore,e?this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function replaceFunctionName(e,t,r){return e.message=e.message.replace(t,r),e}function extractSnapshotOptions(e){for(const t of e)if("object"==typeof t&&!isPartialObserver(t))return t;return{}}function wrapObserver(e,t){let r;return r=isPartialObserver(e[0])?e[0]:isPartialObserver(e[1])?e[1]:"function"==typeof e[0]?{next:e[0],error:e[1],complete:e[2]}:{next:e[1],error:e[2],complete:e[3]},{next:e=>{r.next&&r.next(t(e))},error:r.error?.bind(r),complete:r.complete?.bind(r)}}class DocumentSnapshot{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new DocumentReference(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return snapshotEqual(this._delegate,e._delegate)}}class QueryDocumentSnapshot extends DocumentSnapshot{data(e){const t=this._delegate.data(e);return this._delegate._converter||_debugAssert(void 0!==t,"Document in a QueryDocumentSnapshot should exist"),t}}class Query{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new UserDataWriter(e)}where(e,t,r){try{return new Query(this.firestore,query(this._delegate,where(e,t,r)))}catch(e){throw replaceFunctionName(e,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new Query(this.firestore,query(this._delegate,orderBy(e,t)))}catch(e){throw replaceFunctionName(e,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new Query(this.firestore,query(this._delegate,limit(e)))}catch(e){throw replaceFunctionName(e,"limit()","Query.limit()")}}limitToLast(e){try{return new Query(this.firestore,query(this._delegate,limitToLast(e)))}catch(e){throw replaceFunctionName(e,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new Query(this.firestore,query(this._delegate,startAt(...e)))}catch(e){throw replaceFunctionName(e,"startAt()","Query.startAt()")}}startAfter(...e){try{return new Query(this.firestore,query(this._delegate,startAfter(...e)))}catch(e){throw replaceFunctionName(e,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new Query(this.firestore,query(this._delegate,endBefore(...e)))}catch(e){throw replaceFunctionName(e,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new Query(this.firestore,query(this._delegate,endAt(...e)))}catch(e){throw replaceFunctionName(e,"endAt()","Query.endAt()")}}isEqual(e){return queryEqual(this._delegate,e._delegate)}get(e){let t;return t="cache"===e?.source?getDocsFromCache(this._delegate):"server"===e?.source?getDocsFromServer(this._delegate):getDocs(this._delegate),t.then(e=>new QuerySnapshot(this.firestore,new QuerySnapshot$1(this.firestore._delegate,this._userDataWriter,this._delegate,e._snapshot)))}onSnapshot(...e){const t=extractSnapshotOptions(e),r=wrapObserver(e,e=>new QuerySnapshot(this.firestore,new QuerySnapshot$1(this.firestore._delegate,this._userDataWriter,this._delegate,e._snapshot)));return onSnapshot(this._delegate,t,r)}withConverter(e){return new Query(this.firestore,e?this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class DocumentChange{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new QueryDocumentSnapshot(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class QuerySnapshot{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new Query(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new QueryDocumentSnapshot(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(e=>new DocumentChange(this._firestore,e))}forEach(e,t){this._delegate.forEach(r=>{e.call(t,new QueryDocumentSnapshot(this._firestore,r))})}isEqual(e){return snapshotEqual(this._delegate,e._delegate)}}class CollectionReference extends Query{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new DocumentReference(this.firestore,e):null}doc(e){try{return new DocumentReference(this.firestore,void 0===e?doc(this._delegate):doc(this._delegate,e))}catch(e){throw replaceFunctionName(e,"doc()","CollectionReference.doc()")}}add(e){return addDoc(this._delegate,e).then(e=>new DocumentReference(this.firestore,e))}isEqual(e){return refEqual(this._delegate,e._delegate)}withConverter(e){return new CollectionReference(this.firestore,e?this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function castReference(e){return _cast(e,DocumentReference$1)}
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
 */class FieldPath{constructor(...e){this._delegate=new FieldPath$1(...e)}static documentId(){return new FieldPath(_FieldPath.keyField().canonicalString())}isEqual(e){return(e=getModularInstance(e))instanceof FieldPath$1&&this._delegate._internalPath.isEqual(e._internalPath)}}
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
 */class FieldValue{static serverTimestamp(){const e=serverTimestamp();return e._methodName="FieldValue.serverTimestamp",new FieldValue(e)}static delete(){const e=deleteField();return e._methodName="FieldValue.delete",new FieldValue(e)}static arrayUnion(...e){const t=arrayUnion(...e);return t._methodName="FieldValue.arrayUnion",new FieldValue(t)}static arrayRemove(...e){const t=arrayRemove(...e);return t._methodName="FieldValue.arrayRemove",new FieldValue(t)}static increment(e){const t=increment(e);return t._methodName="FieldValue.increment",new FieldValue(t)}constructor(e){this._delegate=e}isEqual(e){return this._delegate.isEqual(e._delegate)}}
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
 */const firestoreNamespace={Firestore:Firestore,GeoPoint:GeoPoint,Timestamp:Timestamp,Blob:Blob,Transaction:Transaction,WriteBatch:WriteBatch,DocumentReference:DocumentReference,DocumentSnapshot:DocumentSnapshot,Query:Query,QueryDocumentSnapshot:QueryDocumentSnapshot,QuerySnapshot:QuerySnapshot,CollectionReference:CollectionReference,FieldPath:FieldPath,FieldValue:FieldValue,setLogLevel:setLogLevel,CACHE_SIZE_UNLIMITED:CACHE_SIZE_UNLIMITED};function configureForFirebase(e,t){e.INTERNAL.registerComponent(new Component("firestore-compat",e=>{const r=e.getProvider("app-compat").getImmediate(),n=e.getProvider("firestore").getImmediate();return t(r,n)},"PUBLIC").setServiceProps({...firestoreNamespace}))}
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
 */function registerFirestore(e){configureForFirebase(e,(e,t)=>new Firestore(e,t,new IndexedDbPersistenceProvider)),e.registerVersion(name,"0.4.6","rn")}registerFirestore(firebase);export{registerFirestore};