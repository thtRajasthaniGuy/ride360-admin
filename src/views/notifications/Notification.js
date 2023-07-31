import React, { useState, useEffect } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton } from '@coreui/react'
import { CRow, CCol, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'

const Notification = () => {
  const [activeKey, setActiveKey] = useState(1)
  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink href="#All" active={activeKey === 1} onClick={() => setActiveKey(1)}>
            All User
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#One" active={activeKey === 2} onClick={() => setActiveKey(2)}>
            Single User
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <form className="card border">
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormSelect
                  aria-label="Type"
                  placeholder="Type"
                  options={[
                    'Select Type',
                    { label: 'Rider', value: '1' },
                    { label: 'Driver', value: '2' },
                  ]}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormInput type="text" placeholder="Title" aria-label="Title" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormTextarea id="Description" placeholder="Description" rows={3}></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mb-3 text-center">
              <CCol sm={8}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CRow>
          </form>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <form className="card">
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormInput type="phone" placeholder="Phone" aria-label="Title" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormSelect
                  aria-label="Type"
                  placeholder="Type"
                  options={[
                    'Select Type',
                    { label: 'Rider', value: '1' },
                    { label: 'Driver', value: '2' },
                  ]}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormInput type="text" placeholder="Title" aria-label="Title" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={8}>
                <CFormTextarea id="Description" placeholder="Description" rows={3}></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mb-3 text-center">
              <CCol sm={8}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CRow>
          </form>
        </CTabPane>
      </CTabContent>
    </>
  )
}
export default Notification
