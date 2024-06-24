import React from "react";
import { NextPage } from "next";

import PageLayout from "@/components/layout";

import Setting from "@/components/page/setting";

const SettingPage: NextPage = () => {
  return (
    <PageLayout>
      <Setting />
    </PageLayout>
  );
};

export default SettingPage;
