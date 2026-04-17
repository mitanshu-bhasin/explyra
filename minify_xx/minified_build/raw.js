/*!
 * body-parser
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
"use strict";var debug=require("debug")("body-parser:raw"),read=require("../read"),{normalizeOptions:normalizeOptions,passthrough:passthrough}=require("../utils");function raw(r){const e={...normalizeOptions(r,"application/octet-stream"),skipCharset:!0};return function(r,t,a){read(r,t,a,passthrough,debug,e)}}module.exports=raw;