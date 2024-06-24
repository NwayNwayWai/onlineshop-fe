import React from 'react';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/typo';
import { Box } from '@radix-ui/themes';

const ConfirmResetPassword = () => {
  return (
    <Box className="px-6 py-4">
      <Text className="text-center">
        We’ve sent email to <span className="font-bold">herry@gmail.com</span>.
      </Text>
      <Text className="text-center">
        Make sure you check your email in both spam and trash if you can’t find tit.
      </Text>
      <Button type="submit" className="mt-4 w-full h-[50px]" size="sm">
        <Text className="text-white font-semibold">Check My Mail</Text>
      </Button>
    </Box>
  );
};

export default ConfirmResetPassword;
