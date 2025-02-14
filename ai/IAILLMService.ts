import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { HumanMessage, SystemMessage, AIMessage, MessageContent } from "@langchain/core/messages";

/**
 * IAILLMService
 *
 * Defines the contract for an AI Language Model service that can generate responses from prompts.
 */
export interface IAILLMService {
  readonly llm: BaseChatModel;

  generateResponse(
    prompt: string,
    messages: (HumanMessage | SystemMessage | AIMessage)[],
    model: string,
    dataStructure: Map<string, any>,
    temperature: number,
    maxTokens: number
  ): Promise<string | MessageContent>;
} 
