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
const phoneRegExp = /^[0-9]{11}$/;

const validationSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
  conPassword: z.string().min(1, { message: "Password is required!" }),
  userName: z.string().min(1, { message: "Username is required!" }),
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  phoneNo: z
    .string()
    .min(1, { message: "Phone Number is required!" })
    .regex(phoneRegExp, {
      message: "Phone number must be exactly 11 digits long",
    }),
});
type LoginRequest = z.infer<typeof validationSchema>;

const AccountSettings = () => {
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
            <Text className="font-medium font-[14px] pb-1">User Name</Text>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="User Name" />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>
          <Grid columns="2" className="w-full space-x-2 ">
            <Section py="0" px="0" className="mb-4">
              <Text className="font-medium font-[14px] pb-1">First Name</Text>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Section>{" "}
            <Section py="0" px="0" className="mb-4">
              <Text className="font-medium font-[14px] pb-1">Last Name</Text>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Section>
          </Grid>
          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium font-[14px] pb-1">Email</Text>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="User ID/Email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>
          <Grid columns="2" className="w-full space-x-2 ">
            <Section py="0" px="0" className="w-full">
              <Text className="font-medium font-[14px] pb-1">Password</Text>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Section>
            <Section py="0" px="0" className="w-full">
              <Text className="font-medium font-[14px] pb-1">
                Confirm Password
              </Text>
              <FormField
                control={form.control}
                name="conPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Confirm Password"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Section>
          </Grid>
          <Section py="0" px="0" className="mb-4 w-full">
            <Text className="font-medium font-[14px] pb-1">Phone Number</Text>
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Phone Number" />
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

export default AccountSettings;
