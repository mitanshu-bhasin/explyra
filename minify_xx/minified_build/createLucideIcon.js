/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import{forwardRef,createElement}from"react";import{mergeClasses,toKebabCase}from"./shared/src/utils.js";import Icon from"./Icon.js";const createLucideIcon=(e,r)=>{const a=forwardRef(({className:a,...s},o)=>createElement(Icon,{ref:o,iconNode:r,className:mergeClasses(`lucide-${toKebabCase(e)}`,a),...s}));return a.displayName=`${e}`,a};export{createLucideIcon as default};