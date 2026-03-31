"use strict";class MergeStrategy{static overwrite(t,e){return e}static replace(t,e){return void 0!==e?e:t}static assign(t,e){return Object.assign({},t,e)}}exports.MergeStrategy=MergeStrategy;
