import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  API_BASE_URL, 
} from './config';

// 创建axios实例
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理统一错误
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回响应数据
    return response.data;
  },
  (error) => {
    console.log('HTTP错误:', error);
    // 处理HTTP错误状态码
    if (error.response && error.response.data) {
      // 服务器返回了错误响应，直接返回错误数据
      // 使用reject而不是resolve，这样可以在调用方的catch块中正确处理
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('Network error:', error);
      return Promise.reject({
        success: false,
        code: 0,
        message: '网络错误，请检查您的网络连接',
      });
    } else {
      // 请求设置出错
      console.error('Request error:', error);
      return Promise.reject({
        success: false,
        code: 0,
        message: '请求设置出错',
      });
    }
  }
);

// 导出axios实例以便扩展使用
export default httpClient;