import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Footer from "../components/Shared/Footer/Footer";
import { FiMoon } from "react-icons/fi";
import { FaSun } from "react-icons/fa";

const RootLayout = () => {
  const {changeTheme} = useContext(AuthContext);

  const handleDarkTheme = () => {
    changeTheme();
  }


  const {darkTheme} = useContext(AuthContext);
  return (
    <div  className={darkTheme? "darken" : ""}>

      {/* <div className="flex items-center shadow bg-[var(--clr-light)]">
        <Navbar></Navbar>
      </div> */}
      <div className={`flex items-center shadow ${darkTheme ? "bg-[var(--clr-dark)] border-b border-[var(--clr-dark-secondary)]" : "bg-[var(--clr-light)]"}`}>
        <Navbar></Navbar>
      </div>

      <div className="max-w-[1440px] px-4 md:px-10 xl:px-14 mx-auto">
        <Outlet></Outlet>
      </div>

      <footer className="bg-[var(--clr-dark)]">
        <div className="max-w-[1440px] px-4 md:px-10 xl:px-14 mx-auto text-[var(--clr-light)]">
        <Footer></Footer>
        </div>
      </footer>

      <div className="fixed z-50 bg-[var(--clr-focused)] rounded-full text-[var(--clr-light)] p-3 right-10 top-[90%] text-xl" onClick={handleDarkTheme}>
          {darkTheme? <FiMoon /> : <FaSun /> }
        </div>
    </div>
  );
};

export default RootLayout;