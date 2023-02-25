import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import './index.css'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import  store  from './Store';
import Home from './Pages/Home/Home'
import Admin from './Pages/Admin/Admin'

const colors = {
  cp: {
    1: "#92E3A9",
    2: "#1D5E2F",
    3: "#000000",
    4:"#217D4D"
  }
}

const theme = extendTheme({ colors })

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children:[
     { path:'/',
     element:<Home />
    },
    {
      path:"/admin",
      element:<Admin />
    }
    ]
  }
 
  
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
