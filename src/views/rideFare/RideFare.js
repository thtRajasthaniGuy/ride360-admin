import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Pagination } from 'src/components'
import { DataTable } from 'src/components'
import { RideFareDetailsEdit } from 'src/components'
import { AddRideFare } from 'src/components'

import { CButton } from '@coreui/react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import { CForm, CNavbarBrand } from '@coreui/react'
import { CFormInput, CCardHeader, CNavbar, CContainer, CFormSelect } from '@coreui/react'
import { getRideFaresData } from 'src/utils/calloutHelper'

const columns = [
  {
    key: 'sno',
    label: 'S.No.',
    _props: { scope: 'col' },
  },
  {
    key: 'state',
    label: 'State',
    _props: { scope: 'col' },
  },
  {
    key: 'city',
    label: 'City',
    _props: { scope: 'col' },
  },
  {
    key: 'bikeDayFare',
    label: 'Bike Day Fare',
    _props: { scope: 'col' },
  },
  {
    key: 'bikeNightFare',
    label: 'Bike Night Fare',
    _props: { scope: 'col' },
  },
  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
]
const RideFare = () => {
  const [rideFareData, setRideFareData] = useState()
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState('')
  const [disableButton, setDisableButtonState] = useState(true)
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(10)
  const [startIndex, setStartIndex] = useState(0)
  const [tempRideFareData, setTempRideFareData] = useState()
  const [stateSearch, setStateSearch] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [openAddNewRideFarePopup, setOpenAddNewRideFarePopup] = useState(false)
  const [refreshCmpData, setRefreshData] = useState(false)

  const refreshData = (updatedRideFareData, isAdd) => {
    var tempData = tempRideFareData
    if (isAdd === 'isAdd') {
      updatedRideFareData.sno = tempData.length + 1
      updatedRideFareData.action = (
        <CButton
          type="submit"
          className="me-2"
          color="primary"
          variant="outline"
          onClick={() => onEditViewClick(updatedRideFareData)}
        >
          Edit/View
        </CButton>
      )
      tempData.push(updatedRideFareData)
    } else {
      tempData.forEach((record) => {
        if (record._id === updatedRideFareData._id) {
          Object.entries(updatedRideFareData).forEach(([key, value]) => {
            record[key] = value
          })
        }
      })
    }

    setRideFareData(tempData.slice(startIndex, startIndex + recordPerPage))
    setTotalPages(tempData.length / recordPerPage)
    setTempRideFareData(tempData)
  }

  useEffect(() => {
    getRideFares()
  }, [])

  const getRideFares = async () => {
    let state = 'null'
    let city = 'null'
    let url = 'http://localhost:4000/api/v1/ride-fare-list/' + state + '/' + city
    let response = await getRideFaresData('GET', url)
    if (response !== undefined && response.status) {
      setData(response.data.data)
    }
  }

  const setData = (records) => {
    let count = 1
    records.forEach((record) => {
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
    setRideFareData(records.slice(startIndex, startIndex + recordPerPage))
    setTotalPages(records.length / recordPerPage)
    setTempRideFareData(records)
  }
  const onEditViewClick = (obj) => {
    console.log('onEditViewClick obj ::::===>>' + obj)
    setOpenPopup(true)
    setSelectedRowData(obj)
  }

  const onSearchChange = (event) => {
    setDisableButtonState(false)
    if (event.target.id === 'stateInput') {
      setStateSearch(event.target.value)
    }
    if (event.target.id === 'cityInput') {
      setCitySearch(event.target.value)
    }
  }

  const onSearchClick = async () => {

    let url = 'http://localhost:4000/api/v1/ride-fare-list/'+ stateSearch + '/' + citySearch
    axios.get(url)
    .then((response) => {
      console.log(response.data)
      if(response.status){
        setData(response.data.data)
      }
    })
      
  }
  const onResetClick = () => {
    setStateSearch('')
    setCitySearch('')
    setDisableButtonState(true)
    getRideFares()
  }
  const onAddNewRideFareClick = () => {
    setOpenAddNewRideFarePopup(true)
  }

  const onNextButtonClick = (tempPageIndex, totalcount, tempCurrentPage) => {
    setStartIndex(tempPageIndex)
    setRideFareData(tempRideFareData.slice(tempPageIndex, totalcount))
    setCurrentPage(tempCurrentPage)
  }
  const onPreviousButtonClick = (tempPageIndex, totalcount, currentPage) => {
    setStartIndex(tempPageIndex)
    setRideFareData(tempRideFareData.slice(tempPageIndex, totalcount))
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
                value={stateSearch}
                onChange={onSearchChange}
              />
              <CFormInput
                id="cityInput"
                type="text"
                className="me-1"
                placeholder="City"
                value={citySearch}
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
            <CButton
              type="submit"
              className="btn btn-outline-success"
              color="primary"
              variant="outline"
              onClick={() => onAddNewRideFareClick()}
            >
              Add New Ride Fare
            </CButton>
          </CContainer>
        </CNavbar>
        <CNavbar colorScheme="light" className="bg-light"></CNavbar>
      </CCardHeader>
      <DataTable columns={columns} items={rideFareData} />
      <Pagination
        totalPages={totalPages}
        onNextButtonClick={onNextButtonClick}
        onPreviousButtonClick={onPreviousButtonClick}
        recordPerPage={recordPerPage}
        currentPage={currentPage}
        startIndex={startIndex}
      />
      <CModal size="lg" visible={openPopup} onClose={() => setOpenPopup(false)}>
        <CModalHeader>
          <CModalTitle>Edit/View Ride Fare Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <RideFareDetailsEdit
            selectedRowData={selectedRowData}
            closePopup={setOpenPopup}
            onRefresh={refreshData}
          />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      <CModal
        size="lg"
        visible={openAddNewRideFarePopup}
        onClose={() => setOpenAddNewRideFarePopup(false)}
      >
        <CModalHeader>
          <CModalTitle>Add New Ride Fare</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddRideFare closePopup={setOpenAddNewRideFarePopup} onRefresh={refreshData} />
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </div>
  )
}
export default RideFare
