import React, { useEffect, useCallback, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

const ReactSpeechRecognitionComponent = ({ onResult }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);

  const handleRecognitionResult = useCallback(() => {
    onResult(transcript);
  }, [onResult, transcript]);

  useEffect(() => {
    handleRecognitionResult();
  }, [handleRecognitionResult]);

  if (!browserSupportsSpeechRecognition) {
    return <span>ブラウザが音声認識未対応です</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening();
    setIsRecording(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };

  const resetTranscriptHandler = () => {
    resetTranscript();
    setIsRecording(false);
  };

  return (
    <Box id="react-speech-recognition">
      <Flex direction="row" alignItems="center" mt={8}>
        <Button
          type="button"
          onClick={startListening}
          colorScheme={isRecording ? "red" : "blue"}
          mr={4}
        >
          録音開始
        </Button>
        <Button type="button" onClick={stopListening} colorScheme="blue" mr={4}>
          Stop
        </Button>
        <Button type="button" onClick={resetTranscriptHandler} colorScheme="blue">
          リセット
        </Button>
        <Text ml={4}>入力: {isRecording ? "on" : "off"}</Text>
      </Flex>
      <Text>{transcript}</Text>
    </Box>
  );
};

export default ReactSpeechRecognitionComponent;
