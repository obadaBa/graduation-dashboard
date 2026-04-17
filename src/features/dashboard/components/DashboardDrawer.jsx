import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { alpha, styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink, useLocation } from "react-router";
import logolight from "../Assets/logolight.svg";
import logodark from "../Assets/logodark.svg";

const openedWidth = 194;
const closedWidth = 74;

const navigationItems = [
  {
    key: "home",
    label: "الرئيسية",
    path: "/dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    key: "tests",
    label: "إدارة الاختبارات",
    path: "/dashboard/tests",
    icon: <LayersOutlinedIcon />,
  },
  {
    key: "content",
    label: "إدارة المحتوى",
    path: "/dashboard/content",
    icon: <AutorenewRoundedIcon />,
  },
  {
    key: "users",
    label: "إدارة المستخدمين",
    path: "/dashboard/users",
    icon: <GroupOutlinedIcon />,
  },
  {
    key: "sales",
    label: "المبيعات",
    path: "/dashboard/sales",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    key: "customization",
    label: "التخصيصات",
    path: "/dashboard/customization",
    icon: <HandymanOutlinedIcon />,
  },
];

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    !["draweropen", "mobilemode"].includes(prop),
})(({ theme, draweropen, mobilemode }) => ({
  width: draweropen ? openedWidth : closedWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  overflow: "visible",
  "& .MuiDrawer-paper": {
    width: mobilemode ? openedWidth : draweropen ? openedWidth : closedWidth,
    overflowX: "hidden",
    backgroundColor: theme.palette.dashboard.drawerBackground,
    color: theme.palette.dashboard.inactiveItem.color,
    border: `1px solid ${
      theme.palette.mode === "light"
        ? "rgba(72, 84, 159, 0.12)"
        : "rgba(255, 255, 255, 0.12)"
    }`,
    borderRadius: mobilemode ? "16px 0 0 16px" : "16px",
    height: mobilemode ? "100%" : "calc(100% - 16px)",
    margin: mobilemode ? 0 : "8px",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 6px 18px rgba(29, 41, 57, 0.08)"
        : "0 6px 18px rgba(0, 0, 0, 0.35)",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function DrawerToggle({ open, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={(theme) => ({
        position: "absolute",
        top: 22,
        left: -2,
        width: 18,
        height: 26,
        borderRadius: "6px",
        border: `1px solid ${alpha(theme.palette.common.black, 0.14)}`,
        backgroundColor: theme.palette.dashboard.drawerBackground,
        color: theme.palette.dashboard.inactiveItem.color,
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
        padding: 0,
        minWidth: 18,
        zIndex: theme.zIndex.drawer + 2,
        "&:hover": {
          backgroundColor: theme.palette.dashboard.drawerBackground,
        },
      })}
    >
      <ChevronLeftIcon
        sx={{
          fontSize: 14,
          transform: open ? "none" : "rotate(180deg)",
        }}
      />
    </IconButton>
  );
}

function NavigationItem({ item, open, isActive, onClick }) {
  return (
    <ListItem disablePadding sx={{ mb: 0.75 }}>
      <ListItemButton
        component={NavLink}
        to={item.path}
        onClick={onClick}
        sx={(theme) => ({
          minHeight: 44,
          px: 0,
          py: 0.75,
          borderRadius: "10px",
          justifyContent: open ? "flex-start" : "center",
          flexDirection: "row",
          position: "relative",
          textDecoration: "none",
          color: isActive
            ? theme.palette.dashboard.activeItem.color
            : theme.palette.dashboard.inactiveItem.color,
          backgroundColor: isActive
            ? theme.palette.dashboard.activeItem.background
            : "transparent",
          "&:hover": {
            backgroundColor: isActive
              ? theme.palette.dashboard.activeItem.background
              : alpha(theme.palette.primary.main, 0.04),
          },
          "&::after": isActive
            ? {
                content: '""',
                position: "absolute",
                right: -12,
                top: 6,
                bottom: 6,
                width: 4,
                borderRadius: 999,
                backgroundColor: theme.palette.dashboard.activeItem.color,
              }
            : {},
        })}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            color: "inherit",
            mr: open ? 1.25 : 0,
            justifyContent: "flex-start",
            "& svg": {
              fontSize: 23,
            },
          }}
        >
          {item.icon}
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={item.label}
            sx={{
              textAlign: "right",
              m: 0,
              "& .MuiTypography-root": {
                fontSize: 15,
                fontWeight: isActive ? 600 : 500,
                lineHeight: 1.4,
              },
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}

function DrawerContent({ open, logoSrc, pathname, onNavigate }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: open ? 1.5 : 1,
        py: 1.25,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          flexDirection: "row",
          columnGap: open ? 0.75 : 0,
          minHeight: 44,
          px: open ? 0.5 : 0,
        }}
      >
        <Box
          component="img"
          src={logoSrc}
          alt="Nerd logo"
          sx={{ width: 32, height: 32, flexShrink: 0 }}
        />
        {open && (
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            <Box component="span" sx={{ color: "#5583FF" }}>
              ن
            </Box>
            <Box component="span" sx={{ color: "#263238" }}>
              يرد
            </Box>
          </Typography>
        )}
      </Box>

      <Divider
        sx={{
          mt: 1.25,
          mb: 1.5,
          borderColor: theme.palette.dashboard.divider,
        }}
      />

      <List sx={{ p: 0 }}>
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.key}
            item={item}
            open={open}
            isActive={pathname === item.path}
            onClick={onNavigate}
          />
        ))}
      </List>

      <Box sx={{ mt: "auto", px: open ? 0.25 : 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              minHeight: 44,
              px: open ? 1.5 : 0,
              borderRadius: "10px",
              justifyContent: open ? "space-between" : "center",
              flexDirection: "row",
              color: "#FF4D4F",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: "inherit",
                mr: open ? 1.25 : 0,
                justifyContent: "center",
                "& svg": {
                  fontSize: 24,
                },
              }}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="تسجيل الخروج"
                sx={{
                  textAlign: "right",
                  m: 0,
                  "& .MuiTypography-root": {
                    fontSize: 15,
                    fontWeight: 600,
                  },
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
}

export default function DashboardDrawer({
  mobileOpen = false,
  onMobileClose = () => {},
  isMobile = false,
}) {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const logoSrc = theme.palette.mode === "light" ? logolight : logodark;

  if (isMobile) {
    return (
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        draweropen
        mobilemode
      >
        <DrawerContent
          open
          logoSrc={logoSrc}
          pathname={location.pathname}
          onNavigate={onMobileClose}
        />
      </StyledDrawer>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: open ? openedWidth + 16 : closedWidth + 16,
        minWidth: open ? openedWidth + 16 : closedWidth + 16,
        overflow: "visible",
      }}
    >
      <DrawerToggle open={open} onClick={() => setOpen((prev) => !prev)} />

      <StyledDrawer variant="permanent" anchor="right" draweropen={open}>
        <DrawerContent
          open={open}
          logoSrc={logoSrc}
          pathname={location.pathname}
        />
      </StyledDrawer>
    </Box>
  );
}
