'use client';
import Link from 'next/link';
import { useState } from 'react';

function Login() {
  const [user, setUser] = useState({
    password: '',
    email: '',
  });

  const isRegisterButtonDisabled = () => {
    return !user.password || !user.email;
  };

  const onRegister = () => {
    console.log(JSON.stringify(user));
  };

  return (
    <div className='bg-primary flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col gap-5  bg-white p-5 w-[500px] text-gray-600'>
        <h1 className='text-2xl font-bold uppercase'>
          <span className='text-primary'>on login</span>
        </h1>
        <hr />

        <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm'>
            Email
          </label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm'>
            Password
          </label>
          <input
            type='text'
            name='password'
            id='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
        </div>
        <button
          className={
            isRegisterButtonDisabled() ? 'btn-disabled' : 'btn-primary'
          }
          disabled={isRegisterButtonDisabled()}
          onClick={onRegister}
        >
          Login
        </button>
        <Link href='/register'>Don't have an account? Register</Link>
      </div>
    </div>
  );
}

export default Login;
