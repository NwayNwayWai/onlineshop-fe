import SaleItem from "@/components/shared/sale-item";
import { boyClothes } from "@/data/mock-data";
import { Box, Grid } from "@radix-ui/themes";
import Link from "next/link";

import React from "react";

const BoyClothes = () => {
  return (
    <Box className="p-2">
      <Grid columns="3" className="p-1 " gap="6">
        {boyClothes.map((item, index) => (
          <Link href={`/boy-clothes/${item.id}`} key={index}>
            <SaleItem item={item} index={index} />
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default BoyClothes;
