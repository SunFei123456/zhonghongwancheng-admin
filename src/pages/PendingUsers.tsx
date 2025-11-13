import { useEffect, useState } from "react";
import { authService, UserInfo } from "../services";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Button from "../components/ui/button/Button";

export default function PendingUsers() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingUsers = async () => {
    setIsLoading(true);
    try {
      const response = await authService.getPendingUsers();
      if (response.code === 200 && response.data) {
        setUsers(response.data);
      } else {
        setError(response.message || "Failed to fetch pending users.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApproval = async (userId: number, status: 'approved' | 'rejected') => {
    try {
      await authService.approveUser({ user_id: userId, status });
      // Refresh the list after approval/rejection
      fetchPendingUsers();
    } catch (err) {
      alert(`Failed to ${status} user.`);
      console.error(err);
    }
  };

  return (
    <>
      <PageMeta
        title="待审批用户 | 中鸿万城管理后台"
        description="中鸿万城管理后台系统 - 待审批用户页面"
      />
      <PageBreadcrumb pageTitle="待审批用户" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          待审批用户列表
        </h3>
        {isLoading ? (
          <p>加载中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p>没有待审批的用户。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.first_name} {user.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(user.created_at).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button size="sm" variant="primary" className="mr-2" onClick={() => handleApproval(user.id, 'approved')}>
                        批准
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleApproval(user.id, 'rejected')}>
                        拒绝
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}