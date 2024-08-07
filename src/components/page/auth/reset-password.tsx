"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Section } from "@radix-ui/themes";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const passwordValidationSchema = z
  .object({
    email: z.string().email().min(1, { message: "Email is required!" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(12, { message: "Password must be at most 12 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required!" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

type ResetPasswordRequest = z.infer<typeof passwordValidationSchema>;

const ResetPassword = () => {
  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(passwordValidationSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = (data: ResetPasswordRequest) => {
    try {
      const usersString = localStorage.getItem("users");
      const resetTokenString = localStorage.getItem("resetToken");

      if (!usersString || !resetTokenString) {
        toast.error("No data found.");
        return;
      }

      const users = JSON.parse(usersString);
      const { email, token: storedToken } = JSON.parse(resetTokenString);

      if (token === storedToken && data.email === email) {
        const userIndex = users.findIndex(
          (user: any) => user.email === data.email
        );
        if (userIndex !== -1) {
          users[userIndex].password = data.newPassword;
          localStorage.setItem("users", JSON.stringify(users));
          toast.success("Password updated successfully.");
          router.push("/login");
        } else {
          toast.error("Email not found.");
        }
      } else {
        toast.error("Invalid or expired reset token.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Box className="p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium text-[14px] pb-1">Provider Email</Text>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Provider Email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>

          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium text-[14px] pb-1">New Password</Text>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="New Password"
                        type={showNewPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                        onClick={toggleNewPasswordVisibility}
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
                      >
                        <FontAwesomeIcon
                          icon={showNewPassword ? faEyeSlash : faEye}
                          className="text-gray-500"
                        />
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>

          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium text-[14px] pb-1">
              Confirm Password
            </Text>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                        onClick={toggleConfirmPasswordVisibility}
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEyeSlash : faEye}
                          className="text-gray-500"
                        />
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>

          <Button type="submit" className="mt-4 w-full">
            <div className="text-white font-semibold">Update Password</div>
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default ResetPassword;
