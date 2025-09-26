import { useRoomActions } from "@/hooks/use-room.actions";
import RoomChat from "./room-chat";
interface Props {
  handleClickRoomId: (id: string) => void;
}
const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = useRoomActions();
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recent Chats
      </h2>
      {rooms.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No chats yet. Search for a friend to start chatting!
        </p>
      ) : (
        rooms.map((room) => (
          <RoomChat
            key={room.id}
            room={room}
            handleClickRoomId={handleClickRoomId}
          />
        ))
      )}
      {/*<pre>{JSON.stringify(rooms, null, 2)}</pre>*/}
    </div>
  );
};
export default ListRoomChat;
