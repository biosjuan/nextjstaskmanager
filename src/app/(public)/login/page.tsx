'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    password: '',
    email: '',
  });

  const registerText = `Don't have an account? Register`;
  const isLogginButtonDisabled = () => {
    return !user.password || !user.email;
  };

  const onLogin = async () => {
    try {
      await axios.post('/api/users/login', user);
      setLoading(true);
      toast.success('logged successfuly');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(true);
    }
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
          className={isLogginButtonDisabled() ? 'btn-disabled' : 'btn-primary'}
          disabled={isLogginButtonDisabled()}
          onClick={() => onLogin()}
        >
          {loading ? 'logging in...' : 'Login'}
        </button>
        <Link href='/register'>{registerText}</Link>
      </div>
    </div>
  );
}

export default Login;
