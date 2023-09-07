import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/cloud.services";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'

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
    <div className="formeditImg">
      <Form >
        <div >
          
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        {isUploading ? 
          <div className='spinners'>
            <Spinner animation="grow" variant="primary" />
          </div> 
        : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={350} />
          </div>
        ) : null}
        <br />
        <Button variant="outline-warning" disabled={isUploading} onClick={handleSubmit}>Actualizar imagen</Button>
        <Link to='/my-profile'><Button variant="outline-warning">Cancelar</Button></Link>
      </Form>
    </div>
  );
}

export default EditImage;
