import { Task, Employee } from '@/types';
import { TaskCard } from './TaskCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  employees: Employee[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onEditTask: (task: Task) => void;
}

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    icon: ListTodo,
    color: 'bg-status-todo',
  },
  {
    id: 'progress',
    title: 'In Progress',
    icon: Clock,
    color: 'bg-status-progress',
  },
  {
    id: 'completed',
    title: 'Completed',
    icon: CheckCircle2,
    color: 'bg-status-completed',
  },
] as const;

export function TaskBoard({ tasks, employees, onStatusChange, onEditTask }: TaskBoardProps) {
  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id)!;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id as Task['status']);
        const Icon = column.icon;
        
        return (
          <Card key={column.id} className="flex flex-col h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${column.color} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{column.title}</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {columnTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 pt-0">
              <div className="space-y-4">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks yet</p>
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      employee={getEmployeeById(task.assigneeId)}
                      onStatusChange={onStatusChange}
                      onEdit={onEditTask}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}