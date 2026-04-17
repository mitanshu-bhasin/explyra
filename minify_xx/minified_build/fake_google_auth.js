"use strict";
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Object.defineProperty(exports,"__esModule",{value:!0}),exports.createFakeGoogleAuth=exports.FakeGoogleAuth=void 0;const google_auth_library_1=require("google-auth-library");class FakeGoogleAuth extends google_auth_library_1.GoogleAuth{constructor(e){super(),this.params=e}getAccessToken(){if(this.params.accessTokenError)throw this.params.accessTokenError;return Promise.resolve(this.params.accessToken)}}function createFakeGoogleAuth(e={accessToken:"DEFAULT_TOKEN"}){return new FakeGoogleAuth(e)}exports.FakeGoogleAuth=FakeGoogleAuth,exports.createFakeGoogleAuth=createFakeGoogleAuth;