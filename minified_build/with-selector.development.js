/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";"production"!==process.env.NODE_ENV&&function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var e=require("react"),r=require("use-sync-external-store/shim"),n="function"==typeof Object.is?Object.is:function(e,r){return e===r&&(0!==e||1/e==1/r)||e!=e&&r!=r},t=r.useSyncExternalStore,u=e.useRef,_=e.useEffect,o=e.useMemo,i=e.useDebugValue;exports.useSyncExternalStoreWithSelector=function(e,r,O,l,a){var f=u(null);if(null===f.current){var c={hasValue:!1,value:null};f.current=c}else c=f.current;f=o(function(){function e(e){if(!_){if(_=!0,t=e,e=l(e),void 0!==a&&c.hasValue){var r=c.value;if(a(r,e))return u=r}return u=e}if(r=u,n(t,e))return r;var o=l(e);return void 0!==a&&a(r,o)?(t=e,r):(t=e,u=o)}var t,u,_=!1,o=void 0===O?null:O;return[function(){return e(r())},null===o?void 0:function(){return e(o())}]},[r,O,l,a]);var s=t(e,f[0],f[1]);return _(function(){c.hasValue=!0,c.value=s},[s]),i(s),s},"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}();