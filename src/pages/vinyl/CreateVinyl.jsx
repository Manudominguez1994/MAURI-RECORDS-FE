import { useState } from "react";
import service from "../../services/service.config";
import { useNavigate } from "react-router-dom";


function CreateVinyl() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
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
        image,
        description,
        price,
        stateConservation,
        genre,
      });
    //  console.log(response.data);
      navigate(`/vinylDetails/${response.data._id}`);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      <div>CREAR VINILO</div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input type="text" name="title" onChange={handleTitle} value={title} />

        <br />

        <label htmlFor="artist">Banda</label>
        <input
          type="text"
          name="artist"
          onChange={handleArtist}
          value={artist}
        />

        <br />

        <label htmlFor="image">Imagen</label>
        <input type="text" name="image" onChange={handleImage} value={image} />

        <br />

        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          onChange={handleDescription}
          value={description}
        />

        <br />

        <label htmlFor="price">Precio</label>
        <input
          type="number"
          name="price"
          onChange={handlePrice}
          value={price}
        />

        <br />

        <label htmlFor="stateConservation">Estado de conservación</label>
        <select onChange={handleStateConservation}>
          <option value="">Seleccionar</option>
          <option value="Como Nuevo">Como nuevo</option>
          <option value="Buen estado">Buen estado</option>
          <option value="Algo desgastado">Algo desgastado</option>
          <option value="Muy Desgastado">Muy Desgastado</option>
        </select>

        <br />

        <label htmlFor="genre">Género</label>
          <select onChange={handleGenre}>
            <option value="">Seleccionar</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Jazz">Jazz</option>
            <option value="Electronica">Electrónica</option>
            <option value="Soul">Soul</option>
            <option value="Reagge">Reagge</option>
          </select>

        <br />

        <button type="submit">Subir vinilo</button>
      </form>
    </>
  );
}

export default CreateVinyl;
