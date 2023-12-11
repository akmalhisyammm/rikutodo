import axios, { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get('jwt');

  if (!token || token.value === 'loggedOut') {
    return NextResponse.json(
      { status: 'fail', message: 'You are not authorized.' },
      { status: 401 },
    );
  }

  try {
    const res = await axios.get(`${process.env.API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    return NextResponse.json({ status: 'success', data: res.data.data }, { status: 200 });
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
