import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout = () => {

  return (
    <main className="container mx-auto">
      <Header />
      <div >
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;