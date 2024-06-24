import SaleItem from "@/components/shared/sale-item";
import { womenClothes } from "@/data/mock-data";
import { Box, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";

import React from "react";

const GirlClothes = () => {
  return (
    <Box className="p-2">
      <Grid columns="3" className="p-1 " gap="6">
        {womenClothes.map((item, index) => (
          <Link href={`/girl-clothes/${item.id}`} key={index}>
            <SaleItem item={item} index={index} />
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default GirlClothes;
