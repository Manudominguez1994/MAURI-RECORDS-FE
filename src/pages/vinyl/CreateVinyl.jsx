import { useState } from "react";
import service from "../../services/service.config";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../../services/cloud.services";


function CreateVinyl() {
  const navigate = useNavigate();

  const [imageUrl, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const AllGenre =  ["Rock", "Pop", "Hip-Hop", "Jazz", "Electronica", "Soul", "Reagge","Otros"]
  const AllState = ["Como Nuevo", "Buen estado", "Algo desgastado", "Muy Desgastado"]

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
        image:imageUrl,
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
    <>
      <div>CREAR VINILO</div>
      


      <form onSubmit={handleSubmit}>
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
          {AllState.map((eachState)=>{
            return(
              <>
              <option value={eachState}>{eachState}</option>
              </>
            )
          })}
        
        </select>

        <br />

        <label htmlFor="genre">Género</label>
          <select onChange={handleGenre}>
            <option value="">Seleccionar</option>
            {AllGenre.map((eachGenre)=>{
            return(
              <>
              <option value={eachGenre}>{eachGenre}</option>
              </>
            )
          })}

          </select>

        <br />
        
        <button type="submit">Subir vinilo</button>
      </form>
      
    </>
  );
}

export default CreateVinyl;
