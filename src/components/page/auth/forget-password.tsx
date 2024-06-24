"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Section } from "@radix-ui/themes";

const validationSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!" }),
});
type LoginRequest = z.infer<typeof validationSchema>;

const ForgetPassword = () => {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(validationSchema),
  });

  const submit = async (data: LoginRequest) => {};

  return (
    <Box>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <Section py="0" px="0" className="mb-4">
            <Text className="font-medium font-[14px] pb-1">Provider Email</Text>
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
        </form>
      </Form>
    </Box>
  );
};

export default ForgetPassword;
