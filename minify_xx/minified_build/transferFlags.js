/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
module.exports=function(e,l,s){var a=e.__flags||(e.__flags=Object.create(null));for(var _ in l.__flags||(l.__flags=Object.create(null)),s=3!==arguments.length||s,a)(s||"object"!==_&&"ssfi"!==_&&"lockSsfi"!==_&&"message"!=_)&&(l.__flags[_]=a[_])};