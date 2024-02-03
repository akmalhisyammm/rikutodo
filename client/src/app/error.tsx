'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/components/templates';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage onReset={reset} />;
};

export default Error;
