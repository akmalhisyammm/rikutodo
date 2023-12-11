import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { key } = await req.json();

    if (key !== process.env.NEXT_PUBLIC_LOGOUT_KEY) {
      return NextResponse.json(
        { status: 'fail', message: 'You are not authorized.' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { status: 'success' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `jwt=loggedOut; HttpOnly; Expires=${new Date(
            Date.now() + 10 * 1000,
          )}; SameSite=Lax; Path=/;`,
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      { status: 'fail', message: 'Something went wrong, please try again.' },
      { status: 500 },
    );
  }
};
