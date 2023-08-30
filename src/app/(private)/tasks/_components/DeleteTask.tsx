'use client';

import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function DelteTaskButton({ taskid }: { taskid: string }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onDelete = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.delete(`/api/tasks/${taskid}`);
      // clear the router cache
      router.refresh();
      router.push('/tasks');
    } catch (error: any) {
      toast.error(error.message || error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <button className='btn-outline' onClick={onDelete}>
      Delete
    </button>
  );
}

export default DelteTaskButton;
