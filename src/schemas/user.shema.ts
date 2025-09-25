// La idea aca es hacer la estructura de los usuarios en firestore
export interface UserFirestore {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}
