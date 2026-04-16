/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
export function transferFlags(e,l,s){let t=e.__flags||(e.__flags=Object.create(null));l.__flags||(l.__flags=Object.create(null)),s=3!==arguments.length||s;for(let e in t)(s||"object"!==e&&"ssfi"!==e&&"lockSsfi"!==e&&"message"!=e)&&(l.__flags[e]=t[e])}