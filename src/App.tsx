import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Column } from './components/Column';
import { TaskCard } from './components/TaskCard';
import type { Task } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'デザインを作成',
      description: 'ウェブサイトの新しいデザインを作成する',
      status: 'todo',
      assignee: '田中太郎',
      dueDate: '2024-03-20',
      priority: 'high'
    },
    {
      id: '2',
      title: 'APIの実装',
      description: 'バックエンドAPIのエンドポイントを実装する',
      status: 'in-progress',
      assignee: '鈴木花子',
      dueDate: '2024-03-25',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'テスト作成',
      description: 'ユニットテストを作成する',
      status: 'done',
      assignee: '佐藤次郎',
      dueDate: '2024-03-15',
      priority: 'low'
    },
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8pxの移動で開始
      },
    })
  );

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">カンバンボード</h1>
      <DndContext 
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <Column id="todo" title="ToDo" tasks={todoTasks} />
          <Column id="in-progress" title="In Progress" tasks={inProgressTasks} />
          <Column id="done" title="Done" tasks={doneTasks} />
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;