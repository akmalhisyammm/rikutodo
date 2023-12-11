import axios, { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();

    const res = await axios.post(`${process.env.API_URL}/auth/login`, { username, password });

    return NextResponse.json(
      { status: 'success', data: res.data.data },
      {
        status: 200,
        headers: {
          'Set-Cookie': `jwt=${res.data.token}; HttpOnly; Expires=${new Date(
            Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 60 * 1000,
          )}; SameSite=Lax; Path=/;`,
        },
      },
    );
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
