/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var chai=require("../../chai"),flag=require("./flag"),isProxyEnabled=require("./isProxyEnabled"),transferFlags=require("./transferFlags");module.exports=function(r,e,i){i=void 0===i?function(){}:i,Object.defineProperty(r,e,{get:function r(){isProxyEnabled()||flag(this,"lockSsfi")||flag(this,"ssfi",r);var e=i.call(this);if(void 0!==e)return e;var a=new chai.Assertion;return transferFlags(this,a),a},configurable:!0})};