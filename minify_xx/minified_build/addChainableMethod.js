/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var addLengthGuard=require("./addLengthGuard"),chai=require("../../chai"),flag=require("./flag"),proxify=require("./proxify"),transferFlags=require("./transferFlags"),canSetPrototype="function"==typeof Object.setPrototypeOf,testFn=function(){},excludeNames=Object.getOwnPropertyNames(testFn).filter(function(e){var t=Object.getOwnPropertyDescriptor(testFn,e);return"object"!=typeof t||!t.configurable}),call=Function.prototype.call,apply=Function.prototype.apply;module.exports=function(e,t,r,a){"function"!=typeof a&&(a=function(){});var n={method:r,chainingBehavior:a};e.__methods||(e.__methods={}),e.__methods[t]=n,Object.defineProperty(e,t,{get:function(){n.chainingBehavior.call(this);var r=function(){flag(this,"lockSsfi")||flag(this,"ssfi",r);var e=n.method.apply(this,arguments);if(void 0!==e)return e;var t=new chai.Assertion;return transferFlags(this,t),t};if(addLengthGuard(r,t,!0),canSetPrototype){var a=Object.create(this);a.call=call,a.apply=apply,Object.setPrototypeOf(r,a)}else Object.getOwnPropertyNames(e).forEach(function(t){if(-1===excludeNames.indexOf(t)){var a=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,a)}});return transferFlags(this,r),proxify(r)},configurable:!0})};