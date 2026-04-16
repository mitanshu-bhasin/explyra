/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toCamelCase=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,a,o)=>o?o.toUpperCase():a.toLowerCase());export{toCamelCase};