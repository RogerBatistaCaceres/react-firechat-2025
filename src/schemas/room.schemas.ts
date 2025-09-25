import type { FieldValue, Timestamp } from "firebase/firestore";

// La idea aca es hacer la estructura de la base de datos
export interface Room {
  id: string;
  participants: string[];
  createdAt: Timestamp | FieldValue;
  lastMessage: LastMessage | null;
}

export interface LastMessage {
  text: string;
  senderId: string;
  timestamp: Timestamp | FieldValue;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Timestamp | FieldValue;
}
