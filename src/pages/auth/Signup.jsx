import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = { email, password, name };

    try {
      await signupService(user)
      navigate("/login")
    } catch(err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage) 
      } else {
        navigate("/error")
      }
    }
  };

  return (
    <div>

      <h1>Sign Up</h1>    
    
      <form onSubmit={handleSignup}>
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

        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <button type="submit">Log In</button>

      </form>

      { errorMessage && <p>{errorMessage}</p> }
    
    </div>
  )
}

export default Signup