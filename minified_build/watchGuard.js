/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
"use strict";var __create=Object.create,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(e,r,t,o)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let _ of __getOwnPropNames(r))__hasOwnProp.call(e,_)||_===t||__defProp(e,_,{get:()=>r[_],enumerable:!(o=__getOwnPropDesc(r,_))||o.enumerable});return e},__toESM=(e,r,t)=>(t=null!=e?__create(__getProtoOf(e)):{},__copyProps(!r&&e&&e.__esModule?t:__defProp(t,"default",{value:e,enumerable:!0}),e)),fs=__toESM(require("fs"));process.argv.length<3&&process.exit(1);var directoryName=process.argv[2];try{fs.watch(directoryName,{recursive:!0},()=>({})).close()}catch{}process.exit(0);