import React from "react";
import { NextPage } from "next";

import PageLayout from "@/components/layout";
import Dashboard from "@/components/page/dashboard";

const CategoriesPage: NextPage = () => {
  return (
    <PageLayout>
      <Dashboard />
    </PageLayout>
  );
};

export default CategoriesPage;
