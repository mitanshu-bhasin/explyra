"use strict";
/**
 * @license
 * Copyright 2020 Google LLC
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.TeenyStatistics=exports.TeenyStatisticsWarning=void 0;class TeenyStatisticsWarning extends Error{constructor(t){super(t),this.threshold=0,this.type="",this.value=0,this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}exports.TeenyStatisticsWarning=TeenyStatisticsWarning,TeenyStatisticsWarning.CONCURRENT_REQUESTS="ConcurrentRequestsExceededWarning";class TeenyStatistics{constructor(t){this._concurrentRequests=0,this._didConcurrentRequestWarn=!1,this._options=TeenyStatistics._prepareOptions(t)}getOptions(){return Object.assign({},this._options)}setOptions(t){const e=this._options;return this._options=TeenyStatistics._prepareOptions(t),e}get counters(){return{concurrentRequests:this._concurrentRequests}}requestStarting(){if(this._concurrentRequests++,this._options.concurrentRequests>0&&this._concurrentRequests>=this._options.concurrentRequests&&!this._didConcurrentRequestWarn){this._didConcurrentRequestWarn=!0;const t=new TeenyStatisticsWarning("Possible excessive concurrent requests detected. "+this._concurrentRequests+" requests in-flight, which exceeds the configured threshold of "+this._options.concurrentRequests+". Use the TEENY_REQUEST_WARN_CONCURRENT_REQUESTS environment variable or the concurrentRequests option of teeny-request to increase or disable (0) this warning.");t.type=TeenyStatisticsWarning.CONCURRENT_REQUESTS,t.value=this._concurrentRequests,t.threshold=this._options.concurrentRequests,process.emitWarning(t)}}requestFinished(){this._concurrentRequests--}static _prepareOptions({concurrentRequests:t}={}){let e=this.DEFAULT_WARN_CONCURRENT_REQUESTS;const s=Number(process.env.TEENY_REQUEST_WARN_CONCURRENT_REQUESTS);return void 0!==t?e=t:Number.isNaN(s)||(e=s),{concurrentRequests:e}}}exports.TeenyStatistics=TeenyStatistics,TeenyStatistics.DEFAULT_WARN_CONCURRENT_REQUESTS=5e3;