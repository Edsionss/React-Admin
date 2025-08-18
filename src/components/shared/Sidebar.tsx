import React, { useState, useEffect } from 'react'

interface Props {
  example?: string
}

const Sidebar = (props: Props) => {
  const [state, setstate] = useState<string>('')

  useEffect(() => {
    console.log('Mounted:', state)
    return () => {
      console.log('Unmounted:', state)
    }
  }, [])

  return (
    <div className='container'>
      <h1>Sidebar Component</h1>
      <p>{state}</p>
    </div>
  )
}

export default Sidebar
