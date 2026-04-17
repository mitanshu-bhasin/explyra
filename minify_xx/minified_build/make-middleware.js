"use strict";
/*!
 * Copyright 2018 Google LLC
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeMiddleware=makeMiddleware;const onFinished=require("on-finished"),context_1=require("../../utils/context"),http_request_1=require("../../utils/http-request");function makeMiddleware(e,t,r){return(n,a,s)=>{const o=Date.now(),i=(0,context_1.getOrInjectContext)(n,e,!0);n.log=t(i.trace,i.spanId,i.traceSampled),r&&onFinished(a,()=>{const e=Date.now()-o,t=(0,http_request_1.makeHttpRequestData)(n,a,e);r(t,i.trace,i.spanId,i.traceSampled)}),s()}}