/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import{forwardRef,createElement}from"react";import defaultAttributes from"./defaultAttributes.js";import{mergeClasses}from"./shared/src/utils.js";const Icon=forwardRef(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:o="",children:a,iconNode:i,...l},m)=>createElement("svg",{ref:m,...defaultAttributes,width:r,height:r,stroke:e,strokeWidth:s?24*Number(t)/Number(r):t,className:mergeClasses("lucide",o),...l},[...i.map(([e,r])=>createElement(e,r)),...Array.isArray(a)?a:[a]]));export{Icon as default};