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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.FunctionDeclarationSchemaType=exports.Mode=exports.FinishReason=exports.BlockedReason=exports.HarmSeverity=exports.HarmProbability=exports.HarmBlockThreshold=exports.HarmCategory=void 0;const common_1=require("./common");var HarmCategory,HarmBlockThreshold,HarmProbability,HarmSeverity,BlockedReason,FinishReason,Mode;!function(E){E.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",E.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",E.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",E.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",E.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT"}(HarmCategory||(exports.HarmCategory=HarmCategory={})),function(E){E.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",E.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",E.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",E.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",E.BLOCK_NONE="BLOCK_NONE",E.OFF="OFF"}(HarmBlockThreshold||(exports.HarmBlockThreshold=HarmBlockThreshold={})),function(E){E.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",E.NEGLIGIBLE="NEGLIGIBLE",E.LOW="LOW",E.MEDIUM="MEDIUM",E.HIGH="HIGH"}(HarmProbability||(exports.HarmProbability=HarmProbability={})),function(E){E.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",E.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",E.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",E.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",E.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"}(HarmSeverity||(exports.HarmSeverity=HarmSeverity={})),function(E){E.BLOCKED_REASON_UNSPECIFIED="BLOCK_REASON_UNSPECIFIED",E.SAFETY="SAFETY",E.OTHER="OTHER",E.BLOCKLIST="BLOCKLIST",E.PROHIBITED_CONTENT="PROHIBITED_CONTENT"}(BlockedReason||(exports.BlockedReason=BlockedReason={})),function(E){E.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",E.STOP="STOP",E.MAX_TOKENS="MAX_TOKENS",E.SAFETY="SAFETY",E.RECITATION="RECITATION",E.OTHER="OTHER",E.BLOCKLIST="BLOCKLIST",E.PROHIBITED_CONTENT="PROHIBITED_CONTENT",E.SPII="SPII"}(FinishReason||(exports.FinishReason=FinishReason={})),function(E){E.MODE_UNSPECIFIED="MODE_UNSPECIFIED",E.MODE_DYNAMIC="MODE_DYNAMIC"}(Mode||(exports.Mode=Mode={})),exports.FunctionDeclarationSchemaType={...common_1.SchemaType};