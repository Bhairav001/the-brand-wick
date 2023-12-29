
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import Product from './pages/Product'
import PrivateRoute from './protectedRoute/PrivateRoute'

function App() {

  return (
    <>
     <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product' element={<PrivateRoute><Product/></PrivateRoute>}/>
    </Routes>
    </>
  )
}

export default App
