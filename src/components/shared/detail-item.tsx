"use client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { Image } from "../ui/image";
import { Text } from "../ui/typo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Product } from "@/data/mock-data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RegisterRequest } from "../page/auth/register";

interface DetailProps {
  detail: Product;
}

interface CartItem {
  id: string;
  shopperEmail: string;
  shopperName: string;
  productId: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  size: string;
  quantity: number;
  totalPrice: string;
}

const DetailItem: React.FC<DetailProps> = ({ detail }) => {
  const router = useRouter();
  const { id, productName, price, description, imageUrl, size } = detail;

  const [selectedSize, setSelectedSize] = useState<string>(size[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const [userInfo, setUserInfo] = useState<{
    userName: string;
    email: string;
    avatarUrl?: string;
    isAdmin?: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchTokenAndUserInfo = () => {
      const userInfo = localStorage.getItem("userInfo");
      console.log("user", userInfo);
      setUserInfo(userInfo ? JSON.parse(userInfo) : null);
    };

    fetchTokenAndUserInfo();
    window.addEventListener("storage", fetchTokenAndUserInfo);

    return () => {
      window.removeEventListener("storage", fetchTokenAndUserInfo);
    };
  }, []);

  if (!productName || !price || !description || !imageUrl || !size) {
    return <Text>Loading...</Text>;
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    // Ensure value is a valid positive integer
    if (isNaN(value) || value < 1) {
      setQuantity(1); // Default to 1 if input is invalid
    } else {
      setQuantity(value);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleCalculateTotal = () => {
    const totalPrice = price * quantity;
    return totalPrice.toFixed(2);
  };

  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      id: uuidv4(),
      productId: id,
      shopperEmail: userInfo?.email ?? "",
      shopperName: userInfo?.userName ?? "",
      productName: productName,
      price: price,
      description: description,
      imageUrl: imageUrl,
      size: selectedSize,
      quantity: quantity,
      totalPrice: handleCalculateTotal(),
    };

    // Retrieve existing cart items from localStorage
    const existingCartItems: CartItem[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    // Find index of existing item based on productId and size
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.productId === id && item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      const existingItem = existingCartItems[existingItemIndex];
      existingItem.quantity += quantity;
      existingItem.totalPrice = (
        existingItem.price * existingItem.quantity
      ).toFixed(2);

      // Update the item in the array
      existingCartItems[existingItemIndex] = existingItem;
    } else {
      // Add new item to cart
      existingCartItems.push(cartItem);
    }

    // Save updated cart items back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

    // Redirect to cart
    router.push("/cart");
  };

  return (
    <Box className="p-4">
      <Box className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-2">
        <Box className="relative w-40 h-40 mb-4 overflow-hidden rounded-full">
          <Image
            src={imageUrl}
            alt={productName}
            width={400}
            height={400}
            className="rounded-lg"
          />
        </Box>
        <Box>
          <Text className="text-2xl font-bold mb-2">{productName}</Text>
        </Box>
        <Box>
          <Text className="text-gray-800 mb-4">
            Price : {price.toFixed(2)} MMK
          </Text>
        </Box>
        <Box>
          <Text className="text-gray-700 mb-4">{description}</Text>
        </Box>
        <Grid>
          <Box className="flex items-center mb-4">
            <Text className="mr-2 w-[150px]">Choose Size:</Text>
            <Select onValueChange={setSelectedSize} value={selectedSize}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Size</SelectLabel>
                  {size.map((item, key) => (
                    <SelectItem value={item} key={key}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Box>

          <Box className="flex items-center mb-4">
            <Text className="mr-2 w-[150px]">Choose Quantity:</Text>
            <Flex align="center">
              <Button onClick={handleDecreaseQuantity} className="mr-2">
                -
              </Button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded px-3 py-1 w-[60px] text-center focus:outline-none"
              />
              <Button onClick={handleIncreaseQuantity} className="ml-2">
                +
              </Button>
            </Flex>
          </Box>
          <Flex align="center">
            <Box className="w-[160px]">
              <Text className="text-gray-800 mb-4">Total Price:</Text>
            </Box>
            <Box>
              <Text className="text-gray-800 mb-4">
                {handleCalculateTotal()} MMK
              </Text>
            </Box>
          </Flex>
        </Grid>
        <Flex className="space-x-2 pt-6">
          <Button variant="outline" onClick={router.back}>
            Cancel
          </Button>

          {!userInfo?.isAdmin && (
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailItem;
