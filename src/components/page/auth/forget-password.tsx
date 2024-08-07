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
import { v4 as uuidv4 } from "uuid"; // Install uuid if you don't have it

const validationSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!" }),
});

type ForgetPasswordRequest = z.infer<typeof validationSchema>;

const ForgetPassword = () => {
  const form = useForm<ForgetPasswordRequest>({
    resolver: zodResolver(validationSchema),
  });
  const [emailSent, setEmailSent] = useState(false);

  const submit = async (data: ForgetPasswordRequest) => {
    try {
      const usersString = localStorage.getItem("users");
      if (!usersString) {
        toast.error("No users found.");
        return;
      }

      const users = JSON.parse(usersString);
      const user = users.find((user: any) => user.email === data.email);

      if (user) {
        // Generate a unique token and store it
        const resetToken = uuidv4();
        localStorage.setItem(
          "resetToken",
          JSON.stringify({ email: data.email, token: resetToken })
        );

        // Normally, you'd send an email with a link containing the resetToken
        // For this simulation, we'll assume that the user is redirected to a reset page
        setEmailSent(true);
        toast.success(
          "Password reset link has been simulated. Please proceed to reset your password."
        );
        // Redirect user to the reset password page
        window.location.href = `/reset-password?token=${resetToken}`;
      } else {
        toast.error("Email not found.");
      }
    } catch (error) {
      console.error("Error processing request:", error);
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

          <Button type="submit" className="mt-4 w-full">
            <div className="text-white font-semibold">Reset Password</div>
          </Button>

          {emailSent && (
            <div className="text-green-600 mt-4">
              Check your email to reset your password.
            </div>
          )}
        </form>
      </Form>
    </Box>
  );
};

export default ForgetPassword;
