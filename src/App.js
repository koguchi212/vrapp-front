import React from "react";
import MyComponent from "./MyComponent";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";


const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Heading  as="h2" size="md">
          <h1>React Speech Recognition</h1>
        </Heading>
        <MyComponent />
      </div>
    </ChakraProvider>
  );
};

export default App;
