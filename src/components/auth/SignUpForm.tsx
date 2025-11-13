import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { UserRegisterData } from "../../services";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  // 表单状态
  const [formData, setFormData] = useState<UserRegisterData>({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // 处理表单字段变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除该字段的错误信息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = "请输入姓";
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = "请输入名";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }
    
    if (!formData.password) {
      newErrors.password = "请输入密码";
    } else if (formData.password.length < 6) {
      newErrors.password = "密码长度至少为6个字符";
    }
    
    if (!isChecked) {
      newErrors.agreement = "请同意服务条款和隐私政策";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 清除之前的消息
    setSuccessMessage("");
    setErrorMessage("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        setSuccessMessage(result.message || "注册成功！请等待管理员审批您的账户。");
        // 清空表单
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: ""
        });
        setIsChecked(false);
        
        // 3秒后跳转到登录页面
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        setErrorMessage(result.message || "注册失败，请稍后再试");
      }
    } catch (error) {
      console.error("注册错误:", error);
      setErrorMessage("注册过程中发生错误，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          返回仪表板
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              注册
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              请输入您的信息进行注册！
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  请使用邮箱注册账号
                </span>
              </div>
            </div>
            
            {/* 成功消息 */}
            {successMessage && (
              <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900/30 dark:text-green-400">
                {successMessage}
              </div>
            )}
            
            {/* 错误消息 */}
            {errorMessage && (
              <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-400">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      姓<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="请输入您的姓"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      error={!!errors.first_name}
                      hint={errors.first_name}
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      名<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="请输入您的名"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      error={!!errors.last_name}
                      hint={errors.last_name}
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    邮箱<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="请输入您的邮箱"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    hint={errors.email}
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    密码<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="请输入您的密码"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={!!errors.password}
                      hint={errors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    className="w-5 h-5 mt-0.5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    创建账号即表示您同意我们的{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      服务条款
                    </span>{" "}
                    和{" "}
                    <span className="text-gray-800 dark:text-white">
                      隐私政策
                    </span>
                  </p>
                </div>
                {errors.agreement && (
                  <p className="text-sm text-error-500">{errors.agreement}</p>
                )}
                {/* <!-- Button --> */}
                <div>
                  <Button 
                    type="submit"
                    className="w-full" 
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "注册中..." : "注册"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                已有账号？ {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  立即登录
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
