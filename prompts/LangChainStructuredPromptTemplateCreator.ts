import { IStructuredPromptTemplateCreator } from "./IStructuredPromptTemplateCreator";
import { StructuredPromptTemplate } from "./StructuredPromptTemplate";
import { SchemaValidator } from "../utils/SchemaValidator";
import { IAILLMService } from "../ai/IAILLMService";
import { SchemaCreator } from "./SchemaCreator";
import { ChatPromptTemplate } from "@langchain/core/prompts";
/**
 * LangChainStructuredPromptTemplateCreator
 * 
 * An implementation of IStructuredPromptTemplateCreator that validates the
 * provided schema and then creates a structured prompt template formatted for LangChain.
 */
export class LangChainStructuredPromptTemplateCreator implements IStructuredPromptTemplateCreator {
    constructor(private llmService: IAILLMService) { }

    /**
     * Creates a structured prompt template from the provided schema.
     *
     * @param schema - A JSON schema that is an object map with string keys and at most 2 layers deep.
     * @returns A Promise that resolves to a StructuredPromptTemplate containing the constructed prompt and required template variables.
     * @throws Error if the provided schema is invalid.
     */
    public async createStructuredPromptTemplateFromSchema(
        schema: Record<string, unknown>
    ): Promise<ChatPromptTemplate> {
        // Validate the schema using the existing SchemaValidator.
        if (!SchemaValidator.validateObjectSchema(schema)) {
            throw new Error("Invalid schema provided");
        }
        return await SchemaCreator.createPromptTemplate(schema);

        // const modelWithStructure = this.llmService.withStructuredOutput(schema);
    }
} 
