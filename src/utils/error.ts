export interface ErrorBody {
  code: string;
  description: string;
}

export class FetchError extends Error {
  status: number;
  code: string;
  description: string;

  constructor(message: string, status: number, body: ErrorBody) {
    super(message)
    this.status = status
    this.code = body.code
    this.description = body.description
  }
}
