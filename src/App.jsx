import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Main from './Components/Main/Main'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <>
    <ToastContainer />
    <Sidebar />
    <Main />
    </>
  )
}

export default App