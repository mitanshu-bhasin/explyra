import{html}from"../html/index.js";var defaultPlugin=()=>({afterResponseHook:e=>200===e.status&&e}),REDIRECT_STATUS_CODES=new Set([301,302,303,307,308]),generateRedirectHtml=e=>html`<!DOCTYPE html>
<title>Redirecting to: ${e}</title>
<meta http-equiv="refresh" content="0;url=${e}" />
<meta name="robots" content="noindex" />
<link rel="canonical" href="${e}" />
<body>
<a href="${e}">Redirecting to <code>${e}</code></a>
</body>
`.toString().replace(/\n/g,""),redirectPlugin=()=>({afterResponseHook:e=>{if(REDIRECT_STATUS_CODES.has(e.status)){const t=e.headers.get("Location");if(!t)return!1;const n=generateRedirectHtml(t);return new Response(n,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}return e}});export{defaultPlugin,redirectPlugin};