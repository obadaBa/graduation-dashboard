import { useTheme } from "@mui/material";
import { useLocation } from "react-router";
import AuthPageLayout from "../../../features/auth/components/AuthPageLayout";
import AuthVisualSection from "../../../features/auth/components/AuthVisualSection";
import RestPasswordFormPanel from "../../../features/auth/components/RestPasswordFormPanel";
import stepIllustrationLight from "../../../features/auth/Assets/Group 56.svg";
import stepIllustrationDark from "../../../features/auth/Assets/Group 56 dark.svg";
import confirmIllustrationLight from "../../../features/auth/Assets/Group 57 (2).svg";
import confirmIllustrationDark from "../../../features/auth/Assets/Group 57 (2) dark.svg";
import sectionDecoration from "../../../features/auth/Assets/circle & rectangle (2).svg";

export default function RestPassword() {
  const theme = useTheme();
  const location = useLocation();
  const stepIllustration =
    theme.palette.mode === "light" ? stepIllustrationLight : stepIllustrationDark;
  const previousIllustration =
    location.state?.fromVisual === "confirm"
      ? theme.palette.mode === "light"
        ? confirmIllustrationLight
        : confirmIllustrationDark
      : undefined;

  return (
    <AuthPageLayout>
      <AuthVisualSection
        illustration={stepIllustration}
        transitionFromIllustration={previousIllustration}
        illustrationAlt="استعادة كلمة المرور"
        title="الخطوة الأولى"
        description={"يرجى إدخال عنوان بريدك الإلكتروني\nلتتلقى رمز التحقق عليه"}
        backgroundDecoration={sectionDecoration}
      />
      <RestPasswordFormPanel />
    </AuthPageLayout>
  );
}
