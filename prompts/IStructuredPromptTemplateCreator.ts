import { ChatPromptTemplate } from "@langchain/core/prompts";

/**
 * IStructuredPromptTemplateCreator
 * 
 * This interface defines a method for generating a structured prompt template
 * from a provided JSON schema. The schema is assumed to be a valid object which is
 * no more than 2 layers deep and with only string keys.
 */
export interface IStructuredPromptTemplateCreator {
    createStructuredPromptTemplateFromSchema(
        schema: Record<string, unknown>
    ): Promise<ChatPromptTemplate>;
} 
