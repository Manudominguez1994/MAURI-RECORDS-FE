import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [name, setNameChange] = useState("");
  const [image, setImageChange] = useState("");
  const [city, setCityChange] = useState("");

  const handleNameChange = (event) => {
    setNameChange(event.target.value);
  };
  const handleImageChange = (event) => {
    setImageChange(event.target.value);
  };
  const handleCityChange = (event) => {
    setCityChange(event.target.value);
  };

  useEffect(() => {
    getUserObj();
  }, []);

  const getUserObj = async () => {
    try {
      const response = await service.get("/user/myprofile");
      console.log(response, "datos a editar");
      setNameChange(response.data.name);
      setImageChange(response.data.image);
      setCityChange(response.data.city);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("funcioon actualizar");
    try {
      const response = await service.put("/user/editprofile", {
        name,
        image,
        city,
      });
      console.log("perfil actualizado", response);
      navigate("/my-profile");
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <form encType="multipart/form-data">
        <label htmlFor="name">Nombre completo: </label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <label>Imagen: </label>
        <img src={image} alt="" style={{ width: 250 }} />
        <br />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <br />
        <label htmlFor="city">Ciudad : </label>
        <input
          type="text"
          name="city"
          onChange={handleCityChange}
          value={city}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Editar
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
