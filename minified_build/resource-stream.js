"use strict";
/*!
 * Copyright 2019 Google Inc. All Rights Reserved.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.ResourceStream=void 0;const stream_1=require("stream");class ResourceStream extends stream_1.Transform{constructor(e,s){super(Object.assign({objectMode:!0},e.streamOptions)),this._ended=!1,this._maxApiCalls=-1===e.maxApiCalls?1/0:e.maxApiCalls,this._nextQuery=e.query,this._reading=!1,this._requestFn=s,this._requestsMade=0,this._resultsToSend=-1===e.maxResults?1/0:e.maxResults,this._otherArgs=[]}end(...e){return this._ended=!0,super.end(...e)}_read(){if(!this._reading){this._reading=!0;try{this._requestFn(this._nextQuery,(e,s,t,...r)=>{if(e)return void this.destroy(e);this._otherArgs=r,this._nextQuery=t,this._resultsToSend!==1/0&&(s=s.splice(0,this._resultsToSend),this._resultsToSend-=s.length);let i=!0;for(const e of s){if(this._ended)break;i=this.push(e)}const h=!this._nextQuery||this._resultsToSend<1,n=++this._requestsMade>=this._maxApiCalls;(h||n)&&this.end(),i&&!this._ended&&setImmediate(()=>this._read()),this._reading=!1})}catch(e){this.destroy(e)}}}}exports.ResourceStream=ResourceStream;