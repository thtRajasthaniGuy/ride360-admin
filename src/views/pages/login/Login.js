import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PropTypes } from 'prop-types'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from 'src/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { toast, Toaster } from 'react-hot-toast'
import { adminLogin } from 'src/utils/calloutHelper'
import { CSpinner } from '@coreui/react'

const Login = (props) => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {
              onSignup()
            },
            'expired-callback': () => {},
          },
          auth,
        )
      } catch (error) {
        console.log('error' + error)
      }
    }
  }

  async function onSignup() {
    setLoading(true)
    onCaptchVerify()
    const appVerifier = await window.recaptchaVerifier
    const formatPh = '+' + phone

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        setLoading(false)
        setShowOTP(true)
        toast.success('OTP sended successfully!')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        toast.success('OTP not sended successfully!')
      })
  }

  function onOTPVerify() {
    setLoading(true)
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        toast.success('OTP verify successfully!')
        setLoading(false)
        adminLoginCall()
      })
      .catch((err) => {
        console.log(err)
        toast.success('OTP not verify successfully!')
        setLoading(false)
      })
  }

  const adminLoginCall = async () => {
    let phoneNumber = phone.substring(2)

    let url = process.env.REACT_APP_URL + '/admin/login/' + phoneNumber
    let response = await adminLogin('GET', url)
    if (response !== undefined && response.status === 200) {
      toast.success('Login successfully!')
      props.onSetAuth(true)
      localStorage.setItem('authData', JSON.stringify(response.data))
      navigate('/dashboard')
    } else {
      toast.success('Login not successfully!')
    }
  }

  return (
    <section className="bg-dark min-vh-100 d-flex justify-content-center ">
      <div className="justify-content-center">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> Ride 360
            </h1>
            {showOTP ? (
              <>
                <div className="card border-top-dark border-top-3 ">
                  <div className="card-body text-dark d-grid gap-2">
                    <div className="bg-white p-2 mx-auto">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <div className="text-success d-flex justify-content-center">Enter your OTP</div>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      autoFocus
                      className="opt-container "
                    ></OtpInput>
                    <button onClick={onOTPVerify} className="btn btn-success">
                      {loading && <CSpinner color="dark" size="sm" />}
                      <span>Verify OTP</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card border-top-dark border-top-3 ">
                  <div className="card-body text-dark d-grid gap-2">
                    <div className="bg-white p-2 mx-auto">
                      <BsTelephoneFill size={30} />
                    </div>
                    <div className="text-success d-flex justify-content-center">
                      Verify your phone number
                    </div>
                    <PhoneInput
                      country={'in'}
                      value={phone}
                      onChange={setPhone}
                      disableDropdown={true}
                    />
                    <button onClick={onSignup} className="btn btn-success">
                      {loading && <CSpinner color="dark" size="sm" />}
                      <span>Send code via SMS</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        }
      </div>
    </section>
  )
}
Login.propTypes = {
  onSetAuth: PropTypes.func,
}

export default Login
