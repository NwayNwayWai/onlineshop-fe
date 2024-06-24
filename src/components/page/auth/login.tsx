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
import { Box, Flex, Section } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});
type LoginRequest = z.infer<typeof validationSchema>;

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(validationSchema),
  });

  const submit = async (data: LoginRequest) => {
    router.push("/dashboard");
  };

  return (
    <Box>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
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
          <Section py="0" px="0">
            <Text className="font-medium font-[14px] pb-1">Password</Text>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Enter Password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>
          <Link
            href={"/forget-password"}
            className="text-left text-sm underline text-primary font-medium pt-[10px]"
          >
            Forget Password?
          </Link>
          <Link href={"/dashboard"}>
            <Button type="submit" className="mt-4 w-full">
              <div className="text-white font-semibold">Login</div>
            </Button>
          </Link>
        </form>
      </Form>

      <Flex align="center" className="pt-[10px] space-x-2">
        <Checkbox />
        <div className="text-base">Remember me</div>
      </Flex>
    </Box>
  );
};

export default Login;
