import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const Layout = () => {
  return (
    <main>
       <Header />
       <Outlet />
       <Footer />
    </main>
  )
}

export default Layout