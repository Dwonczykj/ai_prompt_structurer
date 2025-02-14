import { ILogger } from './ILogger';
import { config } from '../config/config';
import { LoggerError } from '../exceptions/exceptions';

/**
 * Logger is a singleton class that implements the ILogger interface.
 * It provides logging functionality (console logging currently) at various levels.
 * Future enhancements can include logging to files, database, or remote logging services.
 */
export class Logger implements ILogger {
  private static instance: Logger;
  private logLevel: string;

  /**
   * Private constructor to enforce the singleton pattern.
   */
  private constructor() {
    this.logLevel = config.logging.logLevel;
  }

  /**
   * Returns the singleton instance of the Logger.
   * @returns {Logger} - Singleton Logger instance.
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Logs informational messages.
   * @param message - The message to log.
   * @param meta - Additional meta data for the log.
   */
  public info(message: string, ...meta: any[]): void {
    console.info("[INFO]:", message, ...meta);
  }

  /**
   * Logs debug messages if log level is set to debug.
   * @param message - The debug message.
   * @param meta - Additional meta data.
   */
  public debug(message: string, ...meta: any[]): void {
    if (this.logLevel === 'debug') {
      console.debug("[DEBUG]:", message, ...meta);
    }
  }

  /**
   * Logs warning messages.
   * @param message - The warning message.
   * @param meta - Additional meta data.
   */
  public warn(message: string, ...meta: any[]): void {
    console.warn("[WARN]:", message, ...meta);
  }

  /**
   * Logs error messages.
   * @param message - The error message.
   * @param meta - Additional meta data.
   */
  public error(message: string, ...meta: any[]): void {
    console.error("[ERROR]:", message, ...meta);
  }
} 