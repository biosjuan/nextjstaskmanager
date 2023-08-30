import { connectMongoDB } from '@/config/dbConfig';
import { validateJWTandGetUserId } from '@/helpers/jwtValidation';
import TASKS from '@/models/taskModels';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { taskid: string } }
) {
  try {
    const userId = await validateJWTandGetUserId(req);
    const task = await TASKS.findOne({ user: userId, _id: params.taskid });
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error: any) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { taskid: string } }
) {
  try {
    const userId = await validateJWTandGetUserId(req);
    const reqBody = await req.json();
    const task = await TASKS.findOneAndUpdate(
      { user: userId, _id: params.taskid },
      reqBody
    );
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error: any) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskid: string } }
) {
  try {
    const userId = await validateJWTandGetUserId(req);
    await TASKS.findOneAndDelete({ user: userId, _id: params.taskid });
    return NextResponse.json(
      {
        message: 'Task deleted successfully',
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
