"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var app=require("@firebase/app"),component=require("@firebase/component"),util=require("@firebase/util"),logger$1=require("@firebase/logger");const name="@firebase/data-connect",version="0.5.0";
/**
 * @license
 * Copyright 2024 Google LLC
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
let SDK_VERSION="";function setSDKVersion(e){SDK_VERSION=e}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */const Code={OTHER:"other",ALREADY_INITIALIZED:"already-initialized",NOT_INITIALIZED:"not-initialized",NOT_SUPPORTED:"not-supported",INVALID_ARGUMENT:"invalid-argument",PARTIAL_ERROR:"partial-error",UNAUTHORIZED:"unauthorized"};class DataConnectError extends util.FirebaseError{constructor(e,t){super(e,t),this.name="DataConnectError",Object.setPrototypeOf(this,DataConnectError.prototype)}toString(){return`${this.name}[code=${this.code}]: ${this.message}`}}class DataConnectOperationError extends DataConnectError{constructor(e,t){super(Code.PARTIAL_ERROR,e),this.name="DataConnectOperationError",this.response=t}}
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
 */class EntityDataObject{getServerValue(e){return this.serverValues[e]}constructor(e){this.globalID=e,this.serverValues={},this.referencedFrom=new Set}getServerValues(){return this.serverValues}toJSON(){return{globalID:this.globalID,map:this.serverValues,referencedFrom:Array.from(this.referencedFrom)}}static fromJSON(e){const t=new EntityDataObject(e.globalID);return t.serverValues=e.map,t.referencedFrom=new Set(e.referencedFrom),t}updateServerValue(e,t,r){return this.serverValues[e]=t,this.referencedFrom.add(r),Array.from(this.referencedFrom)}}
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
 */class InMemoryCacheProvider{constructor(e){this._keyId=e,this.edos=new Map,this.resultTrees=new Map}async setResultTree(e,t){this.resultTrees.set(e,t)}async getResultTree(e){return this.resultTrees.get(e)}async updateEntityData(e){this.edos.set(e.globalID,e)}async getEntityData(e){return this.edos.has(e)||this.edos.set(e,new EntityDataObject(e)),this.edos.get(e)}close(){return Promise.resolve()}}
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
 */const GLOBAL_ID_KEY="_id",OBJECT_LISTS_KEY="_objectLists",REFERENCES_KEY="_references",SCALARS_KEY="_scalars",ENTITY_DATA_KEYS_KEY="_entity_data_keys";class EntityNode{constructor(){this.scalars={},this.references={},this.objectLists={},this.entityDataKeys=new Set}async loadData(e,t,r,s,i){if(void 0!==t){if("object"!=typeof t||Array.isArray(t))throw new DataConnectError(Code.INVALID_ARGUMENT,"EntityNode initialized with non-object value");if(null!==t){"object"==typeof t&&r&&r._id&&"string"==typeof r._id&&(this.globalId=r._id,this.entityData=await i.getEntityData(this.globalId));for(const n in t)if(t.hasOwnProperty(n))if("object"==typeof t[n])if(Array.isArray(t[n])){const a=r&&r[n],o=[],c=[];for(const[r,h]of t[n].entries())if("object"==typeof h)if(Array.isArray(h));else{const t=new EntityNode;await t.loadData(e,h,a&&a[r],s,i),o.push(t)}else c.push(h);if(c.length>0&&o.length>0)this.scalars[n]=t[n];else if(c.length>0)if(this.entityData){const t=this.entityData.updateServerValue(n,c,e);this.entityDataKeys.add(n),s.add(t)}else this.scalars[n]=c;else o.length>0?this.objectLists[n]=o:this.scalars[n]=[]}else{if(null===t[n]){this.scalars[n]=null;continue}const a=new EntityNode;await a.loadData(e,t[n],r&&r[n],s,i),this.references[n]=a}else if(this.entityData){const r=this.entityData.updateServerValue(n,t[n],e);this.entityDataKeys.add(n),s.add(r)}else this.scalars[n]=t[n];this.entityData&&await i.updateEntityData(this.entityData)}}}toJSON(e){const t={};if(e===EncodingMode.hydrated){if(this.entityData)for(const e of this.entityDataKeys)t[e]=this.entityData.getServerValue(e);if(this.scalars&&Object.assign(t,this.scalars),this.references)for(const r in this.references)this.references.hasOwnProperty(r)&&(t[r]=this.references[r].toJSON(e));if(this.objectLists)for(const r in this.objectLists)this.objectLists.hasOwnProperty(r)&&(t[r]=this.objectLists[r].map(t=>t.toJSON(e)));return t}if(this.entityData&&(t._id=this.entityData.globalID),t._entity_data_keys=Array.from(this.entityDataKeys),this.scalars&&(t._scalars=this.scalars),this.references){const r={};for(const t in this.references)this.references.hasOwnProperty(t)&&(r[t]=this.references[t].toJSON(e));t._references=r}if(this.objectLists){const r={};for(const t in this.objectLists)this.objectLists.hasOwnProperty(t)&&(r[t]=this.objectLists[t].map(t=>t.toJSON(e)));t._objectLists=r}return t}static fromJson(e){const t=new EntityNode;if(e.backingData&&(t.entityData=EntityDataObject.fromJSON(e.backingData)),t.globalId=e.globalID,t.scalars=e.scalars,e.references){const r={};for(const t in e.references)e.references.hasOwnProperty(t)&&(r[t]=EntityNode.fromJson(e.references[t]));t.references=r}if(e.objectLists){const r={};for(const t in e.objectLists)e.objectLists.hasOwnProperty(t)&&(r[t]=e.objectLists[t].map(e=>EntityNode.fromJson(e)));t.objectLists=r}return t}}var EncodingMode;!function(e){e[e.hydrated=0]="hydrated",e[e.dehydrated=1]="dehydrated"}(EncodingMode||(EncodingMode={}));
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
 */
