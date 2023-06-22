import React, { useEffect, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Box, Button, Text } from "@chakra-ui/react";


const ReactSpeechRecognitionComponent = ({ onResult }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

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
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const resetTranscriptHandler = () => {
    resetTranscript();
  };

  return (
    <Box id="react-speech-recognition">
      <Text>入力: {listening ? "on" : "off"}</Text>
      <Button type="button" onClick={startListening}>
        入力開始
      </Button>
      <Button type="button" onClick={stopListening}>
        Stop
      </Button>
      <Button type="button" onClick={resetTranscriptHandler}>
        リセット
      </Button>
      <Text>{transcript}</Text>
    </Box>
  );
};

export default ReactSpeechRecognitionComponent;
