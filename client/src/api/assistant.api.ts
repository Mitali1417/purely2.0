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

export const assistantAPI = {
  suggest: async (payload: {
    messages: { role: "user" | "assistant" | "system"; content: string }[];
    filters?: { category?: string; search?: string; profile?: any };
  }) => {
    const res = await api.post("/assistant/suggest", payload);
    return res.data;
  },
  // Send a single prompt and get response
  ask: async (message: string): Promise<AssistantResponse> => {
    const res = await api.post("/assistant/ask", { message });
    return res.data;
  },

  // Streaming chat (if backend supports SSE or WS)
  streamAsk: async (message: string): Promise<ReadableStream> => {
    const res = await api.post(
      "/assistant/stream",
      { message },
      { responseType: "stream" }
    );
    return res.data;
  },

  // Conversation history
  getHistory: async (): Promise<AssistantResponse[]> => {
    const res = await api.get("/assistant/history");
    return res.data;
  },

  // Clear history
  clearHistory: async (): Promise<void> => {
    await api.delete("/assistant/history");
  },

  // Save context (optional: user-specific data or preferences)
  saveContext: async (context: Record<string, any>): Promise<void> => {
    await api.post("/assistant/context", context);
  },
};
