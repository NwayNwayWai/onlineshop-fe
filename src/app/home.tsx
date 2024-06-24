"use client";
import { PropsWithChildren } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Provider } from "react-redux";

import store from "@/stores";
import { Theme } from "@radix-ui/themes";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <div>
      <Provider store={store}>
        <Theme>{children}</Theme>
      </Provider>
      <ProgressBar
        height="4px"
        color="#CB0F06"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
}
