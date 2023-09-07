import { useState } from "react";
import service from "../../services/service.config";
import { useNavigate, Link } from "react-router-dom";
import { uploadImageService } from "../../services/cloud.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateVinyl() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [imageUrl, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const AllGenre = [
    "Rock",
    "Pop",
    "Hip-Hop",
    "Jazz",
    "Electronica",
    "Soul",
    "Reagge",
    "Otros",
  ];
  const AllState = [
    "Como Nuevo",
    "Buen estado",
    "Algo desgastado",
    "Muy Desgastado",
  ];

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stateConservation, setStateConservation] = useState("");
  const [genre, setGenre] = useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleArtist = (event) => {
    setArtist(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleStateConservation = (event) => {
    setStateConservation(event.target.value);
  };
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await service.post("/vinyl/create", {
        title,
        artist,
        image: imageUrl,
        description,
        price,
        stateConservation,
        genre,
      });
      //  console.log(response.data);
      navigate(`/vinylDetails/${response.data._id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

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

  return (
    <div className="viniloCreateContainer">
      <h3>CREAR VINILO</h3>

      {errorMessage ? <p>{errorMessage}</p> : null}
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label>Image </Form.Label>
          <Form.Control
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
        
        <Form.Label htmlFor="title">Título</Form.Label>
        <Form.Control type="text" name="title" onChange={handleTitle} value={title} placeholder="Titulo"/>

        

        <Form.Label htmlFor="artist">Banda</Form.Label>
        <Form.Control
          type="text"
          name="artist"
          onChange={handleArtist}
          value={artist}
          placeholder="Artista o Banda"
        />

        

        <Form.Label htmlFor="description">Descripción</Form.Label>
        <Form.Control
          type="text"
          name="description"
          onChange={handleDescription}
          value={description}
          placeholder="Descripción"
        />

        

        <Form.Label htmlFor="price">Precio</Form.Label>
        <Form.Control
          type="number"
          name="price"
          onChange={handlePrice}
          value={price}
          placeholder="Precio"
        />

        <br />

        <Form.Label htmlFor="stateConservation">Estado de conservación</Form.Label>
        <Form.Select onChange={handleStateConservation}>
          <option value="">Seleccionar</option>
          {AllState.map((eachState) => {
            return (
              <>
                <option value={eachState}>{eachState}</option>
              </>
            );
          })}
        </Form.Select>

      
        <Form.Label htmlFor="genre">Género</Form.Label>
        
      
        <Form.Select onChange={handleGenre}>
          <option value="">Seleccionar</option>
          {AllGenre.map((eachGenre) => {
            return (
              <>
                <option value={eachGenre}>{eachGenre}</option>
              </>
            );
          })}
        </Form.Select>

       <br />

        <Button variant="outline-warning" type="submit">Subir vinilo</Button>
        <Link to="/">
          <Button variant="outline-warning">Cancelar</Button>
        </Link>
      </Form>
    </div>
  );
}

export default CreateVinyl;
