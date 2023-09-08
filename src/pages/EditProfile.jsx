import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useNavigate, Link } from "react-router-dom";
// import { uploadImageService } from "../services/cloud.services";
//importar contexto
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

// FUNCIÓN PRINCIPAL
function EditProfile() {
  //declaramos navigate para redireccionar
  const navigate = useNavigate();

  //traernos handLogout de contexto y podríamos traer todas las funciones que contiene contexto(passedContext)
  const { handLogout } = useContext(AuthContext);

  //ESTADOS
  const [name, setNameChange] = useState(null);
  const [city, setCityChange] = useState(null);
  const [imageUrl, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // cambiamos el campo del nombre del formulario
  const handleNameChange = (event) => {
    setNameChange(event.target.value);
  };

  // // subimos la imagen del formulario
  // const handleFileUpload = async (event) => {
  //   if (!event.target.files[0]) {
  //     return;
  //   }
  //   setIsUploading(true);

  //   const uploadData = new FormData();
  //   uploadData.append("image", event.target.files[0]);

  //   try {
  //     const response = await uploadImageService(uploadData);

  //     setImage(response.data.imageUrl);
  //     setIsUploading(false);
  //   } catch (error) {
  //     navigate("/error");
  //   }
  // };

  // cambiamos el valor del campo ciudad del form
  const handleCityChange = (event) => {
    setCityChange(event.target.value);
  };

  // efectúa la llamada del getUserObj cuando se monta el componente (ciclo de vida inicial)
  useEffect(() => {
    getUserObj();
  }, []);

  // llamar a BE y traer los valores predeterminados en el perfil de usuario
  const getUserObj = async () => {
    try {
      const response = await service.get("/user/myprofile");
      // console.log(response, "datos a editar");
      setNameChange(response.data.name);
      setImage(response.data.image);
      setCityChange(response.data.city);
    } catch (error) {
      navigate("/error");
    }
  };

  // esto elimina perfil de usuario
  const handleDelete = async () => {
    // console.log("función eliminar");
    try {
      await service.delete("/user/deleteprofile");
      // console.log("qué pasa BE estoy eliminando mi usuario");
      handLogout();
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  // esto lanza el formulario y aplica los cambios en DB
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("función actualizar");
    try {
      await service.put("/user/editprofile", {
        name: name,
        image: imageUrl,
        city: city,
      });
      // console.log("perfil actualizado");
      navigate("/my-profile");
    } catch (error) {
      navigate("/error");
    }
  };

  if (imageUrl === null || name === null || city === null) {
    return (
      <div className="spinners">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }
  // este es el render
  return (
    <div className="viniloCreateContainer">
      <h3>Edita tu Perfil</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="name">Nombre completo: </Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <Form.Label htmlFor="city">Ciudad : </Form.Label>
        <Form.Control
          type="text"
          name="city"
          onChange={handleCityChange}
          value={city}
        />
        <br />
        <Button variant="warning" type="submit">
          Guardar cambios
        </Button>
      </Form>
      <Button variant="warning" onClick={handleDelete}>
        Eliminar usuario
      </Button>
      <Link to={"/my-profile"}>
        <Button variant="warning">Cancelar</Button>
      </Link>
    </div>
  );
}

export default EditProfile;
