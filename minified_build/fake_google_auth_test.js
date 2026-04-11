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
 */Object.defineProperty(exports,"__esModule",{value:!0});const google_auth_library_1=require("google-auth-library"),fake_google_auth_1=require("./fake_google_auth");describe("Fake GoogleAuth",()=>{it("can create fake GoogleAuth with GoogleAuth instance.",()=>{const e=(0,fake_google_auth_1.createFakeGoogleAuth)();expect(e).toBeInstanceOf(google_auth_library_1.GoogleAuth)}),it("can setup and get fake token.",async()=>{const e=(0,fake_google_auth_1.createFakeGoogleAuth)({accessToken:"abc123"}),t=await e.getAccessToken();expect(t).toEqual("abc123")}),it("can setup and get undefined token.",async()=>{const e=(0,fake_google_auth_1.createFakeGoogleAuth)({accessToken:void 0}),t=await e.getAccessToken();expect(t).toBeUndefined()}),it("can setup and get null token.",async()=>{const e=(0,fake_google_auth_1.createFakeGoogleAuth)({accessToken:null}),t=await e.getAccessToken();expect(t).toBeNull()})});