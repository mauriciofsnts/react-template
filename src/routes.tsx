import React from 'react'
import { Navigate } from 'react-router-dom'
import * as Page from './pages'
import AuthLayout from './layouts/auth'

const routes = [
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
