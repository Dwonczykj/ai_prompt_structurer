import { IEmailSummarizer } from "./IEmailSummarizer";
import { Logger } from "../logger/Logger";
import axios from "axios";

/**
 * OpenRouterEmailSummarizer
 *
 * Uses a langchain connection to an OpenRouter API to generate a summary for emails.
 */
export class OpenRouterEmailSummarizer implements IEmailSummarizer {
  private logger = Logger.getInstance();

  public async summarize(emailContent: string): Promise<string> {
    this.logger.info("Summarizing email content using OpenRouter.");
    try {
      //TODO: lots of magic strings here to move to static properties on this class OpenRouterEmailSummarizer.
      const response = await axios.post("https://openrouter.ai/chat/completions", {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: emailContent }],
      });
      return response.data.choices[0].message.content;
    } catch (error: any) {
      this.logger.error(`Error summarizing email content: ${error.message}`);
      throw error;
    }
  }
} 