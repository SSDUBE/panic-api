export enum Severity {
  ERROR,
  WARN,
  INFO,
}

export interface DebuggableException {
  name: string;
  message: string;
  severity: Severity;
  stack?: string;
  toDebugMessage(): string;
}

export class AuthenticationError extends Error implements DebuggableException {
  public readonly statusCode: number;
  public readonly severity: Severity;
  private readonly debugMessage: string;

  constructor({
    message,
    debugMessage,
    statusCode = 401,
    severity = Severity.ERROR,
  }: {
    message: string;
    debugMessage: string;
    statusCode?: number;
    severity?: Severity;
  }) {
    super(message);

    this.debugMessage = debugMessage;
    this.statusCode = statusCode;
    this.severity = severity;
  }

  public toDebugMessage() {
    return `AuthenticationError: ${this.debugMessage}`;
  }
}
