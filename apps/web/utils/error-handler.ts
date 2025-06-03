import { ApiUtils } from './api.utils';

export class ApiErrorHandler {
  static handle(error: unknown): Response {
    console.error('API Error:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return ApiUtils.createErrorResponse('Unauthorized', 401);
      }

      if (error.message === 'Invalid request data') {
        return ApiUtils.createErrorResponse('Invalid request data', 400);
      }
    }

    return ApiUtils.createErrorResponse('Internal Server Error');
  }
}
