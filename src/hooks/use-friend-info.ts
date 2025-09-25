import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";
import type { UserFirestore } from "@/schemas/user.shema";

export const useFriendInfo = (friendUID: string) => {
  const db = useFirestore();
  // en mi proyecto en la colección users, me vas a traer el documento que
  // coincida con ese id, para coger despues su email

  const friendRef = doc(db, "users", friendUID);

  const { data: friend } = useFirestoreDocData(friendRef, {
    suspense: true,
  });

  return { friend: friend as UserFirestore };
};
