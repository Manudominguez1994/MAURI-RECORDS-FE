import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function VinylDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const { activeUserId } = useContext(AuthContext);
  // console.log(activeUserId, "Id usuario activo");

  const [eachVinyl, setEachVinyl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // console.log(params, "params vacio WTF");
  useEffect(() => {
    getDetails();
  }, [params.vinyl]);

  const getDetails = async () => {
    try {
      const response = await service.get(`/vinyl/${params.vinyl}`);
      setEachVinyl(response.data);
      // console.log(response.data, "estes es mi vinilo querido");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleOperationCreate = async (event) => {
    event.preventDefault();
    try {
      const operationObj = await service.post(
        `/operation/create/${params.vinyl}`
      );
      // console.log('este es el vinilo que quiero comprar', operationObj.data._id)

      navigate(`/operationConfirm/${operationObj.data._id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
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
      {errorMessage ? <p>{errorMessage}</p> : null}
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
            <Link to={`/vinylDetails/${eachVinyl._id}/editImage`}>
              <button>Cambiar Imagen</button>
            </Link>
            <Link to={`/vinylDetails/${eachVinyl._id}/edit`}>
              <button>Editar Vinilo</button>
            </Link>
            <button onClick={handleDelete}>Borrar</button>
          </div>
        ) : (
          <div>
            <button onClick={handleOperationCreate}>Comprar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VinylDetails;
