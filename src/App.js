import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as tf from '@tensorflow/tfjs'
import * as cocoModel from '@tensorflow-models/coco-ssd'

import './App.css';

function App() {
  const [model, setModel] = useState();
  const [objectName, setObjectName] = useState("");
  const [objectScore, setObjectScore] = useState("");
  
  async function loadModel () {
    try {
      const dataset = await cocoModel.load();
      setModel(dataset)
      console.log('Dataset masuk')
    } catch (error) {
      console.log(error)
    }
  }

  async function predict (){
    const detection = await model.detect(document.getElementById('videoSource'))
    if(detection.length > 0){
      detection.map((result, i) => {
        setObjectName(result.class)
        setObjectScore(result.score)
      })
    }
    console.log(detection)
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])
  const videoOption = {
    width: 720,
    height: 480,
    facingMode: "environment"
  }

  return (
    <div className="App">
      <h1>Object Detection</h1>
      <h3>{objectName ? objectName.toString() : " "}</h3>
      <h3>{objectScore ? objectScore.toString() : " "}</h3>
      <Webcam 
      id="videoSource"
      audio={false}
      videoConstraints={videoOption}
      />
      
      <button style={{width: '50px'}}  onClick={() =>  predict()}>Tebak siapa</button>
    </div>
  );
}

export default App;
