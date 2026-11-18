import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

interface HttpResponse { status(code: number): { json(body: unknown): void }; }
interface HttpRequest { url?: string; }

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<HttpResponse>();
    const request = context.getRequest<HttpRequest>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const raw = exception instanceof HttpException ? exception.getResponse() : undefined;
    const message = status >= 500
      ? 'An unexpected error occurred.'
      : typeof raw === 'string' ? raw
      : raw && typeof raw === 'object' && 'message' in raw ? (raw as { message: unknown }).message
      : 'Request could not be completed.';

    response.status(status).json({
      statusCode: status,
      code: status >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
      message,
      path: request.url ?? '/',
      timestamp: new Date().toISOString(),
    });
  }
}
