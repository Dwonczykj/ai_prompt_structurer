import { SchemaValidator } from "../utils/SchemaValidator";

// Unit tests for SchemaValidator.validateObjectSchema
describe("SchemaValidator.validateObjectSchema", () => {
    test("should return false for non-object values", () => {
        expect(SchemaValidator.validateObjectSchema("string")).toBe(false);
        expect(SchemaValidator.validateObjectSchema(123)).toBe(false);
        expect(SchemaValidator.validateObjectSchema(true)).toBe(false);
    });

    test("should return false for null and undefined", () => {
        expect(SchemaValidator.validateObjectSchema(null)).toBe(false);
        expect(SchemaValidator.validateObjectSchema(undefined)).toBe(false);
    });

    test("should return false for arrays", () => {
        expect(SchemaValidator.validateObjectSchema([])).toBe(false);
        expect(SchemaValidator.validateObjectSchema([1, 2, 3])).toBe(false);
    });

    test("should return false for empty objects", () => {
        expect(SchemaValidator.validateObjectSchema({})).toBe(false);
    });

    test("should return true for a valid one-layer object schema", () => {
        const schema = { key: "value" };
        expect(SchemaValidator.validateObjectSchema(schema)).toBe(true);
    });

    test("should return true for a valid two-layer object schema", () => {
        const schema = { key1: "value", key2: { subKey: "subValue" } };
        expect(SchemaValidator.validateObjectSchema(schema)).toBe(true);
    });

    test("should return false for a three-layer object schema", () => {
        const schema = { key1: { subKey: { subSubKey: "subSubValue" } } };
        expect(SchemaValidator.validateObjectSchema(schema)).toBe(false);
    });

    test("should return false if any nested value is an array", () => {
        const schema = { key1: [1, 2, 3] };
        expect(SchemaValidator.validateObjectSchema(schema)).toBe(false);
    });

    test("should return true for a valid two-layer object with a nested empty object", () => {
        const schema = { key1: {} };
        expect(SchemaValidator.validateObjectSchema(schema)).toBe(true);
    });
}); 
