import React from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

type Props = {}

const Layout = (props: Props) => {
  return (
    <main className="relative ">
        <Header/>
        <div className='min-h-screen '>
        <Outlet/>
        </div>
        <Footer/>
    </main>
  )
}

export default Layout