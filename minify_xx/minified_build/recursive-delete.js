"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RecursiveDelete=exports.RECURSIVE_DELETE_MIN_PENDING_OPS=exports.RECURSIVE_DELETE_MAX_PENDING_OPS=exports.REFERENCE_NAME_MIN_ID=void 0;const assert=require("assert"),_1=require("."),util_1=require("./util"),query_options_1=require("./reference/query-options");
/*!
 * Datastore allowed numeric IDs where Firestore only allows strings. Numeric
 * IDs are exposed to Firestore as __idNUM__, so this is the lowest possible
 * negative numeric value expressed in that format.
 *
 * This constant is used to specify startAt/endAt values when querying for all
 * descendants in a single collection.
 */exports.REFERENCE_NAME_MIN_ID="__id-9223372036854775808__",
/*!
 * The query limit used for recursive deletes when fetching all descendants of
 * the specified reference to delete. This is done to prevent the query stream
 * from streaming documents faster than Firestore can delete.
 */
exports.RECURSIVE_DELETE_MAX_PENDING_OPS=5e3,
/*!
 * The number of pending BulkWriter operations at which RecursiveDelete
 * starts the next limit query to fetch descendants. By starting the query
 * while there are pending operations, Firestore can improve BulkWriter
 * throughput. This helps prevent BulkWriter from idling while Firestore
 * fetches the next query.
 */
exports.RECURSIVE_DELETE_MIN_PENDING_OPS=1e3;class RecursiveDelete{constructor(e,t,r,s,i){this.firestore=e,this.writer=t,this.ref=r,this.maxLimit=s,this.minLimit=i,this.errorCount=0,this.documentsPending=!0,this.started=!1,this.completionDeferred=new util_1.Deferred,this.streamInProgress=!1,this.pendingOpsCount=0,this.errorStack="",this.maxPendingOps=s,this.minPendingOps=i}run(){return assert(!this.started,"RecursiveDelete.run() should only be called once."),this.errorStack=Error().stack,this.writer._verifyNotClosed(),this.setupStream(),this.completionDeferred.promise}setupStream(){const e=this.getAllDescendants((this.ref,_1.CollectionReference,this.ref));this.streamInProgress=!0;let t=0;e.on("error",e=>{e.code=14,e.stack="Failed to fetch children documents: "+e.stack,this.lastError=e,this.onQueryEnd()}).on("data",e=>{t++,this.lastDocumentSnap=e,this.deleteRef(e.ref)}).on("end",()=>{this.streamInProgress=!1,t<this.minPendingOps?this.onQueryEnd():0===this.pendingOpsCount&&this.setupStream()})}getAllDescendants(e){let t=e._resourcePath;e instanceof _1.CollectionReference&&(t=t.popLast());const r=e instanceof _1.CollectionReference?e.id:e.parent.id;let s=new _1.Query(this.firestore,query_options_1.QueryOptions.forKindlessAllDescendants(t,r,!1));if(s=s.select(_1.FieldPath.documentId()).limit(this.maxPendingOps),e instanceof _1.CollectionReference){const e=String.fromCharCode(0),t=r+"/"+exports.REFERENCE_NAME_MIN_ID,i=r+e+"/"+exports.REFERENCE_NAME_MIN_ID;s=s.where(_1.FieldPath.documentId(),">=",t).where(_1.FieldPath.documentId(),"<",i)}return this.lastDocumentSnap&&(s=s.startAfter(this.lastDocumentSnap)),s.stream()}onQueryEnd(){this.documentsPending=!1,this.ref instanceof _1.DocumentReference&&this.writer.delete(this.ref).catch(e=>this.incrementErrorCount(e)),this.writer.flush().then(async()=>{var e;if(void 0===this.lastError)this.completionDeferred.resolve();else{let t=new(require("google-gax/build/src/fallback").GoogleError)(`${this.errorCount} `+(1!==this.errorCount?"deletes":"delete")+" failed. The last delete failed with: ");void 0!==this.lastError.code&&(t.code=this.lastError.code),t=(0,util_1.wrapError)(t,this.errorStack),this.completionDeferred.reject(this.lastError.stack?(0,util_1.wrapError)(t,null!==(e=this.lastError.stack)&&void 0!==e?e:""):t)}})}deleteRef(e){this.pendingOpsCount++,this.writer.delete(e).catch(e=>{this.incrementErrorCount(e)}).then(()=>{this.pendingOpsCount--,this.documentsPending&&!this.streamInProgress&&this.pendingOpsCount<this.minPendingOps&&this.setupStream()})}incrementErrorCount(e){this.errorCount++,this.lastError=e}}exports.RecursiveDelete=RecursiveDelete;