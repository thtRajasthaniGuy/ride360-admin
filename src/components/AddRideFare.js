import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'
import { addRideFare } from 'src/utils/calloutHelper'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const AddRideFare = (props) => {
  const [state, setState] = useState()
  const [city, setCity] = useState()
  const [bikeDayFare, setBikeDayFare] = useState()
  const [bikeNightFare, setBikeNightFare] = useState()
  const [autoNightFare, setAutoNightFare] = useState()
  const [sedanCarFare, setSedanCarFare] = useState()
  const [sedanCarNightFare, setSedanCarNightFare] = useState()
  const [suvCarFare, setSuvCarFare] = useState()
  const [suvCarNightFare, setSuvCarNightFare] = useState()
  const [miniCarFare, setMiniCarFare] = useState()
  const [miniCarNightFare, setMiniCarNightFare] = useState()

  const [autoDayFare, setAutoDayFare] = useState(props.selectedRowData?.autoDayFare)
  const [airpotSurcharge, setAirpotSurcharge] = useState(props.selectedRowData?.airpotSurcharge)
  const [serviceTax, setServiceTax] = useState(props.selectedRowData?.serviceTax)
  const [baseFareKm, setBaseFareKm] = useState(props.selectedRowData?.baseFareKm)
  const [autoBaseFare, setAutoBaseFare] = useState(props.selectedRowData?.autoBaseFare)
  const [bikeBaseFare, setBikeBaseFare] = useState(props.selectedRowData?.bikeBaseFare)
  const [miniBaseFare, setMiniBaseFare] = useState(props.selectedRowData?.miniBaseFare)
  const [sedanBaseFare, setSedanBaseFare] = useState(props.selectedRowData?.sedanBaseFare)
  const [suvBaseFare, setSuvBaseFare] = useState(props.selectedRowData?.suvBaseFare)

  const [disableButton, setDisableButtonState] = useState(true)
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onRideFareChange = (event) => {
    setDisableButtonState(false)
    if (event.target.id === 'state') {
      setState(event.target.value)
    }
    if (event.target.id === 'city') {
      setCity(event.target.value)
    }
    if (event.target.id === 'bikeDayFare') {
      setBikeDayFare(event.target.value)
    }
    if (event.target.id === 'bikeNightFare') {
      setBikeNightFare(event.target.value)
    }
    if (event.target.id === 'autoNightFare') {
      setAutoNightFare(event.target.value)
    }
    if (event.target.id === 'sedanCarFare') {
      setSedanCarFare(event.target.value)
    }
    if (event.target.id === 'sedanCarNightFare') {
      setSedanCarNightFare(event.target.value)
    }
    if (event.target.id === 'suvCarFare') {
      setSuvCarFare(event.target.value)
    }
    if (event.target.id === 'suvCarNightFare') {
      setSuvCarNightFare(event.target.value)
    }
    if (event.target.id === 'miniCarFare') {
      setMiniCarFare(event.target.value)
    }
    if (event.target.id === 'miniCarNightFare') {
      setMiniCarNightFare(event.target.value)
    }

    if (event.target.id === 'autoDayFare') {
      setAutoDayFare(event.target.value)
    }
    if (event.target.id === 'airpotSurcharge') {
      setAirpotSurcharge(event.target.value)
    }
    if (event.target.id === 'serviceTax') {
      setServiceTax(event.target.value)
    }
    if (event.target.id === 'baseFareKm') {
      setBaseFareKm(event.target.value)
    }
    if (event.target.id === 'autoBaseFare') {
      setAutoBaseFare(event.target.value)
    }
    if (event.target.id === 'bikeBaseFare') {
      setBikeBaseFare(event.target.value)
    }
    if (event.target.id === 'miniBaseFare') {
      setMiniBaseFare(event.target.value)
    }
    if (event.target.id === 'sedanBaseFare') {
      setSedanBaseFare(event.target.value)
    }
    if (event.target.id === 'suvBaseFare') {
      setSuvBaseFare(event.target.value)
    }
  }
  const onAddRideareClick = async () => {
    if (window.confirm('Are you sure to update Ride Fare details!')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

      let formData = new FormData()
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

      formData.append('autoDayFare', autoDayFare)
      formData.append('airpotSurcharge', airpotSurcharge)
      formData.append('serviceTax', serviceTax)
      formData.append('baseFareKm', baseFareKm)
      formData.append('autoBaseFare', autoBaseFare)
      formData.append('bikeBaseFare', bikeBaseFare)
      formData.append('miniBaseFare', miniBaseFare)
      formData.append('sedanBaseFare', sedanBaseFare)
      formData.append('suvBaseFare', suvBaseFare)


      let url = process.env.REACT_APP_URL + '/ride-fare-creation'
      let response = await addRideFare('POST', url, formData)
      if (response !== undefined && response.data) {
        setIsDisplayAlert(true)
        setAlertMessage(response.data.msg)
        setTimeout(() => {
          props.closePopup(false)
          props.onRefresh()
        }, 2000)
      } else if (response.hasOwnProperty('message')) {
        setIsDisplayAlert(true)
        setAlertMessage(response.message)
      }
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  return (
    <div>
      <CToast
        color="success"
        autohide={false}
        visible={isDisplayAlert}
        className="align-items-center"
        onClose={() => setIsDisplayAlert(false)}
      >
        <div className="d-flex">
          <CToastBody>Hello, Admin! {alertMessage}.</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>

      <CForm>
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
              id="autoDayFare"
              label="Auto Day Fare"
              value={autoDayFare}
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
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="airpotSurcharge"
              label="Airpot Surcharge"
              value={airpotSurcharge}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="serviceTax"
              label="Service Tax"
              value={serviceTax}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="baseFareKm"
              label="Base Fare Km"
              value={baseFareKm}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="autoBaseFare"
              label="Auto Base Fare"
              value={autoBaseFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="bikeBaseFare"
              label="Bike Base Fare"
              value={bikeBaseFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="miniBaseFare"
              label="Mini Base Fare"
              value={miniBaseFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="sedanBaseFare"
              label="Sedan Base Fare"
              value={sedanBaseFare}
              onChange={onRideFareChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="suvBaseFare"
              label="Suv Base Fare"
              value={suvBaseFare}
              onChange={onRideFareChange}
            />
          </CCol>
        </CRow>
        <div className="text-center">
          <CButton
            color="primary"
            variant="outline"
            className="me-3"
            onClick={() => onAddRideareClick()}
            disabled={disableButton}
          >
            Add Ride Fare
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

AddRideFare.propTypes = {
  closePopup: PropTypes.func,
  onRefresh: PropTypes.func,
}

export default React.memo(AddRideFare)
