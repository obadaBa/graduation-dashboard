import { useTheme } from "@mui/material";
import { useLocation } from "react-router";
import AuthPageLayout from "../../../features/auth/components/AuthPageLayout";
import AuthVisualSection from "../../../features/auth/components/AuthVisualSection";
import ConfirmPasswordFormPanel from "../../../features/auth/components/ConfirmPasswordFormPanel";
import sectionDecoration from "../../../features/auth/Assets/circle & rectangle (2).svg";
import stepIllustrationLight from "../../../features/auth/Assets/Group 57 (2).svg";
import stepIllustrationDark from "../../../features/auth/Assets/Group 57 (2) dark.svg";
import resetIllustrationLight from "../../../features/auth/Assets/Group 56.svg";
import resetIllustrationDark from "../../../features/auth/Assets/Group 56 dark.svg";

export default function ConfarmPassword() {
  const theme = useTheme();
  const location = useLocation();
  const stepIllustration =
    theme.palette.mode === "light" ? stepIllustrationLight : stepIllustrationDark;
  const previousIllustration =
    location.state?.fromVisual === "reset"
      ? theme.palette.mode === "light"
        ? resetIllustrationLight
        : resetIllustrationDark
      : undefined;

  return (
    <AuthPageLayout>
      <AuthVisualSection
        illustration={stepIllustration}
        transitionFromIllustration={previousIllustration}
        illustrationAlt="تأكيد الإيميل"
        title="الخطوة الثانية"
        description={"الرجاء إدخال الرمز المكوّن من ستة أرقام\nالمرسل إلى بريدك الخاص"}
        backgroundDecoration={sectionDecoration}
        illustrationSx={{ transform: "scale(1.3)" }}
      />
      <ConfirmPasswordFormPanel />
    </AuthPageLayout>
  );
}
