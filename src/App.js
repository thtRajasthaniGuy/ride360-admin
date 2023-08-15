import React, { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('auth')) || false,
  )

  const setAuth = (value) => {
    setIsAuthenticated(value)
  }

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            path="*"
            element={isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" name="Login Page" element={<Login onSetAuth={setAuth} />} />
          <Route path="/register" name="Register Page" element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
