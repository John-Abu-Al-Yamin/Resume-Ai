import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDailog, setOpenDailog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();

    const data = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    GlobalApi.CreateNewResume(data).then(
        (res) => {
          console.log(res.data.data.documentId)
        if (res) {
          setLoading(false);

          navigate(`/dashboard/resume/${res.data.data.documentId}/edit`);
        }

        // console.log(res);

        setOpenDailog(false);
      },
      (err) => {
        setLoading(false);
        console.log(err);
      }
    );
  };
  return (
    <div className="">
      <div
        onClick={() => {
          setOpenDailog(true);
          setResumeTitle("");
        }}
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
      >
        <PlusSquare className="" />
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <span className="">Add a title for your new resume</span>
              <Input
                className="my-2 text-black"
                placeholder="Ex. Full Stack"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDailog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Create"}
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
