import { IOCRService } from "./IOCRService";
import { Logger } from "../logger/Logger";

/**
 * LocalOCRService
 *
 * A local implementation of IOCRService using a locally hosted ML engine.
 * (For example, this could use langchain via a localhost API such as Ollama.)
 */
export class LocalOCRService implements IOCRService {
  private logger = Logger.getInstance();

  public async performOCR(filePath: string): Promise<string> {
    // TODO: Implement real OCR processing here.
    this.logger.info(`Performing OCR on ${filePath} using local AI service.`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Extracted text from image.");
      }, 100);
    });
  }
} 