import { useMessagesActions } from "@/hooks/use-messages-actions";
import MessageChat from "./message-chat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);
  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <MessageChat key={message.id} message={message} />
        ))
      )}
    </div>
  );
};
export default MessagesChat;
