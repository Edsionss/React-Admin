import React, { useState, useEffect } from 'react'

interface Props {
  example?: string
}

const LoginPage = (props: Props) => {
  const [state, setstate] = useState<string>('')

  useEffect(() => {
    console.log('Mounted:', state)
    return () => {
      console.log('Unmounted:', state)
    }
  }, [])

  return (
    <div className='container'>
      <h1>LoginPage Component</h1>
      <p>{state}</p>
    </div>
  )
}

export default LoginPage
