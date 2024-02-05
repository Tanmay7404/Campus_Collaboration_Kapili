import test from "../functions/test.js";
import React, { useState, useEffect } from 'react';


// Use test function to get and display data
function TestComponent(){

    const [data, setData] = useState("Initial");   //define states on which component works
    useEffect(() => {
        test(setData);
    },[]);                    //Pass setState function to the asynchronous function imported.
    return <h1>{data}</h1>
}

export default TestComponent