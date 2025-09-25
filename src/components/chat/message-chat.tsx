import { useFriendInfo } from "@/hooks/use-friend-info";
import type { Message } from "@/schemas/room.schemas";
import { data } from "react-router";
import { useUser } from "reactfire";
import { is } from "zod/v4/locales";
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
        "max-w-[150px] p-2 rounded",
        isFriend ? "bg-pink-200" : "bg-green-200 ml-auto"
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs">
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
