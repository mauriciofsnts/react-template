import React from 'react'
import { Navigate } from 'react-router-dom'

import * as Page from './pages'

import AuthLayout from './layouts/auth'
import AppLayout from './layouts/app'
import { useAppDispatch, useAppTranslation } from 'hooks'
import { AnyAction, Dispatch } from 'redux'

type RouteProps = {
  t: (key: any) => string
  dispatch: Dispatch<AnyAction>
}

type Props = {
  Page: React.FC<RouteProps>
}

const BuildPage: React.FC<Props> = ({ Page }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useAppTranslation()

  return <Page t={t} dispatch={dispatch} />
}

const routes = [
  {
    path: 'portal',
    element: <AppLayout />,
    children: [
      { path: 'home', element: <BuildPage Page={Page.Home} /> },
      { path: '*', element: <Navigate to="/portal/home" /> }
    ]
  },
  {
    path: '',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Page.Login /> },
      { path: '404', element: <Page.NotFound /> },
      { path: '500', element: <Page.NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]

export default routes
