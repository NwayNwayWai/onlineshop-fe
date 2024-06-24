import React from "react";
import { NextPage } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import Register from "@/components/page/auth/register";

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title="Register" subTitle="">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
