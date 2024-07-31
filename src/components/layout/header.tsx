"use client";
import React, { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getToken, getUserInfo, logout } from "@/utils/auth";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

import { Button } from "../ui/button";
import { Image } from "../ui/image";
import { LogOut, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

interface HeaderProps {
  hideMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideMenu = false }: HeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const token = getToken();
  const pathName = usePathname();

  const HeaderAvatar = () => {
    return (
      <Flex className="space-x-2">
        <Link href="/cart">
          <Box className="p-2">
            <ShoppingCart />
          </Box>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={"/upload/images/boylogo.png"}
                alt="profile Image"
                className="bg-primary"
              />
              <AvatarFallback>F2L</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async (ev) => {
                logout();
                router.refresh();
                router.push("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
    );
  };

  return (
    <Box className="relative z-10">
      <header className="fixed top-0 w-full h-[80px] border-b border-b-gray-100 shadow bg-white">
        <Flex
          justify="between"
          align="center"
          className="w-full h-full px-[2%]"
        >
          <Box className="h-[60px]">
            <Link href="/dashboard">
              <Image
                src="/upload/images/logo.png"
                alt="logo"
                width={100}
                height={600}
                className="w-[100px] h-[60px] mr-[20px] "
              />
            </Link>
          </Box>
          {!token ? (
            <Flex>
              <Link href="/login">
                <Button variant="link">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </Flex>
          ) : (
            <HeaderAvatar />
          )}
        </Flex>
      </header>
    </Box>
  );
};

export default Header;
