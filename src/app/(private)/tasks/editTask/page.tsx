import TaskForm from '@/components/TaskForm';
import { useRouter } from 'next/navigation';

function EditTask() {
  const router = useRouter();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Edit Tasks</h1>
        <button onClick={() => router.push('/tasks')} className='btn-outline'>
          Back
        </button>
      </div>
      <TaskForm />
    </div>
  );
}

export default EditTask;
