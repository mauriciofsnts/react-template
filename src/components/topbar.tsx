import React from 'react'
import { Badge, Box, IconButton, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { onLogout, onRefreshTokenPoolingStop } from 'core/adapters'

type TopbarProps = {
  handleDrawerToggle?: () => void
  handleSettingsDrawerToggle: () => void
}

const Topbar: React.FC<TopbarProps> = ({ handleDrawerToggle, handleSettingsDrawerToggle }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = (): void => {
    dispatch(onRefreshTokenPoolingStop())
    dispatch(onLogout())
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        variant="regular"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {handleDrawerToggle
          ? (
          <IconButton
            size="large"
            edge="start"
            color="default"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
            )
          : (
          <div />
            )}

        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <IconButton size="large" color="default" sx={{ margin: '0 2px' }}>
            <Badge badgeContent={17} color="default">
              <NotificationIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={() => navigate('/admin/profile')}
            sx={{ margin: '0 2px' }}
          >
            <AccountIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={handleSettingsDrawerToggle}
            sx={{ margin: '0 2px' }}
          >
            <SettingsIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={handleLogout}
            sx={{ margin: '0 2px' }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  )
}

export default Topbar
