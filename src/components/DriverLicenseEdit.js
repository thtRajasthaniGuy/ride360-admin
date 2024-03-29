import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { CCol, CRow, CCard, CCardBody, CFormInput, CButton } from '@coreui/react'
import { getDriverLicenseData, updateDriverLicenseData } from 'src/utils/calloutHelper'
import { NotificationAlert } from 'src/components'

const DriverLicenseEdit = (props) => {
  const [driverLicenseData, setDriverLicenseData] = useState('')
  const [disableButton, setDisableButtonState] = useState(true)
  const [licenseNumber, setLicenseNumber] = useState('')
  const [licenseExpirationDate, setLicenseExpirationDate] = useState('')
  const [insuranceExpirationDate, setInsuranceExpirationDate] = useState('')
  const [licenseFrontImage, setLicenseFrontImage] = useState('')
  const [licenseBackImage, setLicenseBackImage] = useState('')
  const [selfieWithDL, setSelfieWithDL] = useState('')
  const [insuranceImage, setInsuranceImage] = useState('')
  const [licenseFrontImageURL, setLicenseFrontImageURL] = useState('')
  const [licenseBackImageURL, setLicenseBackImageURL] = useState('')
  const [selfieWithDLURL, setSelfieWithDLURL] = useState('')
  const [insuranceImageURL, setInsuranceImageURL] = useState('')
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertcolor, setAlertcolor] = useState('')

  useEffect(() => {
    getDriverVehicleDetails()
  }, [])

  const getDriverVehicleDetails = async () => {
    try {
      var url = process.env.REACT_APP_URL + '/admin-driver-license-list/' + props.driverId
      let response = await getDriverLicenseData('GET', url)
      if (response !== undefined && response.data.data) {
        setData(response.data.data[0])
      } else {
        setIsDisplayAlert(true)
        setAlertMessage(response.data.msg)
        setAlertcolor('warning')
      }
    } catch (error) {
      console.log('getDriverVehicleDetails error :::====>>' + error)
      setDriverLicenseData('')
      setIsDisplayAlert(true)
      setAlertMessage(error)
      setAlertcolor('warning')
    }
  }

  const setData = (record) => {
    setDriverLicenseData(record)
    setLicenseNumber(record.licenseInformation.licenseNumber)
    setLicenseExpirationDate(record.licenseInformation.licenseExpirationDate.split('T')[0])
    setInsuranceExpirationDate(record.vehicleInsurance.insuranceExpirationDate.split('T')[0])
    setLicenseFrontImageURL(record.licenseInformation.licenseFrontImage)
    setLicenseBackImageURL(record.licenseInformation.licenseBackImage)
    setSelfieWithDLURL(record.licenseInformation.selfieWithDL)
    setInsuranceImageURL(record.vehicleInsurance.insuranceImage)
    console.log('driverLicenseData', JSON.stringify(record))
  }
  const onLicenseNumberChange = (event) => {
    console.log('onLicenseNumberChange event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setLicenseNumber(event.target.value)
  }
  const onLicenseExpirationDate = (event) => {
    console.log('onLicenseExpirationDate event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setLicenseExpirationDate(event.target.value)
  }
  const onlicenseFrontImageUpload = (event) => {
    console.log('onlicenseFrontImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setLicenseFrontImageURL('')
    setLicenseFrontImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onlicenseBackImageUpload = (event) => {
    console.log('onlicenseBackImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setLicenseBackImageURL('')
    setLicenseBackImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onInsuranceExpirationDateChange = (event) => {
    console.log('onInsuranceExpDateChange event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setInsuranceExpirationDate(event.target.value)
  }
  const onSelfieWithDLUpload = (event) => {
    console.log('onSelfieWithDLUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setSelfieWithDLURL('')
    setSelfieWithDL({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onInsuranceImageUpload = (event) => {
    console.log('onInsuranceImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setInsuranceImageURL('')
    setInsuranceImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onUpdateLicenseDetailsClick = async () => {
    console.log('onUpdateLicenseDetailsClick :::===>>')
    if (window.confirm('Are you sure to update license details !')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

      let formData = new FormData()
      formData.append('driverId', props.driverId)

      if (licenseNumber !== '') {
        formData.append('licenseNumber', licenseNumber)
      }
      if (licenseExpirationDate !== '') {
        formData.append('licenseExpirationDate', licenseExpirationDate)
      }
      if (insuranceExpirationDate !== '') {
        formData.append('insuranceExpirationDate', insuranceExpirationDate)
      }
      if (licenseFrontImage !== '') {
        formData.append('licenseFrontImage', licenseFrontImage.image_file)
      } else if (licenseFrontImageURL !== '') {
        formData.append('licenseFrontImageURL', licenseFrontImageURL)
      }
      if (licenseBackImage !== '') {
        formData.append('licenseBackImage', licenseBackImage.image_file)
      } else if (licenseBackImageURL !== '') {
        formData.append('licenseBackImageURL', licenseBackImageURL)
      }
      if (selfieWithDL !== '') {
        formData.append('selfieWithDL', selfieWithDL.image_file)
      } else if (selfieWithDLURL !== '') {
        formData.append('SelfieWithDLURL', selfieWithDLURL)
      }
      if (insuranceImage !== '') {
        formData.append('insuranceImage', insuranceImage.image_file)
      } else if (insuranceImageURL !== '') {
        formData.append('insuranceImageURL', insuranceImageURL)
      }

      try {
        let url = process.env.REACT_APP_URL + '/admin-driver-license-update'
        let response = await updateDriverLicenseData('PUT', url, formData)
        if (response !== undefined && response.data) {
          setIsDisplayAlert(true)
          setAlertMessage(response.data.msg)
          setAlertcolor('success')
          setTimeout(() => {
            props.closePopup(false)
          }, 2000)
        } else if (response.hasOwnProperty('message')) {
          setIsDisplayAlert(true)
          setAlertMessage(response.message)
          setAlertcolor('warning')
        }
      } catch (error) {
        console.log('onUpdateLicenseDetailsClick error :::====>>' + error)
        setIsDisplayAlert(true)
        setAlertMessage(error)
        setAlertcolor('warning')
      }
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  return (
    <div>
      {driverLicenseData === '' || isDisplayAlert ? (
        <div>
          <NotificationAlert
            color={alertcolor}
            isDisplayAlert={isDisplayAlert}
            alertMessage={alertMessage}
          />
        </div>
      ) : (
        <CRow>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CFormInput
                  type="text"
                  id="Name"
                  label="License Number"
                  value={licenseNumber}
                  onChange={onLicenseNumberChange}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="date"
                  id="Name"
                  label="License Expiration Date"
                  value={licenseExpirationDate}
                  onChange={onLicenseExpirationDate}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="license Front Image"
                  onChange={onlicenseFrontImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={
                    licenseFrontImage.image_preview
                      ? licenseFrontImage.image_preview
                      : licenseFrontImageURL
                  }
                  alt=""
                />

                <CFormInput
                  type="file"
                  id="formFile"
                  label="license Back Image"
                  onChange={onlicenseBackImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={
                    licenseBackImage.image_preview
                      ? licenseBackImage.image_preview
                      : licenseBackImageURL
                  }
                  alt=""
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CFormInput
                  type="date"
                  id="Name"
                  label="Insurance Expiration Date"
                  value={insuranceExpirationDate}
                  onChange={onInsuranceExpirationDateChange}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="Selfie With DL"
                  onChange={onSelfieWithDLUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={selfieWithDL.image_preview ? selfieWithDL.image_preview : selfieWithDLURL}
                  alt=""
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="Insurance Image"
                  onChange={onInsuranceImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={
                    insuranceImage.image_preview ? insuranceImage.image_preview : insuranceImageURL
                  }
                  alt=""
                />
              </CCardBody>
            </CCard>
          </CCol>
          <div className="text-center">
            {props.isAccountApprove ? null : (
              <CButton
                style={{ margin: '10px' }}
                color="primary"
                variant="outline"
                className="me-3"
                disabled={disableButton}
                onClick={() => onUpdateLicenseDetailsClick()}
              >
                Update License Details
              </CButton>
            )}
          </div>
        </CRow>
      )}
      <p id="onOkClick" style={{ display: 'none' }}>
        Ok
      </p>
      <p id="onCancleClick" style={{ display: 'none' }}>
        Cancle
      </p>
    </div>
  )
}
DriverLicenseEdit.propTypes = {
  driverId: PropTypes.string,
  closePopup: PropTypes.func,
  isAccountApprove: PropTypes.bool,
}

export default React.memo(DriverLicenseEdit)
