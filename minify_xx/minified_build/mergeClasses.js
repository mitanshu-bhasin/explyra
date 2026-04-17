/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mergeClasses=(...e)=>e.filter((e,s,r)=>Boolean(e)&&""!==e.trim()&&r.indexOf(e)===s).join(" ").trim();export{mergeClasses};