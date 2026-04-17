/*! firebase-admin v12.7.0 */
"use strict";
/*!
 * @license
 * Copyright 2017 Google Inc.
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
 */function deepCopy(e){return deepExtend(void 0,e)}function deepExtend(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=deepExtend(e[r],t[r]));return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.deepExtend=exports.deepCopy=void 0,exports.deepCopy=deepCopy,exports.deepExtend=deepExtend;