import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import { Toaster } from 'sonner'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
