/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{Assertion}from"../assertion.js";import{flag}from"./flag.js";import{isProxyEnabled}from"./isProxyEnabled.js";import{transferFlags}from"./transferFlags.js";export function overwriteProperty(t,r,e){let s=Object.getOwnPropertyDescriptor(t,r),i=function(){};s&&"function"==typeof s.get&&(i=s.get),Object.defineProperty(t,r,{get:function t(){isProxyEnabled()||flag(this,"lockSsfi")||flag(this,"ssfi",t);let r=flag(this,"lockSsfi");flag(this,"lockSsfi",!0);let s=e(i).call(this);if(flag(this,"lockSsfi",r),void 0!==s)return s;let o=new Assertion;return transferFlags(this,o),o},configurable:!0})}