'use client';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from './ReduxProvider';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isPublicRoute = pathName === '/login' || pathName === '/register';
  return (
    <ReduxProvider>
      <html lang='en'>
        <head>
          <link
            href='https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
            rel='stylesheet'
          />
        </head>
        <body>
          <Toaster position='top-center' reverseOrder={false} />
          <div className='mx-10 bg-primary text-white p-5 flex justify-between items-center rounded-b'>
            <h1 className='text-2xl font-bold'>Next - TM</h1>
            <div className='flex gap-5'>
              <h1 className='underline cursor-pointer'>Userinfo</h1>
              <i className='ri-logout-box-r-line text-white'></i>
            </div>
          </div>
          {isPublicRoute ? (
            <div>{children}</div>
          ) : (
            <div className='h-[85vh] mx-10 mt-5 p-2 border-gray-300 rounded-t'>
              {children}
            </div>
          )}
        </body>
      </html>
    </ReduxProvider>
  );
}

export default LayoutProvider;
