/**
 * This module defines custom exceptions for the mail assistant application.
 * These exceptions provide clear information for both developers and tests.
 */

export class BaseAppError extends Error {
    constructor(message: string) {
        super(message);
        // Maintains proper stack trace for where our error was thrown (only in V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = this.constructor.name;
    }
}

export class ConfigurationError extends BaseAppError {
    constructor(message: string) {
        super(message);
    }
}

export class LoggerError extends BaseAppError {
    constructor(message: string) {
        super(message);
    }
} 
