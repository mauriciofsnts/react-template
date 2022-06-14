import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import { AuthenticationParams } from 'core/entities/authentication'
import { LoginOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

type LoginPresenterProps = {
  params: AuthenticationParams
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const LoginPresenter: React.FC<LoginPresenterProps> = ({
  handleSubmit,
  handleChange,
  params
}) => {
  const { t } = useTranslation()
  const isInvalid = params.email === '' || params.password === ''

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ height: '60vh' }}
    >
      <Avatar>
        <LoginOutlined />
      </Avatar>

      <Typography component="h1" variant="h5">
        {t('login')}
      </Typography>

      <Box sx={{ mt: 1 }}>
        <TextField
          required
          margin="normal"
          fullWidth
          label={t('username')}
          name="email"
          autoComplete="email"
          value={params.email}
          onChange={handleChange}
          autoFocus
          inputProps={{ 'data-cy': 'login_email_input' }}
        />
        <TextField
          required
          margin="normal"
          fullWidth
          label={t('password')}
          name="password"
          type="password"
          autoComplete="password"
          onChange={handleChange}
          value={params.password}
          inputProps={{ 'data-cy': 'login_password_input' }}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label={`${t('rememberMe')}`}
        />

        <Button
          data-cy="login_submit_button"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
          disabled={isInvalid}
        >
          {t('login')}
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPresenter
