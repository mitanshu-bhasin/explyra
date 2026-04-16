/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";"production"!==process.env.NODE_ENV&&function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var e=require("react"),r="function"==typeof Object.is?Object.is:function(e,r){return e===r&&(0!==e||1/e==1/r)||e!=e&&r!=r},n=e.useSyncExternalStore,t=e.useRef,u=e.useEffect,_=e.useMemo,o=e.useDebugValue;exports.useSyncExternalStoreWithSelector=function(e,O,i,l,a){var f=t(null);if(null===f.current){var c={hasValue:!1,value:null};f.current=c}else c=f.current;f=_(function(){function e(e){if(!u){if(u=!0,n=e,e=l(e),void 0!==a&&c.hasValue){var _=c.value;if(a(_,e))return t=_}return t=e}if(_=t,r(n,e))return _;var o=l(e);return void 0!==a&&a(_,o)?(n=e,_):(n=e,t=o)}var n,t,u=!1,_=void 0===i?null:i;return[function(){return e(O())},null===_?void 0:function(){return e(_())}]},[O,i,l,a]);var s=n(e,f[0],f[1]);return u(function(){c.hasValue=!0,c.value=s},[s]),o(s),s},"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}();