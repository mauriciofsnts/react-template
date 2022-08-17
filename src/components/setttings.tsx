import React from 'react'
import {
  Drawer,
  Divider,
  Toolbar,
  Box,
  Typography,
  IconButton,
  SvgIcon,
  TextField,
  MenuItem,
  Button,
  BottomNavigationAction,
  BottomNavigation
} from '@mui/material'

import {
  Close as CloseIcon,
  DensityLarge,
  DensityMedium,
  DensitySmall
} from '@mui/icons-material'
import { useAppTranslation } from 'hooks'
import { useTableSettings } from 'core/contexts/table-context'

type Props = {
  onClose: () => void
  open: boolean
}

const Settings: React.FC<Props> = ({ onClose, open }) => {
  const { t, i18n } = useAppTranslation()
  const { density, handleChangeTableDensity } = useTableSettings()

  const selectedLanguage = i18n.language

  const handleChangeLanguage = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target
    void i18n.changeLanguage(value)
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box'
        }
      }}
      onClose={onClose}
    >
      <Toolbar>
        <Box
          display="flex"
          flexGrow={1}
          flexWrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{t('settings')}</Typography>

          <IconButton onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Box>
      </Toolbar>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mt: 3, width: '100%', px: 3 }}
        gap={3}
      >
        <TextField
          select
          label={t('language')}
          fullWidth
          value={selectedLanguage}
          onChange={handleChangeLanguage}
        >
          <MenuItem value="pt-BR">Português</MenuItem>
          <MenuItem value="en-US">English</MenuItem>
        </TextField>

        <Divider variant="middle" flexItem />

        <Typography variant="overline">Configurações de tabela</Typography>

        <BottomNavigation
          showLabels
          sx={{ width: '100%' }}
          value={density}
          onChange={(e, v) => handleChangeTableDensity(v)}
        >
          <BottomNavigationAction
            value="compact"
            label="Compact"
            icon={<DensitySmall />}
          />
          <BottomNavigationAction
            value="standard"
            label="Standard"
            icon={<DensityMedium />}
          />
          <BottomNavigationAction
            value="comfortable"
            label="Comfortable"
            icon={<DensityLarge />}
          />
        </BottomNavigation>
      </Box>
    </Drawer>
  )
}

export default Settings
