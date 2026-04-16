/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * Copyright 2021 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.Installations=void 0;const error_1=require("../utils/error"),installations_request_handler_1=require("./installations-request-handler"),validator=require("../utils/validator");class Installations{constructor(t){if(!validator.isNonNullObject(t)||!("options"in t))throw new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.INVALID_ARGUMENT,"First argument passed to admin.installations() must be a valid Firebase app instance.");this.app_=t,this.requestHandler=new installations_request_handler_1.FirebaseInstallationsRequestHandler(t)}deleteInstallation(t){return this.requestHandler.deleteInstallation(t)}get app(){return this.app_}}exports.Installations=Installations;