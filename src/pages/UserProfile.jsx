import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
import EditImage from "../components/EditImage";
import Favoritos from "./Favoritos";
import Compras from "../components/Compras";
import Ventas from "../components/Ventas";

import Spinner from 'react-bootstrap/Spinner'

function UserProfile() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState(null);
  const [numValue , setNumValue] = useState(0)
  

  useEffect(() => {
      getUserObj();
  }, []);

  const getUserObj = async () => {
    try {
      const response = await service.get("/user/myprofile");
      // console.log("auqi mi usuario en FO", response.data);
      setUserObj(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handlenumValue1 = () => {
    setNumValue(1)
  }
  const handlenumValue2 = () => {
    setNumValue(2)
  }
  const handlenumValue3 = () => {
    setNumValue(3)
  }

  if (userObj === null) {
    return (
     <>
      <div className='spinners'>
        <Spinner animation="grow" variant="primary" />
      </div>
     </>
    )
  }

  return (
    <div>
      
      <h2>{userObj.name}</h2>
      <img src={userObj.image} alt="imageprofile" style={{ width: 250 }} />
      <br />
      <Link to={"/edit-image"}>
        <button>Editar Imagen</button>
      </Link>
      <p>{userObj.email}</p>
      <h4>{userObj.city}</h4>
      <div>
        <button onClick={handlenumValue1}>Compras</button>
        <button onClick={handlenumValue2}>Ventas</button>
        <button onClick={handlenumValue3}>Favoritos</button>
        <Link to={"/edit-profile"}>
          <button>Editar Perfil</button>
        </Link>
      </div>
      <div>
        {numValue === 1 ? <Compras /> : null}
        {numValue === 2 ? <Ventas /> : null}
        {numValue === 3 ? <Favoritos userObj={userObj} /> : null}
        
      </div>
    </div>
  );
}

export default UserProfile;
