/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{Assertion}from"../assertion.js";import{addLengthGuard}from"./addLengthGuard.js";import{flag}from"./flag.js";import{proxify}from"./proxify.js";import{transferFlags}from"./transferFlags.js";export function overwriteMethod(t,r,o){let i=t[r],s=function(){throw new Error(r+" is not a function")};i&&"function"==typeof i&&(s=i);let f=function(){flag(this,"lockSsfi")||flag(this,"ssfi",f);let t=flag(this,"lockSsfi");flag(this,"lockSsfi",!0);let r=o(s).apply(this,arguments);if(flag(this,"lockSsfi",t),void 0!==r)return r;let i=new Assertion;return transferFlags(this,i),i};addLengthGuard(f,r,!1),t[r]=proxify(f,r)}