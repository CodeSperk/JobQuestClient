import { FaUsers, FaUtensils } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const isAdmin = true;
  const adminLinks = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-4 text-xl hover:underline hover:text-white duration-300">
          <MdDashboard></MdDashboard>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="flex items-center gap-4 text-xl hover:underline hover:text-white duration-300">
          <MdDashboard></MdDashboard>
          Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/users"
          className="flex items-center gap-4 text-xl hover:underline hover:text-white duration-300"
        >
          <FaUsers></FaUsers>
          Users
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="flex flex-col md:flex-row gap-4">
       <div className="w-full md:w-72 md:min-h-screen bg-[var(--clr-focused)] text-white flex justify-center items-start py-16 px-8">
        <ul className="space-y-6">
          {isAdmin && adminLinks}
        </ul>
      </div> 

      <div className="flex-1 md:w-[calc(100vw-18rem)] m-4 md:m-12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;