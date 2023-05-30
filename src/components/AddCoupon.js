import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'
import { addNewCoupon } from 'src/utils/calloutHelper'

const AddCoupon = (props) => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [couponName, setCouponName] = useState('')
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState('')
  const [couponExpireyDate, setCouponExpireyDate] = useState('')

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
    let details = {
      name: 'couponName',
      expireyDate: couponExpireyDate,
      discountPercentage: 20,
    }

    let url = 'http://192.168.29.32:4000/api/v1/coupon'

    const usersName = details;

    /*config.headers.ContentType =
      'application/x-www-form-urlencoded;charset=utf-8';*/


      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    const result = await axios.post(url,config,  usersName);
    console.log(result)


    

    //let response = await addNewCoupon('POST', url, JSON.stringify(details))
    //console.log(response)

    /* const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    //"Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    }

    
    
    let url = 'http://192.168.43.32:4000/api/v1/coupon'
    axios
    .post(url, details, {
      headers: headers,
    })
    .then((response) => {
      console.log(response)
      props.closePopup(false)
      props.onRefresh()
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
