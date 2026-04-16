"use strict";
/**
 * Character class utilities for XML NS 1.0 edition 3.
 *
 * @author Louis-Dominique Dubeau
 * @license MIT
 * @copyright Louis-Dominique Dubeau
 */function isNCNameStartChar(e){return e>=65&&e<=90||95===e||e>=97&&e<=122||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=767||e>=880&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function isNCNameChar(e){return isNCNameStartChar(e)||45===e||46===e||e>=48&&e<=57||183===e||e>=768&&e<=879||e>=8255&&e<=8256}Object.defineProperty(exports,"__esModule",{value:!0}),exports.NC_NAME_START_CHAR="A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿",exports.NC_NAME_CHAR="-"+exports.NC_NAME_START_CHAR+".0-9·̀-ͯ‿-⁀",exports.NC_NAME_START_CHAR_RE=new RegExp("^["+exports.NC_NAME_START_CHAR+"]$","u"),exports.NC_NAME_CHAR_RE=new RegExp("^["+exports.NC_NAME_CHAR+"]$","u"),exports.NC_NAME_RE=new RegExp("^["+exports.NC_NAME_START_CHAR+"]["+exports.NC_NAME_CHAR+"]*$","u"),exports.isNCNameStartChar=isNCNameStartChar,exports.isNCNameChar=isNCNameChar;