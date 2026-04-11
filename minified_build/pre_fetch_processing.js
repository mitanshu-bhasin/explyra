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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.hasVertexAISearch=exports.hasVertexRagStore=exports.getApiVersion=exports.validateGenerationConfig=exports.validateGenerateContentRequest=exports.formatContentRequest=void 0;const errors_1=require("../types/errors"),constants=require("../util/constants");function formatContentRequest(e,t,r){return"string"==typeof e?{contents:[{role:constants.USER_ROLE,parts:[{text:e}]}],generationConfig:t,safetySettings:r}:e}function validateGenerateContentRequest(e){if(hasVertexAISearch(e)&&hasVertexRagStore(e))throw new errors_1.ClientError("Found both vertexAiSearch and vertexRagStore field are set in tool. Either set vertexAiSearch or vertexRagStore.")}function validateGenerationConfig(e){return"topK"in e&&(e.topK>0&&e.topK<=40||delete e.topK),e}function getApiVersion(e){return hasVertexRagStore(e)||hasCachedContent(e)?"v1beta1":"v1"}function hasVertexRagStore(e){var t;for(const r of null!==(t=null==e?void 0:e.tools)&&void 0!==t?t:[]){const e=r.retrieval;if(e&&e.vertexRagStore)return!0}return!1}function hasCachedContent(e){return!!e.cachedContent}function hasVertexAISearch(e){var t;for(const r of null!==(t=null==e?void 0:e.tools)&&void 0!==t?t:[]){const e=r.retrieval;if(e&&e.vertexAiSearch)return!0}return!1}exports.formatContentRequest=formatContentRequest,exports.validateGenerateContentRequest=validateGenerateContentRequest,exports.validateGenerationConfig=validateGenerationConfig,exports.getApiVersion=getApiVersion,exports.hasVertexRagStore=hasVertexRagStore,exports.hasVertexAISearch=hasVertexAISearch;