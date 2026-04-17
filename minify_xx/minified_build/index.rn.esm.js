import{_registerComponent as t,registerVersion as e,SDK_VERSION as i}from"@firebase/app";import{Component as a}from"@firebase/component";import{_ as r,a as o,F as h,b as c,c as u,d as l,O as _,e as f,f as d,g,h as m,i as p,j as w,q as y,k as P,l as D,m as b,P as v,n as k,o as O,p as S,r as C,s as x,C as j,t as z,u as tt,D as et,v as st,S as it,w as rt,x as nt,y as ot,z as ht,A as ct}from"./common-8815cfb7.rn.esm.js";export{as as Bytes,J as CollectionReference,I as DocumentReference,A as DocumentSnapshot,n as FieldPath,ag as FieldValue,F as Firestore,s as FirestoreError,at as GeoPoint,Q as Query,a3 as QueryCompositeFilterConstraint,a2 as QueryConstraint,an as QueryDocumentSnapshot,a8 as QueryEndAtConstraint,a4 as QueryFieldFilterConstraint,a6 as QueryLimitConstraint,a5 as QueryOrderByConstraint,ao as QuerySnapshot,a7 as QueryStartAtConstraint,au as Timestamp,aq as VectorValue,a9 as addDoc,R as and,ai as arrayRemove,aj as arrayUnion,K as collection,L as collectionGroup,H as connectFirestoreEmulator,aa as deleteDoc,al as deleteField,M as doc,af as documentId,T as endAt,U as endBefore,ad as getDoc,ae as getDocs,E as getFirestore,ah as increment,B as initializeFirestore,X as limit,Y as limitToLast,$ as or,a0 as orderBy,a1 as query,q as queryEqual,N as refEqual,ak as serverTimestamp,ac as setDoc,ar as setLogLevel,ap as snapshotEqual,W as startAfter,V as startAt,G as terminate,ab as updateDoc,am as vector,Z as where}from"./common-8815cfb7.rn.esm.js";import{deepEqual as ut,getModularInstance as lt}from"@firebase/util";import"@firebase/logger";import"@firebase/webchannel-wrapper/bloom-blob";const _t="4.12.0";
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
 */class __PRIVATE_Deferred{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}
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
 */class __PRIVATE_AggregateImpl{constructor(t,e,s){this.alias=t,this.aggregateType=e,this.fieldPath=s
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
 */}}class __PRIVATE_ExponentialBackoff{constructor(t,e,s=1e3,i=1.5,r=6e4){this.t=t,this.timerId=e,this.i=s,this.o=i,this.h=r,this.u=0,this.l=null,this._=Date.now(),this.reset()}reset(){this.u=0}m(){this.u=this.h}A(t){this.cancel();const e=Math.floor(this.u+this.p()),s=Math.max(0,Date.now()-this._),i=Math.max(0,e-s);i>0&&r("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.u} ms, delay with jitter: ${e} ms, last attempt: ${s} ms ago)`),this.l=this.t.enqueueAfterDelay(this.timerId,i,()=>(this._=Date.now(),t())),this.u*=this.o,this.u<this.i&&(this.u=this.i),this.u>this.h&&(this.u=this.h)}T(){null!==this.l&&(this.l.skipDelay(),this.l=null)}cancel(){null!==this.l&&(this.l.cancel(),this.l=null)}p(){return(Math.random()-.5)*this.u}}
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
 */class AggregateField{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class AggregateQuerySnapshot{constructor(t,e,s){this._userDataWriter=e,this._data=s,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new _({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}
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
 */function getCount(t){return getAggregate(t,{count:count()})}function getAggregate(t,e){const s=f(t.firestore,h),i=d(s),r=g(e,(t,e)=>new __PRIVATE_AggregateImpl(e,t.aggregateType,t._internalFieldPath));return m(i,t._query,r).then(e=>function(t,e,s){const i=new p(t);return new AggregateQuerySnapshot(e,i,s)}(s,t,e))}function sum(t){return new AggregateField("sum",w("sum",t))}function average(t){return new AggregateField("avg",w("average",t))}function count(){return new AggregateField("count")}function aggregateFieldEqual(t,e){return t instanceof AggregateField&&e instanceof AggregateField&&t.aggregateType===e.aggregateType&&t._internalFieldPath?.canonicalString()===e._internalFieldPath?.canonicalString()}function aggregateQuerySnapshotEqual(t,e){return y(t.query,e.query)&&ut(t.data(),e.data())}
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
 */class WriteBatch{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=P(t)}set(t,e,s){this._verifyNotCommitted();const i=__PRIVATE_validateReference(t,this._firestore),r=D(i.converter,e,s),a=b(this._dataReader,"WriteBatch.set",i._key,r,null!==i.converter,s);return this._mutations.push(a.toMutation(i._key,v.none())),this}update(t,e,s,...i){this._verifyNotCommitted();const r=__PRIVATE_validateReference(t,this._firestore);let a;return a="string"==typeof(e=lt(e))||e instanceof k?O(this._dataReader,"WriteBatch.update",r._key,e,s,i):S(this._dataReader,"WriteBatch.update",r._key,e),this._mutations.push(a.toMutation(r._key,v.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=__PRIVATE_validateReference(t,this._firestore);return this._mutations=this._mutations.concat(new C(e._key,v.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new x(j.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function __PRIVATE_validateReference(t,e){if((t=lt(t)).firestore!==e)throw new x(j.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}function writeBatch(t){t=f(t,h);const e=d(t);return new WriteBatch(t,t=>z(e,t))}
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
 */class Transaction$1{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new x(j.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await tt(this.datastore,t);return e.forEach(t=>this.recordVersion(t)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(t){this.lastTransactionError=t}this.writtenDocs.add(t.toString())}delete(t){this.write(new C(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((t,e)=>{const s=et.fromPath(e);this.mutations.push(new st(s,this.precondition(s)))}),await z(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw rt(50498,{R:t.constructor.name});e=it.min()}const s=this.readVersions.get(t.key.toString());if(s){if(!e.isEqual(s))throw new x(j.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(it.min())?v.exists(!1):v.updateTime(e):v.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(it.min()))throw new x(j.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return v.updateTime(e)}return v.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
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
 */class __PRIVATE_TransactionRunner{constructor(t,e,s,i,r){this.asyncQueue=t,this.datastore=e,this.options=s,this.updateFunction=i,this.deferred=r,this.P=s.maxAttempts,this.I=new __PRIVATE_ExponentialBackoff(this.asyncQueue,"transaction_retry")}V(){this.P-=1,this.D()}D(){this.I.A(async()=>{const t=new Transaction$1(this.datastore),e=this.F(t);e&&e.then(e=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(e)}).catch(t=>{this.v(t)}))}).catch(t=>{this.v(t)})})}F(t){try{const e=this.updateFunction(t);return!nt(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}v(t){this.P>0&&this.k(t)?(this.P-=1,this.asyncQueue.enqueueAndForget(()=>(this.D(),Promise.resolve()))):this.deferred.reject(t)}k(t){if("FirebaseError"===t?.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||"already-exists"===e||!ot(e)}return!1}}
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
 */class DelayedOperation{constructor(t,e,s,i,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=s,this.op=i,this.removalCallback=r,this.deferred=new __PRIVATE_Deferred,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(t=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,s,i,r){const a=Date.now()+s,n=new DelayedOperation(t,e,a,i,r);return n.start(s),n}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new x(j.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null
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
 */)}}const dt="AsyncQueue";class __PRIVATE_AsyncQueueImpl{constructor(t=Promise.resolve()){this.B=[],this.q=!1,this.O=[],this.S=null,this.C=!1,this.M=!1,this.N=[],this.I=new __PRIVATE_ExponentialBackoff(this,"async_queue_retry"),this.W=()=>{const t=getDocument();t&&r(dt,"Visibility state changed to "+t.visibilityState),this.I.T()},this.L=t;const e=getDocument();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.W)}get isShuttingDown(){return this.q}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.$(),this.U(t)}enterRestrictedMode(t){if(!this.q){this.q=!0,this.M=t||!1;const e=getDocument();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.W)}}enqueue(t){if(this.$(),this.q)return new Promise(()=>{});const e=new __PRIVATE_Deferred;return this.U(()=>this.q&&this.M?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.B.push(t),this.j()))}async j(){if(0!==this.B.length){try{await this.B[0](),this.B.shift(),this.I.reset()}catch(t){if(!function(t){return"IndexedDbTransactionError"===t.name}
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
 */(t))throw t;r(dt,"Operation failed with retryable error: "+t)}this.B.length>0&&this.I.A(()=>this.j())}}U(t){const e=this.L.then(()=>(this.C=!0,t().catch(t=>{this.S=t,this.C=!1;const e=__PRIVATE_getMessageOrStack(t);throw ht("INTERNAL UNHANDLED ERROR: ",e),t}).then(t=>(this.C=!1,t))));return this.L=e,e}enqueueAfterDelay(t,e,s){this.$(),this.N.indexOf(t)>-1&&(e=0);const i=DelayedOperation.createAndSchedule(this,t,e,s,t=>this.G(t));return this.O.push(i),i}$(){this.S&&rt(47125,{H:__PRIVATE_getMessageOrStack(this.S)})}verifyOperationInProgress(){}async J(){let t;do{t=this.L,await t}while(t!==this.L)}K(t){for(const e of this.O)if(e.timerId===t)return!0;return!1}X(t){return this.J().then(()=>{this.O.sort((t,e)=>t.targetTimeMs-e.targetTimeMs);for(const e of this.O)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.J()})}Y(t){this.N.push(t)}G(t){const e=this.O.indexOf(t);this.O.splice(e,1)}}function __PRIVATE_getMessageOrStack(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
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
 */class Transaction{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=P(t)}get(t){const e=__PRIVATE_validateReference(t,this._firestore),s=new p(this._firestore);return this._transaction.lookup([e._key]).then(t=>{if(!t||1!==t.length)return rt(24041);const i=t[0];if(i.isFoundDocument())return new ct(this._firestore,s,i.key,i,e.converter);if(i.isNoDocument())return new ct(this._firestore,s,e._key,null,e.converter);throw rt(18433,{doc:i})})}set(t,e,s){const i=__PRIVATE_validateReference(t,this._firestore),r=D(i.converter,e,s),a=b(this._dataReader,"Transaction.set",i._key,r,null!==i.converter,s);return this._transaction.set(i._key,a),this}update(t,e,s,...i){const r=__PRIVATE_validateReference(t,this._firestore);let a;return a="string"==typeof(e=lt(e))||e instanceof k?O(this._dataReader,"Transaction.update",r._key,e,s,i):S(this._dataReader,"Transaction.update",r._key,e),this._transaction.update(r._key,a),this}delete(t){const e=__PRIVATE_validateReference(t,this._firestore);return this._transaction.delete(e._key),this}}function runTransaction(t,e,s){t=f(t,h);const i=d(t),r={...ft,...s};!function(t){if(t.maxAttempts<1)throw new x(j.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r);const a=new __PRIVATE_Deferred;return new __PRIVATE_TransactionRunner(new __PRIVATE_AsyncQueueImpl,i,r,s=>e(new Transaction(t,s)),a).V(),a.promise}o(`${i}_lite`),t(new a("firestore/lite",(t,{instanceIdentifier:e,options:s})=>{const i=t.getProvider("app").getImmediate(),r=new h(new c(t.getProvider("auth-internal")),new u(i,t.getProvider("app-check-internal")),l(i,e),i);return s&&r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),e("firestore-lite",_t,"rn"),e("firestore-lite",_t,"esm2020");export{AggregateField,AggregateQuerySnapshot,Transaction,WriteBatch,aggregateFieldEqual,aggregateQuerySnapshotEqual,average,count,getAggregate,getCount,runTransaction,sum,writeBatch};