import React, { useState } from 'react';
import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";
import ReactSpeechRecognitionComponent from './ReactSpeechRecognitionComponent';

const MyComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSpeechRecognitionResult = (result) => {
    setPrompt(result);
  };

  const onClickHandler = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        mode: 'cors',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const json = await response.json();
      setResponse(json['response']);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <ReactSpeechRecognitionComponent onResult={handleSpeechRecognitionResult} />
      <input type="text" value={prompt} onChange={handlePromptChange} />
      <button onClick={onClickHandler}>Submit</button>
      <Heading as="h2" size="md">
        <h2>chatgpt-apiを使って得た画像生成用プロンプト</h2>
      </Heading>
      {response && <Text>{response}</Text>}
    </Box>
  );
};

export default MyComponent;
