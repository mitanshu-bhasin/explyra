/**
 * @license React
 * use-sync-external-store-shim.native.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";var React=require("react");function is(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t}var objectIs="function"==typeof Object.is?Object.is:is,useState=React.useState,useEffect=React.useEffect,useLayoutEffect=React.useLayoutEffect,useDebugValue=React.useDebugValue;function useSyncExternalStore$1(e,t){var n=t(),u=useState({inst:{value:n,getSnapshot:t}}),a=u[0].inst,c=u[1];return useLayoutEffect(function(){a.value=n,a.getSnapshot=t,checkIfSnapshotChanged(a)&&c({inst:a})},[e,n,t]),useEffect(function(){return checkIfSnapshotChanged(a)&&c({inst:a}),e(function(){checkIfSnapshotChanged(a)&&c({inst:a})})},[e]),useDebugValue(n),n}function checkIfSnapshotChanged(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!objectIs(e,n)}catch(e){return!0}}exports.useSyncExternalStore=void 0!==React.useSyncExternalStore?React.useSyncExternalStore:useSyncExternalStore$1;