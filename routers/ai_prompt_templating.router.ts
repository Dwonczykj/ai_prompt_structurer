import { Router, Request, Response } from 'express';
import { SchemaValidator } from '../utils/SchemaValidator';
import { IStructuredPromptTemplateCreator } from '../prompts/IStructuredPromptTemplateCreator';
import { LangChainStructuredPromptTemplateCreator } from '../prompts/LangChainStructuredPromptTemplateCreator';
import { IAILLMService } from '../ai/IAILLMService';
import { OpenAIService } from '../ai/OpenAIService';

const router: Router = Router();

/**
 * POST /structure_prompt
 *
 * This endpoint accepts a JSON object or schema which specifies the desired JSON structure.
 * It then generates a prompt template instructing any LLM to produce an output strictly following the JSON structure.
 * The response includes:
 * 1. prompt_template: A prompt for the LLM.
 * 2. template_variables: An array of keys that are expected in the JSON structure.
 *
 * SOLID & Separation of Concerns Note:
 * The logic for generating the prompt template is encapsulated in the generatePromptTemplate function.
 * This can be further extended or moved to a separate service for more complex scenarios.
 */
router.post('/structure_prompt', async (req: Request, res: Response): Promise<void> => {
    const schema = req.body; // The input expected to represent a JSON schema/object

    // Basic validation: check if schema is provided and non-empty
    if (!schema || (typeof schema === 'object' && Object.keys(schema).length === 0)) {
        res.status(400).json({ error: "Invalid schema provided" });
        return;
    }

    // Validate the schema
    if (!SchemaValidator.validateObjectSchema(schema)) {
        res.status(400).json({ error: "Invalid schema provided" });
        return;
    }

    // Generate the prompt template and extract template variables from the provided schema
    const { promptTemplate, templateVariables } = await generatePromptTemplate(schema);

    // Respond with the generated prompt template and the extracted template variables
    res.json({
        prompt_template: promptTemplate,
        template_variables: templateVariables
    });
});

/**
 * generatePromptTemplate
 * 
 * This helper function generates a prompt template based on the provided JSON schema.
 * For this simple implementation, it extracts top-level keys as template variables.
 * In a more advanced scenario, nested keys and validation can be handled as needed.
 *
 * @param schema - The JSON schema/object that defines the expected JSON response structure.
 * @returns An object containing the promptTemplate and an array of templateVariables.
 */
async function generatePromptTemplate(schema: any): Promise<{ promptTemplate: string; templateVariables: string[] }> {
    // Extract top-level keys as template variables. This method can be extended to handle nested keys.

    // TOOD: This needs to be wired up to the 
    let llmService: IAILLMService = new OpenAIService();
    let structuredPromptCreator: IStructuredPromptTemplateCreator = new LangChainStructuredPromptTemplateCreator(llmService);

    let structuredPromptTemplate = await structuredPromptCreator.createStructuredPromptTemplateFromSchema(schema);

    let promptTemplate = await structuredPromptTemplate.format({ query: "<query>" });

    return { promptTemplate: promptTemplate, templateVariables: ["query"] };
}

export default router; 
