import { SchemaCreator } from "../prompts/SchemaCreator";
import { z } from "zod";

describe("SchemaCreator.createZodSchema", () => {
    test("should create a valid Zod schema for a one-layer object", () => {
        const definition = {
            answer: "dummy",
            followup_question: "dummy"
        };

        const schema = SchemaCreator.createZodSchema(definition);
        // Should succeed if passed an object with string values.
        const valid = schema.parse({
            answer: "The answer",
            followup_question: "Another question"
        });
        expect(valid).toEqual({
            answer: "The answer",
            followup_question: "Another question"
        });

        // It should fail when a non-string value is provided.
        expect(() => schema.parse({ answer: 123, followup_question: "text" })).toThrow();
    });

    test("should create a valid Zod schema for a two-layer object", () => {
        const definition = {
            user: {
                name: "dummy",
                email: "dummy"
            },
            answer: "dummy"
        };

        const schema = SchemaCreator.createZodSchema(definition);
        const valid = schema.parse({
            user: {
                name: "John Doe",
                email: "john@example.com"
            },
            answer: "Yes"
        });
        expect(valid).toEqual({
            user: {
                name: "John Doe",
                email: "john@example.com"
            },
            answer: "Yes"
        });
    });

    test("should throw error for an object exceeding two layers", () => {
        const definition = {
            user: {
                details: {
                    age: "dummy"
                }
            }
        };

        expect(() => SchemaCreator.createZodSchema(definition)).toThrow("Schema exceeds maximum depth of 2");
    });

    test("should convert non-object values (like arrays) as z.string()", () => {
        const definition = {
            item: [1, 2, 3] // array encountered, so fallback to z.string()
        };

        const schema = SchemaCreator.createZodSchema(definition);
        // Since our conversion simply assigns z.string() to non-objects,
        // the schema will require a string for key "item".
        expect(() => schema.parse({ item: "This is a string" })).not.toThrow();
        expect(() => schema.parse({ item: 123 })).toThrow();
    });
});

/**
 * Unit tests for SchemaCreator's getObjectDepth and generateTemplateString functions.
 */
describe('SchemaCreator', () => {
    describe('getObjectDepth', () => {
        it('should return 1 for a flat object', () => {
            const obj = { a: 1, b: 2 };
            expect(SchemaCreator.getObjectDepth(obj)).toBe(1);
        });

        it('should return 2 for an object with one nested level', () => {
            const obj = { a: { b: 2 } };
            expect(SchemaCreator.getObjectDepth(obj)).toBe(2);
        });

        it('should return 3 for an object with two nested levels', () => {
            const obj = { a: { b: { c: 3 } } };
            expect(SchemaCreator.getObjectDepth(obj)).toBe(3);
        });

        it('should return 4 for an object with three nested levels', () => {
            const obj = { a: { b: { c: { d: 4 } } } };
            expect(SchemaCreator.getObjectDepth(obj)).toBe(4);
        });

        it('should handle bad inputs gracefully', () => {
            // Assuming the expected behavior for non-object inputs is to return 0.
            expect(SchemaCreator.getObjectDepth(null)).toBe(0);
            expect(SchemaCreator.getObjectDepth(undefined)).toBe(0);
            expect(SchemaCreator.getObjectDepth(42)).toBe(0);
            expect(SchemaCreator.getObjectDepth('not an object')).toBe(0);
            // Optionally, if arrays are considered invalid:
            expect(SchemaCreator.getObjectDepth([])).toBe(0);
        });
    });

    describe('generateTemplateString', () => {
        it('should correctly process string input', () => {
            expect(SchemaCreator.generateTemplateString('hello')).toBe('hello');
        });

        it('should correctly process number input', () => {
            expect(SchemaCreator.generateTemplateString(123)).toBe('123');
        });

        it('should correctly process boolean input', () => {
            expect(SchemaCreator.generateTemplateString(true)).toBe('true');
            expect(SchemaCreator.generateTemplateString(false)).toBe('false');
        });

        it('should correctly process null and undefined', () => {
            expect(SchemaCreator.generateTemplateString(null)).toBe('null');
            expect(SchemaCreator.generateTemplateString(undefined)).toBe('undefined');
        });

        it('should correctly process array input', () => {
            const arr = [1, 'a', false];
            expect(SchemaCreator.generateTemplateString(arr)).toBe(JSON.stringify(arr));
        });

        it('should correctly process object input', () => {
            const obj = { a: 1, b: 'test' };
            expect(SchemaCreator.generateTemplateString(obj)).toBe(JSON.stringify(obj));
        });
    });
}); 
