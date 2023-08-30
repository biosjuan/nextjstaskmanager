'use client';
import TaskForm from '@/components/TaskForm';
import { useRouter } from 'next/navigation';
import React from 'react';

function AddTask() {
  const [task = {}, setTask] = React.useState({});
  const router = useRouter();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Add Tasks</h1>
        <button onClick={() => router.push('/tasks')} className='btn-outline'>
          Back
        </button>
      </div>
      <TaskForm />
    </div>
  );
}

export default AddTask;
