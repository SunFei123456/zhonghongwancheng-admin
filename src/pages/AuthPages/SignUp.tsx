import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="注册 | 中鸿万城管理后台"
        description="中鸿万城管理后台系统 - 用户注册页面"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
