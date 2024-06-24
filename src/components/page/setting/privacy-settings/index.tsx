"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const phoneRegExp = /^[0-9]{11}$/;

const validationSchema = z.object({
  changePass: z.string().email().min(1, { message: "Email is required!" }),
  twoFactor: z.string().min(1, { message: "Password is required!" }),
  privacy: z.string().min(1, { message: "Password is required!" }),
});
type LoginRequest = z.infer<typeof validationSchema>;

const PrivacySettings = () => {
  const router = useRouter();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(validationSchema),
  });

  const submit = async (data: LoginRequest) => {
    router.push("/dashboard");
  };

  return (
    <Box className="p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <Section py="0" px="0" className="mb-4 w-full">
            <Text className="font-medium font-[14px] pb-1">
              Change Password
            </Text>
            <FormField
              control={form.control}
              name="changePass"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Change Password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>
          <Section py="0" px="0" className="mb-2">
            <Flex className="space-x-2">
              <Text className="font-medium font-[14px] pb-1">
                Two-Factor Authentication:
              </Text>
              <Box className="p-1 ">
                <Checkbox />
              </Box>
            </Flex>
          </Section>{" "}
          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium font-[14px] pb-1">Privacy</Text>
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a privacy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>
          <Flex justify="center" className="space-x-2">
            <Link href={"/dashboard"}>
              <Button type="submit" className="mt-4 w-[180px]">
                <div className="text-white font-semibold">Reset</div>
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button type="submit" className="mt-4 w-[180px]">
                <div className="text-white font-semibold">Save Changes</div>
              </Button>
            </Link>
          </Flex>
        </form>
      </Form>
    </Box>
  );
};

export default PrivacySettings;
