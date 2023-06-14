import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const NotificationAlert = (props) => {
  return (
    <div>
      <CToast
        color={props.color}
        autohide={false}
        visible={props.isDisplayAlert}
        className="align-items-center"
      >
        <div className="d-flex">
          <CToastBody>Hello, Admin! {props.alertMessage}.</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    </div>
  )
}
NotificationAlert.propTypes = {
  color: PropTypes.string,
  alertMessage: PropTypes.string,
  isDisplayAlert: PropTypes.bool,
}

export default React.memo(NotificationAlert)
