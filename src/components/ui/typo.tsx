'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Text as RText } from '@radix-ui/themes';

type SizeProp = '1' | '2' | '3' | '4' | '5' | '6' | '7';
type WeightProp = 'normal' | 'bold';
type ColorProp = 'black' | 'gray' | 'blue' | 'green' | 'red';
type AlignProp = 'left' | 'center' | 'right';

interface Props {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: SizeProp;
  weight?: WeightProp;
  color?: ColorProp;
  align?: AlignProp;
  dangerouslySetInnerHTML?: {
    __html: string;
    __typename?: string;
  };
}

export const Text = React.forwardRef<HTMLDivElement, Props>(
  ({ children, as, className, dangerouslySetInnerHTML, size, ...rest }: Props, ref) => (
    <RText
      ref={ref}
      as={as || 'p'}
      className={cn(className, 'font-poppins')}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...(rest as any)}
    >
      {children}
    </RText>
  )
);

Text.displayName = 'Text';
