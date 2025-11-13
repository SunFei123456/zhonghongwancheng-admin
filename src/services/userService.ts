import { httpClient } from './api/httpClient';
import { ApiResponse, PaginatedApiResponse } from './api/config';
import { UserInfo } from './authService';

class UserService {
  async getUsers(page: number, size: number): Promise<any> {
    return await httpClient.get('/auth/admin/users', { params: { page, size } });
  }

  async approveUser(userId: number): Promise<ApiResponse<UserInfo>> {
    return await httpClient.post('/auth/admin/approve-user', { user_id: userId, status: 'approved' });
  }

  async rejectUser(userId: number): Promise<ApiResponse<UserInfo>> {
    return await httpClient.post('/auth/admin/approve-user', { user_id: userId, status: 'rejected' });
  }
}

export const userService = new UserService();
