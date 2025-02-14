import { AIServiceKey } from "./AIServiceTypes";
import { LocalOCRService } from "./LocalOCRService";
import { LocalTitleNamingService } from "./LocalTitleNamingService";
// import { LocalObjectDetectionService } from "./LocalObjectDetectionService"; // Similar implementation

/**
 * AIServiceFactory
 *
 * Constructs a Map of AI services used by the FileProcessor.
 */
export class AIServiceFactory {
  public static createAIServiceMap(): Map<AIServiceKey, any> {
    const map = new Map<AIServiceKey, any>();
    map.set("ocr", new LocalOCRService());
    map.set("titleNaming", new LocalTitleNamingService());
    // map.set("objectDetection", new LocalObjectDetectionService());
    return map;
  }
} 