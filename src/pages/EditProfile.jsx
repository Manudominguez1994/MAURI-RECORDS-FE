import { useEffect, useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/cloud.services";

function EditProfile() {
  const navigate = useNavigate();

  const [name, setNameChange] = useState("");
  const [city, setCityChange] = useState("");

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (event) => {
    setNameChange(event.target.value);
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);

      setImage(response.data.image);
      setIsUploading(false);

     
    } catch (error) {
      navigate("/error");
    }
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
      setImage(response.data.image);
      setCityChange(response.data.city);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("función actualizar");
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre completo: </label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <div>
          <label>Image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        ;{isUploading ? <h3>... uploading image</h3> : null}
        {image ? (
          <div>
            <img src={image} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        <label htmlFor="city">Ciudad : </label>
        <input
          type="text"
          name="city"
          onChange={handleCityChange}
          value={city}
        />
        <br />
        <button disabled={isUploading}>Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditProfile;
