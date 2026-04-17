/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * Copyright 2020 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.InstanceId=void 0;const installations_1=require("../installations"),error_1=require("../utils/error"),validator=require("../utils/validator");class InstanceId{constructor(e){if(!validator.isNonNullObject(e)||!("options"in e))throw new error_1.FirebaseInstanceIdError(error_1.InstanceIdClientErrorCode.INVALID_ARGUMENT,"First argument passed to instanceId() must be a valid Firebase app instance.");this.app_=e}deleteInstanceId(e){return(0,installations_1.getInstallations)(this.app).deleteInstallation(e).catch(e=>{if(e instanceof error_1.FirebaseInstallationsError){let r=e.code.replace("installations/","");throw r===error_1.InstallationsClientErrorCode.INVALID_INSTALLATION_ID.code&&(r=error_1.InstanceIdClientErrorCode.INVALID_INSTANCE_ID.code),new error_1.FirebaseInstanceIdError({code:r,message:e.message})}throw e})}get app(){return this.app_}}exports.InstanceId=InstanceId;