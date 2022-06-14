import React, { useState } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useAppAuth } from 'hooks'
import Topbar from 'components/topbar'
import SettingsDrawer from 'components/setttings'
import Sidebar from 'components/sidebar'

const drawerWidth = 280

const AppLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen)
  const handleToggleSettingsDrawer = (): void => setSettingsOpen(!settingsOpen)

  // useAppAuth()

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <CssBaseline />

      <Topbar
        handleDrawerToggle={handleDrawerToggle}
        handleSettingsDrawerToggle={handleToggleSettingsDrawer}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        sx={{
          pl: { xl: `${drawerWidth}px` },
          mt: 4
        }}
      >
        <Box sx={{ m: 3 }}>
          <Outlet />
        </Box>
      </Box>

      <SettingsDrawer
        open={settingsOpen}
        onClose={handleToggleSettingsDrawer}
      />
    </Box>
  )
}

export default AppLayout
