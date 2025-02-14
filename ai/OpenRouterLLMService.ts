import { IAILLMService } from "./IAILLMService";
import { Logger } from "../logger/Logger";
import axios from "axios";

export class OpenRouterLLMService implements IAILLMService {
  private logger = Logger.getInstance();

  async generateResponse(prompt: string): Promise<string> {
    this.logger.info("Generating response using OpenRouter LLM.");
    try {
      const response = await axios.post("https://openrouter.ai/chat/completions", {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      return response.data.choices[0].message.content;
    } catch (error: any) {
      this.logger.error(`Error generating response via OpenRouter: ${error.message}`);
      throw error;
    }
  }
} 