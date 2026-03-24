/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var addLengthGuard=require("./addLengthGuard"),chai=require("../../chai"),flag=require("./flag"),proxify=require("./proxify"),transferFlags=require("./transferFlags");module.exports=function(r,i,a){var f=r[i],t=function(){throw new Error(i+" is not a function")};f&&"function"==typeof f&&(t=f);var e=function(){flag(this,"lockSsfi")||flag(this,"ssfi",e);var r=flag(this,"lockSsfi");flag(this,"lockSsfi",!0);var i=a(t).apply(this,arguments);if(flag(this,"lockSsfi",r),void 0!==i)return i;var f=new chai.Assertion;return transferFlags(this,f),f};addLengthGuard(e,i,!1),r[i]=proxify(e,i)};