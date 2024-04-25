import {Link} from "react-router-dom"
import { FiUser } from "react-icons/fi";
import { ModeToggle } from '../toggle-button';

const Header = () => {
  return (
    <div className='container mx-auto flex justify-between border-b items-center py-10 '>
        <div className='flex items-center gap-5'>
            <Link to={"/"} className="text-5xl font-bold text-teal-600">TMDB</Link>
            <Link to={"/"} className="text-2xl ">Home</Link>
            <Link to={"/movies"} className="text-2xl ">Popular</Link>
           
        </div>
        <div className='flex gap-6 items-center '>
            <FiUser size={28}/>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Header