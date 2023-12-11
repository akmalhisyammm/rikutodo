import axios, { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';

export const PATCH = async (req: NextRequest) => {
  const token = req.cookies.get('jwt');

  if (!token || token.value === 'loggedOut') {
    return NextResponse.json(
      { status: 'fail', message: 'Your session has expired, please sign in again.' },
      { status: 401 },
    );
  }

  try {
    const { currentPassword, password, passwordConfirm } = await req.json();

    const res = await axios.patch(
      `${process.env.API_URL}/users/me/change-password`,
      { currentPassword, password, passwordConfirm },
      { headers: { Authorization: `Bearer ${token.value}` } },
    );

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
