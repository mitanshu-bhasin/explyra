/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import{flag}from"./flag.js";import{getActual}from"./getActual.js";import{objDisplay}from"./objDisplay.js";export function getMessage(t,e){let a=flag(t,"negate"),o=flag(t,"object"),r=e[3],l=getActual(t,e),g=a?e[2]:e[1],n=flag(t,"message");return"function"==typeof g&&(g=g()),g=g||"",g=g.replace(/#\{this\}/g,function(){return objDisplay(o)}).replace(/#\{act\}/g,function(){return objDisplay(l)}).replace(/#\{exp\}/g,function(){return objDisplay(r)}),n?n+": "+g:g}