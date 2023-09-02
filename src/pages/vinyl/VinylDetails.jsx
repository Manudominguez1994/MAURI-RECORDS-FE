import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

function VinylDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [eachVinyl, setEachVinyl] = useState("");
    console.log(params,"params vacio WTF");
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await service.get(`/vinyl/${params.vinyl}`);
      setEachVinyl(response.data);
      console.log(response.data, "estes es mi vinilo querido");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>{eachVinyl.title}</h2>
      <h4>{eachVinyl.artist}</h4>
      <img src={eachVinyl.image} alt="imagen cloudinary no funciona" />
      <p>{eachVinyl.description}</p>
      <p>{eachVinyl.price}€</p>
      <p>{eachVinyl.stateConservation}</p>
      <p>{eachVinyl.genre}</p>
    </div>
  );
}

export default VinylDetails;
