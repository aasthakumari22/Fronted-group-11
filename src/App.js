import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Dashboard from './pages/Dashboard.js';
import Users from './pages/Users.js';
import Restaurant from './pages/Restaurant.js';
import Orders from './pages/Orders.js';


function App() {
  return (
    <BrowserRouter>
    <Sidebar>
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/restaurant" element={<Restaurant/>} />
        <Route path="/orders" element={<Orders />} />
    </Routes>
    </Sidebar>
    </BrowserRouter>
  );
};

export default App;
