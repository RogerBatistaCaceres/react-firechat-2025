import type { Room } from "@/schemas/room.schemas";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    const userRef = collection(db, "user");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];

    return doc.data();
  };

  return { rooms: rooms as Room[] };
};
