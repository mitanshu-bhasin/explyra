import"@firebase/installations";import{Component}from"@firebase/component";import{openDB,deleteDB}from"idb";import{ErrorFactory,isIndexedDBAvailable,validateIndexedDBOpenable,getModularInstance}from"@firebase/util";import{_registerComponent,_getProvider,getApp}from"@firebase/app";
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
 */const DEFAULT_VAPID_KEY="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ENDPOINT="https://fcmregistrations.googleapis.com/v1",FCM_MSG="FCM_MSG",CONSOLE_CAMPAIGN_ID="google.c.a.c_id",SDK_PLATFORM_WEB=3,EVENT_MESSAGE_DELIVERED=1;var MessageType$1,MessageType;
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
function arrayToBase64(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function base64ToArray(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}
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
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(MessageType$1||(MessageType$1={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(MessageType||(MessageType={}));const OLD_DB_NAME="fcm_token_details_db",OLD_DB_VERSION=5,OLD_OBJECT_STORE_NAME="fcm_token_object_Store";async function migrateOldDatabase(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(OLD_DB_NAME))return null}let t=null;return(await openDB(OLD_DB_NAME,5,{upgrade:async(n,i,o,a)=>{if(i<2)return;if(!n.objectStoreNames.contains(OLD_OBJECT_STORE_NAME))return;const r=a.objectStore(OLD_OBJECT_STORE_NAME),s=await r.index("fcmSenderId").get(e);if(await r.clear(),s)if(2===i){const e=s;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:arrayToBase64(e.vapidKey)}}}else if(3===i){const e=s;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}else if(4===i){const e=s;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}}})).close(),await deleteDB(OLD_DB_NAME),await deleteDB("fcm_vapid_details_db"),await deleteDB("undefined"),checkTokenDetails(t)?t:null}function checkTokenDetails(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
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
 */const DATABASE_NAME="firebase-messaging-database",DATABASE_VERSION=1,OBJECT_STORE_NAME="firebase-messaging-store";let dbPromise=null;function getDbPromise(){return dbPromise||(dbPromise=openDB(DATABASE_NAME,1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(OBJECT_STORE_NAME)}})),dbPromise}async function dbGet(e){const t=getKey(e),n=await getDbPromise(),i=await n.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME).get(t);if(i)return i;{const t=await migrateOldDatabase(e.appConfig.senderId);if(t)return await dbSet(e,t),t}}async function dbSet(e,t){const n=getKey(e),i=(await getDbPromise()).transaction(OBJECT_STORE_NAME,"readwrite");return await i.objectStore(OBJECT_STORE_NAME).put(t,n),await i.done,t}async function dbRemove(e){const t=getKey(e),n=(await getDbPromise()).transaction(OBJECT_STORE_NAME,"readwrite");await n.objectStore(OBJECT_STORE_NAME).delete(t),await n.done}function getKey({appConfig:e}){return e.appId}
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
 */const ERROR_MAP={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ERROR_FACTORY=new ErrorFactory("messaging","Messaging",ERROR_MAP);
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
 */
async function requestGetToken(e,t){const n=await getHeaders(e),i=getBody(t),o={method:"POST",headers:n,body:JSON.stringify(i)};let a;try{const t=await fetch(getEndpoint(e.appConfig),o);a=await t.json()}catch(e){throw ERROR_FACTORY.create("token-subscribe-failed",{errorInfo:e?.toString()})}if(a.error){const e=a.error.message;throw ERROR_FACTORY.create("token-subscribe-failed",{errorInfo:e})}if(!a.token)throw ERROR_FACTORY.create("token-subscribe-no-token");return a.token}async function requestUpdateToken(e,t){const n=await getHeaders(e),i=getBody(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(i)};let a;try{const n=await fetch(`${getEndpoint(e.appConfig)}/${t.token}`,o);a=await n.json()}catch(e){throw ERROR_FACTORY.create("token-update-failed",{errorInfo:e?.toString()})}if(a.error){const e=a.error.message;throw ERROR_FACTORY.create("token-update-failed",{errorInfo:e})}if(!a.token)throw ERROR_FACTORY.create("token-update-no-token");return a.token}async function requestDeleteToken(e,t){const n={method:"DELETE",headers:await getHeaders(e)};try{const i=await fetch(`${getEndpoint(e.appConfig)}/${t}`,n),o=await i.json();if(o.error){const e=o.error.message;throw ERROR_FACTORY.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw ERROR_FACTORY.create("token-unsubscribe-failed",{errorInfo:e?.toString()})}}function getEndpoint({projectId:e}){return`${ENDPOINT}/projects/${e}/registrations`}async function getHeaders({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function getBody({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const o={web:{endpoint:n,auth:t,p256dh:e}};return i!==DEFAULT_VAPID_KEY&&(o.web.applicationPubKey=i),o}
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
 */const TOKEN_EXPIRATION_MS=6048e5;async function getTokenInternal(e){const t=await getPushSubscription(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:arrayToBase64(t.getKey("auth")),p256dh:arrayToBase64(t.getKey("p256dh"))},i=await dbGet(e.firebaseDependencies);if(i){if(isTokenValid(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?updateToken(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await requestDeleteToken(e.firebaseDependencies,i.token)}catch(e){console.warn(e)}return getNewToken(e.firebaseDependencies,n)}return getNewToken(e.firebaseDependencies,n)}async function deleteTokenInternal(e){const t=await dbGet(e.firebaseDependencies);t&&(await requestDeleteToken(e.firebaseDependencies,t.token),await dbRemove(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function updateToken(e,t){try{const n=await requestUpdateToken(e.firebaseDependencies,t),i={...t,token:n,createTime:Date.now()};return await dbSet(e.firebaseDependencies,i),n}catch(e){throw e}}async function getNewToken(e,t){const n={token:await requestGetToken(e,t),createTime:Date.now(),subscriptionOptions:t};return await dbSet(e,n),n.token}async function getPushSubscription(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:base64ToArray(t)})}function isTokenValid(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,o=t.auth===e.auth,a=t.p256dh===e.p256dh;return n&&i&&o&&a}
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
 */function externalizePayload(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return propagateNotificationPayload(t,e),propagateDataPayload(t,e),propagateFcmOptions(t,e),t}function propagateNotificationPayload(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const o=t.notification.image;o&&(e.notification.image=o);const a=t.notification.icon;a&&(e.notification.icon=a)}function propagateDataPayload(e,t){t.data&&(e.data=t.data)}function propagateFcmOptions(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const i=t.fcmOptions?.analytics_label;i&&(e.fcmOptions.analyticsLabel=i)}
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
 */function isConsoleMessage(e){return"object"==typeof e&&!!e&&"google.c.a.c_id"in e}
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
 */function sleep(e){return new Promise(t=>{setTimeout(t,e)})}
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
 */async function stageLog(e,t){const n=createFcmEvent(t,await e.firebaseDependencies.installations.getId());createAndEnqueueLogEvent(e,n,t.productId)}function createFcmEvent(e,t){const n={};return e.from&&(n.project_number=e.from),e.fcmMessageId&&(n.message_id=e.fcmMessageId),n.instance_id=t,e.notification?n.message_type=MessageType$1.DISPLAY_NOTIFICATION.toString():n.message_type=MessageType$1.DATA_MESSAGE.toString(),n.sdk_platform=3..toString(),n.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(n.collapse_key=e.collapse_key),n.event=1..toString(),e.fcmOptions?.analytics_label&&(n.analytics_label=e.fcmOptions?.analytics_label),n}function createAndEnqueueLogEvent(e,t,n){const i={};i.event_time_ms=Math.floor(Date.now()).toString(),i.source_extension_json_proto3=JSON.stringify({messaging_client_event:t}),n&&(i.compliance_data=buildComplianceData(n)),e.logEvents.push(i)}function buildComplianceData(e){return{privacy_context:{prequest:{origin_associated_product_id:e}}}}function _mergeStrings(e,t){const n=[];for(let i=0;i<e.length;i++)n.push(e.charAt(i)),i<t.length&&n.push(t.charAt(i));return n.join("")}
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
 */async function onSubChange(e,t){const{newSubscription:n}=e;if(!n)return void await deleteTokenInternal(t);const i=await dbGet(t.firebaseDependencies);await deleteTokenInternal(t),t.vapidKey=i?.subscriptionOptions?.vapidKey??DEFAULT_VAPID_KEY,await getTokenInternal(t)}async function onPush(e,t){const n=getMessagePayloadInternal(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&await stageLog(t,n);const i=await getClientList();if(hasVisibleClients(i))return sendMessagePayloadInternalToWindows(i,n);if(n.notification&&await showNotification(wrapInternalPayload(n)),t&&t.onBackgroundMessageHandler){const e=externalizePayload(n);"function"==typeof t.onBackgroundMessageHandler?await t.onBackgroundMessageHandler(e):t.onBackgroundMessageHandler.next(e)}}async function onNotificationClick(e){const t=e.notification?.data?.[FCM_MSG];if(!t)return;if(e.action)return;e.stopImmediatePropagation(),e.notification.close();const n=getLink(t);if(!n)return;const i=new URL(n,self.location.href),o=new URL(self.location.origin);if(i.host!==o.host)return;let a=await getWindowClient(i);return a?a=await a.focus():(a=await self.clients.openWindow(n),await sleep(3e3)),a?(t.messageType=MessageType.NOTIFICATION_CLICKED,t.isFirebaseMessaging=!0,a.postMessage(t)):void 0}function wrapInternalPayload(e){const t={...e.notification};return t.data={[FCM_MSG]:e},t}function getMessagePayloadInternal({data:e}){if(!e)return null;try{return e.json()}catch(e){return null}}async function getWindowClient(e){const t=await getClientList();for(const n of t){const t=new URL(n.url,self.location.href);if(e.host===t.host)return n}return null}function hasVisibleClients(e){return e.some(e=>"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://"))}function sendMessagePayloadInternalToWindows(e,t){t.isFirebaseMessaging=!0,t.messageType=MessageType.PUSH_RECEIVED;for(const n of e)n.postMessage(t)}function getClientList(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function showNotification(e){const{actions:t}=e,{maxActions:n}=Notification;return t&&n&&t.length>n&&console.warn(`This browser only supports ${n} actions. The remaining actions will not be displayed.`),self.registration.showNotification(e.title??"",e)}function getLink(e){const t=e.fcmOptions?.link??e.notification?.click_action;return t||(isConsoleMessage(e.data)?self.location.origin:null)}
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
 */function extractAppConfig(e){if(!e||!e.options)throw getMissingValueError("App Configuration Object");if(!e.name)throw getMissingValueError("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw getMissingValueError(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function getMissingValueError(e){return ERROR_FACTORY.create("missing-app-config-values",{valueName:e})}
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
 */_mergeStrings("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class MessagingService{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=extractAppConfig(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
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
 */const SwMessagingFactory=e=>{const t=new MessagingService(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",e=>{e.waitUntil(onPush(e,t))}),self.addEventListener("pushsubscriptionchange",e=>{e.waitUntil(onSubChange(e,t))}),self.addEventListener("notificationclick",e=>{e.waitUntil(onNotificationClick(e))}),t};function registerMessagingInSw(){_registerComponent(new Component("messaging-sw",SwMessagingFactory,"PUBLIC"))}
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
 */async function isSwSupported(){return isIndexedDBAvailable()&&await validateIndexedDBOpenable()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
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
 */function onBackgroundMessage$1(e,t){if(void 0!==self.document)throw ERROR_FACTORY.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}
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
 */function _setDeliveryMetricsExportedToBigQueryEnabled(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}
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
 */function getMessagingInSw(e=getApp()){return isSwSupported().then(e=>{if(!e)throw ERROR_FACTORY.create("unsupported-browser")},e=>{throw ERROR_FACTORY.create("indexed-db-unsupported")}),_getProvider(getModularInstance(e),"messaging-sw").getImmediate()}function onBackgroundMessage(e,t){return onBackgroundMessage$1(e=getModularInstance(e),t)}function experimentalSetDeliveryMetricsExportedToBigQueryEnabled(e,t){return _setDeliveryMetricsExportedToBigQueryEnabled(e=getModularInstance(e),t)}
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
 */registerMessagingInSw();export{experimentalSetDeliveryMetricsExportedToBigQueryEnabled,getMessagingInSw as getMessaging,isSwSupported as isSupported,onBackgroundMessage};