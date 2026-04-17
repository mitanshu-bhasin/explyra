/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
export function getProperties(e){let t=Object.getOwnPropertyNames(e);function r(e){-1===t.indexOf(e)&&t.push(e)}let o=Object.getPrototypeOf(e);for(;null!==o;)Object.getOwnPropertyNames(o).forEach(r),o=Object.getPrototypeOf(o);return t}