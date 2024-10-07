import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  return (
    <Link to={`/dashboard/resume/${resume?.documentId}/edit`} className="">
      <div className="p-14 flex items-center justify-center bg-secondary h-[280px] border rounded-lg border-primary hover:scale-105 transition-all hover:shadow-sm cursor-pointer">
        <Notebook />
      </div>

      <h2 className="text-center my-1">{resume?.title}</h2>
    </Link>
  );
};

export default ResumeCardItem;
