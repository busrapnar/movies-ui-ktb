import { Link } from "react-router-dom";
import { ModeToggle } from '../toggle-button';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { login, logout, authDataStore } from "@/store/auth/authSlice";
import { Button } from "../ui/button";
import { AppDispatch } from "@/store";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();

  const { sessionId } = useSelector(authDataStore);

  const handleLogin = useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className='flex justify-between border-b items-center py-8 '>
        <div className='flex gap-10 items-baseline'>
            <Link to={"/"} className="text-6xl font-bold text-teal-600">TMDB</Link>
            
            <Link to={"/"} className="text-xl ">Home</Link>
        </div>
        <div className='flex gap-6 items-center '>
          {sessionId ? (
            <>
              <Button onClick={handleLogout}>Logout</Button>
              <button onClick={() => window.location.href = "/"}>Home</button>
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