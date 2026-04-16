/**
 * @license React
 * react-jsx-dev-runtime.react-server.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";var React=require("react"),REACT_ELEMENT_TYPE=Symbol.for("react.transitional.element"),REACT_FRAGMENT_TYPE=Symbol.for("react.fragment");if(!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE)throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');function jsxProd(e,r,t){var o=null;if(void 0!==t&&(o=""+t),void 0!==r.key&&(o=""+r.key),"key"in r)for(var n in t={},r)"key"!==n&&(t[n]=r[n]);else t=r;return r=t.ref,{$$typeof:REACT_ELEMENT_TYPE,type:e,key:o,ref:void 0!==r?r:null,props:t}}exports.Fragment=REACT_FRAGMENT_TYPE,exports.jsx=jsxProd,exports.jsxDEV=void 0,exports.jsxs=jsxProd;