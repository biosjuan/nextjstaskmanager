'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const isRegisterButtonDisabled = () => {
    return !user.username || !user.password || !user.email;
  };
  const onRegister = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/users/register`, user);
      toast.success('User registered succssfuly! Please login.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-primary flex flex-col justify-center items-center h-screen lg:p-0 p-5'>
      <div className='flex flex-col gap-5  bg-white p-5 lg:w-[500px] w=[380px] text-gray-600'>
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
          {loading ? 'Registering User...' : 'Register'}
        </button>
        <Link href='/login'>Alerady have an account</Link>
      </div>
    </div>
  );
}

export default Register;
