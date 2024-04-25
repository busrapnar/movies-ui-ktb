import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className="">
        <Header/>
        <div className='min-h-screen '>
        <Outlet/>
        </div>
        <Footer/>
    </main>
  )
}

export default Layout