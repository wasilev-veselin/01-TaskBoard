//
// middlewares - Custom Express middleware such as validation, error handling, and CORS.

export function corsMiddleware(request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  response.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // Browser check request for POST/PUT/DELETE calls.
  if (request.method === "OPTIONS") {
    return response.sendStatus(204)
  }

  next()
}
