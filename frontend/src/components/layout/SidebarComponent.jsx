import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

//material style
import { useTheme } from "@mui/material/styles";

//material component
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

//material icon
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// style component
import { AppBar, Drawer, DrawerHeader } from "./common";
import NavBarRight from "./NavBarRight";
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useSelector } from "react-redux";
import { pathName } from "../../config/pathName";

const ListMenuItem = (t) => {
  const Schedule = t(`sidebar.schedule`);
  const Setting = t(`sidebar.setting`);

  return [
    {
      path: `${pathName.schedule}`,
      icon: <CalendarMonthIcon />,
      name: Schedule,
    },
    {
      path: `${pathName.manage_courses}`,
      icon: <AssignmentIcon />,
      name: "Manage Courses",
    },
    {
      path: `${pathName.manage_event}`,
      icon: <EventAvailableIcon />,
      name: "Manage Event",
    },
    {
      path: `${pathName.setting}`,
      icon: <SettingsOutlinedIcon />,
      name: Setting,
    },
  ];
};
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "#7f8c8d",
};

export default function SideBarComponent() {
  const [t] = useTranslation("common");
  const token = useSelector((state) => state.account.token);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!token) {
      navigate(`${pathName.auth.full_login}`);
    }
  }, [token, navigate]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <div className=" flex flex-col items-center my-4">
          <img
            src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
            alt="profile avatar"
            className="w-[40px] h-[40px] object-cover rounded-[50%]"
          />
          {open ? (
            <span className="text-gray-600 text-[12px]">Dung Nguyen</span>
          ) : (
            <div className="h-[24px] w-[10px]"></div>
          )}
        </div>
        <Divider />
        <List>
          {ListMenuItem(t).map((item) => (
            <Link key={item.name} to={`../${item.path}`} style={linkStyle}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Button
          style={{ backgroundColor: "#d3eaf2" }}
          className="w-full flex justify-center items-center cursor-pointer h-[50px]"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {token && <Outlet />}
      </Box>
    </Box>
  );
}
