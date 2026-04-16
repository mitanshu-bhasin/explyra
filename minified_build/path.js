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
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.FieldPath=exports.QualifiedResourcePath=exports.ResourcePath=exports.DEFAULT_DATABASE_ID=void 0,exports.validateResourcePath=validateResourcePath,exports.validateFieldPath=validateFieldPath;const order_1=require("./order"),util_1=require("./util"),validate_1=require("./validate");
/*!
 * The default database ID for this Firestore client. We do not yet expose the
 * ability to use different databases.
 */
exports.DEFAULT_DATABASE_ID="(default)";
/*!
 * A regular expression to verify an absolute Resource Path in Firestore. It
 * extracts the project ID, the database name and the relative resource path
 * if available.
 *
 * @type {RegExp}
 */
const RESOURCE_PATH_RE=/^projects\/([^/]*)\/databases\/([^/]*)(?:\/documents\/)?([\s\S]*)$/,UNESCAPED_FIELD_NAME_RE=/^[_a-zA-Z][_a-zA-Z0-9]*$/,FIELD_PATH_RE=/^[^*~/[\]]+$/;
/*!
 * A regular expression to verify whether a field name can be passed to the
 * backend without escaping.
 *
 * @type {RegExp}
 */class Path{constructor(e){this.segments=e}get size(){return this.segments.length}append(e){return e instanceof Path?this.construct(this.segments.concat(e.segments)):this.construct(this.segments.concat(this.split(e)))}parent(){return 0===this.segments.length?null:this.construct(this.segments.slice(0,this.segments.length-1))}isPrefixOf(e){if(e.segments.length<this.segments.length)return!1;for(let t=0;t<this.segments.length;t++)if(this.segments[t]!==e.segments[t])return!1;return!0}compareTo(e){const t=Math.min(this.segments.length,e.segments.length);for(let r=0;r<t;r++){const t=this.compareSegments(this.segments[r],e.segments[r]);if(0!==t)return t}return(0,order_1.primitiveComparator)(this.segments.length,e.segments.length)}compareSegments(e,t){const r=this.isNumericId(e),s=this.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?this.compareNumbers(this.extractNumericId(e),this.extractNumericId(t)):(0,order_1.compareUtf8Strings)(e,t)}isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}extractNumericId(e){return BigInt(e.substring(4,e.length-2))}compareNumbers(e,t){return e<t?-1:e>t?1:0}toArray(){return this.segments.slice()}popLast(){return this.segments.pop(),this.construct(this.segments)}isEqual(e){return this===e||0===this.compareTo(e)}}class ResourcePath extends Path{constructor(...e){super(e)}get isDocument(){return this.segments.length>0&&this.segments.length%2==0}get isCollection(){return this.segments.length%2==1}get id(){return this.segments.length>0?this.segments[this.segments.length-1]:null}get relativeName(){return this.segments.join("/")}construct(e){return new ResourcePath(...e)}split(e){return e.split("/").filter(e=>e.length>0)}toQualifiedResourcePath(e,t){return new QualifiedResourcePath(e,t,...this.segments)}}exports.ResourcePath=ResourcePath,ResourcePath.EMPTY=new ResourcePath;class QualifiedResourcePath extends ResourcePath{constructor(e,t,...r){super(...r),this.projectId=e,this.databaseId=t}get relativeName(){return this.segments.join("/")}static fromSlashSeparatedString(e){const t=RESOURCE_PATH_RE.exec(e);if(t){const e=t[1],r=t[2],s=t[3];return new QualifiedResourcePath(e,r).append(s)}throw new Error(`Resource name '${e}' is not valid.`)}append(e){return super.append(e)}parent(){return super.parent()}get formattedName(){return["projects",this.projectId,"databases",this.databaseId,"documents",...this.segments].join("/")}construct(e){return new QualifiedResourcePath(this.projectId,this.databaseId,...e)}toQualifiedResourcePath(){return this}compareTo(e){if(e instanceof QualifiedResourcePath){if(this.projectId<e.projectId)return-1;if(this.projectId>e.projectId)return 1;if(this.databaseId<e.databaseId)return-1;if(this.databaseId>e.databaseId)return 1}return super.compareTo(e)}toProto(){return{referenceValue:this.formattedName}}}function validateResourcePath(e,t){if("string"!=typeof t||""===t)throw new Error(`${(0,validate_1.invalidArgumentMessage)(e,"resource path")} Path must be a non-empty string.`);if(t.indexOf("//")>=0)throw new Error(`${(0,validate_1.invalidArgumentMessage)(e,"resource path")} Paths must not contain //.`)}exports.QualifiedResourcePath=QualifiedResourcePath;class FieldPath extends Path{constructor(...e){if(Array.isArray(e[0]))throw new Error("The FieldPath constructor no longer supports an array as its first argument. Please unpack your array and call FieldPath() with individual arguments.");(0,validate_1.validateMinNumberOfArguments)("FieldPath",e,1);for(let t=0;t<e.length;++t)if((0,validate_1.validateString)(t,e[t]),0===e[t].length)throw new Error(`Element at index ${t} should not be an empty string.`);super(e)}static documentId(){return FieldPath._DOCUMENT_ID}static fromArgument(e){return e instanceof FieldPath?e:new FieldPath(...e.split("."))}get formattedName(){return this.segments.map(e=>UNESCAPED_FIELD_NAME_RE.test(e)?e:"`"+e.replace(/\\/g,"\\\\").replace(/`/g,"\\`")+"`").join(".")}toString(){return this.formattedName}split(e){return e.split(".")}construct(e){return new FieldPath(...e)}isEqual(e){return super.isEqual(e)}}function validateFieldPath(e,t){if(!(t instanceof FieldPath)){if(void 0===t)throw new Error((0,validate_1.invalidArgumentMessage)(e,"field path")+" The path cannot be omitted.");if((0,util_1.isObject)(t)&&"FieldPath"===t.constructor.name)throw new Error((0,validate_1.customObjectMessage)(e,t));if("string"!=typeof t)throw new Error(`${(0,validate_1.invalidArgumentMessage)(e,"field path")} Paths can only be specified as strings or via a FieldPath object.`);if(t.indexOf("..")>=0)throw new Error(`${(0,validate_1.invalidArgumentMessage)(e,"field path")} Paths must not contain ".." in them.`);if(t.startsWith(".")||t.endsWith("."))throw new Error(`${(0,validate_1.invalidArgumentMessage)(e,"field path")} Paths must not start or end with ".".`);if(!FIELD_PATH_RE.test(t))throw new Error(`${(0,validate_1.invalidArgumentMessage)(e,"field path")} Paths can't be empty and must not contain\n    "*~/[]".`)}}exports.FieldPath=FieldPath,FieldPath._DOCUMENT_ID=new FieldPath("__name__");