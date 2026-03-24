/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var chai=require("../../chai"),flag=require("./flag"),isProxyEnabled=require("./isProxyEnabled"),transferFlags=require("./transferFlags");module.exports=function(r,e,i){var t=Object.getOwnPropertyDescriptor(r,e),a=function(){};t&&"function"==typeof t.get&&(a=t.get),Object.defineProperty(r,e,{get:function r(){isProxyEnabled()||flag(this,"lockSsfi")||flag(this,"ssfi",r);var e=flag(this,"lockSsfi");flag(this,"lockSsfi",!0);var t=i(a).call(this);if(flag(this,"lockSsfi",e),void 0!==t)return t;var s=new chai.Assertion;return transferFlags(this,s),s},configurable:!0})};