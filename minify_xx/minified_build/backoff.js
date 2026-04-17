"use strict";
/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.ExponentialBackoff=exports.delayExecution=exports.MAX_RETRY_ATTEMPTS=exports.DEFAULT_BACKOFF_FACTOR=exports.DEFAULT_BACKOFF_MAX_DELAY_MS=exports.DEFAULT_BACKOFF_INITIAL_DELAY_MS=void 0,exports.setTimeoutHandler=setTimeoutHandler;const logger_1=require("./logger");
/*!
 * The default initial backoff time in milliseconds after an error.
 * Set to 1s according to https://cloud.google.com/apis/design/errors.
 */exports.DEFAULT_BACKOFF_INITIAL_DELAY_MS=1e3,
/*!
 * The default maximum backoff time in milliseconds.
 */
exports.DEFAULT_BACKOFF_MAX_DELAY_MS=6e4,
/*!
 * The default factor to increase the backup by after each failed attempt.
 */
exports.DEFAULT_BACKOFF_FACTOR=1.5;
/*!
 * The default jitter to distribute the backoff attempts by (0 means no
 * randomization, 1.0 means +/-50% randomization).
 */
const DEFAULT_JITTER_FACTOR=1;
/*!
 * The maximum number of retries that will be attempted by backoff
 * before stopping all retry attempts.
 */function setTimeoutHandler(t){exports.delayExecution=(e,r)=>(t(e,r),{hasRef:()=>{throw new Error("For tests only. Not Implemented")},ref:()=>{throw new Error("For tests only. Not Implemented")},refresh:()=>{throw new Error("For tests only. Not Implemented")},unref:()=>{throw new Error("For tests only. Not Implemented")},[Symbol.toPrimitive]:()=>{throw new Error("For tests only. Not Implemented")}})}exports.MAX_RETRY_ATTEMPTS=10,
/*!
 * The timeout handler used by `ExponentialBackoff` and `BulkWriter`.
 */
exports.delayExecution=setTimeout;class ExponentialBackoff{constructor(t={}){this._retryCount=0,this.currentBaseMs=0,this.awaitingBackoffCompletion=!1,this.initialDelayMs=void 0!==t.initialDelayMs?t.initialDelayMs:exports.DEFAULT_BACKOFF_INITIAL_DELAY_MS,this.backoffFactor=void 0!==t.backoffFactor?t.backoffFactor:exports.DEFAULT_BACKOFF_FACTOR,this.maxDelayMs=void 0!==t.maxDelayMs?t.maxDelayMs:exports.DEFAULT_BACKOFF_MAX_DELAY_MS,this.jitterFactor=void 0!==t.jitterFactor?t.jitterFactor:1}reset(){this._retryCount=0,this.currentBaseMs=0}resetToMax(){this.currentBaseMs=this.maxDelayMs}backoffAndWait(){if(this.awaitingBackoffCompletion)return Promise.reject(new Error("A backoff operation is already in progress."));if(this.retryCount>exports.MAX_RETRY_ATTEMPTS)return Promise.reject(new Error("Exceeded maximum number of retries allowed."));const t=this.currentBaseMs+this.jitterDelayMs();return this.currentBaseMs>0&&(0,logger_1.logger)("ExponentialBackoff.backoffAndWait",null,`Backing off for ${t} ms (base delay: ${this.currentBaseMs} ms)`),this.currentBaseMs*=this.backoffFactor,this.currentBaseMs=Math.max(this.currentBaseMs,this.initialDelayMs),this.currentBaseMs=Math.min(this.currentBaseMs,this.maxDelayMs),this._retryCount+=1,new Promise(e=>{this.awaitingBackoffCompletion=!0,(0,exports.delayExecution)(()=>{this.awaitingBackoffCompletion=!1,e()},t)})}get retryCount(){return this._retryCount}jitterDelayMs(){return(Math.random()-.5)*this.jitterFactor*this.currentBaseMs}}exports.ExponentialBackoff=ExponentialBackoff;