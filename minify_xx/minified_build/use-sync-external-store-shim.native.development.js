/**
 * @license React
 * use-sync-external-store-shim.native.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";"production"!==process.env.NODE_ENV&&function(){function e(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!r(e,n)}catch(e){return!0}}"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var t=require("react"),r="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},n=t.useState,o=t.useEffect,a=t.useLayoutEffect,u=t.useDebugValue,s=!1,_=!1;exports.useSyncExternalStore=void 0!==t.useSyncExternalStore?t.useSyncExternalStore:function(i,O){s||void 0===t.startTransition||(s=!0,console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));var c=O();if(!_){var l=O();r(c,l)||(console.error("The result of getSnapshot should be cached to avoid an infinite loop"),_=!0)}var f=(l=n({inst:{value:c,getSnapshot:O}}))[0].inst,S=l[1];return a(function(){f.value=c,f.getSnapshot=O,e(f)&&S({inst:f})},[i,c,O]),o(function(){return e(f)&&S({inst:f}),i(function(){e(f)&&S({inst:f})})},[i]),u(c),c},"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}();