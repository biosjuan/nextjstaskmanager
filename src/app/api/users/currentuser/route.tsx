import { validateJWTandGetUserId } from '@/helpers/jwtValidation';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connectMongoDB } from '@/config/dbConfig';

connectMongoDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWTandGetUserId(request);

    const user = await User.findById(userId);

    return NextResponse.json(
      {
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
