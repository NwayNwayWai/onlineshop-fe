"use client";
import React, { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import { toast } from "sonner";
import { Image } from "@/components/ui/image";

const Splash: React.FC = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      const token = getToken();
      if (token) {
        toast("Welcome Back");
        startTransition(() => router.replace(`/dashboard`));
      } else {
        startTransition(() => router.replace(`/login`));
      }
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Image
        src={"/upload/images/logo.png"}
        width={220}
        height={220}
        alt="Logo Picture"
      />
    </div>
  );
};

export default Splash;
