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
