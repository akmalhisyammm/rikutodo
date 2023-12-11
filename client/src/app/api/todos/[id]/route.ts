import axios, { AxiosError } from 'axios';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  const token = req.cookies.get('jwt');

  if (!token || token.value === 'loggedOut') {
    return NextResponse.json(
      { status: 'fail', message: 'Your session has expired, please sign in again.' },
      { status: 401 },
    );
  }

  try {
    const res = await axios.get(`${process.env.API_URL}/todos/${context.params.id}`, {
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

export const PATCH = async (req: NextRequest, context: { params: { id: string } }) => {
  const token = req.cookies.get('jwt');

  if (!token || token.value === 'loggedOut') {
    return Response.json(
      { status: 'fail', message: 'Your session has expired, please sign in again.' },
      { status: 401 },
    );
  }

  try {
    const { title, description, isCompleted } = await req.json();

    const res = await axios.patch(
      `${process.env.API_URL}/todos/${context.params.id}`,
      { title, description, isCompleted },
      { headers: { Authorization: `Bearer ${token.value}` } },
    );

    return Response.json({ status: 'success', data: res.data.data }, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return Response.json(
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

export const DELETE = async (req: NextRequest, context: { params: { id: string } }) => {
  const token = req.cookies.get('jwt');

  if (!token || token.value === 'loggedOut') {
    return Response.json(
      { status: 'fail', message: 'Your session has expired, please sign in again.' },
      { status: 401 },
    );
  }

  try {
    await axios.delete(`${process.env.API_URL}/todos/${context.params.id}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    return Response.json({ status: 'success' }, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return Response.json(
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
