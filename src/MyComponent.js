import React, { useState, useEffect, Suspense, unstable_startTransition as startTransition } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ReactSpeechRecognitionComponent from './ReactSpeechRecognitionComponent';

const MyComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [glbFilePath, setGlbFilePath] = useState('');

  useEffect(() => {
    if (glbFilePath) {
      console.log('GLBファイルパス:', glbFilePath);
    }
  }, [glbFilePath]);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSpeechRecognitionResult = (result) => {
    setPrompt(result);
  };

  const onClickHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const json = await response.json();
      startTransition(() => {
        setGlbFilePath(json['glb_file_path']);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Model = () => {
    const gltf = useLoader(GLTFLoader, glbFilePath);
    return <primitive object={gltf.scene} dispose={null} />;
  };

  return (
    <div>
      <ReactSpeechRecognitionComponent onResult={handleSpeechRecognitionResult} />
      <input type="text" value={prompt} onChange={handlePromptChange} />
      <button onClick={onClickHandler}>Submit</button>
      {glbFilePath && (
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight />
            <Model />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default MyComponent;

