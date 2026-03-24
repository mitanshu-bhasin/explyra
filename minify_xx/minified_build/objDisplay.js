/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var inspect=require("./inspect"),config=require("../config");module.exports=function(e){var n=inspect(e),t=Object.prototype.toString.call(e);if(config.truncateThreshold&&n.length>=config.truncateThreshold){if("[object Function]"===t)return e.name&&""!==e.name?"[Function: "+e.name+"]":"[Function]";if("[object Array]"===t)return"[ Array("+e.length+") ]";if("[object Object]"===t){var r=Object.keys(e);return"{ Object ("+(r.length>2?r.splice(0,2).join(", ")+", ...":r.join(", "))+") }"}return n}return n};