/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hasA11yProp=r=>{for(const t in r)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1};export{hasA11yProp};