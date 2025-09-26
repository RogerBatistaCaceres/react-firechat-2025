import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="grid grid-cols-1 md: grid-cols-2 gap-4">
      {/*Mostrar las rooms*/}
      <section className="space-y-4">
        <Suspense fallback={"Cargando rooms..."}>
          <FormSearchFriend handleClickRoomId={handleClickRoomId} />
          <ListRoomChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      {/*Mostrar los mensajes*/}
      <section>
        {roomId ? (
          <Suspense fallback={"Cargando messages..."}>
            <FormMessageChat roomId={roomId} />
            <MessagesChat roomId={roomId} />
          </Suspense>
        ) : (
          <div>Select a room to chat</div>
        )}
      </section>
    </div>
  );
};
export default ChatPage;
