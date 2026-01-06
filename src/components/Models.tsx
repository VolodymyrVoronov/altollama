import { HardDriveIcon, InfoIcon } from "lucide-react";

import { renderBytes } from "@/helpers";
import type { IOllamaModel } from "@/types";

import { Pill } from "@/components/kibo-ui/pill";
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
            <span> Select a model to get started</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="inline size-3" />
              </TooltipTrigger>
              <TooltipContent>
                <span className="flex w-50 text-balance">
                  NOTE: Please use only models, which support the image
                  processing, otherwise the prompt will not work and the alt
                  text will not be generated
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
            className="grid h-full grid-cols-1 content-start items-start gap-2 overflow-y-auto"
          >
            {models?.map((model) => (
              <FieldLabel key={model.name} htmlFor={model.name}>
                <Field orientation="horizontal">
                  <FieldContent className="flex flex-col gap-1">
                    <FieldTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Pill variant="default" className="px-2 py-1">
                            {model.name}
                          </Pill>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Model name</p>
                        </TooltipContent>
                      </Tooltip>
                    </FieldTitle>

                    <FieldDescription className="m-0! flex flex-row flex-wrap gap-1">
                      {model.details.family ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Pill variant="outline" className="px-2 py-1">
                              {model.details.family}
                            </Pill>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Model family</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null}

                      {model.details.format ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Pill variant="outline" className="px-2 py-1">
                              {model.details.format}
                            </Pill>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Model format</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null}

                      {model.details.parameter_size ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Pill variant="outline" className="px-2 py-1">
                              {model.details.parameter_size}
                            </Pill>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Model parameter size</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null}

                      {model.details.quantization_level ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Pill variant="outline" className="px-2 py-1">
                              {model.details.quantization_level}
                            </Pill>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Model quantization level</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </FieldDescription>

                    {model.size ? (
                      <FieldDescription className="m-0!">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Pill variant="secondary" className="px-2 py-1">
                              {renderBytes(model.size)} <HardDriveIcon />
                            </Pill>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Model file size</p>
                          </TooltipContent>
                        </Tooltip>
                      </FieldDescription>
                    ) : null}
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
