"use client";
import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

// Define the validation schema using Zod
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = (data: LoginRequest) => {
    try {
      const usersString = localStorage.getItem("users");
      if (!usersString) {
        toast.error("No users found.");
        return;
      }

      const users: LoginRequest[] = JSON.parse(usersString);
      const user = users.find(
        (user: LoginRequest) =>
          user.email === data.email && user.password === data.password
      );

      if (user) {
        // Store user data in local storage
        localStorage.setItem("authToken", "your-token-here");
        localStorage.setItem("userInfo", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error processing login:", error);
      toast.error("An error occurred. Please try again.");
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
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="text-gray-500"
                        />
                      </button>
                    </div>
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

      <div className="text-center mt-4">
        <Link href="/register" className="text-primary hover:underline">
          Don't have an account? Register here.
        </Link>
      </div>
    </Box>
  );
};

export default Login;
