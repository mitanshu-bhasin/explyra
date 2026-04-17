/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * Copyright 2019 Google Inc.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.getErrorCode=exports.createFirebaseError=void 0;const error_1=require("../utils/error"),validator=require("../utils/validator");function createFirebaseError(r){if(r.response.isJson()){const e=r.response.data,o=getErrorCode(e),s=getErrorMessage(e);return error_1.FirebaseMessagingError.fromServerError(o,s,e)}let e;switch(r.response.status){case 400:e=error_1.MessagingClientErrorCode.INVALID_ARGUMENT;break;case 401:case 403:e=error_1.MessagingClientErrorCode.AUTHENTICATION_ERROR;break;case 500:e=error_1.MessagingClientErrorCode.INTERNAL_ERROR;break;case 503:e=error_1.MessagingClientErrorCode.SERVER_UNAVAILABLE;break;default:e=error_1.MessagingClientErrorCode.UNKNOWN_ERROR}return new error_1.FirebaseMessagingError({code:e.code,message:`${e.message} Raw server response: "${r.response.text}". Status code: ${r.response.status}.`})}function getErrorCode(r){if(validator.isNonNullObject(r)&&"error"in r){const e=r.error;if(validator.isString(e))return e;if(validator.isArray(e.details)){const r="type.googleapis.com/google.firebase.fcm.v1.FcmError";for(const o of e.details)if(o["@type"]===r)return o.errorCode}return"status"in e?e.status:e.message}return null}function getErrorMessage(r){return validator.isNonNullObject(r)&&"error"in r&&validator.isNonEmptyString(r.error.message)?r.error.message:null}exports.createFirebaseError=createFirebaseError,exports.getErrorCode=getErrorCode;