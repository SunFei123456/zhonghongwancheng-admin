import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { UserInfo } from "../../services";

interface UserAddressCardProps {
  user: UserInfo | null;
}

export default function UserAddressCard({ user }: UserAddressCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              账户信息
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  用户ID
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.id || "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  注册时间
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString("zh-CN") : "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  账户状态
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.status === "approved" ? "已批准" : user?.status === "pending" ? "待审批" : "已拒绝"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  用户角色
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.role === 'admin' ? (
                  <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">管理员</span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">普通用户</span>
                )}
              </p>
              </div>
            </div>
          </div>


        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              编辑地址
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              更新您的详细信息以保持个人资料最新。
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>用户ID</Label>
                  <Input type="text" value={user?.id ? user.id.toString() : ""} disabled />
                </div>

                <div>
                  <Label>注册时间</Label>
                  <Input type="text" value={user?.created_at ? new Date(user.created_at).toLocaleString("zh-CN") : ""} disabled />
                </div>

                <div>
                  <Label>账户状态</Label>
                  <Input type="text" value={user?.status === "approved" ? "已批准" : user?.status === "pending" ? "待审批" : "已拒绝"} disabled />
                </div>

                <div>
                  <Label>用户角色</Label>
                  <Input type="text" value={user?.role === "admin" ? "管理员" : "普通用户"} disabled />
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
    </>
  );
}
