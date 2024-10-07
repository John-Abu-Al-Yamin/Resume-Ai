import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeinfoContext } from "@/context/ResumeinfoContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { AiChatSession } from "../../../../../service/AiModal";

const prompt = `job Title: {jobTitle} , depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and Summery with Experience level for Fresher, Mid-Level,Experienced. `;
const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext);
  const [summery, setSummery] = useState("");
  const [loading, setLoading] = useState(false);
  const[aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (summery) {
      setResumeInfo((prev) => ({
        ...prev,
        summery: summery,
      }));
    }
  }, [summery, setResumeInfo]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AiChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummaryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Summery Updated");
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">ٍSummery</h2>
        <p>Add Summary for your job title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Add Summery</label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-primary text-primary flex gap-2"
              onClick={() => GenerateSummeryFromAI()}
            >
              <Brain className="w-4 h-4" /> Generate Form AI
            </Button>
          </div>
          <Textarea
            className="mt-3"
            onChange={(e) => setSummery(e.target.value)}
            required
          />
          <div className="mt-2 flex justify-end">
            <Button disabled={loading} size="sm" type="submit">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummaryList && (
        
      <div className="">
        <h2 className="font-bold text-lg">Suggestion</h2>
        {aiGeneratedSummaryList.map((item, index) => (
          <div className="" key={index}>
            <h2>Level:{item?.experienceLevel}</h2>
            <p>{item?.summery}</p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Summery;
