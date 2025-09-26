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
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
      {/*Mostrar las rooms*/}
      <section className="border rounded-lg p-4 bg-background shadow-sm overflow-y-auto">
        <Suspense fallback={"Cargando rooms..."}>
          <FormSearchFriend handleClickRoomId={handleClickRoomId} />
          <div className="mt-4">
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </div>
        </Suspense>
      </section>
      {/*Mostrar los mensajes*/}
      <section className="border rounded-lg bg-background shadow-sm flex flex-col">
        {roomId ? (
          <Suspense fallback={"Cargando messages..."}>
            <div className="flex-1 overflow-y-auto p-4">
              <MessagesChat roomId={roomId} />
            </div>
            <div className="p-4 border-t">
              <FormMessageChat roomId={roomId} />
            </div>
          </Suspense>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a room to start chatting
          </div>
        )}
      </section>
    </div>
  );
};
export default ChatPage;
