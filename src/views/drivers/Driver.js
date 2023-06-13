import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataTable } from 'src/components'
import { DriverDetailsEdit } from 'src/components'
import { DriverVehicleEdit } from 'src/components'
import { DriverLicenseEdit } from 'src/components'
import { DriverApprove } from 'src/components'
import { Pagination } from 'src/components'
import { CCardHeader, CNavbar, CContainer, CNavbarBrand, CModalTitle } from '@coreui/react'
import { CForm, CFormInput, CButton, CFormSelect, CModal, CModalHeader } from '@coreui/react'
import { CModalBody, CModalFooter, CToast, CToastBody, CToastClose } from '@coreui/react'
import { getDriversData } from 'src/utils/calloutHelper'

const columns = [
  {
    key: 'sno',
    label: 'S.No.',
    _props: { scope: 'col' },
  },
  {
    key: 'name',
    label: 'Name',
    _props: { scope: 'col' },
  },
  {
    key: 'phoneNumber',
    label: 'Phone',
    _props: { scope: 'col' },
  },
  {
    key: 'email',
    label: 'Email',
    _props: { scope: 'col' },
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    _props: { scope: 'col' },
  },
  {
    key: 'totalkilometer',
    label: 'Total kilometer',
    _props: { scope: 'col' },
  },
  {
    key: 'rating',
    label: 'Rating',
    _props: { scope: 'col' },
  },
  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
  {
    key: 'profileApprove',
    label: 'Profile Approve',
    _props: { scope: 'col' },
  },
]

