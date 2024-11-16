import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [myJobs, setMyJobs] = useState([]);

  const { isPending, data: jobs } = useQuery({
    queryKey: ["myJobs"],
    queryFn: async () => {
      const data = await axiosSecure.get(`/myJobs?email=${user?.email}`);
      setMyJobs(data.data)
      return data.data;
    },
  });

  //to display loader while data is loading
  if (isPending) {
    return (
      <span className="loading loading-bars loading-lg text-[var(--clr-focused)]"></span>
    );
  }

  // to remove job afterDelete
  const handleRemoveJob = (deletedJobId) => {
    const remainingJobs = myJobs.filter((job) => job._id !== deletedJobId);
    setMyJobs(remainingJobs);
  };

  //  to delete the job
  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#7C3AED",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myJobs/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              iconColor: "#7C3AED",
              confirmButtonColor: "#7C3AED",
              title: "Job Deleted Successful",
              timer: 2500,
            });
          }
          handleRemoveJob(id);
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>JobQuest | My Jobs </title>
      </Helmet>
      {/* Banner/ Title */}
      <div className="card-style px-4 md:px-10 lg:pl-20 rounded-xl py-16 flex justify-center items-center">
        <div className="text-center">
          <h1 className="mb-4">
            Manage Your Job Listings: <br />{" "}
            <span className="text-[var(--clr-focused)]">
              Edit and Remove Jobs{" "}
            </span>
            <br /> as Needed
          </h1>
        </div>
      </div>

      {myJobs && myJobs.length > 0 ? (
        <div className="p-2 mx-auto sm:p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full mt-8">
              <thead className="">
                <tr className="text-left">
                  <th className="p-3">Banner</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Salary</th>
                  <th className="p-3">PostingDate</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Applicants</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Update</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>

              <tbody>
                {myJobs.map((job) => (
                  <tr key={job._id} className="border-b border-opacity-20">
                    <td className="p-3">
                      <img
                        src={job?.pictureURL}
                        alt=""
                        className="h-12 w-auto rounded"
                      />
                    </td>
                    <td className="p-3 font-bold">
                      <p>{job?.jobTitle}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.jobCategory}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.salaryRange}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.jobPostingDate}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.applicationDeadline}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.jobApplicants}</p>
                    </td>
                    <td className="p-3">
                      <p>{job?.jobDescription}</p>
                    </td>

                    {/* Update button */}
                    <td className="p-3">
                      <Link to={`/update/${job?._id}`}>
                      <button className="px-3 py-1 font-semibold rounded-md bg-[var(--clr-focused)] text-[var(--clr-light)] text-xl hover:scale-90 duration-300">
                        <BiSolidEdit />
                      </button>
                      </Link>
                    </td>

                    {/* delete button */}
                    <td className="p-3">
                      <button
                        className="px-3 py-1 font-semibold rounded-md bg-[var(--clr-focused)] text-[var(--clr-light)] text-xl hover:scale-90 duration-300"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="min-h-96 flex flex-col justify-center items-center text-center gap-4">
          {" "}
          <h1>
            {" "}
            <span className="text-[var(--clr-focused)]"> No Jobs Found. </span>
          </h1>{" "}
          <p className="text-xl">You Have added no jobs yet.</p>{" "}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
