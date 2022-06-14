import React, { useState, useEffect } from 'react'
import { AuthenticationParams } from 'core/entities/authentication'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { onAuth } from 'core/adapters'
import { useSnackbar } from 'notistack'

import LoginPresenter from './login-presenter'

const LoginWrapper: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { auth, authError, authLoad } = useAppSelector(
    (state) => state.authentication
  )

  const [params, setParams] = useState<AuthenticationParams>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (): void => {
    if (authLoad) return

    dispatch(onAuth(params))
  }

  useEffect(() => {
    if (auth) {
      return navigate('/admin/clients')
    }

    if (authError) {
      enqueueSnackbar(<span id="snack_auth_error">{authError.error}</span>, {
        variant: 'error'
      })
    }
  }, [auth, authError])

  return (
    <LoginPresenter
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      params={params}
    />
  )
}

export default LoginWrapper
