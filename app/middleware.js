export function middleware(request) {
  const response = new Response(null, {
    status: 204, // for preflight requests (OPTIONS)
    headers: {
      "Access-Control-Allow-Origin": "*", // Or your frontend URL, e.g., 'https://yourfrontend.com'
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });

  if (request.method === "OPTIONS") {
    return response;
  }

  // For all other requests, just return them with the CORS headers
  const nextResponse = NextResponse.next();
  nextResponse.headers.set("Access-Control-Allow-Origin", "*");
  nextResponse.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  nextResponse.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return nextResponse;
}

export const config = {
  matcher: "/api/*", // This will apply the middleware to all API routes
};
