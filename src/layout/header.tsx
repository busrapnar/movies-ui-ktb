import { Link } from "react-router-dom";
import { ModeToggle } from '../components/toggle-button';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {logout, authDataStore, createToken} from "@/store/auth/authSlice";
import { Button } from "../components/ui/button";
import { AppDispatch } from "@/store";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();

  const { sessionId } = useSelector(authDataStore);

  const handleLogin = useCallback(() => {
    dispatch(createToken());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className='flex justify-between border-b items-center py-8 '>
        <div className=''>
            <Link to={"/"} className="text-6xl font-bold text-teal-600">TMDB</Link>
            
        </div>
        <div className='flex gap-6 items-center '>
          {sessionId ? (
            <>
              
              <Link to = {"/"} className="border-primary border px-4 py-2 rounded-lg hover:bg-primary hover:text-white">Home</Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button variant={"outline"} size={"lg"} className="text-lg " onClick={handleLogin}>Login</Button>
          )}
          <ModeToggle/>
        </div>
    </div>
  );
}

export default Header;