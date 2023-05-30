import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { CTable } from '@coreui/react'

const DataTable = (props) => {
  return (
    <div>
      <CTable
        tableHeadProps={{ color: 'dark' }}
        className="table table-hover"
        columns={props.columns}
        items={props?.items}
      ></CTable>
    </div>
  )
}
DataTable.propTypes = {
  columns: PropTypes.array,
  items: PropTypes.array,
}

export default React.memo(DataTable)
