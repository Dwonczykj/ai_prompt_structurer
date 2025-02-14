/**
 * IObjectDetectionService
 *
 * Defines the contract for detecting objects within an image.
 */
export interface IObjectDetectionService {
  /**
   * Detects objects in the image at the given file path.
   * @param filePath - The path of the image file.
   * @returns {Promise<string[]>} A list of objects detected.
   */
  detectObjects(filePath: string): Promise<string[]>;
} 