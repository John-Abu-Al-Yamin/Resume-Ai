import { Button } from "@/components/ui/button";
import { ResumeinfoContext } from "@/context/ResumeinfoContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AiChatSession } from "../../../../service/AiModal";
import { toast } from "sonner";

const PROMPT =
  "position title: {positionTitle} , depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and Summery with Experience level for Fresher, Mid-Level,Experienced. ";

const RichTextEditor = ({ OnRichTextEditorChange, index }) => {
  const [value, setValue] = useState();

  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeinfoContext);
  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast.error("Please Enter Position Title");
      return;
    }

    setLoading(true);

    try {
      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo.experience[index].title
      );
      const result = await AiChatSession.sendMessage(prompt);
      const rawResponse = await result.response.text(); // Get raw response
      console.log("Raw AI Response:", rawResponse); // Log raw response

      // Clean the response by wrapping the multiple JSON objects in an array if necessary
      const cleanResponse = `[${rawResponse}]`; // Wrap the response in an array

      const jsonRes = JSON.parse(cleanResponse); // Parse the cleaned response
      setValue(jsonRes[0].summary); // Assuming you need the first summary
      toast.success("Summary generated successfully");
    } catch (error) {
      toast.error("Failed to generate summary. Please try again.");
      console.error("Error parsing response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between my-3">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          className="flex gap-2 border-primary text-primary"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
        >
          <Brain size={20} className="h-4 w-4" />{" "}
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Generate From AI"
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            OnRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </>
  );
};

export default RichTextEditor;
