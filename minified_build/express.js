/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
"use strict";var bodyParser=require("body-parser"),EventEmitter=require("node:events").EventEmitter,mixin=require("merge-descriptors"),proto=require("./application"),Router=require("router"),req=require("./request"),res=require("./response");function createApplication(){var e=function(r,t,o){e.handle(r,t,o)};return mixin(e,EventEmitter.prototype,!1),mixin(e,proto,!1),e.request=Object.create(req,{app:{configurable:!0,enumerable:!0,writable:!0,value:e}}),e.response=Object.create(res,{app:{configurable:!0,enumerable:!0,writable:!0,value:e}}),e.init(),e}exports=module.exports=createApplication,exports.application=proto,exports.request=req,exports.response=res,exports.Route=Router.Route,exports.Router=Router,exports.json=bodyParser.json,exports.raw=bodyParser.raw,exports.static=require("serve-static"),exports.text=bodyParser.text,exports.urlencoded=bodyParser.urlencoded;