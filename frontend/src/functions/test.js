async function test(setState) {
    
    try {
        const response = await fetch("http://localhost:8080/", {
            method: "GET" // GET, POST, PUT, DELETE, PATCH, etc.
            // headers: {
            // "Content-Type": "application/json",
            // As sending JSON data to API
            // },
            // body: JSON.stringify(data)   //if data to be given to the backend, uncomment this and the header, with data input in function
        });
        const data = await response.json();
        setState(data.message);
        return;
    }
    catch(err){
        setState("error");
        return;
    }
    
}


export default test