"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import { logout } from "@/utils/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const phoneRegExp = /^[0-9]{11}$/;

const validationSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
  conPassword: z
    .string()
    .min(1, { message: "Password confirmation is required!" }),
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

type AccountSettingsForm = z.infer<typeof validationSchema>;

const AccountSettings = () => {
  const router = useRouter();
  const methods = useForm<AccountSettingsForm>({
    resolver: zodResolver(validationSchema),
  });

  const [originalData, setOriginalData] = useState<AccountSettingsForm | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
    const usersString = localStorage.getItem("users");
    if (usersString) {
      const users = JSON.parse(usersString);
      const loggedInUser = users[0];
      setOriginalData(loggedInUser);
      setValue("email", loggedInUser.email);
      setValue("userName", loggedInUser.userName);
      setValue("firstName", loggedInUser.firstName);
      setValue("lastName", loggedInUser.lastName);
      setValue("phoneNo", loggedInUser.phoneNo);
      setValue("password", loggedInUser.password);
      setValue("conPassword", loggedInUser.password);
    }
  }, [setValue, router]);

  const submit: SubmitHandler<AccountSettingsForm> = async (data) => {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      let users = JSON.parse(usersString);
      const loggedInUserIndex = 0;
      users[loggedInUserIndex] = data;
      localStorage.setItem("users", JSON.stringify(users));
      router.push("/dashboard");
    }
  };

  const resetForm = () => {
    if (originalData) {
      setValue("email", originalData.email);
      setValue("userName", originalData.userName);
      setValue("firstName", originalData.firstName);
      setValue("lastName", originalData.lastName);
      setValue("phoneNo", originalData.phoneNo);
      setValue("password", originalData.password);
      setValue("conPassword", originalData.password);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box className="p-4 text-center">
        <p className="text-red-600 font-semibold">
          User is not logged in. Please log in to access this page.
        </p>
        <Link href="/login">
          <Button className="mt-4">Go to Login</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box className="p-4">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3 pt-6"
          onSubmit={handleSubmit(submit)}
        >
          <Section py="0" px="0" className="mb-4 w-full">
            <FormLabel
              htmlFor="userName"
              className="font-medium text-[14px] pb-1"
            >
              User Name
            </FormLabel>
            <FormItem>
              <FormControl>
                <Input
                  {...register("userName")}
                  id="userName"
                  placeholder="User Name"
                />
              </FormControl>
            </FormItem>
            {errors.userName && <p>{errors.userName.message}</p>}
          </Section>
          <Grid columns="2" className="w-full space-x-2">
            <Section py="0" px="0" className="mb-4">
              <FormLabel
                htmlFor="firstName"
                className="font-medium text-[14px] pb-1"
              >
                First Name
              </FormLabel>
              <FormItem>
                <FormControl>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    placeholder="First Name"
                  />
                </FormControl>
              </FormItem>
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </Section>
            <Section py="0" px="0" className="mb-4">
              <FormLabel
                htmlFor="lastName"
                className="font-medium text-[14px] pb-1"
              >
                Last Name
              </FormLabel>
              <FormItem>
                <FormControl>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    placeholder="Last Name"
                  />
                </FormControl>
              </FormItem>
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </Section>
          </Grid>
          <Section py="0" px="0" className="mb-4">
            <FormLabel htmlFor="email" className="font-medium text-[14px] pb-1">
              Email
            </FormLabel>
            <FormItem>
              <FormControl>
                <Input {...register("email")} id="email" placeholder="Email" />
              </FormControl>
            </FormItem>
            {errors.email && <p>{errors.email.message}</p>}
          </Section>
          <Grid columns="2" className="w-full space-x-2">
            <Section py="0" px="0" className="w-full">
              <FormLabel
                htmlFor="password"
                className="font-medium text-[14px] pb-1"
              >
                Password
              </FormLabel>
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      id="password"
                      placeholder="Enter Password"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
              {errors.password && <p>{errors.password.message}</p>}
            </Section>
            <Section py="0" px="0" className="w-full">
              <FormLabel
                htmlFor="conPassword"
                className="font-medium text-[14px] pb-1"
              >
                Confirm Password
              </FormLabel>
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...register("conPassword")}
                      id="conPassword"
                      placeholder="Confirm Password"
                      type={showConPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConPassword(!showConPassword)}
                    >
                      {showConPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
              {errors.conPassword && <p>{errors.conPassword.message}</p>}
            </Section>
          </Grid>
          <Section py="0" px="0" className="mb-4">
            <FormLabel
              htmlFor="phoneNo"
              className="font-medium text-[14px] pb-1"
            >
              Phone Number
            </FormLabel>
            <FormItem>
              <FormControl>
                <Input
                  {...register("phoneNo")}
                  id="phoneNo"
                  placeholder="Phone Number"
                  type="number"
                />
              </FormControl>
            </FormItem>
            {errors.phoneNo && <p>{errors.phoneNo.message}</p>}
          </Section>
          <Flex justify="between" className="mt-4">
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit">Save Changes</Button>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AccountSettings;
