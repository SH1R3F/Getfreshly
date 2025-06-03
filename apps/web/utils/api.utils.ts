import { NextRequest } from 'next/server';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiUtils {
  static createResponse<T>(data: T, status: number = 200): Response {
    const response: ApiResponse<T> = {
      success: status < 400,
      ...data,
    };
    return Response.json(response, { status });
  }

  static createErrorResponse(error: string, status: number = 500): Response {
    const response: ApiResponse = {
      success: false,
      error,
    };
    return Response.json(response, { status });
  }

  static async parseRequestBody<T>(request: NextRequest): Promise<T> {
    try {
      return await request.json();
    } catch {
      throw new Error('Invalid request data');
    }
  }
}
