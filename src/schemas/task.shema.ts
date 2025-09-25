// La idea aca es hacer la estructura de las tareas en firestore
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string; // Reference to UserFirestoreSchema
}
