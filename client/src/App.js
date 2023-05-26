import { useEffect } from 'react';
import './App.css';
import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import WebFont from 'webfontloader';
import Home from './components/Home';
import ProductDetails from './components/Product/ProductDetails.js';
import Search from './components/Product/Search.js';
import Products from './components/Product/Products.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/User/Login.js"
import Signup from "./components/User/Signup.js"
import store from "./store.js"
import { loadUser } from './actions/userActions';
import {  useSelector } from 'react-redux';
import UserOptions from "./components/layout/UserOptions.js"
import Profile from "./components/User/Profile.js"
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/cart/Cart.js";
import Shipping from "./components/cart/Shipping.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import Payment from "./components/cart/Payment.js";
import OrderSuccess from "./components/cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import { useState } from 'react';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/admin/Dashboard.js'
import ProductList from './components/admin/ProductList.js'
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct.js';
import OrderList from './components/admin/OrderList.js';
import ProcessOrder from './components/admin/ProcessOrder.js';
import UserList from './components/admin/UserList.js';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import Contact from './components/layout/Contact/Contact';


function App() {
  // const [stripeApiKey, setStripeApiKey] = useState("");
const stripeApiKey = "pk_test_51MZuqaSCbCK97gg6HMnkrJ8P0pQIgeIvQYJTcTn4DQaNMOr83XPKYNgDtU42wFU7npC8kKuR9Yf4HNCu5WdobJSF00tcRU9E2L"
  // async function getStripeApiKey() {
  //   const { data } = await axios.get(`/api/v1/stripeapikey`);
  //   setStripeApiKey(data.stripeApiKey);
  // }

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans", "Unbounded",]
      }
    })
    // getStripeApiKey()
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>


          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />

          <Route exact path='/account' element={isAuthenticated ? <Profile /> : <Login />} />
          <Route exact path='/account/update' element={isAuthenticated ? <UpdateProfile /> : <Login />} />
          <Route exact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <Login />} />

          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/cart' element={<Cart />} />

          <Route exact path='/login/shipping' element={isAuthenticated ? <Shipping /> : <Login />} />
          <Route exact path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <Login />} />
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={(
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            />
          )}

          <Route exact path='/order/success' element={isAuthenticated ? <OrderSuccess /> : <Login />} />
          <Route exact path='/orders' element={isAuthenticated ? <MyOrders /> : <Login />} />
          <Route exact path='/order/:id' element={isAuthenticated ? <OrderDetails /> : <Login />} />
          <Route exact path='/admin/dashboard' element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route exact path='/admin/products' element={isAuthenticated ? <ProductList /> : <Login />} />
          <Route exact path='/admin/product' element={isAuthenticated ? <NewProduct /> : <Login />} />
          <Route exact path='/admin/product/:id' element={isAuthenticated ? <UpdateProduct /> : <Login />} />
          <Route exact path='/admin/orders' element={isAuthenticated ? <OrderList /> : <Login />} />
          <Route exact path='/admin/order/:id' element={isAuthenticated ? <ProcessOrder /> : <Login />} />
          <Route exact path='/admin/users' element={isAuthenticated ? <UserList /> : <Login />} />
          <Route exact path='/admin/user/:id' element={isAuthenticated ? <UpdateUser /> : <Login />} />
          <Route exact path='/admin/reviews' element={isAuthenticated ? <ProductReviews /> : <Login />} />

        </Routes>

        <Footer />
        <ToastContainer />

      </Router>
    </>
  );
}

export default App;
