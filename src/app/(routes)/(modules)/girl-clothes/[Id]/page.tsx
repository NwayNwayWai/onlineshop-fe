import React from "react";

import PageLayout from "@/components/layout";

import { findProductById } from "@/utils/findProductById";
import GirlClothesDetail from "@/components/page/girl-clothes/[Id]";

interface ClothesDetailProps {
  params: {
    Id: string;
  };
}

const GirlClothesDetailsPage = async (props: ClothesDetailProps) => {
  const { Id } = props.params;

  const detail = await findProductById(Id);

  return (
    <PageLayout>{detail && <GirlClothesDetail detail={detail} />}</PageLayout>
  );
};

export default GirlClothesDetailsPage;
