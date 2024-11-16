import {motion} from 'framer-motion';
import {fadeIn} from '../../../../Variants/Variants';
import { IoBriefcase } from "react-icons/io5";
import Button2 from "../../../Shared/Buttons/Button2";
import { BsFacebook, BsGoogle, BsMicrosoft } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import SecHeader from "../../../Shared/SecHeader/SecHeader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";

const JobCategory = ({ jobs }) => {
  const {user} = useContext(AuthContext);
  const [targetedJobs, setTargetedJobs] = useState(jobs);
  const categories = ["All", "On Site", "Hybrid", "Part-Time", "Remote"];

  const handleJobCategory = (category) => {
    if (category === "All") {
      return setTargetedJobs(jobs);
    } else {
      const categorized = jobs.filter((job) => job.jobCategory === category);
      return setTargetedJobs(categorized);
    }
  };

  const handleShowNotification = () => {
    !user && Swal.fire({
      title: "You have to log in first to view details",
      showConfirmButton: false,
      color:"#7C3AED",
      timer: 2500,
    });
  };

  return (
    <section>
     
      <SecHeader
        name="Category"
        title="Discover Jobs in Your Field"
      ></SecHeader>
 

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-6">
        <div className="lg:col-span-2 xl:col-span-3">
          <Tabs className="">
            <TabList>
              {categories.map((category, idx) => (
                <Tab key={idx} onClick={() => handleJobCategory(category)}>
                  {category}
                </Tab>
              ))}
            </TabList>
            {categories.map((category, idx) => (
              <TabPanel key={idx}>
                <div className="space-y-12 mt-8">
                  {targetedJobs.map((job) => (
                    <div
                      key={job._id}
                      className="card-style flex flex-col md:flex-row gap-6 p-6 md:p-8 border rounded-md hover:border-[var(--clr-focused)]"
                    >
                      <div className="w-20 h-20 p-4 border rounded-lg bg-[var(--clr-light-primary)]">
                        <img src={job?.companyLogo} alt="" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <h4>{job?.jobTitle}</h4>
                        <small>Posted by : {job.userName}</small>
                        <div className="flex gap-6 justify-between">
                          <p className="text-[var(--clr-focused)] text-lg font-bold">
                            {job?.salaryRange}
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
                      <div>
                        <div>
                          <Link to={`/job/${job._id}`}>
                            <button
                              className="bg-[var(--clr-focused-light)] px-4 py-1.5 rounded font-bold text-[var(--clr-focused)] hover:scale-95 duration-300"
                              onClick={handleShowNotification}
                            >
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>

        <aside className="flex flex-col md:flex-row lg:flex-col gap-6 mt-20">
          {/* Post a Job card*/}
          <div className="p-8 border rounded-xl shadow-xl space-y-2 card-style md:w-1/2 lg:w-full flex flex-col justify-between">
            <IoBriefcase className="p-2 text-5xl bg-[--clr-focused-light] rounded text-[var(--clr-focused)]" />
            <h3>Post a job today</h3>
            <p className="pb-4 flex-1">
              Fill vacancies fast! Post your job now and connect with top talent
              on JobQuest
            </p>
            <Link to="/addJobs">
            <Button2 text="Post a job"></Button2>
            </Link>
          </div>

          {/* Our Featured Companies */}
          <div className="p-8 border rounded-xl shadow-xl space-y-6 card-style md:w-1/2 lg:w-full">
            <h3>Featured Companies</h3>
            <div className="space-y-4">
              {/* Microsoft */}
              <div className="flex items-center gap-2 hover:text-[var(--clr-focused)] cursor-pointer pr-4 hover:pr-0">
                <BsMicrosoft className="p-2 text-5xl bg-[var(--clr-light)] border-2 rounded-md text-[var(--clr-focused)]" />
                <p className="flex-1">Microsoft</p>{" "}
                <FaLongArrowAltRight className="text-2xl" />
              </div>
              {/* google */}
              <div className="flex items-center gap-2 hover:text-[var(--clr-focused)] cursor-pointer pr-4 hover:pr-0 ">
                <BsGoogle className="p-2 text-5xl bg-[var(--clr-light)] border-2 rounded-md text-[var(--clr-focused)]" />
                <p className="flex-1">Google</p>{" "}
                <FaLongArrowAltRight className="text-2xl" />
              </div>
              {/* Facebook */}
              <div className="flex items-center gap-2 hover:text-[var(--clr-focused)] cursor-pointer pr-4 hover:pr-0 ">
                <BsFacebook className="p-2 text-5xl bg-[var(--clr-light)] border-2 rounded-md text-[var(--clr-focused)]" />
                <p className="flex-1">Facebook</p>{" "}
                <FaLongArrowAltRight className="text-2xl" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

JobCategory.propTypes = {
  jobs: PropTypes.array,
};

export default JobCategory;
