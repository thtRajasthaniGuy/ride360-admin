import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'

const EditViewCoupon = (props) => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [couponName, setCouponName] = useState(props.selectedRowData.name)
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(
    props.selectedRowData.discountPercentage,
  )
  const [couponExpireyDate, setCouponExpireyDate] = useState(props.selectedRowData.expireyDate)

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

  const onSaveCouponClick = () => {}

  const onDeleteCouponClick = () => {
    /*var details = {
      name: couponName,
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')*/

   /* const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    }
    let url = 'http://192.168.43.32:4000/api/v1/coupon'
    axios
      .delete(
        url,
        JSON.stringify({
          name: 'amit',
        }),
        {
          headers: headers,
        },
      )
      .then((response) => {
        console.log(response.data)
        //props.closePopup(false)
        //props.onRefresh()
      })*/
  }

  return (
    <div>
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
            onClick={() => onSaveCouponClick()}
            disabled={disableButton}
          >
            Save Coupon
          </CButton>
        </div>
        <div className="text-center">
          <CButton
            color="primary"
            variant="outline"
            className="me-3"
            onClick={() => onDeleteCouponClick()}
            //disabled={disableButton}
          >
            Delete Coupon
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
EditViewCoupon.propTypes = {
  selectedRowData: PropTypes.object,
  closePopup: PropTypes.func,
  onRefresh: PropTypes.func,
}

export default React.memo(EditViewCoupon)
