import type { Room } from "@/schemas/room.schemas";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";
import { Suspense } from "react";
import { MessageCircle, User2 } from "lucide-react";
interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}
const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();
  const friendUID = room.participants.find((id) => id != user?.uid) || "";
  return (
    <Button
      onClick={() => handleClickRoomId(room.id)}
      variant="ghost"
      className="w-full justify-start hover:bg-muted transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <User2 className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 truncate text-left">
          <Suspense fallback="Loading info friend...">
            <FriendEmail friendUID={friendUID} />
          </Suspense>
        </div>
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
      </div>
    </Button>
  );
};
export default RoomChat;
