import React from 'react';
import { NextPage } from 'next';

import { AuthLayout } from '@/components/layout/auth-layout';
import Login from '@/components/page/auth/login';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Login" subTitle="">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
