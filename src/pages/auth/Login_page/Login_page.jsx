import AuthPageLayout from "../../../features/auth/components/AuthPageLayout";
import LoginFirstSection from "../../../features/auth/components/LoginFirstSection";
import LoginFormPanel from "../../../features/auth/components/LoginFormPanel";

export default function LoginPage() {
  return (
    <AuthPageLayout>
      <LoginFirstSection />
      <LoginFormPanel />
    </AuthPageLayout>
  );
}
