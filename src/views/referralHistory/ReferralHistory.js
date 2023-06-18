import React, { useState, useEffect } from 'react'
import { getInviteReferralHistoryData } from 'src/utils/calloutHelper'
import { DataTable, NotificationAlert, Pagination } from 'src/components'

const columns = [
  {
    key: 'sno',
    label: 'S.No.',
    _props: { scope: 'col' },
  },
  {
    key: 'referralPhoneNumber',
    label: 'Referral Phone Number',
    _props: { scope: 'col' },
  },
  {
    key: 'referralName',
    label: 'Referral Name',
    _props: { scope: 'col' },
  },
  {
    key: 'referralAppType',
    label: 'Referral App Type',
    _props: { scope: 'col' },
  },
  {
    key: 'newUserName',
    label: 'New User Name',
    _props: { scope: 'col' },
  },
  {
    key: 'newUserPhoneNumber',
    label: 'New User Phone Number',
    _props: { scope: 'col' },
  },
]
const ReferralHistory = (props) => {
  const [referralHistoryData, setReferralHistoryData] = useState()
  const [tempReferralHistoryData, setTempReferralHistoryData] = useState()
  const [isDisplayAlert, setIsDisplayAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertcolor, setAlertcolor] = useState('')

  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(2)
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    getInviteReferralHistorys()
  }, [])

  const getInviteReferralHistorys = async () => {
    try {
      let url = process.env.REACT_APP_URL + '/invite-referral-history'
      let response = await getInviteReferralHistoryData('GET', url)
      console.log(JSON.stringify(response))
      if (response != undefined && response.data) {
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
      console.log('getInviteReferralHistorys error :::====>>' + error)
      setReferralHistoryData('')
      setIsDisplayAlert(true)
      setAlertMessage('error')
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
    setReferralHistoryData(records.slice(0, 0 + recordPerPage))
    if (!tempReferralHistoryData) {
      setTempReferralHistoryData(records)
    }
  }

  const onNextButtonClick = (tempPageIndex, totalcount, tempCurrentPage) => {
    setStartIndex(tempPageIndex)
    setReferralHistoryData(tempReferralHistoryData.slice(tempPageIndex, totalcount))
    setCurrentPage(tempCurrentPage)
  }
  const onPreviousButtonClick = (tempPageIndex, totalcount, currentPage) => {
    setStartIndex(tempPageIndex)
    setReferralHistoryData(tempReferralHistoryData.slice(tempPageIndex, totalcount))
    setCurrentPage(currentPage)
  }

  return (
    <div className="card">
      <NotificationAlert
        color={alertcolor}
        isDisplayAlert={isDisplayAlert}
        alertMessage={alertMessage}
      />
      <DataTable columns={columns} items={referralHistoryData} />
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
export default ReferralHistory
