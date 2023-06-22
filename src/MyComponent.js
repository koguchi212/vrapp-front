import React, { useState } from 'react';
import ReactSpeechRecognitionComponent from './ReactSpeechRecognitionComponent';

const MyComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [glb_fail_path, setGlbFailPath] = useState('');

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
      setGlbFailPath(json['glb_file_path']);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ReactSpeechRecognitionComponent onResult={handleSpeechRecognitionResult} />
      <input type="text" value={prompt} onChange={handlePromptChange} />
      <button onClick={onClickHandler}>Submit</button>
      {glb_fail_path && <p>{glb_fail_path}</p>}
    </div>
  );
};

export default MyComponent;
