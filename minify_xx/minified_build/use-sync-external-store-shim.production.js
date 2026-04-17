/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";var React=require("react");function is(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t}var objectIs="function"==typeof Object.is?Object.is:is,useState=React.useState,useEffect=React.useEffect,useLayoutEffect=React.useLayoutEffect,useDebugValue=React.useDebugValue;function useSyncExternalStore$2(e,t){var n=t(),u=useState({inst:{value:n,getSnapshot:t}}),c=u[0].inst,a=u[1];return useLayoutEffect(function(){c.value=n,c.getSnapshot=t,checkIfSnapshotChanged(c)&&a({inst:c})},[e,n,t]),useEffect(function(){return checkIfSnapshotChanged(c)&&a({inst:c}),e(function(){checkIfSnapshotChanged(c)&&a({inst:c})})},[e]),useDebugValue(n),n}function checkIfSnapshotChanged(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!objectIs(e,n)}catch(e){return!0}}function useSyncExternalStore$1(e,t){return t()}var shim="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?useSyncExternalStore$1:useSyncExternalStore$2;exports.useSyncExternalStore=void 0!==React.useSyncExternalStore?React.useSyncExternalStore:shim;