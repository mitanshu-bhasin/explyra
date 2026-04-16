"use strict";
/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.primitiveComparator=primitiveComparator,exports.compareArrays=compareArrays,exports.compareUtf8Strings=compareUtf8Strings,exports.compare=compare;const convert_1=require("./convert"),path_1=require("./path");
/*!
 * The type order as defined by the backend.
 */
var TypeOrder;
/*!
 * @private
 * @internal
 */
function typeOrder(e){const r=(0,convert_1.detectValueType)(e);switch(r){case"nullValue":return TypeOrder.NULL;case"integerValue":case"doubleValue":return TypeOrder.NUMBER;case"stringValue":return TypeOrder.STRING;case"booleanValue":return TypeOrder.BOOLEAN;case"arrayValue":return TypeOrder.ARRAY;case"timestampValue":return TypeOrder.TIMESTAMP;case"geoPointValue":return TypeOrder.GEO_POINT;case"bytesValue":return TypeOrder.BLOB;case"referenceValue":return TypeOrder.REF;case"mapValue":return TypeOrder.OBJECT;case"vectorValue":return TypeOrder.VECTOR;default:throw new Error("Unexpected value type: "+r)}}
/*!
 * @private
 * @internal
 */function primitiveComparator(e,r){return e<r?-1:e>r?1:0}
/*!
 * Utility function to compare doubles (using Firestore semantics for NaN).
 * @private
 * @internal
 */function compareNumbers(e,r){return e<r?-1:e>r?1:e===r?0:isNaN(e)?isNaN(r)?0:-1:1}
/*!
 * @private
 * @internal
 */function compareNumberProtos(e,r){let t,a;return t=void 0!==e.integerValue?Number(e.integerValue):Number(e.doubleValue),a=void 0!==r.integerValue?Number(r.integerValue):Number(r.doubleValue),compareNumbers(t,a)}
/*!
 * @private
 * @internal
 */function compareTimestamps(e,r){const t=primitiveComparator(e.seconds||0,r.seconds||0);return 0!==t?t:primitiveComparator(e.nanos||0,r.nanos||0)}
/*!
 * @private
 * @internal
 */function compareBlobs(e,r){if(!(e instanceof Buffer&&r instanceof Buffer))throw new Error("Blobs can only be compared if they are Buffers.");return Buffer.compare(e,r)}
/*!
 * @private
 * @internal
 */function compareReferenceProtos(e,r){const t=path_1.QualifiedResourcePath.fromSlashSeparatedString(e.referenceValue),a=path_1.QualifiedResourcePath.fromSlashSeparatedString(r.referenceValue);return t.compareTo(a)}
/*!
 * @private
 * @internal
 */function compareGeoPoints(e,r){return primitiveComparator(e.latitude||0,r.latitude||0)||primitiveComparator(e.longitude||0,r.longitude||0)}
/*!
 * @private
 * @internal
 */function compareArrays(e,r){for(let t=0;t<e.length&&t<r.length;t++){const a=compare(e[t],r[t]);if(0!==a)return a}return primitiveComparator(e.length,r.length)}
/*!
 * @private
 * @internal
 */function compareObjects(e,r){const t=Object.keys(e),a=Object.keys(r);t.sort(),a.sort();for(let o=0;o<t.length&&o<a.length;o++){const n=compareUtf8Strings(t[o],a[o]);if(0!==n)return n;const u=t[o],i=compare(e[u],r[u]);if(0!==i)return i}return primitiveComparator(t.length,a.length)}
/*!
 * @private
 * @internal
 */function compareVectors(e,r){var t,a,o,n,u,i;const c=null!==(o=null===(a=null===(t=null==e?void 0:e.value)||void 0===t?void 0:t.arrayValue)||void 0===a?void 0:a.values)&&void 0!==o?o:[],p=null!==(i=null===(u=null===(n=null==r?void 0:r.value)||void 0===n?void 0:n.arrayValue)||void 0===u?void 0:u.values)&&void 0!==i?i:[],s=primitiveComparator(c.length,p.length);return 0!==s?s:compareArrays(c,p)}
/*!
 * Compare strings in UTF-8 encoded byte order
 * @private
 * @internal
 */function compareUtf8Strings(e,r){const t=Math.min(e.length,r.length);for(let a=0;a<t;a++){const t=e.charAt(a),o=r.charAt(a);if(t!==o)return isSurrogate(t)===isSurrogate(o)?primitiveComparator(t,o):isSurrogate(t)?1:-1}return primitiveComparator(e.length,r.length)}!function(e){e[e.NULL=0]="NULL",e[e.BOOLEAN=1]="BOOLEAN",e[e.NUMBER=2]="NUMBER",e[e.TIMESTAMP=3]="TIMESTAMP",e[e.STRING=4]="STRING",e[e.BLOB=5]="BLOB",e[e.REF=6]="REF",e[e.GEO_POINT=7]="GEO_POINT",e[e.ARRAY=8]="ARRAY",e[e.VECTOR=9]="VECTOR",e[e.OBJECT=10]="OBJECT"}(TypeOrder||(TypeOrder={}));const MIN_SURROGATE=55296,MAX_SURROGATE=57343;function isSurrogate(e){const r=e.charCodeAt(0);return r>=MIN_SURROGATE&&r<=MAX_SURROGATE}
/*!
 * @private
 * @internal
 */function compare(e,r){const t=typeOrder(e),a=primitiveComparator(t,typeOrder(r));if(0!==a)return a;switch(t){case TypeOrder.NULL:return 0;case TypeOrder.BOOLEAN:return primitiveComparator(e.booleanValue,r.booleanValue);case TypeOrder.STRING:return compareUtf8Strings(e.stringValue,r.stringValue);case TypeOrder.NUMBER:return compareNumberProtos(e,r);case TypeOrder.TIMESTAMP:return compareTimestamps(e.timestampValue,r.timestampValue);case TypeOrder.BLOB:return compareBlobs(e.bytesValue,r.bytesValue);case TypeOrder.REF:return compareReferenceProtos(e,r);case TypeOrder.GEO_POINT:return compareGeoPoints(e.geoPointValue,r.geoPointValue);case TypeOrder.ARRAY:return compareArrays(e.arrayValue.values||[],r.arrayValue.values||[]);case TypeOrder.OBJECT:return compareObjects(e.mapValue.fields||{},r.mapValue.fields||{});case TypeOrder.VECTOR:return compareVectors(e.mapValue.fields||{},r.mapValue.fields||{});default:throw new Error(`Encountered unknown type order: ${t}`)}}