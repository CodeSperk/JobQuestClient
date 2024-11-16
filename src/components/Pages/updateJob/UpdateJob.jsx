import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [deadline, setDeadLine] = useState(new Date());
  const navigate = useNavigate();

  const { isPending, data: job } = useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      const data = await axiosSecure.get(`/job/${id}`);
      setDeadLine(data.data?.applicationDeadline);
      return data.data;
    },
  });
  if (isPending) {
    return (
      <span className="loading loading-bars loading-lg text-[var(--clr-focused)]"></span>
    );
  }

  const salaryRangeArray = job?.salaryRange.split("-");
  const extractedNumbers = salaryRangeArray.map((part) => {
    const numbersOnly = part.replace(/[^0-9]/g, "");
    return parseInt(numbersOnly, 10);
  });
  const salaryFrom = extractedNumbers[0];
  const salaryTo = extractedNumbers[1];

  // handle Update
  const handleUpdateJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const pictureURL = form.pictureURL.value;
    const userName = form.userName.value;
    const companyLogo = form.companyLogo.value;
    const jobTitle = form.jobTitle.value;
    const jobCategory = form.jobCategory.value;
    const salaryFrom = form.salaryFrom.value;
    const salaryTo = form.salaryTo.value;
    const salaryRange = `$${salaryFrom} - $${salaryTo}`;
    const jobDescription = form.jobDescription.value;
    const applicationDeadline = form.jobDeadline.value;

    const newJob = {
      pictureURL,
      userName,
      companyLogo,
      jobTitle,
      jobCategory,
      salaryRange,
      jobDescription,
      applicationDeadline,
    };

    axiosSecure.put(`/jobs/${job._id}`, newJob)
    .then(res => {
      if(res.data.modifiedCount>0){
        Swal.fire({
          icon: "success",
          iconColor: "#2D2F81",
          confirmButtonColor: "#2D2F81",
          title: "Job Updated Successfully",
          timer: 2500
        });
        navigate("/")
      }
    })
  };
  

  return (
    <div>
      <Helmet>
        <title>JobQuest | Update </title>
      </Helmet>

      {/* Jobs Update form */}
      <section className="card-style w-full max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-16 space-y-3 rounded-xl">
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[var(--clr-focused)]">
            Update Your Job info
          </h1>
        </div>

        <form onSubmit={handleUpdateJob} className="space-y-6 text-sm pt-10">
          {/* JobTitle & Job Category Field */}
          <div className="flex flex-col justify-between md:flex-row gap-6">
            <div className="md:w-1/2 flex flex-col gap-2">
              <label className="text-base font-bold w-28">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                defaultValue={job?.jobTitle}
                placeholder="Write Job Title Here"
                className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
              />
            </div>

            {/* JobCategory Field */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <label className="text-base font-bold w-28">Job Category</label>
              <select
                name="jobCategory"
                defaultValue={job?.jobCategory}
                className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
              >
                <option value="null" className="">
                  Select Country
                </option>
                <option value="On Site">On Site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
          </div>

          {/* JobBanner & logo Field */}
          <div className="flex flex-col justify-between md:flex-row gap-6">
            <div className="md:w-1/2 flex flex-col gap-2">
              <label className="text-base font-bold w-28">Job Banner</label>
              <input
                type="text"
                name="pictureURL"
                defaultValue={job?.pictureURL}
                placeholder="Job Banner Photo URL"
                className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
              />
            </div>

            {/* Company Logo Field */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <label className="text-base font-bold w-28">Company Logo</label>
              <input
                type="text"
                name="companyLogo"
                defaultValue={job?.companyLogo}
                placeholder="Company Logo URL"
                className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
              />
            </div>
          </div>

          {/* Salary Range */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-bold w-28">Salary Range</label>
            <div className="flex-1 flex flex-col justify-between md:flex-row gap-6">
              <div className="relative md:w-1/2">
                <input
                  type="number"
                  name="salaryFrom"
                  defaultValue={salaryFrom}
                  placeholder="Salary"
                  className="w-full px-4 pl-20 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
                />
                <p className="absolute top-1/2 -translate-y-1/2 left-3 font-bold text-[var(--clr-dark-secondary)]">
                  Form : $
                </p>
              </div>

              <div className="relative md:w-1/2">
                <input
                  type="number"
                  name="salaryTo"
                  defaultValue={salaryTo}
                  placeholder="Salary"
                  className="w-full px-4 pl-16 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
                />
                <p className="absolute top-1/2 -translate-y-1/2 left-3 font-bold text-[var(--clr-dark-secondary)]">
                  To : $
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between md:flex-row gap-6">
            {/* Posting Date field*/}
            <div className="md:w-1/2 flex flex-col gap-2">
              <label className="text-base font-bold w-28">Posting Date:</label>
              <input
                type="date"
                name="jobPostingDate"
                defaultValue={job?.jobPostingDate}
                readOnly
                className="flex-1 px-4 py-3 rounded-md border outline-none"
              />
            </div>

            {/* Jop Application */}
            <div className="md:w-1/2 flex flex-col gap-2">
              <label className=" text-base font-bold w-28">
                {" "}
                Applicants No.
              </label>
              <input
                type="number"
                name="jobApplicants"
                defaultValue={job?.jobApplicants}
                placeholder="0"
                readOnly
                className="flex-1 px-4 py-3 rounded-md border outline-none"
              />
            </div>
          </div>

          {/* Application Deadline*/}
          <div className="flex flex-col gap-2">
            <label className="text-base font-bold w-28">Deadline:</label>

            <DatePicker
              selected={deadline}
              onChange={(deadline) => setDeadLine(deadline)}
              dateFormat="yyyy-MM-dd"
              name="jobDeadline"
              className="flex-grow px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* User Field */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-bold w-28">User Info </label>
            <div className="flex-1 flex flex-col justify-between md:flex-row gap-6">
              <div className="relative md:w-1/2">
                <input
                  type="text"
                  name="userName"
                  defaultValue={user?.displayName}
                  className="w-full px-4 pl-16 py-3 rounded-md border outline-0"
                />
                <p className="absolute top-1/2 -translate-y-1/2 left-3 font-bold text-[var(--clr-dark-secondary)]">
                  Name :
                </p>
              </div>

              <div className="relative md:w-1/2">
                <input
                  type="email"
                  name="userEmail"
                  defaultValue={user?.email}
                  readOnly
                  className="w-full px-4 pl-16 py-3 rounded-md border outline-0"
                />
                <p className="absolute top-1/2 -translate-y-1/2 left-3 font-bold text-[var(--clr-dark-secondary)]">
                  Email :
                </p>
              </div>
            </div>
          </div>

          {/* JobDescription Field */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-bold w-28">Description</label>
            <textarea
              name="jobDescription"
              id=""
              rows={4}
              defaultValue={job?.jobDescription}
              placeholder="Write your job description here"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            ></textarea>
          </div>

          <div className="text-center">
            <input
              type="submit"
              className="submit w-full bg-[var(--clr-focused)] text-[var(--clr-light)] px-12 py-4 rounded-md hover:rounded-full duration-300 font-bold text-base cursor-pointer"
              value="Update Job"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
