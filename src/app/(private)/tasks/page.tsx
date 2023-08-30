'use client';

import { useRouter } from 'next/navigation';

function Tasks() {
  const router = useRouter();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Tasks</h1>
        <button
          onClick={() => router.push('/tasks/addtask')}
          className='btn-primary'
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Tasks;
