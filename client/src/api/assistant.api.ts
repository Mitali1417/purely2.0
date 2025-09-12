import api from "./index";

export interface AssistantMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AssistantResponse {
  id: string;
  messages: AssistantMessage[];
  createdAt: string;
}

export type MessagePayload = {
  message: string;
  filters?: {
    category?: string;
    search?: string;
    profile?: any;
  };
};

export const assistantAPI = {
  // Send message and get response (with optional streaming)
  suggest: async (payload: { messages: AssistantMessage[], filters?: any }): Promise<any> => {
    const res = await api.post("/assistant/suggest", payload);
    return res.data;
  },

  sendMessage: async (payload: MessagePayload, stream?: boolean): Promise<AssistantResponse | ReadableStream> => {
    const endpoint = stream ? "/assistant/stream" : "/assistant/suggest";
    const config = stream ? { responseType: "stream" as const } : undefined;
    
    const res = await api.post(endpoint, {
      messages: [{ role: "user", content: payload.message }],
      filters: payload.filters
    }, config);
    
    return res.data;
  },

  // Manage conversation history
  history: {
    get: async (): Promise<AssistantResponse[]> => {
      const res = await api.get("/assistant/history");
      return res.data;
    },
    
    clear: async (): Promise<void> => {
      await api.delete("/assistant/history");
    },
  },
};
