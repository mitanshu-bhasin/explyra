/*
  @license
	Rollup.js v4.59.0
	Sun, 22 Feb 2026 07:31:53 GMT - commit ae846957f109690a866cc3e4c073613c338d3476

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
"use strict";let fsEvents,fsEventsImportError;async function loadFsEvents(){try{({default:fsEvents}=await import("fsevents"))}catch(t){fsEventsImportError=t}}function getFsEvents(){if(fsEventsImportError)throw fsEventsImportError;return fsEvents}const fseventsImporter=Object.defineProperty({__proto__:null,getFsEvents:getFsEvents,loadFsEvents:loadFsEvents},Symbol.toStringTag,{value:"Module"});exports.fseventsImporter=fseventsImporter,exports.loadFsEvents=loadFsEvents;