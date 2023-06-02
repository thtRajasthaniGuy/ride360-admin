import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { CForm, CRow, CFormLabel, CCol, CToast, CToastBody, CToastClose } from '@coreui/react'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { CFormInput } from '@coreui/react'
import { getDriverLicenseData, getDriverVehicleData } from 'src/utils/calloutHelper'
import { DriverDetailsEdit, DriverVehicleEdit, DriverLicenseEdit } from 'src/components'

const DriverApprove = (props) => {
  const [driverLicenseData, setDriverLicenseData] = useState()
  const [driverVehicleData, setDriverVehicleData] = useState()

  useEffect(() => {
    getDriverLicenseDetails()
    getDriverVehicleDetails()
  }, [])

  const getDriverLicenseDetails = async () => {
    var url =
      'http://localhost:4000/api/v1/admin-driver-license-list/' + props.selectedRowData.phoneNumber
    let response = await getDriverLicenseData('GET', url)
    if (response !== undefined && response.status) {
      setDriverLicenseDetails(response.data.data[0])
    }
  }

  const getDriverVehicleDetails = async () => {
    var url =
      'http://localhost:4000/api/v1/admin-driver-vehicle-list/' + props.selectedRowData.phoneNumber
    let response = await getDriverVehicleData('GET', url)
    if (response !== undefined && response.status) {
      setDriverVehicleDetails(response.data.data[0])
    }
  }

  const setDriverLicenseDetails = (record) => {
    setDriverLicenseData(record)
  }

  const setDriverVehicleDetails = (record) => {
    setDriverVehicleData(record)
  }

  return (
    <div>
      <CRow>
        <CCard>
          <CCardBody>
            <CCardTitle>
              <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                Driver Information
              </div>
            </CCardTitle>
            <DriverDetailsEdit
              selectedRowData={props.selectedRowData}
              closePopup={props.closePopup}
              onRefresh={props.onRefresh}
              isAccountApprove={true}
            />
          </CCardBody>
        </CCard>
      </CRow>

      {!driverLicenseData || !driverVehicleData ? (
        <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
          <CToast
            autohide={false}
            visible={true}
            color="warning"
            className="text-white align-items-center"
          >
            <div className="d-flex ">
              <CToastBody>
                Hello, Admin! Driver License or Driver Vehicle Data is not populate..
              </CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        </div>
      ) : (
        <div>
          <CRow>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                    License Information
                  </div>
                </CCardTitle>

                <DriverLicenseEdit
                  driverId={props.selectedRowData?.phoneNumber}
                  isAccountApprove={true}
                  //closePopup={setEditLicensePopup}
                />
              </CCardBody>
            </CCard>
          </CRow>

          <CRow>
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                    Vehicle Information
                  </div>
                </CCardTitle>
                <DriverVehicleEdit
                  driverId={props.selectedRowData?.phoneNumber}
                  isAccountApprove={true}
                  //closePopup={setEditVehiclePopup}
                />
              </CCardBody>
            </CCard>
          </CRow>
        </div>
      )}
    </div>
  )
}
DriverApprove.propTypes = {
  selectedRowData: PropTypes.object,
  closePopup: PropTypes.func,
  onRefresh: PropTypes.func,
}

export default React.memo(DriverApprove)
