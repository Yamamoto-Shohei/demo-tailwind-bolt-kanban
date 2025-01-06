import React from 'react';
import { Calendar, User } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/task';
import { getPriorityColor } from '../utils/priorityStyles';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export function TaskCard({ task, isDragging = false }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const priorityColor = getPriorityColor(task.priority);
  const style = {
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white p-4 rounded-lg shadow-sm mb-3
        border-l-4 ${priorityColor}
        hover:shadow-lg hover:scale-[1.02]
        transition-transform duration-200 ease-out
        cursor-grab active:cursor-grabbing
        touch-none
      `}
    >
      <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
}