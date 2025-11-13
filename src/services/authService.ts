import { httpClient } from './api/httpClient';
import { ApiResponse } from './api/config';

// 用户注册数据接口
export interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// 用户登录数据接口
export interface UserLoginData {
  email: string;
  password: string;
}

// 用户信息接口
export interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  nickname?: string;
  gender?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

// 登录响应数据接口
export interface LoginResponseData {
  access_token: string;
  token_type: string;
  user: UserInfo;
}

// 认证服务类
class AuthService {
  // 用户注册
  async register(userData: UserRegisterData): Promise<ApiResponse<UserInfo>> {
    return await httpClient.post('/auth/register', userData);
  }

  // 用户登录
  async login(credentials: UserLoginData): Promise<ApiResponse<LoginResponseData>> {
    try {
      const response = await httpClient.post('/auth/login', credentials);
      console.log('登录响应:', response);
      return response;
    } catch (error) {
      // 捕获并重新抛出错误，确保错误信息被正确传递
      console.log('登录错误响应:', error);
      throw error;
    }
  }

  // 获取用户信息
  async getUserProfile(): Promise<ApiResponse<UserInfo>> {
    return await httpClient.get('/auth/profile');
  }

  // 存储认证信息到本地存储
  setAuthData(token: string, user: UserInfo): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_info', JSON.stringify(user));
  }

  // 从本地存储获取认证信息
  getAuthData(): { token: string | null; user: UserInfo | null } {
    const token = localStorage.getItem('access_token');
    const userInfoStr = localStorage.getItem('user_info');
    
    let user = null;
    if (userInfoStr) {
      try {
        user = JSON.parse(userInfoStr);
      } catch (error) {
        console.error('Failed to parse user info from localStorage:', error);
        localStorage.removeItem('user_info');
      }
    }
    
    return { token, user };
  }

  // 清除本地存储的认证信息
  clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
  }

  // 检查用户是否已认证
  isAuthenticated(): boolean {
    const { token } = this.getAuthData();
    return !!token;
  }

  // 检查用户是否为管理员
  isAdmin(): boolean {
    const { user } = this.getAuthData();
    return user?.role === 'admin';
  }

  // 检查用户状态是否已批准
  isApproved(): boolean {
    const { user } = this.getAuthData();
    return user?.status === 'approved';
  }
}

// 创建并导出认证服务实例
export const authService = new AuthService();

// 导出类型
export type { UserRegisterData, UserLoginData, UserInfo, LoginResponseData };