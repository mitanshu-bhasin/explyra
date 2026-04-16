/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
import{toCamelCase}from"./toCamelCase.js";const toPascalCase=a=>{const e=toCamelCase(a);return e.charAt(0).toUpperCase()+e.slice(1)};export{toPascalCase};