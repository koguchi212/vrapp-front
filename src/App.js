import React from "react";
import MyComponent from "./MyComponent";
import {VrTitle} from "./VrTitle";
import { Container } from "@chakra-ui/react";



const App = () => {
  return (
    <>
      <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
        <VrTitle 
          title="なりきり創造主"
          as="h1"
          fontSize={{ base: "2xl", md: "4xl" }}
        />
        <MyComponent />
      </Container>
    </>
  );
};

export default App;
