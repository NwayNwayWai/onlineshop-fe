import React from "react";

import PageLayout from "@/components/layout";

import { findProductById } from "@/utils/findProductById";
import GirlClothesDetail from "@/components/page/girl-clothes/[Id]";
import DetailItem from "@/components/shared/detail-item";

interface ClothesDetailProps {
  params: {
    Id: string;
  };
}

const GirlClothesDetailsPage = async (props: ClothesDetailProps) => {
  const { Id } = props.params;

  const detail = await findProductById(Id);

  return <PageLayout>{detail && <DetailItem detail={detail} />}</PageLayout>;
};

export default GirlClothesDetailsPage;
