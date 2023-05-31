import React, { useState, useEffect } from 'react'
import { CCardHeader, CNavbar, CContainer, CNavbarBrand } from '@coreui/react'
import { CForm, CFormInput, CButton, CFormSelect, CCol } from '@coreui/react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CRow, CFormLabel } from '@coreui/react'
import axios from 'axios'
import { DataTable } from 'src/components'
import { Pagination } from 'src/components'
import { getRidersData } from 'src/utils/calloutHelper'

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
    key: 'email',
    label: 'Email',
    _props: { scope: 'col' },
  },
  {
    key: 'phoneNumber',
    label: 'Mobile',
    _props: { scope: 'col' },
  },
  {
    key: 'status',
    label: 'Status',
    _props: { scope: 'col' },
  },
  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
]

const Rider = () => {
  const [disableButton, setDisableButtonState] = useState(true)
  const [nameSearch, setNameSearch] = useState('')
  const [emailSearch, setEmailSearch] = useState('')
  const [phoneSearch, setPhoneSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(2)
  const [startIndex, setStartIndex] = useState(0)
  const [ridersData, setRidersData] = useState()
  const [tempRidersData, setTempRidersData] = useState()
  const [totalPages, setTotalPages] = useState()
  const [openEditDetailsPopup, setOpenEditDetailsPopup] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    getRiders()
  }, [])

  const getRiders = async () => {
    let url = 'http://localhost:4000/api/v1/admin-rider-list'
    let response = await getRidersData('GET', url)
    if (response !== undefined && response.status) {
      setData(response.data)
    }
  }

  const getColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return ''
    }
  }

  const setData = (records) => {
    let count = 1
    records.forEach((record) => {
      record.sno = count
      record.status = 'Pending'
      const colorTemp = getColor(record.status)
      record._props = { color: colorTemp }
      record.action = (
        <CButton
          type="submit"
          className="me-2"
          color="primary"
          variant="outline"
          onClick={() => onEditViewClick(record)}
        >
          Edit
        </CButton>
      )
      count++
    })
    setTotalPages(records.length / recordPerPage)
    setRidersData(records.slice(0, 0 + recordPerPage))
    setTempRidersData(records)
  }
  const onEditViewClick = (obj) => {
    console.log('onEditViewClick index' + JSON.stringify(obj))
    setOpenEditDetailsPopup(true)
    setSelectedRowData(obj)
    setSelectValue(obj.status)
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
    console.log('nameSearch>>' + nameSearch)
    console.log('emailSearch>>' + emailSearch)
    console.log('phoneSearch>>' + phoneSearch)
    setDisableButtonState(false)
  }
  const onSearchClick = () => {

    setStartIndex(0)
    setCurrentPage(1)
    setTotalPages(0)
    let name = nameSearch ? nameSearch : 'null'
    let email = emailSearch ? emailSearch : 'null'
    let phone = phoneSearch ? phoneSearch : 'null'
    let url = 'http://localhost:4000/api/v1/admin-rider-filter-list/'+ name + '/' + email + '/' + phone
    axios.get(url)
    .then((response) => {
      console.log(response.data)
      console.log(response.status)
      if(response.status){        
        console.log(response.data.data)
        setData(response.data.data)
      }
    })

  }
  const onResetClick = () => {
    setNameSearch('')
    setEmailSearch('')
    setPhoneSearch('')
    setDisableButtonState(true)
    getRiders()
  }
  const onStatusChange = (event) => {
    console.log(event.target.value)
    setDisableButtonState(false)
    setSelectValue(event.target.value)
  }
  const onUpdateDetailsClick = () => {
    console.log('onUpdateDetailsClick' + JSON.stringify(selectedRowData))
    console.log('selectValue' + selectValue)
    setOpenEditDetailsPopup(false)
    if (window.confirm('Are you sure to update Vehicle details !')) {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
      selectedRowData.status = selectValue
      setSelectedRowData(selectedRowData)

      let tempData = tempRidersData
      tempData.forEach((record) => {
        if (record._id === selectedRowData._id) {
          record.status = selectValue
          const colorTemp = getColor(record.status)
          record._props = { color: colorTemp }
        }
      })
      setRidersData(tempData.slice(startIndex, startIndex + recordPerPage))
    } else {
      document.getElementById('onOkClick').style.display = 'none'
      document.getElementById('onCancleClick').style.display = 'none'
    }
  }

  const onNextButtonClick = (tempPageIndex, totalcount, tempCurrentPage) => {
    setStartIndex(tempPageIndex)
    setRidersData(tempRidersData.slice(tempPageIndex, totalcount))
    setCurrentPage(tempCurrentPage)
  }
  const onPreviousButtonClick = (tempPageIndex, totalcount, currentPage) => {
    setStartIndex(tempPageIndex)
    setRidersData(tempRidersData.slice(tempPageIndex, totalcount))
    setCurrentPage(currentPage)
  }

  return (
    <div className="card">
      <CModal
        size="lg"
        visible={openEditDetailsPopup}
        onClose={() => setOpenEditDetailsPopup(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit Driver Basic Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="text-center">
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="Name" value={selectedRowData?.name} disabled />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="Name" value={selectedRowData?.email} disabled />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Phone
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="Name" value={selectedRowData?.phoneNumber} disabled />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Status
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect
                    aria-label="Default select example"
                    options={[
                      '--select--',
                      { label: 'Active', value: 'Active' },
                      { label: 'Inactive', value: 'Inactive' },
                      { label: 'Pending', value: 'Pending' },
                      { label: 'Banned', value: 'Banned' },
                    ]}
                    onChange={onStatusChange}
                    value={selectValue}
                  />
                </CCol>
              </CRow>
              <div className="text-center">
                <CButton
                  color="primary"
                  variant="outline"
                  className="me-3"
                  onClick={() => onUpdateDetailsClick()}
                  disabled={disableButton}
                >
                  Update Details
                </CButton>
              </div>
            </CForm>
          </div>
        </CModalBody>
      </CModal>
      <CCardHeader>
        <strong>Users</strong>
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
      <DataTable columns={columns} items={ridersData} />

      <Pagination
        totalPages={totalPages}
        onNextButtonClick={onNextButtonClick}
        onPreviousButtonClick={onPreviousButtonClick}
        recordPerPage={recordPerPage}
        currentPage={currentPage}
        startIndex={startIndex}
      />

      <p id="onOkClick" style={{ display: 'none' }}>
        Ok
      </p>
      <p id="onCancleClick" style={{ display: 'none' }}>
        Cancle
      </p>
    </div>
  )
}

export default Rider
