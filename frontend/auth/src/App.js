import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";

const emotionCache = createCache({
  key: "emotion-css-cache",
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#121418",
      },
    }),
  },
});

export default function App() {
  return (
    <Router>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </ChakraProvider>
      </CacheProvider>
    </Router>
  );
}
