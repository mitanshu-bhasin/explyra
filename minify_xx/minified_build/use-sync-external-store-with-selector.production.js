/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";var React=require("react");function is(e,u){return e===u&&(0!==e||1/e==1/u)||e!=e&&u!=u}var objectIs="function"==typeof Object.is?Object.is:is,useSyncExternalStore=React.useSyncExternalStore,useRef=React.useRef,useEffect=React.useEffect,useMemo=React.useMemo,useDebugValue=React.useDebugValue;exports.useSyncExternalStoreWithSelector=function(e,u,t,r,n){var a=useRef(null);if(null===a.current){var c={hasValue:!1,value:null};a.current=c}else c=a.current;a=useMemo(function(){function e(e){if(!l){if(l=!0,a=e,e=r(e),void 0!==n&&c.hasValue){var u=c.value;if(n(u,e))return s=u}return s=e}if(u=s,objectIs(a,e))return u;var t=r(e);return void 0!==n&&n(u,t)?(a=e,u):(a=e,s=t)}var a,s,l=!1,i=void 0===t?null:t;return[function(){return e(u())},null===i?void 0:function(){return e(i())}]},[u,t,r,n]);var s=useSyncExternalStore(e,a[0],a[1]);return useEffect(function(){c.hasValue=!0,c.value=s},[s]),useDebugValue(s),s};