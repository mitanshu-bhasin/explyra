const fnLengthDesc=Object.getOwnPropertyDescriptor(function(){},"length");
/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */export function addLengthGuard(e,t,n){return fnLengthDesc.configurable?(Object.defineProperty(e,"length",{get:function(){if(n)throw Error("Invalid Chai property: "+t+'.length. Due to a compatibility issue, "length" cannot directly follow "'+t+'". Use "'+t+'.lengthOf" instead.');throw Error("Invalid Chai property: "+t+'.length. See docs for proper usage of "'+t+'".')}}),e):e}