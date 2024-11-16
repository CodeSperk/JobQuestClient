import { useParams } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Button1 from "../../Shared/Buttons/Button1";
import { FaRegHandPointRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const [userResume, setUserResume] = useState("");

  const { isPending, data: job } = useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      const data = await axiosSecure.get(`/job/${id}`);
      return data.data;
    },
  });
  if (isPending) {
    return (
      <span className="loading loading-bars loading-lg text-[var(--clr-focused)]"></span>
    );
  }

  const { pictureURL, jobTitle, jobDescription, salaryRange, jobApplicants } =
    job;

  // To Handle Application Submission
  const handleSubmitApplication = () => {
    const currentDate = new Date();
    if (currentDate > new Date(job.applicationDeadline)) {
      console.log("DeadLine Over");
      return;
    } else if (job.userEmail === user.email) {
      console.log("You Can not apply your job");
      return;
    }

    const userName = user?.displayName;
    const userEmail = user?.email;
    const applicationData = {
      jobId: job._id,
      userName,
      userEmail,
      userResume,
    };
    axiosSecure.post("/applications", applicationData).then((res) => {
      if (res.data.insertedId) {
        handleUpdateJobApplicant();
        document.getElementById("applyModal").close();
      }
    });

    // handle update job applicants number
    const handleUpdateJobApplicant = () => {
      const updatedApplicants = parseInt(job.jobApplicants + 1);
      console.log(updatedApplicants);
      const updatedJob = {updatedApplicants}
      axiosSecure.put(`/allJobs/${job._id}`, updatedJob)
    .then(res => {
      if(res.data.modifiedCount>0){
        Swal.fire({
          icon: "success",
          iconColor: "#2D2F81",
          confirmButtonColor: "#2D2F81",
          title: "Applied Successful",
          timer: 2500
        });
      }
    })
    }

  };

  return (
    <div>
      <Helmet>
        <title>JobQuest | Job Details </title>
      </Helmet>

      {/* Job Banner */}
      <div
        className="text-white bg-[#7c7083] bg-center bg-cover bg-blend-multiply px-4 py-24 md:py-36 text-center rounded-xl"
        style={{ backgroundImage: `url(${pictureURL})` }}
      >
        <h1>{jobTitle}</h1>
      </div>

      <main>
        {/* job Details Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left div */}
          <div className="lg:col-span-2 space-y-6">
            <div
              key={job._id}
              className="flex hover:shadow-lg flex-col md:flex-row gap-6 p-6 md:p-8 border rounded-md"
            >
              <div className="w-20 h-20 p-4 border rounded-lg bg-[var(--clr-light-primary)]">
                <img src={job?.companyLogo} alt="" />
              </div>
              <div className="flex-1 space-y-4">
                <h4>{job?.jobTitle}</h4>
                <small>Posted by : {job.userName}</small>
                <div className="flex gap-6 justify-between">
                  <p className="text-[var(--clr-focused)] text-lg font-bold">
                    {salaryRange}
                  </p>
                  <p>
                    <span className="font-bold">Job Posted</span> :{" "}
                    {job?.jobPostingDate}
                  </p>
                  <p>
                    <span className="font-bold"> Deadline</span> :{" "}
                    {job?.applicationDeadline}
                  </p>
                </div>
              </div>
              <div></div>
            </div>
            {/* job Description */}
            <div className="space-y-4">
              <h4>Job Description</h4>
              <p>{jobDescription}</p>
            </div>
            {/* job Requirements */}
            {job.requirements && (
              <div className="space-y-4">
                <h4>Job requirements</h4>
                <div>
                  {job?.requirements.map((requirement, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 ml-4 space-y-2"
                    >
                      <FaRegHandPointRight />
                      <p>{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* aside */}
          <aside>
            <div className="space-y-4 border p-4 md:p-8 rounded-md">
              <h5>Job Overview</h5>
              <p className="flex justify-between">
                Posted Date: <span>{job.jobPostingDate}</span>
              </p>
              <p className="flex justify-between">
                Application Deadline: <span>{job.applicationDeadline}</span>
              </p>
              <p className="flex justify-between">
                Total Applied: <span>{jobApplicants}</span>
              </p>
              <p className="flex justify-between">
                Job Nature: <span>{job.jobCategory}</span>
              </p>
              <div
                className="btn"
                onClick={() =>
                  document.getElementById("applyModal").showModal()
                }
              >
                <Button1 name="Apply Now"></Button1>
              </div>
            </div>
          </aside>
        </section>

        {/* Modal */}
        <dialog id="applyModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="space-y-4">
              {/* Your Name */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-bold">User Name </label>
                <input
                  type="text"
                  name="userName"
                  defaultValue={user?.displayName}
                  readOnly
                  className="w-full px-6 py-3 rounded-md border outline-0"
                />
              </div>

              {/* Your Email */}
              <div className="flex flex-col gap-2">
                <label className="text-base font-bold">User Email </label>
                <input
                  type="email"
                  name="userEmail"
                  defaultValue={user?.email}
                  readOnly
                  className="w-full px-6 py-3 rounded-md border outline-0"
                />
              </div>

              {/* Resume Link */}
              <div className="flex flex-col gap-2 pb-4">
                <label className="text-base font-bold">Your Resume Link </label>
                <input
                  type="text"
                  name="userResume"
                  placeholder="Paste your resume here"
                  onChange={(e) => setUserResume(e.target.value)}
                  className="w-full px-6 py-3 rounded-md border outline-0"
                />
              </div>

              {/* submit button */}
              <div className="text-center">
                <button
                  onClick={handleSubmitApplication}
                  className="submit w-full bg-[var(--clr-focused)] text-[var(--clr-light)] px-12 py-3 rounded-md hover:rounded-full duration-300 font-bold text-base cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </main>
    </div>
  );
};

export default JobDetails;
