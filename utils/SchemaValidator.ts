/**
 * SchemaValidator
 * 
 * This class provides static helper methods for validating object schemas.
 * A valid object schema:
 *   - Must be an object literal (not a primitive value, array, or null).
 *   - The top-level object must have at least one key.
 *   - Can be nested no more than 2 layers deep.
 *   - All keys in objects and nested objects must be strings.
 */
export class SchemaValidator {
    /**
     * Validates that the provided input is a valid object schema.
     *
     * @param input - The input to validate.
     * @returns true if the input is a valid object schema, false otherwise.
     */
    public static validateObjectSchema(input: unknown): boolean {
        // Check if input is a non-null object and not an array.
        if (typeof input !== 'object' || input === null || Array.isArray(input)) {
            return false;
        }
        // Cast to an object literal with string keys.
        const obj = input as Record<string, unknown>;

        // Top-level object should not be empty.
        if (Object.keys(obj).length === 0) {
            return false;
        }

        /**
         * Recursively checks that the object does not exceed 2 layers deep.
         * @param currentObj - The object to check.
         * @param currentDepth - Current depth of the object.
         * @returns true if the depth is within limits; false otherwise.
         */
        function checkDepth(currentObj: unknown, currentDepth: number): boolean {
            // If current depth exceeds 2, the schema is invalid.
            if (currentDepth > 2) {
                return false;
            }

            // For non-object values or arrays, no need to check further.
            if (typeof currentObj !== 'object' || currentObj === null || Array.isArray(currentObj)) {
                return true;
            }

            // Iterate over each key in the object.
            for (const key of Object.keys(currentObj)) {
                // Keys in JavaScript are always strings, but extra check is added per requirements.
                if (typeof key !== 'string') {
                    return false;
                }
                const value = (currentObj as Record<string, unknown>)[key];
                // Reject if the value is an array.
                if (Array.isArray(value)) {
                    return false;
                }
                // If value is an object, recursively validate its depth.
                if (typeof value === 'object' && value !== null) {
                    if (!checkDepth(value, currentDepth + 1)) {
                        return false;
                    }
                }
            }
            return true;
        }

        return checkDepth(obj, 1);
    }
} 
