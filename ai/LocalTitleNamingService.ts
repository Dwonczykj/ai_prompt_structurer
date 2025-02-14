import { ITitleNamingService } from "./ITitleNamingService";
import { Logger } from "../logger/Logger";

/**
 * LocalTitleNamingService
 *
 * A local implementation of ITitleNamingService.
 * This might use an ML model running locally via langchain to convert image contents to a title.
 */
export class LocalTitleNamingService implements ITitleNamingService {
  private logger = Logger.getInstance();

  public async generateTitle(filePath: string): Promise<string> {
    // TODO: Replace with actual title naming code.
    this.logger.info(`Generating title for ${filePath} using local AI service.`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Generated Image Title");
      }, 100);
    });
  }
} 