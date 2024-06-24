import React from "react";
import { NextPage } from "next";

import PageLayout from "@/components/layout";

import GirlClothes from "@/components/page/girl-clothes";

const GirlClothesPage: NextPage = () => {
  return (
    <PageLayout>
      <GirlClothes />
    </PageLayout>
  );
};

export default GirlClothesPage;
