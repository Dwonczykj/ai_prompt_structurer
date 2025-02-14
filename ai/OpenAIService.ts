import { IAILLMService } from "./IAILLMService";
import { Logger } from "../logger/Logger";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage, SystemMessage, MessageContent } from "@langchain/core/messages";

export class OpenAIService implements IAILLMService {
  private logger = Logger.getInstance();
  readonly llm: ChatOpenAI;
  constructor() {
    this.llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(
    prompt: string,
    messages: (HumanMessage | SystemMessage | AIMessage)[],
    model: string = "gpt-4o-mini",
    dataStructure: Map<string, any>,
    temperature: number = 0.5,
    maxTokens: number = 1000
  ): Promise<string | MessageContent> {
    this.logger.info("Generating response using OpenAI.");
    try {
      const response = await this.llm.invoke(messages);
      return response.content;
    } catch (error) {
      this.logger.error("Error generating response from OpenAI:", error);
      throw error;
    }
  }




} 
