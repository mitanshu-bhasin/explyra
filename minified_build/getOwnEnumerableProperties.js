/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{getOwnEnumerablePropertySymbols}from"./getOwnEnumerablePropertySymbols.js";export function getOwnEnumerableProperties(e){return Object.keys(e).concat(getOwnEnumerablePropertySymbols(e))}