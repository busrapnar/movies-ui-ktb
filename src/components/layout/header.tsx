import React from 'react'
import {Link} from "react-router-dom"
import { MdSearch,MdNotificationsNone } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { ModeToggle } from '../toggle-button';

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='container mx-auto flex justify-between items-center py-10'>
        <div className='flex gap-5'>
            <div>LOGO</div>
            <Link to={""}>Home</Link>
            <Link to={""}>Popular</Link>
        </div>
        <div className='flex gap-6 items-center '>
            <MdSearch size={28}/>
            <MdNotificationsNone size={28}/>
            <FiUser size={28}/>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Header