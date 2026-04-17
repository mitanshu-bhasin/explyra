"use strict";
/*!
 * Copyright 2021 Google LLC
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.Severity=void 0,exports.snakecaseKeys=snakecaseKeys,exports.assignSeverityToEntries=assignSeverityToEntries,exports.formatLogName=formatLogName;const entry_1=require("../entry"),extend=require("extend"),arrify=require("arrify");var Severity;function snakecaseKeys(e){for(const r in e){const t=r.replace(/[A-Z]/g,e=>`_${e.toLowerCase()}`);Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(e,r)),t!==r&&delete e[r]}return e}function assignSeverityToEntries(e,r){return arrify(e).map(e=>{const t=extend(!0,{},e.metadata,{severity:r});return extend(new entry_1.Entry,e,{metadata:t})})}function formatLogName(e,r){const t="projects/"+e+"/logs/";return r=r.replace(t,""),decodeURIComponent(r)===r&&(r=encodeURIComponent(r)),t+r}!function(e){e[e.emergency=0]="emergency",e[e.alert=1]="alert",e[e.critical=2]="critical",e[e.error=3]="error",e[e.warning=4]="warning",e[e.notice=5]="notice",e[e.info=6]="info",e[e.debug=7]="debug"}(Severity||(exports.Severity=Severity={}));