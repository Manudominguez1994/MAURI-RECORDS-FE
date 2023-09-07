import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // contactar con BE, pasarle los estados y crear un usuario

    try {
      await service.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
        city,
      });

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log('Quiero ver el objeto del erro', error.response)
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Registrate</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre completo:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce tu nombre"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter email"
          />
        </Form.Group>
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
      </Form>
    </div>
  );
}

export default Signup;
