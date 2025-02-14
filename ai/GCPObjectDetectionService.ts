import { IObjectDetectionService } from "./IObjectDetectionService";
import { Logger } from "../logger/Logger";

/**
 * GCPObjectDetectionService
 *
 * A GCP implementation of IObjectDetectionService.
 * This might use an ML model running locally via langchain to convert image contents to a title.
 */
export class GCPObjectDetectionService implements IObjectDetectionService {
  private logger = Logger.getInstance();

  public async detectObjects(filePath: string): Promise<string[]> {
    // TODO: Replace with actual title naming code.
    this.logger.info(`Detecting objects in ${filePath} using GCP AI service.`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["object1", "object2", "object3"]);
      }, 100);
    });
  }
} 