"use strict";
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.countTokens=void 0;const errors_1=require("../types/errors"),constants=require("../util/constants"),post_fetch_processing_1=require("./post_fetch_processing"),post_request_1=require("./post_request");async function countTokens(e,t,o,s,r,n){const c=await(0,post_request_1.postRequest)({region:e,resourcePath:t,resourceMethod:constants.COUNT_TOKENS_METHOD,token:await o,data:s,apiEndpoint:r,requestOptions:n}).catch(e=>{throw new errors_1.GoogleGenerativeAIError("exception posting request",e)});return await(0,post_fetch_processing_1.throwErrorIfNotOK)(c).catch(e=>{throw e}),(0,post_fetch_processing_1.processCountTokenResponse)(c)}exports.countTokens=countTokens;