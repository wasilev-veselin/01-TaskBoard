import { z } from "zod"

// Request validation middleware. Schemas live in src/schemas.
function formatValidationErrors(error) {
  const flattenedError = z.flattenError(error)

  return {
    formErrors: flattenedError.formErrors,
    fieldErrors: flattenedError.fieldErrors,
  }
}

export function validateParams(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.params)

    if (!result.success) {
      return response.status(400).json({
        error: "Validation paramerror",
        details: formatValidationErrors(result.error),
      })
    }

    request.params = result.data
    next()
  }
}

export function validateBody(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.body)

    if (!result.success) {
      return response.status(400).json({
        error: "Validation bodyerror",
        details: formatValidationErrors(result.error),
      })
    }

    request.body = result.data
    next()
  }
}
