/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var flag=require("./flag"),getActual=require("./getActual"),objDisplay=require("./objDisplay");module.exports=function(e,a){var t=flag(e,"negate"),r=flag(e,"object"),l=a[3],u=getActual(e,a),n=t?a[2]:a[1],i=flag(e,"message");return"function"==typeof n&&(n=n()),n=(n=n||"").replace(/#\{this\}/g,function(){return objDisplay(r)}).replace(/#\{act\}/g,function(){return objDisplay(u)}).replace(/#\{exp\}/g,function(){return objDisplay(l)}),i?i+": "+n:n};