import { connectMongoDB } from '@/config/dbConfig';
import USER from '@/models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { data } from 'autoprefixer';
import jwt from 'jsonwebtoken';

connectMongoDB();

export async function POST(nextRequest: NextRequest) {
  try {
    // Check if user already exists in db
    const reqBody = await nextRequest.json();
    const userExists = await USER.findOne({ email: reqBody.email });
    if (!userExists) throw new Error('User do not exists');

    // check if password is correct
    const passwoedMatched = await bcrypt.compare(
      reqBody.password,
      userExists.password
    );

    if (!passwoedMatched) throw new Error('Invalid credentials');

    // create a jwt token
    const secret = process.env.jwt_secret!;
    const token = jwt.sign({ userId: userExists.id }, secret, {
      expiresIn: '7d',
    });

    const response = NextResponse.json(
      {
        message: 'User logged successfuly',
      },
      { status: 200 }
    );

    // attach token to response header
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
