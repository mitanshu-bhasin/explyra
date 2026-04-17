import{ServiceObject}from"./nodejs-common/index.js";import{promisifyAll}from"@google-cloud/promisify";class Notification extends ServiceObject{constructor(t,e){const i={},o={create:!0,delete:{reqOpts:{qs:i}},get:{reqOpts:{qs:i}},getMetadata:{reqOpts:{qs:i}},exists:!0};super({parent:t,baseUrl:"/notificationConfigs",id:e.toString(),createMethod:t.createNotification.bind(t),methods:o})}}
/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */promisifyAll(Notification);export{Notification};