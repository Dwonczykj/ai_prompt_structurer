import { IAILLMService } from "./IAILLMService";
import { Logger } from "../../logger/Logger";

export class AnthropicService implements IAILLMService {
  private logger = Logger.getInstance();

  async generateResponse(prompt: string): Promise<string> {
    this.logger.info("Generating response using Anthropic.");
    // TODO: Implement integration with Anthropic via Langchain
    return "Response from Anthropic";
  }
} 