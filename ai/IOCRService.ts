/**
 * IOCRService
 *
 * Defines the contract for extracting text from an image.
 */
export interface IOCRService {
  /**
   * Performs Optical Character Recognition (OCR) on the given file.
   * @param filePath - The path of the file to process.
   * @returns {Promise<string>} The text extracted from the image.
   */
  performOCR(filePath: string): Promise<string>;
} 