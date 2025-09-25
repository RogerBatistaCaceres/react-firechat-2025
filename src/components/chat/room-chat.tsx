import type { Room } from "@/schemas/room.schemas";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";
import { Suspense } from "react";
interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}
const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();
  const friendUID = room.participants.find((id) => id != user?.uid) || "";
  return (
    <Button onClick={() => handleClickRoomId(room.id)}>
      <Suspense fallback="Loading info friend...">
        <FriendEmail friendUID={friendUID} />
      </Suspense>
    </Button>
  );
};
export default RoomChat;
