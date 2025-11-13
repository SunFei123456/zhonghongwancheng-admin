import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, UserInfo, UserLoginData, UserRegisterData } from '../services';

// 认证状态接口
interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  isLoading: boolean;
}

// 认证上下文接口
interface AuthContextType extends AuthState {
  login: (credentials: UserLoginData) => Promise<{ success: boolean; message?: string }>;
  register: (userData: UserRegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件props
interface AuthProviderProps {
  children: ReactNode;
}

// 认证提供者组件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isApproved: false,
    isLoading: true,
  });

  // 初始化时检查用户是否已登录
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // 用户已登录，获取最新的用户信息
          await refreshUser();
        } else {
          // 用户未登录
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('初始化认证状态失败:', error);
        // 清除可能损坏的本地存储数据
        authService.clearAuthData();
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initAuth();
  }, []);

  // 刷新用户信息
  const refreshUser = async () => {
    try {
      const response = await authService.getUserProfile();
      
      if (response.success && response.data) {
        const user = response.data;
        
        // 更新本地存储
        const { token } = authService.getAuthData();
        if (token) {
          authService.setAuthData(token, user);
        }
        
        // 更新状态
        setAuthState({
          user,
          isAuthenticated: true,
          isAdmin: authService.isAdmin(),
          isApproved: authService.isApproved(),
          isLoading: false,
        });
      } else {
        // API响应失败，清除认证状态
        authService.clearAuthData();
        setAuthState(prev => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isApproved: false,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      // 清除认证状态
      authService.clearAuthData();
      setAuthState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isApproved: false,
        isLoading: false,
      }));
    }
  };

  // 登录函数
  const login = async (credentials: UserLoginData): Promise<{ success: boolean; message?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.login(credentials);
      
      console.log('登录响应:', response);
      
      if (response.success && response.data) {
        const { access_token, user } = response.data;
        
        // 存储认证信息
        authService.setAuthData(access_token, user);
        
        // 更新状态
        setAuthState({
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'admin',
          isApproved: user.status === 'approved',
          isLoading: false,
        });
        
        return { success: true, message: response.message };
      } else {
        // 登录失败，返回服务器提供的错误消息
        console.log('登录失败消息:', response.message);
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('登录失败:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));

      // 尝试从错误对象中获取消息
      if (error) {
        // 直接检查是否有 message 属性
        if (typeof error === 'object' && 'message' in error) {
          return { success: false, message: (error as any).message };
        }
        // 如果是 Error 实例
        if (error instanceof Error) {
          return { success: false, message: error.message };
        }
        // 如果是字符串
        if (typeof error === 'string') {
          try {
            const errorObj = JSON.parse(error);
            if (errorObj && errorObj.message) {
              return { success: false, message: errorObj.message };
            }
          } catch (e) {
            // 解析失败，返回原始字符串
            return { success: false, message: error };
          }
        }
      }

      return { success: false, message: '登录失败，请稍后再试' };
    }
  };

  // 注册函数
  const register = async (userData: UserRegisterData): Promise<{ success: boolean; message?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await authService.register(userData);
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      if (response.success) {
        return { success: true, message: response.message || '注册成功，请等待管理员审批' };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('注册失败:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: '注册失败，请稍后再试' };
    }
  };

  // 登出函数
  const logout = () => {
    // 清除本地存储
    authService.clearAuthData();
    
    // 重置状态
    setAuthState({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isApproved: false,
      isLoading: false,
    });
  };

  // 上下文值
  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 使用认证上下文的Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 导出类型
export type { AuthContextType, AuthState };