import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import type { Task } from '../types/task';

interface ColumnProps {
  id: Task['status'];
  title: string;
  tasks: Task[];
}

export function Column({ id, title, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded-lg w-full md:w-80"
    >
      <h2 className="font-bold text-lg mb-4 text-gray-700">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}