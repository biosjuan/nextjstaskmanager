import { connectMongoDB } from '@/config/dbConfig';
import { validateJWTandGetUserId } from '@/helpers/jwtValidation';
import TASKS from '@/models/taskModels';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();

export async function POST(req: NextRequest) {
  try {
    const userId = await validateJWTandGetUserId(req);
    const reqBody = await req.json();
    reqBody.user = userId;
    await TASKS.create(reqBody);
    return NextResponse.json(
      {
        message: 'Task create successfuly',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await validateJWTandGetUserId(req);
    const tasks = await TASKS.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error: any) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
