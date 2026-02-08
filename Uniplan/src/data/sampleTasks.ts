import { Task } from '@/types/task';

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Diseñar wireframes del dashboard',
    description: 'Crear los wireframes para la nueva interfaz del dashboard principal.',
    deadline: '2026-02-15',
    priority: 'alta',
    status: 'en progreso',
    createdAt: '2026-02-01',
  },
  {
    id: '2',
    title: 'Revisar pull requests pendientes',
    description: 'Revisar y aprobar los PRs del equipo de frontend.',
    deadline: '2026-02-10',
    priority: 'media',
    status: 'pendiente',
    createdAt: '2026-02-03',
  },
  {
    id: '3',
    title: 'Actualizar documentación API',
    description: 'Documentar los nuevos endpoints del servicio de autenticación.',
    deadline: '2026-02-20',
    priority: 'baja',
    status: 'pendiente',
    createdAt: '2026-02-05',
  },
  {
    id: '4',
    title: 'Configurar CI/CD pipeline',
    description: 'Implementar pipeline de integración continua con tests automatizados.',
    deadline: '2026-02-12',
    priority: 'alta',
    status: 'completada',
    createdAt: '2026-01-28',
  },
  {
    id: '5',
    title: 'Optimizar consultas de base de datos',
    description: 'Mejorar el rendimiento de las queries más lentas del sistema.',
    deadline: '2026-02-18',
    priority: 'media',
    status: 'en progreso',
    createdAt: '2026-02-04',
  },
];
