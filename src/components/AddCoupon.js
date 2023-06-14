import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'
import { addNewCoupon } from 'src/utils/calloutHelper'
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import { NotificationAlert } from 'src/components'

const AddCoupon = (props) => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [couponName, setCouponName] = useState('')
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState('')
  const [couponExpireyDate, setCouponExpireyDate] = useState('')
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertcolor, setAlertcolor] = useState('')

  const onCouponDetailsChange = (event) => {
    setDisableButtonState(false)
    if (event.target.id === 'name') {
      setCouponName(event.target.value)
    }
    if (event.target.id === 'discountPercentage') {
      setCouponDiscountPercentage(event.target.value)
    }
    if (event.target.id === 'expireyDate') {
      setCouponExpireyDate(event.target.value)
    }
  }

  const onAddCouponClick = async () => {
    let payload = {
      name: couponName,
      expireyDate: couponExpireyDate,
      discountPercentage: couponDiscountPercentage,
    }
    let url = process.env.REACT_APP_URL + '/coupon'
    const response = await addNewCoupon('post', url, payload)
    if (response !== undefined && response.data) {
      console.log(JSON.stringify(response))
      setIsDisplayAlert(true)
      setAlertMessage(response.data.msg)
      setAlertcolor('success')
      setTimeout(() => {
        props.closePopup(false)
        props.onRefresh()
      }, 2000)
    } else if (response.message) {
      setIsDisplayAlert(true)
      setAlertMessage(response.message)
      setAlertcolor('warning')
    }
  }

  return (
    <div>
      <NotificationAlert
        color={alertcolor}
        isDisplayAlert={isDisplayAlert}
        alertMessage={alertMessage}
      />

      <CForm>
        <CRow className="mb-3">
          <CCol sm={6}>
            <CFormInput
              type="text"
              id="name"
              label="Name"
              value={couponName}
              onChange={onCouponDetailsChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="discountPercentage"
              label="Discount Percentage"
              value={couponDiscountPercentage}
              onChange={onCouponDetailsChange}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="date"
              id="expireyDate"
              label="Expirey Date"
              value={couponExpireyDate}
              onChange={onCouponDetailsChange}
            />
          </CCol>
        </CRow>
        <div className="text-center">
          <CButton
            color="primary"
            variant="outline"
            className="me-3"
            onClick={() => onAddCouponClick()}
            disabled={disableButton}
          >
            Add Coupon
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
AddCoupon.propTypes = {
  selectedRowData: PropTypes.object,
  closePopup: PropTypes.func,
  onRefresh: PropTypes.func,
}

export default React.memo(AddCoupon)
