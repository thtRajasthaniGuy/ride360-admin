import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataTable } from 'src/components'
import { DriverDetailsEdit } from 'src/components'
import { DriverVehicleEdit } from 'src/components'
import { DriverLicenseEdit } from 'src/components'
import { Pagination } from 'src/components'
import { CCardHeader, CNavbar, CContainer, CNavbarBrand, CModalTitle } from '@coreui/react'
import { CForm, CFormInput, CButton, CFormSelect, CModal, CModalHeader } from '@coreui/react'
import { CModalBody, CModalFooter } from '@coreui/react'
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
    key: 'action',
    label: 'Action',
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
  const [refreshCmpData, setRefreshData] = useState(false)

  useEffect(() => {
    getDrivers()
  }, [refreshCmpData])

  const getDrivers = async () => {
    let name = nameSearch ? nameSearch : 'null'
    let email = emailSearch ? emailSearch : 'null'
    let phone = phoneSearch ? phoneSearch : 'null'
    let url =
      'http://localhost:4000/api/v1/admin-driver-filter-List/' + name + '/' + email + '/' + phone

      console.log('url>>' +url)
    let response = await getDriversData('GET', url)
    if (response !== undefined && response.status) {
      setData(response.data.data)
    }
  }

  const setData = (records) => {
    let count = 1
    records.forEach((record) => {
      record.sno = count
      record.dob = record.dob.split('T')[0]
      record._props = { color: getColor(record.accountStatus) }
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

  const refreshData = (updatedDriversData) => {
    setRefreshData(true)
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
    setStartIndex(0)
    setCurrentPage(1)
    setTotalPages(0)
    getDrivers()
   // getDriversData()
  }
  const onResetClick = () => {
    console.log('onResetClick')
    setNameSearch('')
    setEmailSearch('')
    setPhoneSearch('')
    setDisableButton(true)
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
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}
export default Driver
