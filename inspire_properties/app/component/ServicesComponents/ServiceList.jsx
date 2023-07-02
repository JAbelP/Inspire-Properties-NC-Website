import React from 'react'
import {ServiceBubble} from './ServiceBubble'

export const ServiceList=()=> {
  return (
    <div className='mx-3'>
        <ServiceBubble />
        <ServiceBubble  className="right-side" />
        <ServiceBubble />
        <ServiceBubble  className="right-side"/>

    </div>
  )
}