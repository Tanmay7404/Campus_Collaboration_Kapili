import { useState, useContext, useEffect } from "react";
import userdataContext from "./userdataContext";
import UserContext from "./userContext.jsx";

const UserdataState = (props) => {
    const [userdata, setuserData] = useState();
    
    const [currUser ,setCurrUser]=useState(localStorage.getItem("user"));
    console.log('pop');
    console.log(currUser);
    const [trigger ,setTrigger]=useState(0);

    useEffect(()=>{

setCurrUser(localStorage.getItem("user"))

    },[trigger])
    useEffect(() => {
        async function fetchData() {
console.log(userdata)

    if (currUser) {
            console.log("USER data loading ")
            try {
                const response = await fetch("http://localhost:8080/user/getUser/" + currUser, {
                    method: "GET"
                });
                
                const res = await response.json();
                setuserData(res);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setuserData([]);
            }
        }}

        fetchData(); // Call fetchData when the component mounts or currUser changes
    }, [currUser]); // Re-run effect when currUser changes

    return (
        <userdataContext.Provider value={{ userdata, setuserData,setTrigger }}>
            {props.children}
        </userdataContext.Provider>
    );
}

export default UserdataState;
