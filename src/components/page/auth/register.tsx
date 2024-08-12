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
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

const phoneRegExp = /^[0-9]{11}$/;

export const validationSchema = z
  .object({
    email: z.string().email().min(1, { message: "Email is required!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(12, { message: "Password must be at most 12 characters long." }),
    conPassword: z
      .string()
      .min(1, { message: "Confirmation password is required!" }),
    userName: z.string().min(1, { message: "Username is required!" }),
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    phoneNo: z
      .string()
      .min(1, { message: "Phone Number is required!" })
      .regex(phoneRegExp, {
        message: "Phone number must be exactly 11 digits long",
      }),
    isAdmin: z.boolean().catch(false),
  })
  .refine((data) => data.password === data.conPassword, {
    message: "Passwords must match!",
    path: ["conPassword"],
  });

export type RegisterRequest = z.infer<typeof validationSchema>;

const Register = () => {
  const router = useRouter();
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };

  const submit = (data: RegisterRequest) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((user: any) => user?.email === data.email);

    if (emailExists) {
      toast.error("Email already exists. Please use a different email.");
    } else {
      // If the email doesn't exist, add the new user and update localStorage
      users.push(data);
      localStorage.setItem("users", JSON.stringify(users));
      router.push("/login");
      toast.success("Please login again");
    }
  };

  return (
    <Box>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={form.handleSubmit(submit)}
        >
          <Section py="0" px="0" className="mb-4 w-full">
            <Text className="font-medium text-[14px] pb-1">User Name</Text>
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
              <Text className="font-medium text-[14px] pb-1">First Name</Text>
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
            </Section>
            <Section py="0" px="0" className="mb-4">
              <Text className="font-medium text-[14px] pb-1">Last Name</Text>
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
            <Text className="font-medium text-[14px] pb-1">Email</Text>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>

          <Grid columns="2" className="w-full space-x-2 ">
            <Section py="0" px="0" className="w-full">
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
            <Section py="0" px="0" className="w-full">
              <Text className="font-medium text-[14px] pb-1">
                Confirm Password
              </Text>
              <FormField
                control={form.control}
                name="conPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type={showConPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-2"
                          onClick={toggleConPasswordVisibility}
                        >
                          <FontAwesomeIcon
                            icon={showConPassword ? faEyeSlash : faEye}
                            className="text-gray-500"
                          />
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Section>
          </Grid>

          <Section py="0" px="0" className=" w-full">
            <Text className="font-medium text-[14px] pb-1">Phone Number</Text>
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone Number"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>
          <Section py="0" px="0" className=" w-full">
            <Text className="font-medium text-[14px] pb-1">Phone Number</Text>
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Flex align="center" className="space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="text-base">Admin</div>
                    </Flex>
                  </FormControl>
                </FormItem>
              )}
            />
          </Section>

          <Button type="submit" className="mt-4 w-full">
            <div className="text-white font-semibold">Register</div>
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <Link href="/login" className="text-primary hover:underline">
          Already have an account? Login here.
        </Link>
      </div>
    </Box>
  );
};

export default Register;
