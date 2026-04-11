/*
  @license
	Rollup.js v4.59.0
	Sun, 22 Feb 2026 07:31:53 GMT - commit ae846957f109690a866cc3e4c073613c338d3476

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
const getLogFilter=t=>{if(0===t.length)return()=>!0;const e=t.map(t=>t.split("&").map(t=>{const e="!"===t[0];e&&(t=t.slice(1));const[r,...n]=t.split(":");return{inverted:e,key:r.split("."),parts:n.join(":").split("*")}}));return t=>{t:for(const r of e){for(const{inverted:e,key:n,parts:i}of r){const r=testFilter(t,n,i);if(e?r:!r)continue t}return!0}return!1}},testFilter=(t,e,r)=>{let n=t;for(let t=0;t<e.length;t++){if(!n)return!1;const r=e[t];if(!(r in n))return!1;n=n[r]}let i="object"==typeof n?JSON.stringify(n):String(n);if(1===r.length)return i===r[0];if(!i.startsWith(r[0]))return!1;const s=r.length-1;for(let t=1;t<s;t++){const e=r[t],n=i.indexOf(e);if(-1===n)return!1;i=i.slice(n+e.length)}return i.endsWith(r[s])};export{getLogFilter};