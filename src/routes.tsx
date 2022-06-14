import React from 'react'
import { Navigate } from 'react-router-dom'

import * as Page from './pages'

import AuthLayout from './layouts/auth'
import AppLayout from './layouts/app'

const routes = [
  {
    path: 'portal',
    element: <AppLayout />,
    children: [
      { path: 'home', element: <Page.Home /> },
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
