import moment from "moment";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const axiosSecure = useAxios();

  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const pictureURL = form.pictureURL.value;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const companyLogo = form.companyLogo.value;
    const jobTitle = form.jobTitle.value;
    const jobCategory = form.jobCategory.value;
    const salaryFrom = form.salaryFrom.value;
    const salaryTo = form.salaryTo.value;
    const salaryRange = `$${salaryFrom} - $${salaryTo}`;
    const jobDescription = form.jobDescription.value;
    const jobPostingDate = form.jobPostingDate.value;
    const applicationDeadline = form.applicationDeadline.value;
    const jobApplicants = form.jobApplicants.value;
    const requirements = [
      "Graduation in the related field",
      "Freshers are welcome",
    ];

    const newJob = {
      pictureURL,
      userName,
      userEmail,
      companyLogo,
      jobTitle,
      jobCategory,
      salaryRange,
      jobDescription,
      jobPostingDate,
      applicationDeadline,
      jobApplicants,
      requirements,
    };
    console.log(newJob);

    axiosSecure.post("/jobs", newJob).then((res) => {
      const data = res.data;
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          iconColor: "#7C3AED",
          confirmButtonColor: "#7C3AED",
          title: "Job added in The Database",
          timer: 2500,
        });
        form.reset();
      }
    });
  };

  return (
    <div style={{ minHeight: "calc(100vh - 90px)" }} className="py-12 lg:py-24">
      <Helmet>
        <title>JobQuest | Add Job </title>
      </Helmet>
      <div className="card-style w-full max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-16 space-y-3 rounded-xl">
        <div className="text-center space-y-2">
          <h1 className="font-bold">Post New Job</h1>
          <p>Use this form to add a new job listing to our platform.</p>
        </div>

        <form onSubmit={handleAddJob} className="space-y-6 text-sm pt-10">
          {/* JobTitle Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Write Job Title Here"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* JobCategory Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Job Category</label>
            <select
              name="jobCategory"
              defaultValue="null"
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

          {/* JobBanner Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Job Banner</label>
            <input
              type="text"
              name="pictureURL"
              placeholder="Job Banner Photo URL"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* Company Logo Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Company Logo</label>
            <input
              type="text"
              name="companyLogo"
              placeholder="Company Logo URL"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* Salary Range */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Salary Range</label>
            <div className="flex-1 flex flex-col justify-between md:flex-row gap-6">
              <div className="relative md:w-1/2">
                <input
                  type="number"
                  name="salaryFrom"
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
                  placeholder="Salary"
                  className="w-full px-4 pl-16 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
                />
                <p className="absolute top-1/2 -translate-y-1/2 left-3 font-bold text-[var(--clr-dark-secondary)]">
                  To : $
                </p>
              </div>
            </div>
          </div>

          {/* Posting Date */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Posting Date:</label>
            <input
              type="date"
              name="jobPostingDate"
              defaultValue={moment().format("YYYY-MM-DD")}
              readOnly
              className="flex-1 px-4 py-3 rounded-md border outline-none"
            />
          </div>

          {/* Application Deadline */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Deadline:</label>

            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              name="applicationDeadline"
              className="flex-grow px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            />
          </div>

          {/* JobTitle Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28"> Applicants No.</label>
            <input
              type="number"
              name="jobApplicants"
              defaultValue={0}
              placeholder="0"
              readOnly
              className="flex-1 px-4 py-3 rounded-md border outline-none"
            />
          </div>

          {/* User Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">User Info </label>
            <div className="flex-1 flex flex-col justify-between md:flex-row gap-6">
              <div className="relative md:w-1/2">
                <input
                  type="text"
                  name="userName"
                  defaultValue={user?.displayName}
                  readOnly
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
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-base font-bold w-28">Description</label>
            <textarea
              name="jobDescription"
              id=""
              rows={4}
              placeholder="Write your job description here"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-[var(--clr-focused)]"
            ></textarea>
          </div>

          <div className="text-center md:ml-32">
            <input
              type="submit"
              className="submit w-full bg-[var(--clr-focused)] text-[var(--clr-light)] px-12 py-4 rounded-md hover:rounded-full duration-300 font-bold text-base cursor-pointer"
              value="Submit Job"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
