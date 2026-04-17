"use strict";
/*!
 * Copyright 2018 Google Inc. All Rights Reserved.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.DocumentChange=void 0;class DocumentChange{constructor(e,t,n,s){this._type=e,this._document=t,this._oldIndex=n,this._newIndex=s}get type(){return this._type}get doc(){return this._document}get oldIndex(){return this._oldIndex}get newIndex(){return this._newIndex}isEqual(e){return this===e||e instanceof DocumentChange&&this._type===e._type&&this._oldIndex===e._oldIndex&&this._newIndex===e._newIndex&&this._document.isEqual(e._document)}}exports.DocumentChange=DocumentChange;