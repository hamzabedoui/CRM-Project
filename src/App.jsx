import React from 'react'
import Login from './pages/login/login'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import MainResponsable from './pages/admin/MainResponsable';

import Customers from './components/responsable/customers/Customers';
import Dashboard from './components/responsable/services/Dashboard';
import Home from './components/responsable/home/Home';
import Sales from './components/responsable/sales/Sales';
import Payments from './components/responsable/payments/Payments';
import Profile from './components/responsable/profile/Profile';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          
          <Route path='/register' element={<Register />} />
          <Route path='/main-responsable' element={<MainResponsable />}>
            
            <Route path='/main-responsable/customers' element={<Customers />} />
            <Route path='/main-responsable/Services' element={<Dashboard />} />
            <Route path='/main-responsable/home' element={<Home />} />
            <Route path='/main-responsable/sales' element={<Sales />} />
            <Route path='/main-responsable/payments' element={<Payments />} />
            <Route path='/main-responsable/profile' element={<Profile />} />

          </Route> 

        </Routes>
      </Router>
      
    </div>
  )
}


export default App;
