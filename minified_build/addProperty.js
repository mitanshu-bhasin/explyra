/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{Assertion}from"../assertion.js";import{flag}from"./flag.js";import{isProxyEnabled}from"./isProxyEnabled.js";import{transferFlags}from"./transferFlags.js";export function addProperty(r,s,t){t=void 0===t?function(){}:t,Object.defineProperty(r,s,{get:function r(){isProxyEnabled()||flag(this,"lockSsfi")||flag(this,"ssfi",r);let s=t.call(this);if(void 0!==s)return s;let i=new Assertion;return transferFlags(this,i),i},configurable:!0})}