import * as React from "react";
import { Link, Outlet } from "react-router-dom";

//material style
import { useTheme } from "@mui/material/styles";

//material component
import { Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

//material icon
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// style component
import { AppBar, Drawer, DrawerHeader } from "./common"
import NavBarRight from "./NavBarRight";

const ListMenuItem = [{
  path: "schedule",
  icon: <InboxIcon />,
  name: "Schedule"
},
{
  path: "setting",
  icon: <SettingsOutlinedIcon />,
  name: "Setting"
}, {
  path: "logout",
  icon: <MailIcon />,
  name: "Logout"
}
]
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: '#7f8c8d'
};

export default function SideBarComponent() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>

          </Box>
          <Box sx={{ flexGrow: 3 }}>
          </Box>
          <NavBarRight />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ListMenuItem.map((item) => (
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
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
