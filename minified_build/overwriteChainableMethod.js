/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{Assertion}from"../assertion.js";import{transferFlags}from"./transferFlags.js";export function overwriteChainableMethod(t,e,r,i){let n=t.__methods[e],s=n.chainingBehavior;n.chainingBehavior=function(){let t=i(s).call(this);if(void 0!==t)return t;let e=new Assertion;return transferFlags(this,e),e};let o=n.method;n.method=function(){let t=r(o).apply(this,arguments);if(void 0!==t)return t;let e=new Assertion;return transferFlags(this,e),e}}