import { connectMongoDB } from '@/config/dbConfig';
import USER from '@/models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { data } from 'autoprefixer';

connectMongoDB();

export async function POST(nextRequest: NextRequest) {
  try {
    // Check if user already exists
    const reqBody = await nextRequest.json();
    const userExists = await USER.findOne({ email: reqBody.email });
    if (userExists) throw new Error('User already exists');

    // has password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // Create user
    await USER.create(reqBody);

    return NextResponse.json(
      { message: 'user register successfully', data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
