// API配置常量
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// HTTP请求方法
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// API响应接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  timestamp?: string;
}

// 分页响应接口
export interface PaginatedApiResponse<T = any> {
  code: number;
  message: string;
  data: {
    items: T[];
    page: {
      page: number;
      size: number;
      total: number;
      pages: number;
    };
  };
  timestamp?: string;
}

// 错误详情接口
export interface ErrorDetail {
  field: string;
  message: string;
  code: string;
}

// 错误响应接口
export interface ErrorResponse {
  code: number;
  message: string;
  errors?: ErrorDetail[];
  timestamp?: string;
}