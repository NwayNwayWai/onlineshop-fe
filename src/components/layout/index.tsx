"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { Box, Flex, Section } from "@radix-ui/themes";

import Header from "./header";
import SideBar from "./side-bar";

interface Props {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
}

const PageLayout: React.FC<Props> = ({
  children,
  className,
  hideHeader,
  ...props
}: Props) => {
  return (
    <>
      <Section className="relative m-auto h-screen" p="0">
        <Box className="items-start">
          {!hideHeader && <Header {...props} />}
          <Flex className=" bg-white h-screen">
            <SideBar />
            <Box
              className={cn(
                "flex-1 overflow-auto pt-[80px] bg-gray-100",
                hideHeader && "pt-0",
                className
              )}
            >
              {children}
            </Box>
          </Flex>
        </Box>
      </Section>
    </>
  );
};

export default PageLayout;
