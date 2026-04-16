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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.Channel=exports.Eventarc=void 0;const validator=require("../utils/validator"),eventarc_utils_1=require("./eventarc-utils"),eventarc_client_internal_1=require("./eventarc-client-internal");class Eventarc{constructor(e){if(!validator.isNonNullObject(e)||!("options"in e))throw new eventarc_utils_1.FirebaseEventarcError("invalid-argument","First argument passed to Eventarc() must be a valid Firebase app instance.");this.appInternal=e}get app(){return this.appInternal}channel(e,t){let n,r,a;if(n=validator.isNonEmptyString(e)?e:"locations/us-central1/channels/firebase",r=validator.isNonNullObject(e)?e:t,"string"==typeof r?.allowedEventTypes)a=r.allowedEventTypes.split(",");else if(validator.isArray(r?.allowedEventTypes))a=r?.allowedEventTypes;else if(void 0!==r?.allowedEventTypes)throw new eventarc_utils_1.FirebaseEventarcError("invalid-argument","AllowedEventTypes must be either an array of strings or a comma separated string.");return new Channel(this,n,a)}}exports.Eventarc=Eventarc;class Channel{constructor(e,t,n){if(!validator.isNonNullObject(e))throw new eventarc_utils_1.FirebaseEventarcError("invalid-argument","First argument passed to Channel() must be a valid Eventarc service instance.");if(!validator.isNonEmptyString(t))throw new eventarc_utils_1.FirebaseEventarcError("invalid-argument","name is required.");this.nameInternal=t,this.eventarcInternal=e,this.allowedEventTypes=n,this.client=new eventarc_client_internal_1.EventarcApiClient(e.app,this)}get eventarc(){return this.eventarcInternal}get name(){return this.nameInternal}publish(e){return this.client.publish(e)}}exports.Channel=Channel;