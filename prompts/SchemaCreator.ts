import { z, ZodObject } from "zod";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

/**
 * SchemaCreator
 * 
 * This class provides a method to convert a plain JavaScript object with string keys
 * (and at most 2 layers deep) into a Zod schema definition.
 */
export class SchemaCreator {
    private static generateTemplateString(value: any): string {
        if (Array.isArray(value)) {
            // Use the first element of the array to infer the structure.
            const elementTemplate = value.length > 0 ? this.generateTemplateString(value[0]) : "";
            return `[${elementTemplate}]`;
        } else if (value !== null && typeof value === "object") {
            const keys = Object.keys(value);
            const props = keys
                .map((key) => `${key}: ${this.generateTemplateString(value[key])}`)
                .join(", ");
            // Wrap object properties with escaped double curly braces.
            return `{{ ${props} }}`;
        } else {
            // For primitives, return a string of their type.
            return `"${typeof value}"`;
        }
    }

    public static async createPromptTemplate(obj: Record<string, any>): Promise<ChatPromptTemplate> {

        const formatInstructions = `Respond only in valid JSON. The JSON object you return should match the following schema:
${this.generateTemplateString(obj)}
`; // TODO: in future add descriptions for each field to the prompt.
        // Prompt
        const prompt = await ChatPromptTemplate.fromMessages([
            [
                "system",
                "Answer the user query. Wrap the output in `json` tags\n{format_instructions}",
            ],
            ["human", "{query}"],
        ]).partial({
            format_instructions: formatInstructions,
        });

        return prompt;
    }

    public static getObjectDepth(obj: Record<string, unknown>): number {
        return Object.keys(obj).reduce((depth, key) => {
            const value = obj[key];
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                return Math.max(depth, this.getObjectDepth(value as Record<string, unknown>));
            }
            return depth;
        }, 1);
    }

    /**
     * Converts the provided schema object into a Zod schema.
     *
     * @param definition - An object with string keys (and at most 2 layers deep) representing the schema.
     * @param depth - Internal use to track the current nesting depth (do not pass in manually).
     * @returns A ZodObject that validates an object matching the schema definition.
     * @throws Error if the input object exceeds a maximum depth of 2.
     */
    public static createZodSchema(
        definition: Record<string, unknown>
    ): ZodObject<any> {
        const shape: Record<string, any> = {};
        const depth = this.getObjectDepth(definition);
        if (depth > 2) {
            throw new Error("Schema exceeds maximum depth of 2");
        }
        for (const key in definition) {
            const value = definition[key];
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                const innerDepth = this.getObjectDepth(value as Record<string, unknown>);
                // At depth 2, throw an error if a nested object contains further object properties.
                if (innerDepth >= 2) {
                    for (const innerKey in value) {
                        const innerVal = (value as Record<string, unknown>)[innerKey];
                        if (typeof innerVal === "object" && innerVal !== null && !Array.isArray(innerVal)) {
                            throw new Error(`Schema exceeds maximum depth of 2 at key: ${key}.${innerKey}`);
                        }
                    }
                    // Build nested schema: all properties at depth-2 are assumed to be strings.
                    const nestedShape: Record<string, any> = {};
                    for (const innerKey in value) {
                        nestedShape[innerKey] = z.string();
                    }
                    shape[key] = z.object(nestedShape);
                } else {
                    // Recursively convert nested object (this call uses depth + 1).
                    shape[key] = this.createZodSchema(value as Record<string, unknown>);
                }
            } else {
                // For any non-object value (or arrays) assume a string type.
                shape[key] = z.string();
            }
        }
        return z.object(shape);
    }
} 
