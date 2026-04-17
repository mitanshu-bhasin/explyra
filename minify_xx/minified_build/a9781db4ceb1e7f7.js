(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,35659,e=>{"use strict";var t=e.i(38823),r=e.i(79799);e.i(52598);var a=e.i(97703),n=e.i(83824),o=e.i(15790);let i=(0,r.createContext)(null);function s({children:e}){let[s,l]=(0,r.useState)(null),[u,c]=(0,r.useState)(null),[d,f]=(0,r.useState)(!0);return(0,r.useEffect)(()=>(0,a.onAuthStateChanged)(n.auth,async e=>{if(l(e),e){let t=await(0,o.getRetiredUser)(e.uid);t||(await(0,o.createRetiredUser)(e.uid,{uid:e.uid,email:e.email||"",displayName:e.displayName||"User",role:"explras@gmail.com"===e.email?"admin":"client"}),t=await(0,o.getRetiredUser)(e.uid)),c(t)}else c(null);f(!1)}),[]),(0,t.jsx)(i.Provider,{value:{user:s,retiredUser:u,role:u?.role??null,loading:d,signIn:async(e,t)=>{await(0,a.signInWithEmailAndPassword)(n.auth,e,t)},signUp:async(e,t,r,i)=>{let s=await(0,a.createUserWithEmailAndPassword)(n.auth,e,t);await(0,a.updateProfile)(s.user,{displayName:r}),await(0,o.createRetiredUser)(s.user.uid,{uid:s.user.uid,email:e,displayName:r,role:i})},signInWithGoogle:async e=>{let t=new a.GoogleAuthProvider,r=await(0,a.signInWithPopup)(n.auth,t);await(0,o.getRetiredUser)(r.user.uid)||await(0,o.createRetiredUser)(r.user.uid,{uid:r.user.uid,email:r.user.email,displayName:r.user.displayName,role:e})},logout:async()=>{await(0,a.signOut)(n.auth)}},children:e})}function l(){let e=(0,r.useContext)(i);if(!e)throw Error("useAuth must be used within AuthProvider");return e}e.s(["AuthProvider",()=>s,"useAuth",()=>l])},47323,e=>{"use strict";let t,r;var a,n=e.i(79799);let o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,u=(e,t)=>{let r="",a="",n="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?u(i,o):o+"{"+u(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=u(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=u.p?u.p(o,i):o+":"+i+";")}return r+(t&&n?t+"{"+n+"}":n)+a},c={},d=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+d(e[r]);return t}return e};function f(e){let t,r,a=this||{},n=e.call?e(a.p):e;return((e,t,r,a,n)=>{var o;let f=d(e),p=c[f]||(c[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!c[p]){let t=f!==e?e:(e=>{let t,r,a=[{}];for(;t=i.exec(e.replace(s,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[p]=u(n?{["@keyframes "+p]:t}:t,r?"":"."+p)}let h=r&&c.g?c.g:null;return r&&(c.g=c[p]),o=c[p],h?t.data=t.data.replace(h,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),p})(n.unshift?n.raw?(t=[].slice.call(arguments,1),r=a.p,n.reduce((e,a,n)=>{let o=t[n];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"")):n.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):n,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(a.target),a.g,a.o,a.k)}f.bind({g:1});let p,h,m,g=f.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function n(o,i){let s=Object.assign({},o),l=s.className||n.className;r.p=Object.assign({theme:h&&h()},s),r.o=/ *go\d+/.test(l),s.className=f.apply(r,a)+(l?" "+l:""),t&&(s.ref=i);let u=e;return e[0]&&(u=s.as||e,delete s.as),m&&u[0]&&m(s),p(u,s)}return t?t(n):n}}var b=(e,t)=>"function"==typeof e?e(t):e,x=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(e=>e.id===n||void 0===n?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},k=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},C=(e,t=j)=>{P[t]=w(P[t]||E,e),k.forEach(([e,r])=>{e===t&&r(P[t])})},S=e=>Object.keys(P).forEach(t=>C(e,t)),O=(e=j)=>t=>{C(t,e)},N={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=j)=>{let[r,a]=(0,n.useState)(P[t]||E),o=(0,n.useRef)(P[t]);(0,n.useEffect)(()=>(o.current!==P[t]&&a(P[t]),k.push([t,a]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,n;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||N[t.type],style:{...e.style,...null==(n=e[t.type])?void 0:n.style,...t.style}}});return{...r,toasts:i}},_=e=>(t,r)=>{let a,n=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||x()}))(t,e,r);return O(n.toasterId||(a=n.id,Object.keys(P).find(e=>P[e].toasts.some(e=>e.id===a))))({type:2,toast:n}),n.id},T=(e,t)=>_("blank")(e,t);T.error=_("error"),T.success=_("success"),T.loading=_("loading"),T.custom=_("custom"),T.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):S(r)},T.dismissAll=e=>T.dismiss(void 0,e),T.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):S(r)},T.removeAll=e=>T.remove(void 0,e),T.promise=(e,t,r)=>{let a=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let n=t.success?b(t.success,e):void 0;return n?T.success(n,{id:a,...r,...null==r?void 0:r.success}):T.dismiss(a),e}).catch(e=>{let n=t.error?b(t.error,e):void 0;n?T.error(n,{id:a,...r,...null==r?void 0:r.error}):T.dismiss(a)}),e};var A=(e,t="default")=>{let{toasts:r,pausedAt:a}=I(e,t),o=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=1e3)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),s({type:4,toastId:e})},t);o.set(e,r)},[]);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),n=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(!(a<0))return setTimeout(()=>T.dismiss(r.id,t),a);r.visible&&T.dismiss(r.id)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let s=(0,n.useCallback)(O(t),[t]),l=(0,n.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),u=(0,n.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),c=(0,n.useCallback)(()=>{a&&s({type:6,time:Date.now()})},[a,s]),d=(0,n.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:n=8,defaultPosition:o}=t||{},i=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),s=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<s&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+n,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:u,startPause:l,endPause:c,calculateOffset:d}}},M=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,D=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,L=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,B=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=y("div")`
  position: absolute;
`,W=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(q,null,t):t:"blank"===r?null:n.createElement(W,null,n.createElement(D,{...a}),"loading"!==r&&n.createElement(H,null,"error"===r?n.createElement(z,{...a}):n.createElement(B,{...a})))},X=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=n.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,n]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`\n0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}\n`];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(V,{toast:e}),s=n.createElement(J,{...e.ariaProps},b(e.message,e));return n.createElement(X,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:i,message:s}):n.createElement(n.Fragment,null,i,s))});a=n.createElement,u.p=void 0,p=a,h=void 0,m=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},o)},Z=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Y=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:i,containerStyle:s,containerClassName:l})=>{let{toasts:u,handlers:c}=A(r,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(r=>{let i,s,l=r.position||t,u=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),d=(i=l.includes("top"),s=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${u*(i?1:-1)}px)`,...i?{top:0}:{bottom:0},...s});return n.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Z:"",style:d},"custom"===r.type?b(r.message,r):o?o(r):n.createElement(G,{toast:r,position:l}))}))};e.s(["CheckmarkIcon",()=>B,"ErrorIcon",()=>z,"LoaderIcon",()=>D,"ToastBar",()=>G,"ToastIcon",()=>V,"Toaster",()=>Y,"default",()=>T,"resolveValue",()=>b,"toast",()=>T,"useToaster",()=>A,"useToasterStore",()=>I],47323)},10281,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},65394,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={assign:function(){return l},searchParamsToUrlQuery:function(){return o},urlQueryToSearchParams:function(){return s}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});function o(e){let t={};for(let[r,a]of e.entries()){let e=t[r];void 0===e?t[r]=a:Array.isArray(e)?e.push(a):t[r]=[e,a]}return t}function i(e){return"string"==typeof e?e:"number"==typeof e&&!isNaN(e)||"boolean"==typeof e?String(e):""}function s(e){let t=new URLSearchParams;for(let[r,a]of Object.entries(e))if(Array.isArray(a))for(let e of a)t.append(r,i(e));else t.set(r,i(a));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,a]of r.entries())e.append(t,a)}return e}},25970,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return s},formatWithValidation:function(){return u},urlObjectKeys:function(){return l}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=e.r(88204)._(e.r(65394)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,a=e.protocol||"",n=e.pathname||"",s=e.hash||"",l=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),l&&"object"==typeof l&&(l=String(o.urlQueryToSearchParams(l)));let c=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||i.test(a))&&!1!==u?(u="//"+(u||""),n&&"/"!==n[0]&&(n="/"+n)):u||(u=""),s&&"#"!==s[0]&&(s="#"+s),c&&"?"!==c[0]&&(c="?"+c),n=n.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${a}${u}${n}${c}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return s(e)}},60083,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let a=e.r(79799);function n(e,t){let r=(0,a.useRef)(null),n=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=o(e,a)),t&&(n.current=o(t,a))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},52050,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return v},NormalizeError:function(){return b},PageNotFoundError:function(){return x},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return o},execOnce:function(){return i},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return w}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...a)=>(r||(r=!0,t=e(...a)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let a=await e.getInitialProps(t);if(r&&f(r))return a;if(!a)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${a}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return a}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class b extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},13692,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let a=e.r(52050),n=e.r(87387);function o(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},61195,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},9964,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return y},useLinkStatus:function(){return x}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=e.r(88204),i=e.r(38823),s=o._(e.r(79799)),l=e.r(25970),u=e.r(96235),c=e.r(60083),d=e.r(52050),f=e.r(94099);e.r(10281);let p=e.r(82574),h=e.r(13692),m=e.r(75619);function g(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function y(t){var r;let a,n,o,[l,y]=(0,s.useOptimistic)(p.IDLE_LINK_STATUS),x=(0,s.useRef)(null),{href:v,as:j,children:w,prefetch:k=null,passHref:E,replace:P,shallow:C,scroll:S,onClick:O,onMouseEnter:N,onTouchStart:I,legacyBehavior:_=!1,onNavigate:T,ref:A,unstable_dynamicOnHover:M,...R}=t;a=w,_&&("string"==typeof a||"number"==typeof a)&&(a=(0,i.jsx)("a",{children:a}));let $=s.default.useContext(u.AppRouterContext),z=!1!==k,U=!1!==k?null===(r=k)||"auto"===r?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,{href:D,as:L}=s.default.useMemo(()=>{let e=g(v);return{href:e,as:j?g(j):e}},[v,j]);if(_){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=s.default.Children.only(a)}let F=_?n&&"object"==typeof n&&n.ref:A,B=s.default.useCallback(e=>(null!==$&&(x.current=(0,p.mountLinkInstance)(e,D,$,U,z,y)),()=>{x.current&&((0,p.unmountLinkForCurrentNavigation)(x.current),x.current=null),(0,p.unmountPrefetchableInstance)(e)}),[z,D,$,U,y]),H={ref:(0,c.useMergedRef)(B,F),onClick(t){_||"function"!=typeof O||O(t),_&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!$||t.defaultPrevented||function(t,r,a,n,o,i,l){if("u">typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r))return void(o&&(t.preventDefault(),location.replace(r)));if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(9612);s.default.startTransition(()=>{d(a||r,o?"replace":"push",i??!0,n.current)})}}(t,D,L,x,P,S,T)},onMouseEnter(e){_||"function"!=typeof N||N(e),_&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),$&&z&&(0,p.onNavigationIntent)(e.currentTarget,!0===M)},onTouchStart:function(e){_||"function"!=typeof I||I(e),_&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),$&&z&&(0,p.onNavigationIntent)(e.currentTarget,!0===M)}};return(0,d.isAbsoluteUrl)(L)?H.href=L:_&&!E&&("a"!==n.type||"href"in n.props)||(H.href=(0,f.addBasePath)(L)),o=_?s.default.cloneElement(n,H):(0,i.jsx)("a",{...R,...H,children:a}),(0,i.jsx)(b.Provider,{value:l,children:o})}e.r(61195);let b=(0,s.createContext)(p.IDLE_LINK_STATUS),x=()=>(0,s.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},45379,e=>{"use strict";let t=(0,e.i(82362).default)("briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);e.s(["Briefcase",()=>t],45379)},55638,e=>{"use strict";let t=(0,e.i(82362).default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);e.s(["MessageSquare",()=>t],55638)},61901,e=>{"use strict";let t=(0,e.i(82362).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);e.s(["X",()=>t],61901)},35787,e=>{"use strict";let t=(0,e.i(82362).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["PenSquare",()=>t],35787)},82492,e=>{"use strict";let t=(0,e.i(82362).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",()=>t],82492)},2284,e=>{"use strict";let t=(0,e.i(82362).default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);e.s(["User",()=>t],2284)},34626,e=>{"use strict";var t=e.i(38823),r=e.i(9964),a=e.i(79799),n=e.i(35659),o=e.i(43403),i=e.i(45379),s=e.i(82362);let l=(0,s.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);var u=e.i(61901),c=e.i(2284);let d=(0,s.default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]),f=(0,s.default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);var p=e.i(82492),h=e.i(55638),m=e.i(35787);let g=(0,s.default)("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);function y(){let{user:e,role:s,logout:y}=(0,n.useAuth)(),[b,x]=(0,a.useState)(!1),[v,j]=(0,a.useState)(!1),w=(0,o.useRouter)(),k=(0,o.usePathname)(),E=async()=>{await y(),w.push("/")},P=[{href:"/search",label:"Find Experts",icon:p.Search},{href:"/post",label:"Knowledge Hub",icon:m.PenSquare}],C=e?[{href:"/dashboard",label:"Dashboard",icon:f},{href:"/profile",label:"My Profile",icon:c.User},{href:"/messages",label:"Messages",icon:h.MessageSquare},..."explras@gmail.com"===e.email?[{href:"/admin",label:"Admin Panel",icon:g}]:[]]:[];return(0,t.jsxs)("header",{style:{background:"var(--color-primary-dark)",borderBottom:"1px solid rgba(255,255,255,0.08)"},children:[(0,t.jsxs)("nav",{className:"container",style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"72px"},children:[(0,t.jsxs)(r.default,{href:"/",style:{display:"flex",alignItems:"center",gap:"0.6rem",color:"#fff",fontWeight:800,fontSize:"1.3rem",textDecoration:"none"},children:[(0,t.jsx)("div",{style:{background:"var(--color-accent)",borderRadius:"10px",padding:"6px 8px",display:"flex"},children:(0,t.jsx)(i.Briefcase,{size:22,color:"#fff"})}),(0,t.jsx)("span",{children:"RetiredPro"}),(0,t.jsx)("span",{style:{fontSize:"0.7rem",background:"rgba(255,255,255,0.15)",padding:"2px 8px",borderRadius:"99px",fontWeight:500},children:"by Explyra"})]}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"0.25rem"},className:"hidden-mobile",children:[P.map(e=>(0,t.jsxs)(r.default,{href:e.href,style:{color:k===e.href?"var(--color-accent-light)":"rgba(255,255,255,0.8)",padding:"0.5rem 1rem",borderRadius:"8px",fontWeight:500,fontSize:"0.95rem",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"0.4rem",textDecoration:"none"},children:[(0,t.jsx)(e.icon,{size:16}),e.label]},e.href)),e&&C.map(e=>(0,t.jsxs)(r.default,{href:e.href,style:{color:k===e.href?"var(--color-accent-light)":"rgba(255,255,255,0.8)",padding:"0.5rem 1rem",borderRadius:"8px",fontWeight:500,fontSize:"0.95rem",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"0.4rem",textDecoration:"none"},children:[(0,t.jsx)(e.icon,{size:16}),e.label]},e.href))]}),(0,t.jsx)("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},className:"hidden-mobile",children:e?(0,t.jsxs)("div",{style:{position:"relative"},children:[(0,t.jsxs)("button",{onClick:()=>j(!v),style:{display:"flex",alignItems:"center",gap:"0.5rem",background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",padding:"0.5rem 1rem",borderRadius:"8px",cursor:"pointer",fontWeight:500},children:[(0,t.jsx)(c.User,{size:18}),e.displayName?.split(" ")[0]||"Account"]}),v&&(0,t.jsx)("div",{style:{position:"absolute",right:0,top:"calc(100% + 8px)",background:"#fff",borderRadius:"12px",boxShadow:"0 8px 32px rgba(0,0,0,0.15)",minWidth:"180px",overflow:"hidden",zIndex:50},onMouseLeave:()=>j(!1),children:(0,t.jsxs)("button",{onClick:E,style:{display:"flex",alignItems:"center",gap:"0.5rem",width:"100%",padding:"0.9rem 1.25rem",background:"none",border:"none",cursor:"pointer",color:"var(--color-danger)",fontWeight:600,fontSize:"0.95rem"},children:[(0,t.jsx)(d,{size:16}),"Sign Out"]})})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/login",className:"btn btn-outline",style:{color:"#fff",borderColor:"rgba(255,255,255,0.4)",padding:"0.6rem 1.25rem",minHeight:"44px"},children:"Sign In"}),(0,t.jsx)(r.default,{href:"/signup",className:"btn btn-accent",style:{padding:"0.6rem 1.25rem",minHeight:"44px"},children:"Join Free"})]})}),(0,t.jsx)("button",{className:"mobile-only",onClick:()=>x(!b),style:{background:"none",border:"none",color:"#fff",cursor:"pointer",padding:"0.5rem"},"aria-label":"Toggle menu",children:b?(0,t.jsx)(u.X,{size:28}):(0,t.jsx)(l,{size:28})})]}),b&&(0,t.jsxs)("div",{style:{background:"var(--color-primary)",borderTop:"1px solid rgba(255,255,255,0.1)",padding:"1rem"},children:[[...P,...e?C:[]].map(e=>(0,t.jsxs)(r.default,{href:e.href,onClick:()=>x(!1),style:{display:"flex",alignItems:"center",gap:"0.75rem",color:"#fff",padding:"0.9rem 1rem",borderRadius:"8px",fontWeight:500,fontSize:"1rem",textDecoration:"none"},children:[(0,t.jsx)(e.icon,{size:20}),e.label]},e.href)),(0,t.jsx)("div",{style:{marginTop:"1rem",borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:"1rem",display:"flex",gap:"0.75rem"},children:e?(0,t.jsxs)("button",{onClick:E,className:"btn btn-outline",style:{color:"#fff",borderColor:"rgba(255,255,255,0.4)",flex:1},children:[(0,t.jsx)(d,{size:18})," Sign Out"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{href:"/login",className:"btn btn-outline",style:{color:"#fff",borderColor:"rgba(255,255,255,0.4)",flex:1},onClick:()=>x(!1),children:"Sign In"}),(0,t.jsx)(r.default,{href:"/signup",className:"btn btn-accent",style:{flex:1},onClick:()=>x(!1),children:"Join Free"})]})})]}),(0,t.jsx)("style",{children:"\n        .hidden-mobile { display: flex; }\n        .mobile-only { display: none; }\n        @media (max-width: 768px) {\n          .hidden-mobile { display: none !important; }\n          .mobile-only { display: flex !important; }\n        }\n      "})]})}e.s(["default",()=>y],34626)}]);