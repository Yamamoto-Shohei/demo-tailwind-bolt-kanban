import type { Priority } from '../types/task';

export const getPriorityColor = (priority: Priority): string => {
  const colors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-blue-500'
  };
  return colors[priority];
};