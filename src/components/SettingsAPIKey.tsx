import {
  BrushCleaningIcon,
  ClockFadingIcon,
  ClockIcon,
  EraserIcon,
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  KeyRoundIcon,
} from "lucide-react";
import { useId, useState, type ChangeEvent } from "react";

import { OLLAMA_CLOUD_API_KEY_STORAGE_KEY } from "@/constants";
import { useBrowserStorage } from "@/hooks/useBrowserStorage";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SettingsAPIKey = () => {
  const id = useId();

  const [isVisible, setIsVisible] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const {
    value,
    storageType,

    saveToLocalStorage,
    saveToSessionStorage,
    clearStorage,
  } = useBrowserStorage(OLLAMA_CLOUD_API_KEY_STORAGE_KEY);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputKey(value);
  };

  const onVisibleButtonClick = () => {
    setIsVisible((prevState) => !prevState);
  };

  const onSaveToSessionStorageButtonClick = () => {
    if (inputKey) {
      saveToSessionStorage(inputKey);
    }
  };

  const onSaveToLocalStorageButtonClick = () => {
    if (inputKey) {
      saveToLocalStorage(inputKey);
    }
  };

  const onClearStorageButtonClick = () => {
    clearStorage();
  };

  const onClearInputButtonClick = () => {
    setInputKey("");
  };

  const isValueEmpty = value === null;
  const isLocalValueEmpty =
    inputKey === "" || inputKey === null || inputKey.trim() === "";

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-start gap-2">
        <Label htmlFor={id} className="inline-flex items-center gap-1">
          <span>Please enter your API key</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="inline size-3 text-rose-500" />
            </TooltipTrigger>
            <TooltipContent>
              <span className="flex w-50 text-pretty">
                NOTE: Without API key, Ollama Cloud will not work. You won't be
                able to generate alt text for the images. You can find your API
                key in your Ollama Cloud account.
              </span>
            </TooltipContent>
          </Tooltip>
        </Label>

        <div className="relative w-full">
          <Input
            id={id}
            value={inputKey}
            onChange={onInputChange}
            type={isVisible ? "text" : "password"}
            placeholder="Paste your API Key here"
            className="w-full pr-9"
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={onVisibleButtonClick}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? "Hide API Key" : "Show API Key"}
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {!isLocalValueEmpty && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onClearInputButtonClick}
                  variant="outline"
                  size="icon-sm"
                  className="border-sky-600 text-sky-600! hover:bg-sky-600/10 focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:border-sky-400 dark:text-sky-400! dark:hover:bg-sky-400/10 dark:focus-visible:border-sky-400 dark:focus-visible:ring-sky-400/40"
                  disabled={isLocalValueEmpty}
                >
                  <BrushCleaningIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-50">
                <p>Clear input</p>
              </TooltipContent>
            </Tooltip>
          )}

          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onSaveToSessionStorageButtonClick}
                  variant={
                    !isValueEmpty && storageType === "session"
                      ? "default"
                      : "outline"
                  }
                  size="icon-sm"
                  disabled={isLocalValueEmpty}
                >
                  <ClockFadingIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-50">
                <p>
                  The key will be stored in session storage. As long as the
                  tab/window is open, the key will be available
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onSaveToLocalStorageButtonClick}
                  variant={
                    !isValueEmpty && storageType === "local"
                      ? "default"
                      : "outline"
                  }
                  size="icon-sm"
                  disabled={isLocalValueEmpty}
                >
                  <ClockIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-50">
                <p>
                  The key will be stored in local storage. The key will be
                  available even if the tab/window is closed
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onClearStorageButtonClick}
                  disabled={isValueEmpty}
                  variant={isValueEmpty ? "outline" : "destructive"}
                  size="icon-sm"
                >
                  <EraserIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-50">
                <p>
                  Clear the API key from storage. The key will be removed from
                  currently used storage
                </p>
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>

          {!isValueEmpty && (
            <ButtonGroup>
              <Popover>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon-sm"
                        className="bg-transparent bg-linear-to-r from-amber-600 via-amber-600/60 to-amber-600 bg-size-[200%_auto] text-white hover:bg-transparent hover:bg-position-[99%_center] focus-visible:ring-amber-600/20 dark:from-amber-400 dark:via-amber-400/60 dark:to-amber-400 dark:focus-visible:ring-amber-400/40"
                      >
                        <KeyRoundIcon />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show your API key</p>
                  </TooltipContent>
                </Tooltip>

                <PopoverContent>
                  <p>Your API KEY:</p>
                  <p className="font-semibold wrap-break-word">{value}</p>
                </PopoverContent>
              </Popover>
            </ButtonGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsAPIKey;
