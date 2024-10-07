import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

const Dashboard = () => {
  const { user } = useUser();
  const [resumesList, setResumesList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  // Used to Get Users Resumes List
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        const resumes = res?.data?.data; 
  
        if (Array.isArray(resumes)) {
          setResumesList(resumes);
        } else {
          console.error("Unexpected data format:", resumes);
          setResumesList([]); 
        }
      })
      .catch((err) => {
        console.error("Error fetching resumes:", err);
        setResumesList([]); 
      });
  };
  
  return (
    <div className="p-10 md:p-20 lg:px-32">
      <h2 className="font bold text-2xl">My Resume</h2>
      <p className="">Start Creating AI resume to your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumesList.length > 0 &&
          resumesList?.map((resume, index) => (
            <ResumeCardItem key={index} resume={resume} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
