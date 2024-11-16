import logo from "../../../assets/logo.png"
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import Button1 from "../Buttons/Button1";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import "./navbar.css";

const Navbar = () => {
  const {user, logOutUser} = useContext(AuthContext);

  const handleLogout = () => {
      logOutUser()
      .then(()=> { })
      .catch(error => console.log(error.code))
  }
  const navLinks = <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allJobs">All Jobs</NavLink>
            </li>
            {
              user && <>
                <li>
              <NavLink to="/appliedJobs">Applied Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/myJobs">My Jobs</NavLink>
            </li>
              </>
            }
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="blogs">Blogs</NavLink>
            </li>
  </>

const userName = user?.displayName? user.displayName : "No Name found";
const userPhoto = user?.photoURL ? user.photoURL : "https://i.ibb.co/Vq2sG3c/fake-profile.webp" ;

  return (
    <nav className="navbar max-w-[1440px] px-4 md:px-10 xl:px-14 mx-auto">

      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="text-3xl lg:hidden">
          <IoMdMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm bg-[var(--clr-light)] dropdown-content z-[1] p-6 shadow rounded-box w-52"
          >
           {navLinks}
          </ul>
        </div>
        <img src={logo} alt="" className="hidden lg:flex h-16 w-auto"/>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {
        user? <div className="navbar-end">
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} className="w-11 h-11 border-2 border-[var(--clr-focused)] rounded-full cursor-pointer">
              <img
                src={userPhoto}
                alt="User Photo"
                className="rounded-full h-full w-full"
              />
            </div>

            {/* profile details */}
            <div tabIndex={0}  className="dropdown-content z-[1] menu p-6 shadow bg-base-100 rounded-box w-52 right-0 flex flex-col justify-between text-center min-h-36">
              <p className="font-bold">{userName}</p>

              <div onClick={handleLogout} className="w-full">
              <Button1 name="Logout"></Button1>
              </div>
            </div>
          </div>
      </div> : <div className="navbar-end">
        <Link to="/login">
        <Button1 name="Login"></Button1>
        </Link>
      </div>  
      }
    </nav>
   
  );
};

export default Navbar;
