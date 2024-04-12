import { useState, useContext, useEffect } from "react";
import userdataContext from "./userdataContext";
import UserContext from "./userContext.jsx";

const UserdataState = (props) => {
    console.log(89);
    const [userdata, setuserData] = useState(null);
    const { currUser } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
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
        }

        fetchData(); // Call fetchData when the component mounts or currUser changes
    }, [currUser]); // Re-run effect when currUser changes

    return (
        <userdataContext.Provider value={{ userdata, setuserData }}>
            {props.children}
        </userdataContext.Provider>
    );
}

export default UserdataState;
