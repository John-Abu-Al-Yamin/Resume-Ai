import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";

const FormSection = () => {
  const [activeFormeIndex, setActiveFormeIndex] = useState(1);

  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="flex gap-2 ">
          <LayoutGrid /> Them
        </Button>
        <div className="flex gap-2">
          {activeFormeIndex > 1 && (
            <Button
              size="sm"
              className=" "
              onClick={() => setActiveFormeIndex(activeFormeIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}

          <Button
            className="flex gap-2 "
            size="sm"
            onClick={() => setActiveFormeIndex(activeFormeIndex + 1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormeIndex == 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormeIndex == 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormeIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormeIndex == 4 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : activeFormeIndex == 5 ? (
        <Skills enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Summery */}

      {/* Professional Experience */}

      {/* Education detail */}

      {/* Skills */}
    </div>
  );
};

export default FormSection;
