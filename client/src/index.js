import "./style";
import { Router } from "preact-router";
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/header";
import Home from "./routes/home";

const App = () => (
  <div id="app">
    <ChakraProvider>
      <Header />
      <Router>
        <Home path="/" />
      </Router>
    </ChakraProvider>
  </div>
);

export default App;
