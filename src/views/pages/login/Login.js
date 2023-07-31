import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'

import OtpInput from 'otp-input-react'
import React from 'react'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from 'src/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { toast, Toaster } from 'react-hot-toast'

const Login = () => {
  const [otp, setOtp] = useState('')
  const [ph, setPh] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [user, setUser] = useState(null)

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      console.log('window.recaptchaVerifier inside')
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {
              console.log('window.recaptchaVerifier response' + response)

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
    const formatPh = '+' + ph

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
      })
  }

  function onOTPVerify() {
    setLoading(true)
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log('resresres::::::::::>' + JSON.stringify(res))
        localStorage.setItem('auth', true)
        setUser(res.user)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <section className="bg-dark min-vh-100 d-flex justify-content-center ">
      <div className="justify-content-center">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">👍Login Success</h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> Ride 360
            </h1>
            {showOTP ? (
              <>
                <div className="card border-top-dark border-top-3 ">
                  <div className="card-body text-dark d-grid gap-2">
                    <div className="bg-white p-2">
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
                      {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                      <span>Verify OTP</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card border-top-dark border-top-3 ">
                  <div className="card-body text-dark d-grid gap-2">
                    <div className="bg-white p-2">
                      <BsTelephoneFill size={30} />
                    </div>
                    <div className="text-success d-flex justify-content-center">
                      Verify your phone number
                    </div>
                    <PhoneInput country={'in'} value={ph} onChange={setPh} />
                    <button onClick={onSignup} className="btn btn-success">
                      {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                      <span>Send code via SMS</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Login
