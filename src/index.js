import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/tailwind.css';
import './components/navbar/IndexNavbar';
import './components/items';
import Items from './components/items';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Searching from './components/searching';
import Cart from './components/cart';
import Account from './components/account';
import OrderSummary from './components/orderSummary';
import { Toaster } from 'react-hot-toast';
import Category from './components/category';
import Login from './components/login';
import Orders from './components/orders';
import OrderHistory from './components/orderHistory';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <Routes>

        {/* Define routes here */}
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App />} />
        <Route path="/items" element={<Items />} />
        <Route path="/search" element={<Searching />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="/category" element={<Category />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/order-history' element={<OrderHistory/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
