module.exports=["[project]/booking/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript) <locals>",e=>{"use strict";e.s(["AggregateField",()=>a,"AggregateQuerySnapshot",()=>c,"DocumentSnapshot",()=>ue,"PersistentCacheIndexManager",()=>Ge,"QueryCompositeFilterConstraint",()=>y,"QueryConstraint",()=>f,"QueryDocumentSnapshot",()=>le,"QueryEndAtConstraint",()=>A,"QueryFieldFilterConstraint",()=>p,"QueryLimitConstraint",()=>I,"QueryOrderByConstraint",()=>b,"QuerySnapshot",()=>he,"QueryStartAtConstraint",()=>N,"SnapshotMetadata",()=>ce,"Transaction",()=>be,"WriteBatch",()=>ye,"_TestingHooks",()=>Je,"addDoc",()=>qe,"aggregateFieldEqual",()=>G,"aggregateQuerySnapshotEqual",()=>Q,"and",()=>w,"average",()=>R,"count",()=>L,"deleteAllPersistentCacheIndexes",()=>$e,"deleteDoc",()=>Ce,"disablePersistentCacheIndexAutoCreation",()=>We,"documentSnapshotFromJSON",()=>de,"enablePersistentCacheIndexAutoCreation",()=>Be,"endAt",()=>x,"endBefore",()=>T,"executeWrite",()=>Pe,"getAggregateFromServer",()=>W,"getCountFromServer",()=>B,"getDoc",()=>ke,"getDocFromCache",()=>De,"getDocFromServer",()=>Ne,"getDocs",()=>Se,"getDocsFromCache",()=>Ee,"getDocsFromServer",()=>Ae,"getPersistentCacheIndexManager",()=>Qe,"limit",()=>k,"limitToLast",()=>D,"memoryEagerGarbageCollector",()=>K,"memoryLocalCache",()=>Z,"memoryLruGarbageCollector",()=>Y,"onSnapshot",()=>je,"onSnapshotResume",()=>Me,"onSnapshotsInSync",()=>Fe,"or",()=>g,"orderBy",()=>v,"persistentLocalCache",()=>X,"persistentMultipleTabManager",()=>ne,"persistentSingleTabManager",()=>te,"query",()=>m,"querySnapshotFromJSON",()=>fe,"runTransaction",()=>ve,"setDoc",()=>Te,"setIndexConfiguration",()=>Re,"snapshotEqual",()=>pe,"startAfter",()=>E,"startAt",()=>S,"sum",()=>O,"updateDoc",()=>xe,"where",()=>_,"writeBatch",()=>Oe]);var t=e.i("[project]/booking/node_modules/@firebase/app/dist/esm/index.esm.js [app-rsc] (ecmascript) <locals>"),n=e.i("[project]/booking/node_modules/@firebase/component/dist/esm/index.esm.js [app-rsc] (ecmascript)"),r=e.i("[project]/booking/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-rsc] (ecmascript)"),s=e.i("[project]/booking/node_modules/@firebase/util/dist/node-esm/index.node.esm.js [app-rsc] (ecmascript)");e.i("[project]/booking/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js [app-rsc] (ecmascript)"),e.i("[project]/booking/node_modules/@firebase/logger/dist/esm/index.esm.js [app-rsc] (ecmascript)"),e.i("[externals]/util [external] (util, cjs)"),e.i("[externals]/crypto [external] (crypto, cjs)"),e.i("[project]/booking/node_modules/@grpc/grpc-js/build/src/index.js [app-rsc] (ecmascript)"),e.i("[project]/booking/node_modules/@grpc/proto-loader/build/src/index.js [app-rsc] (ecmascript)");const o="@firebase/firestore",i="4.13.0";
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
class a{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class c{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new r.O({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}
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
 */class u{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new r.D(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new d(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field((0,r.f)("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class d extends u{data(){return super.data()}}
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
 */function l(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new r.j(r.k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class h{}class f extends h{}function m(e,t,...n){let s=[];t instanceof h&&s.push(t),s=s.concat(n),function(e){const t=e.filter(e=>e instanceof y).length,n=e.filter(e=>e instanceof p).length;if(t>1||t>0&&n>0)throw new r.j(r.k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
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
 */(s);for(const t of s)e=t._apply(e);return e}class p extends f{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new p(e,t,n)}_apply(e){const t=this._parse(e);return M(e._query,t),new r.Q(e.firestore,e.converter,(0,r.q)(e._query,t))}_parse(e){const t=(0,r.c)(e.firestore),n=function(e,t,n,s,o,i,a){let c;if(o.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new r.j(r.k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){j(a,i);const t=[];for(const n of a)t.push(q(s,e,n));c={arrayValue:{values:t}}}else c=q(s,e,a)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||j(a,i),c=(0,r.l)(n,t,a,"in"===i||"not-in"===i);const u=r.m.create(o,i,c);return u}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function _(e,t,n){const s=t,o=(0,r.f)("where",e);return p._create(o,s,n)}class y extends h{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new y(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:r.C.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const s=t.getFlattenedFilters();for(const e of s)M(n,e),n=(0,r.q)(n,e)}(e._query,t),new r.Q(e.firestore,e.converter,(0,r.q)(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function g(...e){return e.forEach(e=>F("or",e)),y._create("or",e)}function w(...e){return e.forEach(e=>F("and",e)),y._create("and",e)}class b extends f{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new b(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new r.j(r.k.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new r.j(r.k.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const s=new r.ak(t,n);return s}(e._query,this._field,this._direction);return new r.Q(e.firestore,e.converter,(0,r.e)(e._query,t))}}function v(e,t="asc"){const n=t,s=(0,r.f)("orderBy",e);return b._create(s,n)}class I extends f{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new I(e,t,n)}_apply(e){return new r.Q(e.firestore,e.converter,(0,r.g)(e._query,this._limit,this._limitType))}}function k(e){return(0,r.v)("limit",e),I._create("limit",e,"F")}function D(e){return(0,r.v)("limitToLast",e),I._create("limitToLast",e,"L")}class N extends f{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new N(e,t,n)}_apply(e){const t=C(e,this.type,this._docOrFields,this._inclusive);return new r.Q(e.firestore,e.converter,(0,r.h)(e._query,t))}}function S(...e){return N._create("startAt",e,!0)}function E(...e){return N._create("startAfter",e,!1)}class A extends f{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new A(e,t,n)}_apply(e){const t=C(e,this.type,this._docOrFields,this._inclusive);return new r.Q(e.firestore,e.converter,(0,r.i)(e._query,t))}}function T(...e){return A._create("endBefore",e,!1)}function x(...e){return A._create("endAt",e,!0)}function C(e,t,n,o){if(n[0]=(0,s.getModularInstance)(n[0]),n[0]instanceof u)return function(e,t,n,s,o){if(!s)throw new r.j(r.k.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of(0,r.o)(e))if(n.field.isKeyField())i.push((0,r.r)(t,s.key));else{const e=s.data.field(n.field);if((0,r.t)(e))throw new r.j(r.k.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=n.field.canonicalString();throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}i.push(e)}return new r.u(i,o)}(e._query,e.firestore._databaseId,t,n[0]._document,o);{const s=(0,r.c)(e.firestore);return function(e,t,n,s,o,i){const a=e.explicitOrderBy;if(o.length>a.length)throw new r.j(r.k.INVALID_ARGUMENT,`Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const c=[];for(let i=0;i<o.length;i++){const u=o[i];if(a[i].field.isKeyField()){if("string"!=typeof u)throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof u}`);if(!(0,r.w)(e)&&-1!==u.indexOf("/"))throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${s}() must be a plain document ID, but '${u}' contains a slash.`);const n=e.path.child(r.R.fromString(u));if(!r.x.isDocumentKey(n))throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const o=new r.x(n);c.push((0,r.r)(t,o))}else{const e=(0,r.l)(n,s,u);c.push(e)}}return new r.u(c,i)}(e._query,e.firestore._databaseId,s,t,n,o)}}function q(e,t,n){if("string"==typeof(n=(0,s.getModularInstance)(n))){if(""===n)throw new r.j(r.k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!(0,r.w)(t)&&-1!==n.indexOf("/"))throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const s=t.path.child(r.R.fromString(n));if(!r.x.isDocumentKey(s))throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return(0,r.r)(e,new r.x(s))}if(n instanceof r.D)return(0,r.r)(e,n._key);throw new r.j(r.k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${(0,r.y)(n)}.`)}function j(e,t){if(!Array.isArray(e)||0===e.length)throw new r.j(r.k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function M(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new r.j(r.k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new r.j(r.k.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function F(e,t){if(!(t instanceof p||t instanceof y))throw new r.j(r.k.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function P(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class V extends r.A{constructor(e){super(),this.firestore=e}convertBytes(e){return new r.B(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new r.D(this.firestore,null,t)}}
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
 */function O(e){return new a("sum",(0,r.f)("sum",e))}function R(e){return new a("avg",(0,r.f)("average",e))}function L(){return new a("count")}function G(e,t){return e instanceof a&&t instanceof a&&e.aggregateType===t.aggregateType&&e._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function Q(e,t){return(0,r.z)(e.query,t.query)&&(0,s.deepEqual)(e.data(),t.data())}
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
 */function B(e){return W(e,{count:L()})}function W(e,t){const n=(0,r.E)(e.firestore,r.F),s=(0,r.G)(n),o=(0,r.H)(t,(e,t)=>new r.al(t,e.aggregateType,e._internalFieldPath));return(0,r.I)(s,e._query,o).then(t=>function(e,t,n){const s=new r.J(e),o=new c(t,s,n);return o}
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
 */(n,e,t))}class ${constructor(e){this.kind="memory",this._onlineComponentProvider=r.am.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new r.an(void 0)}}toJSON(){return{kind:this.kind}}}class U{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=te(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class z{constructor(){this.kind="memoryEager",this._offlineComponentProvider=r.ao.provider}toJSON(){return{kind:this.kind}}}class J{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new r.an(e)}}toJSON(){return{kind:this.kind}}}function K(){return new z}function Y(e){return new J(e?.cacheSizeBytes)}function Z(e){return new $(e)}function X(e){return new U(e)}class H{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=r.am.provider,this._offlineComponentProvider={build:t=>new r.ap(t,e?.cacheSizeBytes,this.forceOwnership)}}}class ee{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=r.am.provider,this._offlineComponentProvider={build:t=>new r.aq(t,e?.cacheSizeBytes)}}}function te(e){return new H(e?.forceOwnership)}function ne(){return new ee}const re=(0,r.n)();function se(e){const t=JSON.stringify(e);return`${re.encode(t).byteLength}${t}`}se({metadata:{id:"test-bundle",createTime:{seconds:1577836805,nanos:6},version:1,totalDocuments:1,totalBytes:416}});se({documentMetadata:{name:"projects/test-project/databases/(default)/documents/collectionId/doc1",readTime:{seconds:5,nanos:6},exists:!0}});se({document:{name:"projects/test-project/databases/(default)/documents/collectionId/doc1",createTime:{seconds:1,nanos:2e6},updateTime:{seconds:3,nanos:4e3},fields:{foo:{stringValue:"value"},bar:{integerValue:-42}}}});se({documentMetadata:{name:"projects/test-project/databases/(default)/documents/collectionId/doc2",readTime:{seconds:5,nanos:6},exists:!0}});se({document:{name:"projects/test-project/databases/(default)/documents/collectionId/doc2",createTime:{seconds:1,nanos:2e6},updateTime:{seconds:3,nanos:4e3},fields:{foo:{stringValue:"value1"},bar:{integerValue:42},emptyArray:{arrayValue:{}},emptyMap:{mapValue:{}}}}});se({documentMetadata:{name:"projects/test-project/databases/(default)/documents/collectionId/nodoc",readTime:{seconds:5,nanos:6},exists:!1}});se({namedQuery:{name:"limitQuery",bundledQuery:{parent:"projects/fireeats-97d5e/databases/(default)/documents",structuredQuery:{from:[{collectionId:"node_3.7.5_7Li7XoCjutvNxwD0tpo9"}],orderBy:[{field:{fieldPath:"sort"},direction:"DESCENDING"}],limit:{value:1}},limitType:"FIRST"},readTime:{seconds:1590011379,nanos:191164e3}}});se({namedQuery:{name:"limitToLastQuery",bundledQuery:{parent:"projects/fireeats-97d5e/databases/(default)/documents",structuredQuery:{from:[{collectionId:"node_3.7.5_7Li7XoCjutvNxwD0tpo9"}],orderBy:[{field:{fieldPath:"sort"},direction:"ASCENDING"}],limit:{value:1}},limitType:"LAST"},readTime:{seconds:1590011379,nanos:543063e3}}});class oe{constructor(e,t){this.firestore=e,this.bundleId=t,this.documents=new Map,this.namedQueries=new Map,this.latestReadTime=new r.av(0,0),this.databaseId=e._databaseId,this.serializer=new r.aw(this.databaseId,!0),this.userDataReader=new r.ax(this.databaseId,!0,this.serializer)}addBundleDocument(e,t){const n=this.documents.get(e.documentPath),s=n?.metadata.queries,o=e.readTime,i=n?.metadata.readTime?(0,r.ay)(n.metadata.readTime):null;if((!o&&null==i||void 0!==o&&(null==i||i<o))&&this.documents.set(e.documentPath,{document:this.toBundleDocument(e),metadata:{name:(0,r.az)(this.serializer,e.documentKey),readTime:o?(0,r.aA)(this.serializer,o):void 0,exists:e.documentExists}}),o&&o>this.latestReadTime&&(this.latestReadTime=o),t){const n=this.documents.get(e.documentPath);n.metadata.queries=s||[],n.metadata.queries.push(t)}}addBundleQuery(e){if(this.namedQueries.has(e.name))throw new Error(`Query name conflict: ${name} has already been added.`);let t=new r.av(0,0);for(const n of e.docBundleDataArray)this.addBundleDocument(n,e.name),n.readTime&&n.readTime>t&&(t=n.readTime);const n=(0,r.aB)(this.serializer,(0,r.aC)(e.query)),s={parent:e.parent,structuredQuery:n.queryTarget.structuredQuery};this.namedQueries.set(e.name,{name:e.name,bundledQuery:s,readTime:(0,r.aA)(this.serializer,t)})}toBundleDocument(e){const t=this.userDataReader.createContext(4,"internal toBundledDocument"),n=(0,r.aD)(e.documentData,t);return{name:(0,r.az)(this.serializer,e.documentKey),fields:n.mapValue.fields,updateTime:(0,r.aA)(this.serializer,e.versionTime),createTime:(0,r.aA)(this.serializer,e.createdTime)}}lengthPrefixedString(e){const t=JSON.stringify(e);return`${re.encode(t).byteLength}${t}`}build(){let e="";for(const t of this.namedQueries.values())e+=this.lengthPrefixedString({namedQuery:t});for(const t of this.documents.values()){const n=t.metadata;e+=this.lengthPrefixedString({documentMetadata:n});const r=t.document;r&&(e+=this.lengthPrefixedString({document:r}))}const t={id:this.bundleId,createTime:(0,r.aA)(this.serializer,this.latestReadTime),version:1,totalDocuments:this.documents.size,totalBytes:re.encode(e).length};return e=this.lengthPrefixedString({metadata:t})+e,e}}
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
 */function ie(e,t,n){return{documentData:t,documentKey:n.mutableCopy().key,documentPath:e,documentExists:!0,createdTime:n.createTime.toTimestamp(),readTime:n.readTime.toTimestamp(),versionTime:n.version.toTimestamp()}}
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
 */const ae="NOT SUPPORTED";class ce{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ue extends u{constructor(e,t,n,r,s,o){super(e,t,n,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new le(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field((0,r.f)("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new r.j(r.k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};if(t.type=ue._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument())return t;const n=this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous");return t.bundle=function(e,t,n,s){const o=new oe(e,r.S.newId());return o.addBundleDocument(ie(s,n,t)),o.build()}(this._firestore,e,n,this.ref.path),t}}function de(e,t,n){if((0,r.K)(t,ue._jsonSchema)){if(t.bundle===ae)throw new r.j(r.k.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const s=(0,r.L)(e._databaseId),o=(0,r.M)(t.bundle,s),i=o.getElements(),a=new r.N(o.getMetadata(),s);for(const e of i)a.addSizedElement(e);const c=a.documents;if(1!==c.length)throw new r.j(r.k.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=(0,r.P)(s,c[0].document),d=new r.x(r.R.fromString(t.bundleName));return new ue(e,new V(e),d,u,new ce(!1,!1),n||null)}}ue._jsonSchemaVersion="firestore/documentSnapshot/1.0",ue._jsonSchema={type:(0,r.p)("string",ue._jsonSchemaVersion),bundleSource:(0,r.p)("string","DocumentSnapshot"),bundleName:(0,r.p)("string"),bundle:(0,r.p)("string")};class le extends ue{data(e={}){return super.data(e)}}class he{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new ce(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new le(this._firestore,this._userDataWriter,n.key,n,new ce(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new r.j(r.k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new le(e._firestore,e._userDataWriter,n.doc.key,n.doc,new ce(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new le(e._firestore,e._userDataWriter,t.doc.key,t.doc,new ce(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,o=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),o=n.indexOf(t.doc.key)),{type:me(t.type),doc:r,oldIndex:s,newIndex:o}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new r.j(r.k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=he._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=r.S.newId();const t=this._firestore._databaseId.database,n=`projects/${this._firestore._databaseId.projectId}/databases/${t}/documents`,s=[],o=[],i=[];return this.docs.forEach(e=>{null!==e._document&&(s.push(e._document),o.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),i.push(e.ref.path))}),e.bundle=function(e,t,n,r,s,o,i){const a=[];for(let e=0;e<o.length;e++)a.push(ie(s[e],i[e],o[e]));const c={name:n,query:t,parent:r,docBundleDataArray:a},u=new oe(e,n);return u.addBundleQuery(c),u.build()}(this._firestore,this.query._query,e.bundleName,n,i,s,o),e}}function fe(e,t,n){if((0,r.K)(t,he._jsonSchema)){if(t.bundle===ae)throw new r.j(r.k.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const s=(0,r.L)(e._databaseId),o=(0,r.M)(t.bundle,s),i=o.getElements(),a=new r.N(o.getMetadata(),s);for(const e of i)a.addSizedElement(e);if(1!==a.queries.length)throw new r.j(r.k.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${a.queries.length} queries.`);const c=(0,r.T)(a.queries[0].bundledQuery),u=a.documents;let d=new r.U;u.map(e=>{const t=(0,r.P)(s,e.document);d=d.add(t)});const l=r.V.fromInitialDocuments(c,d,(0,r.W)(),!1,!1),h=new r.Q(e,n||null,c);return new he(e,new V(e),h,l)}}function me(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return(0,r.X)(61501,{type:e})}}function pe(e,t){return e instanceof ue&&t instanceof ue?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof he&&t instanceof he&&(e._firestore===t._firestore&&(0,r.z)(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot))}
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
 */he._jsonSchemaVersion="firestore/querySnapshot/1.0",he._jsonSchema={type:(0,r.p)("string",he._jsonSchemaVersion),bundleSource:(0,r.p)("string","QuerySnapshot"),bundleName:(0,r.p)("string"),bundle:(0,r.p)("string")};const _e={maxAttempts:5};
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
class ye{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=(0,r.c)(e)}set(e,t,n){this._verifyNotCommitted();const s=ge(e,this._firestore),o=P(s.converter,t,n),i=(0,r.Y)(this._dataReader,"WriteBatch.set",s._key,o,null!==s.converter,n);return this._mutations.push(i.toMutation(s._key,r.Z.none())),this}update(e,t,n,...o){this._verifyNotCommitted();const i=ge(e,this._firestore);let a;return a="string"==typeof(t=(0,s.getModularInstance)(t))||t instanceof r._?(0,r.$)(this._dataReader,"WriteBatch.update",i._key,t,n,o):(0,r.a0)(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,r.Z.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ge(e,this._firestore);return this._mutations=this._mutations.concat(new r.a1(t._key,r.Z.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new r.j(r.k.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ge(e,t){if((e=(0,s.getModularInstance)(e)).firestore!==t)throw new r.j(r.k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
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
 */class we{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=(0,r.c)(e)}get(e){const t=ge(e,this._firestore),n=new V(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return(0,r.X)(24041);const s=e[0];if(s.isFoundDocument())return new u(this._firestore,n,s.key,s,t.converter);if(s.isNoDocument())return new u(this._firestore,n,t._key,null,t.converter);throw(0,r.X)(18433,{doc:s})})}set(e,t,n){const s=ge(e,this._firestore),o=P(s.converter,t,n),i=(0,r.Y)(this._dataReader,"Transaction.set",s._key,o,null!==s.converter,n);return this._transaction.set(s._key,i),this}update(e,t,n,...o){const i=ge(e,this._firestore);let a;return a="string"==typeof(t=(0,s.getModularInstance)(t))||t instanceof r._?(0,r.$)(this._dataReader,"Transaction.update",i._key,t,n,o):(0,r.a0)(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){const t=ge(e,this._firestore);return this._transaction.delete(t._key),this}}
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
 */class be extends we{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=ge(e,this._firestore),n=new r.J(this._firestore);return super.get(e).then(e=>new ue(this._firestore,n,t._key,e._document,new ce(!1,!1),t.converter))}}function ve(e,t,n){e=(0,r.E)(e,r.F);const s={..._e,...n};!function(e){if(e.maxAttempts<1)throw new r.j(r.k.INVALID_ARGUMENT,"Max attempts must be at least 1")}(s);const o=(0,r.G)(e);return(0,r.a2)(o,n=>t(new be(e,n)),s)}
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
 */function Ie(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const e of t)if(e in n&&"function"==typeof n[e])return!0;return!1}
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
 */(e,["next","error","complete"])}function ke(e){e=(0,r.E)(e,r.D);const t=(0,r.E)(e.firestore,r.F),n=(0,r.G)(t);return(0,r.a3)(n,e._key).then(n=>Ve(t,e,n))}function De(e){e=(0,r.E)(e,r.D);const t=(0,r.E)(e.firestore,r.F),n=(0,r.G)(t),s=new r.J(t);return(0,r.a4)(n,e._key).then(n=>new ue(t,s,e._key,n,new ce(null!==n&&n.hasLocalMutations,!0),e.converter))}function Ne(e){e=(0,r.E)(e,r.D);const t=(0,r.E)(e.firestore,r.F),n=(0,r.G)(t);return(0,r.a3)(n,e._key,{source:"server"}).then(n=>Ve(t,e,n))}function Se(e){e=(0,r.E)(e,r.Q);const t=(0,r.E)(e.firestore,r.F),n=(0,r.G)(t),s=new r.J(t);return l(e._query),(0,r.a5)(n,e._query).then(n=>new he(t,s,e,n))}function Ee(e){e=(0,r.E)(e,r.Q);const t=(0,r.E)(e.firestore,r.F),n=(0,r.G)(t),s=new r.J(t);return(0,r.a6)(n,e._query).then(n=>new he(t,s,e,n))}function Ae(e){e=(0,r.E)(e,r.Q);const t=(0,r.E)(e.firestore,r.F),n=(0,r.G)(t),s=new r.J(t);return(0,r.a5)(n,e._query,{source:"server"}).then(n=>new he(t,s,e,n))}function Te(e,t,n){e=(0,r.E)(e,r.D);const s=(0,r.E)(e.firestore,r.F),o=P(e.converter,t,n),i=(0,r.c)(s);return Pe(s,[(0,r.Y)(i,"setDoc",e._key,o,null!==e.converter,n).toMutation(e._key,r.Z.none())])}function xe(e,t,n,...o){e=(0,r.E)(e,r.D);const i=(0,r.E)(e.firestore,r.F),a=(0,r.c)(i);let c;c="string"==typeof(t=(0,s.getModularInstance)(t))||t instanceof r._?(0,r.$)(a,"updateDoc",e._key,t,n,o):(0,r.a0)(a,"updateDoc",e._key,t);return Pe(i,[c.toMutation(e._key,r.Z.exists(!0))])}function Ce(e){return Pe((0,r.E)(e.firestore,r.F),[new r.a1(e._key,r.Z.none())])}function qe(e,t){const n=(0,r.E)(e.firestore,r.F),s=(0,r.a7)(e),o=P(e.converter,t),i=(0,r.c)(e.firestore);return Pe(n,[(0,r.Y)(i,"addDoc",s._key,o,null!==e.converter,{}).toMutation(s._key,r.Z.exists(!1))]).then(()=>s)}function je(e,...t){e=(0,s.getModularInstance)(e);let n={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||Ie(t[o])||(n=t[o++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Ie(t[o])){const e=t[o];t[o]=e.next?.bind(e),t[o+1]=e.error?.bind(e),t[o+2]=e.complete?.bind(e)}let a,c,u;if(e instanceof r.D)c=(0,r.E)(e.firestore,r.F),u=(0,r.a8)(e._key.path),a={next:n=>{t[o]&&t[o](Ve(c,e,n))},error:t[o+1],complete:t[o+2]};else{const n=(0,r.E)(e,r.Q);c=(0,r.E)(n.firestore,r.F),u=n._query;const s=new r.J(c);a={next:e=>{t[o]&&t[o](new he(c,s,n,e))},error:t[o+1],complete:t[o+2]},l(e._query)}const d=(0,r.G)(c);return(0,r.a9)(d,u,i,a)}function Me(e,t,...n){const o=(0,s.getModularInstance)(e),i=function(e){const t={bundle:"",bundleName:"",bundleSource:""},n=["bundle","bundleName","bundleSource"];for(const r of n){if(!(r in e)){t.error=`snapshotJson missing required field: ${r}`;break}const n=e[r];if("string"!=typeof n){t.error=`snapshotJson field '${r}' must be a string.`;break}if(0===n.length){t.error=`snapshotJson field '${r}' cannot be an empty string.`;break}"bundle"===r?t.bundle=n:"bundleName"===r?t.bundleName=n:"bundleSource"===r&&(t.bundleSource=n)}return t}(t);if(i.error)throw new r.j(r.k.INVALID_ARGUMENT,i.error);let a,c=0;if("object"!=typeof n[c]||Ie(n[c])||(a=n[c++]),"QuerySnapshot"===i.bundleSource){let e=null;if("object"==typeof n[c]&&Ie(n[c])){const t=n[c++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[c++],error:n[c++],complete:n[c++]};return function(e,t,n,s,o){let i,a=!1;const c=(0,r.ar)(e,t.bundle);return c.then(()=>(0,r.as)(e,t.bundleName)).then(e=>{if(e&&!a){o&&e.withConverter(o),i=je(e,n||{},s)}}).catch(e=>(s.error&&s.error(e),()=>{})),()=>{a||(a=!0,i&&i())}}
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
 */(o,i,a,e,n[c])}if("DocumentSnapshot"===i.bundleSource){let e=null;if("object"==typeof n[c]&&Ie(n[c])){const t=n[c++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[c++],error:n[c++],complete:n[c++]};return function(e,t,n,s,o){let i,a=!1;const c=(0,r.ar)(e,t.bundle);return c.then(()=>{if(!a){const a=new r.D(e,o||null,r.x.fromPath(t.bundleName));i=je(a,n||{},s)}}).catch(e=>(s.error&&s.error(e),()=>{})),()=>{a||(a=!0,i&&i())}}(o,i,a,e,n[c])}throw new r.j(r.k.INVALID_ARGUMENT,`unsupported bundle source: ${i.bundleSource}`)}function Fe(e,t){e=(0,r.E)(e,r.F);const n=(0,r.G)(e),s=Ie(t)?t:{next:t};return(0,r.aa)(n,s)}function Pe(e,t){const n=(0,r.G)(e);return(0,r.ab)(n,t)}function Ve(e,t,n){const s=n.docs.get(t._key),o=new r.J(e);return new ue(e,o,t._key,s,new ce(n.hasPendingWrites,n.fromCache),t.converter)}function Oe(e){return e=(0,r.E)(e,r.F),(0,r.G)(e),new ye(e,t=>Pe(e,t))}
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
 */function Re(e,t){e=(0,r.E)(e,r.F);const n=(0,r.G)(e);if(!n._uninitializedComponentsProvider||"memory"===n._uninitializedComponentsProvider._offline.kind)return(0,r.ac)("Cannot enable indexes when persistence is disabled"),Promise.resolve();const s=function(e){const t="string"==typeof e?function(e){try{return JSON.parse(e)}catch(e){throw new r.j(r.k.INVALID_ARGUMENT,"Failed to parse JSON: "+e?.message)}}(e):e,n=[];if(Array.isArray(t.indexes))for(const e of t.indexes){const t=Le(e,"collectionGroup"),s=[];if(Array.isArray(e.fields))for(const t of e.fields){const e=Le(t,"fieldPath"),n=(0,r.ae)("setIndexConfiguration",e);"CONTAINS"===t.arrayConfig?s.push(new r.at(n,2)):"ASCENDING"===t.order?s.push(new r.at(n,0)):"DESCENDING"===t.order&&s.push(new r.at(n,1))}n.push(new r.af(r.af.UNKNOWN_ID,t,s,r.ag.empty()))}return n}(t);return(0,r.ad)(n,s)}function Le(e,t){if("string"!=typeof e[t])throw new r.j(r.k.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}
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
 */class Ge{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Qe(e){e=(0,r.E)(e,r.F);const t=ze.get(e);if(t)return t;const n=(0,r.G)(e);if("persistent"!==n._uninitializedComponentsProvider?._offline.kind)return null;const s=new Ge(e);return ze.set(e,s),s}function Be(e){Ue(e,!0)}function We(e){Ue(e,!1)}function $e(e){const t=(0,r.G)(e._firestore);(0,r.ah)(t).then(e=>(0,r.ai)("deleting all persistent cache indexes succeeded")).catch(e=>(0,r.ac)("deleting all persistent cache indexes failed",e))}function Ue(e,t){const n=(0,r.G)(e._firestore);(0,r.aj)(n,t).then(e=>(0,r.ai)(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>(0,r.ac)(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}const ze=new WeakMap;
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
 */class Je{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Ke.instance.onExistenceFilterMismatch(e)}}class Ke{constructor(){this.existenceFilterMismatchCallbacksById=new Map}static get instance(){return Ye||(Ye=new Ke,(0,r.au)(Ye)),Ye}notifyOnExistenceFilterMismatch(e){this.existenceFilterMismatchCallbacksById.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.existenceFilterMismatchCallbacksById;return n.set(t,e),()=>n.delete(t)}}let Ye=null;
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
 */!
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
function(e,s=!0){(0,r.s)(t.SDK_VERSION),(0,t._registerComponent)(new n.Component("firestore",(e,{instanceIdentifier:t,options:n})=>{const o=e.getProvider("app").getImmediate(),i=new r.F(new r.a(e.getProvider("auth-internal")),new r.b(o,e.getProvider("app-check-internal")),(0,r.d)(o,t),o);return n={useFetchStreams:s,...n},i._setSettings(n),i},"PUBLIC").setMultipleInstances(!0)),(0,t.registerVersion)(o,i,e),(0,t.registerVersion)(o,i,"esm2020")}("node")}];