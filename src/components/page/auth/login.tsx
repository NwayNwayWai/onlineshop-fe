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
import { setUserInfo } from "@/utils/auth";
import { toast } from "sonner";

const validationSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(12, { message: "Password must be at most 12 characters long." }),
});
type LoginRequest = z.infer<typeof validationSchema>;

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(validationSchema),
  });

  const submit = async (data: LoginRequest) => {
    if (data.email == "example@gmail.com" && data.password == "User@123**") {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM4OTVjY2ExLWQ0ZTItNGMwNC1iMGI2LTA1YjQ3Y2UyYjEyMSIsImFjY291bnRUeXBlIjoiYWRtaW4iLCJpYXQiOjE3MjIzOTg3MzgsImV4cCI6MTcyMjQ4NTEzOH0.HYaiW5GB7MpC4gLVpmVtebXMtI4-CIuWyK9dSYcT0qc";
      const userInfo = {
        name: "Example User",
        email: "example@gmail.com",
      };
      setUserInfo(token, JSON.stringify(userInfo ?? {}));
      router.push("/dashboard");
    } else {
      toast.error("Invalid Credential");
    }
  };

  return (
    <Box>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium text-[14px] pb-1">Email</Text>
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
            <Text className="font-medium text-[14px] pb-1">Password</Text>
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
          <Button type="submit" className="mt-4 w-full">
            <div className="text-white font-semibold">Login</div>
          </Button>
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
