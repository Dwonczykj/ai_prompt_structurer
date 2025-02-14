import dotenv from "dotenv";

dotenv.config();

export interface AppConfig {
  port: number;
  logging: {
    logLevel: string;
  };
  openaiApiKey: string;
  anthropicApiKey: string;
  googleGenaiApiKey: string;
  openrouterApiKey: string;
  openrouterApiUrl: string;
  langchainApiKey: string;
  langchainTracingV2: boolean;
  langchainEndpoint: string;
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || "3000", 10),
  logging: {
    logLevel: process.env.LOG_LEVEL || "info",
  },
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
  googleGenaiApiKey: process.env.GOOGLE_GENAI_API_KEY || "",
  openrouterApiKey: process.env.OPENROUTER_API_KEY || "",
  openrouterApiUrl: process.env.OPENROUTER_API_URL || "",
  langchainApiKey: process.env.LANGCHAIN_API_KEY || "",
  langchainTracingV2: process.env.LANGCHAIN_TRACING_V2 === "true",
  langchainEndpoint: process.env.LANGCHAIN_ENDPOINT || "",
};