class ResultTree{static fromJson(e){return new ResultTree(EntityNode.fromJson(e.rootStub),e.maxAge,e.cachedAt,e.lastAccessed)}constructor(e,t=0,r,s){this.rootStub=e,this.maxAge=t,this.cachedAt=r,this._lastAccessed=s}isStale(){return Date.now()-new Date(this.cachedAt.getTime()).getTime()>1e3*this.maxAge}updateMaxAge(e){this.maxAge=e}updateAccessed(){this._lastAccessed=new Date}get lastAccessed(){return this._lastAccessed}getRootStub(){return this.rootStub}}
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
 */class ImpactedQueryRefsAccumulator{constructor(e){this.queryId=e,this.impacted=new Set}add(e){e.filter(e=>e!==this.queryId).forEach(e=>this.impacted.add(e))}consumeEvents(){const e=Array.from(this.impacted);return this.impacted.clear(),e}}
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
 */class ResultTreeProcessor{hydrateResults(e){return e.toJSON(EncodingMode.hydrated)}async dehydrateResults(e,t,r,s){const i=new ImpactedQueryRefsAccumulator(s),n=new EntityNode;return await n.loadData(s,e,t,i,r),{entityNode:n,impacted:i.consumeEvents()}}}
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
 */class DataConnectCache{constructor(e,t,r,s,i){this.authProvider=e,this.projectId=t,this.connectorConfig=r,this.host=s,this.cacheSettings=i,this.cacheProvider=null,this.uid=null,this.authProvider.addTokenChangeListener(async e=>{const t=this.authProvider.getAuth().getUid();if(this.uid!==t){this.cacheProvider?.close(),this.uid=t;const e=await this.getIdentifier(this.uid);this.cacheProvider=this.initializeNewProviders(e)}})}async initialize(){if(!this.cacheProvider){const e=await this.getIdentifier(this.uid);this.cacheProvider=this.initializeNewProviders(e)}}async getIdentifier(e){const t=`memory-${this.projectId}-${this.connectorConfig.service}-${this.connectorConfig.connector}-${this.connectorConfig.location}-${e}-${this.host}`;return await util.generateSHA256Hash(t)}initializeNewProviders(e){return this.cacheSettings.cacheProvider.initialize(e)}async containsResultTree(e){await this.initialize();return void 0!==await this.cacheProvider.getResultTree(e)}async getResultTree(e){return await this.initialize(),this.cacheProvider.getResultTree(e)}async getResultJSON(e){await this.initialize();const t=new ResultTreeProcessor,r=this.cacheProvider,s=await r.getResultTree(e);if(!s)throw new DataConnectError(Code.INVALID_ARGUMENT,`${e} not found in cache. Call "update()" first.`);return t.hydrateResults(s.getRootStub())}async update(e,t,r){await this.initialize();const s=new ResultTreeProcessor,i=this.cacheProvider,{entityNode:n,impacted:a}=await s.dehydrateResults(t,r,i,e),o=new Date;return await i.setResultTree(e,new ResultTree(n,t.maxAge||this.cacheSettings.maxAgeSeconds,o,o)),a}}class MemoryStub{constructor(){this.type="MEMORY"}initialize(e){return new InMemoryCacheProvider(e)}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */class AppCheckTokenProvider{constructor(e,t){this.appCheckProvider=t,app._isFirebaseServerApp(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(e=>this.appCheck=e).catch()}getToken(){return this.serverAppAppCheckToken?Promise.resolve({token:this.serverAppAppCheckToken}):this.appCheck?this.appCheck.getToken():new Promise((e,t)=>{setTimeout(()=>{this.appCheck?this.getToken().then(e,t):e(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */const logger=new logger$1.Logger("@firebase/data-connect");function setLogLevel(e){logger.setLogLevel(e)}function logDebug(e){logger.debug(`DataConnect (${SDK_VERSION}): ${e}`)}function logError(e){logger.error(`DataConnect (${SDK_VERSION}): ${e}`)}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */class FirebaseAuthProvider{constructor(e,t,r){this._appName=e,this._options=t,this._authProvider=r,this._auth=r.getImmediate({optional:!0}),this._auth||r.onInit(e=>this._auth=e)}getAuth(){return this._auth}getToken(e){return this._auth?this._auth.getToken(e).catch(e=>e&&"auth/token-not-initialized"===e.code?(logDebug("Got auth/token-not-initialized error.  Treating as null token."),null):(logError("Error received when attempting to retrieve token: "+JSON.stringify(e)),Promise.reject(e))):new Promise((t,r)=>{setTimeout(()=>{this._auth?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this._auth?.addAuthTokenListener(e)}removeTokenChangeListener(e){this._authProvider.get().then(t=>t.removeAuthTokenListener(e)).catch(e=>logError(e))}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */const QUERY_STR="query",MUTATION_STR="mutation",SOURCE_SERVER="SERVER",SOURCE_CACHE="CACHE";
/**
 * @license
 * Copyright 2026 Google LLC
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
function parseEntityIds(e){const t=e.extensions?.dataConnect,r=Object.assign(e);if(!t)return r;const s={};for(const e of t){const{path:t}=e;populatePath(t,s,e)}return s}function populatePath(e,t,r){let s=t;for(const t of e)"object"!=typeof s[t]&&(s[t]={}),s=s[t];if("entityId"in r&&r.entityId)s._id=r.entityId;else if("entityIds"in r){const e=r.entityIds;for(let t=0;t<e.length;t++){const r=e[t];void 0===s[t]&&(s[t]={}),s[t]._id=r}}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */let encoderImpl,decoderImpl;function setEncoder(e){encoderImpl=e}function setDecoder(e){decoderImpl=e}function sortKeysForObj(e){return Object.keys(e).sort().reduce((t,r)=>(t[r]=e[r],t),{})}
/**
 * @license
 * Copyright 2024 Google LLC
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
function getRefSerializer(e,t,r,s){return function(){return{data:t,refInfo:{name:e.name,variables:e.variables,connectorConfig:{projectId:e.dataConnect.app.options.projectId,...e.dataConnect.getSettings()}},fetchTime:s,source:r}}}setEncoder(e=>JSON.stringify(sortKeysForObj(e))),setDecoder(e=>sortKeysForObj(JSON.parse(e)));class QueryManager{async preferCacheResults(e,t=!1){let r;try{r=await this.fetchCacheResults(e,t)}catch(e){}return r||this.fetchServerResults(e)}constructor(e,t,r){this.transport=e,this.dc=t,this.cache=r,this.callbacks=new Map,this.subscriptionCache=new Map,this.queue=[]}async waitForQueuedWrites(){for(const e of this.queue)await e;this.queue=[]}updateSSR(e){this.queue.push(this.updateCache(e).then(async t=>this.publishCacheResultsToSubscribers(t,e.fetchTime)))}async updateCache(e,t){if(await this.waitForQueuedWrites(),this.cache){const r=parseEntityIds(e),s=getMaxAgeFromExtensions(t);return void 0!==s&&(this.cache.cacheSettings.maxAgeSeconds=s),this.cache.update(encoderImpl({name:e.ref.name,variables:e.ref.variables,refType:"query"}),e.data,r)}{const t=encoderImpl({name:e.ref.name,variables:e.ref.variables,refType:"query"});return this.subscriptionCache.set(t,e),[t]}}addSubscription(e,t,r,s,i){const n=encoderImpl({name:e.name,variables:e.variables,refType:"query"}),a=()=>{if(this.callbacks.has(n)){const e=this.callbacks.get(n);this.callbacks.set(n,e.filter(e=>e!==o)),r?.()}},o={userCallback:t,errCallback:s,unsubscribe:a};i&&this.updateSSR(i);return this.preferCacheResults(e,!0).then(void 0,e=>{}),this.callbacks.has(n)||this.callbacks.set(n,[]),this.callbacks.get(n).push(o),a}async fetchServerResults(e){await this.waitForQueuedWrites();const t=encoderImpl({name:e.name,variables:e.variables,refType:"query"});try{const r=await this.transport.invokeQuery(e.name,e.variables),s=Date.now().toString(),i=r.extensions,n={...r,ref:e,source:"SERVER",fetchTime:s,data:r.data,extensions:getDataConnectExtensionsWithoutMaxAge(i),toJSON:getRefSerializer(e,r.data,"SERVER",s)};let a=[];return a=await this.updateCache(n,i?.dataConnect),this.publishDataToSubscribers(t,n),this.cache?await this.publishCacheResultsToSubscribers(a,s):this.subscriptionCache.set(t,n),n}catch(e){throw this.publishErrorToSubscribers(t,e),e}}async fetchCacheResults(e,t=!1){let r;if(await this.waitForQueuedWrites(),r=this.cache?await this.getFromResultTreeCache(e,t):await this.getFromSubscriberCache(e),!r)throw new DataConnectError(Code.OTHER,"No cache entry found for query: "+e.name);const s=Date.now().toString(),i={...r,ref:e,source:"CACHE",fetchTime:s,data:r.data,extensions:r.extensions,toJSON:getRefSerializer(e,r.data,"CACHE",s)};if(this.cache){const t=encoderImpl({name:e.name,variables:e.variables,refType:"query"});await this.publishCacheResultsToSubscribers([t],s)}else{const t=encoderImpl({name:e.name,variables:e.variables,refType:"query"});this.subscriptionCache.set(t,i),this.publishDataToSubscribers(t,i)}return i}publishErrorToSubscribers(e,t){this.callbacks.get(e)?.forEach(e=>{e.errCallback&&e.errCallback(t)})}async getFromResultTreeCache(e,t=!1){const r=encoderImpl({name:e.name,variables:e.variables,refType:"query"});if(!this.cache||!await this.cache.containsResultTree(r))return null;const s=await this.cache.getResultJSON(r),i=await this.cache.getResultTree(r);if(!t&&i.isStale())return null;const n={source:"CACHE",ref:e,data:s,toJSON:getRefSerializer(e,s,"CACHE",i.cachedAt.toString()),fetchTime:i.cachedAt.toString()};return(await this.cache.getResultTree(r)).updateAccessed(),n}async getFromSubscriberCache(e){const t=encoderImpl({name:e.name,variables:e.variables,refType:"query"});if(!this.subscriptionCache.has(t))return;const r=this.subscriptionCache.get(t);return r.source="CACHE",r.toJSON=getRefSerializer(r.ref,r.data,"CACHE",r.fetchTime),r}publishDataToSubscribers(e,t){if(!this.callbacks.has(e))return;this.callbacks.get(e).forEach(e=>{e.userCallback(t)})}async publishCacheResultsToSubscribers(e,t){if(this.cache)for(const r of e){if(!this.callbacks.get(r))continue;const e=(await this.cache.getResultTree(r)).getRootStub().toJSON(EncodingMode.hydrated),{name:s,variables:i}=decoderImpl(r),n={dataConnect:this.dc,refType:"query",name:s,variables:i};this.publishDataToSubscribers(r,{data:e,fetchTime:t,ref:n,source:"CACHE",toJSON:getRefSerializer(n,e,"CACHE",t)})}}enableEmulator(e,t){this.transport.useEmulator(e,t)}}function getMaxAgeFromExtensions(e){if(e)for(const t of e)if("maxAge"in t&&void 0!==t.maxAge&&null!==t.maxAge&&t.maxAge.endsWith("s"))return Number(t.maxAge.substring(0,t.maxAge.length-1))}function getDataConnectExtensionsWithoutMaxAge(e){return{dataConnect:e.dataConnect?.filter(e=>"entityId"in e||"entityIds"in e)}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */const CallerSdkTypeEnum={Base:"Base",Generated:"Generated",TanstackReactCore:"TanstackReactCore",GeneratedReact:"GeneratedReact",TanstackAngularCore:"TanstackAngularCore",GeneratedAngular:"GeneratedAngular"},PROD_HOST="firebasedataconnect.googleapis.com";
/**
 * @license
 * Copyright 2024 Google LLC
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
 */function urlBuilder(e,t){const{connector:r,location:s,projectId:i,service:n}=e,{host:a,sslEnabled:o,port:c}=t;let h=`${o?"https":"http"}://${a||PROD_HOST}`;if("number"==typeof c)h+=`:${c}`;else if(void 0!==c)throw logError("Port type is of an invalid type"),new DataConnectError(Code.INVALID_ARGUMENT,"Incorrect type for port passed in!");return`${h}/v1/projects/${i}/locations/${s}/services/${n}/connectors/${r}`}function addToken(e,t){if(!t)return e;const r=new URL(e);return r.searchParams.append("key",t),r.toString()}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */let connectFetch=globalThis.fetch;function getGoogApiClientValue(e,t){let r="gl-js/ fire/"+SDK_VERSION;return t!==CallerSdkTypeEnum.Base&&t!==CallerSdkTypeEnum.Generated?r+=" js/"+t.toLowerCase():(e||t===CallerSdkTypeEnum.Generated)&&(r+=" js/gen"),r}async function dcFetch(e,t,{signal:r},s,i,n,a,o,c){if(!connectFetch)throw new DataConnectError(Code.OTHER,"No Fetch Implementation detected!");const h={"Content-Type":"application/json","X-Goog-Api-Client":getGoogApiClientValue(a,o)};i&&(h["X-Firebase-Auth-Token"]=i),s&&(h["x-firebase-gmpid"]=s),n&&(h["X-Firebase-AppCheck"]=n);const l={body:JSON.stringify(t),method:"POST",headers:h,signal:r};let u,d;util.isCloudWorkstation(e)&&c&&(l.credentials="include");try{u=await connectFetch(e,l)}catch(e){throw new DataConnectError(Code.OTHER,"Failed to fetch: "+JSON.stringify(e))}try{d=await u.json()}catch(e){throw new DataConnectError(Code.OTHER,JSON.stringify(e))}const p=getErrorMessage(d);if(u.status>=400){if(logError("Error while performing request: "+JSON.stringify(d)),401===u.status)throw new DataConnectError(Code.UNAUTHORIZED,p);throw new DataConnectError(Code.OTHER,p)}if(d.errors&&d.errors.length){const e=JSON.stringify(d.errors),t={errors:d.errors,data:d.data};throw new DataConnectOperationError("DataConnect error while performing request: "+e,t)}return d.extensions||(d.extensions={dataConnect:[]}),d}function getErrorMessage(e){return"message"in e&&e.message?e.message:JSON.stringify(e)}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */class RESTTransport{constructor(e,t,r,s,i,n,a=!1,o=CallerSdkTypeEnum.Base){this.apiKey=t,this.appId=r,this.authProvider=s,this.appCheckProvider=i,this._isUsingGen=a,this._callerSdkType=o,this._host="",this._location="l",this._connectorName="",this._secure=!0,this._project="p",this._accessToken=null,this._appCheckToken=null,this._lastToken=null,this._isUsingEmulator=!1,this.invokeQuery=(e,t)=>{const r=new AbortController;return this.withRetry(()=>dcFetch(addToken(`${this.endpointUrl}:executeQuery`,this.apiKey),{name:`projects/${this._project}/locations/${this._location}/services/${this._serviceName}/connectors/${this._connectorName}`,operationName:e,variables:t},r,this.appId,this._accessToken,this._appCheckToken,this._isUsingGen,this._callerSdkType,this._isUsingEmulator))},this.invokeMutation=(e,t)=>{const r=new AbortController;return this.withRetry(()=>dcFetch(addToken(`${this.endpointUrl}:executeMutation`,this.apiKey),{name:`projects/${this._project}/locations/${this._location}/services/${this._serviceName}/connectors/${this._connectorName}`,operationName:e,variables:t},r,this.appId,this._accessToken,this._appCheckToken,this._isUsingGen,this._callerSdkType,this._isUsingEmulator))},n&&("number"==typeof n.port&&(this._port=n.port),void 0!==n.sslEnabled&&(this._secure=n.sslEnabled),this._host=n.host);const{location:c,projectId:h,connector:l,service:u}=e;if(c&&(this._location=c),h&&(this._project=h),this._serviceName=u,!l)throw new DataConnectError(Code.INVALID_ARGUMENT,"Connector Name required!");this._connectorName=l,this.authProvider?.addTokenChangeListener(e=>{logDebug(`New Token Available: ${e}`),this._accessToken=e}),this.appCheckProvider?.addTokenChangeListener(e=>{const{token:t}=e;logDebug(`New App Check Token Available: ${t}`),this._appCheckToken=t})}get endpointUrl(){return urlBuilder({connector:this._connectorName,location:this._location,projectId:this._project,service:this._serviceName},{host:this._host,sslEnabled:this._secure,port:this._port})}useEmulator(e,t,r){this._host=e,this._isUsingEmulator=!0,"number"==typeof t&&(this._port=t),void 0!==r&&(this._secure=r)}onTokenChanged(e){this._accessToken=e}async getWithAuth(e=!1){let t=new Promise(e=>e(this._accessToken));if(this.appCheckProvider){const e=await this.appCheckProvider.getToken();e&&(this._appCheckToken=e.token)}return t=this.authProvider?this.authProvider.getToken(e).then(e=>e?(this._accessToken=e.accessToken,this._accessToken):null):new Promise(e=>e("")),t}_setLastToken(e){this._lastToken=e}withRetry(e,t=!1){let r=!1;return this.getWithAuth(t).then(e=>(r=this._lastToken!==e,this._lastToken=e,e)).then(e).catch(s=>{if("code"in s&&s.code===Code.UNAUTHORIZED&&!t&&r)return logDebug("Retrying due to unauthorized"),this.withRetry(e,!0);throw s})}_setCallerSdkType(e){this._callerSdkType=e}}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */function mutationRef(e,t,r){e.setInitialized();return{dataConnect:e,name:t,refType:"mutation",variables:r}}class MutationManager{constructor(e){this._transport=e,this._inflight=[]}executeMutation(e){const t=this._transport.invokeMutation(e.name,e.variables),r=t.then(t=>({...t,source:"SERVER",ref:e,fetchTime:Date.now().toLocaleString()}));this._inflight.push(t);const s=()=>this._inflight=this._inflight.filter(e=>e!==t);return t.then(s,s),r}}function executeMutation(e){return e.dataConnect._mutationManager.executeMutation(e)}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */const FIREBASE_DATA_CONNECT_EMULATOR_HOST_VAR="FIREBASE_DATA_CONNECT_EMULATOR_HOST";function parseOptions(e){const[t,r]=e.split("://"),s="https"===t,[i,n]=r.split(":");return{host:i,port:Number(n),sslEnabled:s}}class DataConnect{constructor(e,t,r,s){if(this.app=e,this.dataConnectOptions=t,this._authProvider=r,this._appCheckProvider=s,this.isEmulator=!1,this._initialized=!1,this._isUsingGeneratedSdk=!1,this._callerSdkType=CallerSdkTypeEnum.Base,"undefined"!=typeof process&&process.env){const e=process.env.FIREBASE_DATA_CONNECT_EMULATOR_HOST;e&&(logDebug("Found custom host. Using emulator"),this.isEmulator=!0,this._transportOptions=parseOptions(e))}}getCache(){return this.cache}_useGeneratedSdk(){this._isUsingGeneratedSdk||(this._isUsingGeneratedSdk=!0)}_setCallerSdkType(e){this._callerSdkType=e,this._initialized&&this._transport._setCallerSdkType(e)}_delete(){return app._removeServiceInstance(this.app,"data-connect",JSON.stringify(this.getSettings())),Promise.resolve()}getSettings(){const e=JSON.parse(JSON.stringify(this.dataConnectOptions));return delete e.projectId,e}setCacheSettings(e){this._cacheSettings=e}setInitialized(){if(this._initialized)return;void 0===this._transportClass&&(logDebug("transportClass not provided. Defaulting to RESTTransport."),this._transportClass=RESTTransport),this._authTokenProvider=new FirebaseAuthProvider(this.app.name,this.app.options,this._authProvider);const e={connector:this.dataConnectOptions.connector,service:this.dataConnectOptions.service,location:this.dataConnectOptions.location};this._cacheSettings&&(this.cache=new DataConnectCache(this._authTokenProvider,this.app.options.projectId,e,this._transportOptions?.host||PROD_HOST,this._cacheSettings)),this._appCheckProvider&&(this._appCheckTokenProvider=new AppCheckTokenProvider(this.app,this._appCheckProvider)),this._transport=new this._transportClass(this.dataConnectOptions,this.app.options.apiKey,this.app.options.appId,this._authTokenProvider,this._appCheckTokenProvider,void 0,this._isUsingGeneratedSdk,this._callerSdkType),this._transportOptions&&this._transport.useEmulator(this._transportOptions.host,this._transportOptions.port,this._transportOptions.sslEnabled),this._queryManager=new QueryManager(this._transport,this,this.cache),this._mutationManager=new MutationManager(this._transport),this._initialized=!0}enableEmulator(e){if(this._transportOptions&&this._initialized&&!areTransportOptionsEqual(this._transportOptions,e))throw logError("enableEmulator called after initialization"),new DataConnectError(Code.ALREADY_INITIALIZED,"DataConnect instance already initialized!");this._transportOptions=e,this.isEmulator=!0}}function areTransportOptionsEqual(e,t){return e.host===t.host&&e.port===t.port&&e.sslEnabled===t.sslEnabled}function connectDataConnectEmulator(e,t,r,s=!1){util.isCloudWorkstation(t)&&util.pingServer(`https://${t}${r?`:${r}`:""}`),e.enableEmulator({host:t,port:r,sslEnabled:s})}function getDataConnect(e,t,r){let s,i,n;"location"in e?(i=e,s=app.getApp(),n=t):(s=e,i=t,n=r),s&&0!==Object.keys(s).length||(s=app.getApp());const a={...i,projectId:s.options.projectId},o=Object.fromEntries(Object.entries(a).sort()),c=app._getProvider(s,"data-connect"),h=JSON.stringify(o);if(c.isInitialized(h)){const e=c.getImmediate({identifier:h}),t=c.getOptions(h);if(Object.keys(t).length>0)return logDebug("Re-using cached instance"),e}validateDCOptions(i),logDebug("Creating new DataConnect instance");const l=c.initialize({instanceIdentifier:h,options:Object.fromEntries(Object.entries({...o}).sort())});return n?.cacheSettings&&l.setCacheSettings(n.cacheSettings),l}function validateDCOptions(e){if(!e)throw new DataConnectError(Code.INVALID_ARGUMENT,"DC Option Required");return["connector","location","service"].forEach(t=>{if(null===e[t]||void 0===e[t])throw new DataConnectError(Code.INVALID_ARGUMENT,`${t} Required`)}),!0}function terminate(e){return e._delete()}const StorageType={MEMORY:"MEMORY"};function makeMemoryCacheProvider(){return new MemoryStub}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */function registerDataConnect(e){setSDKVersion(app.SDK_VERSION),app._registerComponent(new component.Component("data-connect",(e,{instanceIdentifier:t,options:r})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),n=e.getProvider("app-check-internal");let a=r;if(t&&(a={...JSON.parse(t),...a}),!s.options.projectId)throw new DataConnectError(Code.INVALID_ARGUMENT,"Project ID must be provided. Did you pass in a proper projectId to initializeApp?");return new DataConnect(s,{...a,projectId:s.options.projectId},i,n)},"PUBLIC").setMultipleInstances(!0)),app.registerVersion(name,"0.5.0",e),app.registerVersion(name,"0.5.0","cjs2020")}
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
 */const QueryFetchPolicy={PREFER_CACHE:"PREFER_CACHE",CACHE_ONLY:"CACHE_ONLY",SERVER_ONLY:"SERVER_ONLY"};
/**
 * @license
 * Copyright 2024 Google LLC
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
 */function executeQuery(e,t){if("query"!==e.refType)return Promise.reject(new DataConnectError(Code.INVALID_ARGUMENT,"ExecuteQuery can only execute query operations"));const r=e.dataConnect._queryManager,s=t?.fetchPolicy??QueryFetchPolicy.PREFER_CACHE;switch(s){case QueryFetchPolicy.SERVER_ONLY:return r.fetchServerResults(e);case QueryFetchPolicy.CACHE_ONLY:return r.fetchCacheResults(e,!0);case QueryFetchPolicy.PREFER_CACHE:return r.preferCacheResults(e,!1);default:throw new DataConnectError(Code.INVALID_ARGUMENT,`Invalid fetch policy: ${s}`)}}function queryRef(e,t,r,s){return e.setInitialized(),void 0!==s&&e._queryManager.updateSSR(s),{dataConnect:e,refType:"query",name:t,variables:r}}function toQueryRef(e){const{refInfo:{name:t,variables:r,connectorConfig:s}}=e;return queryRef(getDataConnect(s),t,r)}
/**
 * @license
 * Copyright 2024 Google LLC
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
 */function validateArgs(e,t,r,s){let i,n;if(t&&"enableEmulator"in t?(i=t,n=r):(i=getDataConnect(e),n=t),!i||!n&&s)throw new DataConnectError(Code.INVALID_ARGUMENT,"Variables required.");return{dc:i,vars:n}}function validateArgsWithOptions(e,t,r,s,i,n){let a,o,c;if(t&&"enableEmulator"in t?(a=t,i?(o=r,c=s):(o=void 0,c=r)):(a=getDataConnect(e),i?(o=t,c=r):(o=void 0,c=t)),!a||!o&&n)throw new DataConnectError(Code.INVALID_ARGUMENT,"Variables required.");return{dc:a,vars:o,options:c}}
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
 */function subscribe(e,t,r,s){let i,n,a;if("refInfo"in e){const t=e,{data:r,source:s,fetchTime:a}=t;i=toQueryRef(t),n={data:r,source:s,fetchTime:a,ref:i,toJSON:getRefSerializer(i,r,s,a)}}else i=e;if("function"==typeof t?a=t:(a=t.onNext,r=t.onErr,s=t.onComplete),!a)throw new DataConnectError(Code.INVALID_ARGUMENT,"Must provide onNext");return i.dataConnect._queryManager.addSubscription(i,a,s,r,n)}registerDataConnect(),exports.CallerSdkTypeEnum=CallerSdkTypeEnum,exports.Code=Code,exports.DataConnect=DataConnect,exports.DataConnectError=DataConnectError,exports.DataConnectOperationError=DataConnectOperationError,exports.MUTATION_STR="mutation",exports.MutationManager=MutationManager,exports.QUERY_STR="query",exports.QueryFetchPolicy=QueryFetchPolicy,exports.SOURCE_CACHE="CACHE",exports.SOURCE_SERVER="SERVER",exports.StorageType=StorageType,exports.areTransportOptionsEqual=areTransportOptionsEqual,exports.connectDataConnectEmulator=connectDataConnectEmulator,exports.executeMutation=executeMutation,exports.executeQuery=executeQuery,exports.getDataConnect=getDataConnect,exports.makeMemoryCacheProvider=makeMemoryCacheProvider,exports.mutationRef=mutationRef,exports.parseOptions=parseOptions,exports.queryRef=queryRef,exports.setLogLevel=setLogLevel,exports.subscribe=subscribe,exports.terminate=terminate,exports.toQueryRef=toQueryRef,exports.validateArgs=validateArgs,exports.validateArgsWithOptions=validateArgsWithOptions,exports.validateDCOptions=validateDCOptions;