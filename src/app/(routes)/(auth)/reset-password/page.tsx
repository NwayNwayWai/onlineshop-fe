import React from "react";
import { NextPage } from "next";

import ConfirmResetPassword from "@/components/page/auth/reset-password";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Box, Flex } from "@radix-ui/themes";

const ConfirmResetPasswordPage: NextPage = () => {
  return (
    <Box className="h-screen w-screen">
      <Flex align="center" justify="center" className="py-2 pt-[60px]">
        <Card className="w-2/5">
          <CardHeader>
            <Flex align="center" justify="center">
              <Icons.circleCheck className="h-[60px] w-[60px] text-center " />
            </Flex>
            <CardTitle className="text-center">
              Reset Password Email Sent
            </CardTitle>
          </CardHeader>
          <ConfirmResetPassword />
        </Card>
      </Flex>
    </Box>
  );
};

export default ConfirmResetPasswordPage;
