/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{inspect}from"./inspect.js";import{config}from"../config.js";export function objDisplay(t){let e=inspect(t),n=Object.prototype.toString.call(t);if(config.truncateThreshold&&e.length>=config.truncateThreshold){if("[object Function]"===n)return t.name&&""!==t.name?"[Function: "+t.name+"]":"[Function]";if("[object Array]"===n)return"[ Array("+t.length+") ]";if("[object Object]"===n){let e=Object.keys(t);return"{ Object ("+(e.length>2?e.splice(0,2).join(", ")+", ...":e.join(", "))+") }"}return e}return e}