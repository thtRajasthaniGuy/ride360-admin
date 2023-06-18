import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'
import { updateRideFaresData } from 'src/utils/calloutHelper'
import { NotificationAlert } from 'src/components'

const RideFareDetailsEdit = (props) => {
  const [selectedRowData, setSelectedRowData] = useState(props?.selectedRowData)
  const [state, setState] = useState(props.selectedRowData?.state)
  const [city, setCity] = useState(props.selectedRowData?.city)
  const [bikeDayFare, setBikeDayFare] = useState(props.selectedRowData?.bikeDayFare)
  const [bikeNightFare, setBikeNightFare] = useState(props.selectedRowData?.bikeNightFare)
  const [autoNightFare, setAutoNightFare] = useState(props.selectedRowData?.autoNightFare)
  const [sedanCarFare, setSedanCarFare] = useState(props.selectedRowData?.sedanCarFare)
  const [sedanCarNightFare, setSedanCarNightFare] = useState(
    props.selectedRowData?.sedanCarNightFare,
  )
  const [suvCarFare, setSuvCarFare] = useState(props.selectedRowData?.suvCarFare)
  const [suvCarNightFare, setSuvCarNightFare] = useState(props.selectedRowData?.suvCarNightFare)
  const [miniCarFare, setMiniCarFare] = useState(props.selectedRowData?.miniCarFare)
  const [miniCarNightFare, setMiniCarNightFare] = useState(props.selectedRowData?.miniCarNightFare)
  const [disableButton, setDisableButtonState] = useState(true)
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertcolor, setAlertcolor] = useState('')

  const onRideFareChange = (event) => {
    setDisableButtonState(false)
    if (event.target.id === 'bikeDayFare') {
      setBikeDayFare(event.target.value)
      selectedRowData.bikeDayFare = event.target.value
    }
    if (event.target.id === 'bikeNightFare') {
      setBikeNightFare(event.target.value)
      selectedRowData.bikeNightFare = event.target.value
    }
    if (event.target.id === 'autoNightFare') {
      setAutoNightFare(event.target.value)
      selectedRowData.autoNightFare = event.target.value
    }
    if (event.target.id === 'sedanCarFare') {
      setSedanCarFare(event.target.value)
      selectedRowData.sedanCarFare = event.target.value
    }
    if (event.target.id === 'sedanCarNightFare') {
      setSedanCarNightFare(event.target.value)
      selectedRowData.sedanCarNightFare = event.target.value
    }
    if (event.target.id === 'suvCarFare') {
      setSuvCarFare(event.target.value)
      selectedRowData.suvCarFare = event.target.value
    }
    if (event.target.id === 'suvCarNightFare') {
      setSuvCarNightFare(event.target.value)
      selectedRowData.suvCarNightFare = event.target.value
    }
    if (event.target.id === 'miniCarFare') {
      setMiniCarFare(event.target.value)
      selectedRowData.miniCarFare = event.target.value
    }
    if (event.target.id === 'miniCarNightFare') {
      setMiniCarNightFare(event.target.value)
      selectedRowData.miniCarNightFare = event.target.value
    }
  }

  const onUpdateDetailsClick = async () => {
    if (window.confirm('Are you sure to update Ride Fare details!')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

      let formData = new FormData()
      formData.append('id', props.selectedRowData?._id)
      formData.append('state', state)
      formData.append('city', city)
      formData.append('bikeDayFare', bikeDayFare)
      formData.append('bikeNightFare', bikeNightFare)
      formData.append('autoNightFare', autoNightFare)
      formData.append('sedanCarFare', sedanCarFare)
      formData.append('sedanCarNightFare', sedanCarNightFare)
      formData.append('suvCarFare', suvCarFare)
      formData.append('suvCarNightFare', suvCarNightFare)
      formData.append('miniCarFare', miniCarFare)
      formData.append('miniCarNightFare', miniCarNightFare)

      let url = process.env.REACT_APP_URL + '/ride-fare-update'

      let response = await updateRideFaresData('PUT', url, formData)
      if (response != undefined && response.data) {
        setIsDisplayAlert(true)
        setAlertMessage(response.data.msg)
        setAlertcolor('success')
        setTimeout(() => {
          props.onRefresh()
          props.closePopup(false)
        }, 2000)
      } else if (response.hasOwnProperty('message')) {
        setIsDisplayAlert(true)
        setAlertMessage(response.message)
        setAlertcolor('warning')
      }
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  return (
    <div>
      <CForm>
        <NotificationAlert
          color={alertcolor}
          isDisplayAlert={isDisplayAlert}
          alertMessage={alertMessage}
        />
        <CRow className="mb-3">
          <CCol sm={6}>
            <CFormInput
              type="text"
              id="state"
              label="State"
              value={state}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="text"
              id="city"
              label="City"
              value={city}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="bikeDayFare"
              label="Bike Day Fare"
              value={bikeDayFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="bikeNightFare"
              label="Bike Night Fare"
              value={bikeNightFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="autoNightFare"
              label="Auto Night Fare"
              value={autoNightFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="sedanCarFare"
              label="Sedan Car Fare"
              value={sedanCarFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="sedanCarNightFare"
              label="Sedan Car Night Fare"
              value={sedanCarNightFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="suvCarFare"
              label="Suv Car Fare"
              value={suvCarFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="suvCarNightFare"
              label="suvCarNightFare"
              value={suvCarNightFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="miniCarFare"
              label="Mini CarFare"
              value={miniCarFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="miniCarNightFare"
              label="Mini Car Night Fare"
              value={miniCarNightFare}
              onChange={onRideFareChange}
            />
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
        <p id="onOkClick" style={{ display: 'none' }}>
          Ok
        </p>
        <p id="onCancleClick" style={{ display: 'none' }}>
          Cancle
        </p>
      </CForm>
    </div>
  )
}
RideFareDetailsEdit.propTypes = {
  selectedRowData: PropTypes.object,
  closePopup: PropTypes.func,
  onRefresh: PropTypes.func,
}

export default React.memo(RideFareDetailsEdit)
