// src/components/Settings.tsx
"use client";
import { useState } from "react";
import AccountSettings from "./account-settings";
import PrivacySettings from "./privacy-settings";

import { Box, Flex } from "@radix-ui/themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("account");

  return (
    <Flex justify="center" className="p-2">
      <Tabs defaultValue="account" className="w-[700px]">
        <TabsList className="grid w-full  bg-primary/20">
          <TabsTrigger value="account" className="w-full">
            Profile
          </TabsTrigger>
          {/* <TabsTrigger value="pp">Security</TabsTrigger> */}
        </TabsList>
        <TabsContent value="account">
          <Card>
            <Box>
              <AccountSettings />
            </Box>
          </Card>
        </TabsContent>
        {/* <TabsContent value="pp">
          <Card>
            <Box>
              <PrivacySettings />
            </Box>
          </Card>
        </TabsContent> */}
      </Tabs>
    </Flex>
  );
};

export default Settings;
