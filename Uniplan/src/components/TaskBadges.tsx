import { Priority, Status } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge
      className={cn(
        'text-xs font-medium border-0',
        priority === 'alta' && 'bg-priority-high/20 text-priority-high',
        priority === 'media' && 'bg-priority-medium/20 text-priority-medium',
        priority === 'baja' && 'bg-priority-low/20 text-priority-low'
      )}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium',
        status === 'pendiente' && 'border-status-pending/50 text-status-pending',
        status === 'en progreso' && 'border-status-progress/50 text-status-progress',
        status === 'completada' && 'border-status-completed/50 text-status-completed'
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
