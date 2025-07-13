import { Task, Employee } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Flag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  employee: Employee;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-priority-low text-white',
  medium: 'bg-priority-medium text-white',
  high: 'bg-priority-high text-white',
  urgent: 'bg-priority-urgent text-white',
};

const statusColors = {
  todo: 'bg-status-todo text-white',
  progress: 'bg-status-progress text-white',
  completed: 'bg-status-completed text-white',
};

export function TaskCard({ task, employee, onStatusChange, onEdit }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/50",
      isOverdue && "border-destructive/30 shadow-destructive/10"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">
              {task.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          </div>
          <Badge className={cn("text-xs", priorityColors[task.priority])}>
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className={cn(isOverdue && "text-destructive font-medium")}>
              {formatDate(task.dueDate)}
            </span>
          </div>
          {isOverdue && (
            <div className="flex items-center gap-1 text-destructive">
              <Clock className="w-3 h-3" />
              <span className="font-medium">Overdue</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium truncate">{employee.name}</p>
              <p className="text-xs text-muted-foreground truncate">{employee.role}</p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Badge className={cn("text-xs", statusColors[task.status])}>
              {task.status === 'todo' && 'To Do'}
              {task.status === 'progress' && 'In Progress'}
              {task.status === 'completed' && 'Completed'}
            </Badge>
          </div>
        </div>

        <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {task.status !== 'completed' && (
            <Button
              size="xs"
              variant="outline"
              onClick={() => onStatusChange(task.id, task.status === 'todo' ? 'progress' : 'completed')}
              className="flex-1"
            >
              {task.status === 'todo' ? 'Start' : 'Complete'}
            </Button>
          )}
          <Button
            size="xs"
            variant="ghost"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                +{task.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}