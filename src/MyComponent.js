import React, { useState, useEffect } from "react";
import { Box, Button, Input, Heading, Text, Flex } from "@chakra-ui/react";
import ReactSpeechRecognitionComponent from "./ReactSpeechRecognitionComponent";

const MyComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [buttonColor, setButtonColor] = useState("green");
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSpeechRecognitionResult = (result) => {
    setPrompt(result);
  };

  const onClickHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5000/", {
        mode: "cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const json = await response.json();
      setResponse(json["response"]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response) {
      setButtonColor("green");
    }
  }, [response]);

  return (
    <Box>
      <ReactSpeechRecognitionComponent onResult={handleSpeechRecognitionResult} />
      <Flex mt={8}>
        <Input type="text" value={prompt} onChange={handlePromptChange} bgColor="white" borderColor="gray.400" mr={2} />
        <Button onClick={onClickHandler} colorScheme={buttonColor} isLoading={isLoading}>
          {isLoading ? "送信中です" : "Submit"}
        </Button>
      </Flex>
      <Heading as="h2" size="md" mt={8}>
        chatgpt-apiを使って得た画像生成用プロンプト
      </Heading>
      {isLoading ? (
        <Text>送信中です</Text>
      ) : (
        response && <Text>{response}</Text>
      )}
    </Box>
  );
};

export default MyComponent;
