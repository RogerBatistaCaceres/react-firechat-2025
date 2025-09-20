import { useFirestore, useFirestoreCollection, useUser } from "reactfire";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { is } from "zod/v4/locales";

type Task = {
  id: string;
  [key: string]: any;
};

export const useTaskActions = () => {
  const { data: user } = useUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const db = useFirestore();
  // esto es un acceso rápido a la colección "tasks" dentro de firestore
  const taskCollectionRef = collection(db, "tasks");
  const taskQuery = query(taskCollectionRef, where("userId", "==", user?.uid));
  const { status, data: tasksSnapshot } = useFirestoreCollection(taskQuery, {
    idField: "id",
    suspense: true,
  });

  const tasks: Task[] = tasksSnapshot
    ? tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    : [];

  // CREATE
  const createTask = async (data: { title: string; description?: string }) => {
    const newTask = {
      ...data,
      completed: false,
      userId: user?.uid,
    };
    return await addDoc(taskCollectionRef, newTask);
  };

  // DELETE
  const deleteTask = async (taskId: string) => {
    const taskDocRef = doc(db, "tasks", taskId);
    return await deleteDoc(taskDocRef);
  };

  // TOGGLE TASK COMPLETION
  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    const taskDocRef = doc(db, "tasks", taskId);
    return await updateDoc(taskDocRef, { completed: !task?.completed });
  };

  return {
    tasks: tasks as Task[],
    isLoading: status === "loading",

    createTask,
    deleteTask,
    toggleTaskCompletion,
  };
};
