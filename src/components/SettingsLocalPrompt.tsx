import { useAtomValue, useSetAtom } from "jotai";
import { InfoIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { userPrompt } from "@/stores/app";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const SettingsLocalPrompt = () => {
  const prompt = useAtomValue(userPrompt);
  const setUserPrompt = useSetAtom(userPrompt);

  const isPromptEmpty = prompt.trim() === "";

  return (
    <div className="mx-0.5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="prompt" className="inline-flex w-full items-center">
          <span>Your Prompt</span>

          {isPromptEmpty && (
            <small className="text-red-500">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="inline size-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter your prompt, or default one will be used</p>
                </TooltipContent>
              </Tooltip>
            </small>
          )}
        </Label>

        <Textarea
          id="prompt"
          className={cn("h-50 resize-none", {
            "bg-destructive/10": isPromptEmpty,
          })}
          value={prompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
      </div>
    </div>
  );
};

export default SettingsLocalPrompt;
