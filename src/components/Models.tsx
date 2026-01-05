import { InfoIcon } from "lucide-react";

import type { IOllamaModel } from "@/types";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface IModelsProps {
  models?: IOllamaModel[];
  model?: string;
  disabled?: boolean;

  onModelChange?: (model: string | undefined) => void;
}

const Models = ({ models, model, disabled, onModelChange }: IModelsProps) => {
  return (
    <FieldGroup>
      <FieldSet className="flex flex-col gap-2">
        <div className="flex flex-col">
          <FieldLabel>Ollama models available locally </FieldLabel>
          <FieldDescription className="inline-flex items-center gap-1 text-blue-500">
            <span> Select a model to get started.</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="inline size-3" />
              </TooltipTrigger>
              <TooltipContent>
                <span className="flex w-50 text-balance">
                  NOTE: Please use only models, which support the image
                  processing, otherwise the prompt will not work and the alt
                  text will not be generated.
                </span>
              </TooltipContent>
            </Tooltip>
          </FieldDescription>
        </div>

        <div className="h-[calc(100svh-400px)] w-full overflow-hidden">
          <RadioGroup
            value={model || ""}
            onValueChange={onModelChange}
            disabled={disabled}
            className="grid h-full grid-cols-1 items-start gap-2 overflow-y-auto xl:grid-cols-2"
          >
            {models?.map((model) => (
              <FieldLabel key={model.name} htmlFor={model.name}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{model.name}</FieldTitle>
                    <FieldDescription>
                      {model.details.family} / {model.details.format} /{" "}
                      {model.details.parameter_size} /{" "}
                      {model.details.quantization_level}
                    </FieldDescription>
                  </FieldContent>

                  <RadioGroupItem value={model.name} id={model.name} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
      </FieldSet>
    </FieldGroup>
  );
};

export default Models;
