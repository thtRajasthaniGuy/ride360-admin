import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'

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
  const [disableButton, setDisableButtonState] = useState(true)

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
  }
  const onAddRideareClick = () => {
    if (window.confirm('Are you sure to update Ride Fare details!')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'

      let formData = new FormData()
      //formData.append('id', props.selectedRowData?._id)
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

      const headers = {
        'Content-Type': 'multipart/form-data;',
      }

      axios
        .post('http://192.168.29.32:4000/api/v1/ride-fare-creation', formData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data)
          props.closePopup(false)
          props.onRefresh()
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
