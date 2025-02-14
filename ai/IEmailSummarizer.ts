/**
 * IEmailSummarizer
 *
 * Defines the contract for summarizing email content.
 */
export interface IEmailSummarizer {
  /**
   * Generates a summary from the provided email content.
   * @param emailContent - The full email or thread content to summarize.
   * @returns {Promise<string>} The summary.
   */
  summarize(emailContent: string): Promise<string>;
} 