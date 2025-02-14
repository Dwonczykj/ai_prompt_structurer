/**
 * This interface defines the logging methods that any logger implementation should include.
 * It supports multiple log levels such as info, debug, warn, and error.
 */
export interface ILogger {
  info(message: string, ...meta: any[]): void;
  debug(message: string, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
} 