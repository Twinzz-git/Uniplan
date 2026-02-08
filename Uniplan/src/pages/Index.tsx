import { useState, useMemo } from 'react';
import { Task, Priority, Status } from '@/types/task';
import { sampleTasks } from '@/data/sampleTasks';
import { TaskCard } from '@/components/TaskCard';
import { TaskDialog } from '@/components/TaskDialog';
import { ChatView } from '@/components/ChatView';
import { Search, Plus, ListTodo, MessageSquare, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'tasks' | 'chat';
type FilterStatus = Status | 'todas';
type FilterPriority = Priority | 'todas';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('todas');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('todas');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'todas' || t.status === filterStatus;
      const matchPriority = filterPriority === 'todas' || t.priority === filterPriority;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, filterStatus, filterPriority]);

  const handleSave = (data: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t))
      );
    } else {
      setTasks((prev) => [
        { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }
    setEditingTask(undefined);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const openCreate = () => {
    setEditingTask(undefined);
    setDialogOpen(true);
  };

  const statusFilters: { value: FilterStatus; label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en progreso', label: 'En progreso' },
    { value: 'completada', label: 'Completada' },
  ];

  const priorityFilters: { value: FilterPriority; label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Media' },
    { value: 'baja', label: 'Baja' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center">
              <ListTodo size={18} className="text-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">TaskFlow</h1>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab('tasks')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                activeTab === 'tasks'
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <ListTodo size={15} />
              Tareas
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                activeTab === 'chat'
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <MessageSquare size={15} />
              Chat IA
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'tasks' ? (
          <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar tareas..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-shadow"
                />
              </div>
              <button
                onClick={openCreate}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 transition-colors shrink-0"
              >
                <Plus size={16} />
                Nueva tarea
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground shrink-0">Estado:</span>
                <div className="flex gap-1 flex-wrap">
                  {statusFilters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilterStatus(f.value)}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                        filterStatus === f.value
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground shrink-0">Prioridad:</span>
                <div className="flex gap-1 flex-wrap">
                  {priorityFilters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilterPriority(f.value)}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                        filterPriority === f.value
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <ListTodo size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No se encontraron tareas</p>
              </div>
            )}
          </div>
        ) : (
          <ChatView />
        )}
      </main>

      <TaskDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingTask(undefined);
        }}
        onSave={handleSave}
        task={editingTask}
      />
    </div>
  );
};

export default Index;
