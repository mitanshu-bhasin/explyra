"use strict";
/*!
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.timestampFromJson=timestampFromJson,exports.detectValueType=detectValueType,exports.detectGoogleProtobufValueType=detectGoogleProtobufValueType,exports.valueFromJson=valueFromJson,exports.fieldsFromJson=fieldsFromJson;const validate_1=require("./validate"),map_type_1=require("./map-type");
/*!
 * @module firestore/convert
 * @private
 * @internal
 *
 * This module contains utility functions to convert
 * `firestore.v1.Documents` from Proto3 JSON to their equivalent
 * representation in Protobuf JS. Protobuf JS is the only encoding supported by
 * this client, and dependencies that use Proto3 JSON (such as the Google Cloud
 * Functions SDK) are supported through this conversion and its usage in
 * {@see Firestore#snapshot_}.
 */function timestampFromJson(e,a){let t={};if("string"==typeof e){const u=new Date(e),o=Math.floor(u.getTime()/1e3);let l=0;if(e.length>20){const a=e.substring(20,e.length-1),t=9-a.length;l=Number(a)*Math.pow(10,t)}if(isNaN(o)||isNaN(l))throw a=a||"timestampValue",new Error(`Specify a valid ISO 8601 timestamp for "${a}".`);t={seconds:o||void 0,nanos:l||void 0}}else void 0!==e&&((0,validate_1.validateObject)("timestampValue",e),t={seconds:e.seconds||void 0,nanos:e.nanos||void 0});return t}function bytesFromJson(e){return"string"==typeof e?Buffer.from(e,"base64"):e}function detectValueType(e){var a;let t;if(e.valueType)t=e.valueType;else{const a=[];if(void 0!==e.stringValue&&a.push("stringValue"),void 0!==e.booleanValue&&a.push("booleanValue"),void 0!==e.integerValue&&a.push("integerValue"),void 0!==e.doubleValue&&a.push("doubleValue"),void 0!==e.timestampValue&&a.push("timestampValue"),void 0!==e.referenceValue&&a.push("referenceValue"),void 0!==e.arrayValue&&a.push("arrayValue"),void 0!==e.nullValue&&a.push("nullValue"),void 0!==e.mapValue&&a.push("mapValue"),void 0!==e.geoPointValue&&a.push("geoPointValue"),void 0!==e.bytesValue&&a.push("bytesValue"),1!==a.length)throw new Error(`Unable to infer type value from '${JSON.stringify(e)}'.`);t=a[0]}if("mapValue"===t){const u=null===(a=e.mapValue)||void 0===a?void 0:a.fields;u&&-1!==Object.keys(u).indexOf(map_type_1.RESERVED_MAP_KEY)&&"stringValue"===detectValueType(u[map_type_1.RESERVED_MAP_KEY])&&u[map_type_1.RESERVED_MAP_KEY].stringValue===map_type_1.RESERVED_MAP_KEY_VECTOR_VALUE&&(t="vectorValue")}return t}function detectGoogleProtobufValueType(e){const a=[];if(void 0!==e.nullValue&&a.push("nullValue"),void 0!==e.numberValue&&a.push("numberValue"),void 0!==e.stringValue&&a.push("stringValue"),void 0!==e.boolValue&&a.push("boolValue"),void 0!==e.structValue&&a.push("structValue"),void 0!==e.listValue&&a.push("listValue"),1!==a.length)throw new Error(`Unable to infer type value from '${JSON.stringify(e)}'.`);return a[0]}function valueFromJson(e){switch(detectValueType(e)){case"timestampValue":return{timestampValue:timestampFromJson(e.timestampValue)};case"bytesValue":return{bytesValue:bytesFromJson(e.bytesValue)};case"doubleValue":return{doubleValue:Number(e.doubleValue)};case"arrayValue":{const a=[];if(Array.isArray(e.arrayValue.values))for(const t of e.arrayValue.values)a.push(valueFromJson(t));return{arrayValue:{values:a}}}case"mapValue":case"vectorValue":{const a={},t=e.mapValue.fields;if(t)for(const u of Object.keys(t))a[u]=valueFromJson(e.mapValue.fields[u]);return{mapValue:{fields:a}}}default:return e}}function fieldsFromJson(e){const a={};for(const t of Object.keys(e))a[t]=valueFromJson(e[t]);return a}