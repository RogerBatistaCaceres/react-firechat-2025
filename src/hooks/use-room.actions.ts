import type { Room } from "@/schemas/room.schemas";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();
  const roomRef = collection(db, "rooms");
  // Le estamos diciendo que dentro de todos los documentos de rooms
  // nos traiga solo aquellos en los que el arreglo participants
  // contenga el uid del usuario logueado
  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user?.uid)
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  // Buscar un user por email

  const searchUserWithEmail = async (email: string) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];

    return doc.data();
  };

  const findOrCreateRoom = async (friendEmail: string) => {
    if (!user)
      return {
        success: false,
        message: "401 no autorizado",
        roomId: null,
      };
    if (user.email === friendEmail) {
      return {
        success: false,
        message: "400 error, you cant chat with yourself",
        roomId: null,
      };
    }
    const friend = await searchUserWithEmail(friendEmail);
    if (!friend)
      return {
        success: false,
        message: "400 error, friend is not available",
        roomId: null,
      };

    // nos traemos el objeto de todas nuestras salas solo las que hemos creado
    // y dentro de la sala buscamos dentro del arreglo participantes
    // si el uid del participante corresponde con el del friend
    // si eso es correcto me devuelve esa información.
    const existRoom = rooms.find((room) =>
      room.participants.find((uid: string) => uid === friend.uid)
    );
    if (existRoom)
      return {
        success: true,
        message: "200 Sala encontrada",
        roomId: existRoom.id,
      };
    const newRoom: Omit<Room, "id"> = {
      createdAt: serverTimestamp(),
      lastMessage: null,
      participants: [friend.uid, user.uid],
    };
    // Tenemos el objeto, ahora hay que añadirlo a la colección
    // addDoc me crea el documento y le adiciona un Id
    const document = await addDoc(roomRef, newRoom);

    return {
      success: true,
      message: "200 room successfully created",
      roomId: document.id,
    };
  };

  return { rooms: rooms as Room[], findOrCreateRoom };
};
