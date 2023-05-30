import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { CPagination, CPaginationItem } from '@coreui/react'

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState()
  const [recordPerPage, setRecordPerPage] = useState()
  const [startIndex, setStartIndex] = useState()

  useEffect(() => {
    setCurrentPage(props.currentPage)
    setRecordPerPage(props.recordPerPage)
    setStartIndex(props.startIndex)
  }, [props.currentPage, props.recordPerPage, props.startIndex])

  const onNextButtonClick = () => {
    if (props.totalPages >= currentPage) {
      let tempPageIndex = startIndex + recordPerPage
      setCurrentPage(currentPage + 1)
      setStartIndex(tempPageIndex)
      props.onNextButtonClick(tempPageIndex, tempPageIndex + recordPerPage, currentPage + 1)
    }
  }
  const onPreviousButtonClick = () => {
    if (currentPage > 0) {
      let tempPageIndex = startIndex - recordPerPage
      setCurrentPage(currentPage - 1)
      setStartIndex(tempPageIndex)
      props.onPreviousButtonClick(tempPageIndex, tempPageIndex + recordPerPage, currentPage - 1)
    }
  }

  return (
    <div>
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem disabled={currentPage === 1} onClick={() => onPreviousButtonClick()}>
          Previous
        </CPaginationItem>
        <CPaginationItem active={currentPage}>{currentPage}</CPaginationItem>
        {props.totalPages > currentPage ? (
          <CPaginationItem>{currentPage + 1}</CPaginationItem>
        ) : null}
        {props.totalPages - 1 > currentPage ? (
          <CPaginationItem>{currentPage + 2}</CPaginationItem>
        ) : null}
        <CPaginationItem
          disabled={currentPage === props.totalPages}
          onClick={() => onNextButtonClick()}
        >
          Next
        </CPaginationItem>
      </CPagination>
    </div>
  )
}
Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  recordPerPage: PropTypes.number,
  onNextButtonClick: PropTypes.func,
  onPreviousButtonClick: PropTypes.func,
  startIndex: PropTypes.number,
}

export default React.memo(Pagination)
