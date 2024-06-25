import React from 'react'
import Login from './pages/login/login'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import MainResponsable from './components/responsable/MainResponsable';
import MainClient from './components/client/MainClient';
import HomeClient from './components/client/HomeClient';
import Customers from './pages/admin/customers/Customers';
import Dashboard from './pages/admin/dashboard/Dashboard';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main-responsable' element={<MainResponsable />}>
            <Route path='/main-responsable/customers' element={<Customers />} />
            <Route path='/main-responsable/dashboard' element={<Dashboard />} />
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