const Driver = () => {
  const [driversData, setDriversData] = useState()
  const [tempDriversData, setTempDriversData] = useState()
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(2)
  const [startIndex, setStartIndex] = useState(0)
  const [selectedRowData, setSelectedRowData] = useState()
  const [disableButton, setDisableButton] = useState(true)
  const [openActionPopup, setActionPopup] = useState(false)
  const [nameSearch, setNameSearch] = useState('')
  const [emailSearch, setEmailSearch] = useState('')
  const [phoneSearch, setPhoneSearch] = useState('')
  const [openEditDetailsPopup, setEditDetailsPopup] = useState(false)
  const [openEditLicensePopup, setEditLicensePopup] = useState(false)
  const [openEditVehiclePopup, setEditVehiclePopup] = useState(false)
  const [openDriverApprovePopup, setOpenDriverApprovePopup] = useState(false)
  const [refreshCmpData, setRefreshData] = useState(false)
  const [notFoundData, setNotFoundData] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    console.log('process.env.REACT_APP_URL' + process.env.REACT_APP_URL)
    getDrivers()
  }, [refreshCmpData])

  const getDrivers = async () => {
    try {
      let name = nameSearch ? nameSearch : 'null'
      let email = emailSearch ? emailSearch : 'null'
      let phone = phoneSearch ? phoneSearch : 'null'
      let url =
        process.env.REACT_APP_URL + '/admin-driver-filter-List/' + name + '/' + phone + '/' + email
      let response = await getDriversData('GET', url)
      console.log(JSON.stringify(response))
      if (response !== undefined && response.status === 200) {
        if (response.data.data) {
          setData(response.data.data)
        } else {
          setNotFoundData(true)
          setAlertMessage(response.data.msg)
        }
      }else if (response.hasOwnProperty('message')) {
        setNotFoundData(true)
        setAlertMessage(response.message)
      }
    } catch (error) {
      console.log('getDrivers error :::====>>' + error)
      setDriversData('')
      setNotFoundData(true)
      setAlertMessage(error)
    }
  }

  const setData = (records) => {
    let count = 1
    records.forEach((record) => {
      record.sno = count
      record.dob = record.dob.split('T')[0]
      record._props = { color: getColor(record.accountStatus) }
      record.profileApprove = (
        <CButton
          type="submit"
          className="btn btn-outline-success"
          color="primary"
          variant="outline"
          //disabled={record.accountStatus !== 'pending'? true : false}
          onClick={() => onDriverApproveClick(record)}
        >
          Profile Approve
        </CButton>
      )
      record.action = (
        <CButton
          type="submit"
          className="me-2"
          color="primary"
          variant="outline"
          onClick={() => onEditViewClick(record)}
        >
          Edit/View
        </CButton>
      )
      count++
    })
    setTotalPages(records.length / recordPerPage)
    setDriversData(records.slice(0, 0 + recordPerPage))
    if (!tempDriversData) {
      setTempDriversData(records)
    }
  }

  const getColor = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'secondary'
      case 'pending':
        return 'warning'
      case 'banned':
        return 'danger'
      default:
        return ''
    }
  }

  const refreshData = () => {
    setRefreshData(!refreshCmpData)
  }
  const onDriverApproveClick = (obj) => {
    setOpenDriverApprovePopup(true)
    setSelectedRowData(obj)
  }

  const onEditViewClick = (obj) => {
    console.log('onEditViewClick obj ::::===>>' + obj)
    setActionPopup(true)
    setSelectedRowData(obj)
    setNameSearch('')
    setEmailSearch('')
    setPhoneSearch('')
  }
  const onNextButtonClick = (tempPageIndex, totalcount, tempCurrentPage) => {
    setStartIndex(tempPageIndex)
    setDriversData(tempDriversData.slice(tempPageIndex, totalcount))
    setCurrentPage(tempCurrentPage)
  }
  const onPreviousButtonClick = (tempPageIndex, totalcount, currentPage) => {
    setStartIndex(tempPageIndex)
    setDriversData(tempDriversData.slice(tempPageIndex, totalcount))
    setCurrentPage(currentPage)
  }
  const onSearchChange = (event) => {
    if (event.target.id === 'nameInput') {
      setNameSearch(event.target.value)
    }
    if (event.target.id === 'emailInput') {
      setEmailSearch(event.target.value)
    }
    if (event.target.id === 'phoneInput') {
      setPhoneSearch(event.target.value)
    }
    setDisableButton(false)
  }
  const onSearchClick = () => {
    setNotFoundData(false)
    setStartIndex(0)
    setCurrentPage(1)
    setTotalPages(0)
    getDrivers()
  }
  const onResetClick = () => {
    console.log('onResetClick')
    setNameSearch('')
    setEmailSearch('')
    setPhoneSearch('')
    setDisableButton(true)
    setNotFoundData(false)
    setCurrentPage(1)
    setTotalPages(tempDriversData.length / recordPerPage)
    setDriversData(tempDriversData.slice(0, 0 + recordPerPage))
  }

  const onEditDetailsClick = () => {
    setActionPopup(false)
    setEditDetailsPopup(true)
    setDisableButton(true)
  }
  const onEditLicenseClick = () => {
    setActionPopup(false)
    setEditLicensePopup(true)
    setDisableButton(true)
  }
  const onEditVehicleClick = () => {
    setActionPopup(false)
    setEditVehiclePopup(true)
    setDisableButton(true)
  }

  return (
    <div className="card">
      <CCardHeader>
        <strong>Drivers</strong>
        <CNavbar expand="lg" colorScheme="light" className="bg-light">
          <CContainer fluid>
            <CForm className="d-flex">
              <CNavbarBrand>Search :</CNavbarBrand>
              <CFormSelect
                className="me-1"
                aria-label="Default select example"
                options={['All', { label: 'One', value: '1' }, { label: 'Two', value: '2' }]}
              />
              <CFormInput
                id="nameInput"
                type="text"
                className="me-1"
                placeholder="Name"
                value={nameSearch}
                onChange={onSearchChange}
              />
              <CFormInput
                id="emailInput"
                type="Email"
                className="me-1"
                placeholder="Email"
                value={emailSearch}
                onChange={onSearchChange}
              />
              <CFormInput
                id="phoneInput"
                type="Phone"
                className="me-1"
                placeholder="Phone"
                value={phoneSearch}
                onChange={onSearchChange}
              />
              <CButton
                type="submit"
                className="me-1"
                color="primary"
                variant="outline"
                disabled={disableButton}
                onClick={() => onSearchClick()}
              >
                Search
              </CButton>
              <CButton
                type="submit"
                className="me-1"
                color="primary"
                variant="outline"
                disabled={disableButton}
                onClick={() => onResetClick()}
              >
                Reset
              </CButton>
            </CForm>
          </CContainer>
        </CNavbar>
        <CNavbar colorScheme="light" className="bg-light"></CNavbar>
      </CCardHeader>

      <CToast
        color="warning"
        autohide={false}
        visible={notFoundData}
        className="align-items-center"
        onClose={() => setNotFoundData(false)}
      >
        <div className="d-flex">
          <CToastBody>Hello, Admin! {alertMessage}.</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>

      <DataTable columns={columns} items={driversData} />
      <Pagination
        totalPages={totalPages}
        onNextButtonClick={onNextButtonClick}
        onPreviousButtonClick={onPreviousButtonClick}
        recordPerPage={recordPerPage}
        currentPage={currentPage}
        startIndex={startIndex}
      />

      <CModal size="lg" visible={openActionPopup} onClose={() => setActionPopup(false)}>
        <CModalHeader>
          <CModalTitle>Edit Driver Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="text-center">
            <CButton
              size="lg"
              color="primary"
              variant="outline"
              className="me-4"
              onClick={() => onEditDetailsClick()}
            >
              Edit Details
            </CButton>
            <CButton
              size="lg"
              color="primary"
              variant="outline"
              className="me-4"
              onClick={() => onEditLicenseClick()}
            >
              Edit License
            </CButton>
            <CButton
              size="lg"
              color="primary"
              variant="outline"
              className="me-4"
              onClick={() => onEditVehicleClick()}
            >
              Edit Vehicle
            </CButton>
          </div>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      <CModal size="lg" visible={openEditDetailsPopup} onClose={() => setEditDetailsPopup(false)}>
        <CModalHeader>
          <CModalTitle>Edit Driver Basic Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DriverDetailsEdit
            selectedRowData={selectedRowData}
            closePopup={setEditDetailsPopup}
            onRefresh={refreshData}
            isAccountApprove={false}
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      <CModal size="lg" visible={openEditLicensePopup} onClose={() => setEditLicensePopup(false)}>
        <CModalHeader>
          <CModalTitle>Edit Driver License Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DriverLicenseEdit
            driverId={selectedRowData?.phoneNumber}
            closePopup={setEditLicensePopup}
            isAccountApprove={false}
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      <CModal size="lg" visible={openEditVehiclePopup} onClose={() => setEditVehiclePopup(false)}>
        <CModalHeader>
          <CModalTitle>Edit Driver Vehicle Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DriverVehicleEdit
            driverId={selectedRowData?.phoneNumber}
            closePopup={setEditVehiclePopup}
            isAccountApprove={false}
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        size="lg"
        visible={openDriverApprovePopup}
        onClose={() => setOpenDriverApprovePopup(false)}
      >
        <CModalHeader>
          <CModalTitle>Driver Approve</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DriverApprove
            selectedRowData={selectedRowData}
            closePopup={setOpenDriverApprovePopup}
            onRefresh={refreshData}
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}
export default Driver
