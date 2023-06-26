import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#0f0f13",
      },
    }),
  },
});
export const hostUrl = ''  

export default function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route exact path="auth/" element={<Login />} />
          <Route exact path="auth/signup" element={<Signup />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}
