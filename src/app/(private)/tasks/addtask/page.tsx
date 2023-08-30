'use client';
import TaskForm from '@/components/TaskForm';
import { taskInterface } from '@/interfaces';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function AddTask() {
  const [task, setTask] = React.useState<taskInterface>({
    title: '',
    description: '',
    status: 'open',
    category: 'personal',
    priority: 'low',
    dateToStart: '',
    dateToFinish: '',
    reference: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const onSave = async () => {
    try {
      dispatch(SetLoading(true));
      console.log(JSON.stringify(task));
      await axios.post('/api/tasks', task);
      toast.success('Task added successfuly');
      router.refresh();
      router.push('/tasks');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Add Tasks</h1>
        <button onClick={() => router.push('/tasks')} className='btn-outline'>
          Back
        </button>
      </div>
      <TaskForm task={task} setTask={setTask} onSave={onSave} />
    </div>
  );
}

export default AddTask;
