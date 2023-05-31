import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AddCoupon, EditViewCoupon, Pagination, DataTable } from 'src/components'
import { CButton, CForm, CNavbarBrand } from '@coreui/react'
import { CFormInput, CCardHeader, CNavbar, CContainer, CFormSelect } from '@coreui/react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import { getCouponsData } from 'src/utils/calloutHelper'

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
    key: 'discountPercentage',
    label: 'Discount Percentage',
    _props: { scope: 'col' },
  },
  {
    key: 'expireyDate',
    label: 'Expirey Date',
    _props: { scope: 'col' },
  },
  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
]
const Coupon = () => {
  const [couponData, setCouponData] = useState()
  const [selectedCouponData, setSelectedCouponData] = useState()
  const [tempCouponData, setTempCouponData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [recordPerPage, setRecordPerPage] = useState(5)
  const [startIndex, setStartIndex] = useState(0)
  const [openAddCouponPopup, setOpenAddCouponPopup] = useState(false)
  const [openEditViewCouponPopup, setOpenEditViewCouponPopup] = useState(false)
  const [refreshCouponData, setRefreshCouponData] = useState(false)

  const refreshData = () => {
    setRefreshCouponData(true)
  }

  useEffect(() => {
    getCoupons()
  }, [refreshCouponData])

  const getCoupons = async () => {
    let url = 'http://localhost:4000/api/v1/coupon'
    let response = await getCouponsData('GET', url)
    if (response !== undefined && response.status) {
      setData(response.data.data)
    }
  }

  const setData = (records) => {
    let count = 1
    records.forEach((record) => {
      const colorTemp = getColor(record.expireyDate)
      record.expireyDate = record.expireyDate.split('T')[0]
      record._props = { color: colorTemp }
      record.sno = count
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
    setCouponData(records.slice(startIndex, startIndex + recordPerPage))
    setTotalPages(records.length / recordPerPage)
    setTempCouponData(records)
  }

  const getColor = (expireyDate) => {
    if (expireyDate > new Date().toJSON().slice(0, 10)) {
      return 'success'
    } else {
      return 'danger'
    }
  }

  const onEditViewClick = (record) => {
    setOpenEditViewCouponPopup(true)
    setSelectedCouponData(record)
  }

  const onNextButtonClick = (tempPageIndex, totalcount, tempCurrentPage) => {
    setStartIndex(tempPageIndex)
    setCouponData(tempCouponData.slice(tempPageIndex, totalcount))
    setCurrentPage(tempCurrentPage)
  }
  const onPreviousButtonClick = (tempPageIndex, totalcount, currentPage) => {
    setStartIndex(tempPageIndex)
    setCouponData(tempCouponData.slice(tempPageIndex, totalcount))
    setCurrentPage(currentPage)
  }

  return (
    <div className="card">
      <CCardHeader>
        <strong>Ride Fare</strong>
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
                id="stateInput"
                type="text"
                className="me-1"
                placeholder="State"
                //value={stateSearch}
                //onChange={onSearchChange}
              />
              <CFormInput
                id="cityInput"
                type="text"
                className="me-1"
                placeholder="City"
                //value={citySearch}
                //onChange={onSearchChange}
              />
              <CButton
                type="submit"
                className="me-1"
                color="primary"
                variant="outline"
                //disabled={disableButton}
                //onClick={() => onSearchClick()}
              >
                Search
              </CButton>
              <CButton
                type="submit"
                className="me-1"
                color="primary"
                variant="outline"
                //disabled={disableButton}
                //onClick={() => onResetClick()}
              >
                Reset
              </CButton>
            </CForm>
            <CButton
              type="submit"
              className="btn btn-outline-success"
              color="primary"
              variant="outline"
              onClick={() => setOpenAddCouponPopup(true)}
            >
              Add New Coupon
            </CButton>
          </CContainer>
        </CNavbar>
        <CNavbar colorScheme="light" className="bg-light"></CNavbar>
      </CCardHeader>
      <DataTable columns={columns} items={couponData} />
      <Pagination
        totalPages={totalPages}
        onNextButtonClick={onNextButtonClick}
        onPreviousButtonClick={onPreviousButtonClick}
        recordPerPage={recordPerPage}
        currentPage={currentPage}
        startIndex={startIndex}
      />

      <CModal size="lg" visible={openAddCouponPopup} onClose={() => setOpenAddCouponPopup(false)}>
        <CModalHeader>
          <CModalTitle>Add New Coupon</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddCoupon closePopup={setOpenAddCouponPopup} onRefresh={refreshData} />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        size="lg"
        visible={openEditViewCouponPopup}
        onClose={() => setOpenEditViewCouponPopup(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit/View Coupon</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <EditViewCoupon
            selectedRowData={selectedCouponData}
            closePopup={setOpenEditViewCouponPopup}
            onRefresh={refreshData}
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}
export default Coupon
