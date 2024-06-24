import React from "react";
import { NextPage } from "next";

import PageLayout from "@/components/layout";
import Cart from "@/components/page/cart";

const CardPage: NextPage = () => {
  return (
    <PageLayout>
      <Cart />
    </PageLayout>
  );
};

export default CardPage;
