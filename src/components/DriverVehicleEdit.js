import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CCol, CRow, CCard, CCardBody, CFormInput, CButton } from '@coreui/react'
import { getDriverVehicleData, updateDriverVehicleData } from 'src/utils/calloutHelper'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const DriverVehicleEdit = (props) => {
  const [driverVehicleData, setDriverVehicleData] = useState('')
  const [disableButton, setDisableButtonState] = useState(true)
  const [vehicleBrand, setVehicleBrand] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleFrontImage, setVehicleFrontImage] = useState('')
  const [vehicleBackImage, setVehicleBackImage] = useState('')
  const [rCFrontImage, setRCFrontImage] = useState('')
  const [rCBackImage, setRCBackImage] = useState('')
  const [vehicleFrontImageUrl, setVehicleFrontImageUrl] = useState('')
  const [vehicleBackImageUrl, setVehicleBackImageUrl] = useState('')
  const [rCFrontImageUrl, setRCFrontImageUrl] = useState('')
  const [rCBackImageUrl, setRCBackImageUrl] = useState('')
  const [isDisplay, setIsDisplay] = useState(false)
  const [displayMessage, setDisplayMessage] = useState('')

  useEffect(() => {
    getDriverVehicleDetails()
  }, [])

  const getDriverVehicleDetails = async () => {
    var url = 'http://localhost:4000/api/v1/admin-driver-vehicle-list/' + props.driverId
    let response = await getDriverVehicleData('GET', url)
    if (response !== undefined && response.data.data) {
      setData(response.data.data[0])
    } else {
      setIsDisplay(true)
      setDisplayMessage(response.data.msg)
    }
  }

  const setData = (record) => {
    setDriverVehicleData(record)
    setVehicleBrand(record.vehicleInformation.vehicleBrand)
    setVehicleModel(record.vehicleInformation.vehicleModel)
    setVehicleNumber(record.vehicleInformation.vehicleNumber)
    setVehicleType(record.vehicleInformation.vehicleType)
    setVehicleFrontImageUrl(record.vehicleInformation.vehicleFrontImage)
    setVehicleBackImageUrl(record.vehicleInformation.vehicleBackImage)
    setRCFrontImageUrl(record.rcInformation.registrationCertificateFrontImage)
    setRCBackImageUrl(record.rcInformation.registrationCertificateBackImage)
    console.log('driverLicenseData', JSON.stringify(record))
  }

  const onVehicleBrandChange = (event) => {
    console.log('onVehicleBrandChange event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setVehicleBrand(event.target.value)
  }
  const onvehicleModelChange = (event) => {
    console.log('onvehicleModelChange event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setVehicleModel(event.target.value)
  }
  const onVehicleNumberChange = (event) => {
    console.log('onVehicleNumberChange event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setVehicleNumber(event.target.value)
  }
  const onVehicleTypeChange = (event) => {
    console.log('onVehicleTypeChange event:::===>>' + JSON.stringify(event.target.value))
    setDisableButtonState(false)
    setVehicleType(event.target.value)
  }
  const onVehicleFrontImageUpload = (event) => {
    console.log('onVehicleFrontImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setVehicleFrontImageUrl('')
    setVehicleFrontImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onVehicleBackImageUpload = (event) => {
    console.log('onVehicleBackImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setVehicleBackImageUrl('')
    setVehicleBackImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onRCFrontImageUpload = (event) => {
    console.log('onRCFrontImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setRCFrontImageUrl('')
    setRCFrontImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onRCBackImageUpload = (event) => {
    console.log('onRCBackImageUpload event:::===>>' + event.target.files[0])
    setDisableButtonState(false)
    setRCBackImageUrl('')
    setRCBackImage({
      image_preview: URL.createObjectURL(event.target.files[0]),
      image_file: event.target.files[0],
    })
  }
  const onUpdateVehicleDetailsClick = async () => {
    console.log('onUpdateVehicleDetailsClick :::===>>')
    if (window.confirm('Are you sure to update Vehicle details !')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

      let formData = new FormData()
      formData.append('driverId', props.driverId)
      if (vehicleBrand !== '') {
        formData.append('vehicleBrand', vehicleBrand)
      }
      if (vehicleModel !== '') {
        formData.append('vehicleModel', vehicleModel)
      }
      if (vehicleNumber !== '') {
        formData.append('vehicleNumber', vehicleNumber)
      }
      if (vehicleType !== '') {
        formData.append('vehicleType', vehicleType)
      }
      if (vehicleFrontImage !== '') {
        formData.append('vehicleFrontImage', vehicleFrontImage.image_file)
      } else if (vehicleFrontImageUrl !== '') {
        formData.append('vehicleFrontImageURL', vehicleFrontImageUrl)
      }
      if (vehicleBackImage !== '') {
        formData.append('vehicleBackImage', vehicleBackImage.image_file)
      } else if (vehicleBackImageUrl !== '') {
        formData.append('vehicleBackImageURL', vehicleBackImageUrl)
      }
      if (rCFrontImage !== '') {
        formData.append('registrationCertificateFrontImage', rCFrontImage.image_file)
      } else if (rCFrontImageUrl !== '') {
        formData.append('registrationCertificateFrontImageURL', rCFrontImageUrl)
      }
      if (rCBackImage !== '') {
        formData.append('registrationCertificateBackImage', rCBackImage.image_file)
      } else if (rCBackImageUrl !== '') {
        formData.append('registrationCertificateBackImageURL', rCBackImageUrl)
      }
      const headers = {
        'Content-Type': 'multipart/form-data;',
      }

      let url = 'http://localhost:4000/api/v1/admin-driver-vehicle-update'

      let response = await updateDriverVehicleData('PUT', url, formData)
      if (response !== undefined) {
        setIsDisplay(true)
        setDisplayMessage(response.data.msg)
        setTimeout(() => {
          props.closePopup(false)
        }, 2000)
      }
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  return (
    <div>
      {driverVehicleData == '' || isDisplay ? (
        <div>
          <CToast visible={true} color="success" className="align-items-center">
            <div className="d-flex">
              <CToastBody>Hello, Admin! {displayMessage}.</CToastBody>
              <CToastClose className="me-2 m-auto" />
            </div>
          </CToast>
        </div>
      ) : (
        <CRow>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CFormInput
                  type="text"
                  id="Name"
                  label="Vehicle Brand"
                  value={vehicleBrand}
                  onChange={onVehicleBrandChange}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="text"
                  id="Name"
                  label="Vehicle Model"
                  value={vehicleModel}
                  onChange={onvehicleModelChange}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="Vehicle Front Image"
                  onChange={onVehicleFrontImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={
                    vehicleFrontImage.image_preview
                      ? vehicleFrontImage.image_preview
                      : vehicleFrontImageUrl
                  }
                  alt=""
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="Vehicle Back Image"
                  onChange={onVehicleBackImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={
                    vehicleBackImage.image_preview
                      ? vehicleBackImage.image_preview
                      : vehicleBackImageUrl
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
                  type="text"
                  id="Name"
                  label="Vehicle Number"
                  value={vehicleNumber}
                  onChange={onVehicleNumberChange}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="text"
                  id="Name"
                  label="Vehicle Type"
                  value={vehicleType}
                  onChange={onVehicleTypeChange}
                  disabled={props.isAccountApprove}
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="Registration Certificate Front Image"
                  onChange={onRCFrontImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={rCFrontImage.image_preview ? rCFrontImage.image_preview : rCFrontImageUrl}
                  alt=""
                />
                <CFormInput
                  type="file"
                  id="formFile"
                  label="Registration Certificate Back Image"
                  onChange={onRCBackImageUpload}
                  disabled={props.isAccountApprove}
                />
                <img
                  style={{ margin: '10px' }}
                  width={200}
                  height={200}
                  className="image"
                  src={rCBackImage.image_preview ? rCBackImage.image_preview : rCBackImageUrl}
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
                onClick={() => onUpdateVehicleDetailsClick()}
              >
                Update Vehicle Details
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
DriverVehicleEdit.propTypes = {
  driverId: PropTypes.string,
  closePopup: PropTypes.func,
  isAccountApprove: PropTypes.bool,
}

export default React.memo(DriverVehicleEdit)
