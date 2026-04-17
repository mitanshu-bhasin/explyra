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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.FirebaseMachineLearningError=void 0;const error_1=require("../utils/error");class FirebaseMachineLearningError extends error_1.PrefixedFirebaseError{static fromOperationError(e,r){switch(e){case 1:return new FirebaseMachineLearningError("cancelled",r);case 2:default:return new FirebaseMachineLearningError("unknown-error",r);case 3:return new FirebaseMachineLearningError("invalid-argument",r);case 4:return new FirebaseMachineLearningError("deadline-exceeded",r);case 5:return new FirebaseMachineLearningError("not-found",r);case 6:return new FirebaseMachineLearningError("already-exists",r);case 7:return new FirebaseMachineLearningError("permission-denied",r);case 8:return new FirebaseMachineLearningError("resource-exhausted",r);case 9:return new FirebaseMachineLearningError("failed-precondition",r);case 10:return new FirebaseMachineLearningError("aborted",r);case 11:return new FirebaseMachineLearningError("out-of-range",r);case 13:return new FirebaseMachineLearningError("internal-error",r);case 14:return new FirebaseMachineLearningError("service-unavailable",r);case 15:return new FirebaseMachineLearningError("data-loss",r);case 16:return new FirebaseMachineLearningError("unauthenticated",r)}}constructor(e,r){super("machine-learning",e,r)}}exports.FirebaseMachineLearningError=FirebaseMachineLearningError;