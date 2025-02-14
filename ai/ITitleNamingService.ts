/**
 * ITitleNamingService
 *
 * Defines the contract for generating an image title from its contents.
 */
export interface ITitleNamingService {
  /**
   * Generates a title for the image found at the given file path.
   * @param filePath - The path of the image file.
   * @returns {Promise<string>} The generated title.
   */
  generateTitle(filePath: string): Promise<string>;
} 