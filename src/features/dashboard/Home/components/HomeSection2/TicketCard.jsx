import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const defaultTicket = {
  title: "اختبار توصية 138 - العلوم الصيدلانية",
  difficulty: "متوسط",
  difficultyColor: "#FFB340",
  description:
    "اختبار تدريبي في العلوم الصيدلانية موجه لفئة الصف الحادي عشر بدرجة صعوبة متوسط مع أسئلة متنوعة تساعد على تقييم الفهم بشكل عملي.",
  price: "5,950",
  currency: "ليرة سورية",
  rating: "0.0",
  questionsCount: "11",
  questionsLabel: "سؤال",
  duration: "5",
  durationLabel: "يوم",
  tags: ["العلوم الصيدلانية"],
};

/*
 * نفس القيم الموجودة داخل _ExamTicketClipper في Flutter.
 */
const TOP_CUT_POSITIONS = [0.08, 0.22, 0.36, 0.5, 0.64];

function useElementSize(ref) {
  const [size, setSize] = useState({
    width: 610,
    height: 210,
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();

      if (rect.width > 0 && rect.height > 0) {
        setSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

function DifficultyBadge({ text, color }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        px: {
          xs: 0.8,
          sm: 1.1,
          lg: 1.4,
        },
        py: {
          xs: 0.25,
          sm: 0.35,
          lg: 0.45,
        },
        bgcolor: alpha(color, 0.15),
        borderRadius: "4px",
      }}
    >
      <Typography
        sx={{
          color,
          fontSize: {
            xs: 9,
            sm: 10,
            lg: 11,
          },
          fontWeight: 700,
          lineHeight: 1.25,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function BlueTag({ text }) {
  return (
    <Box
      title={text}
      sx={{
        minWidth: 0,
        maxWidth: {
          xs: 80,
          sm: 105,
          lg: 135,
        },
        px: {
          xs: 0.7,
          sm: 0.9,
          lg: 1.1,
        },
        py: {
          xs: 0.25,
          sm: 0.35,
          lg: 0.4,
        },
        bgcolor: "#4F7DFF",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: {
            xs: 8,
            sm: 9,
            lg: 10,
          },
          lineHeight: 1.25,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function FooterInfo({
  icon: Icon,
  text,
  textColor,
  small = false,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.35}
      sx={{
        direction: "ltr",
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      <Typography
        title={text}
        sx={{
          color: textColor,
          fontSize: small
            ? {
                xs: 8.5,
                sm: 10,
                lg: 11,
              }
            : {
                xs: 9,
                sm: 11,
                lg: 12,
              },
          fontWeight: 600,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </Typography>

      <Icon
        sx={{
          flexShrink: 0,
          color: textColor,
          fontSize: small
            ? {
                xs: 14,
                sm: 16,
                lg: 18,
              }
            : {
                xs: 15,
                sm: 18,
                lg: 20,
              },
        }}
      />
    </Stack>
  );
}

function DashedVerticalDivider({ color }) {
  return (
    <Box
      sx={{
        width: "2px",
        height: "100%",
        flexShrink: 0,
        borderRadius: "999px",
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          ${color} 0,
          ${color} 8px,
          transparent 8px,
          transparent 12px
        )`,
      }}
    />
  );
}

function SaveButton({ isSaved, onClick, isDark, accentColor }) {
  return (
    <Box
      component="button"
      type="button"
      aria-label={isSaved ? "إزالة من المحفوظات" : "حفظ الاختبار"}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      sx={{
        position: "absolute",
        zIndex: 20,
        top: {
          xs: 10,
          sm: 12,
          lg: 14,
        },
        right: {
          xs: 12,
          sm: 14,
          lg: 16,
        },
        display: "grid",
        placeItems: "center",
        width: {
          xs: 28,
          sm: 32,
          lg: 36,
        },
        height: {
          xs: 28,
          sm: 32,
          lg: 36,
        },
        p: 0,
        border: 0,
        borderRadius: "5px",
        bgcolor: isSaved
          ? alpha("#EF5350", 0.7)
          : isDark
            ? alpha("#FFFFFF", 0.08)
            : "#F0F1F3",
        cursor: "pointer",
        transition: "transform 150ms ease, background-color 150ms ease",

        "&:hover": {
          transform: "scale(1.04)",
        },
      }}
    >
      {isSaved ? (
        <BookmarkRoundedIcon
          sx={{
            color: "#FFFFFF",
            fontSize: {
              xs: 17,
              sm: 19,
              lg: 21,
            },
          }}
        />
      ) : (
        <BookmarkBorderRoundedIcon
          sx={{
            color: isDark ? alpha("#FFFFFF", 0.72) : "#8B9099",
            fontSize: {
              xs: 17,
              sm: 19,
              lg: 21,
            },
          }}
        />
      )}
    </Box>
  );
}

export default function TicketCard({
  title = defaultTicket.title,
  difficulty = defaultTicket.difficulty,
  difficultyColor = defaultTicket.difficultyColor,
  description = defaultTicket.description,
  price = defaultTicket.price,
  currency = defaultTicket.currency,
  rating = defaultTicket.rating,
  questionsCount = defaultTicket.questionsCount,
  questionsLabel = defaultTicket.questionsLabel,
  duration = defaultTicket.duration,
  durationLabel = defaultTicket.durationLabel,
  tags = defaultTicket.tags,
  showSaveButton = false,
  isSaved = false,
  onSaveTap,
  onClick,
  sx,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const dashboardPalette = theme.palette.dashboard ?? {};

  const cardRef = useRef(null);
  const { width, height } = useElementSize(cardRef);

  /*
   * useId قد يحتوي على ":"، لذلك ننظفه قبل استخدامه داخل url().
   */
  const reactId = useId();
  const maskId = useMemo(
    () => `exam-ticket-mask-${reactId.replaceAll(":", "")}`,
    [reactId],
  );

  const accentColor = dashboardPalette.logoPrimary || "#5583FF";
  const cardBackground = isDark
    ? dashboardPalette.surface || "#252A33"
    : "#eef1f6fb";

  const infoPanelBackground = isDark
    ? alpha(accentColor, 0.13)
    : "#E4ECFF";

  const pricePanelBackground = isDark
    ? alpha("#FFFFFF", 0.055)
    : "#E7E9EE";
  const dividerColor = isDark
    ? alpha("#FFFFFF", 0.28)
    : "#B8BEC8";

  const primaryText =
    dashboardPalette.chartTextPrimary ??
    (isDark ? "#F5F5F5" : "#26323D");

  const descriptionText = isDark ? "#E2E4E8" : "#4E5665";

  const secondaryText =
    dashboardPalette.chartTextSecondary ??
    (isDark ? "#AEB2BA" : "#8A909A");

  const topCutRadius = 8;
  const cornerRadius = 10;
  const sideCutRadius = height * 0.15;

  /*
   * تحويل قيم البكسل إلى نسب تناسب SVG objectBoundingBox.
   * بهذه الطريقة تبقى الفتحات دوائر حقيقية وليست بيضاوية.
   */
  const topCutRadiusX = topCutRadius / width;
  const topCutRadiusY = topCutRadius / height;

  const sideCutRadiusX = sideCutRadius / width;
  const sideCutRadiusY = sideCutRadius / height;

  const cornerRadiusX = cornerRadius / width;
  const cornerRadiusY = cornerRadius / height;

  const ratingText = Number.isFinite(Number(rating))
    ? Number(rating).toFixed(1)
    : rating;

  const visibleTags =
    Array.isArray(tags) && tags.length > 0 ? tags.slice(0, 2) : ["عام"];

  const isClickable = typeof onClick === "function";

  const handleKeyDown = (event) => {
    if (!isClickable) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",

        /*
         * نفس عرض وارتفاع الكرت القديم.
         */
        width: "100%",

        maxWidth: {
          xs: "100%",
          sm: 610,
          lg: "100%",
        },

        height: {
          xs: 200,
          sm: 210,
          lg: 216,
        },

        mx: "auto",
        overflow: "visible",

        ...sx,
      }}
    >
      {/*
       * هذا الـSVG لا يظهر على الصفحة.
       * وظيفته إنشاء نفس Path المستخدم في Flutter:
       * مستطيل بحواف دائرية مع فتحات علوية وسفلية وجانبية.
       */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
            maskType="alpha"
          >
            <rect
              x="0"
              y="0"
              width="1"
              height="1"
              rx={cornerRadiusX}
              ry={cornerRadiusY}
              fill="#FFFFFF"
            />

            {TOP_CUT_POSITIONS.map((position) => (
              <ellipse
                key={`top-${position}`}
                cx={position}
                cy="0"
                rx={topCutRadiusX}
                ry={topCutRadiusY}
                fill="#000000"
              />
            ))}

            {TOP_CUT_POSITIONS.map((position) => (
              <ellipse
                key={`bottom-${position}`}
                cx={position}
                cy="1"
                rx={topCutRadiusX}
                ry={topCutRadiusY}
                fill="#000000"
              />
            ))}

            <ellipse
              cx="0"
              cy="0.5"
              rx={sideCutRadiusX}
              ry={sideCutRadiusY}
              fill="#000000"
            />

            <ellipse
              cx="1"
              cy="0.5"
              rx={sideCutRadiusX}
              ry={sideCutRadiusY}
              fill="#000000"
            />
          </mask>
        </defs>
      </svg>

      <Box
        ref={cardRef}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",

          bgcolor: cardBackground,

          /*
           * لا يوجد border خارجي في كود Flutter.
           * الشكل ناتج عن القص والظل فقط.
           */
          WebkitMask: `url(#${maskId})`,
          mask: `url(#${maskId})`,

          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",

          WebkitMaskPosition: "center",
          maskPosition: "center",

          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",

          filter: isDark
            ? "drop-shadow(0 10px 24px rgba(0,0,0,0.28))"
            : "drop-shadow(0 1px 6px rgba(0,0,0,0.06))",

          px: {
            xs: 1.4,
            sm: 1.8,
            lg: 2.1,
          },

          py: {
            xs: 1.2,
            sm: 1.5,
            lg: 1.8,
          },

          overflow: "hidden",
          cursor: isClickable ? "pointer" : "default",

          transition: "transform 160ms ease",

          "&:hover": isClickable
            ? {
                transform: "translateY(-1px)",
              }
            : undefined,

          "&:focus-visible": {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: "-4px",
          },
        }}
      >
        {/*
         * الترتيب مطابق لـRow في Flutter:
         * معلومات الاختبار يسار، السعر يمين، والفاصل في المنتصف.
         */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 7fr) 2px minmax(78px, 3fr)",
              sm: "minmax(0, 7fr) 2px minmax(110px, 3fr)",
              lg: "minmax(0, 7fr) 2px minmax(130px, 3fr)",
            },

            columnGap: {
              xs: 0.8,
              sm: 1.1,
              lg: 1.4,
            },

            width: "100%",
            height: "100%",
            minWidth: 0,
            direction: "ltr",
          }}
        >
          {/* لوحة معلومات الاختبار */}
          <Box
            sx={{
              position: "relative",
              direction: "rtl",
              minWidth: 0,
              height: "100%",

              px: {
                xs: 1.4,
                sm: 2,
                lg: 2.6,
              },

              py: {
                xs: 1.1,
                sm: 1.4,
                lg: 1.7,
              },

              bgcolor: infoPanelBackground,
              borderRadius: "6px",
              overflow: "hidden",

              display: "flex",
              flexDirection: "column",

              /*
               * ترجمة _InnerLeftPanelClipper:
               * فتحة بيضاوية في الطرف الأيسر من اللوحة.
               */
              "&::before": {
                content: '""',
                position: "absolute",
                zIndex: 3,
                top: "50%",
                left: "-10%",
                width: "14%",
                height: "42%",
                transform: "translateY(-50%)",
                bgcolor: cardBackground,
                borderRadius: "50%",
                pointerEvents: "none",
              },
            }}
          >
            {/* العنوان والصعوبة */}
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              spacing={1.2}
              sx={{
                minWidth: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                  overflowX: "auto",
                  scrollbarWidth: "none",

                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: accentColor,

                    fontSize: {
                      xs: 13,
                      sm: 16,
                      lg: 18,
                    },

                    fontWeight: 700,
                    lineHeight: 1.35,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {title}
                </Typography>
              </Box>

              <DifficultyBadge
                text={difficulty}
                color={difficultyColor}
              />
            </Stack>

            {/* الوصف */}
            <Typography
              sx={{
                position: "relative",
                zIndex: 1,

                mt: {
                  xs: 0.8,
                  sm: 1.1,
                  lg: 1.3,
                },

                color: descriptionText,

                fontSize: {
                  xs: 10,
                  sm: 12,
                  lg: 13,
                },

                fontWeight: 500,

                lineHeight: {
                  xs: 1.5,
                  sm: 1.6,
                  lg: 1.65,
                },

                textAlign: "right",

                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,

                overflow: "hidden",
                overflowWrap: "anywhere",
              }}
            >
              {description}
            </Typography>

            {/* أسفل اللوحة */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,

                mt: "auto",

                display: "grid",
                gridTemplateColumns: "minmax(0, 4fr) minmax(0, 5fr)",

                alignItems: "center",

                columnGap: {
                  xs: 0.8,
                  sm: 1.2,
                  lg: 1.5,
                },

                minWidth: 0,
                direction: "ltr",
              }}
            >
              {/* التصنيفات */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={{
                  xs: 0.45,
                  sm: 0.7,
                  lg: 0.9,
                }}
                sx={{
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                {visibleTags.map((tag, index) => (
                  <BlueTag
                    key={`${tag}-${index}`}
                    text={tag}
                  />
                ))}
              </Stack>

              {/* المدة وعدد الأسئلة */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={{
                  xs: 0.8,
                  sm: 1.2,
                  lg: 1.5,
                }}
                sx={{
                  direction: "rtl",
                  minWidth: 0,
                }}
              >
                <FooterInfo
                  icon={AccessTimeOutlinedIcon}
                  text={`${duration} ${durationLabel}`}
                  textColor={primaryText}
                />

                <FooterInfo
                  icon={EditNoteRoundedIcon}
                  text={`${questionsCount} ${questionsLabel}`}
                  textColor={primaryText}
                  small
                />
              </Stack>
            </Box>
          </Box>

          {/* الفاصل المتقطع */}
          <DashedVerticalDivider color={dividerColor} />

          {/* لوحة السعر */}
          <Box
            sx={{
              position: "relative",
              direction: "rtl",
              minWidth: 0,
              height: "100%",

              px: {
                xs: 1,
                sm: 1.5,
                lg: 2,
              },

              py: {
                xs: 1.1,
                sm: 1.4,
                lg: 1.7,
              },

              bgcolor: pricePanelBackground,
              borderRadius: "6px",
              overflow: "hidden",

              display: "flex",
              alignItems: "center",

              /*
               * ترجمة _InnerRightPanelClipper:
               * فتحة بيضاوية في الطرف الأيمن من لوحة السعر.
               */
              "&::before": {
                content: '""',
                position: "absolute",
                zIndex: 3,
                top: "50%",
                right: "-13%",
                width: "26%",
                height: "42%",
                transform: "translateY(-50%)",
                bgcolor: cardBackground,
                borderRadius: "50%",
                pointerEvents: "none",
              },
            }}
          >
            <Stack
              sx={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                alignItems: "flex-start",
                direction: "ltr",
              }}
            >
              <Typography
                sx={{
                  color: primaryText,

                  fontSize: {
                    xs: 21,
                    sm: 25,
                    lg: 29,
                  },

                  fontWeight: 700,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {price}
              </Typography>

              <Typography
                sx={{
                  mt: 0.6,
                  color: secondaryText,

                  fontSize: {
                    xs: 9,
                    sm: 10,
                    lg: 11,
                  },

                  lineHeight: 1.35,
                  direction: "rtl",
                  whiteSpace: "nowrap",
                }}
              >
                {currency}
              </Typography>

              <Typography
                sx={{
                  mt: {
                    xs: 2,
                    sm: 2.5,
                    lg: 3,
                  },

                  color: primaryText,

                  fontSize: {
                    xs: 12,
                    sm: 14,
                    lg: 16,
                  },

                  fontWeight: 700,
                  lineHeight: 1.2,
                  direction: "rtl",
                }}
              >
                التقييم
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{
                  mt: 0.7,
                }}
              >
                <Typography
                  sx={{
                    color: secondaryText,

                    fontSize: {
                      xs: 10,
                      sm: 11,
                      lg: 12,
                    },

                    lineHeight: 1,
                  }}
                >
                  {ratingText}
                </Typography>

                <StarRoundedIcon
                  sx={{
                    color: "#FFC107",

                    fontSize: {
                      xs: 16,
                      sm: 18,
                      lg: 20,
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>

      {showSaveButton && (
        <SaveButton
          isSaved={isSaved}
          onClick={onSaveTap}
          isDark={isDark}
          accentColor={accentColor}
        />
      )}
    </Box>
  );
}
