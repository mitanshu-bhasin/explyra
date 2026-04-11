/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var inspect=require("./inspect");module.exports=function(e,n){return inspect(e)<inspect(n)?-1:1};