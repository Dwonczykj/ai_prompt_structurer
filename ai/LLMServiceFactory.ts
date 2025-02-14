import { IAILLMService } from "./IAILLMService";
import { GoogleGeminiService } from "./GoogleGeminiService";
import { OpenAIService } from "./OpenAIService";
import { DeepseekService } from "./DeepseekService";
import { OllamaService } from "./OllamaService";
import { AnthropicService } from "./AnthropicService";
import { OpenRouterLLMService } from "./OpenRouterLLMService";

export type LLMServiceType = "googleGemini" | "openai" | "deepseek" | "ollama" | "anthropic" | "openrouter";

export class LLMServiceFactory {
  public static createLLMService(type: LLMServiceType): IAILLMService {
    switch (type) {
      case "googleGemini":
        return new GoogleGeminiService();
      case "openai":
        return new OpenAIService();
      case "deepseek":
        return new DeepseekService();
      case "ollama":
        return new OllamaService();
      case "anthropic":
        return new AnthropicService();
      case "openrouter":
        return new OpenRouterLLMService();
      default:
        throw new Error(`Unsupported LLM Service type: ${type}`);
    }
  }
} 