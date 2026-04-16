"use strict";
/**
 * @license
 * Copyright 2019 Google LLC
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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.getAgent=exports.pool=void 0;const http_1=require("http"),https_1=require("https"),url_1=require("url");function shouldUseProxyForURI(t){const e=process.env.NO_PROXY||process.env.no_proxy;if(!e)return!0;const r=new URL(t);for(const t of e.split(",")){const e=t.trim();if(e===r.origin||e===r.hostname)return!1;if(e.startsWith("*.")||e.startsWith(".")){const t=e.replace(/^\*\./,".");if(r.hostname.endsWith(t))return!1}}return!0}function getAgent(t,e){const r=t.startsWith("http://"),o=e.proxy||process.env.HTTP_PROXY||process.env.http_proxy||process.env.HTTPS_PROXY||process.env.https_proxy,s=Object.assign({},e.pool),p=!!e.proxy||shouldUseProxyForURI(t);if(o&&p){return new(r?require("http-proxy-agent"):require("https-proxy-agent"))({...(0,url_1.parse)(o),...s})}let n=r?"http":"https";if(e.forever&&(n+=":forever",!exports.pool.has(n))){const t=r?http_1.Agent:https_1.Agent;exports.pool.set(n,new t({...s,keepAlive:!0}))}return exports.pool.get(n)}exports.pool=new Map,exports.getAgent=getAgent;