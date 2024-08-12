"use client";

import { OrderProduct, Product } from "@/data/mock-data";
import { Box, Flex, Grid, Text, Button } from "@radix-ui/themes";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegisterRequest } from "../auth/register";

const OrderLists = () => {
  const [cartItems, setCartItems] = useState<OrderProduct[]>([]);
  const [userLists, setUserLists] = useState<RegisterRequest[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("OrderHistory");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUserLists(JSON.parse(storedUsers));
    }

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const updateLocalStorage = (items: Product[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleQuantityChange = (
    id: string,
    action: "increase" | "decrease"
  ) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      );

      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Group cart items by shopperEmail
  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.shopperEmail]) {
      groups[item.shopperEmail] = [];
    }
    groups[item.shopperEmail].push(item);
    return groups;
  }, {} as { [key: string]: OrderProduct[] });

  const calculateTotalForUser = (items: OrderProduct[]) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Box className="w-full flex flex-col items-center pb-8">
      <Text className="text-3xl text-white py-4 my-4 font-bold bg-primary w-full text-center">
        Order Lists
      </Text>
      <Box className="w-[1200px] border">
        {Object.entries(groupedItems).map(([email, items]) => (
          <Box key={email} className="my-4">
            <Text className="text-2xl text-primary pl-4">{email}</Text>
            <table className="w-full table-auto mt-4">
              <thead>
                <tr className=" bg-primary/10">
                  <th className="px-4 py-4 text-left">Shopper</th>
                  <th className="px-4 py-4 text-left">Email</th>
                  <th className="px-4 py-4 text-left">Description</th>
                  <th className="px-4 py-4">Size</th>
                  <th className="px-4 py-4">Quantity</th>
                  <th className="px-4 py-4">Remove</th>
                  <th className="px-4 py-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">
                      <Box className="flex ">
                        <Text>{item.shopperName}</Text>
                      </Box>
                    </td>
                    <td className="px-4 py-2 text-center w-[100px]">
                      <Flex align="center" justify="center">
                        <Box className="flex ">
                          <Text>{item.shopperEmail}</Text>
                        </Box>
                      </Flex>
                    </td>
                    <td className="py-2 text-center h-[100px] pl-2">
                      <Box className="flex items-center justify-start space-x-4">
                        <Box className="w-[80px] h-[80px] flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            width={80}
                            height={80}
                          />
                        </Box>
                        <Grid className=" h-full">
                          <Text className="text-lg truncate">
                            {item.productName}
                          </Text>
                        </Grid>
                      </Box>
                    </td>
                    <td className="px-4 py-2 text-center w-[80px]">
                      <Flex align="center" justify="center">
                        <Box className="flex items-center justify-center bg-primary w-[40px] h-[40px] border">
                          <Text className="text-center">{item.size}</Text>
                        </Box>
                      </Flex>
                    </td>
                    <td className="px-4 py-2 text-center w-[120px]">
                      <Box className="flex items-center justify-center space-x-2">
                        <Box
                          className="flex items-center justify-center bg-gray-300 border w-[40px] h-[40px] "
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
                          }
                        >
                          <Minus className="p-1" />
                        </Box>
                        <Box className="flex items-center justify-center bg-primary border w-[40px] h-[40px]">
                          <Text className="text-center">{item.quantity}</Text>
                        </Box>
                        <Box
                          className="flex items-center justify-center bg-gray-300 border w-[40px] h-[40px] "
                          onClick={() =>
                            handleQuantityChange(item.id, "increase")
                          }
                        >
                          <Plus className="p-1" />
                        </Box>
                      </Box>
                    </td>
                    <td className="px-4 py-2 text-center w-[80px]">
                      <Flex align="center" justify="center">
                        <Box
                          className="flex items-center justify-center bg-gray-300 border w-[40px] h-[40px] "
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="p-1" />
                        </Box>
                      </Flex>
                    </td>
                    <td className="px-4 py-2 text-center w-[100px]">
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Box className="text-right my-4 mr-6">
              <Text className="text-xl font-bold">
                Total : {calculateTotalForUser(items)}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="w-full flex flex-col items-center pt-8">
        <Text className="text-3xl text-white py-4 my-4 font-bold bg-primary w-full text-center">
          Users Lists
        </Text>
        <Box className="w-[1200px] border">
          <table className="w-full table-auto mt-4">
            <thead>
              <tr className=" bg-primary/10">
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">First Name</th>
                <th className="px-4 py-4 text-left">Last Name</th>
                <th className="px-4 py-4 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {userLists.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Box className="flex text-left">
                      <Text>{item.email}</Text>
                    </Box>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Box className="flex text-left">
                      <Text>{item.firstName}</Text>
                    </Box>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Box className="flex text-left">
                      <Text>{item.lastName}</Text>
                    </Box>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Box className="flex text-left">
                      <Text>{item.phoneNo}</Text>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderLists;
