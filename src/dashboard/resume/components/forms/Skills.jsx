import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ResumeinfoContext } from "@/context/ResumeinfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: "",
    },
  ]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext);

  const [loading, setLoading] = useState(false);

  const { resumeId } = useParams();

  const AddNewExperience = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const handelChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    GlobalApi.UpdateResumeDetails(resumeId, data).then(
      (res) => {
        setLoading(false);
        console.log(res);
        toast.success("Resume Updated Successfully");
      },
      (err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to Update Resume");
      }
    );
  };

  useEffect(() => {
    setResumeInfo((resumeInfo) => ({
      ...resumeInfo,
      skills: skillsList,
    }));
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your Skills</p>
      <div className="">
        {skillsList.map((item, index) => (
          <div
            className="flex justify-between items-center border rounded-lg p-3 mb-3"
            key={index}
          >
            <div className="">
              <label className="text-xs">Name</label>
              <Input
                onChange={(e) => handelChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 150 }}
              value={item.rating}
              onChange={(v) => handelChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddNewExperience}
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={RemoveExperience}
          >
            - Remove
          </Button>
        </div>
        <Button className="" onClick={onSave} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
