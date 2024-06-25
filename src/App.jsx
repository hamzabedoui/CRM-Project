import React from 'react'
import Login from './pages/login/login'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import MainResponsable from './components/responsable/MainResponsable';
import MainClient from './components/client/MainClient';
import HomeClient from './components/client/HomeClient';
import Customers from './pages/admin/customers/Customers';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Home from './components/responsable/home/Home';
import Sales from './components/responsable/sales/Sales';
import Payments from './components/responsable/payments/Payments';

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

          </Route> 
          <Route path='/main-client' element={<MainClient />}>
            <Route path='/main-client/home' element={<HomeClient />} />
           </Route>

        </Routes>
      </Router>
      
    </div>
  )
}


export default App;
