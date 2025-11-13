import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { UserInfo, authService, UserUpdateData } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

interface UserInfoCardProps {
  user: UserInfo | null;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState<UserUpdateData>({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        nickname: user.nickname,
        gender: user.gender,
        bio: user.bio,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await authService.updateUserProfile(formData);
      await refreshUser();
      closeModal();
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            个人信息
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                姓
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.first_name || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                名
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.last_name || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                邮箱地址
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                角色
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.role === 'admin' ? (
                  <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">管理员</span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">普通用户</span>
                )}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                状态
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.status === "approved" ? "已批准" : user?.status === "pending" ? "待审批" : "已拒绝"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                性别
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.gender === "male" ? "男" : user?.gender === "female" ? "女" : "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                昵称
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.nickname || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                简介
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.bio || "-"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          编辑
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              编辑个人信息
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              更新您的详细信息以保持个人资料最新。
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  个人信息
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>姓</Label>
                    <Input name="first_name" type="text" value={formData.first_name || ""} onChange={handleChange} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>名</Label>
                    <Input name="last_name" type="text" value={formData.last_name || ""} onChange={handleChange} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>邮箱地址</Label>
                    <Input type="text" value={user?.email || ""} disabled />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>性别</Label>
                    <select
                      name="gender"
                      className="w-full rounded-lg border-[1.5px] border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-primary"
                      value={formData.gender || ""}
                      onChange={handleChange}
                    >
                      <option value="">请选择</option>
                      <option value="male">男</option>
                      <option value="female">女</option>
                    </select>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>昵称</Label>
                    <Input name="nickname" type="text" value={formData.nickname || ""} onChange={handleChange} />
                  </div>

                  <div className="col-span-2">
                    <Label>简介</Label>
                    <Input name="bio" type="text" value={formData.bio || ""} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                关闭
              </Button>
              <Button size="sm" onClick={handleSave}>
                保存更改
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
