"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RateLimiter=void 0;
/*!
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
 */
const assert=require("assert"),logger_1=require("./logger");class RateLimiter{constructor(i,t,e,a,s=Date.now()){this.initialCapacity=i,this.multiplier=t,this.multiplierMillis=e,this.maximumCapacity=a,this.startTimeMillis=s,this.availableTokens=i,this.lastRefillTimeMillis=s,this.previousCapacity=i}tryMakeRequest(i,t=Date.now()){return this.refillTokens(t),i<=this.availableTokens&&(this.availableTokens-=i,!0)}getNextRequestDelayMs(i,t=Date.now()){if(this.refillTokens(t),i<this.availableTokens)return 0;const e=this.calculateCapacity(t);if(e<i)return-1;const a=i-this.availableTokens;return Math.ceil(1e3*a/e)}refillTokens(i){if(!(i>=this.lastRefillTimeMillis))throw new Error("Request time should not be before the last token refill time.");{const t=i-this.lastRefillTimeMillis,e=this.calculateCapacity(i),a=Math.floor(t*e/1e3);a>0&&(this.availableTokens=Math.min(e,this.availableTokens+a),this.lastRefillTimeMillis=i)}}calculateCapacity(i){assert(i>=this.startTimeMillis,"startTime cannot be after currentTime");const t=i-this.startTimeMillis,e=Math.min(Math.floor(Math.pow(this.multiplier,Math.floor(t/this.multiplierMillis))*this.initialCapacity),this.maximumCapacity);return e!==this.previousCapacity&&(0,logger_1.logger)("RateLimiter.calculateCapacity",null,`New request capacity: ${e} operations per second.`),this.previousCapacity=e,e}}exports.RateLimiter=RateLimiter;