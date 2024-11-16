import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { useContext, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Jobs = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [currentJobs, setCurrentJobs ] = useState([]);

  const {isPending, data: allJobs} = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const data = await axiosSecure.get("/jobs");
      setCurrentJobs(data.data);
      return data.data;
    }
  });

// to display loading spinner while loading 
  if(isPending){
    return <span className="loading loading-bars loading-lg text-[var(--clr-focused)]"></span>
  }

  const handleJobSearch =  (e) => {
      const searchQuery = e.target.value.toLowerCase();
      if(searchQuery === ""){
        setCurrentJobs(allJobs);
        return;
      }

      const filteredJobs = allJobs.filter(job => job.jobTitle.toLowerCase().includes(searchQuery));
      setCurrentJobs(filteredJobs);
  }

  const handleShowNotification = () => {
    !user && Swal.fire({
      title: "You have to log in first to view details",
      showConfirmButton: false,
      color:"#7C3AED",
      timer: 2500,
    });
  };

  

  return (
    <div>
            <Helmet>
      <title>JobQuest | All Jobs </title>
      </Helmet>
      {/* Banner/ Title */}
      <div className="card-style px-4 md:px-10 lg:pl-20 rounded-xl py-16 flex justify-center items-center">

        <div className="text-center">
          <h1 className="mb-4">
            Get The <span className="text-[var(--clr-focused)]">Right Job</span>
            <br /> You Deserve
          </h1>

          <div className="relative flex items-center justify-center ">
            <input
              type="text"
              name="search"
              placeholder="Search job here ... "
              onChange={handleJobSearch}
              className="w-60 md:w-80 mx-auto py-2 md:py-3 rounded-full px-8 outline-none border-2 border-[var(--clr-focused)] text-[var(--clr-dark)]"
            />
            <GoSearch  className="absolute right-4 text-xl top-1/2 -translate-y-1/2"/>
          </div>
        </div>
      </div>

      {/* Tabular Form */}
      <div className="p-2 mx-auto sm:p-4 mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Job Title</th>
                <th className="p-3">Posting Date</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Salary Range</th>
                <th className="p-3">View Details</th>
              </tr>
            </thead>

            <tbody>
                {currentJobs.map(job => <tr key={job._id} className="border-b border-opacity-20">
                  <td className="p-3 font-bold">
                  <p>{job.jobTitle}</p>
                </td>
                  <td className="p-3">
                  <p>{job.jobPostingDate}</p>
                </td>
                  <td className="p-3">
                  <p>{job.applicationDeadline}</p>
                </td>
                  <td className="p-3">
                  <p>{job.salaryRange}</p>
                </td>
                
                <td className="p-3">
                  <Link to={`/job/${job._id}`}>
                  <button className="px-3 py-1 font-semibold rounded-md bg-[var(--clr-focused)] text-[var(--clr-light)]" onClick={handleShowNotification}>
                    Details
                  </button>                  
                  </Link>
                </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Jobs;
