/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var getOwnEnumerablePropertySymbols=require("./getOwnEnumerablePropertySymbols");module.exports=function(e){return Object.keys(e).concat(getOwnEnumerablePropertySymbols(e))};