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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.GeoPoint=void 0;const validate_1=require("./validate");class GeoPoint{constructor(t,e){(0,validate_1.validateNumber)("latitude",t,{minValue:-90,maxValue:90}),(0,validate_1.validateNumber)("longitude",e,{minValue:-180,maxValue:180}),this._latitude=t,this._longitude=e}get latitude(){return this._latitude}get longitude(){return this._longitude}isEqual(t){return this===t||t instanceof GeoPoint&&this.latitude===t.latitude&&this.longitude===t.longitude}toProto(){return{geoPointValue:{latitude:this.latitude,longitude:this.longitude}}}static fromProto(t){return new GeoPoint(t.latitude||0,t.longitude||0)}}exports.GeoPoint=GeoPoint;