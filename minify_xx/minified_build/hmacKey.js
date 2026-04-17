import{ServiceObject}from"./nodejs-common/index.js";import{IdempotencyStrategy}from"./storage.js";import{promisifyAll}from"@google-cloud/promisify";export class HmacKey extends ServiceObject{constructor(t,e,r){super({parent:t,id:e,baseUrl:`/projects/${r&&r.projectId||t.projectId}/hmacKeys`,methods:{delete:!0,get:!0,getMetadata:!0,setMetadata:{reqOpts:{method:"PUT"}}}}),this.storage=t,this.instanceRetryValue=t.retryOptions.autoRetry}setMetadata(t,e,r){this.storage.retryOptions.idempotencyStrategy!==IdempotencyStrategy.RetryAlways&&(this.storage.retryOptions.autoRetry=!1);const o="object"==typeof e?e:{};r="function"==typeof e?e:r,super.setMetadata(t,o).then(t=>r(null,...t)).catch(r).finally(()=>{this.storage.retryOptions.autoRetry=this.instanceRetryValue})}}
/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */promisifyAll(HmacKey);