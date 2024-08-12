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

const Cart = () => {
  const [cartItems, setCartItems] = useState<OrderProduct[]>([]);
  const [allItems, setAllItems] = useState<OrderProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<{
    userName: string;
    email: string;
    avatarUrl?: string;
    isAdmin?: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchTokenAndUserInfo = () => {
      const userInfo = localStorage.getItem("userInfo");
      setUserInfo(userInfo ? JSON.parse(userInfo) : null);
    };

    fetchTokenAndUserInfo();
    window.addEventListener("storage", fetchTokenAndUserInfo);

    return () => {
      window.removeEventListener("storage", fetchTokenAndUserInfo);
    };
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(
        JSON.parse(storedCart).filter(
          (item: any) => item?.shopperEmail == userInfo?.email
        )
      );
      setAllItems(JSON.parse(storedCart));
      console.log("userAccount", userInfo);
    }

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [userInfo]);

  const updateLocalStorage = (items: OrderProduct[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addHistory = (items: OrderProduct[]) => {
    const existingCartItems: OrderProduct[] = JSON.parse(
      localStorage.getItem("OrderHistory") || "[]"
    );
    const updateCart = [...existingCartItems, ...items];
    localStorage.setItem("OrderHistory", JSON.stringify(updateCart));
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

  const handleRemoveAll = () => {
    setAllItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) =>
          !cartItems.some(
            (removeItem) => removeItem.shopperEmail === item.shopperEmail
          )
      );
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const addItemToCart = (itemToAdd: OrderProduct) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === itemToAdd.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + itemToAdd.quantity,
        };
        updateLocalStorage(updatedItems);
        return updatedItems;
      } else {
        const updatedItems = [...prevItems, itemToAdd];
        updateLocalStorage(updatedItems);
        return updatedItems;
      }
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrder = async () => {
    if (isLoggedIn) {
      setDialogMessage("Order confirmed. Redirecting to dashboard...");
      setDialogOpen(true);
      handleRemoveAll();
      addHistory(cartItems);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setDialogMessage("Please log in to place an order.");
      setDialogOpen(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <Box className="w-full flex flex-col items-center">
      <Text className="text-3xl text-primary my-4">My Shopping Cart</Text>
      <Box className="w-full border p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-center">Description</th>
              <th className="px-4 py-2 text-center">Size</th>
              <th className="px-4 py-2 text-center">Quantity</th>
              <th className="px-4 py-2 text-center">Remove</th>
              <th className="px-4 py-2 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 text-center w-[250px] h-[100px]">
                    <Box className="flex items-center justify-start space-x-4">
                      <Box className="w-[80px] h-[80px] flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          width={80}
                          height={80}
                        />
                      </Box>
                      <Grid className="w-[150px] h-full">
                        <Text className="text-lg truncate">
                          {item.productName}
                        </Text>
                        <Text className="truncate">Item code: {item.id}</Text>
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
                        className="flex items-center justify-center bg-primary border w-[40px] h-[40px] cursor-pointer"
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
                        className="flex items-center justify-center bg-primary border w-[40px] h-[40px] cursor-pointer"
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
                        className="flex items-center justify-center bg-primary border w-[40px] h-[40px] cursor-pointer"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X className="p-1" />
                      </Box>
                    </Flex>
                  </td>
                  <td className="px-4 py-2 text-center w-[100px]">
                    {(item.price * item.quantity).toFixed(2)} MMK
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {cartItems.length > 0 && (
          <>
            <Box className="text-right mt-4">
              <Text className="text-xl font-bold">
                Total: {calculateTotal()} MMK
              </Text>
            </Box>
            <Box className="mt-4 text-center">
              <Button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={handleOrder}
              >
                Order
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Dialog for messages */}
      {dialogOpen && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTitle>Message</DialogTitle>
          <DialogContent>
            <Text>{dialogMessage}</Text>
          </DialogContent>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
      )}
    </Box>
  );
};

export default Cart;
