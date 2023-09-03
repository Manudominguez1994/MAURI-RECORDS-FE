import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function VinylDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const { activeUserId } = useContext(AuthContext);
  console.log(activeUserId,"Id usuario activo");

  const [eachVinyl, setEachVinyl] = useState(null);

  console.log(params, "params vacio WTF");
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

  const handleAddFavorite = async () => {
    try {
      await service.put(`/user/${params.vinyl}/fav`);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/vinyl/${params.vinyl}`);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  if (eachVinyl === null) {
    return <h3>...Buscando</h3>;
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
      <h4>Vinilo vendido por : {eachVinyl.sellerUser.name} </h4>
      <div>
        
        {eachVinyl.sellerUser._id === activeUserId ? (
          <div>
            <Link to={`/vinylDetails/${eachVinyl._id}/edit`}>
              <button>Editar</button>
            </Link>
            <button onClick={handleDelete}>Borrar</button>
          </div>
        ) : (
          <div>
            <button>Comprar</button>
            <button onClick={handleAddFavorite}>Favoritos</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VinylDetails;
