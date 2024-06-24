import { Box } from "@radix-ui/themes";
import Image from "next/image";
import { Text } from "../ui/typo";

interface Props {
  item: {
    id: string;
    productName: string;
    price: number;
    imageUrl: string;
  };
  index: number;
}

const SaleItem: React.FC<Props> = ({ item, index }) => {
  return (
    <Box
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:scale-105"
      key={index}
    >
      <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full">
        <Image
          src={item.imageUrl}
          alt={item.productName}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <Text className="text-center text-gray-800 font-medium">
        {item.productName}
      </Text>
      <Text className="text-center text-gray-600 mt-2">
        ${item.price.toFixed(2)}
      </Text>
    </Box>
  );
};

export default SaleItem;
