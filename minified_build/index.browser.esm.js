import{_registerComponent,registerVersion,SDK_VERSION}from"@firebase/app";import{Component}from"@firebase/component";import{_ as __PRIVATE_setSDKVersion,F as Firestore,a as __PRIVATE_LiteAuthCredentialsProvider,b as __PRIVATE_LiteAppCheckTokenProvider,c as __PRIVATE_databaseIdFromApp,O as ObjectValue,d as __PRIVATE_cast,e as __PRIVATE_getDatastore,f as __PRIVATE_mapToArray,g as __PRIVATE_invokeRunAggregationQueryRpc,h as __PRIVATE_LiteUserDataWriter,i as __PRIVATE_fieldPathFromArgument,q as queryEqual,j as __PRIVATE_newUserDataReader,k as __PRIVATE_applyFirestoreDataConverter,l as __PRIVATE_parseSetData,P as Precondition,m as FieldPath,n as __PRIVATE_parseUpdateVarargs,o as __PRIVATE_parseUpdateData,p as __PRIVATE_DeleteMutation,r as FirestoreError,E,s as __PRIVATE_invokeCommitRpc,t as fail,D as DocumentSnapshot,u as __PRIVATE_isNullOrUndefined,v as __PRIVATE_isPermanentError,w as __PRIVATE_logDebug,x as __PRIVATE_logError,y as __PRIVATE_invokeBatchGetDocumentsRpc,z as DocumentKey,A as __PRIVATE_VerifyMutation,S as SnapshotVersion}from"./common-0a3137f7.esm.js";export{B as Bytes,C as CollectionReference,G as DocumentReference,D as DocumentSnapshot,m as FieldPath,H as FieldValue,F as Firestore,r as FirestoreError,I as GeoPoint,Q as Query,J as QueryCompositeFilterConstraint,K as QueryConstraint,L as QueryDocumentSnapshot,M as QueryEndAtConstraint,N as QueryFieldFilterConstraint,R as QueryLimitConstraint,T as QueryOrderByConstraint,U as QuerySnapshot,V as QueryStartAtConstraint,W as Timestamp,X as VectorValue,Y as addDoc,Z as and,$ as arrayRemove,a0 as arrayUnion,a1 as collection,a2 as collectionGroup,a3 as connectFirestoreEmulator,a4 as deleteDoc,a5 as deleteField,a6 as doc,a7 as documentId,a8 as endAt,a9 as endBefore,aa as getDoc,ab as getDocs,ac as getFirestore,ad as increment,ae as initializeFirestore,af as limit,ag as limitToLast,ah as or,ai as orderBy,aj as query,q as queryEqual,ak as refEqual,al as serverTimestamp,am as setDoc,an as setLogLevel,ao as snapshotEqual,ap as startAfter,aq as startAt,ar as terminate,as as updateDoc,at as vector,au as where}from"./common-0a3137f7.esm.js";import{deepEqual,getModularInstance}from"@firebase/util";import"@firebase/logger";import"@firebase/webchannel-wrapper/bloom-blob";const _t="4.13.0";
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
 */class __PRIVATE_Deferred{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
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
 */class __PRIVATE_AggregateImpl{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}
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
 */class __PRIVATE_ExponentialBackoff{constructor(e,t,r=1e3,s=1.5,i=6e4){this.t=e,this.timerId=t,this.i=r,this.o=s,this.h=i,this.u=0,this.l=null,this._=Date.now(),this.reset()}reset(){this.u=0}m(){this.u=this.h}A(e){this.cancel();const t=Math.floor(this.u+this.p()),r=Math.max(0,Date.now()-this._),s=Math.max(0,t-r);s>0&&__PRIVATE_logDebug("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.u} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.l=this.t.enqueueAfterDelay(this.timerId,s,()=>(this._=Date.now(),e())),this.u*=this.o,this.u<this.i&&(this.u=this.i),this.u>this.h&&(this.u=this.h)}T(){null!==this.l&&(this.l.skipDelay(),this.l=null)}cancel(){null!==this.l&&(this.l.cancel(),this.l=null)}p(){return(Math.random()-.5)*this.u}}
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
 */class AggregateField{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class AggregateQuerySnapshot{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new ObjectValue({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}
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
 */function getCount(e){return getAggregate(e,{count:count()})}function getAggregate(e,t){const r=__PRIVATE_cast(e.firestore,Firestore),s=__PRIVATE_getDatastore(r),i=__PRIVATE_mapToArray(t,(e,t)=>new __PRIVATE_AggregateImpl(t,e.aggregateType,e._internalFieldPath));return __PRIVATE_invokeRunAggregationQueryRpc(s,e._query,i).then(t=>function(e,t,r){const s=new __PRIVATE_LiteUserDataWriter(e);return new AggregateQuerySnapshot(t,s,r)}(r,e,t))}function sum(e){return new AggregateField("sum",__PRIVATE_fieldPathFromArgument("sum",e))}function average(e){return new AggregateField("avg",__PRIVATE_fieldPathFromArgument("average",e))}function count(){return new AggregateField("count")}function aggregateFieldEqual(e,t){return e instanceof AggregateField&&t instanceof AggregateField&&e.aggregateType===t.aggregateType&&e._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function aggregateQuerySnapshotEqual(e,t){return queryEqual(e.query,t.query)&&deepEqual(e.data(),t.data())}
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
 */class WriteBatch{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=__PRIVATE_newUserDataReader(e)}set(e,t,r){this._verifyNotCommitted();const s=__PRIVATE_validateReference(e,this._firestore),i=__PRIVATE_applyFirestoreDataConverter(s.converter,t,r),a=__PRIVATE_parseSetData(this._dataReader,"WriteBatch.set",s._key,i,null!==s.converter,r);return this._mutations.push(a.toMutation(s._key,Precondition.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=__PRIVATE_validateReference(e,this._firestore);let a;return a="string"==typeof(t=getModularInstance(t))||t instanceof FieldPath?__PRIVATE_parseUpdateVarargs(this._dataReader,"WriteBatch.update",i._key,t,r,s):__PRIVATE_parseUpdateData(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,Precondition.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=__PRIVATE_validateReference(e,this._firestore);return this._mutations=this._mutations.concat(new __PRIVATE_DeleteMutation(t._key,Precondition.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new FirestoreError(E.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function __PRIVATE_validateReference(e,t){if((e=getModularInstance(e)).firestore!==t)throw new FirestoreError(E.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}function writeBatch(e){e=__PRIVATE_cast(e,Firestore);const t=__PRIVATE_getDatastore(e);return new WriteBatch(e,e=>__PRIVATE_invokeCommitRpc(t,e))}
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
 */class Transaction$1{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new FirestoreError(E.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await __PRIVATE_invokeBatchGetDocumentsRpc(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new __PRIVATE_DeleteMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const r=DocumentKey.fromPath(t);this.mutations.push(new __PRIVATE_VerifyMutation(r,this.precondition(r)))}),await __PRIVATE_invokeCommitRpc(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw fail(50498,{R:e.constructor.name});t=SnapshotVersion.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new FirestoreError(E.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(SnapshotVersion.min())?Precondition.exists(!1):Precondition.updateTime(t):Precondition.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(SnapshotVersion.min()))throw new FirestoreError(E.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Precondition.updateTime(t)}return Precondition.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
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
 */const ft={maxAttempts:5};
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
 */class __PRIVATE_TransactionRunner{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.I=r.maxAttempts,this.P=new __PRIVATE_ExponentialBackoff(this.asyncQueue,"transaction_retry")}V(){this.I-=1,this.D()}D(){this.P.A(async()=>{const e=new Transaction$1(this.datastore),t=this.F(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.v(e)}))}).catch(e=>{this.v(e)})})}F(e){try{const t=this.updateFunction(e);return!__PRIVATE_isNullOrUndefined(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}v(e){this.I>0&&this.B(e)?(this.I-=1,this.asyncQueue.enqueueAndForget(()=>(this.D(),Promise.resolve()))):this.deferred.reject(e)}B(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!__PRIVATE_isPermanentError(t)}return!1}}
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
 */function getDocument(){return"undefined"!=typeof document?document:null}
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
 */class DelayedOperation{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new __PRIVATE_Deferred,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,n=new DelayedOperation(e,t,a,s,i);return n.start(r),n}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new FirestoreError(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}
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
 */const dt="AsyncQueue";class __PRIVATE_AsyncQueueImpl{constructor(e=Promise.resolve()){this.k=[],this.q=!1,this.O=[],this.S=null,this.C=!1,this.M=!1,this.N=[],this.P=new __PRIVATE_ExponentialBackoff(this,"async_queue_retry"),this.L=()=>{const e=getDocument();e&&__PRIVATE_logDebug(dt,"Visibility state changed to "+e.visibilityState),this.P.T()},this.W=e;const t=getDocument();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.L)}get isShuttingDown(){return this.q}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.U(),this.$(e)}enterRestrictedMode(e){if(!this.q){this.q=!0,this.M=e||!1;const t=getDocument();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.L)}}enqueue(e){if(this.U(),this.q)return new Promise(()=>{});const t=new __PRIVATE_Deferred;return this.$(()=>this.q&&this.M?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.k.push(e),this.j()))}async j(){if(0!==this.k.length){try{await this.k[0](),this.k.shift(),this.P.reset()}catch(e){if(!function(e){return"IndexedDbTransactionError"===e.name}
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
 */(e))throw e;__PRIVATE_logDebug(dt,"Operation failed with retryable error: "+e)}this.k.length>0&&this.P.A(()=>this.j())}}$(e){const t=this.W.then(()=>(this.C=!0,e().catch(e=>{this.S=e,this.C=!1;const t=__PRIVATE_getMessageOrStack(e);throw __PRIVATE_logError("INTERNAL UNHANDLED ERROR: ",t),e}).then(e=>(this.C=!1,e))));return this.W=t,t}enqueueAfterDelay(e,t,r){this.U(),this.N.indexOf(e)>-1&&(t=0);const s=DelayedOperation.createAndSchedule(this,e,t,r,e=>this.G(e));return this.O.push(s),s}U(){this.S&&fail(47125,{H:__PRIVATE_getMessageOrStack(this.S)})}verifyOperationInProgress(){}async J(){let e;do{e=this.W,await e}while(e!==this.W)}K(e){for(const t of this.O)if(t.timerId===e)return!0;return!1}X(e){return this.J().then(()=>{this.O.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.O)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.J()})}Y(e){this.N.push(e)}G(e){const t=this.O.indexOf(e);this.O.splice(t,1)}}function __PRIVATE_getMessageOrStack(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
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
 */class Transaction{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=__PRIVATE_newUserDataReader(e)}get(e){const t=__PRIVATE_validateReference(e,this._firestore),r=new __PRIVATE_LiteUserDataWriter(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return fail(24041);const s=e[0];if(s.isFoundDocument())return new DocumentSnapshot(this._firestore,r,s.key,s,t.converter);if(s.isNoDocument())return new DocumentSnapshot(this._firestore,r,t._key,null,t.converter);throw fail(18433,{doc:s})})}set(e,t,r){const s=__PRIVATE_validateReference(e,this._firestore),i=__PRIVATE_applyFirestoreDataConverter(s.converter,t,r),a=__PRIVATE_parseSetData(this._dataReader,"Transaction.set",s._key,i,null!==s.converter,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){const i=__PRIVATE_validateReference(e,this._firestore);let a;return a="string"==typeof(t=getModularInstance(t))||t instanceof FieldPath?__PRIVATE_parseUpdateVarargs(this._dataReader,"Transaction.update",i._key,t,r,s):__PRIVATE_parseUpdateData(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){const t=__PRIVATE_validateReference(e,this._firestore);return this._transaction.delete(t._key),this}}function runTransaction(e,t,r){e=__PRIVATE_cast(e,Firestore);const s=__PRIVATE_getDatastore(e),i={...ft,...r};!function(e){if(e.maxAttempts<1)throw new FirestoreError(E.INVALID_ARGUMENT,"Max attempts must be at least 1")}(i);const a=new __PRIVATE_Deferred;return new __PRIVATE_TransactionRunner(new __PRIVATE_AsyncQueueImpl,s,i,r=>t(new Transaction(e,r)),a).V(),a.promise}__PRIVATE_setSDKVersion(`${SDK_VERSION}_lite`),_registerComponent(new Component("firestore/lite",(e,{instanceIdentifier:t,options:r})=>{const s=e.getProvider("app").getImmediate(),i=new Firestore(new __PRIVATE_LiteAuthCredentialsProvider(e.getProvider("auth-internal")),new __PRIVATE_LiteAppCheckTokenProvider(s,e.getProvider("app-check-internal")),__PRIVATE_databaseIdFromApp(s,t),s);return r&&i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),registerVersion("firestore-lite",_t,""),registerVersion("firestore-lite",_t,"esm2020");export{AggregateField,AggregateQuerySnapshot,Transaction,WriteBatch,aggregateFieldEqual,aggregateQuerySnapshotEqual,average,count,getAggregate,getCount,runTransaction,sum,writeBatch};