'use client';
import Link from 'next/link';
import { useState } from 'react';

function Register() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const isRegisterButtonDisabled = () => {
    return !user.username || !user.password || !user.email;
  };

  const onRegister = () => {
    console.log(JSON.stringify(user));
  };

  return (
    <div className='bg-primary flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col gap-5  bg-white p-5 w-[500px] text-gray-600'>
        <h1 className='text-2xl font-bold uppercase'>
          <span className='text-primary'>Register</span>
        </h1>
        <hr />
        <div className='flex flex-col'>
          <label htmlFor='username' className='text-sm'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
          />
        </div>
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
          Register
        </button>
        <Link href='/login'>Alerady have an account</Link>
      </div>
    </div>
  );
}

export default Register;
