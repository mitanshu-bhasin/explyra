/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";const{fromCallback:fromCallback}=require("universalify"),Store=require("./store").Store,permuteDomain=require("./permuteDomain").permuteDomain,pathMatch=require("./pathMatch").pathMatch,{getCustomInspectSymbol:getCustomInspectSymbol,getUtilInspect:getUtilInspect}=require("./utilHelper");class MemoryCookieStore extends Store{constructor(){super(),this.synchronous=!0,this.idx=Object.create(null);const t=getCustomInspectSymbol();t&&(this[t]=this.inspect)}inspect(){return`{ idx: ${getUtilInspect(inspectFallback)(this.idx,!1,2)} }`}findCookie(t,e,o,i){return this.idx[t]&&this.idx[t][e]?i(null,this.idx[t][e][o]||null):i(null,void 0)}findCookies(t,e,o,i){const n=[];if("function"==typeof o&&(i=o,o=!0),!t)return i(null,[]);let r;r=e?function(t){Object.keys(t).forEach(o=>{if(pathMatch(e,o)){const e=t[o];for(const t in e)n.push(e[t])}})}:function(t){for(const e in t){const o=t[e];for(const t in o)n.push(o[t])}};const s=permuteDomain(t,o)||[t],l=this.idx;s.forEach(t=>{const e=l[t];e&&r(e)}),i(null,n)}putCookie(t,e){this.idx[t.domain]||(this.idx[t.domain]=Object.create(null)),this.idx[t.domain][t.path]||(this.idx[t.domain][t.path]=Object.create(null)),this.idx[t.domain][t.path][t.key]=t,e(null)}updateCookie(t,e,o){this.putCookie(e,o)}removeCookie(t,e,o,i){this.idx[t]&&this.idx[t][e]&&this.idx[t][e][o]&&delete this.idx[t][e][o],i(null)}removeCookies(t,e,o){return this.idx[t]&&(e?delete this.idx[t][e]:delete this.idx[t]),o(null)}removeAllCookies(t){return this.idx=Object.create(null),t(null)}getAllCookies(t){const e=[],o=this.idx;Object.keys(o).forEach(t=>{Object.keys(o[t]).forEach(i=>{Object.keys(o[t][i]).forEach(n=>{null!==n&&e.push(o[t][i][n])})})}),e.sort((t,e)=>(t.creationIndex||0)-(e.creationIndex||0)),t(null,e)}}function inspectFallback(t){const e=Object.keys(t);if(0===e.length)return"[Object: null prototype] {}";let o="[Object: null prototype] {\n";return Object.keys(t).forEach((i,n)=>{o+=formatDomain(i,t[i]),n<e.length-1&&(o+=","),o+="\n"}),o+="}",o}function formatDomain(t,e){let o=`  '${t}': [Object: null prototype] {\n`;return Object.keys(e).forEach((t,i,n)=>{o+=formatPath(t,e[t]),i<n.length-1&&(o+=","),o+="\n"}),o+="  }",o}function formatPath(t,e){const o="    ";let i=`${o}'${t}': [Object: null prototype] {\n`;return Object.keys(e).forEach((t,o,n)=>{const r=e[t];i+=`      ${t}: ${r.inspect()}`,o<n.length-1&&(i+=","),i+="\n"}),i+=`${o}}`,i}["findCookie","findCookies","putCookie","updateCookie","removeCookie","removeCookies","removeAllCookies","getAllCookies"].forEach(t=>{MemoryCookieStore.prototype[t]=fromCallback(MemoryCookieStore.prototype[t])}),exports.MemoryCookieStore=MemoryCookieStore,exports.inspectFallback=inspectFallback;