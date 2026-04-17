"use strict";
/*!
 * Copyright 2024 Google LLC. All Rights Reserved.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.ExplainResults=exports.ExplainMetrics=exports.ExecutionStats=exports.PlanSummary=void 0;class PlanSummary{constructor(t){this.indexesUsed=t}static _fromProto(t,s){const e=[];if(t&&t.indexesUsed)for(const o of t.indexesUsed)e.push(s.decodeGoogleProtobufStruct(o));return new PlanSummary(e)}}exports.PlanSummary=PlanSummary;class ExecutionStats{constructor(t,s,e,o){this.resultsReturned=t,this.executionDuration=s,this.readOperations=e,this.debugStats=o}static _fromProto(t,s){var e,o;return t?new ExecutionStats(Number(t.resultsReturned),{seconds:Number(null===(e=t.executionDuration)||void 0===e?void 0:e.seconds),nanoseconds:Number(null===(o=t.executionDuration)||void 0===o?void 0:o.nanos)},Number(t.readOperations),s.decodeGoogleProtobufStruct(t.debugStats)):null}}exports.ExecutionStats=ExecutionStats;class ExplainMetrics{constructor(t,s){this.planSummary=t,this.executionStats=s}static _fromProto(t,s){return new ExplainMetrics(PlanSummary._fromProto(t.planSummary,s),ExecutionStats._fromProto(t.executionStats,s))}}exports.ExplainMetrics=ExplainMetrics;class ExplainResults{constructor(t,s){this.metrics=t,this.snapshot=s}}exports.ExplainResults=ExplainResults;