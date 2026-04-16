/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";var REACT_ELEMENT_TYPE=Symbol.for("react.transitional.element"),REACT_FRAGMENT_TYPE=Symbol.for("react.fragment");function jsxProd(e,r,o){var t=null;if(void 0!==o&&(t=""+o),void 0!==r.key&&(t=""+r.key),"key"in r)for(var E in o={},r)"key"!==E&&(o[E]=r[E]);else o=r;return r=o.ref,{$$typeof:REACT_ELEMENT_TYPE,type:e,key:t,ref:void 0!==r?r:null,props:o}}exports.Fragment=REACT_FRAGMENT_TYPE,exports.jsx=jsxProd,exports.jsxs=jsxProd;