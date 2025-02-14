import { IAILLMService } from "./IAILLMService";
import { Logger } from "../../logger/Logger";

export class OllamaService implements IAILLMService {
  private logger = Logger.getInstance();

  async generateResponse(prompt: string): Promise<string> {
    this.logger.info("Generating response using Ollama.");
    // TODO: Implement integration with Ollama via Langchain
    return "Response from Ollama";
  }
} 