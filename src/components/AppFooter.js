import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://montercab.in/" target="_blank" rel="noopener noreferrer">
          Ride 360
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
