import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Containers/Home'
import About from './Containers/About'
import Login from './Containers/Login'
import Profile from './Containers/Profile'
import SignUp from './Containers/SignUp'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const router = createBrowserRouter([
  {
    element : <Layout />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path : "/login",
        element : <Login />
      },
      {
        path : "/profile",
        element : <Profile />
      },

      {
        path : "/signup",
        element : <SignUp />
      }
    ]
  }
])

function App() {
 

  return (
   <>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
   </>
  )
}

export default App
