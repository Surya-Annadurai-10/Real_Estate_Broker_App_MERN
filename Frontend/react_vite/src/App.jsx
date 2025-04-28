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
   <RouterProvider router={router} />
   </>
  )
}

export default App
