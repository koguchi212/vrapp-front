import React, { useEffect, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

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
    <div id="react-speech-recognition">
      <p>入力: {listening ? "on" : "off"}</p>
      <button type="button" onClick={startListening}>
        入力開始
      </button>
      <button type="button" onClick={stopListening}>
        Stop
      </button>
      <button type="button" onClick={resetTranscriptHandler}>
        リセット
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default ReactSpeechRecognitionComponent;
