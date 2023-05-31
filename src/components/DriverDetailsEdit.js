import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CFormLabel, CCol } from '@coreui/react'
import { CFormInput, CButton } from '@coreui/react'

const DriverDetailsEdit = (props) => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [driverName, setDriverName] = useState(props.selectedRowData.name)
  const [driverEmail, setDriverEmail] = useState(props.selectedRowData.email)
  const [driverDob, setDriverDob] = useState(props.selectedRowData.dob)

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
  const onUpdateDetailsClick = () => {
    if (window.confirm('Are you sure to update Driver details!')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

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

      const headers = {
        'Content-Type': 'multipart/form-data;',
      }

      axios
        .put('http://192.168.29.32:4000/api/v1/admin-driver-basic-update', formData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data)
          props.onRefresh()
          props.closePopup(false)
        })
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  return (
    <div>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput type="text" id="Name" value={driverName} onChange={onNameChange} />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput type="email" id="email" value={driverEmail} onChange={onEmailChange} />
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
            <CFormInput type="Date" id="dob" value={driverDob} onChange={onDobChange} />
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
}

export default React.memo(DriverDetailsEdit)
