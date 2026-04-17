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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.toCloudEventProtoFormat=exports.FirebaseEventarcError=void 0;const error_1=require("../utils/error"),uuid_1=require("uuid"),validator=require("../utils/validator"),TOP_LEVEL_CE_ATTRS=["id","type","specversion","source","data","time","datacontenttype","subject"];class FirebaseEventarcError extends error_1.PrefixedFirebaseError{constructor(t,e){super("eventarc",t,e)}}function toCloudEventProtoFormat(t){const e=t.source??process.env.EVENTARC_CLOUD_EVENT_SOURCE;if(void 0===e||!validator.isNonEmptyString(e))throw new FirebaseEventarcError("invalid-argument","CloudEvent 'source' is required.");if(!validator.isNonEmptyString(t.type))throw new FirebaseEventarcError("invalid-argument","CloudEvent 'type' is required.");const r={"@type":"type.googleapis.com/io.cloudevents.v1.CloudEvent",id:t.id??(0,uuid_1.v4)(),type:t.type,specVersion:t.specversion??"1.0",source:e};if(void 0!==t.time){if(!validator.isISODateString(t.time))throw new FirebaseEventarcError("invalid-argument","CloudEvent 'tyme' must be in ISO date format.");setAttribute(r,"time",{ceTimestamp:t.time})}else setAttribute(r,"time",{ceTimestamp:(new Date).toISOString()});if(void 0!==t.datacontenttype){if(!validator.isNonEmptyString(t.datacontenttype))throw new FirebaseEventarcError("invalid-argument","CloudEvent 'datacontenttype' if specified must be non-empty string.");setAttribute(r,"datacontenttype",{ceString:t.datacontenttype})}if(t.subject){if(!validator.isNonEmptyString(t.subject))throw new FirebaseEventarcError("invalid-argument","CloudEvent 'subject' if specified must be non-empty string.");setAttribute(r,"subject",{ceString:t.subject})}if(void 0===t.data)throw new FirebaseEventarcError("invalid-argument","CloudEvent 'data' is required.");if(validator.isObject(t.data))r.textData=JSON.stringify(t.data),t.datacontenttype||setAttribute(r,"datacontenttype",{ceString:"application/json"});else{if(!validator.isNonEmptyString(t.data))throw new FirebaseEventarcError("invalid-argument",`CloudEvent 'data' must be string or an object (which are converted to JSON), got '${typeof t.data}'.`);r.textData=t.data,t.datacontenttype||setAttribute(r,"datacontenttype",{ceString:"text/plain"})}for(const e in t)if(!TOP_LEVEL_CE_ATTRS.includes(e)){if(!validator.isNonEmptyString(t[e]))throw new FirebaseEventarcError("invalid-argument",`CloudEvent extension attributes ('${e}') must be string.`);setAttribute(r,e,{ceString:t[e]})}return r}function setAttribute(t,e,r){Object.prototype.hasOwnProperty.call(t,"attributes")||(t.attributes={}),t.attributes[e]=r}exports.FirebaseEventarcError=FirebaseEventarcError,exports.toCloudEventProtoFormat=toCloudEventProtoFormat;