import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./components/theme-provider.tsx";
import { THEME_PROVIDER_STORAGE_KEY } from "./configs/env.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  initializeQueryClient,
  queryClientInitialized,
} from "./clients/reactQuery.ts";
import { Toaster } from "react-hot-toast";
import router from "./router.tsx";
import "./App.css";

startApp();
async function startApp() {
  console.log("🚀 startApp...");
  initializeQueryClient();

  await render();
}

async function render() {
  console.log("🚀 render");
  const queryClient: any = await queryClientInitialized;

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          defaultTheme="light"
          storageKey={THEME_PROVIDER_STORAGE_KEY}
        >
          <Toaster />
          {router}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
