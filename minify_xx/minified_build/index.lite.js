import*as modularAPIs from"@firebase/app";import{_addComponent,deleteApp,_DEFAULT_ENTRY_NAME,registerVersion}from"@firebase/app";import{Component}from"@firebase/component";import{ErrorFactory,contains,deepExtend}from"@firebase/util";
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
 */class FirebaseAppLiteImpl{constructor(e,t){this._delegate=e,this.firebase=t,_addComponent(e,new Component("app-compat",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return this.firebase.INTERNAL.removeApp(this.name),deleteApp(this._delegate)}_getService(e,t=_DEFAULT_ENTRY_NAME){return this._delegate.checkDestroyed(),this._delegate.container.getProvider(e).getImmediate({identifier:t})
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
 */}}const ERRORS={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},ERROR_FACTORY=new ErrorFactory("app-compat","Firebase",ERRORS);
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
 */function createFirebaseNamespaceCore(e){const t={},r={__esModule:!0,initializeApp:function(n,a={}){const o=modularAPIs.initializeApp(n,a);if(contains(t,o.name))return t[o.name];const i=new e(o,r);return t[o.name]=i,i},app:n,registerVersion:modularAPIs.registerVersion,setLogLevel:modularAPIs.setLogLevel,onLog:modularAPIs.onLog,apps:null,SDK_VERSION:modularAPIs.SDK_VERSION,INTERNAL:{registerComponent:function(t){const a=t.name,o=a.replace("-compat","");if(modularAPIs._registerComponent(t)&&"PUBLIC"===t.type){const i=(e=n())=>{if("function"!=typeof e[o])throw ERROR_FACTORY.create("invalid-app-argument",{appName:a});return e[o]()};void 0!==t.serviceProps&&deepExtend(i,t.serviceProps),r[o]=i,e.prototype[o]=function(...e){return this._getService.bind(this,a).apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?r[o]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){return"serverAuth"===t?null:t},modularAPIs:modularAPIs}};function n(e){if(e=e||modularAPIs._DEFAULT_ENTRY_NAME,!contains(t,e))throw ERROR_FACTORY.create("no-app",{appName:e});return t[e]}return r.default=r,Object.defineProperty(r,"apps",{get:function(){return Object.keys(t).map(e=>t[e])}}),n.App=e,r}
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
 */function createFirebaseNamespaceLite(){const e=createFirebaseNamespaceCore(FirebaseAppLiteImpl);e.SDK_VERSION=`${e.SDK_VERSION}_LITE`;const t=e.INTERNAL.registerComponent;return e.INTERNAL.registerComponent=function(e){if("PUBLIC"===e.type&&!e.name.includes("performance")&&!e.name.includes("installations"))throw Error(`${name} cannot register with the standalone perf instance`);return t(e)},e}const name$1="@firebase/app-compat",version="0.5.9";
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
 */function registerCoreComponents(e){registerVersion(name$1,"0.5.9",e)}
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
 */const firebase=createFirebaseNamespaceLite();registerCoreComponents("lite");export{firebase as default};