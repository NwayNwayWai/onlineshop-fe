import { v4 as uuidv4 } from "uuid";

export interface Product {
  id: string;
  productName: string;
  category: string;
  price: number;
  description: string;
  size: string[]; // Optional if sizes vary
  imageUrl: string;
  inStock: number;
  quantity: number;
}

export interface OrderProduct {
  id: string;
  shopperName: string;
  shopperEmail: string;
  productName: string;
  category: string;
  price: number;
  description: string;
  size: string[]; // Optional if sizes vary
  imageUrl: string;
  inStock: number;
  quantity: number;
}

// Mock data for top items
export const topItems: Product[] = [
  {
    id: "1",
    productName: "Baby Blue Onesie",
    category: "Top Item",
    price: 15.99,
    description:
      "A soft and comfortable onesie for babies, perfect for everyday wear. Made from 100% cotton.",
    size: ["Newborn", "3M", "6M", "9M", "12M"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 50,
    quantity: 0,
  },
  {
    id: "2",
    productName: "Cozy Baby Blanket",
    category: "Top Item",
    price: 25.99,
    description:
      "Keep your baby warm with this plush and cozy blanket. Available in various colors.",
    size: ["One Size"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 30,
    quantity: 0,
  },
  {
    id: "3",
    productName: "Organic Cotton Baby Mittens",
    category: "Top Item",
    price: 9.99,
    description:
      "Soft mittens to keep your baby’s hands warm and prevent scratching. Made from organic cotton.",
    size: ["One Size"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 100,
    quantity: 0,
  },
  {
    id: "4",
    productName: "Soft Baby Shoes",
    category: "Top Item",
    price: 12.99,
    description:
      "Comfortable and cute baby shoes, ideal for newborns. Made from soft fabric with non-slip soles.",
    size: ["0-6 Months", "6-12 Months"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 80,
    quantity: 0,
  },
  {
    id: "5",
    productName: "Cotton Baby Bibs",
    category: "Top Item",
    price: 8.49,
    description:
      "Absorbent cotton bibs to keep your baby clean during feeding time. Comes in a set of three.",
    size: ["One Size"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 60,
    quantity: 0,
  },
  {
    id: "6",
    productName: "Toddler Sun Hat",
    category: "Top Item",
    price: 11.99,
    description:
      "Protective sun hat for toddlers, made from lightweight and breathable fabric. Available in multiple colors.",
    size: ["Toddler", "2T-4T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 40,
    quantity: 0,
  },
  {
    id: "7",
    productName: "Baby Hooded Towel",
    category: "Top Item",
    price: 18.99,
    description:
      "Soft and absorbent hooded towel for babies, perfect for bath time. Made from plush cotton.",
    size: ["One Size"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 70,
    quantity: 0,
  },
  {
    id: "8",
    productName: "Infant Headbands",
    category: "Top Item",
    price: 6.99,
    description:
      "Adorable and stretchy headbands for infant girls, made from soft and gentle materials.",
    size: ["Newborn", "0-6 Months"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 90,
    quantity: 0,
  },
  {
    id: "9",
    productName: "Baby Socks",
    category: "Top Item",
    price: 4.99,
    description:
      "Cute and cozy baby socks, available in a variety of colors. Made from breathable cotton.",
    size: ["0-6 Months", "6-12 Months"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 120,
    quantity: 0,
  },
  {
    id: "10",
    productName: "Knitted Baby Cardigan",
    category: "Top Item",
    price: 22.99,
    description:
      "Warm and stylish knitted cardigan for babies, featuring button closures. Made from soft yarn.",
    size: ["3-6 Months", "6-12 Months"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 55,
    quantity: 0,
  },
];

// Mock data for boy clothes
export const boyClothes: Product[] = [
  {
    id: "11",
    productName: "Striped Polo Shirt",
    category: "Boy Clothes",
    price: 18.99,
    description:
      "A stylish striped polo shirt for boys, perfect for casual or semi-formal occasions. Made from breathable cotton.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 40,
    quantity: 0,
  },
  {
    id: "12",
    productName: "Dinosaur Print Pajamas",
    category: "Boy Clothes",
    price: 22.99,
    description:
      "Fun and comfortable pajamas with a cool dinosaur print. Made from soft and breathable fabric.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 25,
    quantity: 0,
  },
  {
    id: "13",
    productName: "Denim Shorts",
    category: "Boy Clothes",
    price: 14.99,
    description:
      "Classic denim shorts for boys, perfect for summer adventures. Features an adjustable waistband for comfort.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 35,
    quantity: 0,
  },
  {
    id: "14",
    productName: "Boy's Backpack",
    category: "Boy Clothes",
    price: 29.99,
    description:
      "Spacious and durable backpack for boys, featuring multiple compartments and adjustable straps.",
    size: ["One Size"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 15,
    quantity: 0,
  },
  {
    id: "15",
    productName: "Boy's Swim Trunks",
    category: "Boy Clothes",
    price: 17.99,
    description:
      "Colorful swim trunks for boys, perfect for beach or pool days. Quick-drying fabric with an elastic waistband.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 20,
    quantity: 0,
  },
  {
    id: "16",
    productName: "Boy's Baseball Cap",
    category: "Boy Clothes",
    price: 12.49,
    description:
      "Sporty baseball cap for boys, featuring a breathable design and adjustable strap for a comfortable fit.",
    size: ["Toddler", "Youth"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 30,
    quantity: 0,
  },
  {
    id: "17",
    productName: "Boy's Cargo Pants",
    category: "Boy Clothes",
    price: 24.99,
    description:
      "Stylish cargo pants for boys, made from durable cotton twill. Features multiple pockets and an adjustable waist.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 18,
    quantity: 0,
  },
  {
    id: "18",
    productName: "Boy's Graphic T-Shirt",
    category: "Boy Clothes",
    price: 9.99,
    description:
      "Cool graphic print t-shirt for boys, made from soft and breathable cotton. Available in various designs.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 28,
    quantity: 0,
  },
  {
    id: "19",
    productName: "Boy's Fleece Jacket",
    category: "Boy Clothes",
    price: 31.99,
    description:
      "Warm fleece jacket for boys, perfect for layering in colder weather. Features a full-zip front and cozy pockets.",
    size: ["2T", "3T", "4T", "5T"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 22,
    quantity: 0,
  },
  {
    id: "20",
    productName: "Boy's Sneakers",
    category: "Boy Clothes",
    price: 26.99,
    description:
      "Comfortable sneakers for boys, ideal for everyday wear. Lightweight with a non-slip sole for traction.",
    size: ["Toddler", "Youth"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 32,
    quantity: 0,
  },
];

// Mock data for women clothes
export const womenClothes: Product[] = [
  {
    id: "21",
    productName: "Floral Maternity Dress",
    category: "Women Clothes",
    price: 39.99,
    description:
      "A beautiful floral maternity dress for expecting mothers. Made from stretchy and comfortable fabric.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 20,
    quantity: 0,
  },
  {
    id: "22",
    productName: "Ruffled Blouse",
    category: "Women Clothes",
    price: 29.99,
    description:
      "Elegant ruffled blouse for women, perfect for both casual and formal occasions. Made from lightweight material.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 15,
    quantity: 0,
  },
  {
    id: "23",
    productName: "High-Waisted Jeans",
    category: "Women Clothes",
    price: 34.99,
    description:
      "Comfortable and stylish high-waisted jeans for women, made from stretch denim for a flattering fit.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 30,
    quantity: 0,
  },
  {
    id: "24",
    productName: "Women's Cardigan",
    category: "Women Clothes",
    price: 27.99,
    description:
      "Versatile cardigan for women, perfect for layering. Soft and lightweight with an open front design.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 25,
    quantity: 0,
  },
  {
    id: "25",
    productName: "Women's Running Shorts",
    category: "Women Clothes",
    price: 19.99,
    description:
      "Breathable running shorts for women, designed for comfort and performance. Features an elastic waistband.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 35,
    quantity: 0,
  },
  {
    id: "26",
    productName: "Women's Sandals",
    category: "Women Clothes",
    price: 22.49,
    description:
      "Stylish sandals for women, perfect for summer outings. Features a cushioned footbed and adjustable straps.",
    size: ["5", "6", "7", "8", "9"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 40,
    quantity: 0,
  },
  {
    id: "27",
    productName: "Women's Maxi Dress",
    category: "Women Clothes",
    price: 45.99,
    description:
      "Flowy maxi dress for women, ideal for both casual and formal events. Made from lightweight and airy fabric.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 18,
    quantity: 0,
  },
  {
    id: "28",
    productName: "Women's Workout Leggings",
    category: "Women Clothes",
    price: 29.99,
    description:
      "Stretchy workout leggings for women, designed for flexibility and support during exercise.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 28,
    quantity: 0,
  },
  {
    id: "29",
    productName: "Women's Blazer",
    category: "Women Clothes",
    price: 39.99,
    description:
      "Classic blazer for women, perfect for work or formal occasions. Tailored fit with a single-button closure.",
    size: ["S", "M", "L", "XL"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 22,
    quantity: 0,
  },
  {
    id: "30",
    productName: "Women's Crossbody Bag",
    category: "Women Clothes",
    price: 32.99,
    description:
      "Stylish crossbody bag for women, featuring multiple compartments and an adjustable shoulder strap.",
    size: ["One Size"],
    imageUrl: "https://via.placeholder.com/150",
    inStock: 30,
    quantity: 0,
  },
];

// Combine all products
export const allProducts: Product[] = [
  ...topItems,
  ...boyClothes,
  ...womenClothes,
];
