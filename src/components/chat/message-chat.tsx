import type { Message } from "@/schemas/room.schemas";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: Message;
}
const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();

  const isFriend = user?.uid !== message.senderId;

  // No se pueden llamar a los hooks dentro de condicionales,
  // no lo permite REACT.
  //if (isFriend) {
  //  const { friend } = useFriendInfo(message.senderId);
  //}
  // para lo cual vamos a hacer un componente que si use el hook
  // y lo llamaremos FriendEmail

  return (
    <div
      className={cn(
        "flex flex-col max-w-[75%]",
        isFriend ? "" : "ml-auto items-end"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-2xl break-words",
          isFriend
            ? "bg-muted rounded-tl-none"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        <p className="text-sm">{message.text}</p>
      </div>
      <p className="text-xs text-muted-foreground mt-1 px-2">
        {isFriend ? (
          <Suspense fallback="Loading user info...">
            <FriendEmail friendUID={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};
export default MessageChat;
