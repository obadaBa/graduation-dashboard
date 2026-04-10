import { useTheme } from "@mui/material";
import AuthPageLayout from "../../../features/auth/components/AuthPageLayout";
import AuthVisualSection from "../../../features/auth/components/AuthVisualSection";
import CreateNewPasswordFormPanel from "../../../features/auth/components/CreateNewPasswordFormPanel";
import sectionDecoration from "../../../features/auth/Assets/circle & rectangle (2).svg";
import stepIllustrationLight from "../../../features/auth/Assets/creatpass.svg";
import stepIllustrationDark from "../../../features/auth/Assets/creatpassdark.svg";

export default function CreatNewPassword() {
  const theme = useTheme();
  const stepIllustration =
    theme.palette.mode === "light" ? stepIllustrationLight : stepIllustrationDark;

  return (
    <AuthPageLayout>
      <AuthVisualSection
        illustration={stepIllustration}
        illustrationAlt="إنشاء كلمة مرور جديدة"
        title="الخطوة الثالثة"
        description={"يجب أن تكون كلمة المرور الجديدة\nمختلفة عن السابقة"}
        backgroundDecoration={sectionDecoration}
         illustrationSx={{ transform: "scale(1.3)" }}
      />
      <CreateNewPasswordFormPanel />
    </AuthPageLayout>
  );
}
