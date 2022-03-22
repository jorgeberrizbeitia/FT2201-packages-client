import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginService} from "../../services/auth.services"

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await loginService(user)
      const { authToken } = response.data
      localStorage.setItem("authToken", authToken)
      props.setIsLoggedIn(true)
      navigate("/profile")
    } catch(err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage) 
      } else {
        navigate("/error")
      }
    }
  }

  return (
    <div>
    
      <h1>Log In</h1>    
    
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit">Sign Up</button>

      </form>

      { errorMessage && <p>{errorMessage}</p> }
    
    </div>
  )
}

export default Login