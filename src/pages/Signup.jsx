import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [city , setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [ errorMessage, setErrorMessage ] = useState('')

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // contactar con BE, pasarle los estados y crear un usuario

    try {
      await service.post('/auth/signup', {
      name,
      email,
      password,
      confirmPassword
      })

      navigate('/login')


    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log('Quiero ver el objeto del erro', error.response)
        setErrorMessage(error.response.data.errorMessage)
      } else {
      navigate('/error')
      }
    }
  };

  return (
    <div>

      <h1>Sign Up</h1>
      { errorMessage ? <p>{errorMessage}</p> : null }  
      <form onSubmit={handleSignup}>
        
        <label>Nombre completo: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Ciudad : </label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleCityChange}
        />

        <br />

        <label>Contraseña: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <label>Confirma tu contraseña: </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <br />

        <button type="submit">Signup</button>

         
      </form>
      
    </div>
  );
}

export default Signup;











