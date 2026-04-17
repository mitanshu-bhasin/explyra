"use strict";var util=require("@firebase/util"),crypto=require("crypto"),logger=require("@firebase/logger"),util$1=require("util"),bloomBlob=require("@firebase/webchannel-wrapper/bloom-blob"),app=require("@firebase/app");
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
 */class User{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}User.UNAUTHENTICATED=new User(null),User.GOOGLE_CREDENTIALS=new User("google-credentials-uid"),User.FIRST_PARTY=new User("first-party-uid"),User.MOCK_USER=new User("mock-user");const version="12.10.0";
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
 */let SDK_VERSION=version;function setSDKVersion(e){SDK_VERSION=e}
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
 */function formatJSON(e){return util$1.inspect(e,{depth:100})}
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
 */const logClient=new logger.Logger("@firebase/firestore");function setLogLevel(e){logClient.setLogLevel(e)}function logDebug(e,...t){if(logClient.logLevel<=logger.LogLevel.DEBUG){const r=t.map(argToString);logClient.debug(`Firestore (${SDK_VERSION}): ${e}`,...r)}}function logError(e,...t){if(logClient.logLevel<=logger.LogLevel.ERROR){const r=t.map(argToString);logClient.error(`Firestore (${SDK_VERSION}): ${e}`,...r)}}function logWarn(e,...t){if(logClient.logLevel<=logger.LogLevel.WARN){const r=t.map(argToString);logClient.warn(`Firestore (${SDK_VERSION}): ${e}`,...r)}}function argToString(e){if("string"==typeof e)return e;try{return formatJSON(e)}catch(t){return e}}
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
 */function fail(e,t,r){let n="Unexpected state";"string"==typeof t?n=t:r=t,_fail(e,n,r)}function _fail(e,t,r){let n=`FIRESTORE (${SDK_VERSION}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==r)try{n+=" CONTEXT: "+JSON.stringify(r)}catch(e){n+=" CONTEXT: "+r}throw logError(n),new Error(n)}function hardAssert(e,t,r,n){let i="Unexpected state";"string"==typeof r?i=r:n=r,e||_fail(t,i,n)}function debugCast(e,t){return e}
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
 */const Code={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class FirestoreError extends util.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`
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
 */}}class OAuthToken{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class EmptyAuthCredentialsProvider{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(User.UNAUTHENTICATED))}shutdown(){}}class EmulatorAuthCredentialsProvider{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class LiteAuthCredentialsProvider{constructor(e){this.auth=null,e.onInit(e=>{this.auth=e})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(hardAssert("string"==typeof e.accessToken,42297,{tokenData:e}),new OAuthToken(e.accessToken,new User(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}class FirstPartyToken{constructor(e,t,r){this.sessionIndex=e,this.iamToken=t,this.authTokenFactory=r,this.type="FirstParty",this.user=User.FIRST_PARTY,this._headers=new Map}getAuthToken(){return this.authTokenFactory?this.authTokenFactory():null}get headers(){this._headers.set("X-Goog-AuthUser",this.sessionIndex);const e=this.getAuthToken();return e&&this._headers.set("Authorization",e),this.iamToken&&this._headers.set("X-Goog-Iam-Authorization-Token",this.iamToken),this._headers}}class FirstPartyAuthCredentialsProvider{constructor(e,t,r){this.sessionIndex=e,this.iamToken=t,this.authTokenFactory=r}getToken(){return Promise.resolve(new FirstPartyToken(this.sessionIndex,this.iamToken,this.authTokenFactory))}start(e,t){e.enqueueRetryable(()=>t(User.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class AppCheckToken{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class LiteAppCheckTokenProvider{constructor(e,t){this.appCheckProvider=t,this.appCheck=null,this.serverAppAppCheckToken=null,app._isFirebaseServerApp(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),t.onInit(e=>{this.appCheck=e})}getToken(){return this.serverAppAppCheckToken?Promise.resolve(new AppCheckToken(this.serverAppAppCheckToken)):this.appCheck?this.appCheck.getToken().then(e=>e?(hardAssert("string"==typeof e.token,3470,{tokenResult:e}),new AppCheckToken(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}function makeAuthCredentialsProvider(e){if(!e)return new EmptyAuthCredentialsProvider;switch(e.type){case"firstParty":return new FirstPartyAuthCredentialsProvider(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new FirestoreError(Code.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}
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
 */class DatabaseInfo{constructor(e,t,r,n,i,o,s,a,u,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=s,this.longPollingOptions=a,this.useFetchStreams=u,this.isUsingEmulator=l,this.apiKey=c}}const DEFAULT_DATABASE_NAME="(default)";class DatabaseId{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new DatabaseId("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof DatabaseId&&e.projectId===this.projectId&&e.database===this.database}}function databaseIdFromApp(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new FirestoreError(Code.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new DatabaseId(e.options.projectId,t)}
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
 */function randomBytes(e){return crypto.randomBytes(e)}
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
 */class AutoId{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const r=randomBytes(40);for(let n=0;n<r.length;++n)t.length<20&&r[n]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(r[n]%62))}return t}}function primitiveComparator(e,t){return e<t?-1:e>t?1:0}function compareUtf8Strings(e,t){const r=Math.min(e.length,t.length);for(let n=0;n<r;n++){const r=e.charAt(n),i=t.charAt(n);if(r!==i)return isSurrogate(r)===isSurrogate(i)?primitiveComparator(r,i):isSurrogate(r)?1:-1}return primitiveComparator(e.length,t.length)}const MIN_SURROGATE=55296,MAX_SURROGATE=57343;function isSurrogate(e){const t=e.charCodeAt(0);return t>=MIN_SURROGATE&&t<=MAX_SURROGATE}function arrayEquals(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}
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
 */const DOCUMENT_KEY_NAME="__name__";class BasePath{constructor(e,t,r){void 0===t?t=0:t>e.length&&fail(637,{offset:t,range:e.length}),void 0===r?r=e.length-t:r>e.length-t&&fail(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===BasePath.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof BasePath?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let n=0;n<r;n++){const r=BasePath.compareSegments(e.get(n),t.get(n));if(0!==r)return r}return primitiveComparator(e.length,t.length)}static compareSegments(e,t){const r=BasePath.isNumericId(e),n=BasePath.isNumericId(t);return r&&!n?-1:!r&&n?1:r&&n?BasePath.extractNumericId(e).compare(BasePath.extractNumericId(t)):compareUtf8Strings(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return bloomBlob.Integer.fromString(e.substring(4,e.length-2))}}class ResourcePath extends BasePath{construct(e,t,r){return new ResourcePath(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new ResourcePath(t)}static emptyPath(){return new ResourcePath([])}}const identifierRegExp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class FieldPath$1 extends BasePath{construct(e,t,r){return new FieldPath$1(e,t,r)}static isValidIdentifier(e){return identifierRegExp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),FieldPath$1.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new FieldPath$1(["__name__"])}static fromServerFormat(e){const t=[];let r="",n=0;const i=()=>{if(0===r.length)throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;n<e.length;){const t=e[n];if("\\"===t){if(n+1===e.length)throw new FirestoreError(Code.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new FirestoreError(Code.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?(o=!o,n++):"."!==t||o?(r+=t,n++):(i(),n++)}if(i(),o)throw new FirestoreError(Code.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new FieldPath$1(t)}static emptyPath(){return new FieldPath$1([])}}
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
 */class DocumentKey{constructor(e){this.path=e}static fromPath(e){return new DocumentKey(ResourcePath.fromString(e))}static fromName(e){return new DocumentKey(ResourcePath.fromString(e).popFirst(5))}static empty(){return new DocumentKey(ResourcePath.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ResourcePath.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ResourcePath.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new DocumentKey(new ResourcePath(e.slice()))}}
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
 */function validateNonEmptyArgument(e,t,r){if(!r)throw new FirestoreError(Code.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function validateIsNotUsedTogether(e,t,r,n){if(!0===t&&!0===n)throw new FirestoreError(Code.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)}function validateDocumentPath(e){if(!DocumentKey.isDocumentKey(e))throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function validateCollectionPath(e){if(DocumentKey.isDocumentKey(e))throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function isPlainObject(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function valueDescription(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=tryGetCustomObjectType(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":fail(12329,{type:typeof e})}function tryGetCustomObjectType(e){return e.constructor?e.constructor.name:null}function cast(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new FirestoreError(Code.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const r=valueDescription(e);throw new FirestoreError(Code.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}function validatePositiveNumber(e,t){if(t<=0)throw new FirestoreError(Code.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
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
 */function longPollingOptionsEqual(e,t){return e.timeoutSeconds===t.timeoutSeconds}function cloneLongPollingOptions(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}
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
 */let lastUniqueDebugId=null;function generateInitialUniqueDebugId(){return 268435456+Math.round(2147483648*Math.random())}function generateUniqueDebugId(){return null===lastUniqueDebugId?lastUniqueDebugId=generateInitialUniqueDebugId():lastUniqueDebugId++,"0x"+lastUniqueDebugId.toString(16)}
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
 */const LOG_TAG$1="RestConnection",RPC_NAME_URL_MAPPING={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},RPC_URL_VERSION="v1";function getGoogApiClientValue(){return"gl-js/ fire/"+SDK_VERSION}class RestConnection{get shouldResourcePathBeIncludedInRequest(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.baseUrl=t+"://"+e.host,this.databasePath=`projects/${r}/databases/${n}`,this.requestParams="(default)"===this.databaseId.database?`project_id=${r}`:`project_id=${r}&database_id=${n}`}invokeRPC(e,t,r,n,i){const o=generateUniqueDebugId(),s=this.makeUrl(e,t.toUriEncodedString());logDebug(LOG_TAG$1,`Sending RPC '${e}' ${o}:`,s,r);const a={"google-cloud-resource-prefix":this.databasePath,"x-goog-request-params":this.requestParams};this.modifyHeadersForRequest(a,n,i);const{host:u}=new URL(s),l=util.isCloudWorkstation(u);return this.performRPCRequest(e,s,a,r,l).then(t=>(logDebug(LOG_TAG$1,`Received RPC '${e}' ${o}: `,t),t),t=>{throw logWarn(LOG_TAG$1,`RPC '${e}' ${o} failed with error: `,t,"url: ",s,"request:",r),t})}invokeStreamingRPC(e,t,r,n,i,o){return this.invokeRPC(e,t,r,n,i)}modifyHeadersForRequest(e,t,r){e["X-Goog-Api-Client"]=getGoogApiClientValue(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}makeUrl(e,t){const r=RPC_NAME_URL_MAPPING[e];let n=`${this.baseUrl}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(n=`${n}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),n}terminate(){}}
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
 */var RpcCode;function isPermanentError(e){switch(e){case Code.OK:return fail(64938);case Code.CANCELLED:case Code.UNKNOWN:case Code.DEADLINE_EXCEEDED:case Code.RESOURCE_EXHAUSTED:case Code.INTERNAL:case Code.UNAVAILABLE:case Code.UNAUTHENTICATED:return!1;case Code.INVALID_ARGUMENT:case Code.NOT_FOUND:case Code.ALREADY_EXISTS:case Code.PERMISSION_DENIED:case Code.FAILED_PRECONDITION:case Code.ABORTED:case Code.OUT_OF_RANGE:case Code.UNIMPLEMENTED:case Code.DATA_LOSS:return!0;default:return fail(15467,{code:e})}}function mapCodeFromHttpStatus(e){if(void 0===e)return logError("RPC_ERROR","HTTP error has no status"),Code.UNKNOWN;switch(e){case 200:return Code.OK;case 400:return Code.FAILED_PRECONDITION;case 401:return Code.UNAUTHENTICATED;case 403:return Code.PERMISSION_DENIED;case 404:return Code.NOT_FOUND;case 409:return Code.ABORTED;case 416:return Code.OUT_OF_RANGE;case 429:return Code.RESOURCE_EXHAUSTED;case 499:return Code.CANCELLED;case 500:return Code.UNKNOWN;case 501:return Code.UNIMPLEMENTED;case 503:return Code.UNAVAILABLE;case 504:return Code.DEADLINE_EXCEEDED;default:return e>=200&&e<300?Code.OK:e>=400&&e<500?Code.FAILED_PRECONDITION:e>=500&&e<600?Code.INTERNAL:Code.UNKNOWN}}
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
 */!function(e){e[e.OK=0]="OK",e[e.CANCELLED=1]="CANCELLED",e[e.UNKNOWN=2]="UNKNOWN",e[e.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",e[e.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",e[e.NOT_FOUND=5]="NOT_FOUND",e[e.ALREADY_EXISTS=6]="ALREADY_EXISTS",e[e.PERMISSION_DENIED=7]="PERMISSION_DENIED",e[e.UNAUTHENTICATED=16]="UNAUTHENTICATED",e[e.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",e[e.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",e[e.ABORTED=10]="ABORTED",e[e.OUT_OF_RANGE=11]="OUT_OF_RANGE",e[e.UNIMPLEMENTED=12]="UNIMPLEMENTED",e[e.INTERNAL=13]="INTERNAL",e[e.UNAVAILABLE=14]="UNAVAILABLE",e[e.DATA_LOSS=15]="DATA_LOSS"}(RpcCode||(RpcCode={}));class FetchConnection extends RestConnection{openStream(e,t){throw new Error("Not supported by FetchConnection")}async performRPCRequest(e,t,r,n,i){const o=JSON.stringify(n);let s;try{const e={method:"POST",headers:r,body:o};i&&(e.credentials="include"),s=await fetch(t,e)}catch(e){const t=e;throw new FirestoreError(mapCodeFromHttpStatus(t.status),"Request failed with error: "+t.statusText)}if(!s.ok){let e=await s.json();Array.isArray(e)&&(e=e[0]);const t=e?.error?.message;throw new FirestoreError(mapCodeFromHttpStatus(s.status),`Request failed with error: ${t??s.statusText}`)}return s.json()}}
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
 */function newConnection(e){return new FetchConnection(e)}
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
 */function objectSize(e){let t=0;for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function forEach(e,t){for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function mapToArray(e,t){const r=[];for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.push(t(e[n],n,e));return r}function isEmpty(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
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
 */function isNullOrUndefined(e){return null==e}function isNegativeZero(e){return 0===e&&1/e==-1/0}function isNumber(e){return"number"==typeof e}function isSafeInteger(e){return"number"==typeof e&&Number.isInteger(e)&&!isNegativeZero(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function isString(e){return"string"==typeof e}
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
 */function decodeBase64(e){return Buffer.from(e,"base64").toString("binary")}function encodeBase64(e){return Buffer.from(e,"binary").toString("base64")}
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
 */class ByteString{constructor(e){this.binaryString=e}static fromBase64String(e){const t=decodeBase64(e);return new ByteString(t)}static fromUint8Array(e){const t=binaryStringFromUint8Array(e);return new ByteString(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return encodeBase64(this.binaryString)}toUint8Array(){return uint8ArrayFromBinaryString(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return primitiveComparator(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}function binaryStringFromUint8Array(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}function uint8ArrayFromBinaryString(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}
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
 */ByteString.EMPTY_BYTE_STRING=new ByteString("");const ISO_TIMESTAMP_REG_EXP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function normalizeTimestamp(e){if(hardAssert(!!e,39018),"string"==typeof e){let t=0;const r=ISO_TIMESTAMP_REG_EXP.exec(e);if(hardAssert(!!r,46558,{timestamp:e}),r[1]){let e=r[1];e=(e+"000000000").substr(0,9),t=Number(e)}const n=new Date(e);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:normalizeNumber(e.seconds),nanos:normalizeNumber(e.nanos)}}function normalizeNumber(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function normalizeByteString(e){return"string"==typeof e?ByteString.fromBase64String(e):ByteString.fromUint8Array(e)}
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
 */function property(e,t){const r={typeString:e};return t&&(r.value=t),r}function validateJSON(e,t){if(!isPlainObject(e))throw new FirestoreError(Code.INVALID_ARGUMENT,"JSON must be an object");let r;for(const n in t)if(t[n]){const i=t[n].typeString,o="value"in t[n]?{value:t[n].value}:void 0;if(!(n in e)){r=`JSON missing required field: '${n}'`;break}const s=e[n];if(i&&typeof s!==i){r=`JSON field '${n}' must be a ${i}.`;break}if(void 0!==o&&s!==o.value){r=`Expected '${n}' field to equal '${o.value}'`;break}}if(r)throw new FirestoreError(Code.INVALID_ARGUMENT,r);return!0}
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
 */const MIN_SECONDS=-62135596800,MS_TO_NANOS=1e6;class Timestamp{static now(){return Timestamp.fromMillis(Date.now())}static fromDate(e){return Timestamp.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Timestamp(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new FirestoreError(Code.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new FirestoreError(Code.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<MIN_SECONDS)throw new FirestoreError(Code.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new FirestoreError(Code.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?primitiveComparator(this.nanoseconds,e.nanoseconds):primitiveComparator(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Timestamp._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(validateJSON(e,Timestamp._jsonSchema))return new Timestamp(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-MIN_SECONDS;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Timestamp._jsonSchemaVersion="firestore/timestamp/1.0",Timestamp._jsonSchema={type:property("string",Timestamp._jsonSchemaVersion),seconds:property("number"),nanoseconds:property("number")};
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
const SERVER_TIMESTAMP_SENTINEL="server_timestamp",TYPE_KEY$1="__type__",PREVIOUS_VALUE_KEY="__previous_value__",LOCAL_WRITE_TIME_KEY="__local_write_time__";function isServerTimestamp(e){const t=(e?.mapValue?.fields||{}).__type__?.stringValue;return"server_timestamp"===t}function getPreviousValue(e){const t=e.mapValue.fields[PREVIOUS_VALUE_KEY];return isServerTimestamp(t)?getPreviousValue(t):t}function getLocalWriteTime(e){const t=normalizeTimestamp(e.mapValue.fields[LOCAL_WRITE_TIME_KEY].timestampValue);return new Timestamp(t.seconds,t.nanos)}
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
 */const TYPE_KEY="__type__",MAX_VALUE_TYPE="__max__",MAX_VALUE={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},VECTOR_VALUE_SENTINEL="__vector__",VECTOR_MAP_VECTORS_KEY="value";function typeOrder(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?isServerTimestamp(e)?4:isMaxValue(e)?9007199254740991:isVectorValue(e)?10:11:fail(28295,{value:e})}function valueEquals(e,t){if(e===t)return!0;const r=typeOrder(e);if(r!==typeOrder(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return getLocalWriteTime(e).isEqual(getLocalWriteTime(t));case 3:return timestampEquals(e,t);case 5:return e.stringValue===t.stringValue;case 6:return blobEquals(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return geoPointEquals(e,t);case 2:return numberEquals(e,t);case 9:return arrayEquals(e.arrayValue.values||[],t.arrayValue.values||[],valueEquals);case 10:case 11:return objectEquals(e,t);default:return fail(52216,{left:e})}}function timestampEquals(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const r=normalizeTimestamp(e.timestampValue),n=normalizeTimestamp(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}function geoPointEquals(e,t){return normalizeNumber(e.geoPointValue.latitude)===normalizeNumber(t.geoPointValue.latitude)&&normalizeNumber(e.geoPointValue.longitude)===normalizeNumber(t.geoPointValue.longitude)}function blobEquals(e,t){return normalizeByteString(e.bytesValue).isEqual(normalizeByteString(t.bytesValue))}function numberEquals(e,t){if("integerValue"in e&&"integerValue"in t)return normalizeNumber(e.integerValue)===normalizeNumber(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const r=normalizeNumber(e.doubleValue),n=normalizeNumber(t.doubleValue);return r===n?isNegativeZero(r)===isNegativeZero(n):isNaN(r)&&isNaN(n)}return!1}function objectEquals(e,t){const r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(objectSize(r)!==objectSize(n))return!1;for(const e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!valueEquals(r[e],n[e])))return!1;return!0}function arrayValueContains(e,t){return void 0!==(e.values||[]).find(e=>valueEquals(e,t))}function valueCompare(e,t){if(e===t)return 0;const r=typeOrder(e),n=typeOrder(t);if(r!==n)return primitiveComparator(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return primitiveComparator(e.booleanValue,t.booleanValue);case 2:return compareNumbers(e,t);case 3:return compareTimestamps(e.timestampValue,t.timestampValue);case 4:return compareTimestamps(getLocalWriteTime(e),getLocalWriteTime(t));case 5:return compareUtf8Strings(e.stringValue,t.stringValue);case 6:return compareBlobs(e.bytesValue,t.bytesValue);case 7:return compareReferences(e.referenceValue,t.referenceValue);case 8:return compareGeoPoints(e.geoPointValue,t.geoPointValue);case 9:return compareArrays(e.arrayValue,t.arrayValue);case 10:return compareVectors(e.mapValue,t.mapValue);case 11:return compareMaps(e.mapValue,t.mapValue);default:throw fail(23264,{leftType:r})}}function compareNumbers(e,t){const r=normalizeNumber(e.integerValue||e.doubleValue),n=normalizeNumber(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}function compareTimestamps(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return primitiveComparator(e,t);const r=normalizeTimestamp(e),n=normalizeTimestamp(t),i=primitiveComparator(r.seconds,n.seconds);return 0!==i?i:primitiveComparator(r.nanos,n.nanos)}function compareReferences(e,t){const r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){const t=primitiveComparator(r[e],n[e]);if(0!==t)return t}return primitiveComparator(r.length,n.length)}function compareGeoPoints(e,t){const r=primitiveComparator(normalizeNumber(e.latitude),normalizeNumber(t.latitude));return 0!==r?r:primitiveComparator(normalizeNumber(e.longitude),normalizeNumber(t.longitude))}function compareBlobs(e,t){const r=normalizeByteString(e),n=normalizeByteString(t);return r.compareTo(n)}function compareArrays(e,t){const r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){const t=valueCompare(r[e],n[e]);if(t)return t}return primitiveComparator(r.length,n.length)}function compareVectors(e,t){const r=e.fields||{},n=t.fields||{},i=r.value?.arrayValue,o=n.value?.arrayValue,s=primitiveComparator(i?.values?.length||0,o?.values?.length||0);return 0!==s?s:compareArrays(i,o)}function compareMaps(e,t){if(e===MAX_VALUE.mapValue&&t===MAX_VALUE.mapValue)return 0;if(e===MAX_VALUE.mapValue)return 1;if(t===MAX_VALUE.mapValue)return-1;const r=e.fields||{},n=Object.keys(r),i=t.fields||{},o=Object.keys(i);n.sort(),o.sort();for(let e=0;e<n.length&&e<o.length;++e){const t=compareUtf8Strings(n[e],o[e]);if(0!==t)return t;const s=valueCompare(r[n[e]],i[o[e]]);if(0!==s)return s}return primitiveComparator(n.length,o.length)}function refValue(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function isArray(e){return!!e&&"arrayValue"in e}function isNullValue(e){return!!e&&"nullValue"in e}function isNanValue(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function isMapValue(e){return!!e&&"mapValue"in e}function isVectorValue(e){const t=(e?.mapValue?.fields||{})[TYPE_KEY]?.stringValue;return"__vector__"===t}function deepClone(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return forEach(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=deepClone(r)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=deepClone(e.arrayValue.values[r]);return t}return{...e}}function isMaxValue(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}
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
 */class Bound{constructor(e,t){this.position=e,this.inclusive=t}}function boundEquals(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!valueEquals(e.position[r],t.position[r]))return!1;return!0}
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
 */class Filter{}class FieldFilter extends Filter{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new KeyFieldFilter(e,t,r):"array-contains"===t?new ArrayContainsFilter(e,r):"in"===t?new InFilter(e,r):"not-in"===t?new NotInFilter(e,r):"array-contains-any"===t?new ArrayContainsAnyFilter(e,r):new FieldFilter(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new KeyFieldInFilter(e,r):new KeyFieldNotInFilter(e,r)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(valueCompare(t,this.value)):null!==t&&typeOrder(this.value)===typeOrder(t)&&this.matchesComparison(valueCompare(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return fail(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class CompositeFilter extends Filter{constructor(e,t){super(),this.filters=e,this.op=t,this.memoizedFlattenedFilters=null}static create(e,t){return new CompositeFilter(e,t)}matches(e){return compositeFilterIsConjunction(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.memoizedFlattenedFilters||(this.memoizedFlattenedFilters=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.memoizedFlattenedFilters}getFilters(){return Object.assign([],this.filters)}}function compositeFilterIsConjunction(e){return"and"===e.op}function filterEquals(e,t){return e instanceof FieldFilter?fieldFilterEquals(e,t):e instanceof CompositeFilter?compositeFilterEquals(e,t):void fail(19439)}function fieldFilterEquals(e,t){return t instanceof FieldFilter&&e.op===t.op&&e.field.isEqual(t.field)&&valueEquals(e.value,t.value)}function compositeFilterEquals(e,t){return t instanceof CompositeFilter&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,r,n)=>e&&filterEquals(r,t.filters[n]),!0)}class KeyFieldFilter extends FieldFilter{constructor(e,t,r){super(e,t,r),this.key=DocumentKey.fromName(r.referenceValue)}matches(e){const t=DocumentKey.comparator(e.key,this.key);return this.matchesComparison(t)}}class KeyFieldInFilter extends FieldFilter{constructor(e,t){super(e,"in",t),this.keys=extractDocumentKeysFromArrayValue("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class KeyFieldNotInFilter extends FieldFilter{constructor(e,t){super(e,"not-in",t),this.keys=extractDocumentKeysFromArrayValue("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function extractDocumentKeysFromArrayValue(e,t){return(t.arrayValue?.values||[]).map(e=>DocumentKey.fromName(e.referenceValue))}class ArrayContainsFilter extends FieldFilter{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return isArray(t)&&arrayValueContains(t.arrayValue,this.value)}}class InFilter extends FieldFilter{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&arrayValueContains(this.value.arrayValue,t)}}class NotInFilter extends FieldFilter{constructor(e,t){super(e,"not-in",t)}matches(e){if(arrayValueContains(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!arrayValueContains(this.value.arrayValue,t)}}class ArrayContainsAnyFilter extends FieldFilter{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!isArray(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>arrayValueContains(this.value.arrayValue,e))}}
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
 */class OrderBy{constructor(e,t="asc"){this.field=e,this.dir=t}}function orderByEquals(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
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
 */class SnapshotVersion{static fromTimestamp(e){return new SnapshotVersion(e)}static min(){return new SnapshotVersion(new Timestamp(0,0))}static max(){return new SnapshotVersion(new Timestamp(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */class SortedMap{constructor(e,t){this.comparator=e,this.root=t||LLRBNode.EMPTY}insert(e,t){return new SortedMap(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,LLRBNode.BLACK,null,null))}remove(e){return new SortedMap(this.comparator,this.root.remove(e,this.comparator).copy(null,null,LLRBNode.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new SortedMapIterator(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new SortedMapIterator(this.root,e,this.comparator,!1)}getReverseIterator(){return new SortedMapIterator(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new SortedMapIterator(this.root,e,this.comparator,!0)}}class SortedMapIterator{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class LLRBNode{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:LLRBNode.RED,this.left=null!=n?n:LLRBNode.EMPTY,this.right=null!=i?i:LLRBNode.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new LLRBNode(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this;const i=r(e,n.key);return n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r)),n.fixUp()}removeMin(){if(this.left.isEmpty())return LLRBNode.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,n=this;if(t(e,n.key)<0)n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return LLRBNode.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,LLRBNode.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,LLRBNode.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw fail(43730,{key:this.key,value:this.value});if(this.right.isRed())throw fail(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw fail(27949);return e+(this.isRed()?0:1)}}LLRBNode.EMPTY=null,LLRBNode.RED=!0,LLRBNode.BLACK=!1;class LLRBEmptyNode{constructor(){this.size=0}get key(){throw fail(57766)}get value(){throw fail(16141)}get color(){throw fail(16727)}get left(){throw fail(29726)}get right(){throw fail(36894)}copy(e,t,r,n,i){return this}insert(e,t,r){return new LLRBNode(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}}LLRBNode.EMPTY=new LLRBEmptyNode;
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
class SortedSet{constructor(e){this.comparator=e,this.data=new SortedMap(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new SortedSetIterator(this.data.getIterator())}getIteratorFrom(e){return new SortedSetIterator(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof SortedSet))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new SortedSet(this.comparator);return t.data=e,t}}class SortedSetIterator{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */class FieldMask{constructor(e){this.fields=e,e.sort(FieldPath$1.comparator)}static empty(){return new FieldMask([])}unionWith(e){let t=new SortedSet(FieldPath$1.comparator);for(const e of this.fields)t=t.add(e);for(const r of e)t=t.add(r);return new FieldMask(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return arrayEquals(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
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
 */class ObjectValue{constructor(e){this.value=e}static empty(){return new ObjectValue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!isMapValue(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=deepClone(t)}setAll(e){let t=FieldPath$1.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=deepClone(e):n.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){const t=this.field(e.popLast());isMapValue(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return valueEquals(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];isMapValue(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){forEach(t,(t,r)=>e[t]=r);for(const t of r)delete e[t]}clone(){return new ObjectValue(deepClone(this.value))}}
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
 */class MutableDocument{constructor(e,t,r,n,i,o,s){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=o,this.documentState=s}static newInvalidDocument(e){return new MutableDocument(e,0,SnapshotVersion.min(),SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),0)}static newFoundDocument(e,t,r,n){return new MutableDocument(e,1,t,SnapshotVersion.min(),r,n,0)}static newNoDocument(e,t){return new MutableDocument(e,2,t,SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),0)}static newUnknownDocument(e,t){return new MutableDocument(e,3,t,SnapshotVersion.min(),SnapshotVersion.min(),ObjectValue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(SnapshotVersion.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ObjectValue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ObjectValue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=SnapshotVersion.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof MutableDocument&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new MutableDocument(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class TargetImpl{constructor(e,t=null,r=[],n=[],i=null,o=null,s=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=o,this.endAt=s,this.memoizedCanonicalId=null}}function newTarget(e,t=null,r=[],n=[],i=null,o=null,s=null){return new TargetImpl(e,t,r,n,i,o,s)}function targetEquals(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let r=0;r<e.orderBy.length;r++)if(!orderByEquals(e.orderBy[r],t.orderBy[r]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!filterEquals(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!boundEquals(e.startAt,t.startAt)&&boundEquals(e.endAt,t.endAt)}
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
 */class QueryImpl{constructor(e,t=null,r=[],n=[],i=null,o="F",s=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=o,this.startAt=s,this.endAt=a,this.memoizedNormalizedOrderBy=null,this.memoizedTarget=null,this.memoizedAggregateTarget=null,this.startAt,this.endAt}}function newQueryForPath(e){return new QueryImpl(e)}function getInequalityFilterFields(e){let t=new SortedSet(FieldPath$1.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}function newQueryForCollectionGroup(e){return new QueryImpl(ResourcePath.emptyPath(),e)}function isDocumentQuery(e){return DocumentKey.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function isCollectionGroupQuery(e){return null!==e.collectionGroup}function queryNormalizedOrderBy(e){const t=debugCast(e);if(null===t.memoizedNormalizedOrderBy){t.memoizedNormalizedOrderBy=[];const e=new Set;for(const r of t.explicitOrderBy)t.memoizedNormalizedOrderBy.push(r),e.add(r.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";getInequalityFilterFields(t).forEach(n=>{e.has(n.canonicalString())||n.isKeyField()||t.memoizedNormalizedOrderBy.push(new OrderBy(n,r))}),e.has(FieldPath$1.keyField().canonicalString())||t.memoizedNormalizedOrderBy.push(new OrderBy(FieldPath$1.keyField(),r))}return t.memoizedNormalizedOrderBy}function queryToTarget(e){const t=debugCast(e);return t.memoizedTarget||(t.memoizedTarget=_queryToTarget(t,queryNormalizedOrderBy(e))),t.memoizedTarget}function queryToAggregateTarget(e){const t=debugCast(e);return t.memoizedAggregateTarget||(t.memoizedAggregateTarget=_queryToTarget(t,e.explicitOrderBy)),t.memoizedAggregateTarget}function _queryToTarget(e,t){if("F"===e.limitType)return newTarget(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new OrderBy(e.field,t)});const r=e.endAt?new Bound(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new Bound(e.startAt.position,e.startAt.inclusive):null;return newTarget(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}function queryWithAddedFilter(e,t){const r=e.filters.concat([t]);return new QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function queryWithAddedOrderBy(e,t){const r=e.explicitOrderBy.concat([t]);return new QueryImpl(e.path,e.collectionGroup,r,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function queryWithLimit(e,t,r){return new QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function queryWithStartAt(e,t){return new QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function queryWithEndAt(e,t){return new QueryImpl(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function queryEquals(e,t){return targetEquals(queryToTarget(e),queryToTarget(t))&&e.limitType===t.limitType}
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
 */function toDouble(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:isNegativeZero(t)?"-0":t}}function toInteger(e){return{integerValue:""+e}}function toNumber(e,t){return isSafeInteger(t)?toInteger(t):toDouble(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */class TransformOperation{constructor(){this._=void 0}}class ServerTimestampTransform extends TransformOperation{}class ArrayUnionTransformOperation extends TransformOperation{constructor(e){super(),this.elements=e}}class ArrayRemoveTransformOperation extends TransformOperation{constructor(e){super(),this.elements=e}}class NumericIncrementTransformOperation extends TransformOperation{constructor(e,t){super(),this.serializer=e,this.operand=t
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
 */}}class FieldTransform{constructor(e,t){this.field=e,this.transform=t}}class Precondition{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Precondition}static exists(e){return new Precondition(void 0,e)}static updateTime(e){return new Precondition(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}class Mutation{}class SetMutation extends Mutation{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class PatchMutation extends Mutation{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}class DeleteMutation extends Mutation{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class VerifyMutation extends Mutation{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
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
 */const DIRECTIONS={asc:"ASCENDING",desc:"DESCENDING"},OPERATORS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},COMPOSITE_OPERATORS={and:"AND",or:"OR"};function assertPresent(e,t){}class JsonProtoSerializer{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function toInt32Proto(e,t){return e.useProto3Json||isNullOrUndefined(t)?t:{value:t}}function toTimestamp(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function fromTimestamp(e){const t=normalizeTimestamp(e);return new Timestamp(t.seconds,t.nanos)}function toBytes(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function toVersion(e,t){return toTimestamp(e,t.toTimestamp())}function fromVersion(e){return hardAssert(!!e,49232),SnapshotVersion.fromTimestamp(fromTimestamp(e))}function toResourceName(e,t){return toResourcePath(e,t).canonicalString()}function toResourcePath(e,t){const r=fullyQualifiedPrefixPath(e).child("documents");return void 0===t?r:r.child(t)}function fromResourceName(e){const t=ResourcePath.fromString(e);return hardAssert(isValidResourceName(t),10190,{key:t.toString()}),t}function toName(e,t){return toResourceName(e.databaseId,t.path)}function fromName(e,t){const r=fromResourceName(t);if(r.get(1)!==e.databaseId.projectId)throw new FirestoreError(Code.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new FirestoreError(Code.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new DocumentKey(extractLocalPathFromResourceName(r))}function toQueryPath(e,t){return toResourceName(e.databaseId,t)}function getEncodedDatabaseId(e){return new ResourcePath(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function fullyQualifiedPrefixPath(e){return new ResourcePath(["projects",e.projectId,"databases",e.database])}function extractLocalPathFromResourceName(e){return hardAssert(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function toMutationDocument(e,t,r){return{name:toName(e,t),fields:r.value.mapValue.fields}}function fromPipelineResponse(e,t,r){const n={};t.transaction?.length&&(n.transaction=t.transaction);const i=t.executionTime?fromVersion(t.executionTime):void 0;return n.executionTime=i,r&&(n.key=r.name?fromName(e,r.name):void 0,n.fields=new ObjectValue({mapValue:{fields:r.fields}}),n.createTime=r.createTime?fromVersion(r.createTime):void 0,n.updateTime=r.updateTime?fromVersion(r.updateTime):void 0),n}function fromDocument(e,t,r){const n=fromName(e,t.name),i=fromVersion(t.updateTime),o=t.createTime?fromVersion(t.createTime):SnapshotVersion.min(),s=new ObjectValue({mapValue:{fields:t.fields}}),a=MutableDocument.newFoundDocument(n,i,o,s);return r&&a.setHasCommittedMutations(),r?a.setHasCommittedMutations():a}function fromFound(e,t){hardAssert(!!t.found,43571),assertPresent(t.found.name),assertPresent(t.found.updateTime);const r=fromName(e,t.found.name),n=fromVersion(t.found.updateTime),i=t.found.createTime?fromVersion(t.found.createTime):SnapshotVersion.min(),o=new ObjectValue({mapValue:{fields:t.found.fields}});return MutableDocument.newFoundDocument(r,n,i,o)}function fromMissing(e,t){hardAssert(!!t.missing,3894),hardAssert(!!t.readTime,22933);const r=fromName(e,t.missing),n=fromVersion(t.readTime);return MutableDocument.newNoDocument(r,n)}function fromBatchGetDocumentsResponse(e,t){return"found"in t?fromFound(e,t):"missing"in t?fromMissing(e,t):fail(7234,{result:t})}function toMutation(e,t){let r;if(t instanceof SetMutation)r={update:toMutationDocument(e,t.key,t.value)};else if(t instanceof DeleteMutation)r={delete:toName(e,t.key)};else if(t instanceof PatchMutation)r={update:toMutationDocument(e,t.key,t.data),updateMask:toDocumentMask(t.fieldMask)};else{if(!(t instanceof VerifyMutation))return fail(16599,{mutationType:t.type});r={verify:toName(e,t.key)}}return t.fieldTransforms.length>0&&(r.updateTransforms=t.fieldTransforms.map(t=>toFieldTransform(e,t))),t.precondition.isNone||(r.currentDocument=toPrecondition(e,t.precondition)),r}function toPrecondition(e,t){return void 0!==t.updateTime?{updateTime:toVersion(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:fail(27497)}function toFieldTransform(e,t){const r=t.transform;if(r instanceof ServerTimestampTransform)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof ArrayUnionTransformOperation)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof ArrayRemoveTransformOperation)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof NumericIncrementTransformOperation)return{fieldPath:t.field.canonicalString(),increment:r.operand};throw fail(20930,{transform:t.transform})}function toQueryTarget(e,t){const r={structuredQuery:{}},n=t.path;let i;null!==t.collectionGroup?(i=n,r.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),r.structuredQuery.from=[{collectionId:n.lastSegment()}]),r.parent=toQueryPath(e,i);const o=toFilters(t.filters);o&&(r.structuredQuery.where=o);const s=toOrder(t.orderBy);s&&(r.structuredQuery.orderBy=s);const a=toInt32Proto(e,t.limit);return null!==a&&(r.structuredQuery.limit=a),t.startAt&&(r.structuredQuery.startAt=toStartAtCursor(t.startAt)),t.endAt&&(r.structuredQuery.endAt=toEndAtCursor(t.endAt)),{queryTarget:r,parent:i}}function toRunAggregationQueryRequest(e,t,r,n){const{queryTarget:i,parent:o}=toQueryTarget(e,t),s={},a=[];let u=0;return r.forEach(e=>{const t=n?e.alias:"aggregate_"+u++;s[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:toFieldPathReference(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:toFieldPathReference(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},aliasMap:s,parent:o}}function toFilters(e){if(0!==e.length)return toFilter(CompositeFilter.create(e,"and"))}function toOrder(e){if(0!==e.length)return e.map(e=>toPropertyOrder(e))}function toStartAtCursor(e){return{before:e.inclusive,values:e.position}}function toEndAtCursor(e){return{before:!e.inclusive,values:e.position}}function toDirection(e){return DIRECTIONS[e]}function toOperatorName(e){return OPERATORS[e]}function toCompositeOperatorName(e){return COMPOSITE_OPERATORS[e]}function toFieldPathReference(e){return{fieldPath:e.canonicalString()}}function toPropertyOrder(e){return{field:toFieldPathReference(e.field),direction:toDirection(e.dir)}}function toFilter(e){return e instanceof FieldFilter?toUnaryOrFieldFilter(e):e instanceof CompositeFilter?toCompositeFilter(e):fail(54877,{filter:e})}function toCompositeFilter(e){const t=e.getFilters().map(e=>toFilter(e));return 1===t.length?t[0]:{compositeFilter:{op:toCompositeOperatorName(e.op),filters:t}}}function toUnaryOrFieldFilter(e){if("=="===e.op){if(isNanValue(e.value))return{unaryFilter:{field:toFieldPathReference(e.field),op:"IS_NAN"}};if(isNullValue(e.value))return{unaryFilter:{field:toFieldPathReference(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(isNanValue(e.value))return{unaryFilter:{field:toFieldPathReference(e.field),op:"IS_NOT_NAN"}};if(isNullValue(e.value))return{unaryFilter:{field:toFieldPathReference(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:toFieldPathReference(e.field),op:toOperatorName(e.op),value:e.value}}}function toDocumentMask(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function isValidResourceName(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function isProtoValueSerializable(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function toMapValue(e,t){const r={fields:{}};return t.forEach((t,n)=>{if("string"!=typeof n)throw new Error(`Cannot encode map with non-string key: ${n}`);r.fields[n]=t._toProto(e)}),{mapValue:r}}function toStringValue(e){return{stringValue:e}}function toPipelineValue(e){return{pipelineValue:e}}
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
 */function newSerializer(e){return new JsonProtoSerializer(e,!0)}
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
 */class Datastore{}class DatastoreImpl extends Datastore{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.terminated=!1}verifyInitialized(){if(this.terminated)throw new FirestoreError(Code.FAILED_PRECONDITION,"The client has already been terminated.")}invokeRPC(e,t,r,n){return this.verifyInitialized(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.invokeRPC(e,toResourcePath(t,r),n,i,o)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Code.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new FirestoreError(Code.UNKNOWN,e.toString())})}invokeStreamingRPC(e,t,r,n,i){return this.verifyInitialized(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,s])=>this.connection.invokeStreamingRPC(e,toResourcePath(t,r),n,o,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Code.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new FirestoreError(Code.UNKNOWN,e.toString())})}terminate(){this.terminated=!0,this.connection.terminate()}}function newDatastore(e,t,r,n){return new DatastoreImpl(e,t,r,n)}async function invokeCommitRpc(e,t){const r=debugCast(e),n={writes:t.map(e=>toMutation(r.serializer,e))};await r.invokeRPC("Commit",r.serializer.databaseId,ResourcePath.emptyPath(),n)}async function invokeBatchGetDocumentsRpc(e,t){const r=debugCast(e),n={documents:t.map(e=>toName(r.serializer,e))},i=await r.invokeStreamingRPC("BatchGetDocuments",r.serializer.databaseId,ResourcePath.emptyPath(),n,t.length),o=new Map;i.forEach(e=>{const t=fromBatchGetDocumentsResponse(r.serializer,e);o.set(t.key.toString(),t)});const s=[];return t.forEach(e=>{const t=o.get(e.toString());hardAssert(!!t,55234,{key:e}),s.push(t)}),s}async function invokeExecutePipeline(e,t){const r=debugCast(e),n={database:getEncodedDatabaseId(r.serializer),structuredPipeline:t._toProto(r.serializer)},i=await r.invokeStreamingRPC("ExecutePipeline",r.serializer.databaseId,ResourcePath.emptyPath(),n),o=[];return i.forEach(e=>{if(e.results&&0!==e.results.length)return e.results.forEach(t=>o.push(fromPipelineResponse(r.serializer,e,t)));o.push(fromPipelineResponse(r.serializer,e))}),o}async function invokeRunQueryRpc(e,t){const r=debugCast(e),{queryTarget:n,parent:i}=toQueryTarget(r.serializer,queryToTarget(t));return(await r.invokeStreamingRPC("RunQuery",r.serializer.databaseId,i,{structuredQuery:n.structuredQuery})).filter(e=>!!e.document).map(e=>fromDocument(r.serializer,e.document,void 0))}async function invokeRunAggregationQueryRpc(e,t,r){const n=debugCast(e),{request:i,aliasMap:o,parent:s}=toRunAggregationQueryRequest(n.serializer,queryToAggregateTarget(t),r);n.connection.shouldResourcePathBeIncludedInRequest||delete i.parent;const a=(await n.invokeStreamingRPC("RunAggregationQuery",n.serializer.databaseId,s,i,1)).filter(e=>!!e.result);hardAssert(1===a.length,64727);const u=a[0].result?.aggregateFields;return Object.keys(u).reduce((e,t)=>(e[o[t]]=u[t],e),{})}
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
 */const LOG_TAG="ComponentProvider",datastoreInstances=new Map;function getDatastore(e){if(e._terminated)throw new FirestoreError(Code.FAILED_PRECONDITION,"The client has already been terminated.");if(!datastoreInstances.has(e)){logDebug(LOG_TAG,"Initializing Datastore");const t=newConnection(makeDatabaseInfo(e._databaseId,e.app.options.appId||"",e._persistenceKey,e.app.options.apiKey,e._freezeSettings())),r=newSerializer(e._databaseId),n=newDatastore(e._authCredentials,e._appCheckCredentials,t,r);datastoreInstances.set(e,n)}return datastoreInstances.get(e)}function removeComponents(e){const t=datastoreInstances.get(e);t&&(logDebug(LOG_TAG,"Removing Datastore"),datastoreInstances.delete(e),t.terminate())}function makeDatabaseInfo(e,t,r,n,i){return new DatabaseInfo(e,t,r,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,cloneLongPollingOptions(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,n)}
/**
 * @license
 * Copyright 2018 Google LLC
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
 */const LRU_COLLECTION_DISABLED=-1,LRU_DEFAULT_CACHE_SIZE_BYTES=41943040,LRU_MINIMUM_CACHE_SIZE_BYTES=1048576,DEFAULT_HOST="firestore.googleapis.com",DEFAULT_SSL=!0,MIN_LONG_POLLING_TIMEOUT_SECONDS=5,MAX_LONG_POLLING_TIMEOUT_SECONDS=30,DEFAULT_AUTO_DETECT_LONG_POLLING=!0;class FirestoreSettingsImpl{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new FirestoreError(Code.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=DEFAULT_HOST,this.ssl=!0}else this.host=e.host,this.ssl=e.ssl??!0;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new FirestoreError(Code.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}validateIsNotUsedTogether("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=cloneLongPollingOptions(e.experimentalLongPollingOptions??{}),validateLongPollingOptions(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&longPollingOptionsEqual(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}function validateLongPollingOptions(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new FirestoreError(Code.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new FirestoreError(Code.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new FirestoreError(Code.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
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
 */class Firestore{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new FirestoreSettingsImpl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new FirestoreError(Code.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new FirestoreError(Code.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new FirestoreSettingsImpl(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=makeAuthCredentialsProvider(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return removeComponents(this),Promise.resolve()}}function initializeFirestore(e,t,r){r||(r="(default)");const n=app._getProvider(e,"firestore/lite");if(n.isInitialized(r))throw new FirestoreError(Code.FAILED_PRECONDITION,"Firestore can only be initialized once per app.");return n.initialize({options:t,instanceIdentifier:r})}function getFirestore(e,t){const r="object"==typeof e?e:app.getApp(),n="string"==typeof e?e:t||"(default)",i=app._getProvider(r,"firestore/lite").getImmediate({identifier:n});if(!i._initialized){const e=util.getDefaultEmulatorHostnameAndPort("firestore");e&&connectFirestoreEmulator(i,...e)}return i}function connectFirestoreEmulator(e,t,r,n={}){e=cast(e,Firestore);const i=util.isCloudWorkstation(t),o=e._getSettings(),s={...o,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${r}`;i&&(util.pingServer(`https://${a}`),util.updateEmulatorBanner("Firestore",!0)),o.host!==DEFAULT_HOST&&o.host!==a&&logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...o,host:a,ssl:i,emulatorOptions:n};if(!util.deepEqual(u,s)&&(e._setSettings(u),n.mockUserToken)){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=User.MOCK_USER;else{t=util.createMockUserToken(n.mockUserToken,e._app?.options.projectId);const i=n.mockUserToken.sub||n.mockUserToken.user_id;if(!i)throw new FirestoreError(Code.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new User(i)}e._authCredentials=new EmulatorAuthCredentialsProvider(new OAuthToken(t,r))}}function terminate(e){return e=cast(e,Firestore),app._removeServiceInstance(e.app,"firestore/lite"),e._delete()}
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
 */class Query{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Query(this.firestore,e,this._query)}}class DocumentReference{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new CollectionReference(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new DocumentReference(this.firestore,e,this._key)}toJSON(){return{type:DocumentReference._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(validateJSON(t,DocumentReference._jsonSchema))return new DocumentReference(e,r||null,new DocumentKey(ResourcePath.fromString(t.referencePath)))}}DocumentReference._jsonSchemaVersion="firestore/documentReference/1.0",DocumentReference._jsonSchema={type:property("string",DocumentReference._jsonSchemaVersion),referencePath:property("string")};class CollectionReference extends Query{constructor(e,t,r){super(e,t,newQueryForPath(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new DocumentReference(this.firestore,null,new DocumentKey(e))}withConverter(e){return new CollectionReference(this.firestore,e,this._path)}}function isCollectionReference(e){return e instanceof CollectionReference}function collection(e,t,...r){if(e=util.getModularInstance(e),validateNonEmptyArgument("collection","path",t),e instanceof Firestore){const n=ResourcePath.fromString(t,...r);return validateCollectionPath(n),new CollectionReference(e,null,n)}{if(!(e instanceof DocumentReference||e instanceof CollectionReference))throw new FirestoreError(Code.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(ResourcePath.fromString(t,...r));return validateCollectionPath(n),new CollectionReference(e.firestore,null,n)}}function collectionGroup(e,t){if(e=cast(e,Firestore),validateNonEmptyArgument("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Query(e,null,newQueryForCollectionGroup(t))}function doc(e,t,...r){if(e=util.getModularInstance(e),1===arguments.length&&(t=AutoId.newId()),validateNonEmptyArgument("doc","path",t),e instanceof Firestore){const n=ResourcePath.fromString(t,...r);return validateDocumentPath(n),new DocumentReference(e,null,new DocumentKey(n))}{if(!(e instanceof DocumentReference||e instanceof CollectionReference))throw new FirestoreError(Code.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=e._path.child(ResourcePath.fromString(t,...r));return validateDocumentPath(n),new DocumentReference(e.firestore,e instanceof CollectionReference?e.converter:null,new DocumentKey(n))}}function refEqual(e,t){return e=util.getModularInstance(e),t=util.getModularInstance(t),(e instanceof DocumentReference||e instanceof CollectionReference)&&(t instanceof DocumentReference||t instanceof CollectionReference)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function queryEqual(e,t){return e=util.getModularInstance(e),t=util.getModularInstance(t),e instanceof Query&&t instanceof Query&&e.firestore===t.firestore&&queryEquals(e._query,t._query)&&e.converter===t.converter}
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
 */class Bytes{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bytes(ByteString.fromBase64String(e))}catch(e){throw new FirestoreError(Code.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Bytes(ByteString.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Bytes._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(validateJSON(e,Bytes._jsonSchema))return Bytes.fromBase64String(e.bytes)}}Bytes._jsonSchemaVersion="firestore/bytes/1.0",Bytes._jsonSchema={type:property("string",Bytes._jsonSchemaVersion),bytes:property("string")};
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
class FieldPath{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new FirestoreError(Code.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new FieldPath$1(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function documentId(){return new FieldPath("__name__")}
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
 */class FieldValue{constructor(e){this._methodName=e}}
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
 */class GeoPoint{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new FirestoreError(Code.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new FirestoreError(Code.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return primitiveComparator(this._lat,e._lat)||primitiveComparator(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:GeoPoint._jsonSchemaVersion}}static fromJSON(e){if(validateJSON(e,GeoPoint._jsonSchema))return new GeoPoint(e.latitude,e.longitude)}}
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
 */function isPrimitiveArrayEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}
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
 */GeoPoint._jsonSchemaVersion="firestore/geoPoint/1.0",GeoPoint._jsonSchema={type:property("string",GeoPoint._jsonSchemaVersion),latitude:property("number"),longitude:property("number")};class VectorValue{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return isPrimitiveArrayEqual(this._values,e._values)}toJSON(){return{type:VectorValue._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(validateJSON(e,VectorValue._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new VectorValue(e.vectorValues);throw new FirestoreError(Code.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}VectorValue._jsonSchemaVersion="firestore/vectorValue/1.0",VectorValue._jsonSchema={type:property("string",VectorValue._jsonSchemaVersion),vectorValues:property("object")};
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
const RESERVED_FIELD_REGEX=/^__.*__$/;class ParsedSetData{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new PatchMutation(e,this.data,this.fieldMask,t,this.fieldTransforms):new SetMutation(e,this.data,t,this.fieldTransforms)}}class ParsedUpdateData{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new PatchMutation(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function isWrite(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw fail(40011,{dataSource:e})}}class ParseContextImpl{constructor(e,t,r,n,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ParseContextImpl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return createError(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(isWrite(this.dataSource)&&RESERVED_FIELD_REGEX.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class UserDataReader{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||newSerializer(e)}createContext(e,t,r,n=!1){return new ParseContextImpl({dataSource:e,methodName:t,targetDoc:r,path:FieldPath$1.emptyPath(),arrayElement:!1,hasConverter:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function newUserDataReader(e){const t=e._freezeSettings(),r=newSerializer(e._databaseId);return new UserDataReader(e._databaseId,!!t.ignoreUndefinedProperties,r)}function parseSetData(e,t,r,n,i,o={}){const s=e.createContext(o.merge||o.mergeFields?2:0,t,r,i);validatePlainObject("Data must be an object, but it was:",s,n);const a=parseObject(n,s);let u,l;if(o.merge)u=new FieldMask(s.fieldMask),l=s.fieldTransforms;else if(o.mergeFields){const e=[];for(const n of o.mergeFields){const i=fieldPathFromArgument(t,n,r);if(!s.contains(i))throw new FirestoreError(Code.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);fieldMaskContains(e,i)||e.push(i)}u=new FieldMask(e),l=s.fieldTransforms.filter(e=>u.covers(e.field))}else u=null,l=s.fieldTransforms;return new ParsedSetData(new ObjectValue(a),u,l)}class DeleteFieldValueImpl extends FieldValue{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof DeleteFieldValueImpl}}function createSentinelChildContext(e,t,r){return new ParseContextImpl({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:r},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class ServerTimestampFieldValueImpl extends FieldValue{_toFieldTransform(e){return new FieldTransform(e.path,new ServerTimestampTransform)}isEqual(e){return e instanceof ServerTimestampFieldValueImpl}}class ArrayUnionFieldValueImpl extends FieldValue{constructor(e,t){super(e),this._elements=t}_toFieldTransform(e){const t=createSentinelChildContext(this,e,!0),r=this._elements.map(e=>parseData(e,t)),n=new ArrayUnionTransformOperation(r);return new FieldTransform(e.path,n)}isEqual(e){return e instanceof ArrayUnionFieldValueImpl&&util.deepEqual(this._elements,e._elements)}}class ArrayRemoveFieldValueImpl extends FieldValue{constructor(e,t){super(e),this._elements=t}_toFieldTransform(e){const t=createSentinelChildContext(this,e,!0),r=this._elements.map(e=>parseData(e,t)),n=new ArrayRemoveTransformOperation(r);return new FieldTransform(e.path,n)}isEqual(e){return e instanceof ArrayRemoveFieldValueImpl&&util.deepEqual(this._elements,e._elements)}}class NumericIncrementFieldValueImpl extends FieldValue{constructor(e,t){super(e),this._operand=t}_toFieldTransform(e){const t=new NumericIncrementTransformOperation(e.serializer,toNumber(e.serializer,this._operand));return new FieldTransform(e.path,t)}isEqual(e){return e instanceof NumericIncrementFieldValueImpl&&this._operand===e._operand}}function parseUpdateData(e,t,r,n){const i=e.createContext(1,t,r);validatePlainObject("Data must be an object, but it was:",i,n);const o=[],s=ObjectValue.empty();forEach(n,(e,n)=>{const a=fieldPathFromDotSeparatedString(t,e,r);n=util.getModularInstance(n);const u=i.childContextForFieldPath(a);if(n instanceof DeleteFieldValueImpl)o.push(a);else{const e=parseData(n,u);null!=e&&(o.push(a),s.set(a,e))}});const a=new FieldMask(o);return new ParsedUpdateData(s,a,i.fieldTransforms)}function parseUpdateVarargs(e,t,r,n,i,o){const s=e.createContext(1,t,r),a=[fieldPathFromArgument(t,n,r)],u=[i];if(o.length%2!=0)throw new FirestoreError(Code.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<o.length;e+=2)a.push(fieldPathFromArgument(t,o[e])),u.push(o[e+1]);const l=[],c=ObjectValue.empty();for(let e=a.length-1;e>=0;--e)if(!fieldMaskContains(l,a[e])){const t=a[e];let r=u[e];r=util.getModularInstance(r);const n=s.childContextForFieldPath(t);if(r instanceof DeleteFieldValueImpl)l.push(t);else{const e=parseData(r,n);null!=e&&(l.push(t),c.set(t,e))}}const d=new FieldMask(l);return new ParsedUpdateData(c,d,s.fieldTransforms)}function parseQueryValue(e,t,r,n=!1){return parseData(r,e.createContext(n?4:3,t))}function parseData(e,t){if(looksLikeJsonObject(e=util.getModularInstance(e)))return validatePlainObject("Unsupported field value:",t,e),parseObject(e,t);if(e instanceof FieldValue)return parseSentinelFieldValue(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return parseArray(e,t)}return parseScalarValue(e,t)}function parseObject(e,t){const r={};return isEmpty(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):forEach(e,(e,n)=>{const i=parseData(n,t.childContextForField(e));null!=i&&(r[e]=i)}),{mapValue:{fields:r}}}function parseArray(e,t){const r=[];let n=0;for(const i of e){let e=parseData(i,t.childContextForArray(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}function parseSentinelFieldValue(e,t){if(!isWrite(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}function parseScalarValue(e,t){if(null===(e=util.getModularInstance(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return toNumber(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const r=Timestamp.fromDate(e);return{timestampValue:toTimestamp(t.serializer,r)}}if(e instanceof Timestamp){const r=new Timestamp(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:toTimestamp(t.serializer,r)}}if(e instanceof GeoPoint)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Bytes)return{bytesValue:toBytes(t.serializer,e._byteString)};if(e instanceof DocumentReference){const r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.createError(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:toResourceName(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof VectorValue)return parseVectorValue(e,t);if(isProtoValueSerializable(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${valueDescription(e)}`)}function parseVectorValue(e,t){const r=e instanceof VectorValue?e.toArray():e,n={fields:{[TYPE_KEY]:{stringValue:"__vector__"},[VECTOR_MAP_VECTORS_KEY]:{arrayValue:{values:r.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return toDouble(t.serializer,e)})}}}};return{mapValue:n}}function looksLikeJsonObject(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Timestamp||e instanceof GeoPoint||e instanceof Bytes||e instanceof DocumentReference||e instanceof FieldValue||e instanceof VectorValue||isProtoValueSerializable(e))}function validatePlainObject(e,t,r){if(!looksLikeJsonObject(r)||!isPlainObject(r)){const n=valueDescription(r);throw"an object"===n?t.createError(e+" a custom object"):t.createError(e+" "+n)}}function fieldPathFromArgument(e,t,r){if((t=util.getModularInstance(t))instanceof FieldPath)return t._internalPath;if("string"==typeof t)return fieldPathFromDotSeparatedString(e,t);throw createError("Field path arguments must be of type string or ",e,!1,void 0,r)}const FIELD_PATH_RESERVED=new RegExp("[~\\*/\\[\\]]");function fieldPathFromDotSeparatedString(e,t,r){if(t.search(FIELD_PATH_RESERVED)>=0)throw createError(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new FieldPath(...t.split("."))._internalPath}catch(n){throw createError(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function createError(e,t,r,n,i){const o=n&&!n.isEmpty(),s=void 0!==i;let a=`Function ${t}() called with invalid data`;r&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(o||s)&&(u+=" (found",o&&(u+=` in field ${n}`),s&&(u+=` in document ${i}`),u+=")"),new FirestoreError(Code.INVALID_ARGUMENT,a+e+u)}function fieldMaskContains(e,t){return e.some(e=>e.isEqual(t))}function isUserData(e){return"function"==typeof e._readUserData}
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
 */class DocumentSnapshot{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new DocumentReference(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new QueryDocumentSnapshot(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(fieldPathFromArgument("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class QueryDocumentSnapshot extends DocumentSnapshot{data(){return super.data()}}class QuerySnapshot{constructor(e,t){this._docs=t,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return 0===this.docs.length}forEach(e,t){this._docs.forEach(e,t)}}function snapshotEqual(e,t){return e=util.getModularInstance(e),t=util.getModularInstance(t),e instanceof DocumentSnapshot&&t instanceof DocumentSnapshot?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof QuerySnapshot&&t instanceof QuerySnapshot&&queryEqual(e.query,t.query)&&arrayEquals(e.docs,t.docs,snapshotEqual)}
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
 */function validateHasExplicitOrderByForLimitToLast(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new FirestoreError(Code.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class AppliableConstraint{}class QueryConstraint extends AppliableConstraint{}function query(e,t,...r){let n=[];t instanceof AppliableConstraint&&n.push(t),n=n.concat(r),validateQueryConstraintArray(n);for(const t of n)e=t._apply(e);return e}class QueryFieldFilterConstraint extends QueryConstraint{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new QueryFieldFilterConstraint(e,t,r)}_apply(e){const t=this._parse(e);return validateNewFieldFilter(e._query,t),new Query(e.firestore,e.converter,queryWithAddedFilter(e._query,t))}_parse(e){const t=newUserDataReader(e.firestore);return newQueryFilter(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function where(e,t,r){const n=t,i=fieldPathFromArgument("where",e);return QueryFieldFilterConstraint._create(i,n,r)}class QueryCompositeFilterConstraint extends AppliableConstraint{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new QueryCompositeFilterConstraint(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:CompositeFilter.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(validateNewFilter(e._query,t),new Query(e.firestore,e.converter,queryWithAddedFilter(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function or(...e){return e.forEach(e=>validateQueryFilterConstraint("or",e)),QueryCompositeFilterConstraint._create("or",e)}function and(...e){return e.forEach(e=>validateQueryFilterConstraint("and",e)),QueryCompositeFilterConstraint._create("and",e)}class QueryOrderByConstraint extends QueryConstraint{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new QueryOrderByConstraint(e,t)}_apply(e){const t=newQueryOrderBy(e._query,this._field,this._direction);return new Query(e.firestore,e.converter,queryWithAddedOrderBy(e._query,t))}}function orderBy(e,t="asc"){const r=t,n=fieldPathFromArgument("orderBy",e);return QueryOrderByConstraint._create(n,r)}class QueryLimitConstraint extends QueryConstraint{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new QueryLimitConstraint(e,t,r)}_apply(e){return new Query(e.firestore,e.converter,queryWithLimit(e._query,this._limit,this._limitType))}}function limit(e){return validatePositiveNumber("limit",e),QueryLimitConstraint._create("limit",e,"F")}function limitToLast(e){return validatePositiveNumber("limitToLast",e),QueryLimitConstraint._create("limitToLast",e,"L")}class QueryStartAtConstraint extends QueryConstraint{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new QueryStartAtConstraint(e,t,r)}_apply(e){const t=newQueryBoundFromDocOrFields(e,this.type,this._docOrFields,this._inclusive);return new Query(e.firestore,e.converter,queryWithStartAt(e._query,t))}}function startAt(...e){return QueryStartAtConstraint._create("startAt",e,!0)}function startAfter(...e){return QueryStartAtConstraint._create("startAfter",e,!1)}class QueryEndAtConstraint extends QueryConstraint{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new QueryEndAtConstraint(e,t,r)}_apply(e){const t=newQueryBoundFromDocOrFields(e,this.type,this._docOrFields,this._inclusive);return new Query(e.firestore,e.converter,queryWithEndAt(e._query,t))}}function endBefore(...e){return QueryEndAtConstraint._create("endBefore",e,!1)}function endAt(...e){return QueryEndAtConstraint._create("endAt",e,!0)}function newQueryBoundFromDocOrFields(e,t,r,n){if(r[0]=util.getModularInstance(r[0]),r[0]instanceof DocumentSnapshot)return newQueryBoundFromDocument(e._query,e.firestore._databaseId,t,r[0]._document,n);{const i=newUserDataReader(e.firestore);return newQueryBoundFromFields(e._query,e.firestore._databaseId,i,t,r,n)}}function newQueryFilter(e,t,r,n,i,o,s){let a;if(i.isKeyField()){if("array-contains"===o||"array-contains-any"===o)throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid Query. You can't perform '${o}' queries on documentId().`);if("in"===o||"not-in"===o){validateDisjunctiveFilterElements(s,o);const t=[];for(const r of s)t.push(parseDocumentIdValue(n,e,r));a={arrayValue:{values:t}}}else a=parseDocumentIdValue(n,e,s)}else"in"!==o&&"not-in"!==o&&"array-contains-any"!==o||validateDisjunctiveFilterElements(s,o),a=parseQueryValue(r,t,s,"in"===o||"not-in"===o);return FieldFilter.create(i,o,a)}function newQueryOrderBy(e,t,r){if(null!==e.startAt)throw new FirestoreError(Code.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new FirestoreError(Code.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new OrderBy(t,r)}function newQueryBoundFromDocument(e,t,r,n,i){if(!n)throw new FirestoreError(Code.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${r}().`);const o=[];for(const r of queryNormalizedOrderBy(e))if(r.field.isKeyField())o.push(refValue(t,n.key));else{const e=n.data.field(r.field);if(isServerTimestamp(e))throw new FirestoreError(Code.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+r.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=r.field.canonicalString();throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}o.push(e)}return new Bound(o,i)}function newQueryBoundFromFields(e,t,r,n,i,o){const s=e.explicitOrderBy;if(i.length>s.length)throw new FirestoreError(Code.INVALID_ARGUMENT,`Too many arguments provided to ${n}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let o=0;o<i.length;o++){const u=i[o];if(s[o].field.isKeyField()){if("string"!=typeof u)throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${n}(), but got a ${typeof u}`);if(!isCollectionGroupQuery(e)&&-1!==u.indexOf("/"))throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${n}() must be a plain document ID, but '${u}' contains a slash.`);const r=e.path.child(ResourcePath.fromString(u));if(!DocumentKey.isDocumentKey(r))throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${n}() must result in a valid document path, but '${r}' is not because it contains an odd number of segments.`);const i=new DocumentKey(r);a.push(refValue(t,i))}else{const e=parseQueryValue(r,n,u);a.push(e)}}return new Bound(a,o)}function parseDocumentIdValue(e,t,r){if("string"==typeof(r=util.getModularInstance(r))){if(""===r)throw new FirestoreError(Code.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!isCollectionGroupQuery(t)&&-1!==r.indexOf("/"))throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);const n=t.path.child(ResourcePath.fromString(r));if(!DocumentKey.isDocumentKey(n))throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return refValue(e,new DocumentKey(n))}if(r instanceof DocumentReference)return refValue(e,r._key);throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${valueDescription(r)}.`)}function validateDisjunctiveFilterElements(e,t){if(!Array.isArray(e)||0===e.length)throw new FirestoreError(Code.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function conflictingOps(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}function validateNewFieldFilter(e,t){const r=findOpInsideFilters(e.filters,conflictingOps(t.op));if(null!==r)throw r===t.op?new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new FirestoreError(Code.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}function validateNewFilter(e,t){let r=e;const n=t.getFlattenedFilters();for(const e of n)validateNewFieldFilter(r,e),r=queryWithAddedFilter(r,e)}function findOpInsideFilters(e,t){for(const r of e)for(const e of r.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}function validateQueryFilterConstraint(e,t){if(!(t instanceof QueryFieldFilterConstraint||t instanceof QueryCompositeFilterConstraint))throw new FirestoreError(Code.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function validateQueryConstraintArray(e){const t=e.filter(e=>e instanceof QueryCompositeFilterConstraint).length,r=e.filter(e=>e instanceof QueryFieldFilterConstraint).length;if(t>1||t>0&&r>0)throw new FirestoreError(Code.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
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
 */class AbstractUserDataWriter{convertValue(e,t="none"){switch(typeOrder(e)){case 0:return null;case 1:return e.booleanValue;case 2:return normalizeNumber(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(normalizeByteString(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw fail(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return forEach(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){const t=e.fields?.value.arrayValue?.values?.map(e=>normalizeNumber(e.doubleValue));return new VectorValue(t)}convertGeoPoint(e){return new GeoPoint(normalizeNumber(e.latitude),normalizeNumber(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=getPreviousValue(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(getLocalWriteTime(e));default:return null}}convertTimestamp(e){const t=normalizeTimestamp(e);return new Timestamp(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ResourcePath.fromString(e);hardAssert(isValidResourceName(r),9688,{name:e});const n=new DatabaseId(r.get(1),r.get(3)),i=new DocumentKey(r.popFirst(5));return n.isEqual(t)||logError(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i
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
 */}}function applyFirestoreDataConverter(e,t,r){let n;return n=e?r&&(r.merge||r.mergeFields)?e.toFirestore(t,r):e.toFirestore(t):t,n}class LiteUserDataWriter extends AbstractUserDataWriter{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bytes(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new DocumentReference(this.firestore,null,t)}}function getDoc(e){const t=getDatastore((e=cast(e,DocumentReference)).firestore),r=new LiteUserDataWriter(e.firestore);return invokeBatchGetDocumentsRpc(t,[e._key]).then(t=>{hardAssert(1===t.length,15618);const n=t[0];return new DocumentSnapshot(e.firestore,r,e._key,n.isFoundDocument()?n:null,e.converter)})}function getDocs(e){validateHasExplicitOrderByForLimitToLast((e=cast(e,Query))._query);const t=getDatastore(e.firestore),r=new LiteUserDataWriter(e.firestore);return invokeRunQueryRpc(t,e._query).then(t=>{const n=t.map(t=>new QueryDocumentSnapshot(e.firestore,r,t.key,t,e.converter));return"L"===e._query.limitType&&n.reverse(),new QuerySnapshot(e,n)})}function setDoc(e,t,r){const n=applyFirestoreDataConverter((e=cast(e,DocumentReference)).converter,t,r),i=parseSetData(newUserDataReader(e.firestore),"setDoc",e._key,n,null!==e.converter,r);return invokeCommitRpc(getDatastore(e.firestore),[i.toMutation(e._key,Precondition.none())])}function updateDoc(e,t,r,...n){const i=newUserDataReader((e=cast(e,DocumentReference)).firestore);let o;return o="string"==typeof(t=util.getModularInstance(t))||t instanceof FieldPath?parseUpdateVarargs(i,"updateDoc",e._key,t,r,n):parseUpdateData(i,"updateDoc",e._key,t),invokeCommitRpc(getDatastore(e.firestore),[o.toMutation(e._key,Precondition.exists(!0))])}function deleteDoc(e){return invokeCommitRpc(getDatastore((e=cast(e,DocumentReference)).firestore),[new DeleteMutation(e._key,Precondition.none())])}function addDoc(e,t){const r=doc(e=cast(e,CollectionReference)),n=applyFirestoreDataConverter(e.converter,t),i=parseSetData(newUserDataReader(e.firestore),"addDoc",r._key,n,null!==r.converter,{});return invokeCommitRpc(getDatastore(e.firestore),[i.toMutation(r._key,Precondition.exists(!1))]).then(()=>r)}
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
 */function deleteField(){return new DeleteFieldValueImpl("deleteField")}function serverTimestamp(){return new ServerTimestampFieldValueImpl("serverTimestamp")}function arrayUnion(...e){return new ArrayUnionFieldValueImpl("arrayUnion",e)}function arrayRemove(...e){return new ArrayRemoveFieldValueImpl("arrayRemove",e)}function increment(e){return new NumericIncrementFieldValueImpl("increment",e)}function vector(e){return new VectorValue(e)}exports.Bytes=Bytes,exports.Code=Code,exports.CollectionReference=CollectionReference,exports.CompositeFilter=CompositeFilter,exports.DOCUMENT_KEY_NAME="__name__",exports.DeleteMutation=DeleteMutation,exports.DocumentKey=DocumentKey,exports.DocumentReference=DocumentReference,exports.DocumentSnapshot=DocumentSnapshot,exports.FieldFilter=FieldFilter,exports.FieldPath=FieldPath,exports.FieldPath$1=FieldPath$1,exports.FieldValue=FieldValue,exports.Firestore=Firestore,exports.FirestoreError=FirestoreError,exports.GeoPoint=GeoPoint,exports.LiteAppCheckTokenProvider=LiteAppCheckTokenProvider,exports.LiteAuthCredentialsProvider=LiteAuthCredentialsProvider,exports.LiteUserDataWriter=LiteUserDataWriter,exports.ObjectValue=ObjectValue,exports.Precondition=Precondition,exports.Query=Query,exports.QueryCompositeFilterConstraint=QueryCompositeFilterConstraint,exports.QueryConstraint=QueryConstraint,exports.QueryDocumentSnapshot=QueryDocumentSnapshot,exports.QueryEndAtConstraint=QueryEndAtConstraint,exports.QueryFieldFilterConstraint=QueryFieldFilterConstraint,exports.QueryLimitConstraint=QueryLimitConstraint,exports.QueryOrderByConstraint=QueryOrderByConstraint,exports.QuerySnapshot=QuerySnapshot,exports.QueryStartAtConstraint=QueryStartAtConstraint,exports.SnapshotVersion=SnapshotVersion,exports.Timestamp=Timestamp,exports.UserDataReader=UserDataReader,exports.VectorValue=VectorValue,exports.VerifyMutation=VerifyMutation,exports.addDoc=addDoc,exports.and=and,exports.applyFirestoreDataConverter=applyFirestoreDataConverter,exports.arrayRemove=arrayRemove,exports.arrayUnion=arrayUnion,exports.cast=cast,exports.collection=collection,exports.collectionGroup=collectionGroup,exports.connectFirestoreEmulator=connectFirestoreEmulator,exports.databaseIdFromApp=databaseIdFromApp,exports.deleteDoc=deleteDoc,exports.deleteField=deleteField,exports.doc=doc,exports.documentId=documentId,exports.endAt=endAt,exports.endBefore=endBefore,exports.fail=fail,exports.fieldPathFromArgument=fieldPathFromArgument,exports.getDatastore=getDatastore,exports.getDoc=getDoc,exports.getDocs=getDocs,exports.getFirestore=getFirestore,exports.hardAssert=hardAssert,exports.increment=increment,exports.initializeFirestore=initializeFirestore,exports.invokeBatchGetDocumentsRpc=invokeBatchGetDocumentsRpc,exports.invokeCommitRpc=invokeCommitRpc,exports.invokeExecutePipeline=invokeExecutePipeline,exports.invokeRunAggregationQueryRpc=invokeRunAggregationQueryRpc,exports.isCollectionGroupQuery=isCollectionGroupQuery,exports.isCollectionReference=isCollectionReference,exports.isDocumentQuery=isDocumentQuery,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isPermanentError=isPermanentError,exports.isPlainObject=isPlainObject,exports.isString=isString,exports.isUserData=isUserData,exports.limit=limit,exports.limitToLast=limitToLast,exports.logDebug=logDebug,exports.logError=logError,exports.mapToArray=mapToArray,exports.newUserDataReader=newUserDataReader,exports.or=or,exports.orderBy=orderBy,exports.parseData=parseData,exports.parseSetData=parseSetData,exports.parseUpdateData=parseUpdateData,exports.parseUpdateVarargs=parseUpdateVarargs,exports.query=query,exports.queryEqual=queryEqual,exports.queryNormalizedOrderBy=queryNormalizedOrderBy,exports.refEqual=refEqual,exports.serverTimestamp=serverTimestamp,exports.setDoc=setDoc,exports.setLogLevel=setLogLevel,exports.setSDKVersion=setSDKVersion,exports.snapshotEqual=snapshotEqual,exports.startAfter=startAfter,exports.startAt=startAt,exports.terminate=terminate,exports.toMapValue=toMapValue,exports.toNumber=toNumber,exports.toPipelineValue=toPipelineValue,exports.toStringValue=toStringValue,exports.updateDoc=updateDoc,exports.vector=vector,exports.where=where;