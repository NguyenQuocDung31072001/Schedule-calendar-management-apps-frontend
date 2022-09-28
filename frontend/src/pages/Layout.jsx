import React from 'react'

import { Box } from '@mui/material'
//component
import SidebarComponent from '../components/layout/SidebarComponent'
import TopBar from '../components/layout/TopBarComponent'

export default function LayoutPages() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SidebarComponent>
        <TopBar />
      </SidebarComponent>
    </Box>
  )
}
