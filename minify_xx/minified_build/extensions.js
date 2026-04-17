/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * @license
 * Copyright 2022 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.Runtime=exports.Extensions=void 0;const extensions_api_client_internal_1=require("./extensions-api-client-internal"),validator=require("../utils/validator");class Extensions{constructor(e){this.app=e,this.client=new extensions_api_client_internal_1.ExtensionsApiClient(e)}runtime(){return new Runtime(this.client)}}exports.Extensions=Extensions;class Runtime{constructor(e){if(this.projectId=this.getProjectId(),!validator.isNonEmptyString(process.env.EXT_INSTANCE_ID))throw new extensions_api_client_internal_1.FirebaseExtensionsError("invalid-argument","Runtime is only available from within a running Extension instance.");if(this.extensionInstanceId=process.env.EXT_INSTANCE_ID,!validator.isNonNullObject(e)||!("updateRuntimeData"in e))throw new extensions_api_client_internal_1.FirebaseExtensionsError("invalid-argument","Must provide a valid ExtensionsApiClient instance to create a new Runtime.");this.client=e}async setProcessingState(e,t){await this.client.updateRuntimeData(this.projectId,this.extensionInstanceId,{processingState:{state:e,detailMessage:t}})}async setFatalError(e){if(!validator.isNonEmptyString(e))throw new extensions_api_client_internal_1.FirebaseExtensionsError("invalid-argument","errorMessage must not be empty");await this.client.updateRuntimeData(this.projectId,this.extensionInstanceId,{fatalError:{errorMessage:e}})}getProjectId(){const e=process.env.PROJECT_ID;if(!validator.isNonEmptyString(e))throw new extensions_api_client_internal_1.FirebaseExtensionsError("invalid-argument","PROJECT_ID must not be undefined in Extensions runtime environment");return e}}exports.Runtime=Runtime;