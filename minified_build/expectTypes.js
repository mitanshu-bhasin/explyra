/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var AssertionError=require("assertion-error"),flag=require("./flag"),type=require("type-detect");module.exports=function(e,r){var t=flag(e,"message"),o=flag(e,"ssfi");t=t?t+": ":"",e=flag(e,"object"),(r=r.map(function(e){return e.toLowerCase()})).sort();var n=r.map(function(e,t){var o=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an":"a";return(r.length>1&&t===r.length-1?"or ":"")+o+" "+e}).join(", "),a=type(e).toLowerCase();if(!r.some(function(e){return a===e}))throw new AssertionError(t+"object tested must be "+n+", but "+a+" given",void 0,o)};