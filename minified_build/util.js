"use strict";
/**
 * @license
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.addCommonProtos=exports.loadProtosWithOptionsSync=exports.loadProtosWithOptions=void 0;const fs=require("fs"),path=require("path"),Protobuf=require("protobufjs");function addIncludePathResolver(o,t){const e=o.resolvePath;o.resolvePath=(o,r)=>{if(path.isAbsolute(r))return r;for(const o of t){const t=path.join(o,r);try{return fs.accessSync(t,fs.constants.R_OK),t}catch(o){continue}}return process.emitWarning(`${r} not found in any of the include paths ${t}`),e(o,r)}}async function loadProtosWithOptions(o,t){const e=new Protobuf.Root;if((t=t||{}).includeDirs){if(!Array.isArray(t.includeDirs))return Promise.reject(new Error("The includeDirs option must be an array"));addIncludePathResolver(e,t.includeDirs)}const r=await e.load(o,t);return r.resolveAll(),r}function loadProtosWithOptionsSync(o,t){const e=new Protobuf.Root;if((t=t||{}).includeDirs){if(!Array.isArray(t.includeDirs))throw new Error("The includeDirs option must be an array");addIncludePathResolver(e,t.includeDirs)}const r=e.loadSync(o,t);return r.resolveAll(),r}function addCommonProtos(){const o=require("protobufjs/google/protobuf/api.json"),t=require("protobufjs/google/protobuf/descriptor.json"),e=require("protobufjs/google/protobuf/source_context.json"),r=require("protobufjs/google/protobuf/type.json");Protobuf.common("api",o.nested.google.nested.protobuf.nested),Protobuf.common("descriptor",t.nested.google.nested.protobuf.nested),Protobuf.common("source_context",e.nested.google.nested.protobuf.nested),Protobuf.common("type",r.nested.google.nested.protobuf.nested)}exports.loadProtosWithOptions=loadProtosWithOptions,exports.loadProtosWithOptionsSync=loadProtosWithOptionsSync,exports.addCommonProtos=addCommonProtos;