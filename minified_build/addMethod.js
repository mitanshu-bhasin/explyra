/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var addLengthGuard=require("./addLengthGuard"),chai=require("../../chai"),flag=require("./flag"),proxify=require("./proxify"),transferFlags=require("./transferFlags");module.exports=function(r,a,e){var i=function(){flag(this,"lockSsfi")||flag(this,"ssfi",i);var r=e.apply(this,arguments);if(void 0!==r)return r;var a=new chai.Assertion;return transferFlags(this,a),a};addLengthGuard(i,a,!1),r[a]=proxify(i,a)};