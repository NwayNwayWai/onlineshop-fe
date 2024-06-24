import React from "react";
import { NextPage } from "next";

import PageLayout from "@/components/layout";

import BoyClothes from "@/components/page/boy-clothes";

const BoyClothesPage: NextPage = () => {
  return (
    <PageLayout>
      <BoyClothes />
    </PageLayout>
  );
};

export default BoyClothesPage;
