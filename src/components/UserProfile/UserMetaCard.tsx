import { UserInfo, authService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { UploadIcon } from "../../icons";

interface UserMetaCardProps {
  user: UserInfo | null;
}

export default function UserMetaCard({ user }: UserMetaCardProps) {
  const { refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        await authService.uploadAvatar(file);
        await refreshUser();
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        alert("头像上传失败，请稍后重试。");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="relative group">
              <button onClick={handleAvatarClick} className="relative block">
                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt={user.first_name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                      <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                        {user?.first_name?.charAt(0)}
                        {user?.last_name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded-full opacity-0 bg-opacity-40 group-hover:opacity-100">
                  <UploadIcon className="w-6 h-6 text-white" />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black rounded-full bg-opacity-60">
                    <svg className="w-8 h-8 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                disabled={isUploading}
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.first_name} {user?.last_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.bio || "暂无简介"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.role === 'admin' ? (
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">管理员</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">普通用户</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end"></div>
          </div>
        </div>
      </div>
    </>
  );
}
