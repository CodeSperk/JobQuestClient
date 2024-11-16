import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useRef } from 'react';

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [jobs, setJobs] = useState([]);

  const { isPending, data: appliedJobs } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: async () => {
      const data = await axiosSecure.get(`/appliedJobs?email=${user?.email}`);
      setJobs(data.data);
      return data.data;
    },
  });

  const MyDocument = () => (
    <Document className="mx-auto">
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Applied Jobs Summary</Text>
          {jobs.map(job => (
            <View key={job._id} style={styles.jobContainer}>
              <Text>{job.jobTitle}</Text>
              <Text>{job.jobCategory}</Text>
              <Text>{job.salaryRange}</Text>
              {/* Add more fields as needed */}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  //to display loader while data is loading
  if (isPending) {
    return (
      <span className="loading loading-bars loading-lg text-[var(--clr-focused)]"></span>
    );
  }

  const handleAppliedJobs = (event) => {
    const searchedCategory = event.target.value;
    if(searchedCategory === "all"){
      setJobs(appliedJobs);
      return;
    }
    const filteredJobs = appliedJobs.filter(job => job.jobCategory.toLowerCase().includes(searchedCategory.toLocaleLowerCase()));
    setJobs(filteredJobs);
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    jobContainer: {
      marginBottom: 10
    }
  });

  return (
    <div>
      <Helmet>
        <title>JobQuest | Applied Jobs </title>
      </Helmet>

      {/* Applied page banner */}
      <div className="card-style px-4 md:px-10 lg:pl-20 rounded-xl py-16 flex justify-center items-center">
        <div className="text-center">
          <h1 className="mb-4">
            <span className="text-[var(--clr-focused)]">Your Applied Jobs</span>
            <br />  Explore Your Professional Journey
          </h1>

          <div className="relative flex items-center justify-center ">
            <select value={""} onChange={handleAppliedJobs} className="px-8 py-2 rounded-lg outline-none">
              <option value="">Select Category</option>
              <option value="all">All Categories</option>
              <option value="Remote">Remote</option>
              <option value="Part-time">Part-time</option>
              <option value="On Site">On Site</option>
              <option value="Hybrid">Hybrid</option>
              {/* Add more options based on your job categories */}
            </select>
          </div>
        </div>
      </div>

      <div className="p-2 mx-auto sm:p-4 mt-8 min-h-96">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="">
              <tr className="text-left">
                <th className="p-3">Job Banner</th>
                <th className="p-3">Job Title</th>
                <th className="p-3">Job Category</th>
                <th className="p-3">Salary Range</th>
                <th className="p-3">View Details</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id} className="border-b border-opacity-20">
                  <td className="p-3">
                    <img src={job?.pictureURL} alt="" className="h-16 w-auto"/>
                  </td>
                  <td className="p-3">
                    <p>{job?.jobTitle}</p>
                  </td>
                  <td className="p-3">
                    <p>{job?.jobCategory}</p>
                  </td>
                  <td className="p-3">
                    <p>{job?.salaryRange}</p>
                  </td>
                  <td className="p-3">
                    <Link to={`/job/${job?._id}`}>
                      <button className="px-3 py-1 font-semibold rounded-md bg-[var(--clr-focused)] text-[var(--clr-light)]">
                        Details
                      </button>                  
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PDFViewer width="1000" height="600">
        <MyDocument />
      </PDFViewer>     

    </div>
  );
};

export default AppliedJobs;
