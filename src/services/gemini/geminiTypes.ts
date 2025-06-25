
export interface GeminiSettings {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ContentGenerationRequest {
  cityName: string;
  serviceName: string;
  subServiceName?: string;
  contentType: 'page' | 'faq' | 'description' | 'meta';
  targetLength: 'short' | 'medium' | 'long';
}
