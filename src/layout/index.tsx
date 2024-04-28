import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";


const Layout = () => {
    const dispatch: AppDispatch = useDispatch();
    const sessionId = useSelector((state: RootState) => state.auth.sessionId);
    useEffect(() => {
        if(sessionId === undefined || sessionId === null) {
            dispatch(login())
        }
    }, [dispatch, sessionId])
    
  return (
    <main className="container mx-auto ">
      <Header />
      <div >
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
