import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="登录 | 中鸿万城管理后台"
        description="中鸿万城管理后台系统 - 用户登录页面"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}