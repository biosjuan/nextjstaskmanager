'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '@/redux/usersSlice';
import Spinner from './Spinner';
import { SetLoading } from '@/redux/loadersSlice';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const pathName = usePathname();
  const isPublicRoute = pathName === '/login' || pathName === '/register';
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      dispatch(SetLoading(true));
      dispatch(SetCurrentUser(null));
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await axios.get('/api/users/currentuser');

        dispatch(SetCurrentUser(response.data.data));
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(SetLoading(false));
      }
    };
    if (!isPublicRoute) getData();
  }, [dispatch, isPublicRoute]);

  return (
    <html lang='en'>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
          rel='stylesheet'
        />
      </head>
      <body>
        {loading && <Spinner></Spinner>}
        <Toaster position='top-center' reverseOrder={false} />

        {!isPublicRoute ? (
          <div>
            <div className='lg:mx-10 bg-primary text-white p-5 flex justify-between items-center rounded-b'>
              <h1
                className='text-2xl font-bold cursor-pointer'
                onClick={() => router.push('/')}
              >
                Next - TM
              </h1>
              <div className='flex gap-5 cursor-pointer'>
                <h1 className='underline'>{currentUser?.username}</h1>
                <i
                  onClick={onLogout}
                  className='ri-logout-box-r-line text-white '
                ></i>
              </div>
            </div>
            <div className='h-[85vh] lg:mx-10 mx-3 mt-5'>{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </body>
    </html>
  );
}

export default LayoutProvider;
