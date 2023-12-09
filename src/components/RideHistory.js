import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { CForm, CCardHeader, CNavbar, CContainer } from '@coreui/react'
import { getRideHistoryData } from 'src/utils/calloutHelper'
import { DataTable, Pagination, NotificationAlert } from 'src/components'

/*const columns = [
  {
    key: 'sno',
    label: 'S.No.',
    _props: { scope: 'col' },
  },
  {
    key: 'ridePickUpAddress',
    label: 'Ride PickUp Address',
    _props: { scope: 'col' },
  },
  {
    key: 'rideDropUpAddress',
    label: 'Ride DropUp Address',
    _props: { scope: 'col' },
  },
  {
    key: 'rideCharges',
    label: 'Ride Charges',
    _props: { scope: 'col' },
  },
  {
    key: 'rideDistance',
    label: 'Ride Distance',
    _props: { scope: 'col' },
  },
]*/

const RideHistory = (props) => {
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertcolor, setAlertcolor] = useState('')
  const [rideHistoryData, setRideHistoryData] = useState()
  const [tempRideHistoryData, setTempRideHistoryData] = useState()
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(20)
  const [startIndex, setStartIndex] = useState(0)
  const [columns, setColumns] = useState()

  useEffect(() => {
    getRideHistoryDriver()
  }, [])

  const getRideHistoryDriver = async () => {
    try {
      let url = process.env.REACT_APP_URL
      if (props?.isDriverHistory) {
        url += '/ride-history-driver/' + props?.phoneNumber
        let columns = [
          {
            key: 'sno',
            label: 'S.No.',
            _props: { scope: 'col' },
          },
          {
            key: 'ridePickUpAddress',
            label: 'Ride PickUp Address',
            _props: { scope: 'col' },
          },
          {
            key: 'rideDropUpAddress',
            label: 'Ride DropUp Address',
            _props: { scope: 'col' },
          },
          {
            key: 'rideCharges',
            label: 'Ride Charges',
            _props: { scope: 'col' },
          },
          {
            key: 'rideDistance',
            label: 'Ride Distance',
            _props: { scope: 'col' },
          },
          {
            key: 'driverPhoneNumber',
            label: 'Driver Phone Number',
            _props: { scope: 'col' },
          },
        ]
        setColumns(columns)
        /*columns.push({
            key: 'driverPhoneNumber',
            label: 'Driver Phone Number',
            _props: { scope: 'col' },
          })*/
      }
      if (props?.isRiderHistory) {
        url += '/ride-history-rider/' + props?.phoneNumber
        let columns = [
          {
            key: 'sno',
            label: 'S.No.',
            _props: { scope: 'col' },
          },
          {
            key: 'ridePickUpAddress',
            label: 'Ride PickUp Address',
            _props: { scope: 'col' },
          },
          {
            key: 'rideDropUpAddress',
            label: 'Ride DropUp Address',
            _props: { scope: 'col' },
          },
          {
            key: 'rideCharges',
            label: 'Ride Charges',
            _props: { scope: 'col' },
          },
          {
            key: 'rideDistance',
            label: 'Ride Distance',
            _props: { scope: 'col' },
          },
          {
            key: 'riderPhoneNumber',
            label: 'Rider Phone Number',
            _props: { scope: 'col' },
          },
        ]
        setColumns(columns)
        /*
          columns.push({
            key: 'riderPhoneNumber',
            label: 'Rider Phone Number',
            _props: { scope: 'col' },
          } */
      }

      let response = await getRideHistoryData('GET', url)
      if (response !== undefined && response.hasOwnProperty('data')) {
        if (response.data.data) {
          setData(response.data.data)
        } else {
          setIsDisplayAlert(true)
          setAlertMessage(response.data.msg)
          setAlertcolor('warning')
        }
      } else if (response.hasOwnProperty('message')) {
        setIsDisplayAlert(true)
        setAlertMessage(response.message)
        setAlertcolor('warning')
      }
    } catch (error) {
      console.log('getRideHistoryDriver error :::====>>' + error)
      setIsDisplayAlert(true)
      setAlertMessage(error)
      setAlertcolor('warning')
    }
  }
  const setData = (records) => {
    let count = 1
    records.forEach((record) => {
      record.sno = count
      count++
    })
    setTotalPages(records.length / recordPerPage)
    setRideHistoryData(records.slice(0, 0 + recordPerPage))
    if (!tempRideHistoryData) {
      setTempRideHistoryData(records)
    }
  }

  const onNextButtonClick = (tempPageIndex, totalcount, tempCurrentPage) => {
    setStartIndex(tempPageIndex)
    setRideHistoryData(tempRideHistoryData.slice(tempPageIndex, totalcount))
    setCurrentPage(tempCurrentPage)
  }
  const onPreviousButtonClick = (tempPageIndex, totalcount, currentPage) => {
    setStartIndex(tempPageIndex)
    setRideHistoryData(tempRideHistoryData.slice(tempPageIndex, totalcount))
    setCurrentPage(currentPage)
  }

  return (
    <div className="card">
      <CCardHeader>
        <strong>Ride History Details</strong>
        <CNavbar expand="lg" colorScheme="light" className="bg-light">
          <CContainer fluid>
            <CForm className="d-flex"></CForm>
          </CContainer>
        </CNavbar>
        <CNavbar colorScheme="light" className="bg-light"></CNavbar>
      </CCardHeader>

      <NotificationAlert
        color={alertcolor}
        isDisplayAlert={isDisplayAlert}
        alertMessage={alertMessage}
      />

      <DataTable columns={columns} items={rideHistoryData} />
      <Pagination
        totalPages={totalPages}
        onNextButtonClick={onNextButtonClick}
        onPreviousButtonClick={onPreviousButtonClick}
        recordPerPage={recordPerPage}
        currentPage={currentPage}
        startIndex={startIndex}
      />
    </div>
  )
}
RideHistory.propTypes = {
  phoneNumber: PropTypes.string,
  isDriverHistory: PropTypes.bool,
  isRiderHistory: PropTypes.bool,
}

export default React.memo(RideHistory)
