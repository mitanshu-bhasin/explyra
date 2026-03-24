/**
 * @preserve
 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
 *
 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
 * @see http://github.com/homebrewing/brauhaus-diff
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 */
!function(){var t;function e(h,r){var s=this instanceof e?this:t;if(s.reset(r),"string"==typeof h&&h.length>0&&s.hash(h),s!==this)return s}e.prototype.hash=function(t){var e,h,r,s,i;switch(i=t.length,this.len+=i,h=this.k1,r=0,this.rem){case 0:h^=i>r?65535&t.charCodeAt(r++):0;case 1:h^=i>r?(65535&t.charCodeAt(r++))<<8:0;case 2:h^=i>r?(65535&t.charCodeAt(r++))<<16:0;case 3:h^=i>r?(255&t.charCodeAt(r))<<24:0,h^=i>r?(65280&t.charCodeAt(r++))>>8:0}if(this.rem=i+this.rem&3,(i-=this.rem)>0){for(e=this.h1;e=5*(e=(e^=h=13715*(h=(h=11601*h+3432906752*(65535&h)&4294967295)<<15|h>>>17)+461832192*(65535&h)&4294967295)<<13|e>>>19)+3864292196&4294967295,!(r>=i);)h=65535&t.charCodeAt(r++)^(65535&t.charCodeAt(r++))<<8^(65535&t.charCodeAt(r++))<<16,h^=(255&(s=t.charCodeAt(r++)))<<24^(65280&s)>>8;switch(h=0,this.rem){case 3:h^=(65535&t.charCodeAt(r+2))<<16;case 2:h^=(65535&t.charCodeAt(r+1))<<8;case 1:h^=65535&t.charCodeAt(r)}this.h1=e}return this.k1=h,this},e.prototype.result=function(){var t,e;return t=this.k1,e=this.h1,t>0&&(e^=t=13715*(t=(t=11601*t+3432906752*(65535&t)&4294967295)<<15|t>>>17)+461832192*(65535&t)&4294967295),e^=this.len,e=51819*(e^=e>>>16)+2246770688*(65535&e)&4294967295,e=44597*(e^=e>>>13)+3266445312*(65535&e)&4294967295,(e^=e>>>16)>>>0},e.prototype.reset=function(t){return this.h1="number"==typeof t?t:0,this.rem=this.k1=this.len=0,this},t=new e,"undefined"!=typeof module?module.exports=e:this.MurmurHash3=e}();