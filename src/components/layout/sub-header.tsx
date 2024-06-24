'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Box, Flex } from '@radix-ui/themes';

import { Icons } from '../ui/icons';
import { Image } from '../ui/image';
import { Text } from '../ui/typo';

interface HeaderProps {
  title?: string;
  subTitle?: string;
  backRoute?: string;
  enableSecondary?: boolean;
}

const SubHeader: React.FC<HeaderProps> = ({
  title = '',
  subTitle = '',
  backRoute = '',
  enableSecondary,
}) => {
  const router = useRouter();
  return (
    <Box>
      {!enableSecondary ? (
        <Flex align="center">
          <Text className="text-[24px] font-medium text-primary">{title}</Text>
          {subTitle && (
            <Flex align="center">
              <Image src="/upload/icons/dot_inactive_icon.svg" width={22} height={22} alt="dot" />
              <Text className="text-[30px] font-medium text-primary">{subTitle}</Text>
            </Flex>
          )}
        </Flex>
      ) : (
        <Flex align="center" className="p-[24px] border-b border-blue-200" gap="2">
          <Icons.backArrow
            className="w-[18px] h-[18px] text-primary cursor-pointer"
            onClick={() => router.replace(backRoute)}
          />
          <Text className="text-[20px] font-medium text-gray-200 pl-[10px]">{title}</Text>
          {title != '' && <Text className="text-[20px] font-medium text-gray-200">/</Text>}
          {subTitle && <Text className="text-[20px] font-medium text-primary">{subTitle}</Text>}
        </Flex>
      )}
    </Box>
  );
};

export default SubHeader;
