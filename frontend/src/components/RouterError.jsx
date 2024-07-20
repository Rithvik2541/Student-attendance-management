import React from 'react'
import {useRouteError} from 'react-router-dom'

function RouterError() {

    let routingErrors = useRouteError()

  return (
    <div className='text-center mt-5'>
        <h1 className='text-danger p-5'>{routingErrors.status}-{routingErrors.data}</h1>
    </div>
  )
}

export default RouterError