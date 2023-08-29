import Image from 'next/image';
import { cookies } from 'next/headers';
import axios from 'axios';

export const getData = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const endPoint = `${process.env.domain}/api/users/currentuser`;
    const response = await axios.get(endPoint, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default async function Home() {
  const user: any = await getData();

  return (
    <div>
      <h1>HomePage</h1>
      {user && (
        <div>
          <h1>Username : {user.username}</h1>
          <h1>Email : {user.email}</h1>
        </div>
      )}
    </div>
  );
}
