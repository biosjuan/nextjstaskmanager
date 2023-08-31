import Link from 'next/link';
import React from 'react';
import { cookies } from 'next/headers';
import axios from 'axios';
import { taskInterface } from '@/interfaces';
import DelteTaskButton from './_components/DeleteTask';
import ClearFilters from './_components/ClearFilters';

async function getTasks(searchParams = {}) {
  try {
    const searchParamsString = new URLSearchParams(searchParams).toString();

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const endPoint = `${process.env.domain}/api/tasks?${searchParamsString}`;
    const response = await axios.get(endPoint, {
      headers: { Cookie: `token=${token}` },
    });
    return response.data.data;
  } catch (error) {}
}

async function Tasks({ searchParams }: { searchParams: any }) {
  const tasks = await getTasks(searchParams);

  const filtersApplied = {
    status: searchParams.status,
    priority: searchParams.priority,
  };
  const getProperty = (key: string, value: any) => {
    return (
      <div className='flex flex-col text-sm'>
        <span className='text-gray-700 font-semibold'>{key}</span>
        <span className='text-gray-600 uppercase'>{value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Tasks</h1>
          <p className='text-gray-600 text-sm'>{tasks.length} tasks found</p>
          {filtersApplied.status && (
            <p className='text-gray-600 text-sm uppercase'>
              Status: {filtersApplied.status}
            </p>
          )}
          {filtersApplied.priority && (
            <p className='text-gray-600 text-sm uppercase'>
              Priority: {filtersApplied.priority}
            </p>
          )}
        </div>
        <div className='flex gap-5 items-center'>
          <ClearFilters />
          <button className='btn-primary'>
            <Link href='/tasks/addtask'>New Task</Link>
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-5'>
        {tasks.map((task: taskInterface) => (
          <div
            className='p-5 border border-gray-300 rounded flex flex-col gap-2'
            key={task._id}
          >
            <h1 className='text-xl text-gray-700'>{task.title}</h1>
            <p className='text-gray-500 text-sm'>{task.description}</p>
            <hr />
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
              {getProperty('Status', task.status)}
              {getProperty('Category', task.category)}
              {getProperty('Start Date', task.dateToStart)}
              {getProperty('End Date', task.dateToFinish)}
              {getProperty('Priority', task.priority)}
              {getProperty('Reference', task.reference)}
              {getProperty(
                'Created at',
                new Date(task.createdAt || '').toLocaleDateString()
              )}
              {getProperty(
                'Updated at',
                new Date(task.updatedAt || '').toLocaleDateString()
              )}
            </div>

            <div className='flex justify-end gap-5 mt-5'>
              <DelteTaskButton taskid={task._id || ''} />
              <button className='btn-primary'>
                <Link href={`/tasks/edittask/?taskid=${task._id}`}>Edit</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
