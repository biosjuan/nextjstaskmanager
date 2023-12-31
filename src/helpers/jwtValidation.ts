import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function validateJWTandGetUserId(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) throw new Error('not token found');

    const decodedData: any = jwt.verify(token, process.env.jwt_secret!);

    const userId = decodedData.userId;

    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
