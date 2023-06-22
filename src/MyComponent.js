import React, { useState } from "react";
import { Box, Button, Input, Heading, Text, Flex } from "@chakra-ui/react";
import ReactSpeechRecognitionComponent from "./ReactSpeechRecognitionComponent";

const MyComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [buttonColor, setButtonColor] = useState("green");

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSpeechRecognitionResult = (result) => {
    setPrompt(result);
  };

  const onClickHandler = async () => {
    try {
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
      setButtonColor("lightBlue"); // ボタンの色を変更
    } catch (error) {
      console.error(error);
    }
  };

  const resetHandler = () => {
    setPrompt("");
    setResponse("");
    setButtonColor("green"); // ボタンの色を元に戻す
  };

  return (
    <Box>
      <ReactSpeechRecognitionComponent onResult={handleSpeechRecognitionResult} />
      <Flex mt={8}>
        <Input type="text" value={prompt} onChange={handlePromptChange} bgColor="white" borderColor="gray.400" mr={2} />
        <Button onClick={onClickHandler} colorScheme={buttonColor}>
          Submit
        </Button>
        <Button onClick={resetHandler} colorScheme="red" ml={2}>
          Reset
        </Button>
      </Flex>
      <Heading as="h2" size="md" mt={8}>
        chatgpt-apiを使って得た画像生成用プロンプト
      </Heading>
      {response && <Text>{response}</Text>}
    </Box>
  );
};

export default MyComponent;
