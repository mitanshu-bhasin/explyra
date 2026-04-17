/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
export function tokenizeArgString(r){if(Array.isArray(r))return r.map(r=>"string"!=typeof r?r+"":r);r=r.trim();let t=0,n=null,l=null,e=null;const i=[];for(let u=0;u<r.length;u++)n=l,l=r.charAt(u)," "!==l||e?(l===e?e=null:"'"!==l&&'"'!==l||e||(e=l),i[t]||(i[t]=""),i[t]+=l):" "!==n&&t++;return i}