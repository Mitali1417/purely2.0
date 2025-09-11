import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { RotateCcw } from "lucide-react";
import { useAssistantChat } from "@/hooks/useAssistantChat";
import { ChatInterface } from "./components/ChatInterface";

const AssistantPage = () => {
  const {
    messages,
    isLoading,
    recommendedProducts,
    sendMessage,
    sendQuickQuestion,
    clearChat,
  } = useAssistantChat();

  const handleQuickQuestion = (question: string) => {
    sendQuickQuestion(question);
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/15 rounded-full text-2xl">
              🤍
            </div>
            <div>
              <h5 className="mb-0">Mira</h5>
              <p>Your skin’s new best friend!</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Main Content - Centered Chat */}
      <div className="flex flex-col">
        <Card
          className={`flex flex-col ${
            messages.length === 1 ? "h-[60vh]" : "h-[90vh]"
          }  overflow-hidden py-0`}
        >
          <CardContent
            className="p-0 overflow-y-auto"
            style={{
              backgroundImage:
                'url("https://res.cloudinary.com/duju3bhds/image/upload/v1757323648/Untitled_design_1_bu7lyt.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <ChatInterface
              products={recommendedProducts}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              messages={messages}
              onQuickQuestion={handleQuickQuestion}
              hasProducts={recommendedProducts.length > 0}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssistantPage;
