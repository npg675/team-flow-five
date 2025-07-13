export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'progress' | 'completed';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}