"use client";
import { Product } from "@/data/mock-data";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface detailProps {
  detail: Product;
}

const cart = () => {
  return (
    <Box className="w-full flex flex-col items-center">
      <Text className="text-3xl text-primary my-4">My Shopping Cart</Text>
      <Box className="w-[800px] border p-4">
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
            <tr className="border-b">
              <td className="px-4 py-2 text-center">
                <Box className="flex items-center justify-center">
                  <img
                    src="/upload/icons/dashboard/dashboard_image1.png"
                    alt="Item Description"
                    className="w-20 h-20 mr-2"
                  />
                  <Grid>
                    <Text className="text-lg">Item Description</Text>

                    <Text>Item code : 001</Text>
                  </Grid>
                </Box>
              </td>
              <td className="px-4 py-2 text-center">
                <Flex align="center" justify="center">
                  <Box className="flex items-center justify-center bg-primary w-[40px] h-[40px] border">
                    <Text className="text-center">S</Text>
                  </Box>
                </Flex>
              </td>
              <td className="px-4 py-2 text-center">
                <Box className="flex items-center justify-center">
                  <Box className="flex items-center justify-center bg-primary border w-[40px] h-[40px]">
                    <Plus className="p-1" />
                  </Box>
                  <Box className="flex items-center justify-center bg-primary border w-[40px] h-[40px]">
                    <Text className="text-center">1</Text>
                  </Box>
                  <Box className="flex items-center justify-center bg-primary border w-[40px] h-[40px]">
                    <Minus className="p-1" />
                  </Box>
                </Box>
              </td>
              <td className="px-4 py-2 text-center">
                <Flex align="center" justify="center">
                  <Box className="flex items-center justify-center bg-primary border w-[40px] h-[40px]">
                    <X className="p-1" />
                  </Box>
                </Flex>
              </td>
              <td className="px-4 py-2 text-center">$10.00</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default cart;
