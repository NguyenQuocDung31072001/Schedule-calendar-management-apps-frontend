import React from 'react'
import { BottomNavigation, Box, BottomNavigationAction } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

export default function SidebarComponent({ children }) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: 100, height: "100vh", backgroundColor: "blue", color: "white" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ display: "flex", flexDirection: "column", marginTop: 10, backgroundColor: "blue" }}
        >
          <BottomNavigationAction label="Recents" sx={{ color: "white" }} icon={<SettingsBackupRestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<SettingsBackupRestoreIcon />} />
          <BottomNavigationAction label="Nearby" icon={<SettingsBackupRestoreIcon />} />
        </BottomNavigation>
      </Box>
      {children}
    </Box >
  )
}
