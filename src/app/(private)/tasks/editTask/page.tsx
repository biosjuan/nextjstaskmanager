'use client';
import TaskForm from '@/components/TaskForm';
import { taskInterface } from '@/interfaces';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function EditTask() {
  const searchParam = useSearchParams();
  const taskid = searchParam.get('taskid');
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

  useEffect(() => {
    const getTask = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await axios.get(`/api/tasks/${taskid}`);
        setTask(response.data.data);
      } catch (error: any) {
        toast.error(error.response.data.message || error.message);
      } finally {
        dispatch(SetLoading(false));
      }
    };

    getTask();
  }, [dispatch, taskid]);

  const onSave = async () => {
    try {
      dispatch(SetLoading(true));
      console.log(JSON.stringify(task));
      await axios.put(`/api/tasks/${taskid}`, task);
      toast.success('Task updated successfuly');
      // clear the router-cache
      // router.refresh();
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
        <h1 className='text-2xl font-bold'>Edit Tasks</h1>
        <button onClick={() => router.push('/tasks')} className='btn-outline'>
          Back
        </button>
      </div>
      <TaskForm task={task} setTask={setTask} onSave={onSave} />
    </div>
  );
}

export default EditTask;
