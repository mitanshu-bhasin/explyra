/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var chai=require("../../chai"),transferFlags=require("./transferFlags");module.exports=function(r,a,i,e){var n=r.__methods[a],t=n.chainingBehavior;n.chainingBehavior=function(){var r=e(t).call(this);if(void 0!==r)return r;var a=new chai.Assertion;return transferFlags(this,a),a};var s=n.method;n.method=function(){var r=i(s).apply(this,arguments);if(void 0!==r)return r;var a=new chai.Assertion;return transferFlags(this,a),a}};