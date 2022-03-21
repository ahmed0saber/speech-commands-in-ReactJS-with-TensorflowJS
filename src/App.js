import React, { useEffect, useState } from 'react'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import * as speech from '@tensorflow-models/speech-commands'

const App = () => {
  const [model, setModel] = useState(null)
  const [action, setAction] = useState(null)
  const [labels, setLabels] = useState(null)

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT")
    console.log("Model Loaded")
    await recognizer.ensureModelLoaded()
    console.log(recognizer.wordLabels())
    setModel(recognizer)
    setLabels(recognizer.wordLabels())
  }

  useEffect(() => loadModel(), [])


  function argMax(arr){
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  const recognizeCommands = async () =>{
    console.log('Listening for commands')
    model.listen(result=>{
      // console.log(labels[argMax(Object.values(result.scores))])
      console.log(result.spectrogram)
      setAction(labels[argMax(Object.values(result.scores))])
    }, {includeSpectrogram:true, probabilityThreshold:0.9})
    setTimeout(()=>enoughTime(), 10e3)
  }

  function enoughTime(){
    model.stopListening()
    console.log("Stoped Listening for commands")
  }

  return (
    <div className="container">
        <button onClick={recognizeCommands}>Command</button>
        {action ? <p>{action}</p> : <p>No Action Detected</p>}
    </div>
  );
}

export default App;