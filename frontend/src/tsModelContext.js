// ModelContext.js

import React, { createContext, useState, useContext,useEffect } from 'react';
import { load } from '@tensorflow-models/toxicity';
import * as tf from '@tensorflow/tfjs'

const ModelContext = createContext();

export const useModel = () => useContext(ModelContext);

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);

  // Load the model when the component mounts
  useEffect(() => {
    async function loadModel() {
      try {
        console.log("downloading TSFlow Model")
        const threshold = 0.9;
        const loadedModel = await load(threshold);
        setModel(loadedModel);
        console.log("successfully downloaded TSFlow Model")

      } catch (error) {
        console.error('Error loading model:', error);
      }
    }
    loadModel();
  }, []);

  return (
    <ModelContext.Provider value={model}>
      {children}
    </ModelContext.Provider>
  );
};
