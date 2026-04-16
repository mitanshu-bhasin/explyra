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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.LogSync=void 0;const entry_1=require("./entry"),instrumentation_1=require("./utils/instrumentation"),log_common_1=require("./utils/log-common");class LogSync{constructor(t,e,o,s){var i;s=s||{},this.formattedName_=(0,log_common_1.formatLogName)(t.projectId,e),this.logging=t,this.name=this.formattedName_.split("/").pop(),this.transport=o||process.stdout,this.useMessageField_=null===(i=s.useMessageField)||void 0===i||i}alert(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"ALERT"),e)}critical(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"CRITICAL"),e)}debug(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"DEBUG"),e)}emergency(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"EMERGENCY"),e)}entry(t,e){let o;return!e&&null!==t&&Object.prototype.hasOwnProperty.call(t,"httpRequest")?(o=t,e={}):e?o=t:(e=t,o={}),this.logging.entry(o,e)}error(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"ERROR"),e)}info(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"INFO"),e)}notice(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"NOTICE"),e)}warning(t,e){this.write((0,log_common_1.assignSeverityToEntries)(t,"WARNING"),e)}write(t,e){var o;const s=e||{};let i;this.formattedName_=(0,log_common_1.formatLogName)(this.logging.projectId,this.name);try{i=(0,instrumentation_1.populateInstrumentationInfo)(t)[0].map(t=>(t instanceof entry_1.Entry||(t=this.entry(t)),t.toStructuredJSON(this.logging.projectId,this.useMessageField_)));for(const t of i)t.logName=this.formattedName_,t.resource=(0,log_common_1.snakecaseKeys)(null===(o=s.resource)||void 0===o?void 0:o.labels)||t.resource||this.logging.detectedResource,t[entry_1.LABELS_KEY]=s.labels||t[entry_1.LABELS_KEY],this.transport.write(JSON.stringify(t)+"\n")}catch(t){}}}exports.LogSync=LogSync;