import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'

import { UserProvider } from './context/UserContext.jsx'

import Navbar from './components/test.jsx'
import Home from './pages/home.jsx'
import NearYou from './pages/nearYou.jsx'
import Landing from './pages/landing.jsx'
import Profile from './pages/profile.jsx'
import ListDetails from './pages/listDetails.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <UserProvider>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path='/Home' element={
              <Home />
            }/>
            <Route path='/NearYou' element={
              <NearYou />
            }/>
            <Route path='/Landing' element={
              <Landing />
            }/>
            <Route path='/profile' element={
              <Profile />
            }/>
            <Route path='/viewList' element={
              <ListDetails />
            }/>
          </Routes>
        </main>
      </div>      
    </UserProvider>
  )
}

export default App
