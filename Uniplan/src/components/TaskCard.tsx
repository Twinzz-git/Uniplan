import { Task } from '@/types/task';
import { PriorityBadge, StatusBadge } from '@/components/TaskBadges';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === 'completada';

  return (
    <div
      className={cn(
        'glass-card p-4 hover-lift group',
        isCompleted && 'opacity-60'
      )}
      style={{ animationDelay: '0.05s' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-semibold text-foreground truncate',
              isCompleted && 'line-through'
            )}
          >
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {task.description}
          </p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
        {task.deadline && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Calendar size={12} />
            {new Date(task.deadline).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </div>
  );
}
