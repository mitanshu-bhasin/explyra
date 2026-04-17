"use strict";
/*!
 * Copyright 2021 Google LLC
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
 */function makeHttpRequestData(e,t,r){let s,a,n,l,u,o,i,d;if(e.url&&(s=e.url),"originalUrl"in e&&e.originalUrl&&(s=e.originalUrl),s)try{a=new URL(s).protocol}catch(e){}return e.method&&(n=e.method),e.headers&&e.headers["user-agent"]&&(e.headers["user-agent"]&&(l=e.headers["user-agent"]),e.headers.referer&&(u=e.headers.referer)),t&&(t.statusCode&&(o=t.statusCode),i=t.getHeader&&Number(t.getHeader("Content-Length"))||0),r&&(d={seconds:Math.floor(r/1e3),nanos:Math.floor(r%1e3*1e6)}),Object.assign({},s?{requestUrl:s}:null,a?{protocol:a}:null,n?{requestMethod:n}:null,l?{userAgent:l}:null,u?{referer:u}:null,i?{responseSize:i}:null,o?{status:o}:null,d?{latency:d}:null)}function isRawHttpRequest(e){return!(!e||!("originalUrl"in e||"headers"in e||"method"in e||"url"in e))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeHttpRequestData=makeHttpRequestData,exports.isRawHttpRequest=isRawHttpRequest;