export async function onRequest(context) {
  const url = new URL(context.request.url);
  const forwardedHost = context.request.headers.get('x-forwarded-host');
  const host = (forwardedHost || url.hostname || '').toLowerCase();
  
  // If the request is coming from explyra.pages.dev, redirect to explyra.me
  if (host === 'explyra.pages.dev' || host.endsWith('.explyra.pages.dev')) {
    url.hostname = 'explyra.me';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  
  // Otherwise, continue to the next middleware or the actual content
  return context.next();
}
