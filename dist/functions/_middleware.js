export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // If the request is coming from explyra.pages.dev, redirect to explyra.me
  if (url.hostname === 'explyra.pages.dev' || url.hostname.endsWith('.explyra.pages.dev')) {
    url.hostname = 'explyra.me';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  
  // Otherwise, continue to the next middleware or the actual content
  return context.next();
}
