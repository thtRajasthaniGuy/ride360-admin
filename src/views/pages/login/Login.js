import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { toast, Toaster } from 'react-hot-toast'
import { adminLogin } from 'src/utils/calloutHelper'
import { CSpinner } from '@coreui/react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const Login = (props) => {
  const navigate = useNavigate()
  const [adminLoginEmail, setAdminLoginEmail] = useState('')
  const [adminLoginPassword, setAdminLoginPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

  const onAdminLoginDetailsChange = (event) => {
    if (event.target.id === 'password') {
      setAdminLoginPassword(event.target.value)
      setPasswordError(false)
    } else if (event.target.id === 'email') {
      setAdminLoginEmail(event.target.value)
      setEmailError(false)
    }
  }

  const adminLoginCall = async () => {
    setLoading(true)
    if (!adminLoginEmail && !adminLoginPassword) {
      toast.success('Login not successfully!')
      setEmailError(true)
      setPasswordError(true)
      setEmailErrorMsg('Email is required to login.')
      setPasswordErrorMsg('Password is required to login.')
    } else if (!adminLoginEmail) {
      toast.success('Login not successfully!')
      setEmailError(true)
      setEmailErrorMsg('Email is required to login.')
    } else if (!adminLoginPassword) {
      toast.success('Login not successfully!')
      setPasswordError(true)
      setPasswordErrorMsg('Password is required to login.')
    } else if (adminLoginEmail && adminLoginPassword) {
      let formData = new FormData()
      formData.append('email', adminLoginEmail)
      formData.append('password', adminLoginPassword)
      let url = process.env.REACT_APP_URL + '/admin/login'
      let response = await adminLogin('POST', url, formData)
      if (response && response.data && response.data.msg === 'user found') {
        toast.success('Login successfully!')
        props.onSetAuth(true)
        localStorage.setItem('authData', JSON.stringify(response.data))
        navigate('/dashboard')
      } else if (response && response.data && response.data.msg === 'user not found') {
        toast.success(response.data.msg)
      } else {
        toast.success('Login not successfully!')
      }
    }
    setLoading(false)
  }

  return (
    <section className="bg-dark min-vh-100 d-flex justify-content-center ">
      <div className="justify-content-center">
        <Toaster toastOptions={{ duration: 4000 }} />
        {
          <Box
            component="form"
            sx={{
              width: 500,
              height: 500,
              borderRadius: 1,
            }}
            noValidate
            autoComplete="off"
          >
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
              <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                Welcome to <br /> Ride 360
              </h1>
              <div className="card border-top-dark border-top-3 ">
                <div className="card-body text-dark d-grid gap-2">
                  {!emailError ? (
                    <TextField
                      label="Email"
                      id="email"
                      size="small"
                      fullWidth
                      value={adminLoginEmail}
                      onChange={onAdminLoginDetailsChange}
                      required
                    />
                  ) : (
                    <TextField
                      error
                      id="email"
                      label="Email"
                      size="small"
                      fullWidth
                      helperText={emailErrorMsg}
                      value={adminLoginEmail}
                      onChange={onAdminLoginDetailsChange}
                    />
                  )}
                  {!passwordError ? (
                    <TextField
                      label="Password"
                      id="password"
                      size="small"
                      fullWidth
                      value={adminLoginPassword}
                      onChange={onAdminLoginDetailsChange}
                      required
                    />
                  ) : (
                    <TextField
                      error
                      id="password"
                      label="Password"
                      size="small"
                      fullWidth
                      helperText={passwordErrorMsg}
                      value={adminLoginPassword}
                      onChange={onAdminLoginDetailsChange}
                    />
                  )}

                  <button type="button" onClick={adminLoginCall} className="btn btn-success">
                    {loading && <CSpinner color="dark" size="sm" />}
                    <span>Login </span>
                  </button>
                </div>
              </div>
            </div>
          </Box>
        }
      </div>
    </section>
  )
}
Login.propTypes = {
  onSetAuth: PropTypes.func,
}

export default Login
