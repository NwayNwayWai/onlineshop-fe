"use client";
import React, { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { menuList } from "@/data/menu-list";
import { cn } from "@/lib/utils";
import { Box, Flex, Grid } from "@radix-ui/themes";

import { Card } from "../ui/card";
import { Text } from "../ui/typo";

const SideBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  return (
    <Box className="overflow-auto h-full">
      <Card className="border-0">
        <Grid
          className={cn(
            "w-[250px]",
            " pt-[80px] pb-[32px] bg-white spacer-y-3"
          )}
        >
          {menuList.map((each, key) => (
            <Box
              key={key}
              className="cursor-pointer w-full mb-3"
              onClick={() => {
                router.push(each.path);
              }}
            >
              <Flex
                className={cn(
                  pathname === each.path
                    ? "border-l-4 border-primary text-primary bg-primary80 bg-primary/20"
                    : "bg-white",
                  "p-[16px] font-medium space-x-3"
                )}
                align="center"
              >
                {pathname === each.path ? each.activeIcon : each.icon}
                <Text className="text-[16px]">{each.name}</Text>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default SideBar;
