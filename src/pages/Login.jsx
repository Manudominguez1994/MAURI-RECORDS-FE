import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Login() {
  const { verifyToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here
    try {
      const response = await service.post("/auth/login", {
        email,
        password,
      });
      console.log(response);

      //almacenamos el token en LocalStorage
      localStorage.setItem("authToken", response.data.authToken);

      await verifyToken();

      navigate("/");
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
    <div className="divFatherLongin">
      <div className="divSignUp">
        <h3>Inicia sesion</h3>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Introduce tu email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Introduce tu contraseña"
            />
          </Form.Group>

           <Button variant="outline-secondary" type="submit">Entrar</Button>

          {errorMessage ? <p>{errorMessage}</p> : null}
        </Form>
      </div>
    </div>
  );
}

export default Login;
