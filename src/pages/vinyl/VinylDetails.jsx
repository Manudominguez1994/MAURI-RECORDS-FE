import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';

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
    return (
    <div className='spinners'>
     <Spinner animation="grow" variant="primary" />
    </div>
      
    )
  }

  return (
    <div className="details-father">
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className="album-image-container">
        <div>
          <img className='album-details-image' src={eachVinyl.image} alt="imagen cloudinary no funciona" />
        </div>
        <div>
          <h2>{eachVinyl.title}</h2>
        </div>
        <div>
          <h3>{eachVinyl.artist}</h3>
        </div>
        <div>
          <p>{eachVinyl.description}</p>
        </div>
        <div>
          <p>{eachVinyl.price}€</p>
        </div>
        <div>
          <p>{eachVinyl.stateConservation}</p>
        </div>
        <div>
          <p>{eachVinyl.genre}</p>
        </div>
        <div>
          <p>Vinilo vendido por {eachVinyl.sellerUser.name} </p>
        </div>
        <div>
          {eachVinyl.sellerUser._id === activeUserId ? (
            <div>
              <Link to={`/vinylDetails/${eachVinyl._id}/editImage`}>
                <Button variant="warning">Cambiar Imagen</Button>
              </Link>
              <Link to={`/vinylDetails/${eachVinyl._id}/edit`}>
                <Button variant="warning" >Editar Vinilo</Button>
              </Link>
              <Button variant="warning" onClick={handleDelete}>Borrar</Button>
              <Link to="/"><Button variant="warning">Cancelar</Button></Link>
            </div>
          ) : (
            <div>
              <Button variant="warning" onClick={handleOperationCreate}>Comprar</Button>
              <Link to="/"><Button variant="warning">Cancelar</Button></Link>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VinylDetails;
