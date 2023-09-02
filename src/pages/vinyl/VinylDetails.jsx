import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

function VinylDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [eachVinyl, setEachVinyl] = useState(null);
    console.log(params,"params vacio WTF");
  useEffect(() => {
    getDetails();
  }, [params.vinyl]);

  const getDetails = async () => {
    try {
      const response = await service.get(`/vinyl/${params.vinyl}`);
      setEachVinyl(response.data);
      console.log(response.data, "estes es mi vinilo querido");
    } catch (error) {
      navigate("/error");
    }
  };
  if(eachVinyl === null){
    return <h3>...Buscando</h3>
  }
  

  return (
    <div>
      <h2>{eachVinyl.title}</h2>
      <h4>{eachVinyl.artist}</h4>
      <img src={eachVinyl.image} alt="imagen cloudinary no funciona" />
      <p>{eachVinyl.description}</p>
      <p>{eachVinyl.price}€</p>
      <p>{eachVinyl.stateConservation}</p>
      <p>{eachVinyl.genre}</p>
      <h4>Vinilo vendido por : {eachVinyl.sellerUser.name }  </h4>
      <div>
        <button>Comprar</button>
        <button>Favoritos</button>
        <button>Editar</button>
        <button>Borrar</button>
      </div>
    </div>
  );
}

export default VinylDetails;
