import './App.css';
import Home from './component/Home/Home.jsx';
import Brands from './component/Brands/Brands.jsx';
import Carts from './component/Carts/Carts.jsx';
import Register from './component/Register/Register.jsx';
import Login from './component/Login/Login.jsx';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from './component/Layout/Layout.jsx';
import Products from './component/Products/Products.jsx';
import About from './component/About/About.jsx';
import Notfound from './component/Notfound/Notfound.jsx';
// import Countercontextprovider from './Context/counterContext';
import UserContextProvider from './Context/userContext';
import ProtectedRout from './component/protectedRout/protectedRout.jsx';
import Logout from './component/logout/logout';
import ProductDetails from './component/ProductDetails/ProductDetails.jsx';
import { CartContextProvider } from './Context/CartContext.jsx';
import {Toaster} from 'react-hot-toast';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import Checkout from './component/Checkout/Checkout';
import AllOrders from './component/AllOrders/AllOrders';
import { Offline, Online } from 'react-detect-offline';

let query = new QueryClient();
let routes = createBrowserRouter([
  {path:'', element:<Layout/>,children:[
    {index: true, element: <ProtectedRout><Products/></ProtectedRout>},
    {path:'about', element: <ProtectedRout><About/></ProtectedRout>},
    {path:'brands', element: <ProtectedRout><Brands/></ProtectedRout>},
    {path:'register', element: <Register/>},
    {path:'login', element: <Login/>},
    {path:'logout', element: <Logout/>},
    {path:'carts', element: <ProtectedRout><Carts/></ProtectedRout>},
    {path:'ProductDetails/:id/:category', element: <ProtectedRout><ProductDetails/></ProtectedRout>},
    {path:'Checkout', element: <Checkout/>},
    {path:'allorders', element: <ProtectedRout><AllOrders/></ProtectedRout>},
    {path:'*', element: <Notfound/>},
  ]}
]);

function App() {
// 
  return (
    <>
        <CartContextProvider>
          <UserContextProvider>
            <QueryClientProvider client={query}>
              <ReactQueryDevtools></ReactQueryDevtools>
              <RouterProvider router={routes}></RouterProvider>
                <Offline>
                  <div className="offline bg-warning py-3 d-flex justify-content-center mb-1 mx-1 rounded-1 fw-semibold">
                    Sorry, You are currently <span className='fw-bold mx-1'>offline</span>
                  </div>
                </Offline>
              <Toaster/>
            </QueryClientProvider>
          </UserContextProvider>
        </CartContextProvider>

    </>
  )
}

export default App
