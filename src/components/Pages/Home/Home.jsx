import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import HomeBanner from "./Banner/HomeBanner";
import JobCategory from "./JobCategory/JobCategory";
import { Helmet } from "react-helmet-async";
import TopCompanies from "./TopCompanies/TopCompanies";
import JobService from "./jobService/JobService";

const Home = () => {
  const axiosSecure = useAxios();
  const { isPending, data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const data = await axiosSecure.get("/jobs");
      return data.data;
    },
  });

  if (isPending) {
    return (
      <span className="loading loading-bars loading-lg text-[var(--clr-focused)]"></span>
    );
  }

  return (
    <div>
      <Helmet>
        <title>JobQuest | Home </title>
      </Helmet>
      {/* Banner Page */}
      <HomeBanner></HomeBanner>

      <main>
        {/* Service Section */}
        <JobService></JobService>


        {/* Job Category Section */}
        <JobCategory jobs={jobs} id="jobs"></JobCategory>

        {/* Top Companies Section */}
        <TopCompanies></TopCompanies>
      </main>
    </div>
  );
};

export default Home;
