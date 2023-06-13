import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { CForm, CRow, CCol, CFormInput, CButton } from '@coreui/react'
import { deleteCoupon } from 'src/utils/calloutHelper'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const EditViewCoupon = (props) => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [couponName, setCouponName] = useState(props.selectedRowData.name)
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(
    props.selectedRowData.discountPercentage,
  )
  const [couponExpireyDate, setCouponExpireyDate] = useState(props.selectedRowData.expireyDate)
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onDeleteCouponClick = async () => {
    let payload = {
      name: couponName,
    }
    let url = process.env.REACT_APP_URL + '/coupon'
    const response = await deleteCoupon('delete', url, payload)
    if (response !== undefined && response.status) {
      setIsDisplayAlert(true)
      setAlertMessage(response.data.msg)
      setTimeout(() => {
        props.closePopup(false)
        props.onRefresh()
      }, 2000)
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
            <CFormInput type="text" id="name" label="Name" value={couponName} />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="number"
              id="discountPercentage"
              label="Discount Percentage"
              value={couponDiscountPercentage}
            />
          </CCol>
          <CCol sm={6}>
            <CFormInput
              type="date"
              id="expireyDate"
              label="Expirey Date"
              value={couponExpireyDate}
            />
          </CCol>
        </CRow>
        <div className="text-center">
          <CButton
            color="primary"
            variant="outline"
            className="me-3"
            onClick={() => onDeleteCouponClick()}
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
