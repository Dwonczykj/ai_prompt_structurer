import { LangChainStructuredPromptTemplateCreator } from "../prompts/LangChainStructuredPromptTemplateCreator";
import { StructuredPromptTemplate } from "../prompts/StructuredPromptTemplate";
import { IAILLMService } from "../ai/IAILLMService";
import { ChatOpenAI } from "@langchain/openai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AIMessageChunk } from "@langchain/core/messages";
import { mock, instance, when, verify } from 'ts-mockito';

class DummyLLMService implements IAILLMService {
    readonly llm: BaseChatModel;

    constructor() {
        this.llm = mock<BaseChatModel>(ChatOpenAI);
        when(this.llm.invoke("some query")).thenResolve(new AIMessageChunk("dummy response"));
    }

    generateResponse(
        prompt: string,
        messages: any[],
        model: string,
        dataStructure: Map<string, any>,
        temperature: number = 0.5,
        maxTokens: number = 1000
    ): Promise<string> {
        // Return a dummy response for testing purposes.
        return Promise.resolve("dummy response");
    }
}

describe("LangChainStructuredPromptTemplateCreator.createStructuredPromptTemplateFromSchema", () => {
    const dummyLLMService = new DummyLLMService();
    const creator = new LangChainStructuredPromptTemplateCreator(dummyLLMService);

    test("should throw error for non-object values", async () => {
        // @ts-ignore: Testing invalid type inputs
        await expect(creator.createStructuredPromptTemplateFromSchema("string")).rejects.toThrow("Invalid schema provided");
        // @ts-ignore
        await expect(creator.createStructuredPromptTemplateFromSchema(123)).rejects.toThrow("Invalid schema provided");
        // @ts-ignore
        await expect(creator.createStructuredPromptTemplateFromSchema(true)).rejects.toThrow("Invalid schema provided");
    });

    test("should throw error for null schema", async () => {
        // @ts-ignore: Testing with null
        await expect(creator.createStructuredPromptTemplateFromSchema(null)).rejects.toThrow("Invalid schema provided");
    });

    test("should throw error for arrays", async () => {
        // @ts-ignore: Testing with an array instead of an object
        await expect(creator.createStructuredPromptTemplateFromSchema([])).rejects.toThrow("Invalid schema provided");
    });

    test("should throw error for empty object", async () => {
        await expect(creator.createStructuredPromptTemplateFromSchema({})).rejects.toThrow("Invalid schema provided");
    });

    test("should throw error for a three-layer nested object", async () => {
        const schema = { key1: { subKey: { subSubKey: "value" } } };
        await expect(creator.createStructuredPromptTemplateFromSchema(schema)).rejects.toThrow("Invalid schema provided");
    });

    test("should successfully create prompt for a valid one-layer object schema", async () => {
        const schema = { key: "value" };
        const result = await creator.createStructuredPromptTemplateFromSchema(schema);
        const promptTemplate = await result.format({ query: "<query>" });
        expect(promptTemplate).toContain("{{\"key\":\"value\"}}");
        expect(promptTemplate).toContain("<query>");
    });

    test("should successfully create prompt for a valid two-layer object schema", async () => {
        const schema = {
            key1: "value",
            key2: { subKey: "subValue" }
        };
        const result = await creator.createStructuredPromptTemplateFromSchema(schema);
        const promptTemplate = await result.format({ query: "<query>" });
        expect(promptTemplate).toContain("{{\"key1\":\"value\",\"key2\":{\"subKey\":\"subValue\"}}}");
        expect(promptTemplate).toContain("<query>");
    });
}); 
