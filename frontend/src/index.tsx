import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./style/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { AuthProvider } from "./AuthContext";
import { FresherContextProvider } from "./fresherContext";
import { TaskContextProvider } from "./TaskContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <FresherContextProvider>
          <TaskContextProvider>
            <RouterProvider router={router} />
          </TaskContextProvider>
        </FresherContextProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
