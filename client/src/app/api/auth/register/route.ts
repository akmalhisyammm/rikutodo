import axios, { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { username, email, password, passwordConfirm } = await req.json();

    await axios.post(`${process.env.API_URL}/auth/register`, {
      username,
      email,
      password,
      passwordConfirm,
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { status: 'fail', message: err.response?.data.message },
        { status: err.response?.status },
      );
    }

    return NextResponse.json(
      { status: 'fail', message: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
};
