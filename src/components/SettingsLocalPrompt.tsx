import { useAtomValue, useSetAtom } from "jotai";

import { cn } from "@/lib/utils";
import { userPrompt } from "@/stores/app";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const SettingsLocalPrompt = () => {
  const prompt = useAtomValue(userPrompt);
  const setUserPrompt = useSetAtom(userPrompt);

  const isPromptEmpty = prompt.trim() === "";

  return (
    <div className="mx-0.5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="prompt" className="inline-flex items-center">
          <span>Your Prompt</span>

          {isPromptEmpty && (
            <span className="text-red-500">(Prompt is required)</span>
          )}
        </Label>

        <Textarea
          id="prompt"
          className={cn("h-50 resize-none", {
            "bg-destructive/10": isPromptEmpty,
          })}
          value={prompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Enter a prompt..."
        />
      </div>
    </div>
  );
};

export default SettingsLocalPrompt;
