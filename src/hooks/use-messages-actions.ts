import type { LastMessage, Message } from "@/schemas/room.schemas";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessagesActions = (roomId: string) => {
  const { data: user } = useUser();

  const db = useFirestore();

  const messagesRef = collection(db, "rooms", roomId, "messages");

  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    suspense: true,
    idField: "id",
  });

  const sendMessage = async (text: string) => {
    if (!user) throw new Error("useMessageAction:401");
    if (!text.trim()) throw new Error("useMessageAction:400");

    const timestamp = serverTimestamp();

    // create a new message object
    // Esto coge el dato del mensaje y omite el id
    const messageData: Omit<Message, "id"> = {
      senderId: user.uid,
      text,
      timestamp,
    };

    // add the new message to the messages collection

    const roomRef = doc(db, "rooms", roomId);

    const lastMessage: LastMessage = {
      senderId: user.uid,
      text,
      timestamp,
    };

    // await updateDoc(roomRef, { lastMessage });
    // await addDoc(messagesRef, messageData);

    // Cuando tienes que hacer varias cosas en paralelo
    // las haces con Promise.all
    // estas dos promesas se ejecutan al mismo tiempo, en paralelo

    await Promise.all([
      updateDoc(roomRef, { lastMessage }),
      addDoc(messagesRef, messageData),
    ]);
  };
  return {
    messages: messages as Message[],
    sendMessage,
  };
};
