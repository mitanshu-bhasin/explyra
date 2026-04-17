/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{addLengthGuard}from"./addLengthGuard.js";import{flag}from"./flag.js";import{proxify}from"./proxify.js";import{transferFlags}from"./transferFlags.js";import{Assertion}from"../assertion.js";export function addMethod(r,t,s){let o=function(){flag(this,"lockSsfi")||flag(this,"ssfi",o);let r=s.apply(this,arguments);if(void 0!==r)return r;let t=new Assertion;return transferFlags(this,t),t};addLengthGuard(o,t,!1),r[t]=proxify(o,t)}