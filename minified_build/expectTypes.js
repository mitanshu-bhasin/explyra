/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{AssertionError}from"assertion-error";import{flag}from"./flag.js";import{type}from"./type-detect.js";export function expectTypes(e,t){let r=flag(e,"message"),o=flag(e,"ssfi");r=r?r+": ":"",e=flag(e,"object"),(t=t.map(function(e){return e.toLowerCase()})).sort();let n=t.map(function(e,r){let o=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an":"a";return(t.length>1&&r===t.length-1?"or ":"")+o+" "+e}).join(", "),s=type(e).toLowerCase();if(!t.some(function(e){return s===e}))throw new AssertionError(r+"object tested must be "+n+", but "+s+" given",void 0,o)}