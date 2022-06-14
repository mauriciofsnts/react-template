import React from 'react'
import { Box } from '@mui/material'

type LogoProps = {
  sx?: object
}

const Logo: React.FC<LogoProps> = ({ sx }) => {
  return (
    <Box
      component="img"
      src="/static/logo.svg"
      sx={{ width: 40, height: 40, ...sx }}
    />
  )
}

export default Logo
