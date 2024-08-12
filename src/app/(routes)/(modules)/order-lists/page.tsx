import React from "react";
import { NextPage } from "next";

import PageLayout from "@/components/layout";
import OrderLists from "@/components/page/order-list";

const CardPage: NextPage = () => {
  return (
    <PageLayout>
      <OrderLists />
    </PageLayout>
  );
};

export default CardPage;
