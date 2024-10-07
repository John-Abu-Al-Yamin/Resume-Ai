import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeinfoContext } from "@/context/ResumeinfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PersonalDetail = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, [params]);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      [name]: value,
    }));
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: formData };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Personal Details Updated");

      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form className="" onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm" htmlFor="firstName">
              First Name
            </label>
            <Input
              name="firstName"
              placeholder="First name"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="lastName">
              Last Name
            </label>
            <Input
              name="lastName"
              placeholder="Last name"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm" htmlFor="jobTitle">
              Job Title
            </label>
            <Input
              name="jobTitle"
              placeholder="Job Title"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm" htmlFor="address">
              Address
            </label>
            <Input
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.address}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="phone">
              Phone
            </label>
            <Input
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <Input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
