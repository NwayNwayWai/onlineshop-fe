import { Product, allProducts } from "@/data/mock-data";

export function findProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id == id);
}
