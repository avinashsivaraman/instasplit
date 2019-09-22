import React, { useState } from 'react'
import Camera from './Camera'
import SplitList from './SplitList'

export default function Main() {
  const [flow, setFlow] = useState('camera')
  const [data, setData] = useState({})
  const onReceive = (item) => {
    setData(item)
    setFlow('split')
  }
  return (
    <div>
      {flow === 'camera' && <Camera onReceive={onReceive}/>}
      {flow === 'split' && <SplitList data={data}/>}
    </div>
  )
}
