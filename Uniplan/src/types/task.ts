export type Priority = 'alta' | 'media' | 'baja';
export type Status = 'pendiente' | 'en progreso' | 'completada';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}
