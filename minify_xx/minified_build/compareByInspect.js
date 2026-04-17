/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{inspect}from"./inspect.js";export function compareByInspect(t,e){return inspect(t)<inspect(e)?-1:1}