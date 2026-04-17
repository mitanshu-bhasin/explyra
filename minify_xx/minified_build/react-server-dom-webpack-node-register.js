/**
 * @license React
 * react-server-dom-webpack-node-register.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";const acorn=require("acorn-loose"),url=require("url"),Module=require("module");module.exports=function(){const e=require("react-server-dom-webpack/server"),r=e.registerServerReference,t=e.createClientModuleProxy,o=Module.prototype._compile;Module.prototype._compile=function(e,i){if(-1===e.indexOf("use client")&&-1===e.indexOf("use server"))return o.apply(this,arguments);try{var s=acorn.parse(e,{ecmaVersion:"2024",sourceType:"source"}).body}catch(e){return console.error("Error parsing %s %s",url,e.message),o.apply(this,arguments)}for(var n=!1,u=!1,c=0;c<s.length;c++){var l=s[c];if("ExpressionStatement"!==l.type||!l.directive)break;"use client"===l.directive&&(n=!0),"use server"===l.directive&&(u=!0)}if(!n&&!u)return o.apply(this,arguments);if(n&&u)throw Error('Cannot have both "use client" and "use server" directives in the same file.');if(n&&(s=url.pathToFileURL(i).href,this.exports=t(s)),u)if(o.apply(this,arguments),u=url.pathToFileURL(i).href,"function"==typeof(s=this.exports))r(s,u,null);else for(n=Object.keys(s),c=0;c<n.length;c++){l=n[c];const e=s[n[c]];"function"==typeof e&&r(e,u,l)}}};