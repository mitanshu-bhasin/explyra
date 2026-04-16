/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * Copyright 2018 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.IosApp=void 0;const error_1=require("../utils/error"),validator=require("../utils/validator"),project_management_api_request_internal_1=require("./project-management-api-request-internal"),app_metadata_1=require("./app-metadata");class IosApp{constructor(e,t){if(this.appId=e,this.requestHandler=t,!validator.isNonEmptyString(e))throw new error_1.FirebaseProjectManagementError("invalid-argument","appId must be a non-empty string.");this.resourceName=`projects/-/iosApps/${e}`}getMetadata(){return this.requestHandler.getResource(this.resourceName).then(e=>((0,project_management_api_request_internal_1.assertServerResponse)(validator.isNonNullObject(e),e,"getMetadata()'s responseData must be a non-null object."),["name","appId","projectId","bundleId"].forEach(t=>{(0,project_management_api_request_internal_1.assertServerResponse)(validator.isNonEmptyString(e[t]),e,`getMetadata()'s responseData.${t} must be a non-empty string.`)}),{platform:app_metadata_1.AppPlatform.IOS,resourceName:e.name,appId:e.appId,displayName:e.displayName||null,projectId:e.projectId,bundleId:e.bundleId}))}setDisplayName(e){return this.requestHandler.setDisplayName(this.resourceName,e)}getConfig(){return this.requestHandler.getConfig(this.resourceName).then(e=>{(0,project_management_api_request_internal_1.assertServerResponse)(validator.isNonNullObject(e),e,"getConfig()'s responseData must be a non-null object.");const t=e.configFileContents;return(0,project_management_api_request_internal_1.assertServerResponse)(validator.isBase64String(t),e,"getConfig()'s responseData.configFileContents must be a base64 string."),Buffer.from(t,"base64").toString("utf8")})}}exports.IosApp=IosApp;