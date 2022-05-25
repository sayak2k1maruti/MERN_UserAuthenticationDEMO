import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Signin from './Components/Signin'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin />} ></Route>
      </Routes>
    </Router >
  )
}

export default App