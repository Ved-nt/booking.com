import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
    const[ credentials,setCredentials] =useState({
        username:undefined,
        password:undefined,
    });
    const {loading,error,dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post(
                "http://localhost:8800/api/auth/login",
                JSON.stringify(credentials),  // Convert credentials to JSON format
                { headers: { "Content-Type": "application/json" } } // Set proper headers
            );

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    return (
        <div className="login">
            <div className="lcontainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Login