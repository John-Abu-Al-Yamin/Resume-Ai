import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeinfoContext } from "@/context/ResumeinfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Education = () => {
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext);

  const AddNewExperience = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        startDate: "",
        degree: "",
        major: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
        data: {
            education: educationList
        }
    }

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then((res) => {
        setLoading(false)
      console.log(res);
      toast.success("Resume Updated Successfully")
    }, (err) => {
      console.log(err);
      setLoading(false)
      toast.error("Failed to Update Resume")
    })
  };

  const handelChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
        ...resumeInfo,
        education:educationList 
    })
      console.log(educationList);
    
  }, [educationList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your education details</p>
      <div className="">
        {educationList?.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="">University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handelChange(e, index)}
                />
              </div>
              <div className="">
                <label className="">Degree</label>
                <Input name="degree" onChange={(e) => handelChange(e, index)} />
              </div>
              <div className="">
                <label className="">Major</label>
                <Input name="major" onChange={(e) => handelChange(e, index)} />
              </div>
              <div className="">
                <label className="">start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  onChange={(e) => handelChange(e, index)}
                />
              </div>
              <div className="">
                <label className="">End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  onChange={(e) => handelChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label className="">Descriotion</label>
                <Textarea name="description" onChange={(e) => handelChange(e, index)} />
              </div>
            </div>
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

export default Education;
