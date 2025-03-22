export interface ILogger {
    logger: unknown;
    log:(...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
}