import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { CForm, CCardHeader, CNavbar, CContainer } from '@coreui/react'
import { getRideHistoryData } from 'src/utils/calloutHelper'
import { DataTable, Pagination, NotificationAlert } from 'src/components'


const columns = [
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

const RideHistory = (props) => {
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertcolor, setAlertcolor] = useState('')
  const [rideHistoryData, setRideHistoryData] = useState('')
  const [tempRideHistoryData, setTempRideHistoryData] = useState()
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(2)
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    getRideHistoryDriver()
  }, [])

  const getRideHistoryDriver = async () => {
    try {
      let url = process.env.REACT_APP_URL + '/ride-history-driver/1111111100'
      let response = await getRideHistoryData('GET', url)
      console.log('getRideHistoryDriver>>>' + JSON.stringify(response))
      if (response !== undefined) {
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
}

export default React.memo(RideHistory)
