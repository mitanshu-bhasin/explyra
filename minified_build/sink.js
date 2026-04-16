"use strict";
/*!
 * Copyright 2015 Google Inc. All Rights Reserved.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.Sink=void 0;const promisify_1=require("@google-cloud/promisify"),extend=require("extend");class Sink{constructor(t,e){this.logging=t,this.name=e,this.formattedName_="projects/"+t.projectId+"/sinks/"+e}create(t){return this.logging.createSink(this.name,t)}async delete(t){const e=await this.logging.auth.getProjectId();this.formattedName_="projects/"+e+"/sinks/"+this.name;const i={sinkName:this.formattedName_};return this.logging.configService.deleteSink(i,t)}async getMetadata(t){const e=await this.logging.auth.getProjectId();this.formattedName_="projects/"+e+"/sinks/"+this.name;const i={sinkName:this.formattedName_};return[this.metadata]=await this.logging.configService.getSink(i,t),[this.metadata]}setFilter(t){return this.setMetadata({filter:t})}async setMetadata(t){const[e]=await this.getMetadata(),i=t.uniqueWriterIdentity;delete t.uniqueWriterIdentity;let a={sinkName:this.formattedName_,sink:extend({},e,t)};return delete a.sink.gaxOptions,a={...a,...i&&{uniqueWriterIdentity:i}},[this.metadata]=await this.logging.configService.updateSink(a,t.gaxOptions),[this.metadata]}}exports.Sink=Sink,
/*! Developer Documentation
 *
 * All async methods (except for streams) will call a callbakc in the event
 * that a callback is provided.
 */
/*! Developer Documentation
 *
 * All async methods (except for streams) will call a callbakc in the event
 * that a callback is provided.
 */
(0,promisify_1.callbackifyAll)(Sink);