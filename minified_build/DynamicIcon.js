"use strict";
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */import{forwardRef,useState,useEffect,createElement}from"react";import dynamicIconImports from"./dynamicIconImports.js";import Icon from"./Icon.js";const iconNames=Object.keys(dynamicIconImports);async function getIconNode(e){if(!(e in dynamicIconImports))throw new Error("[lucide-react]: Name in Lucide DynamicIcon not found");return(await dynamicIconImports[e]()).__iconNode}const DynamicIcon=forwardRef(({name:e,fallback:n,...o},c)=>{const[t,r]=useState();return useEffect(()=>{getIconNode(e).then(r).catch(e=>{console.error(e)})},[e]),null==t?null==n?null:createElement(n):createElement(Icon,{ref:c,...o,iconNode:t})});export{DynamicIcon as default,iconNames};