/*! firebase-admin v12.7.0 */
/*!
 * Copyright 2024 Google Inc.
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
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ValueImpl=void 0;class ValueImpl{constructor(e,l=ValueImpl.DEFAULT_VALUE_FOR_STRING){this.source=e,this.value=l}asString(){return this.value}asBoolean(){return"static"===this.source?ValueImpl.DEFAULT_VALUE_FOR_BOOLEAN:ValueImpl.BOOLEAN_TRUTHY_VALUES.indexOf(this.value.toLowerCase())>=0}asNumber(){if("static"===this.source)return ValueImpl.DEFAULT_VALUE_FOR_NUMBER;const e=Number(this.value);return isNaN(e)?ValueImpl.DEFAULT_VALUE_FOR_NUMBER:e}getSource(){return this.source}}exports.ValueImpl=ValueImpl,ValueImpl.DEFAULT_VALUE_FOR_BOOLEAN=!1,ValueImpl.DEFAULT_VALUE_FOR_STRING="",ValueImpl.DEFAULT_VALUE_FOR_NUMBER=0,ValueImpl.BOOLEAN_TRUTHY_VALUES=["1","true","t","yes","y","on"];