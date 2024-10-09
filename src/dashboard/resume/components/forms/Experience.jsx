import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeinfoContext } from "@/context/ResumeinfoContext";

const formfiled = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  // currentlyWorking: true,
  workSummery: "",
};
const Experience = () => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext);

  const handelChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const [experienceList, setExperienceList] = useState([formfiled]);
  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formfiled }]);
  };
  

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handelRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };
  useEffect(() => {
    console.log(experienceList);
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    })
  }, [experienceList]);

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous job experience</p>

        <div className="">
          {experienceList.map((item, index) => (
            <div className="" key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="">
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handelChange(index, event)}
                  />
                </div>
                <div className="">
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handelChange(index, event)}
                  />
                </div>
                <div className="">
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handelChange(index, event)}
                  />
                </div>
                <div className="">
                  <label className="text-xs">state</label>
                  <Input
                    name="state"
                    onChange={(event) => handelChange(index, event)}
                  />
                </div>
                <div className="">
                  <label className="text-xs">Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(event) => handelChange(index, event)}
                  />
                </div>
                <div className="">
                  <label className="text-xs">End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(event) => handelChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                  index={index}                                                                                                                                                                                                                                                                                                         
                    OnRichTextEditorChange={(event) =>
                      handelRichTextEditor(event, "workSummery", index)
                    }
                  />
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
          <Button className="">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
