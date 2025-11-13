
import React, { useEffect, useState, useCallback } from 'react';
import { userService } from '../services/userService';
import { UserInfo } from '../services/authService';
import { Spinner, Modal } from '../components/ui';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table';
import Badge from '../components/ui/badge/Badge';
import Button from '../components/ui/button/Button';
import { toast } from 'react-hot-toast';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject' | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers(page, size);
      if (response.code === 200) {
        setUsers(response.data.items);
        setTotal(response.data.page.total);
        setPages(response.data.page.pages);
      } else {
        setError(response.message || '获取用户列表失败');
      }
    } catch (err) {
      setError('获取用户列表时发生网络错误');
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openModal = (user: UserInfo, action: 'approve' | 'reject') => {
    setSelectedUser(user);
    setModalAction(action);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
    setModalAction(null);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !modalAction) return;

    const action = modalAction === 'approve' ? userService.approveUser : userService.rejectUser;
    const successMessage = modalAction === 'approve' ? '用户已批准' : '用户已拒绝';
    const errorMessage = modalAction === 'approve' ? '批准用户失败' : '拒绝用户失败';

    try {
      const response = await action(selectedUser.id);
      if (response.code === 200) {
        toast.success(successMessage);
        fetchUsers();
      } else {
        toast.error(response.message || errorMessage);
      }
    } catch (err) {
      toast.error('操作时发生网络错误');
    } finally {
      closeModal();
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <XCircleIcon className="w-16 h-16 mb-4" />
        <h2 className="text-xl font-semibold">加载失败</h2>
        <p>{error}</p>
        <button
          onClick={() => fetchUsers()}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">用户管理</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">用户</TableCell>
                <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">角色</TableCell>
                <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">注册时间</TableCell>
                <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">状态</TableCell>
                <TableCell isHeader className="px-6 py-4 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">操作</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <TableCell className="px-6 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 overflow-hidden rounded-full">
                        <img className="w-full h-full object-cover" src={user.avatar_url || '/images/user/avatar-placeholder.png'} alt={user.first_name} />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{user.first_name} {user.last_name}</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.role}</TableCell>
                  <TableCell className="px-6 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="px-6 py-4 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.status === 'approved' ? 'success' :
                        user.status === 'rejected' ? 'error' :
                        'warning'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center text-sm font-medium">
                    {user.status === 'pending' && (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="primary"
                          className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                          onClick={() => openModal(user, 'approve')}
                        >
                          批准
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                          onClick={() => openModal(user, 'reject')}
                        >
                          拒绝
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-700 dark:text-gray-400 mb-2 sm:mb-0">
            第 {page} 页 / 共 {pages} 页 (总计 {total} 条)
          </span>
          <div className="inline-flex items-center space-x-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              首页
            </button>
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              上一页
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-400">
              {page}
            </span>
            <button onClick={() => setPage(page + 1)} disabled={page === pages} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              下一页
            </button>
            <button onClick={() => setPage(pages)} disabled={page === pages} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              尾页
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        className="max-w-md m-4" // Added className for styling
      >
        <div className="no-scrollbar relative w-full max-w-md overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-6">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {`${modalAction === 'approve' ? '批准' : '拒绝'}用户`}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {`您确定要${modalAction === 'approve' ? '批准' : '拒绝'}用户 ${selectedUser?.first_name} ${selectedUser?.last_name} 的注册申请吗？`}
            </p>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              取消
            </button>
            <button
              onClick={handleConfirmAction}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                modalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              确认
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
