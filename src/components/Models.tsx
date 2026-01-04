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
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <FieldLabel>Ollama models available locally</FieldLabel>
          <FieldDescription>Select a model to get started.</FieldDescription>
        </div>

        <ScrollArea className="h-100 w-full">
          <RadioGroup
            value={model || ""}
            onValueChange={onModelChange}
            disabled={disabled}
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
        </ScrollArea>
      </FieldSet>
    </FieldGroup>
  );
};

export default Models;
