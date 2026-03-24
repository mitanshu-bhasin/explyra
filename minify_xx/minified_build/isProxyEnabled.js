var config=require("../config");
/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */module.exports=function(){return config.useProxy&&"undefined"!=typeof Proxy&&"undefined"!=typeof Reflect};