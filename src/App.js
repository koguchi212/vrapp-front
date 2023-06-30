import React from "react";
import MyComponent from "./MyComponent";
import { VrTitle } from "./VrTitle";
import { Box, Container } from "@chakra-ui/react";

const App = () => {
  return (
    <Box textAlign="center" pt="4" pb="6">
      <Container centerContent p={{ base: "4", md: "6" }} maxWidth="3xl">
        <Container
          bg="gray.200"
          p="4"
          mt="4"
          borderRadius="md"
          maxWidth="2xl"
        >
          <VrTitle
            title={
              <>
                なりきり
                <span style={{ color: "orange" }}>創造主</span>
              </>
            }
            as="h1"
            fontSize={{ base: "2xl", md: "4xl" }}
          />
        </Container>
        <MyComponent />
      </Container>
    </Box>
  );
};

export default App;