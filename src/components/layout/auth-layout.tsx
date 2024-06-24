'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { Box, Flex } from '@radix-ui/themes';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function AuthLayout(props: {
  children: ReactNode;
  title: string;
  subTitle: string;
  hideTab?: boolean;
}) {
  const pathName = usePathname();
  return (
    <Box className="h-screen w-screen">
      <Flex align="center" justify="center" className="py-2 pt-[60px]">
        <Card className="w-2/5">
          <CardHeader>
            <CardTitle className="text-center">{props.title}</CardTitle>
            <CardTitle className="text-center">{props.subTitle}</CardTitle>
          </CardHeader>
          <CardContent>{props.children}</CardContent>
        </Card>
      </Flex>
    </Box>
  );
}
