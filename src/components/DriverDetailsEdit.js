import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CFormLabel, CCol } from '@coreui/react'
import { CFormInput, CButton, CFormSelect } from '@coreui/react'
import { updateDriverAccountStatus, driverBasicUpdate } from 'src/utils/calloutHelper'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const accountStatusOptions = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Banned',
    value: 'banned',
  },
  {
    label: 'InActive',
    value: 'inactive',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
]

const DriverDetailsEdit = (props) => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [driverName, setDriverName] = useState(props.selectedRowData.name)
  const [driverEmail, setDriverEmail] = useState(props.selectedRowData.email)
  const [driverDob, setDriverDob] = useState(props.selectedRowData.dob)
  const [accountStatus, setAccountStatus] = useState(props.selectedRowData.accountStatus)
  const [isUpdateSuccessFully, setIsUpdateSuccessFully] = useState(false)
  const [displayMessage, setDisplayMessage] = useState('')

  const onNameChange = (e) => {
    console.log(e.target.value)
    setDisableButtonState(false)
    setDriverName(e.target.value)
  }
  const onEmailChange = (e) => {
    console.log(e.target.value)
    setDisableButtonState(false)
    setDriverEmail(e.target.value)
  }
  const onDobChange = (e) => {
    console.log(e.target.value)
    setDisableButtonState(false)
    setDriverDob(e.target.value)
  }

  const onAccountStatusChnage = (event) => {
    setDisableButtonState(false)
    setAccountStatus(event.target.value)
  }

  const onUpdateDetailsClick = async () => {
    if (window.confirm('Are you sure to update Driver details!')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

      if (props.isAccountApprove) {
        console.log('if isAccountApprove' + props.isAccountApprove)
        updateAccountStatus()
      } else {
        console.log('else isAccountApprove' + props.isAccountApprove)

        let formData = new FormData()
        formData.append('phoneNumber', props.selectedRowData.phoneNumber)
        if (driverName !== null) {
          formData.append('name', driverName)
        }
        if (driverEmail !== null) {
          formData.append('email', driverEmail)
        }
        if (driverDob !== null) {
          formData.append('dob', driverDob)
        }

        let url = 'http://localhost:4000/api/v1/admin-driver-basic-update'
        let response = await driverBasicUpdate('PUT', url, formData)

        if (response !== undefined) {
          setIsUpdateSuccessFully(true)
          setDisplayMessage(response.data.msg)
          props.onRefresh()
          setTimeout(() => {
            props.closePopup(false)
          }, 2000)
        }
      }
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  const updateAccountStatus = async () => {
    var url = 'http://localhost:4000/api/v1/driveraccountstatus'

    let payload = {
      phoneNumber: props.selectedRowData.phoneNumber,
      accountStatus: accountStatus,
    }

    let response = await updateDriverAccountStatus('POST', url, payload)
    if (response !== undefined && response.status) {
      setIsUpdateSuccessFully(true)
      setDisplayMessage('Driver Account ' + response.data.msg)
      props.onRefresh()
      setTimeout(() => {
        props.closePopup(false)
      }, 2000)
    }
  }

  return (
    <div>
      <CForm>
        <CToast
          autohide={true}
          visible={isUpdateSuccessFully}
          color="success"
          className="align-items-center"
        >
          <div className="d-flex">
            <CToastBody>Hello, Admin! {displayMessage}.</CToastBody>
            <CToastClose className="me-2 m-auto" />
          </div>
        </CToast>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="Name"
              value={driverName}
              onChange={onNameChange}
              disabled={props.isAccountApprove}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="email"
              id="email"
              value={driverEmail}
              onChange={onEmailChange}
              disabled={props.isAccountApprove}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Phone
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="phone"
              id="phone"
              disabled
              value={props.selectedRowData.phoneNumber}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Date of Birth
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="Date"
              id="dob"
              value={driverDob}
              onChange={onDobChange}
              disabled={props.isAccountApprove}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Total kilometer
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="totalkilometer"
              value={props.selectedRowData.totalkilometer}
              disabled
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Rating
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput type="text" id="rating" value={props.selectedRowData.rating} disabled />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Account Status
          </CFormLabel>
          <CCol sm={10}>
            <CFormSelect
              aria-label="Disabled select example"
              disabled={props.isAccountApprove == true ? false : true}
              value={accountStatus}
              onChange={(event) => onAccountStatusChnage(event)}
            >
              {accountStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <div className="text-center">
          <CButton
            color="primary"
            variant="outline"
            className="me-3"
            onClick={() => onUpdateDetailsClick()}
            disabled={disableButton}
          >
            Update Details
          </CButton>
        </div>
      </CForm>
      <p id="onOkClick" style={{ display: 'none' }}>
        Ok
      </p>
      <p id="onCancleClick" style={{ display: 'none' }}>
        Cancle
      </p>
    </div>
  )
}
DriverDetailsEdit.propTypes = {
  selectedRowData: PropTypes.object,
  closePopup: PropTypes.func,
  onRefresh: PropTypes.func,
  isAccountApprove: PropTypes.bool,
}

export default React.memo(DriverDetailsEdit)
