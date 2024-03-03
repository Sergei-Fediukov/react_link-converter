import { useMemo } from 'react'

import { setIn } from 'final-form'
import { ObjectSchema, ValidationError, InferType } from 'yup'

/**
 * Sets the `innerError.message` in an `errors` object at the key
 * defined by `innerError.path`.
 * @param {Record<string, string>} errors The object to set the error in.
 * @param {ValidationError} innerError A `yup` field error.
 * @returns {Record<string, string>} The result of setting the new error message onto `errors`.
 */
const setInError = (errors: Record<string, string>, innerError: ValidationError): Record<string, string> => {
  // Use final-form's setIn to update the errors object with the inner error
  return setIn(errors, innerError.path ?? '', innerError.message) as Record<string, string>
}

/**
 * Empty object map with no prototype. Used as default
 * value for reducing the `err.inner` array of errors
 * from a `yup~ValidationError`.
 * @type {Record<string, string>}
 */
const emptyObj: Record<string, string> = Object.create(null) as Record<string, string>

/**
 * Takes a `yup` validation schema and returns a function that expects
 * a map of values to validate. If the validation passes, the function resolves to `undefined`
 * (signaling that the values are valid). If the validation doesn't pass, it resolves
 * to a map of invalid field names to errors.
 * @param {ObjectSchema<Record<string, any>>} schema `yup` schema definition.
 * @returns {(values: Record<string, any>) => Promise<undefined | Record<string, string>>} An async function that expects some `values`
 *  and resolves to either `undefined` or a map of field names to error messages.
 */
// export const makeValidate = (schema: ObjectSchema<Record<string, any>>): ((values: InferType<typeof schema>) => Promise<undefined | Record<string, string>>) =>
export const makeValidate = (schema: ObjectSchema<Record<string, any>>, options: any): ((values: InferType<typeof schema>) => Promise<undefined | Record<string, string> | Record<string, string>[]>) =>
  async function validate(values: InferType<typeof schema>) {
    try {
      // Validate the values against the Yup schema
      await schema.validate(values, { abortEarly: false })
    } catch (errors: unknown) {
      if (errors instanceof ValidationError) {
        // If validation fails, reduce the inner errors to a map
        return options.isArrayResult ? errors.inner.map((innerError) => setInError(emptyObj, innerError)) : errors.inner.reduce(setInError, emptyObj)
      }
    }
  }

/**
 * Hook to memoize the validation function based on the Yup schema.
 * @param {ObjectSchema<Record<string, any>>} schema `yup` schema definition.
 * @returns {(values: Record<string, any>) => Promise<undefined | Record<string, string>>} Memoized validation function.
 */

export const useValidationSchema = (
  schema: ObjectSchema<Record<string, any>>,
  options: any
): ((values: InferType<typeof schema>) => Promise<undefined | Record<string, string> | Record<string, string>[]>) => {
  // Memoize the validation function to optimize performance
  return useMemo(() => makeValidate(schema, options), [schema, options])
}
