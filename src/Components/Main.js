import React, { useState } from 'react'
import Camera from './Camera'
import SplitList from './SplitList'

export default function Main() {
  const [flow, setFlow] = useState('camera')
  return (
    <div>
      {flow === 'camera' && <Camera />}
      {flow === 'split' && <SplitList />}
    </div>
  )
}
