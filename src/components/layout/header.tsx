"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUserInfo, logout } from "@/utils/auth";
import { Box, Flex } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { Image } from "../ui/image";
import {
  LogOut,
  ShoppingBasket,
  ShoppingCart,
  User,
  Warehouse,
} from "lucide-react";
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
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    avatarUrl?: string;
    isAdmin?: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchTokenAndUserInfo = () => {
      const token = localStorage.getItem("authToken");
      const userInfo = localStorage.getItem("userInfo");
      setToken(token);
      setUserInfo(userInfo ? JSON.parse(userInfo) : null);
    };

    fetchTokenAndUserInfo();
    window.addEventListener("storage", fetchTokenAndUserInfo);

    return () => {
      window.removeEventListener("storage", fetchTokenAndUserInfo);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);
    setUserInfo(null);

    router.push("/dashboard");
  };

  const profile = () => {
    router.push("/setting");
  };

  const HeaderAvatar = () => (
    <Flex className="space-x-2">
      {!userInfo?.isAdmin ? (
        <Link href="/cart">
          <Box className="p-2">
            <ShoppingCart />
          </Box>
        </Link>
      ) : (
        <Link href="/order-lists">
          <Box className="p-2">
            <Warehouse />
          </Box>
        </Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={userInfo?.avatarUrl || "/upload/images/boylogo.png"}
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
            <DropdownMenuItem onClick={profile}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );

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
                height={60}
                className="w-[100px] h-[60px] mr-[20px]"
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
