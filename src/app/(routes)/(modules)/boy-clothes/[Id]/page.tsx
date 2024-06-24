import React from "react";

import PageLayout from "@/components/layout";

import BoyClothesDetail from "@/components/page/boy-clothes/[Id]";
import { findProductById } from "@/utils/findProductById";

interface ClothesDetailProps {
  params: {
    Id: string;
  };
}

const BoyClothesDetailsPage = async (props: ClothesDetailProps) => {
  const { Id } = props.params;

  const detail = await findProductById(Id);

  return (
    <PageLayout>{detail && <BoyClothesDetail detail={detail} />}</PageLayout>
  );
};

export default BoyClothesDetailsPage;
