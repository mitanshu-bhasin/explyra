/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";var React=require("react"),shim=require("use-sync-external-store/shim");function is(e,u){return e===u&&(0!==e||1/e==1/u)||e!=e&&u!=u}var objectIs="function"==typeof Object.is?Object.is:is,useSyncExternalStore=shim.useSyncExternalStore,useRef=React.useRef,useEffect=React.useEffect,useMemo=React.useMemo,useDebugValue=React.useDebugValue;exports.useSyncExternalStoreWithSelector=function(e,u,r,t,n){var s=useRef(null);if(null===s.current){var a={hasValue:!1,value:null};s.current=a}else a=s.current;s=useMemo(function(){function e(e){if(!i){if(i=!0,s=e,e=t(e),void 0!==n&&a.hasValue){var u=a.value;if(n(u,e))return c=u}return c=e}if(u=c,objectIs(s,e))return u;var r=t(e);return void 0!==n&&n(u,r)?(s=e,u):(s=e,c=r)}var s,c,i=!1,l=void 0===r?null:r;return[function(){return e(u())},null===l?void 0:function(){return e(l())}]},[u,r,t,n]);var c=useSyncExternalStore(e,s[0],s[1]);return useEffect(function(){a.hasValue=!0,a.value=c},[c]),useDebugValue(c),c};