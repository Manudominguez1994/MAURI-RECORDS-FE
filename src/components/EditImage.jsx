import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/cloud.services";

function EditImage() {

  const navigate = useNavigate() 

  const [imageUrl, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // subimos la imagen del formulario
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);

      setImage(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("función actualizar");
    try {
      await service.put("/user/editprofile", {
        image: imageUrl,
      });
      console.log("perfil actualizado");
      navigate("/my-profile");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>Image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        <button disabled={isUploading} onClick={handleSubmit}>Actualizar imagen</button>
        <Link to='/my-profile'><button>Cancelar</button></Link>
      </form>
    </div>
  );
}

export default EditImage;
