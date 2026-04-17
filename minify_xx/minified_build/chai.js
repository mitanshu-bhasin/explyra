/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
import*as util from"./chai/utils/index.js";import{AssertionError}from"assertion-error";import{config}from"./chai/config.js";import"./chai/core/assertions.js";import{expect}from"./chai/interface/expect.js";import{Assertion}from"./chai/assertion.js";import*as should from"./chai/interface/should.js";import{assert}from"./chai/interface/assert.js";const used=[];export{AssertionError};export function use(r){const s={use:use,AssertionError:AssertionError,util:util,config:config,expect:expect,assert:assert,Assertion:Assertion,...should};return~used.indexOf(r)||(r(s,util),used.push(r)),s}export{util};export{config};export*from"./chai/assertion.js";export*from"./chai/interface/expect.js";export*from"./chai/interface/should.js";export*from"./chai/interface/assert.js";