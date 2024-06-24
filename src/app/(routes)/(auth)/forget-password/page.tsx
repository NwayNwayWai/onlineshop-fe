import React from 'react';
import { NextPage } from 'next';

import { AuthLayout } from '@/components/layout/auth-layout';
import ForgetPassword from '@/components/page/auth/forget-password';

const ForgetPasswordPage: NextPage = () => {
  return (
    <AuthLayout title="Forget Password?" subTitle="Recover Password with Mail">
      <ForgetPassword />
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
