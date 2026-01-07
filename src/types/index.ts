export interface IOllamaModelDetails {
  families: string[];
  family: string;
  format: string;
  parameter_size: number;
  parent_model: string;
  quantization_level: number;
}

export interface IOllamaModel {
  details: IOllamaModelDetails;
  name: string;
  model: string;
  size: number;
  digest: string;
  modified_at: string;
}

export interface IOllamaTagsResponse {
  models: IOllamaModel[];
}

export interface OllamaChatMessage {
  role: "assistant" | "user" | "system";
  content: string;
  images?: string[] | null;
}

export interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: OllamaChatMessage;
  done: boolean;
  done_reason: string;

  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
  error?: string;
}

export interface ImageItem {
  id?: number;
  name: string;
  file: File;
  type: string;
  createdAt: number;
  image_alt_text?: string;
}

export interface ImageDisplay extends ImageItem {
  previewUrl: string;
}

export type StorageType = "local" | "session";
